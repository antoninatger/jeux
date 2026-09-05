// Level 3 — Rhetoric & Critical Thinking (high school, 15-18)
// Source : rhétorique.txt (transcription formation Antonin J.)

var QUESTIONS_NIVEAU3 = [
  // ── Influence & rhetoric ────────────────────────────────────
  {
    cat: "📣 Influence & rhetoric",
    q: "Rhetoric is defined as:",
    options: [
      "The art of lying in order to convince",
      "The art of persuading, convincing or impressing an audience through words",
      "The study of the grammar and style of texts",
      "A technique for memorising speeches"
    ],
    answer: 1,
    expl: "Rhetoric is the art of influence: convincing or impressing through words (and images). Being aware of it is what keeps you from being manipulated."
  },
  {
    cat: "📣 Influence & rhetoric",
    q: "Are we all open to influence?",
    options: [
      "No, only poorly educated people are",
      "No, critical thinking makes you completely immune to influence",
      "Yes, but that is not necessarily a bad thing — it depends on the context",
      "Yes, and it is always negative"
    ],
    answer: 2,
    expl: "Picking a charger with 2,686 good reviews over one with 3,000 bad ones is useful social influence. Being open to influence is neither good nor bad in itself — everything depends on the context."
  },
  {
    cat: "📣 Influence & rhetoric",
    q: "Asch's experiment (the \"line experiment\") demonstrates that:",
    options: [
      "People ignore the opinions of others when they are sure of themselves",
      "Individuals adjust their answers to what others say, even when it is wrong",
      "Experts are less open to influence than novices",
      "Social influence only exists in groups of more than ten people"
    ],
    answer: 1,
    expl: "In this experiment, participants gave wrong answers about the length of lines simply because the others (confederates) had done so. We adjust our answers to the group, even against the evidence."
  },
  {
    cat: "📣 Influence & rhetoric",
    q: "Rhetoric relies on words alone. True or false?",
    options: [
      "True — rhetoric is an exclusively spoken discipline",
      "False — images and videos can convince too, notably by playing on emotion",
      "True — images have no demonstrated rhetorical effect",
      "False — rhetoric refers solely to techniques of visual manipulation"
    ],
    answer: 1,
    expl: "\"We are also going to show how images and videos can convince, notably by playing on emotion.\" Modern rhetoric reaches well beyond the spoken word."
  },

  // ── Speaker, audience, interlocutor ────────────────────────
  {
    cat: "🎙️ Speaker, audience, interlocutor",
    q: "The speaker is:",
    options: [
      "The person you are trying to convince",
      "The person doing the convincing",
      "The referee or the moderator of a debate",
      "The public who listen without taking part"
    ],
    answer: 1,
    expl: "The speaker is trying to convince. They address an interlocutor and/or an audience — three distinct roles, and not always filled by the same people."
  },
  {
    cat: "🎙️ Speaker, audience, interlocutor",
    q: "What is the difference between the audience and the interlocutor?",
    options: [
      "None, they are synonyms",
      "The audience is the person addressed directly; the interlocutor is the public",
      "The interlocutor is the person addressed directly; the audience is everyone who is listening",
      "The interlocutor is always the same as the audience"
    ],
    answer: 2,
    expl: "In a televised debate, each candidate addresses their opposing interlocutor — but the real aim is to convince the audience, the viewers at home. Audience and interlocutor are not necessarily the same."
  },
  {
    cat: "🎙️ Speaker, audience, interlocutor",
    q: "In a televised political debate, who is the candidates' real target?",
    options: [
      "Their opposing interlocutor",
      "The journalists moderating",
      "The viewers (the audience)",
      "The pollsters who rate the debate afterwards"
    ],
    answer: 2,
    expl: "\"The aim is not to convince your political opponent to come over to your side, but to convince the people watching the debate.\" The interlocutor is a foil, the audience is the real target."
  },

  // ── Types of rhetoric ───────────────────────────────────────
  {
    cat: "🎭 Types of rhetoric",
    q: "In a monologue, can the audience cut in on the speaker?",
    options: [
      "Yes, that is the very essence of a monologue",
      "No, the speaker talks without being interrupted",
      "Yes, but only to ask questions",
      "No, unless the speaker explicitly gives them the floor"
    ],
    answer: 1,
    expl: "A political speech to a crowd is a monologue: the speaker talks, the public listens. Nobody interrupts and nobody counter-argues live."
  },
  {
    cat: "🎭 Types of rhetoric",
    q: "Deliberation is a rhetorical mode in which:",
    options: [
      "You try to impress the public without any dialogue",
      "Both parties talk with each other in order to reach a consensus",
      "The aim is to beat your opponent in front of the public",
      "There is no rule at all — anything goes"
    ],
    answer: 1,
    expl: "In a deliberation (a couple deciding what to do tonight, for instance), either party can change their mind. The aim is to reach an agreement, not to \"win\"."
  },
  {
    cat: "🎭 Types of rhetoric",
    q: "A couple are talking over whether to watch a series or go out tonight. That is the mode called:",
    options: [
      "Competition",
      "Conflict",
      "Monologue",
      "Deliberation"
    ],
    answer: 3,
    expl: "\"A couple working out what to do tonight... that is everyday rhetoric.\" Both parties influence each other in order to reach an agreement: that is deliberation."
  },
  {
    cat: "🎭 Types of rhetoric",
    q: "Rhetorical conflict differs from the other modes because:",
    options: [
      "It seeks to convince the public more than the opponent",
      "It is governed by strict rules of decorum",
      "Its purpose is neither to convince nor to reach a consensus: it is a verbal joust",
      "It always ends in a consensus"
    ],
    answer: 2,
    expl: "\"Conflict is simply enjoying the pleasure of the verbal joust.\" A family dinner going off the rails, for example — nobody is trying to convince anybody, it is just the joust."
  },
  {
    cat: "🎭 Types of rhetoric",
    q: "Calling someone out publicly on social media in order to convince your own followers who are reading is:",
    options: [
      "Deliberation",
      "Competition",
      "Conflict",
      "Monologue"
    ],
    answer: 1,
    expl: "Competition: you address an interlocutor, but the real aim is to convince the audience, the followers who are reading. The opponent is a foil, not the real target."
  },

  // ── Ingroup & outgroup ────────────────────────────────────
  {
    cat: "🏘️ Ingroup & outgroup",
    q: "The ingroup refers to:",
    options: [
      "The group you are trying to convince but which is opposed to you",
      "The group the speaker belongs to and with which they share their values",
      "The whole of the public at a debate",
      "The people who stay neutral in a conflict"
    ],
    answer: 1,
    expl: "Ingroup = your own group, the people who already share your values. Outgroup = the others, the ones you want to convince. The rhetorical strategy differs radically with the target."
  },

  // ── Ethos, Pathos, Logos ──────────────────────────────────────
  {
    cat: "🏷️ Ethos, Pathos, Logos",
    q: "Ethos convinces through:",
    options: [
      "Logic and figures",
      "Emotion and compassion",
      "The credibility, the ethics and the standing of the speaker",
      "Repetition and force of voice"
    ],
    answer: 2,
    expl: "Ethos = ethics and credibility. It comes in two forms: universal ethos (invoking great shared values) and contextual ethos (using your own standing or reputation)."
  },
  {
    cat: "🏷️ Ethos, Pathos, Logos",
    q: "Universal ethos consists in:",
    options: [
      "Using your own standing or achievements to convince",
      "Invoking great shared values (justice, liberty, fraternity…)",
      "Lying about your background to appear more credible",
      "Quoting recognised experts in your speech"
    ],
    answer: 1,
    expl: "\"It is a scandal that in the country of the Enlightenment, people still sleep on the street.\" Invoking shared values (fraternity, solidarity) is universal ethos — you summon principles everyone holds."
  },
  {
    cat: "🏷️ Ethos, Pathos, Logos",
    q: "Contextual ethos consists in:",
    options: [
      "Invoking shared universal values",
      "Playing on the emotions of the audience",
      "Drawing on your own position, reputation or experience to convince",
      "Building a logical syllogism"
    ],
    answer: 2,
    expl: "\"I have studied global warming for twenty years, so trust me.\" Using your standing as an expert is contextual ethos — but beware of the authority bias."
  },
  {
    cat: "🏷️ Ethos, Pathos, Logos",
    q: "Pathos convinces through:",
    options: [
      "Logic and rational demonstration",
      "The emotions and the sensitivity of the audience",
      "Your own standing or your personal authority",
      "Shared moral values"
    ],
    answer: 1,
    expl: "Pathos = emotion. Touching people's feelings, stirring empathy or outrage, is a very powerful rhetorical tool — but it can also be manipulative (fake distressing images on social media)."
  },
  {
    cat: "🏷️ Ethos, Pathos, Logos",
    q: "Logos convinces through:",
    options: [
      "Emotion and empathy",
      "The reputation of the speaker",
      "Logic and rational argumentation",
      "Shared universal values"
    ],
    answer: 2,
    expl: "Logos = logic. \"My argument holds because it is coherent.\" The syllogism (all men are mortal → Socrates is mortal) is the classic example."
  },
  {
    cat: "🏷️ Ethos, Pathos, Logos",
    q: "\"All men are mortal. Queen Margot is mortal. Therefore Queen Margot is a man.\" This reasoning is:",
    options: [
      "A valid logical syllogism (correct Logos)",
      "A successful Pathos",
      "A strong contextual Ethos",
      "A fallacy — reasoning that looks logical but is false"
    ],
    answer: 3,
    expl: "Beware of false syllogisms! This reasoning looks like Logos, but the structure is flawed: being mortal is not enough to be a man. A classic fallacy."
  },

  // ── Fallacies & debating well ─────────────────────────────────
  {
    cat: "🤝 Debating well",
    q: "The straw man consists in:",
    options: [
      "Restating your opponent's argument faithfully before replying",
      "Caricaturing or exaggerating your opponent's argument to attack it more easily",
      "Looking for a point of agreement before debating",
      "Using statistics to contradict your opponent"
    ],
    answer: 1,
    expl: "\"The straw man is caricaturing what your opponent said and attacking the caricature.\" For example: \"You feminists want to kill all men.\" Emotionally effective, but fallacious."
  },
  {
    cat: "🤝 Debating well",
    q: "The steel man is a technique that consists in:",
    options: [
      "Exaggerating your opponent's argument to refute it more easily",
      "Restating your opponent's own argument honestly before you reply to it",
      "Attacking your opponent's credibility rather than their arguments",
      "Using emotional force to crush your opponent"
    ],
    answer: 1,
    expl: "The steel man is the exact opposite of the straw man. You listen, then sum up faithfully: \"Hold on, let me sum up your argument and tell me whether I have understood.\" It breaks the confrontational dynamic and allows a debate on substance."
  },
  {
    cat: "🤝 Debating well",
    q: "Why is restating your opponent's argument (the steel man) beneficial?",
    options: [
      "It buys you time to think up your reply",
      "It shows you respect your opponent, defuses the tension and allows a debate on substance",
      "It forces your opponent to change argument",
      "It is only useful in formal, academic debates"
    ],
    answer: 1,
    expl: "\"It breaks the rhythm and the spiral of violence, it shows you do not treat the other person as an enemy, and it allows a debate on substance.\""
  },
  {
    cat: "🤝 Debating well",
    q: "\"The burden of proof lies with whoever makes the claim.\" This rule means:",
    options: [
      "Every argument must be proven by both parties at once",
      "It is up to whoever makes a claim to supply the evidence, not up to the other to prove them wrong",
      "Evidence is only useful in scientific debates",
      "Only the more experienced speaker has to prove their claims"
    ],
    answer: 1,
    expl: "\"If someone claims that Biden is a reptilian, I cannot prove them wrong.\" It is up to whoever makes the claim to prove it — not up to the other side to refute it. Reversing this rule takes a debate into a dead end."
  },
  {
    cat: "🤝 Debating well",
    q: "To convince effectively, you are advised to adapt your arguments:",
    options: [
      "To as many people as possible, without distinction",
      "To your own ingroup alone",
      "To the values and the perspective of your interlocutor",
      "To the experts who know the subject, and nobody else"
    ],
    answer: 2,
    expl: "Take the Covid vaccines: Democrats were addressed on solidarity with the most vulnerable; Republicans on national pride (an American vaccine) and economic recovery. Putting yourself in the other person's shoes is effective rhetoric."
  }
];
