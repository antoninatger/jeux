/* =========================================================================
   L'Agora en classe — CONTENU FRANÇAIS
   Miroir anglais : debat-data-en.js. Les deux fichiers gardent les mêmes
   `id` et la même structure : seuls les textes sont traduits. La logique,
   elle, n'existe qu'une fois, dans debat.js.

   Les `id` de pièges sont ceux des sophismes de DOJO (dojo-data.js), qui
   fournit aussi leurs noms et leurs définitions : les mêmes mots partout.
   ========================================================================= */
const DEBAT = {

  // ─── Les catégories de thèmes ───
  categories: {
    ecole:    "🏫 Vie au collège et au lycée",
    numerique:"📱 Numérique et réseaux",
    environnement: "🌍 Environnement",
    societe:  "🏛️ Société et citoyenneté",
    sante:    "🧪 Sciences et santé",
    culture:  "🎮 Culture et loisirs",
    philo:    "🤔 Philosophie"
  },
  niveaux: { college: "Collège", lycee: "Lycée", tous: "Collège et lycée" },

  // ─── La banque de thèmes ───
  // q = la question, posée de façon ouverte ; aff = la même idée en
  // affirmation, pour la ligne mouvante. Trois positions, pour éviter dès le
  // départ le faux dilemme ; des pistes sous forme de questions plutôt que de
  // réponses toutes faites. pieges = ce qui risque d'apparaître ;
  // motivations = ce qui peut pousser chaque camp ; bons = un bon argument de
  // chaque côté, pour montrer qu'on peut le reconnaître même chez l'autre.
  themes: [
    { id: "telephone", cat: "ecole", niveau: "college",
      q: "Faut-il interdire le téléphone dans tout l'établissement ?",
      aff: "Le téléphone devrait être interdit partout dans l'établissement, même à la récré.",
      positions: [
        { nom: "Pour l'interdiction totale", pistes: ["Qu'est-ce que le téléphone change à l'attention en classe ?", "Qu'est-ce qui se passe à la récré quand chacun regarde son écran ?"] },
        { nom: "Contre l'interdiction", pistes: ["Comment joindre ses parents en cas d'urgence ?", "Le téléphone peut-il servir à apprendre ?"] },
        { nom: "Autorisé selon les lieux et les moments", pistes: ["Où et quand le téléphone pose-t-il vraiment problème ?", "Qui fixerait les règles, et comment les faire respecter ?"] }
      ],
      pieges: ["pente", "genehat", "adhom"],
      motivations: ["la peur du harcèlement en ligne", "le besoin de rester en contact avec sa famille", "l'envie d'autonomie", "la fatigue des profs qui répètent « range ton téléphone »"],
      bons: ["Une règle claire et commune évite de négocier sans cesse au cas par cas.", "Certains élèves ont besoin de joindre un parent malade ou de prévenir d'un retard."] },

    { id: "devoirs", cat: "ecole", niveau: "college",
      q: "Les devoirs à la maison sont-ils utiles ?",
      aff: "Les devoirs à la maison sont indispensables pour bien apprendre.",
      positions: [
        { nom: "Oui, ils sont utiles", pistes: ["Que se passe-t-il quand on ne revoit jamais une leçon ?", "Les devoirs apprennent-ils à s'organiser seul ?"] },
        { nom: "Non, ils creusent les écarts", pistes: ["Tout le monde a-t-il quelqu'un pour l'aider à la maison ?", "Combien de temps libre reste-t-il après une journée de cours ?"] },
        { nom: "Oui, mais autrement", pistes: ["Quels devoirs aident vraiment, lesquels moins ?", "Et si on les faisait au collège, en étude ?"] }
      ],
      pieges: ["genehat", "popu", "dilemme"],
      motivations: ["la peur de prendre du retard", "le manque de temps libre", "le sentiment d'injustice entre élèves aidés et pas aidés", "l'envie que les parents suivent ce qu'on fait"],
      bons: ["Revenir sur une leçon le soir aide à la retenir plus longtemps.", "Un élève sans aide à la maison part avec un handicap que l'école ne voit pas."] },

    { id: "uniforme", cat: "ecole", niveau: "college",
      q: "Faut-il un uniforme à l'école ?",
      aff: "Tous les élèves devraient porter un uniforme.",
      positions: [
        { nom: "Oui, un uniforme", pistes: ["Les vêtements de marque créent-ils des moqueries ?", "Un uniforme change-t-il l'ambiance d'un établissement ?"] },
        { nom: "Non, chacun s'habille comme il veut", pistes: ["S'habiller, est-ce une façon de s'exprimer ?", "Qui paierait l'uniforme ?"] },
        { nom: "Une tenue commune, mais souple", pistes: ["Un simple haut commun suffirait-il ?", "Qui choisirait la tenue ?"] }
      ],
      pieges: ["pente", "popu", "cherry"],
      motivations: ["la peur des moqueries", "l'envie de montrer qui on est", "le coût pour les familles", "le sentiment d'appartenance"],
      bons: ["Une tenue commune limite les comparaisons entre élèves.", "Les vêtements font partie de la façon dont on se construit, surtout à l'adolescence."] },

    { id: "reseaux15", cat: "numerique", niveau: "tous",
      q: "Faut-il un âge minimum de 15 ans pour les réseaux sociaux ?",
      aff: "Les réseaux sociaux devraient être interdits avant 15 ans.",
      positions: [
        { nom: "Oui, pas avant 15 ans", pistes: ["Que savons-nous des effets des réseaux sur le sommeil et le moral des plus jeunes ?", "À quel âge sait-on repérer une manipulation ?"] },
        { nom: "Non, pas d'interdiction", pistes: ["Comment vérifier l'âge sans ficher tout le monde ?", "Les réseaux servent-ils aussi à garder des amis ?"] },
        { nom: "Autorisé, mais accompagné", pistes: ["Qu'est-ce qu'un usage accompagné voudrait dire ?", "Qui devrait apprendre aux jeunes à s'en servir ?"] }
      ],
      pieges: ["pente", "posthoc", "whatabout", "genehat"],
      motivations: ["la peur du harcèlement", "la peur d'être mis à l'écart du groupe", "l'inquiétude des parents", "l'envie d'être traité en adulte"],
      bons: ["Les plus jeunes sont plus exposés aux contenus choquants et à la pression du groupe.", "Une interdiction qu'on contourne en un clic protège peu, et pousse à cacher ce qu'on fait."] },

    { id: "ia", cat: "numerique", niveau: "tous",
      q: "Peut-on laisser une IA nous aider à faire nos devoirs ?",
      aff: "Utiliser une IA pour ses devoirs, c'est tricher.",
      positions: [
        { nom: "Non, c'est tricher", pistes: ["Qu'apprend-on si une machine fait le travail à notre place ?", "Comment le prof sait-il ce que l'élève a compris ?"] },
        { nom: "Oui, c'est un outil comme un autre", pistes: ["Est-ce si différent d'une calculatrice ou d'un dictionnaire ?", "Ne faut-il pas apprendre à s'en servir, puisqu'on s'en servira plus tard ?"] },
        { nom: "Oui, mais avec des règles", pistes: ["Pour quelles tâches une IA aide-t-elle à apprendre ?", "Comment dire honnêtement qu'on l'a utilisée ?"] }
      ],
      pieges: ["dilemme", "genehat", "halo", "pente"],
      motivations: ["la peur d'être injustement soupçonné", "le manque de temps", "la peur que l'école ne serve plus à rien", "la curiosité pour l'outil"],
      bons: ["Si la machine fait l'exercice, l'élève ne s'entraîne pas.", "Une IA peut réexpliquer une notion autrement, à son rythme, à toute heure."] },

    { id: "vols", cat: "environnement", niveau: "tous",
      q: "Faut-il interdire les vols intérieurs quand le train existe ?",
      aff: "On devrait interdire l'avion quand on peut faire le même trajet en train en moins de quatre heures.",
      positions: [
        { nom: "Oui, interdire", pistes: ["Que pèse l'avion dans les émissions d'un voyage ?", "Le train peut-il absorber tous ces voyageurs ?"] },
        { nom: "Non, laisser le choix", pistes: ["Le train est-il toujours abordable ?", "Que deviennent les régions mal desservies ?"] },
        { nom: "Rendre le train plus attractif plutôt", pistes: ["Qu'est-ce qui ferait choisir le train sans interdire l'avion ?", "Qui paierait ces trains ?"] }
      ],
      pieges: ["whatabout", "cherry", "paille", "pente"],
      motivations: ["l'inquiétude pour le climat", "le prix des billets", "l'emploi dans les aéroports", "le sentiment qu'on demande toujours des efforts aux mêmes"],
      bons: ["Sur un même trajet, le train émet en général beaucoup moins que l'avion.", "Un train trop cher ou trop rare n'est pas une vraie solution pour tout le monde."] },

    { id: "cantine", cat: "environnement", niveau: "tous",
      q: "La cantine devrait-elle être végétarienne deux jours par semaine ?",
      aff: "La cantine devrait proposer des repas végétariens deux jours par semaine.",
      positions: [
        { nom: "Oui, deux jours", pistes: ["Que change la viande au bilan carbone d'un repas ?", "Peut-on manger équilibré sans viande ?"] },
        { nom: "Non, garder la viande chaque jour", pistes: ["Pour certains élèves, la cantine est-elle le seul vrai repas ?", "Que deviennent les éleveurs de la région ?"] },
        { nom: "Laisser le choix chaque jour", pistes: ["Un menu à deux choix est-il possible pour la cuisine ?", "Que se passe-t-il si tout le monde choisit la même chose ?"] }
      ],
      pieges: ["nature", "paille", "pente", "popu"],
      motivations: ["l'inquiétude pour le climat", "le goût et l'habitude", "la défense des éleveurs", "la peur de mal manger"],
      bons: ["Réduire la viande est l'un des moyens les plus simples de baisser l'empreinte d'un repas.", "Un repas végétarien mal pensé peut être moins nourrissant, et la cantine compte beaucoup pour certains élèves."] },

    { id: "vote16", cat: "societe", niveau: "lycee",
      q: "Faut-il abaisser le droit de vote à 16 ans ?",
      aff: "On devrait pouvoir voter dès 16 ans.",
      positions: [
        { nom: "Oui, à 16 ans", pistes: ["Les décisions d'aujourd'hui ne concernent-elles pas d'abord les plus jeunes ?", "Que montrent les pays qui l'ont fait ?"] },
        { nom: "Non, rester à 18 ans", pistes: ["À 16 ans, est-on assez informé, ou trop influencé par ses parents ?", "Pourquoi le vote irait-il avant d'autres droits ?"] },
        { nom: "D'abord pour les élections locales", pistes: ["Commencer par la mairie, est-ce un bon apprentissage ?", "Faudrait-il plus d'éducation civique avant ?"] }
      ],
      pieges: ["adhom", "genehat", "pente", "halo"],
      motivations: ["l'envie d'être écouté", "la peur que les jeunes soient manipulés", "le calcul politique", "le sentiment que l'avenir se décide sans nous"],
      bons: ["Les jeunes vivront le plus longtemps avec les conséquences des décisions prises aujourd'hui.", "Un âge unique pour la majorité et le vote garde les choses simples et cohérentes."] },

    { id: "cameras", cat: "societe", niveau: "lycee",
      q: "Faut-il plus de caméras dans l'espace public ?",
      aff: "Il faudrait installer beaucoup plus de caméras dans les rues.",
      positions: [
        { nom: "Oui, plus de caméras", pistes: ["Les caméras aident-elles à retrouver les auteurs d'un délit ?", "Se sent-on plus en sécurité quand on est filmé ?"] },
        { nom: "Non, c'est trop de surveillance", pistes: ["Qui regarde les images, et combien de temps les garde-t-on ?", "Se comporte-t-on autrement quand on se sait filmé ?"] },
        { nom: "Seulement à certains endroits, avec des règles", pistes: ["Où une caméra est-elle vraiment utile ?", "Quelles règles pour protéger la vie privée ?"] }
      ],
      pieges: ["dilemme", "pente", "popu", "preuve"],
      motivations: ["la peur de l'insécurité", "la défense de la vie privée", "la méfiance envers le pouvoir", "le besoin de se sentir protégé"],
      bons: ["Les images peuvent aider l'enquête quand un délit a déjà eu lieu.", "Une surveillance permanente change notre façon de vivre ensemble, même quand on n'a rien à cacher."] },

    { id: "pubmalbouffe", cat: "sante", niveau: "tous",
      q: "Faut-il interdire la publicité pour la malbouffe aux heures où les enfants regardent ?",
      aff: "La publicité pour les produits trop gras ou trop sucrés devrait être interdite quand les enfants regardent.",
      positions: [
        { nom: "Oui, l'interdire", pistes: ["La publicité influence-t-elle ce que les enfants réclament ?", "Qui est responsable de ce que mangent les enfants ?"] },
        { nom: "Non, c'est aux parents de décider", pistes: ["Peut-on tout interdire de ce qui est mauvais pour la santé ?", "Les publicités ne passent-elles pas de toute façon en ligne ?"] },
        { nom: "Mieux encadrer plutôt qu'interdire", pistes: ["Que changerait une mention claire sur les produits ?", "Et si on apprenait à décoder les pubs à l'école ?"] }
      ],
      pieges: ["paille", "dilemme", "whatabout", "nature"],
      motivations: ["l'inquiétude pour la santé des enfants", "la défense de la liberté de choisir", "l'argent de la publicité", "la peur d'être jugé comme mauvais parent"],
      bons: ["Les jeunes enfants distinguent mal une publicité d'un programme.", "Une interdiction à la télé ne touche pas les écrans où les enfants passent le plus de temps aujourd'hui."] },

    { id: "jeuvideo", cat: "culture", niveau: "tous",
      q: "Le jeu vidéo est-il un art ?",
      aff: "Le jeu vidéo est un art, au même titre que le cinéma ou la peinture.",
      positions: [
        { nom: "Oui, c'est un art", pistes: ["Un jeu peut-il émouvoir comme un film ou un livre ?", "Que font les musiciens, dessinateurs et scénaristes qui y travaillent ?"] },
        { nom: "Non, c'est un divertissement", pistes: ["Un jeu conçu pour qu'on y passe le plus de temps possible est-il une œuvre ?", "Qu'est-ce qui distingue un art d'un loisir ?"] },
        { nom: "Certains jeux, pas tous", pistes: ["Tous les films sont-ils de l'art ?", "Quels critères pour décider ?"] }
      ],
      pieges: ["genehat", "popu", "circulaire", "halo"],
      motivations: ["l'envie que sa passion soit reconnue", "la peur des écrans", "l'attachement aux arts « classiques »", "le plaisir de jouer, tout simplement"],
      bons: ["Un jeu réunit musique, dessin, écriture et mise en scène, comme le cinéma.", "Beaucoup de jeux sont d'abord conçus pour vendre et pour retenir le joueur, pas pour dire quelque chose."] },

    { id: "mentir", cat: "philo", niveau: "lycee",
      q: "A-t-on le droit de mentir pour protéger quelqu'un ?",
      aff: "Mentir est acceptable quand c'est pour protéger quelqu'un.",
      positions: [
        { nom: "Oui, parfois", pistes: ["Que ferais-tu si dire la vérité mettait quelqu'un en danger ?", "Un mensonge peut-il être un acte de gentillesse ?"] },
        { nom: "Non, jamais", pistes: ["Si chacun ment « pour la bonne cause », peut-on encore se faire confiance ?", "Qui décide de ce qui protège l'autre ?"] },
        { nom: "Ça dépend de qui on protège, et de quoi", pistes: ["Mentir pour protéger quelqu'un ou pour se protéger soi-même, est-ce pareil ?", "Existe-t-il une troisième voie : se taire ?"] }
      ],
      pieges: ["dilemme", "pente", "genehat", "circulaire"],
      motivations: ["le souvenir d'un mensonge qui a fait du mal", "l'envie de protéger ses proches", "le besoin de pouvoir faire confiance", "la peur d'être jugé"],
      bons: ["Il existe des situations où la vérité mettrait clairement quelqu'un en danger.", "La confiance entre les gens repose sur l'idée qu'on ne se ment pas, même avec de bonnes intentions."] }
  ],

  // Positions par défaut pour un sujet écrit par le prof.
  positionsLibres: ["Pour", "Contre", "Position nuancée"],

  // ─── Les formats ───
  // phases : déroulé minuté pour la durée « normale » (en minutes) ; la durée
  // choisie par le prof les met à l'échelle. equipes : 0 = pas d'équipes
  // (toute la classe), sinon [min, max, par défaut].
  formats: {
    ligne: {
      emoji: "📏", nom: "La ligne mouvante",
      duree: "15 à 20 min", qui: "Toute la classe", travail: "Changer d'avis, et dire pourquoi",
      resume: "Une ligne au sol, de « tout à fait d'accord » à « pas du tout d'accord ». Le prof lit l'affirmation, les élèves se placent. Tour à tour, un élève de chaque zone donne une raison. Ceux qui sont convaincus se déplacent.",
      regle: "Qui bouge doit dire quelle phrase l'a fait bouger, et si c'était un argument ou un piège.",
      durees: [15, 20], dureeDefaut: 15,
      equipes: 0,
      zones: ["👍 D'accord", "🤔 Partagé", "👎 Pas d'accord"],
      phases: [
        { nom: "Lecture de l'affirmation : chacun se place", min: 1.5 },
        { nom: "Premier tour : une raison par zone", min: 5 },
        { nom: "Déplacements : qui bouge explique pourquoi", min: 4 },
        { nom: "Deuxième tour : les arguments qui manquaient", min: 3 },
        { nom: "Dernier déplacement", min: 1.5 }
      ]
    },
    aquarium: {
      emoji: "🐠", nom: "L'aquarium",
      duree: "30 à 45 min", qui: "4 à 6 au centre, les autres observent", travail: "Écouter, reformuler, repérer les pièges",
      resume: "Quatre à six élèves débattent au centre ; le reste de la classe, autour, a une mission d'observation. Une chaise vide permet à un observateur d'entrer pour une intervention. On change de groupe à mi-parcours.",
      regle: "Avant de répondre, on reformule ce que la personne précédente a dit, jusqu'à ce qu'elle dise « oui, c'est ça ».",
      missions: ["🔍 Repérer les pièges, dans les deux camps", "🪞 Compter les reformulations et les questions", "🤝 Noter les points d'accord"],
      durees: [30, 40, 45], dureeDefaut: 30,
      equipes: [2, 3, 2],
      phases: [
        { nom: "Préparation : chaque camp cherche ses arguments", min: 5 },
        { nom: "Première manche au centre", min: 10 },
        { nom: "Changement : les observateurs prennent place", min: 2 },
        { nom: "Deuxième manche au centre", min: 10 },
        { nom: "Retour des observateurs", min: 3 }
      ]
    },
    vivante: {
      emoji: "🍗", nom: "L'Agora vivante",
      duree: "20 min", qui: "Le prof contre la classe", travail: "Faire s'ouvrir un personnage, comme dans le jeu",
      resume: "Le prof (ou un élève volontaire) incarne un personnage du jeu, avec sa motivation cachée. La classe, en équipes, doit le faire s'ouvrir. L'écran affiche sa jauge d'ouverture, que le prof fait monter ou descendre selon les réponses. À la fin, la classe propose sa motivation cachée.",
      regle: "Une vraie question ou une reformulation fidèle ouvre le personnage ; un coup de massue le braque.",
      durees: [15, 20, 25], dureeDefaut: 20,
      equipes: [2, 4, 3],
      phases: [
        { nom: "Le personnage se présente", min: 2 },
        { nom: "L'échange : chaque équipe à son tour", min: 12 },
        { nom: "Dernière chance de le faire s'ouvrir", min: 3 },
        { nom: "La classe propose sa motivation cachée", min: 3 }
      ]
    }
  },

  // ─── Les personnages de l'Agora vivante ───
  // Ce sont les cinq personnages du jeu. indices = ce que le prof laisse
  // échapper quand la classe l'a bien ouvert (les mêmes que dans le jeu).
  persos: [
    { id: "gerard", emoji: "🍗", nom: "Tonton Gérard", desc: "champion du repas de famille",
      q: "Faut-il manger bio ?",
      position: "« Le bio, c'est des bêtises. De mon temps, on mangeait ce qu'il y avait, et on n'en est pas morts ! »",
      pieges: ["genehat", "nature", "pente", "adhom"],
      motiv: "Il a peur de perdre sa place auprès de vous : le monde change vite, et il se sent dépassé.",
      indices: ["« Tu sais, à mon âge, on a l'impression que plus personne n'écoute ce qu'on a vécu. »", "« Ces repas, c'est tout ce qui nous reste pour être ensemble… Si tu changes tout, il restera quoi ? »", "« Pardon. C'est que… j'ai du mal à suivre tout ce que vous savez, vous, les jeunes. »"] },
    { id: "maxx", emoji: "🤳", nom: "Maxx_Buzz", desc: "influenceur 2,4 M d'abonnés",
      q: "Faut-il croire les avis et les influenceurs en ligne ?",
      position: "« Ma commu ne se trompe jamais. 2,4 millions d'abonnés, ça ne s'invente pas ! »",
      pieges: ["popu", "halo", "posthoc", "preuve"],
      motiv: "Il a peur de perdre ses abonnés, donc ses revenus : il dit ce que les marques lui demandent de dire.",
      indices: ["« Si mes vidéos ne font pas de vues, le mois prochain, je ne paie pas mon loyer. »", "« Honnêtement ? Je ne sais pas si c'est le jus. C'est la phrase que la marque m'a demandé de dire. »", "« J'aimerais faire des vidéos plus honnêtes, mais j'ai peur que plus personne ne les regarde. »"] },
    { id: "brutus", emoji: "🏛️", nom: "Sénateur Brutus", desc: "orateur politique redoutable",
      q: "Faut-il plus de caméras de surveillance en ville ?",
      position: "« C'est simple : soit on installe des caméras partout, soit on accepte l'insécurité totale. »",
      pieges: ["dilemme", "paille", "popu", "adhom"],
      motiv: "Il a peur de perdre l'élection et de décevoir ceux qui ont cru en lui : alors il force le trait.",
      indices: ["« Je l'admets, je caricature. Mes conseillers disent qu'il faut des phrases chocs, sinon personne ne retient rien. »", "« Mon équipe me dit que je recule dans les sondages. Quand j'ai peur, je simplifie tout. »", "« Les gens qui m'ont élu comptent sur moi. Je ne veux pas les décevoir. »"] },
    { id: "complotiste", emoji: "🕵️", nom: "Le Complotiste", desc: "a fait ses propres recherches",
      q: "Peut-on faire confiance aux scientifiques ?",
      position: "« Les scientifiques officiels nous cachent la vérité. Moi, j'ai fait mes propres recherches. »",
      pieges: ["cherry", "circulaire", "posthoc", "preuve"],
      motiv: "Il s'est senti méprisé et seul : dans son groupe en ligne, on l'écoute enfin.",
      indices: ["« Les scientifiques ne m'ont jamais répondu. Dans mon groupe, au moins, on me prend au sérieux. »", "« Un médecin m'a parlé comme à un idiot, une fois. Depuis, je préfère me débrouiller seul. »", "« Ça fait du bien qu'on me parle sans se moquer de moi. »"] },
    { id: "directrice", emoji: "👔", nom: "La Directrice Greenwashing", desc: "communicante corporate hors pair",
      q: "Une grande entreprise peut-elle être écolo ?",
      position: "« Notre entreprise est déjà exemplaire : regardez notre programme de recyclage des gobelets ! »",
      pieges: ["hareng", "whatabout", "popu", "halo"],
      motiv: "Elle sait que le bilan global est mauvais, et craint pour son poste et son équipe si elle le dit.",
      indices: ["« Les émissions, ce n'est pas mon service. On m'a remis ce discours ce matin. »", "« Si je dis que nous polluons, ce sont mes collègues qui en paieront le prix. »", "« Ma direction veut des messages positifs. Le reste, je n'ai pas le droit d'en parler. »"] }
  ],

  // Les gestes de la classe face au personnage, comme dans le jeu.
  gestes: [
    { id: "question", emoji: "❓", nom: "Question ouverte", effet: 1 },
    { id: "reformulation", emoji: "🪞", nom: "Reformulation", effet: 1 },
    { id: "esquive", emoji: "🙈", nom: "Esquive", effet: 0 },
    { id: "massue", emoji: "🔨", nom: "Coup de massue", effet: -1 }
  ],

  // ─── Les noms d'équipe ───
  familles: {
    grecs:   { nom: "Les écoles grecques", noms: ["les Pythagoriciens", "les Stoïciens", "les Épicuriens", "les Cyniques", "l'Académie", "le Lycée"] },
    figures: { nom: "Les figures du dialogue", noms: ["les Socrate", "les Hypatie", "les Montaigne", "les Olympe de Gouges", "les Mandela", "les Simone Veil"] },
    dojo:    { nom: "Les noms du dojo", noms: ["les Œils Ouverts", "les Feuilles Tranchées", "les Clochettes", "les Hommes de Fer", "les Points d'Accord", "les Démasqueurs"] },
    animaux: { nom: "Les animaux", noms: ["les Chouettes", "les Dauphins", "les Abeilles", "les Corbeaux", "les Éléphants", "les Renards"] }
  },

  // ─── Le bilan ───
  distinctions: [
    { emoji: "🪞", nom: "Homme de fer", pour: "la reformulation la plus fidèle" },
    { emoji: "❓", nom: "La question qui a tout changé", pour: "la question qui a fait avancer l'échange" },
    { emoji: "🔍", nom: "Œil Ouvert", pour: "le piège le mieux repéré, sans attaquer la personne" },
    { emoji: "🤝", nom: "Bâtisseur de dialogue", pour: "celle ou celui qui a trouvé un point d'accord" }
  ]
};
