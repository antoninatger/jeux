/* ============================================================
   RÉSO — moteur de dialogue local (aucune connexion requise)
   ============================================================ */

const HINT_AFTER = 2;
const AUTO_ADVANCE_AFTER = 5;
const STORAGE_KEY = "reso_alberte_save_v1";
const WEB3FORMS_ACCESS_KEY = "ef1fe549-c616-4a27-a6c2-97f06caa913d";

/* --- État --- */
let idx = 0;
let busy = false;
let mode = "normal";   // "normal" (avec suggestions) | "avance" (sans aide)
let pendingFollow = null; // scénario en attente d'une explication (« pourquoi ? »)
let pendingPhotoHint = null; // sous-étape : expliquer comment prendre puis envoyer une photo
let buttonConfusionShown = false; // gag « bouton de radio » (une seule fois)
let failCount = 0;        // échecs sur l'étape courante
let riskScore = 0;        // jauge de risque cumulée (0-100)
let lastVariant = "";
const transcript = [];

const $ = id => document.getElementById(id);
const msgs = $("msgs"), input = $("input"), sendBtn = $("send"), chipsBox = $("chips");

/* --- Normalisation (accents/apostrophes) pour la détection --- */
function norm(s){
  return s.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .replace(/['’`-]/g," ")
    .replace(/\s+/g," ").trim();
}

/* --- Recherche par mots entiers ---
   Avant : text.includes(mot). « pas » était trouvé dans « mot de passe », « lis »
   dans « utilise », « fil » dans « profil », « tue la » dans « situe la ».
   Maintenant la phrase est découpée en mots, et un mot-clé doit commencer au
   début d'un mot. Un mot-clé court (4 lettres ou moins) doit être le mot entier,
   au pluriel ou au féminin près (« code » → « codes », « codée ») ; un mot-clé
   plus long vaut pour tous les mots qui commencent par lui (« devine » →
   « deviner », « devinerait »). La ponctuation devient un séparateur « § » :
   une négation ne porte pas au-delà d'une virgule. */
function mots(s){
  return norm(s)
    .replace(/[.,;:!?()«»"…\/]+/g," § ")
    .replace(/[^a-z0-9§ ]+/g," ")
    .replace(/\s+/g," ").trim().split(" ").filter(Boolean)
    .map(m => (m==="nn" || m==="nan" || m==="nope") ? "non" : m);   // écriture SMS
}
function motEgal(m, k){
  if(k.length <= 4) return m===k || m===k+"s" || m===k+"e" || m===k+"es" || m===k+"x";
  return m.startsWith(k);
}
/* Positions (début, fin) de toutes les occurrences d'un mot-clé. */
function occurrences(tokens, kw){
  const k = mots(kw), res = [];
  if(!k.length) return res;
  for(let i=0; i + k.length <= tokens.length; i++){
    let ok = true;
    for(let j=0; j<k.length; j++){ if(!motEgal(tokens[i+j], k[j])){ ok=false; break; } }
    if(ok) res.push([i, i + k.length]);
  }
  return res;
}
/* Retire des expressions de la phrase (remplacées par un séparateur) et dit si
   l'une d'elles y figurait. */
function retirer(tokens, liste){
  let trouve = 0;
  liste.forEach(kw => occurrences(tokens, kw).forEach(([a,b]) => {
    for(let i=a;i<b;i++) tokens[i] = "§"; trouve++;
  }));
  return trouve;
}
function contient(tokens, kws){ return kws.some(k => occurrences(tokens, k).length > 0); }
function hit(text, kws){ return contient(mots(text), kws); }

/* Une occurrence est niée si « ne », « pas », « évite »… la précède (trois mots
   au plus) ou si « pas », « rien »… la suit (deux mots au plus), sans franchir
   une ponctuation ni un « mais ». */
function estNiee(tokens, a, b, avantSeulement){
  for(let i=a-1; i>=Math.max(0,a-3); i--){
    if(tokens[i]==="§" || tokens[i]==="mais") break;
    if(NEGATION_AVANT.some(n => tokens[i]===n || (n.includes(" ") && (tokens[i-1]+" "+tokens[i])===n))) return true;
  }
  if(avantSeulement) return false;
  for(let i=b; i<Math.min(tokens.length,b+2); i++){
    if(tokens[i]==="§" || tokens[i]==="mais") break;
    if(NEGATION_APRES.includes(tokens[i])) return true;
  }
  return false;
}
/* Occurrences d'une liste de mots-clés, sans chevauchement (la plus longue gagne). */
function trouver(tokens, kws, avantSeulement){
  const res = [];
  kws.map(k => ({ k, n: mots(k).length })).sort((x,y) => y.n - x.n).forEach(({k}) => {
    occurrences(tokens, k).forEach(([a,b]) => {
      if(res.some(r => a < r.b && r.a < b)) return;
      // un mot-clé qui porte déjà sa négation (« pas ton année », « ne note pas »,
      // « surtout pas ») n'est pas « nié » par le « ne » qui l'entoure
      const porteNegation = mots(k).some(m => NEGATION_AVANT.includes(m) || NEGATION_APRES.includes(m));
      res.push({ k, a, b, niee: !porteNegation && estNiee(tokens, a, b, avantSeulement) });
    });
  });
  return res;
}

/* --- Le cœur : bon réflexe, mauvais réflexe, hors-sujet ou incompris ---
   Avant, le bon réflexe était testé en premier et un seul mot suffisait :
   « oui, garde 1900, c'est pas grave » passait grâce à « pas ». Maintenant les
   deux listes sont comptées et comparées :
   - un mot de mauvais réflexe nié (« ne donne pas ») ne compte pas ;
   - un mot de bon réflexe nié (« ne te méfie pas ») compte comme un mauvais ;
   - « oui », « d'accord », « c'est pas grave »… comptent comme un mauvais ;
     niés (« pas d'accord »), comme un bon ;
   - « non », « pas »… ne valident que si rien ne dit le contraire ;
   - à égalité, le bon réflexe l'emporte, sauf si la phrase dit « oui ».
   Renvoie "good", "bad", "offtopic" ou "unknown". */
function classer(sc, text, extraGood){
  const t = mots(text);
  const aDesMauvais = sc.bad && sc.bad.kw && sc.bad.kw.length > 0;
  const remplissage = retirer(t, FILLER_PATTERNS);
  const rassure = aDesMauvais ? retirer(t, RASSURE_KW) : 0;

  let bons = 0, generiques = 0, mauvais = 0, accords = rassure;
  if(aDesMauvais){
    trouver(t, ACCORD_KW).forEach(o => {
      if(o.niee) bons++; else accords++;
      for(let i=o.a;i<o.b;i++) t[i] = "§";
    });
  }
  trouver(t, sc.good.kw.concat(extraGood || [])).forEach(o => {
    if(MOTS_GENERIQUES.includes(o.k)){ generiques++; return; }
    if(o.niee){ if(aDesMauvais) mauvais++; }
    else bons++;
    // les mots déjà lus comme bon réflexe ne sont pas relus comme mauvais :
    // « trop facile » ne compte pas aussi « facile », « pas 1900 » pas aussi « 1900 »
    for(let i=o.a;i<o.b;i++) t[i] = "§";
  });
  if(aDesMauvais) trouver(t, sc.bad.kw).forEach(o => { if(!o.niee) mauvais++; });
  mauvais += accords;

  if(mauvais === 0){
    if(bons > 0) return "good";
    if(generiques > 0) return remplissage ? "offtopic" : "good";
    return remplissage ? "offtopic" : "unknown";
  }
  if(bons > mauvais || (bons === mauvais && accords === 0)) return "good";
  return "bad";
}

/* Choix d'une prise (ou toute question à une seule bonne réponse) : "right",
   "wrong", "both" (plusieurs réponses à la fois) ou "none". Les choix niés
   (« la 2, pas la 1 ») ne comptent pas. */
function classerChoix(sc, text){
  const t = mots(text);
  // pour un choix, seule la négation placée avant compte : « la ronde, pas les autres »
  const bon = trouver(t, sc.good.followKw, true).some(o => !o.niee);
  const faux = trouver(t, sc.good.followWrongKw || [], true).some(o => !o.niee);
  if(bon && faux) return "both";
  if(bon) return "right";
  if(faux) return "wrong";
  return "none";
}

function checkAnachronism(text){ const a = ANACHRONISMS.find(a => hit(text, a.kw)); return a ? a.reply : null; }
function findHistEcho(text){ const h = HIST_ECHO.find(h => hit(text, h.kw)); return h ? h.echo : null; }
function checkSafety(text){
  const t = mots(text);
  retirer(t, EXPRESSIONS_ANODINES);
  if(contient(t, SUICIDE_KW)) return "suicide";
  if(contient(t, VIOLENT_KW)) return "violent";
  return null;
}
function pickVariant(list){
  let c;
  do{ c = list[Math.floor(Math.random()*list.length)]; } while(list.length > 1 && c === lastVariant);
  lastVariant = c;
  return c;
}
function echapper(s){ return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function stripHtml(html){ const d = document.createElement("div"); d.innerHTML = html; return d.textContent; }

/* --- Ajout de messages --- */
function addMsg(who, text, cls=""){
  const row = document.createElement("div");
  row.className = "row" + (who==="me" ? " me":"");
  const b = document.createElement("div");
  b.className = "bubble " + (cls || who);
  b.innerHTML = text;
  row.appendChild(b);
  msgs.appendChild(row);
  msgs.scrollTop = msgs.scrollHeight;
  transcript.push({ who, text: stripHtml(text) });
}
/* La bulle « … » est un vrai bouton : cliquer (ou Entrée / Espace dessus)
   affiche tout de suite la réplique en attente. Sans ça, une partie de
   soixante répliques impose trois minutes d'attente cumulée, sans aucun
   moyen d'accélérer. */
function typing(){
  const row = document.createElement("div");
  row.className="row";row.id="typing";
  const b = document.createElement("button");
  b.type = "button";
  b.className = "bubble alberte typing";
  b.setAttribute("aria-label", "Afficher tout de suite ce qu'Alberte écrit");
  b.innerHTML = '<span></span><span></span><span></span>';
  b.onclick = sauterLaFrappe;
  row.appendChild(b);
  msgs.appendChild(row);msgs.scrollTop=msgs.scrollHeight;
  b.focus({ preventScroll:true });
}
function stopTyping(){ const t=$("typing"); if(t) t.remove(); }

/* Pendant qu'Alberte « écrit », cette variable contient de quoi passer à la
   suite tout de suite. Elle vaut null quand il n'y a rien à sauter. */
let sauterFrappe = null;
function sauterLaFrappe(){ if(sauterFrappe) sauterFrappe(); }

/* Un clic n'importe où dans la conversation saute aussi : viser une bulle de
   sept pixels au doigt n'est pas raisonnable. */
msgs.addEventListener("click", sauterLaFrappe);

/* --- Alberte parle (avec délai réaliste) --- */
function alberteSay(lines, cb){
  let i=0, minuteur=null;

  const afficher=()=>{
    clearTimeout(minuteur);
    stopTyping();
    addMsg("alberte", lines[i], "alberte");
    i++;
    // pendant la petite pause entre deux répliques, sauter = passer à la suivante
    sauterFrappe = ()=>{ clearTimeout(minuteur); next(); };
    minuteur = setTimeout(next, 350);
  };

  const next=()=>{
    clearTimeout(minuteur);
    if(i>=lines.length){ sauterFrappe=null; cb&&cb(); return; }
    typing();
    sauterFrappe = afficher;
    const visibleLen = stripHtml(lines[i]).length; // le balisage (ex. <img>) ne doit pas gonfler le délai de frappe
    minuteur = setTimeout(afficher, 650 + visibleLen*12);
  };
  next();
}

/* --- Puces de suggestion --- */
function showChips(list){
  chipsBox.innerHTML="";
  if(mode === "avance") return;   // mode Avancé : aucune suggestion
  list.forEach(c=>{
    // <button> et non <div onclick> : au clavier, les puces étaient
    // inatteignables, et le mode Normal repose entièrement sur elles.
    const el=document.createElement("button");
    el.type="button";
    el.className="chip";el.textContent=c;
    el.onclick=()=>{ input.value=c; input.focus(); };
    chipsBox.appendChild(el);
  });
}

/* --- Puce de fin de conversation (scénario finale) : le joueur choisit quand refermer --- */
function showEndChip(){
  chipsBox.innerHTML="";
  const el=document.createElement("button");
  el.type="button";
  el.className="chip";el.textContent="Fin de la conversation";
  el.onclick=()=>{ chipsBox.innerHTML=""; nextScenario(); };
  chipsBox.appendChild(el);
  el.focus({ preventScroll:true });
}

/* --- Avatar (photo de profil, réelle dès le départ — c'est justement ce qu'il faudra repérer) --- */
function setAvatarAnon(){ $("avatar").innerHTML = '<div class="avatar-emoji">😎</div>'; }

/* --- Jauge de risque / barre de progression --- */
function updateRisk(delta){
  riskScore = Math.max(0, Math.min(100, riskScore + delta));
  const el = $("riskFill");
  el.style.width = riskScore + "%";
  el.style.background = riskScore < 33 ? "var(--accent)" : riskScore < 66 ? "var(--warn)" : "var(--danger)";
}
function updateProgress(){ $("progFill").style.width = Math.round(idx / SCENARIOS.length * 100) + "%"; }

/* --- Sauvegarde / reprise --- */
function saveState(){
  try{ localStorage.setItem(STORAGE_KEY, JSON.stringify({ idx, mode, riskScore, transcript, ts: Date.now() })); }catch(e){}
}
function clearSavedState(){ try{ localStorage.removeItem(STORAGE_KEY); }catch(e){} }
function loadSavedState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return null;
    const s = JSON.parse(raw);
    if(s && s.idx > 0 && s.idx < SCENARIOS.length) return s;
  }catch(e){}
  return null;
}
function resumeGame(){
  const saved = loadSavedState();
  if(!saved) return;
  mode = saved.mode || "normal";
  idx = saved.idx;
  riskScore = saved.riskScore || 0;
  if(Array.isArray(saved.transcript)){ transcript.length=0; transcript.push(...saved.transcript); }
  $("intro").classList.add("hidden");
  updateRisk(0); updateProgress();
  addMsg("Système", "↻ Reprise de la partie à l'étape " + (idx+1) + "/" + SCENARIOS.length + ".", "sys");
  loadScenario();
}

/* --- Export de la conversation --- */
function transcriptText(){
  return transcript.map(e => "[" + e.who + "] " + e.text).join("\n\n");
}
function exportTranscript(){
  const blob = new Blob([transcriptText()], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "reso-alberte-transcript.txt";
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}

/* --- Envoi via Web3Forms (commentaires + conversations terminées) --- */
async function sendWeb3Form(subject, name, email, message){
  /* Web3Forms pose « email » en Reply-To du message qu'il expédie. Y mettre
     « non renseigné » quand le joueur n'a pas laissé d'adresse fabrique un
     en-tête invalide, et les filtres anti-spam — Outlook et Hotmail en tête —
     classent le message : l'API répond « success », le retour n'arrive jamais.
     Le champ n'est pas obligatoire, on ne l'envoie que s'il est rempli. */
  const envoi = { access_key: WEB3FORMS_ACCESS_KEY, subject, name, message };
  if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "")) envoi.email = email;
  try{
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(envoi)
    });
    const data = await res.json();
    return !!data.success;
  }catch(e){ return false; }
}

