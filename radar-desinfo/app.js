// Chantier 04 : `def` alimente le lexique affiché AVANT la partie. On demandait
// jusqu'ici de choisir parmi 8 catégories qui n'étaient définies nulle part.
const CATS = [
  {id:"fake",  emoji:"🚫", name:"Fake news",            desc:"info fausse pure et dure",
   def:"Une information purement inventée, ou en contradiction avec l'état des connaissances. C'est la forme la plus connue de désinformation… et la plus rare."},
  {id:"ctx",   emoji:"✂️", name:"Décontextualisation",  desc:"vraie info, faux contexte",
   def:"Une information authentique (photo, vidéo, citation) qu'on détache de sa date, de son lieu ou de sa situation d'origine. Rien n'est truqué : c'est le contexte qui ment."},
  {id:"corr",  emoji:"🔗", name:"Corrélation ≠ causalité", desc:"deux faits vrais, lien imaginé",
   def:"Deux faits exacts présentés côte à côte pour suggérer que l'un cause l'autre. Souvent, un troisième facteur caché explique les deux."},
  {id:"astro", emoji:"🤖", name:"Astroturfing",         desc:"faux mouvement populaire",
   def:"Fabriquer l'illusion d'un élan spontané : faux comptes, faux avis, messages payés. On exploite notre réflexe « si tant de gens le disent, c'est sûrement vrai »."},
  {id:"doute", emoji:"🌫️", name:"Fabrique du doute",    desc:"semer la confusion exprès",
   def:"Il ne s'agit pas de convaincre, mais de brouiller. En multipliant les versions contradictoires, on décourage le public de se faire un avis — et on gagne du temps."},
  {id:"mute",  emoji:"🔇", name:"Mute news",            desc:"taire ou noyer une info",
   def:"Désinformer par omission : ne pas traiter un sujet, ou le noyer sous un autre. Aucun mensonge n'est prononcé, mais notre vision du monde est orientée."},
  {id:"cadr",  emoji:"🖼️", name:"Effet de cadrage",     desc:"angle choisi pour orienter",
   def:"La même information vraie, présentée sous un angle qui change ce qu'on ressent : « 64 % gardent leur budget » ou « 36 % doivent le baisser » — même étude."},
  {id:"ok",    emoji:"✅", name:"Info fiable",          desc:"rien à signaler !",
   def:"Tout n'est pas manipulation ! Une info sourcée, recoupée ou issue d'un consensus scientifique peut être surprenante et rester parfaitement fiable."},
];

