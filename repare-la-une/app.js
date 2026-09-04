// Chaque niveau : une anxiogène, sources, 3 emplacements de réécriture.
// Option : t = texte, emo / prec = effet sur les jauges (cachées jusqu'à la publication !), trap = contredit les sources (expliqué dans why)
// Chaque emplacement contient aussi une option qui ACCENTUE le dramatique par rapport à l'originale.
const LEVELS = [
 {
  orig:"ALERTE CRISE : les Français OBLIGÉS de SACRIFIER Noël ! 😱",
  sources:[
   {icon:"📊", name:"Le sondage original", body:"Sondage en ligne, 1 012 personnes : 64 % des Français prévoient le même budget de Noël que l'an dernier, 36 % prévoient de le réduire. Quasiment personne ne prévoit de l'augmenter."},
   {icon:"🎓", name:"L'analyse d'une économiste", body:"« Une majorité stable de Français maintient son budget malgré l'inflation. La part de ceux qui réduisent progresse légèrement : 32 % l'an dernier, 36 % cette année. »"},
  ],
  slots:[
   {name:"L'attaque du titre", opts:[
    {t:"ALERTE CRISE :", emo:35, prec:0},
    {t:"C'EST OFFICIEL, Noël est FICHU :", emo:40, prec:0},
    {t:"Noël en danger :", emo:25, prec:5},
    {t:"Selon un sondage (1 012 personnes),", emo:0, prec:30},
   ]},
   {name:"Le fait", opts:[
    {t:"les Français sacrifient leur Noël", emo:30, prec:0},
    {t:"les trois quarts des Français réduisent leur budget de Noël", emo:15, prec:25, trap:"Relis le sondage : c'est 36 % qui réduisent leur budget, pas 75 % ! Un chiffre précis mais faux, c'est pire qu'un titre vague : ça ressemble à de l'info."},
    {t:"des MILLIONS de familles privées de fêtes", emo:40, prec:0},
    {t:"64 % des Français prévoient un budget de Noël stable, 36 % comptent le réduire", emo:0, prec:40},
   ]},
   {name:"La chute", opts:[
    {t:"— du JAMAIS VU !", emo:30, prec:0},
    {t:".", emo:0, prec:10},
    {t:"— préparez-vous au PIRE ! ⚠️", emo:40, prec:0},
    {t:", une part en légère hausse par rapport à l'an dernier.", emo:5, prec:30},
   ]},
  ],
  lesson:"C'est l'exemple du <b>budget de Noël</b> : « 64 % maintiennent » ou « 36 % réduisent », c'est la <b>même étude</b>. Le verre à moitié plein ou à moitié vide : l'effet de cadrage. En citant les deux chiffres et la source, tu informes au lieu d'effrayer."
 },
 {
  orig:"Un footballeur de 24 ans MEURT subitement 3 jours après son VACCIN 💉☠️",
  sources:[
   {icon:"🏥", name:"Le rapport médical", body:"L'autopsie révèle une malformation cardiaque congénitale non détectée. Aucun élément n'établit de lien avec une vaccination."},
   {icon:"📚", name:"Les données historiques", body:"Les arrêts cardiaques de jeunes sportifs existent depuis toujours : environ 1 cas sur 50 000 sportifs par an, un chiffre stable depuis vingt ans, avant comme après les campagnes de vaccination."},
  ],
  slots:[
   {name:"L'attaque du titre", opts:[
    {t:"TRAGIQUE :", emo:30, prec:0},
    {t:"Ce que les médias vous CACHENT :", emo:35, prec:0},
    {t:"☠️ HÉCATOMBE silencieuse :", emo:40, prec:0},
    {t:"Selon le rapport d'autopsie,", emo:0, prec:30},
   ]},
   {name:"Le fait", opts:[
    {t:"un footballeur meurt à cause du vaccin", emo:30, prec:10, trap:"Le rapport médical dit exactement le contraire : malformation congénitale, aucun lien établi avec le vaccin. Affirmer une cause sans preuve, c'est transformer une corrélation en causalité."},
    {t:"un footballeur de 24 ans meurt subitement après son vaccin", emo:25, prec:5},
    {t:"un jeune champion FAUCHÉ en pleine gloire", emo:35, prec:0},
    {t:"un footballeur de 24 ans est décédé d'une malformation cardiaque non détectée", emo:0, prec:35},
   ]},
   {name:"La chute", opts:[
    {t:"Coïncidence ?? 🤔", emo:30, prec:0},
    {t:".", emo:0, prec:10},
    {t:"Qui sera le PROCHAIN ?!", emo:40, prec:0},
    {t:", un type d'accident dont la fréquence est stable depuis vingt ans.", emo:0, prec:30},
   ]},
  ],
  lesson:"Mettre « meurt » et « vaccin » dans la même phrase, c'est pousser le lecteur à imaginer une <b>causalité</b> à partir d'une simple <b>concomitance</b> — sans écrire un seul mot faux. Le contexte (cause réelle + fréquence stable) désamorce le piège."
 },
 {
  orig:"Ce génie FRANÇAIS invente le MOTEUR À EAU… les pétroliers veulent le faire TAIRE !",
  sources:[
   {icon:"🔬", name:"Une physicienne", body:"« L'eau n'est pas un carburant : séparer l'hydrogène de l'eau consomme plus d'énergie qu'on n'en récupère en le brûlant. Aucun “moteur à eau” n'a jamais passé un test indépendant. »"},
   {icon:"🗞️", name:"Les archives de presse", body:"Le même inventeur vend librement ses kits depuis quinze ans : personne ne l'« empêche » de vendre. On reparle d'un « moteur à eau » tous les deux-trois ans depuis des décennies. Aucune validation indépendante publiée."},
  ],
  slots:[
   {name:"L'attaque du titre", opts:[
    {t:"RÉVOLUTION :", emo:30, prec:0},
    {t:"Scandale étouffé :", emo:35, prec:0},
    {t:"LE SCOOP DU SIÈCLE 🚨 :", emo:40, prec:0},
    {t:"Un inventeur affirme", emo:0, prec:30},
   ]},
   {name:"Le fait", opts:[
    {t:"le moteur à eau qui va tout changer est enfin là", emo:25, prec:0},
    {t:"avoir mis au point un moteur à eau", emo:5, prec:25},
    {t:"avoir mis au point un moteur à eau validé par des chercheurs", emo:5, prec:20, trap:"Validé par qui ? Les sources sont formelles : aucun test indépendant, jamais. Inventer une validation scientifique rendrait ton titre plus crédible… et complètement faux."},
    {t:"l'invention MIRACLE qui rendra l'essence OBSOLÈTE", emo:35, prec:0},
   ]},
   {name:"La chute", opts:[
    {t:"— les lobbys pétroliers en PANIQUE !", emo:35, prec:0},
    {t:"— ILS ne pourront plus le cacher très longtemps !!", emo:40, prec:0},
    {t:", mais aucun test indépendant n'a confirmé son fonctionnement à ce jour.", emo:0, prec:35},
    {t:".", emo:0, prec:10},
   ]},
  ],
  lesson:"Le <b>moteur à eau</b> revient tous les deux-trois ans… et ne marche jamais. La touche complotiste (« les pétroliers veulent le faire taire ») sert à expliquer pourquoi la révolution n'arrive jamais. Le verbe « affirme » + l'absence de validation : voilà l'info honnête."
 },
 {
  orig:"L'IA va DÉTRUIRE la moitié de vos EMPLOIS d'ici 2030 ! 🤖🔥",
  sources:[
   {icon:"📄", name:"L'étude originale", body:"L'étude estime que 30 à 50 % des TÂCHES de certains métiers pourraient être automatisées d'ici 2030 — pas les emplois eux-mêmes. Elle ne donne aucun chiffre de suppressions d'emplois et souligne une grande incertitude."},
   {icon:"🎓", name:"Un économiste du travail", body:"« Les vagues technologiques précédentes ont transformé les métiers plus qu'elles ne les ont supprimés. De nouveaux métiers apparaissent. La fourchette d'incertitude est énorme. »"},
  ],
  slots:[
   {name:"L'attaque du titre", opts:[
    {t:"PANIQUE :", emo:30, prec:0},
    {t:"FIN DU TRAVAIL HUMAIN :", emo:40, prec:0},
    {t:"C'est confirmé :", emo:25, prec:5},
    {t:"Selon une étude,", emo:0, prec:30},
   ]},
   {name:"Le fait", opts:[
    {t:"l'IA va détruire un emploi sur deux", emo:30, prec:10, trap:"L'étude parle de 30 à 50 % des TÂCHES automatisables, pas des emplois supprimés ! Glisser de « tâches » à « emplois », c'est le raccourci qui transforme une étude nuancée en titre catastrophe."},
    {t:"les robots vont TOUS nous remplacer, c'est MATHÉMATIQUE", emo:40, prec:0},
    {t:"l'IA pourrait automatiser une partie des tâches de nombreux métiers", emo:0, prec:35},
    {t:"l'IA menace vos emplois", emo:25, prec:0},
   ]},
   {name:"La chute", opts:[
    {t:"d'ici 2030. Préparez-vous au PIRE.", emo:30, prec:0},
    {t:"d'ici 2030. Sauve qui peut. 🤖💀", emo:40, prec:0},
    {t:"d'ici 2030, avec une fourchette d'incertitude encore très large.", emo:0, prec:30},
    {t:"d'ici 2030.", emo:0, prec:10},
   ]},
  ],
  lesson:"Beaucoup de titres anxiogènes naissent d'un <b>glissement de vocabulaire</b> : l'étude dit « tâches automatisables », le titre dit « emplois détruits ». Toujours se demander : <b>que dit exactement la source ?</b>"
 },
 {
  orig:"Le remède MIRACLE que Big Pharma vous CACHE : le citron TUERAIT le cancer ! 🍋",
  sources:[
   {icon:"🎗️", name:"Un cancérologue", body:"« Aucune étude clinique ne montre d'effet du citron contre le cancer. Si une solution simple à un problème complexe semble trop belle pour être vraie… elle l'est généralement. »"},
   {icon:"🔎", name:"Un fact-check", body:"La rumeur circule depuis 2011, à partir d'un email viral attribué à un « institut de recherche »… qui n'existe pas."},
  ],
  slots:[
   {name:"L'attaque du titre", opts:[
    {t:"INCROYABLE :", emo:30, prec:0},
    {t:"Ils ne veulent pas que vous le sachiez :", emo:35, prec:0},
    {t:"MIRACLE ABSOLU 🍋 :", emo:40, prec:0},
    {t:"Contrairement à une rumeur virale,", emo:0, prec:30},
   ]},
   {name:"Le fait", opts:[
    {t:"le citron tue les cellules cancéreuses", emo:25, prec:10, trap:"Aucune étude clinique ne montre ça, dit le cancérologue. La rumeur vient d'un email viral citant un institut… qui n'existe pas. Affirmer l'effet, c'est répéter la fake news."},
    {t:"le fruit qui TERRASSE la maladie en silence", emo:35, prec:0},
    {t:"le citron, un espoir contre le cancer ?", emo:20, prec:5},
    {t:"aucune étude ne montre d'effet du citron contre le cancer", emo:0, prec:35},
   ]},
   {name:"La chute", opts:[
    {t:"Big Pharma TREMBLE.", emo:35, prec:0},
    {t:"Partagez VITE, avant la CENSURE !! 🔒", emo:40, prec:0},
    {t:", rappellent les cancérologues.", emo:0, prec:30},
    {t:".", emo:0, prec:10},
   ]},
  ],
  lesson:"Une <b>solution trop simple à un problème complexe</b> est généralement fausse — ça fait des décennies qu'on cherche des traitements. Et le point d'interrogation (« un espoir… ? ») ne suffit pas : il laisse planer le doute sans informer."
 },
 {
  orig:"EXPLOSION de la violence : les agressions BONDISSENT de 20 % ! 🚨",
  sources:[
   {icon:"📊", name:"Les chiffres officiels", body:"Les signalements enregistrés ont augmenté de 20 % cette année. Le rapport précise que la mise en place de la plainte en ligne a fortement facilité les déclarations."},
   {icon:"🎓", name:"Une sociologue", body:"« Une hausse des chiffres enregistrés peut refléter une hausse des faits… ou une hausse des déclarations. Les enquêtes de victimation, elles, sont stables depuis dix ans. »"},
  ],
  slots:[
   {name:"L'attaque du titre", opts:[
    {t:"EXPLOSION de la violence :", emo:35, prec:0},
    {t:"GUERRE CIVILE en approche :", emo:40, prec:0},
    {t:"Insécurité galopante :", emo:30, prec:0},
    {t:"Selon les chiffres officiels,", emo:0, prec:30},
   ]},
   {name:"Le fait", opts:[
    {t:"les agressions bondissent de 20 %", emo:25, prec:5, trap:"Nuance capitale : ce sont les SIGNALEMENTS enregistrés qui augmentent de 20 %, pas forcément les agressions. La sociologue le dit : les enquêtes de victimation sont stables. Confondre les deux, c'est le piège classique des statistiques de délinquance."},
    {t:"la violence dévore le pays tout entier", emo:40, prec:0},
    {t:"les signalements d'agression augmentent de 20 %", emo:0, prec:30},
    {t:"le pays sombre dans le chaos", emo:35, prec:0},
   ]},
   {name:"La chute", opts:[
    {t:"Plus personne n'est en sécurité.", emo:35, prec:0},
    {t:"Barricadez-vous. 🚨🚨", emo:40, prec:0},
    {t:", une hausse en partie liée à la nouvelle plainte en ligne, selon le rapport.", emo:0, prec:35},
    {t:".", emo:0, prec:10},
   ]},
  ],
  lesson:"« Les chiffres parlent d'eux-mêmes » ? Jamais ! Un chiffre <b>enregistré</b> n'est pas un fait <b>réel</b> : si on facilite les plaintes, les chiffres montent même quand la violence est stable. C'est tout l'écart entre <b>signalements</b> et <b>réalité</b>."
 },
 {
  orig:"En arrêt maladie depuis 17 ans, elle touchait près de 6 000 € par mois : l'enseignante refuse de prendre sa retraite pour ne pas perdre de revenus",
  sources:[
   {icon:"🌍", name:"L'article complet", body:"L'histoire se passe à Wesel, en Allemagne (Rhénanie-du-Nord-Westphalie) — jamais en France. L'enseignante, 62 ans, originaire de Duisbourg, a exercé dans un lycée professionnel de 2003 à 2009, avant d'être en arrêt maladie pour troubles mentaux jusqu'en 2026. Comme fonctionnaire allemande, elle a continué à toucher un salaire entre 5 051 € et 6 174 € par mois pendant cet arrêt."},
   {icon:"⚖️", name:"La suite de l'histoire", body:"Fin mai, la préfecture de Düsseldorf l'a mise à la retraite d'office après un examen médical concluant qu'elle ne pourrait pas retravailler. Elle perd ainsi 1 500 à 2 000 € par mois — et conteste cette décision en justice pour récupérer son plein salaire. Elle est aussi accusée d'avoir exercé comme naturopathe pendant ses arrêts maladie."},
  ],
  slots:[
   {name:"Le lieu (souvent oublié)", opts:[
    {t:"En France, comme souvent :", emo:20, prec:0, trap:"Relis les sources : cette histoire se passe à Wesel, en Allemagne — jamais en France. Affirmer un pays sans vérifier, c'est le point de départ classique d'une rumeur qui s'emballe sur les réseaux."},
    {t:"Un cas glaçant :", emo:15, prec:0},
    {t:"Chez nous aussi ?", emo:30, prec:0},
    {t:"En Allemagne,", emo:0, prec:35},
   ]},
   {name:"Le fait", opts:[
    {t:"une enseignante touchait près de 6 000 € par mois sans travailler depuis 17 ans", emo:20, prec:10},
    {t:"le système paie des fonctionnaires à ne rien faire pendant dix-sept ans", emo:35, prec:0},
    {t:"une fonctionnaire touchait un plein salaire sans jamais remettre les pieds en classe", emo:30, prec:5},
    {t:"une enseignante allemande de 62 ans a continué à percevoir son salaire pendant 17 ans d'arrêt maladie pour troubles mentaux", emo:0, prec:40},
   ]},
   {name:"La chute", opts:[
    {t:": elle refuse aujourd'hui de partir à la retraite pour ne pas perdre d'argent.", emo:25, prec:5},
    {t:": un symbole du laxisme total des administrations.", emo:35, prec:0},
    {t:", et conteste en justice sa mise à la retraite forcée, décidée par les autorités allemandes.", emo:0, prec:35},
    {t:".", emo:0, prec:10},
   ]},
  ],
  lesson:"Le titre original ne précise <b>jamais où</b> se passe cette histoire — beaucoup de lecteurs ont supposé que c'était en France et se sont indignés contre « nos » fonctionnaires. Or tout se déroule à Wesel, en <b>Allemagne</b>, avec un statut de fonctionnaire et des règles de retraite différentes des nôtres. Réflexe à garder : quand un titre reste vague sur le lieu, cherche-le avant de t'indigner — ou de partager."
 },
 {
  orig:"Après vingt noyades cet été, la piscine de Chalvres FERME : 2 000 écoliers directement touchés",
  img:"depositphotos_12716878-stock-photo-swimming-pool.jpg",
  imgAlt:"Vue sous-marine d'un bassin de natation vide : lignes d'eau, carrelage bleu, surface vue de dessous.",
  imgCap:"La piscine de Chalvres. Photo d'illustration.",
  sources:[
   {icon:"📰", name:"L'article du Courrier de la Brie", body:"Le quotidien régional titre « Après vingt noyades cet été, la piscine de Chalvres va fermer : 2 000 écoliers directement touchés ». Le corps de l'article, lui, précise que la fermeture a été votée le 6 février — avant l'été — parce que le bassin, construit en 1974, perd 40 m³ d'eau par jour et que sa remise aux normes est chiffrée à 4,8 millions d'euros. Les 2 000 élèves de quatorze écoles perdront leur créneau « savoir-nager »."},
   {icon:"📋", name:"Le bilan de la préfecture", body:"Vingt noyades ont été recensées dans le département entre le 1er juin et le 31 août : seize en rivière, canal ou plan d'eau, trois en piscine privée, une dans un bassin de jardin. Aucune dans une piscine municipale."},
   {icon:"🏊", name:"Une déléguée de la fédération de natation", body:"« Un enfant sur deux entre en sixième sans savoir nager correctement. Supprimer un créneau scolaire d'apprentissage, c'est mécaniquement des enfants qui nageront moins bien dans dix ans. Un lien entre cette piscine et les noyades existe — mais il va dans l'autre sens, et il est devant nous, pas derrière. »"},
  ],
  slots:[
   {name:"L'accroche (le lien sous-entendu)", opts:[
    {t:"Après vingt noyades cet été,", emo:30, prec:0, trap:"C'est tout le piège de ce titre. Le bilan de la préfecture est formel : aucune des vingt noyades n'a eu lieu dans une piscine municipale, et la fermeture a été votée le 6 février, avant l'été. Le seul mot « après » suffit à faire croire à un lien de cause à effet entre deux faits qui n'en ont aucun."},
    {t:"HÉCATOMBE dans le département :", emo:40, prec:0},
    {t:"Vingt noyades, et maintenant ça :", emo:35, prec:0},
    {t:"Faute de travaux,", emo:0, prec:30},
   ]},
   {name:"Le fait", opts:[
    {t:"la piscine de Chalvres ferme ses portes", emo:20, prec:5},
    {t:"vingt enfants se sont noyés et on ferme quand même la piscine", emo:40, prec:10, trap:"Deux inventions dans une seule phrase : le bilan de la préfecture ne dit nulle part que les vingt noyés étaient des enfants, et le « quand même » suppose un lien entre les noyades et la fermeture. Ajouter un mot qui n'est dans aucune source, c'est fabriquer de l'info."},
    {t:"la piscine de Chalvres fermera le 31 décembre, un bassin de 1974 dont la remise aux normes est chiffrée à 4,8 M€", emo:0, prec:40},
    {t:"on SACRIFIE la sécurité de nos enfants", emo:40, prec:0},
   ]},
   {name:"La chute", opts:[
    {t:": 2 000 écoliers directement touchés", emo:25, prec:5},
    {t:": à quand le prochain drame ?!", emo:40, prec:0},
    {t:": 2 000 élèves de quatorze écoles perdront leur créneau d'apprentissage de la natation, sans solution de repli annoncée.", emo:0, prec:35},
    {t:".", emo:0, prec:10},
   ]},
  ],
  lesson:"Deux faits vrais — vingt noyades dans le département, une piscine qui ferme — n'ont ici <b>aucun rapport</b> : les noyades ont eu lieu en rivière et en plan d'eau, et la fermeture a été votée en février, avant l'été. C'est le petit mot « <b>après</b> » qui fabrique le lien : ce n'est pas la réalité qui l'a mis là, c'est la phrase. Pire encore : le seul lien réel va dans l'<b>autre sens</b> — c'est la fermeture qui, en supprimant l'apprentissage de la natation, pourrait produire des noyades, dans dix ans. Et regarde la photo : bassin vide, vu de sous l'eau. Elle ne montre <b>rien</b> de l'information — ce n'est même pas la piscine de Chalvres, c'est une image de banque. Elle n'apporte pas un fait, elle apporte une <b>ambiance</b> : l'eau devient la menace. Réflexe à garder : quand un titre juxtapose deux faits, demande-toi <b>qui a mis le lien entre eux : les faits, ou la phrase ?</b>"
 },
 {
  orig:"🌍 La Nasa a dévoilé la dernière forme réelle de la Terre. Ce modèle mathématique, appelé le géoïde, repose sur plus d’un milliard d’observations acquises sur une période de 15 ans par 19 satellites.",
  video:"geoide-nasa.mp4",
  img:"geoide-nasa.jpg",
  imgAlt:"Vidéo muette : le globe terrestre, rendu en 3D à partir du modèle de géoïde, tourne lentement sur lui-même. C’est une sphère bosselée, creusée de bleu au sud de l’Inde, bombée d’orange vers l’Indonésie, avec les frontières des pays tracées dessus. Sous le globe, une échelle de couleurs graduée de −80 à +80 mètres, légendée « Geoid Height (10,000x exaggeration) », reste affichée du début à la fin.",
  imgCap:"La vidéo diffusée par la Nasa, reprise telle quelle par franceinfo le 31 août 2026. La légende ne quitte pas l’écran de toute la séquence : « Geoid Height (10,000x exaggeration) ».",
  sources:[
   {icon:"🛰️", name:"La page de la Nasa", body:"La visualisation s’intitule « The Geoid ». Le géoïde n’est pas le relief de la Terre : c’est la forme qu’aurait la surface des océans sous le seul effet de la gravité. La page précise que dans l’animation, la hauteur du géoïde est très fortement exagérée, par un facteur 10 000. Une première version montre le même géoïde à l’échelle réelle : on y voit une sphère. Mise en ligne le 15 juillet 2026, à partir du modèle GOCO06s — satellites GRACE (Nasa) et GOCE (Agence spatiale européenne) : plus d’un milliard d’observations, 15 ans, 19 satellites."},
   {icon:"📏", name:"Les ordres de grandeur", body:"Du point le plus bas du géoïde (environ −106 m, au sud de l’Inde) au plus haut (environ +85 m, vers l’Islande), l’écart total est de 191 m — pour un rayon terrestre de 6 371 km, soit 0,003 %. L’aplatissement de la Terre aux pôles, lui, atteint 21 km : cent fois plus. Multipliés par 10 000, ces 100 m deviennent 1 000 km à l’écran. D’où la pomme de terre."},
   {icon:"🧭", name:"Une géodésienne", body:"« Le géoïde, c’est le zéro des altitudes : la surface de référence à partir de laquelle on mesure la hauteur d’une montagne ou le niveau de la mer. Il ne montre aucun relief — ni l’Everest, ni la fosse des Mariannes n’y figurent. Et il n’a rien de nouveau : GRACE date de 2002, GOCE de 2009, le modèle GOCO06s de 2019. La Nasa a publié une image, pas une découverte. »"},
  ],
  slots:[
   {name:"L’annonce", opts:[
    {t:"🌍 La Nasa a dévoilé la dernière forme réelle de la Terre :", emo:20, prec:5, trap:"C’est le mot « réelle » qui fait tout basculer. La page de la Nasa est explicite : le géoïde n’est pas la forme de la Terre, c’est une surface de référence liée à la gravité, et les hauteurs y sont exagérées 10 000 fois. Tout le reste de ton post a beau être exact, ce mot-là est faux."},
    {t:"🥔 LA TERRE N’EST PAS RONDE, la Nasa l’admet enfin :", emo:40, prec:0},
    {t:"Ce que la Nasa vient de révéler sur notre planète va vous surprendre :", emo:35, prec:0},
    {t:"🌍 La Nasa a mis en ligne une visualisation du géoïde terrestre :", emo:0, prec:30},
   ]},
   {name:"Ce que montre l’image", opts:[
    {t:"notre planète ressemble en réalité à une pomme de terre", emo:25, prec:0, trap:"Relis les sources : ce que tu vois n’est pas la planète, c’est son champ de gravité, avec les hauteurs multipliées par 10 000. À l’échelle réelle, la même donnée donne une sphère. Décrire l’image comme si c’était la Terre, c’est répéter l’erreur, pas l’information."},
    {t:"une planète DÉFORMÉE que personne ne vous avait jamais montrée", emo:40, prec:0},
    {t:"un modèle mathématique construit à partir d’un milliard d’observations, acquises en 15 ans par 19 satellites", emo:0, prec:25},
    {t:"une carte des variations de la gravité, dont les creux et les bosses sont exagérés 10 000 fois pour être visibles", emo:0, prec:40},
   ]},
   {name:"La chute", opts:[
    {t:"— du jamais vu ! 😱", emo:35, prec:0},
    {t:".", emo:0, prec:10},
    {t:"— et personne n’en parle.", emo:40, prec:0},
    {t:". À l’échelle réelle, les écarts du géoïde (191 m au maximum, pour un rayon de 6 371 km) sont invisibles : la Terre reste une sphère très légèrement aplatie aux pôles.", emo:0, prec:35},
   ]},
  ],
  lesson:"Ce post est réel : publié le 31 août 2026 par le compte X de <b>franceinfo</b>, vu 161 000 fois. Et il est presque entièrement exact : le géoïde existe, le milliard d’observations, les 15 ans, les 19 satellites, tout est bien sur la page de la Nasa. <b>Un seul mot est faux</b> — « réelle » — et il suffit à retourner l’information. Le post se contredit d’ailleurs tout seul en deux phrases : « forme réelle », puis « modèle mathématique ». Or un modèle n’est pas une photo : ici les hauteurs sont exagérées <b>10 000 fois</b>, et à l’échelle vraie, la même donnée donne… une sphère. Le plus troublant : l’échelle était <b>écrite dans la vidéo</b> — « Geoid Height (10,000x exaggeration) », en toutes lettres sous le globe, affichée sans interruption pendant les 43 secondes du post. Méfie-toi enfin de l’effet <b>caution</b> des chiffres : « 1 milliard d’observations, 15 ans, 19 satellites » sont exacts, et c’est précisément leur précision qui rend crédible la seule phrase fausse. Réflexe à garder : devant une image ou une vidéo scientifique, cherche l’<b>échelle</b> avant de partager — elle est souvent écrite dessus, et toujours sur la page d’origine. Ici, ce ne sont pas les journalistes qui ont corrigé, mais des lecteurs : une note de contexte a été ajoutée sous la publication."
 },
];

