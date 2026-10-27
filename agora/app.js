// ─── Réponses possibles ───
const EPL = [
  {id:"ethos",  l:"🏛️ Ethos", s:"il invoque l'éthique, des valeurs, sa légitimité"},
  {id:"pathos", l:"💔 Pathos", s:"il joue sur l'émotion"},
  {id:"logos",  l:"🧮 Logos", s:"il argumente par la logique, les faits"},
];
const FALLACIES = [
  {id:"paille",   l:"🎃 Homme de paille", s:"caricaturer ton propos pour l'attaquer"},
  {id:"adhom",    l:"👤 Attaque personnelle", s:"viser la personne, pas l'argument"},
  {id:"popu",     l:"📣 Appel à la popularité", s:"« tout le monde le pense ! »"},
  {id:"dilemme",  l:"⚖️ Faux dilemme", s:"il n'y aurait que deux options"},
  {id:"pente",    l:"🎢 Pente glissante", s:"exagérer les conséquences en cascade"},
  {id:"genehat",  l:"🎲 Généralisation hâtive", s:"conclure à partir d'un seul cas"},
  {id:"nature",   l:"🌿 Appel à la nature", s:"« naturel » ne veut pas dire « bon »"},
  {id:"halo",     l:"⭐ Autorité hors domaine", s:"célèbre ≠ compétent (effet de halo)"},
  {id:"preuve",   l:"🔄 Charge de la preuve inversée", s:"c'est à celui qui affirme de prouver"},
  {id:"posthoc",  l:"🔗 Cause imaginée", s:"« après donc à cause de » (corrélation ≠ causalité)"},
  {id:"circulaire", l:"🔄 Raisonnement circulaire", s:"la conclusion sert de preuve à elle-même"},
  {id:"hareng",     l:"🐟 Hareng rouge",            s:"changer de sujet pour éviter de répondre"},
  {id:"cherry",     l:"🍒 Cueillette des faits",     s:"ne montrer que les données qui arrangent"},
  {id:"whatabout",  l:"🪞 Et toi alors ?",           s:"pointer l'hypocrisie de l'autre sans répondre sur le fond"},
];
const VALABLE={id:"valable", l:"✅ Argument valable", s:"pas de piège : c'est un bon argument"};
function libelle(id){ return [...EPL,...FALLACIES,VALABLE].find(o=>o.id===id); }