const ITEMS = [
  {t:"Mai 2022, remaniement ministériel imminent. Un post du journal L'Obs circule sur Twitter : « Manuel Valls nommé Premier ministre ». Le post est authentique… mais il date du 1er avril 2014, jour où Valls a vraiment été nommé.",
   a:"ctx", e:"Le post est <b>vrai</b>, le journal est <b>vrai</b>… mais on a retiré la date. En enlevant le contexte, on désinforme sans fabriquer une seule fausse info."},
  {t:"Une vidéo « filmée en Ukraine » montre des dizaines de cadavres alignés. Au bout de quelques secondes, l'un d'eux se met à bouger. En réalité, la vidéo vient d'Autriche : des manifestants pour le climat simulaient les morts du réchauffement.",
   a:"ctx", e:"La vidéo est authentique, mais on lui a collé un <b>faux contexte</b>. Pas besoin de truquer des images pour tromper : il suffit de mentir sur leur origine."},
  {t:"Sur les réseaux, des centaines de comptes publient au même moment des messages de soutien enthousiastes à un dirigeant. Enquête faite, ce sont des employés payés pour poster.",
   a:"astro", e:"C'est de l'<b>astroturfing</b> : simuler un mouvement populaire spontané. Notre cerveau se dit « si autant de gens sont d'accord, il y a sûrement une raison »… c'est le biais de popularité qui est exploité."},
  {t:"Dès les années 1950, on sait que la cigarette est dangereuse. Pourtant, l'industrie du tabac finance pendant des décennies des études « contradictoires » pour retarder les lois de santé publique.",
   a:"doute", e:"La <b>fabrique du doute</b> : pas besoin de convaincre que la cigarette est saine, il suffit de rendre les gens confus pour gagner du temps. Une technique redoutable, encore utilisée aujourd'hui."},
  {t:"« Un footballeur meurt d'une crise cardiaque trois jours après sa vaccination. » Les deux faits sont exacts et le journal ne dit rien de faux.",
   a:"corr", e:"Deux événements qui se suivent ne sont pas forcément liés : c'est la <b>concomitance</b>. En les collant dans la même phrase, on pousse le lecteur à imaginer un lien de causalité que rien ne prouve."},
  {t:"Un site de presse scientifique titre : « Le jus de citron pourrait aider à guérir le sida ».",
   a:"fake", e:"Une <b>solution trop simple à un problème complexe</b> est généralement fausse. Ça fait 40 ans qu'on cherche un remède : si le citron marchait, ça se saurait. Info en contradiction avec l'état des connaissances = fake news."},
  {t:"Pendant des semaines, l'accident d'une célébrité occupe la quasi-totalité des journaux télévisés. Au même moment, des révoltes historiques secouent l'Iran… et n'apparaissent presque nulle part.",
   a:"mute", e:"La <b>mute news</b> : ne pas (ou peu) parler d'une information, c'est aussi orienter notre vision du monde. Ce n'est pas un mensonge, c'est un choix éditorial — mais il nous impacte."},
  {t:"Journal A : « Malgré la crise, 64 % des Français gardent le même budget de Noël ». Journal B : « À cause de la crise, 36 % des Français doivent baisser leur budget de Noël ». C'est la même étude.",
   a:"cadr", e:"Exactement la même information, présentée à moitié pleine ou à moitié vide : c'est l'<b>effet de cadrage</b>. La manière de présenter une info vraie change ce qu'on ressent face à elle."},
  {t:"Une chaîne TV ne diffuse aucune fausse info sur un vaccin. Mais elle choisit systématiquement les angles inquiétants : « Certains médecins appellent à la prudence… », « Le taux de vaccination décline… »",
   a:"cadr", e:"Aucune fake news, mais une <b>sélection d'angles</b> qui sème le doute. C'est subtil : chaque phrase est vraie, c'est l'accumulation de choix qui désinforme."},
  {t:"« Un inventeur français a créé un moteur à eau, mais les lobbys pétroliers empêchent sa commercialisation ! »",
   a:"fake", e:"On entend parler du moteur à eau tous les deux-trois ans… il ne fonctionne jamais. L'inventeur vend d'ailleurs librement ses moteurs : personne ne l'en « empêche ». La touche complotiste (les lobbys !) sert à expliquer pourquoi la révolution n'arrive jamais."},
  {t:"Plusieurs grands journaux annoncent en même temps l'arrestation de Xavier Dupont de Ligonnès en Écosse. L'information se révèle fausse.",
   a:"fake", e:"Même quand <b>beaucoup de sources</b> en parlent, l'info peut être fausse ! Ici les journaux étaient sincères : on parle alors de <b>mésinformation</b> (partager une fausse info de bonne foi) plutôt que de désinformation."},
  {t:"Pour justifier une invasion, un dirigeant donne des explications multiples et contradictoires : « dénazifier » le pays voisin, lutter contre la « décadence occidentale », se défendre d'une menace…",
   a:"doute", e:"Pas besoin que les gens y croient : il suffit qu'ils soient <b>confus</b>. Des citoyens perdus se désintéressent du conflit et font moins pression sur leurs gouvernements. C'est la fabrique du doute en temps de guerre."},
  {t:"« Les gens qui s'endorment avec leurs chaussures ont plus souvent mal à la tête au réveil. » Conclusion d'un internaute : « les chaussures compriment la circulation sanguine ».",
   a:"corr", e:"L'information de départ est vraie ! Mais la vraie explication, c'est <b>l'alcool</b> : il fait oublier d'enlever ses chaussures ET donne mal à la tête. Corrélation n'est pas causalité."},
  {t:"À l'approche d'une élection américaine, on découvre que les deux camps ont payé des sociétés pour créer de faux comptes « citoyens » qui font campagne en ligne.",
   a:"astro", e:"L'astroturfing n'est pas l'arme d'un seul camp : en 2016, Trump comme Clinton y ont eu recours. D'où l'importance de se méfier des « vagues spontanées » d'opinions identiques en ligne."},
  {t:"Un magazine scientifique rapporte qu'il existe une espèce de méduse biologiquement immortelle, capable de rajeunir indéfiniment.",
   a:"ok", e:"Surprise : c'est <b>vrai</b> ! Turritopsis dohrnii peut inverser son cycle de vie. Leçon : le critère « ça paraît incroyable donc c'est faux » ne marche pas à tous les coups. Tout n'est pas de la désinfo !"},
  {t:"Le GIEC publie un rapport sur le climat, rédigé et relu par des milliers de scientifiques de dizaines de pays, qui confirme le réchauffement d'origine humaine.",
   a:"ok", e:"Le <b>consensus scientifique</b> reste notre meilleur outil : soit des milliers d'experts indépendants mentent tous ensemble, soit l'info est solide. La deuxième option est largement plus probable."},
  {t:"Un président qualifie de « fake news » un article — pourtant exact — montrant que la foule à son investiture était plus petite que celle de son prédécesseur.",
   a:"doute", e:"L'usage politique du mot « fake news » : crier au mensonge face à une <b>vraie info</b> dérangeante. Le but n'est pas de convaincre, mais de semer le doute sur les médias en général. C'est ainsi que Trump a popularisé le terme en 2016."},
  {t:"Vous recevez un email : « Bonjour, je suis Sébastien, 72 ans, gravement malade, et je souhaite vous léguer 3 millions d'euros. »",
   a:"fake", e:"Si une info est <b>trop belle pour être vraie</b>, elle est généralement fausse. C'est une arnaque classique qui joue sur l'espoir… et un bon réflexe d'esprit critique permet de l'éviter."},
  {t:"En 2013, un avion de la Malaysia Airlines (vol MH370) disparaît sans laisser de trace : plusieurs chaînes américaines lui consacrent des dizaines d'heures d'antenne en direct. Au même moment, une guerre civile éclate au Soudan du Sud et fait des milliers de morts… sans qu'aucun flash spécial n'interrompe les programmes.",
   a:"mute", e:"La <b>mute news</b> : ce n'est pas qu'on ment sur le Soudan du Sud, c'est qu'on n'en parle presque pas. Le choix de ce qu'on couvre — et de ce qu'on ignore — façonne autant notre vision du monde qu'un mensonge."},
  {t:"En mars 2020, des photos de rayons de supermarché entièrement vides sont prises pendant les premières heures du confinement. Ces mêmes photos ressurgissent régulièrement depuis, recyclées à chaque nouvelle inquiétude, avec la légende « Pénurie généralisée en France, en ce moment ! ».",
   a:"ctx", e:"Les photos sont <b>authentiques</b>, mais leur date a disparu en chemin. Une image vraie, réutilisée hors de son contexte d'origine, peut désinformer pendant des années après l'évènement réel."},
  {t:"Dans les villes où l'on vend le plus de glaces, on recense aussi davantage de noyades en piscine.",
   a:"corr", e:"Les glaces ne font pas se noyer ! Un <b>facteur caché</b> explique les deux à la fois : la chaleur. Quand il fait chaud, on mange plus de glaces ET on va plus se baigner. Corrélation n'est toujours pas causalité."},
  {t:"En une seule nuit, un petit restaurant de quartier reçoit 200 nouveaux avis 5 étoiles sur une plateforme, tous rédigés dans un français approximatif et publiés à la même heure.",
   a:"astro", e:"Un vrai afflux de clients satisfaits ne se produit pas en une nuit, ni avec un style aussi uniforme : c'est de l'<b>astroturfing</b> commercial — des faux avis achetés en masse pour simuler une popularité qui n'existe pas."},
  {t:"Une étude montre qu'un médicament « double le risque » d'un effet secondaire rare. En réalité, ce risque passe de 1 personne sur 1 million à 2 personnes sur 1 million.",
   a:"cadr", e:"« Doubler un risque » sonne alarmant, alors que le risque réel reste minuscule : c'est l'<b>effet de cadrage</b> version chiffres. Toujours regarder le risque absolu, pas seulement le pourcentage de variation."},
];

