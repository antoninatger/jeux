// Influenceurs — Fake News, influenceurs et esprit critique
// Source : diapositives de la formation "formation-fake-news-influenceurs"
// 20 questions

var QUESTIONS_INFLUENCEURS = [

  // ── Qui sont les influenceurs ────────────────────────────────
  {
    cat: "💅 Qui sont les influenceurs",
    q: "Un influenceur, c'est :",
    options: [
      "Une personne payée par une marque pour vendre un produit",
      "Une personne qui influence l'opinion ou la consommation de son audience sur les réseaux sociaux",
      "Une personne qui compte plus de 100 000 abonnés",
      "Une célébrité qui poste régulièrement du contenu"
    ],
    answer: 1,
    expl: "La définition ne dit rien du nombre d'abonnés, ni de l'argent, ni de la sincérité. Elle décrit une position : quelqu'un parle, beaucoup écoutent, et ce qui est dit a des effets."
  },
  {
    cat: "💅 Qui sont les influenceurs",
    q: "Est-ce que c'est bien, un influenceur ?",
    options: [
      "Oui : ils démocratisent l'information",
      "Non : ils vivent de la publicité déguisée",
      "Ça dépend : le ZEvent a récolté plus de 10 millions d'euros pour des associations, et un influenceur trading a pris 150 000 € d'amende",
      "La question n'a pas de sens, ce ne sont que des divertisseurs"
    ],
    answer: 2,
    expl: "Les deux exemples sont vrais et coexistent. Le ZEvent 2024 a dépassé 10 millions d'euros de dons ; la DGCCRF a sanctionné un influenceur trading pour pratique commerciale trompeuse. C'est un métier, pas une morale."
  },
  {
    cat: "💅 Qui sont les influenceurs",
    q: "Pourquoi aime-t-on les influenceurs ?",
    options: [
      "Parce qu'ils sont mieux informés que les médias traditionnels",
      "Parce qu'ils procurent des émotions, créent un sentiment de proximité et font rêver",
      "Parce qu'ils sont gratuits",
      "Parce qu'ils disent ce que les autres n'osent pas dire"
    ],
    answer: 1,
    expl: "Trois ressorts, et aucun n'a à voir avec la qualité de l'information : l'émotion, la proximité, le rêve. C'est ce qui rend la vigilance difficile."
  },

  // ── Pourquoi on les croit ────────────────────────────────────
  {
    cat: "🤝 Pourquoi on les croit",
    q: "Une relation parasociale, c'est :",
    options: [
      "Une amitié née sur les réseaux entre deux inconnus",
      "Un lien à sens unique : vous connaissez toutes les facettes de la vie d'une personne, qui elle ne vous connaît pas",
      "Une relation professionnelle entre un influenceur et une marque",
      "Un groupe d'abonnés qui se connaissent entre eux"
    ],
    answer: 1,
    expl: "Le cerveau traite ces signaux quotidiens comme ceux d'une amitié, parce qu'il n'a jamais eu à distinguer une présence réelle d'une présence diffusée. D'où la confiance accordée sur des sujets où la personne ne sait rien de plus que vous."
  },
  {
    cat: "🤝 Pourquoi on les croit",
    q: "L'expérience d'Asch (1951) montre que :",
    options: [
      "La mémoire est peu fiable sous stress",
      "Des participants donnent volontairement une mauvaise réponse à une question simple, uniquement parce que le groupe l'a donnée avant eux",
      "On obéit à une figure d'autorité même contre sa conscience",
      "Les enfants imitent les comportements violents des adultes"
    ],
    answer: 1,
    expl: "La question était simple et la bonne réponse évidente. C'est la pression du groupe, pas la difficulté, qui produit l'erreur. Nous sommes tous influençables, et le savoir est le premier pas."
  },
  {
    cat: "🤝 Pourquoi on les croit",
    q: "Le storytelling est efficace parce que :",
    options: [
      "Un récit personnel capte l'attention bien mieux qu'un chiffre ou une preuve",
      "Les histoires sont plus faciles à vérifier",
      "Il est encadré par la loi, donc plus fiable",
      "Il repose sur des données réelles mises en scène"
    ],
    answer: 0,
    expl: "« De rien à tout » se retient et se transmet, là où une donnée exacte s'oublie. La question utile n'est pas « est-ce que cette histoire est belle ? » mais « qu'est-ce qu'elle prouve ? »."
  },

  // ── Nos biais ────────────────────────────────────────────────
  {
    cat: "🧠 Nos biais",
    q: "Un champion de sport vante un produit qui n'a rien à voir avec sa discipline, et ça marche. Quel mécanisme ?",
    options: [
      "Le biais de confirmation",
      "Le biais de popularité, ou effet de halo",
      "Le biais d'engagement",
      "Le biais émotionnel"
    ],
    answer: 1,
    expl: "Une personne aimée nous influence sur tout le reste. Ce n'est pas sa compétence qui convainc, c'est la sympathie qu'elle inspire."
  },
  {
    cat: "🧠 Nos biais",
    q: "Le biais de confirmation, appliqué aux influenceurs :",
    options: [
      "Si vous aimez un influenceur, il est difficile de ne pas le croire quand il vous vend quelque chose",
      "Vous ne suivez que des influenceurs de votre âge",
      "Vous vérifiez systématiquement ce que dit un influenceur que vous n'aimez pas",
      "Vous croyez davantage les influenceurs les plus suivis"
    ],
    answer: 0,
    expl: "Le cerveau privilégie ce qui confirme ce qu'il pense déjà, y compris son affection pour quelqu'un. Douter d'un influenceur qu'on apprécie, c'est douter de son propre jugement."
  },
  {
    cat: "🧠 Nos biais",
    q: "Le biais de l'engagement explique que :",
    options: [
      "Plus on est abonné longtemps, plus l'algorithme nous montre du contenu",
      "Une fois qu'on s'est engagé dans une croyance, il est très compliqué de revenir en arrière",
      "Les contenus qui font réagir sont mieux diffusés",
      "On croit davantage ce que l'on a payé"
    ],
    answer: 1,
    expl: "Avoir défendu quelqu'un publiquement, acheté ce qu'il recommandait, convaincu un ami : chaque geste rend le retour en arrière plus coûteux. C'est pourquoi une communauté défend parfois son influenceur plus fort après une révélation gênante."
  },
  {
    cat: "🧠 Nos biais",
    q: "Une femme se fait escroquer des centaines de milliers d'euros par un faux Brad Pitt généré par IA. Comment l'expliquer ?",
    options: [
      "Par un manque de culture numérique",
      "Par de la naïveté",
      "Ce n'est pas de la stupidité : tout le monde peut tomber dans ces pièges",
      "Par l'isolement social de la victime"
    ],
    answer: 2,
    expl: "Et c'est le point le plus contre-intuitif : celui qui est persuadé qu'il ne peut pas se faire avoir est une cible privilégiée, précisément parce qu'il ne fait pas attention."
  },
  {
    cat: "🧠 Nos biais",
    q: "Une raquette et une balle coûtent 12 € au total. La raquette coûte 10 € de plus que la balle. Combien coûte la balle ?",
    options: ["2 €", "1 €", "1,50 €", "11 €"],
    answer: 1,
    expl: "La réponse instinctive est 2 €, et elle est fausse : la raquette coûterait 12 € et le total 14 €. Avec 1 €, la raquette vaut 11 €, soit bien 10 € de plus, et le compte tombe juste. Le cerveau répond vite sans vérifier : exactement ce qu'il fait avec une Fake News."
  },
  {
    cat: "🧠 Nos biais",
    q: "Le système intuitif, par rapport au système analytique :",
    options: [
      "Est plus lent mais plus fiable",
      "Fonctionne vite, consomme peu d'énergie, et peut faire des erreurs",
      "Ne s'active que sous stress",
      "Est réservé aux décisions importantes"
    ],
    answer: 1,
    expl: "L'analytique est lent, coûteux en énergie, et rationnel. Sur les réseaux, on fonctionne presque uniquement en intuitif : c'est là que les erreurs se logent."
  },

  // ── Quand ça dérape ──────────────────────────────────────────
  {
    cat: "💰 Quand ça dérape",
    q: "Un système pyramidal fonctionne parce que :",
    options: [
      "Le produit vendu a une vraie valeur mais est surévalué",
      "Les premiers entrants sont payés par l'argent des suivants, pas par une vraie activité",
      "Les bénéfices viennent de placements financiers risqués",
      "Les participants se cooptent entre professionnels"
    ],
    answer: 1,
    expl: "Il n'y a pas d'activité réelle derrière. Le système tient tant que de nouveaux entrants arrivent, et s'effondre dès que le flux s'arrête. Les derniers perdent tout."
  },
  {
    cat: "💰 Quand ça dérape",
    q: "« Traite plus de 15 problèmes de peau », « Avant / Après 5 minutes ». Quel réflexe ?",
    options: [
      "Vérifier le nombre d'abonnés du compte",
      "Chercher les avis en commentaire",
      "Se rappeler que si quelque chose paraît trop incroyable pour être vrai, c'est généralement faux",
      "Demander l'avis d'un autre influenceur"
    ],
    answer: 2,
    expl: "L'adage vaut pour la publicité comme pour l'information. Une promesse simple à un problème complexe est presque toujours une arnaque."
  },
  {
    cat: "💰 Quand ça dérape",
    q: "Pourquoi la frontière entre conseil sincère et publicité est-elle floue ?",
    options: [
      "Parce que la loi n'impose aucune mention",
      "Parce que codes promo, liens d'affiliation et mentions « annonce » se mêlent au contenu ordinaire",
      "Parce que les marques interdisent d'en parler",
      "Parce que les influenceurs ignorent souvent qu'ils sont rémunérés"
    ],
    answer: 1,
    expl: "La mention légale existe souvent, mais elle est brève et arrive après que la confiance est établie. Le cerveau a déjà classé le message du côté du conseil d'ami."
  },
  {
    cat: "💰 Quand ça dérape",
    q: "Dans un groupe très soudé autour d'un influenceur :",
    options: [
      "La critique devient difficile à exprimer, et le groupe peut se radicaliser sans s'en rendre compte",
      "Les membres se surveillent mutuellement, ce qui limite les dérives",
      "L'information circule mieux qu'ailleurs",
      "Les désaccords sont plus faciles, car les membres se connaissent"
    ],
    answer: 0,
    expl: "C'est la pensée de groupe. Plus le groupe est soudé, plus le coût social d'un désaccord est élevé, et moins l'esprit critique s'exprime."
  },
  {
    cat: "💰 Quand ça dérape",
    q: "Pourquoi les clashs et les désaccords publics deviennent-ils viraux ?",
    options: [
      "Parce qu'ils sont plus courts à regarder",
      "Parce qu'ils génèrent énormément d'engagement, donc de visibilité algorithmique",
      "Parce que les plateformes les mettent en avant contre rémunération",
      "Parce que le public les réclame explicitement"
    ],
    answer: 1,
    expl: "L'algorithme ne juge pas le contenu, il mesure la réaction. Les sujets qui divisent en produisent le plus, d'où la polarisation."
  },

  // ── Faire attention ──────────────────────────────────────────
  {
    cat: "🔍 Faire attention",
    q: "Un intérêt « réputationnel », c'est :",
    options: [
      "Un partenariat rémunéré non déclaré",
      "Tenir son personnage, ne pas se déjuger, rester celui que sa communauté attend",
      "Défendre une cause à laquelle on croit",
      "Chercher à gagner des abonnés"
    ],
    answer: 1,
    expl: "Souvent plus fort que l'intérêt financier, et beaucoup plus discret : il ne laisse aucune trace comptable, et rien à déclarer."
  },
  {
    cat: "🔍 Faire attention",
    q: "Une photo heureuse publiée par un créateur montre :",
    options: [
      "Un instant choisi, jamais tout ce qui l'entoure",
      "Une mise en scène toujours entièrement fausse",
      "Sa vie réelle, mais embellie par les filtres",
      "Ce que la marque partenaire a validé"
    ],
    answer: 0,
    expl: "Rien n'est truqué, et pourtant l'image ment par ce qu'elle ne montre pas. C'est exactement l'effet de cadrage, appliqué à une vie entière."
  },
  {
    cat: "🔍 Faire attention",
    q: "Deux patrouilles aériennes, deux drapeaux différents, et pourtant la même image possible. Que montre cet exemple ?",
    options: [
      "Que les images sont souvent retouchées",
      "Que l'angle et le cadrage changent toute la lecture d'une image, sans rien truquer",
      "Que les couleurs sont peu fiables à l'écran",
      "Que les drapeaux se ressemblent tous"
    ],
    answer: 1,
    expl: "Aucune retouche, aucun mensonge : seulement un choix de point de vue. La question devant une image n'est pas seulement « est-elle authentique ? » mais « que ne me montre-t-on pas ? »."
  }
];