function openFeedback(){ $("feedbackModal").classList.remove("hidden"); }
function closeFeedback(){ $("feedbackModal").classList.add("hidden"); $("fb-status").textContent=""; }

/* --- Récap des points clés (notes de tous les scénarios) --- */
function openRecap(){
  $("recapList").innerHTML = SCENARIOS.filter(sc => sc.note).map(sc =>
    '<div class="bubble note"><span class="note-h">'+sc.note.h+'</span>'+sc.note.t+'</div>'
  ).join("");
  $("recapModal").classList.remove("hidden");
}
function closeRecap(){ $("recapModal").classList.add("hidden"); }
async function sendFeedback(){
  const msg = $("fb-message").value.trim();
  const email = $("fb-email").value.trim();
  if(!msg){ $("fb-status").textContent = "Écrivez un message avant d'envoyer."; return; }
  $("fb-status").textContent = "Envoi…";
  const ok = await sendWeb3Form("RÉSO — Commentaire joueur", "Joueur RÉSO", email, msg);
  $("fb-status").textContent = ok ? "Merci, c'est envoyé !" : "Erreur d'envoi, réessayez plus tard.";
  if(ok){
    $("fb-message").value=""; $("fb-email").value="";
    setTimeout(closeFeedback, 1400);
  }
}

