// ─── Possible answers ───
const EPL = [
  {id:"ethos",  l:"🏛️ Ethos", s:"he appeals to ethics, values, or his legitimacy"},
  {id:"pathos", l:"💔 Pathos", s:"he plays on emotion"},
  {id:"logos",  l:"🧮 Logos", s:"he argues through logic and facts"},
];
const FALLACIES = [
  {id:"paille",   l:"🎃 Straw man", s:"caricaturing your point in order to attack it"},
  {id:"adhom",    l:"👤 Personal attack", s:"targeting the person, not the argument"},
  {id:"popu",     l:"📣 Appeal to popularity", s:"'everyone thinks so!'"},
  {id:"dilemme",  l:"⚖️ False dilemma", s:"claiming there are only two options"},
  {id:"pente",    l:"🎢 Slippery slope", s:"exaggerating a chain of consequences"},
  {id:"genehat",  l:"🎲 Hasty generalisation", s:"drawing a conclusion from a single case"},
  {id:"nature",   l:"🌿 Appeal to nature", s:"'natural' does not mean 'good'"},
  {id:"halo",     l:"⭐ Authority outside their field", s:"famous ≠ competent (halo effect)"},
  {id:"preuve",   l:"🔄 Reversed burden of proof", s:"the person making the claim must prove it"},
  {id:"posthoc",  l:"🔗 Imagined cause", s:"'after this, therefore because of this' (correlation ≠ causation)"},
  {id:"circulaire", l:"🔁 Circular reasoning", s:"the conclusion is used as its own proof"},
  {id:"hareng",     l:"🐟 Red herring",         s:"changing the subject to dodge the question"},
  {id:"cherry",     l:"🍒 Cherry-picking",       s:"only showing the data that fits"},
  {id:"whatabout",  l:"🪞 Whataboutism",         s:"pointing at the other's hypocrisy instead of answering"},
];
const VALABLE={id:"valable", l:"✅ Sound argument", s:"no trap: it's a good argument"};
function libelle(id){ return [...EPL,...FALLACIES,VALABLE].find(o=>o.id===id); }

