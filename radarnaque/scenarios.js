/* =========================================================================
   RADAR ANTI-ARNAQUES — Banque de scénarios
   Chaque carte reproduit un message réaliste (SMS, e-mail, message, appel,
   notification, image). Le joueur décide : FIABLE ou MÉFIANCE (arnaque).
   Corpus inspiré de cas réels 2024-2026 (colis, faux conseiller bancaire,
   faux proche, deepfakes, boîte-mystère, panneaux solaires, faux support…).

   Champs communs :
     id         identifiant unique
     canal      'sms' | 'email' | 'chat' | 'appel' | 'notif' | 'image'
     entete     petit libellé au-dessus de la carte (contexte)
     verdict    'arnaque' | 'fiable'
     categorie  type d'arnaque (ou "Message légitime")
     indices    signaux à repérer (drapeaux rouges) OU rassurants (si fiable)
     reflexe    le bon réflexe en une phrase
     explication court paragraphe pédagogique
   Champs de contenu selon le canal (voir renderCarte dans app.js).
   ========================================================================= */

const SCENARIOS = [

  /* ---------- 1. SMS colis (smishing) — ARNAQUE ------------------------ */
  {
    id: 'sms-colis',
    canal: 'sms',
    entete: 'SMS reçu ce matin d’un numéro inconnu',
    expediteur: '+33 7 45 13 81 31',
    messages: [
      'Bonjour, votre colis ne rentrait pas dans la boîte aux lettres. Réagissez avant le 09/01, sinon il sera renvoyé : https://mon-relay-suivi.com',
      '3e095272b3fe4c7996b'
    ],
    verdict: 'arnaque',
    categorie: 'Hameçonnage par SMS (« smishing ») — faux colis',
    indices: [
      'Numéro de portable personnel (+33 7…) : un vrai transporteur n’écrit pas depuis un 06/07.',
      'Lien bizarre « mon-relay-suivi.com » : ce n’est pas le vrai site de Mondial Relay / La Poste.',
      'On vous met la pression avec une date limite (« avant le 09/01, sinon renvoyé »).',
      'Suite de caractères sans signification pour faire « officiel ».'
    ],
    reflexe: 'N’attendez aucun colis ? N’en attendez pas non plus le lien. On ne clique pas : on vérifie sur l’appli ou le site officiel du transporteur.',
    explication: 'C’est l’arnaque n°1 en France. Le lien mène à un faux site qui réclame « 2 € de frais » pour voler votre carte bancaire, puis vous appelle en se faisant passer pour votre banque. Signalez le SMS en le transférant gratuitement au 33700.'
  },

  /* ---------- 2. E-mail réinitialisation mot de passe — ARNAQUE -------- */
  {
    id: 'email-motdepasse',
    canal: 'email',
    entete: 'E-mail arrivé dans votre boîte de réception',
    de: 'Microsoft Security Team',
    deAdresse: 'ne-pas-repondre@chronopost.fr',
    objet: 'Alerte de sécurité : nouvelle demande de mot de passe',
    date: 'Aujourd’hui, 09:14',
    corps: 'Salut, antoninatger :<br><br>Nous avons reçu une demande de définition d’un nouveau mot de passe pour votre compte à partir d’un appareil ou d’un emplacement que vous n’avez pas Utiliser habituellement. C’est vous ?<br><br>Confirmez votre identité sous 24h pour éviter la suspension de votre compte.',
    bouton: 'Oui, c’est moi — confirmer',
    verdict: 'arnaque',
    categorie: 'Hameçonnage par e-mail — usurpation « sécurité du compte »',
    indices: [
      'L’expéditeur dit « Microsoft » mais l’adresse finit par @chronopost.fr : ça ne colle pas.',
      'Fautes et tournures maladroites (« que vous n’avez pas Utiliser habituellement »).',
      'On crée la peur (« suspension du compte ») et l’urgence (« sous 24h »).',
      { risque: 'Le bouton mène à une fausse page qui vole votre identifiant et votre mot de passe.' }
    ],
    reflexe: 'Regardez toujours l’adresse complète de l’expéditeur, pas seulement le nom affiché. Nom ≠ adresse.',
    explication: 'Les escrocs affichent un nom rassurant (« Microsoft Security Team ») mais l’adresse réelle les trahit. En cas de doute sur un compte, n’utilisez jamais le bouton du mail : ouvrez vous-même le site officiel dans votre navigateur.'
  },

  /* ---------- 3. E-mail boîte-mystère TEMU — ARNAQUE ------------------- */
  {
    id: 'email-boite-mystere',
    canal: 'email',
    entete: 'E-mail avec une pièce jointe',
    de: 'CONFIRMATION_D’EXPEDITION#',
    deAdresse: 'noreply.LE.04@b8.9a.21.eb',
    objet: '_VousAvez-Gagné Une Boîte-mystère de--TEMU',
    date: 'Dim. 02/02, 17:59',
    corps: 'Félicitations !<br><br>-VeuiLLez.ConFirmer La-Reception!!-<br><br>Ouvrez la pièce jointe pour récupérer votre cadeau avant expiration.',
    piecesJointes: ['NQLRF.pdf'],
    verdict: 'arnaque',
    categorie: 'Faux gain / cadeau — pièce jointe piégée',
    indices: [
      'Adresse d’expéditeur incompréhensible (noreply.LE.04@b8.9a.21.eb).',
      'Texte truffé de majuscules, tirets et fautes bizarres pour tromper les filtres anti-spam.',
      'Un « cadeau » que vous n’avez jamais demandé : personne ne donne rien gratuitement.',
      'Pièce jointe PDF inconnue : ne jamais ouvrir, elle peut installer un virus.'
    ],
    reflexe: 'Un gain que vous n’avez pas joué est toujours un piège. On n’ouvre pas la pièce jointe, on supprime.',
    explication: 'La mise en forme « cassée » (VeuiLLez.ConFirmer) n’est pas de la maladresse : elle sert à passer les filtres anti-spam. La pièce jointe peut installer un logateur espion ou vous conduire vers une page qui réclame vos coordonnées bancaires « pour les frais de livraison ».'
  },

  /* ---------- 4. E-mail panneaux solaires / aides — ARNAQUE ----------- */
  {
    id: 'email-panneaux',
    canal: 'email',
    entete: 'E-mail à propos d’aides de l’État',
    de: 'Charlotte Robert',
    deAdresse: 'charlotte.robert@shikisc.com',
    objet: 'Dernière chance : aides panneaux solaires dans votre région',
    date: 'Lun. 03/02, 10:58',
    corps: 'Des spécialistes en <b>installations de panneaux solaires</b> seront présents dans votre région du 14 février au 14 mars.<br><br>Leur objectif : vous fournir des devis personnalisés et des informations sur les aides gouvernementales, en vigueur jusqu’au 01-01-2025.<br><br>Nos équipes ne pourront pas faire face à toutes les demandes, il est donc conseillé de <u>s’inscrire dès aujourd’hui</u> pour ne pas perdre l’opportunité.',
    bouton: 'Profitez des aides',
    verdict: 'arnaque',
    categorie: 'Faux démarchage « rénovation énergétique / aides de l’État »',
    indices: [
      'Adresse d’entreprise fantaisiste (@shikisc.com), sans lien avec un organisme public.',
      'Une « date limite d’aide » déjà dépassée (01-01-2025) : incohérence.',
      'Rareté artificielle : « nos équipes ne pourront pas faire face », « dernière chance ».',
      'L’État ne démarche jamais par e-mail pour des travaux chez vous.'
    ],
    reflexe: 'Aucune aide publique ne se réclame en cliquant sur un e-mail non sollicité. Renseignez-vous sur France Rénov’ (site officiel) ou au 0 808 800 700.',
    explication: 'Les escrocs surfent sur des sujets sensibles (isolation, pompe à chaleur, panneaux solaires) pour récupérer vos informations, obtenir un rendez-vous et vous faire signer des travaux surfacturés ou inexistants. Une vraie aide passe par des démarches que VOUS engagez.'
  },

  /* ---------- 5. Message "célébrité" amoureuse — ARNAQUE --------------- */
  {
    id: 'chat-celebrite',
    canal: 'chat',
    plateforme: 'Messenger',
    contact: 'Brad Pitt (Officiel) ✔',
    avatar: '',
    messages: [
      { from: 'eux', texte: 'Bonjour ma chérie ❤️ Je pense à toi chaque jour. Tu es la seule qui me comprend vraiment.' },
      { from: 'eux', texte: 'Mon équipe garde notre relation secrète à cause des médias. Je viendrai bientôt en France pour toi.' },
      { from: 'eux', texte: 'J’ai un petit souci : mes comptes sont bloqués par ma production. Peux-tu m’avancer 850 € en cartes cadeaux ? Je te rembourse dès mon arrivée. 🌹' }
    ],
    verdict: 'arnaque',
    categorie: 'Arnaque aux sentiments / fausse célébrité',
    indices: [
      'Une célébrité qui vous écrit en privé et tombe amoureuse en quelques messages : impossible.',
      'Le secret imposé (« ne le dis à personne ») isole la victime.',
      { risque: 'La demande d’argent finit toujours par arriver — souvent en cartes cadeaux, intraçables.' },
      'Une photo de profil ne prouve rien : elle se copie sur internet ou se fabrique avec une IA en quelques secondes.'
    ],
    reflexe: 'Dès qu’un « amour » rencontré en ligne demande de l’argent, c’est une arnaque. Aucune exception.',
    explication: 'Des victimes ont perdu des dizaines de milliers d’euros avec de faux « Brad Pitt ». Les escrocs jouent longtemps la carte de l’affection avant de demander de l’argent « pour un imprévu ». Une vraie relation ne commence jamais par un virement ou des cartes cadeaux.'
  },

  /* ---------- 6. Appel faux conseiller bancaire — ARNAQUE ------------- */
  {
    id: 'appel-banque',
    canal: 'appel',
    afficheur: 'Votre banque',
    numero: 'appel affiché : 01 40 XX XX XX (n° de votre agence)',
    transcript: [
      { qui: 'lui', texte: 'Bonjour, service anti-fraude de votre banque. Nous voyons un virement suspect de 1 290 € en cours vers l’étranger. C’est bien vous ?' },
      { qui: 'vous', texte: 'Non, pas du tout !' },
      { qui: 'lui', texte: 'Pas d’inquiétude, je bloque tout de suite. Pour annuler, je vous envoie un code par SMS : donnez-le-moi, et confirmez votre mot de passe d’accès à l’appli.' }
    ],
    verdict: 'arnaque',
    categorie: 'Faux conseiller bancaire (« spoofing » du numéro)',
    indices: [
      'Le numéro affiché est celui de votre banque : il peut être falsifié (spoofing). L’afficheur ne prouve rien.',
      'On invente une urgence (« virement suspect en cours ») pour vous faire paniquer.',
      'On vous demande un code reçu par SMS ou votre mot de passe : une banque ne le fait JAMAIS.',
      { risque: 'Donner ce code valide en réalité LE virement des escrocs, pas son annulation.' }
    ],
    reflexe: 'Un vrai conseiller ne demande jamais vos codes ni vos mots de passe. Raccrochez, puis rappelez le numéro au dos de votre carte.',
    explication: 'C’est l’arnaque qui coûte le plus cher (3 000 € en moyenne). L’escroc affiche le numéro de votre banque et connaît parfois votre nom ou vos dernières opérations. Ne validez rien, ne dictez aucun code. En cas de doute, raccrochez et rappelez vous-même votre banque.'
  },

  /* ---------- 7. WhatsApp faux proche — ARNAQUE ----------------------- */
  {
    id: 'chat-faux-proche',
    canal: 'chat',
    plateforme: 'WhatsApp',
    contact: '+33 6 51 20 84 77',
    avatar: '',
    messages: [
      { from: 'eux', texte: 'Coucou maman c’est moi 😊 j’ai cassé mon téléphone, voici mon nouveau numéro. Enregistre-le.' },
      { from: 'eux', texte: 'Du coup je n’ai plus accès à mon appli bancaire jusqu’à demain…' },
      { from: 'eux', texte: 'Tu peux me dépanner d’un virement de 680 € pour une facture urgente ? Je te rends ça dès que mon compte remarche. Merci maman ❤️' }
    ],
    verdict: 'arnaque',
    categorie: 'Arnaque au faux proche (« Bonjour maman »)',
    indices: [
      'Nouveau numéro inconnu qui prétend être votre enfant.',
      'Excuse classique : téléphone cassé + appli bancaire bloquée « jusqu’à demain ».',
      'Demande d’argent urgente pour une facture à régler tout de suite.',
      'Il évite le contact vocal (« je ne peux pas appeler ») pour ne pas se faire démasquer.'
    ],
    reflexe: 'Appelez votre proche sur SON ancien numéro pour vérifier. Ne virez jamais d’argent sur la foi d’un simple message.',
    explication: 'L’escroc se fait passer pour un enfant ou un petit-enfant en détresse. Le meilleur test : posez une question dont seul votre vrai proche connaît la réponse, ou appelez-le directement. Un imposteur trouvera toujours une raison de ne pas répondre au téléphone.'
  },

  /* ---------- 8. Image deepfake (info ou intox) — ARNAQUE ------------- */
  {
    id: 'image-deepfake',
    canal: 'image',
    image: 'img/deepfake-arrestation.jpg',
    legende: '« Regardez ce qu’on nous cache ! Arrestation d’un dirigeant en pleine rue. » — Partagé 48 000 fois',
    verdict: 'arnaque',
    categorie: 'Image générée par IA (« deepfake ») / intox',
    indices: [
      'Détails anormaux : mains déformées, doigts en trop, visages « lisses » ou flous à l’arrière-plan.',
      'Aucun média sérieux ne reprend l’information : seulement des pages qui cherchent le clic.',
      'La légende joue sur l’émotion et le sensationnel (« ce qu’on nous cache »).',
      'Une image seule ne prouve rien : elle peut être fabriquée en quelques secondes.'
    ],
    reflexe: 'Avant de croire ou de partager une image choc, cherchez l’info sur des sources connues. Zoomez sur les mains et les détails.',
    explication: 'Les images IA servent à manipuler l’opinion, faire le buzz ou attirer vers des sites frauduleux. Réflexe : chercher le même événement sur plusieurs médias reconnus. S’il n’existe nulle part ailleurs, c’est très probablement faux.'
  },

  /* ---------- 9. SMS Assurance Maladie — ARNAQUE --------------------- */
  {
    id: 'sms-ameli',
    canal: 'sms',
    entete: 'SMS reçu cet après-midi',
    expediteur: 'AMELI-INFO',
    messages: [
      'Assurance Maladie : votre carte Vitale expire le 15/07. Sans mise à jour, vos remboursements seront suspendus. Régularisez ici : http://ameli-mise-a-jour.info-fr.net'
    ],
    verdict: 'arnaque',
    categorie: 'Usurpation d’organisme public (Assurance Maladie)',
    indices: [
      'La carte Vitale n’a pas de date d’expiration qui « suspend » les remboursements.',
      'Adresse du lien trompeuse : le vrai site est ameli.fr, pas « ameli-mise-a-jour.info-fr.net ».',
      'Menace + urgence : « suspension des remboursements ».',
      'Un organisme public ne réclame jamais vos coordonnées bancaires par SMS.'
    ],
    reflexe: 'Un vrai site officiel finit par .gouv.fr ou .fr connu (ameli.fr, impots.gouv.fr). Dans le doute, tapez l’adresse vous-même.',
    explication: 'CAF, Assurance Maladie, impôts, ANTAI (amendes)… les escrocs usurpent tous les organismes. Ils veulent votre numéro de sécurité sociale et votre carte bancaire. Les remboursements officiels sont automatiques : on ne vous les « débloque » jamais contre un paiement.'
  },

  /* ---------- 10. Faux support technique (pop-up) — ARNAQUE ----------- */
  {
    id: 'popup-support',
    canal: 'notif',
    app: 'Alerte de sécurité',
    appIcon: '⚠️',
    fond: 'alerte',
    titre: 'VOTRE ORDINATEUR EST INFECTÉ (5 virus détectés)',
    texte: 'Vos mots de passe et vos données bancaires sont en danger. N’éteignez pas l’ordinateur. Appelez immédiatement le support Microsoft : 01 84 88 XX XX.',
    verdict: 'arnaque',
    categorie: 'Faux support technique (« votre PC est infecté »)',
    indices: [
      'Une vraie alerte antivirus ne vous demande jamais de téléphoner à un numéro.',
      'Panique + interdiction d’éteindre : pour vous empêcher de réfléchir.',
      'Le « support Microsoft » ne surveille pas votre écran et ne vous appelle pas.',
      { risque: 'Objectif : prendre la main sur votre ordinateur à distance et vous soutirer de l’argent.' }
    ],
    reflexe: 'Ne composez jamais le numéro affiché. Fermez la fenêtre (ou éteignez), et faites vérifier l’ordinateur par un proche de confiance.',
    explication: 'Ces pop-ups bloquants apparaissent en surfant. Si vous appelez, un faux technicien vous fait installer un logiciel de prise en main à distance, puis « répare » un faux problème contre plusieurs centaines d’euros — ou vide vos comptes. On ferme, on n’appelle pas.'
  },

  /* ---------- 11. Offre d’emploi WhatsApp — ARNAQUE ------------------ */
  {
    id: 'chat-emploi',
    canal: 'chat',
    plateforme: 'WhatsApp',
    contact: 'Recrutement Amazon (RH)',
    avatar: '',
    messages: [
      { from: 'eux', texte: 'Bonjour ! Nous recrutons des opérateurs à domicile. 30 min/jour, 80 à 300 € par jour, aucune expérience requise. Intéressé(e) ?' },
      { from: 'eux', texte: 'Il suffit de valider des commandes sur notre plateforme. Pour commencer, créez votre compte et rechargez 40 € qui vous seront rendus avec vos gains.' }
    ],
    verdict: 'arnaque',
    categorie: 'Fausse offre d’emploi / « arnaque à la tâche »',
    indices: [
      'Salaire irréaliste pour un travail « sans expérience, 30 min par jour ».',
      'Recrutement par WhatsApp au nom d’une grande marque : les vraies entreprises ne font pas ça.',
      'On vous demande de « recharger » ou d’avancer de l’argent pour commencer : signal d’alarme absolu.',
      { risque: 'Au début on vous rend vos petits gains… pour vous pousser à verser des sommes de plus en plus grosses.' }
    ],
    reflexe: 'Un vrai emploi vous paie ; il ne vous demande jamais de payer pour travailler. Fuyez toute « recharge » demandée.',
    explication: 'Ces fausses missions (« liker », « valider des commandes ») paraissent payer au début, puis exigent des dépôts croissants que vous ne reverrez jamais. Aucune entreprise sérieuse ne recrute par SMS/WhatsApp en réclamant de l’argent d’avance.'
  },

  /* ---------- 11b. SMS colis + photo IA « à votre nom » — ARNAQUE ----- */
  {
    id: 'sms-colis-photo-ia',
    canal: 'sms',
    entete: 'SMS reçu ce matin, avec une photo en pièce jointe',
    expediteur: '+33 6 12 44 90 08',
    messages: [
      'Bonjour, votre colis est bloqué à notre centre : votre adresse est incomplète. Voici la photo de votre paquet en attente 👇',
      { photo: true, nom: 'Mme Martine DUPONT', legende: 'Colis en attente · centre de tri' },
      'Confirmez votre adresse et réglez 1,95 € de relivraison ici : https://suivi-colis-relais.net'
    ],
    verdict: 'arnaque',
    categorie: 'Faux colis « nouvelle génération » — photo générée par IA',
    indices: [
      'Le SMS vient d’un numéro de portable (+33 6…) : un vrai transporteur ne vous écrit pas d’un 06/07.',
      'La « photo du colis » avec votre nom dessus est fabriquée par IA en quelques secondes : votre nom sur une étiquette ne prouve rien.',
      'On réclame de petits « frais de relivraison » par SMS : aucun transporteur ne se fait payer ainsi.',
      'Le lien ne mène pas au vrai site du transporteur (La Poste, Chronopost, Mondial Relay).'
    ],
    reflexe: 'Une photo, même avec votre nom dessus, ne prouve rien : elle se fabrique en un instant. Ne cliquez pas, vérifiez le suivi sur l’appli ou le site officiel du transporteur.',
    explication: 'C’est la version « nouvelle génération » de l’arnaque au colis : les escrocs ajoutent une photo ultra-réaliste, générée par IA, montrant un paquet à VOTRE nom pour vous convaincre qu’il existe vraiment. Le but reste le même : vous faire payer de faux « frais de relivraison » et voler votre carte bancaire, puis vous rappeler en se faisant passer pour votre banque. Un vrai transporteur ne vous envoie jamais de photo de votre colis avec votre nom. Signalez le SMS au 33700.'
  },

  /* ---------- 11c. Faux numéro → investissement (pig butchering) — ARNAQUE */
  {
    id: 'chat-faux-numero-invest',
    canal: 'chat',
    plateforme: 'SMS',
    contact: '+33 6 44 71 20 96',
    avatar: '',
    messages: [
      { from: 'eux', texte: 'Bonjour Julien ! Je confirme bien la table pour 6 personnes samedi 20h au restaurant Le Jardin ?' },
      { from: 'eux', texte: 'Oh, mille excuses, je me suis trompée de numéro 😅 Passez tout de même une très belle journée !' },
      { from: 'eux', texte: 'Rebonjour 🙂 C’était sympa d’échanger l’autre jour, on ne rencontre plus beaucoup de gens polis. Moi c’est Léa, je partage ma vie entre Paris et Singapour pour mon travail dans la finance.' },
      { from: 'eux', texte: 'Grâce à la plateforme de trading de mon oncle, j’ai gagné 32 % en trois semaines. Je peux te guider pas à pas, on commence avec 250 € seulement et tu verras les premiers gains tout de suite 📈' }
    ],
    verdict: 'arnaque',
    categorie: 'Arnaque au faux numéro (« wrong number ») menant à un faux investissement',
    indices: [
      'Un message « d’erreur » venu d’un inconnu qui, comme par hasard, continue ensuite à vous parler.',
      'La personne se rend très vite sympathique et patiente : elle tisse un lien de confiance, parfois pendant des semaines.',
      'Elle finit toujours par vanter un investissement « miracle » (crypto, trading) aux gains énormes et rapides.',
      { risque: 'On vous pousse à placer de l’argent sur une plateforme qu’ELLE vous indique : les gains affichés sont fictifs, l’argent est perdu.' }
    ],
    reflexe: 'Un inconnu qui vous a écrit « par erreur » puis se met à parler d’argent ou de placements : on coupe court. Aucun vrai investissement ne se propose par message.',
    explication: 'C’est l’arnaque dite du « dépeçage de cochon » (pig butchering) : l’escroc « engraisse » longuement sa victime en nouant une relation amicale ou amoureuse, avant de la pousser à investir sur une fausse plateforme de crypto ou de trading. Au début, de petits « gains » s’affichent pour la mettre en confiance et l’inciter à verser toujours plus ; puis, au moment de retirer, tout disparaît. Un premier message « d’erreur » suivi d’une belle amitié soudaine doit alerter. Le procédé est documenté : la FTC américaine chiffre à 470 millions de dollars les pertes de 2024 pour les arnaques qui commencent par un simple SMS, cinq fois plus qu’en 2020.'
  },

  /* ---------- 11d. Location de vacances hors plateforme — ARNAQUE ----- */
  {
    id: 'email-airbnb-horsplateforme',
    canal: 'email',
    entete: 'E-mail reçu après avoir contacté un loueur pour des vacances',
    de: 'Marco — Appartement vue mer',
    deAdresse: 'marco.rivas.locations@gmail.com',
    objet: 'Re: Votre séjour — réglons en direct, c’est plus simple 😊',
    date: 'Jeu. 12/06, 21:47',
    corps: 'Bonjour,<br><br>Merci pour votre intérêt&nbsp;! Mon appartement est très demandé et <b>deux autres familles</b> le veulent pour vos dates. Pour vous éviter les frais de service de la plateforme, je vous propose de régler <b>directement entre nous</b>&nbsp;: versez un acompte de 40&nbsp;% par virement bancaire et je bloque le logement à votre nom dès aujourd’hui.<br><br>Voici mon RIB en pièce jointe. Ne tardez pas, je ne pourrai pas garder les dates bien longtemps&nbsp;!',
    piecesJointes: ['RIB_Marco.pdf'],
    verdict: 'arnaque',
    categorie: 'Fausse location de vacances — paiement hors plateforme',
    indices: [
      'On vous propose de payer HORS de la plateforme (Airbnb, Booking, Abritel…) : vous perdez alors toute protection.',
      'Paiement par virement bancaire directement à un particulier : quasi impossible à récupérer en cas d’arnaque.',
      'Adresse en @gmail.com et RIB en pièce jointe : rien ne passe par le site officiel de réservation.',
      'Urgence et rareté artificielles (« deux autres familles », « ne tardez pas ») pour vous faire payer vite.'
    ],
    reflexe: 'On ne paie JAMAIS une location en dehors de la plateforme de réservation. Le paiement se fait sur le site officiel, jamais par virement à un particulier.',
    explication: 'Bien souvent, le logement n’existe pas ou n’appartient pas à l’escroc. En vous faisant sortir de la plateforme, il vous prive de toute protection (remboursement, litige) et empoche votre acompte par virement, intraçable. Règle simple&nbsp;: si un « propriétaire » vous demande de régler en dehors du site — par virement ou en cartes cadeaux — c’est une arnaque. Réservez et payez toujours sur la plateforme officielle.'
  },

  /* ---------- 15. E-mail de confirmation détourné (champ prénom) — ARNAQUE */
  {
    id: 'email-prenom-detourne',
    canal: 'email',
    entete: 'E-mail de bienvenue reçu d’un site que vous connaissez, alors que vous n’avez rien créé',
    de: 'Welcome to the Jungle',
    deAdresse: 'no-reply@welcometothejungle.com',
    objet: 'Bienvenue ! Confirmez la création de votre compte',
    date: 'Aujourd’hui, 17:46',
    corps: '<b style="font-size:1.12em">Bonjour Vous serez débité de 447,00&nbsp;€ par l’Assurance Maladie. Votre IBAN est enregistré pour les prélèvements automatiques. Si vous n’avez pas autorisé cette opération, veuillez contacter immédiatement votre service de prévention des fraudes au 0259509226</b><br><br>Bienvenue dans la Jungle&nbsp;!<br>Merci d’avoir créé votre compte&nbsp;! Il ne reste plus qu’un dernier clic pour activer votre profil.',
    bouton: 'Activer mon compte',
    verdict: 'arnaque',
    categorie: 'Champ détourné — faux message glissé dans un vrai e-mail',
    indices: [
      'L’e-mail vient bien du vrai site (adresse et logo authentiques) : ce n’est pas lui, l’escroc.',
      'Un inconnu a créé un compte avec VOTRE adresse e-mail en écrivant l’arnaque à la place du prénom.',
      'Le « Bonjour {prénom} » affiche donc un faux message qui parle d’argent, d’IBAN et de prélèvements.',
      'On vous pousse à appeler un numéro (0259509226) : c’est là qu’est le vrai piège.'
    ],
    reflexe: 'Vous n’avez pas créé ce compte ? Ignorez le contenu et n’appelez surtout pas le numéro affiché. Un e-mail automatique de bienvenue ne vous réclame jamais rien par téléphone.',
    explication: 'Astuce redoutable : l’escroc n’a pas piraté le site. Il a simplement rempli le champ « prénom » d’un formulaire d’inscription avec un faux message d’alerte, puis a mis VOTRE e-mail. Le site, en toute bonne foi, vous envoie « Bonjour {prénom} » en gros et en gras — et affiche l’arnaque à votre place. Le but : que vous appeliez le numéro, où un faux « service anti-fraude » vous fera « sécuriser » votre argent… en le virant aux escrocs. L’Assurance Maladie ne débite jamais personne ainsi. On ne rappelle jamais un numéro contenu dans le message.'
  },

  /* ---------- 20. E-mail fausse boutique — liquidation fictive — ARNAQUE */
  {
    id: 'email-fausse-boutique-liquidation',
    canal: 'email',
    entete: 'E-mail publicitaire reçu, avec des prix très bas',
    de: 'Vélo Discount Officiel',
    deAdresse: 'contact@velo-discount-shop.top',
    objet: 'LIQUIDATION TOTALE avant fermeture : -80 % sur tout le magasin',
    date: 'Aujourd’hui, 11:20',
    corps: 'Fermeture définitive du magasin : tout doit disparaître avant le 30 juin !<br><br>Vélo électrique à 149 € au lieu de 899 €, casque offert. Stock très limité, dernières pièces disponibles.<br><br>Paiement 100 % sécurisé, livraison en 48h partout en France.',
    bouton: 'Profiter de la liquidation',
    verdict: 'arnaque',
    categorie: 'Fausse boutique en ligne — liquidation fictive',
    indices: [
      'Le domaine finit par « .top », une extension à quelques euros que les boutiques établies n’utilisent pas, et « velo-discount-shop » ne correspond à aucune enseigne existante : ce nom se vérifie en le cherchant.',
      'Réduction énorme et invraisemblable : un vélo électrique à 149 € au lieu de 899 €.',
      'Fausse urgence et fausse rareté : « fermeture définitive », « stock très limité ».',
      { risque: 'Après paiement, l’objet n’est jamais livré, ou vos coordonnées bancaires sont volées et réutilisées.' }
    ],
    reflexe: 'Une réduction trop belle pour être vraie, sur un site inconnu, doit alerter. Cherchez des avis indépendants et les mentions légales avant de payer.',
    explication: 'Les escrocs créent de fausses boutiques en ligne, parfois avec de vraies photos de produits volées ailleurs, et misent sur des promotions énormes pour donner envie d’acheter vite. Résultat : rien n’arrive, ou la carte bancaire est piratée. Avant d’acheter sur un site inconnu, vérifiez son ancienneté, cherchez des avis sur d’autres sites, et méfiez-vous d’un prix trop bas.'
  },

  /* ---------- 21. E-mail faux service de streaming — ARNAQUE ---------- */
  {
    id: 'email-prime-video-paiement',
    canal: 'email',
    entete: 'E-mail reçu à propos d’un abonnement de streaming',
    de: 'Prime Video',
    deAdresse: 'support@prime-video-facturation.com',
    objet: 'Échec de paiement : votre abonnement va être suspendu',
    date: 'Aujourd’hui, 08:03',
    corps: 'Bonjour,<br><br>Le paiement de votre abonnement n’a pas pu être effectué. Votre accès sera suspendu sous 48h.<br><br>Mettez à jour vos informations de paiement pour continuer à profiter de vos films et séries.',
    bouton: 'Mettre à jour mon paiement',
    verdict: 'arnaque',
    categorie: 'Hameçonnage par e-mail — faux service de streaming (abonnement)',
    indices: [
      'Adresse d’expéditeur qui n’est ni amazon.fr ni primevideo.com : un domaine inventé.',
      'Urgence artificielle : « suspendu sous 48h ».',
      { risque: 'Le bouton mène à une fausse page qui réclame votre numéro de carte bancaire complet.' },
      'Un vrai service ne réclame jamais vos coordonnées bancaires par un lien reçu par e-mail.'
    ],
    reflexe: 'Pour vérifier un abonnement, ouvrez directement l’application ou tapez l’adresse officielle vous-même — jamais via le lien du mail.',
    explication: 'Les escrocs imitent les grands services de streaming ou d’abonnement pour récupérer des numéros de carte bancaire complets, sous prétexte d’un paiement en échec. Le nom affiché rassure, mais l’adresse réelle de l’expéditeur trahit toujours la supercherie. En cas de doute sur un abonnement, ouvrez l’application officielle vous-même.'
  },

  /* ---------- 22. Message vente en ligne — arnaque au trop-perçu — ARNAQUE */
  {
    id: 'chat-trop-percu-vente',
    canal: 'chat',
    plateforme: 'Leboncoin — messagerie',
    contact: 'Acheteuse intéressée (canapé)',
    avatar: '',
    messages: [
      { from: 'eux', texte: 'Bonjour ! Votre canapé à 200 € m’intéresse beaucoup. Je ne viendrai pas moi-même, un transporteur passera le récupérer.' },
      { from: 'eux', texte: 'Je viens de vous envoyer un virement de 350 € par erreur au lieu de 200 €, le formulaire a mal fonctionné. Vous pouvez me renvoyer les 150 € de trop par virement instantané, le temps que ça arrive sur votre compte ?' },
      { from: 'eux', texte: 'Voici la capture d’écran du virement en pièce jointe, ça devrait arriver d’un instant à l’autre 😊' }
    ],
    verdict: 'arnaque',
    categorie: 'Arnaque au trop-perçu (vente entre particuliers)',
    indices: [
      'L’acheteuse ne vient jamais voir l’objet elle-même : elle passe par un « transporteur ».',
      'Elle prétend avoir envoyé trop d’argent par erreur et demande de lui renvoyer la différence tout de suite.',
      'Sa seule « preuve » est une capture d’écran du virement — jamais l’argent réellement crédité sur votre compte.',
      { risque: 'Vous renvoyez un vrai virement de votre poche, alors que le premier virement n’arrivera jamais (ou sera annulé).' }
    ],
    reflexe: 'Ne remboursez jamais un « trop-perçu » avant que l’argent soit réellement et définitivement crédité sur votre compte : vérifiez vous-même dans votre application bancaire, pas sur une capture d’écran envoyée par l’acheteur.',
    explication: 'Arnaque classique sur les sites de petites annonces : l’escroc simule (ou falsifie) un virement trop élevé, souvent via une fausse capture d’écran, et demande à être remboursé de la différence « en urgence ». Le premier virement n’existe pas ou sera rejeté quelques jours plus tard : la victime a bel et bien envoyé, elle, un vrai virement — perdu. Utilisez toujours le paiement sécurisé intégré à la plateforme, jamais un virement direct à un inconnu.'
  },

  /* ---------- 23. SMS faux remboursement des impôts — ARNAQUE ---------- */
  {
    id: 'sms-remboursement-impots',
    canal: 'sms',
    entete: 'SMS reçu en pleine période de déclaration d’impôts',
    expediteur: 'DGFIP',
    messages: [
      'Direction Générale des Finances Publiques : après vérification de votre dossier, vous bénéficiez d’un remboursement de 237,80 €. Pour le recevoir, complétez vos coordonnées bancaires sur : https://remboursement-impots-particuliers.com'
    ],
    verdict: 'arnaque',
    categorie: 'Usurpation d’organisme public (impôts / DGFIP)',
    indices: [
      'Le nom d’expéditeur « DGFIP » se falsifie aussi facilement que n’importe quel autre : il ne garantit rien.',
      'Adresse du lien qui n’est pas impots.gouv.fr.',
      'On vous demande de « compléter » vos coordonnées bancaires : si vous avez déjà été remboursé par le passé, l’administration les a déjà.',
      { risque: 'La fausse page vole vos coordonnées bancaires ou vous fait payer de faux « frais de dossier ».' }
    ],
    reflexe: 'Ne vous connectez jamais via un lien reçu par SMS : tapez vous-même impots.gouv.fr dans votre navigateur pour vérifier un remboursement.',
    explication: 'Comme pour l’Assurance Maladie ou la CAF, les escrocs usurpent la DGFIP en pleine période de déclaration pour profiter de l’actualité. Un vrai remboursement d’impôt ne se débloque jamais en resaisissant un RIB sur un site externe : il est versé automatiquement sur le compte déjà connu de l’administration.'
  },

  /* ---------- 24. E-mail aides climatisation en pleine canicule — ARNAQUE */
  {
    id: 'email-clim-aides',
    canal: 'email',
    entete: 'E-mail reçu en pleine vague de chaleur, à propos d’aides de l’État',
    de: 'Clim Reversible',
    deAdresse: 'noreply@mail-cbk-1sa.amberfunnel.com',
    objet: 'Jusqu’à 900 € d’aides pour votre climatisation réversible',
    date: 'Jeu. 16/07, 03:40',
    corps: '<b>Avant les fortes chaleurs — Vérifiez votre éligibilité maintenant !</b><br><br>🏠 CLIMATISATION RÉVERSIBLE<br><span style="font-size:1.3em;font-weight:bold">900 €</span><br>sous conditions, pour l’installation ou le remplacement de votre climatisation réversible.<br><br>Aides cumulées potentielles selon conditions : <b>jusqu’à 10 800 €</b>',
    bouton: 'Estimer mes aides 🎯',
    verdict: 'arnaque',
    categorie: 'Faux démarchage « aides à la rénovation énergétique » — générateur de leads',
    indices: [
      'Adresse d’expéditeur « amberfunnel.com » : un « funnel » est un outil marketing d’entreprise, sans aucun lien avec un organisme public ou un vrai installateur.',
      'E-mail envoyé à 3h40 du matin : aucune entreprise sérieuse n’écrit à cette heure-là — c’est un envoi automatisé de masse.',
      'Les montants s’empilent sans logique : « 900 € » en gros titre, puis « jusqu’à 10 800 € » plus bas — des maximums théoriques additionnés pour impressionner, pas un vrai calcul personnalisé.',
      { risque: 'Le bouton « Estimer mes aides » mène à un formulaire qui collecte nom, adresse et téléphone — revendus ensuite à des démarcheurs en travaux.' }
    ],
    reflexe: 'Les aides à la rénovation énergétique se demandent uniquement sur le site officiel France Rénov’ (france-renov.gouv.fr) ou au 0 808 800 700, jamais via un lien reçu par e-mail.',
    explication: 'Même recette que pour les panneaux solaires, mais version été : dès qu’une vague de chaleur ou de froid fait l’actualité, ces sites de génération de leads bombardent des e-mails promettant des aides exceptionnelles. Le formulaire ne débloque aucune aide : il sert à revendre vos coordonnées à des sociétés de travaux qui vous rappelleront ensuite pour vous vendre une installation surfacturée. Une vraie aide de l’État ne se demande jamais en cliquant sur un e-mail non sollicité.'
  },

  /* ================== MESSAGES LÉGITIMES (à ne pas confondre) ========= */

  /* ---------- 47. E-mail faux remboursement ameli — ARNAQUE */
  {
    id: 'email-ameli-regularisation',
    canal: 'email',
    entete: 'E-mail aux couleurs de l’Assurance Maladie',
    de: 'InfoSante',
    deAdresse: 'theintersection@foundryco.com',
    objet: 'Régularisation de vos frais de santé',
    date: 'Jeu. 03/09, 16:52',
    corps: '<div style="background:#0053b3;color:#fff;text-align:center;padding:16px 10px;border-radius:4px"><span style="font-size:1.6em;font-weight:bold;letter-spacing:.2em">ameli</span><br><span style="font-size:.85em">L’Assurance Maladie</span></div><br><div style="text-align:right;color:#777">Le 2 septembre 2026</div><b>Objet : régularisation de vos frais de santé</b><br><br>Madame, Monsieur,<br><br>Votre Assurance Maladie a procédé à la régularisation de vos dépenses de santé. Le montant de <b>18,90 €</b> a été versé par virement sur votre compte.<br><br><div style="background:#eef3fb;padding:12px;border-radius:4px"><b>Montant régularisé :</b> 18,90 €<br><b>Mode de paiement :</b> virement bancaire<br><b>Délai de réception :</b> 2 à 3 jours ouvrés</div>',
    bouton: 'Accéder à mon espace',
    verdict: 'arnaque',
    categorie: 'Usurpation d’organisme public (Assurance Maladie) — faux remboursement',
    indices: [
      'Le nom affiché dit « InfoSante », mais l’adresse réelle est theintersection@foundryco.com : aucun rapport avec ameli.fr. Nom ≠ adresse.',
      '« Madame, Monsieur » : l’Assurance Maladie vous connaît et vous appelle par votre nom.',
      'Le bandeau bleu « ameli » se copie en quelques secondes : une belle mise en page ne prouve rien.',
      'Un petit montant très crédible (18,90 €) : il n’éveille aucun soupçon et donne juste envie d’aller « vérifier ».',
      { risque: 'Le bouton mène à une fausse page ameli qui réclame votre numéro de sécurité sociale, votre mot de passe, puis votre RIB.' }
    ],
    reflexe: 'Un remboursement annoncé ne se vérifie jamais depuis le bouton du mail : ouvrez vous-même ameli.fr ou l’application ameli.',
    explication: 'D’habitude les faux mails font peur ; celui-ci fait plaisir — c’est la même arnaque à l’envers. En annonçant de l’argent déjà versé, il baisse votre garde : vous cliquez pour « voir le détail » et vous arrivez sur une copie du site ameli. Rappelez-vous qu’un vrai remboursement est automatique, versé sur le compte que l’Assurance Maladie connaît déjà, et consultable dans « Mes paiements » sans qu’on ait besoin de vous écrire.'
  },

  /* ---------- 12. SMS banque légitime — FIABLE ----------------------- */
  {
    id: 'sms-banque-ok',
    canal: 'sms',
    entete: 'SMS de votre banque',
    expediteur: 'CIC',
    messages: [
      'Une opération de 54,90 € chez FNAC a été débitée sur votre carte. Vous ne reconnaissez pas cet achat ? Appelez le numéro figurant au dos de votre carte. Nous ne vous demanderons jamais vos codes.'
    ],
    verdict: 'fiable',
    categorie: 'Message légitime — alerte d’achat',
    indices: [
      'Aucun lien à cliquer et aucune pièce jointe.',
      'On vous renvoie vers le numéro au dos de VOTRE carte (canal que vous maîtrisez).',
      'La banque rappelle explicitement qu’elle ne demandera jamais vos codes.',
      'Pas de menace ni d’urgence excessive : une simple information.'
    ],
    reflexe: 'Un message fiable ne réclame ni code, ni mot de passe, ni clic. Il vous laisse reprendre la main par un canal officiel.',
    explication: 'Attention tout de même : même face à un vrai message, ne rappelez jamais un numéro donné DANS le SMS. Utilisez toujours le numéro officiel (dos de la carte, appli, relevé). Ici, tout est cohérent : c’est un message légitime.'
  },

  /* ---------- 13. Notification connexion Google — FIABLE ------------- */
  {
    id: 'notif-connexion-ok',
    canal: 'notif',
    entete: 'Notification apparue en pleine soirée, alors que vous n’avez allumé aucun ordinateur',
    app: 'Compte Google',
    appIcon: '🔐',
    fond: 'info',
    titre: 'Nouvelle connexion sur Windows',
    texte: 'Un appareil s’est connecté à votre compte. Si c’était vous, aucune action n’est nécessaire. Sinon, sécurisez votre compte depuis l’application Google, rubrique Sécurité.',
    verdict: 'fiable',
    categorie: 'Message légitime — notification de connexion',
    indices: [
      'Aucun lien pressant ni bouton « urgent » à cliquer.',
      'On vous invite à agir depuis l’application officielle, pas via un lien du message.',
      'Le message envisage les deux cas (c’était vous / ce n’était pas vous) au lieu de vous faire peur.',
      'Pas de demande de mot de passe ni de coordonnées bancaires.'
    ],
    reflexe: 'Une vraie notification vous renvoie vers l’appli/site officiel que vous ouvrez vous-même — jamais vers un lien à cliquer en urgence.',
    explication: 'Le contexte est inquiétant : personne n’a touché à un ordinateur chez vous ce soir-là. Cela ne rend pas la notification fausse — c’est même exactement à cela qu’elle sert. Un message peut être à la fois vrai et alarmant. La question n’est donc jamais « est-ce que ce message me fait peur ? », mais « qu’est-ce qu’il me demande de faire ? ». Celui-ci ne demande rien : ouvrez vous-même l’application Google, rubrique Sécurité, et changez votre mot de passe depuis l’appli.'
  },

  /* ---------- 14. Message d’un ami — FIABLE --------------------------- */
  {
    id: 'chat-ami-ok',
    canal: 'chat',
    plateforme: 'SMS',
    contact: 'Jacqueline (voisine)',
    avatar: '',
    messages: [
      { from: 'eux', texte: 'Bonjour ! Toujours d’accord pour le café demain 15h chez moi ?' },
      { from: 'eux', texte: 'J’ai fait une tarte aux pommes 🥧 N’apporte rien, juste toi !' }
    ],
    verdict: 'fiable',
    categorie: 'Message légitime — conversation normale',
    indices: [
      'Contact connu et enregistré, ton habituel.',
      'Aucune demande d’argent, de code ou d’information personnelle.',
      'Aucun lien, aucune urgence, aucune menace.',
      'Le contenu correspond à votre vie réelle (un rendez-vous prévu).'
    ],
    reflexe: 'Tout n’est pas une arnaque ! Un message d’un proche connu, sans demande d’argent ni de lien, est normal.',
    explication: 'Rester prudent ne veut pas dire se méfier de tout le monde. Les vrais échanges avec vos proches n’ont ni lien piégé, ni demande d’argent urgente. Sachez reconnaître ce qui est normal pour mieux repérer ce qui ne l’est pas.'
  },

  /* ---------- 15. SMS code de connexion (demandé) — FIABLE ----------- */
  {
    id: 'sms-code-ok',
    canal: 'sms',
    entete: 'SMS reçu juste après avoir cliqué « Se connecter » sur le site de votre banque',
    expediteur: 'CIC',
    messages: [
      'Votre code de connexion est 483 920. Il est valable 5 minutes. Ne le communiquez jamais à personne, pas même à un conseiller.'
    ],
    verdict: 'fiable',
    categorie: 'Message légitime — code à usage unique (que VOUS avez demandé)',
    indices: [
      'Vous venez vous-même de demander à vous connecter : ce code est attendu.',
      'Aucun lien à cliquer, aucune pièce jointe.',
      'Le message rappelle de ne jamais communiquer le code, même à un conseiller.',
      'Aucune menace ni urgence anormale.'
    ],
    reflexe: 'Un code reçu par SMS ne se DONNE jamais à personne : vous le saisissez vous-même sur le site officiel, c’est tout.',
    explication: 'Ces codes à usage unique sont normaux quand c’est VOUS qui vous connectez. Le piège commence si quelqu’un vous APPELLE pour vous demander de le lui dicter : là, on raccroche. Reçu après votre propre action, ce message est fiable.'
  },

  /* ---------- 16. Notification virement reçu — FIABLE --------------- */
  {
    id: 'notif-virement-ok',
    canal: 'notif',
    app: 'Ma Banque',
    appIcon: '🏦',
    fond: 'info',
    titre: 'Virement reçu : +200,00 €',
    texte: 'Vous avez reçu un virement de 200,00 € de la part de « Paul Durand ». Solde consultable dans votre application.',
    verdict: 'fiable',
    categorie: 'Message légitime — notification de votre banque',
    indices: [
      'Simple information sur une opération, sans rien à faire.',
      'Aucun lien à cliquer, aucun code ni mot de passe demandé.',
      'La notification provient de l’application bancaire installée sur votre téléphone.',
      'Aucune urgence ni menace.'
    ],
    reflexe: 'Une vraie notification informe ; elle ne vous demande jamais d’agir en urgence ni de saisir vos codes.',
    explication: 'Les applications bancaires envoient ce type d’informations. Rien n’est demandé, aucun lien : c’est légitime. En cas de doute, ouvrez vous-même l’application pour vérifier votre solde.'
  },

  /* ---------- 17. Newsletter d’une association — FIABLE ------------- */
  {
    id: 'email-newsletter-ok',
    canal: 'email',
    entete: 'E-mail d’une association à laquelle vous êtes inscrit',
    de: 'Les Restos du Cœur',
    deAdresse: 'contact@restosducoeur.org',
    objet: 'Votre lettre d’information de janvier',
    date: 'Mar. 07/01, 08:30',
    corps: 'Bonjour,<br><br>Merci de votre fidélité. Découvrez les actions près de chez vous ce mois-ci et l’avancée de nos collectes.<br><br>Bonne lecture, et encore merci pour votre soutien.<br><br><span style="color:#64748b;font-size:.85em">Vous recevez ce message car vous êtes inscrit à notre lettre d’information. Vous pouvez vous désinscrire à tout moment.</span>',
    verdict: 'fiable',
    categorie: 'Message légitime — lettre d’information (newsletter)',
    indices: [
      'Adresse d’expéditeur cohérente avec l’organisme (restosducoeur.org).',
      'Aucune demande d’argent immédiate, de code ni de coordonnées bancaires.',
      'Ton informatif, sans menace ni urgence.',
      'Un lien de désinscription clair, comme l’exige la loi.'
    ],
    reflexe: 'Une lettre d’information d’un organisme auquel vous êtes inscrit, sans demande d’argent ni d’identifiants, est normale.',
    explication: 'Recevoir des lettres d’information d’associations ou de marques auxquelles on s’est abonné est banal. Le signe rassurant : on ne vous presse pas, on ne réclame ni argent ni mot de passe, et vous pouvez vous désinscrire quand vous voulez.'
  },

  /* ---------- 18. Nouvelles de la famille (WhatsApp) — FIABLE ------- */
  {
    id: 'chat-famille-ok',
    canal: 'chat',
    plateforme: 'WhatsApp',
    contact: 'Sophie (ma fille)',
    avatar: '',
    messages: [
      { from: 'eux', texte: 'Coucou maman ! Voici les photos du spectacle de danse de Léa 💃 Elle était tellement fière 😍' },
      { from: 'eux', texte: 'On passe dimanche midi comme prévu ? Je ramène le dessert 🍰' }
    ],
    verdict: 'fiable',
    categorie: 'Message légitime — nouvelles de la famille',
    indices: [
      'Contact connu et enregistré (le numéro habituel de votre fille).',
      'Contenu personnel et cohérent avec votre vie (le spectacle de Léa).',
      'Aucune demande d’argent, de code ni de virement.',
      'Aucun lien ni pièce jointe suspecte.'
    ],
    reflexe: 'Un proche, sur son numéro habituel, qui partage des nouvelles sans demander d’argent, c’est simplement… votre famille.',
    explication: 'Attention à ne pas confondre avec l’arnaque au faux proche, qui utilise un NOUVEAU numéro inconnu et demande de l’argent en urgence. Ici, c’est le numéro habituel et il n’y a aucune demande : le message est fiable.'
  },

  /* ---------- 19. Appel du secrétariat médical — FIABLE ------------- */
  {
    id: 'appel-medecin-ok',
    canal: 'appel',
    afficheur: 'Cabinet du Dr Martin',
    numero: 'appel du secrétariat médical',
    transcript: [
      { qui: 'lui', texte: 'Bonjour, secrétariat du Dr Martin. Je vous appelle pour confirmer votre rendez-vous de jeudi à 15h.' },
      { qui: 'vous', texte: 'Oui, tout à fait, je serai là.' },
      { qui: 'lui', texte: 'Parfait. Pensez à apporter votre carte Vitale. Bonne journée !' }
    ],
    verdict: 'fiable',
    categorie: 'Message légitime — confirmation de rendez-vous',
    indices: [
      'On confirme seulement un rendez-vous que vous connaissez déjà.',
      'Aucune demande de coordonnées bancaires ni de code.',
      'On vous demande votre carte Vitale sur place (normal), pas ses numéros au téléphone.',
      'Ton courtois, sans pression ni menace.'
    ],
    reflexe: 'Un vrai rendez-vous se confirme sans jamais réclamer vos codes ni votre carte bancaire au téléphone.',
    explication: 'Tous les appels ne sont pas des arnaques. Un secrétariat qui confirme un rendez-vous ne demande aucune information sensible. Si un « service » réclamait un paiement ou vos codes par téléphone, là il faudrait se méfier.'
  },

  /* ---------- 24. Vente en ligne, paiement sécurisé de la plateforme — FIABLE */
  {
    id: 'chat-leboncoin-paiement-securise-ok',
    canal: 'chat',
    plateforme: 'Leboncoin — messagerie',
    contact: 'Acheteuse intéressée (vélo enfant)',
    avatar: '',
    messages: [
      { from: 'eux', texte: 'Bonjour, le vélo enfant m’intéresse. Je passe le récupérer samedi matin si ça vous va, et je règle avec le Paiement Leboncoin en main propre.' },
      { from: 'eux', texte: 'Comme ça c’est sécurisé pour nous deux : l’argent est débloqué une fois que j’ai bien récupéré l’article. À samedi !' }
    ],
    verdict: 'fiable',
    categorie: 'Message légitime — vente entre particuliers via le paiement sécurisé de la plateforme',
    indices: [
      'Le paiement passe par le système officiel de la plateforme, pas par un virement direct à un inconnu.',
      'Pas de prétexte de « transporteur » : l’acheteuse vient récupérer l’objet elle-même.',
      'Aucune demande de remboursement ni de « trop-perçu ».',
      'Ton simple, sans urgence artificielle ni pièce jointe suspecte.'
    ],
    reflexe: 'Une vente sûre passe par le paiement intégré de la plateforme (ou une remise en main propre contre paiement immédiat) — jamais par un virement extérieur suivi d’un remboursement.',
    explication: 'À l’inverse de l’arnaque au trop-perçu, ici l’argent reste bloqué par la plateforme jusqu’à la remise réelle de l’objet : ni vous ni l’acheteuse ne risquez de perdre de l’argent. Le signal rassurant à retenir : le paiement se fait DANS le système de la plateforme, jamais par un virement bancaire direct entre particuliers.'
  },

  /* ---------- 25. Image deepfake — manifestation — ARNAQUE ------------- */
  {
    id: 'image-deepfake-manifestation',
    canal: 'image',
    image: 'img/deepfake-manifestation.jpg',
    legende: '« Le Président pris à partie par ses propres forces de l’ordre en pleine manif ! Ce qu’ils ne veulent pas que vous voyiez… » — Partagé 62 000 fois',
    verdict: 'arnaque',
    categorie: 'Image générée par IA (« deepfake ») / intox',
    indices: [
      'Détails incohérents : chiffres sans queue ni tête sur les casques/écussons, visages flous ou dédoublés dans la foule.',
      'Aucun média sérieux ne relaie cette scène.',
      'La légende joue sur le complot et l’émotion (« ce qu’ils ne veulent pas que vous voyiez »).',
      'Une image seule ne prouve rien : elle peut être fabriquée en quelques secondes.'
    ],
    reflexe: 'Avant de croire ou de partager une image choc, cherchez l’info sur plusieurs médias reconnus. Zoomez sur les détails (mains, inscriptions, visages en arrière-plan).',
    explication: 'Comme pour toute image choc, le sujet importe peu (une célébrité, un homme politique, un inconnu) : le réflexe est le même. Si l’événement n’est repris nulle part ailleurs, il n’a probablement pas eu lieu.'
  },

  /* ---------- 26. Faux profil de rencontre généré par IA — ARNAQUE ----- */
  {
    id: 'chat-faux-profil-rencontre',
    canal: 'chat',
    plateforme: 'Appli de rencontre',
    contact: 'Philippe M. 😊',
    avatar: '',
    messages: [
      { from:'eux', dateSep:'Il y a 3 semaines', texte:'Bonjour ! Ton profil m’a tout de suite plu 😊' },
      { from:'eux', dateSep:'Aujourd’hui', texte:'Je suis ingénieur, actuellement en mission sur une plateforme pétrolière offshore. On discute depuis 3 semaines, j’ai l’impression de te connaître depuis toujours.' },
      { from:'eux', texte:'J’ai un souci pour rentrer : la douane me réclame 400 € de frais que je n’ai pas sur moi ici. Tu pourrais m’avancer ça ? Je te rembourse dès mon retour, promis ❤️' }
    ],
    verdict: 'arnaque',
    categorie: 'Arnaque aux sentiments / faux profil',
    indices: [
      'Une relation qui devient intense en quelques semaines seulement, sans jamais s’être vus.',
      'Un métier qui justifie d’être loin et injoignable (plateforme offshore, mission à l’étranger…) : très classique.',
      { risque: 'La demande d’argent finit toujours par arriver — ici sous forme de « frais de douane ».' },
      'Le profil a l’air tout à fait normal, pas une célébrité : c’est justement ce qui le rend efficace. Une photo de profil crédible se fabrique aujourd’hui en quelques secondes.'
    ],
    reflexe: 'Dès qu’une rencontre en ligne demande de l’argent, même une petite somme « à rembourser vite », c’est une arnaque. Aucune exception.',
    explication: 'Contrairement au faux « Brad Pitt », ce genre de profil ne cherche pas à impressionner par la célébrité, mais par la normalité et la proximité construite au fil des messages. Les photos de ces profils sont souvent générées par IA, indétectables à l’œil nu : c’est le comportement (l’argent demandé) qui doit alerter, jamais l’apparence.'
  },

  /* ---------- 27. Fausse vendeuse, acompte hors plateforme — ARNAQUE --- */
  {
    id: 'chat-fausse-vendeuse-acompte',
    canal: 'chat',
    plateforme: 'Leboncoin (contact WhatsApp)',
    contact: 'Camille D.',
    avatar: '',
    messages: [
      { from:'eux', texte:'Bonjour ! Oui, l’article est toujours disponible 😊' },
      { from:'eux', texte:'Comme j’ai beaucoup de messages, je vous demande un acompte de 30 € par virement direct pour bloquer l’annonce, en dehors de Leboncoin (ça évite les frais de la plateforme).' },
      { from:'eux', texte:'Dès réception je retire l’annonce et on organise la remise en main propre.' }
    ],
    verdict: 'arnaque',
    categorie: 'Paiement hors plateforme (fausse vendeuse)',
    indices: [
      'On vous pousse à payer EN DEHORS du site/de l’appli, soi-disant pour « éviter les frais ».',
      'Demande d’un acompte avant même d’avoir vu l’objet ou fixé un rendez-vous.',
      { risque: 'Une fois le virement fait hors plateforme, il n’y a plus aucune protection : l’argent est perdu si l’objet n’existe pas.' },
      'Une photo de profil accueillante ne garantit rien : elle peut être fausse.'
    ],
    reflexe: 'Sur une plateforme d’annonces, le paiement doit toujours passer par le système sécurisé du site. Aucun « acompte » par virement direct, jamais.',
    explication: 'C’est l’inverse exact du scénario "vente Leboncoin sécurisée" : ici, dès qu’on vous fait sortir du système protégé, vous perdez toute garantie. Le prétexte (« éviter les frais ») est presque toujours signe d’arnaque.'
  },

  /* ---------- 28. Faux CAPTCHA « ClickFix » — ARNAQUE ----------------- */
  {
    id: 'popup-faux-captcha',
    canal: 'notif',
    entete: 'Fenêtre apparue en consultant un site internet habituel',
    app: 'Vérification de sécurité',
    appIcon: '☁️',
    fond: 'info',
    titre: 'Vérification humaine — confirmez que vous n’êtes pas un robot',
    texte: 'Suivez ces 3 étapes sur votre clavier : 1) appuyez sur la touche Windows + R — 2) appuyez sur Ctrl + V — 3) appuyez sur Entrée. Cette vérification est obligatoire pour accéder à la page. Ray ID : b2f705a9136c2f36',
    verdict: 'arnaque',
    categorie: 'Faux CAPTCHA (« ClickFix ») — commande collée à votre insu',
    indices: [
      'Une vérification « je ne suis pas un robot » se fait en cochant une case, jamais en tapant des touches.',
      'On vous fait ouvrir une fenêtre de l’ordinateur (Windows + R) : aucun site web n’a besoin de ça.',
      'Le « Ctrl + V » colle un texte que vous n’avez jamais copié : la page l’a glissé dans le presse-papiers à votre insu.',
      { risque: 'Ce texte est une commande déguisée en code de vérification. Elle installe un voleur qui envoie mots de passe, cookies et accès bancaires à l’escroc.' }
    ],
    reflexe: 'Aucun contrôle anti-robot ne demande d’appuyer sur des touches ni d’ouvrir une fenêtre de l’ordinateur. Si on vous le demande : fermez l’onglet, ne collez rien.',
    explication: 'Cette page apparaît souvent sur un site tout à fait normal qui s’est fait pirater : l’adresse est la bonne, le décor est parfaitement imité, il n’y a ni faute ni urgence. C’est pourquoi le seul repère fiable n’est pas l’apparence, mais la demande elle-même. Sur Mac, la même arnaque demande d’ouvrir le « Terminal » (Cmd+Espace) au lieu de Windows + R. Si vous avez déjà collé et validé : coupez la connexion internet et faites-vous aider pour changer vos mots de passe depuis un autre appareil.'
  },

  /* ======================================================================
     Chantier 04 (§4.9) — rééquilibrage du corpus : 23 arnaques pour
     9 messages fiables entraînait la méfiance générale plutôt que le
     discernement. Les 14 cas ci-dessous sont légitimes mais imitent
     volontairement la forme d'une arnaque déjà présente dans le jeu :
     le joueur doit lire les indices, pas reconnaître un gabarit.
     ====================================================================== */

  /* ---------- 33. Avis d’impôt disponible — FIABLE */
  {
    id: 'email-impots-ok',
    canal: 'email',
    entete: 'E-mail reçu après votre déclaration en ligne',
    de: 'impots.gouv.fr',
    deAdresse: 'ne-pas-repondre@dgfip.finances.gouv.fr',
    objet: 'Votre avis d’impôt 2026 est disponible',
    date: 'Lun. 03/08, 07:12',
    corps: 'Bonjour,<br><br>Votre avis d’impôt sur le revenu est consultable dans votre espace particulier sur impots.gouv.fr, rubrique « Mes documents ».<br><br>Aucune démarche n’est nécessaire si vous êtes mensualisé.<br><br>La Direction générale des Finances publiques',
    verdict: 'fiable',
    categorie: 'Message légitime — mise à disposition d’un document',
    indices: [
      'Adresse en @dgfip.finances.gouv.fr : un vrai domaine de l’État (.gouv.fr).',
      'Aucun lien de paiement, aucun remboursement promis, aucune coordonnée bancaire demandée.',
      'On vous renvoie vers VOTRE espace, que vous ouvrez vous-même.',
      'Aucune menace ni délai couperet.'
    ],
    reflexe: 'Les impôts vous prient de consulter votre espace ; ils ne vous envoient jamais de lien pour « encaisser un remboursement ».',
    explication: 'À comparer avec le faux SMS de remboursement d’impôts du jeu : celui-ci ne promet rien, ne presse personne et ne demande aucun RIB. Le réflexe reste le même — tapez vous-même impots.gouv.fr plutôt que de cliquer.'
  },

  /* ---------- 34. SMS de livraison attendu — FIABLE */
  {
    id: 'sms-livraison-ok',
    canal: 'sms',
    entete: 'SMS reçu le jour où vous attendez une commande',
    expediteur: 'Colissimo',
    messages: [
      'Votre colis 6A21847755841 sera livré aujourd’hui entre 14h et 16h. Suivi disponible dans l’application La Poste ou sur laposte.fr avec votre numéro de colis.'
    ],
    verdict: 'fiable',
    categorie: 'Message légitime — information de livraison',
    indices: [
      'Vous attendez effectivement ce colis : le message correspond à votre vie réelle.',
      'Aucun lien cliquable, aucun « frais de 2 € » à régler.',
      'On vous renvoie vers l’application ou le site officiel, que vous ouvrez vous-même.',
      'Le nom affiché (« Colissimo ») ne prouve rien, il s’écrit librement : ce qui compte, c’est que rien ne vous soit demandé.'
    ],
    reflexe: 'Un vrai transporteur informe. Il ne réclame jamais de petits frais par carte pour « libérer » un colis.',
    explication: 'C’est le jumeau honnête du SMS de colis piégé. La différence tient à trois détails : pas de lien, pas de paiement, et vous attendiez vraiment ce colis. Un colis que vous n’avez pas commandé reste toujours suspect.'
  },

  /* ---------- 35. Appel de la banque qui ne demande aucun code — FIABLE */
  {
    id: 'appel-banque-fraude-ok',
    canal: 'appel',
    afficheur: 'CIC — service fraude',
    numero: 'appel reçu en journée',
    transcript: [
      { qui: 'lui', texte: 'Bonjour, service surveillance des paiements du CIC. Un achat de 780 € en Espagne a été bloqué sur votre carte. Le reconnaissez-vous ?' },
      { qui: 'vous', texte: 'Non, pas du tout.' },
      { qui: 'lui', texte: 'Nous l’avons donc refusé et votre carte est suspendue. Je ne vous demanderai aucun code : rendez-vous en agence ou rappelez le numéro au dos de votre carte pour la commande d’une nouvelle.' }
    ],
    verdict: 'fiable',
    categorie: 'Message légitime — alerte de fraude sans demande sensible',
    indices: [
      'On ne vous demande ni code, ni mot de passe, ni de valider quoi que ce soit dans l’appli.',
      'On ne vous demande pas de « transférer vos fonds sur un compte sûr ».',
      'L’opération a déjà été bloquée : il n’y a rien à faire dans l’urgence.',
      'On vous renvoie vers l’agence ou le numéro au dos de la carte.'
    ],
    reflexe: 'Une vraie banque bloque d’abord, informe ensuite. Elle ne vous fait jamais agir pendant l’appel.',
    explication: 'Le numéro affiché ne prouve jamais rien (spoofing). Ce qui distingue cet appel du faux conseiller, c’est qu’il ne vous demande RIEN. Au moindre doute : raccrochez et rappelez vous-même le numéro au dos de votre carte — un vrai conseiller ne s’en vexera jamais.'
  },

  /* ---------- 36. Notification Ameli — FIABLE */
  {
    id: 'notif-ameli-ok',
    canal: 'notif',
    entete: 'Notification reçue le lendemain d’un SMS « ameli » que vous aviez trouvé douteux',
    app: 'ameli',
    appIcon: '🩺',
    fond: 'info',
    titre: 'Un nouveau remboursement est disponible',
    texte: 'Le détail de vos derniers remboursements est consultable dans l’onglet « Mes paiements » de l’application.',
    verdict: 'fiable',
    categorie: 'Message légitime — notification de l’application ameli',
    indices: [
      'La notification vient de l’application officielle installée sur votre téléphone.',
      'Aucun montant « à réclamer », aucun RIB demandé.',
      'Aucun lien externe : tout se passe dans l’application.',
      'Aucune menace de suspension de droits.'
    ],
    reflexe: 'L’Assurance maladie verse directement sur le compte qu’elle connaît déjà. Elle ne demande jamais de RIB par SMS ou par mail.',
    explication: 'Recevoir un faux SMS ameli la veille ne transforme pas cette notification en piège : les deux n’ont aucun rapport. Le faux SMS promettait un remboursement et réclamait vos coordonnées bancaires ; cette notification-ci ne demande rien et ne mène nulle part, elle vous renvoie à l’application que vous avez installée vous-même. Se méfier du contexte est un mauvais réflexe : c’est le message qu’il faut lire, pas le moment où il arrive.'
  },

  /* ---------- 37. Confirmation d’une commande que vous avez passée — FIABLE */
  {
    id: 'email-commande-ok',
    canal: 'email',
    entete: 'E-mail reçu dix minutes après votre achat',
    de: 'Nature & Découvertes',
    deAdresse: 'commandes@natureetdecouvertes.com',
    objet: 'Votre commande n° 4471902 est confirmée',
    date: 'Aujourd’hui, 16:42',
    corps: 'Bonjour Madame Renard,<br><br>Merci pour votre commande du 14 août : 1 carillon à vent, 39,90 €.<br><br>Livraison prévue sous 3 à 5 jours ouvrés à l’adresse enregistrée dans votre compte. Le suivi apparaîtra dans votre espace client.<br><br>Bonne journée,<br>Le service clients',
    verdict: 'fiable',
    categorie: 'Message légitime — confirmation de commande',
    indices: [
      'Vous venez de passer cette commande : montant, article et date correspondent.',
      'Adresse d’expéditeur cohérente avec l’enseigne.',
      'On vous nomme correctement, sans « Cher client » générique.',
      'Aucun paiement supplémentaire, aucun code, aucune urgence.'
    ],
    reflexe: 'Une confirmation de commande récapitule ; elle ne redemande jamais de payer ni de « valider » vos coordonnées bancaires.',
    explication: 'Le piège courant est le faux « problème de paiement » reçu après un achat réel, qui profite du fait que vous attendez un mail. Ici, tout concorde et rien n’est demandé : c’est légitime.'
  },

  /* ---------- 38. SMS de la pharmacie — FIABLE */
  {
    id: 'sms-pharmacie-ok',
    canal: 'sms',
    entete: 'SMS de votre pharmacie de quartier',
    expediteur: 'PharmacieCentrale',
    messages: [
      'Bonjour, votre traitement commandé mardi est arrivé. Vous pouvez le retirer aux horaires d’ouverture, du lundi au samedi 9h-19h30. À bientôt !'
    ],
    verdict: 'fiable',
    categorie: 'Message légitime — mise à disposition en pharmacie',
    indices: [
      'Le message correspond à une démarche que vous avez vous-même engagée.',
      'Aucun lien, aucune pièce jointe, aucun paiement en ligne.',
      'Aucune donnée personnelle ni médicale n’est demandée en retour.',
      'On vous invite à vous déplacer, sans aucune urgence.'
    ],
    reflexe: 'Un professionnel de santé vous informe ; il ne vous demande jamais de payer ou de vous identifier par un lien reçu par SMS.',
    explication: 'Tout n’est pas une arnaque, et se méfier de tout finit par coûter cher en tranquillité. Ici : commande réelle, aucun lien, aucun paiement. Rien à signaler.'
  },

  /* ---------- 39. Message du petit-fils sur son numéro habituel — FIABLE */
  {
    id: 'chat-petitfils-ok',
    canal: 'chat',
    messages: [
      { from: 'eux', texte: 'Salut Mamie ! J’ai eu mes résultats, je suis pris à la fac de Rennes 🎉' },
      { from: 'eux', texte: 'Je passe te raconter tout ça dimanche, tu me feras ton gratin ? 😋' }
    ],
    plateforme: 'WhatsApp',
    contact: 'Théo (petit-fils)',
    avatar: '',
    verdict: 'fiable',
    categorie: 'Message légitime — nouvelles d’un proche',
    indices: [
      'Le message arrive sur la conversation habituelle, pas depuis un nouveau numéro.',
      'Aucune demande d’argent, de virement ni de code.',
      'Le contenu est personnel et vérifiable auprès de la famille.',
      'Aucun lien, aucune urgence, aucun changement de numéro annoncé.'
    ],
    reflexe: 'L’arnaque au faux proche commence presque toujours par « j’ai changé de numéro ». Ici, rien de tel.',
    explication: 'C’est le contre-exemple direct du faux proche présent dans le jeu : même ton affectueux, mais numéro habituel et aucune demande d’argent. Le seul signal qui compte vraiment reste celui-là : dès qu’on parle d’argent en urgence, on appelle la personne sur son ancien numéro.'
  },

  /* ---------- 40. Relevé de la mutuelle — FIABLE */
  {
    id: 'email-mutuelle-ok',
    canal: 'email',
    entete: 'E-mail mensuel de votre mutuelle',
    de: 'Harmonie Mutuelle',
    deAdresse: 'info@harmonie-mutuelle.fr',
    objet: 'Votre relevé de prestations du mois de juillet',
    date: 'Ven. 01/08, 06:05',
    corps: 'Bonjour,<br><br>Votre relevé de prestations est disponible dans votre espace adhérent.<br><br>Vous n’avez aucune démarche à effectuer : les remboursements sont versés automatiquement sur votre compte habituel.<br><br>Votre conseiller reste joignable au numéro figurant sur votre carte de tiers payant.',
    verdict: 'fiable',
    categorie: 'Message légitime — relevé mensuel',
    indices: [
      'Adresse d’expéditeur cohérente avec l’organisme.',
      '« Aucune démarche à effectuer » : personne ne vous presse.',
      'On vous renvoie au numéro figurant sur VOTRE carte, pas à un numéro donné dans le mail.',
      'Aucun RIB, aucun identifiant, aucune pièce jointe à ouvrir.'
    ],
    reflexe: 'Un organisme qui vous verse déjà de l’argent connaît déjà votre RIB : s’il vous le redemande, c’est louche.',
    explication: 'La forme ressemble beaucoup à celle d’un hameçonnage, et c’est précisément ce qui rend l’exercice utile. Les différences sont réelles : rien n’est demandé, rien n’est urgent, et le canal de rappel est celui que vous détenez déjà.'
  },

  /* ---------- 41. Notification de mise à jour — FIABLE */
  {
    id: 'notif-maj-appli-ok',
    canal: 'notif',
    app: 'Play Store',
    appIcon: '⚙️',
    fond: 'info',
    titre: '3 applications ont été mises à jour',
    texte: 'Ma Banque, Météo France et Ameli ont été mises à jour automatiquement. Aucune action n’est requise.',
    verdict: 'fiable',
    categorie: 'Message légitime — mise à jour automatique',
    indices: [
      'La notification vient du magasin d’applications du téléphone.',
      '« Aucune action n’est requise » : rien à cliquer, rien à installer soi-même.',
      'Aucune alerte de virus, aucun compte à bloquer, aucun numéro à appeler.',
      'Aucun paiement ni abonnement proposé.'
    ],
    reflexe: 'Les vraies mises à jour passent par le magasin d’applications, jamais par une fenêtre surgissante qui crie au virus.',
    explication: 'À opposer au faux support technique du jeu, qui affiche une alerte alarmante et un numéro à appeler. Une vraie mise à jour est discrète, déjà faite, et ne demande rien.'
  },

  /* ---------- 42. Avis de renouvellement d’abonnement — FIABLE */
  {
    id: 'email-abonnement-ok',
    canal: 'email',
    entete: 'E-mail reçu avant le prélèvement annuel',
    de: 'Le Monde',
    deAdresse: 'abonnements@lemonde.fr',
    objet: 'Votre abonnement sera renouvelé le 12 septembre',
    date: 'Jeu. 13/08, 10:20',
    corps: 'Bonjour,<br><br>Votre abonnement numérique sera reconduit le 12 septembre pour 12 mois, au tarif de 99 €.<br><br>Vous pouvez modifier ou résilier votre abonnement à tout moment depuis votre compte, rubrique « Mon abonnement ».<br><br>Aucune action n’est nécessaire si vous souhaitez poursuivre.',
    verdict: 'fiable',
    categorie: 'Message légitime — information de reconduction',
    indices: [
      'On vous prévient à l’avance : un mois de délai, pas 24 heures.',
      'Aucun bouton « mettre à jour votre carte », aucun formulaire de paiement.',
      'On vous rappelle que vous pouvez résilier, depuis votre compte que vous ouvrez vous-même.',
      'Adresse d’expéditeur cohérente avec le journal.'
    ],
    reflexe: 'Un vrai avis de reconduction prévient à l’avance et n’a jamais besoin de vos coordonnées bancaires.',
    explication: 'Le faux mail Prime Video du jeu, lui, annonce un « échec de paiement » et pousse à ressaisir sa carte en urgence. C’est exactement la différence à retenir : information à l’avance contre urgence de paiement.'
  },

  /* ---------- 43. Appel de la mairie — FIABLE */
  {
    id: 'appel-mairie-ok',
    canal: 'appel',
    afficheur: 'Mairie de Saint-Aubin',
    numero: '02 96 41 12 08',
    transcript: [
      { qui: 'lui', texte: 'Bonjour Madame, service des aînés de la mairie. Nous organisons le repas de fin d’année le 14 décembre. Souhaitez-vous y participer ?' },
      { qui: 'vous', texte: 'Volontiers ! Il faut payer quelque chose ?' },
      { qui: 'lui', texte: 'C’est offert par la commune. Vous recevrez une invitation par courrier, avec un coupon à nous retourner. Rien à régler, rien à signer aujourd’hui.' }
    ],
    verdict: 'fiable',
    categorie: 'Message légitime — invitation municipale',
    indices: [
      'Aucune donnée bancaire, aucun numéro de sécurité sociale demandé.',
      'Une confirmation écrite est annoncée par courrier : vous gardez la main.',
      'On ne vous fait rien signer ni payer pendant l’appel.',
      'Aucune pression, aucun « il ne reste que deux places, décidez maintenant ».'
    ],
    reflexe: 'Un service public confirme toujours par écrit. On peut sans risque dire « je vous rappelle » et vérifier le numéro de la mairie soi-même.',
    explication: 'Les démarchages abusifs visant les personnes âgées imitent souvent les services publics, mais ils demandent une décision immédiate, une signature ou un acompte. Ici : rien de tout cela. Vous pouvez malgré tout rappeler le standard de la mairie pour confirmer — c’est gratuit et toujours légitime.'
  },

  /* ---------- 44. Rappel de rendez-vous médical — FIABLE */
  {
    id: 'sms-rdv-ok',
    canal: 'sms',
    entete: 'SMS reçu la veille d’un rendez-vous que vous avez pris',
    expediteur: 'Doctolib',
    messages: [
      'Rappel : rendez-vous avec Dr Nguyen (cardiologie) demain 15/08 à 10h30, 4 rue des Lilas. Pour annuler, connectez-vous à votre compte Doctolib.'
    ],
    verdict: 'fiable',
    categorie: 'Message légitime — rappel de rendez-vous',
    indices: [
      'Le rendez-vous existe : c’est vous qui l’avez pris.',
      'Praticien, date, heure et adresse sont précis et vérifiables.',
      'Aucun paiement, aucun acompte, aucune « confirmation » par carte.',
      'Pour annuler, on vous renvoie à votre compte, pas à un lien du message.'
    ],
    reflexe: 'Un rappel de rendez-vous ne coûte rien. Dès qu’on vous demande de payer pour « confirmer », c’est une arnaque.',
    explication: 'Il existe de faux rappels médicaux réclamant des « frais de dossier » par carte. Le détail qui tranche : un vrai rappel se contente d’informer et vous renvoie à votre propre compte.'
  },

  /* ---------- 45. Convocation à l’assemblée générale — FIABLE */
  {
    id: 'email-syndic-ok',
    canal: 'email',
    entete: 'E-mail du syndic de votre immeuble',
    de: 'Cabinet Berthier — syndic',
    deAdresse: 'copropriete@cabinet-berthier.fr',
    objet: 'Convocation à l’assemblée générale du 22 septembre',
    date: 'Mer. 12/08, 14:55',
    corps: 'Madame, Monsieur,<br><br>Vous trouverez en pièce jointe la convocation à l’assemblée générale des copropriétaires du 22 septembre, ainsi que l’ordre du jour et les devis reçus pour la réfection du hall.<br><br>Le même dossier vous parviendra par courrier recommandé, comme le prévoit la loi.<br><br>Cordialement,<br>Cabinet Berthier',
    verdict: 'fiable',
    categorie: 'Message légitime — convocation de copropriété',
    indices: [
      'Le même document vous parvient aussi par courrier recommandé : vous pourrez recouper.',
      'Aucun paiement demandé par ce message, aucun RIB à « mettre à jour ».',
      'Expéditeur identifié, correspondant à votre syndic connu.',
      'Aucune urgence : la réunion a lieu dans plus d’un mois.'
    ],
    reflexe: 'Une pièce jointe attendue d’un expéditeur connu est normale. Une pièce jointe inattendue qui réclame un paiement ne l’est jamais.',
    explication: 'L’arnaque classique ici s’appelle la « fraude au changement de RIB » : un faux syndic annonce un nouveau compte pour les charges. Le signal fiable de ce message-ci : il ne demande aucun versement, et le courrier recommandé permet de tout vérifier.'
  },

  /* ---------- 46. Facture d’électricité disponible — FIABLE */
  {
    id: 'email-facture-energie-ok',
    canal: 'email',
    entete: 'E-mail de votre fournisseur d’électricité, avec un montant trois fois plus élevé que d’habitude',
    de: 'EDF',
    deAdresse: 'contact@edf.fr',
    objet: 'Votre facture du mois d’août est disponible',
    date: 'Lun. 11/08, 05:40',
    corps: 'Bonjour,<br><br>Votre facture du mois d’août s’élève à 214,60 €. Elle est consultable dans votre espace client EDF.<br><br>Ce montant comprend la régularisation annuelle de votre consommation : vos mensualités de 61,20 € étaient inférieures à l’électricité réellement consommée cette année.<br><br>Il sera prélevé le 20 du mois sur le compte habituel, comme les mois précédents. Vous n’avez aucune démarche à effectuer.',
    verdict: 'fiable',
    categorie: 'Message légitime — mise à disposition d’une facture',
    indices: [
      'Le montant surprend, mais le message explique lui-même d’où il vient (la régularisation annuelle) au lieu de vous presser.',
      'Prélèvement sur le compte déjà connu : aucun nouveau RIB n’est annoncé.',
      'Aucun lien de paiement, aucune menace de coupure, aucun délai couperet.',
      '« Aucune démarche à effectuer » : le message informe, il ne réclame pas.'
    ],
    reflexe: 'Un montant qui fait sursauter n’est pas un signe d’arnaque. Regardez ce qu’on vous demande de faire : ici, rien — et tout est vérifiable depuis votre espace client.',
    explication: 'Un message inquiétant n’est pas forcément un faux message : une vraie facture peut très bien annoncer une mauvaise surprise. Les faux mails d’énergie, eux, ajoutent toujours deux choses que celui-ci n’a pas : un lien de paiement immédiat et une menace de coupure sous 24 ou 48 heures. Le réflexe ne change pas — n’ouvrez pas le lien d’un mail, ouvrez vous-même votre espace client et comparez le montant.'
  }

];