/* --- Envoi de la conversation, sur demande du joueur (opt-in) --- */
async function sendCompletedConversation(btn){
  if(btn){ btn.disabled = true; btn.textContent = "Envoi…"; }
  const header = "Mode : " + mode + " | Niveau de risque final : " + riskScore + "%\n\n";
  const ok = await sendWeb3Form("RÉSO — Conversation terminée", "Jeu RÉSO", "", header + transcriptText());
  if(btn){ btn.textContent = ok ? "✓ Envoyé, merci !" : "Erreur d'envoi, réessayez"; if(!ok) btn.disabled = false; }
}

/* --- Démarrage --- */
function startGame(m){
  mode = m || "normal";
  idx = 0; riskScore = 0; failCount = 0;
  clearSavedState();
  $("intro").classList.add("hidden");
  updateRisk(0); updateProgress();
  showLockscreen();
}

/* --- Écran de verrouillage : retrouver le mot de passe d'Alberte avant d'ouvrir la ligne --- */
let lsFails = 0, lsLockouts = 0, lsBlocked = false;
function lsNorm(s){ return s.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g,""); }
function showLockscreen(){
  lsFails = 0; lsLockouts = 0; lsBlocked = false;
  const d = new Date();
  $("lsClock").textContent = String(d.getHours()).padStart(2,"0") + ":" + String(d.getMinutes()).padStart(2,"0");
  $("lsHints").innerHTML = ""; $("lsMsg").textContent = ""; $("lsMsg").className = "ls-msg";
  $("lsSkip").classList.add("hidden");
  $("lsInput").value = ""; renderDots();
  $("lockscreen").classList.remove("hidden");
  setTimeout(()=>$("lsInput").focus(), 50);
}
function renderDots(){
  const n = $("lsInput").value.replace(/\s+/g,"").length;
  $("lsDots").innerHTML = "<span></span>".repeat(n);
}
// renvoie "" si le code est bon, sinon le message à afficher
function checkCode(raw){
  const c = lsNorm(raw), V = VERROU;
  if(V.code) return c === lsNorm(V.code) ? "" : (c.includes(V.nomMari) ? "Bourde, c'est le nom de son mari… pas celui qu'elle portait avant." : "Code incorrect.");
  if(/[^A-Z]/.test(c)) return "Code incorrect.";
  if(V.nomMari && c.includes(V.nomMari)) return "Bourde, c'est le nom de son mari… pas celui qu'elle portait avant.";
  if(c.length !== V.longueur || c[0] !== V.initiale) return "Code incorrect.";
  return "";
}
function tryUnlock(){
  if(lsBlocked) return;
  const raw = $("lsInput").value;
  if(!lsNorm(raw)) return;
  const err = checkCode(raw);
  transcript.push({ who: "verrou", text: "Essai : " + lsNorm(raw) + (err ? " (refusé)" : " (accepté)") });
  if(!err){ unlockPhone(false); return; }
  lsFails++;
  const dots = $("lsDots"); dots.classList.remove("shake"); void dots.offsetWidth; dots.classList.add("shake");
  $("lsInput").value = ""; setTimeout(renderDots, 400);
  const left = VERROU.essaisAvantBlocage - (lsFails % VERROU.essaisAvantBlocage);
  if(lsFails % VERROU.essaisAvantBlocage === 0){ blockPhone(err); return; }
  $("lsMsg").textContent = err + " Encore " + left + " essai" + (left>1?"s":"") + " avant le blocage.";
}
// comme un vrai téléphone : trop d'essais ratés bloquent l'appareil un moment
function blockPhone(err){
  lsBlocked = true; lsLockouts++;
  const hint = VERROU.indices[lsLockouts-1];
  if(hint){ const h = document.createElement("div"); h.textContent = hint; $("lsHints").appendChild(h); }
  if(lsLockouts >= 2) $("lsSkip").classList.remove("hidden");
  $("lsInput").disabled = true; $("lsBtn").disabled = true;
  let t = VERROU.blocageSecondes;
  const tick = ()=>{
    if(t <= 0){
      lsBlocked = false; $("lsInput").disabled = false; $("lsBtn").disabled = false;
      $("lsMsg").textContent = "Vous pouvez réessayer."; $("lsInput").focus();
      return;
    }
    $("lsMsg").textContent = err + " Trop d'essais : téléphone bloqué " + t + " s.";
    t--; setTimeout(tick, 1000);
  };
  tick();
}
function unlockPhone(skipped){
  lsBlocked = true;
  $("lsLock").textContent = "🔓";
  $("lsMsg").className = "ls-msg ok";
  $("lsMsg").textContent = skipped ? "Étape passée." : "Code accepté. Le téléphone s'ouvre…";
  addMsg("Système", skipped ? "🔓 Téléphone ouvert par l'enseignant." : "🔓 <b>Mot de passe trouvé.</b> La ligne avec Alberte est ouverte.", "sys");
  setTimeout(()=>{
    $("lockscreen").classList.add("hidden");
    busy=true;
    alberteSay(INTRO_ALBERTE, ()=> loadScenario());
  }, skipped ? 300 : 1100);
}
$("lsInput").addEventListener("input", renderDots);
$("lsInput").addEventListener("keydown", e=>{ if(e.key==="Enter") tryUnlock(); });

