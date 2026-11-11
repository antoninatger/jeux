/* =========================================================================
   Agorateur — la voix : les personnages parlent, le joueur répond à l'oral.

   Tout passe par le navigateur, sans serveur ni clé :
   - la synthèse vocale (speechSynthesis) existe partout, Firefox compris.
     La voix dépend de l'appareil : on choisit la meilleure disponible dans
     la langue du jeu, et chaque personnage a sa hauteur et son débit ;
   - la reconnaissance vocale (SpeechRecognition) existe sur Chrome, Edge et
     Safari, pas sur Firefox. Sans elle, le mode « À l'oral » est masqué.
     Sur Chrome, l'audio est transcrit par les serveurs de Google : l'accueil
     le signale quand on choisit ce mode.

   Ce fichier est commun au français et à l'anglais : app.js et app-en.js
   l'appellent aux mêmes endroits, ses textes sont dans les dictionnaires
   d'index.html (I18N.t).
   ========================================================================= */
const Voix = (function(){
  const synth = window.speechSynthesis || null;
  const Reco = window.SpeechRecognition || window.webkitSpeechRecognition || null;
  const t = k => (window.I18N ? I18N.t(k) : k);
  const lang = () => (window.I18N && I18N.lang === "en" ? "en" : "fr");
  const CLE = "arene.voix";

  // ─── Interrupteur « voix des personnages », mémorisé ───
  let actif = false;
  try { actif = localStorage.getItem(CLE) === "1"; } catch(e) {}
  function setActif(v){
    actif = !!v;
    try { localStorage.setItem(CLE, actif ? "1" : "0"); } catch(e) {}
    if (!actif) taire();
    document.querySelectorAll(".voix-bascule").forEach(majBascule);
    const c = document.getElementById("voix-perso"); if (c) c.checked = actif;
  }

  // ─── Le choix des voix ───
  // Chaque personnage est repéré par son emoji, identique en français et en
  // anglais. h/f : la voix cherchée ; p : la hauteur ; r : le débit.
  const PROFILS = {
    "🍗": {g:"h", p:0.8,  r:0.92},  // Tonton Gérard : grave, posé
    "🤳": {g:"h", p:1.3,  r:1.15},  // Maxx_Buzz : aigu, pressé
    "🏛️": {g:"h", p:0.65, r:0.86},  // Sénateur Brutus : solennel
    "🕵️": {g:"h", p:1.0,  r:1.08},  // Le Complotiste : fébrile
    "👔": {g:"f", p:1.05, r:1.0},   // La Directrice : assurée
    "🧑‍🦳": {g:"h", p:0.55, r:0.8}, // Sensei Kakasophe : lent, très grave
    "🥷": {g:"h", p:0.9,  r:1.0}    // Sophisuke
  };
  const FEM = /hortense|julie|denise|am[eé]lie|audrey|marie|aur[eé]lie|virginie|c[eé]leste|[eé]lo[iï]se|brigitte|sylvie|jos[eé]phine|yvette|coralie|jacqueline|ariane|vivienne|charline|chantal|sabine|female|femme|zira|hazel|susan|libby|sonia|maisie|mia|aria|jenny|emma|samantha|karen|moira|tessa|fiona|serena|kate|victoria|allison|ava|joanna|amy|salli|kimberly|google fran[cç]ais|google uk english female|google us english/i;
  const MASC = /paul|henri|claude|thomas|nicolas|j[eé]r[oô]me|alain|r[eé]my|yves|g[eé]rard|maurice|guillaume|antoine|fabrice|jean|daniel|david|mark|george|ryan|guy|alex\b|fred|arthur|oliver|eric|christopher|brian|roger|steffan|male|homme/i;
  function genre(v){ const n = v.name || ""; if (/female/i.test(n)) return "f"; if (MASC.test(n)) return "h"; if (FEM.test(n)) return "f"; return "?"; }
  function qualite(v){
    const n = v.name || ""; let s = 0;
    if (/natural|neural|online/i.test(n)) s += 4;
    if (/premium|enhanced|améliorée|amelioree/i.test(n)) s += 3;
    if (/google/i.test(n)) s += 2;
    if (v.localService === false) s += 1;
    const l = (v.lang || "").toLowerCase();
    if (l === (lang() === "fr" ? "fr-fr" : "en-gb") || l === (lang() === "fr" ? "fr_fr" : "en-us")) s += 1;
    return s;
  }
  let voixDispo = [];
  function chargerVoix(){
    if (!synth) return;
    const code = lang();
    voixDispo = synth.getVoices().filter(v => (v.lang || "").toLowerCase().replace("_","-").startsWith(code))
      .sort((a,b) => qualite(b) - qualite(a));
  }
  if (synth) { chargerVoix(); if ("onvoiceschanged" in synth) synth.addEventListener("voiceschanged", chargerVoix); }
  // Plusieurs personnages du même genre : on répartit les voix disponibles
  // pour qu'ils ne parlent pas tous pareil.
  const RANG = {"🍗":0, "🤳":1, "🏛️":2, "🕵️":3, "🧑‍🦳":4, "🥷":5, "👔":0};
  function voixPour(perso){
    if (!voixDispo.length) chargerVoix();
    const prof = PROFILS[perso && perso.emoji] || {g:"?", p:1, r:1};
    let pool = voixDispo.filter(v => genre(v) === prof.g);
    if (!pool.length) pool = voixDispo;
    if (!pool.length) return {voix:null, prof:prof};
    // Les voix de meilleure qualité d'abord ; on n'en garde que les deux
    // meilleures pour ne pas tomber sur une voix de secours très robotique.
    const top = pool.filter(v => qualite(v) >= qualite(pool[0]) - 1).slice(0, 2);
    const v = top[(RANG[perso && perso.emoji] || 0) % top.length];
    return {voix:v, prof:prof};
  }

  // ─── Parler ───
  // citations : ne dire que ce qui est entre guillemets (une narration comme
  // « Gérard croise les bras : « … » » ne se lit pas avec la voix du personnage).
  function nettoyer(s){
    return String(s).replace(/<[^>]+>/g, " ")
      .replace(/\p{Extended_Pictographic}|️|‍/gu, " ")
      .replace(/[«»“”"]/g, " ").replace(/(^|\s)'|'(\s|$)/g, "$1$2").replace(/\s+/g, " ").trim();
  }
  function extraireCitations(s){
    const m = String(s).match(/«[^»]+»|“[^”]+”/g);
    if (m) return m.join(" … ");
    // L'anglais cite entre apostrophes droites : 'Oh, listen to you!'
    const a = [...String(s).matchAll(/(?:^|[\s:])'(.+?)'(?=\s|$|[.,;!?)])/g)].map(x => x[1]);
    return a.join(" … ");
  }
  let parle = null;
  function dire(texte, perso, opts){
    if (!actif || !synth || !texte) return false;
    const brut = opts && opts.citations ? extraireCitations(texte) : texte;
    const phrase = nettoyer(brut);
    if (!phrase) return false;
    taire();
    const u = new SpeechSynthesisUtterance(phrase);
    const c = voixPour(perso);
    if (c.voix) { u.voice = c.voix; u.lang = c.voix.lang; } else u.lang = lang() === "fr" ? "fr-FR" : "en-GB";
    u.pitch = c.prof.p; u.rate = c.prof.r;
    u.onend = u.onerror = () => {
      const fini = parle === u;
      if (fini) { parle = null; document.body.classList.remove("voix-parle"); }
      // fin : prévenir l'appelant (la tirade en direct enchaîne sur la phrase suivante).
      if (fini && opts && opts.fin) opts.fin();
    };
    parle = u;
    document.body.classList.add("voix-parle");
    // Chrome ignore parfois un speak() lancé juste après cancel().
    setTimeout(() => { if (parle === u) synth.speak(u); }, 60);
    return true;
  }
  function taire(){
    parle = null;
    document.body.classList.remove("voix-parle");
    if (synth && (synth.speaking || synth.pending)) synth.cancel();
  }

  // ─── Le bouton 🔊 / 🔇 dans la bulle du personnage ───
  let dernier = null;
  function majBascule(b){
    b.textContent = actif ? "🔊" : "🔇";
    b.setAttribute("aria-pressed", actif ? "true" : "false");
    const l = t(actif ? "voixCouper" : "voixActiver");
    b.title = l; b.setAttribute("aria-label", l);
  }
  function bascule(){
    if (!synth) return null;
    const b = document.createElement("button");
    b.type = "button"; b.className = "voix-bascule";
    majBascule(b);
    b.onclick = () => { setActif(!actif); if (actif && dernier) dire(dernier.texte, dernier.perso, dernier.opts); };
    return b;
  }
  // La réplique du personnage : on la dit et on garde de quoi la redire.
  function replique(texte, perso, opts){
    dernier = {texte:texte, perso:perso, opts:opts};
    dire(texte, perso, opts);
  }

  // ─── Écouter le joueur ───
  function micDispo(){ return !!Reco && window.isSecureContext !== false; }
  function modeOral(){ const r = document.querySelector('input[name="mode"]:checked'); return !!r && r.value === "voix" && micDispo(); }
  let ecoute = null;
  // Lance une écoute ; rappel(alternatives) reçoit les transcriptions
  // possibles, de la plus probable à la moins probable.
  function ecouter(bouton, msg, rappel){
    if (ecoute) { try { ecoute.stop(); } catch(e) {} return; }
    taire();
    const r = new Reco();
    r.lang = lang() === "fr" ? "fr-FR" : "en-US";
    r.interimResults = true; r.maxAlternatives = 5; r.continuous = false;
    let fini = false, provisoire = "";
    const etat = (texte) => { if (msg) msg.textContent = texte; };
    bouton.classList.add("ecoute"); bouton.setAttribute("aria-pressed", "true");
    etat(t("voixEcoute"));
    r.onresult = e => {
      const res = e.results[e.results.length - 1];
      if (!res.isFinal) { provisoire = res[0].transcript; etat("🎙️ « " + provisoire + " »"); return; }
      fini = true;
      const alts = []; for (let i = 0; i < res.length; i++) alts.push(res[i].transcript);
      rappel(alts);
    };
    r.onerror = e => {
      fini = true;
      etat(e.error === "not-allowed" || e.error === "service-not-allowed" ? t("voixRefus")
         : e.error === "no-speech" ? t("voixRien")
         : e.error === "aborted" ? "" : t("voixPanne"));
    };
    r.onend = () => {
      ecoute = null;
      bouton.classList.remove("ecoute"); bouton.setAttribute("aria-pressed", "false");
      // Un résultat seulement provisoire : on le prend tel quel.
      if (!fini) { if (provisoire) rappel([provisoire]); else etat(t("voixRien")); }
    };
    ecoute = r;
    try { r.start(); } catch(e) { ecoute = null; bouton.classList.remove("ecoute"); etat(t("voixPanne")); }
  }
  function arreterEcoute(){ if (ecoute) { try { ecoute.abort(); } catch(e) {} ecoute = null; } }
  const sansGuillemets = x => String(x).replace(/[«»“”"]/g, "").replace(/\s+/g, " ").trim();
  function boutonMicro(){
    const b = document.createElement("button");
    b.type = "button"; b.className = "voix-micro";
    b.textContent = t("voixMicro");
    b.setAttribute("aria-pressed", "false");
    return b;
  }

  // ─── Rapprocher ce qui a été dit d'une liste de réponses ───
  const VIDES = new Set(("le la les un une des de du d l a au aux et ou en est c ce ces cette que qui quoi je tu il elle on nous vous ils elles me te se ne pas y "+
    "mon ma mes ton ta tes son sa ses pour par sur dans avec mais donc the a an of to and or is it you i we he she they that this in on for with be are").split(" "));
  function mots(s){
    return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, " ").split(" ").filter(w => w.length > 1 && !VIDES.has(w));
  }
  function rapprocher(alts, textes){
    // Pour chaque réponse, le meilleur score sur toutes les transcriptions.
    const scores = textes.map(tx => {
      const c = new Set(mots(tx)); let best = 0;
      if (!c.size) return 0;
      alts.forEach(dit => {
        const d = new Set(mots(dit)); if (!d.size) return;
        let commun = 0; d.forEach(w => { if (c.has(w)) commun++; });
        // On peut ne lire que le début d'une réponse : la précision compte plus.
        const s = commun ? (commun / d.size) * 0.7 + (commun / c.size) * 0.3 : 0;
        if (s > best) best = s;
      });
      return best;
    });
    const tri = scores.map((s, i) => [s, i]).sort((x, y) => y[0] - x[0]);
    const premier = tri[0] || [0, -1], second = tri[1] || [0, -1];
    return (premier[0] >= 0.34 && premier[0] - second[0] >= 0.08) ? premier[1] : -1;
  }

  // ─── Les branchements, appelés par app.js / app-en.js ───
  // 1. La saisie libre du nom du sophisme : le micro remplit le champ.
  const VALABLE = /\b(bon argument|argument valable|valable|pas de piege|aucun piege|pas un piege|good argument|sound argument|valid|no trap|fair point)\b/;
  const PASSE = /\b(je ne sais pas|je sais pas|sais pas|passe|aucune idee|i don ?t know|no idea|pass|skip)\b/;
  function brancherSaisie(form, input, ids){
    if (!modeOral()) return;
    const msg = form.querySelector(".saisie-msg");
    const b = boutonMicro();
    form.insertBefore(b, form.firstChild);
    b.onclick = () => ecouter(b, msg, alts => {
      const plat = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’']/g, " ");
      const val = form.querySelector(".saisie-valable"), passe = form.querySelector(".saisie-passe");
      const reconnu = alts.find(a => typeof reconnaitre === "function" && reconnaitre(a, ids));
      if (reconnu) { input.value = reconnu.trim(); input.dataset.oral = "1"; form.requestSubmit ? form.requestSubmit() : form.querySelector('[type="submit"]').click(); return; }
      if (val && alts.some(a => VALABLE.test(plat(a)))) { val.click(); return; }
      if (passe && alts.some(a => PASSE.test(plat(a)))) { passe.click(); return; }
      input.value = alts[0].trim();
      msg.textContent = t("voixPasCompris").replace("{x}", sansGuillemets(alts[0]));
    });
    setTimeout(() => b.focus({preventScroll:true}), 0);
  }
  // 2. Une liste de réponses (que réponds-tu ? / qu'est-ce qui le motive ?) :
  //    on lit sa réponse à voix haute, le jeu retrouve laquelle.
  function brancherBoutons(dans, boutons){
    if (!modeOral() || !boutons.length) return;
    const zone = document.createElement("div"); zone.className = "voix-zone";
    const b = boutonMicro(); b.textContent = t("voixMicroLire");
    const msg = document.createElement("p"); msg.className = "saisie-msg"; msg.setAttribute("aria-live", "polite");
    zone.append(b, msg);
    dans.appendChild(zone);
    setTimeout(() => b.focus({preventScroll:true}), 400);
    b.onclick = () => ecouter(b, msg, alts => {
      const i = rapprocher(alts, boutons.map(x => x.textContent));
      if (i < 0 || boutons[i].disabled) { msg.textContent = t("voixPasCompris").replace("{x}", sansGuillemets(alts[0])); return; }
      msg.textContent = t("voixReconnu").replace("{x}", sansGuillemets(alts[0]));
      b.disabled = true;
      boutons[i].click();
    });
  }

  // ─── L'accueil : l'interrupteur et le mode « À l'oral » ───
  function monterAccueil(){
    const c = document.getElementById("voix-perso");
    if (c) {
      if (!synth) c.closest("label").hidden = true;
      c.checked = actif;
      c.addEventListener("change", () => { setActif(c.checked); if (c.checked) { const u = new SpeechSynthesisUtterance(t("voixEssai")); u.lang = lang() === "fr" ? "fr-FR" : "en-GB"; if (voixDispo[0]) u.voice = voixDispo[0]; taire(); synth.speak(u); } });
    }
    const oral = document.querySelector('input[name="mode"][value="voix"]');
    const note = document.getElementById("voix-note");
    if (oral && !micDispo()) {
      oral.closest("label").hidden = true;
      // app.js restaure le mode mémorisé après ce script : on corrige une fois la page chargée.
      const repli = () => { if (oral.checked) { const s = document.querySelector('input[name="mode"][value="saisie"]'); if (s) s.checked = true; } };
      repli(); window.addEventListener("DOMContentLoaded", repli);
    }
    const majNote = () => { if (note) note.hidden = !(oral && oral.checked && micDispo()); };
    document.querySelectorAll('input[name="mode"]').forEach(x => x.addEventListener("change", majNote));
    majNote();
    // Le bouton 🔊 / 🔇 de la bulle, pour couper ou rendre la voix en cours de partie.
    const bulle = document.querySelector("#battle .bubble"), bb = bascule();
    if (bulle && bb) bulle.appendChild(bb);
  }

  return {dire:dire, replique:replique, taire:taire, bascule:bascule, actif:() => actif,
          brancherSaisie:brancherSaisie, brancherBoutons:brancherBoutons,
          arreterEcoute:arreterEcoute, monterAccueil:monterAccueil, micDispo:micDispo};
})();