// ─── Opponents ───
// type "epl": identify ethos/pathos/logos. type "fall": name the fallacy (a = id, opts = 3 distractors)
const FOES = [
  {name:"Uncle Gerard", emoji:"🍗", desc:"family-dinner champion", hp:4,
   intro:"At dessert, Uncle Gerard puts down his fork: 'You, with all your studying, let's see if you know how to debate!' The discussion begins.",
   lines:[
    {type:"epl", t:"'Listen, kid, I have 60 years of life behind me. I have worked hard all my life, and I have never lied to anyone. So you can take my word for it!'",
     a:"ethos", e:"Gerard gives <b>no argument</b> about the actual issue: he highlights his honesty and life experience to inspire trust. That is <b>contextual ethos</b> — like a politician who says they are 'close to the people'."},
    {type:"epl", t:"'You want to become vegetarian?! Think of your poor grandmother… she made you roast chicken with so much love. You want to break her heart, is that it?'",
     a:"pathos", e:"There is no logic here: Gerard leans fully on <b>emotion</b> — guilt, the grandmother, the love of roast chicken. That is pure <b>pathos</b> — very effective, and very common in advertising."},
    {type:"fall", t:"'My neighbour ate organic food all his life, and he got sick anyway. Organic food is useless, that proves it!'",
     a:"genehat", opts:["popu","nature","adhom"],
     e:"One neighbour does not make a scientific study! Drawing a conclusion from <b>a single case</b> is a <b>hasty generalisation</b>. To know whether organic food has an effect, you need to compare thousands of people."},
    {type:"fall", t:"'Anyway, medicines are chemicals. I treat myself with plants: it is natural, so it is obviously better for your health!'",
     a:"nature", opts:["dilemme","genehat","preuve"],
     e:"The <b>appeal to nature</b>: 'natural' does not mean 'good' — hemlock and death cap mushrooms are 100% natural — and 'chemical' does not mean 'bad'. Many medicines actually come from plants!"},
    {type:"fall", t:"'If we let young people play video games, soon they will never leave their rooms, then they will drop out of school, and in ten years this country will be ruined!'",
     a:"pente", opts:["paille","dilemme","posthoc"],
     e:"The <b>slippery slope</b>: linking increasingly catastrophic consequences as if they were inevitable, without proving any link in the chain."},
    {type:"fall", t:"'And you defend screens, do you? That is rich, with your glasses and your average maths grades!'",
     a:"adhom", opts:["paille","halo","popu"],
     e:"Gerard does not answer your arguments: he <b>attacks you</b>. That is a personal attack, or ad hominem. Targeting the person to discredit their argument is common… and fallacious."},
    {type:"sain", t:"\"Wear your helmet when you cycle: if you fall, it greatly reduces the risk of a serious head injury. There are lots of studies on this and they all point the same way.\"",
     a:"valable", opts:["genehat", "halo", "pente"],
     e:"For once, Gérard is right! A precise claim, backed by <b>many studies that agree</b>: that's a <b>sound argument</b>. Recognising it means scoring a <b>point of agreement</b>, the basis of an honest debate."},
   ]},
  {name:"Maxx_Buzz", emoji:"🤳", desc:"influencer with 2.4M followers", hp:5,
   intro:"Maxx_Buzz grabs his selfie stick: 'Hey community! Today I'm debating a hater. Drop your likes!'",
   lines:[
    {type:"epl", t:"'Look at this video of an abandoned kitten in the rain… 😢 If you do not share my fundraiser after that, you have no heart.'",
     a:"pathos", e:"Emotion as an engagement lever: that is <b>pathos</b>. Social media loves it, because emotional information grabs our attention… whether it is true or false. Be careful before liking!"},
    {type:"fall", t:"'My new detox drink is backed by science: 2.4 million followers cannot be wrong!'",
     a:"popu", opts:["halo","preuve","genehat"],
     e:"The <b>appeal to popularity</b>: the number of fans proves nothing. Millions of people have believed false things before. Popularity measures visibility, not truth."},
    {type:"fall", t:"'This star footballer says my drink boosts his performance. He is a world champion, so he knows what he is talking about!'",
     a:"halo", opts:["popu","posthoc","adhom"],
     e:"The <b>halo effect</b>: we transfer someone's competence in one area — football — to a completely unrelated area — nutrition. Being a world champion does not make someone a drinks expert; that is exactly how advertising works."},
    {type:"fall", t:"'Since I started drinking my detox juice every morning, I have not had a single cold. Proof that it works!'",
     a:"posthoc", opts:["genehat","nature","preuve"],
     e:"'After this, therefore because of this': two events that follow each other are not necessarily linked. That is an <b>imagined cause</b> — maybe Maxx would not have caught a cold anyway. Only a real study could tell us."},
    {type:"fall", t:"'You say my product is useless? Prove to me that it DOES NOT work! Until you have proof, I am right.'",
     a:"preuve", opts:["dilemme","adhom","popu"],
     e:"A reversal of the <b>burden of proof</b>: it is up to <b>the person making the claim</b> to prove it, not the other way around. Otherwise I could claim anything — 'Joe Biden is a reptilian!' — and demand that you prove me wrong."},
    {type:"epl", t:"'The numbers speak for themselves: out of 1,000 testers, 87% said they felt better after one month. Here is the full study in the description.'",
     a:"logos", e:"This time, Maxx provides <b>data and a source</b>: that is <b>logos</b>, argumentation through logic and facts. Be careful: a logos argument can still be misleading — you need to check the study! But the <i>appeal</i> being used is reason."},
    {type:"sain", t:"\"Before you buy a product I show, check whether it's sponsored and read independent reviews: I get paid to talk about it.\"",
     a:"valable", opts:["popu", "halo", "cherry"],
     e:"Maxx gives honest, checkable advice: <b>no trap</b> here. A good argument can come from someone you distrust: you judge the argument, not the person."},
   ]},
  {name:"Senator Brutus", emoji:"🏛️", desc:"formidable political speaker", hp:6,
   intro:"Senator Brutus adjusts his tie under the spotlights: 'My dear fellow citizens, let us see what this young challenger is made of.'",
   lines:[
    {type:"epl", t:"'It is outrageous that in the homeland of human rights, the country of the Enlightenment, people are still sleeping in the streets. In the name of fraternity, vote for me!'",
     a:"ethos", e:"Brutus invokes <b>great universal values</b> — the Enlightenment, fraternity, human rights: that is <b>universal ethos</b>. The other form, contextual ethos, consists of presenting oneself as virtuous."},
    {type:"epl", t:"'Every country that lowered this tax saw unemployment fall within two years. We propose the same cut: here are the projections, sector by sector.'",
     a:"logos", e:"Data, comparisons, projections: Brutus uses <b>logos</b>. It is the type of argument that appears most solid… but always check the figures: logos can hide misused statistics."},
    {type:"fall", t:"'My opponent wants to regulate speed in cities. In other words, he wants to ban cars, take away your freedom to move around, and lock you inside your homes!'",
     a:"paille", opts:["pente","dilemme","adhom"],
     e:"The <b>straw man</b>: distorting the opponent's position — regulating ≠ banning — in order to attack the caricature rather than the real argument. The opposite of honest debate is the 'steel man': reformulating the other person's argument faithfully."},
    {type:"fall", t:"'Things are simple: either you vote for my surveillance law, or you accept living in total insecurity. You have to choose!'",
     a:"dilemme", opts:["pente","paille","popu"],
     e:"The <b>false dilemma</b>: presenting two options as the only possibilities, when there are many others — other laws, other methods, and so on. When someone tells you 'it is this or chaos', be suspicious."},
    {type:"fall", t:"'Why listen to this climate scientist? He was seen taking a plane to a conference! His hypocrisy disqualifies all his research.'",
     a:"adhom", opts:["halo","paille","preuve"],
     e:"Attacking the <b>person's behaviour</b> in order to reject their <b>scientific arguments</b>: ad hominem. Even if the hypocrisy is real — like Harrison Ford and his private jet — it does not make the data false."},
    {type:"fall", t:"'All the polls put me in the lead. The people are with me! How dare you claim I am wrong when millions of French people support me?'",
     a:"popu", opts:["preuve","genehat","dilemme"],
     e:"The <b>appeal to popularity</b>, political version: being in the majority does not make an argument true. Truth is not decided by vote — for centuries, most people thought the Sun revolved around the Earth."},
    {type:"epl", t:"'Remember that little girl I met in hospital, her drawings pinned to the wall… It is for her, for your children, that I am fighting tonight.'",
     a:"pathos", e:"The moving anecdote, the sick child, the trembling voice: top-level <b>pathos</b>. It is not good or bad in itself — Martin Luther King also used pathos — but you need to <b>spot it</b> so that emotion alone does not convince you."},
    {type:"sain", t:"\"I propose renovating the most run-down schools first. Here is the inspection report published last month: anyone can check the list, school by school.\"",
     a:"valable", opts:["popu", "dilemme", "cherry"],
     e:"A proposal, a <b>public source</b>, data <b>anyone can check</b>: that's a <b>sound argument</b>. Even a formidable politician can be right on one point."},
   ]},
  {name:"The Conspiracy Uncle", emoji:"🕵️", desc:"has done his own research", hp:6,
   intro:"Behind his wall of sticky notes and printed articles, he points a finger at you: 'Ah, you too believe what they tell you on TV… Let me open your eyes.'",
   lines:[
    {type:"fall", t:"'Look, I found TEN studies that support my view! The «official» scientists just refuse to look at this evidence.'",
     a:"cherry", opts:["popu","halo","genehat"],
     e:"<b>Cherry-picking</b>: he only shows the studies that suit him and stays silent about the vast majority of research that says the opposite. Real scientific consensus is judged on the whole body of evidence, not on ten hand-picked studies."},
    {type:"fall", t:"'How do I know it is true? It is written in black and white on my trusted website. And that website can be trusted… because it says so itself!'",
     a:"circulaire", opts:["preuve","popu","adhom"],
     e:"<b>Circular reasoning</b>: the conclusion ('this website is reliable') is used as its own proof, with no outside verification at all. It is like saying 'I tell the truth because I never lie'."},
    {type:"fall", t:"'The month this 5G antenna was installed near my house, my cat got sick. Coincidence? I do not think so.'",
     a:"posthoc", opts:["nature","genehat","cherry"],
     e:"Another <b>imagined cause</b>: two events that follow each other in time are not necessarily linked. The cat could have gotten sick for a thousand reasons — only a real study could establish a link with the antenna."},
    {type:"epl", t:"'Do not you feel that they are lying to you? That knot in your stomach, that feeling that something is wrong… They are hiding the truth, and deep down, you know it.'",
     a:"pathos", e:"No facts, no proof: just <b>fear</b> and a feeling of betrayal. That is <b>pathos</b> — very effective for convincing without having to demonstrate anything."},
    {type:"fall", t:"'Prove to me that it is NOT a conspiracy! Until you have proof of the contrary, you have to admit I am right.'",
     a:"preuve", opts:["dilemme","adhom","popu"],
     e:"Another <b>reversed burden of proof</b>: it is up to the person claiming there is a conspiracy to prove it, not up to you to prove otherwise. Otherwise anyone could claim anything and demand it be disproven."},
    {type:"fall", t:"'Vaccines are full of chemicals. I would rather boost my defences with 100% natural remedies — that is just more logical, right?'",
     a:"nature", opts:["dilemme","genehat","cherry"],
     e:"The <b>appeal to nature</b>: 'natural' does not mean 'harmless', and 'chemical' does not mean 'harmful'. Water, arsenic and snake venom are all 100% natural too."},
    {type:"epl", t:"'Unlike journalists paid by lobbies, I have done my own research for years. I have no hidden interest, just the truth to defend.'",
     a:"ethos", e:"He presents himself as the only honest one, the only one who has 'done his research': that is <b>contextual ethos</b>, a self-proclaimed legitimacy. Spending hours online does not replace expertise in a field, nor the scientific method."},
    {type:"sain", t:"\"I admit it: I'm no expert. Before sharing this, we should check what several reliable sources say.\"",
     a:"valable", opts:["preuve", "circulaire", "cherry"],
     e:"A rare moment of clarity: admitting your limits and <b>wanting to check</b> several sources is exactly the right approach. <b>Sound argument</b>."},
   ]},
  {name:"The Greenwashing CEO", emoji:"👔", desc:"master of corporate spin", hp:6,
   intro:"Under the press conference lights, they adjust their lapel mic: 'Here, the planet is our #1 priority. Let me explain why you are wrong to worry.'",
   lines:[
    {type:"fall", t:"'You are asking about our CO2 emissions? Let me tell you about our wonderful cardboard-cup recycling programme, launched this year in all our offices!'",
     a:"hareng", opts:["whatabout","popu","cherry"],
     e:"A <b>red herring</b>: they change the subject (CO2 → recycled cups) instead of answering the question asked. Recycling cups is nice, but it says nothing about the company's emissions."},
    {type:"fall", t:"'You criticise our carbon footprint? What about our competitors — have you seen theirs? They are far worse than us, and nobody holds them accountable!'",
     a:"whatabout", opts:["adhom","dilemme","hareng"],
     e:"<b>Whataboutism</b>: pointing at another's hypocrisy or supposed flaws instead of answering on the substance. Even if competitors pollute more, that does not make their own carbon footprint acceptable."},
    {type:"fall", t:"'10 million customers trust us every day. With that much support, how could we possibly be a polluting company?'",
     a:"popu", opts:["halo","preuve","genehat"],
     e:"The <b>appeal to popularity</b>: the number of customers says nothing about the company's real environmental impact. Having many customers can simply mean a lot of marketing and market share."},
    {type:"fall", t:"'This world-famous actress agreed to be our ambassador. If such a committed public figure trusts us, our products must really be environmentally friendly.'",
     a:"halo", opts:["popu","preuve","cherry"],
     e:"The <b>halo effect</b>: acting talent has nothing to do with environmental expertise. A celebrity can be paid to represent a brand without knowing anything about its real carbon footprint."},
    {type:"epl", t:"'Our figures are clear: -12% emissions per unit produced since 2019, +30% investment in renewable energy. Here is the full detail in our 40-page CSR report.'",
     a:"logos", e:"Numbers, dates, a detailed report: that is <b>logos</b>. Be careful, though: presenting precise statistics does not rule out <b>cherry-picking</b> behind the scenes — always check what the report leaves out."},
    {type:"epl", t:"'Here, commitment and responsibility are not just words: they are our founding values, written into our charter since day one.'",
     a:"ethos", e:"Grand values on display (commitment, responsibility) with no concrete evidence behind them: that is <b>ethos</b>. A charter proves nothing unless it comes with verifiable results."},
    {type:"fall", t:"'Look: at our Lyon factory, we cut emissions by 5% this year. Proof that our environmental strategy works!'",
     a:"cherry", opts:["posthoc","popu","halo"],
     e:"<b>Cherry-picking</b>: a single positive figure, from a single site, is highlighted — while staying silent about the rest of the group, where emissions may have risen."},
    {type:"sain", t:"\"Our Lyon factory cut its emissions by 30%, and the figure was checked by an independent body. There's still a lot to do at our other sites.\"",
     a:"valable", opts:["cherry", "halo", "hareng"],
     e:"This time the figure is <b>independently checked</b>, and she <b>admits what is left to do</b> elsewhere: that's not cherry-picking. <b>Sound argument</b>."},
   ]},
];

