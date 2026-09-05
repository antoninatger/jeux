// Techniques proposées comme réponses (QCM à 4 choix par question)
const TECH = {
  tronq:   {l:"✂️ Axe tronqué", s:"l'axe vertical ne part pas de zéro"},
  cam3d:   {l:"🥧 Camembert 3D", s:"la perspective déforme les parts"},
  double:  {l:"⚖️ Double axe", s:"deux échelles différentes sur un même graphique"},
  picto:   {l:"🧍 Pictogramme mal proportionné", s:"la taille du dessin ne respecte pas les valeurs réelles"},
  omises:  {l:"🕳️ Données omises", s:"des points ou des catégories retirés du graphique"},
  noaxe:   {l:"📏 Barres sans échelle", s:"les hauteurs ne sont pas proportionnelles aux valeurs, aucun axe chiffré"},
  inverse: {l:"🙃 Axe inversé", s:"l'échelle verticale est retournée, une hausse ressemble à une chute"},
  honnete: {l:"✅ Graphique honnête", s:"rien à redire, il respecte les bonnes pratiques"},
};

const QUESTIONS = [
  {img:"images/exemple-graphique-meteo.jpg", cred:"Capture d'un JT météo américain (Fox 8)",
   t:"Ce bulletin météo affiche les températures maximales du lundi au dimanche. Observe bien ce graphique : qu'est-ce qui cloche ?",
   a:"tronq", opts:["cam3d","double","honnete"],
   e:"L'échelle commence à <b>92°</b>, pas à 0° ! Résultat : un écart réel de seulement <b>2 degrés</b> (92° → 94°) fait paraître les barres du jeudi et vendredi presque <b>deux fois plus hautes</b>. C'est l'<b>axe tronqué</b>, le grand classique du bulletin météo qui veut « faire peur »."},

  {img:"images/wiki-axe-tronque.png", cred:"Wikimedia Commons",
   t:"Ces deux graphiques représentent exactement les mêmes données (A = 40, B = 50). Compare-les bien : qu'est-ce qui te frappe ?",
   a:"tronq", opts:["picto","omises","honnete"],
   e:"À gauche, l'axe démarre à <b>35</b> au lieu de 0 : la moindre différence est étirée et paraît énorme. À droite, l'axe part de <b>0</b> et montre le vrai rapport entre A et B. Toujours vérifier le bas de l'échelle avant de juger un écart."},

  {img:"images/wiki-camembert-3d.png", cred:"Wikimedia Commons",
   t:"Regarde bien les parts <b>A</b>, <b>B</b> et <b>C</b> de ce camembert. Fais-tu confiance aux proportions que tu vois ?",
   a:"cam3d", opts:["double","omises","honnete"],
   e:"L'inclinaison 3D grossit artificiellement les parts <b>au premier plan</b> et écrase celles du fond. Résultat : C (au fond) paraît presque aussi grande qu'A (devant), alors qu'elle est <b>deux fois plus petite</b>. Le <b>camembert 3D</b> déforme systématiquement les proportions — méfie-toi de tout graphique « en relief »."},

  {img:"images/wiki-double-axe.png", cred:"Federal Reserve Bank of St. Louis, via Wikimedia Commons",
   t:"Ce graphique compare les dépenses militaires de 6 pays au fil du temps. Observe bien sa construction : quelque chose te paraît-il étrange ?",
   a:"double", opts:["tronq","picto","honnete"],
   e:"Il y a <b>deux échelles verticales différentes</b> : à gauche pour la Chine, la Russie, l'Inde… (0 à 300 milliards), à droite pour les États-Unis (0 à 1000 milliards). En superposant deux échelles sans le préciser clairement, on peut faire paraître deux courbes « proches » alors que les valeurs réelles sont très éloignées. Toujours vérifier s'il y a un axe à gauche <b>et</b> un axe à droite."},

  {img:"images/picto-taille-femmes-hommes.svg", cred:"Illustration du jeu (moyennes indicatives, France)",
   t:"Ce graphique compare la taille moyenne des femmes (165 cm) et des hommes (178 cm) en France. Observe bien les deux silhouettes par rapport à ces chiffres : qu'en penses-tu ?",
   a:"picto", opts:["cam3d","omises","honnete"],
   e:"L'écart réel n'est que de <b>13 cm</b> (165 → 178, soit +8 %) : les deux silhouettes devraient être presque identiques. Ici, la silhouette homme est dessinée près de <b>2 fois plus haute</b> — et comme elle gonfle aussi en largeur, elle occupe près de <b>3 fois la surface</b> ! Les hommes sont visuellement <b>surreprésentés</b>. Un pictogramme honnête garde des dessins <b>proportionnels aux valeurs réelles</b>."},

  {img:"images/wiki-donnees-omises.svg", cred:"Wikimedia Commons",
   t:"Ce graphique montre l'évolution d'une donnée entre 1998 et 2012. Observe bien la courbe et les années affichées : quelque chose te semble-t-il manquant ?",
   a:"omises", opts:["tronq","double","honnete"],
   e:"En <b>retirant certains points ou certaines périodes</b>, on peut lisser une courbe en réalité chaotique, faire disparaître une baisse gênante entre deux pics arrangeants, ou masquer un pic isolé. Les <b>données omises</b> sont difficiles à repérer : le seul réflexe fiable est de se demander « ai-je toute la période, ou seulement des extraits choisis ? »."},

  {img:"images/wiki-graphique-correct.svg", cred:"Wikimedia Commons",
   t:"Ce graphique en barres compare 5 groupes (A à E). Examine-le attentivement : y vois-tu un piège, ou te semble-t-il honnête ?",
   a:"honnete", opts:["tronq","cam3d","picto"],
   e:"Non : c'est un <b>graphique honnête</b>. L'axe part de <b>zéro</b>, il n'y a qu'<b>une seule échelle</b>, pas d'effet 3D qui déforme les proportions, et rien ne semble avoir été retiré. Ce sont exactement les 4 questions à se poser face à n'importe quel graphique : zéro ? une échelle ? pas de 3D ? tout est là ?"},

  {img:"images/sncf-greve-barres.svg", cred:"D'après un communiqué de presse de la SNCF, 4 avril 2018",
   t:"Le nombre de grévistes a-t-il beaucoup diminué, ou juste un peu, entre le 3 et le 4 avril ? Regarde bien comment ces deux barres sont construites.",
   a:"noaxe", opts:["tronq","omises","honnete"],
   e:"L'écart réel n'est que de <b>4,2 points</b> (33,9 % → 29,7 %, soit environ <b>-12 %</b>). Mais la seconde barre est dessinée à peine plus de la <b>moitié</b> de la hauteur de la première, sans aucun axe chiffré pour vérifier. Sans échelle, rien n'oblige les hauteurs des barres à respecter les valeurs réelles — c'est le piège des <b>barres sans échelle</b>."},

  {img:"images/dette-axe-inverse.svg", cred:"Reconstitution pédagogique, données approximatives",
   t:"Que devient la dette publique entre 1997 et 2009 d'après ce graphique ? Regarde bien le sens de l'axe vertical avant de répondre.",
   a:"inverse", opts:["tronq","double","honnete"],
   e:"La dette <b>augmente</b> bien sur toute la période (elle passe d'environ 59 % à 79 % du PIB) — mais l'axe vertical est <b>inversé</b> : les petits pourcentages sont en haut, les grands en bas. Résultat : la courbe semble « plonger », comme une mauvaise nouvelle qui s'effondre, alors qu'elle représente en réalité une hausse. Toujours vérifier dans quel sens se lit l'axe vertical."},

  {img:"images/cinema-internet-tronque.svg", cred:"D'après des données de fréquentation cinéma, ababsurdo.fr",
   t:"Ces deux graphiques montrent exactement les mêmes données de fréquentation des cinémas français entre 2002 et 2007. La démocratisation d'internet a-t-elle eu un effet dramatique sur le cinéma ?",
   a:"tronq", opts:["omises","picto","honnete"],
   e:"À gauche, l'axe ne va que de <b>2,6 à 3,4</b> : la moindre variation devient un « effondrement ». À droite, sur une échelle de <b>0 à 10</b>, on voit que la fréquentation reste en réalité <b>quasi stable</b>. Même écart de données, impression totalement différente selon où commence l'axe."},

  {img:"images/lemonde-disques-legislatives.svg", cred:"D'après une infographie de presse, élections législatives 2012",
   t:"Regarde bien la taille des cercles par rapport aux pourcentages qu'ils représentent. Les proportions te semblent-elles fidèles aux chiffres ?",
   a:"picto", opts:["cam3d","omises","honnete"],
   e:"Le Front de Gauche (6,94 %) et le FN (13,77 %) ont un score environ <b>2 fois</b> plus grand — mais leurs cercles, eux, ont une <b>surface</b> bien plus de 2 fois différente : c'est le <b>rayon</b> du cercle qui a été rendu proportionnel au score, pas sa surface. Comme la surface d'un disque augmente avec le <b>carré</b> du rayon, l'écart visuel est très amplifié par rapport à l'écart réel."},

  {img:"images/budget-asso-camembert3d.svg", cred:"Reconstitution pédagogique, données approximatives",
   t:"Voici la répartition du budget annuel d'une association sportive, présentée par son trésorier lors de l'assemblée générale. Fais-tu confiance aux proportions que tu vois ?",
   a:"cam3d", opts:["double","omises","honnete"],
   e:"L'inclinaison 3D grossit artificiellement la part <b>au premier plan</b> (Salaires, 42 %) et écrase celle du fond (Équipements, 12 %) : leur écart visuel semble plus faible qu'il ne l'est réellement. Le <b>camembert 3D</b> déforme systématiquement les proportions, même quand les chiffres affichés sont exacts."},

  {img:"images/confiance-medias-barres.svg", cred:"Reconstitution pédagogique, données approximatives",
   t:"Ce graphique, publié sur les réseaux sociaux, compare la confiance des Français dans les médias en 2015 et en 2024. La confiance s'est-elle vraiment effondrée à ce point ? Regarde bien comment ces deux barres sont construites.",
   a:"noaxe", opts:["tronq","omises","honnete"],
   e:"L'écart réel n'est que de <b>4 points</b> (48 % → 44 %, soit environ <b>-8 %</b>). Mais la seconde barre est dessinée à moins de la <b>moitié</b> de la hauteur de la première, sans aucun axe chiffré pour vérifier. Sans échelle, rien n'oblige les hauteurs des barres à respecter les valeurs réelles."},

  {img:"images/ca-entreprise-omises.svg", cred:"Reconstitution pédagogique, données approximatives",
   t:"Ce graphique montre le chiffre d'affaires d'une entreprise entre 2016 et 2023, présenté fièrement dans son rapport annuel. Observe bien la courbe et les années affichées : quelque chose te semble-t-il manquant ?",
   a:"omises", opts:["tronq","noaxe","honnete"],
   e:"L'année <b>2020</b> a complètement disparu du graphique : c'est justement celle où le chiffre d'affaires s'est effondré à 41 M€ (contre 69 puis 75 M€ juste avant et après). En retirant ce seul point, l'entreprise transforme une chute brutale en une <b>progression continue</b>. Toujours vérifier que la suite d'années est complète."},

  {img:"images/co2-usine-axe-inverse.svg", cred:"Reconstitution pédagogique, données approximatives",
   t:"Une usine publie ce graphique de ses émissions de CO2 dans son rapport « développement durable ». Que deviennent ses émissions entre 2015 et 2023 ? Regarde bien le sens de l'axe vertical avant de répondre.",
   a:"inverse", opts:["tronq","double","honnete"],
   e:"Les émissions <b>augmentent</b> bien sur toute la période (de 120 à 168 milliers de tonnes, soit <b>+40 %</b>) — mais l'axe vertical est <b>inversé</b> : les petites valeurs sont en haut, les grandes en bas. La courbe semble alors « plonger » comme une bonne nouvelle, alors qu'elle représente une hausse de la pollution. Toujours vérifier dans quel sens se lit l'axe."},

  {img:"images/reseaux-sociaux-double-axe.svg", cred:"Reconstitution pédagogique, données approximatives",
   t:"Un article affirme que ces deux réseaux sociaux connaissent une croissance « comparable » depuis 2019, courbes à l'appui. Regarde bien la construction de ce graphique : quelque chose te paraît-il étrange ?",
   a:"double", opts:["tronq","picto","honnete"],
   e:"Il y a <b>deux échelles verticales différentes</b> : à gauche pour le Réseau A (0 à 60 millions), à droite pour le Réseau B (0 à 600 millions) — dix fois plus grande. Résultat : les deux courbes se superposent presque parfaitement, alors que le Réseau B compte réellement <b>dix fois plus</b> d'utilisateurs que le Réseau A. Toujours vérifier s'il y a un axe à gauche <b>et</b> un axe à droite."},
];