// ─── Adversaires ───
// type "epl" : identifier ethos/pathos/logos. type "fall" : nommer le sophisme (a = id, opts = 3 distracteurs)
const FOES = [
  {name:"Tonton Gérard", emoji:"🍗", desc:"champion du repas de famille", hp:4,
   intro:"Au dessert, Tonton Gérard pose sa fourchette : « Toi qui fais des études, on va voir si tu sais débattre ! » La discussion commence.",
   lines:[
    {type:"epl", t:"« Moi, mon petit, j'ai 60 ans de vie derrière moi. J'ai travaillé dur toute ma vie, je n'ai jamais menti à personne. Alors tu peux me croire sur parole ! »",
     a:"ethos", e:"Gérard ne donne <b>aucun argument</b> sur le fond : il met en avant son honnêteté et son vécu pour inspirer confiance. C'est de l'<b>ethos contextuel</b> — comme un politicien qui se dit « proche du peuple »."},
    {type:"epl", t:"« Tu veux devenir végétarien ?! Pense à ta pauvre grand-mère… elle qui te préparait son poulet rôti avec tant d'amour. Tu veux lui briser le cœur, c'est ça ? »",
     a:"pathos", e:"Aucune logique ici : Gérard joue à fond sur <b>l'émotion</b> (la culpabilité, la grand-mère, l'amour du poulet rôti). C'est du <b>pathos</b> pur jus — très efficace, et très utilisé en publicité."},
    {type:"fall", t:"« Mon voisin a mangé bio toute sa vie, et il est tombé malade quand même. Le bio, ça ne sert à rien, c'est prouvé ! »",
     a:"genehat", opts:["popu","nature","adhom"],
     e:"Un seul voisin ne fait pas une étude scientifique ! Conclure à partir d'<b>un seul cas</b>, c'est une <b>généralisation hâtive</b>. Pour savoir si le bio a un effet, il faut comparer des milliers de personnes."},
    {type:"fall", t:"« De toute façon, les médicaments c'est de la chimie. Moi je me soigne avec des plantes : c'est naturel, donc c'est forcément meilleur pour la santé ! »",
     a:"nature", opts:["dilemme","genehat","preuve"],
     e:"L'<b>appel à la nature</b> : « naturel » ne veut pas dire « bon » (la cigüe et l'amanite phalloïde sont 100 % naturelles…), et « chimique » ne veut pas dire « mauvais ». Beaucoup de médicaments viennent d'ailleurs des plantes !"},
    {type:"fall", t:"« Si on laisse les jeunes jouer aux jeux vidéo, bientôt ils ne sortiront plus de leur chambre, puis ils arrêteront l'école, et dans dix ans ce pays sera ruiné ! »",
     a:"pente", opts:["paille","dilemme","posthoc"],
     e:"La <b>pente glissante</b> : enchaîner des conséquences de plus en plus catastrophiques comme si elles étaient inévitables, sans prouver aucun des maillons de la chaîne."},
    {type:"fall", t:"« Et puis tu défends les écrans, toi ? C'est bien la peine, avec tes lunettes et tes notes moyennes en maths ! »",
     a:"adhom", opts:["paille","halo","popu"],
     e:"Gérard ne répond pas à tes arguments : il <b>t'attaque toi</b>. C'est l'attaque personnelle (ad hominem). Taper sur la personne pour dévaloriser son discours, c'est courant… et fallacieux."},
    {type:"sain", t:"« Mets ton casque à vélo : en cas de chute, il réduit fortement le risque de blessure grave à la tête. Les études sur le sujet sont nombreuses et vont toutes dans le même sens. »",
     a:"valable", opts:["genehat", "halo", "pente"],
     e:"Pour une fois, Gérard a raison ! Une affirmation précise, appuyée sur de <b>nombreuses études qui convergent</b> : c'est un <b>argument valable</b>. Le reconnaître, c'est marquer un <b>point d'accord</b>, la base d'un débat honnête."},
   ]},
  {name:"Maxx_Buzz", emoji:"🤳", desc:"influenceur 2,4 M d'abonnés", hp:5,
   intro:"Maxx_Buzz dégaine sa perche à selfie : « Salut la commu ! Aujourd'hui je débats contre un hater. Lâchez vos likes ! »",
   lines:[
    {type:"epl", t:"« Regardez cette vidéo de chaton abandonné sous la pluie… 😢 Si vous ne partagez pas ma cagnotte après ça, c'est que vous n'avez pas de cœur. »",
     a:"pathos", e:"L'émotion comme levier d'engagement : c'est du <b>pathos</b>. Les réseaux sociaux en raffolent, car une info émouvante capte notre attention… qu'elle soit vraie ou fausse. Méfiance avant de liker !"},
    {type:"fall", t:"« Ma nouvelle boisson détox est validée par la science : 2,4 millions d'abonnés ne peuvent pas se tromper ! »",
     a:"popu", opts:["halo","preuve","genehat"],
     e:"L'<b>appel à la popularité</b> : le nombre de fans ne prouve rien. Des millions de personnes ont déjà cru des choses fausses. La popularité mesure la visibilité, pas la vérité."},
    {type:"fall", t:"« Ce footballeur star dit que ma boisson booste ses performances. C'est un champion du monde quand même, il s'y connaît ! »",
     a:"halo", opts:["popu","posthoc","adhom"],
     e:"L'<b>effet de halo</b> : on transfère la compétence de quelqu'un (le foot) vers un domaine qui n'a rien à voir (la nutrition). Être champion du monde ne rend pas expert en boissons — c'est exactement comme ça que fonctionne la pub."},
    {type:"fall", t:"« Depuis que je bois mon jus détox tous les matins, je n'ai pas eu un seul rhume. La preuve que ça marche ! »",
     a:"posthoc", opts:["genehat","nature","preuve"],
     e:"« Après, donc à cause de » : deux événements qui se suivent ne sont pas forcément liés. C'est une <b>cause imaginée</b> — peut-être que Maxx n'aurait pas eu de rhume de toute façon. Seule une vraie étude peut le dire."},
    {type:"fall", t:"« Tu dis que mon produit est inutile ? Prouve-moi qu'il ne marche PAS ! Tant que tu n'as pas de preuve, c'est que j'ai raison. »",
     a:"preuve", opts:["dilemme","adhom","popu"],
     e:"Renversement de la <b>charge de la preuve</b> : c'est à <b>celui qui affirme</b> de prouver, pas l'inverse. Sinon je peux affirmer n'importe quoi (« Joe Biden est un reptilien ! ») et exiger qu'on me prouve le contraire."},
    {type:"epl", t:"« Les chiffres parlent d'eux-mêmes : sur 1 000 testeurs, 87 % ont déclaré se sentir mieux après un mois. Voici l'étude complète en description. »",
     a:"logos", e:"Cette fois Maxx avance des <b>données chiffrées et une source</b> : c'est du <b>logos</b>, l'argumentation par la logique et les faits. Attention : un argument logos peut quand même être trompeur — il faut vérifier l'étude ! Mais le <i>ressort</i> utilisé, c'est bien la raison."},
    {type:"sain", t:"« Avant d'acheter un produit que je montre, vérifiez s'il est sponsorisé et lisez des avis indépendants : je suis payé pour en parler. »",
     a:"valable", opts:["popu", "halo", "cherry"],
     e:"Maxx donne un conseil honnête et vérifiable : <b>aucun piège</b> ici. Un bon argument peut venir de quelqu'un dont on se méfie : c'est l'argument qu'on juge, pas la personne."},
   ]},
  {name:"Sénateur Brutus", emoji:"🏛️", desc:"orateur politique redoutable", hp:6,
   intro:"Le Sénateur Brutus ajuste sa cravate sous les projecteurs : « Mes chers concitoyens, voyons ce que ce jeune contradicteur a dans le ventre. »",
   lines:[
    {type:"epl", t:"« Il est scandaleux que dans la patrie des droits de l'Homme, le pays des Lumières, des gens dorment encore dans la rue. Au nom de la fraternité, votez pour moi ! »",
     a:"ethos", e:"Brutus invoque des <b>grandes valeurs universelles</b> (les Lumières, la fraternité, les droits de l'Homme) : c'est de l'<b>ethos universel</b>. L'autre variante, l'ethos contextuel, consiste à se présenter soi-même comme vertueux."},
    {type:"epl", t:"« Tous les pays qui ont baissé cet impôt ont vu leur chômage diminuer dans les deux ans. Nous proposons la même baisse : voici les projections, secteur par secteur. »",
     a:"logos", e:"Données, comparaisons, projections : Brutus utilise le <b>logos</b>. C'est la forme d'argument la plus solide en apparence… mais vérifie toujours les chiffres : un logos peut cacher des statistiques mal utilisées."},
    {type:"fall", t:"« Mon adversaire veut réguler la vitesse en ville. Autrement dit, il veut interdire la voiture, supprimer votre liberté de vous déplacer, et vous enfermer chez vous ! »",
     a:"paille", opts:["pente","dilemme","adhom"],
     e:"L'<b>homme de paille</b> : déformer le propos de l'adversaire (réguler ≠ interdire) pour attaquer la caricature plutôt que l'argument réel. Le contraire du débat honnête — qui consiste à reformuler fidèlement, l'« homme de fer »."},
    {type:"fall", t:"« Les choses sont simples : soit vous votez ma loi sur la surveillance, soit vous acceptez de vivre dans l'insécurité totale. Il faut choisir ! »",
     a:"dilemme", opts:["pente","paille","popu"],
     e:"Le <b>faux dilemme</b> : présenter deux options comme les seules possibles, alors qu'il en existe plein d'autres (d'autres lois, d'autres moyens…). Quand on te dit « c'est ça ou le chaos », méfie-toi."},
    {type:"fall", t:"« Pourquoi écouter ce climatologue ? Il a été vu en train de prendre l'avion pour un congrès ! Son hypocrisie disqualifie toutes ses recherches. »",
     a:"adhom", opts:["halo","paille","preuve"],
     e:"Attaquer le <b>comportement de la personne</b> pour rejeter ses <b>arguments scientifiques</b> : ad hominem. Même si l'hypocrisie est réelle (comme Harrison Ford et son jet privé), elle ne rend pas les données fausses."},
    {type:"fall", t:"« Tous les sondages me donnent en tête. Le peuple est avec moi ! Comment osez-vous prétendre que je me trompe, alors que des millions de Français me soutiennent ? »",
     a:"popu", opts:["preuve","genehat","dilemme"],
     e:"L'<b>appel à la popularité</b>, version politique : être majoritaire ne rend pas un argument vrai. La vérité ne se vote pas — pendant des siècles, la majorité pensait que le Soleil tournait autour de la Terre."},
    {type:"epl", t:"« Souvenez-vous de cette petite fille que j'ai rencontrée à l'hôpital, ses dessins accrochés au mur… C'est pour elle, pour vos enfants, que je me bats ce soir. »",
     a:"pathos", e:"L'anecdote émouvante, l'enfant malade, les trémolos : du <b>pathos</b> de compétition. Ce n'est ni bien ni mal en soi — Martin Luther King utilisait aussi le pathos — mais il faut le <b>repérer</b> pour ne pas être convaincu par la seule émotion."},
    {type:"sain", t:"« Je propose de rénover d'abord les écoles les plus vétustes. Voici le rapport d'inspection publié le mois dernier : chacun peut vérifier la liste, école par école. »",
     a:"valable", opts:["popu", "dilemme", "cherry"],
     e:"Une proposition, une <b>source publique</b>, des données <b>vérifiables par tous</b> : c'est un <b>argument valable</b>. Même un politicien redoutable peut avoir raison sur un point."},
   ]},
  {name:"Le Complotiste", emoji:"🕵️", desc:"a fait ses propres recherches", hp:6,
   intro:"Derrière son mur de post-its et d'articles imprimés, il pointe un doigt vers toi : « Ah, toi aussi tu crois ce qu'on te dit à la télé… Laisse-moi t'ouvrir les yeux. »",
   lines:[
    {type:"fall", t:"« Regarde, j'ai trouvé DIX études qui vont dans mon sens ! Les scientifiques « officiels », eux, refusent juste de regarder ces preuves-là. »",
     a:"cherry", opts:["popu","halo","genehat"],
     e:"La <b>cueillette des faits</b> (cherry-picking) : il ne montre que les études qui l'arrangent et passe sous silence l'énorme majorité des travaux qui disent le contraire. Le vrai consensus scientifique se juge sur l'ensemble des études, pas sur dix triées sur le volet."},
    {type:"fall", t:"« Comment je sais que c'est vrai ? C'est écrit noir sur blanc sur mon site de confiance. Et ce site, on peut lui faire confiance… parce qu'il le dit lui-même ! »",
     a:"circulaire", opts:["preuve","popu","adhom"],
     e:"Un <b>raisonnement circulaire</b> : la conclusion (« ce site est fiable ») sert de preuve à elle-même, sans aucune vérification extérieure. C'est comme dire « je dis la vérité parce que je ne mens jamais »."},
    {type:"fall", t:"« Le mois où cette antenne 5G a été installée près de chez moi, mon chat est tombé malade. Coïncidence ? Je ne crois pas. »",
     a:"posthoc", opts:["nature","genehat","cherry"],
     e:"Encore une <b>cause imaginée</b> : deux événements qui se suivent dans le temps ne sont pas forcément liés. Le chat pouvait tomber malade pour mille raisons — seule une vraie étude pourrait établir un lien avec l'antenne."},
    {type:"epl", t:"« Tu ne sens pas qu'on te ment ? Cette peur au ventre, ce sentiment que quelque chose cloche… Ils nous cachent la vérité, et au fond de toi, tu le sais. »",
     a:"pathos", e:"Aucun fait, aucune preuve : juste la <b>peur</b> et le sentiment de trahison. C'est du <b>pathos</b> — très efficace pour convaincre sans avoir à démontrer quoi que ce soit."},
    {type:"fall", t:"« Prouve-moi que ce n'est PAS un complot ! Tant que tu n'as pas la preuve du contraire, il faut bien admettre que j'ai raison. »",
     a:"preuve", opts:["dilemme","adhom","popu"],
     e:"Encore la <b>charge de la preuve inversée</b> : c'est à celui qui affirme qu'il y a complot de le prouver, pas à toi de prouver le contraire. Sinon on pourrait affirmer n'importe quoi et exiger qu'on le réfute."},
    {type:"fall", t:"« Les vaccins, c'est plein de produits chimiques. Moi je préfère renforcer mes défenses avec des remèdes 100 % naturels, c'est quand même plus logique, non ? »",
     a:"nature", opts:["dilemme","genehat","cherry"],
     e:"L'<b>appel à la nature</b> : « naturel » ne veut pas dire « sans danger », et « chimique » ne veut pas dire « nocif ». L'eau, l'arsenic et le venin de serpent sont aussi 100 % naturels."},
    {type:"epl", t:"« Moi, contrairement aux journalistes payés par les lobbies, j'ai fait mes propres recherches pendant des années. Je n'ai aucun intérêt caché, juste la vérité à défendre. »",
     a:"ethos", e:"Il se présente comme le seul honnête, le seul à « avoir fait ses recherches » : c'est de l'<b>ethos contextuel</b>, une légitimité auto-proclamée. Passer des heures sur internet ne remplace pas l'expertise d'un domaine, ni la méthode scientifique."},
    {type:"sain", t:"« Je l'admets : je ne suis pas expert. Avant de partager cette info, il faudrait vérifier ce qu'en disent plusieurs sources sérieuses. »",
     a:"valable", opts:["preuve", "circulaire", "cherry"],
     e:"Un rare moment de lucidité : reconnaître ses limites et <b>vouloir vérifier</b> auprès de plusieurs sources, c'est exactement la bonne démarche. <b>Argument valable</b>."},
   ]},
  {name:"La Directrice Greenwashing", emoji:"👔", desc:"communicante corporate hors pair", hp:6,
   intro:"Sous les projecteurs d'une conférence de presse, elle ajuste son micro-cravate : « Chez nous, la planète est notre priorité n°1. Laissez-moi vous expliquer pourquoi vous avez tort de vous inquiéter. »",
   lines:[
    {type:"fall", t:"« Vous m'interrogez sur nos émissions de CO2 ? Justement, laissez-moi vous parler de notre magnifique programme de recyclage des gobelets en carton, lancé cette année dans tous nos bureaux ! »",
     a:"hareng", opts:["whatabout","popu","cherry"],
     e:"Un <b>hareng rouge</b> : elle change de sujet (le CO2 → les gobelets recyclés) au lieu de répondre à la question posée. Le recyclage des gobelets, c'est bien, mais ça ne dit rien des émissions de l'entreprise."},
    {type:"fall", t:"« Vous critiquez notre bilan carbone ? Et nos concurrents, vous avez vu le leur ? Ils sont bien pires que nous, et personne ne leur demande de comptes ! »",
     a:"whatabout", opts:["adhom","dilemme","hareng"],
     e:"Le <b>« et toi alors ? »</b> (whataboutism) : pointer l'hypocrisie ou les défauts supposés d'un autre au lieu de répondre sur le fond. Même si les concurrents polluent plus, ça ne rend pas son propre bilan carbone acceptable."},
    {type:"fall", t:"« 10 millions de clients nous font confiance chaque jour. Avec un tel soutien, comment pourrions-nous être une entreprise qui pollue ? »",
     a:"popu", opts:["halo","preuve","genehat"],
     e:"L'<b>appel à la popularité</b> : le nombre de clients ne dit rien de l'impact environnemental réel de l'entreprise. Beaucoup de clients peut simplement vouloir dire beaucoup de communication et de parts de marché."},
    {type:"fall", t:"« Cette actrice mondialement connue a accepté d'être notre ambassadrice. Si une personnalité aussi engagée nous fait confiance, c'est bien que nos produits sont vraiment respectueux de l'environnement. »",
     a:"halo", opts:["popu","preuve","cherry"],
     e:"L'<b>effet de halo</b> : le talent d'actrice n'a aucun rapport avec une expertise environnementale. Une célébrité peut être payée pour représenter une marque sans rien connaître à son empreinte carbone réelle."},
    {type:"epl", t:"« Nos chiffres sont clairs : -12 % d'émissions par unité produite depuis 2019, +30 % d'investissement dans les énergies renouvelables. Voici le détail complet dans notre rapport RSE de 40 pages. »",
     a:"logos", e:"Des chiffres, des dates, un rapport détaillé : c'est du <b>logos</b>. Attention cependant : présenter des statistiques précises n'empêche pas de faire de la <b>cueillette des faits</b> en coulisses — toujours vérifier ce que le rapport ne dit pas."},
    {type:"epl", t:"« Chez nous, l'engagement et la responsabilité ne sont pas que des mots : ce sont nos valeurs fondatrices, gravées dans notre charte depuis le premier jour. »",
     a:"ethos", e:"Des grandes valeurs affichées (engagement, responsabilité) sans aucune preuve concrète à l'appui : c'est de l'<b>ethos</b>. Une charte ne prouve rien tant qu'elle ne s'accompagne pas de résultats vérifiables."},
    {type:"fall", t:"« Regardez : dans notre usine de Lyon, nous avons réduit nos émissions de 5 % cette année. La preuve que notre stratégie environnementale fonctionne ! »",
     a:"cherry", opts:["posthoc","popu","halo"],
     e:"De la <b>cueillette des faits</b> : un seul chiffre positif, sur un seul site, est mis en avant — en passant sous silence ce qui se passe dans le reste du groupe, où les émissions ont peut-être augmenté."},
    {type:"sain", t:"« Notre usine de Lyon a réduit ses émissions de 30 %, et le chiffre a été vérifié par un organisme indépendant. Il reste beaucoup à faire sur nos autres sites. »",
     a:"valable", opts:["cherry", "halo", "hareng"],
     e:"Cette fois, le chiffre est <b>vérifié de façon indépendante</b>, et elle <b>reconnaît ce qui reste à faire</b> ailleurs : ce n'est pas de la cueillette des faits. <b>Argument valable</b>."},
   ]},
];