// ─── The dialogue: answering, and understanding what drives the other person ───
// For each opponent, in the order of their lines: q = an open question,
// r = a faithful rephrasing (the "steelman") or, for a good argument,
// acknowledging it; k = what the character confides once they open up (a clue
// to their hidden motive). motiv = the real motive; leurres = false leads, the
// last one the closest (only served in Hard).
const DIALOGUE = [
  {motiv:"He is afraid of losing his place in the family: the world is changing fast, and he feels left behind.",
   leurres:["He wants the last word: at the table, he is always right, and he enjoys it.","He is defending his old trade: he worked in livestock farming all his life.","He distrusts anything new: for him, things were better before, for everyone."],
   braque:"Gerard folds his arms: 'Oh, listen to you with your big words!' He has stopped listening.",
   esquive:"Gerard shrugs and helps himself to more cheese. Nothing has moved.",
   fin:"Gerard smiles: 'Come on, let's go for a bike ride together on Sunday. With helmets, I promise.'",
   lignes:[
    {q:"'What has your life taught you about this, concretely?'",
     r:"'If I understand you, you're worried your experience doesn't count anymore. It counts for me: shall we look at the facts together?'",
     k:"'You know, at my age, it feels like nobody listens to what you've lived through anymore.'"},
    {q:"'What really worries you about me eating less meat?'",
     r:"'You're afraid our family dinners won't be the same. I'll always come, and I love Grandma's cooking, even without chicken.'",
     k:"'These dinners are all we have left to be together… If you change everything, what will be left?'"},
    {q:"'What did your neighbour get ill with? That must have shaken you.'",
     r:"'You're saying organic food doesn't guarantee good health, and that's true. But one case isn't enough to say it's useless: shall we look at what the large studies say?'",
     k:"'My neighbour was my best friend. I never understood why he got ill.'"},
    {q:"'What makes you prefer plants to medicines?'",
     r:"'If I follow you, you distrust medicines that feel too chemical. Some plants really do heal, but hemlock is natural too… Shall we look case by case?'",
     k:"'Since my operation, I'm fed up with doctors talking to me like a child.'"},
    {q:"'What scares you when you see young people gaming?'",
     r:"'You're worried screens will take over, and that's a real question. But gaming doesn't necessarily lead to dropping out of school: where would you draw the line?'",
     k:"'When you were little, the two of us went fishing. Now you're always on your screen…'"},
    {q:"'My glasses, fine. But about screens, what really bothers you?'",
     r:"'I can tell you're annoyed. Let's leave my grades out of it: your point is that screens harm studying, right?'",
     k:"'Sorry. It's just… I struggle to keep up with everything you young people know.'"},
    {q:"'You're right. What makes you think of it today?'",
     r:"'You're right, and the studies back it up. I'll wear it.'",
     k:"'I was so scared the day your cousin fell. I care about you all, that's all.'"},
   ]},
  {motiv:"He is afraid of losing followers, and so his income: he says what the brands ask him to say.",
   leurres:["He wants to be famous at any cost: likes matter more to him than the truth.","He hates scientists: they mocked him in a video last year.","He sincerely believes in his products: he thinks a detox drink cured him."],
   braque:"Maxx cuts the mic: 'Another hater… Blocked.' The conversation ends there.",
   esquive:"Maxx moves on to his next story. Nothing has moved.",
   fin:"Maxx puts away his selfie stick: 'You know what? My next video will be: how to spot sponsored content.'",
   lignes:[
    {q:"'Why does this fundraiser matter to you?'",
     r:"'I understand you want to help this kitten. But you can be moved and still want to know where the money goes: can you tell us?'",
     k:"'If my videos don't get views, I can't pay my rent next month.'"},
    {q:"'What do 2.4 million followers mean to you?'",
     r:"'You're saying lots of people like your drink, and that's probably true. But it doesn't tell us whether it detoxes anything: what does the science actually say?'",
     k:"'Numbers are my life. If they drop, the brands leave.'"},
    {q:"'How did this footballer discover your drink?'",
     r:"'This footballer is a sports champion, sure. But in nutrition, what makes him an expert?'",
     k:"'The brand picked the footballer, not me. I hadn't even tasted the drink before the shoot.'"},
    {q:"'Do you have other reasons to think it's the juice?'",
     r:"'You haven't had a cold, good. But it could be something else: sleep, luck… How can we know it's the juice?'",
     k:"'Honestly? I don't know if it's the juice. It's the line the brand asked me to say.'"},
    {q:"'What would you risk if the product didn't work?'",
     r:"'You're asking me to prove it doesn't work. But it's up to whoever sells the product to show that it works: do you have independent studies?'",
     k:"'If I admit the product is useless, I lose the contract… and my community's trust.'"},
    {q:"'Who ran this study?'",
     r:"'You're relying on numbers, which is a good approach. To make it solid, we'd need to know who ran the study, and how.'",
     k:"'The brand paid for the study. I didn't check: I post three videos a day, I don't have time.'"},
    {q:"'That's brave. Why did you decide to say it?'",
     r:"'Thanks for saying that, it's honest and rare. It makes me trust you more.'",
     k:"'I'd love to make more honest videos, but I'm scared nobody would watch them.'"},
   ]},
  {motiv:"He is afraid of losing the election and letting down those who believed in him: so he exaggerates.",
   leurres:["He doesn't believe in any of his ideas: he says whatever wins votes, then forgets.","A company pays him: his laws serve his friends' interests first.","He loves being applauded: on stage, cheers matter more than solutions."],
   braque:"Brutus turns to the audience: 'You see? My opponents have nothing but insults!' He comes out stronger.",
   esquive:"Brutus carries on with his speech. Nothing has moved.",
   fin:"Brutus lowers the mic: 'You know, I prefer a debate like this one to all my rallies. Shall we do it again, in front of the voters?'",
   lignes:[
    {q:"'What touches you personally about this issue?'",
     r:"'You're saying it's shameful that people sleep on the streets, and I agree. Concretely, what do you propose?'",
     k:"'I grew up in a neighbourhood where neighbours slept in their cars. I've never forgotten it.'"},
    {q:"'In those countries, did other things change at the same time?'",
     r:"'You're basing your proposal on data, which is a good start. We'd still need to check that the fall in unemployment really came from that tax.'",
     k:"'My team spent nights on those projections. If I lose, all that work will be lost.'"},
    {q:"'Can you quote exactly what your opponent proposes?'",
     r:"'If I rephrase faithfully: your opponent wants to limit speed in cities, not ban cars. What bothers you about that measure?'",
     k:"'I admit it, I caricature. My advisers say you need punchlines, otherwise nobody remembers anything.'"},
    {q:"'Are there really only these two options?'",
     r:"'You want people to be safe, which is legitimate. But between your law and total insecurity, there are other solutions: which ones did you rule out?'",
     k:"'My team tells me I'm slipping in the polls. When I'm scared, I oversimplify.'"},
    {q:"'What do you think of his research itself?'",
     r:"'You say he's inconsistent, fair enough. But his results must be judged on their merits: what's wrong with his data?'",
     k:"'That climate scientist put me on the spot in the last debate. I didn't know how to answer him…'"},
    {q:"'What would you say to those who don't support you?'",
     r:"'Many people support you, that's a fact. But being popular doesn't mean being right on this specific point: what are your arguments?'",
     k:"'To be honest, that poll is from last year. Today, I'm not sure of anything.'"},
    {q:"'What did you promise that little girl?'",
     r:"'This story clearly matters to you. What is your precise plan for children in hospital?'",
     k:"'That little girl is real. I promised her that her hospital would stay open.'"},
    {q:"'That's clear and checkable. How did you choose the order of the schools?'",
     r:"'Thank you for publishing your sources: that's exactly what makes an honest debate possible.'",
     k:"'The people who elected me are counting on me. I don't want to let them down.'"},
   ]},
  {motiv:"He felt looked down on and alone: in his online group, people finally listen to him.",
   leurres:["He makes money from his website: the more he scares people, the more remedies he sells.","He wants to scare people for fun: sowing doubt is a game to him.","He thinks he is smarter than everyone: he loves seeing what others miss."],
   braque:"'See, you're like the others: you think I'm an idiot.' He retreats into his certainties.",
   esquive:"He goes back to his phone. Nothing has moved.",
   fin:"He takes a sticky note off the wall: 'We could check one of my facts together next week? Just to see.'",
   lignes:[
    {q:"'How did you find these ten studies?'",
     r:"'You found ten studies, that's work. But if there are hundreds saying the opposite, we need to look at them all: shall we do it together?'",
     k:"'Scientists never answered me. In my group, at least, people take me seriously.'"},
    {q:"'Who is behind this website?'",
     r:"'You trust this website, I get it. But to know if it's reliable, you need an outside source that confirms it: do you have one?'",
     k:"'A friend from the group made that site. They're the only ones who supported me when I lost my job.'"},
    {q:"'Is your cat better? What did the vet say?'",
     r:"'I'm sorry about your cat. The illness coming at the same time as the antenna raises questions, but it doesn't prove one caused the other.'",
     k:"'My cat is all I have left since I've been living alone. I needed to understand.'"},
    {q:"'How long have you had this feeling?'",
     r:"'You feel real distrust, and it probably comes from somewhere. But a feeling isn't enough to prove a lie: what started it?'",
     k:"'This feeling that something's wrong, I've had it since I was laid off. That day, they lied to me.'"},
    {q:"'What could change your mind?'",
     r:"'You're asking me to prove there's no conspiracy. But it's up to whoever makes the claim to prove it: what's your strongest evidence?'",
     k:"'If I'm wrong, then I've wasted years… and maybe lost my friends from the group too.'"},
    {q:"'What drove you away from doctors?'",
     r:"'You want to look after your health, that's legitimate. But natural doesn't mean safe, and chemical doesn't mean dangerous: shall we look at the data on vaccines?'",
     k:"'A doctor once talked to me like I was an idiot. Since then, I'd rather manage on my own.'"},
    {q:"'How did you start this research?'",
     r:"'You've spent a lot of time searching, I respect that. How do you check that your sources are reliable?'",
     k:"'My research is mostly whole evenings online. It keeps me busy, since I've been alone.'"},
    {q:"'Good idea. Which sources would seem reliable to you?'",
     r:"'That's exactly the right approach. Shall we check together?'",
     k:"'It feels good to be spoken to without being mocked.'"},
   ]},
  {motiv:"They know the overall record is bad, and fear for their job and their team if they say so.",
   leurres:["They enjoy manipulating the public: convincing people despite the facts is a challenge for them.","They are convinced their company is exemplary: they have never seen the figures.","They know nothing about ecology: they repeat a speech without understanding it."],
   braque:"The CEO smiles, unflappable: 'I think we have nothing more to say to each other.' They end the interview.",
   esquive:"The CEO goes back to their talking points. Nothing has moved.",
   fin:"The CEO switches off their mic: 'I'll propose that we publish the full record, site by site. It will be harder… but more honest.'",
   lignes:[
    {q:"'And your CO2 emissions, precisely, how are they changing?'",
     r:"'Recycling cups is good. But my question was about your CO2 emissions: could you come back to that?'",
     k:"'Emissions aren't my department. I was handed this speech this morning.'"},
    {q:"'And what are your targets for your own emissions?'",
     r:"'Your competitors may well do worse. But that says nothing about your own record: where do you stand?'",
     k:"'If I say we pollute, my colleagues will pay the price.'"},
    {q:"'Do your customers know your carbon footprint?'",
     r:"'You have many customers, that's a fact. But being liked doesn't prove you don't pollute: what are your total emissions?'",
     k:"'Management wants positive messages. The rest, I'm not allowed to talk about.'"},
    {q:"'Has your ambassador visited your factories?'",
     r:"'This actress is committed, I don't doubt it. But she isn't a carbon-footprint expert: who assessed your products?'",
     k:"'The ambassador? She signed a contract. She has never set foot in one of our factories.'"},
    {q:"'And your total emissions, how have they changed?'",
     r:"'You give precise figures, which is good. To be clear: emissions per unit are falling, but what about the total?'",
     k:"'Per unit, yes. But we produce much more… In total, our emissions are rising.'"},
    {q:"'How do these values translate into action this year?'",
     r:"'These values matter to you, I hear that. What shows, concretely, that they are applied?'",
     k:"'I joined this company for these values. Today, I find them hard to defend.'"},
    {q:"'And your other factories?'",
     r:"'Lyon is improving, good. But one factory isn't the whole group: what are the figures overall?'",
     k:"'Lyon is our best site. The others, I'd rather not discuss in public.'"},
    {q:"'That's real progress. How do you plan to extend it to other sites?'",
     r:"'Thank you for this verified figure, and for acknowledging what remains to be done. That's what makes your word credible.'",
     k:"'Thank you. It's the first time anyone has let me say what remains to be done.'"},
   ]},
];
// ─── The surprise boss: the dojo sensei ───
// Only if the dojo exam is passed: after the five characters, Kakasophe
// comes to give his last lesson: do not take your master at his word.
const SENSEI_BOSS=(()=>{ try{ return !!(JSON.parse(localStorage.getItem("arene.dojo"))||{}).examen; }catch(e){ return false; } })();
if(SENSEI_BOSS){
  FOES.push({name:"Sensei Kakasophe", emoji:"🧑‍🦳", desc:"your own master", hp:8, boss:true,
   intro:"Surprise! The lights of the Agora dim. A small orange book snaps shut. “Last lesson, my student.” Sophisuke freezes: “…Master?!”",
   lines:[
    {type:"epl", t:"“I have taught the art of debate for thirty years. If I tell you it's true, you can believe me.”",
     a:"ethos", e:"Your master gives <b>no argument</b>: he relies on his legitimacy and thirty years of experience. That's <b>ethos</b>. Even from someone you respect, it proves nothing."},
    {type:"fall", t:"“I have read this little orange book forty times. Its author is a great novelist: when he says vaccines are dangerous, I listen.”",
     a:"halo", opts:["popu","genehat","preuve"],
     e:"Being a great novelist does not make you competent in medicine. That's <b>authority outside its field</b> (halo effect): we credit someone with knowledge they don't have."},
    {type:"fall", t:"“My lessons are right, since I am the one teaching them. And I only teach right lessons.”",
     a:"circulaire", opts:["preuve","halo","dilemme"],
     e:"The conclusion (“my lessons are right”) is its own proof. That's <b>circular reasoning</b>: the loop goes round, but nothing is demonstrated."},
    {type:"fall", t:"“Look: my five best students all won their debates. My method never fails.”",
     a:"cherry", opts:["genehat","popu","posthoc"],
     e:"He only shows the students who succeeded. What about those who lost? What about Sophisuke? That's <b>cherry-picking</b>: keeping only the data that suits you."},
    {type:"fall", t:"“You criticise me for being late? And you, did you hand in your homework on time this year?”",
     a:"whatabout", opts:["adhom","hareng","paille"],
     e:"He turns the criticism back on you instead of answering it. That's <b>“What about you?”</b>: even if you're late too, it doesn't make his lateness acceptable."},
    {type:"fall", t:"“Either you follow my path, or you end up like Sophisuke. Choose.”",
     a:"dilemme", opts:["pente","adhom","popu"],
     e:"Only two paths? You can learn from your master without following him blindly. That's a <b>false dilemma</b>. (Sophisuke, offended: “Hey!”)"},
    {type:"fall", t:"“Prove me wrong. You can't? Then I'm right.”",
     a:"preuve", opts:["circulaire","dilemme","hareng"],
     e:"The burden of proof lies with whoever makes the claim. Not being able to contradict him right away doesn't make him right: that's the <b>reversed burden of proof</b>."},
    {type:"sain", t:"“Don't believe me because I'm your master. Check my sources: if they hold, the argument holds.”",
     a:"valable", opts:["halo","circulaire","preuve"],
     e:"At last, the real lesson. Judging an argument by its <b>evidence</b>, not by the person who makes it, is a <b>valid argument</b>, and the whole spirit of the dojo."},
   ]});
  DIALOGUE.push({motiv:"He is afraid of having trained disciples who take him at his word: he wants to know if you think for yourself, even against him.",
   leurres:["He wants to prove he is still the best: he can't stand a student surpassing him.","He has gone over to the sophists: he too prefers winning to being right.","He wants Sophisuke back: he is jealous that his former disciple walks by your side."],
   braque:"Kakasophe reopens his little book: “You hit hard, but you don't listen. You still have a long way to go.”",
   esquive:"Kakasophe sighs: “Running from disagreement is not what I taught you.”",
   fin:"Kakasophe puts his book away and smiles under his mask: “I have nothing left to teach you. You didn't take me at my word.” Sophisuke, under his breath: “…Not bad, beginner.”",
   lignes:[
    {q:"“What makes you so sure of yourself this time?”",
     r:"“Your experience matters, master. But you taught me to ask for evidence: what's yours?”",
     k:"“Sophisuke took me at my word. The day he saw me make a mistake, he left.”"},
    {q:"“What do you like so much about this author?”",
     r:"“You admire this novelist, I understand. But on vaccines, what do doctors and studies say?”",
     k:"“A student who repeats his master is a parrot, not a student.”"},
    {q:"“How would you know if one of your lessons was wrong?”",
     r:"“You say your lessons are right. I often believe you. But what shows it, apart from you?”",
     k:"“I have been wrong, sometimes. Nobody ever told me to my face.”"},
    {q:"“And your students who lost, what became of them?”",
     r:"“Your best students won, that's true. To judge your method, shouldn't we count those who lost too?”",
     k:"“My students who lost… I never count them. I should have.”"},
    {q:"“Let's talk about my homework later. Why do my questions about your lateness bother you?”",
     r:"“Fine, I'm not perfect either. But my question still stands: why are you late?”",
     k:"“I'm getting old. Who will check my lessons when I'm gone?”"},
    {q:"“Why do you say Sophisuke ended up badly?”",
     r:"“You're afraid I'll get lost the way you think he did. But I can listen to your lessons without following all of them, can't I?”",
     k:"“Sophisuke didn't end up badly. He just stopped believing me without checking.”"},
    {q:"“What would make you change your mind?”",
     r:"“You're the one making the claim, so it's up to you to prove it. I'm happy to look with you: where do we start?”",
     k:"“If I win this debate, it means I taught you badly.”"},
    {q:"“Is that what you expected from me all along?”",
     r:"“You're right: I'll check your sources like anyone else's. You're the one who taught me that.”",
     k:"“There. That was the last lesson.”"},
   ]});
}
FOES.forEach((f,i)=>{ f.dlg=DIALOGUE[i]; f.lines.forEach((l,j)=>{ l.d=DIALOGUE[i].lignes[j]; l.dlg=DIALOGUE[i]; l.foe=f; }); });