let deck=[],idx=0,score=0,streak=0,best=0,nbOk=0,freeRetryUsed=false;
// E2 : ce que la partie a joué, pour l'écran de fin ColFin — {id, titre, reussi, explication}.
// Identifiant stable d'une question : le chemin de son image (unique, identique en FR et en EN).
const JEU="graphiques-trompeurs";
let joue=[];
function texteBrut(html){ const d=document.createElement("div"); d.innerHTML=String(html).replace(/<br\s*\/?>/gi," "); return d.textContent; }

const $=id=>document.getElementById(id);
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

// ===== Mode expert : détection de la technique par mots-clés =====
const KEYWORDS = {
  tronq:   ["tronque","tronquee","pas a zero","pas a 0","pas de zero","pas de 0","echelle coupee","axe coupe","zoom","manque le zero","manque de zero","commence pas a zero","commence pas a 0"],
  cam3d:   ["camembert","3d","trois dimensions","relief","perspective","profondeur","volume","biais","inclinaison","vu de travers","angle de vue"],
  double:  ["deux echelles","deux axes","double axe","double echelle","echelles differentes","axe a droite","axe de droite","axe secondaire","second axe","pas la meme echelle","echelle differente pour chaque","propre echelle","echelle a gauche","echelle a droite"],
  picto:   ["pictogramme","icone","silhouette","disproportion","surface","grossi","trop grande","trop gros","pas a la bonne taille","mauvaise taille","hauteur et largeur","taille des icones","surrepresent","pas proportionnel","pas a l echelle","exagere"],
  omises:  ["manqu","retir","supprim","enlev","dispar","incomplet","cach","omise","omis","trou dans","pas toutes les"],
  noaxe:   ["sans echelle","pas d echelle","aucune echelle","echelle absente","axe manquant","aucun axe","pas de chiffres sur l axe","pas de chiffre sur l axe","hauteur pas proportionnelle","hauteurs pas proportionnelles","hauteur ne correspond pas","barres ne respectent pas","disproportion des barres"],
  inverse: ["axe inverse","echelle inversee","a l envers","sens inverse","axe retourne","ordre inverse","valeurs inversees","echelle a l envers","haut en bas invers","axe renverse","monte au lieu de descendre","descend au lieu de monter"],
  honnete: ["honnete","rien a redire","pas de piege","aucun piege","fiable","correct","aucun probleme","rien de trompeur","pas trompeur","tout va bien","rien a signaler","semble correct","tout est normal","aucun souci","pas de souci","rien ne cloche","semble fiable","aucune anomalie","tout semble en ordre","ca va","respecte les bonnes pratiques"],
};
function normalize(s){
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9\s]/g," ").replace(/\s+/g," ").trim();
}
// Une mention du zéro de l'axe est toujours un axe tronqué, jamais une donnée
// omise : "manqu" (mot-clé large d'omises) matche aussi "il manque le zéro",
// d'où cette priorité explicite avant le comptage générique.
const ZERO_AXIS_PHRASES=["manque le zero","manque de zero","commence pas a zero","commence pas a 0","pas a zero","pas a 0","pas de zero","pas de 0"];
function detectTech(raw){
  const n=normalize(raw);
  if(ZERO_AXIS_PHRASES.some(p=>n.includes(normalize(p))))return "tronq";
  let bestId=null,bestCount=0,tieCount=0;
  for(const id in KEYWORDS){
    const count=KEYWORDS[id].reduce((acc,k)=>acc+(n.includes(normalize(k))?1:0),0);
    if(count>bestCount){bestId=id;bestCount=count;tieCount=1;}
    else if(count===bestCount && count>0){tieCount++;}
  }
  if(bestCount===0)return null;
  if(tieCount>1)return "__TIE__";
  return bestId;
}