// ─── Le dialogue : répondre, et comprendre ce qui motive l'autre ───
// Pour chaque adversaire, dans l'ordre de ses répliques : q = une question
// ouverte, r = une reformulation fidèle (l'« homme de fer ») ou, pour un bon
// argument, le reconnaître ; k = ce que le personnage confie quand il s'ouvre
// (un indice de sa motivation cachée). motiv = la vraie motivation ; leurres =
// fausses pistes, la dernière la plus proche (servie en Difficile seulement).
const DIALOGUE = [
  {motiv:"Il a peur de perdre sa place auprès de vous : le monde change vite, et il se sent dépassé.",
   leurres:["Il veut avoir le dernier mot : à table, c'est lui qui a toujours raison, et ça l'amuse.","Il défend son ancien métier : il a travaillé toute sa vie dans l'élevage.","Il se méfie de tout ce qui est nouveau : pour lui, c'était mieux avant, pour tout le monde."],
   braque:"Gérard croise les bras : « Ah, monsieur fait des grands mots maintenant ! » Il ne t'écoute plus.",
   esquive:"Gérard hausse les épaules et ressert du fromage. Rien n'a bougé.",
   fin:"Gérard sourit : « Allez, dimanche, on fait un tour à vélo ensemble. Avec le casque, promis. »",
   lignes:[
    {q:"« Qu'est-ce que ta vie t'a appris sur ce sujet, concrètement ? »",
     r:"« Si je comprends bien, tu as peur qu'on ne tienne pas compte de ton expérience. Elle compte pour moi : on regarde les faits ensemble ? »",
     k:"« Tu sais, à mon âge, on a l'impression que plus personne n'écoute ce qu'on a vécu. »"},
    {q:"« Qu'est-ce qui t'inquiète vraiment, dans le fait que je mange moins de viande ? »",
     r:"« Tu as peur que nos repas de famille ne soient plus pareils. Je viendrai toujours, et j'adore la cuisine de mamie, même sans poulet. »",
     k:"« Ces repas, c'est tout ce qui nous reste pour être ensemble… Si tu changes tout, il restera quoi ? »"},
    {q:"« Il est tombé malade de quoi, ton voisin ? Ça a dû te marquer. »",
     r:"« Tu dis que le bio ne garantit pas la santé, et c'est vrai. Mais un seul cas ne suffit pas à dire qu'il ne sert à rien : on regarde ce que disent les grandes études ? »",
     k:"« Mon voisin, c'était mon meilleur ami. Je n'ai jamais compris pourquoi il est tombé malade. »"},
    {q:"« Qu'est-ce qui te fait préférer les plantes aux médicaments ? »",
     r:"« Si je te suis, tu te méfies des médicaments trop chimiques. Certaines plantes soignent vraiment, mais la ciguë aussi est naturelle… On regarde au cas par cas ? »",
     k:"« Depuis mon opération, j'en ai assez des médecins qui me parlent comme à un enfant. »"},
    {q:"« Qu'est-ce qui te fait peur, quand tu vois des jeunes jouer ? »",
     r:"« Tu crains que les écrans prennent toute la place, et c'est une vraie question. Mais jouer ne mène pas forcément à arrêter l'école : où mets-tu la limite, toi ? »",
     k:"« Quand tu étais petit, on allait à la pêche tous les deux. Maintenant tu es toujours sur ton écran… »"},
    {q:"« Mes lunettes, d'accord. Mais sur les écrans, qu'est-ce qui te gêne vraiment ? »",
     r:"« Je sens que tu es agacé. Laissons mes notes de côté : ton idée, c'est que les écrans nuisent aux études, c'est ça ? »",
     k:"« Pardon. C'est que… j'ai du mal à suivre tout ce que vous savez, vous, les jeunes. »"},
    {q:"« Tu as raison. Qu'est-ce qui te fait penser à ça aujourd'hui ? »",
     r:"« Tu as raison, et les études le confirment. Je le mettrai. »",
     k:"« J'ai eu tellement peur, le jour où ton cousin est tombé. Je tiens à vous, c'est tout. »"},
   ]},
  {motiv:"Il a peur de perdre ses abonnés, donc ses revenus : il dit ce que les marques lui demandent de dire.",
   leurres:["Il veut devenir célèbre à tout prix : les likes comptent plus pour lui que la vérité.","Il déteste les scientifiques : ils se sont moqués de lui dans une vidéo l'an dernier.","Il croit sincèrement à ses produits : il pense avoir été guéri par une boisson détox."],
   braque:"Maxx coupe le micro : « Encore un hater… Bloqué. » La discussion s'arrête là.",
   esquive:"Maxx enchaîne sur sa prochaine story. Rien n'a bougé.",
   fin:"Maxx range sa perche à selfie : « Tu sais quoi ? Ma prochaine vidéo, ce sera : comment repérer un placement de produit. »",
   lignes:[
    {q:"« Pourquoi cette cagnotte te tient-elle à cœur ? »",
     r:"« Je comprends que tu veuilles aider ce chaton. Mais on peut être ému et vouloir savoir où va l'argent : tu peux nous le dire ? »",
     k:"« Si mes vidéos ne font pas de vues, le mois prochain, je ne paie pas mon loyer. »"},
    {q:"« Qu'est-ce que ça représente pour toi, 2,4 millions d'abonnés ? »",
     r:"« Tu dis que beaucoup de gens aiment ta boisson, et c'est sûrement vrai. Mais ça ne dit pas si elle détoxifie : que dit la science, vraiment ? »",
     k:"« Les chiffres, c'est ma vie. S'ils baissent, les marques s'en vont. »"},
    {q:"« Comment ce footballeur a-t-il découvert ta boisson ? »",
     r:"« Ce footballeur est un champion du sport, d'accord. Mais en nutrition, qu'est-ce qui le rend compétent ? »",
     k:"« Le footballeur, c'est la marque qui l'a choisi, pas moi. Je n'avais même pas goûté la boisson avant le tournage. »"},
    {q:"« Tu as d'autres raisons de penser que c'est grâce au jus ? »",
     r:"« Tu n'as pas eu de rhume, tant mieux. Mais ça pourrait venir d'autre chose : le sommeil, la chance… Comment savoir si c'est le jus ? »",
     k:"« Honnêtement ? Je ne sais pas si c'est le jus. C'est la phrase que la marque m'a demandé de dire. »"},
    {q:"« Qu'est-ce que tu risquerais, si le produit ne marchait pas ? »",
     r:"« Tu me demandes de prouver que ça ne marche pas. Mais c'est à celui qui vend le produit de montrer qu'il marche : tu as des études indépendantes ? »",
     k:"« Si j'admets que le produit ne sert à rien, je perds le contrat… et la confiance de ma commu. »"},
    {q:"« Qui a réalisé cette étude ? »",
     r:"« Tu t'appuies sur des chiffres, c'est une bonne démarche. Pour que ce soit solide, il faudrait savoir qui a fait l'étude, et comment. »",
     k:"« L'étude, c'est la marque qui l'a payée. Je n'ai pas vérifié : je publie trois vidéos par jour, je n'ai pas le temps. »"},
    {q:"« C'est courageux. Pourquoi as-tu décidé de le dire ? »",
     r:"« Merci de le dire, c'est honnête et c'est rare. Ça me donne plus confiance en toi. »",
     k:"« J'aimerais faire des vidéos plus honnêtes, mais j'ai peur que plus personne ne les regarde. »"},
   ]},
  {vous:true,
   motiv:"Il a peur de perdre l'élection et de décevoir ceux qui ont cru en lui : alors il force le trait.",
   leurres:["Il ne croit à aucune de ses idées : il dit ce qui fera voter pour lui, puis il oubliera.","Il est payé par une entreprise : ses lois servent d'abord les intérêts de ses amis.","Il adore être applaudi : sur scène, les acclamations comptent plus que les solutions."],
   braque:"Brutus se tourne vers la salle : « Vous voyez ? Mes adversaires n'ont que des insultes ! » Il en ressort plus fort.",
   esquive:"Brutus enchaîne sur la suite de son discours. Rien n'a bougé.",
   fin:"Brutus baisse le micro : « Vous savez, je préfère un débat comme celui-ci à tous mes meetings. On en refait un, devant les électeurs ? »",
   lignes:[
    {q:"« Qu'est-ce qui vous touche personnellement dans cette question ? »",
     r:"« Vous dites qu'il est indigne que des gens dorment dehors, et je suis d'accord. Concrètement, que proposez-vous ? »",
     k:"« J'ai grandi dans un quartier où des voisins dormaient dans leur voiture. Je ne l'ai jamais oublié. »"},
    {q:"« Dans ces pays, d'autres choses ont-elles changé en même temps ? »",
     r:"« Vous appuyez votre proposition sur des données, c'est une bonne base. Il faudrait encore vérifier que la baisse du chômage vient bien de cet impôt. »",
     k:"« Ces projections, mon équipe y a passé des nuits. Si je perds, tout ce travail sera perdu. »"},
    {q:"« Pouvez-vous citer ce que votre adversaire propose exactement ? »",
     r:"« Si je reformule fidèlement : votre adversaire veut limiter la vitesse en ville, pas interdire la voiture. Qu'est-ce qui vous gêne dans cette mesure-là ? »",
     k:"« Je l'admets, je caricature. Mes conseillers disent qu'il faut des phrases chocs, sinon personne ne retient rien. »"},
    {q:"« N'y a-t-il vraiment que ces deux options ? »",
     r:"« Vous voulez que les gens soient en sécurité, c'est légitime. Mais entre votre loi et l'insécurité totale, il existe d'autres solutions : lesquelles avez-vous écartées ? »",
     k:"« Mon équipe me dit que je recule dans les sondages. Quand j'ai peur, je simplifie tout. »"},
    {q:"« Que pensez-vous de ses recherches elles-mêmes ? »",
     r:"« Vous lui reprochez d'être incohérent, admettons. Mais ses résultats se jugent sur le fond : qu'avez-vous à redire à ses données ? »",
     k:"« Ce climatologue m'a mis en difficulté au dernier débat. Je n'ai pas su lui répondre… »"},
    {q:"« Que répondriez-vous à ceux qui ne vous soutiennent pas ? »",
     r:"« Beaucoup de gens vous soutiennent, c'est un fait. Mais être populaire ne veut pas dire avoir raison sur ce point précis : quels sont vos arguments ? »",
     k:"« En vérité, ce sondage date de l'an dernier. Aujourd'hui, je ne suis plus sûr de rien. »"},
    {q:"« Que lui avez-vous promis, à cette petite fille ? »",
     r:"« Cette histoire vous tient à cœur, ça se sent. Quel est votre plan précis pour les enfants hospitalisés ? »",
     k:"« Cette petite fille existe vraiment. Je lui ai promis que son hôpital resterait ouvert. »"},
    {q:"« C'est clair et vérifiable. Comment avez-vous choisi l'ordre des écoles ? »",
     r:"« Merci de publier vos sources : c'est exactement ce qui permet un débat honnête. »",
     k:"« Les gens qui m'ont élu comptent sur moi. Je ne veux pas les décevoir. »"},
   ]},
  {motiv:"Il s'est senti méprisé et seul : dans son groupe en ligne, on l'écoute enfin.",
   leurres:["Il gagne de l'argent avec son site : plus il fait peur, plus il vend de remèdes.","Il veut faire peur pour s'amuser : semer le doute est un jeu pour lui.","Il se croit plus intelligent que tout le monde : il aime avoir vu ce que les autres ignorent."],
   braque:"« Tu vois, tu es comme les autres : tu me prends pour un idiot. » Il se renferme dans ses certitudes.",
   esquive:"Il retourne à son téléphone. Rien n'a bougé.",
   fin:"Il décroche un post-it du mur : « On pourrait vérifier une de mes infos ensemble, la semaine prochaine ? Juste pour voir. »",
   lignes:[
    {q:"« Comment as-tu trouvé ces dix études ? »",
     r:"« Tu as trouvé dix études, c'est du travail. Mais s'il en existe des centaines qui disent l'inverse, il faut les regarder toutes : on le fait ensemble ? »",
     k:"« Les scientifiques ne m'ont jamais répondu. Dans mon groupe, au moins, on me prend au sérieux. »"},
    {q:"« Qui est derrière ce site ? »",
     r:"« Tu fais confiance à ce site, je comprends. Mais pour savoir s'il est fiable, il faut une source extérieure qui le confirme : tu en as une ? »",
     k:"« Ce site, c'est un ami du groupe qui l'a créé. Ce sont les seuls qui m'ont soutenu quand j'ai perdu mon travail. »"},
    {q:"« Il va mieux, ton chat ? Qu'a dit le vétérinaire ? »",
     r:"« Je suis désolé pour ton chat. Que la maladie arrive en même temps que l'antenne, ça interroge, mais ça ne prouve pas que l'une cause l'autre. »",
     k:"« Mon chat, c'est tout ce qui me reste depuis que je vis seul. J'avais besoin de comprendre. »"},
    {q:"« Depuis quand as-tu ce sentiment ? »",
     r:"« Tu ressens une vraie méfiance, et elle vient sûrement de quelque part. Mais un sentiment ne suffit pas à prouver un mensonge : qu'est-ce qui l'a fait naître ? »",
     k:"« Ce sentiment que tout cloche, je l'ai depuis mon licenciement. Ce jour-là, on m'a menti. »"},
    {q:"« Qu'est-ce qui pourrait te faire changer d'avis ? »",
     r:"« Tu me demandes de prouver qu'il n'y a pas de complot. Mais c'est à celui qui affirme de prouver : quelle est ta preuve la plus solide ? »",
     k:"« Si j'ai tort, alors j'ai perdu des années… et peut-être mes amis du groupe avec. »"},
    {q:"« Qu'est-ce qui t'a éloigné des médecins ? »",
     r:"« Tu veux prendre soin de ta santé, c'est légitime. Mais naturel ne veut pas dire sans danger, ni chimique dangereux : on regarde les données sur les vaccins ? »",
     k:"« Un médecin m'a parlé comme à un idiot, une fois. Depuis, je préfère me débrouiller seul. »"},
    {q:"« Comment as-tu commencé ces recherches ? »",
     r:"« Tu as passé beaucoup de temps à chercher, je le respecte. Comment vérifies-tu que tes sources sont fiables ? »",
     k:"« Mes recherches, c'est surtout des soirées entières en ligne. Ça m'occupe, depuis que je suis seul. »"},
    {q:"« Bonne idée. Quelles sources te paraîtraient sérieuses ? »",
     r:"« C'est exactement la bonne démarche. On vérifie ensemble ? »",
     k:"« Ça fait du bien qu'on me parle sans se moquer de moi. »"},
   ]},
  {vous:true,
   motiv:"Elle sait que le bilan global est mauvais, et craint pour son poste et son équipe si elle le dit.",
   leurres:["Elle aime manipuler le public : convaincre malgré les faits est un défi pour elle.","Elle est persuadée que son entreprise est exemplaire : elle n'a jamais vu les chiffres.","Elle ne connaît rien à l'écologie : elle répète un discours sans le comprendre."],
   braque:"La directrice sourit, imperturbable : « Je crois que nous n'avons plus rien à nous dire. » Elle met fin à l'entretien.",
   esquive:"La directrice reprend ses éléments de langage. Rien n'a bougé.",
   fin:"La directrice éteint son micro : « Je vais proposer qu'on publie le bilan complet, site par site. Ce sera plus difficile… mais plus honnête. »",
   lignes:[
    {q:"« Et vos émissions de CO2, justement, comment évoluent-elles ? »",
     r:"« Le recyclage des gobelets, c'est bien. Mais ma question portait sur vos émissions de CO2 : pouvez-vous y revenir ? »",
     k:"« Les émissions, ce n'est pas mon service. On m'a remis ce discours ce matin. »"},
    {q:"« Et vous, quels sont vos objectifs pour vos propres émissions ? »",
     r:"« Vos concurrents font peut-être pire, c'est possible. Mais cela ne dit rien de votre propre bilan : où en êtes-vous ? »",
     k:"« Si je dis que nous polluons, ce sont mes collègues qui en paieront le prix. »"},
    {q:"« Vos clients connaissent-ils votre bilan carbone ? »",
     r:"« Vous avez beaucoup de clients, c'est un fait. Mais être apprécié ne prouve pas qu'on ne pollue pas : quelles sont vos émissions totales ? »",
     k:"« Ma direction veut des messages positifs. Le reste, je n'ai pas le droit d'en parler. »"},
    {q:"« Votre ambassadrice a-t-elle visité vos usines ? »",
     r:"« Cette actrice est engagée, je n'en doute pas. Mais elle n'est pas experte en bilan carbone : qui a évalué vos produits ? »",
     k:"« L'ambassadrice ? Elle a signé un contrat. Elle n'a jamais mis les pieds dans une de nos usines. »"},
    {q:"« Et vos émissions totales, comment ont-elles évolué ? »",
     r:"« Vous donnez des chiffres précis, c'est une bonne chose. Pour bien comprendre : les émissions par unité baissent, mais le total, lui ? »",
     k:"« Par unité, oui. Mais nous produisons beaucoup plus… Au total, nos émissions augmentent. »"},
    {q:"« Comment ces valeurs se traduisent-elles en actes cette année ? »",
     r:"« Ces valeurs vous tiennent à cœur, je l'entends. Qu'est-ce qui montre, concrètement, qu'elles sont appliquées ? »",
     k:"« J'ai rejoint cette entreprise pour ces valeurs. Aujourd'hui, j'ai du mal à les défendre. »"},
    {q:"« Et vos autres usines ? »",
     r:"« Lyon progresse, tant mieux. Mais une usine ne fait pas tout le groupe : quels sont les chiffres pour l'ensemble ? »",
     k:"« Lyon, c'est notre meilleur site. Les autres, je préfère ne pas en parler en public. »"},
    {q:"« C'est un vrai progrès. Comment comptez-vous l'étendre aux autres sites ? »",
     r:"« Merci pour ce chiffre vérifié, et pour reconnaître ce qui reste à faire. C'est ce qui rend votre parole crédible. »",
     k:"« Merci. C'est la première fois qu'on me laisse dire ce qui reste à faire. »"},
   ]},
];
FOES.forEach((f,i)=>{ f.dlg=DIALOGUE[i]; f.lines.forEach((l,j)=>{ l.d=DIALOGUE[i].lignes[j]; l.dlg=DIALOGUE[i]; l.foe=f; }); });