const EMO_MAX=30, PREC_MIN=70;
let lvl=0, sel=[], attempts=0, stars=0, solved=false, optBtns=[], levelResults=[];
const $=id=>document.getElementById(id);

function startGame(){
  lvl=0; stars=0; levelResults=[];
  $("intro").style.display="none";
  $("hud").style.display="flex";
  $("game").style.display="block";
  $("qtot").textContent=LEVELS.length;
  $("draft-date").textContent=new Date().toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
  renderLevel();
}

function renderLevel(){
  const L=LEVELS[lvl];
  sel=L.slots.map(()=>0); // par défaut : le segment original (le plus sensationnaliste)
  attempts=0; solved=false;
  $("qnum").textContent=lvl+1;
  $("orig-txt").textContent=L.orig;
  // Photo d'illustration : seuls certains niveaux en ont une.
  // Illustration du niveau : une vidéo (avec image d'attente) ou une simple photo.
  const fig=$("orig-fig"), im=$("orig-img"), vid=$("orig-vid");
  vid.pause();
  if(L.video){ vid.src=L.video; if(L.img) vid.poster=L.img; vid.setAttribute("aria-label",L.imgAlt||"");
               vid.hidden=false; im.hidden=true; im.alt=""; im.removeAttribute("src");
               $("orig-cap").textContent=L.imgCap||""; fig.style.display="block"; }
  else if(L.img){ im.src=L.img; im.alt=L.imgAlt||""; im.hidden=false;
                  vid.hidden=true; vid.removeAttribute("src");
                  $("orig-cap").textContent=L.imgCap||""; fig.style.display="block"; }
  else { fig.style.display="none"; im.hidden=false; im.alt=""; im.removeAttribute("src"); vid.hidden=true; vid.removeAttribute("src"); }
  $("feedback").style.display="none";
  $("gauges").style.display="none"; // jauges cachées tant qu'on n'a pas publié
  $("nextbtn").style.display="none";
  $("publish").style.display="block";
  // Sources
  const sc=$("sources"); sc.innerHTML="";
  L.sources.forEach(s=>{
    const d=document.createElement("div");
    d.className="source";
    d.innerHTML=`<button type="button" class="source-hd" aria-expanded="false">${s.icon} ${s.name} <span class="sread">✓ lu</span><span class="schev">▶</span></button><div class="source-bd">${s.body}</div>`;
    const hd=d.querySelector(".source-hd");
    hd.onclick=()=>{
      d.classList.toggle("open");
      d.classList.add("read");
      hd.setAttribute("aria-expanded", d.classList.contains("open")?"true":"false");
    };
    sc.appendChild(d);
  });
  // Slots
  const sl=$("slots"); sl.innerHTML="";
  optBtns=[];
  L.slots.forEach((slot,si)=>{
    const g=document.createElement("div");
    g.className="slotgroup";
    g.innerHTML=`<div class="slotname">${si+1}. ${slot.name}</div>`;
    const wrap=document.createElement("div");
    wrap.className="slotopts";
    optBtns[si]=[];
    slot.opts.forEach((o,oi)=>{
      const b=document.createElement("button");
      b.className="opt";
      b.setAttribute("aria-pressed","false");
      b.textContent=o.t;
      b.onclick=()=>{
        sel[si]=oi;
        wrap.querySelectorAll(".opt").forEach((x,k)=>{
          x.classList.toggle("sel",k===oi);
          x.classList.remove("trap-alert");
          x.setAttribute("aria-pressed", k===oi?"true":"false");
        });
        updateDraft();
      };
      optBtns[si].push(b);
      wrap.appendChild(b);
    });
    g.appendChild(wrap);
    sl.appendChild(g);
  });
  updateDraft();
  window.scrollTo({top:0,behavior:"smooth"});
}