function startGame(sousDeck){
  // E2 : toute la série est jouée à chaque partie ; « rejouer mes erreurs » impose un paquet réduit
  deck=shuffle(sousDeck || [...QUESTIONS]);
  idx=0;score=0;streak=0;best=0;nbOk=0;
  joue=[];
  ColFin.protegerSortie(true);
  $("end").style.display="none";
  // la partie repart sans recharger la page : le HUD repart de zéro lui aussi
  $("score").textContent=0; $("streak").textContent="";
  $("fiches").style.display="none";
  $("intro").style.display="none";
  $("hud").style.display="flex";
  $("game").style.display="block";
  $("qtot").textContent=deck.length;
  renderQ();
}

function renderQ(){
  const it=deck[idx];
  $("qnum").textContent=idx+1;
  $("scase").textContent="Graphique n°"+String(idx+1).padStart(2,"0");
  $("qimg").src=it.img;
  $("qimg").alt="Graphique à analyser";
  $("qcred").textContent="Source : "+it.cred;
  $("stxt").innerHTML=it.t;
  $("feedback").style.display="none";
  $("nextbtn").style.display="none";
  $("freetechs").innerHTML="Rappel des techniques : "+Object.values(TECH).map(t=>t.l).join(" · ");
  $("freehint").textContent="";
  freeRetryUsed=false;
  const ft=$("ftext");
  ft.value="";ft.disabled=false;
  $("fvalidate").disabled=false;
  // Pas d'autofocus sur tactile : le clavier virtuel s'ouvrirait et masquerait le graphique.
  if(!matchMedia("(pointer: coarse)").matches) ft.focus({preventScroll:true});
  $("aidebtn").style.display="block";
  $("aidebtn").disabled=false;
  $("answers").style.display="none";
  const ans=$("answers");ans.innerHTML="";
  const pool=[{...TECH[it.a],ok:true},...it.opts.map(id=>({...TECH[id],ok:false}))];
  const choices=shuffle(pool).map(c=>({label:c.l,sub:c.s,ok:c.ok}));
  choices.forEach(c=>{
    const b=document.createElement("button");
    b.className="abtn";
    b.innerHTML=c.label+(c.sub?`<span class="asub">${c.sub}</span>`:"");
    b.dataset.ok=c.ok?"1":"0";
    b.onclick=()=>answer(it,b);
    ans.appendChild(b);
  });
  window.scrollTo({top:0,behavior:"smooth"});
}

function revealAide(){
  $("answers").style.display="grid";
  $("aidebtn").style.display="none";
}

function applyResult(it,ok,detectedLabel,viaFree){
  joue.push({id:it.img, titre:texteBrut(it.t), reussi:ok, explication:texteBrut(it.e)});
  if(ok){
    nbOk++;
    if(viaFree){
      streak++;best=Math.max(best,streak);
      score+=10+(streak>=3?5:0);
      $("fb-title").textContent=streak>=3?`✔ Bien vu ! Série de ${streak} 🔥 (+15)`:"✔ Bien vu ! (+10)";
    } else {
      streak=0;
      score+=5;
      $("fb-title").textContent="✔ Bien vu (avec l'aide) (+5)";
    }
  } else {
    streak=0;
    $("fb-title").textContent="✘ Pas tout à fait — regarde bien l'explication";
  }
  $("score").textContent=score;
  $("streak").textContent=streak>=2?`🔥 ${streak}`:"";
  const fb=$("feedback");
  fb.className=ok?"ok":"ko";fb.style.display="block";
  let expl=it.e;
  if(!ok && viaFree){
    expl=(detectedLabel?`Ta réponse a surtout évoqué : <b>${detectedLabel}</b>.<br><br>`:`Aucun mot-clé assez précis reconnu dans ta réponse.<br><br>`)+expl;
  }
  $("fb-expl").innerHTML=expl;
  showFixDemo(it);
  $("nextbtn").textContent=idx===deck.length-1?"Voir mon bilan ➜":"Question suivante ➜";
  $("nextbtn").style.display="block";
  $("feedback").scrollIntoView({behavior:"smooth",block:"start"});
}

// ===== Démo "répare le graphique" =====
let currentFix=null,fixBonusGiven=false;

// +5 pts la première fois que le graphique est remis dans un état honnête
function grantFixBonus(){
  if(fixBonusGiven)return false;
  fixBonusGiven=true;
  score+=5;
  $("score").textContent=score;
  return true;
}

// Le verdict n'est donné qu'au clic sur Valider : pendant l'édition, on affiche ce rappel
const FIX_HINT=`🛠️ Modifie le graphique (les valeurs ✏️ sont cliquables) ou écris ta correction, puis clique sur <b>Valider</b> pour vérifier.`;

function showFixDemo(it){
  currentFix=it.a;
  fixBonusGiven=false;
  $("fixdemo").style.display="block";
  $("fixText").value="";
  $("fixInputRow").style.display=it.a==="honnete"?"none":"flex";
  if(it.a==="tronq")initFixTronq();
  else if(it.a==="cam3d")initFixCam3d();
  else if(it.a==="double")initFixDouble();
  else if(it.a==="picto")initFixPicto();
  else if(it.a==="omises")initFixOmises();
  else if(it.a==="noaxe")initFixNoaxe();
  else if(it.a==="inverse")initFixInverse();
  else initFixHonnete();
  if(it.a!=="honnete")$("fixReadout").innerHTML=FIX_HINT;
}

// Utilitaire commun : un nombre affiché, cliquable pour l'éditer sur place
function makeEditableNumber(slotId,value,min,max,onCommit){
  const el=$(slotId);
  el.innerHTML=`<span id="${slotId}-disp" class="fix-axis-editable" tabindex="0">${value}</span>`;
  const disp=$(slotId+"-disp");
  const startEdit=()=>{
    el.innerHTML=`<input type="number" id="${slotId}-input" class="fix-axis-input" min="${min}" max="${max}" value="${value}">`;
    const input=$(slotId+"-input");
    input.focus();input.select();
    let done=false;
    const commit=()=>{
      if(done)return;done=true;
      const v=input.value.trim()===""?value:parseInt(input.value,10);
      onCommit(Number.isFinite(v)?v:value);
    };
    input.addEventListener("blur",commit);
    input.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();commit();}});
  };
  disp.onclick=startEdit;
  disp.onkeydown=e=>{if(e.key==="Enter")startEdit();};
}