function loadScenario(){
  const sc = SCENARIOS[idx];
  pendingFollow = null;
  pendingPhotoHint = null;
  failCount = 0;
  if(sc.good && sc.good.parts) sc.good.parts.forEach(p => p.done = false);
  chipsBox.innerHTML="";
  updateProgress();
  saveState();
  /* La saisie reste fermée pendant qu'Alberte présente l'étape, et s'ouvre
     (avec le focus dans le champ) quand elle a fini : avant, un élève pouvait
     répondre en pleine présentation, et deux étapes s'entremêlaient. */
  busy=true; input.disabled=true; sendBtn.disabled=true;
  alberteSay(sc.intro, ()=>{ showChips(sc.chips); unlock(); });
}

/* --- Relance générique (indice progressif + garde-fou anti-blocage) --- */
function guardOrRetry(sc){
  failCount++;
  if(failCount >= AUTO_ADVANCE_AFTER){
    if(sc.id === "profil") setAvatarAnon();
    addMsg("Système", "🔓 <b>On retient la leçon pour cette fois, on continue…</b>", "sys");
    setTimeout(()=>{
      addMsg("note", '<span class="note-h">'+sc.note.h+'</span>'+sc.note.t, "note");
      if(sc.type === "finale") showEndChip(); else setTimeout(nextScenario, 900);
    }, 500);
    return true;
  }
  return false;
}
function reprompt(sc, variants, chips){
  if(guardOrRetry(sc)) return;
  let msg = pickVariant(variants);
  if(failCount >= HINT_AFTER) msg += "  Un indice : " + sc.note.t;
  alberteSay([msg], ()=>{ showChips(chips || sc.chips); unlock(); });
}

