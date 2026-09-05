// Each level: one anxiety-inducing headline, sources, 3 rewrite slots.
// Option: t = text, emo / prec = effect on the gauges (hidden until publication!), trap = contradicts the sources (explained in why)
// Each slot also contains an option that makes the drama stronger than the original.
const LEVELS = [
 {
  orig:"CRISIS ALERT: French people FORCED to SACRIFICE Christmas! 😱",
  sources:[
   {icon:"📊", name:"The original survey", body:"Online survey, 1,012 people: 64% of French people plan to keep the same Christmas budget as last year, 36% plan to reduce it. Almost nobody plans to increase it."},
   {icon:"🎓", name:"An economist's analysis", body:"« A stable majority of French people are maintaining their budget despite inflation. The share of those reducing it has risen slightly: 32% last year, 36% this year. »"},
  ],
  slots:[
   {name:"The headline opener", opts:[
    {t:"CRISIS ALERT:", emo:35, prec:0},
    {t:"IT'S OFFICIAL, Christmas is RUINED:", emo:40, prec:0},
    {t:"Christmas in danger:", emo:25, prec:5},
    {t:"According to a survey of 1,012 people,", emo:0, prec:30},
   ]},
   {name:"The fact", opts:[
    {t:"French people are sacrificing Christmas", emo:30, prec:0},
    {t:"three quarters of French people are reducing their Christmas budget", emo:15, prec:25, trap:"Read the survey again: it says 36% are reducing their budget, not 75%! A precise but false number is worse than a vague headline: it looks like information."},
    {t:"MILLIONS of families deprived of celebrations", emo:40, prec:0},
    {t:"64% of French people plan to keep their Christmas budget stable, while 36% plan to reduce it", emo:0, prec:40},
   ]},
   {name:"The ending", opts:[
    {t:"— UNPRECEDENTED!", emo:30, prec:0},
    {t:".", emo:0, prec:10},
    {t:"— prepare for the WORST! ⚠️", emo:40, prec:0},
    {t:", a slightly higher share than last year.", emo:5, prec:30},
   ]},
  ],
  lesson:"This is the <b>Christmas budget</b> example: « 64% maintain it » or « 36% reduce it » comes from the <b>same study</b>. The glass half full or half empty: that is the framing effect. By citing both figures and the source, you inform instead of frightening people."
 },
 {
  orig:"A 24-year-old footballer DIES suddenly 3 days after his VACCINE 💉☠️",
  sources:[
   {icon:"🏥", name:"The medical report", body:"The autopsy reveals an undetected congenital heart defect. There is no evidence establishing a link with vaccination."},
   {icon:"📚", name:"Historical data", body:"Cardiac arrests among young athletes have always existed: about 1 case per 50,000 athletes per year, a figure that has remained stable for twenty years, before and after vaccination campaigns."},
  ],
  slots:[
   {name:"The headline opener", opts:[
    {t:"TRAGIC:", emo:30, prec:0},
    {t:"What the media are HIDING from you:", emo:35, prec:0},
    {t:"☠️ Silent MASSACRE:", emo:40, prec:0},
    {t:"According to the autopsy report,", emo:0, prec:30},
   ]},
   {name:"The fact", opts:[
    {t:"a footballer dies because of the vaccine", emo:30, prec:10, trap:"The medical report says exactly the opposite: congenital defect, no established link with the vaccine. Claiming a cause without evidence means turning correlation into causation."},
    {t:"a 24-year-old footballer dies suddenly after his vaccine", emo:25, prec:5},
    {t:"a young champion STRUCK DOWN in his prime", emo:35, prec:0},
    {t:"a 24-year-old footballer died from an undetected heart defect", emo:0, prec:35},
   ]},
   {name:"The ending", opts:[
    {t:"Coincidence?? 🤔", emo:30, prec:0},
    {t:".", emo:0, prec:10},
    {t:"Who will be NEXT?!", emo:40, prec:0},
    {t:", a type of incident whose frequency has been stable for twenty years.", emo:0, prec:30},
   ]},
  ],
  lesson:"Putting « dies » and « vaccine » in the same sentence pushes the reader to imagine <b>causation</b> from a simple <b>coincidence in timing</b> — without writing a single false word. The context (real cause + stable frequency) defuses the trap."
 },
 {
  orig:"This FRENCH genius invents the WATER ENGINE… oil companies want to SILENCE him!",
  sources:[
   {icon:"🔬", name:"A physicist", body:"« Water is not a fuel: separating hydrogen from water uses more energy than you recover by burning it. No “water engine” has ever passed an independent test. »"},
   {icon:"🗞️", name:"Press archives", body:"The same inventor has been freely selling his kits for fifteen years: nobody is “stopping” him from selling. A “water engine” story resurfaces every two or three years and has done so for decades. No independent validation has been published."},
  ],
  slots:[
   {name:"The headline opener", opts:[
    {t:"REVOLUTION:", emo:30, prec:0},
    {t:"Buried scandal:", emo:35, prec:0},
    {t:"THE SCOOP OF THE CENTURY 🚨:", emo:40, prec:0},
    {t:"An inventor claims", emo:0, prec:30},
   ]},
   {name:"The fact", opts:[
    {t:"the water engine that will change everything is finally here", emo:25, prec:0},
    {t:"to have developed a water engine", emo:5, prec:25},
    {t:"to have developed a water engine validated by researchers", emo:5, prec:20, trap:"Validated by whom? The sources are clear: no independent test, ever. Inventing scientific validation would make your headline more credible… and completely false."},
    {t:"the MIRACLE invention that will make petrol OBSOLETE", emo:35, prec:0},
   ]},
   {name:"The ending", opts:[
    {t:"— oil lobbies are PANICKING!", emo:35, prec:0},
    {t:"— THEY will not be able to hide it much longer!!", emo:40, prec:0},
    {t:", but no independent test has confirmed that it works so far.", emo:0, prec:35},
    {t:".", emo:0, prec:10},
   ]},
  ],
  lesson:"The <b>water engine</b> comes back every two or three years… and never works. The conspiracy touch (« oil companies want to silence him ») explains why the revolution never arrives. The verb « claims » + the lack of validation: that is honest information."
 },
 {
  orig:"AI will DESTROY half of your JOBS by 2030! 🤖🔥",
  sources:[
   {icon:"📄", name:"The original study", body:"The study estimates that 30 to 50% of the TASKS in some jobs could be automated by 2030 — not the jobs themselves. It gives no figure for job losses and stresses a high level of uncertainty."},
   {icon:"🎓", name:"A labour economist", body:"« Previous waves of technology transformed jobs more than they eliminated them. New jobs appear. The uncertainty range is enormous. »"},
  ],
  slots:[
   {name:"The headline opener", opts:[
    {t:"PANIC:", emo:30, prec:0},
    {t:"THE END OF HUMAN WORK:", emo:40, prec:0},
    {t:"It is confirmed:", emo:25, prec:5},
    {t:"According to a study,", emo:0, prec:30},
   ]},
   {name:"The fact", opts:[
    {t:"AI will destroy one job in two", emo:30, prec:10, trap:"The study talks about 30 to 50% of automatable TASKS, not jobs destroyed! Slipping from “tasks” to “jobs” is the shortcut that turns a nuanced study into a disaster headline."},
    {t:"robots are going to replace ALL of us, it's MATHEMATICAL", emo:40, prec:0},
    {t:"AI could automate part of the tasks in many jobs", emo:0, prec:35},
    {t:"AI threatens your jobs", emo:25, prec:0},
   ]},
   {name:"The ending", opts:[
    {t:"by 2030. Prepare for the WORST.", emo:30, prec:0},
    {t:"by 2030. Every person for themselves. 🤖💀", emo:40, prec:0},
    {t:"by 2030, with a still very wide range of uncertainty.", emo:0, prec:30},
    {t:"by 2030.", emo:0, prec:10},
   ]},
  ],
  lesson:"Many anxiety-inducing headlines come from a <b>shift in wording</b>: the study says « automatable tasks », the headline says « destroyed jobs ». Always ask: <b>what does the source say exactly?</b>"
 },
 {
  orig:"The MIRACLE cure Big Pharma is HIDING from you: lemon could KILL cancer! 🍋",
  sources:[
   {icon:"🎗️", name:"An oncologist", body:"« No clinical study shows that lemon has any effect against cancer. If a simple solution to a complex problem seems too good to be true… it usually is. »"},
   {icon:"🔎", name:"A fact-check", body:"The rumour has been circulating since 2011, starting from a viral email attributed to a “research institute”… that does not exist."},
  ],
  slots:[
   {name:"The headline opener", opts:[
    {t:"INCREDIBLE:", emo:30, prec:0},
    {t:"They don't want you to know this:", emo:35, prec:0},
    {t:"ABSOLUTE MIRACLE 🍋:", emo:40, prec:0},
    {t:"Contrary to a viral rumour,", emo:0, prec:30},
   ]},
   {name:"The fact", opts:[
    {t:"lemon kills cancer cells", emo:25, prec:10, trap:"No clinical study shows that, says the oncologist. The rumour comes from a viral email citing an institute… that does not exist. Claiming the effect means repeating the fake news."},
    {t:"the fruit that silently CRUSHES the disease", emo:35, prec:0},
    {t:"lemon, a hope against cancer?", emo:20, prec:5},
    {t:"no study shows that lemon has any effect against cancer", emo:0, prec:35},
   ]},
   {name:"The ending", opts:[
    {t:"Big Pharma is TREMBLING.", emo:35, prec:0},
    {t:"Share QUICKLY, before CENSORSHIP!! 🔒", emo:40, prec:0},
    {t:", oncologists remind us.", emo:0, prec:30},
    {t:".", emo:0, prec:10},
   ]},
  ],
  lesson:"A <b>too-simple solution to a complex problem</b> is usually false — researchers have been looking for treatments for decades. And a question mark (« a hope…? ») is not enough: it leaves doubt hanging without informing."
 },
 {
  orig:"Violence EXPLOSION: assaults JUMP by 20%! 🚨",
  sources:[
   {icon:"📊", name:"Official figures", body:"Recorded reports increased by 20% this year. The report states that the introduction of online complaints made reporting much easier."},
   {icon:"🎓", name:"A sociologist", body:"« An increase in recorded figures can reflect an increase in incidents… or an increase in reporting. Victimisation surveys, however, have been stable for ten years. »"},
  ],
  slots:[
   {name:"The headline opener", opts:[
    {t:"Violence EXPLOSION:", emo:35, prec:0},
    {t:"CIVIL WAR approaching:", emo:40, prec:0},
    {t:"Runaway insecurity:", emo:30, prec:0},
    {t:"According to official figures,", emo:0, prec:30},
   ]},
   {name:"The fact", opts:[
    {t:"assaults jump by 20%", emo:25, prec:5, trap:"Crucial nuance: it is RECORDED REPORTS that increased by 20%, not necessarily assaults. The sociologist says it: victimisation surveys are stable. Confusing the two is the classic trap of crime statistics."},
    {t:"violence is devouring the entire country", emo:40, prec:0},
    {t:"reports of assault increased by 20%", emo:0, prec:30},
    {t:"the country is sinking into chaos", emo:35, prec:0},
   ]},
   {name:"The ending", opts:[
    {t:"No one is safe anymore.", emo:35, prec:0},
    {t:"Barricade yourselves. 🚨🚨", emo:40, prec:0},
    {t:", an increase partly linked to the new online complaint system, according to the report.", emo:0, prec:35},
    {t:".", emo:0, prec:10},
   ]},
  ],
  lesson:"« The numbers speak for themselves »? Never! A <b>recorded</b> number is not the same as a <b>real</b> event: if complaints are made easier, the figures rise even when violence is stable. That is the gap between <b>reports</b> and <b>reality</b>."
 },
 {
  orig:"On sick leave for 17 years, she was paid nearly €6,000 a month: the teacher refuses to retire so she doesn't lose income",
  sources:[
   {icon:"🌍", name:"The full article", body:"This story takes place in Wesel, Germany (North Rhine-Westphalia) — never in France. The teacher, 62, originally from Duisburg, worked at a vocational school from 2003 to 2009, then went on sick leave for mental health reasons until 2026. As a German civil servant, she kept receiving a salary between €5,051 and €6,174 a month throughout that leave."},
   {icon:"⚖️", name:"What happened next", body:"In late May, the Düsseldorf district government forcibly retired her after a medical exam concluded she would not be able to return to work. She now loses €1,500 to €2,000 a month — and is challenging the decision in court to recover her full salary. She is also accused of having worked as a naturopath during her sick leave."},
  ],
  slots:[
   {name:"The place (often left out)", opts:[
    {t:"In France, as usual:", emo:20, prec:0, trap:"Read the sources again: this story takes place in Wesel, Germany — never in France. Stating a country without checking is the classic starting point of a rumour that spirals online."},
    {t:"A chilling case:", emo:15, prec:0},
    {t:"Happening here too?", emo:30, prec:0},
    {t:"In Germany,", emo:0, prec:35},
   ]},
   {name:"The fact", opts:[
    {t:"a teacher was paid nearly €6,000 a month without working for 17 years", emo:20, prec:10},
    {t:"the system pays civil servants to do nothing for seventeen years", emo:35, prec:0},
    {t:"a civil servant kept her full salary without ever setting foot back in a classroom", emo:30, prec:5},
    {t:"a 62-year-old German teacher kept receiving her salary through 17 years of sick leave for mental health reasons", emo:0, prec:40},
   ]},
   {name:"The ending", opts:[
    {t:": she now refuses to retire so she doesn't lose money.", emo:25, prec:5},
    {t:": a symbol of total laxity in public administration.", emo:35, prec:0},
    {t:", and is challenging in court the forced retirement decided by the German authorities.", emo:0, prec:35},
    {t:".", emo:0, prec:10},
   ]},
  ],
  lesson:"The original headline <b>never says where</b> this happened — many readers assumed it was France and got angry at « their » civil servants. It actually all took place in Wesel, <b>Germany</b>, under a different civil-service status and pension rules than at home. Habit worth keeping: when a headline stays vague about the place, look it up before getting outraged — or sharing."
 },
 {
  orig:"After twenty drownings this summer, the Chalvres swimming pool is CLOSING: 2,000 schoolchildren directly affected",
  img:"depositphotos_12716878-stock-photo-swimming-pool.jpg",
  imgAlt:"Underwater view of an empty swimming pool: lane ropes, blue tiles, the surface seen from below.",
  imgCap:"The Chalvres swimming pool. Stock photo.",
  sources:[
   {icon:"📰", name:"The article in Le Courrier de la Brie", body:"The regional daily runs the headline « After twenty drownings this summer, the Chalvres swimming pool is closing: 2,000 schoolchildren directly affected ». The body of the article, however, states that the closure was voted on 6 February — before the summer — because the pool, built in 1974, leaks 40 m³ of water a day and bringing it up to standard is costed at €4.8 million. The 2,000 pupils of fourteen schools will lose their « learn to swim » slot."},
   {icon:"📋", name:"The prefecture's summer report", body:"Twenty drownings were recorded across the département between 1 June and 31 August: sixteen in rivers, canals or lakes, three in private pools, one in a garden paddling pool. None in a municipal swimming pool."},
   {icon:"🏊", name:"An official of the swimming federation", body:"« One child in two starts secondary school unable to swim properly. Removing a school learn-to-swim slot mechanically means children who will swim less well in ten years. There is a link between this pool and drownings — but it runs the other way, and it lies ahead of us, not behind. »"},
  ],
  slots:[
   {name:"The lead (the implied link)", opts:[
    {t:"After twenty drownings this summer,", emo:30, prec:0, trap:"This is the whole trap of the headline. The prefecture's report is unambiguous: none of the twenty drownings happened in a municipal pool, and the closure was voted on 6 February, before the summer. The single word « after » is enough to suggest cause and effect between two facts that have none."},
    {t:"CARNAGE across the département:", emo:40, prec:0},
    {t:"Twenty drownings, and now this:", emo:35, prec:0},
    {t:"For want of repair funding,", emo:0, prec:30},
   ]},
   {name:"The fact", opts:[
    {t:"the Chalvres swimming pool is closing its doors", emo:20, prec:5},
    {t:"twenty children drowned and they are closing the pool anyway", emo:40, prec:10, trap:"Two inventions in a single sentence: the prefecture's report never says the twenty people who drowned were children, and « anyway » assumes a link between the drownings and the closure. Adding a word that appears in no source means manufacturing information."},
    {t:"the Chalvres swimming pool will close on 31 December, a 1974 pool whose renovation is costed at €4.8 million", emo:0, prec:40},
    {t:"our children's safety is being SACRIFICED", emo:40, prec:0},
   ]},
   {name:"The ending", opts:[
    {t:": 2,000 schoolchildren directly affected", emo:25, prec:5},
    {t:": when is the next tragedy?!", emo:40, prec:0},
    {t:": 2,000 pupils from fourteen schools will lose their learn-to-swim slot, with no replacement announced.", emo:0, prec:35},
    {t:".", emo:0, prec:10},
   ]},
  ],
  lesson:"Two true facts — twenty drownings across the département, a swimming pool closing — have <b>nothing to do with each other</b> here: the drownings happened in rivers and lakes, and the closure was voted in February, before the summer. It is the little word « <b>after</b> » that manufactures the link: reality did not put it there, the sentence did. Worse still: the only real link runs the <b>other way</b> — it is the closure that, by removing swimming lessons, could produce drownings ten years from now. And look at the photo: an empty pool, shot from underwater. It shows <b>nothing</b> of the information — it is not even the Chalvres pool, it is a stock image. It does not supply a fact, it supplies a <b>mood</b>: the water becomes the threat. Habit worth keeping: when a headline puts two facts side by side, ask yourself <b>who linked them: the facts, or the sentence?</b>"
 },
 {
  orig:"🌍 Nasa has unveiled the latest real shape of the Earth. This mathematical model, called the geoid, is based on more than a billion observations collected over 15 years by 19 satellites.",
  video:"geoide-nasa.mp4",
  img:"geoide-nasa.jpg",
  imgAlt:"Silent video: the Earth, rendered in 3D from the geoid model, slowly rotates on itself. It is a lumpy sphere, hollowed out in blue south of India, bulging orange towards Indonesia, with country borders drawn over it. Under the globe, a colour scale graduated from −80 to +80 metres and labelled « Geoid Height (10,000x exaggeration) » stays on screen from beginning to end.",
  imgCap:"The video released by Nasa, shared as it is by franceinfo on 31 August 2026. The caption never leaves the screen: « Geoid Height (10,000x exaggeration) ».",
  sources:[
   {icon:"🛰️", name:"Nasa’s own page", body:"The visualisation is titled « The Geoid ». The geoid is not the Earth’s relief: it is the shape the surface of the oceans would take under the effect of gravity alone. The page states that in the animation, the height of the geoid is greatly exaggerated, by a factor of 10,000. An earlier version shows the same geoid at true scale: what you see is a sphere. Published on 15 July 2026, from the GOCO06s model — GRACE (Nasa) and GOCE (European Space Agency) satellites: more than a billion observations, 15 years, 19 satellites."},
   {icon:"📏", name:"Orders of magnitude", body:"From the lowest point of the geoid (about −106 m, south of India) to the highest (about +85 m, near Iceland), the total spread is 191 m — on an Earth radius of 6,371 km, that is 0.003%. The flattening of the Earth at the poles, by comparison, reaches 21 km: a hundred times more. Multiplied by 10,000, those 100 m become 1,000 km on screen. Hence the potato."},
   {icon:"🧭", name:"A geodesist", body:"« The geoid is the zero of altitudes: the reference surface from which we measure the height of a mountain or the level of the sea. It shows no relief at all — neither Everest nor the Mariana Trench appears on it. And there is nothing new about it: GRACE dates from 2002, GOCE from 2009, the GOCO06s model from 2019. Nasa published a picture, not a discovery. »"},
  ],
  slots:[
   {name:"The announcement", opts:[
    {t:"🌍 Nasa has unveiled the latest real shape of the Earth:", emo:20, prec:5, trap:"It is the word « real » that tips everything over. Nasa’s page is explicit: the geoid is not the shape of the Earth, it is a reference surface tied to gravity, and its heights are exaggerated 10,000 times. Everything else in your post may be accurate — that one word is false."},
    {t:"🥔 THE EARTH IS NOT ROUND, and Nasa finally admits it:", emo:40, prec:0},
    {t:"What Nasa has just revealed about our planet will surprise you:", emo:35, prec:0},
    {t:"🌍 Nasa has published a visualisation of the Earth’s geoid:", emo:0, prec:30},
   ]},
   {name:"What the picture shows", opts:[
    {t:"our planet actually looks like a potato", emo:25, prec:0, trap:"Read the sources again: what you are looking at is not the planet, it is its gravity field, with the heights multiplied by 10,000. At true scale, the very same data gives a sphere. Describing the picture as if it were the Earth repeats the mistake instead of reporting the information."},
    {t:"a DEFORMED planet nobody had ever shown you", emo:40, prec:0},
    {t:"a mathematical model built from a billion observations, collected over 15 years by 19 satellites", emo:0, prec:25},
    {t:"a map of the variations in gravity, whose dips and bumps are exaggerated 10,000 times to be visible at all", emo:0, prec:40},
   ]},
   {name:"The sign-off", opts:[
    {t:"— never seen before! 😱", emo:35, prec:0},
    {t:".", emo:0, prec:10},
    {t:"— and nobody is talking about it.", emo:40, prec:0},
    {t:". At true scale, the geoid’s ups and downs (191 m at most, on a radius of 6,371 km) are invisible: the Earth remains a sphere, very slightly flattened at the poles.", emo:0, prec:35},
   ]},
  ],
  lesson:"This post is real: published on 31 August 2026 by the X account of <b>franceinfo</b>, and seen 161,000 times. And it is almost entirely accurate: the geoid exists, the billion observations, the 15 years, the 19 satellites — all of it is on Nasa’s page. <b>One single word is false</b> — « real » — and it is enough to turn the information upside down. The post even contradicts itself in two sentences: « real shape », then « mathematical model ». A model is not a photograph: here the heights are exaggerated <b>10,000 times</b>, and at true scale the same data gives… a sphere. Most striking of all: the scale was <b>written in the video</b> — « Geoid Height (10,000x exaggeration) », spelled out under the globe, on screen without a break for the whole 43 seconds of the post. Beware too of the <b>credibility effect</b> of numbers: « 1 billion observations, 15 years, 19 satellites » are exact, and it is precisely their precision that makes the one false sentence believable. Reflex to keep: faced with a scientific image or video, look for the <b>scale</b> before sharing — it is often written on it, and always on the original page. Here it was not the journalists who corrected it, but readers: a context note was added under the post."
 },
];

