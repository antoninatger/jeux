// Ecologie : Fake News et écologie
// Source : diapositives de la formation "comment-convaincre-un-climatosceptique"
// 24 questions

var QUESTIONS_ECOLOGIE = [

  // ── Le réchauffement climatique ─────────────────────────────
  {
    cat: "🌡️ Le réchauffement",
    q: "Le réchauffement climatique, c'est :",
    options: [
      "Une hausse des températures observée pendant un été particulièrement chaud",
      "L'augmentation durable de la température moyenne du climat terrestre, observée sur plusieurs décennies",
      "L'ensemble des catastrophes naturelles récentes",
      "Un synonyme exact de dérèglement climatique"
    ],
    answer: 1,
    expl: "Le mot important est « durable » : le climat se mesure sur des décennies. Un été chaud ou un hiver froid ne suffisent ni à le prouver, ni à le réfuter."
  },
  {
    cat: "🌡️ Le réchauffement",
    q: "Quelle est la différence entre réchauffement et dérèglement climatique ?",
    options: [
      "Aucune, ce sont deux mots pour la même chose",
      "Le réchauffement concerne la France, le dérèglement le reste du monde",
      "Le dérèglement est plus large : il inclut le réchauffement, mais aussi les précipitations, les sécheresses, les glaces et le niveau des mers",
      "Le dérèglement est une exagération militante du réchauffement"
    ],
    answer: 2,
    expl: "Le réchauffement est une partie du dérèglement. C'est pourquoi un hiver rigoureux ou des pluies extrêmes ne contredisent pas le réchauffement : ils peuvent en faire partie."
  },
  {
    cat: "🌡️ Le réchauffement",
    q: "« Il a neigé en avril : il est où, votre réchauffement ? » Ce climatosceptique nie :",
    options: [
      "Le réchauffement lui-même",
      "La responsabilité humaine",
      "Les conséquences du réchauffement",
      "Le rôle du GIEC"
    ],
    answer: 0,
    expl: "Il nie le réchauffement, en confondant la météo d'un jour avec le climat de plusieurs décennies."
  },
  {
    cat: "🌡️ Le réchauffement",
    q: "« Le climat a toujours changé, bien avant les usines. » Ce climatosceptique nie :",
    options: [
      "Le réchauffement lui-même",
      "La responsabilité humaine",
      "Les conséquences du réchauffement",
      "Le rôle du GIEC"
    ],
    answer: 1,
    expl: "Il accepte que le climat change, mais pas que l'humain en soit la cause. Que le climat ait changé dans le passé ne dit rien de la cause du changement actuel."
  },
  {
    cat: "🌡️ Le réchauffement",
    q: "« Deux degrés de plus, on s'adaptera. » Ce climatosceptique nie :",
    options: [
      "Le réchauffement lui-même",
      "La responsabilité humaine",
      "Les conséquences du réchauffement",
      "Le rôle du GIEC"
    ],
    answer: 2,
    expl: "Il accepte le réchauffement, mais pas sa gravité. Lui montrer des courbes de température ne sert à rien : il faut lui parler d'impacts concrets."
  },
  {
    cat: "🌡️ Le réchauffement",
    q: "En France, quelle part de la population est climatosceptique (Ipsos, 2024) ?",
    options: [
      "Environ 3 %",
      "Environ 10 %",
      "Environ un tiers",
      "Plus de la moitié"
    ],
    answer: 2,
    expl: "33 % : 10 % nient le réchauffement, et 23 % l'admettent sans croire à sa cause humaine. Et depuis 2023, la tendance ne baisse plus."
  },

  // ── Les preuves ──────────────────────────────────────────────
  {
    cat: "🔬 Les preuves",
    q: "Lequel de ces éléments n'est PAS un indice du réchauffement climatique ?",
    options: [
      "L'accumulation de chaleur dans les océans",
      "La fonte des glaciers et des calottes polaires",
      "L'élévation du niveau moyen des mers",
      "Le nombre de journées froides en avril dans une ville"
    ],
    answer: 3,
    expl: "Les vrais indices se mesurent à l'échelle de la planète et sur la durée : températures moyennes, chaleur des océans, glaces, niveau des mers, gaz à effet de serre. Quelques jours froids dans une ville n'en font pas partie."
  },
  {
    cat: "🔬 Les preuves",
    q: "Comment sait-on que le réchauffement est d'origine humaine ?",
    options: [
      "Grâce à des signatures : par exemple, la haute atmosphère se refroidit pendant que la basse se réchauffe",
      "Parce que le GIEC l'a voté",
      "Parce que les étés sont plus chauds qu'avant",
      "On ne le sait pas, c'est une hypothèse"
    ],
    answer: 0,
    expl: "Chaque cause laisse une trace différente. Si le Soleil chauffait davantage, toutes les couches de l'atmosphère se réchaufferaient. Or la stratosphère se refroidit : c'est la signature des gaz à effet de serre."
  },
  {
    cat: "🔬 Les preuves",
    q: "« Le CO₂ ne représente que 0,04 % de l'air, il ne peut rien faire. » Où est l'erreur ?",
    options: [
      "Le CO₂ représente en réalité plus de 20 % de l'air",
      "Il n'y a pas d'erreur, le CO₂ n'a pas d'effet sur le climat",
      "Le chiffre de 0,04 % a été inventé par les climatosceptiques",
      "On confond une petite quantité avec un petit effet : le CO₂ retient la chaleur, contrairement à l'azote et à l'oxygène"
    ],
    answer: 3,
    expl: "Le chiffre est juste, le raisonnement non. Ce n'est pas la part du CO₂ dans l'air qui compte, c'est ce qu'il fait : il retient la chaleur que la Terre renvoie vers l'espace."
  },

  // ── La désinformation sur les réseaux ────────────────────────
  {
    cat: "📱 La désinformation",
    q: "Selon l'étude du CNRS sur Twitter (2023), qui sont souvent les comptes climatodénialistes ?",
    options: [
      "Des climatologues en désaccord avec le GIEC",
      "Surtout des comptes d'entreprises pétrolières",
      "Les mêmes comptes qui étaient antivax pendant le COVID, puis pro-russes pendant la guerre en Ukraine",
      "Des militants écologistes déçus"
    ],
    answer: 2,
    expl: "Ce ne sont pas des spécialistes du climat : ce sont des comptes qui passent d'une controverse à l'autre. Les vrais spécialistes parlent de leur sujet, les « références » dénialistes parlent de tout."
  },
  {
    cat: "📱 La désinformation",
    q: "Un compte présenté comme « expert » donne son avis sur le climat, les vaccins, la guerre en Ukraine et l'économie. Qu'en penser ?",
    options: [
      "C'est plutôt mauvais signe : un vrai spécialiste parle de son domaine",
      "C'est rassurant : il a une vision d'ensemble",
      "Rien, le nombre de sujets abordés ne dit rien",
      "C'est la preuve qu'il est payé pour mentir"
    ],
    answer: 0,
    expl: "Personne n'est expert de tout. Un avis sur tous les sujets est un indice, pas une preuve : il invite à vérifier d'où vient l'expertise annoncée."
  },
  {
    cat: "📱 La désinformation",
    q: "« Et la Chine, alors ? Commencez par leur parler à eux. » Quelle technique des 5 D est utilisée ?",
    options: [
      "Discréditer",
      "Déformer",
      "Distraire",
      "Diviser"
    ],
    answer: 2,
    expl: "Distraire, par le whataboutism : on ne répond pas à la question posée, on change de sujet."
  },
  {
    cat: "📱 La désinformation",
    q: "« Les écolos veulent qu'on retourne vivre dans des grottes. » Quelle technique est utilisée ?",
    options: [
      "L'homme de paille : on déforme la position adverse",
      "Le whataboutism : on change de sujet",
      "La menace : on dissuade de parler",
      "Aucune, c'est un argument comme un autre"
    ],
    answer: 0,
    expl: "Déformer, par l'homme de paille : personne ne défend cette position. On invente une version absurde pour la réfuter facilement."
  },
  {
    cat: "📱 La désinformation",
    q: "Dans la technique des 5 D, « discréditer » consiste à :",
    options: [
      "Montrer qu'un chiffre est faux",
      "Proposer une autre explication",
      "Opposer les groupes entre eux",
      "Attaquer la personne plutôt que ce qu'elle dit"
    ],
    answer: 3,
    expl: "C'est une attaque de l'éthos : le chercheur a pris l'avion, le journaliste est « vendu ». Rien de tout cela ne change ses mesures."
  },
  {
    cat: "📱 La désinformation",
    q: "Quelle nouvelle stratégie se développe sur les réseaux sociaux ?",
    options: [
      "Nier que les glaciers fondent",
      "Ne plus attaquer le réchauffement, mais les solutions qu'on lui apporte",
      "Publier uniquement des études scientifiques",
      "Ne plus parler du climat du tout"
    ],
    answer: 1,
    expl: "Nier devient difficile. On s'attaque donc aux solutions, souvent en les présentant comme un plan caché pour contrôler la population ou enrichir quelqu'un."
  },

  // ── Pourquoi les preuves ne suffisent pas ────────────────────
  {
    cat: "🧠 Pourquoi on doute",
    q: "Le raisonnement motivé, c'est :",
    options: [
      "Réfléchir longtemps avant de décider",
      "Être motivé pour apprendre de nouvelles choses",
      "Choisir d'abord la conclusion qui nous convient, puis construire le raisonnement qui y mène",
      "Changer d'avis face à une preuve"
    ],
    answer: 2,
    expl: "« Nous n'avons pas un scientifique en nous, nous avons un avocat. » L'avocat connaît déjà sa conclusion et cherche les arguments pour la défendre."
  },
  {
    cat: "🧠 Pourquoi on doute",
    q: "Aux États-Unis, quel facteur prédit le plus le déni climatique (Gounaridis et Newell, 2024) ?",
    options: [
      "Le niveau de diplôme",
      "Le revenu",
      "L'affiliation politique",
      "L'âge"
    ],
    answer: 2,
    expl: "L'affiliation politique arrive en tête, devant le niveau de diplôme, le taux de vaccination contre le COVID, l'intensité carbone de l'économie régionale et le revenu."
  },
  {
    cat: "🧠 Pourquoi on doute",
    q: "Pendant les gigantesques incendies australiens de 2019-2020, qu'est-il arrivé aux opinions sur le climat ?",
    options: [
      "Les climatosceptiques ont presque disparu",
      "Le nombre de convaincus a fortement augmenté",
      "Les sceptiques sont devenus majoritaires",
      "Aucun progrès : les convaincus ont un peu reculé, et beaucoup ont cru que des pyromanes avaient allumé les feux"
    ],
    answer: 3,
    expl: "Une catastrophe ne convainc que si on l'attribue au climat. Or une fausse information a circulé : les feux auraient été allumés par des centaines de pyromanes. Elle a été acceptée par 89 % des sceptiques, 57 % des hésitants et même 39 % des convaincus."
  },
  {
    cat: "🧠 Pourquoi on doute",
    q: "Pourquoi insulter ou culpabiliser un climatosceptique est-il contre-productif ?",
    options: [
      "À cause de la réactance : quand on se sent contraint, on s'accroche plus fort à sa position",
      "Parce que c'est impoli, mais sans autre effet",
      "Parce que ça le rend plus complotiste",
      "Ce n'est pas contre-productif, ça le fait réfléchir"
    ],
    answer: 0,
    expl: "La réactance : on défend sa liberté en se raidissant. Celui qui insulte se soulage, et la discussion se ferme."
  },
  {
    cat: "🧠 Pourquoi on doute",
    q: "Jouer sur la peur pour convaincre un sceptique :",
    options: [
      "Marche très bien, c'est la méthode la plus efficace",
      "Marche uniquement chez les jeunes",
      "Ne marche que sur les personnes déjà convaincues, et risque l'effet inverse chez les sceptiques",
      "Est la seule méthode recommandée par le GIEC"
    ],
    answer: 2,
    expl: "La peur mobilise ceux qui sont déjà d'accord. Chez les sceptiques, elle nourrit le rejet."
  },

  // ── Comment en parler ────────────────────────────────────────
  {
    cat: "💬 Comment en parler",
    q: "« Essayez de ne pas penser à un éléphant en tutu. » Que montre cette expérience ?",
    options: [
      "Que notre imagination est incontrôlable",
      "Qu'un démenti répète l'information : le « non » s'oublie, l'information reste",
      "Qu'il faut utiliser des images pour convaincre",
      "Que l'humour désarme les sceptiques"
    ],
    answer: 1,
    expl: "Pour comprendre la phrase, il faut imaginer l'éléphant. D'où le conseil : plutôt que de dire « c'est faux », proposer une explication alternative."
  },
  {
    cat: "💬 Comment en parler",
    q: "Face à quelqu'un qui doute, que vaut-il mieux montrer ?",
    options: [
      "Le consensus : les scientifiques sont quasiment tous d'accord",
      "Le plus grand nombre possible d'études",
      "Des images de catastrophes",
      "Des ours polaires en détresse"
    ],
    answer: 0,
    expl: "Juger soi-même une courbe est difficile. Comprendre que presque tous les spécialistes arrivent à la même conclusion est facile."
  },
  {
    cat: "💬 Comment en parler",
    q: "Pourquoi un porte-parole « de son camp » convainc-il mieux ?",
    options: [
      "Parce qu'il est plus compétent",
      "Parce qu'il parle plus fort",
      "Parce que nous écoutons plus volontiers quelqu'un de notre groupe (l'endogroupe) que d'un groupe extérieur (l'exogroupe)",
      "Il ne convainc pas mieux"
    ],
    answer: 2,
    expl: "Le même message ne passe pas de la même façon selon qui le porte. Vous n'êtes peut-être pas le meilleur interlocuteur."
  },
  {
    cat: "💬 Comment en parler",
    q: "Lequel de ces leviers ne fait PAS partie de ceux présentés pendant la formation ?",
    options: [
      "Rendre le réchauffement concret",
      "Établir des normes sociales",
      "Présenter les actions comme positives et faciles",
      "Ridiculiser les arguments adverses en public"
    ],
    answer: 3,
    expl: "Ridiculiser déclenche la réactance. Les leviers efficaces : écouter, s'appuyer sur les valeurs de la personne, montrer le consensus, rendre concret, montrer les bénéfices, installer des normes, présenter les actions comme faciles."
  }
];