function polar(cx,cy,r,angleDeg){
  const a=(angleDeg-90)*Math.PI/180;
  return [cx+r*Math.cos(a),cy+r*Math.sin(a)];
}
function arcPath(cx,cy,r,fromPct,toPct){
  const startAngle=fromPct*360,endAngle=toPct*360;
  const [x1,y1]=polar(cx,cy,r,startAngle),[x2,y2]=polar(cx,cy,r,endAngle);
  const largeArc=(endAngle-startAngle)>180?1:0;
  return `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2} Z`;
}

// --- Axe tronqué (A=40 / B=50), inspiré de wiki-axe-tronque.png ---
const FIX_TRONQ={real:{A:40,B:50},min:0,max:35,init:35,honest:0};
let fixTronqVal=FIX_TRONQ.init;
function initFixTronq(){fixTronqVal=FIX_TRONQ.init;renderFixTronq();}
function renderFixTronq(){
  const {A,B}=FIX_TRONQ.real,max=55,min=fixTronqVal,x0=30,x1=210,y0=150,y1=15;
  const yOf=v=>y0-(v-min)/(max-min)*(y0-y1);
  const barW=44,xA=64,xB=144;
  const svg=`<div class="fix-svg-wrap fix-chart-top"><svg viewBox="0 0 220 170" class="fix-svg">
    <line x1="${x0}" y1="${y1}" x2="${x0}" y2="${y0}" stroke="#888" stroke-width="1.2"/>
    <line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y0}" stroke="#888" stroke-width="1.2"/>
    <text x="${x0-5}" y="${y1+4}" font-size="10" text-anchor="end" fill="#666">${max}</text>
    <text x="${x0-5}" y="${y0+4}" font-size="10" text-anchor="end" fill="#666">${min}</text>
    <rect x="${xA}" y="${yOf(A)}" width="${barW}" height="${y0-yOf(A)}" fill="#5cb85c" stroke="#3d8b3d"/>
    <rect x="${xB}" y="${yOf(B)}" width="${barW}" height="${y0-yOf(B)}" fill="#4a7ebc" stroke="#2c5a8c"/>
    <text x="${xA+barW/2}" y="${y0+18}" font-size="12" text-anchor="middle" fill="#333">A</text>
    <text x="${xB+barW/2}" y="${y0+18}" font-size="12" text-anchor="middle" fill="#333">B</text>
  </svg></div>
  <div class="fix-axis-row">Axe démarre à : <span id="fixParamSlot"></span></div>`;
  $("fixChart").innerHTML=svg;
  makeEditableNumber("fixParamSlot",fixTronqVal,FIX_TRONQ.min,FIX_TRONQ.max,applyFixTronq);
}
function applyFixTronq(v){fixTronqVal=Math.max(FIX_TRONQ.min,Math.min(FIX_TRONQ.max,v));renderFixTronq();$("fixReadout").innerHTML=FIX_HINT;}

// --- Camembert 3D (A=15% / B=30% / C=10% / D=45%), inspiré de wiki-camembert-3d.png ---
const FIX_CAM3D={slices:[{id:"A",from:0,to:.15,color:"#4a90d9"},{id:"B",from:.15,to:.45,color:"#c0504d"},{id:"C",from:.45,to:.55,color:"#9bbb59"},{id:"D",from:.55,to:1,color:"#8064a2"}],min:0,max:100,init:100,honest:0};
let fixCam3dVal=FIX_CAM3D.init;
function initFixCam3d(){fixCam3dVal=FIX_CAM3D.init;renderFixCam3d();}
function renderFixCam3d(){
  const cx=100,cy=85,r=68;
  const squash=1-(fixCam3dVal/100)*0.55;
  const paths=FIX_CAM3D.slices.map(s=>`<path d="${arcPath(cx,cy,r,s.from,s.to)}" fill="${s.color}" stroke="#fff" stroke-width="1.5"/>`).join("");
  // Étiquettes hors du groupe déformé (repositionnées à la main) pour rester lisibles
  const labels=FIX_CAM3D.slices.map(s=>{
    const mid=(s.from+s.to)/2,[lx,ly]=polar(cx,cy,r*0.65,mid*360);
    const lySq=cy+(ly-cy)*squash;
    return `<text x="${lx.toFixed(1)}" y="${(lySq+4).toFixed(1)}" font-size="13" font-weight="700" text-anchor="middle" fill="#fff">${s.id}</text>`;
  }).join("");
  const shadowRy=8+fixCam3dVal*0.12;
  $("fixChart").innerHTML=`<div class="fix-svg-wrap fix-chart-top"><svg viewBox="0 0 200 180" class="fix-svg">
    <ellipse cx="${cx}" cy="${(cy+r*squash+6).toFixed(1)}" rx="${r}" ry="${shadowRy.toFixed(1)}" fill="rgba(0,0,0,.18)"/>
    <g transform="translate(0,${(cy*(1-squash)).toFixed(1)}) scale(1,${squash.toFixed(3)})">${paths}</g>
    ${labels}
  </svg></div>
  <div class="fix-axis-row">Intensité de l'effet 3D : <span id="fixParamSlot"></span> %</div>`;
  makeEditableNumber("fixParamSlot",fixCam3dVal,FIX_CAM3D.min,FIX_CAM3D.max,applyFixCam3d);
}
function applyFixCam3d(v){fixCam3dVal=Math.max(FIX_CAM3D.min,Math.min(FIX_CAM3D.max,v));renderFixCam3d();$("fixReadout").innerHTML=FIX_HINT;}

// --- Double axe (Autres pays / USA), inspiré de wiki-double-axe.png ---
const FIX_DOUBLE={years:[2000,2005,2010,2015,2020],autres:[40,90,140,180,200],us:[100,300,500,650,800],min:200,max:1000,init:300,honest:1000};
let fixDoubleVal=FIX_DOUBLE.init;
function initFixDouble(){fixDoubleVal=FIX_DOUBLE.init;renderFixDouble();}
function renderFixDouble(){
  const {years,autres,us}=FIX_DOUBLE,x0=42,x1=238,y0=140,y1=14;
  const xFor=i=>x0+i*((x1-x0)/(years.length-1));
  const yForAutres=v=>y0-(Math.min(v,fixDoubleVal)/fixDoubleVal)*(y0-y1);
  const yForUS=v=>y0-(v/FIX_DOUBLE.honest)*(y0-y1);
  const ptsA=autres.map((v,i)=>`${xFor(i).toFixed(1)},${yForAutres(v).toFixed(1)}`).join(" ");
  const ptsU=us.map((v,i)=>`${xFor(i).toFixed(1)},${yForUS(v).toFixed(1)}`).join(" ");
  const dotsA=autres.map((v,i)=>`<circle cx="${xFor(i).toFixed(1)}" cy="${yForAutres(v).toFixed(1)}" r="3" fill="#c0504d"/>`).join("");
  const dotsU=us.map((v,i)=>`<circle cx="${xFor(i).toFixed(1)}" cy="${yForUS(v).toFixed(1)}" r="3" fill="#4a7ebc"/>`).join("");
  const yearLabels=years.map((yr,i)=>`<text x="${xFor(i).toFixed(1)}" y="155" font-size="9" text-anchor="middle" fill="#666">${yr}</text>`).join("");
  $("fixChart").innerHTML=`<div class="fix-svg-wrap fix-chart-top"><svg viewBox="0 0 260 170" class="fix-svg">
    <line x1="${x0}" y1="${y1}" x2="${x0}" y2="${y0}" stroke="#c0504d" stroke-width="1.2"/>
    <line x1="${x1}" y1="${y1}" x2="${x1}" y2="${y0}" stroke="#4a7ebc" stroke-width="1.2"/>
    <line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y0}" stroke="#888" stroke-width="1.2"/>
    <text x="${x0-4}" y="${y1+4}" font-size="9" text-anchor="end" fill="#c0504d">${fixDoubleVal}</text>
    <text x="${x0-4}" y="${y0+3}" font-size="9" text-anchor="end" fill="#c0504d">0</text>
    <text x="${x1+4}" y="${y1+4}" font-size="9" text-anchor="start" fill="#4a7ebc">1000</text>
    <text x="${x1+4}" y="${y0+3}" font-size="9" text-anchor="start" fill="#4a7ebc">0</text>
    ${yearLabels}
    <polyline points="${ptsA}" fill="none" stroke="#c0504d" stroke-width="2"/>
    <polyline points="${ptsU}" fill="none" stroke="#4a7ebc" stroke-width="2"/>
    ${dotsA}${dotsU}
  </svg><div class="fix-legend"><span style="color:#c0504d">■ Autres pays</span><span style="color:#4a7ebc">■ USA</span></div></div>
  <div class="fix-axis-row">Échelle « autres pays » (0 à) : <span id="fixParamSlot"></span></div>`;
  makeEditableNumber("fixParamSlot",fixDoubleVal,FIX_DOUBLE.min,FIX_DOUBLE.max,applyFixDouble);
}
function applyFixDouble(v){fixDoubleVal=Math.max(FIX_DOUBLE.min,Math.min(FIX_DOUBLE.max,v));renderFixDouble();$("fixReadout").innerHTML=FIX_HINT;}

