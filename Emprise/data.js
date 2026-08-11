// =========================
// Données du jeu — FICTION / MOCK
// Conversation fictive (Sophie 🩷 = "me", Lucas 💬 = "them")
// =========================

const RESOURCES = [
  {
    name: "3919 — Violences Femmes Info",
    desc: "Écoute, information et orientation, anonyme et gratuit, 7j/7, 24h/24. Ce numéro n'apparaît pas sur les factures détaillées.",
    type: "tel",
    value: "3919"
  },
  {
    name: "Arrêtons les violences (site officiel)",
    desc: "Informations, tchat en ligne et annuaire des structures d'aide partout en France.",
    type: "url",
    value: "https://arretonslesviolences.gouv.fr"
  },
  {
    name: "3018 — Net Écoute",
    desc: "Numéro national contre les violences numériques (harcèlement en ligne, contrôle via les réseaux sociaux...), notamment pour les jeunes.",
    type: "tel",
    value: "3018"
  },
  {
    name: "17 / 112 — Urgence",
    desc: "En cas de danger immédiat, contacter la police / gendarmerie ou le numéro d'urgence européen.",
    type: "tel",
    value: "17"
  }
];

// Ordre chronologique des mécanismes pour la frise de bilan
const MECHANISM_ORDER = [
  "love_bombing",
  "jalousie_induite",
  "chantage_affectif",
  "controle_social",
  "gaslighting",
  "isolement_amis",
  "devalorisation",
  "cycle_tension_reconciliation",
  "isolement_geographique",
  "dependance_financiere"
];