function currentScores(){
  const L=LEVELS[lvl];
  let emo=0, prec=0;
  L.slots.forEach((s,i)=>{emo+=s.opts[sel[i]].emo; prec+=s.opts[sel[i]].prec;});
  return {emo:Math.min(100,emo), prec:Math.min(100,prec)};
}

function updateDraft(){
  // Met à jour l'aperçu de la une, mais PAS les jauges : le verdict n'arrive qu'à la publication.
  const L=LEVELS[lvl];
  const txt=L.slots.map((s,i)=>s.opts[sel[i]].t).join(" ")
    .replace(/\s+([,.])/g,"$1").replace(/\s+/g," ").trim();
  $("draft-txt").textContent=txt;
  if(!solved){$("feedback").style.display="none";}
}

function revealGauges(){
  const {emo,prec}=currentScores();
  $("gauges").style.display="block";
  $("emo-fill").style.width=emo+"%";
  $("prec-fill").style.width=prec+"%";
  $("emo-val").textContent=emo;
  $("prec-val").textContent=prec;
}

function publish(){
  const L=LEVELS[lvl];
  attempts++;
  revealGauges();
  const fb=$("feedback");
  optBtns.forEach(row=>row.forEach(b=>b.classList.remove("trap-alert")));
  // Piège : segment contredit par les sources ?
  const trapIdx=L.slots.findIndex((s,i)=>s.opts[sel[i]].trap);
  if(trapIdx!==-1){
    const trapped=L.slots[trapIdx].opts[sel[trapIdx]];
    optBtns[trapIdx][sel[trapIdx]].classList.add("trap-alert");
    fb.className="ko"; fb.style.display="block";
    $("fb-title").textContent="🛑 Retoqué par le rédac chef !";
    $("fb-expl").innerHTML="Ton segment « <i>"+trapped.t+"</i> » contredit les sources. "+trapped.trap+"<br><br>🔎 Relis les sources et corrige ta une.";
    $("fb-stars").style.display="none";
    fb.scrollIntoView({behavior:"smooth",block:"center"});
    return;
  }
  const {emo,prec}=currentScores();
  if(emo>EMO_MAX || prec<PREC_MIN){
    fb.className="ko"; fb.style.display="block";
    $("fb-title").textContent="✋ Pas encore publiable…";
    let msg=[];
    if(emo>EMO_MAX) msg.push("😱 Ton titre joue encore trop sur l'émotion ("+emo+"/100, objectif ≤ "+EMO_MAX+"). Repère les mots qui font peur : majuscules, « alerte », « panique », sous-entendus…");
    if(prec<PREC_MIN) msg.push("🎯 Il manque de la précision ou du contexte ("+prec+"/100, objectif ≥ "+PREC_MIN+"). Qui le dit ? Combien exactement ? Que précisent les sources ?");
    $("fb-expl").innerHTML=msg.join("<br><br>");
    $("fb-stars").style.display="none";
    fb.scrollIntoView({behavior:"smooth",block:"center"});
    return;
  }
  // Succès !
  solved=true;
  const allRead=[...document.querySelectorAll(".source")].every(s=>s.classList.contains("read"));
  const got = attempts===1 ? (allRead?3:2) : (attempts===2?2:1);
  stars+=got;
  levelResults.push({orig:L.orig, stars:got});
  $("hud-stars").textContent="⭐ "+stars;
  fb.className="ok"; fb.style.display="block";
  $("fb-title").textContent="🗞️ Une publiée ! Le rédac chef applaudit.";
  let extra = (attempts===1 && !allRead) ? "<br><br><i>(Astuce : lire toutes les sources avant de publier rapporte 3 étoiles !)</i>" : "";
  $("fb-expl").innerHTML=L.lesson+extra;
  $("fb-stars").style.display="block";
  $("fb-stars").textContent="⭐".repeat(got)+"☆".repeat(3-got);
  $("publish").style.display="none";
  $("nextbtn").textContent = lvl===LEVELS.length-1 ? "Voir mon bilan ➜" : "Une suivante ➜";
  $("nextbtn").style.display="block";
  fb.scrollIntoView({behavior:"smooth",block:"center"});
}