// --- Pictogramme (taille moyenne femmes 165 cm / hommes 178 cm, homme dessiné comme pour 280 cm) ---
const FIX_PICTO={min:100,max:300,init:280,honest:178,fem:165};
let fixPictoVal=FIX_PICTO.init;
function initFixPicto(){fixPictoVal=FIX_PICTO.init;renderFixPicto();}
function personIcon(w,h){ // silhouette homme
  return `<svg width="${w}" height="${h}" viewBox="0 0 24 24" preserveAspectRatio="none"><circle cx="12" cy="4.5" r="3.5" fill="#4a7ebc" stroke="#2c5a8c" stroke-width="0.6"/><path d="M12,9 C7.5,9 5.5,13 5.5,17 L5.5,24 L18.5,24 L18.5,17 C18.5,13 16.5,9 12,9 Z" fill="#4a7ebc" stroke="#2c5a8c" stroke-width="0.6"/></svg>`;
}
function womanIcon(w,h){ // silhouette femme
  return `<svg width="${w}" height="${h}" viewBox="0 0 24 24" preserveAspectRatio="none"><circle cx="12" cy="4" r="3.2" fill="#c05a8c" stroke="#8c3a60" stroke-width="0.6"/><path d="M12,7.5 C10.2,7.5 9.2,9 8.7,11 L6.8,17.5 L10.2,17.5 L10.2,24 L13.8,24 L13.8,17.5 L17.2,17.5 L15.3,11 C14.8,9 13.8,7.5 12,7.5 Z" fill="#c05a8c" stroke="#8c3a60" stroke-width="0.6"/></svg>`;
}
function renderFixPicto(){
  const k=0.5,hF=Math.round(FIX_PICTO.fem*k),hH=Math.round(fixPictoVal*k);
  $("fixChart").innerHTML=`<div class="fix-svg-wrap fix-chart-top">
    <div class="fix-picto-row">
      <div class="fix-picto-col">${womanIcon(hF,hF)}<span>♀ Femmes — 165 cm</span></div>
      <div class="fix-picto-col">${personIcon(hH,hH)}<span>♂ Hommes — 178 cm</span></div>
    </div>
  </div>
  <div class="fix-axis-row">Silhouette homme dessinée comme pour (cm) : <span id="fixParamSlot"></span></div>`;
  makeEditableNumber("fixParamSlot",fixPictoVal,FIX_PICTO.min,FIX_PICTO.max,applyFixPicto);
}
function applyFixPicto(v){fixPictoVal=Math.max(FIX_PICTO.min,Math.min(FIX_PICTO.max,v));renderFixPicto();$("fixReadout").innerHTML=FIX_HINT;}

// --- Données omises (1998-2012), inspiré de wiki-donnees-omises.svg (1998 et 2012 manquent dans l'original) ---
const FIX_OMISES={years:[1998,2000,2002,2004,2006,2008,2010,2012],values:{1998:9,2000:4,2002:5,2004:6,2006:7,2008:6.5,2010:8,2012:2},missingInit:[1998,2012]};
let fixOmisesMissing=[];
function initFixOmises(){fixOmisesMissing=[...FIX_OMISES.missingInit];renderFixOmises();}
function renderFixOmises(){
  const {years,values}=FIX_OMISES,x0=30,x1=250,y0=140,y1=15,maxV=10;
  const xFor=i=>x0+i*((x1-x0)/(years.length-1));
  const yFor=v=>y0-(v/maxV)*(y0-y1);
  const present=years.map(y=>!fixOmisesMissing.includes(y));
  let lineSegs="";
  for(let i=0;i<years.length-1;i++){
    if(present[i]&&present[i+1]){
      lineSegs+=`<line x1="${xFor(i).toFixed(1)}" y1="${yFor(values[years[i]]).toFixed(1)}" x2="${xFor(i+1).toFixed(1)}" y2="${yFor(values[years[i+1]]).toFixed(1)}" stroke="#4a7ebc" stroke-width="2"/>`;
    }
  }
  const marks=years.map((y,i)=>{
    const x=xFor(i).toFixed(1);
    if(fixOmisesMissing.includes(y)){
      return `<g onclick="restoreOmisesYear(${y})" style="cursor:pointer;">
        <circle cx="${x}" cy="${(y0-60).toFixed(1)}" r="9" fill="#fff" stroke="#999" stroke-width="1.5" stroke-dasharray="3,2"/>
        <text x="${x}" y="${(y0-56).toFixed(1)}" font-size="12" text-anchor="middle" fill="#999">+</text>
      </g>`;
    }
    return `<circle cx="${x}" cy="${yFor(values[y]).toFixed(1)}" r="4" fill="#4a7ebc" stroke="#2c5a8c" stroke-width="1"/>`;
  }).join("");
  const yearLabels=years.map((y,i)=>`<text x="${xFor(i).toFixed(1)}" y="155" font-size="9" text-anchor="middle" fill="#666">${y}</text>`).join("");
  $("fixChart").innerHTML=`<div class="fix-svg-wrap fix-chart-solo"><svg viewBox="0 0 280 170" class="fix-svg">
    <line x1="${x0}" y1="${y1}" x2="${x0}" y2="${y0}" stroke="#888" stroke-width="1.2"/>
    <line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y0}" stroke="#888" stroke-width="1.2"/>
    ${yearLabels}
    ${lineSegs}
    ${marks}
  </svg></div>`;
}
function restoreOmisesYear(y){fixOmisesMissing=fixOmisesMissing.filter(x=>x!==y);renderFixOmises();$("fixReadout").innerHTML=FIX_HINT;}
function restoreAllOmises(){fixOmisesMissing=[];renderFixOmises();}

