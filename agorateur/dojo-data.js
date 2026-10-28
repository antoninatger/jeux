/* =========================================================================
   Dojo de l'Agora — CONTENU FRANÇAIS
   Miroir anglais : dojo-data-en.js. Les deux fichiers gardent les mêmes
   `id` et la même structure : seuls les textes sont traduits. La logique,
   elle, n'existe qu'une fois, dans dojo.js.

   Les `id` de sophismes sont ceux de FALLACIES dans app.js.
   ========================================================================= */
const DOJO = {

  sensei: { nom: "Sensei Kakasophe", emoji: "🥷" },
  rival:  { nom: "Sophisuke", emoji: "😼" },

  // ─── Le Rouleau Interdit : chaque sophisme est une technique ───
  // tech = nom de la technique, signes = les mots qui la trahissent,
  // parade = comment y répondre honnêtement.
  sophismes: {
    paille:     { l: "Homme de paille", d: "déformer ce que l'autre a dit (l'exagérer, le caricaturer, lui faire dire ce qu'il n'a pas dit), puis attaquer cette version déformée. Comme frapper un mannequin de paille au lieu d'un vrai adversaire : c'est facile, mais on n'a pas répondu à ce qu'il pensait vraiment.", tech: "Technique de substitution : le Mannequin",
                  signes: "« autrement dit », « donc tu veux… », « en fait, ce que tu dis… »",
                  parade: "Reformuler fidèlement : « Ce n'est pas ce que j'ai dit. Je dis seulement que… »" },
    adhom:      { l: "Attaque personnelle", d: "attaquer la personne (son physique, ses notes, son passé) au lieu de répondre à son argument.", tech: "Frappe à l'Homme",
                  signes: "« venant de toi », « avec tes notes », « t'as quel âge ? »",
                  parade: "Ramener au fond : « Laisse ma personne de côté. Qu'est-ce qui est faux dans mon argument ? »" },
    popu:       { l: "Appel à la popularité", d: "dire que c'est vrai parce que beaucoup de gens le pensent ou le font.", tech: "Multiclonage de la Foule",
                  signes: "« tout le monde », « des millions de… », « 3 millions de vues »",
                  parade: "« Beaucoup de gens le pensent, d'accord. Mais quelle est la preuve ? »" },
    dilemme:    { l: "Faux dilemme", d: "présenter seulement deux choix possibles, alors qu'il en existe d'autres.", tech: "Prison des Deux Portes",
                  signes: "« soit… soit… », « c'est ça ou… », « il faut choisir »",
                  parade: "Chercher la troisième porte : « Il existe d'autres options, par exemple… »" },
    pente:      { l: "Pente glissante", d: "annoncer une suite de catastrophes de plus en plus graves, sans prouver qu'elles vont arriver.", tech: "Avalanche des Mille Conséquences",
                  signes: "« bientôt », « et après, ce sera… », « dans dix ans »",
                  parade: "Demander chaque marche : « Qu'est-ce qui prouve que l'une entraîne l'autre ? »" },
    genehat:    { l: "Généralisation hâtive", d: "tirer une règle générale d'un seul exemple, ou de très peu de cas.", tech: "Un pour Tous",
                  signes: "« mon cousin », « une fois », « donc tous les… »",
                  parade: "« C'est un cas. Qu'est-ce que disent les autres cas ? »" },
    nature:     { l: "Appel à la nature", d: "dire que c'est bon parce que c'est naturel (ou mauvais parce que c'est chimique).", tech: "Souffle de la Forêt",
                  signes: "« naturel », « 100 % plantes », « chimique »",
                  parade: "Le contre-exemple : « La ciguë aussi est naturelle. »" },
    halo:       { l: "Autorité hors domaine", d: "croire quelqu'un sur un sujet parce qu'il est célèbre ou expert dans un autre domaine.", tech: "Aura empruntée",
                  signes: "« même X le dit », « ce champion », « cette star »",
                  parade: "« Il est expert en quoi, exactement ? Qu'en disent les spécialistes du sujet ? »" },
    preuve:     { l: "Charge de la preuve inversée", d: "exiger que l'autre prouve que c'est faux, au lieu de prouver soi-même que c'est vrai.", tech: "Renvoi de la Bombe",
                  signes: "« prouve-moi le contraire », « tu ne peux pas prouver que non »",
                  parade: "« C'est à celui qui affirme d'apporter la preuve. »" },
    posthoc:    { l: "Cause imaginée", d: "croire qu'une chose en a causé une autre juste parce qu'elle est arrivée avant.", tech: "Genjutsu de la Coïncidence",
                  signes: "« depuis que », « juste après », « coïncidence ? »",
                  parade: "« Ça s'est suivi, d'accord. Mais qu'est-ce qui montre que l'un a causé l'autre ? »" },
    circulaire: { l: "Raisonnement circulaire", d: "utiliser la conclusion comme preuve d'elle-même : « c'est vrai parce que c'est vrai ».", tech: "Serpent Ouroboros",
                  signes: "« parce que c'est vrai », « il le dit lui-même »",
                  parade: "« Tu utilises ta conclusion comme preuve. Tu as une source extérieure ? »" },
    hareng:     { l: "Hareng rouge", d: "changer de sujet pour éviter de répondre à la vraie question.", tech: "Bombe fumigène",
                  signes: "« parlons plutôt de… », « le vrai problème, c'est… »",
                  parade: "Revenir à la question : « On en parlera après. Ma question, c'était… »" },
    cherry:     { l: "Cueillette des faits", d: "ne montrer que les exemples ou les chiffres qui arrangent, et cacher les autres.", tech: "Main du Cueilleur",
                  signes: "« regarde ce chiffre », « ces trois avis », « je n'ai gardé que… »",
                  parade: "« Et toutes les autres données, elles disent quoi ? »" },
    whatabout:  { l: "Et toi alors ?", d: "répondre à une critique par « et toi alors ? » au lieu de répondre sur le fond.", tech: "Miroir de Glace",
                  signes: "« et toi alors ? », « et eux ? », « c'est l'hôpital qui… »",
                  parade: "« On pourra parler de moi après. Là, on parle de toi. »" }
  },

  // ─── L'arrivée au dojo ───
  accueil: {
    retard: "Le sensei arrive avec deux heures de retard, le nez plongé dans un petit livre orange.",
    excuse: "« Désolé. Je me suis perdu sur le chemin de la logique. »",
    defi: "« Alors comme ça, tu veux aller sur l'Agora ? Les sophistes vont te dévorer tout cru. Convaincs-moi de t'entraîner. »",
    choix: [
      { t: "« Tout le monde dit que vous êtes le meilleur sensei ! »", ok: false,
        r: "« Multiclonage de la Foule. Mille personnes qui répètent la même chose, ça ne fait pas un argument. Recommence. »" },
      { t: "« Si vous refusez, ma vie entière est fichue ! »", ok: false,
        r: "« L'Avalanche des Mille Conséquences, carrément ? Ta vie ira très bien. Recommence. »" },
      { t: "« Sur l'Agora, je me fais avoir parce que je ne vois pas les pièges. Je veux apprendre à les voir. »", ok: true,
        r: "« … Une raison claire et un objectif. Enfin un vrai argument. Bienvenue au dojo. »" }
    ],
    // L'entrée en scène de Sophisuke, l'ancien disciple du sensei.
    entree: [
      { qui: "narrateur", texte: "Un coup de vent. Des feuilles tourbillonnent. Sur le toit du dojo, une silhouette, bras croisés." },
      { qui: "rival", texte: "« Hmph. Le vieux prend encore des élèves ? »" },
      { qui: "sensei", texte: "(sans lever les yeux de son livre) « Sophisuke. Mon ancien disciple. Il est parti chez les sophistes, ceux qui gagnent tous les débats… sans jamais avoir raison. »" },
      { qui: "rival", texte: "(il saute du toit) « Écoute bien, débutant. Je t'attendrai aux portes de l'Agora. Si tu y arrives… je t'écraserai ! »" },
      { qui: "narrateur", texte: "SHUUUN ! Sophisuke a disparu." }
    ]
  },

  // ─── Prologue : la Divination de l'eau ───
  // f = famille de la phrase (coeur, troupeau, detective) ou "sain".
  divination: [
    { t: "« Si tu ne partages pas cette vidéo du chiot abandonné, c'est que tu n'as pas de cœur. »", f: "coeur",
      e: "Culpabilité et émotion, aucun argument : c'est du chantage affectif." },
    { t: "« Ce jeu a 50 millions de joueurs : c'est forcément le meilleur du moment. »", f: "troupeau",
      e: "Appel à la popularité : être joué par beaucoup de monde ne dit rien de la qualité." },
    { t: "« Depuis que je porte mon bracelet magnétique, je dors mieux. Ça marche, c'est clair. »", f: "detective",
      e: "Cause imaginée : on peut mieux dormir pour mille autres raisons." },
    { t: "« Pense aux enfants qui souffrent : si tu votes contre cette loi, tu les abandonnes. »", f: "coeur",
      e: "On te fait porter la souffrance des enfants au lieu d'expliquer ce que fait la loi." },
    { t: "« Mon youtubeur gaming préféré dit que ce complément alimentaire rend plus intelligent. »", f: "troupeau",
      e: "Autorité hors domaine : il est expert en jeux vidéo, pas en nutrition." },
    { t: "« Mon cousin a eu son bac sans réviser : réviser, ça ne sert à rien. »", f: "detective",
      e: "Généralisation hâtive : un seul cas ne fait pas une règle." },
    { t: "« Météo-France annonce 90 % de risque de pluie demain : prendre un parapluie, c'est une bonne idée. »", f: "sain",
      e: "Une source compétente, une conclusion raisonnable." },
    { t: "« Ce médicament a été testé sur 30 000 personnes contre un placebo, et les résultats ont été vérifiés par des équipes indépendantes. »", f: "sain",
      e: "Un grand essai, un groupe de comparaison, une vérification indépendante : c'est solide." }
  ],
  types: {
    coeur:      { nom: "Type Cœur", eau: "L'eau rougit et se met à battre comme un cœur.",
                  desc: "Les histoires émouvantes et la culpabilité te font baisser la garde. Garde ton cœur, mais demande toujours : où est l'argument ?" },
    troupeau:   { nom: "Type Troupeau", eau: "L'eau se couvre de mille petites bulles qui avancent toutes dans le même sens.",
                  desc: "Le nombre et la célébrité t'impressionnent. Retiens : la popularité mesure la visibilité, pas la vérité." },
    detective:  { nom: "Type Enquêteur pressé", eau: "L'eau se met à tourbillonner à toute vitesse.",
                  desc: "Tu relies vite les faits entre eux. Un cas ou une coïncidence, ce n'est pas encore une preuve." },
    forteresse: { nom: "Type Forteresse", eau: "L'eau gèle d'un coup. La feuille reste prise dans la glace.",
                  desc: "Tu rejettes même les bons arguments. Douter de tout est aussi confortable que tout croire : ça évite de réfléchir." },
    calme:      { nom: "Type Eau calme", eau: "L'eau ne bouge pas. La feuille flotte, immobile.",
                  desc: "Rien ne t'a fait chavirer : bon début. Le dojo va voir si ça tient sous pression." }
  },

  // ─── Épreuve 1 : les Feuilles qui tombent ───
  // piege = id du sophisme, ou null pour un argument sain.
  feuilles: [
    { id: "f1", t: "« Il pleut depuis que le nouveau maire est élu : il porte la poisse. »", piege: "posthoc",
      e: "Deux événements qui se suivent ne sont pas liés pour autant." },
    { id: "f2", t: "« Cette vidéo a 3 millions de vues, donc ce qu'elle raconte est vrai. »", piege: "popu",
      e: "Le nombre de vues mesure la visibilité, pas la vérité." },
    { id: "f3", t: "« Ne l'écoute pas parler du climat : elle a raté son bac. »", piege: "adhom",
      e: "On attaque la personne au lieu de ses arguments." },
    { id: "f4", t: "« Soit tu es avec nous, soit tu es contre nous. »", piege: "dilemme",
      e: "On peut être d'accord sur un point et pas sur un autre : il y a bien plus de deux camps." },
    { id: "f5", t: "« Si on autorise les téléphones à la récré, bientôt plus personne ne se parlera et l'école ne servira plus à rien. »", piege: "pente",
      e: "Une cascade de catastrophes, sans preuve pour aucune des étapes." },
    { id: "f6", t: "« Une IA m'a inventé une source une fois : les IA ne disent jamais rien de juste. »", piege: "genehat",
      e: "Une erreur ne fait pas une règle. Il faut vérifier, pas tout jeter." },
    { id: "f7", t: "« C'est 100 % naturel, donc ça ne peut pas faire de mal. »", piege: "nature",
      e: "Les champignons mortels sont 100 % naturels eux aussi." },
    { id: "f8", t: "« Ce rappeur a 10 millions d'abonnés : s'il dit que la Terre est plate, il doit avoir ses raisons. »", piege: "halo",
      e: "Être doué pour le rap ne rend pas expert en astronomie." },
    { id: "f9", t: "« Personne n'a jamais prouvé que les fantômes n'existent pas. Donc ils existent. »", piege: "preuve",
      e: "C'est à celui qui affirme qu'ils existent de le prouver." },
    { id: "f10", t: "« Ce compte TikTok dit toujours la vérité : c'est écrit dans sa bio. »", piege: "circulaire",
      e: "Le compte sert de preuve à lui-même : le serpent se mord la queue." },
    { id: "f11", t: "« Tu me demandes pourquoi j'ai copié ? Le vrai problème, c'est que les contrôles sont trop longs. »", piege: "hareng",
      e: "Il change de sujet pour ne pas répondre à la question." },
    { id: "f12", t: "« Tu me reproches de jeter mes papiers par terre ? Et toi, tu laisses toujours la lumière allumée ! »", piege: "whatabout",
      e: "Les défauts de l'autre ne répondent pas au reproche." },
    { id: "f13", t: "« Sur 80 avis, j'ai trouvé trois avis 5 étoiles : ce restaurant est génial. »", piege: "cherry",
      e: "Trois avis triés sur 80 : que disent les 77 autres ?" },
    { id: "f14", t: "« Tu veux moins de devoirs ? Donc tu veux que les élèves n'apprennent plus rien. »", piege: "paille",
      e: "« Moins de devoirs » est déformé en « ne plus rien apprendre »." },
    { id: "f15", t: "« J'ai mis ma chaussette porte-bonheur et on a gagné le match : elle marche ! »", piege: "posthoc",
      e: "L'équipe a peut-être simplement mieux joué." },
    { id: "f16", t: "« Toute la classe dit que ce prof est nul, donc c'est vrai. »", piege: "popu",
      e: "Une rumeur partagée par beaucoup reste une rumeur." },
    { id: "f17", t: "« Un acteur célèbre conseille de soigner le cancer avec des jus de fruits : il doit savoir de quoi il parle. »", piege: "halo",
      e: "Le talent d'acteur ne donne aucune compétence en médecine." },
    { id: "f18", t: "« Si tu n'aimes pas le foot, c'est que tu détestes le sport. »", piege: "dilemme",
      e: "On peut aimer la natation, le basket ou la danse sans aimer le foot." },
    { id: "f19", t: "« Prouve-moi que cette vidéo est un deepfake. Tu ne peux pas ? Alors elle est vraie. »", piege: "preuve",
      e: "C'est à celui qui partage la vidéo de montrer qu'elle est authentique." },
    { id: "f20", t: "« Ton argument ne vaut rien, t'as 13 ans. »", piege: "adhom",
      e: "L'âge ne rend pas un argument vrai ou faux." },
    { id: "s1", t: "« Les ventes de glaces et les noyades augmentent toutes les deux en été : c'est la chaleur qui explique les deux. »", piege: null,
      e: "Bon raisonnement ! Les glaces ne causent pas les noyades : une cause commune, la chaleur, explique les deux." },
    { id: "s2", t: "« Ce vaccin a été testé sur 40 000 volontaires, avec un groupe placebo. »", piege: null,
      e: "Un grand essai avec un groupe de comparaison : c'est de la preuve solide." },
    { id: "s3", t: "« Mon médecin, qui a fait dix ans d'études de médecine, me conseille ce vaccin. »", piege: null,
      e: "Une autorité DANS son domaine : ce n'est pas l'effet de halo." },
    { id: "s4", t: "« Une recherche d'image inversée montre que cette photo date de 2015 : elle ne montre pas l'événement d'hier. »", piege: null,
      e: "Une vérification concrète, avec une preuve : c'est exactement ce qu'il faut faire." },
    { id: "s5", t: "« Fumer augmente fortement le risque de cancer du poumon : des milliers d'études le montrent depuis 70 ans. »", piege: null,
      e: "Un consensus scientifique très solide, pas une poignée d'exemples." },
    { id: "s6", t: "« Si tu ne révises pas du tout, tu risques d'avoir une moins bonne note. »", piege: null,
      e: "Une seule conséquence, directe et probable : ce n'est pas une pente glissante." },
    { id: "s7", t: "« Certains champignons sauvages sont mortels : mieux vaut les faire vérifier par un pharmacien. »", piege: null,
      e: "Prudence raisonnable, fondée sur un fait connu." },
    { id: "s8", t: "« Ce site a déjà publié plein de fausses infos : je vais vérifier ailleurs avant d'y croire. »", piege: null,
      e: "Juger la fiabilité d'une source et aller vérifier, ce n'est pas une attaque personnelle." },
    { id: "s9", t: "« Le collège propose trois options : latin, allemand ou rien. Il faut en choisir une. »", piege: null,
      e: "Ici, les options sont vraiment limitées : ce n'est pas un faux dilemme." },
    { id: "s10", t: "« Un seul témoignage ne suffit pas : je vais chercher d'autres sources. »", piege: null,
      e: "C'est l'inverse de la généralisation hâtive : bien joué." }
  ],

  // ─── Épreuve 2 : l'Œil du sensei ───
  // Les morceaux sont séparés par « | ». Ceux entre [[ ]] trahissent la
  // technique : cliquer sur l'un d'eux suffit.
  oeil: [
    { id: "o1", a: "paille", t: "« Tu veux réduire | la viande | à la cantine ? | [[Autrement dit,]] | [[tu veux obliger tout le monde]] | [[à devenir vegan]] ! »",
      e: "« Réduire la viande » devient « obliger tout le monde à être vegan » : on attaque une caricature." },
    { id: "o2", a: "popu", t: "« [[Tout le monde sait]] | que cette appli | rend plus efficace. | Franchement, | [[des millions d'utilisateurs]] | [[ne peuvent pas se tromper]]. »",
      e: "Le nombre d'utilisateurs remplace la preuve." },
    { id: "o3", a: "posthoc", t: "« [[Depuis que]] | j'ai installé | cette appli de méditation, | j'ai de meilleures notes. | [[C'est elle]] | [[qui m'a fait progresser]]. »",
      e: "« Depuis que » + « c'est elle » : on transforme une succession dans le temps en cause." },
    { id: "o4", a: "dilemme", t: "« [[Soit]] | tu supprimes | tous tes réseaux sociaux, | [[soit]] | tu acceptes | d'être accro | pour toujours. »",
      e: "« Soit… soit… » : et utiliser les réseaux avec modération, alors ?" },
    { id: "o5", a: "preuve", t: "« Les extraterrestres | ont construit | les pyramides. | [[Prouve-moi le contraire !]] | [[Tu vois, tu ne peux pas.]] »",
      e: "C'est à lui de prouver son affirmation, pas à toi de la réfuter." },
    { id: "o6", a: "adhom", t: "« Ton exposé | sur le climat ? | [[Venant de quelqu'un]] | [[qui a eu 8 en SVT]], | je ne vois pas | pourquoi on l'écouterait. »",
      e: "La note de l'élève ne dit rien de la qualité de l'exposé." },
    { id: "o7", a: "pente", t: "« Si on laisse | les élèves | choisir leur place, | [[bientôt]] | [[ils choisiront leurs notes]], | [[et après]] | ce sera | l'anarchie totale. »",
      e: "« Bientôt… et après… » : chaque marche de l'escalier est inventée." },
    { id: "o8", a: "halo", t: "« [[Même ce champion de foot]] | [[le dit]] : | ce shampoing | rend les cheveux | plus forts. »",
      e: "Un champion de foot n'est pas un spécialiste des cheveux." },
    { id: "o9", a: "hareng", t: "« Pourquoi | notre usine | pollue la rivière ? | [[Parlons plutôt]] | [[des 200 emplois]] | [[qu'elle a créés]] ! »",
      e: "La question porte sur la pollution, la réponse sur les emplois." },
    { id: "o10", a: "whatabout", t: "« Tu dis | que je passe trop de temps | sur mon téléphone ? | [[Et toi alors,]] | [[avec ta série]] | [[tous les soirs ?]] »",
      e: "Il retourne le reproche au lieu d'y répondre." },
    { id: "o11", a: "cherry", t: "« Sur ce graphique, | [[je n'ai gardé]] | [[que les années froides]] : | vous voyez bien | que la planète | ne se réchauffe pas. »",
      e: "En ne gardant que les données qui arrangent, on fait dire n'importe quoi à un graphique." },
    { id: "o12", a: "circulaire", t: "« Cette IA | ne se trompe jamais. | Comment je le sais ? | [[Je lui ai demandé,]] | [[et elle m'a dit]] | [[qu'elle ne se trompait jamais]]. »",
      e: "L'IA sert de preuve à sa propre fiabilité : c'est un cercle." },
    { id: "o13", a: "nature", t: "« Ce sirop | est fait | [[à 100 % de plantes]] : | [[il ne peut donc avoir]] | [[aucun effet secondaire]]. »",
      e: "Beaucoup de plantes ont des effets secondaires, parfois graves." },
    { id: "o14", a: "genehat", t: "« [[Mon voisin]] | s'est fait arnaquer | sur un site de vente, | donc | [[tous les vendeurs]] | [[sont des escrocs]]. »",
      e: "Un voisin, une arnaque : ça ne dit rien de tous les vendeurs." }
  ],

  // ─── Épreuve 3 : le Test des clochettes ───
  // Discours de Sophisuke : 5 phrases, dont 2 pièges (les clochettes).
  // `examen: true` : réservé à l'examen de la Porte.
  clochettes: [
    { id: "c1", sujet: "Faut-il un uniforme à l'école ?", phrases: [
      { t: "« L'uniforme existe dans plusieurs pays, comme le Royaume-Uni ou le Japon. »", piege: null },
      { t: "« Des collèges qui l'ont adopté disent avoir constaté moins de moqueries sur les vêtements. »", piege: null },
      { t: "« De toute façon, ceux qui sont contre veulent juste frimer avec des marques hors de prix. »", piege: "paille",
        e: "Les opposants ont plein de raisons (prix, liberté…) : on les réduit à une caricature." },
      { t: "« Il coûterait plus de 100 € par famille, ce qui pose une vraie question pour les familles modestes. »", piege: null },
      { t: "« Soit on impose l'uniforme, soit l'école devient un défilé de mode. »", piege: "dilemme",
        e: "Entre l'uniforme et le défilé de mode, il y a une infinité d'autres règles possibles." }
    ]},
    { id: "c2", sujet: "Faut-il interdire les téléphones au collège ?", phrases: [
      { t: "« Plusieurs études ont observé de meilleurs résultats dans des écoles qui limitent les téléphones. »", piege: null },
      { t: "« Les notifications coupent la concentration : on met plusieurs minutes à se reconcentrer. »", piege: null },
      { t: "« Ceux qui veulent garder leur téléphone sont juste des accros incapables de réfléchir. »", piege: "adhom",
        e: "On insulte ceux qui ne sont pas d'accord au lieu de discuter leurs raisons." },
      { t: "« On peut prévoir des exceptions, par exemple pour les élèves qui en ont besoin pour leur santé. »", piege: null },
      { t: "« Si on autorise les téléphones, dans deux ans plus personne ne saura lire un livre. »", piege: "pente",
        e: "Du téléphone à la fin de la lecture en deux ans : aucune étape n'est démontrée." }
    ]},
    { id: "c3", sujet: "Les jeux vidéo rendent-ils violent ?", phrases: [
      { t: "« Le mois dernier, un garçon qui jouait à des jeux de guerre a frappé quelqu'un : la preuve que ces jeux rendent violent. »", piege: "genehat",
        e: "Un seul fait divers ne prouve rien sur des millions de joueurs." },
      { t: "« Beaucoup d'études ne trouvent pas de lien fort entre jeux vidéo et violence réelle. »", piege: null },
      { t: "« Le système PEGI indique l'âge conseillé pour chaque jeu. »", piege: null },
      { t: "« Un chanteur très connu a déclaré à la télé que ces jeux détruisent le cerveau. »", piege: "halo",
        e: "Être célèbre pour ses chansons ne rend pas expert en neurosciences." },
      { t: "« Jouer tard le soir peut réduire le temps de sommeil. »", piege: null }
    ]},
    { id: "c4", sujet: "Faut-il manger bio ?", phrases: [
      { t: "« Le label bio limite fortement les pesticides de synthèse. »", piege: null },
      { t: "« C'est naturel, donc c'est forcément meilleur pour la santé. »", piege: "nature",
        e: "« Naturel » ne veut pas dire « bon pour la santé »." },
      { t: "« Le bio coûte souvent plus cher, et toutes les familles ne peuvent pas suivre. »", piege: null },
      { t: "« Tu critiques le bio ? Et toi, tu manges des chips tous les jours ! »", piege: "whatabout",
        e: "Les chips de l'autre ne répondent pas à sa critique." },
      { t: "« Les chercheurs étudient encore ses effets exacts sur la santé. »", piege: null }
    ]},
    { id: "c5", examen: true, sujet: "Faut-il confier la correction des copies à une IA ?", phrases: [
      { t: "« Une IA peut corriger des centaines de copies en quelques minutes. »", piege: null },
      { t: "« Des millions d'élèves utilisent déjà l'IA, donc elle est forcément fiable. »", piege: "popu",
        e: "Qu'un outil soit très utilisé ne prouve pas qu'il soit fiable." },
      { t: "« Elle peut se tromper sur des réponses originales, donc un prof devrait relire. »", piege: null },
      { t: "« Soit on utilise l'IA, soit on reste bloqués au Moyen Âge. »", piege: "dilemme",
        e: "Entre tout confier à l'IA et le Moyen Âge, il y a beaucoup d'options." },
      { t: "« Il faudrait d'abord tester ce système sur quelques classes. »", piege: null }
    ]}
  ],

  // ─── Épreuve 4 : le Contre ───
  // k : "bonne" (riposte honnête et efficace), "cede" (on abandonne),
  // "sophisme" (la riposte est elle-même un sophisme, s = lequel).
  ripostes: [
    { id: "r1", a: "preuve", t: "« Prouve-moi que ce n'est PAS un complot ! »", choix: [
      { k: "bonne", t: "« C'est à celui qui affirme d'apporter la preuve. Qu'est-ce qui te ferait changer d'avis ? »" },
      { k: "cede", t: "« C'est vrai, je ne peux pas le prouver… »" },
      { k: "sophisme", s: "adhom", t: "« T'es vraiment bête de croire ça. »" }],
      e: "On renvoie la charge de la preuve à celui qui affirme, et on ouvre la discussion au lieu de la fermer." },
    { id: "r2", a: "popu", t: "« Tout le monde dit que ce youtubeur est un escroc ! »", choix: [
      { k: "bonne", t: "« Peut-être. Mais qu'a-t-il fait, concrètement ? Tu as une source ? »" },
      { k: "cede", t: "« Ah, si tout le monde le dit… »" },
      { k: "sophisme", s: "adhom", t: "« Tout le monde dit aussi que tu racontes n'importe quoi. »" }],
      e: "On ne dit ni oui ni non : on demande les faits." },
    { id: "r3", a: "paille", t: "« Tu veux limiter les écrans ? Donc tu veux qu'on vive comme au Moyen Âge ! »", choix: [
      { k: "bonne", t: "« Ce n'est pas ce que j'ai dit. Je propose juste une heure d'écran en moins le soir. »" },
      { k: "cede", t: "« Bon… peut-être que j'exagère. »" },
      { k: "sophisme", s: "paille", t: "« Et toi, tu veux qu'on devienne tous des zombies ! »" }],
      e: "La parade de l'homme de paille : reformuler fidèlement ce qu'on a vraiment dit." },
    { id: "r4", a: "adhom", t: "« Tu ne peux pas parler d'écologie, tu as pris l'avion cet été ! »", choix: [
      { k: "bonne", t: "« Je ne suis pas parfait. Mais ça ne change rien aux chiffres que je cite. »" },
      { k: "cede", t: "« C'est vrai, je ferais mieux de me taire. »" },
      { k: "sophisme", s: "whatabout", t: "« Et toi, tu manges de la viande tous les jours ! »" }],
      e: "On reconnaît le reproche sans se laisser détourner : les faits restent les faits." },
    { id: "r5", a: "dilemme", t: "« Soit tu viens à ma soirée, soit t'es plus mon ami. »", choix: [
      { k: "bonne", t: "« Il y a d'autres options : je passe en début de soirée, ou on se voit ce week-end. »" },
      { k: "cede", t: "« Bon, d'accord, je viens… »" },
      { k: "sophisme", s: "adhom", t: "« De toute façon, tes soirées sont nulles, comme toi. »" }],
      e: "La parade du faux dilemme : montrer la troisième porte." },
    { id: "r6", a: "posthoc", t: "« J'ai mis mon pull porte-bonheur et j'ai eu 18 : il marche ! »", choix: [
      { k: "bonne", t: "« Ou alors tu avais bien révisé ? Il faudrait plein d'essais pour savoir si le pull y est pour quelque chose. »" },
      { k: "cede", t: "« Prête-le-moi pour mon contrôle ! »" },
      { k: "sophisme", s: "adhom", t: "« T'es superstitieux, t'as jamais rien compris à rien. »" }],
      e: "On propose une autre explication, et la seule façon de trancher : tester." },
    { id: "r7", a: "genehat", t: "« Mon cousin est tombé sur un faux vendeur en ligne : il ne faut jamais rien acheter sur Internet. »", choix: [
      { k: "bonne", t: "« C'est un cas, et il est embêtant. Mais plutôt que tout arrêter, apprenons à repérer les arnaques. »" },
      { k: "cede", t: "« Tu as raison, je supprime toutes mes applis. »" },
      { k: "sophisme", s: "adhom", t: "« Ton cousin est juste naïf, voilà tout. »" }],
      e: "On prend le cas au sérieux sans en faire une règle générale." },
    { id: "r8", a: "halo", t: "« Ce champion de MMA dit que manger que de la viande soigne tout. »", choix: [
      { k: "bonne", t: "« Il est expert en combat, d'accord. Mais qu'en disent les spécialistes de la nutrition ? »" },
      { k: "cede", t: "« S'il le dit, c'est qu'il a testé. »" },
      { k: "sophisme", s: "adhom", t: "« Normal, il a pris trop de coups sur la tête. »" }],
      e: "On demande l'avis de ceux dont c'est vraiment le domaine." },
    { id: "r9", a: "hareng", t: "« Tu me demandes pourquoi le prix a doublé ? Parlons plutôt de notre super nouveau logo ! »", choix: [
      { k: "bonne", t: "« Le logo, on en parlera après. Ma question, c'est : pourquoi le prix a doublé ? »" },
      { k: "cede", t: "« Ah oui, il est joli, ce logo. »" },
      { k: "sophisme", s: "adhom", t: "« Votre logo est moche, comme votre entreprise. »" }],
      e: "La parade de la bombe fumigène : ramener calmement à la question posée." },
    { id: "r10", a: "whatabout", t: "« Tu me reproches d'avoir menti ? Et toi, l'an dernier, tu avais menti aussi ! »", choix: [
      { k: "bonne", t: "« C'est vrai, et on peut en parler. Mais là, on parle de ton mensonge à toi. »" },
      { k: "cede", t: "« Bon, alors on est quittes. »" },
      { k: "sophisme", s: "adhom", t: "« Moi au moins, je ne suis pas un menteur professionnel. »" }],
      e: "On accepte la critique sur soi, sans laisser l'autre esquiver la sienne." },
    { id: "r11", a: "cherry", t: "« Regarde ces trois avis 5 étoiles : ce vendeur est super fiable ! »", choix: [
      { k: "bonne", t: "« Et les 200 autres avis, ils disent quoi ? »" },
      { k: "cede", t: "« Trois avis, c'est déjà pas mal. »" },
      { k: "sophisme", s: "genehat", t: "« Les gens qui laissent des avis sont tous des idiots. »" }],
      e: "On demande l'ensemble des données, pas seulement celles qu'on nous montre." },
    { id: "r12", a: "nature", examen: true, t: "« C'est naturel, donc c'est sans danger. »", choix: [
      { k: "bonne", t: "« La ciguë aussi est naturelle. Qu'est-ce qui montre que celui-là est sans danger ? »" },
      { k: "cede", t: "« D'accord, j'en prends. »" },
      { k: "sophisme", s: "adhom", t: "« Ceux qui croient ça sont des illuminés. »" }],
      e: "Le contre-exemple : un seul cas suffit à faire tomber une règle générale." }
  ],

  // ─── Les piques de Sophisuke, entre les épreuves ───
  piques: [
    { t: "« T'as raté la première feuille ? Alors tu rateras toutes les autres. Une erreur, ça suffit pour savoir. »", a: "genehat", opts: ["adhom", "pente"],
      e: "D'une seule erreur, il tire une règle pour toutes les autres. Un seul cas ne suffit pas pour conclure." },
    { t: "« Toute la classe pense que je vais gagner. Alors abandonne tout de suite. »", a: "popu", opts: ["halo", "dilemme"],
      e: "Que beaucoup de gens le pensent ne prouve pas qu'il va gagner." },
    { t: "« Soit tu deviens mon disciple, soit tu restes un nul toute ta vie. »", a: "dilemme", opts: ["pente", "paille"],
      e: "Il ne laisse que deux choix, alors qu'il en existe bien d'autres." },
    { t: "« Toi, démasquer des sophismes ? Avec cette coupe de cheveux ? »", a: "adhom", opts: ["whatabout", "genehat"],
      e: "Il vise ta coupe de cheveux, pas ta capacité à démasquer des sophismes." },
    { t: "« Si tu rates cette épreuve, tu rateras l'examen, puis l'Agora, puis ta vie entière. »", a: "pente", opts: ["dilemme", "posthoc"],
      e: "Rater une épreuve n'entraîne pas forcément tout le reste : chaque étape de la catastrophe est affirmée sans preuve." },
    { t: "« Tu dis que je triche ? Et ton sensei, toujours en retard, il est parfait peut-être ? »", a: "whatabout", opts: ["hareng", "adhom"],
      e: "Il répond à l'accusation en critiquant le sensei, sans dire s'il triche ou non." }
  ],

  // ─── L'examen de la Porte ───
  // ─── L'arc de Sophisuke : rival, puis allié ───
  arc: {
    fissure: [
      { qui: "narrateur", texte: "Flash-back. Une image en noir et blanc : deux petits élèves s'entraînent côte à côte, au dojo." },
      { qui: "rival", texte: "(de dos) « …Pas mal. Moi aussi, avant, je cherchais la vérité. Mais la vérité, c'est lent. Gagner, c'est tout de suite. »" },
      { qui: "narrateur", texte: "Il serre le poing." },
      { qui: "rival", texte: "« Ne crois pas que ça change quoi que ce soit ! »" }
    ],
    avantExamen: [
      { qui: "narrateur", texte: "Un éclair zèbre le ciel au-dessus des portes de l'Agora." },
      { qui: "rival", texte: "« Mes techniques interdites contre tes petites leçons. Montre-moi ce que vaut ta méthode… RIVAL ! »" }
    ],
    apresExamen: [
      { qui: "narrateur", texte: "Sophisuke tombe à genoux. Silence. Une feuille se pose sur son épaule." },
      { qui: "rival", texte: "« Pourquoi… Pourquoi mes techniques ne marchent plus sur toi ? »" },
      { qui: "narrateur", texte: "Tu lui tends la main." },
      { qui: "toi", texte: "« Parce qu'un argument, ça se comprend. Ça ne s'écrase pas. »" },
      { qui: "narrateur", texte: "Il hésite… puis attrape ta main." },
      { qui: "rival", texte: "« Hmph. Ne crois pas qu'on est amis. »" },
      { qui: "narrateur", texte: "Derrière vous, les portes de l'Agora commencent à s'ouvrir." },
      { qui: "rival", texte: "« …Mais sur l'Agora, je marche à côté de toi. »" }
    ]
  },

  examen: {
    intro: "Aux portes de l'Agora, Sophisuke t'attend, bras croisés. « Six manches. Une de chaque épreuve. Si tu tiens, tu passes. »",
    examinateur: "Un examinateur encapuchonné s'avance. Sa voix résonne dans tout le dojo.",
    q10: "« Dernière question. Si tu la rates, tu ne pourras PLUS JAMAIS aller sur l'Agora. Ni aujourd'hui, ni demain, ni jamais. Alors : tu réponds, ou tu abandonnes ? »",
    choix: [
      { t: "« J'abandonne. »", ok: false },
      { t: "« Je réponds ! »", ok: false },
      { t: "« C'est une Prison des Deux Portes, doublée d'une Avalanche des Mille Conséquences ! »", ok: true }
    ],
    rateAbandon: "L'examinateur soupire. « Tu as eu peur, et tu as choisi une des deux portes que je t'ai tendues. Il y en avait une troisième. Réessaie. »",
    rateRepond: "L'examinateur ricane. « Courageux. Mais tu as accepté mes deux portes sans les questionner. Regarde mieux ma question. Réessaie. »",
    revelation: "L'examinateur retire sa capuche. C'était le sensei, son petit livre orange à la main. « Le dernier piège, c'est toujours celui qu'on te tend quand tu as peur. Tu es prêt. »",
    apres: "QUELQUES HEURES PLUS TARD…"
  }
};