function nextLevel(){
  if(lvl===LEVELS.length-1){ endGame(); return; }
  lvl++; renderLevel();
}

function endGame(){
  $("game").style.display="none";
  $("hud").style.display="none";
  $("end").style.display="block";
  const max=LEVELS.length*3;
  $("end-score").textContent="⭐ "+stars+" / "+max;
  let title,msg;
  if(stars>=max-2){title="🏆 Rédacteur en chef d'exception !";msg="Tes unes informent sans affoler. Tu maîtrises la leçon : <b>une info vraie peut quand même manipuler</b>, selon comment elle est cadrée. Toi, tu choisis le cadre honnête.";}
  else if(stars>=Math.round(max*0.55)){title="📰 Bon rédacteur !";msg="Tu sais désamorcer la plupart des titres anxiogènes. Réflexe à garder : <b>toujours retourner aux sources</b> — c'est là que se cachent les nuances (tâches ≠ emplois, signalements ≠ faits…).";}
  else{title="🗞️ Stagiaire prometteur";msg="Le cadrage est subtil ! Rejoue en lisant bien chaque source avant de publier : les pièges de « fausse précision » ne pardonnent pas.";}
  msg+="<br><br>💡 Souviens-toi : la prochaine fois qu'un titre te fait peur ou t'indigne, demande-toi : <b>« comment cette même info aurait-elle pu être présentée autrement ? »</b>";
  $("end-title").textContent=title;
  $("end-msg").innerHTML=msg;
  $("end-recap").innerHTML=levelResults.map((r,i)=>
    `<div class="recap-row"><span class="rr-title">${i+1}. ${r.orig}</span><span class="rr-stars">${"⭐".repeat(r.stars)}${"☆".repeat(3-r.stars)}</span></div>`
  ).join("");
}
