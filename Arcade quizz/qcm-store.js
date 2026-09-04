/**
 * qcm-store.js — Hub central des questions pour QCM Arcade
 *
 * Stocke les questions actives en JSON dans localStorage.
 * Les jeux lisent loadActiveQuestions() au démarrage.
 */
(function (global) {
  'use strict';

  /* La banque "influenceurs" a ete ajoutee apres les autres. Plutot que de
     modifier la ligne de chargement de chaque jeu, ce fichier la reclame
     lui-meme : les pages restent intactes. Le script injecte ici s'execute
     juste apres celui-ci, donc avant le code des jeux. */
  try {
    if (global.document && global.document.readyState === 'loading') {
      global.document.write('<scr' + 'ipt src="questions-influenceurs.js"><' + '/scr' + 'ipt>');
    }
  } catch (e) {}

  const Q_KEY  = 'qcm-arcade.questions';   // questions sérialisées
  const ID_KEY = 'qcm-arcade.setId';        // id du set prédéfini (si applicable)
  const N_KEY  = 'qcm-arcade.sessionCount'; // nb de questions par partie (5 | 10 | 30)

  // ── Registre des sets prédéfinis ──────────────────────────
  const KNOWN_SETS = [
    { id: 'default',  label: 'Par défaut',                    variable: 'DEFAULT_QCM'         },
    { id: '6e5e',     label: '6e–5e · Fake News',             variable: 'QUESTIONS_6E5E'      },
    { id: 'niveau1',  label: 'N1 · Fake News (lycée)',        variable: 'QUESTIONS_NIVEAU1'   },
    { id: 'niveau2',  label: 'N2 · Désinformation',           variable: 'QUESTIONS_NIVEAU2'   },
    { id: 'influenceurs', label: 'Influenceurs',               variable: 'QUESTIONS_INFLUENCEURS' },
    { id: 'niveau3',  label: 'N3 · Rhétorique',               variable: 'QUESTIONS_NIVEAU3'   }
  ];

  /**
   * Serie demandee par l'adresse : "qcm-classique.html?serie=niveau3".
   *
   * Sans ce parametre, la serie active vient du localStorage, choisie au hub.
   * Un participant qui arrive par un lien de bilan a un localStorage vide :
   * il tombait alors sur DEFAULT_QCM, c'est-a-dire des questions Fake News,
   * quelle que soit la formation suivie.
   *
   * La serie de l'adresse a la priorite, mais elle n'ecrit RIEN dans le
   * localStorage : un lien envoye a quelqu'un ne doit pas modifier la
   * selection faite au hub sur la machine du formateur.
   */
  function getSerieDemandee() {
    try {
      if (!global.location || !global.URLSearchParams) return null;
      var id = new global.URLSearchParams(global.location.search).get('serie');
      if (!id) return null;
      return getAvailableSets().find(function (s) { return s.id === id; }) || null;
    } catch (e) { return null; }
  }

  function getAvailableSets() {
    return KNOWN_SETS
      .filter(function (s) {
        return Array.isArray(global[s.variable]) && global[s.variable].length > 0;
      })
      .map(function (s) {
        return { id: s.id, label: s.label, questions: global[s.variable] };
      });
  }

  // ── Sauvegarde ────────────────────────────────────────────

  function saveActiveQuestions(questions, setId) {
    try {
      localStorage.setItem(Q_KEY, JSON.stringify(questions));
      if (setId) localStorage.setItem(ID_KEY, setId);
      else       localStorage.removeItem(ID_KEY);
    } catch (e) {}
  }

  function saveActiveSet(setId) {
    var sets = getAvailableSets();
    var found = sets.find(function (s) { return s.id === setId; });
    if (!found) return;
    // Pas d'instantané des questions : un set predefini se resout a la
    // lecture depuis getAvailableSets(), dans la langue en cours. Sinon
    // basculer de langue rejoue l'instantane fige dans l'autre langue.
    try {
      localStorage.setItem(ID_KEY, setId);
      localStorage.removeItem(Q_KEY);
    } catch (e) {}
  }

  // ── Lecture ───────────────────────────────────────────────

  function loadActiveQuestions() {
    try {
      var id = loadActiveSetId();
      if (id) {
        var set = getAvailableSets().find(function (s) { return s.id === id; });
        if (set) return set.questions;
      }
      var raw = localStorage.getItem(Q_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) && parsed.length ? parsed : null;
    } catch (e) { return null; }
  }

  function loadActiveSetId() {
    try { return localStorage.getItem(ID_KEY); } catch (e) { return null; }
  }

  function getActiveInfo() {
    var demandee = getSerieDemandee();
    if (demandee) {
      return {
        questions : demandee.questions,
        setId     : demandee.id,
        label     : demandee.label,
        count     : demandee.questions.length
      };
    }
    var id  = loadActiveSetId();
    var qs  = loadActiveQuestions();
    var set = id ? getAvailableSets().find(function (s) { return s.id === id; }) : null;
    return {
      questions : qs,
      setId     : id,
      label     : set ? set.label : (qs ? '📁 Questions importées' : null),
      count     : qs ? qs.length : 0
    };
  }

  function clearActive() {
    try {
      localStorage.removeItem(Q_KEY);
      localStorage.removeItem(ID_KEY);
    } catch (e) {}
  }

  // ── Session (longueur de partie) ──────────────────────────

  function saveSessionCount(n) {
    try { localStorage.setItem(N_KEY, String(n)); } catch (e) {}
  }

  function loadSessionCount() {
    try {
      var n = parseInt(localStorage.getItem(N_KEY), 10);
      return [5, 10, 30].indexOf(n) >= 0 ? n : 10;
    } catch (e) { return 10; }
  }

  /**
   * Questions de la partie : tirage aléatoire de sessionCount questions
   * dans la série active (toute la série si elle est plus courte).
   */
  function getSessionQuestions() {
    var demandee = getSerieDemandee();
    var qs = demandee ? demandee.questions : loadActiveQuestions();
    if (!qs || !qs.length) return null;
    var pool = qs.slice();
    for (var i = pool.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
    }
    return pool.slice(0, Math.min(loadSessionCount(), pool.length));
  }

  // ── Export ────────────────────────────────────────────────
  global.QCMStore = {
    getAvailableSets    : getAvailableSets,
    saveActiveQuestions : saveActiveQuestions,
    saveActiveSet       : saveActiveSet,
    loadActiveQuestions : loadActiveQuestions,
    loadActiveSetId     : loadActiveSetId,
    getActiveInfo       : getActiveInfo,
    clearActive         : clearActive,
    saveSessionCount    : saveSessionCount,
    loadSessionCount    : loadSessionCount,
    getSessionQuestions : getSessionQuestions,
    getSerieDemandee    : getSerieDemandee
  };

})(window);
