/* =========================================================================
   retours.js — bouton « Commentaire », outil d'auteur pour Antonin
   Chargé sur toutes les pages publiées, mais invisible par défaut : sans le
   drapeau d'activation, ce fichier ne touche pas au DOM et ne fait rien. Ce
   n'est pas une fonction du jeu, un élève ne doit jamais le voir.

   ── Activation ───────────────────────────────────────────────────────────
   Ouvrir n'importe quelle page avec « ?retours=1 » pose un drapeau dans le
   localStorage du navigateur (clé « jeux.retours.actif ») : le bouton
   apparaît alors sur toutes les pages, sur cette machine et ce navigateur
   seulement, jusqu'à « ?retours=0 ».

   ── Ce qu'il capture ─────────────────────────────────────────────────────
   À l'ouverture du panneau, sans qu'Antonin ait à écrire quoi que ce soit :
   le jeu, l'URL complète, la langue, la largeur de fenêtre, l'écran visible
   (id) et un extrait de son texte, et quelques variables de position si le
   jeu les expose en global. Tout est dans des try/catch : un contexte
   incomplet ne doit jamais faire planter la page.

   Les retours sont stockés en localStorage (clé « jeux.retours.liste »),
   jamais envoyés nulle part. L'export produit un Markdown à coller ou à
   télécharger.
   ========================================================================= */
