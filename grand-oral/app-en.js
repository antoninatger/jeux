// Each option: t = the argument, pts (2 = suited to THIS audience, 1 = correct but poorly targeted, 0 = fallacious/counterproductive), fb = audience reaction
const MISSIONS = [
 {
  goal:"Convince the school board to install water fountains and ban plastic bottles.",
  aemoji:"🏫", aname:"The school board",
  adesc:"Cautious administrators. What they care about: the school's budget and its reputation with parents.",
  ethos:[
   {t:"“We are the elected student representatives: today, we speak on behalf of the 600 middle-school students in this school.”", pts:2,
    fb:"👏 <b>+2</b> — Clear legitimacy: you are not speaking only for yourselves, but for the people you represent. Perfect contextual ethos."},
   {t:"“Trust us: we are serious students and we have worked hard on this proposal.”", pts:1,
    fb:"🙂 <b>+1</b> — Honest, but vague: you do not simply claim to be “serious”; you prove it. A slightly weak ethos."},
   {t:"“My uncle, who is a regional swimming champion, thinks it is an excellent idea.”", pts:0,
    fb:"😬 <b>+0</b> — Swimming champion ≠ expert in school management: this is the halo effect; skill does not automatically transfer. The audience frowns."},
  ],
  pathos:[
   {t:"“Imagine the photo in the local newspaper: ‘The first school in town without plastic bottles.’ Parents would be proud to enrol their children here.”", pts:2,
    fb:"👏 <b>+2</b> — You touch THEIR sensitive point: the school's reputation. Emotion adapted to the audience."},
   {t:"“Think of the oceans: every year, tons of plastic suffocate sea turtles.”", pts:1,
    fb:"🙂 <b>+1</b> — Moving, but distant: the board runs a school, not the Pacific Ocean. Pathos works better when it is close to the audience."},
   {t:"“If you refuse, it means you do not care at all about the future of your own students!”", pts:0,
    fb:"😡 <b>+0</b> — Making the audience feel guilty immediately makes them defensive. Aggressive pathos backfires on the speaker."},
  ],
  logos:[
   {t:"“A water fountain costs €800. The school spends €1,200 a year on bottles: the investment pays for itself in less than a year.”", pts:2,
    fb:"👏 <b>+2</b> — Figures, a calculation, a conclusion: this is logos that speaks to budget managers."},
   {t:"“Everyone knows plastic is bad, and every town is installing fountains.”", pts:1,
    fb:"😐 <b>+1</b> — “Everyone knows it”… that is an appeal to popularity, not a demonstration. Logos requires verifiable facts."},
   {t:"“The neighbouring school installed fountains, and the following year its exam results improved!”", pts:0,
    fb:"😬 <b>+0</b> — Correlation is not causation! One board member smiles: “So fountains make students pass exams, really?”"},
  ],
  lesson:"A good speech combines the three registers… but above all, it <b>adapts</b> them: this audience thinks about budget and reputation. The same speech in front of an environmental association would have put the oceans first!"
 },
 {
  goal:"Convince your grandparents to start using video calls to keep in touch with the family.",
  aemoji:"👴👵", aname:"Grandpa Jean & Grandma Lucette",
  adesc:"Wary of technology (and salespeople!), very attached to family, proud of managing on their own.",
  ethos:[
   {t:"“You know me, Grandma: I fixed your TV and set up your phone. I will install everything for you, and I will remain your official tech helper.”", pts:2,
    fb:"👏 <b>+2</b> — Tailor-made ethos: you have already proven yourself to them. Trust is personal and earned."},
   {t:"“The salespeople at the computer shop say it is very easy to use.”", pts:1,
    fb:"😐 <b>+1</b> — Salespeople? Exactly the people Grandpa trusts the least… Their word carries little weight here."},
   {t:"“Anyway, at your age, you cannot understand: just let me install everything without arguing.”", pts:0,
    fb:"😡 <b>+0</b> — Attacking the person (“at your age”) instead of arguing: hurtful and counterproductive. Grandma folds her arms."},
  ],
  pathos:[
   {t:"“You could see your granddaughter's smile on the evening of her birthday, even when we are 800 km away.”", pts:2,
    fb:"👏 <b>+2</b> — Straight to the heart: family is exactly what matters most to them. Grandma already has tears in her eyes."},
   {t:"“Everyone uses video calls now: you will finally be modern!”", pts:1,
    fb:"😐 <b>+1</b> — Being “modern” does not interest them: they are proud of being old-school. Wrong emotional lever."},
   {t:"“If you refuse, do not complain about never seeing your grandchildren!”", pts:0,
    fb:"😡 <b>+0</b> — Emotional blackmail is toxic pathos: it hurts instead of convincing."},
  ],
  logos:[
   {t:"“It is free, it works on the tablet you already have, and there is only one button to tap: I can show you in five minutes.”", pts:2,
    fb:"👏 <b>+2</b> — Simple, concrete, factual: you answer their real objection in advance (“it is too complicated”)."},
   {t:"“A study shows that 78% of equipped seniors use video calls every week.”", pts:1,
    fb:"🙂 <b>+1</b> — A real figure, but abstract: Grandpa does not feel concerned by “equipped seniors”. Logos must stay close to the audience."},
   {t:"“Since the neighbour started video calling, she seems much healthier. Video calls are good for your health!”", pts:0,
    fb:"😬 <b>+0</b> — The neighbour is doing better AND she uses video calls… correlation is not causation! Grandpa, who is sharp, notices immediately."},
  ],
  lesson:"To convince, <b>put yourself in your audience's shoes</b>: their values (family), their fears (complexity), their pride (managing on their own). The “be modern” argument that might work on your friends falls flat here."
 },
 {
  goal:"Convince the town council to build a skatepark in the neighbourhood.",
  aemoji:"🏛️", aname:"The town council",
  adesc:"Cautious elected officials. What they care about: residents' peace and quiet, safety… and the next elections.",
  ethos:[
   {t:"“We represent the neighbourhood youth association: 240 members, and three events already organised without a single incident.”", pts:2,
    fb:"👏 <b>+2</b> — Proof of seriousness + collective legitimacy: the council suddenly listens to you differently."},
   {t:"“We have been passionate about skateboarding for years; we know the subject inside out.”", pts:1,
    fb:"🙂 <b>+1</b> — Passion is nice, but it does not reassure elected officials worried about public peace and quiet."},
   {t:"“A super-famous skateboarding YouTuber says every town should have a skatepark.”", pts:0,
    fb:"😬 <b>+0</b> — Famous ≠ skilled in urban planning: halo effect. One councillor raises an eyebrow, another checks the time."},
  ],
  pathos:[
   {t:"“Today, young people skate in the market square, between pushchairs. Instead, imagine peaceful residents and young people proud of their town.”", pts:2,
    fb:"👏 <b>+2</b> — You turn THEIR problem (residents' complaints) into a positive image. Reassuring emotion: well targeted."},
   {t:"“Skateboarding is our life, our freedom! Without a skatepark, we are suffocating!”", pts:1,
    fb:"😐 <b>+1</b> — Sincere… but it talks about YOUR emotions, not theirs. The councillors remain unmoved."},
   {t:"“If you refuse, young people will remember it at the ballot box, and you will lose the elections!”", pts:0,
    fb:"😡 <b>+0</b> — A threat is not an argument: the council becomes defensive. Catastrophic pathos."},
  ],
  logos:[
   {t:"“The neighbouring town installed a skatepark for €40,000: noise complaints from residents were cut in half because young people had a dedicated place.”", pts:2,
    fb:"👏 <b>+2</b> — A precise cost + a measured result that answers their number-one concern: peace and quiet. Hard to beat."},
   {t:"“Skateboarding is in the Olympic Games now: that proves it is a real sport.”", pts:1,
    fb:"🙂 <b>+1</b> — True, but off topic: the councillors' question is not “is it a sport?” but “will it cause problems?”"},
   {t:"“Either you build this skatepark, or this town has no future for young people.”", pts:0,
    fb:"😬 <b>+0</b> — A false dilemma: there are countless shades between “skatepark” and “no future”. The deputy mayor points it out with a smile."},
  ],
  lesson:"The secret: answer the question <b>the audience</b> is asking (“will it disturb people? how much does it cost?”) rather than the one <b>you</b> are asking (“is skateboarding great?”)."
 },
 {
  goal:"Convince your class to vote for the nature trip (rather than the theme park) for the next school trip.",
  aemoji:"🎒", aname:"Your Year 8 class",
  adesc:"Your classmates. What they want: fun and memories with friends. Their biggest fear: being bored.",
  ethos:[
   {t:"“You know me: I am the first to bring the energy. If I am voting for nature, it means it will not be boring.”", pts:2,
    fb:"👏 <b>+2</b> — Clever ethos: your reputation as the fun one directly answers their number-one fear, boredom."},
   {t:"“Listen to me: I am the class representative; it is my role to choose what is good for the class.”", pts:1,
    fb:"😐 <b>+1</b> — Being class representative gives you the floor, not automatic authority. Your classmates shrug."},
   {t:"“The people who prefer the theme park are babies who have never left their sofa.”", pts:0,
    fb:"😡 <b>+0</b> — Insulting half your audience… bold strategy. And a losing one: it is a personal attack, not an argument."},
  ],
  pathos:[
   {t:"“Imagine it: the campfire at night, water fights by the river, laughing in the dorm. The theme park is something we already do with family. THIS is something we will only experience once — and together.”", pts:2,
    fb:"👏 <b>+2</b> — You sell fun and memories with friends: exactly what they want. Their eyes light up."},
   {t:"“Nature is precious: we must learn to contemplate it in silence.”", pts:1,
    fb:"😐 <b>+1</b> — “Contemplate it in silence”… you have just awakened their worst fear: boredom. Nice argument, wrong audience."},
   {t:"“If we choose the theme park, I will not come, and too bad for you.”", pts:0,
    fb:"😡 <b>+0</b> — Sulking has never convinced anyone. Toxic pathos."},
  ],
  logos:[
   {t:"“The nature trip costs €80 less per person: with the difference, we can pay for a pizza night AND an extra kayaking activity.”", pts:2,
    fb:"👏 <b>+2</b> — A concrete calculation translated into benefits they actually want (pizza + kayaking): unbeatable."},
   {t:"“Studies show that nature reduces stress and improves concentration in class.”", pts:1,
    fb:"🙂 <b>+1</b> — True… but “improving concentration in class” is not exactly the dream of your Year 8 classmates. Poorly targeted argument."},
   {t:"“Last year, one class went to the theme park and it rained all week. Theme park = guaranteed rain!”", pts:0,
    fb:"😬 <b>+0</b> — One class, one time: hasty generalisation (and rain falls on forests too). Your classmates laugh — at your argument."},
  ],
  lesson:"Even an audience of classmates requires <b>adaptation</b>: their values are fun and memories. The serious eco-style speech that would convince adults falls flat here."
 },
 {
  goal:"You are a public-health spokesperson doctor in the United States: convince a conservative audience to get vaccinated. (A real case seen in training!)",
  aemoji:"🇺🇸", aname:"A conservative audience",
  adesc:"Attached to national pride, individual freedom, and the economy. Wary of major institutions and Hollywood.",
  ethos:[
   {t:"“I am not a politician: I have been a frontline doctor for twenty years, and I care for your families, here, in this town.”", pts:2,
    fb:"👏 <b>+2</b> — Ground-level legitimacy, without a political label that would make the audience defensive. Perfect ethos for this public."},
   {t:"“The World Health Organization recommends this vaccine.”", pts:1,
    fb:"🙂 <b>+1</b> — Real authority… but distant and institutional: this audience is precisely wary of large organisations. Limited effect."},
   {t:"“The biggest Hollywood stars all got vaccinated publicly!”", pts:0,
    fb:"😬 <b>+0</b> — Hollywood, for THIS audience? Halo effect + wrong reference group: you have just lost the room."},
  ],
  pathos:[
   {t:"“This vaccine was invented here, by our researchers, in our laboratories. Getting vaccinated means proudly flying the country's colours.”", pts:2,
    fb:"👏 <b>+2</b> — National pride: the exact emotional lever for this audience. This argument really was used in 2021!"},
   {t:"“Think of vulnerable people: get vaccinated to protect the most fragile among us.”", pts:1,
    fb:"🙂 <b>+1</b> — A good argument… but one that worked on the OTHER audience (progressive). Here, collective solidarity matters less than freedom and pride."},
   {t:"“People who do not get vaccinated are selfish and ignorant.”", pts:0,
    fb:"😡 <b>+0</b> — Insulting your audience: the worst rhetorical strategy in the world. The room empties."},
  ],
  logos:[
   {t:"“Every sick employee means two weeks off work for our businesses. When we are vaccinated, we work, shops stay open, and the economy gets moving again.”", pts:2,
    fb:"👏 <b>+2</b> — The economic argument: concrete and aligned with their values. Unbeatable here."},
   {t:"“Studies show 90% effectiveness against severe cases, with a robust confidence interval.”", pts:1,
    fb:"🙂 <b>+1</b> — Scientifically true… but the jargon (“confidence interval”) loses an already wary audience. Precision without pedagogy does not convince."},
   {t:"“My cousin got vaccinated and never caught Covid: proof that it works!”", pts:0,
    fb:"😬 <b>+0</b> — One single case proves nothing: hasty generalisation. The audience knows it, and your credibility drops."},
  ],
  lesson:"Real case: in the United States, <b>different</b> arguments were used to convince Democrats (“let's protect vulnerable people”) and Republicans (“the vaccine is American, the economy gets moving again”). Neither is more “true” than the other: they are <b>adapted to their audience</b>. That is rhetoric."
 },
];