const CHECKPOINTS = {

  chk_love_bombing: {
    mechanism: "love_bombing",
    mechanismLabel: "Love bombing (surinvestissement précoce)",
    date: "8 mars",
    question: "Ça ne fait qu'une soirée qu'ils sont ensemble, et Lucas est déjà dans cette intensité de déclarations. Qu'est-ce qui se joue ici ?",
    explanation: "Multiplier les déclarations d'amour intenses dès les premiers échanges, avant même de vraiment se connaître, porte un nom : le love bombing. Ce n'est pas anodin : cette intensité crée un attachement accéléré et rend plus difficile de prendre du recul plus tard, quand d'autres comportements moins agréables apparaîtront. Le love bombing n'est pas toujours calculé consciemment, mais son effet est le même : il abaisse la vigilance.",
    hint: "Relis les messages de Lucas : à quelle vitesse en dit-il autant, pour une toute première soirée ensemble ?",
    clusters: [
      { label: "vitesse excessive", terms: ["love bombing", "trop vite", "tres vite", "trop rapide", "precipit", "des le debut", "premiere soiree", "premier soir", "a peine ensemble", "premier jour", "va vite"] },
      { label: "intensité excessive", terms: ["exagere", "excessi", "trop fort", "trop intense", "en fait trop", "en rajoute", "demesure", "surinvestissement"] },
      { label: "idéalisation précoce", terms: ["idealis", "piedestal", "trop parfait"] },
      { label: "déclarations disproportionnées", terms: ["declaration", "extraordinaire", "trop de mots forts", "mots trop forts"] }
    ],
    misreadings: [
      { terms: ["il est juste amoureux", "normal quand on aime", "juste romantique", "c'est mignon", "c'est romantique", "rien de grave juste amoureux"],
        feedback: "Être amoureux et le dire, ce n'est pas un problème en soi. Ce qui interroge ici, c'est l'intensité et la vitesse : des mots aussi forts (« extraordinaire », « tellement de la chance ») dès la première soirée, avant de vraiment se connaître. Ce n'est pas l'amour qui pose question, c'est le rythme." }
    ],
    qcm: [
      { text: "Il est juste très amoureux, c'est romantique", correct: false },
      { text: "Il crée très vite une intensité émotionnelle inhabituelle pour une première soirée (love bombing)", correct: true },
      { text: "Il se moque gentiment de Sophie", correct: false },
      { text: "Il teste si Sophie va répondre aussi vite que lui", correct: false }
    ]
  },

  chk_jalousie_induite: {
    mechanism: "jalousie_induite",
    mechanismLabel: "Jalousie induite / mise en garde floue",
    date: "11 mars",
    question: "Lucas parle d'une « jalousie » que Sophie attirerait, sans jamais rien affirmer clairement. Qu'est-ce qu'il est en train de faire ?",
    explanation: "Suggérer, sans jamais rien affirmer précisément, que « les autres » vont être jaloux ou vont mal réagir, c'est une façon d'introduire une inquiétude diffuse sans formuler une accusation que Sophie pourrait discuter ou réfuter. Ce flou plante une graine d'inquiétude qui resservira plus tard, tout en laissant à Lucas la possibilité de dire qu'il « ne faisait que la complimenter ».",
    hint: "Qu'est-ce que Lucas affirme vraiment, et qu'est-ce qu'il laisse juste flotter, sans le dire clairement ?",
    clusters: [
      { label: "jalousie induite / mise en garde vague", terms: ["jalousie induite", "insinu", "sous entend", "instille", "installe le doute", "plante le doute", "suggere sans dire", "mise en garde", "met en garde", "avertissement"] },
      { label: "flou volontaire", terms: ["vague", "flou", "rien de precis", "sans rien affirmer", "sans preciser"] },
      { label: "compliment empoisonné", terms: ["fausse compliment", "compliment piege", "sous couvert de compliment", "deguise en compliment", "compliment qui cache"] },
      { label: "prépare le terrain", terms: ["prepare le terrain", "pose les bases", "resservira", "garde ca sous le coude", "plus tard il pourra"] }
    ],
    misreadings: [
      { terms: ["juste un compliment", "il la trouve belle c'est tout", "c'est gentil", "juste flatteur", "rien de mechant"],
        feedback: "Dire à quelqu'un qu'il/elle est beau/belle n'est pas le problème. Ici, le compliment sert de prétexte pour introduire l'idée que « les autres » vont être jaloux ou en vouloir à Sophie — une inquiétude vague, non vérifiable, qui prépare le terrain pour de futures accusations de jalousie (comme on le reverra avec Cléa)." }
    ],
    qcm: [
      { text: "Il complimente juste Sophie sur son physique", correct: false },
      { text: "Il installe une inquiétude vague sur la jalousie des autres, sans rien affirmer de précis", correct: true },
      { text: "Il la met en garde contre un danger réel et concret", correct: false },
      { text: "Il plaisante pour détendre l'atmosphère", correct: false }
    ]
  },

  chk_chantage_affectif: {
    mechanism: "chantage_affectif",
    mechanismLabel: "Culpabilisation / chantage affectif",
    date: "15 mars",
    question: "Lucas insiste pour que Sophie renonce à sa soirée entre copines. Comment fait-il pour la faire changer d'avis ?",
    explanation: "Lucas ne demande jamais frontalement à Sophie de rester (« reste avec moi »). Il décrit son propre mal-être (« je me sens pas bien », « soirée DIFFICILE ») et laisse Sophie faire le lien elle-même, jusqu'à ce qu'elle propose de renoncer à sa soirée. C'est le mécanisme du chantage affectif : faire porter à l'autre la responsabilité de son bien-être émotionnel, sans jamais poser une demande claire qu'elle pourrait simplement refuser.",
    hint: "Lucas demande-t-il clairement à Sophie de rester, ou la laisse-t-il deviner ce qu'elle doit faire ?",
    clusters: [
      { label: "chantage affectif direct", terms: ["chantage affectif", "culpabilise", "culpabiliser", "culpabilite"] },
      { label: "manipulation par le mal-être", terms: ["mal etre", "victimise", "se victimise", "joue la victime", "joue sur ses sentiments", "joue sur sa tristesse"] },
      { label: "demande indirecte", terms: ["demande jamais clairement", "sans demander clairement", "fait comprendre sans demander", "demande deguisee", "ne demande pas franchement"] },
      { label: "pousse à renoncer", terms: ["renoncer a sa soiree", "annuler sa soiree", "la retenir", "la fait rester", "abandonner sa soiree"] }
    ],
    misreadings: [
      { terms: ["il est juste triste", "il l'aime c'est normal qu'il s'ennuie", "c'est sincere", "il exprime juste ses sentiments", "rien de mal a dire qu'on s'ennuie"],
        feedback: "Exprimer qu'on s'ennuie n'est pas un problème en soi. Ce qui pose question, c'est que Lucas ne dit jamais clairement ce qu'il veut (« reste avec moi ») — il laisse Sophie deviner et se sentir responsable de son mal-être, jusqu'à ce qu'elle renonce elle-même à sa soirée entre amies." }
    ],
    qcm: [
      { text: "Il exprime sincèrement sa tristesse, sans arrière-pensée", correct: false },
      { text: "Il fait porter à Sophie la responsabilité de son mal-être pour qu'elle renonce à sa soirée (chantage affectif)", correct: true },
      { text: "Il propose une solution pour qu'ils passent du temps ensemble plus tard", correct: false },
      { text: "Il demande clairement à Sophie de rester avec lui", correct: false }
    ]
  },

  chk_controle_social: {
    mechanism: "controle_social",
    mechanismLabel: "Contrôle social déguisé en inquiétude",
    date: "19 mars",
    question: "Lucas parle d'image, de réputation, de ce que « les autres » vont penser. Qu'est-ce qu'il cherche à faire ?",
    explanation: "Lucas ne dit jamais « je t'interdis de liker ». Il construit un discours sur l'image et la réputation de Sophie face aux autres, en se présentant comme protecteur (« je dis ça pour toi », « je veux pas qu'on ait une mauvaise image de toi »). C'est une façon de contrôler le comportement de Sophie sur les réseaux sociaux sans jamais formuler d'interdiction explicite — ce qui rend la chose plus difficile à contester.",
    hint: "Lucas dit-il clairement « je ne veux pas que tu likes ça », ou passe-t-il par un autre argument pour arriver au même résultat ?",
    clusters: [
      { label: "contrôle social direct", terms: ["controle social", "controle ce qu'elle fait", "controle ses reseaux", "controle sa reputation", "controle son image", "controle ce qu'elle poste", "controle ce qu'elle publie"] },
      { label: "interdiction déguisée", terms: ["interdit sans le dire", "interdiction deguisee", "impose sans demander", "sans jamais interdire"] },
      { label: "prétexte protection/image", terms: ["pretexte", "sous couvert de la proteger", "pour son image", "pour sa reputation", "mauvaise image", "mauvaise reputation", "qu'en pensent les autres", "que vont penser les autres"] },
      { label: "pression sur les réseaux sociaux", terms: ["arreter de liker", "pression sur ses reseaux", "surveille ses reseaux", "controle ses likes"] }
    ],
    misreadings: [
      { terms: ["c'est vrai que ca peut mal se voir", "il a raison sur l'image", "c'est juste un conseil", "il veut la proteger des ragots", "c'est normal de faire attention a son image"],
        feedback: "Lucas ne donne pas juste un conseil ponctuel : il utilise le prétexte de « l'image » et de ce que pensent « les autres » pour faire pression sur un comportement banal (liker la photo d'un ami). C'est le prétexte de la réputation qui sert à faire du contrôle, pas une vraie discussion entre adultes sur un sujet concret." }
    ],
    qcm: [
      { text: "Il donne juste un conseil bienveillant sur les réseaux sociaux", correct: false },
      { text: "Il utilise le prétexte de l'image et de la réputation pour contrôler son comportement en ligne", correct: true },
      { text: "Il est jaloux de Jérémy et le dit clairement", correct: false },
      { text: "Il demande à Sophie de fermer son compte Instagram", correct: false }
    ]
  },

  chk_gaslighting: {
    mechanism: "gaslighting",
    mechanismLabel: "Gaslighting (nier la réalité perçue par l'autre)",
    date: "mercredi",
    question: "Sophie décrit un changement d'humeur réel qu'elle observe chez Lucas. Comment réagit-il ?",
    explanation: "Sophie décrit une observation précise et cohérente (des jours chaleureux, d'autres très distants). Plutôt que d'en discuter, Lucas nie la réalité de ce qu'elle perçoit (« tu te fais des films », « tu dis n'importe quoi ») et retourne la situation contre elle (« tu te prends la tête », « je culpabilise à cause de toi »). C'est le mécanisme du gaslighting : faire douter l'autre de son propre jugement, au point qu'elle se sente responsable d'avoir soulevé le problème.",
    hint: "Est-ce que Lucas répond à ce que Sophie observe, ou est-ce qu'il lui fait dire que c'est elle qui a un problème ?",
    clusters: [
      { label: "gaslighting direct", terms: ["gaslighting", "nie la realite", "nie ce qu'elle ressent", "fait douter d'elle", "doute d'elle meme", "remet en cause son jugement", "fait des films", "se fait des films"] },
      { label: "inversion de responsabilité", terms: ["inverse les roles", "retourne la situation", "retourne contre elle", "renverse la faute", "inversion", "c'est elle qui culpabilise"] },
      { label: "minimisation / déni", terms: ["minimise", "dit que c'est rien", "dit qu'elle invente", "dit qu'elle exagere", "nie le probleme", "deni"] },
      { label: "il nie le problème", terms: ["il nie", "refuse de reconnaitre", "ne reconnait pas son changement"] }
    ],
    misreadings: [
      { terms: ["il est juste fatigue", "c'est normal de se defendre", "chacun reagit comme il peut", "elle exagere peut etre vraiment", "elle se prend peut etre trop la tete"],
        feedback: "Que Lucas soit parfois fatigué n'explique pas sa réaction : au lieu de reconnaître ou de discuter du changement d'humeur que Sophie observe (ce qui serait légitime), il nie sa perception (« tu te fais des films ») et retourne la situation pour qu'elle se sente coupable d'en avoir parlé. C'est ce retournement qui est le signal, pas le fait qu'il se défende." }
    ],
    qcm: [
      { text: "Il explique calmement pourquoi il a été distant", correct: false },
      { text: "Il nie la perception de Sophie et retourne la faute contre elle (gaslighting)", correct: true },
      { text: "Il reconnaît son erreur et s'excuse", correct: false },
      { text: "Il propose d'en reparler plus tard", correct: false }
    ]
  },

  chk_isolement_amis: {
    mechanism: "isolement_amis",
    mechanismLabel: "Isolement des ami·e·s",
    date: "20 mars",
    question: "Depuis le début de cet échange, Lucas ne cesse de dévaloriser Cléa. Qu'est-ce qu'il est en train de faire ?",
    explanation: "Lucas ne dit jamais à Sophie « ne vois plus Cléa ». Il dévalorise Cléa point par point, retourne contre elle toute critique qu'elle aurait pu faire sur le couple (« c'est de la jalousie »), et se pose en seul soutien fiable (« demande-toi qui est vraiment là pour toi »). Couper une personne de ses ami·e·s proches est un des mécanismes les plus documentés de l'emprise : moins Sophie a de regards extérieurs sur sa relation, plus il est facile de faire accepter des comportements qu'un·e ami·e signalerait immédiatement.",
    hint: "Qu'est-ce que Lucas accuse Cléa de ressentir, et à qui profite cette accusation ?",
    clusters: [
      { label: "isolement direct", terms: ["isole", "isolement", "coupe de ses amis", "eloigne de clea", "ecarte clea", "separe de clea", "couper de clea"] },
      { label: "dénigrement de l'entourage", terms: ["denigre clea", "rabaisse clea", "critique clea", "dit du mal de clea", "discredite clea", "n'est pas une bonne personne"] },
      { label: "accusation de jalousie projetée", terms: ["clea", "jalous", "accuse", "rejette la faute", "fait passer"] },
      { label: "se pose en seul soutien", terms: ["seul soutien", "le seul", "personne d'autre", "seule personne en qui elle a confiance", "seul repere"] }
    ],
    misreadings: [
      { terms: ["il est juste inquiet pour elle", "il est protecteur", "c'est normal de se mefier", "il a peut etre raison sur cle", "il donne juste son avis sur une amie"],
        feedback: "C'est exactement ce que Lucas veut faire croire — mais dénigrer systématiquement une amie de longue date, sans aucun fait concret, tout en l'accusant d'être « jalouse », ça ne protège pas Sophie : ça l'isole d'un regard extérieur qui pourrait justement l'aider à voir la relation plus clairement." }
    ],
    qcm: [
      { text: "Il exprime une inquiétude légitime pour une amie qui ne lui plaît pas", correct: false },
      { text: "Il isole Sophie de Cléa en la dévalorisant et en retournant l'accusation de jalousie contre elle", correct: true },
      { text: "Il plaisante sur la vie amoureuse de Cléa", correct: false },
      { text: "Il propose d'inviter Cléa pour mieux la connaître", correct: false }
    ]
  },

  chk_devalorisation: {
    mechanism: "devalorisation",
    mechanismLabel: "Dévalorisation physique déguisée en compliment",
    date: "22 mars",
    question: "Lucas commente le physique et les vêtements de Sophie à plusieurs reprises. Qu'est-ce que ça produit ?",
    explanation: "Chaque remarque est enrobée dans un compliment (« t'es tellement belle ») mais le message réel est une critique (« ce t-shirt te fait grossir », « t'es pas assez exigeante »). Ce style de dévalorisation est particulièrement difficile à contester : si Sophie réagit, Lucas peut dire qu'il ne faisait que la trouver belle. Répétée dans le temps, cette dévalorisation déguisée en compliment entame la confiance de Sophie en son propre jugement sur elle-même.",
    hint: "Le message est enrobé de compliments — mais qu'est-ce que Lucas critique vraiment, en dessous ?",
    clusters: [
      { label: "dévalorisation directe", terms: ["devalorise", "denigre son physique", "critique son physique", "rabaisse son apparence", "critique ce qu'elle porte", "critique son corps"] },
      { label: "compliment empoisonné / critique déguisée", terms: ["compliment empoisonne", "fausse compliment", "critique deguisee", "sous couvert de compliment", "critique cachee dans un compliment"] },
      { label: "contrôle de l'apparence", terms: ["controle ce qu'elle porte", "choisit ses vetements", "lui dit quoi porter", "impose son gout", "decide de son look", "lui dit quoi mettre"] },
      { label: "sape la confiance en soi", terms: ["fait grossir", "pas assez exigeante", "sape sa confiance", "confiance en elle", "estime de soi"] }
    ],
    misreadings: [
      { terms: ["il donne juste son avis", "c'est normal de donner son avis sur les vetements", "il la trouve belle c'est un compliment", "chacun a ses gouts", "il essaie juste de l'aider a se sentir bien"],
        feedback: "Donner son avis une fois sur une tenue, ce n'est pas le problème. Ici, le motif répété (« ça te fait grossir », « t'es pas assez exigeante ») sous couvert de compliments (« t'es tellement belle ») sert à orienter ce que Sophie porte et, avec le temps, à fragiliser l'image qu'elle a d'elle-même." }
    ],
    qcm: [
      { text: "Il complimente sincèrement Sophie sur sa beauté", correct: false },
      { text: "Il dévalorise son physique et ses choix sous couvert de compliments, pour orienter son apparence", correct: true },
      { text: "Il l'aide à choisir une tenue pour une occasion précise", correct: false },
      { text: "Il est simplement franc sur ses goûts vestimentaires", correct: false }
    ]
  },

  chk_cycle_tension: {
    mechanism: "cycle_tension_reconciliation",
    mechanismLabel: "Cycle tension → explosion → réconciliation",
    date: "23 mars",
    question: "Lucas passe de la colère explosive (« RÉPONDS-MOI, PUTAIN ») à la déclaration d'amour, en quelques minutes. Qu'est-ce que ce cycle produit chez Sophie ?",
    explanation: "Le passage brutal d'une crise de colère et de contrôle (« avec qui tu traînes ? ») à l'excuse par l'amour (« c'est parce que je tiens beaucoup à toi ») est un cycle bien documenté dans les relations d'emprise : tension, explosion, puis réconciliation intense qui efface la crise et la fait passer pour une preuve d'amour. Ce cycle pousse Sophie à s'excuser et à modifier son comportement (« faut qu'on fasse attention à ce que ça se reproduise plus ») pour un problème qui vient en réalité du comportement de contrôle de Lucas.",
    hint: "Regarde l'enchaînement complet : colère → exigences → excuse. Qui, à la fin, se retrouve à devoir « faire attention » ?",
    clusters: [
      { label: "cycle tension-réconciliation", terms: ["cycle", "tension puis reconciliation", "explosion puis excuse", "alterne colere et amour", "passe de la colere a l'amour", "crise puis"] },
      { label: "contrôle / possessivité", terms: ["controle qui elle voit", "veut savoir avec qui", "exige qu'elle reponde", "controle ses sorties", "exige de savoir ou elle est", "avec qui elle traine"] },
      { label: "excuse par l'amour", terms: ["excuse sa colere", "par amour", "parce qu'il l'aime", "justifie la crise", "tient a elle"] },
      { label: "crise disproportionnée", terms: ["crise", "colere demesuree", "explose", "pete un cable", "peter un cable", "panique"] }
    ],
    misreadings: [
      { terms: ["il s'inquiete c'est normal", "elle aurait du repondre", "c'est comprehensible qu'il s'inquiete", "elle a eu tort de pas repondre", "c'est de sa faute si elle a pas repondu"],
        feedback: "S'inquiéter de ne pas avoir de nouvelles peut arriver à tout le monde. Ce qui pose question ici, c'est l'intensité de la crise (majuscules, exigence de savoir « avec qui » elle est) suivie d'une justification par l'amour — un cycle qui fait retomber la responsabilité sur Sophie plutôt que sur le comportement de contrôle de Lucas." }
    ],
    qcm: [
      { text: "Il s'inquiète légitimement et Sophie aurait dû répondre plus vite", correct: false },
      { text: "Il enchaîne crise de contrôle et excuse par l'amour, un cycle qui fait porter la faute à Sophie", correct: true },
      { text: "Il exprime des remords sincères sans rien exiger en retour", correct: false },
      { text: "Il propose de s'acheter un chargeur ensemble", correct: false }
    ]
  },

  chk_isolement_geo: {
    mechanism: "isolement_geographique",
    mechanismLabel: "Isolement géographique",
    date: "12 juin",
    question: "Lucas a déjà trouvé un appartement et un travail à l'autre bout de la France, avant même d'en parler à Sophie. Qu'est-ce que ce projet produit concrètement ?",
    explanation: "Le déménagement est présenté comme une surprise romantique (« juste nous deux », « un cocon »), mais son effet concret est de couper Sophie de tout son entourage (amis, famille, travail) au bénéfice d'une vie où Lucas serait la seule personne présente. Que ce soit calculé ou non, le résultat est le même : moins Sophie a de liens sociaux indépendants de lui, plus il devient difficile pour elle de prendre du recul ou de demander de l'aide.",
    hint: "Qui a pris les décisions (travail, appartement) — et qui découvre le projet une fois qu'il est déjà ficelé ?",
    clusters: [
      { label: "isolement géographique direct", terms: ["isolement geographique", "coupe de son entourage", "eloigne de sa famille", "eloigne de ses amis", "deracine", "coupe de tout", "loin de tout"] },
      { label: "décision unilatérale / fait accompli", terms: ["decide sans elle", "fait accompli", "decision unilaterale", "deja tout decide", "sans lui demander son avis", "impose le demenagement", "sans la consulter"] },
      { label: "romantisation de l'isolement", terms: ["romantise l'isolement", "enrobe l'isolement", "juste nous deux", "juste eux deux", "presente ca comme un reve"] },
      { label: "déménagement imposé", terms: ["demenagement", "demenage", "demenager"] }
    ],
    misreadings: [
      { terms: ["c'est romantique", "c'est un beau projet", "c'est juste une opportunite", "c'est normal de vouloir avancer ensemble", "plein de couples demenagent comme ca"],
        feedback: "Déménager ensemble n'est pas un problème en soi. Ce qui interroge, c'est que Lucas a déjà tout décidé et organisé (travail, appartement) sans consulter Sophie, dans un lieu où elle ne connaît personne — et présente cet isolement complet comme la solution à « tous les problèmes » qu'elle a ici (Jérémy, Cléa, ses parents)." }
    ],
    qcm: [
      { text: "C'est un beau projet de vie à deux, spontané et romantique", correct: false },
      { text: "Il impose un déménagement déjà décidé, qui coupe Sophie de tout son entourage", correct: true },
      { text: "Il demande l'avis de Sophie avant de chercher un appartement", correct: false },
      { text: "Il propose de faire un essai de quelques mois", correct: false }
    ]
  },

  chk_dependance_fin: {
    mechanism: "dependance_financiere",
    mechanismLabel: "Dépendance financière",
    date: "12 juin",
    question: "Lucas propose que Sophie n'ait « même pas besoin de travailler ». Qu'est-ce que ça change dans l'équilibre du couple ?",
    explanation: "Présentée comme un cadeau (« t'auras même pas besoin de travailler »), cette proposition place Sophie dans une dépendance économique totale envers Lucas, dans une ville où elle ne connaît personne. Combinée à l'isolement géographique, la dépendance financière est l'un des facteurs qui rendent le plus difficile de partir d'une relation problématique : sans revenu propre ni réseau, les options concrètes de Sophie se réduisent fortement.",
    hint: "Si Sophie n'a plus de travail, plus d'amis proches sur place et vit dans l'appartement que Lucas a choisi seul, sur quoi repose son autonomie ?",
    clusters: [
      { label: "dépendance financière directe", terms: ["dependance financiere", "dependante", "dependant financierement", "plus de revenu", "plus d'argent a elle", "depend de lui"] },
      { label: "renoncement au travail présenté positivement", terms: ["arrete de travailler", "plus besoin de travailler", "renonce a son travail", "abandonne son emploi", "quitte son travail"] },
      { label: "répartition des rôles imposée", terms: ["gere l'argent", "gere la maison", "repartition traditionnelle", "controle les finances", "decide qui travaille"] },
      { label: "perte d'autonomie", terms: ["autonomie financiere", "perd son autonomie", "aucun revenu", "plus aucun revenu"] }
    ],
    misreadings: [
      { terms: ["c'est un cadeau", "c'est genereux", "c'est un soulagement pour elle", "elle pourra se reposer", "c'est plus confortable pour elle"],
        feedback: "Ne plus avoir à travailler peut sembler confortable à court terme. Mais combiné à l'éloignement de tout son entourage, ça place Sophie dans une dépendance financière totale envers Lucas — ce qui réduit fortement sa capacité à partir si la relation se dégrade encore." }
    ],
    qcm: [
      { text: "C'est un cadeau généreux qui va soulager Sophie", correct: false },
      { text: "Ça la rend totalement dépendante financièrement de lui, loin de tout son entourage", correct: true },
      { text: "Ça lui permettra d'épargner pour un projet personnel", correct: false },
      { text: "C'est une solution temporaire le temps de trouver un travail sur place", correct: false }
    ]
  }

};

