/* =========================================================================
   L'Agora en classe — la logique (une seule fois, pour FR et EN)
   Le contenu vient de debat-data.js / debat-data-en.js (DEBAT) et, pour les
   sophismes, de dojo-data.js / dojo-data-en.js (DOJO).

   Trois écrans : la préparation (format, sujet, équipes), l'écran projeté
   (chronomètre, parole, cartons, points d'accord, compteurs) et le bilan.
   Aucune donnée d'élève : seuls les réglages du prof sont gardés dans le
   navigateur (clé agora.debat), pour relancer le même débat plus tard.
   ========================================================================= */
(function () {
  'use strict';

  const CLE = 'agora.debat';
  const $ = (id) => document.getElementById(id);

  function t(cle, vars) {
    let s = I18N.t(cle);
    if (vars) Object.keys(vars).forEach((k) => { s = s.split('{' + k + '}').join(vars[k]); });
    return s;
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  }
  function majuscule(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function melanger(liste) {
    const l = liste.slice();
    for (let i = l.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [l[i], l[j]] = [l[j], l[i]]; }
    return l;
  }
  function sophisme(id) { return DOJO.sophismes[id]; }

  // ─── Les réglages du prof ───
  let prep = { format: null, theme: null, libre: '', perso: null, niveau: '', duree: null, nb: null, famille: 'grecs', noms: [] };
  try {
    const lu = JSON.parse(localStorage.getItem(CLE) || 'null');
    if (lu && typeof lu === 'object') prep = Object.assign(prep, lu);
  } catch (e) {}
  if (prep.format && !DEBAT.formats[prep.format]) prep.format = null;
  if (prep.theme && !DEBAT.themes.some((th) => th.id === prep.theme)) prep.theme = null;
  if (prep.perso && !DEBAT.persos.some((p) => p.id === prep.perso)) prep.perso = null;
  if (!DEBAT.familles[prep.famille]) prep.famille = 'grecs';

  function sauver() {
    try { localStorage.setItem(CLE, JSON.stringify(prep)); } catch (e) {}
  }

  function format() { return prep.format ? DEBAT.formats[prep.format] : null; }
  function perso() { return DEBAT.persos.find((p) => p.id === prep.perso) || null; }
  function theme() { return DEBAT.themes.find((th) => th.id === prep.theme) || null; }

  // Le sujet du débat, quelle que soit sa source.
  function sujet() {
    if (prep.format === 'vivante') {
      const p = perso();
      return p && { q: p.q, positions: [p.position], pieges: p.pieges, motivations: [], perso: p };
    }
    const th = theme();
    if (th) return { q: th.q, aff: th.aff, positions: th.positions.map((x) => x.nom), pieges: th.pieges, motivations: th.motivations };
    if (prep.libre) return { q: prep.libre, positions: DEBAT.positionsLibres, pieges: [], motivations: [] };
    return null;
  }

  function participants() {
    const f = format();
    if (!f) return [];
    if (!f.equipes) return f.zones.slice();
    return prep.noms.slice(0, prep.nb).map((n, i) => n.trim() || t('nomEquipe', { n: i + 1 }));
  }

  // Le déroulé minuté, mis à l'échelle de la durée choisie (au quart de minute).
  function phases() {
    const f = format();
    const total = f.phases.reduce((s, p) => s + p.min, 0);
    const k = (prep.duree || f.dureeDefaut) / total;
    return f.phases.map((p) => ({ nom: p.nom, sec: Math.max(15, Math.round(p.min * k * 4) * 15) }));
  }
  function mmss(sec) {
    sec = Math.max(0, Math.ceil(sec));
    return Math.floor(sec / 60) + ':' + String(sec % 60).padStart(2, '0');
  }

  // ═══ Préparation ═══════════════════════════════════════════════════════
  function carte(conteneur, choisi, contenu, auClic) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'carte';
    b.setAttribute('aria-pressed', choisi ? 'true' : 'false');
    b.innerHTML = contenu;
    b.addEventListener('click', auClic);
    conteneur.appendChild(b);
  }

  function rendreFormats() {
    const zone = $('formats');
    zone.innerHTML = '';
    Object.keys(DEBAT.formats).forEach((id) => {
      const f = DEBAT.formats[id];
      carte(zone, prep.format === id,
        '<span class="c-emoji" aria-hidden="true">' + f.emoji + '</span><span class="c-titre">' + esc(f.nom) + '</span>' +
        '<span class="c-meta">' + esc(t('fDuree', { d: f.duree })) + '</span><span class="c-meta">' + esc(t('fQui', { q: f.qui })) + '</span>',
        () => choisirFormat(id));
    });
    const fiche = $('format-fiche');
    const f = format();
    fiche.hidden = !f;
    if (!f) return;
    let h = '<p>' + esc(f.resume) + '</p><details><summary>' + esc(t('voirDeroule')) + '</summary>' +
      '<p class="muet" style="margin-top:6px">' + esc(t('fTravail', { t: f.travail })) + '</p>';
    h += '<h3>' + esc(t('deroule')) + '</h3><ol style="margin-left:22px">' +
      phases().map((p) => '<li>' + esc(p.nom) + ' <span class="muet">(' + mmss(p.sec) + ')</span></li>').join('') + '</ol>';
    if (f.missions) h += '<h3>' + esc(t('missions')) + '</h3><ul>' + f.missions.map((m) => '<li>' + esc(m) + '</li>').join('') + '</ul>';
    h += '<p class="regle"><b>' + esc(t('regleAgora')) + '</b> ' + esc(f.regle) + '</p></details>';
    fiche.innerHTML = h;
  }

  function choisirFormat(id) {
    const avant = prep.format;
    prep.format = id;
    const f = format();
    if (avant !== id) prep.duree = f.dureeDefaut;
    if (f.equipes) {
      if (!prep.nb || prep.nb < f.equipes[0] || prep.nb > f.equipes[1]) prep.nb = f.equipes[2];
      completerNoms();
    }
    sauver();
    toutRendre();
  }

  function rendreSujet() {
    const vivante = prep.format === 'vivante';
    $('bloc-themes').hidden = vivante;
    $('bloc-persos').hidden = !vivante;

    if (vivante) {
      const zone = $('persos');
      zone.innerHTML = '';
      DEBAT.persos.forEach((p) => {
        carte(zone, prep.perso === p.id,
          '<span class="c-emoji" aria-hidden="true">' + p.emoji + '</span><span class="c-titre">' + esc(p.nom) + '</span>' +
          '<span class="c-meta">' + esc(p.desc) + '</span><span>' + esc(p.q) + '</span>',
          () => { prep.perso = p.id; sauver(); toutRendre(); });
      });
    } else {
      const sel = $('f-niveau');
      if (!sel.options.length) {
        sel.add(new Option(t('tousNiveaux'), ''));
        ['college', 'lycee'].forEach((n) => sel.add(new Option(DEBAT.niveaux[n], n)));
      }
      sel.value = prep.niveau || '';
      const zone = $('themes');
      zone.innerHTML = '';
      themesVisibles().forEach((th) => {
        carte(zone, prep.theme === th.id,
          '<span class="c-meta">' + esc(DEBAT.categories[th.cat]) + '</span><span class="c-titre">' + esc(th.q) + '</span>' +
          '<span class="c-meta">' + esc(DEBAT.niveaux[th.niveau]) + '</span>',
          () => { prep.theme = th.id; prep.libre = ''; $('sujet-libre').value = ''; sauver(); toutRendre(); });
      });
      if (prep.libre && !$('sujet-libre').value) $('sujet-libre').value = prep.libre;
    }

    const fiche = $('sujet-fiche');
    const s = sujet();
    fiche.hidden = !s;
    if (!s) return;
    let h = '<p><b>' + esc(s.q) + '</b></p>';
    if (s.perso) {
      const p = s.perso;
      h += '<details><summary>' + esc(t('voirPerso')) + '</summary>';
      h += '<h3>' + esc(t('persoPosition')) + '</h3><p>' + esc(p.position) + '</p>';
      h += '<h3>' + esc(t('persoPieges')) + '</h3><p>' + p.pieges.map((id) => '<span class="pastille">' + esc(sophisme(id).l) + '</span>').join('') + '</p>';
      h += '<details class="secret"><summary>' + esc(t('secretTitre')) + '</summary>' +
        '<p style="margin-top:8px"><b>' + esc(t('secretMotiv')) + '</b> ' + esc(p.motiv) + '</p>' +
        '<p style="margin-top:8px"><b>' + esc(t('secretIndices')) + '</b></p><ul>' + p.indices.map((x) => '<li>' + esc(x) + '</li>').join('') + '</ul>' +
        '<p class="muet" style="margin-top:8px">' + esc(t('secretJeu')) + '</p></details></details>';
    } else if (theme()) {
      const th = theme();
      h += '<details><summary>' + esc(t('voirFiche')) + '</summary>';
      h += '<h3>' + esc(t('positionsTitre')) + '</h3><div class="positions3">' + th.positions.map((p) =>
        '<div><b>' + esc(p.nom) + '</b><ul>' + p.pistes.map((x) => '<li>' + esc(x) + '</li>').join('') + '</ul></div>').join('') + '</div>';
      h += '<h3>' + esc(t('piegesTitre')) + '</h3><ul>' + th.pieges.map((id) =>
        '<li><b>' + esc(sophisme(id).l) + '</b> : ' + esc(sophisme(id).d) + '</li>').join('') + '</ul>';
      h += '<h3>' + esc(t('motivTitre')) + '</h3><p>' + th.motivations.map((m) => '<span class="pastille">' + esc(m) + '</span>').join('') + '</p>';
      h += '<h3>' + esc(t('bonsTitre')) + '</h3><ul><li><b>' + esc(t('bonPour', { p: th.positions[0].nom })) + '</b> ' + esc(th.bons[0]) +
        '</li><li><b>' + esc(t('bonContre', { p: th.positions[1].nom })) + '</b> ' + esc(th.bons[1]) + '</li></ul></details>';
    } else {
      h += '<p class="muet" style="margin-top:6px">' + esc(t('sujetLibreFiche')) + '</p>';
    }
    fiche.innerHTML = h;
  }

  function themesVisibles() {
    return DEBAT.themes.filter((th) => !prep.niveau || th.niveau === prep.niveau || th.niveau === 'tous');
  }

  function completerNoms() {
    const f = format();
    if (!f || !f.equipes) return;
    const famille = DEBAT.familles[prep.famille].noms;
    // Garde les noms déjà là (tapés par le prof ou tirés), complète le reste.
    const pris = prep.noms.slice(0, prep.nb).filter(Boolean);
    const libres = melanger(famille.filter((n) => pris.indexOf(n) < 0));
    while (prep.noms.length < f.equipes[1]) prep.noms.push('');
    for (let i = 0; i < f.equipes[1]; i++) if (!prep.noms[i]) prep.noms[i] = libres.shift() || '';
  }

  function tirerNoms() {
    const f = format();
    if (!f || !f.equipes) return;
    prep.noms = melanger(DEBAT.familles[prep.famille].noms).slice(0, f.equipes[1]);
    sauver();
    rendreEquipes();
  }

  function rendreEquipes() {
    const f = format();
    const sd = $('f-duree');
    sd.innerHTML = '';
    if (f) f.durees.forEach((d) => sd.add(new Option(t('minutes', { n: d }), d)));
    sd.disabled = !f;
    if (f) sd.value = prep.duree || f.dureeDefaut;

    const avecEquipes = !!(f && f.equipes);
    $('bloc-nb').hidden = !avecEquipes;
    $('bloc-noms').hidden = !avecEquipes;
    $('sans-equipes').hidden = !(f && !f.equipes);
    if (!avecEquipes) return;

    const sn = $('f-nb');
    sn.innerHTML = '';
    for (let n = f.equipes[0]; n <= f.equipes[1]; n++) sn.add(new Option(n, n));
    sn.value = prep.nb;

    const sf = $('f-famille');
    if (!sf.options.length) Object.keys(DEBAT.familles).forEach((k) => sf.add(new Option(DEBAT.familles[k].nom, k)));
    sf.value = prep.famille;

    const zone = $('noms');
    zone.innerHTML = '';
    for (let i = 0; i < prep.nb; i++) {
      const inp = document.createElement('input');
      inp.type = 'text';
      inp.maxLength = 40;
      inp.value = prep.noms[i] || '';
      inp.setAttribute('aria-label', t('nomEquipe', { n: i + 1 }));
      inp.placeholder = t('nomEquipe', { n: i + 1 });
      inp.addEventListener('input', () => { prep.noms[i] = inp.value; sauver(); });
      zone.appendChild(inp);
    }
  }

  function rendreLancer() {
    const pret = !!(format() && sujet());
    $('btn-lancer').disabled = !pret;
    $('lancer-aide').hidden = pret;
  }

  // La préparation pas à pas : format, puis sujet, puis équipes et lancement.
  let etape = 1;
  function resumeEtape(k) {
    if (k === 1) { const f = format(); return f ? f.emoji + ' ' + f.nom : ''; }
    if (k === 2) { const s = sujet(); return s ? s.q : ''; }
    return '';
  }
  function allerEtape(k, defiler) {
    etape = k;
    rendreEtapes();
    if (defiler) {
      const sec = document.querySelector('.etape[data-etape="' + k + '"]');
      sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const h = sec.querySelector('h2'); h.tabIndex = -1; h.focus({ preventScroll: true });
    }
  }
  function rendreEtapes() {
    document.querySelectorAll('.etape').forEach((sec) => {
      const k = +sec.dataset.etape;
      sec.dataset.etat = k < etape ? 'fait' : k === etape ? 'actif' : 'avenir';
      const r = sec.querySelector('.resume');
      r.innerHTML = '';
      if (k < etape) {
        const txt = document.createElement('span'); txt.textContent = '✓ ' + resumeEtape(k);
        const b = document.createElement('button'); b.type = 'button'; b.className = 'btn'; b.textContent = t('modifier');
        b.addEventListener('click', () => allerEtape(k, true));
        r.append(txt, b);
      }
    });
    $('suite-1').disabled = !format();
    $('suite-2').disabled = !sujet();
    $('bloc-lancer').hidden = etape !== 3;
    $('lancer-aide').hidden = etape !== 3 || !$('btn-lancer').disabled;
  }

  function toutRendre() {
    rendreFormats();
    rendreSujet();
    rendreEquipes();
    rendreLancer();
    rendreEtapes();
  }
  $('suite-1').addEventListener('click', () => allerEtape(2, true));
  $('suite-2').addEventListener('click', () => allerEtape(3, true));

  $('f-niveau').addEventListener('change', (e) => { prep.niveau = e.target.value; sauver(); rendreSujet(); });
  $('btn-hasard').addEventListener('click', () => {
    const l = themesVisibles().filter((th) => th.id !== prep.theme);
    prep.theme = l[Math.floor(Math.random() * l.length)].id;
    prep.libre = '';
    $('sujet-libre').value = '';
    sauver();
    toutRendre();
    $('sujet-fiche').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
  function validerLibre() {
    const v = $('sujet-libre').value.trim();
    if (!v) return;
    prep.libre = v;
    prep.theme = null;
    sauver();
    toutRendre();
  }
  $('btn-libre').addEventListener('click', validerLibre);
  $('sujet-libre').addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); validerLibre(); } });
  $('f-duree').addEventListener('change', (e) => { prep.duree = +e.target.value; sauver(); rendreFormats(); });
  $('f-nb').addEventListener('change', (e) => { prep.nb = +e.target.value; completerNoms(); sauver(); rendreEquipes(); });
  $('f-famille').addEventListener('change', (e) => { prep.famille = e.target.value; tirerNoms(); });
  $('btn-noms').addEventListener('click', tirerNoms);
  $('btn-lancer').addEventListener('click', lancer);

  // ═══ L'écran projeté ═══════════════════════════════════════════════════
  let D = null;          // l'état du débat en cours
  let minuterie = null;

  function genres() {
    return prep.format === 'vivante' ? ['question', 'reformulation', 'esquive', 'massue'] : ['question', 'reformulation', 'bon', 'massue'];
  }

  function lancer() {
    const s = sujet();
    if (!format() || !s) return;
    const ps = participants();
    D = {
      sujet: s, ps: ps, phases: phases(), i: 0, restant: 0, enCours: false, fin: 0,
      qui: 0, file: [], accords: [], cartons: [],
      compteurs: ps.map(() => ({ question: 0, reformulation: 0, bon: 0, massue: 0, esquive: 0 })),
      ouverture: 2, dep: { arg: 0, piege: 0 }, histo: [], change: 0
    };
    D.restant = D.phases[0].sec * 1000;
    afficher('scene');
    ColFin.protegerSortie(true);

    $('sc-question').textContent = (prep.format === 'ligne' && s.aff) ? '« ' + s.aff + ' »' : s.q;
    $('sc-positions').innerHTML = s.perso
      ? '<span class="pastille">' + esc(s.positions[0]) + '</span>'
      : s.positions.map((p) => '<span class="pastille">' + esc(p) + '</span>').join('');
    $('sc-vivante').hidden = !s.perso;
    $('sc-ligne').hidden = prep.format !== 'ligne';
    if (s.perso) { $('sc-perso-e').textContent = s.perso.emoji; $('sc-perso-n').textContent = s.perso.nom; }

    const mains = $('sc-mains');
    mains.innerHTML = '';
    ps.forEach((p, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'btn petit';
      b.textContent = t('mainLevee', { e: p });
      b.addEventListener('click', () => { if (D.file.indexOf(i) < 0) { D.file.push(i); rendreParole(); } });
      mains.appendChild(b);
    });

    rendreScene();
    clearInterval(minuterie);
    minuterie = setInterval(tic, 250);
    window.scrollTo(0, 0);
  }

  function rendreScene() {
    rendreChrono();
    rendreParole();
    rendreAccords();
    rendreCompteurs();
    rendreVivante();
    $('sc-dep').textContent = D.dep.arg + D.dep.piege;
    $('btn-annuler').disabled = !D.histo.length;
  }

  // ─── Le chronomètre ───
  function tic() {
    if (!D || !D.enCours) return;
    D.restant = D.fin - Date.now();
    if (D.restant <= 0) {
      D.restant = 0;
      D.enCours = false;
      sonner();
    }
    rendreChrono();
  }

  function rendreChrono() {
    const ph = D.phases[D.i];
    $('sc-num').textContent = t('phaseNum', { i: D.i + 1, n: D.phases.length });
    $('sc-phase').textContent = ph.nom;
    const tps = $('sc-temps');
    tps.textContent = mmss(D.restant / 1000);
    tps.classList.toggle('fini', D.restant <= 0);
    tps.setAttribute('aria-label', D.restant <= 0 ? t('tempsEcoule') : mmss(D.restant / 1000));
    $('sc-prog').style.width = Math.min(100, Math.max(0, 100 * (1 - D.restant / (ph.sec * 1000)))) + '%';
    $('sc-ensuite').textContent = D.i + 1 < D.phases.length ? t('ensuite', { p: D.phases[D.i + 1].nom }) : t('derniere');
    $('btn-go').textContent = D.enCours ? t('pause') : t('lancerChrono');
    $('btn-prec').disabled = D.i === 0;
    $('btn-suiv').disabled = D.i + 1 >= D.phases.length;
  }

  function demarrer() {
    if (D.restant <= 0) return;
    D.fin = Date.now() + D.restant;
    D.enCours = true;
    rendreChrono();
  }
  function arreter() {
    if (D.enCours) D.restant = Math.max(0, D.fin - Date.now());
    D.enCours = false;
    rendreChrono();
  }
  function basculer() { if (D.enCours) arreter(); else demarrer(); }
  function allerPhase(i) {
    D.i = Math.max(0, Math.min(D.phases.length - 1, i));
    D.enCours = false;
    D.restant = D.phases[D.i].sec * 1000;
    rendreChrono();
  }

  $('btn-go').addEventListener('click', basculer);
  $('btn-plus').addEventListener('click', () => {
    if (D.enCours) D.fin += 30000; else D.restant += 30000;
    tic();
    rendreChrono();
  });
  $('btn-redemarre').addEventListener('click', () => allerPhase(D.i));
  $('btn-prec').addEventListener('click', () => allerPhase(D.i - 1));
  $('btn-suiv').addEventListener('click', () => allerPhase(D.i + 1));

  // Trois bips discrets en fin de phase, désactivables.
  let sonActif = true;
  let audio = null;
  function sonner() {
    if (!sonActif) return;
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      [0, 0.25, 0.5].forEach((d) => {
        const o = audio.createOscillator();
        const g = audio.createGain();
        o.frequency.value = 880;
        g.gain.setValueAtTime(0.0001, audio.currentTime + d);
        g.gain.exponentialRampToValueAtTime(0.15, audio.currentTime + d + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + d + 0.18);
        o.connect(g).connect(audio.destination);
        o.start(audio.currentTime + d);
        o.stop(audio.currentTime + d + 0.2);
      });
    } catch (e) {}
  }
  $('btn-son').addEventListener('click', (e) => {
    sonActif = !sonActif;
    e.currentTarget.setAttribute('aria-pressed', sonActif ? 'true' : 'false');
    e.currentTarget.textContent = sonActif ? t('son') : t('sonCoupe');
  });
  $('btn-plein').addEventListener('click', () => {
    try {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen();
    } catch (e) {}
  });

  // ─── La parole ───
  function rendreParole() {
    $('sc-qui').textContent = D.ps[D.qui];
    const file = $('sc-file');
    file.innerHTML = D.file.length
      ? D.file.map((i, n) => '<span class="pastille">' + (n + 1) + '. ' + esc(D.ps[i]) + '</span>').join('')
      : '<span class="muet">' + esc(t('fileVide')) + '</span>';
    $('btn-donner').disabled = !D.file.length;
    $('btn-tirage').disabled = D.ps.length < 2;
  }
  $('btn-qui-prec').addEventListener('click', () => { D.qui = (D.qui - 1 + D.ps.length) % D.ps.length; rendreParole(); });
  $('btn-qui-suiv').addEventListener('click', () => { D.qui = (D.qui + 1) % D.ps.length; rendreParole(); });
  $('btn-tirage').addEventListener('click', () => {
    const autres = D.ps.map((_, i) => i).filter((i) => i !== D.qui);
    D.qui = autres[Math.floor(Math.random() * autres.length)];
    rendreParole();
  });
  $('btn-donner').addEventListener('click', () => {
    if (!D.file.length) return;
    D.qui = D.file.shift();
    rendreParole();
  });

  // ─── Les points d'accord ───
  function rendreAccords() {
    const ul = $('sc-accords');
    ul.innerHTML = '';
    if (!D.accords.length) {
      ul.innerHTML = '<li class="muet" style="background:none;border:none;font-size:var(--fs-200)">' + esc(t('accordsVide')) + '</li>';
      return;
    }
    D.accords.forEach((a, i) => {
      const li = document.createElement('li');
      li.innerHTML = '<span>🤝 ' + esc(a) + '</span>';
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'btn petit no-print';
      b.textContent = '✕';
      b.setAttribute('aria-label', t('retirer') + ' : ' + a);
      b.addEventListener('click', () => { D.accords.splice(i, 1); rendreAccords(); });
      li.appendChild(b);
      ul.appendChild(li);
    });
  }
  $('form-accord').addEventListener('submit', (e) => {
    e.preventDefault();
    const v = $('accord-txt').value.trim();
    if (!v) return;
    D.accords.push(v);
    D.histo.push({ type: 'accord', a: v });
    $('accord-txt').value = '';
    rendreAccords();
    $('btn-annuler').disabled = false;
  });

  // ─── Les compteurs (et, dans l'Agora vivante, la jauge d'ouverture) ───
  function effet(genre) {
    const g = DEBAT.gestes.find((x) => x.id === genre);
    return prep.format === 'vivante' && g ? g.effet : 0;
  }
  // En-tête de colonne : l'icône toujours, le libellé caché sur petit écran.
  function entete(g) {
    const l = t('c_' + g);
    const i = l.indexOf(' ');
    return '<span aria-hidden="true">' + esc(l.slice(0, i)) + '</span> <span class="lib" aria-hidden="true">' + esc(l.slice(i + 1)) + '</span>' +
      '<span class="sr-only">' + esc(l.slice(i + 1)) + '</span>';
  }
  function rendreCompteurs() {
    const tab = $('sc-compteurs');
    const gs = genres();
    tab.innerHTML = '<thead><tr><th scope="col"></th>' + gs.map((g) => '<th scope="col">' + entete(g) + '</th>').join('') + '</tr></thead>';
    const corps = document.createElement('tbody');
    D.ps.forEach((p, i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = '<th scope="row">' + esc(p) + '</th>';
      gs.forEach((g) => {
        const td = document.createElement('td');
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'btn petit';
        b.textContent = t('c_' + g).split(' ')[0] + ' ' + D.compteurs[i][g];
        b.setAttribute('aria-label', t('ajouterA', { c: t('c_' + g), e: p }) + ' (' + D.compteurs[i][g] + ')');
        b.addEventListener('click', () => {
          D.compteurs[i][g]++;
          const avant = D.ouverture;
          D.ouverture = Math.max(0, Math.min(10, D.ouverture + effet(g)));
          D.histo.push({ type: 'compteur', i: i, g: g, ouv: avant });
          rendreScene();
        });
        td.appendChild(b);
        tr.appendChild(td);
      });
      corps.appendChild(tr);
    });
    tab.appendChild(corps);
    const ok = D.cartons.filter((c) => c.ok).length;
    $('sc-cartons-resume').textContent = t('cartonsResume', { ok: ok, faux: D.cartons.length - ok });
  }
  function rendreVivante() {
    if (prep.format !== 'vivante') return;
    $('sc-ouv').textContent = t('ouverture', { n: D.ouverture });
    $('sc-jauge').style.width = (D.ouverture * 10) + '%';
  }

  // ─── Les déplacements (ligne mouvante) ───
  $('btn-dep-arg').addEventListener('click', () => { D.dep.arg++; D.histo.push({ type: 'dep', k: 'arg' }); rendreScene(); });
  $('btn-dep-piege').addEventListener('click', () => { D.dep.piege++; D.histo.push({ type: 'dep', k: 'piege' }); rendreScene(); });

  // ─── Annuler la dernière action (un clic de trop, ça arrive au tableau) ───
  $('btn-annuler').addEventListener('click', () => {
    const h = D.histo.pop();
    if (!h) return;
    if (h.type === 'compteur') { D.compteurs[h.i][h.g]--; D.ouverture = h.ouv; }
    else if (h.type === 'carton') D.cartons.pop();
    else if (h.type === 'dep') D.dep[h.k]--;
    else if (h.type === 'accord') { const k = D.accords.lastIndexOf(h.a); if (k >= 0) D.accords.splice(k, 1); }   // déjà retiré à la main : rien à faire
    rendreScene();
  });

  // ─── Le voile : cartons et pause reformulation ───
  let voile = null;   // { reprendre: bool, retour: élément à refocaliser }
  function ouvrirVoile(html, classe) {
    if (!voile) {
      voile = { reprendre: D.enCours, retour: document.activeElement };
      arreter();
    }
    const boite = $('voile-boite');
    boite.className = 'boite ' + (classe || '');
    boite.innerHTML = html;
    $('voile').hidden = false;
    const f = boite.querySelector('[data-focus]') || boite.querySelector('button');
    if (f) f.focus();
    return boite;
  }
  function fermerVoile() {
    if (!voile) return;
    $('voile').hidden = true;
    const v = voile;
    voile = null;
    if (v.reprendre) demarrer();
    if (v.retour && v.retour.focus) v.retour.focus();
  }
  $('voile').addEventListener('click', (e) => { if (e.target.id === 'voile') fermerVoile(); });

  function choisirCarton() {
    const guette = D.sujet.pieges;
    const ids = Object.keys(DOJO.sophismes);
    // Les pièges qui guettent ce sujet d'abord, puis les autres.
    const ordre = guette.concat(ids.filter((id) => guette.indexOf(id) < 0));
    const boite = ouvrirVoile(
      '<h2>' + esc(t('cartonChoix')) + '</h2>' +
      (guette.length ? '<p class="muet">' + esc(t('cartonGuette')) + '</p>' : '') +
      '<div class="choix-sophismes">' + ordre.map((id) =>
        '<button type="button" class="btn' + (guette.indexOf(id) >= 0 ? ' guette' : '') + '" data-id="' + id + '">' + esc(sophisme(id).l) + '</button>').join('') +
      '</div><p class="centre" style="margin-top:14px"><button type="button" class="btn" data-fermer>' + esc(t('fermer')) + '</button></p>');
    boite.querySelectorAll('[data-id]').forEach((b) => b.addEventListener('click', () => montrerCarton(b.dataset.id)));
    boite.querySelector('[data-fermer]').addEventListener('click', fermerVoile);
  }

  function montrerCarton(id) {
    const s = sophisme(id);
    let par = null;
    const qui = D.ps.map((p, i) => '<button type="button" class="btn petit" aria-pressed="false" data-par="' + i + '">' + esc(p) + '</button>').join('') +
      '<button type="button" class="btn petit" aria-pressed="false" data-par="prof">' + esc(t('personne')) + '</button>';
    const boite = ouvrirVoile(
      '<div class="nom">🟥 ' + esc(s.l) + '</div>' +
      '<p class="def">' + esc(majuscule(s.d)) + '</p>' +
      '<p class="parade"><b>' + esc(t('parade')) + '</b> ' + esc(s.parade) + '</p>' +
      '<h3 class="centre">' + esc(t('reperePar')) + '</h3><div class="commandes" style="margin-top:4px">' + qui + '</div>' +
      '<div class="commandes" style="margin-top:16px">' +
      '<button type="button" class="btn ok" data-ok="1" data-focus>' + esc(t('cartonOk')) + '</button>' +
      '<button type="button" class="btn non" data-ok="0">' + esc(t('cartonFaux')) + '</button></div>', 'carton');
    boite.querySelectorAll('[data-par]').forEach((b) => b.addEventListener('click', () => {
      par = b.dataset.par;
      boite.querySelectorAll('[data-par]').forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
    }));
    boite.querySelectorAll('[data-ok]').forEach((b) => b.addEventListener('click', () => {
      D.cartons.push({ id: id, ok: b.dataset.ok === '1', par: par === null ? null : (par === 'prof' ? t('personne') : D.ps[+par]) });
      D.histo.push({ type: 'carton' });
      fermerVoile();
      rendreScene();
    }));
  }

  function pauseReformulation() {
    const boite = ouvrirVoile(
      '<div class="reformule"><div style="font-size:3rem" aria-hidden="true">🪞</div>' +
      '<p class="grand">' + esc(t('reformuleGrand')) + '</p><p class="muet">' + esc(t('reformuleSous')) + '</p>' +
      '<p style="margin-top:18px"><button type="button" class="btn ok" data-focus>' + esc(t('reformuleOk')) + '</button></p></div>');
    boite.querySelector('button').addEventListener('click', fermerVoile);
  }
  $('btn-carton').addEventListener('click', choisirCarton);
  $('btn-reformule').addEventListener('click', pauseReformulation);

  document.addEventListener('keydown', (e) => {
    if ($('scene').hidden) return;
    if (e.key === 'Escape' && voile) { e.preventDefault(); fermerVoile(); return; }
    if (voile || e.ctrlKey || e.metaKey || e.altKey) return;
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'select' || tag === 'textarea') return;
    if (e.key === ' ' && tag !== 'button') { e.preventDefault(); basculer(); }
    else if (e.key === 'n' || e.key === 'N') allerPhase(D.i + 1);
    else if (e.key === 'c' || e.key === 'C') choisirCarton();
    else if (e.key === 'r' || e.key === 'R') pauseReformulation();
  });

  $('btn-fin').addEventListener('click', () => {
    ColModale.confirmer({ titre: t('finTitre'), texte: t('finTexte'), ok: t('finOui'), annuler: t('finNon') })
      .then((oui) => { if (oui) bilan(); });
  });

  // ═══ Le bilan ══════════════════════════════════════════════════════════
  function bilan() {
    arreter();
    ColFin.protegerSortie(false);
    afficher('bilan');
    window.scrollTo(0, 0);
    const s = D.sujet;
    $('bi-question').textContent = s.q;

    // 1. Les pièges
    const vus = {};
    D.cartons.filter((c) => c.ok).forEach((c) => {
      vus[c.id] = vus[c.id] || { n: 0, par: [] };
      vus[c.id].n++;
      if (c.par && vus[c.id].par.indexOf(c.par) < 0) vus[c.id].par.push(c.par);
    });
    const faux = D.cartons.filter((c) => !c.ok).length;
    let h = '';
    const idsVus = Object.keys(vus);
    if (idsVus.length) {
      h += '<ul class="liste-pieges" style="margin-left:20px">' + idsVus.map((id) =>
        '<li><b>' + esc(sophisme(id).l) + '</b> (' + esc(t('repereFois', { n: vus[id].n })) +
        (vus[id].par.length ? ', ' + esc(t('reperePar2', { e: vus[id].par.join(', ') })) : '') + ') : ' +
        esc(sophisme(id).d) + '</li>').join('') + '</ul>';
      const restants = s.pieges.filter((id) => !vus[id]);
      if (restants.length) h += '<p class="muet" style="margin-top:8px">' + esc(t('pasVus')) + '</p><p>' +
        restants.map((id) => '<span class="pastille">' + esc(sophisme(id).l) + '</span>').join('') + '</p>';
    } else {
      h += '<p>' + esc(t('aucunCarton')) + '</p><ul style="margin:6px 0 0 20px">' + s.pieges.map((id) =>
        '<li><b>' + esc(sophisme(id).l) + '</b> : ' + esc(sophisme(id).d) + '</li>').join('') + '</ul>';
    }
    if (faux) h += '<p style="margin-top:10px">' + esc(t('fauxCartons', { n: faux })) + '</p>';
    $('bi-pieges').innerHTML = h;

    // 2. Ce qui a fait avancer l'échange
    const gs = genres();
    h = '';
    if (prep.format === 'ligne') h += '<p style="margin-bottom:10px;font-weight:800">' + esc(t('totalDeplacements', { n: D.dep.arg + D.dep.piege, a: D.dep.arg, p: D.dep.piege })) + '</p>';
    h += '<div class="tableau"><table class="compteurs"><thead><tr><th scope="col"></th>' + gs.map((g) => '<th scope="col">' + entete(g) + '</th>').join('') +
      '</tr></thead><tbody>' + D.ps.map((p, i) => '<tr><th scope="row">' + esc(p) + '</th>' +
        gs.map((g) => '<td>' + D.compteurs[i][g] + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>';
    h += '<h3>' + esc(t('accordsTitre')) + '</h3>';
    h += D.accords.length ? '<ul style="margin-left:20px">' + D.accords.map((a) => '<li>' + esc(a) + '</li>').join('') + '</ul>'
      : '<p class="muet">' + esc(t('accordsVide')) + '</p>';
    $('bi-avancer').innerHTML = h;

    // 3. Ce qu'on a compris de l'autre
    const zc = $('bi-compris');
    if (s.perso) {
      zc.innerHTML = '<p style="font-weight:800">' + esc(t('ouvertureFinale', { p: s.perso.nom, n: D.ouverture })) + '</p>' +
        '<div class="jauge"><div style="width:' + D.ouverture * 10 + '%"></div></div>' +
        '<p class="no-print" style="margin-top:10px"><button type="button" class="btn" id="btn-reveler">' + esc(t('revelerMotiv')) + '</button></p>' +
        '<p id="bi-revele" hidden style="margin-top:10px"><b>' + esc(t('motivCachee', { p: s.perso.nom })) + '</b> ' + esc(s.perso.motiv) + '</p>';
    } else {
      zc.innerHTML = '<p>' + esc(t('comprisEquipes')) + '</p>' + (s.motivations.length
        ? '<p class="no-print" style="margin-top:10px"><button type="button" class="btn" id="btn-reveler">' + esc(t('revelerPistes')) + '</button></p>' +
          '<p id="bi-revele" hidden style="margin-top:10px">' + s.motivations.map((m) => '<span class="pastille">' + esc(m) + '</span>').join('') + '</p>'
        : '');
    }
    const rv = $('btn-reveler');
    if (rv) rv.addEventListener('click', () => { $('bi-revele').hidden = false; rv.parentNode.hidden = true; });

    rendreChange();
    $('bi-distinctions').innerHTML = DEBAT.distinctions.map((d) =>
      '<div><b>' + d.emoji + ' ' + esc(d.nom) + '</b><div class="muet">' + esc(d.pour) + '</div></div>').join('');
    $('bi-copie').textContent = '';
    $('bi-titre').setAttribute('tabindex', '-1');
    $('bi-titre').focus();
  }

  function rendreChange() {
    $('bi-change').textContent = D.change;
    $('bi-bravo').textContent = D.change > 0 ? t('changeBravo', { n: D.change }) : '';
  }
  $('btn-change-plus').addEventListener('click', () => { D.change++; rendreChange(); });
  $('btn-change-moins').addEventListener('click', () => { D.change = Math.max(0, D.change - 1); rendreChange(); });

  function resume() {
    const f = format();
    const s = D.sujet;
    const l = [t('resumeTitre', { q: s.q }), t('resumeFormat', { f: f.nom, d: prep.duree || f.dureeDefaut })];
    if (f.equipes) l.push(t('resumeEquipes', { e: D.ps.join(', ') }));
    if (prep.format === 'ligne') l.push(t('totalDeplacements', { n: D.dep.arg + D.dep.piege, a: D.dep.arg, p: D.dep.piege }));
    l.push('', t('resumePieges'));
    const ok = D.cartons.filter((c) => c.ok);
    if (ok.length) ok.forEach((c) => l.push('- ' + sophisme(c.id).l + (c.par ? ' (' + c.par + ')' : '')));
    else l.push('- ' + t('aucun'));
    l.push('', t('resumeAccords'));
    if (D.accords.length) D.accords.forEach((a) => l.push('- ' + a)); else l.push('- ' + t('aucun'));
    l.push('', t('resumeCompteurs'));
    D.ps.forEach((p, i) => l.push('- ' + p + ' : ' + genres().map((g) => t('c_' + g) + ' ' + D.compteurs[i][g]).join(', ')));
    if (s.perso) l.push('', t('ouvertureFinale', { p: s.perso.nom, n: D.ouverture }));
    l.push('', t('resumeChange', { n: D.change }));
    return l.join('\n');
  }
  $('btn-copier').addEventListener('click', () => {
    const fini = (ok) => { $('bi-copie').textContent = ok ? t('copieOk') : t('copieKo'); };
    try { navigator.clipboard.writeText(resume()).then(() => fini(true), () => fini(false)); }
    catch (e) { fini(false); }
  });
  $('btn-imprimer').addEventListener('click', () => window.print());
  $('btn-reprendre').addEventListener('click', () => {
    afficher('scene');
    ColFin.protegerSortie(true);
    rendreScene();
    window.scrollTo(0, 0);
  });
  $('btn-nouveau').addEventListener('click', () => {
    clearInterval(minuterie);
    D = null;
    afficher('prep');
    etape = 1;
    toutRendre();
    window.scrollTo(0, 0);
  });

  // ─── Navigation entre écrans ───
  function afficher(id) {
    ['prep', 'scene', 'bilan'].forEach((e) => { $(e).hidden = e !== id; });
    document.querySelector('main').classList.toggle('large', id === 'scene');
  }

  if (prep.format) {
    const f = format();
    if (f.equipes) completerNoms();
  }
  toutRendre();
})();