// --- Barres sans échelle (grève SNCF, 33,9% / 29,7%) ---
const FIX_NOAXE={realA:33.9,realB:29.7,min:10,max:130,init:59,honest:88};
let fixNoaxeVal=FIX_NOAXE.init;
function initFixNoaxe(){fixNoaxeVal=FIX_NOAXE.init;renderFixNoaxe();}
function renderFixNoaxe(){
  const y0=150,barW=44,xA=60,xB=140,baseH=110;
  const hB=baseH*fixNoaxeVal/100;
  $("fixChart").innerHTML=`<div class="fix-svg-wrap fix-chart-top"><svg viewBox="0 0 220 170" class="fix-svg">
    <rect x="${xA}" y="${(y0-baseH).toFixed(1)}" width="${barW}" height="${baseH}" fill="#1a9e96"/>
    <rect x="${xB}" y="${(y0-hB).toFixed(1)}" width="${barW}" height="${hB.toFixed(1)}" fill="#7b2d8e"/>
    <text x="${xA+barW/2}" y="${(y0-baseH-6).toFixed(1)}" font-size="11" font-weight="800" text-anchor="middle" fill="#1a9e96">33,9 %</text>
    <text x="${xB+barW/2}" y="${(y0-hB-6).toFixed(1)}" font-size="11" font-weight="800" text-anchor="middle" fill="#7b2d8e">29,7 %</text>
    <text x="${xA+barW/2}" y="${y0+14}" font-size="10" text-anchor="middle" fill="#333">03 avril</text>
    <text x="${xB+barW/2}" y="${y0+14}" font-size="10" text-anchor="middle" fill="#333">04 avril</text>
  </svg></div>
  <div class="fix-axis-row">Hauteur de la 2ᵉ barre : <span id="fixParamSlot"></span> % de la 1ʳᵉ</div>`;
  makeEditableNumber("fixParamSlot",fixNoaxeVal,FIX_NOAXE.min,FIX_NOAXE.max,applyFixNoaxe);
}
function applyFixNoaxe(v){fixNoaxeVal=Math.max(FIX_NOAXE.min,Math.min(FIX_NOAXE.max,v));renderFixNoaxe();$("fixReadout").innerHTML=FIX_HINT;}

// --- Axe inversé (dette publique, 1997-2009) ---
const FIX_INVERSE={years:[1997,1999,2001,2003,2005,2007,2009],values:[59.3,58.9,56.9,63.2,66.4,64.2,79.0],min:50,max:80,init:50,honest:80};
let fixInverseVal=FIX_INVERSE.init;
function initFixInverse(){fixInverseVal=FIX_INVERSE.init;renderFixInverse();}
function renderFixInverse(){
  const {years,values}=FIX_INVERSE,x0=40,x1=200,yTop=20,yBottom=130;
  const topVal=fixInverseVal;
  let bottomVal=130-topVal;
  if(bottomVal===topVal)bottomVal+=0.01;
  const yFor=v=>yTop+(v-topVal)/(bottomVal-topVal)*(yBottom-yTop);
  const xFor=i=>x0+i*((x1-x0)/(years.length-1));
  const pts=values.map((v,i)=>`${xFor(i).toFixed(1)},${yFor(v).toFixed(1)}`).join(" ");
  const dots=values.map((v,i)=>`<circle cx="${xFor(i).toFixed(1)}" cy="${yFor(v).toFixed(1)}" r="3" fill="#8c3a38"/>`).join("");
  const yearLabels=years.map((y,i)=>`<text x="${xFor(i).toFixed(1)}" y="${yBottom+14}" font-size="8" text-anchor="middle" fill="#666">${y}</text>`).join("");
  $("fixChart").innerHTML=`<div class="fix-svg-wrap fix-chart-top"><svg viewBox="0 0 220 160" class="fix-svg">
    <line x1="${x0}" y1="${yTop}" x2="${x0}" y2="${yBottom}" stroke="#888" stroke-width="1.2"/>
    <line x1="${x0}" y1="${yBottom}" x2="${x1}" y2="${yBottom}" stroke="#888" stroke-width="1.2"/>
    <text x="${x0-4}" y="${yTop+4}" font-size="9" text-anchor="end" fill="#666">${Math.round(topVal)}%</text>
    <text x="${x0-4}" y="${yBottom+3}" font-size="9" text-anchor="end" fill="#666">${Math.round(bottomVal)}%</text>
    <polyline points="${pts}" fill="none" stroke="#c0504d" stroke-width="2"/>
    ${dots}
    ${yearLabels}
  </svg></div>
  <div class="fix-axis-row">Valeur en haut de l'axe : <span id="fixParamSlot"></span> %</div>`;
  makeEditableNumber("fixParamSlot",Math.round(fixInverseVal),FIX_INVERSE.min,FIX_INVERSE.max,applyFixInverse);
}
function applyFixInverse(v){fixInverseVal=Math.max(FIX_INVERSE.min,Math.min(FIX_INVERSE.max,v));renderFixInverse();$("fixReadout").innerHTML=FIX_HINT;}

// --- Graphique honnête : rien à réparer ---
function initFixHonnete(){
  $("fixChart").innerHTML="";
  $("fixReadout").innerHTML=`🎉 Ce graphique est déjà honnête : axe à zéro, une seule échelle, pas de 3D, rien de manquant. Rien à réparer !`;
}

// Applique la consigne écrite au graphique. Renvoie false si elle n'est pas comprise.
// Les mots-clés passent AVANT l'extraction de chiffres : « enlever la 3D »
// contient un « 3 » qui ne doit pas être pris pour une valeur.
function applyFixText(raw){
  const n=normalize(raw);
  const has=list=>list.some(k=>n.includes(normalize(k)));
  if(currentFix==="tronq"){
    if(has(["zero","commence a 0","part de 0","axe a 0"])){applyFixTronq(0);return true;}
    const m=n.match(/-?\d+/);
    if(m){applyFixTronq(parseInt(m[0],10));return true;}
  } else if(currentFix==="cam3d"){
    if(has(["plat","aplati","2d","sans relief","sans 3d","aucun effet","enlev","retir","supprim","zero","perspective"])){applyFixCam3d(0);return true;}
    const m=n.replace(/3\s*d/g," ").match(/-?\d+/);
    if(m){applyFixCam3d(parseInt(m[0],10));return true;}
  } else if(currentFix==="double"){
    if(has(["meme echelle","fusionner","une seule echelle","echelle unique","echelle commune","identique","harmoniser","aligner","unifier","meme axe"])){applyFixDouble(FIX_DOUBLE.honest);return true;}
    const m=n.match(/-?\d+/);
    if(m){applyFixDouble(parseInt(m[0],10));return true;}
  } else if(currentFix==="picto"){
    if(has(["taille reelle","vraie taille","a l echelle","proportionnel","respect","redui","retreci","plus petit","meme echelle"])){applyFixPicto(FIX_PICTO.honest);return true;}
    const m=n.match(/-?\d+/);
    if(m){applyFixPicto(parseInt(m[0],10));return true;}
  } else if(currentFix==="omises"){
    if(has(["ajout","remettre","toutes les annees","completer","restaurer","reaffich","inclure","1998","2012"])){restoreAllOmises();return true;}
  } else if(currentFix==="noaxe"){
    if(has(["meme hauteur","hauteur reelle","respecte les valeurs","proportionnelle","correspond a l ecart","hauteur proportionnelle"])){applyFixNoaxe(FIX_NOAXE.honest);return true;}
    const m=n.match(/-?\d+/);
    if(m){applyFixNoaxe(parseInt(m[0],10));return true;}
  } else if(currentFix==="inverse"){
    if(has(["remettre a l endroit","sens normal","grandes valeurs en haut","a l endroit","dans le bon sens","remettre dans le bon sens"])){applyFixInverse(FIX_INVERSE.honest);return true;}
    const m=n.match(/-?\d+/);
    if(m){applyFixInverse(parseInt(m[0],10));return true;}
  }
  return false;
}

