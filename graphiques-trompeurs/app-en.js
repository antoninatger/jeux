// Techniques offered as answers (4-choice MCQ per question)
const TECH = {
  tronq:   {l:"✂️ Truncated axis", s:"the vertical axis doesn't start at zero"},
  cam3d:   {l:"🥧 3D pie chart", s:"perspective distorts the slices"},
  double:  {l:"⚖️ Dual axis", s:"two different scales on the same chart"},
  picto:   {l:"🧍 Improperly scaled pictogram", s:"the drawing's size doesn't match the real values"},
  omises:  {l:"🕳️ Missing data", s:"points or categories removed from the chart"},
  noaxe:   {l:"📏 Bars with no scale", s:"heights aren't proportional to the values, no numbered axis"},
  inverse: {l:"🙃 Inverted axis", s:"the vertical scale is flipped, a rise looks like a drop"},
  honnete: {l:"✅ Honest chart", s:"nothing wrong with it, it follows good practice"},
};

const QUESTIONS = [
  {img:"images/exemple-graphique-meteo.jpg", cred:"Screenshot from a US weather broadcast (Fox 8)",
   t:"This weather segment shows the high temperatures from Monday to Sunday. Take a close look at this chart: what's off about it?",
   a:"tronq", opts:["cam3d","double","honnete"],
   e:"The scale starts at <b>92°</b>, not 0°! As a result, a real gap of only <b>2 degrees</b> (92° → 94°) makes Thursday and Friday's bars look almost <b>twice as tall</b>. This is a <b>truncated axis</b>, the classic move for a weather segment that wants to look dramatic."},

  {img:"images/wiki-axe-tronque.png", cred:"Wikimedia Commons",
   t:"These two charts show exactly the same data (A = 40, B = 50). Compare them closely: what strikes you?",
   a:"tronq", opts:["picto","omises","honnete"],
   e:"On the left, the axis starts at <b>35</b> instead of 0: the slightest difference gets stretched and looks huge. On the right, the axis starts at <b>0</b> and shows the true ratio between A and B. Always check the bottom of the scale before judging a gap."},

  {img:"images/wiki-camembert-3d.png", cred:"Wikimedia Commons",
   t:"Take a good look at slices <b>A</b>, <b>B</b> and <b>C</b> of this pie chart. Do you trust the proportions you're seeing?",
   a:"cam3d", opts:["double","omises","honnete"],
   e:"The 3D tilt artificially enlarges the slices in the <b>foreground</b> and shrinks the ones in the back. As a result, C (in the back) looks almost as big as A (in front), even though it's actually <b>half the size</b>. A <b>3D pie chart</b> systematically distorts proportions — be wary of any chart 'in relief'."},

  {img:"images/wiki-double-axe.png", cred:"Federal Reserve Bank of St. Louis, via Wikimedia Commons",
   t:"This chart compares the military spending of 6 countries over time. Look closely at how it's built: does anything seem off?",
   a:"double", opts:["tronq","picto","honnete"],
   e:"There are <b>two different vertical scales</b>: one on the left for China, Russia, India… (0 to 300 billion), and one on the right for the United States (0 to 1000 billion). Overlaying two scales without making it obvious can make two curves look 'close' when the real values are far apart. Always check whether there's an axis on the left <b>and</b> one on the right."},

  {img:"images/picto-taille-femmes-hommes.svg", cred:"Game illustration (approximate averages, France)",
   t:"This chart compares the average height of women (165 cm) and men (178 cm) in France. Look closely at the two silhouettes compared with those numbers: what do you think?",
   a:"picto", opts:["cam3d","omises","honnete"],
   e:"The real gap is only <b>13 cm</b> (165 → 178, about +8%): the two silhouettes should be almost identical. Here, the male silhouette is drawn nearly <b>twice as tall</b> — and since it also widens, it covers almost <b>3 times the area</b>! Men are visually <b>overrepresented</b>. An honest pictogram keeps drawings <b>proportional to the real values</b>."},

  {img:"images/wiki-donnees-omises.svg", cred:"Wikimedia Commons",
   t:"This chart shows how a value changed between 1998 and 2012. Look closely at the curve and the years shown: does anything seem to be missing?",
   a:"omises", opts:["tronq","double","honnete"],
   e:"By <b>removing certain points or periods</b>, you can smooth out a curve that was actually chaotic, hide an inconvenient dip between two convenient peaks, or mask an isolated spike. <b>Missing data</b> is hard to spot: the only reliable reflex is to ask yourself, 'do I have the whole period, or just cherry-picked excerpts?'"},

  {img:"images/wiki-graphique-correct.svg", cred:"Wikimedia Commons",
   t:"This bar chart compares 5 groups (A to E). Look at it carefully: do you spot a trap, or does it look honest to you?",
   a:"honnete", opts:["tronq","cam3d","picto"],
   e:"No: this is an <b>honest chart</b>. The axis starts at <b>zero</b>, there's only <b>one scale</b>, no 3D effect distorting the proportions, and nothing seems to have been removed. These are exactly the 4 questions to ask about any chart: zero? one scale? no 3D? is everything there?"},

  {img:"images/sncf-greve-barres.svg", cred:"Based on a press release from the French railway company SNCF, April 4, 2018",
   t:"Did the number of strikers drop a lot, or just a little, between April 3 and April 4? Look closely at how these two bars are drawn.",
   a:"noaxe", opts:["tronq","omises","honnete"],
   e:"The real gap is only <b>4.2 points</b> (33.9% → 29.7%, about <b>-12%</b>). But the second bar is drawn at barely over <b>half</b> the height of the first, with no numbered axis to check against. Without a scale, nothing forces the bar heights to respect the real values — that's the trap of <b>bars with no scale</b>."},

  {img:"images/dette-axe-inverse.svg", cred:"Educational reconstruction, approximate figures",
   t:"What happens to public debt between 1997 and 2009 according to this chart? Look closely at the direction of the vertical axis before answering.",
   a:"inverse", opts:["tronq","double","honnete"],
   e:"Debt does <b>increase</b> throughout the period (from about 59% to 79% of GDP) — but the vertical axis is <b>inverted</b>: small percentages at the top, large ones at the bottom. As a result, the curve seems to 'plunge,' like bad news collapsing, even though it actually represents a rise. Always check which way the vertical axis reads."},

  {img:"images/cinema-internet-tronque.svg", cred:"Based on French cinema attendance data, ababsurdo.fr",
   t:"These two charts show the exact same French cinema attendance data between 2002 and 2007. Did the rise of the internet have a dramatic effect on cinema-going?",
   a:"tronq", opts:["omises","picto","honnete"],
   e:"On the left, the axis only goes from <b>2.6 to 3.4</b>: the slightest wiggle looks like a 'collapse.' On the right, on a scale of <b>0 to 10</b>, attendance is actually <b>nearly stable</b>. Same data, completely different impression depending on where the axis starts."},

  {img:"images/lemonde-disques-legislatives.svg", cred:"Based on a press infographic, 2012 legislative elections",
   t:"Look closely at the size of the circles compared to the percentages they represent. Do the proportions look faithful to the numbers?",
   a:"picto", opts:["cam3d","omises","honnete"],
   e:"The Front de Gauche (6.94%) and the FN (13.77%) have a score roughly <b>2 times</b> bigger — but their circles have a <b>surface area</b> that differs by far more than a factor of 2. It's the circle's <b>radius</b> that was made proportional to the score, not its area. Since a disk's area grows with the <b>square</b> of its radius, the visual gap is heavily amplified compared to the real one."},

  {img:"images/budget-asso-camembert3d.svg", cred:"Educational reconstruction, approximate figures",
   t:"Here is the annual budget breakdown of a sports club, presented by its treasurer at the general meeting. Do you trust the proportions you're seeing?",
   a:"cam3d", opts:["double","omises","honnete"],
   e:"The 3D tilt artificially enlarges the slice in the <b>foreground</b> (Salaries, 42%) and shrinks the one in the back (Equipment, 12%): their visual gap looks smaller than it really is. A <b>3D pie chart</b> systematically distorts proportions, even when the numbers shown are accurate."},

  {img:"images/confiance-medias-barres.svg", cred:"Educational reconstruction, approximate figures",
   t:"This chart, shared on social media, compares French people's trust in the media in 2015 and 2024. Did trust really collapse that much? Look closely at how these two bars are built.",
   a:"noaxe", opts:["tronq","omises","honnete"],
   e:"The real gap is only <b>4 points</b> (48% → 44%, about <b>-8%</b>). But the second bar is drawn at less than <b>half</b> the height of the first, with no numbered axis to check against. Without a scale, nothing forces the bar heights to respect the real values."},

  {img:"images/ca-entreprise-omises.svg", cred:"Educational reconstruction, approximate figures",
   t:"This chart shows a company's revenue between 2016 and 2023, proudly featured in its annual report. Look closely at the curve and the years shown: does anything seem to be missing?",
   a:"omises", opts:["tronq","noaxe","honnete"],
   e:"The year <b>2020</b> has vanished entirely from the chart: that's exactly the year revenue collapsed to €41M (compared to €69M and then €75M just before and after). By removing that single point, the company turns a brutal crash into <b>continuous growth</b>. Always check that the sequence of years is complete."},

  {img:"images/co2-usine-axe-inverse.svg", cred:"Educational reconstruction, approximate figures",
   t:"A factory publishes this chart of its CO2 emissions in its 'sustainable development' report. What happens to its emissions between 2015 and 2023? Look closely at the direction of the vertical axis before answering.",
   a:"inverse", opts:["tronq","double","honnete"],
   e:"Emissions do <b>increase</b> throughout the period (from 120 to 168 thousand tonnes, about <b>+40%</b>) — but the vertical axis is <b>inverted</b>: small values at the top, large ones at the bottom. The curve then seems to 'plunge' like good news, even though it actually represents rising pollution. Always check which way the axis reads."},

  {img:"images/reseaux-sociaux-double-axe.svg", cred:"Educational reconstruction, approximate figures",
   t:"An article claims these two social networks have seen 'comparable' growth since 2019, curves included. Look closely at how this chart is built: does anything seem off?",
   a:"double", opts:["tronq","picto","honnete"],
   e:"There are <b>two different vertical scales</b>: one on the left for Network A (0 to 60 million), one on the right for Network B (0 to 600 million) — ten times bigger. As a result, the two curves overlap almost perfectly, even though Network B actually has <b>ten times more</b> users than Network A. Always check whether there's an axis on the left <b>and</b> one on the right."},
];