let deck=[], idx=0, score=0, lives=3, streak=0, best=0;
// Chantier 04 : mode entraînement — après la perte des 3 vies, le joueur peut
// finir le paquet sans score plutôt que d'être coupé du contenu pédagogique.
let training=false;
const $ = id => document.getElementById(id);

function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

// Lexique des 8 techniques, affiché dans l'intro avant la première dépêche.
function renderLexicon(){
  const box=$("lexlist"); if(!box) return;
  box.innerHTML="";
  CATS.forEach(c=>{
    const d=document.createElement("div");
    d.className="lex";
    d.innerHTML=`<span class="cemoji">${c.emoji}</span><span><span class="lex-name">${c.name}</span><span class="lex-def">${c.def}</span></span>`;
    box.appendChild(d);
  });
}
renderLexicon();

function startGame(){
  deck = shuffle([...ITEMS]).slice(0,12);
  idx=0; score=0; lives=3; streak=0; best=0; training=false;
  $("intro").style.display="none";
  $("hud").style.display="flex";
  $("game").style.display="block";
  $("qtot").textContent=deck.length;
  renderQ();
}

function renderQ(){
  const it = deck[idx];
  $("qnum").textContent=idx+1;
  const h=9+(idx*3)%9, m=(idx*17+7)%60;
  $("wire-time").textContent="N°"+String(idx+1).padStart(3,"0")+" — "+h+"h"+String(m).padStart(2,"0");
  $("dtxt").textContent=it.t;
  $("feedback").style.display="none";
  $("nextbtn").style.display="none";
  $("trainbtn").style.display="none";
  const cats=$("cats"); cats.innerHTML="";
  CATS.forEach(c=>{
    const b=document.createElement("button");
    b.className="cat";
    b.innerHTML=`<span class="cemoji">${c.emoji}</span><span><span class="cname">${c.name}</span><span class="cdesc">${c.desc}</span></span>`;
    b.onclick=()=>answer(c.id,b);
    cats.appendChild(b);
  });
}