const REGS=["ethos","pathos","logos"];
let mi=0, sel={ethos:-1,pathos:-1,logos:-1}, order={}, stars=0;
// Chantier 04 : les missions passaient toujours dans le même ordre. DECK est le
// tirage mélangé de la partie en cours ; c'est lui qu'on indexe, pas MISSIONS.
let DECK=[];
const $=id=>document.getElementById(id);
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

function startGame(){
  DECK=shuffle([...MISSIONS]);
  mi=0; stars=0;
  $("intro").style.display="none";
  $("hud").style.display="flex";
  $("game").style.display="block";
  $("qtot").textContent=DECK.length;
  renderMission();
}

function renderMission(){
  const M=DECK[mi];
  clearDelivery();
  deliveryPending=false;
  $("skipbtn").style.display="none";
  sel={ethos:-1,pathos:-1,logos:-1};
  $("qnum").textContent=mi+1;
  $("mtxt").textContent=M.goal;
  $("aemoji").textContent=M.aemoji;
  $("aname").textContent=M.aname;
  $("adesc").textContent=M.adesc;
  $("builder").style.display="block";
  $("delivery").style.display="none";
  $("verdict").style.display="none";
  $("nextbtn").style.display="none";
  for(let s=0;s<3;s++) $("step"+s).style.display="none";
  $("conv-fill").style.width="0%";
  $("conv-val").textContent="0 %";
  REGS.forEach(reg=>{
    order[reg]=shuffle([...M[reg].keys()]);
    const wrap=$("opts-"+reg); wrap.innerHTML="";
    order[reg].forEach(oi=>{
      const o=M[reg][oi];
      const b=document.createElement("button");
      b.className="opt";
      b.textContent=o.t;
      b.setAttribute("aria-pressed","false");
      b.onclick=()=>{
        sel[reg]=oi;
        wrap.querySelectorAll(".opt").forEach(x=>{
          x.classList.toggle("sel",x===b);
          x.setAttribute("aria-pressed",x===b?"true":"false");
        });
        checkReady();
      };
      wrap.appendChild(b);
    });
  });
  checkReady();
  window.scrollTo({top:0,behavior:"smooth"});
}