let foeIdx=0, lineIdx=0, youHP=6, foeHP=0, order=[];
let correctCount=0, totalCount=0, matchCorrect=0;
// E2 : ce que la partie a joué, pour l'écran de fin ColFin — {id, titre, reussi, explication}.
// Les répliques n'ont pas d'identifiant : leur texte (t) en tient lieu d'une partie à l'autre.
const JEU="arene-rhetorique";
let joue=[];
// « Rejouer mes erreurs » : un adversaire de révision, composé des seules répliques ratées.
let revision=null;
function foeActuel(){ return revision || FOES[foeIdx]; }
function texteBrut(html){ const d=document.createElement("div"); d.innerHTML=String(html).replace(/<br\s*\/?>/gi," "); return d.textContent; }
// ─── Techniques du dojo (dojo.html) ───
// Chaque épreuve réussie au dojo débloque une technique, relue ici dans la
// progression du dojo (localStorage « arene.dojo »). Les trois actives servent
// une fois par combat ; les Clochettes donnent +1 point de conviction maximum.
const DOJO_P=(()=>{ try{ return JSON.parse(localStorage.getItem("arene.dojo"))||{}; }catch(e){ return {}; } })();
const DOJO_EP=DOJO_P.epreuves||{};
const TECHS=[
  {id:"regard",  ep:"feuilles", l:"👁️ Regard perçant", s:"retire des mauvaises réponses"},
  {id:"seconde", ep:"oeil",     l:"🌀 Seconde vue", s:"ta prochaine erreur ne coûte rien"},
  {id:"contre",  ep:"contre",   l:"⚡ Contre-attaque", s:"bien vu : +1 ouverture ; raté : −2 lucidité"},
].filter(x=>DOJO_EP[x.ep]);
let techUsed={}, techActive={}, ligneEnCours=null;
// Les trois buts d'un match : la lucidité (youHP), l'ouverture de l'autre, et ce qu'on a compris de lui.
let ouverture=0, carnet=[], phase="replique";
let bilan={question:0, reformulation:0, massue:0, esquive:0, compris:0};
const YOUMAX=6+(DOJO_EP.clochettes?1:0);
const $=id=>document.getElementById(id);
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