/* --- Envoi du conseil --- */
function handleSend(){
  if(busy) return;
  const raw = input.value.trim();
  if(!raw) return;
  addMsg("me", echapper(raw), "me");
  input.value="";
  chipsBox.innerHTML="";
  const text = norm(raw);
  const sc = SCENARIOS[idx];
  const activeChips = pendingFollow ? (pendingFollow.good.followChips || sc.chips) : sc.chips;
  busy=true; input.disabled=true; sendBtn.disabled=true;

  // cadre scolaire : priorité absolue à la sécurité
  const safety = checkSafety(text);
  if(safety === "suicide"){
    addMsg("Système", "💬 Ce que vous écrivez semble important. Si vous traversez un moment difficile, parlez-en à l'adulte présent dans la salle, ou à un adulte de confiance. Vous pouvez aussi appeler le <b>3114</b> (prévention du suicide, gratuit, 24 h/24) ou <b>Fil Santé Jeunes</b> au <b>0 800 235 236</b> (gratuit et anonyme). En cas de danger immédiat : <b>112</b>, ou <b>114</b> par SMS.", "sys care");
    setTimeout(()=>{ alberteSay([pickVariant(RETRY_VARIANTS)], ()=>{ showChips(activeChips); unlock(); }); }, 600);
    return;
  }
  if(safety === "violent"){
    alberteSay(["Ce n'est pas ainsi qu'on agit, même dans une guerre aussi dure que celle-ci. La violence gratuite n'est pas notre chemin, et ce n'est pas ce que je vous ai demandé."], ()=>{
      showChips(activeChips); unlock();
    });
    return;
  }

  // en attente d'explications pour prendre puis envoyer une photo
  if(pendingPhotoHint){ handlePhotoHint(pendingPhotoHint, text); return; }

  // en attente d'une explication au « pourquoi ? » d'Alberte
  if(pendingFollow){ handleFollow(pendingFollow, text); return; }

  // mots modernes/anglicismes qui doivent perturber Alberte
  const ana = checkAnachronism(text);
  if(ana){
    alberteSay([ana], ()=>{ showChips(activeChips); unlock(); });
    return;
  }

  // gag : un « bouton » évoque d'abord à Alberte un bouton de réglage qui tourne, tant que ce n'est pas précisé
  if(sc.gag && !buttonConfusionShown && hit(text,["bouton"]) && !hit(text, sc.gag.excludeKw)){
    buttonConfusionShown = true;
    const imgHtml = '<img src="'+sc.gag.img+'" alt="'+sc.gag.alt+'" style="max-width:170px;display:block;margin:2px auto 10px;border-radius:10px;border:1px solid #4a3c28">';
    alberteSay([imgHtml + sc.gag.reply], ()=>{
      showChips(sc.chips); unlock();
    });
    return;
  }

  // scénario à consignes multiples : chaque partie doit être traitée avant de valider
  if(sc.good.parts){ handleParts(sc, text); return; }

  // bon réflexe, mauvais réflexe, hors-sujet ou incompris (voir classer())
  const extra = (failCount > 0 && sc.good.retryKw) ? sc.good.retryKw : [];
  const verdict = classer(sc, text, extra);

  // insistance après un premier mauvais réflexe déjà signalé : le risque grandit encore, sans qu'Alberte se déjuge
  if(verdict === "bad" && failCount > 0 && sc.bad.insistKw && hit(text, sc.bad.insistKw)){
    updateRisk(18);
    addMsg("Alerte", "⚠️ <b>Elle insiste…</b> Ce choix reste tout aussi dangereux. Le risque grandit encore.", "sys danger");
    if(riskScore >= 100){ setTimeout(loseGame, 600); return; }
    setTimeout(()=>{ reprompt(sc, RETRY_VARIANTS); }, 500);
    return;
  }

  if(verdict === "good") reactGood(sc, text);
  else if(verdict === "bad") reactBad(sc, text);
  else reprompt(sc, UNKNOWN_VARIANTS);
}

