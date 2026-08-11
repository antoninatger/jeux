// Perceptio — contenu (catégories + biais)
// Chaque source a été vérifiée (auteur, année, revue, volume/pages) avant intégration.

const CATEGORIES = [
  {
    id: "croyance",
    nom: "Croyance",
    nomLong: "Biais de croyance et de raisonnement",
    classe: "c-croyance",
    couleur: "#2B4CFF",
    description: "Comment on se convainc d'avoir raison, et comment on résiste à la preuve du contraire."
  },
  {
    id: "memoire",
    nom: "Mémoire",
    nomLong: "Biais liés à la mémoire",
    classe: "c-memoire",
    couleur: "#7A5CFA",
    description: "Comment le souvenir déforme ce qui compte vraiment, selon ce qui est facile à se rappeler."
  },
  {
    id: "social",
    nom: "Social",
    nomLong: "Biais sociaux et relationnels",
    classe: "c-social",
    couleur: "#FF6FA5",
    description: "Comment le statut, l'apparence ou le groupe d'une personne influencent ce qu'on pense d'elle."
  },
  {
    id: "decision",
    nom: "Décision",
    nomLong: "Biais de décision et d'estimation",
    classe: "c-decision",
    couleur: "#17B890",
    description: "Comment on évalue mal les gains, les pertes et les chiffres au moment de choisir."
  },
  {
    id: "confiance",
    nom: "Surconfiance",
    nomLong: "Biais liés à la surconfiance",
    classe: "c-confiance",
    couleur: "#FF9F1C",
    description: "Comment on surestime — ou sous-estime — ce qu'on sait vraiment faire."
  },
  {
    id: "temps",
    nom: "Temps & probabilités",
    nomLong: "Biais liés à la perception du temps et des probabilités",
    classe: "c-temps",
    couleur: "#6FA83C",
    description: "Comment l'avenir et le risque paraissent toujours plus favorables quand ils nous concernent."
  }
];