function startMatch(i, foeRevision){
  foeIdx=i; lineIdx=0; matchCorrect=0;
  revision=foeRevision||null;
  const foe=foeActuel();
  foeHP=foe.hp;
  techUsed={};
  if(i===0 || revision){ youHP=YOUMAX; correctCount=0; totalCount=0; joue=[]; }
  if(i===0 && !revision) bilan={question:0, reformulation:0, massue:0, esquive:0, compris:0};
  ouverture=0; carnet=[]; phase="replique"; renderCarnet();
  ColFin.protegerSortie(true);
  $("end").style.display="none";
  order=shuffle([...foe.lines.keys()]);
  $("intro").style.display="none";
  $("inter").style.display="none";
  $("battle").style.display="block";
  $("foe-emoji").textContent=foe.emoji;
  $("foe-title").textContent=foe.name;
  $("foe-tag").textContent=foe.emoji+" "+foe.name+" — "+foe.desc;
  renderBreadcrumb();
  updateHP();
  renderTurn();
}

function renderBreadcrumb(){
  const bc=$("foe-breadcrumb");
  bc.innerHTML="";
  FOES.forEach((f,i)=>{
    const span=document.createElement("span");
    span.className="bc-item"+(i<foeIdx?" done":i===foeIdx?" current":"");
    span.textContent=f.emoji;
    bc.appendChild(span);
  });
}

function updateHP(){
  const foe=foeActuel();
  $("hp-you").firstElementChild.style.width=(youHP/YOUMAX*100)+"%";
  $("hp-foe").firstElementChild.style.width=(ouverture/foe.lines.length*100)+"%";
  $("hp-you-txt").textContent="🧭 Lucidité : "+youHP+"/"+YOUMAX;
  $("hp-foe-txt").textContent="🤝 Ouverture : "+ouverture+"/"+foe.lines.length;
  $("hp-you").setAttribute("aria-valuemax",YOUMAX);
  $("hp-you").setAttribute("aria-valuenow",Math.max(0,youHP));
  $("hp-foe").setAttribute("aria-valuemax",foe.lines.length);
  $("hp-foe").setAttribute("aria-valuenow",ouverture);
}

function renderTurn(){
  const foe=foeActuel();
  const line=foe.lines[order[lineIdx % order.length]];
  ligneEnCours=line; techActive={};
  $("btxt").textContent=line.t;
  $("riposte").style.display="none";
  $("nextbtn").style.display="none";
  $("dialogue").hidden=true; $("dialogue").innerHTML="";
  document.querySelector(".bubble").hidden=false; $("piste").hidden=false;
  $("turn-progress").textContent="Réplique "+(lineIdx+1)+" / "+foe.lines.length;
  const bubble=document.querySelector(".bubble");
  bubble.classList.remove("pop-replay");
  void bubble.offsetWidth;
  bubble.classList.add("pop-replay");
  tourFini=false;
  lancerAttaque(line);
  const ansDiv=$("answers"); ansDiv.innerHTML="";
  let choices;
  if(line.type==="epl"){
    $("qprompt").textContent="Quel ressort rhétorique utilise-t-il ?";
    choices=shuffle(EPL.map(o=>({...o})));
  } else {
    $("qprompt").textContent="Quel est le piège de cet argument… s’il y en a un ?";
    const pool=[line.a,...line.opts].filter(id=>id!=="valable");
    choices=shuffle(pool.map(id=>({...FALLACIES.find(f=>f.id===id)})));
    choices.push({...VALABLE});
  }
  if(modeSaisie()){ renderSaisie(line); renderTechs(); return; }
  choices.forEach(c=>{
    const b=document.createElement("button");
    b.className="abtn";
    b.dataset.id=c.id;
    b.innerHTML=`${c.l}<span class="asub">${c.s}</span>`;
    b.onclick=()=>answer(line,c.id,b);
    ansDiv.appendChild(b);
  });
  renderTechs();
}