const MESSAGES = [
  // Vendredi 8 mars
  { who: "section", text: "Vendredi 8 mars" },
  { who: "them", name: "Lucas 💬", text: "Salut !", time: "8 mars 22:18" },
  { who: "me", name: "Sophie 🩷", text: "Salut !", time: "8 mars 22:18", status: "read" },
  { who: "me", name: "Sophie 🩷", text: "J’ai passé une super soirée !", time: "8 mars 22:19", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Pareil ! T’es géniale ! Je suis heureux qu’on soit ensemble. T’es extraordinaire !", time: "8 mars 22:20" },
  { who: "me", name: "Sophie 🩷", text: "Merci ! C’est gentil ! 😍💖", time: "8 mars 22:21", status: "read" },
  { who: "them", name: "Lucas 💬", text: "J’ai tellement de la chance c’est pas possible ! ❤️❤️❤️", time: "8 mars 22:22", checkpoint: "chk_love_bombing" },

  // Samedi 9 mars - matin
  { who: "section", text: "Samedi 9 mars — 10:12" },
  { who: "them", name: "Lucas 💬", text: "Salut ma belle 😘", time: "9 mars 10:12" },
  { who: "them", name: "Lucas 💬", text: "On fait quoi aujourd’hui ?", time: "9 mars 10:13" },
  { who: "me", name: "Sophie 🩷", text: "Tu veux faire quoi ?", time: "9 mars 10:14", status: "read" },
  { who: "them", name: "Lucas 💬", text: "T’as vu comme il fait beau ? ☀️", time: "9 mars 10:15" },
  { who: "them", name: "Lucas 💬", text: "Viens, on se balade !", time: "9 mars 10:15" },
  { who: "me", name: "Sophie 🩷", text: "Allez, super ! 😍", time: "9 mars 10:16", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Ok, bisous 😘", time: "9 mars 10:17" },
  { who: "me", name: "Sophie 🩷", text: "J’amène à manger.\nOn se retrouve au parc dans deux heures 🌳", time: "9 mars 10:18", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Bisous ❤️", time: "9 mars 10:19" },
  { who: "me", name: "Sophie 🩷", text: "Bisous 😘", time: "9 mars 10:19", status: "read" },

  // Samedi 9 mars — soir
  { who: "section", text: "Samedi 9 mars — 18:30" },
  { who: "me", name: "Sophie 🩷", text: "Salut 😄\nOn fait quoi ce soir ?", time: "9 mars 18:30", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Aujourd’hui franchement, j’ai la flemme 😅", time: "9 mars 18:31" },
  { who: "them", name: "Lucas 💬", text: "Je vais rester chez moi et jouer à la console 🎮", time: "9 mars 18:32" },
  { who: "me", name: "Sophie 🩷", text: "Tu veux que je vienne ? 👀", time: "9 mars 18:33", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Non non, aujourd’hui j’ai envie d’être tranquille un peu 😌\nOn se voit la prochaine fois ❤️", time: "9 mars 18:34" },
  { who: "me", name: "Sophie 🩷", text: "Ok, ça marche ! 😊", time: "9 mars 18:36", status: "read" },

  // Lundi 11 mars
  { who: "section", text: "Lundi 11 mars — 09:22" },
  { who: "them", name: "Lucas 💬", text: "Comment va la plus belle d’aujourd’hui ?", time: "11 mars 09:22" },
  { who: "me", name: "Sophie 🩷", text: "Arrête 😁.", time: "11 mars 09:23", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Je rigole pas. T’es la plus belle fille que j’ai jamais vue.\nJ’espère que tu n’attires pas trop de jalousie 😉", time: "11 mars 09:24" },
  { who: "me", name: "Sophie 🩷", text: "Qu’est-ce que tu veux dire ?", time: "11 mars 09:25", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Bah, une fille comme toi, forcément…\nÇa fait beaucoup d’envie.", time: "11 mars 09:26", checkpoint: "chk_jalousie_induite" },
  { who: "me", name: "Sophie 🩷", text: "?", time: "11 mars 09:27", status: "read" },
  { who: "them", name: "Lucas 💬", text: "En tout cas, moi, je suis vraiment ravi qu’on puisse vivre ce moment ensemble. Hâte de te revoir très bientôt ❤️❤️❤️", time: "11 mars 09:29" },

  // Vendredi 15 mars
  { who: "section", text: "Vendredi 15 mars — 20:07" },
  { who: "them", name: "Lucas 💬", text: "Tu vas encore à une soirée sans moi ?", time: "15 mars 20:07" },
  { who: "me", name: "Sophie 🩷", text: "Mais enfin loulou, c’est une soirée entre copines.", time: "15 mars 20:08", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Bah ouais, mais…\nMoi, je sais pas quoi faire ce soir.\nJe m’ennuie.", time: "15 mars 20:10" },
  { who: "me", name: "Sophie 🩷", text: "Tu veux pas jouer à la console ?", time: "15 mars 20:11", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Bof 😅. Quand t’es pas là, je me sens pas bien.\nC’est comme un vide.\nJe suis content que tu sois avec tes copines. Mais pour moi ça va vraiment être une soirée DIFFICILE.", time: "15 mars 20:13", checkpoint: "chk_chantage_affectif" },
  { who: "me", name: "Sophie 🩷", text: "… Tu veux que je reste avec toi ?", time: "15 mars 20:14", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Tu fais ce que tu veux, ma chérie.\nMais ça compterait vraiment pour moi si…\nSi tu tenais compte de ce que je ressens là.\nÇa serait vraiment la preuve que t’es quelqu’un d’extraordinaire.", time: "15 mars 20:16" },
  { who: "me", name: "Sophie 🩷", text: "Bah écoute, ouais…\nJe vais dire à mes copines que je reste un peu avec toi.", time: "15 mars 20:18", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Mais franchement, t’es…\nJ’ai tellement de la chance d’être avec toi.\nT’es la plus belle chose qui me soit arrivée.\nJe t’attends vite ❤️\nGros bisous, gros bisous.\nOn va passer une soirée extraordinaire 😘\nBisous bisous bisous ❤️❤️❤️", time: "15 mars 20:20" },

  // Mardi 19 mars
  { who: "section", text: "Mardi 19 mars — 19:02" },
  { who: "them", name: "Lucas 💬", text: "J’ai vu que t’as liké la photo de Jérémy sur Insta.", time: "19 mars 19:02" },
  { who: "me", name: "Sophie 🩷", text: "La photo est marrante !", time: "19 mars 19:03", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Bof… chacun ses goûts on va dire.", time: "19 mars 19:04" },
  { who: "me", name: "Sophie 🩷", text: "Moi j’aime bien…", time: "19 mars 19:05", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Ah non y’a pas de problème, c’est juste que… je le sens pas Jérémy..\nEt puis tu sais, tu connais les hommes… si tu mets un like comme ça, il va commencer à… à se faire des idées.", time: "19 mars 19:07" },
  { who: "me", name: "Sophie 🩷", text: "Jérémie… je le connais depuis tout petit, c’est un pote.", time: "19 mars 19:08", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Ouais mais, tu sais, les hommes… ils ont toujours des idées derrière la tête.\nEt puis… moi je vois que t’as liké, tu sais.", time: "19 mars 19:10" },
  { who: "me", name: "Sophie 🩷", text: "Et alors ?", time: "19 mars 19:11", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Je sais pas, t’as pas pensé à ce que je pouvais ressentir en voyant ça ?", time: "19 mars 19:12" },
  { who: "me", name: "Sophie 🩷", text: "C’est-à-dire ?\nJe peux liker des choses ?", time: "19 mars 19:13", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Bah tu fais ce que tu veux.\nMais moi je vois ça, je me pose des questions, ça me rend triste.\nEt je comprends pas, tu vois… je ferasi pas ça.\nEt là je vois que tu likes comme ça la photo d’un autre mec sur Insta…\nBah voilà quoi, tu comprends ? Moi je me pose des questions.", time: "19 mars 19:15" },
  { who: "me", name: "Sophie 🩷", text: "Mais attends, pourquoi tu te poses des questions ?\nY’a aucun souci, Jérémie c’est un pote.", time: "19 mars 19:17", status: "read" },
  { who: "them", name: "Lucas 💬", text: ".\nEt puis en plus y’a d’autres personnes qui ont vu que t’as liké.\nEt ils savent qu’on est ensemble.\nDonc qu’est-ce qu’ils vont dire ? T’as pensé à tout ça ? Tu vois… c’est compliqué cette situation.\nMoi j’aimerais pas qu’on pense de toi… que tu veux plaire à plusieurs mecs en même temps par exemple.\nJe dis ça pour toi.\nJe veux pas qu’on ait une mauvaise image de toi.\nEt je dis ça parce que je t’aime énormément.\nEt je veux pas… que t’es une mauvaise réputation. ❤️", time: "19 mars 19:20", checkpoint: "chk_controle_social" },
  { who: "me", name: "Sophie 🩷", text: "Et donc faut quoi ?\nFaut que j’arrête de liker des photos de mecs ?", time: "19 mars 19:22", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Tu fais ce que tu veux…\nMais moi, je pense que c’est important que tu aies conscience de ce que je ressens et de l’image que ça donne.\nEt après, vraiment, c’est… c’est toi qui vois.\nBisous bisous, en tout cas, ma beauté ❤️\nEt passe une très bonne nuit 😘❤️❤️❤️", time: "19 mars 19:24" },

  // Mercredi
  { who: "section", text: "Mercredi — 18:42" },
  { who: "me", name: "Sophie 🩷", text: "Lucas, il faut qu’on parle. Des fois, je ne te comprends pas.", time: "Mercredi 18:42", status: "read" },
  { who: "them", name: "Lucas 💬", text: "C’est-à-dire ?", time: "Mercredi 18:43" },
  { who: "me", name: "Sophie 🩷", text: "Il y a des jours où tu es super chaleureux avec moi, tu es adorable.\nEt d’autres jours, tu es hyper distant… ça me met mal à l’aise, en fait.", time: "Mercredi 18:44", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Non mais Sophie, tu dis n’importe quoi, là.", time: "Mercredi 18:45" },
  { who: "me", name: "Sophie 🩷", text: "C’est vraiment quelque chose que j’ai remarqué.\nIl y a des jours, tu es adorable, on est super proches.\nEt des fois, tu ne me parles pas pendant des heures, voire des jours.\nEt tu es super froid dans tes réponses.", time: "Mercredi 18:46", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Là tu te fais vraiment des films.\nFAUT ARRETER DE TROP RÉFLÉCHIR COMME CA\nIl y a des jours où je suis plus fatigué, d’autres moins.\nC’est tout. Il ne faut pas aller plus loin.", time: "Mercredi 18:48" },
  { who: "me", name: "Sophie 🩷", text: "ça explique pas tes changements d’humeur.", time: "Mercredi 18:49", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Tu te prends tellement la tête Sophie.\nEt là, tu te prends trop la tête.\nFranchement, ce n’est pas bien pour nous.\nIl faut vraiment que tu arrêtes de trop réfléchir à tout ça.\nMoi ce que j’aime bien dans notre relation, c’est qu’elle est hyper simple.\nEt quand tu dis ça, tu crées une distance entre nous.\nEt maintenant je me sens mal. Je culpabilise un peu. C’est ce que tu veux", time: "Mercredi 18:51", checkpoint: "chk_gaslighting" },

  // Jeudi 20 mars
  { who: "section", text: "Jeudi 20 mars — 14:02" },
  { who: "them", name: "Lucas 💬", text: "Ton amie Cléa… j’ai beaucoup réfléchi, et je pense vraiment que ce n’est pas une bonne personne pour toi.", time: "20 mars 14:02" },
  { who: "me", name: "Sophie 🩷", text: "Pourquoi tu dis ça ? Je la connais depuis des années, Cléa.", time: "20 mars 14:03", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Ma chérie, je te l’ai déjà dit : tu te trompes souvent dans ton jugement sur les gens. Et à chaque fois, tu te fais avoir.", time: "20 mars 14:04" },
  { who: "me", name: "Sophie 🩷", text: "Quand est-ce que je me suis “faite avoir”, d’après toi ?", time: "20 mars 14:05", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Plusieurs fois.\nTu penses connaître les gens, tu leur fais confiance, et au final, ils te trahissent.\nJe l’ai remarqué. Et j’aime pas ça.\nJ’aime pas qu’on te manipule comme ça.", time: "20 mars 14:07" },
  { who: "me", name: "Sophie 🩷", text: "Non, mais Cléa, elle n’a rien fait de mal…", time: "20 mars 14:08", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Je te vois quand t’es avec elle. T’es pas vraiment toi. Tu fais la conne. On dirait une gamine franchement.", time: "20 mars 14:10" },
  { who: "me", name: "Sophie 🩷", text: "On passe de bons moments. Elle est sympa.", time: "20 mars 14:11", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Sympa… super. Si elle est “sympa” alors ça va 🙃.\nCléa, déjà, dès le début, elle ne m’aime pas.\nEt ça, pour moi, c’est très clair : c’est de la jalousie. 😏", time: "20 mars 14:13" },
  { who: "me", name: "Sophie 🩷", text: "Ah non, elle t’a juste dit qu’elle te trouve un peu… exclusif avec moi, c’est tout.", time: "20 mars 14:14", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Tu vois ?\nÇa, c’est typiquement de la jalousie.\nElle est jalouse de la relation qu’on a. Elle veut mettre de la distance entre nous.\nComme par hasard, elle a jamais réussi à garder un mec plus de quelques mois.\nEt nous, on est là, on est ensemble, on est heureux.\nElle veut briser ça. Comme ça elle t’a pour elle toute seule.", time: "20 mars 14:16" },
  { who: "me", name: "Sophie 🩷", text: "Ouais, mais bon… c’est ton avis, quoi.", time: "20 mars 14:17", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Sauf que toi, je te connais.\nT’es trop gentille, et tu risques de faire ce qu’elle veut pour lui faire plaisi. rElle t’a déjà dit de te méfier de moi, non ?\nEt toi, tu vas peut-être commencer à la croire.\nAlors qu’elle fait ça juste parce qu’elle ne supporte pas de te voir heureuse.\nParce que quand toi tu vas bien, elle, ça la rend folle.", time: "20 mars 14:19" },
  { who: "me", name: "Sophie 🩷", text: "Tu penses pas que t’abuses un peu, là ? 🤨", time: "20 mars 14:20", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Non, réfléchis bien.\nDemande-toi qui est vraiment là pour toi.\nQui fait tout pour ton bonheur, qui se bat pour toi.\nEt tu verras qu’il n’en reste pas beaucoup. 💬", time: "20 mars 14:22", checkpoint: "chk_isolement_amis" },

  // Vendredi 22 mars
  { who: "section", text: "Vendredi 22 mars — 18:42" },
  { who: "them", name: "Lucas 💬", text: "J’ai vu ta dernière photo sur Insta.", time: "22 mars 18:42" },
  { who: "me", name: "Sophie 🩷", text: "Ah ouais, t’aimes bien ?", time: "22 mars 18:43", status: "read" },
  { who: "them", name: "Lucas 💬", text: "T’as encore ce t-shirt ?", time: "22 mars 18:44" },
  { who: "me", name: "Sophie 🩷", text: "Bah y’a quoi, mon t-shirt ?", time: "22 mars 18:45", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Ah tu sais, je te l’ai dit, moi je trouve qu’il…\nIl te fait grossir quoi, t’es pas bien dedans.", time: "22 mars 18:47" },
  { who: "me", name: "Sophie 🩷", text: "Ah mais il est hyper confortable !", time: "22 mars 18:48", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Ma chérie, à un moment c’est pas possible quoi.\nT’es tellement belle ! Et ce t-shirt-là…\nIl te rend pas hommage… Enfin vraiment, on dirait que t’es…\nEnfin, tu le vois, quand tu te regardes dans une glace.", time: "22 mars 18:50" },
  { who: "me", name: "Sophie 🩷", text: "Moi je me trouve belle.", time: "22 mars 18:51", status: "read" },
  { who: "them", name: "Lucas 💬", text: "T’es pas assez exigeante 😅.\nT’as tellement moyen d’être trop belle !\nRegarde; avec  ta petite robe que j’aime bien, t’es vraiment trop belle !\nC’est ça qu’il faut que tu mettes !", time: "22 mars 18:53", checkpoint: "chk_devalorisation" },

  // Samedi 23 mars
  { who: "section", text: "Samedi 23 mars — 23:41" },
  { who: "them", name: "Lucas 💬", text: "Sophie, Sophie, Sophie t’es où ?", time: "23 mars 23:41" },
  { who: "them", name: "Lucas 💬", text: "Sophie, Sophie, REPONDS-MOI, PUTAIN !", time: "23 mars 23:42" },
  { who: "them", name: "Lucas 💬", text: "Sophie ! Sophie, réponds-moi !", time: "23 mars 23:43" },
  { who: "me", name: "Sophie 🩷", text: "Mais quoi ?", time: "23 mars 23:44", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Mais tu réponds pas, ça fait trois heures que je t’envoie des messages !", time: "23 mars 23:45" },
  { who: "me", name: "Sophie 🩷", text: "Mais oui, j’avais plus de batterie !", time: "23 mars 23:46", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Attends Sophie, t’es en soirée, t’as plus de batterie…\nMoi je deviens fou, tu comprends ? Je deviens fou !", time: "23 mars 23:47" },
  { who: "me", name: "Sophie 🩷", text: "Mais pourquoi t’es fou ?\nTu sais très bien où j’étais !", time: "23 mars 23:48", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Peut-être que t’as revu des gens, je sais pas avec qui t’es, je sais pas avec qui tu traînes… Moi je m’inquiète, faut plus que tu me fasses ça ! PLUS JAMAIS.", time: "23 mars 23:49" },
  { who: "me", name: "Sophie 🩷", text: "Attends, c’est juste que j’avais plus de batterie !", time: "23 mars 23:50", status: "read" },
  { who: "them", name: "Lucas 💬", text: "On a tous un chargeur Sophie !\nT’as vu dans quel état je me mets ? Franchement, c’est pas cool !", time: "23 mars 23:51" },
  { who: "me", name: "Sophie 🩷", text: "Excuse-moi…\nMais j’étais juste à une soirée, entre copines, je passais un bon moment…", time: "23 mars 23:52", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Bah oui, forcément, quand t’es avec tes copines, t’oublies ton mec. Pendant ce temps-là j’étais super mal.\nJ’ai failli faire une bêtise…\nMais c’est parce que je tiens beaucoup à toi que je deviens comme ça.\nEt voilà… faut qu’on fasse attention à ce que ça se reproduise plus, d’accord ma chérie ? ❤️", time: "23 mars 23:55", checkpoint: "chk_cycle_tension" },

  // Dimanche 12 juin
  { who: "section", text: "Dimanche 12 juin — 09:47" },
  { who: "them", name: "Lucas 💬", text: "Ma chérie, j’ai enfin trouvé !", time: "12 juin 09:47" },
  { who: "me", name: "Sophie 🩷", text: "T’as trouvé quoi ? 😮", time: "12 juin 09:48", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Le boulot de nos rêves !\nÀ l’autre bout de la France 😍", time: "12 juin 09:49" },
  { who: "me", name: "Sophie 🩷", text: "Tu déménages ?", time: "12 juin 09:50", status: "read" },
  { who: "them", name: "Lucas 💬", text: "“On” déménage ! Mais pas que !\nJe nous ai déjà trouvé un appart.\nC’est génial, non ? 😁", time: "12 juin 09:52" },
  { who: "me", name: "Sophie 🩷", text: "Mais attends, qu’est-ce que tu veux que j’aille faire à l’autre bout de la France ?\nJ’ai toute ma vie ici !", time: "12 juin 09:54", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Tu veux pas penser à nous de temps en temps 😔", time: "12 juin 09:55" },
  { who: "me", name: "Sophie 🩷", text: "Moi j’ai un taf ici, mes amis…", time: "12 juin 09:56", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Enfin franchement, tes amis, tu les vois quasiment plus, et ton taf il t’emmerde, tu me l’as dit 100 fois.", time: "12 juin 09:57" },
  { who: "me", name: "Sophie 🩷", text: "C’est pas le boulot de mes rêves mais ça va, il est sympa.", time: "12 juin 09:58", status: "read" },
  { who: "them", name: "Lucas 💬", text: "T’es pas assez exigeante. Je te l’ai toujours dit. Là c’est l’occasion de tout recommencer, ensemble ! Et t’auras même pas besoin de travailler !\nMon boulot va nous permettre de tout payer.\nEt j’ai déjà trouvé un appart parfait.", time: "12 juin 10:00" },
  { who: "me", name: "Sophie 🩷", text: "Donc tu veux que j’emménage dans ton appart, à l’autre bout de la France ?\nMais je connais personne là-bas…", time: "12 juin 10:02", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Et juste nous deux, ça suffit pas ? On sera très bien tous les deux.\nOn va créer un cocon, une famille. Un paradis. C’est ça la beauté de la vie, non ? 💞", time: "12 juin 10:04", checkpoint: "chk_isolement_geo" },
  { who: "me", name: "Sophie 🩷", text: "T’aurai pu m’en parler avant, quand même…", time: "12 juin 10:05", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Voilà.\nEncore une fois, j’essaie de te faire une surprise, je me décarcasse pour trouver un appart, même pour acheter un appart…\nEt toi, zéro reconnaissance.\nJe me tue à la tâche, et j’ai l’impression qu’on ne reconnaît jamais mes efforts à leur juste valeur.", time: "12 juin 10:07" },
  { who: "me", name: "Sophie 🩷", text: "C’est pas ça… tu trouves pas que c’est un peu rapide ?", time: "12 juin 10:08", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Je suis émotif, impulsif,\nJe veux te faire plaisir — et ça ne marche jamais 😞", time: "12 juin 10:09" },
  { who: "me", name: "Sophie 🩷", text: "Il commence quand ton boulot ?", time: "12 juin 10:10", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Dans deux semaines 😃", time: "12 juin 10:11" },
  { who: "me", name: "Sophie 🩷", text: "Deux semaines ?! C’est rien !\nIl faut que je lâche mon appart, que je prépare tout…", time: "12 juin 10:12", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Je vais t’aider ma chérie 😘. Et c’est ce que tu veux. Y’a trop d’histoires ici, avec Jeremy, avec Cléa, avec tes parents qui ne m’aiment pas. Franchement ça va nous faire tellement de bien ce nouveau départ.\nJuste toi et moi. ❤️", time: "12 juin 10:14" },
  { who: "me", name: "Sophie 🩷", text: "Écoute, je dois réfléchir, d’accord ?", time: "12 juin 10:15", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Non mais écoute-moi.\nJe me suis déjà projeté là-bas, avec toi.\nEt je te connais, tu vas encore hésiter et jamais oser te lancer. C’est pour ça que t’as du mal à être heureuse. T’écoutes pas assez ton instinct.\nOn a souvent parlé de fonder une famille, non ?\nLà, c’est l’occasion parfaite.\nMoi, je te fais confiance, alors fais-moi confiance à ton tour.\nViens, ma chérie. On y va ensemble, et on va vivre une vie merveilleuse. ✨", time: "12 juin 10:18" },
  { who: "me", name: "Sophie 🩷", text: "… Sans boulot ?", time: "12 juin 10:19", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Je m’occupe de l’argent. Toi, tu pourras t’occuper de la maison. Et on pourra fonder la famille de nos rêves. Ce sera génial. 💑", time: "12 juin 10:20", checkpoint: "chk_dependance_fin" },
  { who: "me", name: "Sophie 🩷", text: "D’accord…", time: "12 juin 10:21", status: "read" }
];