let deck=[],idx=0,score=0,streak=0,best=0,nbOk=0,freeRetryUsed=false;
// E2 : ce que la partie a joué, pour l'écran de fin ColFin — {id, titre, reussi, explication}.
// Identifiant stable d'une question : le chemin de son image (unique, identique en FR et en EN).
const JEU="graphiques-trompeurs";
let joue=[];
function texteBrut(html){ const d=document.createElement("div"); d.innerHTML=String(html).replace(/<br\s*\/?>/gi," "); return d.textContent; }

const $=id=>document.getElementById(id);
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

// ===== Expert mode: keyword-based technique detection =====
const KEYWORDS = {
  tronq:   ["truncated","not at zero","not at 0","doesn't start at","does not start at","cut axis","cut scale","clipped axis","zoom","missing zero","no zero","not starting at zero"],
  cam3d:   ["pie chart","3d","three dimensions","relief","perspective","depth","tilt","angle","viewed from an angle","slanted"],
  double:  ["two scales","two axes","dual axis","double axis","different scales","right axis","secondary axis","second axis","not the same scale","different scale for each","own scale","scale on the left","scale on the right"],
  picto:   ["pictogram","icon","silhouette","disproportion","area","enlarged","too big","too large","wrong size","height and width","size of the icons","overrepresent","not proportional","not to scale","exaggerat"],
  omises:  ["missing","remov","disappear","incomplete","hidden","cherry pick","hole in the data","not all the years","not all the data"],
  noaxe:   ["no scale","without a scale","no axis","missing axis","no numbers on the axis","no numbers on the scale","bars not proportional","height not proportional","arbitrary height","made up height"],
  inverse: ["inverted axis","reversed axis","upside down","upside-down","flipped scale","reversed scale","axis flipped","backwards axis","flipped axis","axis is backwards"],
  honnete: ["honest","nothing wrong","no trap","no trick","reliable","correct","no problem","not misleading","fine as is","all good","nothing to report","seems fine","looks fine","no issue","looks correct","checks out","follows best practices"],
};
function normalize(s){
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9\s]/g," ").replace(/\s+/g," ").trim();
}
// A missing zero on the axis is always a truncated axis, never missing data:
// "missing" (omises' broad keyword) also matches "the axis is missing zero",
// hence this explicit priority before the generic scoring.
const ZERO_AXIS_PHRASES=["missing zero","no zero","not starting at zero","not starting at 0","doesn't start at zero","does not start at zero","not at zero","not at 0"];
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
  $("scase").textContent="Chart n°"+String(idx+1).padStart(2,"0");
  $("qimg").src=it.img;
  $("qimg").alt="Chart to analyze";
  $("qcred").textContent="Source: "+it.cred;
  $("stxt").innerHTML=it.t;
  $("feedback").style.display="none";
  $("nextbtn").style.display="none";
  $("freetechs").innerHTML="Techniques reminder: "+Object.values(TECH).map(t=>t.l).join(" · ");
  $("freehint").textContent="";
  freeRetryUsed=false;
  const ft=$("ftext");
  ft.value="";ft.disabled=false;
  $("fvalidate").disabled=false;
  // No autofocus on touch: the virtual keyboard would open and hide the chart.
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
      $("fb-title").textContent=streak>=3?`✔ Nice catch! Streak of ${streak} 🔥 (+15)`:"✔ Nice catch! (+10)";
    } else {
      streak=0;
      score+=5;
      $("fb-title").textContent="✔ Nice catch (with help) (+5)";
    }
  } else {
    streak=0;
    $("fb-title").textContent="✘ Not quite — check the explanation below";
  }
  $("score").textContent=score;
  $("streak").textContent=streak>=2?`🔥 ${streak}`:"";
  const fb=$("feedback");
  fb.className=ok?"ok":"ko";fb.style.display="block";
  let expl=it.e;
  if(!ok && viaFree){
    expl=(detectedLabel?`Your answer mostly pointed to: <b>${detectedLabel}</b>.<br><br>`:`No clear enough keyword was recognized in your answer.<br><br>`)+expl;
  }
  $("fb-expl").innerHTML=expl;
  showFixDemo(it);
  $("nextbtn").textContent=idx===deck.length-1?"See my results ➜":"Next question ➜";
  $("nextbtn").style.display="block";
  $("feedback").scrollIntoView({behavior:"smooth",block:"start"});
}

