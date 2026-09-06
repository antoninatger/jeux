// =========================
// Game data — FICTION / MOCK — English version
// Fictional conversation (Sophie 🩷 = "me", Lucas 💬 = "them")
// =========================

const RESOURCES = [
  {
    name: "National Domestic Violence Hotline (US) — 1-800-799-7233",
    desc: "Confidential support by phone, text (text START to 88788) or online chat, free, 24/7.",
    type: "tel",
    value: "18007997233"
  },
  {
    name: "National Domestic Abuse Helpline (UK) — 0808 2000 247",
    desc: "Free, confidential support run by Refuge, available 24 hours a day, every day.",
    type: "tel",
    value: "08082000247"
  },
  {
    name: "988 Suicide & Crisis Lifeline (US) — call or text 988",
    desc: "Trained crisis counsellors, free, 24/7, for anyone in distress — and for anyone worried about someone else.",
    type: "tel",
    value: "988"
  },
  {
    name: "Samaritans (UK) — 116 123",
    desc: "Trained volunteers who listen, free to call from any phone, 24 hours a day, every day of the year.",
    type: "tel",
    value: "116123"
  },
  {
    name: "Childhelp (US) — 1-800-422-4453 · Childline (UK) — 0800 1111",
    desc: "Free lines about children and abuse, 24/7: Childline for children and young people in the UK, Childhelp for anyone in the US worried about a child.",
    type: "tel",
    value: "18004224453"
  },
  {
    name: "Text instead of calling — Crisis Text Line (US) · Shout (UK)",
    desc: "Text HOME to 741741 in the US, or SHOUT to 85258 in the UK, when you can't speak out loud; free, 24/7.",
    type: "url",
    value: "https://www.crisistextline.org/text-us/"
  },
  {
    name: "loveisrespect — 1-866-331-9474",
    desc: "Support for teens and young adults on dating abuse and unhealthy relationships (call, text LOVEIS to 22522, or chat online).",
    type: "tel",
    value: "18663319474"
  },
  {
    name: "Emergency — 911 / 999 / 112",
    desc: "If you're in immediate danger, call your local emergency number: 911 in the US, 999 in the UK, 112 anywhere in the EU.",
    type: "tel",
    value: "911"
  },
  {
    name: "The Relationship Spectrum (loveisrespect)",
    desc: "A scale that places specific behaviours along a line from healthy to unhealthy to abusive, with examples for each.",
    type: "url",
    value: "https://www.loveisrespect.org/everyone-deserves-a-healthy-relationship/relationship-spectrum/"
  }
];

// Chronological order of mechanisms for the recap timeline
const MECHANISM_ORDER = [
  "love_bombing",
  "jalousie_induite",
  "chantage_affectif",
  "controle_social",
  "gaslighting",
  "isolement_amis",
  "devalorisation",
  "cycle_tension_reconciliation",
  "isolement_geographique",
  "dependance_financiere"
];

