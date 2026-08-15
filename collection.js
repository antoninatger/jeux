/* =========================================================================
   collection.js — en-tête unifié de la collection « Jeux »
   Chantier 05 (§5.1). À charger APRÈS i18n.js :

     <script src="i18n.js"></script>
     <script src="collection.js"></script>

   ── Le problème qu'il règle ─────────────────────────────────────────────
   Trois éléments se disputaient le coin supérieur de chaque page : la
   pastille « ← Retour », le bouton FR/EN injecté par i18n.js, et le titre
   du jeu. Tous les trois en `position:fixed` ou en absolu, chacun avec ses
   propres coordonnées. En dessous de 680 px ils se recouvraient.

   Le chantier 01 avait posé une rustine (`placeToggle()` réservait du
   padding en tête de <header>), mais elle ne pouvait rien pour les pages
   sans <header> — echecs, terre_ronde_plate, Emprise, mine. Une heuristique
   de détection de collision a été tentée puis retirée : elle produisait un
   placement différent d'une page à l'autre, ce qui était pire.

   ── La réponse ──────────────────────────────────────────────────────────
   Une grille `retour | titre | langue` en flux normal. Trois zones qui se
   partagent la largeur au lieu de se superposer : le chevauchement devient
   structurellement impossible, à n'importe quelle largeur.

   ── Utilisation ─────────────────────────────────────────────────────────
   Le plus souvent, rien à écrire : le script trouve le titre existant
   (<h1>) et le lien retour existant (.back-hub, .back-btn, .back…) et les
   reloge dans la grille. Pour forcer une valeur :

     <body data-col-titre="Le Grand Oral" data-col-retour="../index.html">

   Pour désactiver sur une page (une démo plein écran, par exemple) :

     <body data-col-entete="non">
   ========================================================================= */