/* --- Scénario à consignes multiples (ex. luminosité + son) : valide partie par partie --- */
function handleParts(sc, text){
  const parts = sc.good.parts;
  const newlyDone = parts.filter(p => !p.done && hit(text, p.kw));
  if(newlyDone.length === 0){
    reprompt(sc, UNKNOWN_VARIANTS, (parts.find(p => !p.done) || {}).chips);
    return;
  }
  newlyDone.forEach(p => p.done = true);
  const stillMissing = parts.filter(p => !p.done);
  if(stillMissing.length === 0){ reactGood(sc, text); return; }
  failCount = 0;
  const lines = [newlyDone.map(p => p.ack).join(" "), stillMissing.map(p => p.missing).join(" ")];
  alberteSay(lines, ()=>{ showChips(stillMissing[0].chips || sc.chips); unlock(); });
}

function reactGood(sc, text){
  failCount = 0;
  updateRisk(-6);
  const echo = findHistEcho(text);
  const lines = echo ? [echo, sc.good.reply] : [sc.good.reply];

  // scénario avec relance « pourquoi ? » : Alberte demande une explication avant d'être convaincue
  if(sc.good.followKw){
    pendingFollow = sc;
    alberteSay(lines, ()=>{
      showChips(sc.good.followChips || []);
      unlock();
    });
    return;
  }
  alberteSay(lines, ()=>{
    if(sc.id === "profil") setAvatarAnon();
    addMsg("note", '<span class="note-h">'+sc.note.h+'</span>'+sc.note.t, "note");
    if(sc.type === "finale") showEndChip(); else setTimeout(nextScenario, 900);
  });
}