const CHECKPOINTS = {

  chk_love_bombing: {
    mechanism: "love_bombing",
    mechanismLabel: "Love bombing (early overinvestment)",
    date: "March 8",
    question: "They've only been together one evening, and Lucas is already this intense in his declarations. What's going on here?",
    explanation: "Piling on intense declarations of love from the very first exchanges, before really knowing each other, has a name: love bombing. It's not harmless — this intensity creates a fast-tracked attachment and makes it harder to step back later, once other, less pleasant behaviors appear. Love bombing isn't always consciously calculated, but its effect is the same: it lowers your guard.",
    hint: "Reread Lucas's messages: how fast is he saying all this, for a first evening together?",
    clusters: [
      { label: "moving too fast", terms: ["love bombing", "too fast", "too quick", "too soon", "rushing", "rushed", "first night", "first evening", "just met", "barely together", "moving fast"] },
      { label: "excessive intensity", terms: ["exaggerat", "excessive", "too much too soon", "over the top", "too intense", "too strong", "overboard"] },
      { label: "early idealization", terms: ["idealiz", "idealis", "pedestal", "too perfect", "puts her on a pedestal"] },
      { label: "disproportionate declarations", terms: ["big words", "strong words", "declaration of love", "over the top compliment"] }
    ],
    misreadings: [
      { terms: ["he's just in love", "he's just really in love", "normal when you love someone", "it's just romantic", "it's cute", "it's sweet", "it's romantic", "nothing wrong"],
        feedback: "Being in love and saying so isn't a problem in itself. What's questionable here is the intensity and the speed: words this strong (\"extraordinary\", \"so lucky\") on the very first evening, before really knowing each other. It's not the love that's the issue, it's the pace." }
    ],
    qcm: [
      { text: "He's just very much in love, it's romantic", correct: false },
      { text: "He creates unusually intense emotion for a first evening together, very fast (love bombing)", correct: true },
      { text: "He's gently teasing Sophie", correct: false },
      { text: "He's testing whether Sophie replies as fast as he does", correct: false }
    ]
  },

  chk_jalousie_induite: {
    mechanism: "jalousie_induite",
    mechanismLabel: "Induced jealousy / vague warning",
    date: "March 11",
    question: "Lucas talks about a \"jealousy\" Sophie supposedly attracts, without ever stating anything clearly. What is he doing?",
    explanation: "Suggesting, without ever stating anything precisely, that \"others\" will be jealous or react badly is a way of planting a vague worry without making an accusation Sophie could discuss or push back on. This vagueness plants a seed of worry that will resurface later, while letting Lucas claim he \"was only complimenting her\".",
    hint: "What does Lucas actually state, and what does he just let hang in the air without saying it clearly?",
    clusters: [
      { label: "induced jealousy / vague warning", terms: ["induced jealousy", "insinuat", "hint", "implies without", "plants doubt", "plants a doubt", "suggests without saying", "warning her", "warns her"] },
      { label: "deliberate vagueness", terms: ["vague", "unclear", "nothing specific", "without stating", "without saying"] },
      { label: "poisoned compliment", terms: ["backhanded compliment", "fake compliment", "disguised as a compliment", "hidden in a compliment", "compliment that hides"] },
      { label: "lays the groundwork", terms: ["lays the groundwork", "sets the stage", "will come in handy later", "keeps this in his pocket", "later he can use"] }
    ],
    misreadings: [
      { terms: ["just a compliment", "he thinks she's pretty that's it", "it's nice", "just flattering", "nothing mean about it"],
        feedback: "Telling someone they're beautiful isn't the problem. Here, the compliment is used as a pretext to introduce the idea that \"others\" will be jealous or resent Sophie — a vague, unverifiable worry that lays the groundwork for future accusations of jealousy (as we'll see again with Cléa)." }
    ],
    qcm: [
      { text: "He's just complimenting Sophie's looks", correct: false },
      { text: "He plants a vague worry about others' jealousy, without stating anything precise", correct: true },
      { text: "He's warning her about a real, concrete danger", correct: false },
      { text: "He's joking to lighten the mood", correct: false }
    ]
  },

  chk_chantage_affectif: {
    mechanism: "chantage_affectif",
    mechanismLabel: "Guilt-tripping / emotional blackmail",
    date: "March 15",
    question: "Lucas pushes for Sophie to skip her night out with friends. How does he get her to change her mind?",
    explanation: "Lucas never directly asks Sophie to stay (\"stay with me\"). He describes his own distress (\"I don't feel good\", \"a HARD night\") and lets Sophie connect the dots herself, until she offers to skip her night out. This is emotional blackmail: making the other person responsible for your emotional well-being, without ever making a clear request she could simply say no to.",
    hint: "Does Lucas clearly ask Sophie to stay, or does he let her guess what she should do?",
    clusters: [
      { label: "emotional blackmail", terms: ["emotional blackmail", "guilt trip", "guilt tripping", "makes her feel guilty", "guilt"] },
      { label: "manipulation through distress", terms: ["his own distress", "plays the victim", "victimiz", "plays on her feelings", "plays on her sympathy"] },
      { label: "indirect request", terms: ["never asks clearly", "without asking clearly", "makes her guess", "disguised request", "doesn't ask directly"] },
      { label: "pushes her to give up", terms: ["give up her night out", "cancel her night out", "keep her home", "makes her stay", "give up her plans"] }
    ],
    misreadings: [
      { terms: ["he's just sad", "he loves her that's why he's bored", "it's sincere", "he's just expressing his feelings", "normal to feel bored", "normal to be bored"],
        feedback: "Saying you're bored isn't a problem by itself. What's questionable is that Lucas never clearly says what he wants (\"stay with me\") — he lets Sophie guess and feel responsible for his distress, until she gives up her night out with friends herself." }
    ],
    qcm: [
      { text: "He's sincerely expressing his sadness, with no ulterior motive", correct: false },
      { text: "He makes Sophie responsible for his distress so she'll give up her night out (emotional blackmail)", correct: true },
      { text: "He suggests a plan so they can spend time together later", correct: false },
      { text: "He clearly asks Sophie to stay with him", correct: false }
    ]
  },

  chk_controle_social: {
    mechanism: "controle_social",
    mechanismLabel: "Social control disguised as concern",
    date: "March 19",
    question: "Lucas talks about image, reputation, what \"other people\" will think. What is he trying to do?",
    explanation: "Lucas never says \"I forbid you to like that\". He builds a narrative around Sophie's image and reputation in front of others, presenting himself as protective (\"I'm saying this for you\", \"I don't want people to get a bad image of you\"). This is a way to control Sophie's behavior on social media without ever stating an explicit ban — which makes it harder to challenge.",
    hint: "Does Lucas clearly say \"I don't want you to like that\", or does he go through another argument to reach the same result?",
    clusters: [
      { label: "direct social control", terms: ["social control", "controls what she does", "controls her social media", "controls her reputation", "controls her image", "controls what she posts"] },
      { label: "disguised prohibition", terms: ["forbids without saying", "disguised ban", "imposes without asking", "without ever forbidding"] },
      { label: "protection/image pretext", terms: ["pretext", "under the guise of protecting", "for her image", "for her reputation", "bad image", "bad reputation", "what will people think", "what others will think"] },
      { label: "pressure on social media", terms: ["stop liking", "pressure on her social media", "watches her social media", "controls her likes"] }
    ],
    misreadings: [
      { terms: ["it's true it can look bad", "he's right about the image", "it's just advice", "just giving her advice", "he wants to protect her from gossip", "normal to care about your reputation", "normal to be careful about your image"],
        feedback: "Lucas isn't just giving a one-off piece of advice: he uses the pretext of \"image\" and what \"other people\" think to pressure an ordinary behavior (liking a friend's photo). It's the reputation pretext that's being used to control her, not a real discussion between adults about a concrete topic." }
    ],
    qcm: [
      { text: "He's just giving well-meaning advice about social media", correct: false },
      { text: "He uses the pretext of image and reputation to control her online behavior", correct: true },
      { text: "He's jealous of Jérémy and says so clearly", correct: false },
      { text: "He asks Sophie to close her Instagram account", correct: false }
    ]
  },

  chk_gaslighting: {
    mechanism: "gaslighting",
    mechanismLabel: "Gaslighting (denying the other person's reality)",
    date: "Wednesday",
    question: "Sophie describes a real mood swing she's noticing in Lucas. How does he react?",
    explanation: "Sophie describes a precise, consistent observation (some days warm, others very distant). Instead of discussing it, Lucas denies the reality of what she's perceiving (\"you're making things up\", \"you're talking nonsense\") and turns the situation against her (\"you're overthinking this\", \"you're making me feel guilty\"). This is gaslighting: making the other person doubt their own judgment, to the point where she feels responsible for having raised the issue.",
    hint: "Does Lucas respond to what Sophie is observing, or does he make her the one with the problem?",
    clusters: [
      { label: "direct gaslighting", terms: ["gaslighting", "denies reality", "denies what she feels", "makes her doubt", "doubts herself", "questions her judgment", "making things up", "making it up"] },
      { label: "reversal of responsibility", terms: ["reverses roles", "turns it against her", "flips it on her", "reverses the blame", "reversal", "she's the one feeling guilty"] },
      { label: "minimizing / denial", terms: ["minimizes", "says it's nothing", "says she's inventing", "says she's exaggerating", "denies the problem", "denial"] },
      { label: "denies the problem", terms: ["he denies", "refuses to acknowledge", "won't acknowledge his mood"] }
    ],
    misreadings: [
      { terms: ["he's just tired", "it's normal to defend yourself", "everyone defends themselves", "everyone reacts differently", "maybe she really is exaggerating", "maybe she's overthinking it too"],
        feedback: "Lucas sometimes being tired doesn't explain his reaction: instead of acknowledging or discussing the mood swing Sophie observes (which would be legitimate), he denies her perception (\"you're making things up\") and flips the situation so she feels guilty for bringing it up. It's that reversal that's the signal, not the fact that he's defending himself." }
    ],
    qcm: [
      { text: "He calmly explains why he's been distant", correct: false },
      { text: "He denies Sophie's perception and turns the blame on her (gaslighting)", correct: true },
      { text: "He acknowledges his mistake and apologizes", correct: false },
      { text: "He suggests talking about it again later", correct: false }
    ]
  },

  chk_isolement_amis: {
    mechanism: "isolement_amis",
    mechanismLabel: "Isolating from friends",
    date: "March 20",
    question: "Throughout this exchange, Lucas keeps putting Cléa down. What is he doing?",
    explanation: "Lucas never tells Sophie \"stop seeing Cléa\". He puts Cléa down point by point, turns any criticism she might have made about the couple back against her (\"that's jealousy\"), and positions himself as her only reliable support (\"ask yourself who's really there for you\"). Cutting someone off from close friends is one of the most well-documented mechanisms of coercive control: the fewer outside perspectives Sophie has on her relationship, the easier it becomes to normalize behavior a friend would flag immediately.",
    hint: "What does Lucas accuse Cléa of feeling, and who benefits from that accusation?",
    clusters: [
      { label: "direct isolation", terms: ["isolat", "isolation", "cuts her off from friends", "distances her from clea", "pushes clea away", "separates her from clea", "cutting her off from clea"] },
      { label: "denigrating her circle", terms: ["puts clea down", "belittles clea", "criticizes clea", "talks badly about clea", "discredits clea", "not a good person"] },
      { label: "projected jealousy accusation", terms: ["accuses clea of jealousy", "says clea is jealous", "makes clea seem jealous", "shifts the blame onto clea", "turns the jealousy accusation on her"] },
      { label: "positions himself as sole support", terms: ["only support", "the only one", "no one else", "only person she can trust", "only anchor"] }
    ],
    misreadings: [
      { terms: ["he's just worried about her", "worried about a friend", "he's being protective", "it's normal to be wary", "maybe he's right about clea", "maybe clea really is", "he's just sharing his opinion about a friend"],
        feedback: "That's exactly what Lucas wants her to believe — but systematically putting down a longtime friend, with no concrete facts, while accusing her of being \"jealous\", doesn't protect Sophie: it cuts her off from an outside perspective that could actually help her see the relationship more clearly." }
    ],
    qcm: [
      { text: "He expresses a legitimate concern about a friend he doesn't like", correct: false },
      { text: "He isolates Sophie from Cléa by putting her down and flipping the jealousy accusation onto her", correct: true },
      { text: "He jokes about Cléa's love life", correct: false },
      { text: "He suggests inviting Cléa over to get to know her better", correct: false }
    ]
  },

  chk_devalorisation: {
    mechanism: "devalorisation",
    mechanismLabel: "Physical put-downs disguised as compliments",
    date: "March 22",
    question: "Lucas comments on Sophie's looks and clothes several times. What does this produce?",
    explanation: "Every remark is wrapped in a compliment (\"you're so beautiful\") but the real message is a criticism (\"that t-shirt makes you look bigger\", \"you're not demanding enough on yourself\"). This style of put-down is particularly hard to challenge: if Sophie reacts, Lucas can claim he was just saying she's beautiful. Repeated over time, this compliment-wrapped put-down erodes Sophie's confidence in her own judgment about herself.",
    hint: "The message is wrapped in compliments — but what is Lucas really criticizing, underneath?",
    clusters: [
      { label: "direct put-down", terms: ["puts down her looks", "criticizes her body", "belittles her appearance", "criticizes what she wears"] },
      { label: "poisoned compliment / disguised criticism", terms: ["backhanded compliment", "fake compliment", "disguised criticism", "under the guise of a compliment", "criticism hidden in a compliment"] },
      { label: "controlling her appearance", terms: ["controls what she wears", "picks her clothes", "tells her what to wear", "imposes his taste", "decides her look"] },
      { label: "undermines self-confidence", terms: ["not demanding enough", "undermines her confidence", "confidence in herself", "self esteem"] }
    ],
    misreadings: [
      { terms: ["he's just giving his opinion", "honest opinion on clothes", "it's normal to give an opinion on clothes", "he thinks she's beautiful", "everyone has their own taste", "he's just trying to help her feel good"],
        feedback: "Giving your opinion once about an outfit isn't the problem. Here, the repeated pattern (\"it makes you look bigger\", \"you're not demanding enough\") wrapped in compliments (\"you're so beautiful\") is used to steer what Sophie wears and, over time, chip away at how she sees herself." }
    ],
    qcm: [
      { text: "He's sincerely complimenting Sophie's beauty", correct: false },
      { text: "He puts down her looks and choices under the guise of compliments, to steer her appearance", correct: true },
      { text: "He's helping her pick an outfit for a specific occasion", correct: false },
      { text: "He's simply being honest about his taste in clothes", correct: false }
    ]
  },

  chk_cycle_tension: {
    mechanism: "cycle_tension_reconciliation",
    mechanismLabel: "Tension → explosion → reconciliation cycle",
    date: "March 23",
    question: "Lucas goes from explosive anger (\"ANSWER ME, DAMN IT\") to a declaration of love within minutes. What does this cycle produce in Sophie?",
    explanation: "The abrupt shift from an outburst of anger and control (\"who were you hanging out with?\") to an excuse rooted in love (\"it's because I care about you so much\") is a well-documented cycle in coercive relationships: tension, explosion, then an intense reconciliation that erases the crisis and reframes it as proof of love. This cycle pushes Sophie to apologize and change her own behavior (\"we need to make sure it doesn't happen again\") for a problem that actually stems from Lucas's controlling behavior.",
    hint: "Look at the whole sequence: anger → demands → excuse. Who, in the end, ends up having to \"be careful\"?",
    clusters: [
      { label: "tension-reconciliation cycle", terms: ["cycle", "tension then reconciliation", "explosion then apology", "swings between anger and love", "goes from anger to love", "crisis then"] },
      { label: "control / possessiveness", terms: ["controls who she sees", "wants to know who", "demands she answer", "controls her outings", "demands to know where she is", "who she was with"] },
      { label: "excuse rooted in love", terms: ["excuses his anger", "because he loves her", "justifies the outburst"] },
      { label: "disproportionate outburst", terms: ["disproportionate", "explodes", "loses it", "freaks out"] }
    ],
    misreadings: [
      { terms: ["normal to worry", "normal for him to worry", "she should have answered", "it's understandable he's worried", "it's her fault for not answering", "she was wrong not to reply"],
        feedback: "Worrying about not hearing back can happen to anyone. What's questionable here is the intensity of the outburst (all caps, demanding to know \"who\" she was with) followed by a love-based justification — a cycle that shifts the responsibility onto Sophie instead of onto Lucas's controlling behavior." }
    ],
    qcm: [
      { text: "He's legitimately worried and Sophie should have answered sooner", correct: false },
      { text: "He alternates a controlling outburst with a love-based excuse, a cycle that shifts the blame onto Sophie", correct: true },
      { text: "He expresses sincere remorse without demanding anything in return", correct: false },
      { text: "He suggests they buy a charger together", correct: false }
    ]
  },

  chk_isolement_geo: {
    mechanism: "isolement_geographique",
    mechanismLabel: "Geographic isolation",
    date: "June 12",
    question: "Lucas has already found an apartment and a job on the other side of the country, before even mentioning it to Sophie. What does this plan actually produce?",
    explanation: "The move is presented as a romantic surprise (\"just the two of us\", \"a cocoon\"), but its concrete effect is to cut Sophie off from her entire circle (friends, family, work) in favor of a life where Lucas would be the only person present. Whether calculated or not, the result is the same: the fewer social ties Sophie has independent of him, the harder it becomes for her to step back or ask for help.",
    hint: "Who made the decisions (job, apartment) — and who finds out about the plan once it's already settled?",
    clusters: [
      { label: "direct geographic isolation", terms: ["geographic isolation", "cuts her off", "far from her family", "far from her friends", "uprooted", "cut off from everyone", "far from everything"] },
      { label: "unilateral decision / done deal", terms: ["decides without her", "done deal", "unilateral decision", "already decided everything", "without asking her opinion", "imposes the move", "without consulting her"] },
      { label: "romanticizing the isolation", terms: ["romanticiz", "dresses up the isolation", "just the two of", "presents it as a dream"] },
      { label: "imposed move", terms: ["already decided the move alone", "she has to give up everything to follow him", "imposes the move without asking her"] }
    ],
    misreadings: [
      { terms: ["romantic project", "it's romantic", "it's a beautiful project", "it's just an opportunity", "normal to want to move forward together", "couples move together", "couples move like that"],
        feedback: "Moving in together isn't a problem in itself. What's questionable is that Lucas has already decided and arranged everything (job, apartment) without consulting Sophie, in a place where she knows no one — and presents this total isolation as the solution to \"all the problems\" she has here (Jérémy, Cléa, her parents)." }
    ],
    qcm: [
      { text: "It's a beautiful, spontaneous, romantic life project", correct: false },
      { text: "He imposes an already-decided move that cuts Sophie off from her whole circle", correct: true },
      { text: "He asks Sophie's opinion before looking for an apartment", correct: false },
      { text: "He suggests trying it out for a few months first", correct: false }
    ]
  },

  chk_dependance_fin: {
    mechanism: "dependance_financiere",
    mechanismLabel: "Financial dependence",
    date: "June 12",
    question: "Lucas suggests Sophie won't \"even need to work\". What does this change in the balance of the relationship?",
    explanation: "Presented as a gift (\"you won't even need to work\"), this proposal puts Sophie in total financial dependence on Lucas, in a city where she knows no one. Combined with the geographic isolation, financial dependence is one of the factors that make it hardest to leave a troubled relationship: with no income of her own and no network, Sophie's concrete options shrink drastically.",
    hint: "If Sophie has no job, no close friends nearby, and lives in the apartment Lucas picked on his own, what is her independence resting on?",
    clusters: [
      { label: "direct financial dependence", terms: ["financial dependence", "dependent", "financially dependent", "no income of her own", "no money of her own", "depends on him"] },
      { label: "giving up work framed positively", terms: ["stop working", "won't need to work", "gives up her job", "giving up her job", "gives up her career", "quits her job"] },
      { label: "imposed division of roles", terms: ["handles the money", "handles the house", "traditional division of roles", "controls the finances", "decides who works"] },
      { label: "loss of autonomy", terms: ["financial autonomy", "loses her autonomy", "no income at all", "no income whatsoever"] }
    ],
    misreadings: [
      { terms: ["it's a gift", "generous of him", "it's generous", "it's a relief for her", "get some rest", "she'll get to rest", "it's more comfortable for her"],
        feedback: "Not having to work anymore might sound comfortable in the short term. But combined with being cut off from her entire circle, it puts Sophie in total financial dependence on Lucas — which drastically reduces her ability to leave if the relationship gets worse." }
    ],
    qcm: [
      { text: "It's a generous gift that will be a relief for Sophie", correct: false },
      { text: "It makes her totally financially dependent on him, far from everyone she knows", correct: true },
      { text: "It will let her save up for a personal project", correct: false },
      { text: "It's a temporary solution until she finds a job there", correct: false }
    ]
  }

};