function checkReady(){
  const ready=REGS.every(r=>sel[r]>=0);
  const btn=$("speakbtn");
  btn.disabled=!ready;
  btn.textContent=ready?"🎙️ Give the speech!":"🎙️ Choose one argument for each register";
}

// ── Chantier 04 : restitution interruptible ────────────────────────
// La séquence durait ~4,2 s sans aucun moyen de passer, cinq fois par partie.
// Un clic, Entrée ou Espace la termine ; prefers-reduced-motion la saute.
let deliveryTimers=[], deliveryPending=false;

function clearDelivery(){ deliveryTimers.forEach(clearTimeout); deliveryTimers=[]; }

function prefersReducedMotion(){
  return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches);
}

function showStep(s){
  const o=DECK[mi][REGS[s]][sel[REGS[s]]];
  const step=$("step"+s);
  step.classList.remove("p0","p1","p2");
  step.classList.add("p"+o.pts);
  step.querySelector(".dsaid").textContent=o.t;
  step.querySelector(".dreact").innerHTML=o.fb;
  step.style.display="block";
  return o.pts;
}

function setConviction(total){
  const pct=Math.round(total/6*100);
  $("conv-fill").style.width=pct+"%";
  $("conv-val").textContent=pct+" %";
}

function skipDelivery(){
  if(!deliveryPending) return;
  clearDelivery();
  deliveryPending=false;
  $("skipbtn").style.display="none";
  let total=0;
  for(let s=0;s<3;s++) total+=showStep(s);
  setConviction(total);
  verdict(total);
}