(function () {
  'use strict';

  var CLE_ACTIF = 'jeux.retours.actif';
  var CLE_LISTE = 'jeux.retours.liste';

  /* ---------- activation ---------- */
  try {
    var param = new URLSearchParams(location.search).get('retours');
    if (param === '1') localStorage.setItem(CLE_ACTIF, '1');
    else if (param === '0') localStorage.removeItem(CLE_ACTIF);
  } catch (e) {}

  var actif = false;
  try { actif = localStorage.getItem(CLE_ACTIF) === '1'; } catch (e) {}
  if (!actif) return;

  /* ---------- stockage ---------- */
  function lireListe() {
    try { return JSON.parse(localStorage.getItem(CLE_LISTE) || '[]'); }
    catch (e) { return []; }
  }
  function ecrireListe(liste) {
    try { localStorage.setItem(CLE_LISTE, JSON.stringify(liste)); }
    catch (e) {}
  }

  /* ---------- détection de l'écran visible ----------
     Deux conventions coexistent dans la collection : les jeux récents (voir
     _gabarit/) utilisent `.ecran` + `[hidden]`, les plus anciens `.screen` +
     `style="display:none"`. On couvre les deux, plus quelques id fréquents,
     et à défaut on remonte au premier ancêtre visible qui a un id. */
  var SEL_ECRAN = '.screen, .ecran, [class*="screen" i], [class*="ecran" i], ' +
                  '.show, .active, .visible, #game, #jeu, #app, #msrc, #mfb, ' +
                  '[id^="ecran"], [id^="screen"], [role="dialog"]';

  function estVisible(el) {
    if (!el || el.nodeType !== 1) return false;
    if (el.hasAttribute('hidden') || el.getAttribute('aria-hidden') === 'true') return false;
    var s;
    try { s = getComputedStyle(el); } catch (e) { return false; }
    if (!s || s.display === 'none' || s.visibility === 'hidden' || parseFloat(s.opacity) === 0) return false;
    var r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  }
  function aire(el) { var r = el.getBoundingClientRect(); return r.width * r.height; }
  function ancetreAvecId(el) {
    var n = el;
    while (n && n !== document.documentElement) {
      if (n.id) return n;
      n = n.parentElement;
    }
    return null;
  }

  function trouverEcran() {
    var candidats = [];
    try { candidats = Array.prototype.slice.call(document.querySelectorAll(SEL_ECRAN)); }
    catch (e) {}
    var visibles = candidats.filter(estVisible);
    var avecId = visibles.filter(function (el) { return !!el.id; });
    if (avecId.length) {
      avecId.sort(function (a, b) { return aire(a) - aire(b); });
      return avecId[0];
    }
    if (visibles.length) {
      visibles.sort(function (a, b) { return aire(a) - aire(b); });
      return ancetreAvecId(visibles[0]) || visibles[0];
    }
    var principal = document.querySelector('main, #game, #jeu, #app, #contenu');
    return (principal && ancetreAvecId(principal)) || document.body;
  }

  function extraitTexte(el) {
    try {
      var t = (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim();
      return t.slice(0, 200);
    } catch (e) { return ''; }
  }

  /* Quelques noms de variables de position rencontrés dans les jeux de la
     collection. La plupart sont enfermées dans une closure et resteront
     invisibles ici — c'est un bonus, pas une garantie. */
  var VARS_CONNUES = ['qi', 'currentQ', 'current_q', 'idx', 'index', 'i',
    'carteId', 'cardId', 'currentCard', 'activeAsteroid', 'niveau', 'level',
    'etape', 'step', 'score'];

  function variablesGlobales() {
    var out = {};
    VARS_CONNUES.forEach(function (nom) {
      try {
        var v = window[nom];
        if (typeof v === 'number' || typeof v === 'string') out[nom] = v;
      } catch (e) {}
    });
    return out;
  }

  function langueActuelle() {
    try { return (window.I18N && window.I18N.lang) || document.documentElement.lang || 'fr'; }
    catch (e) { return 'fr'; }
  }

  function capturerContexte() {
    var ctx = {
      jeu: { titre: document.title || '(sans titre)', chemin: location.pathname },
      url: location.href,
      langue: langueActuelle(),
      largeur: window.innerWidth,
      ecran: { id: '', extrait: '' },
      variables: {}
    };
    try {
      var el = trouverEcran();
      ctx.ecran.id = (el && el.id) || '';
      ctx.ecran.extrait = el ? extraitTexte(el) : '';
    } catch (e) {}
    try { ctx.variables = variablesGlobales(); } catch (e) {}
    return ctx;
  }

  /* ---------- styles ---------- */
  var style = document.createElement('style');
  style.id = 'retours-style';
  style.textContent =
    '#retours-bouton{position:fixed;right:16px;bottom:16px;z-index:2147483000;' +
    'display:flex;align-items:center;gap:.4em;min-height:44px;padding:.5em .9em;' +
    'border:none;border-radius:999px;background:#1f2937;color:#fff;' +
    'font:600 .85rem/1.2 system-ui,-apple-system,Segoe UI,Arial,sans-serif;' +
    'box-shadow:0 2px 10px rgba(0,0,0,.35);cursor:pointer;}' +
    '#retours-bouton:hover,#retours-bouton:focus-visible{background:#374151;}' +
    '#retours-overlay{position:fixed;inset:0;z-index:2147483001;' +
    'background:rgba(15,17,21,.55);padding:16px;' +
    'font:14px/1.45 system-ui,-apple-system,Segoe UI,Arial,sans-serif;}' +
    /* le `display:flex` ne s'applique que si l'attribut `hidden` n'est pas
       posé : sinon, une règle d'auteur l'emporterait sur le `[hidden]`
       du navigateur, et le panneau resterait visible en permanence. */
    '#retours-overlay:not([hidden]){display:flex;align-items:center;justify-content:center;}' +
    '#retours-modal{background:#fff;color:#1a1a1a;width:100%;max-width:480px;' +
    'max-height:min(640px,90vh);display:flex;flex-direction:column;border-radius:12px;' +
    'box-shadow:0 12px 40px rgba(0,0,0,.4);overflow:hidden;}' +
    '.retours-entete{display:flex;align-items:center;justify-content:space-between;' +
    'padding:12px 14px;border-bottom:1px solid #e5e7eb;}' +
    '.retours-entete h2{margin:0;font-size:1rem;}' +
    '.retours-onglets{display:flex;gap:6px;padding:8px 14px 0;}' +
    '.retours-onglet{border:1px solid #d1d5db;background:#f3f4f6;color:#1a1a1a;' +
    'border-radius:8px 8px 0 0;padding:.4em .8em;font-size:.85rem;cursor:pointer;}' +
    '.retours-onglet[aria-selected="true"]{background:#fff;border-bottom-color:#fff;font-weight:600;}' +
    '.retours-corps{padding:12px 14px;overflow:auto;flex:1;}' +
    '.retours-contexte{margin:0 0 10px;font-size:.8rem;color:#555;background:#f3f4f6;' +
    'border-radius:8px;padding:.5em .7em;}' +
    '.retours-contexte code{font-size:.78rem;background:#e5e7eb;padding:0 .3em;border-radius:4px;}' +
    '#retours-texte{width:100%;box-sizing:border-box;min-height:120px;padding:.6em;' +
    'border:1px solid #d1d5db;border-radius:8px;font:inherit;resize:vertical;}' +
    '.retours-actions{gap:8px;justify-content:flex-end;padding:10px 14px;' +
    'border-top:1px solid #e5e7eb;flex-wrap:wrap;}' +
    '.retours-actions:not([hidden]){display:flex;}' +
    '.retours-btn{min-height:40px;padding:.5em .9em;border-radius:8px;border:1px solid #d1d5db;' +
    'background:#f3f4f6;color:#1a1a1a;font:inherit;font-weight:600;cursor:pointer;}' +
    '.retours-btn--principal{background:#1f2937;border-color:#1f2937;color:#fff;}' +
    '.retours-btn--danger{background:#fff;border-color:#dc2626;color:#dc2626;}' +
    '.retours-confirmation{font-size:.82rem;color:#15803d;margin:0 0 8px;min-height:1.1em;}' +
    '#retours-liste-vide{color:#666;font-size:.9rem;}' +
    '#retours-liste{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:10px;}' +
    '#retours-liste li{border:1px solid #e5e7eb;border-radius:8px;padding:.6em .7em;}' +
    '.retours-item-tete{font-size:.85rem;margin-bottom:.3em;}' +
    '.retours-item-tete .retours-date{color:#666;font-weight:400;}' +
    '.retours-item-extrait{font-size:.78rem;color:#666;font-style:italic;margin-bottom:.4em;}' +
    '.retours-item-texte{font-size:.88rem;white-space:pre-wrap;margin-bottom:.4em;}' +
    '.retours-item-suppr{font-size:.78rem;background:none;border:none;color:#dc2626;' +
    'cursor:pointer;padding:0;text-decoration:underline;}' +
    '@media (max-width:420px){#retours-bouton .retours-bouton-label{display:none;}}';
  document.head.appendChild(style);

  /* ---------- bouton ---------- */
  var bouton = document.createElement('button');
  bouton.type = 'button';
  bouton.id = 'retours-bouton';
  bouton.setAttribute('aria-label', 'Laisser un commentaire pour Antonin (raccourci Alt+C)');
  bouton.innerHTML = '<span aria-hidden="true">💬</span>' +
                      '<span class="retours-bouton-label">Commentaire</span>';
  document.body.appendChild(bouton);

  /* Décale le bouton vers le haut s'il recouvrirait un contrôle fixe déjà
     posé dans le coin bas-droite du jeu. */
  function positionnerBouton() {
    var bas = 16;
    var elements;
    try { elements = document.body.querySelectorAll('*'); } catch (e) { elements = []; }
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      if (el === bouton || bouton.contains(el)) continue;
      var s;
      try { s = getComputedStyle(el); } catch (e) { continue; }
      if (s.position !== 'fixed' && s.position !== 'sticky') continue;
      var r = el.getBoundingClientRect();
      if (r.width <= 0 || r.height <= 0) continue;
      if (r.right > window.innerWidth - 140 && r.bottom > window.innerHeight - 140) {
        bas = Math.max(bas, (window.innerHeight - r.top) + 12);
      }
    }
    bouton.style.bottom = bas + 'px';
  }
  positionnerBouton();
  window.addEventListener('resize', positionnerBouton);

  /* ---------- panneau ---------- */
  var overlay = document.createElement('div');
  overlay.id = 'retours-overlay';
  overlay.hidden = true;
  overlay.innerHTML =
    '<div id="retours-modal" role="dialog" aria-modal="true" aria-labelledby="retours-titre">' +
      '<div class="retours-entete">' +
        '<h2 id="retours-titre">💬 Commentaire</h2>' +
        '<button type="button" class="retours-btn" id="retours-fermer" aria-label="Fermer">✕</button>' +
      '</div>' +
      '<div class="retours-onglets" role="tablist">' +
        '<button type="button" class="retours-onglet" id="retours-onglet-nouveau" role="tab" aria-selected="true">Nouveau retour</button>' +
        '<button type="button" class="retours-onglet" id="retours-onglet-liste" role="tab" aria-selected="false">Tous mes retours</button>' +
      '</div>' +
      '<div class="retours-corps">' +
        '<div id="retours-vue-nouveau">' +
          '<p class="retours-contexte" id="retours-contexte-texte"></p>' +
          '<label for="retours-texte" class="sr-only">Votre commentaire</label>' +
          '<textarea id="retours-texte" placeholder="Ce qui cloche, ce qui manque, ce qui vous a plu…"></textarea>' +
          '<p class="retours-confirmation" id="retours-confirmation" aria-live="polite"></p>' +
        '</div>' +
        '<div id="retours-vue-liste" hidden>' +
          '<div id="retours-liste-vide">Aucun retour enregistré pour l’instant.</div>' +
          '<ul id="retours-liste"></ul>' +
        '</div>' +
      '</div>' +
      '<div class="retours-actions" id="retours-actions-nouveau">' +
        '<button type="button" class="retours-btn retours-btn--principal" id="retours-enregistrer">Enregistrer</button>' +
      '</div>' +
      '<div class="retours-actions" id="retours-actions-liste" hidden>' +
        '<button type="button" class="retours-btn retours-btn--danger" id="retours-vider">Vider la liste</button>' +
        '<button type="button" class="retours-btn" id="retours-copier">Tout copier</button>' +
        '<button type="button" class="retours-btn" id="retours-telecharger">Télécharger</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(overlay);

  var modal = document.getElementById('retours-modal');
  var texte = document.getElementById('retours-texte');
  var contexteTexte = document.getElementById('retours-contexte-texte');
  var confirmation = document.getElementById('retours-confirmation');
  var vueNouveau = document.getElementById('retours-vue-nouveau');
  var vueListe = document.getElementById('retours-vue-liste');
  var actionsNouveau = document.getElementById('retours-actions-nouveau');
  var actionsListe = document.getElementById('retours-actions-liste');
  var ongletNouveau = document.getElementById('retours-onglet-nouveau');
  var ongletListe = document.getElementById('retours-onglet-liste');

  var panneauOuvert = false;
  var elementOuvrant = null;
  var contexteActuel = null;

  function focusables() {
    return Array.prototype.slice.call(modal.querySelectorAll(
      'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
    )).filter(function (el) { return !el.disabled && el.offsetParent !== null; });
  }

  function afficherVue(nom) {
    var estNouveau = nom === 'nouveau';
    vueNouveau.hidden = !estNouveau;
    vueListe.hidden = estNouveau;
    actionsNouveau.hidden = !estNouveau;
    actionsListe.hidden = estNouveau;
    ongletNouveau.setAttribute('aria-selected', String(estNouveau));
    ongletListe.setAttribute('aria-selected', String(!estNouveau));
    if (!estNouveau) construireListe();
  }

  function ouvrirPanneau() {
    elementOuvrant = document.activeElement;
    contexteActuel = capturerContexte();
    var jeu = contexteActuel.jeu.titre;
    var ecranId = contexteActuel.ecran.id || 'non identifié';
    contexteTexte.innerHTML = '🎮 <strong></strong> · écran : <code></code>';
    contexteTexte.querySelector('strong').textContent = jeu;
    contexteTexte.querySelector('code').textContent = ecranId;
    confirmation.textContent = '';
    texte.value = '';
    overlay.hidden = false;
    panneauOuvert = true;
    afficherVue('nouveau');
    setTimeout(function () { texte.focus(); }, 0);
  }

  function fermerPanneau() {
    overlay.hidden = true;
    panneauOuvert = false;
    if (elementOuvrant && typeof elementOuvrant.focus === 'function') elementOuvrant.focus();
  }

  bouton.addEventListener('click', ouvrirPanneau);
  document.getElementById('retours-fermer').addEventListener('click', fermerPanneau);
  overlay.addEventListener('mousedown', function (e) {
    if (e.target === overlay) fermerPanneau();
  });
  ongletNouveau.addEventListener('click', function () { afficherVue('nouveau'); });
  ongletListe.addEventListener('click', function () { afficherVue('liste'); });

  document.addEventListener('keydown', function (e) {
    if (!panneauOuvert) {
      if (e.altKey && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
        ouvrirPanneau();
      }
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      fermerPanneau();
      return;
    }
    if (e.key === 'Tab') {
      var f = focusables();
      if (!f.length) return;
      var premier = f[0], dernier = f[f.length - 1];
      if (e.shiftKey && document.activeElement === premier) {
        e.preventDefault(); dernier.focus();
      } else if (!e.shiftKey && document.activeElement === dernier) {
        e.preventDefault(); premier.focus();
      }
    }
  });

  /* ---------- enregistrement ---------- */
  document.getElementById('retours-enregistrer').addEventListener('click', function () {
    var commentaire = texte.value.trim();
    if (!commentaire) { texte.focus(); return; }
    var liste = lireListe();
    liste.push({
      id: Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8),
      date: new Date().toISOString(),
      commentaire: commentaire,
      jeu: contexteActuel.jeu,
      url: contexteActuel.url,
      langue: contexteActuel.langue,
      largeur: contexteActuel.largeur,
      ecran: contexteActuel.ecran,
      variables: contexteActuel.variables
    });
    ecrireListe(liste);
    texte.value = '';
    confirmation.textContent = '✓ Retour enregistré.';
  });

  /* ---------- liste / suppression ---------- */
  function dateCourte(iso) {
    try {
      var d = new Date(iso);
      return d.toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit' });
    } catch (e) { return iso; }
  }

  function construireListe() {
    var liste = lireListe();
    var conteneur = document.getElementById('retours-liste');
    var vide = document.getElementById('retours-liste-vide');
    conteneur.innerHTML = '';
    vide.hidden = liste.length > 0;
    liste.forEach(function (r) {
      var li = document.createElement('li');

      var tete = document.createElement('div');
      tete.className = 'retours-item-tete';
      var fort = document.createElement('strong');
      fort.textContent = (r.jeu && r.jeu.titre) || '(jeu inconnu)';
      var span = document.createElement('span');
      span.textContent = ' — ' + ((r.ecran && r.ecran.id) || 'écran inconnu') + ' ';
      var dateEl = document.createElement('span');
      dateEl.className = 'retours-date';
      dateEl.textContent = dateCourte(r.date);
      tete.appendChild(fort); tete.appendChild(span); tete.appendChild(dateEl);

      var extrait = document.createElement('div');
      extrait.className = 'retours-item-extrait';
      extrait.textContent = (r.ecran && r.ecran.extrait) || '';

      var corps = document.createElement('div');
      corps.className = 'retours-item-texte';
      corps.textContent = r.commentaire;

      var suppr = document.createElement('button');
      suppr.type = 'button';
      suppr.className = 'retours-item-suppr';
      suppr.textContent = 'Supprimer';
      suppr.addEventListener('click', function () {
        ecrireListe(lireListe().filter(function (x) { return x.id !== r.id; }));
        construireListe();
      });

      li.appendChild(tete); li.appendChild(extrait); li.appendChild(corps); li.appendChild(suppr);
      conteneur.appendChild(li);
    });
  }

  document.getElementById('retours-vider').addEventListener('click', function () {
    if (!lireListe().length) return;
    if (window.confirm('Vider tous les retours enregistrés ? Cette action est irréversible.')) {
      ecrireListe([]);
      construireListe();
    }
  });

  /* ---------- export ---------- */
  function deuxChiffres(n) { n = String(n); return n.length < 2 ? '0' + n : n; }
  function dateFichier(d) {
    return d.getFullYear() + '-' + deuxChiffres(d.getMonth() + 1) + '-' + deuxChiffres(d.getDate());
  }

  function genererMarkdown() {
    var liste = lireListe();
    if (!liste.length) return '';
    var lignes = ['# Retours — export du ' + dateFichier(new Date()), ''];
    liste.forEach(function (r) {
      lignes.push('## ' + ((r.jeu && r.jeu.titre) || '(jeu inconnu)') +
        ' — ' + ((r.ecran && r.ecran.id) || 'écran inconnu'));
      lignes.push('');
      lignes.push('- **Date :** ' + dateCourte(r.date));
      lignes.push('- **URL :** ' + r.url);
      lignes.push('- **Langue :** ' + r.langue + ' · **Fenêtre :** ' + r.largeur + ' px');
      if (r.ecran && r.ecran.extrait) lignes.push('- **Extrait affiché :** ' + r.ecran.extrait);
      if (r.variables && Object.keys(r.variables).length) {
        lignes.push('- **Variables :** `' + JSON.stringify(r.variables) + '`');
      }
      lignes.push('');
      lignes.push(r.commentaire);
      lignes.push('');
      lignes.push('---');
      lignes.push('');
    });
    return lignes.join('\n');
  }

  function copierRepli(texteACopier, ok) {
    try {
      var ta = document.createElement('textarea');
      ta.value = texteACopier;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      ok();
    } catch (e) {}
  }

  var btnCopier = document.getElementById('retours-copier');
  btnCopier.addEventListener('click', function () {
    var md = genererMarkdown();
    if (!md) return;
    var libelleInitial = btnCopier.textContent;
    var fait = false;
    function ok() {
      if (fait) return;
      fait = true;
      btnCopier.textContent = '✓ Copié';
      setTimeout(function () { btnCopier.textContent = libelleInitial; }, 1500);
    }
    function repli() {
      if (fait) return;
      copierRepli(md, ok);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(md).then(ok, repli);
      /* certains contextes (permission bloquée, fenêtre sans focus) ne
         rejettent jamais la promesse : sans ce filet, le bouton resterait
         planté sur « Tout copier » sans retour visible. */
      setTimeout(repli, 700);
    } else {
      repli();
    }
  });

  document.getElementById('retours-telecharger').addEventListener('click', function () {
    var md = genererMarkdown();
    if (!md) return;
    var blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'retours-' + dateFichier(new Date()) + '.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  });
})();
