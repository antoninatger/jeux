/* =========================================================================
   RADAR ANTI-ARNAQUES — Logique du jeu
   Dépend de scenarios.js (variable globale SCENARIOS).
   ========================================================================= */

(function () {
  'use strict';

  var CARTES_PAR_PARTIE = 14;   // nombre de cartes jouées par partie (équilibré)
  var PARTIE_COURTE = 6;        // partie courte proposée à l'accueil
  var PARTIE_THEME = 8;         // plafond d'une partie à thème
  /* Ce que le joueur a choisi à l'accueil ; « Rejouer » repart sur le même choix. */
  var tailleVoulue = CARTES_PAR_PARTIE, themeCourant = null;
  /* Thèmes : les cartes sont rangées ici par leur id, pour ne pas dupliquer un champ
     dans scenarios.js et scenarios-en.js. Une carte absente de tous les thèmes ne sort
     qu'en partie mélangée. */
  var THEMES = [
    { cle:'colis', em:'📦', nom:'Colis et achats en ligne',
      ids:['sms-colis','sms-colis-photo-ia','email-fausse-boutique-liquidation','email-prime-video-paiement','email-boite-mystere','sms-livraison-ok','email-commande-ok','email-abonnement-ok'] },
    { cle:'banque', em:'🏦', nom:'Banque, codes et sécurité',
      ids:['appel-banque','email-motdepasse','email-prenom-detourne','popup-support','popup-faux-captcha','sms-banque-ok','sms-code-ok','notif-virement-ok','appel-banque-fraude-ok','notif-connexion-ok','notif-maj-appli-ok'] },
    { cle:'proches', em:'❤️', nom:'Sentiments et faux proches',
      ids:['chat-celebrite','chat-faux-profil-rencontre','chat-faux-proche','chat-faux-numero-invest','appel-voix-clonee-petit-fils','chat-vocal-clone-fille','chat-ami-ok','chat-famille-ok','chat-petitfils-ok','appel-petite-fille-code-ok'] },
    { cle:'admin', em:'🏛️', nom:'Santé, impôts et aides',
      ids:['sms-ameli','email-ameli-regularisation','sms-remboursement-impots','email-panneaux','email-clim-aides','notif-ameli-ok','email-impots-ok','appel-mairie-ok','appel-medecin-ok','sms-pharmacie-ok','sms-rdv-ok','email-mutuelle-ok'] },
    { cle:'annonces', em:'🏷️', nom:'Petites annonces et locations',
      ids:['chat-trop-percu-vente','chat-fausse-vendeuse-acompte','email-airbnb-horsplateforme','chat-leboncoin-paiement-securise-ok'] }
  ];
  var app, hud, barFill, barLbl, scoreEl;
  var deck = [], idx = 0, score = 0, repondu = false;
  /* E2 : ce que la partie a joué, pour l'écran de fin ColFin — {id, titre, reussi, explication}.
     Chaque carte a un id stable dans scenarios.js : c'est lui que ColFin mémorise. */
  var JEU = 'radarnaque';
  var joue = [];
  /* Étoiles (3 par carte) et bons gestes de la partie ; aideCarte : un coup de pouce a servi sur la carte */
  var etoiles = 0, gestesBons = 0, gestesPoses = 0, aideCarte = false;
  /* « Et maintenant, je fais quoi ? » : les gestes proposés après une arnaque.
     t = le geste ; p = pourquoi c'est un piège (absent quand c'est le bon geste). */
  var ACTES = {
    signaler:   { t:'Je ne clique pas, et je transfère le SMS au 33700' },
    officiel:   { t:'Je n’utilise ni le lien ni le numéro du message : je passe moi-même par le site ou l’appli officielle' },
    supprimer:  { t:'Je n’ouvre rien et je supprime le message' },
    rappelBanque:{ t:'Je raccroche, et je rappelle ma banque au numéro inscrit au dos de ma carte' },
    rappelProche:{ t:'Je ne fais rien avant de l’avoir appelé sur son numéro habituel' },
    couper:     { t:'Je coupe court, je bloque ce contact et j’en parle à un proche' },
    fermer:     { t:'Je ne fais rien de ce qui est demandé : je ferme la fenêtre, et si elle résiste j’éteins l’appareil' },
    plateforme: { t:'Je reste sur la plateforme : paiement sécurisé, ou rien' },
    verifier:   { t:'Je ne partage pas : je cherche d’abord si des médias reconnus en parlent' },
    attendre:   { t:'Je ne renvoie rien tant que l’argent n’est pas réellement arrivé sur mon compte' },
    renov:      { t:'Je ne réponds pas ; si le sujet m’intéresse, j’appelle moi-même France Rénov’' },
    reputation: { t:'Je n’achète pas avant d’avoir vérifié la réputation du site ailleurs que sur ce message' },
    cliquer:    { t:'Je clique sur le lien, juste pour voir', p:'Cliquer « pour voir », c’est déjà entrer dans le piège : la fausse page est faite pour vous faire continuer.' },
    payerPeu:   { t:'Je paie, la somme est petite', p:'Ce n’est pas la somme qui les intéresse : c’est le numéro de votre carte.' },
    repondre:   { t:'Je réponds pour demander si c’est bien vrai', p:'Répondre montre qu’il y a quelqu’un au bout du fil, et c’est l’escroc qui vous répondra, avec des arguments rodés.' },
    remplir:    { t:'Je clique sur le lien et je remplis ce qu’on me demande', p:'La page est une copie : tout ce que vous y tapez part chez l’escroc.' },
    code:       { t:'Je donne le code pour bloquer le virement', p:'Ce code ne bloque rien : il VALIDE l’opération des escrocs.' },
    enLigne:    { t:'Je reste en ligne et je lui pose des questions pour vérifier', p:'L’escroc a réponse à tout, et plus l’appel dure, plus il a de prise. On vérifie en raccrochant.' },
    payerAvant: { t:'Je paie d’abord, je vérifierai après', p:'Un virement, des espèces ou des cartes cadeaux une fois partis ne se récupèrent pas.' },
    preuve:     { t:'Je lui demande une preuve par message', p:'Une photo, une pièce d’identité, une voix : tout cela se copie ou se fabrique. La preuve se prend par un autre canal.' },
    essayer:    { t:'J’essaie avec une petite somme, pour voir', p:'C’est exactement ce qu’on attend de vous : les premiers « gains » affichés sont faux, et servent à vous faire verser davantage.' },
    numero:     { t:'J’appelle le numéro indiqué', p:'Ce numéro est celui des escrocs : au bout du fil, ils sauront vous faire payer ou prendre la main sur votre appareil.' },
    obeir:      { t:'Je suis les instructions affichées à l’écran', p:'Ces manipulations vous font installer ou autoriser vous-même le programme malveillant.' },
    partager:   { t:'Je partage, au cas où ce serait vrai', p:'Partager « au cas où », c’est faire circuler le faux : c’est tout ce qu’il demande.' },
    commentaires:{ t:'Je regarde les commentaires : si beaucoup y croient, c’est vrai', p:'Le nombre ne prouve rien : un faux bien fait est cru et partagé par des milliers de personnes.' },
    rembourser: { t:'Je renvoie le trop-perçu, par honnêteté', p:'Le premier « virement » n’existe pas : c’est votre propre argent que vous enverriez.' },
    capture:    { t:'Je me fie à la capture d’écran du virement', p:'Une capture d’écran se fabrique en une minute. Seul votre relevé de compte fait foi.' },
    piece:      { t:'J’ouvre la pièce jointe pour voir ce que c’est', p:'Une pièce jointe peut installer un virus dès l’ouverture.' },
    secret:     { t:'Je n’en parle à personne, comme on me le demande', p:'Le secret est l’arme de l’escroc : en parler à un proche suffit souvent à tout arrêter.' },
    virement:   { t:'Je fais le virement pour ne pas rater l’occasion', p:'Hors de la plateforme, aucun recours : l’argent part et l’annonce disparaît.' },
    rdv:        { t:'Je laisse mes coordonnées, ça n’engage à rien', p:'Vos coordonnées sont revendues, et le démarchage qui suit est fait pour vous faire signer.' },
    viteAcheter:{ t:'Je commande vite, avant la rupture de stock', p:'L’urgence est fabriquée : le colis n’arrive jamais, et votre carte reste entre leurs mains.' }
  };

  /* Le bon geste d'abord, les pièges ensuite ; l'ordre est mélangé à l'affichage.
     Rangé par id de carte, comme THEMES : même table dans app.js et app-en.js. */
  var GESTES = {
    'sms-colis': ['signaler','payerPeu','cliquer'],
    'sms-colis-photo-ia': ['signaler','payerPeu','repondre'],
    'email-motdepasse': ['officiel','remplir','repondre'],
    'email-boite-mystere': ['supprimer','piece','repondre'],
    'email-panneaux': ['renov','cliquer','rdv'],
    'chat-celebrite': ['couper','payerAvant','secret'],
    'appel-banque': ['rappelBanque','code','enLigne'],
    'chat-faux-proche': ['rappelProche','payerAvant','preuve'],
    'image-deepfake': ['verifier','partager','commentaires'],
    'sms-ameli': ['officiel','remplir','repondre'],
    'popup-support': ['fermer','numero','obeir'],
    'chat-emploi': ['couper','essayer','repondre'],
    'chat-faux-numero-invest': ['couper','essayer','repondre'],
    'email-airbnb-horsplateforme': ['plateforme','virement','preuve'],
    'email-prenom-detourne': ['officiel','numero','repondre'],
    'email-fausse-boutique-liquidation': ['reputation','viteAcheter','cliquer'],
    'email-prime-video-paiement': ['officiel','remplir','repondre'],
    'chat-trop-percu-vente': ['attendre','rembourser','capture'],
    'sms-remboursement-impots': ['officiel','remplir','repondre'],
    'image-deepfake-manifestation': ['verifier','partager','commentaires'],
    'chat-faux-profil-rencontre': ['couper','payerAvant','preuve'],
    'chat-fausse-vendeuse-acompte': ['plateforme','virement','preuve'],
    'email-clim-aides': ['renov','cliquer','rdv'],
    'email-ameli-regularisation': ['officiel','remplir','repondre'],
    'popup-faux-captcha': ['fermer','obeir'],
    'appel-voix-clonee-petit-fils': ['rappelProche','payerAvant','secret'],
    'chat-vocal-clone-fille': ['rappelProche','payerAvant','preuve']
  };
  function texteBrut(html){ var d = document.createElement('div'); d.innerHTML = html; return d.textContent; }

  /* phase de repérage des indices (après la décision) */
  var REP = (typeof REPERES !== 'undefined') ? REPERES : {};
  var reperesActifs = [], currentChoix = null;
  /* coup de pouce à deux niveaux : 1 = indice écrit, 2 = on montre l'emplacement */
  var hintIdx = -1, hintStep = 0;

  /* état du glossaire (repérage automatique des mots) */
  var GLOSS = (typeof GLOSSAIRE !== 'undefined') ? GLOSSAIRE : [];
  var glossParKey = {}, glossParAlias = {}, glossRegex = null;

  /* ---------- utilitaires ---------- */
  function el(id){ return document.getElementById(id); }
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function shuffle(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;} return a; }
  function initiales(nom){ return (nom||'?').replace(/[^A-Za-zÀ-ÿ ]/g,'').trim().split(/\s+/).map(function(m){return m[0];}).slice(0,2).join('').toUpperCase() || '?'; }
  // transforme les URLs http(s) d'un texte en faux liens visibles (non cliquables)
  function liens(t){ return esc(t).replace(/(https?:\/\/[^\s]+)/g, '<span class="lien">$1</span>'); }
  function escapeReg(s){ return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  // construit l'index et l'expression régulière de repérage des termes du glossaire
  function prepareGlossaire(){
    var alias = [];
    GLOSS.forEach(function(g){
      glossParKey[g.key] = g;
      (g.aliases||[]).forEach(function(a){ glossParAlias[a.toLowerCase()] = g.key; alias.push(a); });
    });
    // les plus longs d'abord pour éviter les correspondances partielles
    alias.sort(function(a,b){ return b.length - a.length; });
    if (alias.length) glossRegex = new RegExp('(' + alias.map(escapeReg).join('|') + ')', 'gi');
  }

  // échappe le texte PUIS rend cliquables les mots du glossaire (pastille ?)
  function gl(txt){
    var s = esc(txt);
    if (!glossRegex) return s;
    return s.replace(glossRegex, function(m){
      var key = glossParAlias[m.toLowerCase()];
      if (!key) return m;
      return '<span class="gloss" data-g="' + key + '" role="button" tabindex="0" title="Voir la définition">' + m + '</span>';
    });
  }

  /* ---------- réglage taille du texte ---------- */
  function setTaille(v, btn){
    document.documentElement.style.setProperty('--taille', v);
    var b = document.querySelectorAll('.textsize button');
    for (var i=0;i<b.length;i++) b[i].classList.remove('on');
    if (btn) btn.classList.add('on');
    try { localStorage.setItem('radar_taille', v); } catch(e){}
  }

  /* =====================================================================
     ÉCRAN D'ACCUEIL
     ===================================================================== */
  function ecranAccueil(){
    ColFin.protegerSortie(false);   // plus de partie en cours : « ← Retour » ne demande plus confirmation
    arreterVoix();
    hud.style.display = 'none';
    var mb = el('menu-btn'); if (mb) mb.style.display = 'none';
    app.innerHTML =
      '<div class="panel hero">' +
        '<div class="big-em">🛡️</div>' +
        '<h1>Saurez-vous déjouer les arnaques&nbsp;?</h1>' +
        '<p class="lead">Des messages, e-mails et appels comme vous en recevez vraiment. ' +
        'À vous de dire, pour chacun, s’il est <b>fiable</b> ou s’il faut <b>se méfier</b>. ' +
        'Pas de piège technique&nbsp;: on apprend à repérer les bons réflexes.</p>' +
        '<div class="how">' +
          '<div class="step"><div class="n">1</div><div>Lisez le message affiché (SMS, e-mail, appel…).</div></div>' +
          '<div class="step"><div class="n">2</div><div>Trouvez les indices qui permettent de savoir si l’on peut faire confiance ou s’il faut se méfier de ce message.</div></div>' +
          '<div class="step"><div class="n">3</div><div>Choisissez&nbsp;: <b>« C’est une arnaque »</b> ou <b>« C’est fiable »</b>.</div></div>' +
        '</div>' +
        '<div class="choix-partie">' +
          '<h2 class="choix-titre">Choisissez votre partie</h2>' +
          '<div class="accueil-boutons">' +
            '<button class="btn-start" id="go-court">Partie courte&nbsp;▶<small>' + PARTIE_COURTE + ' messages · 10 à 15 minutes environ</small></button>' +
            '<button class="btn-start btn-long" id="go">Partie complète&nbsp;▶<small>' + CARTES_PAR_PARTIE + ' messages · 30 minutes environ</small></button>' +
          '</div>' +
          '<h2 class="choix-titre">… ou un seul thème</h2>' +
          '<div class="themes">' +
            THEMES.map(function(t){ return '<button class="btn-theme" data-theme="' + t.cle + '"><span class="em" aria-hidden="true">' + t.em + '</span>' + t.nom + '</button>'; }).join('') +
          '</div>' +
          '<button class="btn-gloss" id="voir-mots">📖 Les mots à connaître</button>' +
        '</div>' +
        '<p class="footer-note">Aucune donnée n’est envoyée. Ce jeu sert uniquement à s’entraîner.</p>' +
      '</div>';
    el('go-court').onclick = function(){ lancer(PARTIE_COURTE, null); };
    el('go').onclick = function(){ lancer(CARTES_PAR_PARTIE, null); };
    var bt = app.querySelectorAll('.btn-theme');
    for (var k=0;k<bt.length;k++){
      (function(b){ b.onclick = function(){ lancer(PARTIE_THEME, b.getAttribute('data-theme')); }; })(bt[k]);
    }
    el('voir-mots').onclick = function(){ openGlossaire(); };
  }

  /* =====================================================================
     DÉMARRAGE D'UNE PARTIE
     ===================================================================== */
  /* Lance une partie depuis l'accueil : une longueur, et un thème facultatif. */
  function lancer(taille, theme){ tailleVoulue = taille; themeCourant = theme; demarrer(); }

  function demarrer(sousDeck){
    // appelé aussi comme gestionnaire de clic : l'événement n'est pas un paquet
    sousDeck = Array.isArray(sousDeck) ? sousDeck : null;
    fermerGlossaire();
    // tirage ÉQUILIBRÉ : autant d'arnaques que de messages fiables (au possible)
    var source = SCENARIOS;
    var th = THEMES.filter(function(t){ return t.cle === themeCourant; })[0];
    if (th) source = SCENARIOS.filter(function(c){ return th.ids.indexOf(c.id) !== -1; });
    var arnaques = shuffle(source.filter(function(c){ return c.verdict==='arnaque'; }));
    var fiables  = shuffle(source.filter(function(c){ return c.verdict==='fiable';  }));
    // E2 : dans chaque moitié, les cartes jamais vues passent d'abord (mémoire ColFin)
    arnaques = ColFin.nonVusDabord(JEU, arnaques);
    fiables  = ColFin.nonVusDabord(JEU, fiables);
    var total = Math.min(tailleVoulue, source.length);
    var moitie = Math.floor(total/2);
    var nbFiables  = Math.min(moitie, fiables.length);
    var nbArnaques = Math.min(total - nbFiables, arnaques.length);
    nbFiables = Math.min(total - nbArnaques, fiables.length); // récupère la place restante
    // E2 : « rejouer mes erreurs » impose les seules cartes ratées
    deck = sousDeck ? shuffle(sousDeck) : shuffle(arnaques.slice(0, nbArnaques).concat(fiables.slice(0, nbFiables)));
    idx = 0; score = 0; etoiles = 0; gestesBons = 0; gestesPoses = 0;
    joue = [];
    ColFin.protegerSortie(true);
    hud.style.display = 'flex';
    var mb = el('menu-btn'); if (mb) mb.style.display = '';
    montrerCarte();
  }

  function majScore(){
    scoreEl.innerHTML = '✔ <b>' + score + '</b>&nbsp;/&nbsp;' + deck.length +
      '<span class="score-etoiles" title="Étoiles gagnées">⭐&nbsp;' + etoiles + '</span>';
  }

  function majHud(){
    var pct = Math.round((idx) / deck.length * 100);
    barFill.style.width = pct + '%';
    barLbl.textContent = 'Message ' + (idx+1) + ' sur ' + deck.length;
    majScore();
  }

  /* =====================================================================
     AFFICHAGE D'UNE CARTE
     ===================================================================== */
  function montrerCarte(){
    repondu = false;
    currentChoix = null;
    aideCarte = false;
    arreterVoix();
    majHud();
    var c = deck[idx];
    reperesActifs = c.reperes || REP[c.id] || [];
    // les repères sont des objets partagés entre parties : on efface le jugement précédent
    reperesActifs.forEach(function(r){ delete r._juge; delete r._choix; });
    app.innerHTML =
      '<div class="panel">' +
        // le contexte fait partie de l'enquête : il vit dans la maquette pour pouvoir être désigné
        '<div id="maquette"><div class="entete"><span class="ctx">' + esc(c.entete || contexteParDefaut(c)) + '</span></div>' +
          renderMaquette(c) + '</div>' +
      '</div>' +
      '<div class="panel"><div id="lower"></div></div>';

    // affiche le message (animé message par message, sauf préférence "mouvement réduit"),
    // puis le rend cliquable une fois complet : on ENQUÊTE avant de décider
    afficherMessages(c, function(){
      if (reperesActifs.length){
        el('maquette').classList.add('mode-spot');
        activerReperes(el('maquette'), reperesActifs);
        entrerSpotting();
      } else {
        phaseDecision();
      }
    });
    window.scrollTo({top:0, behavior:'smooth'});
  }

  function contexteParDefaut(c){
    switch(c.canal){
      case 'sms': return 'SMS reçu';
      case 'email': return 'E-mail reçu';
      case 'chat': return 'Message reçu';
      case 'appel': return 'Appel téléphonique';
      case 'notif': return 'Notification apparue à l’écran';
      case 'image': return 'Publication vue sur les réseaux sociaux';
    }
    return '';
  }

  /* ---------- rendu selon le canal ---------- */
  function renderMaquette(c){
    switch(c.canal){
      case 'sms':   return renderSMS(c);
      case 'email': return renderEmail(c);
      case 'chat':  return renderChat(c);
      case 'appel': return renderAppel(c);
      case 'notif': return renderNotif(c);
      case 'image': return renderImage(c);
    }
    return '';
  }

  function renderSMS(c){
    return '<div class="phone">' +
      '<div class="bar"><div class="from">' + esc(c.expediteur) + '</div><div class="sub">Message texte · aujourd’hui</div></div>' +
      '<div class="thread" data-anim="sms"></div>' +
    '</div>';
  }

  function renderChat(c){
    var messenger = /messenger/i.test(c.plateforme);
    var av = c.avatar ? '<img src="'+esc(c.avatar)+'" alt="">' : (initiales(c.contact) || '👤');
    return '<div class="chat ' + (messenger?'messenger':'') + '">' +
      '<div class="head"><div class="av">' + av + '</div>' +
        '<div><div class="nm">' + esc(c.contact) + '</div><div class="st">' + esc(c.plateforme) + ' · en ligne</div></div></div>' +
      '<div class="body" data-anim="chat"></div>' +
    '</div>';
  }

  function renderEmail(c){
    var att = '';
    if (c.piecesJointes && c.piecesJointes.length){
      att = c.piecesJointes.map(function(p){ return '<span class="att">'+esc(p)+'</span>'; }).join(' ');
    }
    var cta = c.bouton ? '<a class="cta" onclick="return false" href="#">'+esc(c.bouton)+'</a>' : '';
    return '<div class="mail">' +
      '<div class="hd">' +
        '<div class="obj">' + esc(c.objet) + '</div>' +
        '<div class="row"><div class="av">' + initiales(c.de) + '</div>' +
          '<div class="who"><div class="nm">' + esc(c.de) + '</div>' +
          '<div class="ad">&lt;' + esc(c.deAdresse) + '&gt; · ' + esc(c.date||'') + '</div></div></div>' +
      '</div>' +
      '<div class="body">' + liens_html(c.corps) + (att?('<div>'+att+'</div>'):'') + cta + '</div>' +
    '</div>';
  }

  function renderNotif(c){
    return '<div class="notif ' + (c.fond||'info') + '">' +
      '<div class="top"><span class="ic">' + (c.appIcon||'🔔') + '</span>' + esc(c.app||'Notification') + '</div>' +
      '<div class="cont"><div class="t">' + esc(c.titre) + '</div><div>' + esc(c.texte) + '</div></div>' +
    '</div>';
  }

  function renderImage(c){
    return '<div class="social">' +
      '<div class="sh"><div class="av">📷</div><div><div class="nm">Actu Choc 24</div><div class="mt">Page · Sponsorisé</div></div></div>' +
      '<div class="img-wrap"><img class="big" src="' + esc(c.image) + '" alt="Image partagée sur les réseaux"></div>' +
      '<div class="cap">' + esc(c.legende) + '</div>' +
    '</div>';
  }

  function renderAppel(c){
    return '<div class="call"><div class="screen">' +
      '<div class="avat">📞</div>' +
      '<div class="name">' + esc(c.afficheur) + '</div>' +
      '<div class="num">' + esc(c.numero||'') + '</div>' +
      '<div class="state">Appel en cours…</div>' +
      '<div class="keys"><div class="k red">✕</div><div class="k green">✓</div></div>' +
      '</div>' +
      (synth ? '<button type="button" class="ecoute ecoute-appel" aria-pressed="false" data-repos="🔊 Écouter l’appel" data-stop="⏹ Arrêter la lecture">🔊 Écouter l’appel</button>' : '') +
      '<div class="transcript" data-anim="call"></div></div>';
  }

  // corps d'e-mail : autorise le HTML simple déjà présent dans les données
  // (les données proviennent du jeu, pas d'une saisie utilisateur)
  function liens_html(html){ return html; }

  /* ---------- fabrique les « bulles » de message (sms/chat/appel) ---------- */
  function itemsFor(c){
    if (c.canal === 'sms'){
      return c.messages.map(function(m){
        if (m && typeof m === 'object' && m.photo){
          return '<div class="bubble bubble-photo">' +
            '<div class="fauxphoto" role="img" aria-label="Photo d’un colis avec une étiquette au nom du destinataire">' +
              '<div class="fp-scene">📦</div>' +
              '<span class="fp-hand">🧤</span>' +
              '<div class="fp-tag"><span class="fp-hd">DESTINATAIRE</span><b>' + esc(m.nom) + '</b>' +
                '<span class="fp-bar">‖│┃║▏▎│┃‖│▏║</span></div>' +
            '</div>' +
            (m.legende ? '<div class="fp-cap">' + esc(m.legende) + '</div>' : '') +
          '</div>';
        }
        return '<div class="bubble">'+liens(m)+'</div>';
      });
    }
    if (c.canal === 'chat'){
      return c.messages.map(function(m, k){
        // dateSep : séparateur de date facultatif, posé au-dessus du message.
        // Sert à montrer qu'on lit l'EXTRAIT d'un échange long, pas une conversation
        // qui tiendrait en trois bulles.
        var sep = m.dateSep ? '<div class="datesep"><span>' + esc(m.dateSep) + '</span></div>' : '';
        if (m.voix){
          return sep + '<div class="msg"><div class="voicebar">' +
            ((synth && m.texte) ? '<button type="button" class="play ecoute" data-m="' + k + '" aria-pressed="false" aria-label="Écouter le message vocal" data-repos="▶" data-stop="⏹">▶</button>' : '<span class="play">▶</span>') +
            '<span class="wave"></span><span class="t">'+esc(m.voix)+'</span></div>' +
            (m.texte ? '<div class="voix-txt"><span class="voix-lbl">Transcription</span>' + esc(m.texte) + '</div>' : '') + '</div>';
        }
        return sep + '<div class="msg">'+esc(m.texte)+'<div class="h">'+(m.heure||'')+' ✓✓</div></div>';
      });
    }
    if (c.canal === 'appel'){
      return c.transcript.map(function(l){
        var who = l.qui==='vous' ? 'Vous' : 'La personne au téléphone';
        return '<div class="l '+(l.qui==='vous'?'vous':'')+'"><span class="who">'+who+'</span>'+esc(l.texte)+'</div>';
      });
    }
    return [];
  }

  /* ---------- Lecture à voix haute ----------
     Synthèse vocale du navigateur : rien n'est lu tant qu'on n'a pas appuyé, et les
     boutons n'existent pas si le navigateur ne sait pas parler. Deux voix quand
     l'appareil en propose deux, sinon deux hauteurs. */
  var synth = (window.speechSynthesis && window.SpeechSynthesisUtterance) ? window.speechSynthesis : null;
  var boutonVoix = null;
  function arreterVoix(){
    if (synth){ try { synth.cancel(); } catch(e){} }
    if (boutonVoix){
      boutonVoix.classList.remove('lit');
      boutonVoix.textContent = boutonVoix.getAttribute('data-repos');
      boutonVoix.setAttribute('aria-pressed', 'false');
      boutonVoix = null;
    }
  }
  function lireVoix(btn){
    if (!synth) return;
    var deja = (boutonVoix === btn);
    arreterVoix();
    if (deja) return;              // un second appui arrête la lecture
    var c = deck[idx]; if (!c) return;
    var lignes = [];
    if (c.canal === 'appel'){
      lignes = (c.transcript || []).map(function(l){ return { vous: l.qui === 'vous', texte: l.texte }; });
    } else {
      var m = (c.messages || [])[parseInt(btn.getAttribute('data-m'), 10)];
      if (m && m.texte) lignes = [{ vous: false, texte: m.texte }];
    }
    if (!lignes.length) return;
    var voix = [];
    try { voix = synth.getVoices().filter(function(v){ return (v.lang || '').toLowerCase().indexOf('fr') === 0; }); } catch(e){}
    boutonVoix = btn;
    btn.classList.add('lit');
    btn.textContent = btn.getAttribute('data-stop');
    btn.setAttribute('aria-pressed', 'true');
    lignes.forEach(function(l, n){
      // les émojis seraient lus par leur nom (« cœur rouge ») : on les retire
      var u = new SpeechSynthesisUtterance(l.texte.replace(/[☀-➿️]|[\uD83C-\uD83E][\uDC00-\uDFFF]/g, ''));
      u.lang = 'fr-FR';
      if (voix.length) u.voice = voix[(l.vous && voix.length > 1) ? 1 : 0];
      u.pitch = l.vous ? 1.2 : 0.9;
      u.rate = 0.95;
      if (n === lignes.length - 1) u.onend = u.onerror = function(){ if (boutonVoix === btn) arreterVoix(); };
      synth.speak(u);
    });
  }

  /* affiche les messages d'une carte, animés message par message quand c'est possible,
     puis appelle callback() une fois que tout est affiché */
  function afficherMessages(c, callback){
    var host = document.querySelector('#maquette [data-anim]');
    if (!host){ callback(); return; }
    var items = itemsFor(c);
    var reduitMouvement = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!items.length || reduitMouvement){
      host.innerHTML = items.join('');
      callback();
      return;
    }
    sequence(items, host, callback);
  }

  function sequence(items, host, callback){
    var i = 0;
    (function next(){
      if (i >= items.length) return;
      host.insertAdjacentHTML('beforeend', items[i]);
      i++;
      if (i < items.length) setTimeout(next, 620);
      else if (callback) callback();
    })();
  }

  /* =====================================================================
     RÉPONSE + CORRECTION
     ===================================================================== */
  function repondre(choix){
    if (repondu) return;
    repondu = true;
    currentChoix = choix;
    var c = deck[idx];
    var bon = (choix === c.verdict);
    joue.push({ id: c.id, titre: c.categorie || c.entete || contexteParDefaut(c), reussi: bon,
                explication: (c.reflexe ? c.reflexe + ' ' : '') + (c.explication || '') });
    if (bon) score++;

    var ba = el('b-arnaque'), bf = el('b-fiable');
    if (ba) ba.disabled = true;
    if (bf) bf.disabled = true;
    var chosen = el(choix==='arnaque' ? 'b-arnaque' : 'b-fiable');
    if (chosen){ chosen.classList.add('choisi'); chosen.setAttribute('aria-pressed', 'true'); }

    montrerCorrection(bon);
  }

  /* --- Nature d'un repère et réponse attendue du joueur ---------------------
     Trois natures : 'indice' (le détail est un vrai signe), 'leurre' (posé là par
     l'escroc pour rassurer) et 'neutre' (un détail sans valeur probante, que
     personne n'a placé là pour tromper). Le champ « bon » reste accepté comme
     synonyme : bon:true = indice, bon:false = leurre par défaut. */
  function typeRepere(r){
    if (r && r.type) return r.type;
    return (r && r.bon) ? 'indice' : 'leurre';
  }
  function attenduPour(r, estArnaque){
    return typeRepere(r) === 'indice' ? (estArnaque ? 'louche' : 'rassurant') : 'neutre';
  }

  /* --- Où en est l'enquête ---------------------------------------------------
     On distingue ce qui est REPÉRÉ de ce qui RESTE à trouver : un indice mal
     jugé reste trouvé, sinon le compteur réclame éternellement un indice qui
     n'existe plus. */
  function statsReperes(){
    var estArnaque = deck[idx] && deck[idx].verdict === 'arnaque';
    var st = { total:0, reperes:0, mal:0, restants:0 };
    reperesActifs.forEach(function(r){
      if (typeRepere(r) !== 'indice') return;
      st.total++;
      if (!r._juge) return;
      st.reperes++;
      if (r._choix !== attenduPour(r, estArnaque)) st.mal++;
    });
    st.restants = st.total - st.reperes;
    return st;
  }

  /* ---------- 1) Phase d'ENQUÊTE : repérer les indices AVANT de décider ---------- */
  function entrerSpotting(){
    hintIdx = -1; hintStep = 0;
    el('lower').innerHTML =
      '<div class="spot-consigne"><b>Étape 1 — Enquêtez.</b> Cliquez, dans le message, sur les <b>éléments qui vous interpellent</b> 👆<small>À chaque clic, <b>c’est vous qui jugez</b>&nbsp;: louche, rien de spécial ou rassurant. On vous répond ensuite. Rien n’est surligné&nbsp;: à vous de fouiller. Le <b>contexte</b>, tout en haut, compte aussi.' + (deck[idx].canal === 'image' ? ' Sur une <b>image</b>, touchez le détail précis qui vous intrigue.' : '') + '</small></div>' +
      '<div class="spot-compteur" id="spot-compteur" aria-live="polite"></div>' +
      '<div class="spot-actions">' +
        '<button class="hint-btn" id="coup-pouce">💡 Coup de pouce</button>' +
      '</div>' +
      '<div class="hint-box" id="hint-box" hidden></div>' +
      '<div id="zone-decision"></div>';
    el('coup-pouce').onclick = coupDePouce;
    majCompteur();
    window.scrollTo({top:0, behavior:'smooth'});
  }

  /* ---------- 2) Phase de DÉCISION : après l'enquête, on tranche ---------- */
  function blocDecision(consigne){
    return '<div class="consigne">' + consigne + '</div>' +
      '<div class="decide">' +
        '<button class="btn-arnaque" id="b-arnaque" aria-pressed="false"><span class="em">🚨</span>Se méfier<small>C’est une arnaque</small></button>' +
        '<button class="btn-fiable" id="b-fiable" aria-pressed="false"><span class="em">✅</span>Faire confiance<small>C’est fiable</small></button>' +
      '</div>';
  }
  function brancherDecision(){
    el('b-arnaque').onclick = function(){ repondre('arnaque'); };
    el('b-fiable').onclick  = function(){ repondre('fiable'); };
  }

  /* Tant qu'il reste un indice à trouver, un bouton mène à la décision. Dès que
     tout est repéré, les deux verdicts sont là, directement cliquables : l'enquête
     est finie, on n'impose pas un écran de plus. */
  function majZoneDecision(){
    var z = el('zone-decision'); if (!z) return;
    var etat = statsReperes().restants > 0 ? 'attente' : 'pret';
    if (z.getAttribute('data-etat') === etat) return;
    z.setAttribute('data-etat', etat);
    if (etat === 'attente'){
      z.innerHTML = '<button class="next" id="go-decide">J’ai enquêté, je décide ▶</button>';
      el('go-decide').onclick = phaseDecision;
    } else {
      var cp = el('coup-pouce');
      if (cp){ cp.disabled = true; cp.textContent = '💡 Tout est repéré ✓'; hideAide(); }
      z.innerHTML = blocDecision('<b>Étape 2 — Votre verdict.</b> Vous avez repéré tous les indices. Que faites-vous de ce message&nbsp;?<small>On s’en méfie, ou on peut lui faire confiance&nbsp;?</small>');
      brancherDecision();
    }
  }

  function phaseDecision(){
    hidePop();
    el('lower').innerHTML =
      blocDecision('<b>Étape 2 — Votre verdict.</b> D’après les indices, que faites-vous de ce message&nbsp;?<small>On s’en méfie, ou on peut lui faire confiance&nbsp;?</small>') +
      '<button class="hint-btn" id="retour-enquete" style="margin-top:10px">↩ Revenir à l’enquête</button>';
    brancherDecision();
    var rb = el('retour-enquete'); if (rb) rb.onclick = entrerSpotting;
    window.scrollTo({top:0, behavior:'smooth'});
  }

  // rend cliquables (et accessibles au clavier) les fragments définis dans les « reperes »
  function activerReperes(root, reperes){
    reperes.forEach(function(r, i){
      if (r.texte === '__IMG__'){
        var img = root.querySelector('img.big, .fauxphoto');
        if (img){
          img.classList.add('repere'); img.setAttribute('data-i', i);
          img.setAttribute('role', 'button'); img.setAttribute('tabindex', '0');
        } else {
          console.warn('[Radar’naque] repère image introuvable dans le DOM.');
        }
        return;
      }
      /* D27, option A : une zone précise de l'image, en % de sa largeur et de sa hauteur
         (x, y = centre). Le CSS lui garantit 44 px de côté au doigt. */
      if (r.zone){
        var cadre = root.querySelector('.img-wrap');
        if (cadre){
          var z = document.createElement('span');
          z.className = 'repere zone'; z.setAttribute('data-i', i);
          z.setAttribute('role', 'button'); z.setAttribute('tabindex', '0');
          z.setAttribute('aria-label', r.nom || 'Zone de l’image');
          z.style.left = r.zone.x + '%'; z.style.top = r.zone.y + '%';
          z.style.width = r.zone.w + '%'; z.style.height = r.zone.h + '%';
          cadre.appendChild(z);
        } else {
          console.warn('[Radar’naque] repère de zone introuvable dans le DOM.');
        }
        return;
      }
      if (r.texte === '__CTX__'){
        var ctx = root.querySelector('.entete .ctx');
        if (ctx){
          ctx.classList.add('repere'); ctx.setAttribute('data-i', i);
          ctx.setAttribute('role', 'button'); ctx.setAttribute('tabindex', '0');
        } else {
          console.warn('[Radar’naque] repère de contexte introuvable dans le DOM.');
        }
        return;
      }
      // le contexte ne se désigne qu'en entier ('__CTX__') : on n'y cherche jamais un fragment,
      // sinon un mot du contexte capterait le repère destiné au message
      var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: function(n){
        return (n.parentNode && n.parentNode.closest && n.parentNode.closest('.entete')) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      } });
      var node, wrapped = false;
      while ((node = walker.nextNode())){
        var pos = node.nodeValue.indexOf(r.texte);
        if (pos >= 0){
          var range = document.createRange();
          range.setStart(node, pos);
          range.setEnd(node, pos + r.texte.length);
          var span = document.createElement('span');
          span.className = 'repere';
          span.setAttribute('data-i', i);
          span.setAttribute('role', 'button');
          span.setAttribute('tabindex', '0');
          try { range.surroundContents(span); wrapped = true; } catch(e){}
          break;
        }
      }
      if (!wrapped) console.warn('[Radar’naque] repère introuvable dans le DOM :', r.texte);
    });
    root.addEventListener('click', function(e){
      if (!root.classList.contains('mode-spot')) return;
      // clic dans la petite fenêtre d'explication (ou sur un mot du glossaire) : on laisse faire
      if (e.target.closest && e.target.closest('.gloss, .ecoute')) return;
      // toucher la fenêtre d'explication la referme : plus besoin de viser la croix
      if (e.target.closest && e.target.closest('.spot-pop')){ hidePop(); return; }
      var t = e.target.closest ? e.target.closest('.repere') : null;
      if (t) clicRepere(parseInt(t.getAttribute('data-i'), 10), t);
      else clicVide(e);            // la personne a cliqué à côté : on le lui signale
    });
    root.addEventListener('keydown', function(e){
      if (!root.classList.contains('mode-spot')) return;
      if (e.key !== 'Enter' && e.key !== ' ') return;
      if (e.target.closest && (e.target.closest('.spot-pop') || e.target.closest('.gloss'))) return;
      var t = e.target.closest ? e.target.closest('.repere') : null;
      if (t){ e.preventDefault(); clicRepere(parseInt(t.getAttribute('data-i'), 10), t); }
    });
  }

  function clicRepere(i, span){
    var r = reperesActifs[i];
    if (!r) return;
    // déjà jugé : on réaffiche simplement le retour mémorisé
    if (span.classList.contains('trouve') || span.classList.contains('decoy')){
      afficherResultatRepere(i, span, r._choix);
      return;
    }
    ouvrirSonde(i, span);
  }

  /* --- Le joueur juge lui-même, d'un seul geste : louche, rien de spécial ou rassurant ---
     ColModale (collection.js) porte le piège de focus, Échap et le retour du focus
     à l'élément d'origine : la sonde n'a plus à réécrire ces trois choses. */
  function ouvrirSonde(i, span){
    span.classList.remove('hint-flash');
    /* Les trois réponses SONT les boutons de la modale : un seul geste suffit, sans
       « Valider ». Le focus part sur le titre, pas sur une réponse : une touche Entrée
       restée enfoncée en ouvrant la sonde ne peut ainsi pas répondre à la place du
       joueur, et Tab mène à la première réponse. */
    var promesse = ColModale.ouvrir({
      titre: 'Ce détail, vous le sentez comment ?',
      classe: 'sonde',
      actions: [
        { id: 'louche', libelle: 'Louche' },
        { id: 'neutre', libelle: 'Rien de spécial' },
        { id: 'rassurant', libelle: 'Rassurant' },
        { id: 'annuler', libelle: 'Annuler' }
      ]
    });
    // ColModale écrit des libellés en texte : on leur ajoute ici leur pictogramme
    var EMO = ['🚩', '😐', '✅'];
    var btns = document.querySelectorAll('dialog.col-modale.sonde .col-modale__actions .col-btn');
    EMO.forEach(function(em, k){
      var b = btns[k]; if (!b) return;
      b.classList.add('cr');
      b.innerHTML = '<span class="e" aria-hidden="true">' + em + '</span><small>' + esc(b.textContent) + '</small>';
    });
    if (btns[3]) btns[3].classList.add('sonde-annuler');
    var titreSonde = document.querySelector('dialog.col-modale.sonde .col-modale__titre');
    if (titreSonde){ titreSonde.setAttribute('tabindex', '-1'); titreSonde.focus(); }

    promesse.then(function(id){
      if (id && id !== 'annuler') validerSonde(i, span, id);
    });
  }

  function validerSonde(i, span, choix){
    var r = reperesActifs[i];
    if (typeRepere(r) === 'indice'){
      if (!span.classList.contains('trouve')){
        span.classList.add('trouve');
        // l'indice est repéré : le coup de pouce repart de zéro sur le suivant
        hintIdx = -1; hintStep = 0; hideAide(); resetHintBtn();
      }
    } else {
      span.classList.add('decoy');
    }
    r._choix = choix; r._juge = true;
    majCompteur();
    afficherResultatRepere(i, span, choix);
  }

  /* --- Retour pédagogique après le jugement du joueur ---
     Le vert et le rouge jugent le CHOIX DU JOUEUR, jamais la nature du détail :
     on dit d’abord s’il a eu raison, ensuite seulement ce qu’était ce détail. */
  function afficherResultatRepere(i, span, choix){
    var r = reperesActifs[i];
    var estArnaque = deck[idx].verdict === 'arnaque';
    var type = typeRepere(r);
    var attendu = attenduPour(r, estArnaque);
    var juste = (choix === attendu);
    var tete, nature, defaut, corps;

    if (type === 'indice'){
      nature = estArnaque ? '🚩 C’était un signe suspect — ' : '✅ C’était un signe rassurant — ';
      defaut = 'Ce détail compte dans la lecture du message.';
      if (juste)                   tete = '🎯 Vous avez eu raison, et vous avez bien situé le détail. ';
      else if (choix === 'neutre') tete = '❌ Vous êtes passé à côté&nbsp;: ce détail compte. ';
      else                         tete = '❌ Bon repérage, mais dans l’autre sens. ';
    } else if (type === 'leurre'){
      nature = '🅾️ C’était une fausse piste, posée là pour vous rassurer — ';
      defaut = 'Ce détail attire l’œil, mais ce n’est pas là qu’est le vrai signe.';
      if (juste)                      tete = '🎯 Vous avez eu raison&nbsp;: ce détail ne prouve rien. ';
      else if (choix === 'rassurant') tete = '❌ C’est exactement l’effet recherché. ';
      else                            tete = '❌ Ce n’est pas ce détail qui trahit le message. ';
    } else {
      nature = '😐 C’était un détail neutre — ';
      defaut = 'Il ne prouve rien, ni dans un sens ni dans l’autre.';
      if (juste)                   tete = '🎯 Vous avez eu raison&nbsp;: ce détail ne prouve rien. ';
      else if (choix === 'louche') tete = '❌ Méfiance de trop&nbsp;: ce détail n’accuse personne. ';
      else                         tete = '❌ À ne pas prendre pour une garantie. ';
    }
    corps = tete + nature + gl(r.note || defaut);

    showResultPop(span, (juste ? 'ok' : 'ko'), '<div class="pc"><span>' + corps + '</span></div>');
  }

  // clic « à côté » (pas sur un indice) : petit retour rassurant à l'endroit cliqué.
  // Si ce message est déjà affiché, un nouveau clic dans le vide le fait disparaître.
  function clicVide(e){
    var p = document.querySelector('#spot-pop');
    if (p && p.style.display !== 'none'){ hidePop(); return; }
    showPopAt(e, 'miss', 'Rien d’exploitable ici. Cherchez les détails qui sortent de l’ordinaire : l’expéditeur, un lien, le ton, une urgence, une demande d’argent ou de code…');
  }

  function majCompteur(){
    var cmp = el('spot-compteur');
    if (cmp){
      var st = statsReperes();
      cmp.innerHTML =
        'Indices repérés&nbsp;: <b>' + st.reperes + '</b> / ' + st.total + ' · ' +
        (st.restants
          ? 'il en reste <b>' + st.restants + '</b> à trouver'
          : '<b>vous les avez tous trouvés</b> ✓') +
        (st.mal ? '<small>Dont <b>' + st.mal + '</b> que vous avez mal jugé.</small>' : '');
    }
    majZoneDecision();
  }

  /* ---------- Coup de pouce à deux niveaux ----------
     1er clic : un indice ÉCRIT qui invite à réfléchir (« Penses-tu qu'une star… »).
     2e clic  : on MONTRE l'emplacement en le faisant clignoter.
     Dès qu'un indice est trouvé, on repart au niveau 1 sur le suivant. */
  function coupDePouce(){
    var maq = el('maquette'); if (!maq) return;
    var next = -1;
    reperesActifs.forEach(function(r, i){
      if (next >= 0 || typeRepere(r) !== 'indice') return;
      var s = maq.querySelector('.repere[data-i="' + i + '"]');
      if (s && !s.classList.contains('trouve')) next = i;
    });
    var btn = el('coup-pouce');
    if (next < 0){ if (btn){ btn.disabled = true; btn.textContent = '💡 Tout est repéré ✓'; } hideAide(); return; }

    // nouvelle cible → on recommence au niveau 1
    if (next !== hintIdx){ hintIdx = next; hintStep = 0; }
    hintStep++;
    aideCarte = true;   // la troisième étoile se gagne sans aide
    var r = reperesActifs[next];

    if (hintStep === 1 && r.aide){
      // Niveau 1 : indice écrit, sans révéler l'emplacement
      showAide(r.aide);
      if (btn) btn.textContent = '👀 Montrez-moi où';
    } else {
      // Niveau 2 (ou pas d'indice écrit dispo) : on montre l'endroit
      var span = maq.querySelector('.repere[data-i="' + next + '"]');
      if (span){
        span.classList.add('hint-flash');
        span.scrollIntoView({block:'center', behavior:'smooth'});
        setTimeout(function(){ if (span) span.classList.remove('hint-flash'); }, 2400);
      }
      resetHintBtn();
    }
  }
  function resetHintBtn(){ var b = el('coup-pouce'); if (b && !b.disabled) b.textContent = '💡 Coup de pouce'; }

  // Encadré d'indice écrit (niveau 1), affiché sous le bouton
  function showAide(text){
    var box = el('hint-box'); if (!box) return;
    box.innerHTML = '<span class="hi">💭</span><span>' + gl(text) + '</span>';
    box.hidden = false;
  }
  function hideAide(){ var b = el('hint-box'); if (b) b.hidden = true; }

  /* ---------- Petite fenêtre d'explication ancrée près du clic ---------- */
  function ensurePop(){
    var maq = el('maquette');
    var pop = maq.querySelector('#spot-pop');
    if (!pop){ pop = document.createElement('div'); pop.id = 'spot-pop'; pop.setAttribute('aria-live', 'polite'); maq.appendChild(pop); }
    pop.style.display = 'block';
    return pop;
  }
  function hidePop(){ var p = document.querySelector('#spot-pop'); if (p) p.style.display = 'none'; }

  function remplirPop(kind, note){
    var pop = ensurePop();
    pop.className = 'spot-pop ' + kind;
    var ic = kind==='ok' ? '✅' : (kind==='ko' ? '➖' : '🤔');
    pop.innerHTML =
      '<button class="x" type="button" aria-label="Fermer">✕</button>' +
      '<div class="pc"><span class="ic">' + ic + '</span><span>' + gl(note) + '</span></div>' +
      '<span class="arrow"></span>';
    pop.querySelector('.x').onclick = function(ev){ ev.stopPropagation(); hidePop(); };
    return pop;
  }

  function showPop(anchor, kind, note){
    if (!el('maquette')) return;
    positionPop(remplirPop(kind, note), anchor, null);
  }
  function showPopAt(e, kind, note){
    var maq = el('maquette'); if (!maq) return;
    positionPop(remplirPop(kind, note), null, { x:e.clientX, y:e.clientY });
  }
  // comme showPop, mais accepte du HTML déjà composé (glossaire appliqué en amont)
  function showResultPop(anchor, kind, innerHTML){
    if (!el('maquette')) return;
    var pop = ensurePop();
    pop.className = 'spot-pop ' + kind;
    pop.innerHTML =
      '<button class="x" type="button" aria-label="Fermer">✕</button>' +
      innerHTML +
      '<span class="arrow"></span>';
    pop.querySelector('.x').onclick = function(ev){ ev.stopPropagation(); hidePop(); };
    positionPop(pop, anchor, null);
  }

  function positionPop(pop, anchor, xy){
    var maq = el('maquette');
    pop.style.visibility = 'hidden'; pop.style.display = 'block';
    var mr = maq.getBoundingClientRect();
    var cx, topA, botA, refTop, refBot;
    if (anchor){
      var ar = anchor.getBoundingClientRect();
      cx = ar.left + ar.width/2 - mr.left;
      topA = ar.top - mr.top; botA = ar.bottom - mr.top;
      refTop = ar.top; refBot = ar.bottom;
    } else {
      cx = xy.x - mr.left; topA = botA = xy.y - mr.top;
      refTop = refBot = xy.y;
    }
    var pw = pop.offsetWidth, ph = pop.offsetHeight;
    var left = Math.max(6, Math.min(cx - pw/2, maq.clientWidth - pw - 6));

    // sous l'élément par défaut ; au-dessus s'il n'y a pas la place en bas de l'écran
    // l'en-tête de la collection passe au-dessus de la fenêtre : on ne la glisse pas dessous,
    // sinon sa croix de fermeture devient inatteignable en haut de page
    var entete = document.querySelector('.col-entete');
    var hautLibre = entete ? Math.max(0, entete.getBoundingClientRect().bottom) : 0;
    var placeBelow = (window.innerHeight - refBot) > (ph + 24) || (refTop - hautLibre) < (ph + 24);
    var top = placeBelow ? (botA + 12) : (topA - ph - 12);
    pop.classList.toggle('above', !placeBelow);
    pop.style.left = left + 'px';
    pop.style.top  = top + 'px';

    var arrow = pop.querySelector('.arrow');
    if (arrow){ arrow.style.left = Math.max(10, Math.min(cx - left - 6, pw - 22)) + 'px'; }
    pop.style.visibility = 'visible';
  }

  /* ---------- CORRECTION complète ---------- */
  function montrerCorrection(bon){
    hidePop();
    var c = deck[idx];
    var estArnaque = c.verdict === 'arnaque';

    // révèle les indices non trouvés dans le message
    var root = el('maquette');
    if (root){
      root.classList.remove('mode-spot');
      root.classList.add('mode-corrige');
      reperesActifs.forEach(function(r, i){
        if (typeRepere(r) !== 'indice') return;
        var span = root.querySelector('.repere[data-i="' + i + '"]');
        if (span && !span.classList.contains('trouve')) span.classList.add('manque');
      });
    }

    var listeClasse = estArnaque ? 'indices' : 'indices ok';
    var indices = (c.indices||[]).map(function(x){
      if (x && typeof x === 'object' && x.risque) return '<li class="risque">'+gl(x.risque)+'</li>';
      return '<li>'+gl(x)+'</li>';
    }).join('');

    var titreVerdict, sousTitre;
    if (bon){
      titreVerdict = '👏 Bien vu&nbsp;!';
      sousTitre = estArnaque ? 'C’était bien une arnaque.' : 'C’était bien un message fiable.';
    } else {
      titreVerdict = '⚠️ Attention';
      sousTitre = estArnaque
        ? 'En réalité, c’était une arnaque. Voici comment le repérer.'
        : 'En réalité, ce message était fiable — pas besoin de s’alarmer ici.';
    }

    var st = statsReperes();
    /* Trois étoiles par carte : le verdict, tous les indices repérés, tous bien jugés sans coup de pouce */
    var e1 = bon, e2 = st.total > 0 && st.restants === 0, e3 = e2 && st.mal === 0 && !aideCarte;
    var nbE = (e1 ? 1 : 0) + (e2 ? 1 : 0) + (e3 ? 1 : 0);
    etoiles += nbE;
    function et(ok){ return '<span class="' + (ok ? 'on' : 'off') + '">★</span>'; }
    function etl(ok, txt){ return '<li class="' + (ok ? 'on' : 'off') + '">' + (ok ? '✓ ' : '– ') + txt + '</li>'; }
    var blocEtoiles = '<div class="etoiles">' +
      '<span class="et-rang" role="img" aria-label="' + nbE + ' étoile' + (nbE > 1 ? 's' : '') + ' sur 3' + '">' + et(e1) + et(e2) + et(e3) + '</span>' +
      '<ul class="et-detail">' + etl(e1, 'Le bon verdict') + etl(e2, 'Tous les indices repérés') + etl(e3, 'Tous bien jugés, sans coup de pouce') + '</ul></div>';

    /* « Et maintenant, je fais quoi ? » : après une arnaque, le joueur choisit le geste
       avant qu'on lui donne le réflexe. Les cartes fiables n'ont pas cette étape. */
    var gf = estArnaque ? GESTES[c.id] : null;
    var blocGeste = '';
    if (gf){
      blocGeste = '<div class="quefaire" id="quefaire">' +
        '<div class="bloc-titre">🤔 Et maintenant, vous faites quoi&nbsp;?</div>' +
        '<p class="qf-sous">Reconnaître l’arnaque ne suffit pas&nbsp;: choisissez le bon geste.</p>' +
        '<div class="qf-options">' +
        shuffle(gf).map(function(k){ return '<button type="button" class="qf-opt" data-k="' + k + '">' + esc(ACTES[k].t) + '</button>'; }).join('') +
        '</div><div class="qf-retour" id="qf-retour" tabindex="-1" aria-live="polite"></div></div>';
    }
    var recap = st.total
      ? '<div class="spot-recap">Vous avez repéré <b>' + st.reperes + '</b> indice(s) sur ' + st.total +
        (st.mal ? ', dont <b>' + st.mal + '</b> mal jugé' + (st.mal > 1 ? 's' : '') : '') +
        '. Les éléments <span class="lg-manque">encadrés</span> dans le message sont ceux à retenir.</div>'
      : '';

    el('lower').innerHTML =
      '<div class="feedback" aria-live="polite">' +
        '<div class="verdict-bar ' + (bon?'bon':'faux') + '">' +
          '<span class="big">' + (bon?'✅':'❗') + '</span>' +
          '<div>' + titreVerdict + '<small>' + sousTitre + '</small></div>' +
        '</div>' +
        blocEtoiles +
        recap +
        '<span class="tag ' + (estArnaque?'arnaque':'fiable') + '">' +
          (estArnaque?'🚨 ':'✅ ') + gl(c.categorie) + '</span>' +
        '<div class="bloc-titre">' + (estArnaque?'🔎 Les indices qui trahissent l’arnaque :':'✅ Ce qui montre que c’est fiable :') + '</div>' +
        '<ul class="' + listeClasse + '">' + indices + '</ul>' +
        blocGeste +
        '<div id="suite-corr"' + (gf ? ' hidden' : '') + '>' +
        '<div class="reflexe"><b>👉 Le bon réflexe :</b> ' + gl(c.reflexe) + '</div>' +
        '<div class="explication">' + gl(c.explication) + '</div>' +
        '<button class="next" id="next">' + (idx+1 < deck.length ? 'Message suivant ▶' : 'Voir mon résultat 🏁') + '</button>' +
        '</div>' +
      '</div>';

    el('next').onclick = suivant;
    if (gf){
      var opts = el('quefaire').querySelectorAll('.qf-opt');
      var choisirGeste = function(b){
        var k = b.getAttribute('data-k'), ok = (k === gf[0]);
        gestesPoses++; if (ok) gestesBons++;
        for (var n = 0; n < opts.length; n++){
          opts[n].disabled = true;
          if (opts[n].getAttribute('data-k') === gf[0]) opts[n].classList.add('bon');
        }
        b.classList.add('choisi'); if (!ok) b.classList.add('faux');
        var rt = el('qf-retour');
        rt.className = 'qf-retour ' + (ok ? 'ok' : 'ko');
        rt.innerHTML = ok ? '✅ C’est le bon geste. ' : '❌ ' + esc(ACTES[k].p || '') + ' Le bon geste&nbsp;: <b>' + esc(ACTES[gf[0]].t) + '</b>.';
        el('suite-corr').hidden = false;
        rt.focus();
      };
      for (var q = 0; q < opts.length; q++){
        (function(b){ b.onclick = function(){ choisirGeste(b); }; })(opts[q]);
      }
    }
    barFill.style.width = Math.round((idx+1)/deck.length*100) + '%';
    majScore();
    el('lower').querySelector('.feedback').scrollIntoView({behavior:'smooth', block:'nearest'});
  }

  function suivant(){
    idx++;
    if (idx >= deck.length) return ecranFin();
    montrerCarte();
  }

  /* =====================================================================
     ÉCRAN DE FIN
     ===================================================================== */
  function ecranFin(){
    arreterVoix();
    hud.style.display = 'none';
    var total = deck.length;
    var pct = Math.round(score/total*100);
    var jauge, msg;
    if (pct >= 85){ jauge='🏆'; msg='Excellent&nbsp;! Vous avez l’œil. Vous saurez déjouer la plupart des pièges.'; }
    else if (pct >= 60){ jauge='👍'; msg='Bon travail&nbsp;! Encore quelques réflexes à ancrer et vous serez incollable.'; }
    else if (pct >= 40){ jauge='💪'; msg='C’est un début. Rejouez pour bien mémoriser les indices qui reviennent souvent.'; }
    else { jauge='🌱'; msg='Pas de souci&nbsp;: ces arnaques sont faites pour tromper. Relisez les réflexes et réessayez.'; }

    app.innerHTML =
      '<div class="panel hero">' +
        '<div class="col-fin" id="ecran-fin"></div>' +
        '<div class="reflexes-carte">' +
          '<h3>🛡️ Les 6 réflexes à garder en tête</h3>' +
          '<ul>' +
            '<li>Je ne clique <b>jamais</b> sur un lien reçu par SMS ou e-mail non attendu.</li>' +
            '<li>Une banque ou un service public ne demande <b>jamais</b> un code, un mot de passe ou une carte bancaire.</li>' +
            '<li>Urgence, peur, menace, cadeau&nbsp;: ce sont des <b>pièges</b> pour m’empêcher de réfléchir.</li>' +
            '<li>Je vérifie l’<b>adresse complète</b> de l’expéditeur (le nom affiché ne prouve rien).</li>' +
            '<li>En cas de doute, je <b>raccroche</b> et je rappelle par le numéro officiel (dos de la carte, site connu).</li>' +
            '<li>Un « amour » ou un « proche » qui demande de l’<b>argent</b> en ligne&nbsp;: je vérifie toujours autrement.</li>' +
          '</ul>' +
        '</div>' +
        '<div class="ressources">' +
          '<h3>📞 En cas de doute ou si vous êtes victime</h3>' +
          '<div class="r"><span class="num">17</span><span>Police / Gendarmerie en cas d’urgence.</span></div>' +
          '<div class="r"><span class="num">33700</span><span>Pour signaler un SMS ou appel frauduleux (transférez-le, gratuit).</span></div>' +
          '<div class="r"><span class="num">0 805 805 817</span><span>Info Escroqueries (numéro gratuit).</span></div>' +
          '<div class="r"><b>cybermalveillance.gouv.fr</b><span>Aide et démarches si vous avez été piégé.</span></div>' +
          '<div class="r"><b>signal-arnaques.com</b><span>Vérifier un numéro, un site ou un message douteux.</span></div>' +
        '</div>' +
        '<button class="btn-gloss" id="fin-avis" style="margin-top:10px">💬 Donner mon avis</button>' +
        '<p class="footer-note">Parlez-en autour de vous&nbsp;: en parler, c’est déjà se protéger.</p>' +
      '</div>';
    /* E2 : jauge, score, message, cartes ratées avec leur réflexe et boutons sont rendus
       par ColFin. Pas de lien de retour : la page n'en a jamais eu. */
    ColFin.rendre({
      cible: el('ecran-fin'), jeu: JEU, message: jauge + ' ' + texteBrut(msg) + ' ⭐ ' + etoiles + ' étoile' + (etoiles > 1 ? 's' : '') + ' sur ' + (3 * total) + '.' + (gestesPoses ? ' Bons gestes : ' + gestesBons + ' sur ' + gestesPoses + '.' : ''),
      score: score, total: total, items: joue, retour: false,
      onRejouer: function(rates){ demarrer(SCENARIOS.filter(function(c){ return rates.some(function(r){ return r.id === c.id; }); })); },
      onRecommencer: function(){ demarrer(); }
    });
    var fa = el('fin-avis'); if (fa) fa.onclick = openFeedback;
    window.scrollTo({top:0, behavior:'smooth'});
  }

  /* =====================================================================
     GLOSSAIRE — fenêtre « Les mots à connaître »
     ===================================================================== */
  function buildGlossaireModal(){
    if (el('gloss-modal')) return;
    var items = GLOSS.map(function(g){
      return '<div class="gdef" id="gdef-' + g.key + '">' +
               '<div class="gt">' + esc(g.terme) + '</div>' +
               '<div class="gd">' + esc(g.def) + '</div>' +
             '</div>';
    }).join('');
    var ov = document.createElement('div');
    ov.className = 'modal-overlay';
    ov.id = 'gloss-modal';
    ov.setAttribute('hidden','');
    ov.innerHTML =
      '<div class="modal" role="dialog" aria-modal="true" aria-label="Les mots à connaître">' +
        '<div class="modal-head">' +
          '<h2>📖 Les mots à connaître</h2>' +
          '<button class="modal-close" id="gloss-close" aria-label="Fermer">✕</button>' +
        '</div>' +
        '<p class="modal-intro">Le vocabulaire des arnaques, expliqué simplement. ' +
        'Pendant le jeu, les mots <span class="gloss-demo">soulignés</span> sont cliquables.</p>' +
        '<div class="modal-body" id="gloss-list">' + items + '</div>' +
        '<button class="next" id="gloss-ok">J’ai compris</button>' +
      '</div>';
    document.body.appendChild(ov);
    el('gloss-close').onclick = fermerGlossaire;
    el('gloss-ok').onclick = fermerGlossaire;
    ov.addEventListener('click', function(e){ if (e.target === ov) fermerGlossaire(); });
  }

  function openGlossaire(key){
    buildGlossaireModal();
    var ov = el('gloss-modal');
    ov.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    // enlève un éventuel surlignage précédent
    var prev = document.querySelector('.gdef.surligne');
    if (prev) prev.classList.remove('surligne');
    if (key && glossParKey[key]){
      var cible = el('gdef-' + key);
      if (cible){
        cible.classList.add('surligne');
        cible.scrollIntoView({block:'center'});
      }
    } else {
      el('gloss-list').scrollTop = 0;
    }
  }

  function fermerGlossaire(){
    var ov = el('gloss-modal');
    if (ov){ ov.setAttribute('hidden',''); }
    document.body.style.overflow = '';
  }

  /* =====================================================================
     FENÊTRE DE MESSAGE INTERNE — remplace confirm()/alert() natifs,
     visuellement cohérente avec le reste de l'interface (.modal/.fb-actions).
     ===================================================================== */
  function showModalMsg(message, opts){
    opts = opts || {};
    var ov = el('msg-modal');
    if (!ov){
      ov = document.createElement('div');
      ov.className = 'modal-overlay';
      ov.id = 'msg-modal';
      ov.setAttribute('hidden', '');
      ov.innerHTML =
        '<div class="modal msg-modal" role="alertdialog" aria-modal="true">' +
          '<p class="msg-modal-text" id="msg-modal-text"></p>' +
          '<div class="fb-actions" id="msg-modal-actions"></div>' +
        '</div>';
      document.body.appendChild(ov);
      ov.addEventListener('click', function(e){ if (e.target === ov && ov.dataset.blocking !== '1') hideModalMsg(); });
    }
    el('msg-modal-text').textContent = message;
    var actions = el('msg-modal-actions');
    if (opts.confirm){
      ov.dataset.blocking = '1';
      actions.innerHTML =
        '<button class="fb-cancel" id="msg-modal-cancel" type="button">Annuler</button>' +
        '<button class="fb-send" id="msg-modal-ok" type="button">Confirmer</button>';
      el('msg-modal-cancel').onclick = hideModalMsg;
      el('msg-modal-ok').onclick = function(){ hideModalMsg(); if (opts.onConfirm) opts.onConfirm(); };
    } else {
      ov.dataset.blocking = '0';
      actions.innerHTML = '<button class="fb-send" id="msg-modal-ok" type="button">OK</button>';
      el('msg-modal-ok').onclick = function(){ hideModalMsg(); if (opts.onOk) opts.onOk(); };
    }
    ov.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    el('msg-modal-ok').focus();
  }
  function hideModalMsg(){
    var ov = el('msg-modal');
    if (ov) ov.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  /* =====================================================================
     INITIALISATION
     ===================================================================== */
  /* =====================================================================
     RETOUR / AVIS — envoi direct par e-mail (Web3Forms, comme Fakemètre)
     ===================================================================== */
  function openFeedback(){ var o=el('fb-overlay'); if(o){ o.classList.add('open'); var m=el('fb-message'); if(m) m.focus(); } }
  function closeFeedback(){ var o=el('fb-overlay'); if(o) o.classList.remove('open'); }
  function sendFeedback(){
    var n=el('fb-name'), e=el('fb-email'), m=el('fb-message');
    var name=(n&&n.value||'').trim(), email=(e&&e.value||'').trim(), msg=(m&&m.value||'').trim();
    if(!msg){ showModalMsg('Écrivez un petit message avant d’envoyer 🙂'); return; }
    var btn=el('fb-send'); if(btn){ btn.disabled=true; btn.textContent='⏳ Envoi…'; }
    /* Web3Forms pose « email » en Reply-To du message qu'il expédie. Y mettre
       « non renseigné » quand le champ est vide fabrique un en-tête invalide,
       et les filtres anti-spam — Outlook et Hotmail en tête — classent le
       message : l'API répond « success », l'avis n'arrive jamais. Le champ
       n'est pas obligatoire, on ne l'envoie que s'il est vraiment rempli. */
    var envoi = {
      access_key:'ef1fe549-c616-4a27-a6c2-97f06caa913d',
      subject:'Avis Radar’naque' + (name ? ' — ' + name : ''),
      name: name || 'Anonyme',
      message: msg
    };
    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) envoi.email = email;
    fetch('https://api.web3forms.com/submit', {
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body: JSON.stringify(envoi)
    }).then(function(r){ return r.json(); }).then(function(d){
      if(d && d.success){ if(n)n.value=''; if(e)e.value=''; if(m)m.value=''; closeFeedback(); showModalMsg('Merci beaucoup pour votre retour ! 🙏'); }
      else { showModalMsg('Oups, l’envoi a échoué. Réessayez, ou écrivez à contact@antoninatger.com'); }
    }).catch(function(){ showModalMsg('Oups, l’envoi a échoué. Réessayez, ou écrivez à contact@antoninatger.com'); })
    .then(function(){ if(btn){ btn.disabled=false; btn.textContent='📨 Envoyer'; } });
  }

  function init(){
    app = el('app'); hud = el('hud');
    barFill = el('barfill'); barLbl = el('barlbl'); scoreEl = el('score');

    prepareGlossaire();
    buildGlossaireModal();

    // boutons de taille de texte
    var tb = document.querySelectorAll('.textsize button');
    for (var i=0;i<tb.length;i++){
      (function(b){ b.onclick = function(){ setTaille(b.getAttribute('data-t'), b); }; })(tb[i]);
    }
    var saved = null;
    try { saved = localStorage.getItem('radar_taille'); } catch(e){}
    if (saved){
      var match = document.querySelector('.textsize button[data-t="'+saved+'"]');
      setTaille(saved, match);
    }
    // taille imposée par le lien (?taille=1.4), sans la mémoriser : fenêtre de jeu dans une diapo projetée
    var tLien = null;
    try { tLien = new URLSearchParams(location.search).get('taille'); } catch(e){}
    if (tLien && /^[0-9.]+$/.test(tLien)){
      document.documentElement.style.setProperty('--taille', tLien);
      for (var j=0;j<tb.length;j++) tb[j].classList.toggle('on', tb[j].getAttribute('data-t') === tLien);
    }

    // bouton « retour au menu » (visible seulement pendant le jeu)
    var mb = el('menu-btn');
    if (mb) mb.onclick = function(){
      if (hud && hud.style.display !== 'none'){
        showModalMsg('Revenir au menu ? La partie en cours sera perdue.', { confirm:true, onConfirm:ecranAccueil });
      } else {
        ecranAccueil();
      }
    };

    // bouton glossaire de la barre du haut (accessible pendant le jeu)
    var gb = el('gloss-btn');
    if (gb) gb.onclick = function(){ openGlossaire(); };

    // bouton « Avis » + fenêtre de retour (envoi par e-mail)
    var ab = el('avis-btn');   if (ab) ab.onclick = openFeedback;
    var fx = el('fb-x');       if (fx) fx.onclick = closeFeedback;
    var fc = el('fb-cancel');  if (fc) fc.onclick = closeFeedback;
    var fs = el('fb-send');    if (fs) fs.onclick = sendFeedback;
    var fo = el('fb-overlay'); if (fo) fo.addEventListener('click', function(e){ if (e.target === fo) closeFeedback(); });

    // clic sur un mot du glossaire (délégation : marche sur tout contenu injecté)
    document.addEventListener('click', function(e){
      var t = e.target;
      var ec = (t && t.closest) ? t.closest('.ecoute') : null;
      if (ec){ lireVoix(ec); return; }
      if (t && t.classList && t.classList.contains('gloss')){
        openGlossaire(t.getAttribute('data-g'));
      }
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape'){ fermerGlossaire(); closeFeedback(); hideModalMsg(); }
      var t = e.target;
      if ((e.key === 'Enter' || e.key === ' ') && t && t.classList && t.classList.contains('gloss')){
        e.preventDefault(); openGlossaire(t.getAttribute('data-g'));
      }
    });

    // lien direct depuis une diapo : index.html?carte=id1,id2 lance ces cartes
    var ids = null;
    try { ids = new URLSearchParams(location.search).get('carte'); } catch(e){}
    if (ids){
      var voulues = ids.split(',').map(function(x){ return x.trim(); });
      var paquet = SCENARIOS.filter(function(c){ return voulues.indexOf(c.id) !== -1; });
      if (paquet.length){ demarrer(paquet); return; }
    }
    ecranAccueil();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
