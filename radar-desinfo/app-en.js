const CATS = [
  {id:"fake",  emoji:"🚫", name:"Fake news",            desc:"plain false information"},
  {id:"ctx",   emoji:"✂️", name:"Decontextualization",  desc:"true info, false context"},
  {id:"corr",  emoji:"🔗", name:"Correlation ≠ causation", desc:"two true facts, imagined link"},
  {id:"astro", emoji:"🤖", name:"Astroturfing",         desc:"fake grassroots movement"},
  {id:"doute", emoji:"🌫️", name:"Manufacturing doubt",    desc:"deliberately sowing confusion"},
  {id:"mute",  emoji:"🔇", name:"Mute news",            desc:"hiding or drowning out information"},
  {id:"cadr",  emoji:"🖼️", name:"Framing effect",     desc:"chosen angle to steer interpretation"},
  {id:"ok",    emoji:"✅", name:"Reliable information",          desc:"nothing to flag!"},
];

const ITEMS = [
  {t:"May 2022, a cabinet reshuffle is imminent. A post from the newspaper L'Obs circulates on Twitter: “Manuel Valls appointed Prime Minister”. The post is authentic… but it dates from April 1, 2014, the day Valls really was appointed.",
   a:"ctx", e:"The post is <b>true</b>, the newspaper is <b>real</b>… but the date has been removed. By removing the context, you can misinform without fabricating a single false fact."},
  {t:"A video supposedly “filmed in Ukraine” shows dozens of bodies lined up. After a few seconds, one of them starts moving. In reality, the video comes from Austria: climate protesters were simulating deaths caused by global warming.",
   a:"ctx", e:"The video is authentic, but it has been given a <b>false context</b>. You do not need to fake images to deceive people: lying about their origin is enough."},
  {t:"On social media, hundreds of accounts post enthusiastic messages of support for a leader at the same time. An investigation shows they are employees paid to post.",
   a:"astro", e:"This is <b>astroturfing</b>: simulating a spontaneous grassroots movement. Our brain thinks, “if so many people agree, there must be a reason”… that is the popularity bias being exploited."},
  {t:"Since the 1950s, we have known that cigarettes are dangerous. Yet the tobacco industry funded “contradictory” studies for decades to delay public health laws.",
   a:"doute", e:"<b>Manufacturing doubt</b>: you do not need to convince people that cigarettes are healthy; you only need to make them confused to buy time. A powerful technique, still used today."},
  {t:"“A footballer dies of a heart attack three days after his vaccination.” Both facts are accurate and the newspaper says nothing false.",
   a:"corr", e:"Two events that happen one after the other are not necessarily linked: this is <b>co-occurrence</b>. By placing them in the same sentence, the reader is pushed to imagine a causal link that nothing proves."},
  {t:"A science news website runs the headline: “Lemon juice could help cure AIDS”.",
   a:"fake", e:"A <b>too-simple solution to a complex problem</b> is usually false. Researchers have been looking for a cure for 40 years: if lemon worked, we would know. Information that contradicts current knowledge = fake news."},
  {t:"For weeks, a celebrity's accident takes up almost all TV news coverage. At the same time, historic uprisings shake Iran… and appear almost nowhere.",
   a:"mute", e:"<b>Mute news</b>: not talking, or barely talking, about information also shapes our view of the world. It is not a lie; it is an editorial choice — but it affects us."},
  {t:"Newspaper A: “Despite the crisis, 64% of French people are keeping the same Christmas budget”. Newspaper B: “Because of the crisis, 36% of French people have to reduce their Christmas budget”. It is the same study.",
   a:"cadr", e:"Exactly the same information, presented as half full or half empty: this is the <b>framing effect</b>. The way true information is presented changes how we feel about it."},
  {t:"A TV channel broadcasts no false information about a vaccine. But it systematically chooses worrying angles: “Some doctors urge caution…”, “The vaccination rate is declining…”",
   a:"cadr", e:"No fake news, but a <b>selection of angles</b> that sows doubt. It is subtle: every sentence is true; it is the accumulation of choices that misinforms."},
  {t:"“A French inventor has created a water engine, but oil lobbies are preventing it from being sold!”",
   a:"fake", e:"We hear about the water engine every two or three years… it never works. The inventor is actually freely selling his engines: nobody is “preventing” him. The conspiracy touch (the lobbies!) is used to explain why the revolution never arrives."},
  {t:"Several major newspapers simultaneously announce the arrest of Xavier Dupont de Ligonnès in Scotland. The information turns out to be false.",
   a:"fake", e:"Even when <b>many sources</b> report something, the information can still be false! Here the newspapers were sincere: this is called <b>misinformation</b> (sharing false information in good faith) rather than disinformation."},
  {t:"To justify an invasion, a leader gives multiple and contradictory explanations: “denazifying” the neighbouring country, fighting “Western decadence”, defending against a threat…",
   a:"doute", e:"People do not need to believe it: they only need to be <b>confused</b>. Confused citizens lose interest in the conflict and put less pressure on their governments. This is manufacturing doubt in wartime."},
  {t:"“People who fall asleep with their shoes on more often wake up with a headache.” An internet user concludes: “shoes compress blood circulation”.",
   a:"corr", e:"The initial information is true! But the real explanation is <b>alcohol</b>: it makes people forget to take off their shoes AND gives them a headache. Correlation is not causation."},
  {t:"As a US election approaches, it is discovered that both sides have paid companies to create fake “citizen” accounts campaigning online.",
   a:"astro", e:"Astroturfing is not the weapon of just one side: in 2016, both Trump and Clinton used it. That is why it is important to be wary of “spontaneous waves” of identical opinions online."},
  {t:"A science magazine reports that there is a biologically immortal species of jellyfish, capable of rejuvenating indefinitely.",
   a:"ok", e:"Surprise: it is <b>true</b>! Turritopsis dohrnii can reverse its life cycle. Lesson: the rule “it sounds incredible, so it must be false” does not always work. Not everything is disinformation!"},
  {t:"The IPCC publishes a climate report, written and reviewed by thousands of scientists from dozens of countries, confirming human-caused global warming.",
   a:"ok", e:"<b>Scientific consensus</b> remains our best tool: either thousands of independent experts are all lying together, or the information is solid. The second option is far more likely."},
  {t:"A president calls an article “fake news” — even though it is accurate — showing that the crowd at his inauguration was smaller than his predecessor's.",
   a:"doute", e:"The political use of the term “fake news”: shouting “lie” in response to <b>true information</b> that is inconvenient. The aim is not to convince, but to sow doubt about the media in general. This is how Trump popularised the term in 2016."},
  {t:"You receive an email: “Hello, I am Sébastien, 72 years old, seriously ill, and I would like to leave you 3 million euros.”",
   a:"fake", e:"If information is <b>too good to be true</b>, it is usually false. This is a classic scam that plays on hope… and a good critical-thinking reflex helps you avoid it."},
  {t:"In 2013, a Malaysia Airlines plane (flight MH370) disappears without a trace: several American channels devote dozens of hours of live coverage to it. At the same time, a civil war breaks out in South Sudan and kills thousands of people… without a single special bulletin interrupting regular programming.",
   a:"mute", e:"<b>Mute news</b>: it is not that anyone lies about South Sudan, it is that almost nobody talks about it. What gets covered — and what gets ignored — shapes our view of the world just as much as a lie would."},
  {t:"In March 2020, photos of completely empty supermarket shelves are taken during the first hours of lockdown. The same photos keep resurfacing since then, recycled for every new scare, captioned “Widespread shortages in France, right now!”.",
   a:"ctx", e:"The photos are <b>authentic</b>, but their date got lost along the way. A true image, reused outside its original context, can keep misinforming people for years after the real event."},
  {t:"In cities where more ice cream is sold, more people also drown in swimming pools.",
   a:"corr", e:"Ice cream does not cause drowning! A <b>hidden factor</b> explains both: heat. When it is hot, people eat more ice cream AND go swimming more. Correlation still is not causation."},
  {t:"In a single night, a small neighbourhood restaurant receives 200 new five-star reviews on a platform, all written in stilted, near-identical phrasing and posted at the same time.",
   a:"astro", e:"A genuine wave of happy customers doesn't happen overnight, nor in such a uniform style: this is commercial <b>astroturfing</b> — fake reviews bought in bulk to simulate a popularity that doesn't exist."},
  {t:"A study shows that a drug “doubles the risk” of a rare side effect. In reality, that risk goes from 1 person in a million to 2 people in a million.",
   a:"cadr", e:"“Doubling a risk” sounds alarming, even though the real risk stays tiny: this is the <b>framing effect</b> applied to numbers. Always check the absolute risk, not just the percentage change."},
];