const BIAIS = [
  // ───────────────────────── CROYANCE ─────────────────────────
  {
    id: "biais-confirmation",
    nom: "Biais de confirmation",
    nom_anglais: "Confirmation bias",
    categorie: "croyance",
    difficulte: "facile",
    definition_courte: "Tendance à privilégier, rechercher et interpréter les informations qui confirment ses croyances préexistantes, tout en négligeant celles qui les contredisent.",
    definition_longue: "Ce biais pousse à traiter l'information de façon asymétrique : on accepte facilement ce qui va dans le sens de ce qu'on pense déjà, et on examine avec beaucoup plus de sévérité ce qui le contredit — voire on l'ignore purement et simplement. Il existe parce qu'il économise de l'énergie mentale (remettre en cause une croyance demande un effort cognitif réel) et parce qu'il protège l'image qu'on a de soi-même : avoir tort est inconfortable. Le problème, c'est qu'il transforme la recherche d'information en une confirmation de ce qu'on savait déjà, plutôt qu'en une véritable vérification. À grande échelle, il explique pourquoi deux personnes exposées aux mêmes faits peuvent en ressortir chacune plus certaine d'avoir raison.",
    exemples: [
      { titre: "Débat politique", texte: "Une personne convaincue qu'une politique économique est mauvaise ne retient que les statistiques qui vont dans ce sens, et oublie celles qui la contredisent." },
      { titre: "Recrutement", texte: "Un recruteur qui a un a priori positif sur un candidat interprète ses réponses ambiguës en entretien de façon favorable — et l'inverse s'il a un a priori négatif." },
      { titre: "Réseaux sociaux", texte: "On partage plus volontiers un article qui confirme ce qu'on pensait déjà, sans vérifier sa source, que celui qui nous contredirait." }
    ],
    qcm: [
      {
        question: "Le biais de confirmation se manifeste principalement par :",
        choix: [
          "La recherche active d'informations contradictoires",
          "La recherche et la valorisation d'informations qui confirment une croyance",
          "L'oubli total d'une croyance après un contre-exemple",
          "Un raisonnement toujours neutre et rationnel"
        ],
        bonne_reponse: 1,
        explication: "Le biais pousse à privilégier ce qui conforte nos idées, pas à les remettre en cause ni à les abandonner."
      },
      {
        question: "Karim est persuadé qu'une marque de voiture est peu fiable. Depuis, il remarque et retient chaque panne qu'il croise sur cette marque, mais oublie aussitôt celles des autres marques qu'il croise pourtant tout aussi souvent. C'est un exemple de :",
        choix: [
          "Effet de halo",
          "Biais de confirmation",
          "Aversion à la perte",
          "Biais rétrospectif"
        ],
        bonne_reponse: 1,
        explication: "Karim filtre sélectivement les informations qui confirment son idée de départ (« cette marque est peu fiable ») — c'est la définition même du biais de confirmation."
      },
      {
        question: "En quoi le biais de confirmation diffère-t-il du biais rétrospectif ?",
        choix: [
          "Ce sont deux noms différents pour le même biais",
          "Le biais de confirmation filtre l'information avant de se faire une opinion ; le biais rétrospectif déforme le souvenir après coup, une fois l'issue connue",
          "Le biais rétrospectif ne concerne que les événements sportifs",
          "Le biais de confirmation ne s'applique qu'aux opinions politiques"
        ],
        bonne_reponse: 1,
        explication: "Les deux biais déforment le rapport à l'information, mais à des moments différents : confirmation = filtre en amont ; rétrospectif = reconstruction du souvenir en aval, une fois qu'on connaît le résultat."
      }
    ],
    identification: {
      situation: "Léa est persuadée que les personnes nées en janvier sont plus déterminées. Depuis, elle remarque et retient chaque exemple qui va dans ce sens, et oublie aussitôt les contre-exemples qu'elle croise pourtant tout aussi souvent.",
      reponses_acceptees: ["biais de confirmation", "confirmation bias", "biais confirmatoire"],
      indice: "Pense à ce qu'elle fait de l'information qui la contredit."
    },
    sources: [
      { auteurs: "Wason, P. C.", annee: 1960, titre: "On the failure to eliminate hypotheses in a conceptual task", revue: "Quarterly Journal of Experimental Psychology, 12(3), 129–140", type: "étude fondatrice", lien: "https://doi.org/10.1080/17470216008416717" },
      { auteurs: "Nickerson, R. S.", annee: 1998, titre: "Confirmation bias: A ubiquitous phenomenon in many guises", revue: "Review of General Psychology, 2(2), 175–220", type: "revue de synthèse", lien: "https://doi.org/10.1037/1089-2680.2.2.175" }
    ],
    biais_lies: ["biais-ancrage", "effet-halo", "biais-retrospectif"]
  },
  {
    id: "biais-retrospectif",
    nom: "Biais rétrospectif",
    nom_anglais: "Hindsight bias",
    categorie: "croyance",
    difficulte: "intermédiaire",
    definition_courte: "Tendance, une fois qu'un événement s'est produit, à surestimer la probabilité qu'on lui aurait accordée avant qu'il n'arrive — le fameux « je le savais depuis le début ».",
    definition_longue: "Après coup, le cerveau reconstruit le souvenir de ce qu'on pensait « avant » en l'ajustant discrètement à ce qu'on sait « maintenant » : l'issue connue rend le passé plus prévisible qu'il ne l'était réellement. Ce n'est pas un mensonge conscient — la personne croit sincèrement s'être doutée du résultat. Le mécanisme sert à donner une impression de cohérence et de maîtrise sur des événements en réalité incertains, ce qui est rassurant sur le plan psychologique. Le revers est qu'il empêche de tirer les vraies leçons d'un événement : si on croit qu'il était prévisible, on ne cherche pas à comprendre pourquoi on ne l'avait pas anticipé.",
    exemples: [
      { titre: "Résultat sportif", texte: "Après la défaite de son équipe, un supporter affirme qu'il « savait » qu'elle allait perdre, alors qu'il pariait sur sa victoire la veille." },
      { titre: "Investissement", texte: "Après un krach boursier, beaucoup d'analystes estiment que les signes avant-coureurs étaient « évidents », alors qu'ils ne les avaient pas signalés au moment des faits." },
      { titre: "Décision médicale", texte: "Un diagnostic manqué paraît rétrospectivement facile à poser, ce qui conduit à juger sévèrement un médecin qui n'avait, sur le moment, pas les mêmes informations." }
    ],
    qcm: [
      {
        question: "Le biais rétrospectif consiste à :",
        choix: [
          "Prédire correctement l'avenir grâce à l'expérience",
          "Surestimer, après coup, la probabilité qu'on accordait à un événement avant qu'il n'arrive",
          "Refuser de croire un événement même après qu'il s'est produit",
          "Oublier complètement ses prédictions passées"
        ],
        bonne_reponse: 1,
        explication: "Le biais ne porte pas sur l'oubli, mais sur une reconstruction : le souvenir de notre certitude passée est gonflé par la connaissance du résultat."
      },
      {
        question: "Pourquoi le biais rétrospectif est-il particulièrement gênant après un accident ou un échec de projet ?",
        choix: [
          "Parce qu'il n'a aucune conséquence pratique",
          "Parce qu'il donne une fausse impression que l'issue était évidente, ce qui nuit à une analyse honnête des causes réelles",
          "Parce qu'il empêche totalement de se souvenir de l'événement",
          "Parce qu'il ne concerne que les experts"
        ],
        bonne_reponse: 1,
        explication: "En rendant l'issue rétrospectivement « évidente », le biais détourne de l'analyse rigoureuse de ce qui n'avait, sur le moment, rien d'évident."
      }
    ],
    identification: {
      situation: "Après l'annonce des résultats d'un match, Farid affirme à ses amis qu'il « sentait » depuis le début que son équipe allait perdre — alors qu'il avait publiquement parié sur sa victoire la veille, et que personne dans le groupe ne se souvient l'avoir entendu douter avant le coup de sifflet.",
      reponses_acceptees: ["biais retrospectif", "hindsight bias", "je le savais depuis le debut"],
      indice: "Compare ce qu'il dit maintenant à ce qu'il a réellement dit avant le match."
    },
    sources: [
      { auteurs: "Fischhoff, B., & Beyth, R.", annee: 1975, titre: "“I knew it would happen”: Remembered probabilities of once-future things", revue: "Organizational Behavior and Human Performance, 13(1), 1–16", type: "étude fondatrice", lien: "https://doi.org/10.1016/0030-5073(75)90002-1" }
    ],
    biais_lies: ["biais-confirmation", "effet-dunning-kruger"]
  },

  // ───────────────────────── MÉMOIRE ─────────────────────────
  {
    id: "heuristique-disponibilite",
    nom: "Heuristique de disponibilité",
    nom_anglais: "Availability heuristic",
    categorie: "memoire",
    difficulte: "intermédiaire",
    definition_courte: "Tendance à estimer la fréquence ou la probabilité d'un événement selon la facilité avec laquelle des exemples nous viennent à l'esprit, plutôt que selon les statistiques réelles.",
    definition_longue: "Le cerveau utilise un raccourci : plus un souvenir est facile à rappeler — parce qu'il est récent, marquant, ou souvent répété dans les médias — plus on suppose, à tort, que l'événement qu'il représente est fréquent. Ce raccourci est en général utile (les choses fréquentes sont effectivement plus faciles à se rappeler), mais il se dérègle dès qu'un facteur extérieur — une couverture médiatique intense, une émotion forte, la proximité personnelle — rend un événement rare exceptionnellement mémorable. On finit alors par surestimer le risque d'événements spectaculaires mais rares, et à sous-estimer celui d'événements banals mais bien plus fréquents.",
    exemples: [
      { titre: "Peur de l'avion", texte: "Après un crash très médiatisé, beaucoup de gens surestiment le risque de mourir en avion, alors que la route reste statistiquement bien plus dangereuse." },
      { titre: "Sentiment d'insécurité", texte: "Une personne qui regarde beaucoup de faits divers à la télévision estime la criminalité de son quartier plus élevée qu'elle ne l'est réellement." },
      { titre: "Requins et noix de coco", texte: "Les attaques de requins, très relayées, paraissent plus fréquentes que les accidents liés à la chute de noix de coco — qui font pourtant statistiquement plus de victimes chaque année." }
    ],
    qcm: [
      {
        question: "L'heuristique de disponibilité pousse à juger la fréquence d'un événement selon :",
        choix: [
          "Des statistiques officielles consultées au préalable",
          "La facilité avec laquelle des exemples de cet événement viennent à l'esprit",
          "Un calcul rationnel de probabilité",
          "L'avis d'un expert reconnu"
        ],
        bonne_reponse: 1,
        explication: "C'est la facilité de rappel — pas la fréquence réelle — qui sert de raccourci mental."
      },
      {
        question: "Pourquoi une couverture médiatique intense d'un événement rare (comme un attentat) peut-elle fausser la perception du risque ?",
        choix: [
          "Parce que les médias donnent toujours des statistiques fausses",
          "Parce que la répétition de l'image rend l'événement très facile à se rappeler, ce qui le fait paraître plus fréquent qu'il ne l'est réellement",
          "Parce que le public ignore systématiquement les informations médiatiques",
          "Parce que ce n'est pas un exemple d'heuristique de disponibilité"
        ],
        bonne_reponse: 1,
        explication: "La disponibilité mentale d'un souvenir dépend de sa saillance émotionnelle et de sa répétition, pas de sa fréquence statistique réelle."
      }
    ],
    identification: {
      situation: "Depuis qu'un accident d'avion a fait la une des journaux pendant une semaine, Sophie a annulé son vol pour les vacances et préfère prendre la voiture, qu'elle juge « plus sûre » — alors qu'elle prend l'avion sans hésiter depuis dix ans et que rien dans les statistiques n'a changé entre-temps.",
      reponses_acceptees: ["heuristique de disponibilite", "biais de disponibilite", "availability heuristic", "disponibilite"],
      indice: "Pense à ce qui rend un souvenir facile à se rappeler, indépendamment de sa fréquence réelle."
    },
    sources: [
      { auteurs: "Tversky, A., & Kahneman, D.", annee: 1973, titre: "Availability: A heuristic for judging frequency and probability", revue: "Cognitive Psychology, 5(2), 207–232", type: "étude fondatrice", lien: "https://doi.org/10.1016/0010-0285(73)90033-9" }
    ],
    biais_lies: ["biais-negativite", "biais-ancrage"]
  },
  {
    id: "biais-negativite",
    nom: "Biais de négativité",
    nom_anglais: "Negativity bias",
    categorie: "memoire",
    difficulte: "facile",
    definition_courte: "Tendance à accorder plus de poids, d'attention et de place en mémoire aux informations négatives qu'aux informations positives de même intensité.",
    definition_longue: "À intensité égale, un événement négatif marque davantage la mémoire, capte plus l'attention et influence plus fortement le jugement global qu'un événement positif équivalent. Ce déséquilibre aurait une origine évolutive : repérer rapidement une menace (danger, trahison, erreur) a longtemps été plus utile à la survie que remarquer un événement agréable. Concrètement, cela signifie qu'il faut plusieurs expériences positives pour compenser l'effet d'une seule expérience négative sur une impression générale — que ce soit à propos d'une personne, d'un produit ou d'une situation.",
    exemples: [
      { titre: "Avis en ligne", texte: "Un restaurant avec cent avis élogieux voit sa réputation durablement écornée par une poignée d'avis très négatifs, disproportionnellement lus et retenus." },
      { titre: "Évaluation professionnelle", texte: "Un salarié se souvient beaucoup plus longtemps d'une remarque critique de son responsable que de dix compliments reçus la même semaine." },
      { titre: "Actualité", texte: "Les titres de presse alarmants ou négatifs génèrent statistiquement plus de clics que les nouvelles positives, ce qui influence ce que les médias mettent en avant." }
    ],
    qcm: [
      {
        question: "Le biais de négativité désigne le fait que :",
        choix: [
          "Les événements positifs et négatifs ont toujours le même poids psychologique",
          "Les informations négatives pèsent davantage sur notre jugement et notre mémoire que des informations positives équivalentes",
          "On oublie systématiquement les mauvaises nouvelles",
          "Il ne s'applique qu'aux relations professionnelles"
        ],
        bonne_reponse: 1,
        explication: "Le déséquilibre de poids en faveur du négatif est précisément la définition du biais."
      },
      {
        question: "Un client se souvient d'une seule livraison en retard bien plus que des dix précédentes livraisons ponctuelles. Quel biais est le plus directement à l'œuvre ?",
        choix: [
          "Biais d'ancrage",
          "Biais de négativité",
          "Aversion à la perte",
          "Effet de halo"
        ],
        bonne_reponse: 1,
        explication: "L'aversion à la perte porte sur l'évaluation d'un gain/perte financier ou matériel ; ici, c'est le poids disproportionné d'une expérience négative en mémoire qui est en jeu — c'est le biais de négativité."
      }
    ],
    identification: {
      situation: "Un enseignant reçoit vingt évaluations de fin d'année de ses élèves : dix-neuf sont très positives, une est sévère. Le soir même, c'est cette unique évaluation négative qui l'empêche de dormir, alors qu'il a à peine relu les autres.",
      reponses_acceptees: ["biais de negativite", "negativity bias", "negativite"],
      indice: "Compare le nombre d'avis positifs et négatifs à l'attention que chacun reçoit réellement."
    },
    sources: [
      { auteurs: "Rozin, P., & Royzman, E. B.", annee: 2001, titre: "Negativity bias, negativity dominance, and contagion", revue: "Personality and Social Psychology Review, 5(4), 296–320", type: "revue de synthèse", lien: "https://doi.org/10.1207/S15327957PSPR0504_2" }
    ],
    biais_lies: ["heuristique-disponibilite", "effet-halo"]
  },

  // ───────────────────────── SOCIAL ─────────────────────────
  {
    id: "effet-halo",
    nom: "Effet de halo",
    nom_anglais: "Halo effect",
    categorie: "social",
    difficulte: "facile",
    definition_courte: "Tendance à laisser une impression générale positive (ou négative) sur une personne — souvent basée sur un seul trait visible — influencer notre jugement sur ses autres qualités, sans lien logique entre elles.",
    definition_longue: "Le cerveau cherche la cohérence : une fois qu'un trait marquant (beauté, prestance, éloquence) crée une impression favorable, cette impression « déteint » sur des qualités totalement indépendantes, comme la compétence ou l'honnêteté. C'est un raccourci de jugement social qui évite d'évaluer chaque qualité séparément — un gain de temps, au prix de la précision. L'effet fonctionne aussi à l'envers (« effet de corne ») : un trait négatif isolé peut faire percevoir la personne entière de façon défavorable.",
    exemples: [
      { titre: "Recrutement", texte: "Un candidat bien habillé et à l'aise à l'oral est perçu comme plus compétent, indépendamment de la qualité réelle de ses réponses." },
      { titre: "Marketing", texte: "Un porte-parole charismatique ou une jolie présentation d'emballage renforcent la confiance perçue envers un produit, sans rien changer à sa qualité intrinsèque." },
      { titre: "Vie scolaire", texte: "Un élève brillant en mathématiques est parfois jugé plus fiable ou plus mature dans des domaines n'ayant rien à voir, comme le sport ou le comportement en classe." }
    ],
    qcm: [
      {
        question: "L'effet de halo consiste à :",
        choix: [
          "Juger chaque qualité d'une personne de façon totalement indépendante",
          "Laisser un trait marquant influencer le jugement porté sur des qualités sans rapport logique avec lui",
          "Se fier uniquement aux diplômes d'une personne",
          "Toujours favoriser les personnes qu'on connaît depuis longtemps"
        ],
        bonne_reponse: 1,
        explication: "C'est la contamination d'un jugement par un trait isolé, sans lien logique, qui caractérise l'effet de halo."
      },
      {
        question: "En quoi l'effet de halo diffère-t-il du biais d'autorité ?",
        choix: [
          "Ce sont deux noms pour le même phénomène",
          "L'effet de halo part d'un trait perçu (apparence, charisme) qui déteint sur d'autres qualités ; le biais d'autorité part d'un statut hiérarchique ou institutionnel qui pousse à l'obéissance",
          "Le biais d'autorité ne concerne que les enfants",
          "L'effet de halo ne s'applique qu'aux objets, jamais aux personnes"
        ],
        bonne_reponse: 1,
        explication: "Les deux biais social se recoupent parfois (une figure d'autorité peut aussi bénéficier d'un halo), mais leur mécanisme de départ est différent : trait isolé vs statut reconnu."
      }
    ],
    identification: {
      situation: "En entretien, Nadia est immédiatement conquise par un candidat élégant, souriant et très à l'aise pour parler de lui. Elle le note ensuite très haut en « rigueur » et en « sens de l'organisation » — deux qualités qu'elle n'a pourtant testées à aucun moment de l'entretien.",
      reponses_acceptees: ["effet de halo", "halo effect", "effet halo"],
      indice: "Regarde ce que Nadia a réellement évalué, et ce qu'elle a seulement supposé."
    },
    sources: [
      { auteurs: "Thorndike, E. L.", annee: 1920, titre: "A constant error in psychological ratings", revue: "Journal of Applied Psychology, 4(1), 25–29", type: "étude fondatrice", lien: "https://doi.org/10.1037/h0071663" }
    ],
    biais_lies: ["biais-autorite", "biais-confirmation"]
  },
  {
    id: "biais-autorite",
    nom: "Biais d'autorité",
    nom_anglais: "Authority bias",
    categorie: "social",
    difficulte: "intermédiaire",
    definition_courte: "Tendance à accorder plus de crédit à une affirmation, et à obéir plus facilement à une consigne, lorsqu'elle émane d'une figure perçue comme une autorité légitime — indépendamment de la validité réelle du propos.",
    definition_longue: "Face à une figure d'autorité (statut, uniforme, titre, expertise apparente), on a tendance à réduire son esprit critique et à se sentir moins responsable de ses propres choix, comme si la responsabilité était transférée à l'autorité elle-même. Ce mécanisme a une utilité sociale réelle : il permet de coopérer efficacement sans tout revérifier soi-même en permanence. Mais il devient dangereux quand l'autorité se trompe, exagère son expertise, ou pousse délibérément à une action injustifiée — la déférence peut alors l'emporter sur le jugement personnel, y compris dans des situations moralement problématiques.",
    exemples: [
      { titre: "Milieu médical", texte: "Un patient suit une prescription sans poser de question, même quand quelque chose lui semble incohérent, simplement parce qu'elle vient d'un médecin." },
      { titre: "Publicité", texte: "Une personne en blouse blanche recommandant un produit cosmétique dans une publicité augmente la confiance des spectateurs, même sans expertise dermatologique réelle." },
      { titre: "Milieu professionnel", texte: "Un employé applique une consigne qu'il juge discutable sans protester, simplement parce qu'elle vient de sa hiérarchie." }
    ],
    qcm: [
      {
        question: "Le biais d'autorité désigne :",
        choix: [
          "Le fait de toujours désobéir à une figure d'autorité par principe",
          "La tendance à accorder plus de crédit et d'obéissance à une figure perçue comme une autorité, indépendamment de la validité de son propos",
          "Une préférence pour les décisions prises en groupe",
          "La capacité à évaluer objectivement une source d'information"
        ],
        bonne_reponse: 1,
        explication: "Le biais ne porte pas sur le contenu du message, mais sur le statut perçu de celui qui l'énonce."
      },
      {
        question: "Que montrent les expériences de Milgram sur l'obéissance à l'autorité ?",
        choix: [
          "Que la plupart des gens refusent d'obéir à un ordre qu'ils jugent immoral",
          "Qu'une majorité de participants ont continué à administrer ce qu'ils croyaient être des chocs électriques douloureux simplement parce qu'un expérimentateur en blouse blanche le leur demandait",
          "Que l'obéissance dépend uniquement du niveau d'éducation des participants",
          "Que l'autorité n'a aucun effet mesurable sur le comportement"
        ],
        bonne_reponse: 1,
        explication: "L'expérience de Milgram (1963) a montré qu'une majorité de participants obéissaient à des ordres problématiques venant d'une figure d'autorité, malgré un inconfort évident."
      }
    ],
    identification: {
      situation: "Dans un service, un employé reçoit une consigne de sa direction qui lui paraît clairement contraire au bon sens. Il l'exécute quand même sans faire de remarque, en se disant que « s'ils le demandent, c'est qu'ils ont sûrement une bonne raison ».",
      reponses_acceptees: ["biais d autorite", "biais autorite", "authority bias"],
      indice: "Pense à ce qui pousse l'employé à ne pas remettre la consigne en question."
    },
    sources: [
      { auteurs: "Milgram, S.", annee: 1963, titre: "Behavioral study of obedience", revue: "Journal of Abnormal and Social Psychology, 67(4), 371–378", type: "étude fondatrice", lien: "https://doi.org/10.1037/h0040525" }
    ],
    biais_lies: ["effet-halo", "biais-confirmation"]
  },

  // ───────────────────────── DÉCISION ─────────────────────────
  {
    id: "biais-ancrage",
    nom: "Biais d'ancrage",
    nom_anglais: "Anchoring bias",
    categorie: "decision",
    difficulte: "facile",
    definition_courte: "Tendance à se laisser influencer de façon disproportionnée par la première information reçue (l'« ancre »), même quand on sait qu'elle est arbitraire, lors d'une estimation ou d'une négociation.",
    definition_longue: "Face à une estimation incertaine, on ne part pas de zéro : on ajuste un chiffre à partir du premier repère disponible, même si ce repère n'a objectivement aucun rapport avec la bonne réponse. L'ajustement qui suit est généralement insuffisant, si bien que l'estimation finale reste « collée » près de l'ancre de départ. Ce mécanisme fonctionne même quand la personne sait pertinemment que l'ancre est arbitraire — un tirage au sort, par exemple — ce qui montre qu'il ne s'agit pas d'un raisonnement conscient mais d'un vrai biais perceptif.",
    exemples: [
      { titre: "Négociation", texte: "Le premier prix annoncé dans une négociation continue d'influencer ce qui semble « raisonnable » ensuite, même après avoir vu des prix très différents ailleurs." },
      { titre: "Soldes", texte: "Un prix barré (« 199 € » raturé, « 99 € » affiché) donne l'impression d'une bonne affaire, même si 99 € n'était pas un prix particulièrement bas au départ." },
      { titre: "Entretien salarial", texte: "La première fourchette de salaire évoquée dans un entretien tend à cadrer toute la suite de la négociation, dans un sens ou dans l'autre." }
    ],
    qcm: [
      {
        question: "Le biais d'ancrage se produit lorsque :",
        choix: [
          "On ignore complètement la première information reçue",
          "Une estimation reste influencée par un premier chiffre de référence, même si celui-ci est arbitraire",
          "On demande systématiquement l'avis de plusieurs experts avant de décider",
          "On ne négocie jamais un prix annoncé"
        ],
        bonne_reponse: 1,
        explication: "L'ancre continue de peser sur le jugement final, même quand on sait qu'elle n'a pas de valeur informative réelle."
      },
      {
        question: "Pourquoi l'ancrage fonctionne-t-il même quand on sait que le premier chiffre est tiré au hasard ?",
        choix: [
          "Parce que ce n'est pas un vrai biais mais un mythe",
          "Parce qu'il s'agit d'un ajustement perceptif automatique, pas d'un raisonnement conscient qu'on pourrait simplement corriger en le sachant",
          "Parce que les gens font toujours confiance aux chiffres aléatoires",
          "Parce que l'ancrage ne s'applique qu'aux négociations professionnelles"
        ],
        bonne_reponse: 1,
        explication: "Des expériences ont montré que même une ancre explicitement présentée comme aléatoire (par exemple issue d'un tirage à la roulette) continue d'influencer l'estimation qui suit."
      }
    ],
    identification: {
      situation: "Marc négocie l'achat d'une voiture d'occasion. Le vendeur annonce d'abord un prix de 18 000 €. Même après avoir vu des modèles similaires vendus 12 000 € ailleurs, Marc négocie autour de 15-16 000 € — le premier chiffre continue d'influencer ce qui lui semble « raisonnable ».",
      reponses_acceptees: ["biais d ancrage", "ancrage", "anchoring bias"],
      indice: "Pense à ce qui a été dit en premier dans la négociation."
    },
    sources: [
      { auteurs: "Tversky, A., & Kahneman, D.", annee: 1974, titre: "Judgment under uncertainty: Heuristics and biases", revue: "Science, 185(4157), 1124–1131", type: "étude fondatrice", lien: "https://doi.org/10.1126/science.185.4157.1124" }
    ],
    biais_lies: ["aversion-perte", "heuristique-disponibilite"]
  },
  {
    id: "aversion-perte",
    nom: "Aversion à la perte",
    nom_anglais: "Loss aversion",
    categorie: "decision",
    difficulte: "facile",
    definition_courte: "Tendance à ressentir la douleur d'une perte de façon plus intense que le plaisir d'un gain équivalent, ce qui pousse à des décisions excessivement prudentes pour éviter de perdre.",
    definition_longue: "À montant égal, perdre 50 € fait psychologiquement plus mal que gagner 50 € ne fait plaisir — l'écart est estimé, selon les études, à un facteur de l'ordre de 2. Ce déséquilibre pousse à des choix qui, sur le papier, sont pourtant sous-optimaux : refuser un pari statistiquement favorable par peur de perdre, s'accrocher à une décision ratée plutôt que d'« acter » la perte, ou éviter un changement bénéfique simplement parce qu'il implique de renoncer à quelque chose qu'on possède déjà. Ce mécanisme a été formalisé dans la théorie des perspectives, qui a valu à Daniel Kahneman le prix Nobel d'économie.",
    exemples: [
      { titre: "Bourse", texte: "Un investisseur garde une action en forte baisse en espérant qu'elle remonte, plutôt que d'accepter la perte et de réinvestir ailleurs plus judicieusement." },
      { titre: "Abonnements", texte: "Un essai gratuit avec annulation possible génère plus de conversions payantes qu'une offre équivalente sans essai, car annuler ensuite est vécu comme une perte." },
      { titre: "Vie quotidienne", texte: "La plupart des gens exigent de pouvoir gagner beaucoup plus qu'ils ne pourraient perdre pour accepter un simple pari à pile ou face." }
    ],
    qcm: [
      {
        question: "L'aversion à la perte signifie que :",
        choix: [
          "Gagner et perdre la même somme procurent une émotion d'intensité égale",
          "Perdre une somme fait psychologiquement plus mal que gagner la même somme ne fait plaisir",
          "On préfère toujours prendre des risques plutôt que jouer la sécurité",
          "Elle ne concerne que les décisions financières"
        ],
        bonne_reponse: 1,
        explication: "L'asymétrie de ressenti entre gain et perte équivalents est au cœur du concept, formalisé par la théorie des perspectives."
      },
      {
        question: "Un investisseur refuse de vendre une action en perte, convaincu qu'elle va « forcément remonter », alors que rien ne l'indique. Quel est le biais le plus directement en jeu ?",
        choix: [
          "Biais d'ancrage",
          "Aversion à la perte",
          "Effet de halo",
          "Biais d'autorité"
        ],
        bonne_reponse: 1,
        explication: "Le refus d'acter une perte, quitte à prendre une décision financièrement moins bonne, est la signature de l'aversion à la perte."
      }
    ],
    identification: {
      situation: "Une entreprise a investi dans un logiciel qui s'avère, après six mois, clairement inadapté. Plutôt que de changer d'outil comme le recommandent tous les rapports internes, la direction préfère continuer à l'utiliser et à le corriger tant bien que mal, pour ne pas « perdre » l'investissement déjà réalisé.",
      reponses_acceptees: ["aversion a la perte", "loss aversion", "aversion perte"],
      indice: "Compare ce que coûterait réellement continuer, par rapport à ce que coûterait changer d'outil."
    },
    sources: [
      { auteurs: "Kahneman, D., & Tversky, A.", annee: 1979, titre: "Prospect theory: An analysis of decision under risk", revue: "Econometrica, 47(2), 263–291", type: "étude fondatrice", lien: "https://doi.org/10.2307/1914185" }
    ],
    biais_lies: ["biais-ancrage", "effet-dunning-kruger"]
  },

  // ───────────────────────── SURCONFIANCE ─────────────────────────
  {
    id: "effet-dunning-kruger",
    nom: "Effet Dunning-Kruger",
    nom_anglais: "Dunning-Kruger effect",
    categorie: "confiance",
    difficulte: "intermédiaire",
    definition_courte: "Tendance des personnes les moins compétentes dans un domaine à surestimer leurs compétences, faute de posséder les connaissances nécessaires pour évaluer correctement leurs propres lacunes.",
    definition_longue: "Pour juger correctement son propre niveau de compétence dans un domaine, il faut déjà en maîtriser un minimum — sans quoi on ne dispose même pas des repères nécessaires pour repérer ses erreurs. C'est ce paradoxe qui pousse les débutants les moins avertis à se sentir compétents : ils ne savent tout simplement pas ce qu'ils ne savent pas. À l'inverse, les personnes réellement compétentes ont souvent tendance à sous-estimer leur niveau, car elles perçoivent mieux la difficulté réelle du domaine et supposent, à tort, que les autres maîtrisent aussi bien qu'elles ces subtilités.",
    exemples: [
      { titre: "Apprentissage", texte: "Après quelques vidéos en ligne, une personne peut se sentir capable de réparer une installation électrique complexe, sans percevoir l'étendue de ce qu'elle ignore encore." },
      { titre: "Débat public", texte: "Sur un sujet scientifique complexe, les avis les plus tranchés et les plus confiants viennent parfois de personnes ayant lu très peu de sources, à l'inverse des spécialistes plus prudents dans leurs formulations." },
      { titre: "Milieu professionnel", texte: "Un nouvel employé très sûr de lui peut sous-estimer la complexité réelle d'un poste, alors qu'un collègue expérimenté insiste davantage sur les difficultés et les nuances." }
    ],
    qcm: [
      {
        question: "L'effet Dunning-Kruger décrit :",
        choix: [
          "Le fait que tout le monde surestime systématiquement ses compétences, quel que soit son niveau",
          "Le fait que les personnes les moins compétentes dans un domaine manquent souvent des repères nécessaires pour évaluer correctement leurs propres lacunes",
          "Le fait que les experts sont toujours parfaitement conscients de leur niveau",
          "Un phénomène qui ne concerne que les tests de QI"
        ],
        bonne_reponse: 1,
        explication: "Le cœur du phénomène est l'incompétence à évaluer sa propre incompétence, faute des connaissances nécessaires pour s'auto-évaluer correctement."
      },
      {
        question: "Comment les personnes réellement compétentes se comportent-elles généralement, selon l'étude de Kruger et Dunning ?",
        choix: [
          "Elles surestiment systématiquement leur niveau, comme les débutants",
          "Elles ont tendance à légèrement sous-estimer leur compétence relative, car elles perçoivent mieux la difficulté du domaine",
          "Elles refusent de s'auto-évaluer",
          "Elles n'ont, statistiquement, aucune conscience de leur propre niveau"
        ],
        bonne_reponse: 1,
        explication: "L'étude originale montre une asymétrie : les moins compétents surestiment nettement leur niveau, tandis que les plus compétents ont plutôt tendance à le sous-estimer légèrement."
      }
    ],
    identification: {
      situation: "Après avoir suivi un stage d'initiation de deux jours, Jonas se présente comme capable de gérer seul un projet complexe dans ce domaine, et rejette avec assurance les remarques d'un collègue qui pratique ce métier depuis quinze ans.",
      reponses_acceptees: ["effet dunning kruger", "dunning kruger", "effet dunning-kruger"],
      indice: "Compare le temps de formation de Jonas à l'assurance avec laquelle il s'exprime."
    },
    sources: [
      { auteurs: "Kruger, J., & Dunning, D.", annee: 1999, titre: "Unskilled and unaware of it: How difficulties in recognizing one's own incompetence lead to inflated self-assessments", revue: "Journal of Personality and Social Psychology, 77(6), 1121–1134", type: "étude fondatrice", lien: "https://doi.org/10.1037/0022-3514.77.6.1121" }
    ],
    biais_lies: ["biais-retrospectif", "biais-optimisme"]
  },

  // ───────────────────────── TEMPS & PROBABILITÉS ─────────────────────────
  {
    id: "biais-optimisme",
    nom: "Biais d'optimisme",
    nom_anglais: "Optimism bias",
    categorie: "temps",
    difficulte: "facile",
    definition_courte: "Tendance à sous-estimer sa propre probabilité de vivre des événements négatifs, et à surestimer celle de vivre des événements positifs, par rapport à autrui.",
    definition_longue: "Face à un risque statistique bien établi (accident, maladie, échec), la plupart des gens estiment que ce risque s'applique moins à eux qu'à la moyenne des gens — un raisonnement statistiquement impossible si tout le monde le tient à la fois. Ce biais protège l'estime de soi et réduit l'anxiété face à l'avenir, ce qui explique en partie sa persistance même chez des personnes par ailleurs bien informées des statistiques concernées. Le revers est qu'il réduit la prise de précautions réelles : pourquoi se prémunir contre un risque qu'on estime, à tort, moins probable pour soi que pour les autres ?",
    exemples: [
      { titre: "Tabac", texte: "Un fumeur informé des risques du cancer du poumon estime souvent que ses propres chances d'être touché sont inférieures à celles d'un fumeur moyen." },
      { titre: "Conduite", texte: "La grande majorité des conducteurs se jugent plus prudents et moins susceptibles d'avoir un accident que la moyenne des autres conducteurs." },
      { titre: "Gestion de projet", texte: "Lors de la planification d'un projet, on sous-estime systématiquement le risque de retard qui nous concerne personnellement, même en connaissant les retards fréquents de projets similaires." }
    ],
    qcm: [
      {
        question: "Le biais d'optimisme désigne le fait de :",
        choix: [
          "Toujours prévoir le pire pour éviter les déceptions",
          "Sous-estimer sa propre probabilité de vivre un événement négatif, par rapport à celle attribuée à autrui",
          "Ignorer complètement les statistiques de risque",
          "Se sentir plus vulnérable que la moyenne des gens"
        ],
        bonne_reponse: 1,
        explication: "Le biais porte spécifiquement sur l'écart entre le risque qu'on s'attribue à soi-même et celui qu'on attribue à autrui, à situation identique."
      },
      {
        question: "Pourquoi le biais d'optimisme persiste-t-il même chez des personnes bien informées des risques réels ?",
        choix: [
          "Parce qu'elles ne connaissent pas les statistiques",
          "Parce qu'il protège l'estime de soi et réduit l'anxiété face à l'avenir, indépendamment du niveau d'information",
          "Parce que ce biais n'existe pas chez les personnes informées",
          "Parce que les statistiques changent constamment"
        ],
        bonne_reponse: 1,
        explication: "Le décalage n'est pas un problème d'information mais un mécanisme psychologique de protection de soi, qui résiste donc à la simple connaissance des chiffres."
      }
    ],
    identification: {
      situation: "Bien qu'il connaisse parfaitement les statistiques sur les risques du tabac, Julien continue de penser que « ça n'arrive qu'aux autres » et qu'il pourra arrêter facilement le jour où il le décidera vraiment, contrairement à la plupart des fumeurs de son entourage.",
      reponses_acceptees: ["biais d optimisme", "optimism bias", "biais optimisme"],
      indice: "Compare ce que Julien sait des statistiques à ce qu'il pense de son propre cas."
    },
    sources: [
      { auteurs: "Weinstein, N. D.", annee: 1980, titre: "Unrealistic optimism about future life events", revue: "Journal of Personality and Social Psychology, 39(5), 806–820", type: "étude fondatrice", lien: "https://doi.org/10.1037/0022-3514.39.5.806" }
    ],
    biais_lies: ["effet-dunning-kruger", "biais-ancrage"]
  }
];
