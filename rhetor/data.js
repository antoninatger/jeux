// Rhetor — contenu (catégories + outils rhétoriques)
// Chaque source a été vérifiée (auteur, date, ouvrage/revue) avant intégration.

const CATEGORIES = [
  {
    id: "figures",
    nom: "Figures de style",
    nomLong: "Figures de style et procédés d'expression",
    classe: "c-figures",
    couleur: "#C9932E",
    description: "Comment la forme d'une phrase — répétition, image, symétrie — agit sur l'esprit avant même son contenu."
  },
  {
    id: "sophismes",
    nom: "Sophismes",
    nomLong: "Sophismes et raisonnements fallacieux",
    classe: "c-sophismes",
    couleur: "#A6303D",
    description: "Comment un raisonnement peut sembler valide tout en étant, sur le fond, trompeur ou invalide."
  },
  {
    id: "lexique",
    nom: "Lexique",
    nomLong: "Lexique fondamental de l'argumentation",
    classe: "c-lexique",
    couleur: "#2F6F76",
    description: "Les notions de base pour nommer précisément ce qu'on observe dans un discours."
  }
];

const OUTILS = [
  // ───────────────────────── FIGURES DE STYLE ─────────────────────────
  {
    id: "metaphore",
    nom: "Métaphore",
    origine: "Du grec metaphora, « transport, déplacement »",
    categorie: "figures",
    difficulte: "facile",
    definition_courte: "Figure de style qui consiste à désigner une chose par un mot qui en désigne normalement une autre, sur la base d'une ressemblance, sans mot de comparaison (« comme », « tel que »).",
    definition_longue: "La métaphore transporte le sens d'un mot vers un autre domaine en s'appuyant sur un point commun implicite : dire qu'une personne est « un roc » ne compare pas explicitement, elle assimile directement, ce qui force l'esprit à reconstruire lui-même le lien de ressemblance (ici, la solidité, l'inébranlabilité). Cette économie — dire une chose en en nommant une autre — rend le message plus dense et plus mémorable qu'une description littérale, car elle mobilise l'imagination plutôt que la seule logique. Aristote la considérait déjà comme la plus grande des qualités de style, la seule qu'on ne puisse apprendre d'autrui car elle suppose de percevoir soi-même des ressemblances. Elle est si présente dans le langage courant qu'elle en devient invisible (« le pied de la table », « saisir une idée »).",
    exemples: [
      { titre: "Politique", texte: "« Ce projet de loi est un mur contre l'injustice » assimile directement la loi à un mur protecteur, sans jamais dire « comme un mur »." },
      { titre: "Langage courant", texte: "« Il a dévoré son adversaire » présente le débat comme un repas, transférant l'idée d'une domination totale." },
      { titre: "Publicité", texte: "« Cette crème est une seconde peau » suggère une adhérence et une naturalité parfaites, sans l'affirmer littéralement." }
    ],
    qcm: [
      {
        question: "Qu'est-ce qui distingue la métaphore de la comparaison ?",
        choix: [
          "La métaphore utilise un mot de comparaison comme « comme » ou « tel que »",
          "La métaphore assimile directement deux éléments, sans mot de comparaison",
          "La métaphore ne s'applique qu'aux personnes",
          "Il n'existe aucune différence entre les deux"
        ],
        bonne_reponse: 1,
        explication: "La comparaison relie deux éléments par un mot comme « comme » ; la métaphore les fusionne directement, sans ce lien explicite."
      },
      {
        question: "« Cette entreprise est un navire qui prend l'eau » est un exemple de :",
        choix: ["Litote", "Métaphore", "Chiasme", "Syllogisme"],
        bonne_reponse: 1,
        explication: "L'entreprise est directement assimilée à un navire en perdition, sans comparaison explicite : c'est une métaphore."
      },
      {
        question: "Pourquoi la métaphore est-elle souvent plus persuasive qu'une description littérale ?",
        choix: [
          "Parce qu'elle est toujours plus courte",
          "Parce qu'elle mobilise l'imagination et impose une image mentale plutôt qu'un simple argument logique",
          "Parce qu'elle est plus facile à traduire",
          "Parce qu'elle évite toute ambiguïté"
        ],
        bonne_reponse: 1,
        explication: "En forçant l'esprit à reconstruire le lien de ressemblance, la métaphore engage l'imagination, ce qui renforce la mémorisation et l'adhésion."
      }
    ],
    identification: {
      situation: "Dans son discours, la candidate déclare : « Notre économie est un jardin à l'abandon : il est temps de désherber, replanter, et enfin récolter. » Elle ne dit jamais explicitement qu'elle compare l'économie à un jardin — elle le traite comme si c'en était un, du début à la fin de la phrase.",
      reponses_acceptees: ["metaphore"],
      indice: "Cherche le mot de comparaison (« comme », « tel que ») — tu ne le trouveras pas, alors que l'image est filée sur toute la phrase."
    },
    sources: [
      { auteurs: "Aristote", annee: "vers 350 av. J.-C.", titre: "Poétique et Rhétorique (traitement de la métaphore)", revue: "Corpus aristotélicien", type: "texte fondateur" },
      { auteurs: "Fontanier, P.", annee: 1968, titre: "Les Figures du discours (réédition, préf. G. Genette)", revue: "Flammarion", type: "ouvrage de référence" }
    ],
    outils_lies: ["chiasme", "triade-ethos-pathos-logos"]
  },
  {
    id: "anaphore",
    nom: "Anaphore",
    origine: "Du grec anaphora, « reprise, retour en arrière »",
    categorie: "figures",
    difficulte: "facile",
    definition_courte: "Figure de style qui consiste à répéter un même mot ou groupe de mots au début de plusieurs phrases, vers ou membres de phrase successifs, pour créer un effet de rythme et d'insistance.",
    definition_longue: "En reprenant systématiquement la même amorce, l'anaphore construit une architecture sonore qui guide l'écoute : chaque répétition relance l'attention et prépare une variation, ce qui rend l'ensemble plus facile à suivre et à retenir qu'une succession d'idées sans lien apparent. Ce martèlement crée aussi un effet d'accumulation qui peut faire paraître un argument plus fort qu'il ne l'est isolément — la force ne vient pas d'un contenu nouveau à chaque répétition, mais du rythme lui-même, qui installe une forme de conviction avant même que le contenu soit pesé. C'est l'un des outils les plus employés en rhétorique politique et publicitaire, précisément parce que son effet ne dépend pas de la qualité logique de l'argument.",
    exemples: [
      { titre: "Discours politique", texte: "« Nous nous battrons sur les plages, nous nous battrons sur les terrains de débarquement, nous nous battrons dans les champs et dans les rues » (Churchill, 1940) répète « nous nous battrons » pour installer une détermination inébranlable." },
      { titre: "Publicité", texte: "« Une voiture pour la ville. Une voiture pour la route. Une voiture pour la vie. » répète « une voiture pour » afin de faire percevoir un seul produit comme universellement adapté." },
      { titre: "Chanson", texte: "Répéter « je me souviens » au début de chaque couplet installe une tonalité nostalgique avant même que le contenu de chaque souvenir soit énoncé." }
    ],
    qcm: [
      {
        question: "L'anaphore consiste à :",
        choix: [
          "Répéter un mot ou groupe de mots en fin de phrase",
          "Répéter un mot ou groupe de mots au début de phrases ou membres de phrase successifs",
          "Employer un mot pour un autre par ressemblance",
          "Poser une question sans attendre de réponse"
        ],
        bonne_reponse: 1,
        explication: "C'est la répétition en position initiale, sur plusieurs unités successives, qui définit l'anaphore."
      },
      {
        question: "Pourquoi l'anaphore peut-elle rendre un argument plus persuasif sans le renforcer logiquement ?",
        choix: [
          "Parce qu'elle ajoute systématiquement de nouvelles preuves à chaque répétition",
          "Parce que le rythme et l'accumulation créent un sentiment de force indépendant du contenu réel",
          "Parce qu'elle raccourcit toujours le message",
          "Parce qu'elle est réservée aux textes écrits"
        ],
        bonne_reponse: 1,
        explication: "L'effet persuasif vient de la forme rythmique, pas d'un apport d'information supplémentaire à chaque répétition."
      },
      {
        question: "En quoi l'anaphore diffère-t-elle de la métaphore ?",
        choix: [
          "Ce sont deux noms pour le même procédé",
          "L'anaphore joue sur la répétition d'une structure ; la métaphore joue sur l'assimilation de deux idées",
          "La métaphore est un procédé oral uniquement",
          "L'anaphore ne s'utilise qu'en poésie"
        ],
        bonne_reponse: 1,
        explication: "L'anaphore est un procédé de répétition rythmique ; la métaphore est un procédé de substitution de sens. Ils peuvent se combiner mais reposent sur des mécanismes différents."
      }
    ],
    identification: {
      situation: "Dans son discours de lancement, le PDG répète : « Cette année, nous investissons. Cette année, nous recrutons. Cette année, nous gagnons. » Aucune de ces trois phrases n'apporte de détail chiffré — mais l'auditoire ressort du discours convaincu que l'entreprise est en pleine expansion.",
      reponses_acceptees: ["anaphore"],
      indice: "Regarde ce qui est répété au tout début de chaque phrase."
    },
    sources: [
      { auteurs: "Quintilien", annee: "vers 95 apr. J.-C.", titre: "Institutio Oratoria (livre IX, figures de répétition)", revue: "Traité de rhétorique romaine", type: "texte fondateur" },
      { auteurs: "Fontanier, P.", annee: 1968, titre: "Les Figures du discours (réédition, préf. G. Genette)", revue: "Flammarion", type: "ouvrage de référence" }
    ],
    outils_lies: ["metaphore", "triade-ethos-pathos-logos"]
  },
  {
    id: "litote",
    nom: "Litote",
    origine: "Du grec litotês, « simplicité, sobriété »",
    categorie: "figures",
    difficulte: "intermédiaire",
    definition_courte: "Figure de style qui consiste à dire moins pour suggérer plus, souvent par une négation portant sur le contraire de ce qu'on veut affirmer.",
    definition_longue: "La litote atténue en apparence l'expression pour, paradoxalement, renforcer l'idée réellement visée : dire « ce n'est pas mauvais » pour signifier « c'est très bon » laisse à l'interlocuteur le soin de compléter lui-même l'intensité du jugement, ce qui rend l'affirmation plus difficile à contester frontalement qu'une déclaration directe. Contrairement à l'euphémisme, qui adoucit une réalité désagréable, la litote garde intacte l'idée forte mais la fait passer par un détour négatif ou minimisant — un procédé fréquent en négociation et en diplomatie, où affirmer trop directement expose à la contradiction. Le vers de Corneille « Va, je ne te hais point » (Le Cid) en est l'exemple le plus cité en français : dire qu'on ne hait pas quelqu'un, dans ce contexte, revient à dire qu'on l'aime profondément.",
    exemples: [
      { titre: "Diplomatie", texte: "« Nous ne sommes pas pleinement satisfaits de cet accord » signifie, dans le registre diplomatique, un net désaccord — sans jamais le dire frontalement." },
      { titre: "Vie quotidienne", texte: "« Ce n'est pas donné » pour dire qu'un prix est très élevé atténue le jugement tout en le rendant parfaitement clair." },
      { titre: "Littérature", texte: "« Va, je ne te hais point » (Corneille, Le Cid) exprime, par la négation de la haine, un amour que le personnage ne peut pas encore avouer directement." }
    ],
    qcm: [
      {
        question: "La litote consiste à :",
        choix: [
          "Exagérer une réalité pour la rendre spectaculaire",
          "Dire moins pour suggérer plus, souvent par une négation du contraire",
          "Répéter un mot en début de phrase",
          "Poser une question dont la réponse est évidente"
        ],
        bonne_reponse: 1,
        explication: "C'est l'atténuation apparente — dire moins — qui, paradoxalement, renforce l'idée réelle : c'est la définition de la litote."
      },
      {
        question: "Quelle est la différence entre litote et euphémisme ?",
        choix: [
          "Ce sont deux noms pour le même procédé",
          "La litote atténue la forme tout en gardant l'intensité du fond ; l'euphémisme adoucit une réalité jugée trop dure à énoncer",
          "L'euphémisme ne s'utilise qu'à l'oral",
          "La litote est toujours une exagération"
        ],
        bonne_reponse: 1,
        explication: "La litote dit moins pour faire entendre plus fort ; l'euphémisme dit autrement pour adoucir un fond désagréable (« il nous a quittés » pour « il est mort »)."
      },
      {
        question: "Un recruteur écrit : « Le dossier de ce candidat n'est pas inintéressant. » Quel est l'effet recherché ?",
        choix: [
          "Décourager totalement le candidat",
          "Suggérer, par litote, un intérêt réel sans s'engager pleinement",
          "Insulter indirectement le candidat",
          "Aucun effet particulier"
        ],
        bonne_reponse: 1,
        explication: "La double négation atténuée (« pas inintéressant ») laisse entendre un intérêt réel, tout en gardant une distance prudente typique du registre professionnel."
      }
    ],
    identification: {
      situation: "Après avoir lu le rapport, la directrice se contente de dire : « Ce n'est pas notre meilleur trimestre. » Personne dans la salle ne se méprend : les chiffres sont mauvais, mais elle n'a jamais prononcé le mot « échec ».",
      reponses_acceptees: ["litote"],
      indice: "Regarde ce qu'elle ne dit pas directement, et compare-le à ce que tout le monde comprend quand même."
    },
    sources: [
      { auteurs: "Fontanier, P.", annee: 1968, titre: "Les Figures du discours (réédition, préf. G. Genette)", revue: "Flammarion", type: "ouvrage de référence" }
    ],
    outils_lies: ["metaphore", "chiasme"]
  },
  {
    id: "chiasme",
    nom: "Chiasme",
    origine: "Du grec khiasmos, d'après la lettre khi (Χ), pour sa disposition en croix",
    categorie: "figures",
    difficulte: "intermédiaire",
    definition_courte: "Figure de style qui consiste à disposer deux paires de termes en miroir (A-B puis B-A), créant un effet de symétrie inversée.",
    definition_longue: "Le chiasme organise une phrase en croix : les éléments apparaissent dans l'ordre A puis B, puis sont repris dans l'ordre inverse B puis A, ce qui crée un effet de bouclage qui marque durablement la mémoire — c'est l'une des structures les plus citées de l'histoire politique (« Ne demande pas ce que ton pays peut faire pour toi, demande ce que tu peux faire pour ton pays », Kennedy, 1961, inverse « pays »/« toi » puis « toi »/« pays »). Cette symétrie donne une impression de grande maîtrise rhétorique et de vérité presque géométrique, alors qu'elle ne prouve rien de plus qu'une phrase construite normalement — l'effet tient entièrement à l'architecture de la phrase, pas à la solidité de l'argument qu'elle porte.",
    exemples: [
      { titre: "Discours politique", texte: "« Ne demande pas ce que ton pays peut faire pour toi, demande ce que tu peux faire pour ton pays » (J.F. Kennedy, 1961) inverse exactement les deux mêmes termes." },
      { titre: "Maxime", texte: "« Il faut manger pour vivre, et non vivre pour manger » inverse « manger »/« vivre » pour opposer deux hiérarchies de valeurs." },
      { titre: "Slogan", texte: "« Ce n'est pas la taille du chien dans le combat, c'est la taille du combat dans le chien » construit la même symétrie en croix pour renverser la perspective." }
    ],
    qcm: [
      {
        question: "Le chiasme se reconnaît à :",
        choix: [
          "La répétition d'un même mot en début de phrase",
          "Une disposition en miroir de deux paires de termes (A-B puis B-A)",
          "Une négation qui suggère le contraire de ce qu'elle affirme",
          "Une question sans réponse attendue"
        ],
        bonne_reponse: 1,
        explication: "C'est l'inversion symétrique des termes, en forme de croix, qui définit le chiasme."
      },
      {
        question: "Pourquoi le chiasme est-il souvent perçu comme un argument fort, alors qu'il n'apporte aucune preuve nouvelle ?",
        choix: [
          "Parce qu'il est toujours accompagné de statistiques",
          "Parce que sa symétrie donne une impression de maîtrise et de vérité géométrique, indépendamment du contenu",
          "Parce qu'il ne peut être utilisé qu'en mathématiques",
          "Parce qu'il répète systématiquement les mêmes chiffres"
        ],
        bonne_reponse: 1,
        explication: "L'effet du chiasme tient à sa structure — l'architecture symétrique de la phrase —, pas à la solidité logique de ce qu'il affirme."
      },
      {
        question: "Quelle est la différence entre le chiasme et l'anaphore ?",
        choix: [
          "Aucune, ce sont deux noms pour le même procédé",
          "L'anaphore répète un même élément en tête de plusieurs phrases ; le chiasme inverse deux paires de termes en miroir",
          "Le chiasme ne s'applique qu'à l'écrit",
          "L'anaphore est toujours plus longue que le chiasme"
        ],
        bonne_reponse: 1,
        explication: "L'anaphore répète ; le chiasme inverse. Deux mécaniques de construction de phrase différentes, toutes deux utilisées pour marquer la mémoire."
      }
    ],
    identification: {
      situation: "Un formateur conclut son atelier par : « On n'apprend pas à décider en évitant les erreurs, on apprend à éviter les erreurs en décidant. » La salle retient surtout cette phrase, alors qu'elle n'a rien ajouté aux exemples déjà donnés pendant l'atelier.",
      reponses_acceptees: ["chiasme"],
      indice: "Repère les deux mêmes mots, et regarde dans quel ordre ils apparaissent la première fois, puis la seconde."
    },
    sources: [
      { auteurs: "Quintilien", annee: "vers 95 apr. J.-C.", titre: "Institutio Oratoria (figures de construction symétrique)", revue: "Traité de rhétorique romaine", type: "texte fondateur" },
      { auteurs: "Fontanier, P.", annee: 1968, titre: "Les Figures du discours (réédition, préf. G. Genette)", revue: "Flammarion", type: "ouvrage de référence" }
    ],
    outils_lies: ["anaphore", "metaphore"]
  },

  // ───────────────────────── SOPHISMES ─────────────────────────
  {
    id: "ad-hominem",
    nom: "Ad hominem",
    origine: "Locution latine, littéralement « [dirigé] vers la personne »",
    categorie: "sophismes",
    difficulte: "facile",
    definition_courte: "Sophisme qui consiste à attaquer la personne qui avance un argument — sa crédibilité, son caractère, ses motivations — plutôt que de répondre à l'argument lui-même.",
    definition_longue: "Un raisonnement ad hominem déplace le débat : au lieu d'examiner si un argument est vrai ou faux, il cherche à discréditer celui qui le formule, en espérant que le public rejettera l'argument par association. Le procédé fonctionne parce qu'il exploite un raccourci naturel — on fait plus facilement confiance à une source jugée crédible — mais il est logiquement invalide : la valeur d'un argument ne dépend pas du caractère de la personne qui l'énonce (un menteur peut dire une vérité mathématique, un saint peut se tromper de calcul). Toutes les attaques personnelles ne sont pas des sophismes ad hominem à proprement parler : questionner légitimement la compétence d'un expert sur le sujet précis dont il parle peut être pertinent — le sophisme apparaît quand l'attaque personnelle remplace complètement la discussion de l'argument, sans jamais y revenir.",
    exemples: [
      { titre: "Débat politique", texte: "« Comment croire ses propositions économiques, il a lui-même fait faillite deux fois » rejette l'argument sans jamais en examiner le contenu." },
      { titre: "Réseaux sociaux", texte: "« Il critique ce gouvernement mais il n'a jamais voté, alors son avis ne compte pas » écarte une critique par la biographie de son auteur, pas par son contenu." },
      { titre: "Milieu scientifique", texte: "« Cette étude sur le climat ne vaut rien, son auteur est payé par une ONG » ignore la méthodologie de l'étude pour se concentrer sur le financement de son auteur." }
    ],
    qcm: [
      {
        question: "Le sophisme ad hominem consiste à :",
        choix: [
          "Démontrer qu'un argument est faux à l'aide de faits",
          "Attaquer la personne qui avance un argument plutôt que l'argument lui-même",
          "Répéter un argument jusqu'à ce qu'il soit accepté",
          "Proposer un choix limité à deux options"
        ],
        bonne_reponse: 1,
        explication: "C'est le déplacement de la discussion, de l'argument vers la personne, qui définit l'ad hominem."
      },
      {
        question: "Pourquoi un ad hominem est-il logiquement invalide ?",
        choix: [
          "Parce qu'il est toujours faux factuellement",
          "Parce que la vérité ou la fausseté d'un argument ne dépend pas du caractère de la personne qui l'énonce",
          "Parce qu'il ne peut être utilisé qu'à l'oral",
          "Parce qu'il n'existe qu'en politique"
        ],
        bonne_reponse: 1,
        explication: "Un argument peut être vrai même énoncé par une personne peu recommandable — la validité logique est indépendante de la source."
      },
      {
        question: "Dans quel cas une remarque sur la personne n'est-elle PAS un sophisme ad hominem ?",
        choix: [
          "Quand elle remplace totalement l'examen de l'argument",
          "Quand elle questionne légitimement la compétence de l'auteur sur le sujet précis dont il parle, sans écarter d'examiner l'argument",
          "Jamais, toute mention de la personne est un sophisme",
          "Uniquement si elle est formulée poliment"
        ],
        bonne_reponse: 1,
        explication: "Questionner une compétence pertinente peut être légitime ; le sophisme apparaît quand cette remarque se substitue entièrement à la discussion de l'argument."
      }
    ],
    identification: {
      situation: "En réunion, quelqu'un propose de revoir le budget marketing. Un collègue répond : « Facile à dire pour toi qui as toujours eu le plus gros budget de l'équipe. » Le budget proposé n'a, à aucun moment, été discuté sur le fond.",
      reponses_acceptees: ["ad hominem", "argument ad hominem", "attaque personnelle"],
      indice: "Regarde si la réponse porte sur le budget proposé, ou sur la personne qui le propose."
    },
    sources: [
      { auteurs: "Locke, J.", annee: 1690, titre: "An Essay Concerning Human Understanding (livre IV, chap. XVII)", revue: "Traité philosophique classique", type: "texte fondateur" },
      { auteurs: "Walton, D.", annee: 1998, titre: "Ad Hominem Arguments", revue: "University of Alabama Press", type: "ouvrage de référence" }
    ],
    outils_lies: ["homme-de-paille", "faux-dilemme"]
  },
  {
    id: "pente-glissante",
    nom: "Pente glissante",
    origine: "Traduction du terme anglais slippery slope argument",
    categorie: "sophismes",
    difficulte: "intermédiaire",
    definition_courte: "Sophisme qui affirme qu'une première action mènera inévitablement, par un enchaînement de conséquences, à une situation extrême et indésirable — sans démontrer que cet enchaînement est réellement nécessaire.",
    definition_longue: "L'argument de la pente glissante construit une chaîne de causalité entre une première étape anodine et une conclusion catastrophique, en faisant comme si chaque maillon découlait automatiquement du précédent. Le problème n'est pas l'idée qu'une action puisse avoir des conséquences en cascade — cela arrive réellement — mais l'absence de démonstration que cette cascade est probable ou inévitable : le sophisme remplace une évaluation réelle des probabilités par un enchaînement rhétorique qui semble logique sans l'être. Certains raisonnements en pente glissante sont légitimes, quand chaque étape est effectivement étayée ; le sophisme apparaît quand les étapes intermédiaires sont simplement affirmées, jamais démontrées.",
    exemples: [
      { titre: "Débat de société", texte: "« Si on autorise cette exception, demain tout le monde en réclamera une, et le système entier s'effondrera » saute de « une exception » à « effondrement du système » sans détailler les étapes intermédiaires." },
      { titre: "Éducation", texte: "« Si on autorise les téléphones en classe, les élèves n'écouteront plus rien, et le niveau scolaire s'effondrera » enchaîne plusieurs conséquences non démontrées comme si elles étaient automatiques." },
      { titre: "Milieu professionnel", texte: "« Si on accepte le télétravail un jour par semaine, plus personne ne viendra au bureau, et l'entreprise perdra sa culture » présente une conséquence extrême comme la suite logique et inévitable d'un changement mineur." }
    ],
    qcm: [
      {
        question: "L'argument de la pente glissante consiste à :",
        choix: [
          "Démontrer étape par étape qu'une conséquence est probable",
          "Affirmer qu'une première action mènera inévitablement à une conséquence extrême, sans démontrer l'enchaînement",
          "Attaquer la personne qui propose l'action",
          "Poser un choix limité à deux options extrêmes"
        ],
        bonne_reponse: 1,
        explication: "Le sophisme réside dans l'absence de démonstration de chaque étape de l'enchaînement, pas dans l'idée même de conséquences en cascade."
      },
      {
        question: "Un raisonnement en pente glissante peut-il être légitime ?",
        choix: [
          "Non, jamais, c'est toujours un sophisme",
          "Oui, si chaque étape de l'enchaînement est effectivement démontrée et probable, et pas seulement affirmée",
          "Oui, mais seulement en sciences exactes",
          "Non, car il s'agit toujours d'une attaque personnelle"
        ],
        bonne_reponse: 1,
        explication: "La pente glissante devient un sophisme quand les étapes intermédiaires sont de simples affirmations non étayées ; un enchaînement réellement démontré n'est pas fallacieux."
      },
      {
        question: "« Si on repousse cette réunion d'une heure, plus personne ne respectera jamais les horaires, et toute l'organisation s'effondrera » est un exemple de :",
        choix: ["Ad hominem", "Pente glissante", "Chiasme", "Litote"],
        bonne_reponse: 1,
        explication: "L'enchaînement va d'un fait mineur (repousser une réunion) à une conséquence extrême (effondrement de l'organisation) sans démontrer aucune étape intermédiaire."
      }
    ],
    identification: {
      situation: "Face à la proposition d'autoriser les baskets le vendredi, un responsable RH objecte : « Aujourd'hui les baskets, demain le jogging, après-demain plus personne ne s'habillera correctement, et notre image en pâtira auprès de tous nos clients. »",
      reponses_acceptees: ["pente glissante", "argument de la pente glissante", "sophisme de la pente glissante"],
      indice: "Compte le nombre d'étapes entre le point de départ et la conclusion catastrophique — et demande-toi si chacune est démontrée."
    },
    sources: [
      { auteurs: "Walton, D.", annee: 1992, titre: "Slippery Slope Arguments", revue: "Oxford University Press", type: "ouvrage de référence" }
    ],
    outils_lies: ["faux-dilemme", "homme-de-paille"]
  },
  {
    id: "homme-de-paille",
    nom: "Homme de paille",
    origine: "Traduction de l'anglais straw man argument",
    categorie: "sophismes",
    difficulte: "intermédiaire",
    definition_courte: "Sophisme qui consiste à déformer, simplifier à l'excès ou exagérer la position d'un adversaire pour la rendre plus facile à attaquer, puis à réfuter cette version déformée comme si c'était l'argument réel.",
    definition_longue: "Le procédé tire son nom d'un mannequin de paille : il est bien plus facile de « vaincre » une version affaiblie et caricaturale d'un argument que de s'attaquer à sa formulation réelle, la plus solide. L'homme de paille donne l'illusion d'avoir réfuté une position, alors qu'il n'a réfuté qu'une caricature de cette position — ce qui ne prouve rien contre l'argument que la personne défendait réellement. Des travaux académiques récents distinguent plusieurs formes : la déformation pure et simple de l'argument, mais aussi le fait de ne répondre qu'à sa version la plus faible parmi plusieurs versions possibles, en ignorant les formulations plus solides.",
    exemples: [
      { titre: "Débat de société", texte: "À quelqu'un qui propose de mieux réguler un secteur, on répond : « Donc tu veux tout interdire et détruire l'économie ? » — ce que personne n'a proposé." },
      { titre: "Vie de couple", texte: "« Tu dis que tu veux qu'on sorte plus souvent ? Donc pour toi je ne fais jamais rien de bien à la maison ? » gonfle une remarque ponctuelle en accusation générale." },
      { titre: "Débat scientifique", texte: "Réduire une théorie nuancée à sa version la plus simpliste pour la ridiculiser plus facilement, sans jamais discuter sa version réelle telle que défendue par les spécialistes du domaine." }
    ],
    qcm: [
      {
        question: "L'homme de paille consiste à :",
        choix: [
          "Répondre fidèlement à l'argument le plus solide de l'adversaire",
          "Déformer ou simplifier à l'excès la position d'un adversaire pour la réfuter plus facilement",
          "Attaquer la crédibilité personnelle de l'adversaire",
          "Affirmer qu'une action mènera à une catastrophe"
        ],
        bonne_reponse: 1,
        explication: "C'est la déformation de l'argument réel en une version caricaturale et plus facile à attaquer qui définit l'homme de paille."
      },
      {
        question: "Pourquoi réfuter un homme de paille ne prouve-t-il rien contre l'argument réel de l'adversaire ?",
        choix: [
          "Parce que la version réfutée n'est pas celle que l'adversaire défendait réellement",
          "Parce que l'homme de paille est toujours vrai",
          "Parce que l'adversaire change constamment d'avis",
          "Parce qu'il s'agit d'une attaque personnelle et non d'un argument"
        ],
        bonne_reponse: 0,
        explication: "Vaincre une caricature ne dit rien sur la solidité de la position réellement défendue — la victoire est illusoire."
      },
      {
        question: "En quoi l'homme de paille diffère-t-il de l'ad hominem ?",
        choix: [
          "Ce sont deux noms pour le même sophisme",
          "L'homme de paille déforme l'argument de l'adversaire ; l'ad hominem attaque la personne plutôt que l'argument",
          "L'ad hominem ne s'utilise qu'à l'écrit",
          "L'homme de paille est toujours plus poli que l'ad hominem"
        ],
        bonne_reponse: 1,
        explication: "Les deux évitent de traiter l'argument réel, mais par des voies différentes : déformation du contenu vs attaque de la source."
      }
    ],
    identification: {
      situation: "Un employé suggère d'autoriser deux jours de télétravail par semaine. Son manager répond en réunion : « Donc pour toi, plus personne ne devrait jamais venir au bureau ? » — alors que l'employé n'a jamais parlé de supprimer totalement la présence au bureau.",
      reponses_acceptees: ["homme de paille", "argument de l homme de paille", "sophisme de l homme de paille", "straw man"],
      indice: "Compare ce que l'employé a réellement proposé à ce que le manager lui fait dire."
    },
    sources: [
      { auteurs: "Talisse, R., & Aikin, S. F.", annee: 2006, titre: "Two Forms of the Straw Man", revue: "Argumentation, 20(3), 345–352", type: "ouvrage de référence", lien: "https://doi.org/10.1007/s10503-006-9017-8" }
    ],
    outils_lies: ["ad-hominem", "faux-dilemme"]
  },
  {
    id: "faux-dilemme",
    nom: "Faux dilemme",
    origine: "Aussi appelé « fausse dichotomie » ; du grec dilēmma, « double proposition »",
    categorie: "sophismes",
    difficulte: "facile",
    definition_courte: "Sophisme qui présente une situation comme n'offrant que deux options possibles, généralement extrêmes, alors que d'autres options existent.",
    definition_longue: "Le faux dilemme force un choix entre deux issues présentées comme exhaustives et exclusives (« c'est l'un ou c'est l'autre »), alors qu'en réalité un éventail de positions intermédiaires ou alternatives existe. Ce cadrage est rhétoriquement efficace parce qu'il retire une option à l'interlocuteur avant même qu'il ait pu l'envisager : en acceptant les termes du dilemme, on a déjà perdu la partie de la discussion qui portait sur le nombre d'options réellement disponibles. Toutes les alternatives à deux termes ne sont pas des faux dilemmes — certaines situations sont réellement binaires — le sophisme apparaît quand des options réelles sont occultées pour simplifier artificiellement le choix.",
    exemples: [
      { titre: "Débat politique", texte: "« Soit vous êtes avec nous, soit vous êtes contre nous » élimine toute position nuancée ou conditionnelle." },
      { titre: "Milieu professionnel", texte: "« Soit on licencie, soit l'entreprise coule » ignore d'autres leviers possibles (réduction des coûts, nouveaux marchés, restructuration partielle)." },
      { titre: "Vie quotidienne", texte: "« Si tu ne me soutiens pas sur ce point, c'est que tu es contre moi » ne laisse aucune place à un désaccord ponctuel sans rupture générale." }
    ],
    qcm: [
      {
        question: "Le faux dilemme consiste à :",
        choix: [
          "Présenter une situation comme n'offrant que deux options, en occultant les alternatives réellement existantes",
          "Répéter un argument jusqu'à ce qu'il soit accepté",
          "Attaquer la crédibilité de la personne qui parle",
          "Déformer la position d'un adversaire"
        ],
        bonne_reponse: 0,
        explication: "C'est la réduction artificielle du nombre d'options disponibles qui définit le faux dilemme."
      },
      {
        question: "Toute alternative à deux termes est-elle un faux dilemme ?",
        choix: [
          "Oui, systématiquement",
          "Non : certaines situations sont réellement binaires ; le sophisme n'apparaît que si des options réelles sont occultées",
          "Non, un faux dilemme comporte toujours plus de deux options",
          "Oui, car il n'existe jamais de situation réellement binaire"
        ],
        bonne_reponse: 1,
        explication: "Le faux dilemme est un sophisme seulement quand des alternatives réelles existent et sont dissimulées — pas quand l'alternative est authentiquement binaire."
      },
      {
        question: "« Soit on adopte cette réforme telle quelle, soit on ne change rien du tout » est un exemple de :",
        choix: ["Homme de paille", "Faux dilemme", "Anaphore", "Ad hominem"],
        bonne_reponse: 1,
        explication: "Cette phrase occulte toute possibilité de réforme partielle ou amendée, réduisant artificiellement le choix à deux extrêmes."
      }
    ],
    identification: {
      situation: "En conseil de classe, un enseignant déclare : « Soit vous acceptez ce contrôle surprise, soit vous acceptez de ne rien apprendre sérieusement cette année. » Aucune autre méthode d'évaluation n'est même mentionnée.",
      reponses_acceptees: ["faux dilemme", "fausse dichotomie"],
      indice: "Compte réellement les options qui existent, au-delà des deux qu'on te propose."
    },
    sources: [
      { auteurs: "Hamblin, C. L.", annee: 1970, titre: "Fallacies", revue: "Methuen", type: "ouvrage de référence" }
    ],
    outils_lies: ["pente-glissante", "homme-de-paille"]
  },

  // ───────────────────────── LEXIQUE ─────────────────────────
  {
    id: "triade-ethos-pathos-logos",
    nom: "La triade ethos, pathos, logos",
    origine: "Du grec ēthos (caractère), pathos (émotion) et logos (raison, parole)",
    categorie: "lexique",
    difficulte: "intermédiaire",
    definition_courte: "Les trois moyens de persuasion identifiés par Aristote : convaincre par la crédibilité de l'orateur (ethos), par l'émotion suscitée chez l'auditoire (pathos), ou par la solidité du raisonnement (logos).",
    definition_longue: "Aristote distingue trois leviers, mobilisables séparément ou ensemble, pour emporter l'adhésion d'un auditoire : l'ethos repose sur la crédibilité perçue de celui qui parle (son expertise, son honnêteté apparente, son autorité) ; le pathos repose sur l'émotion qu'il parvient à susciter (peur, indignation, espoir, compassion) ; le logos repose sur la cohérence logique et les preuves apportées à l'appui du propos. Un discours efficace mobilise généralement les trois à des degrés divers — un argument parfaitement logique mais porté par un orateur perçu comme malhonnête convainc rarement, de même qu'un discours purement émotionnel sans aucun contenu factuel finit par sonner creux. Cette triade reste, plus de deux mille ans après sa formulation, le cadre de référence pour analyser n'importe quel discours persuasif, du plaidoyer judiciaire à la publicité contemporaine.",
    exemples: [
      { titre: "Ethos", texte: "Un médecin qui commence son intervention en rappelant ses vingt ans d'expérience clinique installe sa crédibilité avant même d'exposer son argument." },
      { titre: "Pathos", texte: "Une association caritative qui montre l'histoire personnelle d'un enfant plutôt que des statistiques globales mise sur l'émotion pour déclencher un don." },
      { titre: "Logos", texte: "Un rapport qui aligne données chiffrées, méthodologie et comparaisons internationales pour justifier une politique publique s'appuie principalement sur le logos." }
    ],
    qcm: [
      {
        question: "Que désigne le pathos dans la triade rhétorique d'Aristote ?",
        choix: ["La crédibilité de l'orateur", "L'émotion suscitée chez l'auditoire", "La solidité logique de l'argument", "La longueur du discours"],
        bonne_reponse: 1,
        explication: "Le pathos correspond à la persuasion par l'émotion, distincte de l'ethos (crédibilité) et du logos (raisonnement)."
      },
      {
        question: "Pourquoi un discours purement logique peut-il échouer à convaincre malgré des arguments solides ?",
        choix: [
          "Parce que le logos seul ne suffit jamais à convaincre qui que ce soit",
          "Parce que si l'orateur n'inspire pas confiance (ethos) ou ne suscite aucune adhésion émotionnelle (pathos), la solidité logique seule peine à emporter l'adhésion",
          "Parce que le logos est toujours moins important que le pathos",
          "Parce que la logique n'a aucun effet sur la persuasion"
        ],
        bonne_reponse: 1,
        explication: "Les trois leviers se renforcent mutuellement ; un logos solide sans ethos ni pathos convainc rarement à lui seul un auditoire non spécialiste."
      },
      {
        question: "Un candidat qui répète en boucle des chiffres de chômage sans jamais raconter une histoire humaine ni établir sa propre crédibilité mobilise surtout :",
        choix: ["Le pathos", "L'ethos", "Le logos", "Le chiasme"],
        bonne_reponse: 2,
        explication: "L'usage exclusif de données chiffrées, sans appel à l'émotion ni construction de crédibilité personnelle, relève principalement du logos."
      }
    ],
    identification: {
      situation: "Avant de présenter ses trois graphiques de ventes, la directrice commerciale rappelle qu'elle occupe ce poste depuis douze ans et qu'elle a personnellement négocié les plus gros contrats de l'entreprise — puis elle raconte l'histoire d'un client qui a failli fermer avant que leur solution ne le sauve, avant d'enchaîner sur les chiffres.",
      reponses_acceptees: ["ethos pathos logos", "triade rhetorique", "les trois preuves rhetoriques", "ethos pathos et logos"],
      indice: "Repère les trois moments distincts de son intervention : ce qu'elle établit sur elle-même, ce qu'elle raconte, et ce qu'elle prouve."
    },
    sources: [
      { auteurs: "Aristote", annee: "vers 350 av. J.-C.", titre: "Rhétorique (livre I, les trois moyens de persuasion)", revue: "Corpus aristotélicien", type: "texte fondateur" },
      { auteurs: "Perelman, C., & Olbrechts-Tyteca, L.", annee: 1958, titre: "Traité de l'argumentation : la nouvelle rhétorique", revue: "Presses universitaires de France", type: "ouvrage de référence" }
    ],
    outils_lies: ["syllogisme", "anaphore"]
  },
  {
    id: "syllogisme",
    nom: "Syllogisme",
    origine: "Du grec syllogismos, « déduction, raisonnement qui conclut »",
    categorie: "lexique",
    difficulte: "avancé",
    definition_courte: "Raisonnement logique en trois temps — deux prémisses et une conclusion — où la conclusion découle nécessairement des prémisses si elles sont vraies et la structure valide.",
    definition_longue: "Le syllogisme est la forme la plus classique du raisonnement déductif : à partir d'une prémisse majeure générale et d'une prémisse mineure particulière, on tire une conclusion qui s'impose nécessairement — l'exemple canonique étant « Tous les hommes sont mortels ; Socrate est un homme ; donc Socrate est mortel. » Sa force est aussi son piège : un syllogisme peut être parfaitement valide dans sa structure (la conclusion découle bien des prémisses) tout en étant faux dans les faits, si l'une des prémisses est fausse (« Tous les oiseaux volent ; les pingouins sont des oiseaux ; donc les pingouins volent » est structurellement valide mais factuellement faux, car la prémisse majeure est fausse). Beaucoup de sophismes rhétoriques empruntent l'apparence d'un syllogisme — la forme rassurante du raisonnement en trois temps — sans que les prémisses de départ soient réellement vraies ou pertinentes, ce qui donne une fausse impression de rigueur logique.",
    exemples: [
      { titre: "Raisonnement valide", texte: "« Tout métal conduit l'électricité ; le cuivre est un métal ; donc le cuivre conduit l'électricité » est un syllogisme valide dont les prémisses sont vraies." },
      { titre: "Syllogisme fallacieux", texte: "« Tous les grands champions s'entraînent tôt le matin ; je m'entraîne tôt le matin ; donc je deviendrai un grand champion » a la forme d'un syllogisme mais sa logique est invalide." },
      { titre: "Publicité", texte: "« Les gens en bonne santé boivent notre jus ; buvez notre jus ; vous serez en bonne santé » emprunte la structure rassurante du syllogisme pour habiller une promesse commerciale sans preuve causale réelle." }
    ],
    qcm: [
      {
        question: "Un syllogisme est composé de :",
        choix: ["Une seule affirmation générale", "Deux prémisses et une conclusion qui en découle logiquement", "Une question suivie d'une réponse", "Trois exemples concrets sans lien logique"],
        bonne_reponse: 1,
        explication: "La structure en trois temps — prémisse majeure, prémisse mineure, conclusion — définit le syllogisme classique."
      },
      {
        question: "Un syllogisme structurellement valide peut-il aboutir à une conclusion fausse ?",
        choix: [
          "Non, jamais, la validité garantit toujours la vérité",
          "Oui, si l'une des prémisses de départ est fausse, même si la structure logique est correcte",
          "Non, car un syllogisme n'a jamais de prémisses fausses",
          "Oui, mais uniquement en mathématiques"
        ],
        bonne_reponse: 1,
        explication: "La validité logique porte sur la structure (la conclusion découle-t-elle des prémisses ?), pas sur la vérité factuelle des prémisses elles-mêmes."
      },
      {
        question: "Pourquoi certains sophismes empruntent-ils la forme du syllogisme ?",
        choix: [
          "Parce que c'est la seule structure de phrase qui existe",
          "Parce que la forme en trois temps donne une impression de rigueur logique, même quand les prémisses sont fausses ou hors sujet",
          "Parce que le syllogisme est toujours un sophisme par nature",
          "Parce que cela raccourcit systématiquement le discours"
        ],
        bonne_reponse: 1,
        explication: "L'apparence structurée du syllogisme rassure et masque parfois des prémisses non vérifiées — la forme imite la rigueur sans la garantir."
      }
    ],
    identification: {
      situation: "Dans un article, on peut lire : « Toutes les grandes civilisations ont valorisé le travail manuel. La nôtre valorise de moins en moins le travail manuel. Donc notre civilisation est en déclin. » L'article ne vérifie jamais si la première affirmation est vraie.",
      reponses_acceptees: ["syllogisme"],
      indice: "Repère les trois temps du raisonnement : une règle générale, un cas particulier, une conclusion qui en découlerait."
    },
    sources: [
      { auteurs: "Aristote", annee: "vers 350 av. J.-C.", titre: "Premiers Analytiques (Organon)", revue: "Corpus aristotélicien", type: "texte fondateur" }
    ],
    outils_lies: ["triade-ethos-pathos-logos", "faux-dilemme"]
  }
];