function answer(line,id,btn){
  const ok=id===line.a;
  // Seconde vue : l'erreur ne compte pas, la même réplique reste à jouer.
  if(!ok && btn && techActive.seconde){
    techActive.seconde=false;
    if(!btn){ /* impact : pas de seconde chance */ } else if(btn.tagName==="INPUT"){ btn.value=""; btn.focus(); } else { btn.disabled=true; btn.classList.add("bad"); }
    const r=$("riposte"); r.className="ko"; r.style.display="block";
    $("rip-title").textContent="🌀 Seconde vue ! Ton erreur ne compte pas : choisis encore.";
    $("rip-expl").innerHTML="";
    renderTechs();
    return "seconde";
  }
  const dmg=techActive.contre?2:1;
  tourFini=true;
  finAttaque(ok, line);
  joue.push({id:line.t, titre:line.t, reussi:ok, explication:texteBrut(line.e)});
  totalCount++;
  if(ok){ correctCount++; matchCorrect++; }
  const all=[...document.querySelectorAll(".abtn")];
  all.forEach(b=>{b.disabled=true;b.classList.add("dim");});
  const goodLabel=libelle(line.a).l;
  all.forEach(b=>{ if(b.dataset.id===line.a){b.classList.remove("dim");b.classList.add("good");} });
  if(ok){
    if(dmg===2) ouverture=Math.min(foeActuel().lines.length,ouverture+1);
    $("rip-title").textContent="✔ Bien vu ! Tu as repéré la technique.";
  } else {
    if(btn){ btn.classList.remove("dim");btn.classList.add("bad"); }
    youHP=Math.max(0,youHP-dmg);
    $("f-you").classList.add("shake");
    setTimeout(()=>$("f-you").classList.remove("shake"),450);
    $("rip-title").textContent="✘ Aïe ! C'était : "+goodLabel;
  }
  if(line.a==="valable") $("rip-title").textContent=ok?"✅ Point d'accord ! Ce n'était pas une attaque, mais un vrai argument.":"✘ Aïe ! Tu as vu un piège là où il n'y en avait pas : c'était un argument valable.";
  if(dmg===2) $("rip-title").textContent=(ok?"⚡ Contre-attaque réussie : +1 ouverture. ":"⚡ Contre-attaque ratée : −2 lucidité. ")+$("rip-title").textContent;
  techActive={};
  renderTechs(true);
  updateHP();
  const rip=$("riposte");
  rip.className=ok?"ok":"ko"; rip.style.display="block";
  $("rip-expl").innerHTML=line.e;
  if(youHP<=0){
    $("nextbtn").style.display="block";
    $("nextbtn").textContent="😵 Tu t'es laissé embarquer… ➜";
    $("nextbtn").focus();
    return;
  }
  renderReponse(line);
}

function nextTurn(){
  if(youHP<=0){ lose(); return; }
  if(phase==="comprendre"){ winMatch(); return; }
  lineIdx++;
  if(lineIdx>=order.length){
    if(revision || !foeActuel().dlg) winMatch(); else renderComprendre();
    return;
  }
  renderTurn();
  window.scrollTo({top:0,behavior:"smooth"});
}

function winMatch(){
  $("battle").style.display="none";
  $("nextbtn").style.display="none";
  if(revision){ finDePartie("📝 Révision terminée", scoreLine()); return; }
  if(foeIdx===FOES.length-1){ victory(); return; }
  const next=FOES[foeIdx+1];
  $("inter").style.display="block";
  $("inter-emoji").textContent=FOES[foeIdx].emoji;
  $("inter-title").textContent="💬 Fin de la discussion avec "+FOES[foeIdx].name;
  $("inter-msg").innerHTML="Tu reprends ton souffle : +3 lucidité. 🌿<br><br>Prochain interlocuteur : <b>"+next.emoji+" "+next.name+"</b> — "+next.desc+".<br><i>"+next.intro+"</i>";
  youHP=Math.min(YOUMAX,youHP+3);
  $("inter-btn").textContent="💬 Discuter avec "+next.name;
  $("inter-btn").onclick=()=>startMatch(foeIdx+1);
}

function scoreLine(){
  const pct=totalCount?Math.round(correctCount/totalCount*100):0;
  return "Score final : "+correctCount+" bonnes réponses sur "+totalCount+" ("+pct+" %)";
}

// E2 : l'écran de fin — titre, score, répliques ratées et boutons — est rendu par ColFin.
function finDePartie(titre, msg){
  $("end").style.display="block";
  ColFin.rendre({
    jeu: JEU, titre: titre, message: texteBrut(msg),
    score: correctCount, total: totalCount, items: joue,
    onRejouer: rates => {
      const lines=FOES.flatMap(f=>f.lines).filter(l=>rates.some(r=>r.id===l.t));
      startMatch(foeIdx, {name:"Révision", emoji:"📝", desc:"les répliques que tu as ratées", hp:lines.length, intro:"", lines:lines});
    },
    onRecommencer: () => startMatch(0)
  });
}

function victory(){
  $("retry-btn").style.display="none";
  const msg="Tu as discuté avec les cinq personnages, et tu as compris ce qui motivait "+bilan.compris+" d'entre eux sur 5.<br><br>Tes réponses : "+bilan.question+" questions, "+bilan.reformulation+" reformulations, "+bilan.esquive+" esquives, "+bilan.massue+" coups de massue.<br><br>"+scoreLine()+"<br><br>Repérer un sophisme, c'est le début. Ce qui fait avancer une discussion, c'est poser des questions, reformuler fidèlement l'idée de l'autre (l'<b>homme de fer</b>), reconnaître ses bons arguments… et chercher à comprendre ce qui compte pour lui. 🤝";
  finDePartie("🤝 Bâtisseur de dialogue !", msg);
}

function lose(){
  $("battle").style.display="none";
  $("nextbtn").style.display="none";
  const title="Tu t'es laissé embarquer…";
  const msg=foeActuel().name+" t'a fait tomber dans trop de pièges. Pas grave : l'art de la discussion <b>se pratique</b> plus qu'il ne s'apprend.<br><br>"+scoreLine()+"<br><br>Relis bien les ripostes : homme de paille, faux dilemme, appel à la popularité… Une fois qu'on les connaît, on les voit partout !";
  finDePartie("😵 "+title, msg);
  const rb=$("retry-btn");
  rb.style.display="inline-block";
  rb.textContent="🔁 Reprendre la discussion avec "+foeActuel().name;
  rb.onclick=()=>{ $("end").style.display="none"; youHP=YOUMAX; startMatch(foeIdx, revision); };
}

// Les boutons de techniques, sous les barres de conviction.
function renderTechs(fini){
  const box=$("techs"); if(!box) return;
  box.innerHTML="";
  box.hidden=!TECHS.length;
  TECHS.forEach(x=>{
    const b=document.createElement("button");
    b.type="button";
    b.className="tech-btn"+(techActive[x.id]?" active":"");
    const sous=techUsed[x.id]?(techActive[x.id]?"activée : réponds !":"déjà utilisée"):x.s;
    b.innerHTML=`${x.l}<span class="asub">${sous}</span>`;
    b.disabled=!!fini || !!techUsed[x.id];
    b.setAttribute("aria-pressed", techActive[x.id]?"true":"false");
    b.onclick=()=>useTech(x.id);
    box.appendChild(b);
  });
}

function useTech(id){
  techUsed[id]=true;
  if(id==="regard" && modeSaisie()){
    const bonne=libelle(ligneEnCours.a);
    $("saisie-indice").textContent="👁️ Indice : "+bonne.s;
  } else if(id==="regard"){
    // Retire des mauvaises réponses jusqu'à n'en laisser que deux en jeu.
    const enJeu=[...document.querySelectorAll(".abtn:not(:disabled)")];
    const fausses=shuffle(enJeu.filter(b=>b.dataset.id!==ligneEnCours.a));
    fausses.slice(0,Math.max(0,enJeu.length-2)).forEach(b=>{b.disabled=true;b.classList.add("dim");});
  } else techActive[id]=true;
  renderTechs();
  const premier=document.querySelector(".abtn:not(:disabled)"); if(premier) premier.focus();
}

// Accueil : ce que le dojo a déjà appris au joueur, et l'avatar de qui a passé l'examen.
(function(){
  const etat=$("dojo-etat");
  if(etat){
    const noms=TECHS.map(x=>x.l.replace(/^\S+\s/,""));
    if(DOJO_EP.clochettes) noms.push("🔔 Clochettes (+1 lucidité)".replace(/^\S+\s/,""));
    etat.textContent=noms.length?"🥋 Techniques du dojo prêtes pour l'Agora : "+noms.join(", ")+".":"🥋 Nouveau : passe d'abord par le dojo pour t'entraîner et gagner des techniques utilisables ici.";
  }
  if(DOJO_P.examen){ const a=document.querySelector("#f-you .femoji"); if(a){ a.textContent="🥷"; a.title="avatar ninja : examen du dojo réussi"; } }
})();