let foeIdx=0, lineIdx=0, youHP=6, foeHP=0, order=[];
let correctCount=0, totalCount=0, matchCorrect=0;
// E2 : ce que la partie a joué, pour l'écran de fin ColFin — {id, titre, reussi, explication}.
// Les répliques n'ont pas d'identifiant : leur texte (t) en tient lieu d'une partie à l'autre.
const JEU="arene-rhetorique";
let joue=[];
// Les sophismes croisés pendant la partie, pour la révision de fin : id → {ok, ko}.
let croises={};
// « Rejouer mes erreurs » : un adversaire de révision, composé des seules répliques ratées.
let revision=null;
function foeActuel(){ return revision || FOES[foeIdx]; }
function texteBrut(html){ const d=document.createElement("div"); d.innerHTML=String(html).replace(/<br\s*\/?>/gi," "); return d.textContent; }
// ─── Dojo techniques (dojo.html) ───
// Each trial passed in the dojo unlocks a technique, read here from the dojo
// progress (localStorage “arene.dojo”). The three active ones work once per
// fight; the Bells give +1 maximum conviction point.
const DOJO_P=(()=>{ try{ return JSON.parse(localStorage.getItem("arene.dojo"))||{}; }catch(e){ return {}; } })();
const DOJO_EP=DOJO_P.epreuves||{};
const TECHS=[
  {id:"regard",  ep:"feuilles", l:"👁️ Piercing Gaze", s:"removes wrong answers"},
  {id:"seconde", ep:"oeil",     l:"🌀 Second Sight", s:"your next mistake costs nothing"},
  {id:"contre",  ep:"contre",   l:"⚡ Counter-attack", s:"right: +1 openness; wrong: −2 clarity"},
].filter(x=>DOJO_EP[x.ep]);
// Agora ally: if the dojo exam is passed, Sophisuke goes along with the
// player and, once per fight, whispers the name of the manipulation.
if(DOJO_P.examen) TECHS.push({id:"souffle", l:"🥷 Ask Sophisuke", s:"he names the trick"});
const SOUFFLE_COMS=["“Pfft. I used to teach that trick.”", "“Well spotted. You are improving… a little.”", "“Hmph. Even I couldn't have spotted it better.”", "“That one doesn't work on us anymore.”"];
let techUsed={}, techActive={}, ligneEnCours=null;
// The three goals of a match: clarity (youHP), the other person's openness, and what you understood of them.
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
  if(i===0 || revision){ youHP=YOUMAX; correctCount=0; totalCount=0; joue=[]; croises={}; }
  if(i===0 && !revision){ bilan={question:0, reformulation:0, massue:0, esquive:0, compris:0}; oublierPartie(); }
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
  $("hp-you-txt").textContent="🧭 Clarity: "+youHP+"/"+YOUMAX;
  $("hp-foe-txt").textContent="🤝 Openness: "+ouverture+"/"+foe.lines.length;
  $("hp-you").setAttribute("aria-valuemax",YOUMAX);
  $("hp-you").setAttribute("aria-valuenow",Math.max(0,youHP));
  $("hp-foe").setAttribute("aria-valuemax",foe.lines.length);
  $("hp-foe").setAttribute("aria-valuenow",ouverture);
}