// ===== "Fix the chart" demo =====
let currentFix=null,fixBonusGiven=false;

// +5 pts the first time the chart is restored to an honest state
function grantFixBonus(){
  if(fixBonusGiven)return false;
  fixBonusGiven=true;
  score+=5;
  $("score").textContent=score;
  return true;
}

// The verdict is only given on Submit: while editing, this reminder is shown
const FIX_HINT=`🛠️ Edit the chart (the ✏️ values are clickable) or describe your fix, then click <b>Submit</b> to check.`;

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

// Shared helper: a displayed number, click to edit in place
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

// --- Truncated axis (A=40 / B=50), inspired by wiki-axe-tronque.png ---
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
  <div class="fix-axis-row">Axis starts at: <span id="fixParamSlot"></span></div>`;
  $("fixChart").innerHTML=svg;
  makeEditableNumber("fixParamSlot",fixTronqVal,FIX_TRONQ.min,FIX_TRONQ.max,applyFixTronq);
}
function applyFixTronq(v){fixTronqVal=Math.max(FIX_TRONQ.min,Math.min(FIX_TRONQ.max,v));renderFixTronq();$("fixReadout").innerHTML=FIX_HINT;}

// --- 3D pie chart (A=15% / B=30% / C=10% / D=45%), inspired by wiki-camembert-3d.png ---
const FIX_CAM3D={slices:[{id:"A",from:0,to:.15,color:"#4a90d9"},{id:"B",from:.15,to:.45,color:"#c0504d"},{id:"C",from:.45,to:.55,color:"#9bbb59"},{id:"D",from:.55,to:1,color:"#8064a2"}],min:0,max:100,init:100,honest:0};
let fixCam3dVal=FIX_CAM3D.init;
function initFixCam3d(){fixCam3dVal=FIX_CAM3D.init;renderFixCam3d();}
function renderFixCam3d(){
  const cx=100,cy=85,r=68;
  const squash=1-(fixCam3dVal/100)*0.55;
  const paths=FIX_CAM3D.slices.map(s=>`<path d="${arcPath(cx,cy,r,s.from,s.to)}" fill="${s.color}" stroke="#fff" stroke-width="1.5"/>`).join("");
  // Labels kept outside the squashed group (repositioned manually) so they stay readable
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
  <div class="fix-axis-row">3D effect intensity: <span id="fixParamSlot"></span> %</div>`;
  makeEditableNumber("fixParamSlot",fixCam3dVal,FIX_CAM3D.min,FIX_CAM3D.max,applyFixCam3d);
}
function applyFixCam3d(v){fixCam3dVal=Math.max(FIX_CAM3D.min,Math.min(FIX_CAM3D.max,v));renderFixCam3d();$("fixReadout").innerHTML=FIX_HINT;}

