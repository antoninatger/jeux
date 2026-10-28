/* =========================================================================
   Dojo de l'Agora — LOGIQUE
   Une seule fois pour les deux langues : le contenu vient de DOJO, chargé
   juste avant (dojo-data.js ou dojo-data-en.js), et les textes d'interface
   des dictionnaires I18N de dojo.html.

   La progression est gardée dans localStorage, clé « arene.dojo ». L'arène
   (app.js / app-en.js) la relit pour proposer les techniques débloquées.
   ========================================================================= */
(function () {
  'use strict';

  const $ = id => document.getElementById(id);
  function t(cle, vars) {
    let s = I18N.t(cle);
    if (vars) Object.keys(vars).forEach(k => { s = s.split('{' + k + '}').join(vars[k]); });
    return s;
  }
  function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function el(tag, cls, texte) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (texte != null) e.textContent = texte;
    return e;
  }
  function bouton(cls, texte) { const b = el('button', cls, texte); b.type = 'button'; return b; }
  function soph(id) { return DOJO.sophismes[id]; }

  // ─── Progression ───
  const CLE = 'arene.dojo';
  const EPREUVES = ['feuilles', 'oeil', 'clochettes', 'contre'];
  const TECHNIQUES = { feuilles: 'regard', oeil: 'seconde', clochettes: 'clochettes', contre: 'contre' };
  function neuve() { return { v: 1, accueil: false, type: null, epreuves: {}, examen: false, rouleau: {}, calme: false, piques: 0, fissure: false }; }
  function charger() {
    try { const p = JSON.parse(localStorage.getItem(CLE)); if (p && p.v === 1) return Object.assign(neuve(), p); } catch (e) {}
    return neuve();
  }
  function sauver() { try { localStorage.setItem(CLE, JSON.stringify(P)); } catch (e) { /* sans stockage, le dojo se joue quand même */ } }
  let P = charger();

  const mouvementReduit = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function calme() { return P.calme || mouvementReduit; }
  function nbReussies() { return EPREUVES.filter(e => P.epreuves[e]).length; }
  function rang() { return P.examen ? t('rang5') : t('rang' + nbReussies()); }
  function demasque(id) { P.rouleau[id] = (P.rouleau[id] || 0) + 1; sauver(); }

  // ─── Écrans ───
  const ECRANS = ['intro', 'scene', 'carte', 'epreuve', 'rouleau', 'fin'];
  function montrer(nom, cible) {
    ECRANS.forEach(k => { $('ecran-' + k).hidden = (k !== nom); });
    libelleRetour(nom);
    window.scrollTo(0, 0);
    const c = cible || $('ecran-' + nom).querySelector('h2');
    if (c) { if (!c.matches('button, a')) c.tabIndex = -1; c.focus({ preventScroll: true }); }
  }
  // Le retour de l'en-tête : depuis une épreuve, une scène, le rouleau ou la
  // fin, il ramène à la carte du dojo ; depuis la carte ou l'accueil du dojo,
  // à la page d'accueil d'Agorateur.
  const DANS_LE_DOJO = ['scene', 'epreuve', 'rouleau', 'fin'];
  function ecranVisible() { return ECRANS.find(k => !$('ecran-' + k).hidden); }
  function libelleRetour(nom) {
    const l = document.querySelector('.col-entete__retour .col-entete__label');
    if (!l) return;
    const cle = DANS_LE_DOJO.includes(nom) ? 'retourDojo' : 'retourArene';
    l.textContent = t(cle);
    l.parentNode.setAttribute('aria-label', t(cle));
  }
  // En phase de capture, et posé avant celui de collection.js : c'est nous qui
  // décidons, puis on demande confirmation seulement au milieu d'une épreuve.
  document.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('.col-entete__retour');
    const nom = a && ecranVisible();
    if (!a || !DANS_LE_DOJO.includes(nom)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    if (nom === 'rouleau' || nom === 'fin') { carte(); return; }
    ColModale.confirmer({ titre: t('quitterEpreuveTitre'), texte: t('quitterEpreuveTexte'), ok: t('quitterEpreuveOui'), annuler: t('quitterEpreuveNon') })
      .then(oui => { if (oui) abandonner(); });
  }, true);
  // Quitter en cours de route : plus de clavier, de chrono ni de feuille qui tombe.
  function abandonner() {
    if (clavierActif) { document.removeEventListener('keydown', clavierActif); clavierActif = null; }
    clearInterval(chronoActif);
    $('ep-aire').textContent = '';
    cacherRetour();
    carte();
  }

  function annoncer(texte) {
    const a = $('annonce');
    a.textContent = '';
    setTimeout(() => { a.textContent = texte; }, 40);
  }

  // ─── Effets manga ───
  let tmCutin = null;
  function cutin(sur, titre) {
    const c = $('cutin');
    $('cutin-sur').textContent = sur;
    $('cutin-titre').textContent = titre;
    c.classList.remove('joue');
    void c.offsetWidth;            // relance l'animation
    c.classList.add('joue');
    clearTimeout(tmCutin);
    tmCutin = setTimeout(() => c.classList.remove('joue'), 1500);
  }
  function sfx(parent, texte, rouge) {
    const s = el('span', 'sfx' + (rouge ? ' sfx--rouge' : ''), texte);
    s.setAttribute('aria-hidden', 'true');
    s.style.setProperty('--rot', (Math.random() * 18 - 9).toFixed(1) + 'deg');
    parent.appendChild(s);
    setTimeout(() => s.remove(), 950);
  }

  // ─── Les scènes : une suite de planches, avec ou sans choix ───
  const PERSOS = {
    sensei:      () => ({ emoji: DOJO.sensei.emoji, nom: DOJO.sensei.nom }),
    rival:       () => ({ emoji: DOJO.rival.emoji, nom: DOJO.rival.nom }),
    narrateur:   () => ({ emoji: '📜', nom: t('narrateur') }),
    examinateur: () => ({ emoji: '❔', nom: t('examinateur') }),
    toi:         () => ({ emoji: '🙋', nom: t('toi') })
  };
  function scene(planches, fin) {
    let i = 0;
    const suite = $('scene-suite');
    montrer('scene', $('scene-h'));
    function afficher() {
      const p = planches[i];
      const qui = PERSOS[p.qui]();
      $('scene-case').className = 'case case--trame scene-case scene--' + p.qui;
      $('scene-perso').textContent = qui.emoji;
      $('scene-nom').textContent = qui.nom;
      $('scene-texte').textContent = p.texte;
      $('scene-reponse').hidden = true;
      const zone = $('scene-choix');
      zone.textContent = '';
      suite.hidden = !!p.choix;
      annoncer(qui.nom + ' : ' + p.texte);
      if (p.choix) {
        p.choix.forEach(c => {
          const b = bouton('choix', c.t);
          b.dataset.ok = c.ok ? '1' : '0';
          b.addEventListener('click', () => choisir(p, c, b));
          zone.appendChild(b);
        });
        zone.firstChild.focus();
      } else {
        suite.focus();
      }
    }
    function choisir(p, c, b) {
      const rep = $('scene-reponse');
      rep.hidden = false;
      rep.className = 'reponse ' + (c.ok ? 'ok' : 'ko');
      rep.textContent = c.r || '';
      annoncer(c.r || '');
      if (c.ok || p.uneChance) {
        [...$('scene-choix').children].forEach(x => {
          x.disabled = true;
          if (x.dataset.ok === '1') x.classList.add('juste');
          else if (x === b) x.classList.add('faux');
        });
        if (c.ok) sfx($('scene-case'), p.sfxOk || '!!'); else sfx($('scene-case'), t('sfxHaha'), true);
        if (p.apres) p.apres(c.ok);
        suite.hidden = false;
        suite.focus();
      } else {
        b.disabled = true;
        b.classList.add('faux');
        sfx($('scene-case'), t('sfxOups'), true);
      }
    }
    suite.onclick = () => { i++; if (i < planches.length) afficher(); else fin(); };
    afficher();
  }

  // ─── L'écran d'épreuve : en-tête, retour au joueur, bouton suivant ───
  function entete(cle, consigne) {
    $('ep-titre').textContent = t(cle + 'Titre');
    $('ep-ref').textContent = t(cle + 'Ref');
    $('ep-consigne').innerHTML = consigne || t(cle + 'Consigne');
    $('ep-progres').textContent = '';
    $('ep-score').textContent = '';
  }
  function compteurs(i, n, score) {
    $('ep-progres').textContent = t('progres', { i: i, n: n });
    $('ep-score').textContent = score != null ? t('scoreEp', { s: score }) : '';
  }
  function retour(ok, titre, texte, defn) {
    const r = $('ep-retour');
    r.hidden = false;
    r.className = 'case retour ' + (ok === true ? 'ok' : ok === false ? 'ko' : '');
    $('ep-retour-titre').textContent = titre;
    $('ep-retour-texte').textContent = texte || '';
    // La définition du sophisme, pour avoir le temps de comprendre ce que le nom veut dire.
    const def = $('ep-retour-def');
    def.hidden = !defn;
    def.style.whiteSpace = 'pre-line';
    def.textContent = defn || '';
    annoncer(titre + ' ' + (defn || '') + ' ' + (texte || ''));
  }
  function cacherRetour() { $('ep-retour').hidden = true; }

  // Le nom et la définition d'un sophisme, sous chaque retour : on ne nomme
  // jamais un piège sans dire ce qu'il fait.
  function definition(id) {
    return '📖 ' + soph(id).l + (I18N.lang === 'en' ? ': ' : ' : ') + soph(id).d;
  }
  // Les sophismes croisés pendant l'épreuve (ou l'examen) en cours, pour la
  // révision de fin : id → { ok, ko }.
  let croises = {};
  function croise(id, ok) {
    if (!id) return;
    const c = croises[id] || (croises[id] = { ok: 0, ko: 0 });
    if (ok) c.ok++; else c.ko++;
  }
  // La révision de fin : tous les sophismes croisés, avec leur définition et leur parade.
  function revue() {
    const ids = Object.keys(croises);
    if (!ids.length) return null;
    const box = el('div', 'case lexique');
    box.appendChild(el('h3', 'titre-case', t('revueTitre')));
    box.appendChild(el('p', 'consigne', t('revueIntro')));
    const dl = el('dl');
    ids.forEach(id => {
      const s = soph(id), c = croises[id];
      const dt = el('dt', null, s.l + ' ');
      dt.appendChild(el('span', c.ko ? 'revue-ko' : 'revue-ok', c.ko ? t('revueRate') : t('revueRepere')));
      const dd = el('dd', null, majuscule(s.d) + ' ');
      dd.append(el('b', null, t('revueParade') + ' '), document.createTextNode(s.parade));
      dl.append(dt, dd);
    });
    box.appendChild(dl);
    return box;
  }
  function majuscule(x) { return x.charAt(0).toUpperCase() + x.slice(1); }
  let jetonSuivant = 0;
  function suivant(label, fn, autoMs) {
    const b = $('ep-suivant');
    const jeton = ++jetonSuivant;
    b.hidden = false;
    b.textContent = label;
    b.onclick = () => { if (jeton !== jetonSuivant) return; jetonSuivant++; b.hidden = true; fn(); };
    b.focus({ preventScroll: true });
    b.scrollIntoView({ behavior: mouvementReduit ? 'auto' : 'smooth', block: 'nearest' });
    if (autoMs) setTimeout(() => { if (jeton === jetonSuivant) b.onclick(); }, autoMs);
  }

  // ═════════════════════════════════════════════════════════════════════
  //  Les manches — chacune appelle fini(points entre 0 et 1, item joué)
  // ═════════════════════════════════════════════════════════════════════

  // ─── Les Feuilles qui tombent ───
  let duree = 11;                     // secondes de chute, raccourcies à chaque feuille
  let clavierActif = null;
  let chronoActif = null;            // le chrono des Cloches, à couper si on quitte l'épreuve
  function mancheFeuille(item, fini, opts) {
    opts = opts || {};
    const aire = $('ep-aire');
    aire.textContent = '';
    const terrain = el('div', 'terrain');
    const f = el('div', 'feuille');
    const ic = el('span', 'feuille__icone', '🍃'); ic.setAttribute('aria-hidden', 'true');
    f.append(ic, el('p', null, item.t));
    terrain.appendChild(f);
    const actions = el('div', 'feuille-actions');
    const bT = bouton('btn-manga', t('trancher'));
    const bL = bouton('btn-manga btn-manga--clair', t('laisser'));
    actions.append(bT, bL);
    const touches = el('p', 'touches'); touches.innerHTML = t('touches');
    aire.append(terrain, actions, touches);

    const statique = calme() || opts.statique;
    let fait = false;
    if (statique) f.classList.add('posee');
    else {
      f.style.animationDuration = duree + 's';
      f.classList.add('tombe');
      f.addEventListener('animationend', () => decider(false, true));
    }
    annoncer(item.t);

    function clavier(e) {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const k = e.key.toLowerCase();
      if (k === 't') { e.preventDefault(); decider(true); }
      else if (k === 'l' || k === 'arrowdown') { e.preventDefault(); decider(false); }
    }
    if (clavierActif) document.removeEventListener('keydown', clavierActif);
    clavierActif = clavier;
    document.addEventListener('keydown', clavier);
    bT.addEventListener('click', () => decider(true));
    bL.addEventListener('click', () => decider(false));
    bT.focus({ preventScroll: true });
    geste(terrain, f, angle => { f.style.setProperty('--coupe', angle + 'deg'); decider(true); }, () => fait);

    function decider(tranche, tombee) {
      if (fait) return;
      fait = true;
      document.removeEventListener('keydown', clavier);
      clavierActif = null;
      f.style.animationPlayState = 'paused';
      bT.disabled = bL.disabled = true;
      const ok = (tranche === !!item.piege);
      if (tranche) { f.classList.add('tranchee'); moitie(terrain, f); sfx(terrain, t('sfxClac')); }
      let titre;
      if (ok && item.piege) {
        demasque(item.piege);
        cutin(t('techDemasquee'), soph(item.piege).tech);
        titre = t('feuilleOkPiege', { l: soph(item.piege).l });
      } else if (ok) {
        titre = t('feuilleOkSain');
      } else if (item.piege) {
        titre = t(tombee ? 'feuilleTombee' : 'feuilleRatePiege', { l: soph(item.piege).l });
      } else {
        titre = t('feuilleRateSain');
      }
      croise(item.piege, ok);
      retour(ok, titre, item.e, item.piege ? definition(item.piege) : '');
      duree = Math.max(7, duree - 0.3);
      const joue = { id: item.id, titre: item.t, reussi: ok, explication: item.e };
      // On attend toujours le joueur : le temps de lire le nom du sophisme et ce qu'il veut dire.
      suivant(t('suivant'), () => fini(ok ? 1 : 0, joue));
    }
  }

  // Trancher d'un geste, comme Fruit Ninja : on glisse la souris (bouton
  // enfoncé) ou le doigt à travers la feuille. Une traînée suit le geste ; la
  // feuille est tranchée quand le trait l'a traversée sur une bonne longueur,
  // pour qu'un simple clic de lecture ne coupe rien.
  function geste(terrain, f, coupe, fini) {
    const NS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'trainee'); svg.setAttribute('aria-hidden', 'true');
    const trait = document.createElementNS(NS, 'polyline');
    svg.appendChild(trait); terrain.appendChild(svg);
    let pts = [], actif = false, dedans = 0, depart = null, anim = 0;
    const local = e => { const r = terrain.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now() }; };
    // Longueur du segment a→b à l'intérieur du rectangle r (découpage de Liang-Barsky).
    function traverse(a, b, r) {
      const dx = b.x - a.x, dy = b.y - a.y; let t0 = 0, t1 = 1;
      const bords = [[-dx, a.x - r.left], [dx, r.right - a.x], [-dy, a.y - r.top], [dy, r.bottom - a.y]];
      for (const [p, q] of bords) {
        if (p === 0) { if (q < 0) return 0; continue; }
        const u = q / p;
        if (p < 0) { if (u > t1) return 0; if (u > t0) t0 = u; } else { if (u < t0) return 0; if (u < t1) t1 = u; }
      }
      return (t1 - t0) * Math.hypot(dx, dy);
    }
    function dessiner() {
      const now = performance.now();
      pts = pts.filter(p => now - p.t < 180);
      trait.setAttribute('points', pts.map(p => p.x.toFixed(1) + ',' + p.y.toFixed(1)).join(' '));
      anim = pts.length ? requestAnimationFrame(dessiner) : 0;
    }
    terrain.addEventListener('pointerdown', e => {
      if (fini() || (e.pointerType === 'mouse' && e.button !== 0)) return;
      actif = true; dedans = 0; const p = local(e); depart = p; pts = [p];
      try { terrain.setPointerCapture(e.pointerId); } catch (_) {}
      e.preventDefault();
    });
    terrain.addEventListener('pointermove', e => {
      if (!actif || fini()) return;
      const p = local(e), a = pts[pts.length - 1] || p;
      pts.push(p);
      if (!anim) anim = requestAnimationFrame(dessiner);
      const tr = terrain.getBoundingClientRect(), fr = f.getBoundingClientRect();
      const r = { left: fr.left - tr.left, right: fr.right - tr.left, top: fr.top - tr.top, bottom: fr.bottom - tr.top };
      dedans += traverse(a, p, r);
      if (dedans >= Math.min(140, (r.right - r.left) * 0.3)) {
        actif = false;
        coupe(Math.max(-35, Math.min(35, Math.atan2(p.y - depart.y, p.x - depart.x) * 180 / Math.PI)));
      }
    });
    const lacher = () => { actif = false; };
    terrain.addEventListener('pointerup', lacher);
    terrain.addEventListener('pointercancel', lacher);
  }
  // La moitié basse de la feuille tranchée s'écarte un peu de la haute : la
  // coupe se voit, et la phrase reste lisible pendant qu'on lit le retour.
  function moitie(terrain, f) {
    const m = f.cloneNode(true);
    m.classList.remove('tombe', 'tranchee'); m.classList.add('moitie');
    m.style.top = f.offsetTop + 'px';
    m.style.transform = getComputedStyle(f).transform;
    m.setAttribute('aria-hidden', 'true');
    m.style.animationDuration = m.style.animationPlayState = '';
    if (calme()) m.style.animation = 'none';
    terrain.appendChild(m);
  }

  // ─── L'Œil du sensei ───
  function mancheOeil(item, fini) {
    const aire = $('ep-aire');
    aire.textContent = '';
    const p = el('p', 'phrase-oeil');
    const morceaux = item.t.split('|').map(s => s.trim()).filter(Boolean);
    const boutons = morceaux.map((m, k) => {
      const cible = m.indexOf('[[') >= 0;
      const b = bouton('morceau', m.replace('[[', '').replace(']]', ''));
      b.dataset.cible = cible ? '1' : '0';
      b.style.animationDelay = (-k * 0.45).toFixed(2) + 's';
      b.addEventListener('click', e => { if (glisse) { glisse = false; return; } lancer(b); });
      p.appendChild(b);
      if (k < morceaux.length - 1) p.appendChild(document.createTextNode(' '));
      return b;
    });
    // Le stand de tir : la phrase en cibles, le lanceur en dessous.
    const stand = el('div', 'stand');
    const lanceur = el('div', 'lanceur', '✦'); lanceur.setAttribute('aria-hidden', 'true');
    stand.append(p, lanceur);
    const aide = el('p', 'touches', t('oeilGeste'));
    aire.append(stand, aide);
    boutons[0].focus({ preventScroll: true });

    // Le shuriken part du lanceur vers le morceau visé : d'un clic ou d'un
    // appui sur le morceau, ou d'un glissement dans sa direction (on retient le
    // morceau le plus proche de l'axe du geste).
    let vol = false, glisse = false, depart = null;
    function centre(x) { const r = x.getBoundingClientRect(), s0 = stand.getBoundingClientRect(); return { x: r.left + r.width / 2 - s0.left, y: r.top + r.height / 2 - s0.top }; }
    function lancer(b, cap) {
      if (vol || (b && b.disabled)) return;
      const a = centre(lanceur);
      if (calme()) { if (b) clic(b); return; }
      vol = true;
      const z = b ? centre(b) : { x: a.x + cap.x * 600, y: a.y + cap.y * 600 };
      const sh = el('span', 'shuriken', '✦'); sh.setAttribute('aria-hidden', 'true');
      sh.style.left = a.x + 'px'; sh.style.top = a.y + 'px';
      stand.appendChild(sh);
      lanceur.classList.add('vide');
      const anim = sh.animate([
        { transform: 'translate(-50%, -50%) rotate(0deg) scale(1)' },
        { transform: 'translate(calc(-50% + ' + (z.x - a.x) + 'px), calc(-50% + ' + (z.y - a.y) + 'px)) rotate(900deg) scale(.8)' }
      ], { duration: b ? 320 : 450, easing: 'ease-in' });
      anim.onfinish = () => {
        sh.remove(); vol = false; lanceur.classList.remove('vide');
        if (!b) return;
        b.classList.remove('touche'); void b.offsetWidth; b.classList.add('touche');
        clic(b);
      };
    }
    stand.addEventListener('pointerdown', e => { depart = { x: e.clientX, y: e.clientY }; });
    stand.addEventListener('pointerup', e => {
      if (!depart) return;
      const dx = e.clientX - depart.x, dy = e.clientY - depart.y, d = Math.hypot(dx, dy);
      depart = null;
      if (d < 30 || dy > -10) return;            // un clic, ou un geste vers le bas : rien
      glisse = true; setTimeout(() => { glisse = false; }, 0);
      const u = { x: dx / d, y: dy / d }, a = centre(lanceur);
      let meilleur = null, ecart = 0.35;          // environ 20° de tolérance
      boutons.filter(b => !b.disabled).forEach(b => {
        const c = centre(b), cx = c.x - a.x, cy = c.y - a.y, n = Math.hypot(cx, cy);
        const angle = Math.acos(Math.max(-1, Math.min(1, (cx * u.x + cy * u.y) / n)));
        if (angle < ecart) { ecart = angle; meilleur = b; }
      });
      lancer(meilleur, u);
    });
    let essais = 0;
    const s = soph(item.a);
    function fin(points) {
      boutons.forEach(b => { b.disabled = true; });
      const joue = { id: item.id, titre: boutons.map(b => b.textContent).join(' '), reussi: points > 0, explication: item.e };
      suivant(t('suivant'), () => fini(points, joue));
    }
    function clic(b) {
      if (b.dataset.cible === '1') {
        boutons.forEach(x => { if (x.dataset.cible === '1') x.classList.add('trouve'); });
        demasque(item.a);
        sfx(aire, t('sfxClac'));
        cutin(t('techDemasquee'), s.tech);
        croise(item.a, true);
        retour(true, t('oeilOk', { tech: s.tech, l: s.l }), item.e, definition(item.a));
        fin(essais === 0 ? 1 : 0.5);
      } else {
        essais++;
        b.classList.add('barre');
        b.disabled = true;
        if (essais === 1) {
          retour(null, t('oeilIndice'), t('oeilIndiceTxt', { signes: s.signes }));
          const prochain = boutons.find(x => !x.disabled);
          if (prochain) prochain.focus({ preventScroll: true });
        } else {
          boutons.forEach(x => { if (x.dataset.cible === '1') x.classList.add('revele'); });
          sfx(aire, t('sfxOups'), true);
          croise(item.a, false);
          retour(false, t('oeilRate', { tech: s.tech, l: s.l }), item.e, definition(item.a));
          fin(0);
        }
      }
    }
  }

  // ─── Le Test des clochettes ───
  function mancheCloche(item, fini) {
    const aire = $('ep-aire');
    aire.textContent = '';
    const tete = el('div', 'case case--trame');
    tete.appendChild(el('p', 'sujet', t('clocheSujet', { sujet: item.sujet })));
    const cloches = el('div', 'cloches');
    cloches.setAttribute('aria-hidden', 'true');
    const c1 = el('span', 'cloche', '🔔'), c2 = el('span', 'cloche', '🔔');
    cloches.append(c1, c2);
    tete.appendChild(cloches);
    // La rivière : les phrases descendent le courant l'une après l'autre ; on
    // repêche les clochettes avant la cascade. Le courant remplace le chrono.
    // En mode calme, le discours reste posé, sans courant ni temps limite.
    const riviere = !calme();
    const liste = el('div', 'discours' + (riviere ? ' riviere' : ''));
    const erreursEl = el('p', 'erreurs', t('erreurs', { n: 0 }));
    tete.append(liste, erreursEl);
    aire.appendChild(tete);

    let prises = 0, erreurs = 0, termine = false;
    const boutons = item.phrases.map((ph, k) => {
      const b = bouton('phrase-cloche', ph.t);
      b.addEventListener('click', () => clic(b, ph));
      if (riviere) {
        b.style.animationDelay = (k * 11) + 's';
        b.addEventListener('animationend', e => {
          if (e.animationName !== 'courant' || termine) return;
          b.disabled = true; b.classList.add('passee');
          verifier();
        });
      }
      liste.appendChild(b);
      return b;
    });
    if (riviere) {
      const cascade = el('div', 'cascade'); cascade.setAttribute('aria-hidden', 'true');
      liste.appendChild(cascade);
    }
    boutons[0].focus({ preventScroll: true });
    annoncer(t('clocheSujet', { sujet: item.sujet }));

    let tm = null;
    // Toutes les feuilles repêchées ou passées : fin de la manche.
    function verifier() { if (!termine && boutons.every(x => x.disabled)) terminer(); }
    function note(b, html) { const n = el('span', 'note'); n.innerHTML = html; b.appendChild(n); }
    function clic(b, ph) {
      if (termine) return;
      b.disabled = true;
      if (riviere) { b.style.animationPlayState = 'paused'; b.classList.add('repechee'); }
      if (ph.piege) {
        prises++;
        b.classList.add('prise');
        (prises === 1 ? c1 : c2).classList.add('prise');
        const s = soph(ph.piege);
        note(b, '<b>' + s.tech + '</b> (' + s.l + ') — ' + ph.e);
        demasque(ph.piege);
        sfx(tete, t('sfxDing'));
        annoncer(t('clochePrise', { tech: s.tech, l: s.l }) + ' ' + ph.e);
        if (prises === 2) terminer();
      } else {
        erreurs++;
        b.classList.add('faux');
        note(b, t('clocheSaine'));
        erreursEl.textContent = t('erreurs', { n: erreurs });
        sfx(tete, t('sfxHaha'), true);
        annoncer(t('clocheSaine'));
        if (erreurs >= 3) terminer();
      }
      verifier();
    }
    function terminer() {
      if (termine) return;
      termine = true;
      clearInterval(tm);
      // Le courant s'arrête : le discours se pose, dans l'ordre, pour le bilan.
      if (riviere) { liste.classList.remove('riviere'); boutons.forEach(b => { b.style.animation = 'none'; }); const c = liste.querySelector('.cascade'); if (c) c.remove(); }
      item.phrases.forEach((ph, k) => {
        const b = boutons[k];
        b.disabled = true;
        if (ph.piege && !b.classList.contains('prise')) {
          b.classList.add('manquee');
          const s = soph(ph.piege);
          note(b, '<b>' + t('clocheManquee', { tech: s.tech, l: s.l }) + '</b> ' + ph.e);
        }
      });
      const titre = prises === 2 ? t('clochesToutes') : prises === 1 ? t('clochesUne') : t('clochesAucune');
      const expl = item.phrases.filter(ph => ph.piege).map(ph => ph.e).join(' ');
      item.phrases.forEach((ph, k) => { if (ph.piege) croise(ph.piege, boutons[k].classList.contains('prise')); });
      retour(prises === 2 ? true : prises === 0 ? false : null, titre, expl,
        item.phrases.filter(ph => ph.piege).map(ph => definition(ph.piege)).join('\n'));
      const joue = { id: item.id, titre: item.sujet, reussi: prises === 2, explication: expl };
      suivant(t('suivant'), () => fini(prises / 2, joue));
    }
  }

  // ─── Le Contre ───
  let dureeContre = 24;               // secondes de vol de la flèche, raccourcies à chaque manche
  function mancheContre(item, fini) {
    const aire = $('ep-aire');
    aire.textContent = '';
    const s = soph(item.a);
    const cadre = el('div', 'case case--trame');
    cadre.appendChild(el('span', 'badge-tech', t('contreTech', { tech: s.tech })));
    cadre.appendChild(el('p', 'bulle', item.t));
    // La piste : l'argument file comme une flèche de Sophisuke vers toi. On
    // l'arrête en posant la bonne parade dessus (glisser), ou d'un clic.
    const piste = el('div', 'piste'); piste.setAttribute('aria-hidden', 'true');
    const fleche = el('div', 'fleche', '➳');
    piste.append(el('span', 'piste__tireur', '🥷'), fleche, el('span', 'piste__cible', '🙋'));
    const zone = el('div', 'choix-liste');
    const choix = shuffle(item.choix.slice());
    let fait = false, tire = false;
    const boutons = choix.map(c => {
      const b = bouton('choix', c.t);
      b.addEventListener('click', () => { if (tire) { tire = false; return; } choisir(c, b); });
      saisir(b, c);
      zone.appendChild(b);
      return b;
    });
    cadre.append(piste, zone, el('p', 'touches', t('contreGeste')));
    aire.appendChild(cadre);
    annoncer(item.t);
    boutons[0].focus({ preventScroll: true });
    if (!calme()) {
      fleche.style.animationDuration = dureeContre + 's';
      fleche.classList.add('vole');
      fleche.addEventListener('animationend', () => choisir({ k: 'tard' }, null));
    }

    // Glisser une parade : une copie suit le doigt ; lâchée sur la piste, elle pare.
    function saisir(b, c) {
      let d = null, copie = null;
      b.addEventListener('pointerdown', e => {
        if (fait || (e.pointerType === 'mouse' && e.button !== 0)) return;
        d = { x: e.clientX, y: e.clientY };
        try { b.setPointerCapture(e.pointerId); } catch (_) {}
      });
      b.addEventListener('pointermove', e => {
        if (!d || fait) return;
        if (!copie && Math.hypot(e.clientX - d.x, e.clientY - d.y) < 10) return;
        if (!copie) {
          copie = el('div', 'parade-copie', '🛡️ ' + c.t);
          copie.setAttribute('aria-hidden', 'true');
          document.body.appendChild(copie);
          b.classList.add('saisi');
        }
        copie.style.left = e.clientX + 'px'; copie.style.top = e.clientY + 'px';
        const r = piste.getBoundingClientRect();
        piste.classList.toggle('visee', e.clientY > r.top - 30 && e.clientY < r.bottom + 30);
      });
      const lacher = e => {
        if (!d) return;
        d = null; piste.classList.remove('visee'); b.classList.remove('saisi');
        if (!copie) return;
        copie.remove(); copie = null;
        tire = true; setTimeout(() => { tire = false; }, 0);
        const r = piste.getBoundingClientRect();
        if (e.type === 'pointerup' && e.clientY > r.top - 30 && e.clientY < r.bottom + 30) choisir(c, b);
      };
      b.addEventListener('pointerup', lacher);
      b.addEventListener('pointercancel', lacher);
      b.style.touchAction = 'none';
    }
    function choisir(c, b) {
      if (fait) return;
      fait = true;
      fleche.style.animationPlayState = 'paused';
      boutons.forEach((x, k) => { x.disabled = true; if (choix[k].k === 'bonne') x.classList.add('juste'); });
      const ok = c.k === 'bonne';
      if (b && !ok) b.classList.add('faux');
      dureeContre = Math.max(14, dureeContre - 1);
      if (ok) {
        const bouclier = el('span', 'bouclier', '🛡️'); bouclier.setAttribute('aria-hidden', 'true');
        bouclier.style.left = (fleche.offsetLeft + fleche.offsetWidth) + 'px';
        piste.appendChild(bouclier);
        fleche.classList.add('brisee');
      } else piste.classList.add('touche');
      croise(item.a, ok);
      if (ok) { sfx(cadre, t('sfxContre')); retour(true, t('contreOk'), item.e, definition(item.a)); }
      else if (c.k === 'tard') { sfx(cadre, t('sfxBonk'), true); retour(false, t('contreTard'), item.e, definition(item.a)); }
      else if (c.k === 'sophisme') { sfx(cadre, t('sfxBonk'), true); retour(false, t('contreBonk', { l: soph(c.s).l }), item.e, definition(item.a) + '\n' + definition(c.s)); }
      else { sfx(cadre, t('sfxOups'), true); retour(false, t('contreCede'), item.e, definition(item.a)); }
      const joue = { id: item.id, titre: item.t, reussi: ok, explication: item.e };
      suivant(t('suivant'), () => fini(ok ? 1 : 0, joue));
    }
  }

  // ═════════════════════════════════════════════════════════════════════
  //  Les épreuves : un paquet de manches, un seuil, une technique
  // ═════════════════════════════════════════════════════════════════════
  const EP = {
    feuilles: {
      paquet: () => shuffle(shuffle(DOJO.feuilles.filter(f => f.piege)).slice(0, 8)
                     .concat(shuffle(DOJO.feuilles.filter(f => !f.piege)).slice(0, 4))),
      manche: mancheFeuille, seuil: 9
    },
    oeil:       { paquet: () => shuffle(DOJO.oeil.slice()).slice(0, 6), manche: mancheOeil, seuil: 4 },
    clochettes: { paquet: () => shuffle(DOJO.clochettes.filter(c => !c.examen)).slice(0, 2), manche: mancheCloche, seuil: 1.5, unite: 2 },
    contre:     { paquet: () => shuffle(DOJO.ripostes.filter(r => !r.examen)).slice(0, 5), manche: mancheContre, seuil: 4 }
  };

  function lancerEpreuve(nom) {
    const def = EP[nom];
    const paquet = def.paquet();
    const unite = def.unite || 1;             // clochettes : on compte en cloches
    let i = 0, score = 0;
    duree = 11;
    croises = {};
    ColFin.protegerSortie(true);
    entete(nom);
    cacherRetour();
    montrer('epreuve');
    const total = paquet.length * unite;
    function jouer() {
      cacherRetour();
      compteurs(i + 1, paquet.length, score * unite);
      def.manche(paquet[i], pts => {
        score += pts;
        i++;
        if (i < paquet.length) jouer();
        else resultat(nom, score * unite, total, def.seuil * unite);
      });
    }
    // Les Feuilles : avant la première chute, le lexique des pièges à repérer.
    if (nom === 'feuilles') lexique(paquet, jouer); else jouer();
  }

  function lexique(paquet, partir) {
    const ids = [...new Set(paquet.map(x => x.piege).filter(Boolean))];
    const aire = $('ep-aire');
    aire.textContent = '';
    const box = el('div', 'case lexique');
    box.appendChild(el('p', 'retour__titre', t('lexiqueTitre')));
    box.appendChild(el('p', 'consigne', t('lexiqueIntro')));
    const dl = el('dl');
    ids.forEach(id => { dl.append(el('dt', null, soph(id).l), el('dd', null, soph(id).d)); });
    box.appendChild(dl);
    aire.appendChild(box);
    suivant(t('lexiquePret'), partir);
  }

  function resultat(nom, score, total, seuil) {
    ColFin.protegerSortie(false);
    const reussi = score >= seuil;
    const nouvelle = reussi && !P.epreuves[nom];
    if (reussi) { P.epreuves[nom] = true; sauver(); }
    cacherRetour();
    $('ep-progres').textContent = '';
    $('ep-score').textContent = '';
    const aire = $('ep-aire');
    aire.textContent = '';
    const c = el('div', 'case resultat');
    const h = el('h3', 'titre-case', reussi ? t('epReussie') : t('epRatee'));
    c.appendChild(h);
    c.appendChild(el('p', 'resultat__score', String(score).replace('.', ',') + ' / ' + total));
    c.appendChild(el('p', 'comp', t('epScore', { s: String(score).replace('.', ','), t: total, seuil: String(seuil).replace('.', ',') })));
    c.appendChild(el('p', 'bulle', (reussi ? t('senseiBravo') : t('senseiEncore'))));
    if (reussi) {
      const tech = TECHNIQUES[nom];
      const bloc = el('div', 'tech-acquise');
      bloc.appendChild(el('span', 'tech-acquise__label', t('nouvelleTech')));
      bloc.appendChild(el('strong', null, t('tech_' + tech)));
      bloc.appendChild(el('span', null, t('techDesc_' + tech)));
      c.appendChild(bloc);
      if (nouvelle) cutin(t('techAcquiseCut'), t('tech_' + tech));
    }
    aire.appendChild(c);
    const r = revue();
    if (r) aire.appendChild(r);
    annoncer(h.textContent + ' ' + score + ' / ' + total);
    h.tabIndex = -1;
    h.focus({ preventScroll: true });
    window.scrollTo(0, 0);
    const actions = el('div', 'actions');
    const bRe = bouton('btn-manga btn-manga--clair', t('reessayer'));
    bRe.addEventListener('click', () => lancerEpreuve(nom));
    const bSuite = bouton('btn-manga', t('continuer'));
    bSuite.addEventListener('click', () => (reussi ? pique(apresPique) : carte()));
    actions.append(bSuite, bRe);
    aire.appendChild(actions);
  }

  // Après la deuxième épreuve réussie, une seule fois : le flash-back de Sophisuke.
  function apresPique() {
    const reussies = EPREUVES.filter(n => P.epreuves[n]).length;
    if (reussies >= 2 && !P.fissure) { P.fissure = true; sauver(); scene(DOJO.arc.fissure, carte); }
    else carte();
  }

  // Sophisuke surgit entre deux épreuves, avec une pique à démasquer.
  function pique(apres) {
    const p = DOJO.piques[P.piques % DOJO.piques.length];
    P.piques++; sauver();
    const ids = shuffle([p.a].concat(p.opts));
    const s = soph(p.a);
    scene([
      { qui: 'rival', texte: p.t },
      { qui: 'narrateur', texte: t('piqueQuestion', { t: p.t }), uneChance: true,
        choix: ids.map(id => ({ t: soph(id).tech + ' — ' + soph(id).l, ok: id === p.a,
                                r: id === p.a ? t('piqueOk', { tech: s.tech, l: s.l, e: p.e }) : t('piqueKo', { tech: s.tech, l: s.l, e: p.e }) })),
        apres: ok => { if (ok) demasque(p.a); } }
    ], apres);
  }

  // ─── Prologue : l'arrivée et la Divination de l'eau ───
  function accueil() {
    const a = DOJO.accueil;
    scene([
      { qui: 'narrateur', texte: a.retard },
      { qui: 'sensei', texte: a.excuse },
      { qui: 'sensei', texte: a.defi, choix: shuffle(a.choix.slice()), sfxOk: '!!' },
      ...a.entree
    ], () => { P.accueil = true; sauver(); divination(); });
  }

  function divination() {
    const items = shuffle(DOJO.divination.slice());
    const points = { coeur: 0, troupeau: 0, detective: 0, forteresse: 0 };
    const reponses = [];
    let i = 0;
    entete('div');
    cacherRetour();
    montrer('epreuve');
    const aire = $('ep-aire');
    aire.textContent = '';
    const bol = el('div', 'bol'); bol.setAttribute('aria-hidden', 'true');
    const eau = el('div', 'eau'); const feuille = el('span', 'bol__feuille', '🍃');
    bol.append(eau, feuille);
    const zone = el('div');
    aire.append(bol, zone);
    function poser() {
      compteurs(i + 1, items.length);
      zone.textContent = '';
      const it = items[i];
      zone.appendChild(el('p', 'bulle', it.t));
      const btns = el('div', 'div-boutons');
      [['oui', 'divOui'], ['bof', 'divBof'], ['non', 'divNon']].forEach(([v, cle]) => {
        const b = bouton('btn-manga btn-manga--clair', t(cle));
        b.addEventListener('click', () => noter(it, v));
        btns.appendChild(b);
      });
      zone.appendChild(btns);
      annoncer(it.t);
      btns.firstChild.focus({ preventScroll: true });
    }
    function noter(it, v) {
      reponses.push({ it: it, v: v });
      if (it.f === 'sain') points.forteresse += v === 'non' ? 2 : v === 'bof' ? 1 : 0;
      else points[it.f] += v === 'oui' ? 2 : v === 'bof' ? 1 : 0;
      feuille.style.transform = 'translateX(-50%) rotate(' + (Math.random() * 60 - 30) + 'deg)';
      i++;
      if (i < items.length) poser(); else reveler();
    }
    function reveler() {
      // Le type le plus marqué l'emporte ; sous 3 points, l'eau reste calme.
      let type = 'calme', max = 2;
      ['coeur', 'troupeau', 'detective', 'forteresse'].forEach(k => { if (points[k] > max) { max = points[k]; type = k; } });
      P.type = type; sauver();
      const ty = DOJO.types[type];
      eau.className = 'eau eau--' + type;
      $('ep-progres').textContent = '';
      zone.textContent = '';
      const titre = el('h3', 'type-nom', ty.nom);
      zone.append(el('p', 'bulle', ty.eau), titre, el('p', 'consigne', ty.desc));
      zone.appendChild(el('p', 'retour__titre', t('divRetenir')));
      const ul = el('ul', 'liste-verdicts');
      reponses.forEach(r => {
        const li = el('li', r.it.f === 'sain' ? 'sain' : 'piege', r.it.t);
        li.appendChild(el('small', null, (r.it.f === 'sain' ? t('divVerdictSain') : t('divVerdictPiege')) + ' — ' + r.it.e));
        ul.appendChild(li);
      });
      zone.appendChild(ul);
      cutin(t('divResultat'), ty.nom);
      annoncer(ty.nom + '. ' + ty.eau + ' ' + ty.desc);
      titre.tabIndex = -1;
      titre.focus({ preventScroll: true });
      suivant(t('continuer'), carte);
    }
    poser();
  }

  // ─── La carte du dojo ───
  function carte() {
    ColFin.protegerSortie(false);
    $('carte-rang').textContent = rang();
    $('carte-type').textContent = P.type ? t('tonType', { nom: DOJO.types[P.type].nom }) : '';
    const ids = Object.keys(DOJO.sophismes);
    $('btn-rouleau').textContent = t('rouleauBtn', { n: ids.filter(id => P.rouleau[id]).length, t: ids.length });

    const grille = $('carte-grille');
    grille.textContent = '';
    EPREUVES.forEach((nom, k) => {
      const fait = !!P.epreuves[nom];
      const c = el('div', 'case');
      const num = el('span', 'num', String(k + 1)); num.setAttribute('aria-hidden', 'true');
      c.append(num, el('span', 'ref', t(nom + 'Ref')), el('h3', 'titre-case', t(nom + 'Titre')), el('p', 'comp', t(nom + 'Comp')));
      c.appendChild(el('p', 'statut' + (fait ? ' fait' : ''), fait ? t('techAcquise', { tech: t('tech_' + TECHNIQUES[nom]) }) : t('aFaire')));
      const b = bouton('btn-manga' + (fait ? ' btn-manga--clair' : ''), fait ? t('rejouer') : t('commencer'));
      b.addEventListener('click', () => lancerEpreuve(nom));
      c.appendChild(b);
      grille.appendChild(c);
    });

    const reste = EPREUVES.length - nbReussies();
    const bEx = $('btn-examen');
    bEx.disabled = reste > 0;
    bEx.textContent = P.examen ? t('repasserExamen') : t('passerExamen');
    $('carte-examen-txt').textContent = reste > 0 ? t('examenVerrou', { n: reste }) : P.examen ? t('examenFait') : t('examenPret');

    const ul = $('carte-techs');
    ul.textContent = '';
    EPREUVES.forEach(nom => {
      const tech = TECHNIQUES[nom];
      const li = el('li', P.epreuves[nom] ? 'acquise' : '');
      li.textContent = P.epreuves[nom] ? t('tech_' + tech) : t('techVerrou', { tech: t('tech_' + tech), ep: t(nom + 'Titre') });
      li.appendChild(el('span', null, t('techDesc_' + tech)));
      ul.appendChild(li);
    });

    const cb = $('mode-calme');
    cb.checked = calme();
    cb.disabled = mouvementReduit;
    if (mouvementReduit) cb.nextElementSibling.textContent = t('modeCalmeForce');
    montrer('carte');
  }

  // ─── Le Rouleau Interdit ───
  function rouleau() {
    const g = $('rouleau-grille');
    g.textContent = '';
    Object.keys(DOJO.sophismes).forEach(id => {
      const s = soph(id);
      const n = P.rouleau[id] || 0;
      const c = el('article', 'carte-tech' + (n ? '' : ' verrou'));
      if (n) {
        c.append(el('h3', null, s.tech), el('p', 'soph', s.l));
        const sg = el('p'); sg.append(el('b', null, t('rouleauSignes') + ' '), document.createTextNode(s.signes));
        const pa = el('p'); pa.append(el('b', null, t('rouleauParade') + ' '), document.createTextNode(s.parade));
        c.append(sg, pa, el('p', 'compte', t('rouleauCompte', { n: n })));
      } else {
        const h = el('h3', null, '？'); h.setAttribute('aria-hidden', 'true');
        c.append(h, el('p', null, t('rouleauVerrou')));
      }
      g.appendChild(c);
    });
    montrer('rouleau');
  }

  // ─── L'examen de la Porte ───
  function lancerExamen() {
    const ex = DOJO.examen;
    scene([{ qui: 'rival', texte: ex.intro }, ...DOJO.arc.avantExamen], () => {
      const pieges = shuffle(DOJO.feuilles.filter(f => f.piege)).slice(0, 2);
      const sain = shuffle(DOJO.feuilles.filter(f => !f.piege)).slice(0, 1);
      const manches = shuffle(pieges.concat(sain)).map(it => [mancheFeuille, it, { statique: true }])
        .concat([[mancheOeil, shuffle(DOJO.oeil.slice())[0]]])
        .concat([[mancheCloche, DOJO.clochettes.find(c => c.examen)]])
        .concat([[mancheContre, DOJO.ripostes.find(r => r.examen)]]);
      const joue = [];
      let i = 0, score = 0;
      croises = {};
      ColFin.protegerSortie(true);
      entete('examen', t('examenConsigne'));
      $('ep-titre').textContent = t('examenTitre');
      $('ep-ref').textContent = t('examenRef');
      montrer('epreuve');
      function jouer() {
        cacherRetour();
        compteurs(i + 1, manches.length, String(score).replace('.', ','));
        const [fn, item, opts] = manches[i];
        fn(item, (pts, j) => {
          score += pts;
          joue.push(j);
          i++;
          if (i < manches.length) jouer();
          else if (score >= 4) dixiemeQuestion(joue);
          else finExamen(false, joue);
        }, opts);
      }
      jouer();
    });
  }

  function dixiemeQuestion(joue) {
    const ex = DOJO.examen;
    scene([
      { qui: 'narrateur', texte: ex.examinateur },
      { qui: 'examinateur', texte: ex.q10, sfxOk: t('sfxClac'),
        choix: ex.choix.map((c, k) => ({ t: c.t, ok: c.ok, r: c.ok ? ex.revelation : (k === 0 ? ex.rateAbandon : ex.rateRepond) })),
        apres: ok => {
          if (!ok) return;
          P.examen = true; sauver();
          demasque('dilemme'); demasque('pente');
          cutin(t('examenOkCut'), t('examenSur'));
        } },
      ...DOJO.arc.apresExamen
    ], () => ellipse(ex.apres, () => finExamen(true, joue)));
  }

  // L'écran noir « quelques heures plus tard… » : clin d'œil aux ellipses de manga.
  function ellipse(texte, apres) {
    const e = $('ellipse');
    e.textContent = texte;
    e.appendChild(el('span', 'sr-only', ' ' + t('clicPourContinuer')));
    e.hidden = false;
    annoncer(texte);
    let parti = false;
    function partir() {
      if (parti) return;
      parti = true;
      e.hidden = true;
      document.removeEventListener('keydown', partir);
      e.removeEventListener('click', partir);
      apres();
    }
    setTimeout(() => { document.addEventListener('keydown', partir); e.addEventListener('click', partir); }, 400);
    setTimeout(partir, 2600);
  }

  function finExamen(reussi, joue) {
    montrer('fin');
    ColFin.rendre({
      cible: $('fin-recap'),
      jeu: 'arene-dojo',
      titre: reussi ? '👁️ ' + t('finTitreOk') : '🥷 ' + t('examenRate'),
      message: reussi ? t('finMsgOk') : t('examenRateMsg'),
      items: joue,
      onRejouer: () => lancerExamen(),
      onRecommencer: () => lancerExamen()
    });
    const ancienne = document.querySelector('#ecran-fin .lexique');
    if (ancienne) ancienne.remove();
    const r = revue();
    if (r) $('fin-recap').after(r);
    if (reussi) portes();
  }

  // ─── Les portes de l'Agora : l'examen réussi, elles s'ouvrent ───
  function portes() {
    const ancien = document.querySelector('.portes');
    if (ancien) ancien.remove();
    const o = el('div', 'portes' + (calme() ? ' portes--calme' : ''));
    o.setAttribute('role', 'dialog');
    o.setAttribute('aria-modal', 'true');
    o.setAttribute('aria-labelledby', 'portes-titre');
    o.innerHTML =
      '<div class="portes__scene" aria-hidden="true">' +
        '<div class="portes__fronton"></div>' +
        '<div class="portes__facade"><span class="portes__colonne"></span>' +
          '<div class="portes__cadre"><div class="portes__lumiere"></div>' +
          '<div class="portes__battant portes__battant--g"></div><div class="portes__battant portes__battant--d"></div></div>' +
          '<span class="portes__colonne"></span></div>' +
        '<div class="portes__marches"></div>' +
      '</div>' +
      '<div class="portes__texte">' +
        '<p class="portes__sur" id="portes-titre"></p>' +
        '<div class="portes__actions"><a class="btn-manga" href="index.html?entrer"></a>' +
        '<button type="button" class="btn-manga btn-manga--clair"></button></div>' +
      '</div>';
    o.querySelector('.portes__sur').textContent = t('portesTitre');
    const entrer = o.querySelector('a'), bilan = o.querySelector('button');
    entrer.textContent = t('portesEntrer');
    bilan.textContent = t('portesBilan');
    document.body.appendChild(o);
    const fermer = () => { document.removeEventListener('keydown', echap, true); o.remove(); $('fin-recap').focus && $('fin-recap').focus({ preventScroll: true }); };
    function echap(e) { if (e.key === 'Escape') { e.preventDefault(); fermer(); } }
    document.addEventListener('keydown', echap, true);
    bilan.addEventListener('click', fermer);
    annoncer(t('portesTitre'));
    setTimeout(() => entrer.focus({ preventScroll: true }), calme() ? 0 : 2600);
  }

  // ─── Branchements ───
  $('btn-entrer').addEventListener('click', () => (P.accueil ? carte() : accueil()));
  // Le sensei déjà rencontré : on arrive directement sur la carte du dojo.
  if (P.accueil) carte(); else libelleRetour('intro');
  $('btn-rouleau').addEventListener('click', rouleau);
  $('rouleau-retour').addEventListener('click', carte);
  $('btn-examen').addEventListener('click', lancerExamen);
  $('fin-dojo').addEventListener('click', carte);
  $('mode-calme').addEventListener('change', e => { P.calme = e.target.checked; sauver(); });
  $('btn-effacer').addEventListener('click', () => {
    ColModale.confirmer({ titre: t('effacerTitre'), texte: t('effacerTexte'), ok: t('effacerOui'), annuler: t('effacerNon') })
      .then(oui => {
        if (!oui) return;
        try { localStorage.removeItem(CLE); } catch (e) {}
        P = neuve();
        montrer('intro', $('btn-entrer'));
      });
  });
})();