function answer(id,btn){
  const it=deck[idx];
  document.querySelectorAll(".cat").forEach(b=>{b.disabled=true; b.classList.add("dim");});
  const ok = id===it.a;
  const goodBtn=[...document.querySelectorAll(".cat")][CATS.findIndex(c=>c.id===it.a)];
  goodBtn.classList.remove("dim"); goodBtn.classList.add("good");
  if(ok){
    // En mode entraînement, plus de score ni de série : on lit, on n'est plus noté.
    if(training){
      $("fb-title").textContent="✔ Bien vu ! (entraînement, sans score)";
    } else {
      streak++; best=Math.max(best,streak);
      score += 10 + (streak>=3?5:0);
      $("fb-title").textContent = streak>=3 ? `✔ Bien vu ! (+15, série de ${streak} 🔥)` : "✔ Bien vu ! (+10)";
    }
  } else {
    btn.classList.remove("dim"); btn.classList.add("bad");
    streak=0;
    if(!training) lives--;
    $("fb-title").textContent="✘ Raté ! La bonne réponse : "+CATS.find(c=>c.id===it.a).name;
  }
  $("lives").textContent = training ? "📚 entraînement" : "❤️".repeat(lives)+"🖤".repeat(3-lives);
  $("score").textContent=score;
  $("streak").textContent = streak>=2 ? `🔥 ${streak}` : "";
  const fb=$("feedback");
  fb.className = ok ? "ok" : "ko";
  fb.style.display="block";
  $("fb-expl").innerHTML=it.e;
  const last = idx===deck.length-1;
  if(gameOver() || last){
    $("nextbtn").textContent = "Voir mon bilan ➜";
    // Chantier 04 : plus de vies mais des dépêches encore à voir → on propose
    // de continuer sans score au lieu de couper l'accès au contenu.
    if(!last) $("trainbtn").style.display="block";
  } else {
    $("nextbtn").textContent = "Dépêche suivante ➜";
  }
  $("nextbtn").style.display="block";
  $("nextbtn").scrollIntoView({behavior:"smooth",block:"end"});
}

