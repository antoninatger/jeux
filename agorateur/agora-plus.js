/* =========================================================================
   Agorateur — l'Agora vivante (novembre 2026)

   Quatre ajouts autour du duel de répliques, communs au français et à
   l'anglais (les textes sont dans agora-plus-data.js / agora-plus-data-en.js) :

   1. « Objection ! » (Difficile) : le personnage déroule une tirade bulle par
      bulle, il faut trancher la bulle piégée au passage ;
   2. Trancher le piège (Facile) : la même tirade, affichée d'un coup, et l'on
      tranche d'un geste (ou l'on touche) la bulle qui cloche… ou « Rien à
      redire ». Le geste est celui des feuilles du dojo ;
   3. La foule : un public qui applaudit les sophismes du personnage et revient
      vers toi quand tu discutes honnêtement ;
   4. Une conversation qui bifurque : l'humeur du personnage change avec tes
      réponses, se voit, et décide de la réplique suivante ;
   5. Le plaidoyer : à la fin de chaque discussion, c'est toi qui dois
      convaincre, sans sophisme. Chaque sophisme glissé est pénalisé.

   Ce fichier s'appuie sur l'état et les fonctions d'app.js / app-en.js
   (foeIdx, lineIdx, order, youHP, ouverture, revision, phase, answer…), qui
   l'appellent à quelques endroits marqués « AgoraPlus. ».
   ========================================================================= */