function speak(){
  $("builder").style.display="none";
  $("delivery").style.display="block";
  clearDelivery();
  deliveryPending=true;
  // Sans animation, on va droit au verdict : il n'y a rien à attendre.
  if(prefersReducedMotion()){ skipDelivery(); return; }
  $("skipbtn").style.display="block";
  let total=0;
  REGS.forEach((reg,s)=>{
    deliveryTimers.push(setTimeout(()=>{
      total+=showStep(s);
      setConviction(total);
      $("step"+s).scrollIntoView({behavior:"smooth",block:"center"});
      if(s===2) deliveryTimers.push(setTimeout(()=>{
        deliveryPending=false;
        $("skipbtn").style.display="none";
        verdict(total);
      },900));
    },500+s*1400));
  });
}

// Entrée / Espace passent aussi la restitution, au clavier seul.
document.addEventListener("keydown",e=>{
  if(!deliveryPending) return;
  if(e.key==="Enter"||e.key===" "||e.code==="Space"){ e.preventDefault(); skipDelivery(); }
});

function verdict(total){
  const M=DECK[mi];
  const got = total>=6?3 : total>=4?2 : total>=2?1 : 0;
  stars+=got;
  $("hud-stars").textContent="⭐ "+stars;
  let t;
  if(got===3) t="🎉 Standing ovation! The audience is won over.";
  else if(got===2) t="👏 Audience convinced — a few sceptics remain.";
  else if(got===1) t="😶 Mixed reception… the speech did not land.";
  else t="🍅 Total fiasco. They almost threw tomatoes at you.";
  $("v-title").textContent=t;
  $("v-stars").textContent="⭐".repeat(got)+"☆".repeat(3-got);
  // Chantier 04 : le joueur recevait 0 à 3 ⭐ sans savoir pourquoi.
  $("v-scale").textContent=I18N.t("scaleGot")+" "+total+"/6 — "+I18N.t("scale");
  $("v-lesson").innerHTML=M.lesson;
  $("verdict").style.display="block";
  $("nextbtn").textContent = mi===DECK.length-1 ? "See my final result ➜" : "Next mission ➜";
  $("nextbtn").style.display="block";
  $("verdict").scrollIntoView({behavior:"smooth",block:"center"});
  $("nextbtn").focus();
}

function nextMission(){
  if(mi===DECK.length-1){ endGame(); return; }
  mi++; renderMission();
}

function endGame(){
  $("game").style.display="none";
  $("hud").style.display="none";
  $("end").style.display="block";
  const max=DECK.length*3;
  $("end-score").textContent="⭐ "+stars+" / "+max;
  let title,msg;
  if(stars>=max-2){title="🏆 Exceptional speaker!";msg="You have mastered the finest art of rhetoric: <b>adapting to the audience</b>. Ethos, pathos, logos… you know which one to use, and above all how to phrase it for THIS specific audience.";}
  else if(stars>=Math.round(max*0.55)){title="🎙️ Good speaker!";msg="Your speeches have impact! Keep the key reflex: before speaking, ask yourself <b>“what matters to THEM?”</b> — their values, their fears, their pride.";}
  else{title="📢 Budding speaker";msg="Rhetoric is something you <b>practise</b> more than something you simply learn! Read the audience reactions again: a true but poorly targeted argument convinces less than an adapted one.";}
  msg+="<br><br>💡 And remember: knowing these techniques helps you <b>convince honestly</b>… and spot when they are being used on you.";
  $("end-title").textContent=title;
  $("end-msg").innerHTML=msg;
}