function renderTurn(){
  const foe=foeActuel();
  const line=foe.lines[order[lineIdx % order.length]];
  ligneEnCours=line; techActive={};
  // Le carnet se range sous l'échange : la réplique à analyser reste en haut, même sur téléphone.
  $("dialogue").after($("carnet"));
  $("souffle").hidden=true;
  $("btxt").textContent=line.t;
  $("riposte").style.display="none";
  $("nextbtn").style.display="none";
  $("dialogue").hidden=true; $("dialogue").innerHTML="";
  document.querySelector(".bubble").hidden=false; $("piste").hidden=false;
  $("turn-progress").textContent="Reply "+(lineIdx+1)+" / "+foe.lines.length;
  const bubble=document.querySelector(".bubble");
  bubble.classList.remove("pop-replay");
  void bubble.offsetWidth;
  bubble.classList.add("pop-replay");
  tourFini=false;
  lancerAttaque(line);
  const ansDiv=$("answers"); ansDiv.innerHTML="";
  let choices;
  if(line.type==="epl"){
    $("qprompt").textContent="Which rhetorical appeal is being used?";
    choices=shuffle(EPL.map(o=>({...o})));
  } else {
    $("qprompt").textContent="What is the trap in this argument… if there is one?";
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
  // Au clavier, chaque réplique commence sur la première réponse.
  ansDiv.firstElementChild.focus({preventScroll:true});
}

function answer(line,id,btn){
  const ok=id===line.a;
  // Second Sight: the mistake doesn't count, the same line stays in play.
  if(!ok && btn && techActive.seconde){
    techActive.seconde=false;
    if(btn.tagName==="INPUT"){ btn.value=""; btn.focus(); } else { btn.disabled=true; btn.classList.add("bad"); }
    const r=$("riposte"); r.className="ko"; r.style.display="block";
    $("rip-title").textContent="🌀 Second Sight! Your mistake doesn't count: choose again.";
    $("rip-expl").innerHTML="";
    renderTechs();
    return "seconde";
  }
  const dmg=techActive.contre?2:1;
  tourFini=true;
  finAttaque(ok, line);
  joue.push({id:line.t, titre:line.t, reussi:ok, explication:texteBrut(line.e)});
  if(FALLACIES.some(f=>f.id===line.a)){ const c=croises[line.a]||(croises[line.a]={ok:0,ko:0}); if(ok) c.ok++; else c.ko++; }
  totalCount++;
  if(ok){ correctCount++; matchCorrect++; }
  const all=[...document.querySelectorAll(".abtn")];
  all.forEach(b=>{b.disabled=true;b.classList.add("dim");});
  const goodLabel=libelle(line.a).l;
  all.forEach(b=>{ if(b.dataset.id===line.a){b.classList.remove("dim");b.classList.add("good");} });
  if(ok){
    if(dmg===2) ouverture=Math.min(foeActuel().lines.length,ouverture+1);
    $("rip-title").textContent="✔ Well spotted! You identified the technique.";
  } else {
    if(btn){ btn.classList.remove("dim");btn.classList.add("bad"); }
    youHP=Math.max(0,youHP-dmg);
    $("f-you").classList.add("shake");
    setTimeout(()=>$("f-you").classList.remove("shake"),450);
    $("rip-title").textContent="✘ Ouch! It was: "+goodLabel;
  }
  if(line.a==="valable") $("rip-title").textContent=ok?"✅ Point of agreement! It wasn't an attack, it was a real argument.":"✘ Ouch! You saw a trap where there wasn't one: it was a sound argument.";
  if(dmg===2) $("rip-title").textContent=(ok?"⚡ Counter-attack landed: +1 openness. ":"⚡ Counter-attack missed: −2 clarity. ")+$("rip-title").textContent;
  techActive={};
  renderTechs(true);
  updateHP();
  const rip=$("riposte");
  rip.className=ok?"ok":"ko"; rip.style.display="block";
  $("rip-expl").innerHTML=line.e;
  // Sophisuke commente de temps en temps une ruse bien repérée.
  if(ok && DOJO_P.examen && FALLACIES.some(f=>f.id===line.a) && Math.random()<.4){ const c=document.createElement("p"); c.className="souffle"; c.textContent="🥷 Sophisuke : "+SOUFFLE_COMS[Math.floor(Math.random()*SOUFFLE_COMS.length)]; $("rip-expl").appendChild(c); }
  if(youHP<=0){
    $("nextbtn").style.display="block";
    $("nextbtn").textContent="😵 You got carried away… ➜";
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
  if(revision){ finDePartie("📝 Review complete", scoreLine()); return; }
  if(foeIdx===FOES.length-1){ victory(); return; }
  const next=FOES[foeIdx+1];
  $("inter").style.display="block";
  $("inter-emoji").textContent=FOES[foeIdx].emoji;
  $("inter-title").textContent="💬 End of the discussion with "+FOES[foeIdx].name;
  $("inter-msg").innerHTML="You catch your breath: +3 clarity. 🌿<br><br>Next person: <b>"+next.emoji+" "+next.name+"</b> — "+next.desc+".<br><i>"+next.intro+"</i>";
  youHP=Math.min(YOUMAX,youHP+3);
  $("inter-btn").textContent="💬 Talk with "+next.name;
  $("inter-btn").onclick=()=>startMatch(foeIdx+1);
  $("inter-btn").focus();
  sauverPartie();
}

function scoreLine(){
  const pct=totalCount?Math.round(correctCount/totalCount*100):0;
  return "Final score: "+correctCount+" correct answers out of "+totalCount+" ("+pct+"%)";
}

// E2 : l'écran de fin — titre, score, répliques ratées et boutons — est rendu par ColFin.
function finDePartie(titre, msg){
  $("end").style.display="block";
  ColFin.rendre({
    jeu: JEU, titre: titre, message: texteBrut(msg),
    score: correctCount, total: totalCount, items: joue,
    onRejouer: rates => {
      const lines=FOES.flatMap(f=>f.lines).filter(l=>rates.some(r=>r.id===l.t));
      startMatch(foeIdx, {name:"Review", emoji:"📝", desc:"the lines you missed", hp:lines.length, intro:"", lines:lines});
    },
    onRecommencer: () => startMatch(0),
    rejouerTexte: "🔄 Start over from the beginning"
  });
  renderRevue();
}

// La révision de fin : tous les sophismes croisés, avec la définition et la parade du dojo
// (dojo-data.js est chargé par index.html), ou à défaut la description courte.
function renderRevue(){
  const box=$("revue-sophismes"); if(!box) return;
  const ids=Object.keys(croises);
  box.hidden=!ids.length;
  if(!ids.length){ box.innerHTML=""; return; }
  const esc=x=>String(x).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));
  const dojo=(typeof DOJO!=="undefined")?DOJO.sophismes:{};
  box.innerHTML="<h2>📜 The fallacies you came across</h2><p class='rv-intro'>To review them all: what each trap does, and how to answer it.</p><dl>"+ids.map(id=>{
    const f=libelle(id), d=dojo[id], c=croises[id];
    const etat=c.ko?"<span class='rv-ko'>✖ to review</span>":"<span class='rv-ok'>✔ spotted</span>";
    const def=d?esc(d.d.charAt(0).toUpperCase()+d.d.slice(1))+" <b>Parry:</b> "+esc(d.parade):esc(f.s);
    return "<dt>"+esc(f.l)+" "+etat+"</dt><dd>"+def+"</dd>";
  }).join("")+"</dl>";
}

