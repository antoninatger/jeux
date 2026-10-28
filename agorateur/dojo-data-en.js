/* =========================================================================
   Agora Dojo — ENGLISH CONTENT
   Mirror of dojo-data.js: same `id`s, same structure, translated text.
   The logic lives only once, in dojo.js.

   Fallacy `id`s are the ones from FALLACIES in app-en.js.
   ========================================================================= */
const DOJO = {

  sensei: { nom: "Sensei Kakasophe", emoji: "🥷" },
  rival:  { nom: "Sophisuke", emoji: "😼" },

  // ─── The Forbidden Scroll: each fallacy is a technique ───
  sophismes: {
    paille:     { l: "Straw man", d: "distorting what the other person said (exaggerating it, caricaturing it, putting words in their mouth), then attacking that distorted version. Like hitting a straw dummy instead of a real opponent: it's easy, but you haven't answered what they actually think.", tech: "Substitution Technique: the Dummy",
                  signes: "“in other words”, “so you want…”, “what you're really saying…”",
                  parade: "Restate it faithfully: “That's not what I said. All I'm saying is…”" },
    adhom:      { l: "Personal attack", d: "attacking the person (their looks, grades, past) instead of answering their argument.", tech: "Man Strike",
                  signes: "“coming from you”, “with your grades”, “how old are you?”",
                  parade: "Back to the point: “Leave me out of it. What's wrong with my argument?”" },
    popu:       { l: "Appeal to popularity", d: "saying something is true because many people believe or do it.", tech: "Crowd Multi-Clone",
                  signes: "“everybody”, “millions of…”, “3 million views”",
                  parade: "“Lots of people think so, fine. But where's the evidence?”" },
    dilemme:    { l: "False dilemma", d: "presenting only two possible choices when others exist.", tech: "Two-Door Prison",
                  signes: "“either… or…”, “it's this or…”, “you have to choose”",
                  parade: "Find the third door: “There are other options, for example…”" },
    pente:      { l: "Slippery slope", d: "predicting a chain of ever-worse disasters without proving they will happen.", tech: "Avalanche of a Thousand Consequences",
                  signes: "“soon”, “and next it'll be…”, “in ten years”",
                  parade: "Ask about each step: “What shows that one leads to the other?”" },
    genehat:    { l: "Hasty generalisation", d: "drawing a general rule from a single example, or very few cases.", tech: "One for All",
                  signes: "“my cousin”, “once”, “so all of them…”",
                  parade: "“That's one case. What do the other cases say?”" },
    nature:     { l: "Appeal to nature", d: "saying something is good because it's natural (or bad because it's chemical).", tech: "Forest Breathing",
                  signes: "“natural”, “100% plants”, “chemicals”",
                  parade: "The counter-example: “Hemlock is natural too.”" },
    halo:       { l: "Authority outside their field", d: "believing someone on a topic because they are famous or expert in another field.", tech: "Borrowed Aura",
                  signes: "“even X says so”, “this champion”, “this star”",
                  parade: "“What exactly are they an expert in? What do specialists in the field say?”" },
    preuve:     { l: "Reversed burden of proof", d: "demanding that the other person prove it false, instead of proving it true yourself.", tech: "Bomb Bounce-Back",
                  signes: "“prove me wrong”, “you can't prove it isn't”",
                  parade: "“The person making the claim has to prove it.”" },
    posthoc:    { l: "Imagined cause", d: "believing one thing caused another just because it happened first.", tech: "Coincidence Genjutsu",
                  signes: "“ever since”, “right after”, “coincidence?”",
                  parade: "“One came after the other, fine. But what shows that one caused the other?”" },
    circulaire: { l: "Circular reasoning", d: "using the conclusion as proof of itself: 'it's true because it's true'.", tech: "Ouroboros Serpent",
                  signes: "“because it's true”, “it says so itself”",
                  parade: "“You're using your conclusion as proof. Do you have an outside source?”" },
    hareng:     { l: "Red herring", d: "changing the subject to avoid answering the real question.", tech: "Smoke Bomb",
                  signes: "“let's talk about… instead”, “the real problem is…”",
                  parade: "Back to the question: “We'll get to that later. My question was…”" },
    cherry:     { l: "Cherry-picking", d: "showing only the examples or figures that fit, and hiding the rest.", tech: "Picker's Hand",
                  signes: "“look at this number”, “these three reviews”, “I only kept…”",
                  parade: "“And what does the rest of the data say?”" },
    whatabout:  { l: "Whataboutism", d: "answering a criticism with 'what about you?' instead of addressing the substance.", tech: "Ice Mirror",
                  signes: "“what about you?”, “what about them?”, “look who's talking”",
                  parade: "“We can talk about me later. Right now, we're talking about you.”" }
  },

  // ─── Arriving at the dojo ───
  accueil: {
    retard: "The sensei shows up two hours late, nose buried in a little orange book.",
    excuse: "“Sorry. I got lost on the path of logic.”",
    defi: "“So, you want to go to the Agora? The sophists will eat you alive. Convince me to train you.”",
    choix: [
      { t: "“Everybody says you're the best sensei!”", ok: false,
        r: "“Crowd Multi-Clone. A thousand people repeating the same thing doesn't make an argument. Try again.”" },
      { t: "“If you say no, my whole life is ruined!”", ok: false,
        r: "“The Avalanche of a Thousand Consequences, really? Your life will be just fine. Try again.”" },
      { t: "“At the Agora, I get fooled because I can't see the traps. I want to learn to see them.”", ok: true,
        r: "“… A clear reason and a goal. Finally, a real argument. Welcome to the dojo.”" }
    ],
    // L'entrée en scène de Sophisuke, l'ancien disciple du sensei.
    entree: [
      { qui: "narrateur", texte: "A gust of wind. Leaves swirl. On the dojo roof, a silhouette, arms crossed." },
      { qui: "rival", texte: "“Hmph. The old man is still taking students?”" },
      { qui: "sensei", texte: "(without looking up from his book) “Sophisuke. My former disciple. He left to join the sophists, the ones who win every debate… without ever being right.”" },
      { qui: "rival", texte: "(he leaps down from the roof) “Listen up, beginner. I'll be waiting at the gates of the Agora. If you make it that far… I'll crush you!”" },
      { qui: "narrateur", texte: "SHWOOOM! Sophisuke has vanished." }
    ]
  },

  // ─── Prologue: Water Divination ───
  divination: [
    { t: "“If you don't share this video of the abandoned puppy, you have no heart.”", f: "coeur",
      e: "Guilt and emotion, no argument: it's emotional blackmail." },
    { t: "“This game has 50 million players: it must be the best one out there.”", f: "troupeau",
      e: "Appeal to popularity: lots of players says nothing about quality." },
    { t: "“Ever since I started wearing my magnetic bracelet, I sleep better. It clearly works.”", f: "detective",
      e: "Imagined cause: you can sleep better for a thousand other reasons." },
    { t: "“Think of the suffering children: if you vote against this law, you're abandoning them.”", f: "coeur",
      e: "You're made to carry the children's suffering instead of being told what the law does." },
    { t: "“My favourite gaming YouTuber says this supplement makes you smarter.”", f: "troupeau",
      e: "Authority outside their field: an expert in video games, not in nutrition." },
    { t: "“My cousin passed his exams without revising: revising is pointless.”", f: "detective",
      e: "Hasty generalisation: one case doesn't make a rule." },
    { t: "“The weather service says there's a 90% chance of rain tomorrow: taking an umbrella is a good idea.”", f: "sain",
      e: "A competent source, a reasonable conclusion." },
    { t: "“This medicine was tested on 30,000 people against a placebo, and the results were checked by independent teams.”", f: "sain",
      e: "A large trial, a comparison group, independent checking: that's solid." }
  ],
  types: {
    coeur:      { nom: "Heart Type", eau: "The water turns red and starts beating like a heart.",
                  desc: "Moving stories and guilt make you drop your guard. Keep your heart, but always ask: where's the argument?" },
    troupeau:   { nom: "Herd Type", eau: "The water fills with a thousand tiny bubbles, all moving the same way.",
                  desc: "Numbers and fame impress you. Remember: popularity measures visibility, not truth." },
    detective:  { nom: "Hasty Detective Type", eau: "The water starts swirling at full speed.",
                  desc: "You link facts together quickly. One case or a coincidence isn't proof yet." },
    forteresse: { nom: "Fortress Type", eau: "The water freezes solid. The leaf is trapped in the ice.",
                  desc: "You reject even good arguments. Doubting everything is as comfortable as believing everything: it saves you from thinking." },
    calme:      { nom: "Still Water Type", eau: "The water doesn't move. The leaf floats, perfectly still.",
                  desc: "Nothing knocked you over: a good start. The dojo will see if it holds under pressure." }
  },

  // ─── Trial 1: Falling Leaves ───
  feuilles: [
    { id: "f1", t: "“It's been raining ever since the new mayor was elected: he's bad luck.”", piege: "posthoc",
      e: "Two events that follow each other aren't necessarily linked." },
    { id: "f2", t: "“This video has 3 million views, so what it says is true.”", piege: "popu",
      e: "View counts measure visibility, not truth." },
    { id: "f3", t: "“Don't listen to her about the climate: she failed her exams.”", piege: "adhom",
      e: "It attacks the person instead of her arguments." },
    { id: "f4", t: "“Either you're with us, or you're against us.”", piege: "dilemme",
      e: "You can agree on one point and not on another: there are far more than two sides." },
    { id: "f5", t: "“If we allow phones at break time, soon nobody will talk to each other and school will be pointless.”", piege: "pente",
      e: "A cascade of disasters, with no evidence for any of the steps." },
    { id: "f6", t: "“An AI once made up a source for me: AIs never get anything right.”", piege: "genehat",
      e: "One mistake doesn't make a rule. Check things instead of throwing everything out." },
    { id: "f7", t: "“It's 100% natural, so it can't do any harm.”", piege: "nature",
      e: "Deadly mushrooms are 100% natural too." },
    { id: "f8", t: "“This rapper has 10 million followers: if he says the Earth is flat, he must have his reasons.”", piege: "halo",
      e: "Being good at rap doesn't make you an expert in astronomy." },
    { id: "f9", t: "“Nobody has ever proved that ghosts don't exist. So they exist.”", piege: "preuve",
      e: "It's up to whoever claims ghosts exist to prove it." },
    { id: "f10", t: "“This TikTok account always tells the truth: it says so in its bio.”", piege: "circulaire",
      e: "The account is its own proof: the snake bites its own tail." },
    { id: "f11", t: "“You're asking why I copied? The real problem is that the tests are too long.”", piege: "hareng",
      e: "He changes the subject to avoid answering the question." },
    { id: "f12", t: "“You're telling me off for dropping litter? What about you, always leaving the lights on!”", piege: "whatabout",
      e: "Someone else's faults don't answer the criticism." },
    { id: "f13", t: "“Out of 80 reviews, I found three 5-star ones: this restaurant is amazing.”", piege: "cherry",
      e: "Three hand-picked reviews out of 80: what do the other 77 say?" },
    { id: "f14", t: "“You want less homework? So you want students to stop learning anything.”", piege: "paille",
      e: "“Less homework” is twisted into “stop learning anything”." },
    { id: "f15", t: "“I wore my lucky socks and we won the match: they work!”", piege: "posthoc",
      e: "Maybe the team simply played better." },
    { id: "f16", t: "“The whole class says this teacher is useless, so it's true.”", piege: "popu",
      e: "A rumour shared by many is still a rumour." },
    { id: "f17", t: "“A famous actor recommends treating cancer with fruit juice: he must know what he's talking about.”", piege: "halo",
      e: "Acting talent gives no expertise in medicine." },
    { id: "f18", t: "“If you don't like football, you must hate sport.”", piege: "dilemme",
      e: "You can love swimming, basketball or dance without liking football." },
    { id: "f19", t: "“Prove this video is a deepfake. You can't? Then it's real.”", piege: "preuve",
      e: "It's up to whoever shares the video to show it's genuine." },
    { id: "f20", t: "“Your argument is worthless, you're 13.”", piege: "adhom",
      e: "Age doesn't make an argument true or false." },
    { id: "s1", t: "“Ice-cream sales and drownings both go up in summer: the heat explains both.”", piege: null,
      e: "Good reasoning! Ice cream doesn't cause drowning: a common cause, the heat, explains both." },
    { id: "s2", t: "“This vaccine was tested on 40,000 volunteers, with a placebo group.”", piege: null,
      e: "A large trial with a comparison group: that's solid evidence." },
    { id: "s3", t: "“My doctor, who studied medicine for ten years, recommends this vaccine.”", piege: null,
      e: "An authority IN their own field: that's not the halo effect." },
    { id: "s4", t: "“A reverse image search shows this photo is from 2015: it doesn't show yesterday's event.”", piege: null,
      e: "A concrete check, with evidence: exactly what you should do." },
    { id: "s5", t: "“Smoking sharply increases the risk of lung cancer: thousands of studies have shown it for 70 years.”", piege: null,
      e: "A very solid scientific consensus, not a handful of examples." },
    { id: "s6", t: "“If you don't revise at all, you'll probably get a lower mark.”", piege: null,
      e: "One direct, likely consequence: that's not a slippery slope." },
    { id: "s7", t: "“Some wild mushrooms are deadly: better have them checked by a pharmacist.”", piege: null,
      e: "Reasonable caution, based on a known fact." },
    { id: "s8", t: "“This site has already published loads of fake news: I'll check elsewhere before believing it.”", piege: null,
      e: "Judging a source's reliability and checking elsewhere isn't a personal attack." },
    { id: "s9", t: "“The school offers three options: Latin, German or nothing. You have to pick one.”", piege: null,
      e: "Here the options really are limited: it's not a false dilemma." },
    { id: "s10", t: "“One testimony isn't enough: I'll look for other sources.”", piege: null,
      e: "The opposite of a hasty generalisation: well done." }
  ],

  // ─── Trial 2: the Sensei's Eye ───
  oeil: [
    { id: "o1", a: "paille", t: "“You want to cut down | on meat | in the canteen? | [[In other words,]] | [[you want to force everyone]] | [[to go vegan]]!”",
      e: "“Cut down on meat” becomes “force everyone to go vegan”: a caricature is being attacked." },
    { id: "o2", a: "popu", t: "“[[Everybody knows]] | this app | makes you more productive. | Honestly, | [[millions of users]] | [[can't be wrong]].”",
      e: "The number of users replaces the evidence." },
    { id: "o3", a: "posthoc", t: "“[[Ever since]] | I installed | this meditation app, | my marks have gone up. | [[It's the app]] | [[that made me improve]].”",
      e: "“Ever since” + “it's the app”: one thing following another is turned into a cause." },
    { id: "o4", a: "dilemme", t: "“[[Either]] | you delete | all your social media, | [[or]] | you accept | being hooked | forever.”",
      e: "“Either… or…”: what about using social media in moderation?" },
    { id: "o5", a: "preuve", t: "“Aliens | built | the pyramids. | [[Prove me wrong!]] | [[See, you can't.]]”",
      e: "It's up to him to prove his claim, not up to you to disprove it." },
    { id: "o6", a: "adhom", t: "“Your talk | on the climate? | [[Coming from someone]] | [[who got 8 out of 20 in biology]], | I don't see | why anyone would listen.”",
      e: "The student's mark says nothing about the quality of the talk." },
    { id: "o7", a: "pente", t: "“If we let | students | choose their seats, | [[soon]] | [[they'll choose their marks]], | [[and next]] | it'll be | total anarchy.”",
      e: "“Soon… and next…”: every step of the staircase is made up." },
    { id: "o8", a: "halo", t: "“[[Even this football champion]] | [[says so]]: | this shampoo | makes hair | stronger.”",
      e: "A football champion is not a hair specialist." },
    { id: "o9", a: "hareng", t: "“Why | is our factory | polluting the river? | [[Let's talk instead]] | [[about the 200 jobs]] | [[it has created]]!”",
      e: "The question is about pollution, the answer is about jobs." },
    { id: "o10", a: "whatabout", t: "“You say | I spend too much time | on my phone? | [[What about you,]] | [[with your series]] | [[every night?]]”",
      e: "He turns the criticism around instead of answering it." },
    { id: "o11", a: "cherry", t: "“On this chart, | [[I only kept]] | [[the cold years]]: | you can see | the planet | isn't warming.”",
      e: "Keep only the data that suits you and a chart will say anything." },
    { id: "o12", a: "circulaire", t: "“This AI | is never wrong. | How do I know? | [[I asked it,]] | [[and it told me]] | [[it was never wrong]].”",
      e: "The AI is the proof of its own reliability: it's a circle." },
    { id: "o13", a: "nature", t: "“This syrup | is made | [[from 100% plants]]: | [[so it can't have]] | [[any side effects]].”",
      e: "Many plants have side effects, sometimes serious ones." },
    { id: "o14", a: "genehat", t: "“[[My neighbour]] | got scammed | on a selling site, | so | [[all sellers]] | [[are crooks]].”",
      e: "One neighbour, one scam: that says nothing about all sellers." }
  ],

  // ─── Trial 3: the Bell Test ───
  clochettes: [
    { id: "c1", sujet: "Should schools have uniforms?", phrases: [
      { t: "“Uniforms exist in several countries, like the UK or Japan.”", piege: null },
      { t: "“Some schools that adopted them report less teasing about clothes.”", piege: null },
      { t: "“Anyway, people who are against them just want to show off their expensive brands.”", piege: "paille",
        e: "Opponents have plenty of reasons (cost, freedom…): they're reduced to a caricature." },
      { t: "“They would cost over 100 euros per family, which is a real issue for low-income families.”", piege: null },
      { t: "“Either we bring in uniforms, or school turns into a fashion show.”", piege: "dilemme",
        e: "Between uniforms and a fashion show, there are endless other possible rules." }
    ]},
    { id: "c2", sujet: "Should phones be banned at school?", phrases: [
      { t: "“Several studies have seen better results in schools that restrict phones.”", piege: null },
      { t: "“Notifications break your concentration: it takes several minutes to refocus.”", piege: null },
      { t: "“People who want to keep their phones are just addicts who can't think.”", piege: "adhom",
        e: "Those who disagree are insulted instead of their reasons being discussed." },
      { t: "“There could be exceptions, for example for students who need them for health reasons.”", piege: null },
      { t: "“If we allow phones, in two years nobody will be able to read a book.”", piege: "pente",
        e: "From phones to the end of reading in two years: not a single step is shown." }
    ]},
    { id: "c3", sujet: "Do video games make people violent?", phrases: [
      { t: "“Last month, a boy who played war games hit someone: proof that these games make you violent.”", piege: "genehat",
        e: "One news story proves nothing about millions of players." },
      { t: "“Many studies find no strong link between video games and real violence.”", piege: null },
      { t: "“The PEGI system shows the recommended age for each game.”", piege: null },
      { t: "“A very famous singer said on TV that these games destroy your brain.”", piege: "halo",
        e: "Being famous for your songs doesn't make you a neuroscience expert." },
      { t: "“Playing late at night can cut into your sleep.”", piege: null }
    ]},
    { id: "c4", sujet: "Should we eat organic?", phrases: [
      { t: "“The organic label strictly limits synthetic pesticides.”", piege: null },
      { t: "“It's natural, so it must be better for your health.”", piege: "nature",
        e: "“Natural” doesn't mean “good for your health”." },
      { t: "“Organic food often costs more, and not every family can afford it.”", piege: null },
      { t: "“You're criticising organic food? What about you, eating crisps every day!”", piege: "whatabout",
        e: "The other person's crisps don't answer the criticism." },
      { t: "“Researchers are still studying its exact effects on health.”", piege: null }
    ]},
    { id: "c5", examen: true, sujet: "Should marking be handed over to an AI?", phrases: [
      { t: "“An AI can mark hundreds of papers in a few minutes.”", piege: null },
      { t: "“Millions of students already use AI, so it must be reliable.”", piege: "popu",
        e: "A tool being widely used doesn't prove it's reliable." },
      { t: "“It can get original answers wrong, so a teacher should check.”", piege: null },
      { t: "“Either we use AI, or we stay stuck in the Middle Ages.”", piege: "dilemme",
        e: "Between handing everything to AI and the Middle Ages, there are plenty of options." },
      { t: "“The system should first be tested in a few classes.”", piege: null }
    ]}
  ],

  // ─── Trial 4: the Counter ───
  ripostes: [
    { id: "r1", a: "preuve", t: "“Prove to me it's NOT a conspiracy!”", choix: [
      { k: "bonne", t: "“It's up to the person making the claim to prove it. What would change your mind?”" },
      { k: "cede", t: "“True, I can't prove it…”" },
      { k: "sophisme", s: "adhom", t: "“You're really stupid to believe that.”" }],
      e: "You send the burden of proof back to whoever made the claim, and open the discussion instead of shutting it down." },
    { id: "r2", a: "popu", t: "“Everybody says this YouTuber is a scammer!”", choix: [
      { k: "bonne", t: "“Maybe. But what has he actually done? Do you have a source?”" },
      { k: "cede", t: "“Oh, well if everybody says so…”" },
      { k: "sophisme", s: "adhom", t: "“Everybody also says you talk nonsense.”" }],
      e: "You don't say yes or no: you ask for the facts." },
    { id: "r3", a: "paille", t: "“You want to limit screen time? So you want us to live like in the Middle Ages!”", choix: [
      { k: "bonne", t: "“That's not what I said. I'm just suggesting one hour less screen time in the evening.”" },
      { k: "cede", t: "“Well… maybe I'm going too far.”" },
      { k: "sophisme", s: "paille", t: "“And you want us all to turn into zombies!”" }],
      e: "The parry to a straw man: restate faithfully what you actually said." },
    { id: "r4", a: "adhom", t: "“You can't talk about the environment, you took a plane this summer!”", choix: [
      { k: "bonne", t: "“I'm not perfect. But that doesn't change the figures I'm quoting.”" },
      { k: "cede", t: "“You're right, I'd better keep quiet.”" },
      { k: "sophisme", s: "whatabout", t: "“And you eat meat every day!”" }],
      e: "You accept the criticism without being sidetracked: the facts are still the facts." },
    { id: "r5", a: "dilemme", t: "“Either you come to my party, or you're not my friend anymore.”", choix: [
      { k: "bonne", t: "“There are other options: I can drop by early, or we can meet up this weekend.”" },
      { k: "cede", t: "“Fine, I'll come…”" },
      { k: "sophisme", s: "adhom", t: "“Your parties are rubbish anyway, just like you.”" }],
      e: "The parry to a false dilemma: show the third door." },
    { id: "r6", a: "posthoc", t: "“I wore my lucky jumper and got top marks: it works!”", choix: [
      { k: "bonne", t: "“Or maybe you revised well? It would take lots of tries to know if the jumper has anything to do with it.”" },
      { k: "cede", t: "“Lend it to me for my test!”" },
      { k: "sophisme", s: "adhom", t: "“You're superstitious, you've never understood anything.”" }],
      e: "You offer another explanation, and the only way to settle it: test it." },
    { id: "r7", a: "genehat", t: "“My cousin got caught by a fake seller online: you should never buy anything on the internet.”", choix: [
      { k: "bonne", t: "“That's one case, and it's annoying. But rather than stopping altogether, let's learn to spot scams.”" },
      { k: "cede", t: "“You're right, I'm deleting all my apps.”" },
      { k: "sophisme", s: "adhom", t: "“Your cousin is just gullible, that's all.”" }],
      e: "You take the case seriously without turning it into a general rule." },
    { id: "r8", a: "halo", t: "“This MMA champion says eating nothing but meat cures everything.”", choix: [
      { k: "bonne", t: "“He's an expert in fighting, sure. But what do nutrition specialists say?”" },
      { k: "cede", t: "“If he says so, he must have tried it.”" },
      { k: "sophisme", s: "adhom", t: "“Of course, he's taken too many hits to the head.”" }],
      e: "You ask the people whose field it really is." },
    { id: "r9", a: "hareng", t: "“You're asking why the price has doubled? Let's talk about our great new logo instead!”", choix: [
      { k: "bonne", t: "“We can talk about the logo later. My question is: why has the price doubled?”" },
      { k: "cede", t: "“Oh yes, it's a nice logo.”" },
      { k: "sophisme", s: "adhom", t: "“Your logo is ugly, just like your company.”" }],
      e: "The parry to a smoke bomb: calmly bring it back to the question." },
    { id: "r10", a: "whatabout", t: "“You're blaming me for lying? Well, you lied too last year!”", choix: [
      { k: "bonne", t: "“That's true, and we can talk about it. But right now, we're talking about your lie.”" },
      { k: "cede", t: "“Fine, then we're even.”" },
      { k: "sophisme", s: "adhom", t: "“At least I'm not a professional liar.”" }],
      e: "You accept the criticism of yourself, without letting the other person dodge theirs." },
    { id: "r11", a: "cherry", t: "“Look at these three 5-star reviews: this seller is totally reliable!”", choix: [
      { k: "bonne", t: "“And what do the other 200 reviews say?”" },
      { k: "cede", t: "“Three reviews is pretty good already.”" },
      { k: "sophisme", s: "genehat", t: "“People who leave reviews are all idiots.”" }],
      e: "You ask for all the data, not just the bits you're shown." },
    { id: "r12", a: "nature", examen: true, t: "“It's natural, so it's safe.”", choix: [
      { k: "bonne", t: "“Hemlock is natural too. What shows that this one is safe?”" },
      { k: "cede", t: "“Fine, I'll take some.”" },
      { k: "sophisme", s: "adhom", t: "“People who believe that are cranks.”" }],
      e: "The counter-example: a single case is enough to bring down a general rule." }
  ],

  // ─── Sophisuke's taunts, between trials ───
  piques: [
    { t: "“You missed the first leaf? Then you'll miss all the others. One mistake is enough to tell.”", a: "genehat", opts: ["adhom", "pente"],
      e: "From a single mistake, he draws a rule for all the others. One case isn't enough to conclude." },
    { t: "“The whole class thinks I'm going to win. So give up right now.”", a: "popu", opts: ["halo", "dilemme"],
      e: "Lots of people thinking it doesn't prove he'll win." },
    { t: "“Either you become my disciple, or you stay a loser your whole life.”", a: "dilemme", opts: ["pente", "paille"],
      e: "He leaves only two choices, when there are plenty of others." },
    { t: "“You, unmasking fallacies? With that haircut?”", a: "adhom", opts: ["whatabout", "genehat"],
      e: "He targets your haircut, not your ability to unmask fallacies." },
    { t: "“If you fail this trial, you'll fail the exam, then the Agora, then your whole life.”", a: "pente", opts: ["dilemme", "posthoc"],
      e: "Failing one trial doesn't necessarily lead to everything else: each step of the disaster is claimed without proof." },
    { t: "“You say I'm cheating? What about your sensei, always late, is he perfect?”", a: "whatabout", opts: ["hareng", "adhom"],
      e: "He answers the accusation by criticising the sensei, without saying whether he cheats or not." }
  ],

  // ─── The Gate exam ───
  // ─── L'arc de Sophisuke : rival, puis allié ───
  arc: {
    fissure: [
      { qui: "narrateur", texte: "Flashback. A black-and-white picture: two young students training side by side at the dojo." },
      { qui: "rival", texte: "(his back turned) “…Not bad. I used to look for the truth too. But the truth is slow. Winning is instant.”" },
      { qui: "narrateur", texte: "He clenches his fist." },
      { qui: "rival", texte: "“Don't think this changes anything!”" }
    ],
    avantExamen: [
      { qui: "narrateur", texte: "Lightning splits the sky above the gates of the Agora." },
      { qui: "rival", texte: "“My forbidden techniques against your little lessons. Show me what your method is worth… RIVAL!”" }
    ],
    apresExamen: [
      { qui: "narrateur", texte: "Sophisuke drops to his knees. Silence. A leaf lands on his shoulder." },
      { qui: "rival", texte: "“Why… Why don't my techniques work on you anymore?”" },
      { qui: "narrateur", texte: "You hold out your hand." },
      { qui: "toi", texte: "“Because an argument is something you understand. Not something you crush.”" },
      { qui: "narrateur", texte: "He hesitates… then takes your hand." },
      { qui: "rival", texte: "“Hmph. Don't think we're friends.”" },
      { qui: "narrateur", texte: "Behind you, the gates of the Agora begin to open." },
      { qui: "rival", texte: "“…But at the Agora, I'll walk beside you.”" }
    ]
  },

  examen: {
    intro: "At the gates of the Agora, Sophisuke is waiting, arms crossed. “Six rounds. One from each trial. Hold on, and you're through.”",
    examinateur: "A hooded examiner steps forward. His voice echoes through the whole dojo.",
    q10: "“Last question. If you get it wrong, you can NEVER go to the Agora again. Not today, not tomorrow, not ever. So: will you answer, or give up?”",
    choix: [
      { t: "“I give up.”", ok: false },
      { t: "“I'll answer!”", ok: false },
      { t: "“That's a Two-Door Prison, with an Avalanche of a Thousand Consequences on top!”", ok: true }
    ],
    rateAbandon: "The examiner sighs. “You got scared, and you picked one of the two doors I held out. There was a third one. Try again.”",
    rateRepond: "The examiner sneers. “Brave. But you accepted my two doors without questioning them. Look at my question again. Try again.”",
    revelation: "The examiner pulls back his hood. It was the sensei, little orange book in hand. “The last trap is always the one set for you when you're scared. You're ready.”",
    apres: "A FEW HOURS LATER…"
  }
};