let deck=[], idx=0, score=0, lives=3, streak=0, best=0;
const $ = id => document.getElementById(id);

function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

function startGame(){
  deck = shuffle([...ITEMS]).slice(0,12);
  idx=0; score=0; lives=3; streak=0; best=0;
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
  $("wire-time").textContent="No."+String(idx+1).padStart(3,"0")+" — "+h+":"+String(m).padStart(2,"0");
  $("dtxt").textContent=it.t;
  $("feedback").style.display="none";
  $("nextbtn").style.display="none";
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
    streak++; best=Math.max(best,streak);
    score += 10 + (streak>=3?5:0);
    $("fb-title").textContent = streak>=3 ? `✔ Good catch! (+15, streak of ${streak} 🔥)` : "✔ Good catch! (+10)";
  } else {
    btn.classList.remove("dim"); btn.classList.add("bad");
    streak=0; lives--;
    $("fb-title").textContent="✘ Missed it! The right answer: "+CATS.find(c=>c.id===it.a).name;
  }
  $("lives").textContent="❤️".repeat(lives)+"🖤".repeat(3-lives);
  $("score").textContent=score;
  $("streak").textContent = streak>=2 ? `🔥 ${streak}` : "";
  const fb=$("feedback");
  fb.className = ok ? "ok" : "ko";
  fb.style.display="block";
  $("fb-expl").innerHTML=it.e;
  if(lives<=0 || idx===deck.length-1){
    $("nextbtn").textContent = "See my final result ➜";
  } else {
    $("nextbtn").textContent = "Next news item ➜";
  }
  $("nextbtn").style.display="block";
  $("nextbtn").scrollIntoView({behavior:"smooth",block:"end"});
}