function gameOver(){ return lives<=0 && !training; }

function continueTraining(){
  training=true;
  $("trainbtn").style.display="none";
  $("lives").textContent="📚 entraînement";
  nextQ();
}

function nextQ(){
  if(gameOver() || idx===deck.length-1){ endGame(); return; }
  idx++; renderQ();
  window.scrollTo({top:0,behavior:"smooth"});
}

// Chantier 04 : les dépêches jamais atteintes, avec leur technique et leur
// explication. Sans ça, une partie perdue au bout de 4 dépêches masquait
// définitivement les deux tiers du contenu pédagogique.
function renderRecap(){
  const box=$("recap"); if(!box) return;
  box.innerHTML="";
  const restants = deck.slice(idx+1);
  if(!restants.length) return;
  const h=document.createElement("h3");
  h.textContent="📂 Les "+restants.length+" dépêche"+(restants.length>1?"s":"")+" que tu n'as pas vue"+(restants.length>1?"s":"");
  box.appendChild(h);
  restants.forEach(it=>{
    const cat=CATS.find(c=>c.id===it.a);
    const d=document.createElement("div");
    d.className="rc";
    const t=document.createElement("p"); t.className="rc-t"; t.textContent=it.t;
    const a=document.createElement("p"); a.className="rc-a"; a.textContent=cat.emoji+" "+cat.name;
    const e=document.createElement("p"); e.className="rc-e"; e.innerHTML=it.e;
    d.appendChild(t); d.appendChild(a); d.appendChild(e);
    box.appendChild(d);
  });
}

function endGame(){
  $("game").style.display="none";
  $("nextbtn").style.display="none";
  $("trainbtn").style.display="none";
  $("hud").style.display="none";
  $("end").style.display="block";
  $("end-score").textContent=score+" pts";
  renderRecap();
  const ratio = score/(deck.length*10);
  let title,msg;
  if(training){ title="📚 Fin du parcours"; msg="Tu as terminé le paquet en entraînement, sans score. L'essentiel est ailleurs : chaque dépêche t'a montré une technique. Rejoue pour te noter."; }
  else if(lives<=0){ title="📡 Radar grillé…"; msg="Tu as épuisé tes 3 vies. La désinformation est subtile : lis les dépêches que tu n'as pas vues ci-dessous, puis rejoue pour affûter ton radar !"; }
  else if(ratio>=0.9){ title="🏆 Fact-checker d'élite !"; msg="Presque rien ne t'échappe. Tu as compris que la fake news n'est que l'arbre qui cache la forêt."; }
  else if(ratio>=0.6){ title="🕵️ Bon enquêteur !"; msg="Tu repères déjà bien les techniques. Souviens-toi : décontextualiser, cadrer, taire une info… on peut désinformer sans mentir."; }
  else { title="🔍 Apprenti radar"; msg="C'est un bon début ! Les techniques sont nombreuses : décontextualisation, astroturfing, fabrique du doute, mute news, cadrage… Rejoue pour les ancrer."; }
  if(best>=5 && lives>0) msg += " Ta meilleure série : "+best+" 🔥";
  $("end-title").textContent=title;
  $("end-msg").textContent=msg;
}