// --- Dual axis (Other countries / USA), inspired by wiki-double-axe.png ---
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
  </svg><div class="fix-legend"><span style="color:#c0504d">■ Other countries</span><span style="color:#4a7ebc">■ USA</span></div></div>
  <div class="fix-axis-row">"Other countries" scale (0 to): <span id="fixParamSlot"></span></div>`;
  makeEditableNumber("fixParamSlot",fixDoubleVal,FIX_DOUBLE.min,FIX_DOUBLE.max,applyFixDouble);
}
function applyFixDouble(v){fixDoubleVal=Math.max(FIX_DOUBLE.min,Math.min(FIX_DOUBLE.max,v));renderFixDouble();$("fixReadout").innerHTML=FIX_HINT;}

// --- Pictogram (average height: women 165 cm / men 178 cm, man drawn as if 280 cm) ---
const FIX_PICTO={min:100,max:300,init:280,honest:178,fem:165};
let fixPictoVal=FIX_PICTO.init;
function initFixPicto(){fixPictoVal=FIX_PICTO.init;renderFixPicto();}
function personIcon(w,h){ // male silhouette
  return `<svg width="${w}" height="${h}" viewBox="0 0 24 24" preserveAspectRatio="none"><circle cx="12" cy="4.5" r="3.5" fill="#4a7ebc" stroke="#2c5a8c" stroke-width="0.6"/><path d="M12,9 C7.5,9 5.5,13 5.5,17 L5.5,24 L18.5,24 L18.5,17 C18.5,13 16.5,9 12,9 Z" fill="#4a7ebc" stroke="#2c5a8c" stroke-width="0.6"/></svg>`;
}
function womanIcon(w,h){ // female silhouette
  return `<svg width="${w}" height="${h}" viewBox="0 0 24 24" preserveAspectRatio="none"><circle cx="12" cy="4" r="3.2" fill="#c05a8c" stroke="#8c3a60" stroke-width="0.6"/><path d="M12,7.5 C10.2,7.5 9.2,9 8.7,11 L6.8,17.5 L10.2,17.5 L10.2,24 L13.8,24 L13.8,17.5 L17.2,17.5 L15.3,11 C14.8,9 13.8,7.5 12,7.5 Z" fill="#c05a8c" stroke="#8c3a60" stroke-width="0.6"/></svg>`;
}
function renderFixPicto(){
  const k=0.5,hF=Math.round(FIX_PICTO.fem*k),hH=Math.round(fixPictoVal*k);
  $("fixChart").innerHTML=`<div class="fix-svg-wrap fix-chart-top">
    <div class="fix-picto-row">
      <div class="fix-picto-col">${womanIcon(hF,hF)}<span>♀ Women — 165 cm</span></div>
      <div class="fix-picto-col">${personIcon(hH,hH)}<span>♂ Men — 178 cm</span></div>
    </div>
  </div>
  <div class="fix-axis-row">Male silhouette drawn as if (cm): <span id="fixParamSlot"></span></div>`;
  makeEditableNumber("fixParamSlot",fixPictoVal,FIX_PICTO.min,FIX_PICTO.max,applyFixPicto);
}
function applyFixPicto(v){fixPictoVal=Math.max(FIX_PICTO.min,Math.min(FIX_PICTO.max,v));renderFixPicto();$("fixReadout").innerHTML=FIX_HINT;}

// --- Missing data (1998-2012), inspired by wiki-donnees-omises.svg (1998 and 2012 are missing in the original) ---
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

// --- Bars with no scale (SNCF strike, 33.9% / 29.7%) ---
const FIX_NOAXE={realA:33.9,realB:29.7,min:10,max:130,init:59,honest:88};
let fixNoaxeVal=FIX_NOAXE.init;
function initFixNoaxe(){fixNoaxeVal=FIX_NOAXE.init;renderFixNoaxe();}
function renderFixNoaxe(){
  const y0=150,barW=44,xA=60,xB=140,baseH=110;
  const hB=baseH*fixNoaxeVal/100;
  $("fixChart").innerHTML=`<div class="fix-svg-wrap fix-chart-top"><svg viewBox="0 0 220 170" class="fix-svg">
    <rect x="${xA}" y="${(y0-baseH).toFixed(1)}" width="${barW}" height="${baseH}" fill="#1a9e96"/>
    <rect x="${xB}" y="${(y0-hB).toFixed(1)}" width="${barW}" height="${hB.toFixed(1)}" fill="#7b2d8e"/>
    <text x="${xA+barW/2}" y="${(y0-baseH-6).toFixed(1)}" font-size="11" font-weight="800" text-anchor="middle" fill="#1a9e96">33.9%</text>
    <text x="${xB+barW/2}" y="${(y0-hB-6).toFixed(1)}" font-size="11" font-weight="800" text-anchor="middle" fill="#7b2d8e">29.7%</text>
    <text x="${xA+barW/2}" y="${y0+14}" font-size="10" text-anchor="middle" fill="#333">Apr 3</text>
    <text x="${xB+barW/2}" y="${y0+14}" font-size="10" text-anchor="middle" fill="#333">Apr 4</text>
  </svg></div>
  <div class="fix-axis-row">Height of the 2nd bar: <span id="fixParamSlot"></span> % of the 1st</div>`;
  makeEditableNumber("fixParamSlot",fixNoaxeVal,FIX_NOAXE.min,FIX_NOAXE.max,applyFixNoaxe);
}
function applyFixNoaxe(v){fixNoaxeVal=Math.max(FIX_NOAXE.min,Math.min(FIX_NOAXE.max,v));renderFixNoaxe();$("fixReadout").innerHTML=FIX_HINT;}

// --- Inverted axis (public debt, 1997-2009) ---
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
  <div class="fix-axis-row">Value at the top of the axis: <span id="fixParamSlot"></span> %</div>`;
  makeEditableNumber("fixParamSlot",Math.round(fixInverseVal),FIX_INVERSE.min,FIX_INVERSE.max,applyFixInverse);
}
function applyFixInverse(v){fixInverseVal=Math.max(FIX_INVERSE.min,Math.min(FIX_INVERSE.max,v));renderFixInverse();$("fixReadout").innerHTML=FIX_HINT;}