const FIX_HELP={
  tronq:`Je n'ai pas compris ta consigne. Écris par exemple « mettre l'axe à 0 », ou clique sur la valeur ✏️.`,
  cam3d:`Je n'ai pas compris ta consigne. Écris par exemple « aplatir le camembert » ou « 0% », ou clique sur la valeur ✏️.`,
  double:`Je n'ai pas compris ta consigne. Écris par exemple « mettre la même échelle » ou « 1000 », ou clique sur la valeur ✏️.`,
  picto:`Je n'ai pas compris ta consigne. Écris par exemple « dessine-le à sa vraie taille » ou « 178 », ou clique sur la valeur ✏️.`,
  omises:`Je n'ai pas compris ta consigne. Écris par exemple « ajouter les données manquantes », ou clique sur les « + » du graphique.`,
  noaxe:`Je n'ai pas compris ta consigne. Écris par exemple « mettre la même hauteur proportionnelle » ou « 88 », ou clique sur la valeur ✏️.`,
  inverse:`Je n'ai pas compris ta consigne. Écris par exemple « remettre l'axe à l'endroit » ou « 80 », ou clique sur la valeur ✏️.`,
};

// Verdict sur l'état actuel du graphique (rendu au clic sur Valider)
function fixVerdict(){
  if(currentFix==="tronq"){
    if(fixTronqVal===FIX_TRONQ.honest)return{ok:true,msg:`✔ Réparé ! À <b>0</b>, l'écart visuel colle à l'écart réel : B est <b>25%</b> plus grand que A (40 → 50). C'est ça, un axe honnête !`};
    const ratio=Math.round((FIX_TRONQ.real.B-FIX_TRONQ.real.A)/(FIX_TRONQ.real.A-fixTronqVal)*100);
    return{ok:false,msg:`✘ Pas encore : l'axe démarre à <b>${fixTronqVal}</b>, B paraît <b>${ratio}%</b> plus haut que A alors que l'écart réel n'est que de <b>+25%</b>. Descends l'axe jusqu'à 0.`};
  }
  if(currentFix==="cam3d"){
    if(fixCam3dVal===FIX_CAM3D.honest)return{ok:true,msg:`✔ Réparé ! À plat, les proportions réelles (A 15%, B 30%, C 10%, D 45%) se lisent enfin sans déformation.`};
    return{ok:false,msg:`✘ Pas encore : avec <b>${fixCam3dVal}%</b> d'effet 3D, les tranches restent déformées par la perspective. Descends l'intensité jusqu'à 0.`};
  }
  if(currentFix==="double"){
    if(fixDoubleVal===FIX_DOUBLE.honest)return{ok:true,msg:`✔ Réparé ! Avec la <b>même échelle</b> pour tout le monde (0 à 1000), l'écart réel apparaît : en 2020, les USA (800) dépensent <b>4 fois plus</b> que les autres pays (200).`};
    return{ok:false,msg:`✘ Pas encore : l'échelle « autres pays » est à <b>${fixDoubleVal}</b>, les courbes restent artificiellement proches. Aligne-la sur celle des USA (1000).`};
  }
  if(currentFix==="picto"){
    if(fixPictoVal===FIX_PICTO.honest)return{ok:true,msg:`✔ Réparé ! Dessinées à l'échelle réelle (165 et 178 cm), les deux silhouettes sont presque identiques : l'écart n'est que de <b>13 cm (+8 %)</b>. C'est ça, un pictogramme honnête.`};
    if(fixPictoVal<FIX_PICTO.honest)return{ok:false,msg:`✘ Pas encore : dessinée comme pour <b>${fixPictoVal} cm</b>, la silhouette homme est maintenant <b>sous-représentée</b> (taille réelle : 178 cm) — l'exagération a juste changé de camp !`};
    return{ok:false,msg:`✘ Pas encore : la silhouette homme est dessinée comme s'ils mesuraient <b>${fixPictoVal} cm</b> — les hommes restent visuellement <b>surreprésentés</b> (taille réelle : 178 cm).`};
  }
  if(currentFix==="omises"){
    if(fixOmisesMissing.length===0)return{ok:true,msg:`✔ Réparé ! Avec 1998 et 2012 réaffichés, on voit le vrai pic de départ et la vraie chute finale — le graphique cadrait volontairement sur la partie la plus flatteuse.`};
    return{ok:false,msg:`✘ Pas encore : il manque toujours <b>${fixOmisesMissing.length}</b> année(s). Clique sur les « + » en pointillés ou écris « ajouter les données manquantes ».`};
  }
  if(currentFix==="noaxe"){
    if(Math.abs(fixNoaxeVal-FIX_NOAXE.honest)<=2)return{ok:true,msg:`✔ Réparé ! À <b>${fixNoaxeVal} %</b> de la première barre, la hauteur colle enfin à l'écart réel (29,7 / 33,9 ≈ 88 %).`};
    return{ok:false,msg:`✘ Pas encore : la 2ᵉ barre fait <b>${fixNoaxeVal} %</b> de la hauteur de la première, alors que l'écart réel entre 33,9 % et 29,7 % correspond à environ <b>88 %</b>. Ajuste la hauteur.`};
  }
  if(currentFix==="inverse"){
    if(fixInverseVal>=FIX_INVERSE.honest-2)return{ok:true,msg:`✔ Réparé ! L'axe est maintenant dans le bon sens (grandes valeurs en haut) : on voit clairement que la dette <b>augmente</b> entre 1997 et 2009.`};
    return{ok:false,msg:`✘ Pas encore : avec <b>${Math.round(fixInverseVal)} %</b> en haut de l'axe, l'échelle reste inversée et la hausse ressemble encore à une chute. Monte la valeur du haut jusqu'à 80.`};
  }
  return null;
}

function submitFix(){
  if(currentFix==="honnete")return;
  const raw=$("fixText").value.trim();
  if(raw){
    if(!applyFixText(raw)){
      $("fixReadout").innerHTML=FIX_HELP[currentFix]||"";
      return;
    }
    $("fixText").value="";
  }
  const v=fixVerdict();
  if(!v)return;
  const bonus=v.ok&&grantFixBonus();
  $("fixReadout").innerHTML=v.msg+(bonus?` <b>Bonus réparation : +5 pts 🔧</b>`:"");
}

function answer(it,btn){
  if(btn.disabled)return;
  const ok=btn.dataset.ok==="1";
  document.querySelectorAll(".abtn").forEach(b=>{
    b.disabled=true;b.classList.add("dim");
    if(b.dataset.ok==="1"){b.classList.remove("dim");b.classList.add("good");}
  });
  if(!ok){btn.classList.remove("dim");btn.classList.add("bad");}
  $("ftext").disabled=true;
  $("fvalidate").disabled=true;
  $("aidebtn").style.display="none";
  applyResult(it,ok,null,false);
}

function submitFree(){
  if($("fvalidate").disabled)return;
  const raw=$("ftext").value.trim();
  if(!raw)return;
  const it=deck[idx];
  const detected=detectTech(raw);
  // Réponse inintelligible ≠ mauvaise technique : une reformulation offerte avant de compter faux
  if((detected===null || detected==="__TIE__") && !freeRetryUsed){
    freeRetryUsed=true;
    $("freehint").textContent = detected==="__TIE__"
      ? "🤔 Deux techniques reconnues dans ta réponse — précise laquelle (dernier essai)."
      : "🤔 Aucune technique reconnue dans ta réponse — reformule en nommant une technique (dernier essai).";
    return;
  }
  $("freehint").textContent="";
  const ok=detected===it.a;
  $("ftext").disabled=true;
  $("fvalidate").disabled=true;
  $("aidebtn").style.display="none";
  document.querySelectorAll(".abtn").forEach(b=>{
    b.disabled=true;b.classList.add("dim");
    if(b.dataset.ok==="1"){b.classList.remove("dim");b.classList.add("good");}
  });
  applyResult(it,ok,(detected && detected!=="__TIE__")?TECH[detected].l:null,true);
}

