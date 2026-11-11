/* =========================================================================
   Agorateur — l'Agora vivante (novembre 2026)

   Quatre ajouts autour du duel de répliques, communs au français et à
   l'anglais (les textes sont dans agora-plus-data.js / agora-plus-data-en.js) :

   1. « Objection ! » (Difficile) : le personnage déroule une tirade phrase par
      phrase, il faut l'interrompre au moment où passe le piège ;
   2. Surligner le piège (Facile) : la même tirade, affichée d'un coup, et l'on
      touche la phrase qui cloche… ou « Rien à redire » ;
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

  // ─── La foule ───
  function monterFoule(){
    let f = el("foule");
    if (!f) {
      f = document.createElement("div"); f.id = "foule";
      f.innerHTML = '<p class="foule-titre"></p><div class="foule-gens" aria-hidden="true"></div><p class="foule-reaction" aria-live="polite"></p>';
      el("vs").after(f);
    }
    return f;
  }
  function dessinerFoule(){
    const f = monterFoule();
    f.hidden = !!revision;
    f.querySelector(".foule-titre").textContent = T.foule + " · " + T.fouleAvec.replace("{x}", foule);
    const g = f.querySelector(".foule-gens"); g.innerHTML = "";
    for (let i = 0; i < 10; i++) { const s = document.createElement("span"); s.className = i < foule ? "avec" : "contre"; s.textContent = i < foule ? "🙋" : "🧍"; g.appendChild(s); }
  }
  function bougerFoule(d, msg){
    foule = Math.max(0, Math.min(10, foule + d));
    dessinerFoule();
    if (msg) {
      const r = monterFoule().querySelector(".foule-reaction");
      r.textContent = msg; r.classList.remove("vu"); void r.offsetWidth; r.classList.add("vu");
    }
  }

  // ─── L'humeur du personnage ───
  function dessinerHumeur(){
    const f = el("f-foe"); if (!f) return;
    let b = el("humeur");
    if (!b) { b = document.createElement("div"); b.id = "humeur"; b.className = "humeur"; el("foe-title").after(b); }
    b.hidden = !!revision;
    const foe = foeActuel();
    const h = (T.humeur || [])[humeur + 2] || "";
    b.textContent = h;
    b.setAttribute("aria-label", (T.humeurLabel || "").replace("{n}", foe ? foe.name : "").replace("{h}", h));
    f.classList.remove("humeur-m2", "humeur-m1", "humeur-0", "humeur-p1", "humeur-p2");
    f.classList.add("humeur-" + (humeur < 0 ? "m" + (-humeur) : humeur > 0 ? "p" + humeur : "0"));
  }

  // ─── Début d'une discussion ───
  function debutMatch(foe){
    arreter();
    if (foeIdx === 0 && !revision) stats = {repere:0, fausse:0, bons:0, pieges:0, fouleGagnee:0, matchs:0};
    humeur = 0; foule = 5; prefixe = null; pl = null;
    dessinerFoule(); dessinerHumeur();
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

  // 2. Facile : on touche la phrase qui cloche.
  function surligner(line, phrases, foe, suite){
    el("qprompt").textContent = T.reperPrompt;
    const z = zoneTirade(); z.className = "surligner";
    const boutons = phrases.map(p => {
      const b = document.createElement("button"); b.type = "button"; b.className = "phrase"; b.textContent = p.t;
      b.onclick = () => choisir(p, b);
      z.appendChild(b); return b;
    });
    const rien = document.createElement("button"); rien.type = "button"; rien.className = "abtn rien"; rien.textContent = T.rienARedire;
    rien.onclick = () => choisir(null, rien);
    el("answers").appendChild(rien);
    Voix.replique(phrases.map(p => p.t).join(" "), foe);
    Voix.brancherBoutons(el("answers"), [...boutons, rien]);
    boutons[0].focus({preventScroll:true});
    function choisir(p, b){
      if (p && !p.cible) {
        b.disabled = true; b.classList.add("bad");
        fausseAlerte(T.fausseAlerteFacile);
        if (youHP <= 0) conclure(line, phrases, "", "");
        return;
      }
      if (p && p.cible) {
        if (line.type === "sain") conclure(line, phrases, "", T.objectionSain);
        else repere(line, phrases, suite, false);
        return;
      }
      if (line.type === "sain") conclure(line, phrases, "valable", T.laisseOk);
      else conclure(line, phrases, "", T.rate);
    }
  }

  // 1. Difficile : la tirade défile, il faut objecter au bon moment.
  function objection(line, phrases, foe, suite){
    el("qprompt").textContent = T.objectionPrompt;
    const z = zoneTirade(); z.className = "direct";
    const b = document.createElement("button"); b.type = "button"; b.className = "objection"; b.textContent = T.objection;
    el("answers").appendChild(b);
    b.focus({preventScroll:true});
    const monJeton = jeton;
    let i = -1, courante = null, debut = 0, duree = 0, ligne = null;
    function suivante(attendu){
      if (monJeton !== jeton || attendu !== i) return;
      clearTimeout(minuteur);
      i++;
      if (i >= phrases.length) { courante = null; finTirade(); return; }
      courante = phrases[i];
      if (ligne) ligne.classList.add("passee");
      ligne = document.createElement("p"); ligne.className = "phrase-direct"; ligne.textContent = courante.t;
      z.appendChild(ligne);
      debut = performance.now();
      duree = Math.max(2300, courante.t.length * 62);
      const n = i;
      const parle = Voix.dire(courante.t, foe, {fin: () => { if (monJeton === jeton) minuteur = setTimeout(() => suivante(n), 450); }});
      minuteur = setTimeout(() => suivante(n), parle ? duree * 2 + 3000 : duree);
    }
    function finTirade(){
      b.disabled = true;
      if (line.type === "sain") conclure(line, phrases, "valable", T.laisseOk);
      else conclure(line, phrases, "", T.rate);
    }
    b.onclick = () => {
      if (!courante || monJeton !== jeton) return;
      if (courante.cible) {
        b.remove();
        if (line.type === "sain") conclure(line, phrases, "", T.objectionSain);
        else repere(line, phrases, suite, performance.now() - debut < duree * 0.6);
        return;
      }
      ligne.classList.add("bad");
      fausseAlerte(T.fausseAlerte);
      if (youHP <= 0) { b.remove(); conclure(line, phrases, "", ""); }
    };
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
    pl = {tour:0, conv:0, fini:false, P:P.plaidoyer, foe:foe};
    renderTour();
    return true;
  }
  function preparerScene(){
    document.querySelector("#battle .bubble").hidden = true; el("piste").hidden = true;
    el("dialogue").hidden = true; el("riposte").style.display = "none"; el("nextbtn").style.display = "none";
    el("techs").hidden = true;
    el("qprompt").textContent = "🗣️ " + pl.P.but;
  }
  function renderTour(){
    preparerScene();
    const tour = pl.P.tours[pl.tour];
    el("turn-progress").textContent = T.plaidoyerProgres.replace("{i}", pl.tour + 1).replace("{t}", pl.P.tours.length);
    souffle(T.plaidoyerConsigne);
    const options = melange([...tour.bons.map(o => ({...o, bon:true})), ...tour.pieges.map(o => ({...o, bon:false}))]);
    const ans = el("answers"); ans.innerHTML = "";
    const boutons = options.map(o => {
      const b = document.createElement("button"); b.type = "button"; b.className = "abtn mbtn"; b.textContent = o.t;
      b.onclick = () => choisirArgument(o, b, options, boutons);
      ans.appendChild(b); return b;
    });
    Voix.brancherBoutons(ans, boutons);
    boutons[0].focus({preventScroll:true});
    window.scrollTo({top:0, behavior:"smooth"});
  }
  function choisirArgument(o, b, options, boutons){
    const foe = pl.foe;
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
    if (pl.fini) { finMatch(); pl = null; winMatch(); return; }
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