/* =========================================================================
   GLOSSAIRE — « Les mots à connaître »
   Accessible depuis le menu et en cliquant sur les mots pendant le jeu.
   aliases = toutes les formes reconnues dans les textes (repérage automatique).
   ========================================================================= */
const GLOSSAIRE = [
  { key:'hameconnage', terme:'Hameçonnage (phishing)',
    aliases:['hameçonnage','phishing'],
    def:'Technique où un escroc se fait passer pour un organisme de confiance (banque, poste, impôts…) pour vous pousser à cliquer sur un lien et à livrer vos informations (mot de passe, carte bancaire). « Phishing » est le mot anglais.' },
  { key:'smishing', terme:'Smishing',
    aliases:['smishing'],
    def:'Hameçonnage par SMS. Un faux message (colis, amende, banque) contient un lien piégé. Réflexe : ne pas cliquer, vérifier sur le site officiel, signaler au 33700.' },
  { key:'vishing', terme:'Vishing',
    aliases:['vishing'],
    def:'Hameçonnage par téléphone (appel vocal). L’escroc vous appelle en se faisant passer pour votre banque ou un service, et tente d’obtenir vos codes.' },
  { key:'spoofing', terme:'Spoofing (usurpation de numéro)',
    aliases:['spoofing'],
    def:'Falsification du numéro affiché sur votre téléphone. L’escroc fait apparaître le vrai numéro de votre banque alors que ce n’est pas elle. Le numéro affiché ne prouve donc jamais l’identité de l’appelant.' },
  { key:'deepfake', terme:'Deepfake (hypertrucage)',
    aliases:['deepfake','hypertrucage'],
    def:'Image, vidéo ou voix fabriquée par intelligence artificielle pour imiter une personne réelle. Sert à désinformer ou à arnaquer (fausse célébrité, fausse voix d’un proche).' },
  { key:'romance', terme:'Arnaque aux sentiments',
    aliases:['arnaque aux sentiments','arnaque aux sentiments / fausse célébrité'],
    def:'L’escroc crée une fausse relation amoureuse en ligne, gagne votre confiance pendant des semaines, puis invente un problème pour vous demander de l’argent. On parle aussi de « brouteur ».' },
  { key:'faux-conseiller', terme:'Faux conseiller bancaire',
    aliases:['faux conseiller bancaire','faux conseiller'],
    def:'Un escroc se fait passer pour votre banque (souvent par spoofing) et vous fait valider ou dicter des codes qui autorisent en réalité SES virements. Une banque ne demande jamais vos codes.' },
  { key:'faux-proche', terme:'Arnaque au faux proche',
    aliases:['arnaque au faux proche','faux proche','bonjour maman'],
    def:'Un message venu d’un numéro inconnu prétend être votre enfant (« j’ai changé de numéro ») et demande de l’argent en urgence. Toujours vérifier en appelant le proche sur son ancien numéro.' },
  { key:'faux-support', terme:'Faux support technique',
    aliases:['faux support technique','support technique'],
    def:'Une fenêtre ou un appel prétend que votre ordinateur est infecté et vous pousse à appeler un « technicien » qui prend le contrôle de la machine et vous soutire de l’argent. Un vrai éditeur ne fait jamais cela.' },
  { key:'usurpation', terme:'Usurpation d’identité',
    aliases:['usurpation d’identité','usurpation','usurpent','usurpe'],
    def:'Le fait, pour un escroc, de se faire passer pour une personne ou un organisme officiel (CAF, Assurance Maladie, une marque, un proche) afin de gagner votre confiance.' },
  { key:'carte-cadeau', terme:'Paiement en cartes cadeaux',
    aliases:['cartes cadeaux','carte cadeau','cartes-cadeaux'],
    def:'Moyen de paiement favori des escrocs : ils demandent d’acheter des cartes cadeaux (iTunes, Amazon…) et d’en communiquer les codes, car l’argent devient alors introuvable. Aucune administration ni entreprise sérieuse ne se fait payer ainsi.' },
  { key:'piece-jointe', terme:'Pièce jointe piégée',
    aliases:['pièce jointe piégée','pièce jointe'],
    def:'Un fichier joint à un e-mail (PDF, document) qui installe un virus ou un logiciel espion dès qu’on l’ouvre. N’ouvrez jamais une pièce jointe venue d’un expéditeur inconnu.' },
  { key:'code-unique', terme:'Code à usage unique (code SMS)',
    aliases:['code à usage unique','code reçu par sms','code de confirmation','code par sms'],
    def:'Chiffre envoyé par SMS pour valider une connexion ou un achat. Vous le SAISISSEZ vous-même sur le site officiel ; vous ne le DONNEZ jamais à quelqu’un qui vous le demande.' },
  { key:'pig-butchering', terme:'Arnaque à l’investissement (« pig butchering »)',
    aliases:['pig butchering','dépeçage de cochon'],
    def:'L’escroc noue d’abord une relation de confiance (souvent après un faux « mauvais numéro » ou une rencontre en ligne), puis pousse la victime à investir sur une fausse plateforme de crypto ou de trading. De petits gains fictifs s’affichent pour la mettre en confiance et l’inciter à verser toujours plus ; au moment de retirer, tout disparaît.' },
  { key:'hors-plateforme', terme:'Paiement hors plateforme',
    aliases:['hors plateforme','hors de la plateforme'],
    def:'Se faire payer en dehors du site officiel (location, petite annonce, billetterie) — par virement ou cartes cadeaux — pour échapper aux protections de la plateforme. Un vrai loueur ou vendeur passe toujours par le paiement sécurisé du site.' },
  { key:'trop-percu', terme:'Arnaque au trop-perçu',
    aliases:['trop-perçu','arnaque au trop-perçu'],
    def:'Un acheteur prétend avoir envoyé trop d’argent par erreur (souvent avec une fausse capture d’écran de virement) et demande de lui rembourser la différence avant que l’argent ne soit réellement arrivé. Le premier virement n’existe pas ou sera annulé : la victime perd le vrai virement qu’elle a renvoyé.' },
  { key:'fausse-boutique', terme:'Fausse boutique en ligne',
    aliases:['fausse boutique en ligne','faux site marchand'],
    def:'Un site de vente factice, souvent avec des réductions extrêmes et une urgence artificielle (« liquidation », « stock limité »), qui encaisse le paiement sans jamais livrer, ou vole les données bancaires.' },
  { key:'clickfix', terme:'Faux CAPTCHA (« ClickFix »)',
    aliases:['clickfix','faux captcha'],
    def:'Fausse page « je ne suis pas un robot » qui, au lieu de cocher une case, vous demande d’appuyer sur des touches (Windows + R, ou le Terminal sur Mac) pour coller un « code de vérification ». Ce code est en réalité une commande qui installe un logiciel voleur. Règle absolue : un contrôle anti-robot ne demande jamais d’ouvrir une fenêtre de l’ordinateur.' },
  { key:'presse-papiers', terme:'Presse-papiers',
    aliases:['presse-papiers'],
    def:'Mémoire invisible de l’ordinateur où atterrit tout ce que vous copiez, et d’où sort tout ce que vous collez (Ctrl + V). Une page web peut y déposer un texte sans vous prévenir : ce que vous collez n’est donc pas forcément ce que vous croyez avoir copié.' }
];