// The ending for two: after the sensei, Sophisuke and the hero start a project together.
const PROJET_COMMUN="🥷 Sophisuke sheathes his sword: “The old man is right about one thing: what you know is worthless if you keep it to yourself.” Together, you decide to open your own Agora dojo, to teach others to debate without getting carried away. Your first students? Your class: start a real debate with “Run a debate in class” on the home page.";
// Without the dojo, the hero thinks there is something to learn there.
const PISTE_DOJO="🙋 “All these traps… I bet I'd have loads to learn at the dojo.” The dojo is waiting for you on the home page.";
function victory(){
  oublierPartie();
  $("retry-btn").style.display="none";
  const msg=(SENSEI_BOSS?PROJET_COMMUN+"<br><br>":"")+"You talked with "+(SENSEI_BOSS?"all five characters and your own master":"all five characters")+", and understood what drove "+bilan.compris+" of them out of "+FOES.length+".<br><br>Your answers: "+bilan.question+" questions, "+bilan.reformulation+" rephrasings, "+bilan.esquive+" dodges, "+bilan.massue+" sledgehammer blows.<br><br>"+scoreLine()+"<br><br>Spotting a fallacy is only the start. What moves a discussion forward is asking questions, faithfully rephrasing the other person's idea (the <b>steelman</b>), acknowledging their good arguments… and trying to understand what matters to them. 🤝";
  finDePartie(SENSEI_BOSS?"🥋 Last lesson passed!":"🤝 Dialogue builder!", msg+(SENSEI_BOSS?"":"<br><br>"+PISTE_DOJO.replace("🙋",window.Avatar?Avatar.emoji():"🙋")));
}