(function () {
  'use strict';

  /* Signalé tout de suite, avant tout DOMContentLoaded : i18n.js lit ce
     drapeau pour ne plus injecter son bouton flottant ni appliquer sa
     rustine `placeToggle()`, que cet en-tête remplace. */
  window.__COLLECTION_ENTETE__ = true;

  /* Sélecteurs de lien retour rencontrés dans la collection. Ils viennent de
     jeux écrits à des moments différents ; le chantier 06 les unifiera. */
  var SEL_RETOUR = '.back-hub, .back-btn, .back-link, a.back, #menu-btn-bottom, #menu-link';

  var LABELS = {
    fr: { retour: 'Retour aux jeux', langue: 'EN', skip: 'Aller au contenu',
          versEN: 'Switch to English' },
    en: { retour: 'Back to games',   langue: 'FR', skip: 'Skip to content',
          versFR: 'Passer en français' }
  };

  function lang() {
    return (window.I18N && window.I18N.lang) || document.documentElement.lang || 'fr';
  }
  function txt(cle) {
    var l = lang();
    return (LABELS[l] && LABELS[l][cle]) || LABELS.fr[cle] || '';
  }

  /* Le href de retour : celui déclaré, sinon celui du lien existant, sinon
     on remonte au portail selon la profondeur du chemin. */
  function hrefRetour(existant) {
    var force = document.body.getAttribute('data-col-retour');
    if (force) return force;
    if (existant && existant.getAttribute('href')) return existant.getAttribute('href');
    var profondeur = location.pathname.replace(/\/[^\/]*$/, '').split('/').filter(Boolean).length;
    return profondeur > 0 ? '../index.html' : 'index.html';
  }

  /* Un <h1> enfermé dans une modale, une boîte de dialogue ou un écran masqué
     n'est pas le titre de la page : c'est le titre de cet écran-là. Emprise
     en est l'exemple — son unique <h1> est « Avant de commencer », dans la
     modale d'avertissement. Le reprendre afficherait le mauvais titre, et le
     masquer en `.sr-only` casserait la modale. */
  function titreUtilisable(el) {
    if (!el) return false;
    if (el.closest('[hidden], [aria-hidden="true"], dialog')) return false;
    return !el.closest('.modal-overlay, .modal, .overlay, [role="dialog"], [class*="modal"]');
  }

  /* Le titre, par ordre de priorité :
       1. `data-col-titre` sur <body> — valeur forcée ;
       2. `data-col-titre-cle` sur <body> — clé i18n, donc titre traduit ;
       3. l'élément marqué `data-col-titre-source` — pour les pages dont le
          titre n'est pas un <h1> (Terre ronde/plate a un `<div id="title">`
          en position fixe) ;
       4. le premier <h1> utilisable ;
       5. le <title> du document, en dernier recours. */
  function trouverTitre() {
    var force = document.body.getAttribute('data-col-titre');
    if (force) return { texte: force, source: null };

    var cle = document.body.getAttribute('data-col-titre-cle');
    if (cle && window.I18N) return { texte: window.I18N.t(cle), source: null };

    var marque = document.querySelector('[data-col-titre-source]');
    if (marque) return { texte: marque.textContent.trim(), source: marque };

    var h1 = null;
    document.querySelectorAll('h1').forEach(function (c) {
      if (!h1 && titreUtilisable(c)) h1 = c;
    });
    if (h1) return { texte: h1.textContent.trim(), source: h1 };

    return { texte: (document.title || '').trim(), source: null };
  }

  function bascule() {
    var suivante = lang() === 'fr' ? 'en' : 'fr';
    try { localStorage.setItem('jeux_lang', suivante); } catch (e) {}
    var p = new URLSearchParams(location.search);
    p.set('lang', suivante);
    location.search = p.toString();
  }

  function construire() {
    if (document.body.getAttribute('data-col-entete') === 'non') return;
    if (document.querySelector('.col-entete')) return;

    var ancienRetour = document.querySelector(SEL_RETOUR);
    var titre = trouverTitre();

    var entete = document.createElement('header');
    entete.className = 'col-entete';
    /* Grille intérieure : l'en-tête est pleine largeur (pour son voile), la
       grille est bornée et centrée. Voir le commentaire dans collection.css. */
    var grille = document.createElement('div');
    grille.className = 'col-entete__grille';
    entete.appendChild(grille);

    /* ── Retour ────────────────────────────────────────────────────────── */
    var retour = document.createElement('a');
    retour.className = 'col-entete__retour';
    retour.href = hrefRetour(ancienRetour);
    retour.innerHTML = '<span aria-hidden="true">←</span>' +
                       '<span class="col-entete__label"></span>';
    /* textContent plutôt que innerHTML pour le libellé : il peut venir d'un
       data-* de page, on ne le réinjecte pas en HTML. */
    /* Le libellé du retour est surchargeable par clé i18n : les pages
       d'illusions reviennent à leur propre index (« Retour aux illusions »),
       pas au portail. */
    var cleRetour = document.body.getAttribute('data-col-retour-cle');
    var libRetour = (cleRetour && window.I18N) ? window.I18N.t(cleRetour) : txt('retour');
    /* Les dictionnaires existants écrivent « ← Retour aux illusions » : la
       flèche y était collée au texte faute d'en-tête. C'est l'en-tête qui la
       dessine maintenant — sans ce nettoyage on lirait « ←← Retour ». */
    libRetour = libRetour.replace(/^[\s←◀«<]+/, '').trim();
    retour.querySelector('.col-entete__label').textContent = libRetour;
    retour.setAttribute('aria-label', libRetour);

    /* ── Titre ─────────────────────────────────────────────────────────── */
    var h = document.createElement('h1');
    h.className = 'col-entete__titre';
    h.textContent = titre.texte;

    grille.appendChild(retour);
    grille.appendChild(h);

    /* ── Emplacement extra ───────────────────────────────────────────────
       La page marque `data-col-entete-extra` sur les éléments qu'elle veut
       voir en permanence dans l'en-tête. Ils sont DÉPLACÉS ici (pas copiés) :
       leurs écouteurs, leur id et leur clé i18n suivent intacts.

       Sans cet emplacement, un jeu qui a un troisième élément persistant n'a
       d'autre choix que de le poser en `position:fixed` dans un coin — ce qui
       reproduit exactement le chevauchement que l'en-tête vient de régler.
       C'était le cas d'Emprise : « Besoin d'aide ? », fixe et haut de 12 px,
       recouvrait le bandeau « FICTION » en 390 px. */
    var extras = document.querySelectorAll('[data-col-entete-extra]');
    if (extras.length) {
      var zone = document.createElement('div');
      zone.className = 'col-entete__extra';
      extras.forEach(function (el) { zone.appendChild(el); });
      grille.appendChild(zone);
      entete.classList.add('col-entete--extra');
    }

    /* ── Langue ──────────────────────────────────────────────────────────
       Seulement si la page est traduite. `echecs.html` n'inclut pas i18n.js :
       lui afficher une bascule FR/EN promettrait une traduction inexistante
       et rechargerait la page pour rien. La grille reste équilibrée grâce à
       la colonne fantôme ci-dessous. */
    if (window.I18N) {
      var langue = document.createElement('button');
      langue.type = 'button';
      langue.className = 'col-entete__langue';
      langue.innerHTML = '<span aria-hidden="true">🌐</span>' +
                         '<span class="col-entete__label"></span>';
      langue.querySelector('.col-entete__label').textContent = txt('langue');
      langue.setAttribute('aria-label',
        lang() === 'fr' ? LABELS.fr.versEN : LABELS.en.versFR);
      langue.addEventListener('click', bascule);
      grille.appendChild(langue);
    } else {
      var vide = document.createElement('span');
      vide.className = 'col-entete__vide';
      vide.setAttribute('aria-hidden', 'true');
      grille.appendChild(vide);
    }

    /* ── Remplacement des anciens éléments ─────────────────────────────── */
    /* On retire l'ancienne pastille de retour et l'ancien bouton FR/EN :
       laisser les deux exemplaires reproduirait exactement le problème. */
    if (ancienRetour) ancienRetour.remove();
    var ancienneLangue = document.querySelector('.i18n-toggle');
    if (ancienneLangue) ancienneLangue.remove();

    /* Le <h1> d'origine est masqué plutôt que supprimé : certaines pages le
       ciblent en CSS ou en JS, et il porte parfois un data-i18n. */
    if (titre.source) {
      titre.source.classList.add('sr-only');
      /* si i18n retraduit le h1 d'origine, on suit sa valeur */
      if (titre.source.hasAttribute('data-i18n')) {
        new MutationObserver(function () {
          h.textContent = titre.source.textContent.trim();
        }).observe(titre.source, { childList: true, characterData: true, subtree: true });
      }
    }

    document.body.insertBefore(entete, document.body.firstChild);

    /* On publie la hauteur réelle dans --entete-h. Plusieurs jeux ont un HUD
       en `position:fixed; top:0` (Mine, les arcades) : sorti du flux, il
       recouvrirait l'en-tête. Ils s'y adossent avec `top: var(--entete-h)`
       plutôt qu'avec une constante qui dériverait à la première retouche. */
    var mesurer = function () {
      var h = Math.round(entete.getBoundingClientRect().height);
      if (h > 0) document.documentElement.style.setProperty('--entete-h', h + 'px');
    };
    mesurer();
    window.addEventListener('resize', mesurer);
    if (window.ResizeObserver) new ResizeObserver(mesurer).observe(entete);

    /* ── Lien d'évitement ──────────────────────────────────────────────── */
    var cible = document.querySelector('main, #game, #jeu, #app, #contenu');
    if (cible) {
      if (!cible.id) cible.id = 'col-contenu';
      var skip = document.createElement('a');
      skip.className = 'col-skip';
      skip.href = '#' + cible.id;
      skip.textContent = txt('skip');
      document.body.insertBefore(skip, entete);
    }
  }

  /* i18n.js injecte son bouton flottant sur DOMContentLoaded. On passe après
     lui pour pouvoir le retirer, sans dépendre de l'ordre des <script>. */
  function demarrer() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        setTimeout(construire, 0);
      });
    } else {
      setTimeout(construire, 0);
    }
  }
  demarrer();

  window.Collection = { construireEntete: construire };
})();