// ─── Mode « saisie libre » ───
// Le joueur écrit le nom du sophisme au lieu de le choisir. La reconnaissance
// tolère les accents, la casse, les petits mots et quelques fautes de frappe,
// et accepte les noms usuels en français comme en anglais (même table dans
// app.js et app-en.js : un élève peut écrire « strawman » en français).
const SYNONYMES={
  paille:["homme de paille","epouvantail","sophisme de l'epouvantail","straw man","strawman","caricature","deformation","deformer mes propos"],
  adhom:["attaque personnelle","ad hominem","attaque ad hominem","attaque a la personne","attaque sur la personne","personal attack","insulte"],
  popu:["appel a la popularite","popularite","argument de popularite","ad populum","argumentum ad populum","appel au nombre","appel a la majorite","appel a la foule","effet de mode","bandwagon","appeal to popularity","tout le monde le pense"],
  dilemme:["faux dilemme","dilemme","fausse alternative","faux choix","alternative truquee","fausse dichotomie","false dilemma","false dichotomy","either or"],
  pente:["pente glissante","pente savonneuse","pente","slippery slope","effet domino","reaction en chaine","engrenage"],
  genehat:["generalisation hative","generalisation abusive","generalisation","hasty generalisation","hasty generalization","cas isole"],
  nature:["appel a la nature","naturel","nature","sophisme naturaliste","appeal to nature"],
  halo:["autorite hors domaine","effet de halo","halo","argument d'autorite","appel a l'autorite","fausse autorite","autorite","appeal to authority","authority outside their field","celebrite"],
  preuve:["charge de la preuve inversee","charge de la preuve","renversement de la charge de la preuve","inversion de la charge de la preuve","preuve inversee","appel a l'ignorance","ad ignorantiam","burden of proof","reversed burden of proof","argument from ignorance"],
  posthoc:["cause imaginee","post hoc","post hoc ergo propter hoc","fausse cause","correlation causalite","correlation n'est pas causalite","confusion correlation causalite","cum hoc","effet cigogne","false cause","imagined cause"],
  circulaire:["raisonnement circulaire","circulaire","petition de principe","raisonnement en cercle","cercle vicieux","circular reasoning","begging the question"],
  hareng:["hareng rouge","red herring","diversion","changer de sujet","changement de sujet","detournement","faux fuyant","digression","noyer le poisson"],
  cherry:["cueillette des faits","cueillette de cerises","cueillette","cherry picking","picorage","selection des faits","tri des faits","omission"],
  whatabout:["et toi alors","et toi","whataboutism","whataboutisme","tu quoque","toi aussi","renvoyer la balle","hypocrisie"],
  ethos:["ethos","ethique","valeurs","credibilite","legitimite","autorite morale","ethics","credibility","values"],
  pathos:["pathos","emotion","emotions","emotionnel","sentiment","sentiments","appel aux emotions","emotional","feelings"],
  logos:["logos","logique","raison","raisonnement","faits","chiffres","logic","facts","reason"],
};
const PETITS_MOTS=new Set(["le","la","les","l","de","du","des","d","un","une","a","au","aux","the","of","an","sophisme","sophismes","fallacy","c","est","it","is","s"]);
function normaliser(s){
  return String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .replace(/[^a-z0-9]+/g," ").split(" ").filter(w=>w && !PETITS_MOTS.has(w)).join(" ");
}
function distance(a,b){
  const m=a.length, n=b.length; let prec=Array.from({length:n+1},(_,j)=>j);
  for(let i=1;i<=m;i++){
    const cour=[i];
    for(let j=1;j<=n;j++) cour[j]=Math.min(prec[j]+1,cour[j-1]+1,prec[j-1]+(a[i-1]===b[j-1]?0:1));
    prec=cour;
  }
  return prec[n];
}
// Renvoie l'id reconnu parmi `ids`, ou null. Une forme contenue mot pour mot
// dans la saisie l'emporte (la plus longue) ; sinon la plus proche, avec une
// tolérance d'une faute pour 6 lettres environ.
function reconnaitre(saisie, ids){
  const x=normaliser(saisie); if(!x) return null;
  let meilleur=null, score=Infinity;
  ids.forEach(id=>(SYNONYMES[id]||[]).forEach(f=>{
    const y=normaliser(f); if(!y) return;
    if((" "+x+" ").includes(" "+y+" ")){
      const sc=-y.length;
      if(sc<score){ score=sc; meilleur=id; }
      return;
    }
    const tol=y.length<=4?0:Math.min(3,Math.floor(y.length/6)+1);
    const d=distance(x,y);
    if(d<=tol && d<score){ score=d; meilleur=id; }
  }));
  return meilleur;
}
function modeSaisie(){ const r=document.querySelector('input[name="mode"]:checked'); return !!r && r.value==="saisie"; }

function renderSaisie(line){
  const ansDiv=$("answers");
  const form=document.createElement("form");
  form.className="saisie";
  const input=document.createElement("input");
  input.type="text"; input.id="saisie-champ"; input.autocomplete="off"; input.spellcheck=false;
  input.placeholder=line.type==="epl"?"Ethos, pathos ou logos ?":"Écris le nom du sophisme…";
  input.setAttribute("aria-label","Ta réponse");
  const ok=document.createElement("button"); ok.type="submit"; ok.className="saisie-ok"; ok.textContent="Valider";
  const passe=document.createElement("button"); passe.type="button"; passe.className="saisie-passe"; passe.textContent="🤷 Je ne sais pas";
  const msg=document.createElement("p"); msg.className="saisie-msg"; msg.id="saisie-msg"; msg.setAttribute("aria-live","polite");
  const indice=document.createElement("p"); indice.className="saisie-msg"; indice.id="saisie-indice";
  form.append(input,ok);
  if(line.type!=="epl"){
    const val=document.createElement("button"); val.type="button"; val.className="saisie-valable"; val.textContent="✅ C'est un bon argument";
    val.onclick=()=>conclureSaisie(line, "valable", input, null);
    form.appendChild(val);
  }
  form.append(passe,msg,indice);
  ansDiv.appendChild(form);
  form.onsubmit=e=>{
    e.preventDefault();
    const ids=(line.type==="epl"?EPL:FALLACIES).map(o=>o.id);
    const id=reconnaitre(input.value, ids);
    if(!id){ msg.textContent="Je ne reconnais pas ce nom. Essaie une autre formulation (ou « Je ne sais pas »)."; input.select(); return; }
    msg.textContent="";
    conclureSaisie(line, id, input, input.value);
  };
  passe.onclick=()=>conclureSaisie(line, null, input, null);
  input.focus();
}

function conclureSaisie(line, id, input, tape){
  const res=answer(line, id||"", input);
  const lab=id?libelle(id).l:"";
  const note=document.createElement("p");
  note.className="saisie-lu";
  note.textContent=id==="valable"&&tape==null?"Tu as jugé l'argument valable.":tape!=null?"Tu as écrit « {x} » : reconnu comme {l}.".replace("{x}",tape.trim()).replace("{l}",lab):"Tu as passé ton tour.";
  $("rip-expl").prepend(note);
  if(res==="seconde") return;
  input.classList.add(id===line.a?"good":"bad");
  [...document.querySelectorAll(".saisie input, .saisie button")].forEach(x=>x.disabled=true);
}

// Le mode de réponse choisi à l'accueil reste mémorisé d'une partie à l'autre.
(function(){
  let m=null; try{ m=localStorage.getItem("arene.mode"); }catch(e){}
  const r=document.querySelector('input[name="mode"][value="'+(m==="saisie"?"saisie":"qcm")+'"]');
  if(r) r.checked=true;
  document.querySelectorAll('input[name="mode"]').forEach(x=>x.addEventListener("change",()=>{
    try{ localStorage.setItem("arene.mode", x.value); }catch(e){}
  }));
})();

// ─── La scène de combat ───
// Chaque réplique part de l'adversaire comme une attaque. En Difficile, elle
// traverse la piste au ralenti : il faut répondre avant l'impact. En Facile,
// elle reste suspendue au milieu, sans chrono. Un argument valable reconnu
// devient vert.
let attaqueRAF=null, tourFini=false;
function modeDifficile(){ const r=document.querySelector('input[name="diff"]:checked'); return !!r && r.value==="difficile"; }
function lancerAttaque(line){
  cancelAnimationFrame(attaqueRAF); attaqueRAF=null;
  const a=$("attaque"), piste=$("piste");
  if(!a) return;
  a.className=""; a.textContent="🗯️";
  piste.classList.toggle("suspendue", !modeDifficile());
  if(!modeDifficile()){ a.style.left="50%"; return; }
  // Le temps de lire la réplique, plus le temps d'écrire en saisie libre.
  const duree=(7+line.t.length*0.05+(modeSaisie()?6:0))*1000;
  const debut=performance.now();
  function pas(t){
    const f=Math.min(1,(t-debut)/duree);
    a.style.left=(92-84*f)+"%";
    if(f<1) attaqueRAF=requestAnimationFrame(pas);
    else { attaqueRAF=null; impact(line); }
  }
  a.style.left="92%";
  attaqueRAF=requestAnimationFrame(pas);
}
function impact(line){
  if(tourFini) return;
  techActive.seconde=false;
  answer(line,"",null);
  $("rip-title").textContent="⏱️ Trop tard : tu n'as pas réagi à temps ! "+$("rip-title").textContent;
  document.querySelectorAll(".abtn, .saisie input, .saisie button").forEach(x=>x.disabled=true);
}
function finAttaque(ok, line){
  cancelAnimationFrame(attaqueRAF); attaqueRAF=null;
  const a=$("attaque"); if(!a) return;
  if(ok && line.a==="valable"){ a.textContent="✨"; a.className="vert"; }
  else if(ok) a.className="brise";
  else { a.className="touche"; a.style.left="8%"; }
}