const MESSAGES = [
  // Friday, March 8
  { who: "section", text: "Friday, March 8" },
  { who: "them", name: "Lucas 💬", text: "Hey!", time: "Mar 8 22:18" },
  { who: "me", name: "Sophie 🩷", text: "Hey!", time: "Mar 8 22:18", status: "read" },
  { who: "me", name: "Sophie 🩷", text: "I had such a great night!", time: "Mar 8 22:19", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Same! You're amazing! I'm so happy we're together. You're extraordinary!", time: "Mar 8 22:20" },
  { who: "me", name: "Sophie 🩷", text: "Thanks! That's sweet! 😍💖", time: "Mar 8 22:21", status: "read" },
  { who: "them", name: "Lucas 💬", text: "I'm so lucky, it's unreal! ❤️❤️❤️", time: "Mar 8 22:22", checkpoint: "chk_love_bombing" },

  // Saturday, March 9 - morning
  { who: "section", text: "Saturday, March 9 — 10:12" },
  { who: "them", name: "Lucas 💬", text: "Morning gorgeous 😘", time: "Mar 9 10:12" },
  { who: "them", name: "Lucas 💬", text: "What are we doing today?", time: "Mar 9 10:13" },
  { who: "me", name: "Sophie 🩷", text: "What do you want to do?", time: "Mar 9 10:14", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Have you seen how nice it is out? ☀️", time: "Mar 9 10:15" },
  { who: "them", name: "Lucas 💬", text: "Come on, let's go for a walk!", time: "Mar 9 10:15" },
  { who: "me", name: "Sophie 🩷", text: "Yes, sounds great! 😍", time: "Mar 9 10:16", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Ok, kisses 😘", time: "Mar 9 10:17" },
  { who: "me", name: "Sophie 🩷", text: "I'll bring food.\nLet's meet at the park in two hours 🌳", time: "Mar 9 10:18", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Kisses ❤️", time: "Mar 9 10:19" },
  { who: "me", name: "Sophie 🩷", text: "Kisses 😘", time: "Mar 9 10:19", status: "read" },

  // Saturday, March 9 — evening
  { who: "section", text: "Saturday, March 9 — 18:30" },
  { who: "me", name: "Sophie 🩷", text: "Hey 😄\nWhat are we doing tonight?", time: "Mar 9 18:30", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Honestly, I can't be bothered today 😅", time: "Mar 9 18:31" },
  { who: "them", name: "Lucas 💬", text: "I'm gonna stay home and play video games 🎮", time: "Mar 9 18:32" },
  { who: "me", name: "Sophie 🩷", text: "Want me to come over? 👀", time: "Mar 9 18:33", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Nah, I just want some quiet time today 😌\nSee you next time ❤️", time: "Mar 9 18:34" },
  { who: "me", name: "Sophie 🩷", text: "Ok, sounds good! 😊", time: "Mar 9 18:36", status: "read" },

  // Monday, March 11
  { who: "section", text: "Monday, March 11 — 09:22" },
  { who: "them", name: "Lucas 💬", text: "How's the most beautiful girl today?", time: "Mar 11 09:22" },
  { who: "me", name: "Sophie 🩷", text: "Stop it 😁.", time: "Mar 11 09:23", status: "read" },
  { who: "them", name: "Lucas 💬", text: "I'm not kidding. You're the most beautiful girl I've ever seen.\nI hope you're not attracting too much jealousy 😉", time: "Mar 11 09:24" },
  { who: "me", name: "Sophie 🩷", text: "What do you mean?", time: "Mar 11 09:25", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Well, a girl like you, obviously…\nIt makes people jealous.", time: "Mar 11 09:26", checkpoint: "chk_jalousie_induite" },
  { who: "me", name: "Sophie 🩷", text: "?", time: "Mar 11 09:27", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Anyway, I'm really happy we get to live this moment together. Can't wait to see you again soon ❤️❤️❤️", time: "Mar 11 09:29" },

  // Friday, March 15
  { who: "section", text: "Friday, March 15 — 20:07" },
  { who: "them", name: "Lucas 💬", text: "You're going to another party without me?", time: "Mar 15 20:07" },
  { who: "me", name: "Sophie 🩷", text: "Come on babe, it's a girls' night.", time: "Mar 15 20:08", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Yeah, but…\nI don't know what to do tonight.\nI'm bored.", time: "Mar 15 20:10" },
  { who: "me", name: "Sophie 🩷", text: "Don't you want to play video games?", time: "Mar 15 20:11", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Meh 😅. When you're not here, I don't feel good.\nIt's like this emptiness.\nI'm glad you're with your friends. But for me it's really going to be a HARD night.", time: "Mar 15 20:13", checkpoint: "chk_chantage_affectif" },
  { who: "me", name: "Sophie 🩷", text: "… Do you want me to stay with you?", time: "Mar 15 20:14", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Do whatever you want, babe.\nBut it would really mean a lot to me if…\nIf you took how I feel right now into account.\nThat would really prove you're someone amazing.", time: "Mar 15 20:16" },
  { who: "me", name: "Sophie 🩷", text: "Well, ok, yeah…\nI'll tell my friends I'm staying with you a bit.", time: "Mar 15 20:18", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Honestly, you're…\nI'm so lucky to be with you.\nYou're the best thing that's ever happened to me.\nCan't wait to see you ❤️\nBig kisses, big kisses.\nWe're gonna have an amazing night 😘\nKisses kisses kisses ❤️❤️❤️", time: "Mar 15 20:20" },

  // Tuesday, March 19
  { who: "section", text: "Tuesday, March 19 — 19:02" },
  { who: "them", name: "Lucas 💬", text: "I saw you liked Jérémy's photo on Insta.", time: "Mar 19 19:02" },
  { who: "me", name: "Sophie 🩷", text: "The photo's funny!", time: "Mar 19 19:03", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Meh… to each their own taste I guess.", time: "Mar 19 19:04" },
  { who: "me", name: "Sophie 🩷", text: "I like it…", time: "Mar 19 19:05", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Ah no it's not a problem, it's just that… I don't get a good vibe from Jérémy.\nAnd you know, you know how guys are… if you like a photo like that, he's gonna start… getting ideas.", time: "Mar 19 19:07" },
  { who: "me", name: "Sophie 🩷", text: "Jérémy… I've known him since we were kids, he's a friend.", time: "Mar 19 19:08", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Yeah but, you know, guys… they always have something in the back of their mind.\nAnd besides… I can see you liked it, you know.", time: "Mar 19 19:10" },
  { who: "me", name: "Sophie 🩷", text: "So what?", time: "Mar 19 19:11", status: "read" },
  { who: "them", name: "Lucas 💬", text: "I don't know, did you even think about how I might feel seeing that?", time: "Mar 19 19:12" },
  { who: "me", name: "Sophie 🩷", text: "Meaning what?\nI can't like things?", time: "Mar 19 19:13", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Well, do whatever you want.\nBut when I see that, I start wondering, it makes me sad.\nAnd I don't get it, you know… I wouldn't do that.\nAnd there I see you liking some other guy's photo on Insta like that…\nSo yeah, you get it? I start wondering.", time: "Mar 19 19:15" },
  { who: "me", name: "Sophie 🩷", text: "Wait, why are you wondering anything?\nThere's nothing going on, Jérémy's a friend.", time: "Mar 19 19:17", status: "read" },
  { who: "them", name: "Lucas 💬", text: ".\nAnd besides there are other people who saw you liked it.\nAnd they know we're together.\nSo what are they gonna say? Did you think about all that? You see… it's a complicated situation.\nI wouldn't want people to think of you… like you want to please several guys at once, for example.\nI'm saying this for you.\nI don't want people to get a bad image of you.\nAnd I'm saying it because I love you so much.\nAnd I don't want… you to get a bad reputation. ❤️", time: "Mar 19 19:20", checkpoint: "chk_controle_social" },
  { who: "me", name: "Sophie 🩷", text: "So what am I supposed to do?\nStop liking guys' photos?", time: "Mar 19 19:22", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Do whatever you want…\nBut I think it's important you're aware of how I feel and what image it gives.\nAnd after that, really, it's… it's up to you.\nKisses kisses, anyway, gorgeous ❤️\nAnd have a great night 😘❤️❤️❤️", time: "Mar 19 19:24" },

  // Wednesday
  { who: "section", text: "Wednesday — 18:42" },
  { who: "me", name: "Sophie 🩷", text: "Lucas, we need to talk. Sometimes I don't understand you.", time: "Wed 18:42", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Meaning?", time: "Wed 18:43" },
  { who: "me", name: "Sophie 🩷", text: "Some days you're super warm with me, you're wonderful.\nAnd other days you're really distant… it makes me uncomfortable, honestly.", time: "Wed 18:44", status: "read" },
  { who: "them", name: "Lucas 💬", text: "No but Sophie, you're talking nonsense right now.", time: "Wed 18:45" },
  { who: "me", name: "Sophie 🩷", text: "It's really something I've noticed.\nSome days you're wonderful, we're really close.\nAnd other times you don't talk to me for hours, even days.\nAnd you're super cold in your replies.", time: "Wed 18:46", status: "read" },
  { who: "them", name: "Lucas 💬", text: "You're really making things up right now.\nYOU NEED TO STOP OVERTHINKING LIKE THIS\nSome days I'm more tired, other days less.\nThat's it. There's no need to take it further.", time: "Wed 18:48" },
  { who: "me", name: "Sophie 🩷", text: "That doesn't explain your mood swings.", time: "Wed 18:49", status: "read" },
  { who: "them", name: "Lucas 💬", text: "You're really overthinking this, Sophie.\nAnd right now, you're overthinking it way too much.\nHonestly, it's not good for us.\nYou really need to stop overanalyzing all this.\nWhat I like about our relationship is that it's really simple.\nAnd when you say that, you're creating distance between us.\nAnd now I feel bad. I feel a bit guilty. Is that what you want", time: "Wed 18:51", checkpoint: "chk_gaslighting" },

  // Thursday, March 20
  { who: "section", text: "Thursday, March 20 — 14:02" },
  { who: "them", name: "Lucas 💬", text: "Your friend Cléa… I've thought about it a lot, and I really don't think she's a good person for you.", time: "Mar 20 14:02" },
  { who: "me", name: "Sophie 🩷", text: "Why are you saying that? I've known Cléa for years.", time: "Mar 20 14:03", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Babe, I've told you before: you often misjudge people. And every time, you get taken advantage of.", time: "Mar 20 14:04" },
  { who: "me", name: "Sophie 🩷", text: "When have I ever been \"taken advantage of\", according to you?", time: "Mar 20 14:05", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Several times.\nYou think you know people, you trust them, and in the end, they betray you.\nI've noticed it. And I don't like it.\nI don't like people manipulating you like that.", time: "Mar 20 14:07" },
  { who: "me", name: "Sophie 🩷", text: "No, but Cléa hasn't done anything wrong…", time: "Mar 20 14:08", status: "read" },
  { who: "them", name: "Lucas 💬", text: "I see you when you're with her. You're not really yourself. You act silly. Honestly you seem like a kid.", time: "Mar 20 14:10" },
  { who: "me", name: "Sophie 🩷", text: "We have a good time together. She's nice.", time: "Mar 20 14:11", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Nice… great. If she's \"nice\" then it's all fine 🙃.\nCléa, right from the start, she's never liked me.\nAnd to me, that's very clear: it's jealousy. 😏", time: "Mar 20 14:13" },
  { who: "me", name: "Sophie 🩷", text: "No, she just told you she finds you a bit… possessive with me, that's all.", time: "Mar 20 14:14", status: "read" },
  { who: "them", name: "Lucas 💬", text: "See?\nThat's exactly jealousy.\nShe's jealous of what we have. She wants to put distance between us.\nFunny how she's never managed to keep a guy more than a few months.\nAnd here we are, together, happy.\nShe wants to break that. That way she'd have you all to herself.", time: "Mar 20 14:16" },
  { who: "me", name: "Sophie 🩷", text: "Yeah, well… that's just your opinion.", time: "Mar 20 14:17", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Except I know you.\nYou're too nice, and you might end up doing what she wants just to please her. Hasn't she already told you to be wary of me?\nAnd you, you might start believing her.\nWhen really she's only doing that because she can't stand seeing you happy.\nBecause when you're doing well, it drives her crazy.", time: "Mar 20 14:19" },
  { who: "me", name: "Sophie 🩷", text: "Don't you think you're going a bit far here? 🤨", time: "Mar 20 14:20", status: "read" },
  { who: "them", name: "Lucas 💬", text: "No, think about it properly.\nAsk yourself who's really there for you.\nWho does everything for your happiness, who fights for you.\nAnd you'll see there aren't that many left. 💬", time: "Mar 20 14:22", checkpoint: "chk_isolement_amis" },

  // Friday, March 22
  { who: "section", text: "Friday, March 22 — 18:42" },
  { who: "them", name: "Lucas 💬", text: "I saw your latest photo on Insta.", time: "Mar 22 18:42" },
  { who: "me", name: "Sophie 🩷", text: "Oh yeah, do you like it?", time: "Mar 22 18:43", status: "read" },
  { who: "them", name: "Lucas 💬", text: "You still have that t-shirt?", time: "Mar 22 18:44" },
  { who: "me", name: "Sophie 🩷", text: "Um, what about my t-shirt?", time: "Mar 22 18:45", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Ah you know, I've told you, I think it…\nIt makes you look bigger, you're not comfortable in it.", time: "Mar 22 18:47" },
  { who: "me", name: "Sophie 🩷", text: "But it's super comfortable!", time: "Mar 22 18:48", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Babe, at some point come on.\nYou're so beautiful! And that t-shirt…\nIt doesn't do you justice… I mean really, it's like you're…\nWell, you can see it yourself, when you look in a mirror.", time: "Mar 22 18:50" },
  { who: "me", name: "Sophie 🩷", text: "I think I look nice.", time: "Mar 22 18:51", status: "read" },
  { who: "them", name: "Lucas 💬", text: "You're not demanding enough on yourself 😅.\nYou have so much potential to look amazing!\nLook, with that little dress I like, you look really stunning!\nThat's what you should wear!", time: "Mar 22 18:53", checkpoint: "chk_devalorisation" },

  // Saturday, March 23
  { who: "section", text: "Saturday, March 23 — 23:41" },
  { who: "them", name: "Lucas 💬", text: "Sophie, Sophie, where are you?", time: "Mar 23 23:41" },
  { who: "them", name: "Lucas 💬", text: "Sophie, Sophie, ANSWER ME, DAMN IT!", time: "Mar 23 23:42" },
  { who: "them", name: "Lucas 💬", text: "Sophie! Sophie, answer me!", time: "Mar 23 23:43" },
  { who: "me", name: "Sophie 🩷", text: "What?", time: "Mar 23 23:44", status: "read" },
  { who: "them", name: "Lucas 💬", text: "You're not answering, I've been texting you for three hours!", time: "Mar 23 23:45" },
  { who: "me", name: "Sophie 🩷", text: "Well yeah, my phone died!", time: "Mar 23 23:46", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Wait Sophie, you're out at a party, your phone died…\nI'm losing my mind, you understand? I'm losing my mind!", time: "Mar 23 23:47" },
  { who: "me", name: "Sophie 🩷", text: "Why are you losing your mind?\nYou know exactly where I was!", time: "Mar 23 23:48", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Maybe you ran into people, I don't know who you're with, I don't know who you're hanging out with… I'm worried, you can't do this to me again! NEVER AGAIN.", time: "Mar 23 23:49" },
  { who: "me", name: "Sophie 🩷", text: "Look, it's just that my phone died!", time: "Mar 23 23:50", status: "read" },
  { who: "them", name: "Lucas 💬", text: "We all have a charger, Sophie!\nDo you see the state you put me in? Honestly, that's not cool!", time: "Mar 23 23:51" },
  { who: "me", name: "Sophie 🩷", text: "I'm sorry…\nBut I was just at a party, with my friends, having a good time…", time: "Mar 23 23:52", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Well yeah, of course, when you're with your friends, you forget about your boyfriend. Meanwhile I was in such a bad place.\nI almost did something stupid…\nBut it's because I care about you so much that I get like this.\nAnyway… we need to make sure it doesn't happen again, ok babe? ❤️", time: "Mar 23 23:55", checkpoint: "chk_cycle_tension" },

  // Sunday, June 12
  { who: "section", text: "Sunday, June 12 — 09:47" },
  { who: "them", name: "Lucas 💬", text: "Babe, I finally found it!", time: "Jun 12 09:47" },
  { who: "me", name: "Sophie 🩷", text: "Found what? 😮", time: "Jun 12 09:48", status: "read" },
  { who: "them", name: "Lucas 💬", text: "The job of our dreams!\nOn the other side of the country 😍", time: "Jun 12 09:49" },
  { who: "me", name: "Sophie 🩷", text: "You're moving?", time: "Jun 12 09:50", status: "read" },
  { who: "them", name: "Lucas 💬", text: "“We're” moving! But that's not all!\nI already found us an apartment.\nAmazing, right? 😁", time: "Jun 12 09:52" },
  { who: "me", name: "Sophie 🩷", text: "Wait, what am I supposed to do on the other side of the country?\nMy whole life is here!", time: "Jun 12 09:54", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Don't you ever think about “us” 😔", time: "Jun 12 09:55" },
  { who: "me", name: "Sophie 🩷", text: "I have a job here, my friends…", time: "Jun 12 09:56", status: "read" },
  { who: "them", name: "Lucas 💬", text: "Come on honestly, your friends, you barely see them anymore, and your job's a drag, you've told me a hundred times.", time: "Jun 12 09:57" },
  { who: "me", name: "Sophie 🩷", text: "It's not my dream job but it's fine, it's nice.", time: "Jun 12 09:58", status: "read" },
  { who: "them", name: "Lucas 💬", text: "You're not demanding enough on yourself. I've always told you that. This is the chance to start fresh, together! And you won't even need to work!\nMy job will cover everything.\nAnd I already found the perfect apartment.", time: "Jun 12 10:00" },
  { who: "me", name: "Sophie 🩷", text: "So you want me to move into your apartment, on the other side of the country?\nBut I don't know anyone there…", time: "Jun 12 10:02", status: "read" },
  { who: "them", name: "Lucas 💬", text: "And isn't it enough, just the two of us? We'll be great together.\nWe'll build a cocoon, a family. A paradise. That's what life's beauty is about, right? 💞", time: "Jun 12 10:04", checkpoint: "chk_isolement_geo" },
  { who: "me", name: "Sophie 🩷", text: "You could have talked to me about it first, though…", time: "Jun 12 10:05", status: "read" },
  { who: "them", name: "Lucas 💬", text: "There you go.\nOnce again, I try to surprise you, I bust my butt looking for an apartment, even to buy one…\nAnd you, zero appreciation.\nI work myself to the bone, and I feel like my efforts are never truly recognized.", time: "Jun 12 10:07" },
  { who: "me", name: "Sophie 🩷", text: "That's not it… don't you think it's a bit fast?", time: "Jun 12 10:08", status: "read" },
  { who: "them", name: "Lucas 💬", text: "I'm emotional, impulsive,\nI want to make you happy — and it never works 😞", time: "Jun 12 10:09" },
  { who: "me", name: "Sophie 🩷", text: "When does your job start?", time: "Jun 12 10:10", status: "read" },
  { who: "them", name: "Lucas 💬", text: "In two weeks 😃", time: "Jun 12 10:11" },
  { who: "me", name: "Sophie 🩷", text: "Two weeks?! That's nothing!\nI need to give up my apartment, get everything ready…", time: "Jun 12 10:12", status: "read" },
  { who: "them", name: "Lucas 💬", text: "I'll help you babe 😘. And it's what you want. There's too much drama here, with Jérémy, with Cléa, with your parents who don't like me. Honestly this fresh start is going to do us so much good.\nJust you and me. ❤️", time: "Jun 12 10:14" },
  { who: "me", name: "Sophie 🩷", text: "Look, I need to think about it, ok?", time: "Jun 12 10:15", status: "read" },
  { who: "them", name: "Lucas 💬", text: "No but listen to me.\nI've already pictured it, over there, with you.\nAnd I know you, you're going to hesitate again and never dare to go for it. That's why you struggle to be happy. You don't trust your instincts enough.\nWe've talked about starting a family before, right?\nThis is the perfect chance.\nI trust you, so trust me back.\nCome on, babe. Let's go together, and we'll have a wonderful life. ✨", time: "Jun 12 10:18" },
  { who: "me", name: "Sophie 🩷", text: "… Without a job?", time: "Jun 12 10:19", status: "read" },
  { who: "them", name: "Lucas 💬", text: "I'll take care of the money. You can take care of the house. And we'll be able to start the family of our dreams. It'll be amazing. 💑", time: "Jun 12 10:20", checkpoint: "chk_dependance_fin" },
  { who: "me", name: "Sophie 🩷", text: "Okay…", time: "Jun 12 10:21", status: "read" }
];