// --- Honest chart: nothing to fix ---
function initFixHonnete(){
  $("fixChart").innerHTML="";
  $("fixReadout").innerHTML=`🎉 This chart is already honest: zero-based axis, one scale, no 3D, nothing missing. Nothing to fix!`;
}

// Applies the written instruction to the chart. Returns false if it wasn't understood.
// Keywords are checked BEFORE digit extraction: "remove the 3D"
// contains a "3" that must not be read as a value.
function applyFixText(raw){
  const n=normalize(raw);
  const has=list=>list.some(k=>n.includes(normalize(k)));
  if(currentFix==="tronq"){
    if(has(["zero","start at 0","start from 0","axis to 0","axis at 0"])){applyFixTronq(0);return true;}
    const m=n.match(/-?\d+/);
    if(m){applyFixTronq(parseInt(m[0],10));return true;}
  } else if(currentFix==="cam3d"){
    if(has(["flat","2d","no relief","no 3d","remove","get rid","no perspective","zero"])){applyFixCam3d(0);return true;}
    const m=n.replace(/3\s*d/g," ").match(/-?\d+/);
    if(m){applyFixCam3d(parseInt(m[0],10));return true;}
  } else if(currentFix==="double"){
    if(has(["same scale","merge","one scale","single scale","common scale","shared scale","identical","align","unify","harmonize","same axis"])){applyFixDouble(FIX_DOUBLE.honest);return true;}
    const m=n.match(/-?\d+/);
    if(m){applyFixDouble(parseInt(m[0],10));return true;}
  } else if(currentFix==="picto"){
    if(has(["real height","true size","true height","to scale","proportional","respect the values","shrink","smaller","same scale","reduce"])){applyFixPicto(FIX_PICTO.honest);return true;}
    const m=n.match(/-?\d+/);
    if(m){applyFixPicto(parseInt(m[0],10));return true;}
  } else if(currentFix==="omises"){
    if(has(["add","bring back","put back","all the years","complete","restore","show all","1998","2012"])){restoreAllOmises();return true;}
  } else if(currentFix==="noaxe"){
    if(has(["same height","real height","respect the values","proportional","matches the gap","proportional height"])){applyFixNoaxe(FIX_NOAXE.honest);return true;}
    const m=n.match(/-?\d+/);
    if(m){applyFixNoaxe(parseInt(m[0],10));return true;}
  } else if(currentFix==="inverse"){
    if(has(["put it back the right way","normal direction","large values on top","the right way up","right side up","fix the direction"])){applyFixInverse(FIX_INVERSE.honest);return true;}
    const m=n.match(/-?\d+/);
    if(m){applyFixInverse(parseInt(m[0],10));return true;}
  }
  return false;
}