function lose(){
  $("battle").style.display="none";
  $("nextbtn").style.display="none";
  const title="You got carried away…";
  const msg=foeActuel().name+" led you into too many traps. No worries: the art of discussion is something you <b>practise</b> more than something you learn.<br><br>"+scoreLine()+"<br><br>Read the replies carefully: straw man, false dilemma, appeal to popularity… Once you know them, you see them everywhere!";
  finDePartie("😵 "+title, msg+(SENSEI_BOSS?"":"<br><br>"+PISTE_DOJO.replace("🙋",window.Avatar?Avatar.emoji():"🙋")));
  // Reprendre ce personnage est le choix le plus utile : il passe en tête des boutons de fin.
  $("retry-btn").style.display="none";
  const rb=document.createElement("button");
  rb.type="button"; rb.className="col-btn";
  rb.textContent="🔁 Resume the discussion with "+foeActuel().name;
  rb.onclick=()=>{ $("end").style.display="none"; youHP=YOUMAX; startMatch(foeIdx, revision); };
  const actions=document.querySelector("#ecran-fin .col-actions");
  if(actions){ actions.prepend(rb); rb.focus({preventScroll:true}); }
}

// Technique buttons, under the conviction bars.
function renderTechs(fini){
  const box=$("techs"); if(!box) return;
  box.innerHTML="";
  box.hidden=!TECHS.length;
  TECHS.forEach(x=>{
    const b=document.createElement("button");
    b.type="button";
    b.className="tech-btn"+(techActive[x.id]?" active":"");
    const sous=techUsed[x.id]?(techActive[x.id]?"active: answer now!":"already used"):x.s;
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
    $("saisie-indice").textContent="👁️ Hint: "+bonne.s;
  } else if(id==="regard"){
    // Removes wrong answers until only two are left in play.
    const enJeu=[...document.querySelectorAll(".abtn:not(:disabled)")];
    const fausses=shuffle(enJeu.filter(b=>b.dataset.id!==ligneEnCours.a));
    fausses.slice(0,Math.max(0,enJeu.length-2)).forEach(b=>{b.disabled=true;b.classList.add("dim");});
  } else if(id==="souffle"){
    const a=ligneEnCours.a, nom=libelle(ligneEnCours.a).l.replace(/^\S+\s/,"");
    const dit=a==="valable" ? "“Nothing to report… it's a real argument. It pains me to say it.”" : EPL.some(o=>o.id===a) ? "“His lever? "+nom+". Watch how he does it.”" : "“I know this trick: "+nom+". I used to teach it to the sophists.”";
    const p=$("souffle"); p.textContent="🥷 Sophisuke, whispering: "+dit; p.hidden=false;
  } else techActive[id]=true;
  renderTechs();
  const premier=document.querySelector(".abtn:not(:disabled)"); if(premier) premier.focus();
}

// ─── Sauvegarde de la partie ───
// Entre deux personnages, la partie est gardée (clé « arene.partie ») : une
// séance interrompue reprend au personnage suivant, avec la lucidité, le score
// et le bilan acquis. Une nouvelle partie, ou la victoire, l'efface.
const CLE_PARTIE="arene.partie";
function sauverPartie(){
  try{ localStorage.setItem(CLE_PARTIE, JSON.stringify({v:1, foe:foeIdx+1, youHP:youHP, correctCount:correctCount, totalCount:totalCount, joue:joue, croises:croises, bilan:bilan})); }catch(e){}
}
function oublierPartie(){ try{ localStorage.removeItem(CLE_PARTIE); }catch(e){} }
// Le personnage à reprendre doit exister : sans le boss (dojo effacé), FOES n'a que cinq entrées.
function lirePartie(){
  let s=null; try{ s=JSON.parse(localStorage.getItem(CLE_PARTIE)); }catch(e){}
  return (s && s.v===1 && s.foe>0 && s.foe<FOES.length) ? s : null;
}
function reprendrePartie(){
  const s=lirePartie(); if(!s) return;
  youHP=Math.max(1,Math.min(YOUMAX,s.youHP)); correctCount=s.correctCount||0; totalCount=s.totalCount||0;
  joue=s.joue||[]; croises=s.croises||{};
  bilan=Object.assign({question:0, reformulation:0, massue:0, esquive:0, compris:0}, s.bilan);
  startMatch(s.foe);
}

// Intro: what the dojo has already taught the player, and the avatar of whoever passed the exam.
(function(){
  const etat=$("dojo-etat");
  if(etat){
    const noms=TECHS.map(x=>x.l.replace(/^\S+\s/,""));
    if(DOJO_EP.clochettes) noms.push("🔔 Bells (+1 clarity)".replace(/^\S+\s/,""));
    etat.textContent=noms.length?"🥋 Dojo techniques ready for the Agora: "+noms.join(", ")+".":"🥋 New: train at the dojo first to earn techniques you can use here.";
  }
  { const a=document.querySelector("#f-you .femoji"); if(a&&window.Avatar) a.textContent=Avatar.emoji();
    if(a&&DOJO_P.examen){ const c=document.createElement("span"); c.className="ceinture"; c.textContent="🥋"; c.title="black belt: dojo exam passed"; a.after(c); } }
  // Une partie en cours : on propose d'abord de la reprendre.
  const sp=lirePartie(), zone=document.querySelector(".intro-btns");
  if(sp && zone){
    const f=FOES[sp.foe], b=document.createElement("button");
    b.type="button"; b.className="bigbtn"; b.id="reprendre-partie";
    b.textContent="▶ Resume my game: "+f.emoji+" "+f.name+" ("+(sp.foe+1)+"/"+FOES.length+")";
    b.onclick=reprendrePartie;
    zone.prepend(b);
    const n=zone.querySelector('[data-i18n="enter"]');
    if(n){ n.removeAttribute("data-i18n"); n.textContent="💬 New game on the Agora"; }
  }
})();

// ─── “Free typing” mode ───
// The player types the name of the fallacy instead of picking it. Matching
// ignores accents, case and small words, tolerates a few typos, and accepts
// the usual names in both French and English (same table in app.js and
// app-en.js: a student may type “homme de paille” in English mode).
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
  input.placeholder=line.type==="epl"?"Ethos, pathos or logos?":"Type the name of the fallacy…";
  input.setAttribute("aria-label","Your answer");
  const ok=document.createElement("button"); ok.type="submit"; ok.className="saisie-ok"; ok.textContent="Check";
  const passe=document.createElement("button"); passe.type="button"; passe.className="saisie-passe"; passe.textContent="🤷 I don't know";
  const msg=document.createElement("p"); msg.className="saisie-msg"; msg.id="saisie-msg"; msg.setAttribute("aria-live","polite");
  const indice=document.createElement("p"); indice.className="saisie-msg"; indice.id="saisie-indice";
  form.append(input,ok);
  if(line.type!=="epl"){
    const val=document.createElement("button"); val.type="button"; val.className="saisie-valable"; val.textContent="✅ It's a good argument";
    val.onclick=()=>conclureSaisie(line, "valable", input, null);
    form.appendChild(val);
  }
  form.append(passe,msg,indice);
  ansDiv.appendChild(form);
  form.onsubmit=e=>{
    e.preventDefault();
    const ids=(line.type==="epl"?EPL:FALLACIES).map(o=>o.id);
    const id=reconnaitre(input.value, ids);
    if(!id){ msg.textContent="I don't recognise that name. Try another wording (or “I don't know”)."; input.select(); return; }
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
  note.textContent=id==="valable"&&tape==null?"You judged the argument sound.":tape!=null?"You typed “{x}”: recognised as {l}.".replace("{x}",tape.trim()).replace("{l}",lab):"You passed.";
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

// ─── The battle scene ───
// Each line leaves the opponent like an attack. In Hard mode it crosses the
// track in slow motion: you must answer before impact. In Easy mode it hangs
// mid-way, with no timer. A sound argument, once recognised, turns green.
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
  $("rip-title").textContent="⏱️ Too late: you didn't react in time! "+$("rip-title").textContent;
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

// ─── Second step: what do you answer? ───
// Une fois le piège repéré (ou non), le joueur choisit sa réponse. Le coup de
// massue et l'esquive ferment la discussion ; la question et la reformulation
// l'ouvrent, et le personnage confie un indice de sa motivation cachée.
// En Facile, l'indice est donné même après une mauvaise réponse ; en
// Difficile, il faut le mériter.
const GESTES={
  massue:{l:"🔨 Sledgehammer", bon:false, m:"Naming the fallacy like a punch changes nobody's mind: the other person feels attacked and shuts down."},
  esquive:{l:"🙈 Dodge", bon:false, m:"Avoiding conflict keeps the peace, but the discussion goes nowhere."},
  question:{l:"❓ Open question", bon:true, m:"An open question brings the other person's reasons to light."},
  reformulation:{l:"🪞 Rephrasing", bon:true, m:"Faithfully rephrasing the other person's idea shows you listened: then they can hear your nuance."},
};
function texteMassue(line){
  const vous=!!(line.dlg&&line.dlg.vous);
  if(line.type==="sain") return "'You only say that to look reasonable. I don't believe a word of it.'";
  const nom=libelle(line.a).l.replace(/^\S+\s/,"");
  if(line.type==="epl") return "'That's just "+nom.toLowerCase()+", it proves nothing!'";
  return "'"+nom+"! Your argument is worthless.'";
}
function renderReponse(line){
  const box=$("dialogue"), foe=line.foe||foeActuel(), d=line.d;
  if(!d){ $("nextbtn").style.display="block"; $("nextbtn").textContent="Next line ➜"; return; }
  const vous=!!(line.dlg&&line.dlg.vous);
  box.innerHTML="";
  box.hidden=false;
  const h=document.createElement("p"); h.className="qprompt";
  h.textContent="💬 And now, what do you say to {n}?".replace("{n}",foe.name);
  box.appendChild(h);
  const grille=document.createElement("div"); grille.className="dgrille";
  const choix=shuffle([
    {g:"massue", t:texteMassue(line)},
    {g:"esquive", t:"'Well… let's not fight. Let's talk about something else.'"},
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
  lecon.textContent=(geste==="reformulation"&&line.type==="sain")?"Acknowledging a good argument builds common ground.":G.m;
  if(G.bon){
    ouverture=Math.min(max,ouverture+1);
    tete.textContent=foe.emoji+" "+"{n} opens up a little:".replace("{n}",foe.name);
    corps.textContent=line.d.k;
    noter(line.d.k,false);
  } else {
    if(geste==="massue") ouverture=Math.max(0,ouverture-1);
    tete.textContent=foe.emoji+" "+(geste==="massue"?dlg.braque:dlg.esquive);
    if(!modeDifficile()){ corps.textContent="Had you made them feel heard, you might have heard: "+line.d.k; noter(line.d.k,true); }
    else corps.textContent="No confidence this time: this clue slips away.";
  }
  r.append(tete,corps,lecon);
  updateHP();
  const nb=$("nextbtn");
  nb.style.display="block";
  nb.textContent=(lineIdx+1>=order.length && !revision)?"🔎 Understand {n} ➜".replace("{n}",foe.name):"Next line ➜";
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
  t.textContent="📓 What you understood about {n}".replace("{n}",foe?foe.name:"");
  const ul=document.createElement("ul");
  carnet.forEach(c=>{ const li=document.createElement("li"); li.textContent=c.k; if(c.donne){ li.className="donne"; li.title="clue given (in Easy) despite your answer"; } ul.appendChild(li); });
  box.append(t,ul);
}

// ─── Fin du match : comprendre ce qui le motive ───
function renderComprendre(){
  const foe=foeActuel(), dlg=foe.dlg;
  phase="comprendre";
  $("qprompt").before($("carnet"));
  tourFini=true; cancelAnimationFrame(attaqueRAF); attaqueRAF=null;
  document.querySelector(".bubble").hidden=true; $("piste").hidden=true;
  $("dialogue").hidden=true; $("riposte").style.display="none"; $("nextbtn").style.display="none";
  $("techs").hidden=true;
  $("turn-progress").textContent="End of the discussion";
  $("qprompt").textContent="🔎 Deep down, what drives {n} to talk this way?".replace("{n}",foe.name);
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
      $("rip-title").textContent=ok?"🤝 You understood {n}!".replace("{n}",foe.name):"🤔 Not quite…";
      $("rip-expl").innerHTML="";
      const p1=document.createElement("p"); p1.textContent=(ok?"":"In fact: ")+dlg.motiv;
      const p2=document.createElement("p"); p2.className="rfin"; p2.textContent=ok?dlg.fin:"Reread your notebook: behind the arguments there is often a fear or a need. Open questions help you hear them.";
      $("rip-expl").append(p1,p2);
      const nb=$("nextbtn"); nb.style.display="block";
      nb.textContent=foeIdx===FOES.length-1?"🏁 See the summary ➜":"Next character ➜";
      nb.scrollIntoView({behavior:"smooth",block:"end"}); nb.focus({preventScroll:true});
    };
    ansDiv.appendChild(b);
  });
  window.scrollTo({top:0,behavior:"smooth"});
}