function nextQ(){
  if(idx===deck.length-1){endGame();return;}
  idx++;renderQ();
}

function endGame(){
  $("game").style.display="none";
  $("nextbtn").style.display="none";
  $("hud").style.display="none";
  $("end").style.display="block";
  const ratio=nbOk/deck.length;
  let title,msg;
  if(ratio>=0.9){title="🏆 Œil de statisticien !";msg="Tu repères déjà les pièges classiques du graphique trompeur. Ce réflexe — <b>vérifier l'axe, l'échelle, la 3D et les données manquantes</b> — te servira partout : presse, réseaux, rapports d'entreprise.";}
  else if(ratio>=0.6){title="📊 Bon détecteur de pièges !";msg="Tu en repères déjà pas mal. Le secret : avant de croire un graphique, pose-toi systématiquement les 4 questions des fiches.";}
  else{title="👀 L'œil se forme…";msg="Ces techniques trompent presque tout le monde au premier regard — c'est fait pour ! Va faire un tour dans les fiches, puis rejoue.";}
  if(best>=3)msg+="<br><br>Ta meilleure série : <b>"+best+" 🔥</b>";
  msg+="<br><br>💡 <i>Un graphique peut être 100% exact dans ses chiffres et 100% trompeur dans son dessin.</i>";
  // E2 : titre, score, message, liste des graphiques ratés et boutons sont rendus par ColFin.
  ColFin.rendre({
    jeu: JEU, titre: title, message: score+" pts — "+texteBrut(msg),
    score: nbOk, total: deck.length, items: joue,
    onRejouer: rates => startGame(QUESTIONS.filter(q => rates.some(r => r.id===q.img))),
    onRecommencer: () => startGame()
  });
}

// ===== Fiches anti-pièges =====
const FICHES = [
  {concept:true, icon:"👀", title:"Les 4 réflexes",
   def:"Avant de croire un graphique, pose-toi systématiquement 4 questions : l'axe part-il de <b>zéro</b> ? Y a-t-il <b>une seule échelle</b> ? Y a-t-il un effet de <b>3D</b> qui déforme les proportions ? Manque-t-il des <b>données</b> ?",
   ex:"Un bulletin météo, un graphique boursier, une infographie sur les réseaux : la même grille de lecture s'applique partout.",
   parade:"Prends 5 secondes pour lire les axes AVANT de lire les courbes. C'est là que se cache le piège."},
  {id:"tronq",
   def:"L'axe vertical ne commence pas à <b>zéro</b>, mais juste sous les valeurs les plus basses. Un tout petit écart réel devient visuellement énorme.",
   ex:"Un bulletin météo qui démarre son échelle à 92° fait paraître 2 degrés d'écart comme si la température doublait.",
   parade:"Regarde toujours le premier chiffre en bas de l'axe vertical : est-ce 0, ou un nombre « arrangeant » ?"},
  {id:"cam3d",
   def:"L'inclinaison 3D d'un camembert grossit les parts au <b>premier plan</b> et écrase celles du fond, faussant la perception des proportions.",
   ex:"Une part deux fois plus petite qu'une autre peut paraître presque égale si elle est placée au fond du camembert.",
   parade:"Méfie-toi de tout graphique « en relief » — préfère toujours un camembert ou un barre-graphe à plat."},
  {id:"double",
   def:"Deux courbes sont tracées sur un même graphique, mais avec <b>deux échelles verticales différentes</b> (une à gauche, une à droite), souvent sans que ce soit assez visible.",
   ex:"Un pays semble dépenser « autant » qu'un autre alors que son échelle va jusqu'à 1000 quand celle du voisin s'arrête à 300.",
   parade:"Cherche systématiquement s'il y a un axe à gauche ET un axe à droite du graphique."},
  {id:"picto",
   def:"Un pictogramme (icône, silhouette, pièce de monnaie…) est dessiné <b>plus grand que ne le justifie sa valeur</b> — et comme il gonfle en hauteur ET en largeur, sa surface exagère encore plus l'écart.",
   ex:"Un écart réel de 13 cm entre femmes (165 cm) et hommes (178 cm) paraît énorme si la silhouette homme est dessinée deux fois plus grande.",
   parade:"Compare toujours les chiffres écrits, pas la taille des dessins : le dessin doit rester proportionnel aux valeurs."},
  {id:"omises",
   def:"Certains points, certaines catégories ou certaines périodes sont <b>retirés</b> du graphique, ce qui peut lisser une évolution chaotique ou cacher un événement gênant.",
   ex:"Un graphique qui saute directement de 2008 à 2012 peut faire disparaître une chute survenue entre-temps.",
   parade:"Demande-toi : « Est-ce que j'ai toute la période, toutes les catégories — ou seulement des extraits choisis ? »"},
  {id:"noaxe",
   def:"Des barres sont dessinées <b>sans aucun axe chiffré</b> : rien n'oblige alors leur hauteur à respecter les valeurs réelles qu'elles représentent.",
   ex:"Deux barres représentant 33,9 % et 29,7 % peuvent être dessinées avec un rapport de hauteur bien plus grand que l'écart réel — ou bien plus petit.",
   parade:"Cherche les chiffres sur l'axe vertical. S'il n'y en a pas, la hauteur des barres ne prouve rien : compare uniquement les valeurs écrites."},
  {id:"inverse",
   def:"L'échelle verticale est <b>retournée</b> : les petites valeurs sont en haut, les grandes en bas. Une hausse dessine alors une courbe qui semble plonger.",
   ex:"Un graphique de dette publique qui augmente réellement peut sembler « s'effondrer » si l'axe place 50 % en haut et 80 % en bas.",
   parade:"Avant de lire la forme de la courbe, vérifie le sens de l'axe : est-ce que les grandes valeurs sont bien en haut ?"},
  {id:"honnete",
   def:"Un graphique qui part de zéro, utilise une seule échelle claire, évite les effets de perspective et présente l'intégralité des données n'a rien de trompeur.",
   ex:"Un simple graphique en barres, sans fioriture, reste souvent la façon la plus honnête de présenter des chiffres.",
   parade:"Ne rejette pas un graphique juste parce qu'il est simple : la simplicité est souvent un gage d'honnêteté."},
];

function renderFiches(){
  const g=$("fiches-grid");if(!g||g.childElementCount)return;
  FICHES.forEach(f=>{
    const title=f.concept?(f.icon+" "+f.title):TECH[f.id].l;
    const d=document.createElement("div");
    d.className="fiche"+(f.concept?" concept":"");
    d.innerHTML=`<h3>${title}</h3>`+
      `<p class="f-def">${f.def}</p>`+
      `<p class="f-ex"><span class="f-lab">Exemple</span>${f.ex}</p>`+
      `<div class="f-parade"><span class="f-lab">Le réflexe</span>${f.parade}</div>`;
    g.appendChild(d);
  });
}
function showFiches(){
  renderFiches();
  $("intro").style.display="none";
  $("fiches").style.display="block";
  window.scrollTo({top:0,behavior:"smooth"});
}
function hideFiches(){
  $("fiches").style.display="none";
  $("intro").style.display="block";
  window.scrollTo({top:0,behavior:"smooth"});
}

const ftextEl=$("ftext");
if(ftextEl)ftextEl.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();submitFree();}});
const fixTextEl=$("fixText");
if(fixTextEl)fixTextEl.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();submitFix();}});
