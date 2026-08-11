// Cobaye — contenu (catégories + expériences historiques)
// Chaque source a été vérifiée (auteur, année, revue/ouvrage) avant intégration.

const CATEGORIES = [
  {
    id: "obeissance",
    nom: "Obéissance",
    nomLong: "Obéissance et autorité",
    classe: "c-obeissance",
    couleur: "#B0402A",
    description: "Jusqu'où va-t-on quand une figure d'autorité légitime nous demande de continuer ?"
  },
  {
    id: "conformisme",
    nom: "Conformisme",
    nomLong: "Conformisme et influence de groupe",
    classe: "c-conformisme",
    couleur: "#6B7A5E",
    description: "Comment le jugement individuel plie face à ce que fait ou dit le groupe."
  },
  {
    id: "situations",
    nom: "Situations",
    nomLong: "Rôles, institutions et situations",
    classe: "c-situations",
    couleur: "#3D5A80",
    description: "Comment un rôle ou un cadre institutionnel transforme le comportement, parfois plus que la personnalité elle-même."
  },
  {
    id: "developpement",
    nom: "Développement",
    nomLong: "Développement de l'enfant",
    classe: "c-developpement",
    couleur: "#8B5FBF",
    description: "Comment l'attachement, la peur et l'autorégulation se construisent dans la petite enfance."
  },
  {
    id: "social",
    nom: "Comportement social",
    nomLong: "Comportement social et aide",
    classe: "c-social",
    couleur: "#C98A2C",
    description: "Comment la présence des autres change ce qu'on est prêt à faire pour eux."
  },
  {
    id: "memoire",
    nom: "Mémoire",
    nomLong: "Mémoire et témoignage",
    classe: "c-memoire",
    couleur: "#4A7A75",
    description: "Comment le souvenir se laisse reconstruire, parfois par un seul mot."
  }
];