const AgoraPlus = (function(){
  // AGORA_PLUS vient d'agora-plus-data(-en).js, chargé juste avant : un const
  // de haut niveau n'est pas une propriété de window.
  const D = (typeof AGORA_PLUS !== "undefined") ? AGORA_PLUS : {textes:{}, retorques:{}, persos:{}};
  const T = D.textes;
  const el = id => document.getElementById(id);
  const au = tab => tab[Math.floor(Math.random()*tab.length)];
  const melange = a => { a = [...a]; for (let i = a.length-1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]] = [a[j],a[i]]; } return a; };
  const perso = foe => foe && D.persos[foe.emoji];
  // Les sophismes « d'attaque » : ceux qu'un personnage braqué sort en premier.
  const ATTAQUES = ["adhom", "whatabout", "paille", "dilemme", "pente", "pathos"];

  let humeur = 0, foule = 5, prefixe = null, jeton = 0, minuteur = null, pl = null;
  let stats = {repere:0, fausse:0, bons:0, pieges:0, fouleGagnee:0, matchs:0};

  function arreter(){ jeton++; clearTimeout(minuteur); minuteur = null; }

  const calme = () => !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  // Laisse le temps de voir un effet (une bulle tranchée, un tampon) avant la suite.
  function apres(ms, fn){ const j = jeton; if (calme()) { fn(); return; } setTimeout(() => { if (j === jeton) fn(); }, ms); }

  // ─── La foule ───
  // Dix spectateurs entre toi (à gauche) et le personnage (à droite) : ils
  // changent de camp en traversant, et leurs réactions s'envolent au-dessus.
  function monterFoule(){
    let f = el("foule");
    if (!f) {
      f = document.createElement("div"); f.id = "foule";
      f.innerHTML = '<p class="foule-titre"></p><div class="foule-rang" aria-hidden="true"><span class="foule-camp foule-toi"></span><div class="foule-gens"><i class="foule-ligne"></i></div><span class="foule-camp foule-lui"></span></div><p class="foule-reaction" aria-live="polite"></p>';
      el("vs").after(f);
      const g = f.querySelector(".foule-gens");
      for (let i = 0; i < 10; i++) { const s = document.createElement("span"); s.className = "foule-p"; g.appendChild(s); }
    }
    return f;
  }
  function dessinerFoule(){
    const f = monterFoule(), foe = foeActuel();
    f.hidden = !!revision;
    f.querySelector(".foule-titre").textContent = T.foule + " · " + T.fouleAvec.replace("{x}", foule);
    f.querySelector(".foule-toi").textContent = window.Avatar ? Avatar.emoji() : "🙋";
    if (foe) f.querySelector(".foule-lui").replaceChildren(persoNoeud(foe));
    // 10 places de 8 % ; le vide de 20 % qui sépare les deux camps se déplace avec le score.
    f.querySelectorAll(".foule-p").forEach((s, i) => {
      const avec = i < foule, avant = s.dataset.camp;
      s.style.left = (avec ? i * 8 : 20 + i * 8) + "%";
      s.textContent = avec ? "🙋" : "🧍";
      s.classList.toggle("avec", avec);
      if (avant && avant !== String(avec)) { s.classList.remove("saute"); void s.offsetWidth; s.classList.add("saute"); }
      s.dataset.camp = String(avec);
    });
    f.querySelector(".foule-ligne").style.left = (foule * 8 + 10) + "%";
  }
  function eclats(emoji){
    if (calme() || revision) return;
    const g = monterFoule().querySelector(".foule-gens");
    for (let k = 0; k < 6; k++) {
      const e = document.createElement("span"); e.className = "foule-eclat"; e.textContent = emoji;
      e.style.left = (8 + Math.random() * 84) + "%"; e.style.animationDelay = (Math.random() * 0.35) + "s";
      g.appendChild(e); setTimeout(() => e.remove(), 1700);
    }
  }
  function bougerFoule(d, msg){
    foule = Math.max(0, Math.min(10, foule + d));
    dessinerFoule();
    if (msg) {
      const r = monterFoule().querySelector(".foule-reaction");
      r.textContent = msg; r.classList.remove("vu"); void r.offsetWidth; r.classList.add("vu");
      const m = msg.match(/\p{Extended_Pictographic}/u); if (m) eclats(m[0]);
    }
  }

  // ─── L'humeur du personnage ───
  // Cinq visages, de braqué à en confiance : celui du moment est mis en avant.
  function dessinerHumeur(){
    const f = el("f-foe"); if (!f) return;
    let b = el("humeur");
    if (!b) {
      b = document.createElement("div"); b.id = "humeur"; b.className = "humeur";
      b.innerHTML = '<div class="humeur-visages" aria-hidden="true"></div><div class="humeur-mot"></div>';
      (T.humeur || []).forEach(h => { const v = document.createElement("span"); v.textContent = h.split(" ")[0]; b.firstChild.appendChild(v); });
      el("foe-title").after(b);
    }
    b.hidden = !!revision;
    const foe = foeActuel();
    const h = (T.humeur || [])[humeur + 2] || "";
    [...b.firstChild.children].forEach((v, i) => v.classList.toggle("ici", i === humeur + 2));
    b.lastChild.textContent = h.replace(/^\S+\s/, "");
    b.setAttribute("role", "img");
    b.setAttribute("aria-label", (T.humeurLabel || "").replace("{n}", foe ? foe.name : "").replace("{h}", h));
    f.classList.remove("humeur-m2", "humeur-m1", "humeur-0", "humeur-p1", "humeur-p2");
    f.classList.add("humeur-" + (humeur < 0 ? "m" + (-humeur) : humeur > 0 ? "p" + humeur : "0"));
  }

  // ─── Début d'une discussion ───
  function debutMatch(foe){
    arreter();
    if (foeIdx === 0 && !revision) stats = {repere:0, fausse:0, bons:0, pieges:0, fouleGagnee:0, matchs:0};
    humeur = 0; foule = 5; prefixe = null; pl = null;
    dessinerFoule(); dessinerHumeur(); dessinerPions();
    const r = monterFoule().querySelector(".foule-reaction"); r.textContent = ""; r.classList.remove("vu");
  }

  // ─── Une réplique : la tirade, en direct ou à surligner ───
  function zoneTirade(){
    let z = el("tirade");
    if (!z) { z = document.createElement("div"); z.id = "tirade"; el("btxt").before(z); }
    return z;
  }
  function debutReplique(line, suite){
    arreter();
    line.repere = false;
    const foe = line.foe || foeActuel(), P = perso(foe);
    const pre = prefixe; prefixe = null;
    const z = zoneTirade(); z.innerHTML = ""; z.className = "";
    el("btxt").hidden = false;
    dessinerHumeur();
    if (line.type === "fall" || (line.type === "epl" && line.a !== "logos")) bougerFoule(-1, T.fouleSeduite.replace("{n}", foe.name));
    // Pas de tirade pour les ressorts (ethos, pathos, logos), ni en révision.
    if (revision || line.type === "epl" || !P) {
      if (pre && !revision) { const p = document.createElement("p"); p.className = "tirade-pre"; p.textContent = pre; z.appendChild(p); }
      Voix.replique((pre && !revision ? pre + " " : "") + line.t, foe);
      return false;
    }
    const phrases = melange(P.remplissage).slice(0, 2).map(t => ({t:t}));
    phrases.splice(Math.floor(Math.random()*3), 0, {t:line.t, cible:true});
    if (pre) phrases.unshift({t:pre});
    el("btxt").hidden = true; el("piste").hidden = true;
    el("answers").innerHTML = "";
    (modeDifficile() ? objection : surligner)(line, phrases, foe, suite);
    return true;
  }
  // La tirade se referme : les autres phrases restent en contexte, la
  // phrase piégée (ou valable) reprend sa place dans la bulle.
  function montrerCible(phrases){
    const z = zoneTirade(); z.innerHTML = ""; z.className = "contexte";
    const autres = phrases.filter(p => !p.cible);
    if (autres.length) {
      const t = document.createElement("p"); t.className = "tirade-titre"; t.textContent = T.contexte; z.appendChild(t);
      autres.forEach(p => { const x = document.createElement("p"); x.className = "tirade-ctx"; x.textContent = p.t; z.appendChild(x); });
    }
    el("btxt").hidden = false;
  }
  function souffle(txt){ const s = el("souffle"); s.hidden = !txt; s.textContent = txt || ""; }
  // Conclure sans passer par le choix du sophisme : un argument valable bien
  // laissé passer, une objection contre un bon argument, un piège manqué.
  function conclure(line, phrases, id, prefixeTitre){
    arreter(); Voix.taire();
    const o = document.querySelector("#answers .objection"); if (o) o.remove();
    montrerCible(phrases);
    el("piste").hidden = false;
    answer(line, id, null);
    el("rip-title").textContent = prefixeTitre + el("rip-title").textContent;
  }
  function fausseAlerte(msg){
    stats.fausse++;
    youHP = Math.max(0, youHP - 1); updateHP();
    el("f-you").classList.add("shake"); setTimeout(() => el("f-you").classList.remove("shake"), 450);
    souffle(msg);
    bougerFoule(-1, T.fouleSiffle);
  }
  function repere(line, phrases, suite, vite){
    arreter(); Voix.taire();
    stats.repere++; line.repere = true;
    bougerFoule(vite ? 2 : 1, T.fouleRevient);
    montrerCible(phrases);
    el("piste").hidden = false;
    souffle(vite ? T.repereVite : T.repere);
    suite();
  }

  // ─── Les bulles et le geste qui tranche ───
  // Comme les feuilles du dojo : on glisse la souris (bouton enfoncé) ou le
  // doigt à travers une bulle, une traînée suit le geste, et la bulle est
  // tranchée quand le trait l'a traversée sur une bonne longueur. Un simple
  // appui (ou Entrée au clavier) marche aussi. Le défilement vertical de la
  // page reste possible au doigt : seul un geste en travers tranche.
  function scene(z, classe){
    z.innerHTML = ""; z.className = classe + " scene";
    const NS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(NS, "svg"); svg.setAttribute("class", "trainee"); svg.setAttribute("aria-hidden", "true");
    const trait = document.createElementNS(NS, "polyline"); svg.appendChild(trait);
    const bulles = document.createElement("div"); bulles.className = "bulles";
    z.append(bulles, svg);
    return {bulles:bulles, trait:trait};
  }
  // Longueur du segment a→b à l'intérieur du rectangle r (découpage de Liang-Barsky).
  function traverse(a, b, r){
    const dx = b.x - a.x, dy = b.y - a.y; let t0 = 0, t1 = 1;
    const bords = [[-dx, a.x - r.left], [dx, r.right - a.x], [-dy, a.y - r.top], [dy, r.bottom - a.y]];
    for (const [p, q] of bords) {
      if (p === 0) { if (q < 0) return 0; continue; }
      const u = q / p;
      if (p < 0) { if (u > t1) return 0; if (u > t0) t0 = u; } else { if (u < t0) return 0; if (u < t1) t1 = u; }
    }
    return (t1 - t0) * Math.hypot(dx, dy);
  }
  // cibles() : les bulles que l'on peut trancher maintenant ; coupe(bulle, angle).
  function geste(z, trait, cibles, coupe){
    let pts = [], actif = false, depart = null, anim = 0, cumul = new Map();
    const local = e => { const r = z.getBoundingClientRect(); return {x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now()}; };
    function dessiner(){
      const now = performance.now();
      pts = pts.filter(p => now - p.t < 200);
      trait.setAttribute("points", pts.map(p => p.x.toFixed(1) + "," + p.y.toFixed(1)).join(" "));
      anim = pts.length ? requestAnimationFrame(dessiner) : 0;
    }
    z.addEventListener("pointerdown", e => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      actif = true; cumul = new Map(); depart = local(e); pts = [depart];
    });
    z.addEventListener("pointermove", e => {
      if (!actif) return;
      const p = local(e), a = pts[pts.length - 1] || p;
      pts.push(p);
      if (!anim) anim = requestAnimationFrame(dessiner);
      const zr = z.getBoundingClientRect();
      for (const b of cibles()) {
        const br = b.getBoundingClientRect();
        const r = {left: br.left - zr.left, right: br.right - zr.left, top: br.top - zr.top, bottom: br.bottom - zr.top};
        const d = (cumul.get(b) || 0) + traverse(a, p, r);
        cumul.set(b, d);
        if (d >= Math.min(130, br.width * 0.3)) {
          actif = false;
          // Le clic qui suit le relâchement ne doit pas compter une seconde fois.
          z.dataset.coupe = String(performance.now());
          coupe(b, Math.max(-30, Math.min(30, Math.atan2(p.y - depart.y, p.x - depart.x) * 180 / Math.PI)));
          return;
        }
      }
    });
    const lacher = () => { actif = false; };
    z.addEventListener("pointerup", lacher); z.addEventListener("pointercancel", lacher); z.addEventListener("pointerleave", lacher);
  }
  const vientDeCouper = z => performance.now() - (+z.dataset.coupe || 0) < 450;
  // La bulle tranchée : la moitié haute et la moitié basse s'écartent, une
  // entaille lumineuse marque la coupe.
  function trancher(b, angle){
    const bulles = b.parentNode;
    b.style.setProperty("--coupe", (angle == null ? -4 : angle) + "deg");
    const m = b.cloneNode(true);
    m.classList.add("moitie"); m.removeAttribute("id"); m.setAttribute("aria-hidden", "true"); m.tabIndex = -1; m.disabled = true;
    m.style.top = b.offsetTop + "px"; m.style.left = b.offsetLeft + "px"; m.style.width = b.offsetWidth + "px";
    const e = document.createElement("i"); e.className = "entaille";
    e.style.top = (b.offsetTop + b.offsetHeight * 0.52) + "px"; e.style.left = b.offsetLeft + "px"; e.style.width = b.offsetWidth + "px";
    e.style.setProperty("--coupe", (angle == null ? -4 : angle) + "deg");
    b.classList.add("tranchee");
    bulles.append(m, e);
  }
  // Un tampon qui claque au milieu de la scène : « Objection ! », « Rejetée »…
  function tampon(dans, texte, type){
    if (!texte) return;
    const t = document.createElement("div"); t.className = "tampon " + type; t.textContent = texte; t.setAttribute("aria-hidden", "true");
    dans.appendChild(t);
    setTimeout(() => t.remove(), calme() ? 900 : 1100);
  }
  function refuser(b){ b.classList.remove("non"); void b.offsetWidth; b.classList.add("non", "bad"); }

  // 2. Facile : toutes les bulles sont là, on tranche (ou on touche) celle qui cloche.
  function surligner(line, phrases, foe, suite){
    el("qprompt").textContent = T.reperPrompt;
    const z = zoneTirade(), S = scene(z, "surligner");
    let fini = false;
    const boutons = phrases.map((p, i) => {
      const b = document.createElement("button"); b.type = "button"; b.className = "phrase bulle"; b.textContent = p.t;
      b.style.animationDelay = (i * 0.16) + "s";
      b.onclick = () => { if (!vientDeCouper(z)) choisir(p, b, null); };
      S.bulles.appendChild(b); return b;
    });
    geste(z, S.trait, () => fini ? [] : boutons.filter(b => !b.disabled), (b, angle) => choisir(phrases[boutons.indexOf(b)], b, angle));
    const rien = document.createElement("button"); rien.type = "button"; rien.className = "abtn rien"; rien.textContent = T.rienARedire;
    rien.onclick = () => choisir(null, rien, null);
    const aide = document.createElement("p"); aide.className = "geste-aide"; aide.textContent = T.gesteAide || "";
    el("answers").append(rien, aide);
    Voix.replique(phrases.map(p => p.t).join(" "), foe);
    Voix.brancherBoutons(el("answers"), [...boutons, rien]);
    boutons[0].focus({preventScroll:true});
    function figer(){ fini = true; boutons.forEach(x => x.disabled = true); rien.disabled = true; }
    function choisir(p, b, angle){
      if (fini) return;
      if (p && !p.cible) {
        b.disabled = true; refuser(b);
        fausseAlerte(T.fausseAlerteFacile);
        if (youHP <= 0) { figer(); conclure(line, phrases, "", ""); }
        return;
      }
      figer();
      if (p && p.cible) {
        if (line.type === "sain") { refuser(b); tampon(z, T.tamponRejete, "ko"); apres(750, () => conclure(line, phrases, "", T.objectionSain)); }
        else { trancher(b, angle); tampon(z, T.tamponPiege, "ok"); apres(800, () => repere(line, phrases, suite, false)); }
        return;
      }
      if (line.type === "sain") conclure(line, phrases, "valable", T.laisseOk);
      else {
        // Le piège manqué : on montre un instant la bulle qu'il fallait trancher.
        const c = boutons[phrases.findIndex(x => x.cible)]; if (c) c.classList.add("manquee");
        apres(900, () => conclure(line, phrases, "", T.rate));
      }
    }
  }

  // 1. Difficile : les bulles arrivent une à une ; il faut trancher la bulle
  //    piégée pendant qu'elle est à l'écran (ou crier « Objection ! »).
  function objection(line, phrases, foe, suite){
    el("qprompt").textContent = T.objectionPrompt;
    const z = zoneTirade(), S = scene(z, "direct");
    const b = document.createElement("button"); b.type = "button"; b.className = "objection"; b.textContent = T.objection;
    const aide = document.createElement("p"); aide.className = "geste-aide"; aide.textContent = T.gesteAide || "";
    el("answers").append(b, aide);
    b.focus({preventScroll:true});
    const monJeton = jeton;
    let i = -1, courante = null, debut = 0, duree = 0, ligne = null, fini = false;
    function suivante(attendu){
      if (monJeton !== jeton || attendu !== i || fini) return;
      clearTimeout(minuteur);
      i++;
      if (i >= phrases.length) { courante = null; finTirade(); return; }
      courante = phrases[i];
      // On ne garde que la bulle précédente : la scène ne s'allonge pas, le bouton reste à portée.
      S.bulles.querySelectorAll(".passee").forEach(x => x.remove());
      if (ligne) { ligne.classList.add("passee"); ligne.disabled = true; }
      ligne = document.createElement("button"); ligne.type = "button"; ligne.className = "phrase-direct bulle"; ligne.textContent = courante.t;
      ligne.tabIndex = -1;   // au clavier, c'est le bouton « Objection ! » qui sert
      const moi = ligne;
      ligne.onclick = () => { if (!vientDeCouper(z) && moi === ligne) objecter(null); };
      S.bulles.appendChild(ligne);
      debut = performance.now();
      duree = Math.max(2300, courante.t.length * 62);
      const n = i;
      const parle = Voix.dire(courante.t, foe, {fin: () => { if (monJeton === jeton) minuteur = setTimeout(() => suivante(n), 450); }});
      if (parle) ligne.classList.add("parle");
      else { const barre = document.createElement("i"); barre.className = "barre"; barre.style.animationDuration = duree + "ms"; ligne.appendChild(barre); }
      minuteur = setTimeout(() => suivante(n), parle ? duree * 2 + 3000 : duree);
    }
    function finTirade(){
      fini = true; b.disabled = true;
      if (line.type === "sain") conclure(line, phrases, "valable", T.laisseOk);
      else conclure(line, phrases, "", T.rate);
    }
    function objecter(angle){
      if (!courante || fini || monJeton !== jeton) return;
      if (courante.cible) {
        fini = true; clearTimeout(minuteur); Voix.taire();
        b.disabled = true; ligne.disabled = true;
        const vite = performance.now() - debut < duree * 0.6;
        if (line.type === "sain") { refuser(ligne); tampon(z, T.tamponRejete, "ko"); apres(750, () => { b.remove(); conclure(line, phrases, "", T.objectionSain); }); }
        else { trancher(ligne, angle); tampon(z, T.tamponObjection, "ok"); apres(800, () => { b.remove(); repere(line, phrases, suite, vite); }); }
        return;
      }
      refuser(ligne); tampon(z, T.tamponRejete, "ko");
      fausseAlerte(T.fausseAlerte);
      if (youHP <= 0) { fini = true; b.remove(); conclure(line, phrases, "", ""); }
    }
    b.onclick = () => objecter(null);
    geste(z, S.trait, () => (fini || !ligne) ? [] : [ligne], (x, angle) => objecter(angle));
    suivante(-1);
  }

  // ─── Après les deux temps d'une réplique ───
  function apresAnswer(line, ok){ if (ok && !revision) bougerFoule(1, T.fouleRevient); }
  // 4. La réponse choisie change l'humeur, et l'humeur la suite de la conversation.
  function apresReponse(line, geste){
    if (revision) return;
    const foe = line.foe || foeActuel(), P = perso(foe);
    const bon = geste === "question" || geste === "reformulation";
    if (bon) { humeur = Math.min(2, humeur + 1); bougerFoule(1, T.fouleRevient); }
    else if (geste === "massue") { humeur = Math.max(-2, humeur - 1); bougerFoule(0, T.fouleRit.replace("{n}", foe.name)); }
    else { humeur = Math.max(-2, humeur - 1); bougerFoule(-1, T.fouleEnnui); }
    dessinerHumeur();
    const reste = order.slice(lineIdx + 1);
    if (!reste.length || !P) return;
    const lignes = foeActuel().lines;
    let choisie = null;
    if (humeur < 0) { choisie = reste.find(j => ATTAQUES.includes(lignes[j].a)); prefixe = au(P.braque); }
    else if (bon && humeur > 0) { choisie = reste.find(j => lignes[j].type === "sain" || lignes[j].a === "logos"); prefixe = au(P.ouvert); }
    if (choisie != null) { const k = order.indexOf(choisie); [order[lineIdx+1], order[k]] = [order[k], order[lineIdx+1]]; }
  }

  // ─── 5. Le plaidoyer ───
  function finMatch(){ if (revision) return; stats.matchs++; if (foule >= 5) stats.fouleGagnee++; }
  function boutonComprendre(nb){ const P = perso(foeActuel()); if (!revision && P && P.plaidoyer) nb.textContent = T.convaincreBtn; }
  function plaidoyer(foe){
    const P = perso(foe);
    if (revision || !P || !P.plaidoyer) { finMatch(); return false; }
    phase = "plaidoyer";
    pl = {tour:0, conv:0, fini:false, P:P.plaidoyer, foe:foe, res:[]};
    renderTour();
    return true;
  }
  function preparerScene(){
    document.querySelector("#battle .bubble").hidden = true; el("piste").hidden = true;
    el("dialogue").hidden = true; el("riposte").style.display = "none"; el("nextbtn").style.display = "none";
    el("techs").hidden = true;
    // Le carnet passe sous les cartes : sur téléphone, les arguments restent à portée de pouce.
    el("nextbtn").after(el("carnet"));
    el("qprompt").textContent = "🗣️ " + pl.P.but;
  }
  function renderTour(){
    preparerScene();
    const tour = pl.P.tours[pl.tour];
    el("turn-progress").textContent = T.plaidoyerProgres.replace("{i}", pl.tour + 1).replace("{t}", pl.P.tours.length);
    souffle(T.plaidoyerConsigne);
    dessinerPions();
    const options = melange([...tour.bons.map(o => ({...o, bon:true})), ...tour.pieges.map(o => ({...o, bon:false}))]);
    const ans = el("answers"); ans.innerHTML = "";
    const boutons = options.map((o, k) => {
      const b = document.createElement("button"); b.type = "button"; b.className = "abtn mbtn carte-arg"; b.textContent = o.t;
      b.style.animationDelay = (k * 0.09) + "s";
      b.onclick = () => choisirArgument(o, b, options, boutons);
      ans.appendChild(b); return b;
    });
    Voix.brancherBoutons(ans, boutons);
    boutons[0].focus({preventScroll:true});
    window.scrollTo({top:0, behavior:"smooth"});
  }
  // Trois pions sous le titre : un par argument, vert s'il était honnête, rouge sinon.
  function dessinerPions(){
    let p = el("plaid-pions");
    if (!p) { p = document.createElement("div"); p.id = "plaid-pions"; p.setAttribute("aria-hidden", "true"); el("turn-progress").after(p); }
    p.hidden = !pl;
    if (!pl) return;
    p.innerHTML = "";
    pl.P.tours.forEach((_, k) => {
      const s = document.createElement("span"), r = pl.res[k];
      s.className = r == null ? (k === pl.tour ? "ici" : "") : (r ? "ok" : "ko");
      s.textContent = r == null ? "⚖️" : (r ? "✔" : "✘");
      p.appendChild(s);
    });
  }
  function choisirArgument(o, b, options, boutons){
    const foe = pl.foe;
    pl.res[pl.tour] = !!o.bon; dessinerPions();
    b.dataset.tampon = o.bon ? T.tamponHonnete : T.tamponSophisme;
    b.classList.add("lancee");
    boutons.forEach((x, i) => {
      x.disabled = true;
      const opt = options[i], tag = document.createElement("span"); tag.className = "dtag";
      tag.textContent = opt.bon ? T.tagHonnete : libelle(opt.a).l;
      x.prepend(tag);
      x.classList.add(x === b ? (opt.bon ? "good" : "bad") : "dim");
    });
    const rip = el("riposte"), expl = el("rip-expl");
    rip.style.display = "block"; expl.innerHTML = "";
    const tete = document.createElement("p"), corps = document.createElement("p");
    if (o.bon) {
      pl.conv++; stats.bons++;
      humeur = Math.min(2, humeur + 1); dessinerHumeur();
      bougerFoule(1, T.fouleRevient);
      rip.className = "ok";
      el("rip-title").textContent = T.bonTitre.replace("{n}", foe.name);
      tete.textContent = " " + foe.name + " :"; tete.prepend(persoNoeud(foe));
      corps.textContent = o.r;
      expl.append(tete, corps);
      Voix.dire(o.r, foe, {citations:true});
    } else {
      stats.pieges++;
      youHP = Math.max(0, youHP - 1);
      ouverture = Math.max(0, ouverture - 1);
      updateHP();
      el("f-you").classList.add("shake"); setTimeout(() => el("f-you").classList.remove("shake"), 450);
      humeur = Math.max(-2, humeur - 1); dessinerHumeur();
      bougerFoule(1, T.fouleApplaudit);
      rip.className = "ko";
      el("rip-title").textContent = T.piegeTitre.replace("{l}", libelle(o.a).l.replace(/^\S+\s/, ""));
      tete.textContent = " " + T.piegeDemasque.replace("{n}", foe.name); tete.prepend(persoNoeud(foe));
      corps.textContent = D.retorques[o.a] || "";
      const lecon = document.createElement("p"); lecon.className = "rlecon"; lecon.textContent = T.fouleSophisme;
      expl.append(tete, corps, lecon);
      Voix.dire(D.retorques[o.a] || "", foe, {citations:true});
    }
    const nb = el("nextbtn"); nb.style.display = "block";
    nb.textContent = youHP <= 0 ? T.embarque : (pl.tour + 1 < pl.P.tours.length ? T.suivant : T.plaidoyerFin);
    nb.scrollIntoView({behavior:"smooth", block:"end"}); nb.focus({preventScroll:true});
  }
  function suitePlaidoyer(){
    Voix.taire(); Voix.arreterEcoute();
    if (!pl) { winMatch(); return; }
    if (pl.fini) { finMatch(); pl = null; dessinerPions(); winMatch(); return; }
    pl.tour++;
    if (pl.tour < pl.P.tours.length) { renderTour(); return; }
    pl.fini = true;
    preparerScene(); souffle("");
    el("answers").innerHTML = "";
    const t = pl.P.tours.length, c = pl.conv, n = pl.foe.name;
    const rip = el("riposte"); rip.style.display = "block"; rip.className = c === t ? "ok" : c ? "" : "ko";
    el("rip-title").textContent = (c === t ? T.finParfait : c ? T.finMoyen : T.finRate).replace("{c}", c).replace("{t}", t).replace("{n}", n);
    el("rip-expl").innerHTML = "";
    const nb = el("nextbtn"); nb.style.display = "block";
    nb.textContent = foeIdx === FOES.length - 1 ? T.voirBilan : T.suivantPerso;
    nb.focus({preventScroll:true});
  }

  function bilan(){
    if (!T.bilan || !stats.matchs && !stats.repere && !stats.bons && !stats.pieges) return "";
    return T.bilan.replace("{r}", stats.repere).replace("{fa}", stats.fausse).replace("{b}", stats.bons).replace("{p}", stats.pieges)
      .replace("{f}", stats.fouleGagnee).replace("{m}", stats.matchs);
  }

  return {debutMatch:debutMatch, debutReplique:debutReplique, apresAnswer:apresAnswer, apresReponse:apresReponse,
          plaidoyer:plaidoyer, suitePlaidoyer:suitePlaidoyer, boutonComprendre:boutonComprendre, bilan:bilan, arreter:arreter};
})();