function nextQ(){
  if(lives<=0 || idx===deck.length-1){ endGame(); return; }
  idx++; renderQ();
  window.scrollTo({top:0,behavior:"smooth"});
}

function endGame(){
  $("game").style.display="none";
  $("nextbtn").style.display="none";
  $("hud").style.display="none";
  $("end").style.display="block";
  $("end-score").textContent=score+" pts";
  const ratio = score/(deck.length*10);
  let title,msg;
  if(lives<=0){ title="📡 Radar fried…"; msg="You have used up your 3 lives. Disinformation is subtle: play again to sharpen your radar!"; }
  else if(ratio>=0.9){ title="🏆 Elite fact-checker!"; msg="Almost nothing gets past you. You understand that fake news is only the tree hiding the forest."; }
  else if(ratio>=0.6){ title="🕵️ Good investigator!"; msg="You already spot the techniques well. Remember: decontextualizing, framing, burying information… you can misinform without lying."; }
  else { title="🔍 Radar apprentice"; msg="This is a good start! There are many techniques: decontextualization, astroturfing, manufacturing doubt, mute news, framing… Play again to make them stick."; }
  if(best>=5 && lives>0) msg += " Your best streak: "+best+" 🔥";
  $("end-title").textContent=title;
  $("end-msg").textContent=msg;
}