function handleFollow(sc, text){
  const chips = sc.good.followChips || [];
  /* Question à choix (la prise) : une bonne réponse, des mauvaises. Sinon
     (le « pourquoi ? » de la photo) : une explication attendue. */
  const choix = sc.good.followWrongKw ? classerChoix(sc, text) : (hit(text, sc.good.followKw) ? "right" : "none");
  if(choix === "right"){
    pendingFollow = null;
    failCount = 0;
    alberteSay([sc.good.followReply], ()=>{
      addMsg("note", '<span class="note-h">'+sc.note.h+'</span>'+sc.note.t, "note");
      setTimeout(nextScenario, 900);
    });
    return;
  }
  if(choix === "none" && sc.good.hintKw && hit(text, sc.good.hintKw)){
    if(sc.good.photoParts){
      pendingPhotoHint = sc;
      sc.good.photoParts.forEach(p => p.done = false);
      alberteSay([sc.good.hintAsk], ()=>{
        showChips(sc.good.photoParts[0].chips || []);
        unlock();
      });
    } else {
      alberteSay([sc.good.hintReply], ()=>{ showChips(chips); unlock(); });
    }
    return;
  }
  if(choix === "both"){
    alberteSay(["Une seule, voyons ! Si j'essaie les deux, je risque de tout faire sauter. Laquelle ?"], ()=>{ showChips(chips); unlock(); });
    return;
  }
  if(choix === "wrong"){
    // mauvaise prise : c'est une vraie erreur, elle coûte du risque
    if(sc.good.followRetryRisk) updateRisk(sc.good.followRetryRisk);
    failCount++;
    alberteSay([sc.good.followRetry], ()=>{
      if(sc.good.followRetryRisk){
        addMsg("Alerte", "⚠️ <b>Mauvaise prise.</b> Forcer la mauvaise fiche risquerait de tout faire sauter — le risque grandit.", "sys danger");
      }
      if(riskScore >= 100){ setTimeout(loseGame, 600); return; }
      showChips(chips);
      unlock();
    });
    return;
  }
  /* Rien de reconnu : pas de risque, mais l'indice et le garde-fou
     anti-blocage s'appliquent aussi ici. Avant, un groupe pouvait rester
     indéfiniment sur le « pourquoi ? » de la photo. */
  if(guardOrRetry(sc)) return;
  let msg = sc.good.followAgain || "Je ne saisis pas encore bien… qu'est-ce que cette photographie pourrait révéler à l'ennemi ?";
  if(failCount >= HINT_AFTER) msg += "  Un indice : " + sc.note.t;
  alberteSay([msg], ()=>{ showChips(chips); unlock(); });
}