const FIX_HELP={
  tronq:`I didn't understand your instruction. Try writing "set the axis to 0", or click the ✏️ value.`,
  cam3d:`I didn't understand your instruction. Try writing "flatten the pie chart" or "0%", or click the ✏️ value.`,
  double:`I didn't understand your instruction. Try writing "use the same scale" or "1000", or click the ✏️ value.`,
  picto:`I didn't understand your instruction. Try writing "draw it at its real height" or "178", or click the ✏️ value.`,
  omises:`I didn't understand your instruction. Try writing "add the missing data", or click the "+" marks on the chart.`,
  noaxe:`I didn't understand your instruction. Try writing "use the same proportional height" or "88", or click the ✏️ value.`,
  inverse:`I didn't understand your instruction. Try writing "put the axis back the right way" or "80", or click the ✏️ value.`,
};

// Verdict on the chart's current state (shown when Submit is clicked)
function fixVerdict(){
  if(currentFix==="tronq"){
    if(fixTronqVal===FIX_TRONQ.honest)return{ok:true,msg:`✔ Fixed! At <b>0</b>, the visual gap matches the real gap: B is <b>25%</b> bigger than A (40 → 50). That's an honest axis!`};
    const ratio=Math.round((FIX_TRONQ.real.B-FIX_TRONQ.real.A)/(FIX_TRONQ.real.A-fixTronqVal)*100);
    return{ok:false,msg:`✘ Not yet: the axis starts at <b>${fixTronqVal}</b>, so B looks <b>${ratio}%</b> taller than A even though the real gap is only <b>+25%</b>. Bring the axis down to 0.`};
  }
  if(currentFix==="cam3d"){
    if(fixCam3dVal===FIX_CAM3D.honest)return{ok:true,msg:`✔ Fixed! Flat, the real proportions (A 15%, B 30%, C 10%, D 45%) finally read without distortion.`};
    return{ok:false,msg:`✘ Not yet: with <b>${fixCam3dVal}%</b> 3D effect, the slices are still distorted by perspective. Bring the intensity down to 0.`};
  }
  if(currentFix==="double"){
    if(fixDoubleVal===FIX_DOUBLE.honest)return{ok:true,msg:`✔ Fixed! With the <b>same scale</b> for everyone (0 to 1000), the real gap shows: in 2020, the USA (800) spends <b>4 times more</b> than the other countries (200).`};
    return{ok:false,msg:`✘ Not yet: the "other countries" scale is at <b>${fixDoubleVal}</b>, so the curves still look artificially close. Align it with the USA scale (1000).`};
  }
  if(currentFix==="picto"){
    if(fixPictoVal===FIX_PICTO.honest)return{ok:true,msg:`✔ Fixed! Drawn to real scale (165 and 178 cm), the two silhouettes are almost identical: the gap is only <b>13 cm (+8%)</b>. That's an honest pictogram.`};
    if(fixPictoVal<FIX_PICTO.honest)return{ok:false,msg:`✘ Not yet: drawn as if <b>${fixPictoVal} cm</b>, the male silhouette is now <b>underrepresented</b> (real height: 178 cm) — the exaggeration just switched sides!`};
    return{ok:false,msg:`✘ Not yet: the male silhouette is drawn as if men were <b>${fixPictoVal} cm</b> tall — men are still visually <b>overrepresented</b> (real height: 178 cm).`};
  }
  if(currentFix==="omises"){
    if(fixOmisesMissing.length===0)return{ok:true,msg:`✔ Fixed! With 1998 and 2012 restored, the real starting spike and final drop show up — the chart had been cropped to its most flattering window.`};
    return{ok:false,msg:`✘ Not yet: <b>${fixOmisesMissing.length}</b> year(s) still missing. Click the dashed "+" marks or write "add the missing data".`};
  }
  if(currentFix==="noaxe"){
    if(Math.abs(fixNoaxeVal-FIX_NOAXE.honest)<=2)return{ok:true,msg:`✔ Fixed! At <b>${fixNoaxeVal}%</b> of the first bar, the height finally matches the real gap (29.7 / 33.9 ≈ 88%).`};
    return{ok:false,msg:`✘ Not yet: the 2nd bar is <b>${fixNoaxeVal}%</b> of the first bar's height, while the real gap between 33.9% and 29.7% is about <b>88%</b>. Adjust the height.`};
  }
  if(currentFix==="inverse"){
    if(fixInverseVal>=FIX_INVERSE.honest-2)return{ok:true,msg:`✔ Fixed! The axis now reads the right way (large values on top): you can clearly see debt <b>rising</b> between 1997 and 2009.`};
    return{ok:false,msg:`✘ Not yet: with <b>${Math.round(fixInverseVal)}%</b> at the top of the axis, the scale is still inverted and the rise still looks like a drop. Raise the top value up to 80.`};
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
  $("fixReadout").innerHTML=v.msg+(bonus?` <b>Repair bonus: +5 pts 🔧</b>`:"");
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
  // Unintelligible answer ≠ wrong technique: offer one rephrase before counting it wrong
  if((detected===null || detected==="__TIE__") && !freeRetryUsed){
    freeRetryUsed=true;
    $("freehint").textContent = detected==="__TIE__"
      ? "🤔 Two techniques recognized in your answer — be more specific (last try)."
      : "🤔 No technique recognized in your answer — rephrase using a technique name (last try).";
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
  if(ratio>=0.9){title="🏆 Statistician's eye!";msg="You already spot the classic misleading-chart tricks. This reflex — <b>checking the axis, the scale, the 3D and any missing data</b> — will serve you everywhere: news, social media, company reports.";}
  else if(ratio>=0.6){title="📊 Good trap detector!";msg="You already catch quite a few. The secret: before trusting a chart, always run through the 4 questions from the reference cards.";}
  else{title="👀 Your eye is training…";msg="These techniques fool almost everyone at first glance — that's the whole point! Go check out the reference cards, then play again.";}
  if(best>=3)msg+="<br><br>Your best streak: <b>"+best+" 🔥</b>";
  msg+="<br><br>💡 <i>A chart can be 100% accurate in its numbers and 100% misleading in its drawing.</i>";
  // E2 : titre, score, message, liste des graphiques ratés et boutons sont rendus par ColFin.
  ColFin.rendre({
    jeu: JEU, titre: title, message: score+" pts — "+texteBrut(msg),
    score: nbOk, total: deck.length, items: joue,
    onRejouer: rates => startGame(QUESTIONS.filter(q => rates.some(r => r.id===q.img))),
    onRecommencer: () => startGame()
  });
}

// ===== Anti-trap reference cards =====
const FICHES = [
  {concept:true, icon:"👀", title:"The 4 reflexes",
   def:"Before trusting a chart, systematically ask yourself 4 questions: does the axis start at <b>zero</b>? Is there <b>only one scale</b>? Is there a <b>3D</b> effect distorting the proportions? Is any <b>data</b> missing?",
   ex:"A weather segment, a stock chart, a social-media infographic: the same checklist applies everywhere.",
   parade:"Take 5 seconds to read the axes BEFORE reading the curves. That's where the trap hides."},
  {id:"tronq",
   def:"The vertical axis doesn't start at <b>zero</b>, but just below the lowest values. A tiny real gap becomes visually huge.",
   ex:"A weather segment starting its scale at 92° makes a 2-degree gap look like the temperature doubled.",
   parade:"Always check the first number at the bottom of the vertical axis: is it 0, or a 'convenient' number?"},
  {id:"cam3d",
   def:"The 3D tilt of a pie chart enlarges the slices in the <b>foreground</b> and shrinks the ones in the back, distorting how proportions are perceived.",
   ex:"A slice half the size of another can look almost equal if it's placed at the back of the pie.",
   parade:"Be wary of any chart 'in relief' — always prefer a flat pie or bar chart."},
  {id:"double",
   def:"Two curves are drawn on the same chart, but with <b>two different vertical scales</b> (one on the left, one on the right), often without making that obvious enough.",
   ex:"One country seems to spend 'as much' as another when its scale goes up to 1000 while the neighbor's stops at 300.",
   parade:"Always check whether there's an axis on the left AND one on the right of the chart."},
  {id:"picto",
   def:"A pictogram (icon, silhouette, coin…) is drawn <b>bigger than its value justifies</b> — and since it grows in height AND width, its area exaggerates the gap even more.",
   ex:"A real gap of 13 cm between women (165 cm) and men (178 cm) looks huge if the male silhouette is drawn twice as big.",
   parade:"Always compare the written numbers, not the size of the drawings: drawings must stay proportional to the values."},
  {id:"omises",
   def:"Certain points, categories, or time periods are <b>removed</b> from the chart, which can smooth out a chaotic trend or hide an inconvenient event.",
   ex:"A chart that jumps straight from 2008 to 2012 can make a drop that happened in between disappear.",
   parade:"Ask yourself: 'Do I have the whole period, all the categories — or just cherry-picked excerpts?'"},
  {id:"noaxe",
   def:"Bars are drawn <b>with no numbered axis</b> at all, so nothing forces their height to respect the real values they represent.",
   ex:"Two bars representing 33.9% and 29.7% can be drawn with a height ratio far bigger than the real gap — or far smaller.",
   parade:"Look for numbers on the vertical axis. If there aren't any, the bar heights prove nothing: compare only the written values."},
  {id:"inverse",
   def:"The vertical scale is <b>flipped</b>: small values at the top, large ones at the bottom. A real rise then draws a curve that looks like it's plunging.",
   ex:"A public debt chart that's actually increasing can look like it's 'collapsing' if the axis puts 50% at the top and 80% at the bottom.",
   parade:"Before reading the shape of the curve, check the direction of the axis: are the large values really at the top?"},
  {id:"honnete",
   def:"A chart that starts at zero, uses one clear scale, avoids perspective effects, and shows the full data isn't misleading at all.",
   ex:"A plain bar chart, with no frills, is often the most honest way to present numbers.",
   parade:"Don't dismiss a chart just because it's simple: simplicity is often a sign of honesty."},
];

function renderFiches(){
  const g=$("fiches-grid");if(!g||g.childElementCount)return;
  FICHES.forEach(f=>{
    const title=f.concept?(f.icon+" "+f.title):TECH[f.id].l;
    const d=document.createElement("div");
    d.className="fiche"+(f.concept?" concept":"");
    d.innerHTML=`<h3>${title}</h3>`+
      `<p class="f-def">${f.def}</p>`+
      `<p class="f-ex"><span class="f-lab">Example</span>${f.ex}</p>`+
      `<div class="f-parade"><span class="f-lab">The reflex</span>${f.parade}</div>`;
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