const EMO_MAX=30, PREC_MIN=70;
let lvl=0, sel=[], attempts=0, stars=0, solved=false, optBtns=[], levelResults=[];
// E2 : DECK est la liste des unes de la partie en cours — toutes (LEVELS), ou les seules
// unes retoquées pour « rejouer mes erreurs ». Identifiant stable d'une une : son titre d'origine.
// Une une est « réussie » quand elle est publiée du premier coup.
let DECK=LEVELS;
const JEU="repare-la-une";
let joue=[];
function texteBrut(html){ const d=document.createElement("div"); d.innerHTML=String(html).replace(/<br\s*\/?>/gi," "); return d.textContent; }
const $=id=>document.getElementById(id);

function startGame(sousDeck){
  DECK=sousDeck || LEVELS;
  lvl=0; stars=0; levelResults=[];
  joue=[];
  ColFin.protegerSortie(true);
  $("end").style.display="none";
  $("hud-stars").textContent="⭐ 0"; // la partie repart sans recharger la page
  $("intro").style.display="none";
  $("hud").style.display="flex";
  $("game").style.display="block";
  $("qtot").textContent=DECK.length;
  $("draft-date").textContent=new Date().toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
  renderLevel();
}

function renderLevel(){
  const L=DECK[lvl];
  sel=L.slots.map(()=>0); // default: the original segment (the most sensationalist one)
  attempts=0; solved=false;
  $("qnum").textContent=lvl+1;
  $("orig-txt").textContent=L.orig;
  // Illustration photo: only some levels have one.
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
  $("gauges").style.display="none"; // gauges hidden until publication
  $("nextbtn").style.display="none";
  $("publish").style.display="block";
  // Sources
  const sc=$("sources"); sc.innerHTML="";
  L.sources.forEach(s=>{
    const d=document.createElement("div");
    d.className="source";
    d.innerHTML=`<button type="button" class="source-hd" aria-expanded="false">${s.icon} ${s.name} <span class="sread">✓ read</span><span class="schev">▶</span></button><div class="source-bd">${s.body}</div>`;
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
      b.className="opt"+(oi===0?" sel":"");
      b.setAttribute("aria-pressed",oi===0?"true":"false");
      b.textContent=o.t+(oi===0?" (trainee's original title, unchanged)":"");
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
  const L=DECK[lvl];
  let emo=0, prec=0;
  L.slots.forEach((s,i)=>{emo+=s.opts[sel[i]].emo; prec+=s.opts[sel[i]].prec;});
  return {emo:Math.min(100,emo), prec:Math.min(100,prec)};
}

function updateDraft(){
  // Updates the front-page preview, but NOT the gauges: the verdict only arrives after publication.
  const L=DECK[lvl];
  const html=L.slots.map((s,i)=>{
    const t=s.opts[sel[i]].t;
    // Segment left at choice 0 (default) = unchanged: flagged, not mistaken for a real choice.
    return sel[i]===0
      ? `<span class="unchanged" title="Unchanged segment (trainee's original title)">${t}</span>`
      : t;
  }).join(" ").replace(/\s+([,.])/g,"$1").replace(/\s+/g," ").trim();
  $("draft-txt").innerHTML=html;
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
  const L=DECK[lvl];
  attempts++;
  revealGauges();
  const fb=$("feedback");
  optBtns.forEach(row=>row.forEach(b=>b.classList.remove("trap-alert")));
  // Trap: does a segment contradict the sources?
  const trapIdx=L.slots.findIndex((s,i)=>s.opts[sel[i]].trap);
  if(trapIdx!==-1){
    const trapped=L.slots[trapIdx].opts[sel[trapIdx]];
    optBtns[trapIdx][sel[trapIdx]].classList.add("trap-alert");
    fb.className="ko"; fb.style.display="block";
    $("fb-title").textContent="🛑 Rejected by the editor-in-chief!";
    $("fb-expl").innerHTML="Your segment « <i>"+trapped.t+"</i> » contradicts the sources. "+trapped.trap+"<br><br>🔎 Read the sources again and correct your front page.";
    $("fb-stars").style.display="none";
    fb.scrollIntoView({behavior:"smooth",block:"center"});
    return;
  }
  const {emo,prec}=currentScores();
  if(emo>EMO_MAX || prec<PREC_MIN){
    fb.className="ko"; fb.style.display="block";
    $("fb-title").textContent="✋ Not publishable yet…";
    let msg=[];
    if(emo>EMO_MAX) msg.push("😱 Your headline still plays too much on emotion ("+emo+"/100, target ≤ "+EMO_MAX+"). Spot the fear-triggering words: capital letters, “alert”, “panic”, insinuations…");
    if(prec<PREC_MIN) msg.push("🎯 It lacks precision or context ("+prec+"/100, target ≥ "+PREC_MIN+"). Who says so? Exactly how many? What do the sources specify?");
    $("fb-expl").innerHTML=msg.join("<br><br>");
    $("fb-stars").style.display="none";
    fb.scrollIntoView({behavior:"smooth",block:"center"});
    return;
  }
  // Success!
  solved=true;
  const allRead=[...document.querySelectorAll(".source")].every(s=>s.classList.contains("read"));
  const got = attempts===1 ? (allRead?3:2) : (attempts===2?2:1);
  stars+=got;
  levelResults.push({orig:L.orig, stars:got});
  joue.push({id:L.orig, titre:L.orig, reussi:attempts===1, explication:texteBrut(L.lesson)});
  $("hud-stars").textContent="⭐ "+stars;
  fb.className="ok"; fb.style.display="block";
  $("fb-title").textContent="🗞️ Front page published! The editor-in-chief applauds.";
  let extra = (attempts===1 && !allRead) ? "<br><br><i>(Tip: reading all the sources before publishing earns 3 stars!)</i>" : "";
  $("fb-expl").innerHTML=L.lesson+extra;
  $("fb-stars").style.display="block";
  $("fb-stars").textContent="⭐".repeat(got)+"☆".repeat(3-got);
  $("publish").style.display="none";
  $("nextbtn").textContent = lvl===DECK.length-1 ? "See my final result ➜" : "Next front page ➜";
  $("nextbtn").style.display="block";
  fb.scrollIntoView({behavior:"smooth",block:"center"});
  $("nextbtn").focus();
}

function nextLevel(){
  if(lvl===DECK.length-1){ endGame(); return; }
  lvl++; renderLevel();
}

function endGame(){
  $("game").style.display="none";
  $("hud").style.display="none";
  $("end").style.display="block";
  const max=DECK.length*3;
  let title,msg;
  if(stars>=max-2){title="🏆 Exceptional editor-in-chief!";msg="Your front pages inform without alarming people. You have mastered the lesson: <b>true information can still manipulate</b>, depending on how it is framed. You choose the honest frame.";}
  else if(stars>=Math.round(max*0.55)){title="📰 Good editor!";msg="You know how to defuse most anxiety-inducing headlines. Keep this reflex: <b>always go back to the sources</b> — that is where the nuances hide (tasks ≠ jobs, reports ≠ events…).";}
  else{title="🗞️ Promising trainee";msg="Framing is subtle! Play again and read each source carefully before publishing: the traps of “false precision” are unforgiving.";}
  msg+="<br><br>💡 Remember: the next time a headline scares or outrages you, ask yourself: <b>« how could the same information have been presented differently? »</b>";
  // E2 : titre, étoiles, message, unes retoquées et boutons sont rendus par ColFin.
  ColFin.rendre({
    jeu: JEU, titre: title, message: texteBrut(msg),
    score: stars, total: max, items: joue,
    onRejouer: rates => startGame(LEVELS.filter(L => rates.some(r => r.id===L.orig))),
    onRecommencer: () => startGame()
  });
  $("end-recap").innerHTML=levelResults.map((r,i)=>
    `<div class="recap-row"><span class="rr-title">${i+1}. ${r.orig}</span><span class="rr-stars">${"⭐".repeat(r.stars)}${"☆".repeat(3-r.stars)}</span></div>`
  ).join("");
}