// La difficulté choisie à l'accueil reste mémorisée, comme le mode de réponse.
(function(){
  let v=null; try{ v=localStorage.getItem("arene.diff"); }catch(e){}
  const r=document.querySelector('input[name="diff"][value="'+(v==="difficile"?"difficile":"facile")+'"]');
  if(r) r.checked=true;
  document.querySelectorAll('input[name="diff"]').forEach(x=>x.addEventListener("change",()=>{
    try{ localStorage.setItem("arene.diff", x.value); }catch(e){}
  }));
})();

// ─── Deuxième temps : que réponds-tu ? ───
// Une fois le piège repéré (ou non), le joueur choisit sa réponse. Le coup de
// massue et l'esquive ferment la discussion ; la question et la reformulation
// l'ouvrent, et le personnage confie un indice de sa motivation cachée.
// En Facile, l'indice est donné même après une mauvaise réponse ; en
// Difficile, il faut le mériter.
const GESTES={
  massue:{l:"🔨 Coup de massue", bon:false, m:"Nommer le sophisme comme on donne un coup ne fait changer personne d'avis : l'autre se sent attaqué et se ferme."},
  esquive:{l:"🙈 Esquive", bon:false, m:"Éviter le conflit garde la paix, mais la discussion n'avance pas."},
  question:{l:"❓ Question ouverte", bon:true, m:"Une question ouverte fait apparaître les raisons de l'autre."},
  reformulation:{l:"🪞 Reformulation", bon:true, m:"Reformuler fidèlement l'idée de l'autre montre que tu l'as écouté : il peut alors entendre ta nuance."},
};
function texteMassue(line){
  const vous=!!(line.dlg&&line.dlg.vous);
  if(line.type==="sain") return vous?"« Vous dites ça pour avoir l'air raisonnable. Je n'en crois pas un mot. »":"« Tu dis ça pour avoir l'air raisonnable. Je n'en crois pas un mot. »";
  const nom=libelle(line.a).l.replace(/^\S+\s/,"");
  if(line.type==="epl") return "« C'est "+({ethos:"de l'ethos",pathos:"du pathos",logos:"du logos"}[line.a])+", ça ne prouve rien ! »";
  return "« "+nom+" ! "+(vous?"Votre":"Ton")+" argument ne vaut rien. »";
}
function renderReponse(line){
  const box=$("dialogue"), foe=line.foe||foeActuel(), d=line.d;
  if(!d){ $("nextbtn").style.display="block"; $("nextbtn").textContent="Réplique suivante ➜"; return; }
  const vous=!!(line.dlg&&line.dlg.vous);
  box.innerHTML="";
  box.hidden=false;
  const h=document.createElement("p"); h.className="qprompt";
  h.textContent="💬 Et maintenant, que réponds-tu à {n} ?".replace("{n}",foe.name);
  box.appendChild(h);
  const grille=document.createElement("div"); grille.className="dgrille";
  const choix=shuffle([
    {g:"massue", t:texteMassue(line)},
    {g:"esquive", t:vous?"« Bon… ne nous fâchons pas. Parlons d'autre chose. »":"« Bon… on ne va pas se fâcher. Parlons d'autre chose. »"},
    {g:"question", t:d.q},
    {g:"reformulation", t:d.r},
  ]);
  choix.forEach(c=>{
    const b=document.createElement("button");
    b.type="button"; b.className="dbtn"; b.dataset.geste=c.g;
    b.textContent=c.t;
    b.onclick=()=>repondre(line,c.g,b);
    grille.appendChild(b);
  });
  box.appendChild(grille);
  const r=document.createElement("div"); r.id="reaction"; r.setAttribute("aria-live","polite"); r.hidden=true;
  box.appendChild(r);
  setTimeout(()=>{ box.scrollIntoView({behavior:"smooth",block:"start"}); const p=grille.querySelector(".dbtn"); if(p) p.focus({preventScroll:true}); },350);
}
function repondre(line,geste,btn){
  const foe=line.foe||foeActuel(), dlg=line.dlg||{}, G=GESTES[geste];
  const max=foeActuel().lines.length;
  bilan[geste]++;
  document.querySelectorAll(".dbtn").forEach(b=>{
    b.disabled=true;
    const g=GESTES[b.dataset.geste];
    const tag=document.createElement("span"); tag.className="dtag"; tag.textContent=g.l;
    b.prepend(tag);
    b.classList.add(b===btn?(g.bon?"good":"bad"):"dim");
  });
  const r=$("reaction"); r.hidden=false; r.className=G.bon?"ok":"ko";
  r.innerHTML="";
  const tete=document.createElement("p"); tete.className="rtete";
  const corps=document.createElement("p"); corps.className="rcorps";
  const lecon=document.createElement("p"); lecon.className="rlecon";
  lecon.textContent=(geste==="reformulation"&&line.type==="sain")?"Reconnaître un bon argument, c'est construire un point d'accord.":G.m;
  if(G.bon){
    ouverture=Math.min(max,ouverture+1);
    tete.textContent=foe.emoji+" "+"{n} s'ouvre un peu :".replace("{n}",foe.name);
    corps.textContent=line.d.k;
    noter(line.d.k,false);
  } else {
    if(geste==="massue") ouverture=Math.max(0,ouverture-1);
    tete.textContent=foe.emoji+" "+(geste==="massue"?dlg.braque:dlg.esquive);
    if(!modeDifficile()){ corps.textContent="Si tu l'avais fait se sentir écouté, tu aurais peut-être entendu : "+line.d.k; noter(line.d.k,true); }
    else corps.textContent="Pas de confidence cette fois : cet indice t'échappe.";
  }
  r.append(tete,corps,lecon);
  updateHP();
  const nb=$("nextbtn");
  nb.style.display="block";
  nb.textContent=(lineIdx+1>=order.length && !revision)?"🔎 Comprendre {n} ➜".replace("{n}",foe.name):"Réplique suivante ➜";
  nb.scrollIntoView({behavior:"smooth",block:"end"});
  nb.focus({preventScroll:true});
}

// ─── Le carnet : ce qu'on a compris de l'autre ───
function noter(k,donne){
  if(carnet.some(c=>c.k===k)) return;
  carnet.push({k:k, donne:donne});
  renderCarnet();
}
function renderCarnet(){
  const box=$("carnet"); if(!box) return;
  const foe=foeActuel();
  box.hidden=!carnet.length || !!revision;
  box.innerHTML="";
  const t=document.createElement("p"); t.className="ctitre";
  t.textContent="📓 Ce que tu as compris de {n}".replace("{n}",foe?foe.name:"");
  const ul=document.createElement("ul");
  carnet.forEach(c=>{ const li=document.createElement("li"); li.textContent=c.k; if(c.donne){ li.className="donne"; li.title="indice donné (en Facile) malgré ta réponse"; } ul.appendChild(li); });
  box.append(t,ul);
}

// ─── Fin du match : comprendre ce qui le motive ───
function renderComprendre(){
  const foe=foeActuel(), dlg=foe.dlg;
  phase="comprendre";
  tourFini=true; cancelAnimationFrame(attaqueRAF); attaqueRAF=null;
  document.querySelector(".bubble").hidden=true; $("piste").hidden=true;
  $("dialogue").hidden=true; $("riposte").style.display="none"; $("nextbtn").style.display="none";
  $("techs").hidden=true;
  $("turn-progress").textContent="Fin de la discussion";
  $("qprompt").textContent="🔎 Au fond, qu'est-ce qui pousse {n} à parler ainsi ?".replace("{n}",foe.name);
  const leurres=modeDifficile()?dlg.leurres:dlg.leurres.slice(0,2);
  const options=shuffle([{id:"vraie", t:dlg.motiv}, ...leurres.map((t,i)=>({id:"leurre"+i, t:t}))]);
  const ansDiv=$("answers"); ansDiv.innerHTML="";
  options.forEach(o=>{
    const b=document.createElement("button");
    b.className="abtn mbtn"; b.dataset.id=o.id; b.textContent=o.t;
    b.onclick=()=>{
      const ok=o.id==="vraie";
      if(ok) bilan.compris++;
      ansDiv.querySelectorAll(".abtn").forEach(x=>{ x.disabled=true; x.classList.add(x.dataset.id==="vraie"?"good":x===b?"bad":"dim"); });
      const rip=$("riposte"); rip.className=ok?"ok":"ko"; rip.style.display="block";
      $("rip-title").textContent=ok?"🤝 Tu as compris {n} !".replace("{n}",foe.name):"🤔 Pas tout à fait…";
      $("rip-expl").innerHTML="";
      const p1=document.createElement("p"); p1.textContent=(ok?"":"En réalité : ")+dlg.motiv;
      const p2=document.createElement("p"); p2.className="rfin"; p2.textContent=ok?dlg.fin:"Relis ton carnet : derrière les arguments, il y a souvent une peur ou un besoin. Les questions ouvertes aident à les entendre.";
      $("rip-expl").append(p1,p2);
      const nb=$("nextbtn"); nb.style.display="block";
      nb.textContent=foeIdx===FOES.length-1?"🏁 Voir le bilan ➜":"Personnage suivant ➜";
      nb.scrollIntoView({behavior:"smooth",block:"end"}); nb.focus({preventScroll:true});
    };
    ansDiv.appendChild(b);
  });
  window.scrollTo({top:0,behavior:"smooth"});
}