const EXPERIENCES = [
  // ───────────────────────── OBÉISSANCE ─────────────────────────
  {
    id: "milgram",
    nom: "L'expérience d'obéissance de Milgram",
    chercheurs: "Stanley Milgram",
    annee: "1961",
    lieu: "Université Yale",
    categorie: "obeissance",
    difficulte: "facile",
    resume_court: "Des volontaires reçoivent l'ordre d'administrer des chocs électriques de plus en plus forts à un « élève » qui se trompe dans un exercice de mémoire — pour mesurer jusqu'où l'obéissance à une autorité peut aller.",
    histoire: "En 1961, à l'université Yale, Stanley Milgram recrute des volontaires ordinaires pour ce qu'il présente comme une étude sur l'apprentissage et la punition. Chaque participant tient le rôle de « professeur » et doit administrer un choc électrique à un « élève » (en réalité un acteur, jamais réellement électrocuté) à chaque erreur, en augmentant l'intensité à chaque fois, jusqu'à une étiquette marquée « 450 volts — danger : choc sévère ». Quand le participant hésite, un expérimentateur en blouse blanche se contente de répéter des consignes standardisées (« L'expérience exige que vous continuiez »). Milgram avait demandé à des psychiatres d'estimer combien de participants iraient jusqu'au bout : leur prédiction tournait autour de 1 %. Dans les faits, 65 % des participants de l'expérience originale ont administré le choc maximal, malgré des signes de détresse évidents (tremblements, sueurs, rires nerveux).",
    controverses: "L'expérience a immédiatement soulevé des questions éthiques majeures — tromperie des participants, détresse psychologique réelle provoquée sans consentement éclairé complet — qui ont directement contribué à l'écriture des règles modernes d'éthique de la recherche. Des réanalyses plus récentes des archives de Milgram (Gina Perry, 2013) ont montré que les scripts de l'expérimentateur variaient davantage que ce que Milgram avait décrit, et que certains participants avaient deviné que les chocs n'étaient pas réels — ce qui nuance, sans l'annuler, l'ampleur du résultat original.",
    exemples: [
      { titre: "Justifications professionnelles", texte: "« Je ne faisais qu'exécuter les ordres » reste l'une des explications les plus étudiées des dérives organisationnelles, des scandales d'entreprise aux crimes de guerre." },
      { titre: "Téléréalité", texte: "L'émission française « Le Jeu de la Mort » (2010) a reproduit le protocole de Milgram presque à l'identique dans le cadre d'un jeu télévisé, avec des résultats similaires." },
      { titre: "Cybersécurité", texte: "Les formations à la sécurité informatique citent souvent Milgram pour expliquer pourquoi un ton autoritaire dans un e-mail de phishing augmente le taux de clic." }
    ],
    qcm: [
      {
        question: "Dans l'expérience de Milgram, quel pourcentage de participants a administré le choc maximal de 450 volts ?",
        choix: ["Environ 1%", "Environ 35%", "Environ 65%", "100%"],
        bonne_reponse: 2,
        explication: "65% des participants de l'expérience originale (1963) sont allés jusqu'au bout, un résultat très supérieur aux prédictions des psychiatres consultés au préalable (environ 1%)."
      },
      {
        question: "Quel élément jouait le rôle central pour maintenir l'obéissance des participants ?",
        choix: ["Une récompense financière élevée", "Une figure d'autorité qui insistait avec des phrases standardisées", "Le fait que les participants connaissaient personnellement l'« élève »", "L'absence totale de supervision"],
        bonne_reponse: 1,
        explication: "C'est la pression exercée par la présence calme et insistante de l'expérimentateur, perçu comme une autorité légitime, qui poussait à continuer malgré la détresse visible."
      },
      {
        question: "Pourquoi l'expérience de Milgram a-t-elle durablement changé les pratiques de recherche ?",
        choix: ["Parce qu'elle a prouvé que la psychologie n'était pas une science", "Parce que la détresse réelle infligée sans consentement éclairé complet a motivé la création de comités d'éthique modernes", "Parce qu'elle a été interdite par la Cour suprême américaine", "Parce qu'elle n'a jamais été publiée"],
        bonne_reponse: 1,
        explication: "L'expérience est devenue un cas d'école dans l'histoire de l'éthique de la recherche, contribuant à l'instauration de règles de consentement éclairé encore en vigueur."
      }
    ],
    identification: {
      situation: "Un employé de call center reçoit pour consigne de sa hiérarchie de continuer à appliquer une procédure qu'il juge de plus en plus insistante et gênante pour les clients, malgré son malaise croissant — son responsable se contente de répéter : « La procédure doit être suivie. » Il continue.",
      reponses_acceptees: ["milgram", "experience de milgram", "experience d obeissance de milgram"],
      indice: "Pense à la célèbre expérience des années 1960 sur l'obéissance à l'autorité, menée à l'université Yale."
    },
    sources: [
      { auteurs: "Milgram, S.", annee: 1963, titre: "Behavioral study of obedience", revue: "Journal of Abnormal and Social Psychology, 67(4), 371–378", type: "étude originale" },
      { auteurs: "Perry, G.", annee: 2013, titre: "Behind the Shock Machine: The Untold Story of the Notorious Milgram Psychology Experiments", revue: "The New Press", type: "réexamen historique" }
    ],
    experiences_liees: ["asch", "zimbardo"]
  },

  // ───────────────────────── CONFORMISME ─────────────────────────
  {
    id: "asch",
    nom: "Le conformisme au groupe (Asch)",
    chercheurs: "Solomon Asch",
    annee: "1951",
    lieu: "Swarthmore College",
    categorie: "conformisme",
    difficulte: "facile",
    resume_court: "Des participants doivent juger la longueur de lignes évidentes à comparer — mais quand tous les autres membres du groupe (des acteurs) donnent délibérément la mauvaise réponse, une partie des vrais participants se rallie à l'erreur collective plutôt que de faire confiance à ses propres yeux.",
    histoire: "Solomon Asch réunit des groupes de sept à neuf étudiants pour une tâche en apparence triviale : indiquer laquelle de trois lignes a la même longueur qu'une ligne de référence — une évidence visuelle que n'importe qui peut juger seul sans erreur. Un seul membre du groupe est un vrai participant ; tous les autres sont des complices consignés pour donner, à plusieurs reprises, une réponse manifestement fausse à voix haute avant que le vrai participant ne réponde. Résultat : environ 75 % des participants se sont ralliés au moins une fois à la réponse fausse du groupe au cours des douze essais, alors qu'aucun d'entre eux ne se trompait quand il répondait seul. En entretien après coup, certains disaient avoir sincèrement douté de leur propre perception ; d'autres admettaient avoir menti pour éviter de se distinguer du groupe.",
    controverses: "L'expérience originale a été menée sur un échantillon homogène (hommes, étudiants américains blancs des années 1950), ce qui a soulevé des questions sur la généralisabilité du résultat. Des méta-analyses ultérieures (Bond & Smith, 1996) confirment l'effet mais montrent qu'il varie fortement selon les cultures — plus marqué dans les sociétés à forte orientation collectiviste — et qu'il a globalement diminué dans les réplications occidentales menées après les années 1950.",
    exemples: [
      { titre: "Réunions professionnelles", texte: "Un désaccord individuel s'efface souvent en réunion quand toute l'équipe semble déjà d'accord, même sur un point objectivement discutable." },
      { titre: "Réseaux sociaux", texte: "Le nombre de likes déjà présents sous un post influence la façon dont les nouveaux lecteurs jugent son contenu, indépendamment de sa qualité réelle." },
      { titre: "Sécurité routière", texte: "Les campagnes de prévention exploitent l'effet inverse : montrer que « la majorité » adopte un comportement sûr pousse à l'imiter." }
    ],
    qcm: [
      {
        question: "Dans l'expérience d'Asch, quelle était la tâche demandée aux participants ?",
        choix: ["Résoudre un problème de mathématiques complexe", "Juger quelle ligne, parmi trois, avait la même longueur qu'une ligne de référence", "Mémoriser une liste de mots", "Évaluer la culpabilité d'un accusé"],
        bonne_reponse: 1,
        explication: "La tâche visuelle était volontairement évidente et sans ambiguïté — ce qui rend le taux de conformité d'autant plus frappant."
      },
      {
        question: "Environ quelle proportion des participants s'est ralliée au moins une fois à la réponse fausse du groupe ?",
        choix: ["0%", "25%", "75%", "100%"],
        bonne_reponse: 2,
        explication: "Environ 75% des participants se sont conformés à la réponse manifestement fausse du groupe au moins une fois sur les douze essais."
      },
      {
        question: "Que montrent les méta-analyses menées depuis les années 1950 sur cet effet de conformité ?",
        choix: ["L'effet a totalement disparu depuis 1951", "L'effet persiste mais varie selon les cultures et a globalement diminué en Occident", "L'effet est resté rigoureusement identique partout dans le monde", "L'effet n'a jamais pu être répliqué"],
        bonne_reponse: 1,
        explication: "Les réplications montrent un effet réel mais sensible au contexte culturel et à l'époque, plus marqué dans les sociétés collectivistes."
      }
    ],
    identification: {
      situation: "En conseil de classe, un professeur demande à chaque élève, à voix haute, si telle affirmation historique lui semble vraie. Les cinq premiers élèves interrogés — de mèche avec l'enseignant pour cette démonstration — répondent tous, avec assurance, une réponse que l'élève suivant sait pertinemment fausse. Il hésite, puis donne la même réponse que ses camarades.",
      reponses_acceptees: ["asch", "experience d asch", "conformisme d asch"],
      indice: "Pense à l'expérience des années 1950 sur le jugement de la longueur de lignes en groupe."
    },
    sources: [
      { auteurs: "Asch, S. E.", annee: 1951, titre: "Effects of group pressure upon the modification and distortion of judgments", revue: "Dans H. Guetzkow (dir.), Groups, Leadership and Men, Carnegie Press, 177–190", type: "étude originale" },
      { auteurs: "Bond, R., & Smith, P. B.", annee: 1996, titre: "Culture and conformity: A meta-analysis of studies using Asch's line judgment task", revue: "Psychological Bulletin, 119(1), 111–137", type: "synthèse / méta-analyse" }
    ],
    experiences_liees: ["milgram", "robbers-cave"]
  },
  {
    id: "robbers-cave",
    nom: "La grotte des voleurs (Sherif)",
    chercheurs: "Muzafer Sherif et son équipe",
    annee: "1954",
    lieu: "Robbers Cave State Park, Oklahoma",
    categorie: "conformisme",
    difficulte: "intermédiaire",
    resume_court: "Deux groupes de garçons de onze ans, envoyés en colonie de vacances sans le savoir, développent une hostilité intense dès qu'ils sont mis en compétition — puis coopèrent de nouveau dès qu'on leur donne un objectif commun qu'aucun groupe ne peut atteindre seul.",
    histoire: "Muzafer Sherif organise une colonie de vacances d'apparence ordinaire pour vingt-deux garçons de onze-douze ans, tous inconnus les uns des autres et soigneusement sélectionnés pour être psychologiquement stables. Répartis dès l'arrivée en deux groupes séparés (qui se baptisent eux-mêmes les « Aigles » et les « Serpents à sonnette »), les garçons développent d'abord un fort esprit de groupe sans même savoir que l'autre équipe existe. Dans une deuxième phase, Sherif organise des compétitions sportives à récompense unique : la rivalité dégénère rapidement en hostilité ouverte — insultes, raids sur les campements, drapeaux brûlés — bien au-delà de ce que prévoyait l'équipe de recherche. Dans une troisième phase, Sherif introduit des « objectifs supra-ordonnés » : des pannes organisées (camion en panne, coupure d'eau) que les deux groupes ne peuvent résoudre qu'en coopérant. L'hostilité retombe alors progressivement, jusqu'à ce que les deux groupes finissent par partager le même bus au retour.",
    controverses: "L'étude est aujourd'hui un classique de la théorie du conflit réaliste, mais elle a aussi été critiquée pour l'absence de vrai consentement des enfants et de leurs parents (les garçons croyaient participer à une colonie de vacances ordinaire), ainsi que pour une tentative similaire antérieure de Sherif (1953) qui avait dû être interrompue car les garçons s'étaient unis contre les chercheurs eux-mêmes plutôt que de se diviser comme prévu — un résultat rarement mentionné dans les manuels.",
    exemples: [
      { titre: "Rivalités sportives", texte: "L'hostilité entre supporters de clubs rivaux s'apaise spectaculairement quand leurs pays affrontent un adversaire commun en sélection nationale." },
      { titre: "Milieu professionnel", texte: "Deux services en conflit chronique retrouvent une coopération réelle face à un projet commun qu'aucun des deux ne peut réussir seul." },
      { titre: "Diplomatie internationale", texte: "La coopération scientifique internationale est parfois délibérément utilisée pour apaiser des tensions géopolitiques." }
    ],
    qcm: [
      {
        question: "Qu'est-ce qui a fait retomber l'hostilité entre les deux groupes de garçons ?",
        choix: ["Une punition collective des chercheurs", "L'introduction d'objectifs communs que les deux groupes ne pouvaient atteindre qu'en coopérant", "La séparation définitive des deux groupes", "Une récompense individuelle pour chaque garçon"],
        bonne_reponse: 1,
        explication: "Les « objectifs supra-ordonnés » — des problèmes que ni groupe ne pouvait résoudre seul — ont forcé une coopération qui a progressivement dissous l'hostilité."
      },
      {
        question: "Qu'est-ce qui a initialement déclenché l'hostilité entre les deux groupes ?",
        choix: ["Une différence d'âge entre les groupes", "Des compétitions sportives à récompense unique, exclusive à un seul groupe", "Une différence de nationalité", "Aucune interaction ne s'est jamais produite"],
        bonne_reponse: 1,
        explication: "C'est l'introduction d'une compétition à somme nulle qui a rapidement transformé une simple différence de groupe en hostilité ouverte."
      },
      {
        question: "Pourquoi cette étude est-elle aujourd'hui jugée éthiquement problématique ?",
        choix: ["Parce qu'aucun enfant n'a réellement participé", "Parce que les garçons et leurs parents n'avaient pas donné un consentement éclairé complet à une expérience déguisée en colonie de vacances", "Parce que l'étude n'a jamais été publiée", "Parce qu'elle n'impliquait aucune observation des chercheurs"],
        bonne_reponse: 1,
        explication: "Les participants croyaient prendre part à une colonie de vacances ordinaire, sans savoir qu'ils étaient observés et manipulés dans le cadre d'une expérience."
      }
    ],
    identification: {
      situation: "Dans une entreprise, deux équipes commerciales rivalisent depuis des mois pour un unique bonus annuel — l'ambiance entre elles est exécrable. La direction leur confie alors un projet commun, dont la réussite dépend des compétences complémentaires des deux équipes et qu'aucune ne peut mener seule. En quelques semaines, les tensions s'apaisent.",
      reponses_acceptees: ["sherif", "robbers cave", "grotte des voleurs", "experience de la grotte des voleurs"],
      indice: "Pense à l'expérience des années 1950 menée dans une colonie de vacances avec deux groupes rivaux de garçons."
    },
    sources: [
      { auteurs: "Sherif, M., Harvey, O. J., White, B. J., Hood, W. R., & Sherif, C. W.", annee: 1961, titre: "Intergroup Conflict and Cooperation: The Robbers Cave Experiment", revue: "University Book Exchange", type: "étude originale" }
    ],
    experiences_liees: ["asch", "milgram"]
  },

  // ───────────────────────── SITUATIONS ─────────────────────────
  {
    id: "zimbardo",
    nom: "La prison de Stanford (Zimbardo)",
    chercheurs: "Philip Zimbardo, Craig Haney, Curtis Banks",
    annee: "1971",
    lieu: "Université Stanford",
    categorie: "situations",
    difficulte: "intermédiaire",
    resume_court: "Des étudiants tirés au sort pour jouer les « gardiens » ou les « prisonniers » dans une fausse prison installée au sous-sol de Stanford glissent en quelques jours vers des comportements si abusifs que l'expérience, prévue pour durer deux semaines, est arrêtée au bout de six jours.",
    histoire: "Philip Zimbardo recrute 24 étudiants volontaires, jugés psychologiquement stables lors d'un premier tri, et les répartit au hasard entre le rôle de « gardien » et celui de « prisonnier » dans une prison simulée aménagée au sous-sol du département de psychologie de Stanford. Les « prisonniers » sont réellement arrêtés à leur domicile par la police locale, déshabillés, numérotés. Les « gardiens », en uniforme et lunettes de soleil réfléchissantes, reçoivent pour seule consigne de maintenir l'ordre, sans instruction de violence explicite. En quelques jours, une partie des gardiens adopte des comportements humiliants et abusifs envers les prisonniers, tandis que plusieurs prisonniers montrent des signes de détresse aiguë. Zimbardo, qui jouait lui-même le rôle du directeur de la prison, arrête l'expérience au bout de six jours sur les deux semaines prévues, après l'intervention de sa compagne Christina Maslach, alarmée par ce qu'elle observait.",
    controverses: "Longtemps présentée comme la démonstration du pouvoir de la situation sur le comportement individuel, l'expérience a fait l'objet d'une réévaluation majeure en 2019 : l'historien Thibault Le Texier, en dépouillant les archives originales de Zimbardo, a montré que plusieurs gardiens avaient reçu des consignes bien plus directes qu'annoncé pour se montrer durs, que certains prisonniers avaient simulé leur détresse, et que Zimbardo avait activement orienté le déroulement plutôt que de simplement observer. Ces révélations n'annulent pas l'intérêt historique de l'étude, mais imposent aujourd'hui de la présenter comme une démonstration de mise en scène autant que comme une expérience scientifique rigoureuse.",
    exemples: [
      { titre: "Culture populaire", texte: "L'expérience a inspiré plusieurs films et documentaires, contribuant à sa notoriété bien au-delà du monde académique." },
      { titre: "Institutions totales", texte: "L'étude reste citée dans les débats sur les abus en prison, malgré les réserves méthodologiques désormais bien documentées." },
      { titre: "Formation à l'éthique de la recherche", texte: "L'expérience sert aujourd'hui d'étude de cas emblématique — pour ses manquements autant que pour ses résultats." }
    ],
    qcm: [
      {
        question: "Combien de temps l'expérience a-t-elle réellement duré, sur les deux semaines prévues ?",
        choix: ["2 jours", "6 jours", "14 jours", "1 mois"],
        bonne_reponse: 1,
        explication: "L'expérience a été interrompue au bout de six jours, après l'intervention de Christina Maslach, alarmée par ce qu'elle observait."
      },
      {
        question: "Que révèle la réévaluation menée par Thibault Le Texier en 2019 ?",
        choix: ["Que l'expérience n'a jamais eu lieu", "Que certains gardiens avaient reçu des consignes directes d'être durs, et que Zimbardo avait orienté le déroulement plus qu'il ne l'a présenté", "Que tous les résultats étaient inventés de toutes pièces", "Que l'expérience a été un succès parfaitement neutre"],
        bonne_reponse: 1,
        explication: "L'analyse des archives montre une mise en scène plus active de la part des chercheurs que ce que racontait le récit classique de l'expérience."
      },
      {
        question: "Pourquoi cette expérience est-elle citée à la fois en psychologie sociale et en méthodologie de la recherche ?",
        choix: ["Parce qu'elle n'a aucun rapport avec la méthodologie", "Parce qu'elle illustre autant le pouvoir des situations sociales que les risques de biais et de mise en scène du chercheur", "Parce qu'elle a été refaite à l'identique des dizaines de fois avec succès", "Parce qu'elle n'a jamais été publiée"],
        bonne_reponse: 1,
        explication: "Elle sert de double cas d'école : sur le fond (influence de la situation) et sur la forme (vigilance face aux biais de mise en scène)."
      }
    ],
    identification: {
      situation: "Dans une simulation de gestion de crise en entreprise, des employés tirés au sort pour jouer un rôle hiérarchique supérieur adoptent, en quelques heures, un ton nettement plus autoritaire envers leurs collègues jouant un rôle subalterne — au point que les organisateurs doivent intervenir pour calmer la tension, alors qu'aucune consigne ne demandait ce comportement.",
      reponses_acceptees: ["zimbardo", "experience de stanford", "experience de la prison de stanford", "stanford prison experiment"],
      indice: "Pense à l'expérience des années 1970 où des étudiants jouaient les gardiens et les prisonniers dans une fausse prison."
    },
    sources: [
      { auteurs: "Haney, C., Banks, C., & Zimbardo, P.", annee: 1973, titre: "Interpersonal dynamics in a simulated prison", revue: "International Journal of Criminology and Penology, 1, 69–97", type: "étude originale" },
      { auteurs: "Le Texier, T.", annee: 2019, titre: "Debunking the Stanford Prison Experiment", revue: "American Psychologist, 74(7), 823–839", type: "réexamen historique", lien: "https://doi.org/10.1037/amp0000401" }
    ],
    experiences_liees: ["milgram", "rosenhan"]
  },
  {
    id: "rosenhan",
    nom: "Être sain d'esprit dans un lieu insensé (Rosenhan)",
    chercheurs: "David Rosenhan et sept autres « pseudo-patients »",
    annee: "1973",
    lieu: "Douze hôpitaux psychiatriques américains",
    categorie: "situations",
    difficulte: "avancé",
    resume_court: "Huit personnes en parfaite santé mentale se présentent dans des hôpitaux psychiatriques en simulant un seul symptôme, sont toutes internées avec un diagnostic de trouble mental — puis cessent immédiatement de simuler quoi que ce soit une fois admises, sans que le personnel ne remarque jamais qu'elles étaient saines d'esprit.",
    histoire: "David Rosenhan et sept collaborateurs se présentent séparément dans douze hôpitaux psychiatriques américains en affirmant entendre une voix répétant des mots comme « vide », « creux », « bruit sourd » — puis, dès leur admission, cessent totalement de simuler tout symptôme et se comportent normalement. Malgré cela, tous sont internés (onze diagnostiqués schizophrènes, un maniaco-dépressif), pour une durée moyenne de dix-neuf jours, et ne sont libérés qu'avec la mention « en rémission ». Rosenhan publie ces résultats en 1973 dans la revue Science sous le titre « On Being Sane in Insane Places », comme une critique cinglante de la fiabilité du diagnostic psychiatrique — le personnel soignant, écrit-il, n'a jamais détecté la supercherie, alors que plusieurs patients internés, eux, avaient soupçonné juste que les « pseudo-patients » n'étaient pas réellement malades.",
    controverses: "L'étude a été considérée pendant des décennies comme l'un des textes fondateurs de la critique du diagnostic psychiatrique et a influencé la révision des critères diagnostiques (DSM-III, 1980). Mais l'enquête journalistique de Susannah Cahalan (« The Great Pretender », 2019), menée en fouillant les archives personnelles de Rosenhan après sa mort, a révélé de sérieux doutes : plusieurs des « huit pseudo-patients » n'ont jamais pu être identifiés ni retrouvés, certains éléments du récit de Rosenhan lui-même semblent exagérés ou incohérents avec ses propres notes, et au moins un cas documenté suggère que le patient présentait de réels symptômes. L'étude reste un jalon historique, mais son exactitude factuelle est aujourd'hui largement mise en doute.",
    exemples: [
      { titre: "Réforme du DSM", texte: "L'étude est régulièrement citée comme un facteur ayant accéléré la refonte des critères diagnostiques vers des critères plus observables." },
      { titre: "Étiquetage social", texte: "Le concept d'« étiquette » qui influence la perception de tout comportement ultérieur est repris dans l'étude de la stigmatisation en santé mentale." },
      { titre: "Journalisme d'investigation", texte: "L'enquête de Cahalan illustre comment une étude devenue un classique incontesté peut être réexaminée des décennies plus tard grâce au travail d'archives." }
    ],
    qcm: [
      {
        question: "Que faisaient les « pseudo-patients » une fois admis à l'hôpital ?",
        choix: ["Ils continuaient à simuler des symptômes tout au long du séjour", "Ils cessaient immédiatement toute simulation et se comportaient normalement", "Ils tentaient de s'évader", "Ils informaient le personnel de la supercherie"],
        bonne_reponse: 1,
        explication: "Dès leur admission, les pseudo-patients arrêtaient totalement de simuler — mais aucun n'a été démasqué par le personnel soignant pour autant."
      },
      {
        question: "Qu'a révélé l'enquête de Susannah Cahalan (2019) sur cette étude ?",
        choix: ["Que l'étude était entièrement fictive", "Que plusieurs éléments du récit de Rosenhan sont invérifiables ou semblent exagérés, ce qui jette un doute sérieux sur son exactitude", "Que l'étude a depuis été parfaitement répliquée dix fois", "Que Rosenhan a reçu un prix Nobel pour ce travail"],
        bonne_reponse: 1,
        explication: "L'enquête journalistique a mis au jour des incohérences majeures dans le récit original, sans pouvoir totalement le réfuter ni le confirmer."
      },
      {
        question: "Quel a été l'impact historique principal de cette étude, indépendamment des doutes soulevés depuis ?",
        choix: ["Aucun impact mesurable", "Elle a alimenté une critique du diagnostic psychiatrique qui a influencé des révisions ultérieures des manuels diagnostiques", "Elle a conduit à la fermeture de tous les hôpitaux psychiatriques américains", "Elle a validé la fiabilité totale du diagnostic de l'époque"],
        bonne_reponse: 1,
        explication: "Malgré les doutes récents sur son exactitude factuelle, l'étude a eu une influence historique réelle sur le débat autour du diagnostic psychiatrique."
      }
    ],
    identification: {
      situation: "Un journaliste se fait discrètement admettre dans un service administratif en se plaignant d'un seul symptôme vague auprès de l'accueil. Une fois le dossier ouvert, il ne simule plus rien et se comporte tout à fait normalement — mais chaque email neutre qu'il envoie ensuite est réinterprété par le personnel à travers le motif initial de sa demande.",
      reponses_acceptees: ["rosenhan", "experience de rosenhan", "etre sain d esprit dans un lieu insense"],
      indice: "Pense à l'étude des années 1970 où de fausses personnes internées cessaient de simuler une fois admises."
    },
    sources: [
      { auteurs: "Rosenhan, D. L.", annee: 1973, titre: "On being sane in insane places", revue: "Science, 179(4070), 250–258", type: "étude originale" },
      { auteurs: "Cahalan, S.", annee: 2019, titre: "The Great Pretender: The Undercover Mission That Changed Our Understanding of Madness", revue: "Grand Central Publishing", type: "réexamen historique" }
    ],
    experiences_liees: ["zimbardo", "milgram"]
  },

  // ───────────────────────── DÉVELOPPEMENT ─────────────────────────
  {
    id: "harlow",
    nom: "Les mères de substitution (Harlow)",
    chercheurs: "Harry Harlow",
    annee: "1958",
    lieu: "Université du Wisconsin",
    categorie: "developpement",
    difficulte: "intermédiaire",
    resume_court: "Des bébés singes rhésus séparés de leur mère préfèrent systématiquement s'accrocher à un mannequin en tissu doux, même sans nourriture, plutôt qu'à un mannequin en fil de fer qui leur donne le biberon — remettant en cause l'idée dominante que l'attachement se réduit à la satisfaction des besoins physiologiques.",
    histoire: "Dans les années 1950, la théorie dominante veut que le lien entre un enfant et sa mère s'explique uniquement par la satisfaction de besoins physiologiques (la nourriture). Harry Harlow sépare des bébés singes rhésus de leur mère biologique à la naissance et les élève avec deux « mères » de substitution artificielles : l'une, en fil de fer nu, équipée d'un biberon ; l'autre, recouverte de tissu doux, sans nourriture. Contrairement à ce que prédisait la théorie de l'époque, les bébés singes passent l'essentiel de leur temps agrippés à la mère en tissu, ne se rendant vers la mère en fil de fer que le temps strictement nécessaire pour se nourrir, avant de retourner immédiatement chercher le réconfort du tissu doux — y compris en situation de peur, où ils se réfugient systématiquement contre elle. Harlow en conclut que le « contact réconfortant » est un besoin psychologique fondamental, indépendant de la nourriture.",
    controverses: "Les travaux ultérieurs de Harlow, notamment ses expériences d'isolement social total provoquant des troubles psychologiques sévères et durables chez les singes, sont aujourd'hui considérés comme éthiquement inacceptables et ont contribué, rétrospectivement, à l'émergence de règles strictes de protection animale dans la recherche. Le paradoxe est que ces mêmes travaux, en documentant scientifiquement les effets dévastateurs de la privation affective précoce, ont aussi renforcé les arguments en faveur d'un contact physique et d'un accompagnement affectif accru pour les enfants — y compris dans les orphelinats et les services de néonatologie.",
    exemples: [
      { titre: "Théorie de l'attachement", texte: "Les travaux de Harlow ont directement influencé John Bowlby et le développement de la théorie de l'attachement, aujourd'hui centrale en psychologie du développement." },
      { titre: "Pratiques hospitalières", texte: "Le peau-à-peau systématique proposé en maternité aujourd'hui s'appuie en partie sur la même intuition documentée par Harlow." },
      { titre: "Protection animale en recherche", texte: "Les excès de certaines expériences de Harlow sont aujourd'hui cités dans la formation à l'éthique de la recherche animale, comme contre-exemple à ne pas reproduire." }
    ],
    qcm: [
      {
        question: "Que préféraient les bébés singes de l'expérience de Harlow, la plupart du temps ?",
        choix: ["La mère en fil de fer, qui donnait le biberon", "La mère en tissu doux, même sans nourriture", "Aucune des deux mères artificielles", "Uniquement la compagnie d'autres bébés singes"],
        bonne_reponse: 1,
        explication: "Les bébés singes s'accrochaient à la mère en tissu doux l'essentiel du temps, ne rejoignant la mère en fil de fer que pour se nourrir."
      },
      {
        question: "Quelle idée dominante cette expérience a-t-elle directement remise en question ?",
        choix: ["L'idée que les singes ne ressentent aucune émotion", "L'idée que l'attachement mère-enfant s'explique uniquement par la satisfaction des besoins physiologiques", "L'idée que les bébés animaux n'ont besoin d'aucun contact", "L'idée que la génétique n'influence pas le comportement"],
        bonne_reponse: 1,
        explication: "Harlow a montré que le contact réconfortant comptait au moins autant que la nourriture dans la formation du lien d'attachement."
      },
      {
        question: "Pourquoi les travaux ultérieurs de Harlow sur l'isolement social total sont-ils critiqués ?",
        choix: ["Parce qu'ils n'ont produit aucun résultat exploitable", "Parce qu'ils ont infligé une souffrance psychologique sévère et durable aux animaux, jugée éthiquement inacceptable aujourd'hui", "Parce qu'ils n'impliquaient aucun animal", "Parce qu'ils ont été menés sans aucune publication scientifique"],
        bonne_reponse: 1,
        explication: "Les expériences d'isolement extrême de Harlow ont causé des troubles durables chez les singes et sont citées comme un cas d'école de dérive éthique."
      }
    ],
    identification: {
      situation: "Dans un refuge pour très jeunes animaux orphelins, les soigneurs remarquent que les petits recherchent activement le contact avec une peluche douce placée dans leur enclos bien après avoir terminé de se nourrir au biberon automatique, et s'y réfugient dès qu'un bruit les effraie.",
      reponses_acceptees: ["harlow", "experience de harlow", "experience des meres de substitution"],
      indice: "Pense à l'expérience des années 1950 sur des bébés singes et deux mères artificielles, l'une en tissu, l'autre en fil de fer."
    },
    sources: [
      { auteurs: "Harlow, H. F.", annee: 1958, titre: "The nature of love", revue: "American Psychologist, 13(12), 573–685", type: "étude originale" }
    ],
    experiences_liees: ["little-albert", "marshmallow"]
  },
  {
    id: "little-albert",
    nom: "Le petit Albert (Watson & Rayner)",
    chercheurs: "John B. Watson et Rosalie Rayner",
    annee: "1920",
    lieu: "Université Johns Hopkins",
    categorie: "developpement",
    difficulte: "intermédiaire",
    resume_court: "Un bébé de neuf mois, qui ne montrait initialement aucune peur d'un rat blanc, apprend à en avoir peur après que les chercheurs ont associé sa présence à un bruit fort et effrayant — démontrant qu'une peur peut être conditionnée, et se généraliser à d'autres objets similaires.",
    histoire: "John Watson et Rosalie Rayner recrutent « Albert B. », un bébé de neuf mois élevé dans un hôpital, pour tester si une réaction émotionnelle peut être conditionnée comme un réflexe. Ils vérifient d'abord qu'Albert ne montre aucune peur envers un rat blanc, un lapin, un chien ou un masque. Ils exposent ensuite Albert au rat blanc tout en frappant une barre de métal avec un marteau juste derrière sa tête, produisant un bruit fort qui le fait sursauter et pleurer. Après plusieurs répétitions de cette association, Albert se met à pleurer à la seule vue du rat, même sans le bruit — et sa peur se généralise à d'autres objets à fourrure blanche (un lapin, un manteau en fourrure, une barbe de Père Noël en coton). Watson et Rayner n'ont jamais tenté de « déconditionner » Albert avant la fin de l'étude.",
    controverses: "L'expérience est aujourd'hui unanimement jugée inacceptable sur le plan éthique — elle serait impossible à mener dans un cadre de recherche moderne, faute de consentement éclairé véritable et faute d'avoir cherché à annuler la peur induite. L'identité réelle du « petit Albert » est longtemps restée un mystère ; des recherches menées dans les années 2010 (Beck, Levinson & Irons, 2009) ont proposé une identification qui a ensuite été partiellement contestée par d'autres chercheurs (Powell et al., 2014), sans certitude définitive à ce jour sur le devenir réel de l'enfant.",
    exemples: [
      { titre: "Thérapies comportementales", texte: "Le principe inverse — le contre-conditionnement — est aujourd'hui utilisé en thérapie pour traiter les phobies." },
      { titre: "Marketing et association", texte: "Associer une marque à une musique ou une ambiance agréable de façon répétée s'appuie sur le même mécanisme de conditionnement classique." },
      { titre: "Peurs généralisées", texte: "Le concept de « généralisation du stimulus » observé chez Albert éclaire pourquoi certaines phobies s'étendent au-delà de leur déclencheur initial." }
    ],
    qcm: [
      {
        question: "Comment Watson et Rayner ont-ils procédé pour créer la peur du rat blanc chez le petit Albert ?",
        choix: ["En le privant de nourriture en présence du rat", "En associant la présence du rat à un bruit fort et effrayant produit juste derrière sa tête", "En lui montrant des images du rat pendant plusieurs semaines", "En le récompensant chaque fois qu'il s'approchait du rat"],
        bonne_reponse: 1,
        explication: "L'association répétée entre le rat (initialement neutre) et un bruit effrayant a conditionné la peur, selon le principe du conditionnement classique."
      },
      {
        question: "Que s'est-il passé quand Albert a ensuite été exposé à un lapin ou à un manteau de fourrure ?",
        choix: ["Il n'a montré aucune réaction particulière", "Sa peur s'est généralisée à ces autres objets à fourrure blanche, bien qu'ils n'aient jamais été associés au bruit", "Il a immédiatement perdu sa peur du rat", "Il a développé une peur uniquement des bruits forts"],
        bonne_reponse: 1,
        explication: "La peur conditionnée s'est étendue (généralisée) à des stimuli simplement similaires au rat initial, sans nouvel apprentissage direct."
      },
      {
        question: "Pourquoi cette étude ne pourrait-elle plus être menée aujourd'hui ?",
        choix: ["Parce que le conditionnement n'existe pas chez les très jeunes enfants", "Parce qu'elle viole les principes éthiques actuels de consentement et l'absence de tentative de réparer le tort causé", "Parce que les bébés ne réagissent plus aux bruits forts", "Parce qu'aucun laboratoire ne dispose plus de rats blancs"],
        bonne_reponse: 1,
        explication: "L'absence de consentement éclairé véritable et l'absence de déconditionnement final rendent cette étude incompatible avec les règles d'éthique actuelles."
      }
    ],
    identification: {
      situation: "Un très jeune enfant qui ne craignait initialement pas les chiens se met à pleurer systématiquement à leur vue après qu'un chien lui a aboyé dessus violemment à plusieurs reprises — et, quelques semaines plus tard, il pleure aussi devant des peluches à fourrure qui n'ont pourtant jamais aboyé.",
      reponses_acceptees: ["petit albert", "experience du petit albert", "watson et rayner"],
      indice: "Pense à l'expérience des années 1920 sur un bébé, un rat blanc et un bruit fort."
    },
    sources: [
      { auteurs: "Watson, J. B., & Rayner, R.", annee: 1920, titre: "Conditioned emotional reactions", revue: "Journal of Experimental Psychology, 3(1), 1–14", type: "étude originale" }
    ],
    experiences_liees: ["harlow", "marshmallow"]
  },
  {
    id: "marshmallow",
    nom: "Le test du marshmallow (Mischel)",
    chercheurs: "Walter Mischel et ses collègues",
    annee: "1970–1972",
    lieu: "Université Stanford",
    categorie: "developpement",
    difficulte: "intermédiaire",
    resume_court: "Des enfants d'âge préscolaire se voient proposer un marshmallow immédiatement, ou deux s'ils patientent seuls quinze minutes sans le manger — un test devenu célèbre pour son lien supposé avec la réussite future, mais dont la portée prédictive a depuis été largement révisée à la baisse.",
    histoire: "Walter Mischel et ses collègues installent des enfants de quatre à cinq ans, un par un, dans une pièce avec une friandise (marshmallow, biscuit, bretzel) posée devant eux. L'expérimentateur leur propose un choix simple : manger la friandise tout de suite, ou attendre son retour (environ quinze minutes) pour en recevoir deux. Les enfants restent seuls avec la tentation sous les yeux, filmés en train de développer diverses stratégies pour résister — se couvrir les yeux, se parler à voix basse, s'éloigner physiquement de la friandise. Des décennies plus tard, des suivis longitudinaux des mêmes enfants (Shoda, Mischel & Peake, 1990) rapportent une corrélation entre le temps d'attente enfant et des résultats scolaires ou sociaux plus favorables à l'adolescence, ce qui popularise l'idée que l'autocontrôle précoce prédirait la réussite future.",
    controverses: "Une réplication à bien plus grande échelle et avec un échantillon socio-économiquement plus représentatif (Watts, Duncan & Quan, 2018) a fortement nuancé ce résultat : une fois pris en compte le milieu socio-économique et le niveau d'éducation des parents, le lien entre le temps d'attente et la réussite ultérieure devient beaucoup plus faible, voire quasiment nul. L'étude originale de Mischel portait sur un échantillon restreint et privilégié (les enfants du campus de Stanford), ce qui limitait sa capacité à généraliser. Le test reste un dispositif élégant pour étudier l'autorégulation chez l'enfant, mais son interprétation comme prédicteur de la réussite de vie est aujourd'hui jugée largement excessive par rapport aux données actuelles.",
    exemples: [
      { titre: "Éducation parentale", texte: "Le test a alimenté (parfois à l'excès) des conseils éducatifs sur l'importance d'entraîner l'autocontrôle chez le jeune enfant." },
      { titre: "Vulgarisation scientifique", texte: "Le marshmallow test est l'une des expériences les plus reprises en conférence, souvent sans mentionner les nuances apportées depuis 2018." },
      { titre: "Recherche sur le milieu socio-économique", texte: "La réplique de 2018 est devenue une référence pour illustrer combien un facteur de fond peut expliquer une corrélation initialement attribuée à un trait individuel." }
    ],
    qcm: [
      {
        question: "Quel choix était proposé aux enfants dans le test du marshmallow ?",
        choix: ["Manger immédiatement une friandise, ou attendre pour en recevoir deux", "Choisir entre deux jouets différents", "Répondre à un quiz pour gagner une récompense", "Partager une friandise avec un autre enfant"],
        bonne_reponse: 0,
        explication: "Le choix central portait sur l'attente : une récompense immédiate et modeste, ou une récompense double après un délai."
      },
      {
        question: "Que montre la réplication de Watts, Duncan et Quan (2018) sur le lien entre attente et réussite future ?",
        choix: ["Que le lien est encore plus fort que ce que pensait Mischel", "Qu'une fois pris en compte le milieu socio-économique, le lien devient beaucoup plus faible, voire quasiment nul", "Que l'expérience originale n'a jamais eu lieu", "Que les enfants qui attendent réussissent toujours moins bien"],
        bonne_reponse: 1,
        explication: "La réplication à plus grande échelle montre que le milieu socio-économique explique une grande partie de la corrélation initialement attribuée à l'autocontrôle seul."
      },
      {
        question: "Pourquoi l'échantillon de l'étude originale de Mischel limitait-il la portée de ses conclusions ?",
        choix: ["Parce qu'il ne comportait aucun enfant", "Parce qu'il était restreint à des enfants d'un milieu socio-économique privilégié, peu représentatif de la population générale", "Parce que les enfants avaient tous plus de dix ans", "Parce que l'expérience n'a jamais été filmée"],
        bonne_reponse: 1,
        explication: "Un échantillon peu diversifié socio-économiquement limite la capacité à généraliser un résultat à l'ensemble de la population."
      }
    ],
    identification: {
      situation: "Dans une étude en classe, un enseignant propose à ses élèves un petit cadeau immédiat ou un cadeau plus important s'ils acceptent d'attendre la fin de la semaine. Il filme discrètement leurs réactions pour observer comment chacun gère l'attente face à la tentation visible sur son bureau.",
      reponses_acceptees: ["marshmallow", "test du marshmallow", "experience du marshmallow", "mischel"],
      indice: "Pense au test des années 1970 où des enfants devaient résister à manger une friandise pour en obtenir deux plus tard."
    },
    sources: [
      { auteurs: "Mischel, W., Ebbesen, E. B., & Raskoff Zeiss, A.", annee: 1972, titre: "Cognitive and attentional mechanisms in delay of gratification", revue: "Journal of Personality and Social Psychology, 21(2), 204–218", type: "étude originale" },
      { auteurs: "Watts, T. W., Duncan, G. J., & Quan, H.", annee: 2018, titre: "Revisiting the Marshmallow Test: A Conceptual Replication", revue: "Psychological Science, 29(7), 1159–1177", type: "réplique / réexamen" }
    ],
    experiences_liees: ["harlow", "little-albert"]
  },

  // ───────────────────────── COMPORTEMENT SOCIAL ─────────────────────────
  {
    id: "bystander-effect",
    nom: "L'effet du témoin (Latané & Darley)",
    chercheurs: "John Darley et Bibb Latané",
    annee: "1968",
    lieu: "Université Columbia, New York",
    categorie: "social",
    difficulte: "facile",
    resume_court: "Face à une urgence simulée, une personne seule intervient presque systématiquement pour porter secours — mais plus il y a de témoins présents, moins chacun d'eux se sent individuellement responsable d'agir, et moins l'aide arrive vite.",
    histoire: "En 1964, le meurtre de Kitty Genovese à New York, présenté par la presse comme ayant été observé par des dizaines de voisins sans qu'aucun n'intervienne, pousse Darley et Latané à étudier scientifiquement ce paradoxe. Dans une série d'expériences, ils placent des participants seuls dans une pièce, en communication par interphone avec d'autres participants (en réalité des enregistrements), dont l'un simule une crise médicale grave en cours de conversation. Quand le participant croit être seul témoin de la crise, il intervient dans 85 % des cas, généralement très vite. Mais quand il croit que plusieurs autres personnes entendent aussi la crise, ce taux chute à 62 %, et le délai avant d'agir augmente nettement. Les chercheurs expliquent ce résultat par la « diffusion de la responsabilité » : plus il y a de témoins potentiels, plus chacun suppose, inconsciemment, qu'un autre va intervenir.",
    controverses: "Le cas Kitty Genovese lui-même, point de départ de la recherche, a depuis été largement remis en question : des enquêtes journalistiques ultérieures (notamment celle du New York Times en 2016) ont montré que le nombre de témoins ayant réellement observé toute la scène sans réagir avait été largement exagéré par la couverture médiatique originale de 1964, et que plusieurs voisins avaient en réalité appelé la police. L'effet du témoin, lui, a en revanche été répliqué de nombreuses fois en laboratoire et reste l'un des résultats les plus robustes de la psychologie sociale, indépendamment de l'exactitude du fait divers qui l'a inspiré.",
    exemples: [
      { titre: "Secourisme", texte: "Les formations aux premiers secours enseignent désormais à désigner nommément une personne précise dans la foule (« vous, en rouge, appelez le 15 ») pour contrer la diffusion de la responsabilité." },
      { titre: "Harcèlement en ligne", texte: "L'effet du témoin est cité pour expliquer pourquoi des commentaires haineux visibles par des milliers de personnes suscitent rarement une intervention individuelle." },
      { titre: "Sécurité en entreprise", texte: "Les protocoles d'alerte éthique interne sont conçus en partie pour contourner la dilution de responsabilité dans les grandes organisations." }
    ],
    qcm: [
      {
        question: "Que montre l'expérience de Darley et Latané sur l'aide apportée à une personne en détresse ?",
        choix: ["Plus il y a de témoins présents, plus l'aide arrive vite", "Plus il y a de témoins présents, moins chaque témoin se sent individuellement responsable d'intervenir", "Le nombre de témoins n'a aucune influence sur l'aide apportée", "Les témoins interviennent toujours immédiatement, quel que soit leur nombre"],
        bonne_reponse: 1,
        explication: "C'est la « diffusion de la responsabilité » : la présence supposée d'autres témoins réduit le sentiment de responsabilité individuelle de chacun."
      },
      {
        question: "Qu'a révélé une enquête journalistique plus récente sur le meurtre de Kitty Genovese ?",
        choix: ["Que le meurtre n'a jamais eu lieu", "Que le nombre de témoins passifs avait été largement exagéré, et que plusieurs voisins avaient en réalité appelé la police", "Que Kitty Genovese elle-même avait inventé les faits", "Que l'effet du témoin a été inventé après coup"],
        bonne_reponse: 1,
        explication: "Le récit médiatique original de 1964 s'est révélé exagéré, même si l'effet du témoin documenté ensuite en laboratoire reste solidement établi."
      },
      {
        question: "Quelle recommandation pratique découle directement de l'effet du témoin ?",
        choix: ["Éviter d'appeler à l'aide en public", "Désigner nommément une personne précise pour demander de l'aide plutôt que de s'adresser à la foule en général", "Attendre qu'un professionnel intervienne systématiquement en premier", "Ne jamais intervenir seul en cas d'urgence"],
        bonne_reponse: 1,
        explication: "Cibler une personne précise supprime l'ambiguïté sur qui est responsable d'agir, contournant la diffusion de la responsabilité."
      }
    ],
    identification: {
      situation: "Dans un centre commercial bondé, une personne s'effondre au sol. Des dizaines de passants ralentissent, regardent, mais continuent leur chemin sans s'arrêter — chacun supposant probablement qu'un autre, dans cette foule, va s'en occuper.",
      reponses_acceptees: ["effet du temoin", "effet spectateur", "bystander effect", "diffusion de la responsabilite"],
      indice: "Pense à l'expérience des années 1960 sur l'aide apportée à une personne en détresse selon le nombre de témoins présents."
    },
    sources: [
      { auteurs: "Darley, J. M., & Latané, B.", annee: 1968, titre: "Bystander intervention in emergencies: Diffusion of responsibility", revue: "Journal of Personality and Social Psychology, 8(4), 377–383", type: "étude originale" }
    ],
    experiences_liees: ["asch", "rosenhan"]
  },

  // ───────────────────────── MÉMOIRE ─────────────────────────
  {
    id: "loftus-palmer",
    nom: "La mémoire reconstruite (Loftus & Palmer)",
    chercheurs: "Elizabeth Loftus et John Palmer",
    annee: "1974",
    lieu: "Université de Washington",
    categorie: "memoire",
    difficulte: "facile",
    resume_court: "Des participants qui regardent la même vidéo d'un accident de voiture estiment une vitesse plus élevée quand on leur demande à quelle vitesse les voitures se sont « percutées » plutôt que « touchées » — un seul mot dans la question suffit à modifier le souvenir rapporté.",
    histoire: "Elizabeth Loftus et John Palmer montrent à des participants de courtes vidéos d'accidents de la route, puis leur posent une question portant sur la vitesse des véhicules, en ne faisant varier qu'un seul verbe : « À quelle vitesse roulaient les voitures quand elles se sont [contactées / touchées / percutées / cognées / fracassées] ? » Les estimations de vitesse rapportées varient significativement selon le verbe employé — le mot « fracassées » produit des estimations nettement plus élevées que « contactées », alors que tous les participants ont vu exactement la même scène. Dans une seconde expérience, une semaine plus tard, les participants interrogés avec le verbe « fracassées » sont aussi significativement plus nombreux à affirmer, à tort, avoir vu du verre brisé sur la scène — alors qu'il n'y en avait aucun dans la vidéo. La formulation de la question n'a donc pas seulement influencé l'estimation rapportée, mais semble avoir modifié le souvenir lui-même.",
    controverses: "Cette étude fondatrice a ouvert tout un champ de recherche sur les « faux souvenirs » et la fiabilité du témoignage oculaire, avec des implications directes sur les pratiques judiciaires. Loftus a ensuite été critiquée par une partie de la profession judiciaire pour son rôle d'expert dans des procès où son témoignage sur la fragilité de la mémoire a parfois été utilisé pour semer le doute sur des témoignages de victimes, notamment dans des affaires d'abus sexuels — un débat toujours vif sur l'équilibre entre rigueur scientifique sur la mémoire et risque de décrédibiliser des témoignages authentiques.",
    exemples: [
      { titre: "Interrogatoires policiers", texte: "Les protocoles modernes d'audition de témoins recommandent des questions ouvertes et neutres, précisément pour éviter l'effet documenté par Loftus et Palmer." },
      { titre: "Procès et plaidoiries", texte: "La façon dont un avocat formule une question à un témoin à la barre peut influencer, même involontairement, le souvenir rapporté." },
      { titre: "Sondages d'opinion", texte: "Le même principe — la formulation d'une question oriente la réponse — est exploité (ou évité) dans la conception des questionnaires d'enquête." }
    ],
    qcm: [
      {
        question: "Qu'ont fait varier Loftus et Palmer d'une condition à l'autre dans leur expérience ?",
        choix: ["La vitesse réelle des voitures dans la vidéo", "Un seul verbe dans la question posée aux participants après la vidéo", "Le nombre de participants regardant la vidéo", "La durée de la vidéo"],
        bonne_reponse: 1,
        explication: "Seul le verbe utilisé dans la question changeait — la vidéo, elle, était strictement identique pour tous."
      },
      {
        question: "Que s'est-il passé une semaine plus tard chez les participants interrogés avec le verbe « fracassées » ?",
        choix: ["Ils ont oublié la vidéo entièrement", "Ils étaient plus nombreux à affirmer, à tort, avoir vu du verre brisé qui n'existait pas dans la vidéo", "Ils se souvenaient parfaitement de la vitesse exacte", "Aucune différence n'a été observée"],
        bonne_reponse: 1,
        explication: "La formulation de la question initiale a modifié le souvenir même de la scène, pas seulement l'estimation rapportée sur le moment."
      },
      {
        question: "Quelle application concrète découle directement de cette recherche ?",
        choix: ["Aucune, l'étude reste purement théorique", "Les protocoles d'audition de témoins recommandent des questions neutres et ouvertes pour limiter la distorsion du souvenir", "Il faut systématiquement filmer les accidents pour éviter tout témoignage humain", "Les témoins doivent toujours répondre par un seul mot"],
        bonne_reponse: 1,
        explication: "Cette étude a directement influencé les bonnes pratiques d'audition de témoins en contexte judiciaire."
      }
    ],
    identification: {
      situation: "Deux enquêteurs interrogent séparément le même témoin d'une bagarre. Le premier demande : « À quelle vitesse l'homme a-t-il frappé la victime ? » Le second demande : « Que s'est-il passé, selon vous ? » Les deux comptes rendus qui en résultent diffèrent sensiblement, alors que le témoin a assisté à la même scène.",
      reponses_acceptees: ["loftus et palmer", "memoire reconstruite", "effet des questions suggestives", "reconstruction de la memoire"],
      indice: "Pense à l'expérience des années 1970 sur des vidéos d'accidents de voiture et des questions formulées différemment."
    },
    sources: [
      { auteurs: "Loftus, E. F., & Palmer, J. C.", annee: 1974, titre: "Reconstruction of automobile destruction: An example of the interaction between language and memory", revue: "Journal of Verbal Learning and Verbal Behavior, 13(5), 585–589", type: "étude originale" }
    ],
    experiences_liees: ["rosenhan", "marshmallow"]
  }
];