/* --- Sous-étape « recharge » : expliquer comment prendre puis envoyer la photo de la prise --- */
function handlePhotoHint(sc, text){
  const parts = sc.good.photoParts;
  const newlyDone = parts.filter(p => !p.done && hit(text, p.kw));
  if(newlyDone.length === 0){ reprompt(sc, UNKNOWN_VARIANTS, (parts.find(p => !p.done) || {}).chips); return; }
  newlyDone.forEach(p => p.done = true);
  const stillMissing = parts.filter(p => !p.done);
  failCount = 0;
  if(stillMissing.length){
    const lines = [newlyDone.map(p => p.ack).join(" "), stillMissing.map(p => p.missing).join(" ")];
    alberteSay(lines, ()=>{ showChips(stillMissing[0].chips || []); unlock(); });
    return;
  }
  pendingPhotoHint = null;
  const lines = [newlyDone.map(p => p.ack).join(" "), sc.good.hintReply];
  alberteSay(lines, ()=>{
    showChips(sc.good.followChips || []);
    unlock();
  });
}

function reactBad(sc, text){
  updateRisk(14);
  const echo = findHistEcho(text);
  const lines = echo ? [echo, sc.bad.reply] : [sc.bad.reply];
  alberteSay(lines, ()=>{
    addMsg("Alerte", "⚠️ <b>Mauvais réflexe.</b> " + (sc.bad.alertText || "Reconseillez Alberte pour la protéger."), "sys danger");
    if(riskScore >= 100){ setTimeout(loseGame, 600); return; }
    setTimeout(()=>{ reprompt(sc, RETRY_VARIANTS); }, 800);
  });
}

function unlock(){
  busy=false; input.disabled=false; sendBtn.disabled=false; input.focus();
}

function nextScenario(){
  idx++;
  if(idx >= SCENARIOS.length){ endGame(); return; }
  updateProgress();
  saveState();
  setTimeout(loadScenario, 700);
}

function endGame(){
  input.disabled=true; sendBtn.disabled=true;
  updateProgress();
  clearSavedState();
  $("scoreBox").innerHTML = "Niveau de risque final : <b>" + riskScore + "%</b>";
  $("win").classList.remove("hidden");
}

/* --- Défaite : le risque a atteint 100%, il faut recommencer --- */
function loseGame(){
  busy = true; input.disabled = true; sendBtn.disabled = true;
  clearSavedState();
  $("loseScore").innerHTML = "Niveau de risque final : <b>" + riskScore + "%</b>";
  $("lose").classList.remove("hidden");
}

/* --- Proposer la reprise si une partie était en cours --- */
(function initResume(){
  const saved = loadSavedState();
  if(saved){
    const btn = $("resumeBtn");
    btn.textContent = "↻ Reprendre à l'étape " + (saved.idx+1) + "/" + SCENARIOS.length;
    btn.classList.remove("hidden");
  }
})();

/* --- Entrée clavier --- */
input.addEventListener("keydown", e=>{ if(e.key==="Enter") handleSend(); });