/* =========================================================================
   REPERES — éléments cliquables du message (phase d'entraînement au repérage)
   Après avoir choisi, le joueur clique sur les éléments qui justifient sa
   décision. Trois natures, portées par le champ « type » :
     type:'indice' (bon:true)  — véritable indice, suspect pour une arnaque,
                                 rassurant pour un message fiable ;
     type:'leurre' (bon:false) — posé là par l'escroc pour rassurer (un numéro
                                 de suivi inventé, un « paiement sécurisé ») ;
     type:'neutre' (bon:false) — détail sans valeur probante, que personne n'a
                                 placé là pour tromper (un nom d'expéditeur, un
                                 montant, une formule de politesse).
   Sur une carte fiable il n'y a pas d'escroc : donc jamais de leurre.
   « bon » reste lu comme synonyme quand « type » est absent.
   « texte » doit apparaître tel quel dans le message affiché ; '__IMG__' = l'image.
   ========================================================================= */
const REPERES = {
  'sms-colis': [
    { texte:'+33 7 45 13 81 31', bon:true, aide:'Un vrai transporteur (Chronopost, Colissimo…) vous écrirait-il depuis un simple numéro de portable ? Regardez qui envoie le message.', note:'Un vrai transporteur n’écrit pas depuis un numéro de portable personnel.' },
    { texte:'https://mon-relay-suivi.com', bon:true, aide:'Y a-t-il un lien à cliquer ? Est-ce vraiment l’adresse officielle du transporteur ?', note:'Ce n’est pas l’adresse officielle du transporteur : lien piégé.' },
    { texte:'sinon il sera renvoyé', bon:true, aide:'Cherchez la phrase qui vous met la pression pour agir tout de suite.', note:'Fausse urgence : on vous presse pour vous faire cliquer sans réfléchir.' },
    { texte:'3e095272b3fe4c7996b', bon:false, type:'leurre', note:'Impressionnant, mais c’est du décor : une suite de caractères pour faire « officiel ».' }
  ],
  'sms-colis-photo-ia': [
    { texte:'+33 6 12 44 90 08', bon:true, aide:'Un vrai transporteur (La Poste, Chronopost, Mondial Relay…) vous écrirait-il depuis un simple numéro de portable ? Regardez qui envoie le message.', note:'Un vrai transporteur n’écrit pas depuis un numéro de portable personnel.' },
    { texte:'__IMG__', bon:true, aide:'Cette photo prouve-t-elle vraiment que le colis existe ? Votre nom sur l’étiquette est-il difficile à obtenir ? Cliquez sur la photo.', note:'Photo générée par IA : votre nom sur une étiquette se fabrique en quelques secondes. Une image ne prouve jamais qu’un colis existe.' },
    { texte:'1,95 € de relivraison', bon:true, aide:'Un transporteur se fait-il payer quelques euros par SMS ? Cherchez la demande d’argent.', note:'Aucun transporteur ne réclame de « frais de relivraison » par SMS : c’est le piège pour voler votre carte.' },
    { texte:'https://suivi-colis-relais.net', bon:true, aide:'Est-ce vraiment l’adresse officielle du transporteur ? Regardez le lien.', note:'Ce n’est pas le site officiel du transporteur : lien piégé.' },
    { texte:'centre de tri', bon:false, type:'leurre', note:'« Centre de tri » fait très officiel… mais ce n’est que du décor ajouté sous la fausse photo.' }
  ],
  'email-motdepasse': [
    { texte:'ne-pas-repondre@chronopost.fr', bon:true, aide:'Le message dit « Microsoft »… mais regardez l’adresse e-mail complète de l’expéditeur : est-elle cohérente ?', note:'Le nom affiché dit « Microsoft », mais l’adresse finit par @chronopost.fr : ça ne colle pas.' },
    { texte:'sous 24h', bon:true, aide:'Cherchez un délai qui vous oblige à vous dépêcher.', note:'Urgence artificielle : « agissez sous 24h ».' },
    { texte:'suspension de votre compte', bon:true, aide:'Repérez la menace censée vous faire peur.', note:'On vous fait peur avec une menace de suspension.' },
    { texte:'que vous n’avez pas Utiliser', bon:true, aide:'Un grand service écrit-il sans fautes ? Cherchez une tournure ou une majuscule qui sonne faux.', note:'Faute et tournure maladroite : un vrai service ne s’exprime pas ainsi.' },
    { texte:'antoninatger', bon:true, aide:'Comment vous appelle-t-on ? Un vrai service utilise-t-il votre prénom, ou un identifiant collé ?', note:'On vous appelle par un identifiant collé en minuscules (« antoninatger ») et non « Bonjour Antonin » : un vrai service vous nomme correctement. Signe d’un envoi automatique malveillant.' }
  ],
  'email-boite-mystere': [
    { texte:'noreply.LE.04@b8.9a.21.eb', bon:true, aide:'Regardez l’adresse de l’expéditeur : ressemble-t-elle à une vraie adresse d’entreprise ?', note:'Adresse d’expéditeur incompréhensible : signe d’arnaque.' },
    { texte:'Gagné Une Boîte-mystère', bon:true, aide:'Avez-vous vraiment participé à un jeu ? Cherchez le « cadeau » que vous n’avez jamais demandé.', note:'Un « cadeau » que vous n’avez jamais demandé : c’est un appât.' },
    { texte:'-VeuiLLez.ConFirmer La-Reception!!-', bon:true, aide:'Cherchez le texte à la mise en forme cassée (majuscules et tirets au milieu des mots).', note:'Mise en forme cassée (majuscules, tirets) pour tromper les filtres anti-spam.' },
    { texte:'NQLRF.pdf', bon:true, aide:'Y a-t-il un fichier joint que vous n’attendiez pas ?', note:'Pièce jointe inconnue : ne jamais l’ouvrir, elle peut contenir un virus.' }
  ],
  'email-panneaux': [
    { texte:'charlotte.robert@shikisc.com', bon:true, aide:'Un organisme public écrirait-il depuis cette adresse ? Regardez l’expéditeur.', note:'Adresse d’entreprise fantaisiste, sans lien avec un organisme public.' },
    { texte:'Dernière chance', bon:true, aide:'Cherchez la formule qui vous pousse à agir sans réfléchir.', note:'Pression : « dernière chance » pour vous faire agir vite.' },
    { texte:'01-01-2025', bon:true, aide:'Regardez bien la date : est-elle cohérente, ou déjà passée ?', note:'Date d’aide déjà dépassée : incohérence révélatrice.' },
    { texte:'ne pourront pas faire face', bon:true, aide:'Cherchez ce qui laisse croire qu’il faut se dépêcher avant qu’il ne reste plus rien.', note:'Rareté artificielle pour créer l’urgence.' }
  ],
  'chat-celebrite': [
    { texte:'Brad Pitt (Officiel) ✔', bon:true, aide:'Pensez-vous qu’une star du cinéma vous contacterait vraiment en privé pour vous parler ? Regardez qui écrit.', note:'Une célébrité ne vous contacte pas en privé : profil usurpé.' },
    { texte:'850 € en cartes cadeaux', bon:true, aide:'Que vous demande-t-on d’envoyer ? Est-ce une façon normale de payer ?', note:'Demande d’argent en cartes cadeaux : intraçable, réflexe d’arnaque absolu.' },
    { texte:'garde notre relation secrète', bon:true, aide:'Cherchez la phrase qui vous demande de n’en parler à personne.', note:'Le secret imposé sert à vous isoler.' },
    { texte:'Tu es la seule qui me comprend', bon:false, type:'leurre', note:'C’est touchant… et calculé : la flatterie sert à mettre en confiance.' }
  ],
  'appel-banque': [
    { texte:'01 40 XX XX XX (n° de votre agence)', bon:true, aide:'Le numéro qui s’affiche prouve-t-il vraiment que c’est votre banque ? Un numéro peut-il être imité ?', note:'Le numéro affiché peut être falsifié (spoofing) : il ne prouve rien.' },
    { texte:'virement suspect de 1 290 €', bon:true, aide:'Cherchez ce qui doit vous faire paniquer tout de suite.', note:'Fausse urgence pour vous faire paniquer.' },
    { texte:'donnez-le-moi', bon:true, aide:'Que vous demande-t-on de communiquer ? Une banque réclame-t-elle un code reçu par SMS ?', note:'On vous demande un code reçu par SMS : une banque ne fait JAMAIS ça.' },
    { texte:'confirmez votre mot de passe', bon:true, aide:'Un vrai conseiller vous demanderait-il votre mot de passe ?', note:'Jamais un vrai conseiller ne demande votre mot de passe.' }
  ],
  'chat-faux-proche': [
    { texte:'+33 6 51 20 84 77', bon:true, aide:'Ce numéro est-il bien celui, enregistré, de votre proche ? Regardez d’où vient le message.', note:'Numéro inconnu qui prétend être votre enfant.' },
    { texte:'voici mon nouveau numéro', bon:true, aide:'Cherchez l’excuse donnée pour expliquer ce numéro inconnu.', note:'« J’ai changé de numéro » : l’excuse classique du faux proche.' },
    { texte:'plus accès à mon appli bancaire', bon:true, aide:'Pourquoi ne peut-il pas payer lui-même ? Cherchez le prétexte.', note:'Prétexte pour justifier de ne pas payer lui-même.' },
    { texte:'virement de 680 €', bon:true, aide:'Que vous demande-t-on de faire en urgence ?', note:'Demande d’argent urgente : vérifiez en appelant le vrai numéro.' }
  ],
  'image-deepfake': [
    { texte:'__IMG__', bon:true, aide:'Regardez l’image de près : les mains, les visages, l’arrière-plan vous paraissent-ils naturels ? Cliquez dessus.', note:'Zoomez : mains ou visages déformés, arrière-plan « lisse »… signes d’une image générée par IA.' },
    { texte:'Regardez ce qu’on nous cache', bon:true, aide:'Cherchez la phrase qui joue sur l’émotion pour vous faire réagir.', note:'Formule sensationnaliste qui joue sur l’émotion.' },
    { texte:'Partagé 48 000 fois', bon:false, type:'neutre', note:'Le nombre de partages ne prouve rien : le faux se propage très vite.' }
  ],
  'sms-ameli': [
    { texte:'carte Vitale expire', bon:true, aide:'Une carte Vitale « expire »-t-elle vraiment au point de bloquer vos remboursements ? Cherchez cette affirmation.', note:'La carte Vitale n’a pas de date qui « suspend » les remboursements : fausse info.' },
    { texte:'remboursements seront suspendus', bon:true, aide:'Cherchez la menace censée vous faire peur.', note:'Menace pour vous faire agir dans la panique.' },
    { texte:'http://ameli-mise-a-jour.info-fr.net', bon:true, aide:'Le vrai site de l’Assurance Maladie, c’est ameli.fr. Cette adresse lui ressemble-t-elle vraiment ?', note:'Le vrai site est ameli.fr — cette adresse est trompeuse.' },
    { texte:'AMELI-INFO', bon:false, type:'neutre', note:'Un nom d’expéditeur de SMS ou d’e-mail s’écrit librement : n’importe qui peut signer « AMELI-INFO ». Il ne prouve rien — ni qu’un message est faux, ni qu’il est vrai.' }
  ],
  'popup-support': [
    { texte:'5 virus détectés', bon:true, aide:'Cherchez l’alerte spectaculaire censée vous effrayer.', note:'Fausse alerte spectaculaire pour vous effrayer.' },
    { texte:'N’éteignez pas l’ordinateur', bon:true, aide:'Cherchez la consigne qui vous empêche de réfléchir ou de demander de l’aide.', note:'On vous empêche de réfléchir ou de demander de l’aide.' },
    { texte:'support Microsoft : 01 84 88 XX XX', bon:true, aide:'Un antivirus vous demanderait-il d’appeler un numéro de téléphone ?', note:'Un vrai antivirus ne demande jamais d’appeler un numéro.' },
    { texte:'données bancaires sont en danger', bon:false, type:'neutre', note:'Une vraie alerte de sécurité dit la même chose : cette phrase ne départage pas le vrai du faux. Ce qui trahit ici, c’est le numéro à appeler.' }
  ],
  'chat-emploi': [
    { texte:'Recrutement Amazon (RH)', bon:true, aide:'Une grande entreprise recrute-t-elle vraiment par messagerie ? Regardez qui vous écrit.', note:'Une grande marque ne recrute pas par WhatsApp.' },
    { texte:'80 à 300 € par jour', bon:true, aide:'Ce salaire est-il réaliste pour quelques minutes de travail, sans expérience ?', note:'Salaire irréaliste pour « 30 min par jour, sans expérience ».' },
    { texte:'rechargez 40 €', bon:true, aide:'On vous demande de payer pour travailler : est-ce normal ? Cherchez cette demande.', note:'On vous demande de payer pour travailler : signal d’alarme absolu.' },
    { texte:'aucune expérience requise', bon:false, type:'leurre', note:'Ça met en confiance, mais ce n’est pas en soi la preuve d’une arnaque.' }
  ],
  'chat-faux-numero-invest': [
    { texte:'je me suis trompée de numéro', bon:true, aide:'Ce message vous était-il vraiment destiné ? Cherchez le prétexte utilisé pour engager la conversation.', note:'Ce message ne vous était pas destiné, et pourtant la conversation continue. C’est cela qui se vérifie ici : une vraie erreur de numéro s’arrête à l’excuse.' },
    { texte:'C’était sympa d’échanger', bon:true, aide:'Pourquoi cet inconnu, censé s’être trompé, revient-il vous parler ? Cherchez ce qui crée le lien.', note:'L’inconnu revient et se rend sympathique : il tisse un lien pour gagner votre confiance sur la durée.' },
    { texte:'j’ai gagné 32 % en trois semaines', bon:true, aide:'Un tel rendement est-il réaliste ? Cherchez la promesse de gains.', note:'Gains énormes et rapides : promesse irréaliste, marque de l’arnaque à l’investissement.' },
    { texte:'on commence avec 250 € seulement', bon:true, aide:'Que vous demande-t-on de faire de votre argent, et sur quelle plateforme ?', note:'On vous pousse à verser de l’argent sur une plateforme qu’ELLE indique : c’est le piège.' },
    { texte:'entre Paris et Singapour', bon:false, type:'leurre', note:'Ces détails de vie donnent une impression de vrai… mais ils sont inventés pour faire sérieux.' }
  ],
  'email-airbnb-horsplateforme': [
    { texte:'directement entre nous', bon:true, aide:'Où vous propose-t-on de payer ? Est-ce bien sur le site de réservation officiel ?', note:'Payer « en direct », hors de la plateforme, vous prive de toute protection.' },
    { texte:'par virement bancaire', bon:true, aide:'Ce moyen de paiement vous protège-t-il ? Un virement se récupère-t-il facilement ?', note:'Un virement à un particulier est quasi impossible à récupérer : moyen favori des escrocs.' },
    { texte:'marco.rivas.locations@gmail.com', bon:true, aide:'Un vrai message passant par la plateforme viendrait-il d’une adresse Gmail personnelle ?', note:'Adresse Gmail personnelle : rien ne passe par le site officiel de réservation.' },
    { texte:'deux autres familles', bon:true, aide:'Cherchez ce qui vous pousse à vous décider en vitesse.', note:'Rareté artificielle : « d’autres sont intéressés » pour vous faire payer avant de réfléchir.' },
    { texte:'je ne pourrai pas garder les dates bien longtemps', bon:true, aide:'Cherchez la phrase qui vous met la pression du temps pour ne pas vous laisser réfléchir.', note:'Ton d’urgence : « ne tardez pas », « je ne pourrai pas garder les dates » — on veut vous faire payer avant que vous ne réfléchissiez.' },
    { texte:'Merci pour votre intérêt', bon:false, type:'neutre', note:'Formule de politesse : agréable, mais ce n’est pas là qu’est le piège.' }
  ],
  'email-prenom-detourne': [
    { texte:'Vous serez débité de 447,00', bon:true, aide:'Un simple prénom contient-il une phrase sur de l’argent et un IBAN ? Cherchez ce qui n’a rien à faire dans un « Bonjour ».', note:'Un « prénom » qui parle d’argent, d’IBAN et de prélèvements : ce texte a été glissé dans le champ prénom à la place de votre nom.' },
    { texte:'0259509226', bon:true, aide:'Que cherche-t-on à vous faire faire ? Repérez le numéro à appeler : c’est là qu’est le piège.', note:'Le message fournit lui-même le numéro à rappeler. Rien de ce que vous avez sous les yeux ne dit qui décrochera : un numéro ne se vérifie pas. On rappelle toujours par un canal qu’on est allé chercher soi-même.' },
    { texte:'no-reply@welcometothejungle.com', bon:false, type:'neutre', note:'L’adresse est bien celle du vrai site, correctement orthographiée : cet e-mail vient réellement de Welcome to the Jungle. L’expéditeur n’est donc pas ce qui cloche ici.' }
  ],
  'sms-banque-ok': [
    { texte:'Appelez le numéro figurant au dos de votre carte', bon:true, aide:'Cherchez ce qui vous renvoie vers un moyen sûr, que vous contrôlez vous-même.', note:'On vous renvoie vers un canal officiel que VOUS maîtrisez.' },
    { texte:'Nous ne vous demanderons jamais vos codes', bon:true, aide:'Cherchez la phrase qui promet de ne jamais réclamer vos codes.', note:'Une vraie banque le rappelle : elle ne demande jamais vos codes.' },
    { texte:'CIC', bon:false, type:'neutre', note:'Un nom d’expéditeur de SMS ou d’e-mail s’écrit librement : n’importe qui peut signer « CIC ». Reconnaître sa banque ne prouve donc rien — ce qui rend ce message fiable, c’est qu’il ne demande ni code, ni clic.' },
    { texte:'54,90 € chez FNAC', bon:false, type:'neutre', note:'C’est juste l’info de l’achat : ni bon ni mauvais signe en soi.' }
  ],
  'notif-connexion-ok': [
    { texte:'Compte Google', bon:true, aide:'D’où vient cette notification ? Cherchez ce qui montre qu’elle vient de l’application officielle.', note:'La notification est poussée par l’application Google installée sur ce téléphone : son origine est vérifiable, contrairement au nom d’expéditeur d’un SMS ou d’un e-mail, qui s’écrit librement.' },
    { texte:'aucune action n’est nécessaire', bon:true, aide:'Cherchez la phrase qui montre qu’il n’y a rien à faire en urgence.', note:'Ton informatif, sans menace : on vous laisse le temps de vérifier au lieu de vous presser.' },
    { texte:'depuis l’application Google, rubrique Sécurité', bon:true, aide:'Cherchez ce qui vous renvoie vers l’appli officielle plutôt que vers un lien à cliquer.', note:'On vous renvoie vers l’appli que vous ouvrez vous-même, pas vers un lien à cliquer : c’est vous qui gardez la main.' },
    { texte:'Nouvelle connexion sur Windows', bon:false, type:'neutre', note:'Cette phrase fait peur, et c’est normal : elle décrit un vrai risque. Mais une phrase alarmante n’est ni une preuve d’arnaque, ni une preuve du contraire. Ce qui départage, c’est ce qu’on vous demande de faire — ici, rien d’urgent.' }
  ],
  'chat-ami-ok': [
    { texte:'Jacqueline (voisine)', bon:true, aide:'Regardez qui écrit : est-ce un contact que vous connaissez et avez enregistré ?', note:'Contact connu et enregistré : c’est bien votre voisine.' },
    { texte:'le café demain 15h', bon:true, aide:'Cherchez ce qui correspond à votre vie de tous les jours.', note:'Un rendez-vous cohérent avec votre vie réelle.' },
    { texte:'N’apporte rien, juste toi', bon:true, aide:'Vous demande-t-on de l’argent ou des informations ? Cherchez ce qui prouve que non.', note:'Aucune demande d’argent ni d’information : tout va bien.' }
  ],
  'sms-code-ok': [
    { texte:'Ne le communiquez jamais à personne', bon:true, aide:'Cherchez le rappel de sécurité tout à fait normal au sujet de ce code.', note:'Rappel de sécurité normal : le code ne se donne pas.' },
    { texte:'valable 5 minutes', bon:true, aide:'Cherchez le détail technique habituel d’un vrai code de connexion.', note:'Détail technique habituel d’un vrai code de connexion.' },
    { texte:'483 920', bon:false, type:'neutre', note:'Le code lui-même n’est pas un indice : ce qui compte, c’est de ne jamais le donner.' }
  ],
  'notif-virement-ok': [
    { texte:'Ma Banque', bon:true, aide:'D’où vient cette notification ? Cherchez ce qui montre qu’elle vient de votre appli bancaire.', note:'Retenez la différence, elle vaut pour tout le jeu. Une notification est POUSSÉE par une application que vous avez installée vous-même : personne d’autre ne peut en envoyer à sa place, son origine est donc fiable. Le nom d’expéditeur d’un SMS ou d’un e-mail, lui, est simplement du texte que l’expéditeur choisit : n’importe qui peut signer « CIC », « DGFIP » ou « ameli ». Un nom affiché ne prouve jamais rien ; une notification d’application, si.' },
    { texte:'Solde consultable dans votre application', bon:true, aide:'Cherchez ce qui vous renvoie à l’appli, sans lien ni urgence.', note:'On vous renvoie à l’appli, sans lien ni action urgente : c’est vous qui allez vérifier, à votre rythme.' },
    { texte:'Paul Durand', bon:false, type:'neutre', note:'Le nom de l’émetteur n’est qu’une ligne de texte recopiée avec le virement : la banque ne l’a pas vérifiée pour vous. Le connaître ne prouve rien, ne pas le connaître non plus. Ce qui rassure ici, c’est l’origine de la notification et le fait qu’on ne vous demande rien.' }
  ],
  'email-newsletter-ok': [
    { texte:'contact@restosducoeur.org', bon:true, aide:'Regardez l’adresse de l’expéditeur : est-elle cohérente avec l’organisme ?', note:'Adresse cohérente avec l’organisme : bon signe.' },
    { texte:'vous désinscrire à tout moment', bon:true, aide:'Cherchez le lien de désinscription clair, comme la loi l’exige.', note:'Lien de désinscription clair, comme l’exige la loi.' },
    { texte:'Merci de votre fidélité', bon:false, type:'neutre', note:'Formule de politesse : agréable, mais pas un indice.' }
  ],
  'chat-famille-ok': [
    { texte:'Sophie (ma fille)', bon:true, aide:'Regardez qui écrit : est-ce bien son numéro habituel, déjà enregistré ?', note:'Contact connu, sur son numéro habituel.' },
    { texte:'spectacle de danse de Léa', bon:true, aide:'Cherchez le détail personnel qui colle à votre vie de famille.', note:'Contenu personnel cohérent avec votre vie.' },
    { texte:'comme prévu', bon:true, aide:'Cherchez ce qui montre qu’on parle d’un projet déjà convenu ensemble.', note:'Se réfère à un projet réel déjà convenu : rien d’anormal.' }
  ],
  'appel-medecin-ok': [
    { texte:'Cabinet du Dr Martin', bon:true, aide:'Cherchez ce qui identifie clairement la personne qui appelle.', note:'Interlocuteur clairement identifié.' },
    { texte:'confirmer votre rendez-vous', bon:true, aide:'Cherchez ce qui montre qu’on confirme seulement un rendez-vous que vous connaissez.', note:'On confirme seulement un rendez-vous que vous connaissez.' },
    { texte:'apporter votre carte Vitale', bon:true, aide:'Vous demande-t-on des numéros au téléphone, ou juste de la présenter sur place ?', note:'On la présente sur place — on ne demande pas ses numéros au téléphone.' }
  ],
  'email-fausse-boutique-liquidation': [
    { texte:'contact@velo-discount-shop.top', bon:true, aide:'Regardez l’adresse de l’expéditeur : correspond-elle à une vraie marque connue ?', note:'Le domaine finit par « .top » : une extension à quelques euros, que les boutiques établies n’utilisent pas. Et « velo-discount-shop » ne correspond à aucune enseigne existante — cherchez ce nom, vous ne trouverez aucun magasin derrière.' },
    { texte:'149 € au lieu de 899 €', bon:true, aide:'Cette réduction vous semble-t-elle réaliste pour un vélo électrique ?', note:'Réduction énorme et invraisemblable : signe classique de fausse boutique.' },
    { texte:'Stock très limité', bon:true, aide:'Cherchez ce qui vous pousse à acheter tout de suite sans réfléchir.', note:'Fausse rareté pour vous faire acheter dans la précipitation.' },
    { texte:'Paiement 100 % sécurisé', bon:false, type:'leurre', note:'Une fausse boutique peut très bien écrire « paiement sécurisé » : l’affirmation seule ne prouve rien.' }
  ],
  'email-prime-video-paiement': [
    { texte:'support@prime-video-facturation.com', bon:true, aide:'Regardez l’adresse complète de l’expéditeur : est-ce le vrai domaine du service ?', note:'Domaine inventé, sans rapport avec le vrai service de streaming.' },
    { texte:'suspendu sous 48h', bon:true, aide:'Cherchez le délai qui vous pousse à agir dans la précipitation.', note:'Urgence artificielle pour vous faire cliquer vite.' },
    { texte:'Mettez à jour vos informations de paiement', bon:true, aide:'Que vous demande-t-on de faire en cliquant sur le bouton ?', note:'Le bouton mène à une fausse page qui réclame votre numéro de carte complet.' },
    { texte:'Échec de paiement', bon:false, type:'neutre', note:'Un vrai service peut aussi écrire ça un jour : ce n’est pas cette phrase seule qui trahit l’arnaque, mais l’adresse et le lien.' }
  ],
  'chat-trop-percu-vente': [
    { texte:'un transporteur passera le récupérer', bon:true, aide:'L’acheteuse vient-elle voir l’objet elle-même ? Cherchez le prétexte pour ne pas se déplacer.', note:'Elle ne vient jamais en personne : prétexte classique pour préparer l’arnaque.' },
    { texte:'renvoyer les 150 € de trop', bon:true, aide:'Que vous demande-t-on de faire avec de l’argent que vous n’avez pas encore reçu ?', note:'Demande de rembourser un « trop-perçu » avant même que l’argent soit arrivé.' },
    { texte:'capture d’écran du virement', bon:true, aide:'Cette « preuve » de paiement montre-t-elle vraiment que l’argent est sur votre compte ?', note:'Une capture d’écran se fabrique facilement : ce n’est pas une preuve que l’argent est arrivé.' },
    { texte:'200 €', bon:false, type:'neutre', note:'Le prix de l’objet lui-même n’est pas un indice : c’est autour de lui que se joue l’arnaque.' }
  ],
  'sms-remboursement-impots': [
    { texte:'DGFIP', bon:false, type:'neutre', note:'Un nom d’expéditeur de SMS ou d’e-mail s’écrit librement : n’importe qui peut signer « DGFIP ». Il ne prouve rien — ni qu’un message est faux, ni qu’il est vrai.' },
    { texte:'https://remboursement-impots-particuliers.com', bon:true, aide:'Le vrai site des impôts, c’est impots.gouv.fr. Cette adresse lui ressemble-t-elle ?', note:'Ce n’est pas impots.gouv.fr : lien piégé.' },
    { texte:'complétez vos coordonnées bancaires', bon:true, aide:'Si vous avez déjà été remboursé par le passé, l’administration a-t-elle besoin que vous ressaisissiez vos coordonnées bancaires ?', note:'L’administration a déjà votre RIB si vous avez déjà été remboursé : elle ne le redemande pas par SMS.' }
  ],
  'chat-leboncoin-paiement-securise-ok': [
    { texte:'Paiement Leboncoin', bon:true, aide:'Comment l’acheteuse propose-t-elle de régler ? Cherchez le système de paiement utilisé.', note:'Le paiement passe par le système sécurisé de la plateforme, pas par un virement direct.' },
    { texte:'bien récupéré l’article', bon:true, aide:'À quel moment l’argent est-il débloqué pour vous ?', note:'L’argent n’est débloqué qu’après la remise réelle de l’objet : ni vous ni elle ne risquez rien.' },
    { texte:'À samedi', bon:false, type:'neutre', note:'Formule de politesse : agréable, mais ce n’est pas là qu’est l’information importante.' }
  ],
  'image-deepfake-manifestation': [
    { texte:'__IMG__', bon:true, aide:'Regardez l’image de près : les visages dans la foule, les inscriptions sur les casques vous paraissent-ils cohérents ? Cliquez dessus.', note:'Zoomez : chiffres sans signification sur les casques, visages flous ou déformés en arrière-plan — signes d’une image générée par IA.' },
    { texte:'Ce qu’ils ne veulent pas que vous voyiez', bon:true, aide:'Cherchez la formule qui joue sur le complot et l’émotion.', note:'Formule complotiste classique pour faire réagir sans vérifier.' },
    { texte:'Partagé 62 000 fois', bon:false, type:'neutre', note:'Le nombre de partages ne prouve rien : le faux circule aussi vite, voire plus vite, que le vrai.' }
  ],
  'chat-faux-profil-rencontre': [
    { texte:'ingénieur, actuellement en mission sur une plateforme pétrolière offshore', bon:true, aide:'Pourquoi cette personne est-elle si difficile à joindre ou à rencontrer en vrai ? Cherchez le prétexte.', note:'Métier classique qui justifie d’être loin et indisponible.' },
    { texte:'On discute depuis 3 semaines', bon:true, aide:'Cette relation évolue-t-elle à une vitesse normale ?', note:'Relation qui progresse très vite en ligne : signal d’alerte.' },
    { texte:'400 € de frais', bon:true, aide:'Que finit-on toujours par vous demander dans ce genre d’échange ?', note:'Demande d’argent : le signe qui ne trompe jamais.' },
    { texte:'Ton profil m’a tout de suite plu', bon:false, type:'neutre', note:'Compliment banal d’ouverture : agréable, mais pas un indice en soi.' }
  ],
  'chat-fausse-vendeuse-acompte': [
    { texte:'en dehors de Leboncoin', bon:true, aide:'Où vous pousse-t-on à effectuer le paiement, par rapport à la plateforme ?', note:'On vous fait sortir du système sécurisé de la plateforme : signal classique.' },
    { texte:'acompte de 30 € par virement direct', bon:true, aide:'Vous demande-t-on de l’argent avant même d’avoir vu l’objet ?', note:'Demande de paiement direct avant tout contact réel : prudence.' },
    { texte:'ça évite les frais de la plateforme', bon:true, aide:'Quel prétexte utilise-t-on pour justifier de sortir du paiement sécurisé ?', note:'Prétexte classique pour vous faire sortir du paiement sécurisé.' },
    { texte:'toujours disponible', bon:false, type:'neutre', note:'Réponse banale de vendeur : agréable, mais pas un indice en soi.' }
  ],
  'email-clim-aides': [
    { texte:'noreply@mail-cbk-1sa.amberfunnel.com', bon:true, aide:'Regardez l’adresse complète de l’expéditeur : a-t-elle un rapport avec un organisme public ou un installateur ?', note:'« amberfunnel.com » est un outil marketing (« funnel » = entonnoir publicitaire), sans aucun lien avec un organisme public ou un vrai installateur.' },
    { texte:'03:40', bon:true, aide:'Regardez l’heure d’envoi : est-ce une heure normale pour un vrai message professionnel ?', note:'Envoyé à 3h40 du matin : aucune entreprise sérieuse n’écrit à cette heure — signe d’un envoi automatisé de masse.' },
    { texte:'jusqu’à 10 800 €', bon:true, aide:'Ce montant est-il cohérent avec les « 900 € » annoncés juste au-dessus ?', note:'Les chiffres s’empilent sans logique : « 900 € » en gros titre, puis « jusqu’à 10 800 € » plus bas — des maximums théoriques additionnés pour impressionner.' },
    { texte:'sous conditions', bon:false, type:'leurre', note:'Formule vague et rassurante… mais qu’on retrouve aussi dans de vraies publicités : elle ne prouve rien à elle seule.' }
  ],
  'email-ameli-regularisation': [
    { texte:'theintersection@foundryco.com', bon:true, aide:'Le message a les couleurs de l’Assurance Maladie… mais regardez l’adresse complète de l’expéditeur : a-t-elle un rapport avec ameli.fr ?', note:'Adresse d’une société sans aucun lien avec l’Assurance Maladie : le bandeau est copié, l’adresse trahit l’escroc.' },
    { texte:'Madame, Monsieur', bon:true, aide:'Comment vous appelle-t-on ? L’Assurance Maladie sait-elle qui vous êtes ?', note:'L’Assurance Maladie vous appelle par votre nom : cette formule passe-partout sert un envoi de masse.' },
    { texte:'Accéder à mon espace', bon:true, aide:'Que vous propose-t-on de faire, alors que l’argent serait déjà versé ? Où mène ce bouton ?', note:'Le bouton mène à une fausse page ameli qui vole vos identifiants, puis votre RIB.' },
    { texte:'virement bancaire', bon:false, type:'leurre', note:'C’est bien ainsi que l’Assurance Maladie rembourse : cette ligne-là est vraie, elle ne trahit rien. Le piège est ailleurs.' }
  ],
  'popup-faux-captcha': [
    { texte:'Windows + R', bon:true, aide:'Que vous demande-t-on de faire, exactement ? Un site web a-t-il besoin d’ouvrir une fenêtre de votre ordinateur ?', note:'Aucun site n’a besoin que vous ouvriez une fenêtre de l’ordinateur. C’est le vrai signal d’alarme.' },
    { texte:'Ctrl + V', bon:true, aide:'« Coller »… mais qu’avez-vous copié ? Cherchez l’étape qui vous fait coller quelque chose.', note:'On vous fait coller un texte que vous n’avez jamais copié : c’est la page qui l’a mis dans le presse-papiers, à votre insu.' },
    { texte:'appuyez sur Entrée', bon:true, aide:'Cherchez le geste qui déclenche tout, celui après lequel on ne peut plus revenir en arrière.', note:'C’est ce dernier geste qui exécute la commande. Tant qu’on n’a pas validé, rien n’est fait.' },
    { texte:'obligatoire pour accéder à la page', bon:true, aide:'Cherchez ce qui vous laisse croire que vous n’avez pas le choix.', note:'On vous fait croire qu’il n’y a pas d’alternative. Il y en a toujours une : fermer l’onglet.' },
    { texte:'b2f705a9136c2f36', bon:false, type:'leurre', note:'Un vrai contrôle anti-robot affiche bien un identifiant de ce genre. Ce n’est pas lui qui trahit l’arnaque — c’est ce qu’on vous demande de faire.' }
  ],

  /* ---- Cartes fiables : elles ont autant besoin d'une enquête que les autres.
     Sans repères, l'absence d'étape « Enquêtez » trahissait le verdict. ---- */
  'email-impots-ok': [
    { texte:'ne-pas-repondre@dgfip.finances.gouv.fr', bon:true, aide:'Le nom affiché ne prouve rien : regardez l’adresse complète, juste en dessous. Par quoi se termine-t-elle ?', note:'L’adresse se termine par .gouv.fr, un domaine que seul l’État peut utiliser. C’est l’adresse complète qui est vérifiable, jamais le nom affiché au-dessus.' },
    { texte:'consultable dans votre espace particulier', bon:true, aide:'Où vous envoie-t-on pour lire ce document ? Vers un lien du message, ou vers un espace que vous ouvrez vous-même ?', note:'On vous renvoie vers votre espace, que vous ouvrez vous-même en tapant l’adresse. Aucun lien à cliquer dans le message : c’est vous qui gardez la main.' },
    { texte:'Aucune démarche n’est nécessaire', bon:true, aide:'Cherchez ce qui vous dit qu’il n’y a rien à faire, ni tout de suite ni plus tard.', note:'Rien ne vous est demandé, et aucun délai ne vous est imposé. Une arnaque a besoin que vous fassiez quelque chose : celle-ci ne vous demande rien.' },
    { texte:'Mes documents', bon:false, type:'neutre', note:'Le nom exact d’une rubrique fait sérieux, mais il se recopie depuis le vrai site en deux minutes. Un faux mail cite lui aussi les bonnes rubriques : ce détail ne rend pas ce message fiable.' }
  ],
  'sms-livraison-ok': [
    { texte:'Suivi disponible dans l’application La Poste', bon:true, aide:'Comment vous propose-t-on de suivre le colis ? Par un lien, ou par quelque chose que vous ouvrez vous-même ?', note:'On vous renvoie vers l’application officielle que vous ouvrez vous-même. Le SMS piégé, lui, contient toujours un lien : c’est la différence qui compte.' },
    { texte:'avec votre numéro de colis', bon:true, aide:'De quoi avez-vous besoin pour vérifier ? D’une information que vous détenez déjà, ou d’une information à donner ?', note:'On vous demande de vérifier avec une information que vous avez déjà. À aucun moment on ne vous réclame vos coordonnées ni votre carte.' },
    { texte:'sera livré aujourd’hui entre 14h et 16h', bon:true, aide:'Que fait ce message, au fond : vous annonce-t-il quelque chose, ou vous demande-t-il quelque chose ?', note:'Le message annonce un créneau et s’arrête là. Un vrai transporteur informe ; il ne réclame jamais deux euros de « frais » pour libérer un colis.' },
    { texte:'Colissimo', bon:false, type:'neutre', note:'Un nom d’expéditeur de SMS ou d’e-mail s’écrit librement : n’importe qui peut signer « Colissimo ». Il ne prouve rien — ni qu’un message est faux, ni qu’il est vrai.' }
  ],
  'appel-banque-fraude-ok': [
    { texte:'Je ne vous demanderai aucun code', bon:true, aide:'Que vous demande-t-on de dire ou de faire pendant l’appel ? Cherchez la phrase qui répond à cette question.', note:'C’est la phrase qui tranche. Un faux conseiller a besoin d’un code, d’un mot de passe ou d’une validation dans l’appli : sans cela, il n’a rien.' },
    { texte:'rappelez le numéro au dos de votre carte', bon:true, aide:'Vers quel numéro vous renvoie-t-on : un numéro donné pendant l’appel, ou un numéro que vous possédez déjà ?', note:'On vous renvoie vers un numéro que vous détenez déjà, sur votre propre carte. Un escroc ne peut pas vous envoyer là : il perdrait la main.' },
    { texte:'a été bloqué sur votre carte', bon:true, aide:'L’opération est-elle encore en cours, ou déjà réglée ? Cherchez ce qui vous dit qu’il n’y a rien à faire dans l’urgence.', note:'L’achat est déjà bloqué : il n’y a plus d’urgence, donc plus de raison de vous précipiter. Une vraie banque bloque d’abord et informe ensuite.' },
    { texte:'CIC — service fraude', bon:false, type:'neutre', note:'Le nom et le numéro qui s’affichent pendant un appel se truquent (« spoofing ») : ils ne prouvent ni que c’est votre banque, ni le contraire. Ce qui rend cet appel fiable, c’est qu’on ne vous demande rien.' }
  ],
  'notif-ameli-ok': [
    { texte:'ameli', bon:true, aide:'D’où sort cette notification : d’une application installée sur votre téléphone, ou d’un message envoyé par quelqu’un ?', note:'Cette notification est poussée par l’application ameli, que vous avez installée vous-même : personne d’autre ne peut en envoyer à sa place. C’est là toute la différence avec un SMS signé « AMELI-INFO », dont le nom s’écrit librement.' },
    { texte:'consultable dans l’onglet', bon:true, aide:'Où vous emmène-t-on pour voir le détail : vers l’extérieur, ou à l’intérieur de l’application ?', note:'Tout se passe dans l’application, sans aucun lien vers l’extérieur. Le faux SMS ameli, lui, ne sert qu’à vous faire sortir vers une fausse page.' },
    { texte:'Le détail de vos derniers remboursements', bon:true, aide:'Que vous demande-t-on de fournir en échange de cette information ?', note:'Rien ne vous est réclamé : ni RIB, ni numéro de sécurité sociale, ni identifiant. Une notification qui informe sans rien demander n’a aucun intérêt pour un escroc.' },
    { texte:'Un nouveau remboursement est disponible', bon:false, type:'neutre', note:'« Un remboursement disponible », c’est exactement l’appât du faux SMS ameli. La phrase est la même : ce qui change, c’est qu’ici on ne vous demande rien pour l’obtenir.' }
  ],
  'email-commande-ok': [
    { texte:'commandes@natureetdecouvertes.com', bon:true, aide:'Le nom affiché ne prouve rien : regardez l’adresse complète. Correspond-elle vraiment à l’enseigne ?', note:'L’adresse complète correspond au site où vous avez acheté. C’est elle qui est vérifiable — le nom affiché au-dessus, lui, s’écrit librement.' },
    { texte:'Bonjour Madame Renard', bon:true, aide:'Comment vous appelle-t-on : par votre nom, ou par une formule qui vaut pour tout le monde ?', note:'On vous nomme correctement, parce que la boutique vous connaît. Un envoi de masse écrit « Cher client » : il ignore à qui il parle.' },
    { texte:'à l’adresse enregistrée dans votre compte', bon:true, aide:'Vous redemande-t-on quelque chose que vous avez déjà donné ?', note:'Rien ne vous est redemandé : ni adresse, ni carte, ni identifiant. Le faux « problème de paiement » qui arrive après un vrai achat, lui, réclame toujours de ressaisir la carte.' },
    { texte:'n° 4471902', bon:false, type:'neutre', note:'Un numéro de commande fait sérieux, mais il s’invente en trois secondes. Ce qui rend ce message fiable, c’est que la commande existe et que rien ne vous est demandé.' }
  ],
  'sms-pharmacie-ok': [
    { texte:'votre traitement commandé mardi', bon:true, aide:'Ce message parle-t-il de quelque chose que vous avez engagé vous-même ?', note:'Le message répond à une démarche que vous avez faite vous-même, mardi. Une arnaque, elle, tombe sur un événement que vous n’avez jamais déclenché.' },
    { texte:'Vous pouvez le retirer aux horaires d’ouverture', bon:true, aide:'Que vous propose-t-on de faire : cliquer, payer, ou vous déplacer ?', note:'On vous invite à passer à la boutique, en personne. Il n’y a rien à cliquer, rien à payer en ligne, rien à confirmer.' },
    { texte:'du lundi au samedi 9h-19h30', bon:true, aide:'Le contenu du message est-il vérifiable sans rien donner de vous ?', note:'Une information pratique, vérifiable en passant devant la pharmacie. Le message ne contient ni lien, ni pièce jointe, ni question : il n’y a rien à voler dedans.' },
    { texte:'PharmacieCentrale', bon:false, type:'neutre', note:'Un nom d’expéditeur de SMS ou d’e-mail s’écrit librement : n’importe qui peut signer « PharmacieCentrale ». Il ne prouve rien — ni qu’un message est faux, ni qu’il est vrai.' }
  ],
  'chat-petitfils-ok': [
    { texte:'Théo (petit-fils)', bon:true, aide:'D’où vient ce nom : la personne l’a-t-elle écrit elle-même, ou est-ce vous qui l’avez enregistré ?', note:'Ce nom n’est pas écrit par l’expéditeur : c’est vous qui avez enregistré ce contact dans votre téléphone, et le message arrive dans la conversation habituelle. Un inconnu, lui, apparaîtrait comme un numéro.' },
    { texte:'je suis pris à la fac de Rennes', bon:true, aide:'Ce contenu est-il vérifiable auprès de quelqu’un d’autre que la personne qui écrit ?', note:'Un fait précis, que n’importe qui dans la famille peut confirmer. Le faux proche, lui, reste vague et coupe court dès qu’on veut vérifier.' },
    { texte:'tu me feras ton gratin ?', bon:true, aide:'De quoi parle ce message : d’argent, ou de votre vie commune ?', note:'La conversation continue une histoire que vous partagez depuis longtemps. Aucune demande d’argent, aucun code, aucun lien : rien à faire.' },
    { texte:'Salut Mamie !', bon:false, type:'neutre', note:'Un escroc commence lui aussi par « Salut Mamie ». L’appellation affectueuse ne prouve rien : ce qui rassure ici, c’est le numéro déjà enregistré et l’absence de toute demande.' }
  ],
  'email-mutuelle-ok': [
    { texte:'info@harmonie-mutuelle.fr', bon:true, aide:'Regardez l’adresse complète de l’expéditeur : le domaine, après l’arobase, correspond-il à l’organisme ?', note:'Le domaine après l’arobase correspond à la mutuelle, et il ne s’invente pas comme un simple nom affiché. C’est la seule partie de l’en-tête qui se vérifie.' },
    { texte:'au numéro figurant sur votre carte de tiers payant', bon:true, aide:'Quel numéro vous donne-t-on pour rappeler : un numéro écrit dans le mail, ou un numéro que vous avez déjà ?', note:'On vous renvoie au numéro inscrit sur VOTRE carte, pas à un numéro donné dans le message. C’est exactement ce qu’un escroc ne peut pas se permettre.' },
    { texte:'versés automatiquement sur votre compte habituel', bon:true, aide:'Vous demande-t-on vos coordonnées bancaires ? Cherchez ce qui montre que non.', note:'Aucun RIB n’est demandé, parce que la mutuelle a déjà le vôtre : elle vous rembourse depuis des années. Un organisme qui vous redemande votre RIB par mail est un faux.' },
    { texte:'Harmonie Mutuelle', bon:false, type:'neutre', note:'Le nom affiché s’écrit librement : un faux message peut afficher « Harmonie Mutuelle » aussi bien qu’un vrai. C’est l’adresse complète, juste en dessous, qui est vérifiable.' }
  ],
  'notif-maj-appli-ok': [
    { texte:'Play Store', bon:true, aide:'D’où sort cette notification : d’une application du téléphone, ou d’une fenêtre apparue en naviguant ?', note:'Cette notification est poussée par le magasin d’applications du téléphone, qui gère lui-même les mises à jour. La fausse alerte au virus, elle, apparaît dans le navigateur, sur une page web.' },
    { texte:'Aucune action n’est requise', bon:true, aide:'Que vous demande-t-on d’installer, de cliquer ou d’appeler ?', note:'Rien à cliquer, rien à installer, aucun numéro à appeler. Le faux support technique, lui, ne vit que de l’action qu’il vous arrache.' },
    { texte:'ont été mises à jour automatiquement', bon:true, aide:'La chose est-elle encore à faire, ou déjà faite ?', note:'C’est déjà fait : le message constate, il ne réclame pas. Une vraie mise à jour est discrète et ne vous met jamais en scène.' },
    { texte:'Ma Banque', bon:false, type:'neutre', note:'Voir le nom de vos vraies applications rassure, mais cette notification vient du magasin d’applications, pas d’elles. Un nom cité dans un texte ne prouve rien : c’est l’origine de la notification qui compte.' }
  ],
  'email-abonnement-ok': [
    { texte:'abonnements@lemonde.fr', bon:true, aide:'Regardez l’adresse complète : le domaine, après l’arobase, est-il bien celui du journal ?', note:'Le domaine après l’arobase est celui du journal auquel vous êtes abonné. C’est la partie vérifiable de l’en-tête, contrairement au nom affiché.' },
    { texte:'modifier ou résilier votre abonnement à tout moment depuis votre compte', bon:true, aide:'Vous laisse-t-on le choix ? Cherchez ce qui vous rend la main.', note:'On vous rappelle que vous pouvez partir, depuis votre compte que vous ouvrez vous-même. Une arnaque ne vous rend jamais la main : elle vous enferme.' },
    { texte:'Aucune action n’est nécessaire', bon:true, aide:'Y a-t-il un bouton de paiement, une carte à ressaisir, une date couperet ?', note:'Aucun bouton de paiement, aucune carte à ressaisir, et un mois de délai. Le faux avis de renouvellement, lui, annonce un échec de paiement et exige la carte tout de suite.' },
    { texte:'au tarif de 99 €', bon:false, type:'neutre', note:'Le montant saute aux yeux, et c’est justement sur lui que jouent les faux avis de prélèvement. Un chiffre ne prouve rien : ce qui compte, c’est qu’on ne vous demande ni carte, ni clic.' }
  ],
  'appel-mairie-ok': [
    { texte:'Vous recevrez une invitation par courrier', bon:true, aide:'Cet appel restera-t-il une parole en l’air, ou en aurez-vous une trace ?', note:'Une confirmation écrite est annoncée : vous pourrez tout relire à tête reposée. Un escroc a besoin que tout se règle pendant l’appel, sans trace.' },
    { texte:'Rien à régler, rien à signer aujourd’hui', bon:true, aide:'Que vous demande-t-on de décider tout de suite ?', note:'Aucune décision immédiate ne vous est arrachée. Le démarchage abusif, lui, vit de la signature obtenue avant que vous ayez pu réfléchir.' },
    { texte:'C’est offert par la commune', bon:true, aide:'Y a-t-il de l’argent en jeu ? Cherchez la réponse à votre propre question.', note:'On répond franchement à votre question sur l’argent : il n’y en a pas. Aucune coordonnée bancaire n’est demandée, à aucun moment.' },
    { texte:'02 96 41 12 08', bon:false, type:'neutre', note:'Un numéro local, qui ressemble à celui de votre commune, ne prouve rien : l’afficheur se truque (« spoofing »). Ce qui rend cet appel fiable, c’est qu’on ne vous demande ni argent, ni signature.' }
  ],
  'sms-rdv-ok': [
    { texte:'Pour annuler, connectez-vous à votre compte Doctolib', bon:true, aide:'Comment vous propose-t-on d’annuler : par un lien du message, ou par votre compte ?', note:'On vous renvoie à votre compte, que vous ouvrez vous-même. Aucun lien ne figure dans le message : c’est vous qui allez chercher l’information.' },
    { texte:'Dr Nguyen (cardiologie)', bon:true, aide:'Le rendez-vous annoncé correspond-il à quelque chose que vous avez fait vous-même ?', note:'Le praticien est nommé, et c’est vous qui avez pris ce rendez-vous. Un faux rappel reste flou sur l’essentiel, parce qu’il ne sait rien de vous.' },
    { texte:'demain 15/08 à 10h30, 4 rue des Lilas', bon:true, aide:'Ces informations sont-elles vérifiables sans rien donner de vous ?', note:'Date, heure et adresse sont précises et se recoupent avec votre agenda. Surtout, rien n’est demandé en retour : ni paiement, ni « confirmation » par carte.' },
    { texte:'Doctolib', bon:false, type:'neutre', note:'Un nom d’expéditeur de SMS ou d’e-mail s’écrit librement : n’importe qui peut signer « Doctolib ». Il ne prouve rien — ni qu’un message est faux, ni qu’il est vrai.' }
  ],
  'email-syndic-ok': [
    { texte:'Le même dossier vous parviendra par courrier recommandé', bon:true, aide:'Ce message est-il le seul moyen d’obtenir ce document ? Cherchez le second canal.', note:'Le même dossier arrive aussi par la poste : vous pourrez recouper les deux. Un escroc évite soigneusement tout second canal, parce qu’il ne le contrôle pas.' },
    { texte:'copropriete@cabinet-berthier.fr', bon:true, aide:'Regardez l’adresse complète : le domaine correspond-il au syndic que vous connaissez ?', note:'Le domaine après l’arobase est celui de votre syndic, celui qui figure sur vos appels de charges. C’est la partie vérifiable de l’en-tête.' },
    { texte:'les devis reçus pour la réfection du hall', bon:true, aide:'Le contenu correspond-il à quelque chose de réel dans votre immeuble ?', note:'Le message parle d’un dossier réellement en cours chez vous, que vos voisins connaissent aussi. Un faux syndic, lui, invente un motif générique.' },
    { texte:'en pièce jointe', bon:false, type:'neutre', note:'Une pièce jointe fait peur, à juste titre : c’est le véhicule favori des virus. Mais celle-ci est attendue, elle vient d’un expéditeur connu, et son contenu arrive aussi par la poste. Ce n’est pas la pièce jointe qui décide, c’est le fait qu’elle soit attendue ou non.' }
  ],
  'email-facture-energie-ok': [
    { texte:'contact@edf.fr', bon:true, aide:'Regardez l’adresse complète de l’expéditeur : le domaine est-il celui du fournisseur ?', note:'Le domaine après l’arobase est celui du fournisseur, et il ne s’invente pas comme un nom affiché. C’est la partie de l’en-tête que vous pouvez vérifier.' },
    { texte:'Ce montant comprend la régularisation annuelle de votre consommation', bon:true, aide:'Le message explique-t-il d’où sort la somme, ou se contente-t-il de vous alarmer ?', note:'Le message explique lui-même d’où vient la somme, calcul à l’appui. Un faux mail ne fait jamais cela : il a besoin que vous paniquiez, pas que vous compreniez.' },
    { texte:'sur le compte habituel', bon:true, aide:'Vous annonce-t-on un changement de compte bancaire ? Cherchez la réponse.', note:'Aucun nouveau compte n’est annoncé : le prélèvement se fait comme les mois précédents. C’est précisément là qu’opère la fraude au changement de RIB, et il n’y en a pas trace ici.' },
    { texte:'214,60 €', bon:false, type:'neutre', note:'C’est le chiffre qui saute aux yeux, et c’est bien celui qu’on regarde en premier. Mais un montant élevé n’est ni une preuve d’arnaque, ni une preuve du contraire : ce qui compte, c’est qu’on ne vous demande ni lien, ni carte, ni nouveau RIB.' }
  ]
};

/* Rendu accessible partout */
if (typeof window !== 'undefined'){
  window.SCENARIOS = SCENARIOS;
  window.GLOSSAIRE = GLOSSAIRE;
  window.REPERES = REPERES;
}
