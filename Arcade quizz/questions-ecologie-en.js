// Ecology: Fake News and ecology
// Source: slides of "comment-convaincre-un-climatosceptique"
// 24 questions

var QUESTIONS_ECOLOGIE = [

  // ── Global warming ──────────────────────────────────────────
  {
    cat: "🌡️ Global warming",
    q: "Global warming is:",
    options: [
      "A rise in temperatures observed during a particularly hot summer",
      "The lasting increase in the average temperature of Earth's climate, observed over several decades",
      "All recent natural disasters put together",
      "An exact synonym for climate disruption"
    ],
    answer: 1,
    expl: "The key word is \"lasting\": climate is measured over decades. A hot summer or a cold winter can neither prove nor disprove it."
  },
  {
    cat: "🌡️ Global warming",
    q: "What is the difference between global warming and climate disruption?",
    options: [
      "None, they are two words for the same thing",
      "Warming concerns France, disruption the rest of the world",
      "Disruption is broader: it includes warming, but also rainfall, droughts, ice and sea level",
      "Disruption is an activist exaggeration of warming"
    ],
    answer: 2,
    expl: "Warming is one part of disruption. That is why a harsh winter or extreme rainfall does not contradict warming: they can be part of it."
  },
  {
    cat: "🌡️ Global warming",
    q: "\"It snowed in April: where's your global warming?\" This climate sceptic denies:",
    options: [
      "Warming itself",
      "Human responsibility",
      "The consequences of warming",
      "The role of the IPCC"
    ],
    answer: 0,
    expl: "They deny warming itself, confusing one day's weather with the climate of several decades."
  },
  {
    cat: "🌡️ Global warming",
    q: "\"The climate has always changed, long before factories.\" This climate sceptic denies:",
    options: [
      "Warming itself",
      "Human responsibility",
      "The consequences of warming",
      "The role of the IPCC"
    ],
    answer: 1,
    expl: "They accept that the climate changes, but not that humans are the cause. The fact that the climate changed in the past says nothing about the cause of today's change."
  },
  {
    cat: "🌡️ Global warming",
    q: "\"Two more degrees? We'll adapt.\" This climate sceptic denies:",
    options: [
      "Warming itself",
      "Human responsibility",
      "The consequences of warming",
      "The role of the IPCC"
    ],
    answer: 2,
    expl: "They accept warming, but not its seriousness. Showing them temperature curves is useless: talk about concrete impacts instead."
  },
  {
    cat: "🌡️ Global warming",
    q: "In France, what share of the population is climate sceptic (Ipsos, 2024)?",
    options: [
      "About 3%",
      "About 10%",
      "About a third",
      "More than half"
    ],
    answer: 2,
    expl: "33%: 10% deny warming, and 23% accept it without believing it is caused by humans. And since 2023, the trend is no longer falling."
  },

  // ── The evidence ─────────────────────────────────────────────
  {
    cat: "🔬 The evidence",
    q: "Which of these is NOT an indicator of global warming?",
    options: [
      "Heat building up in the oceans",
      "Melting glaciers and ice sheets",
      "Rising average sea level",
      "The number of cold days in April in one city"
    ],
    answer: 3,
    expl: "Real indicators are measured across the whole planet and over time: average temperatures, ocean heat, ice, sea level, greenhouse gases. A few cold days in one city are not among them."
  },
  {
    cat: "🔬 The evidence",
    q: "How do we know that warming is caused by humans?",
    options: [
      "Through fingerprints: for example, the upper atmosphere cools while the lower atmosphere warms",
      "Because the IPCC voted on it",
      "Because summers are hotter than they used to be",
      "We don't know, it's a hypothesis"
    ],
    answer: 0,
    expl: "Each cause leaves a different trace. If the Sun were heating more, every layer of the atmosphere would warm. But the stratosphere is cooling: that is the fingerprint of greenhouse gases."
  },
  {
    cat: "🔬 The evidence",
    q: "\"CO₂ is only 0.04% of the air, it can't do anything.\" Where is the mistake?",
    options: [
      "CO₂ actually makes up more than 20% of the air",
      "There is no mistake, CO₂ has no effect on the climate",
      "The 0.04% figure was made up by climate sceptics",
      "It confuses a small amount with a small effect: CO₂ traps heat, unlike nitrogen and oxygen"
    ],
    answer: 3,
    expl: "The figure is right, the reasoning is not. What matters is not CO₂'s share of the air but what it does: it traps the heat that Earth sends back into space."
  },

  // ── Disinformation on social media ───────────────────────────
  {
    cat: "📱 Disinformation",
    q: "According to the CNRS study of Twitter (2023), who are climate-denial accounts often?",
    options: [
      "Climate scientists who disagree with the IPCC",
      "Mostly oil company accounts",
      "The same accounts that were anti-vax during COVID, then pro-Russian during the war in Ukraine",
      "Disappointed environmental activists"
    ],
    answer: 2,
    expl: "They are not climate specialists: they are accounts that move from one controversy to the next. Real specialists talk about their field; denialist \"references\" talk about everything."
  },
  {
    cat: "📱 Disinformation",
    q: "An account presented as an \"expert\" gives opinions on the climate, vaccines, the war in Ukraine and the economy. What should you think?",
    options: [
      "It's rather a bad sign: a real specialist talks about their own field",
      "It's reassuring: they see the big picture",
      "Nothing, the number of topics says nothing",
      "It proves they are paid to lie"
    ],
    answer: 0,
    expl: "Nobody is an expert in everything. An opinion on every topic is a clue, not proof: it invites you to check where the claimed expertise comes from."
  },
  {
    cat: "📱 Disinformation",
    q: "\"What about China? Go and talk to them first.\" Which of the 5 Ds is being used?",
    options: [
      "Discredit",
      "Distort",
      "Distract",
      "Divide"
    ],
    answer: 2,
    expl: "Distract, through whataboutism: the question is not answered, the subject is changed."
  },
  {
    cat: "📱 Disinformation",
    q: "\"Greens want us to go back to living in caves.\" Which technique is being used?",
    options: [
      "The straw man: distorting the other side's position",
      "Whataboutism: changing the subject",
      "Threats: discouraging people from speaking",
      "None, it's an argument like any other"
    ],
    answer: 0,
    expl: "Distort, through the straw man: nobody holds this position. An absurd version is invented so it can be easily knocked down."
  },
  {
    cat: "📱 Disinformation",
    q: "In the 5 Ds technique, \"discrediting\" means:",
    options: [
      "Showing that a figure is wrong",
      "Offering another explanation",
      "Setting groups against each other",
      "Attacking the person rather than what they say"
    ],
    answer: 3,
    expl: "It is an attack on ethos: the researcher took a plane, the journalist has \"sold out\". None of this changes their measurements."
  },
  {
    cat: "📱 Disinformation",
    q: "Which new strategy is spreading on social media?",
    options: [
      "Denying that glaciers are melting",
      "No longer attacking global warming, but the solutions to it",
      "Posting only scientific studies",
      "No longer talking about the climate at all"
    ],
    answer: 1,
    expl: "Denial is getting harder. So the solutions are attacked instead, often by presenting them as a hidden plan to control people or make someone rich."
  },

  // ── Why evidence is not enough ───────────────────────────────
  {
    cat: "🧠 Why we doubt",
    q: "Motivated reasoning is:",
    options: [
      "Thinking for a long time before deciding",
      "Being motivated to learn new things",
      "Choosing the conclusion that suits us first, then building the reasoning that leads to it",
      "Changing your mind when faced with evidence"
    ],
    answer: 2,
    expl: "\"We don't have a scientist inside us, we have a lawyer.\" The lawyer already knows the conclusion and looks for arguments to defend it."
  },
  {
    cat: "🧠 Why we doubt",
    q: "In the United States, which factor best predicts climate change denial (Gounaridis and Newell, 2024)?",
    options: [
      "Level of education",
      "Income",
      "Political affiliation",
      "Age"
    ],
    answer: 2,
    expl: "Political affiliation comes first, ahead of level of education, COVID-19 vaccination rates, the carbon intensity of the regional economy, and income."
  },
  {
    cat: "🧠 Why we doubt",
    q: "During the huge Australian bushfires of 2019-2020, what happened to opinions about climate change?",
    options: [
      "Climate sceptics almost disappeared",
      "The number of people accepting climate change rose sharply",
      "Sceptics became the majority",
      "No progress: acceptors slightly declined, and many believed arsonists had started the fires"
    ],
    answer: 3,
    expl: "A disaster only convinces people if they attribute it to climate change. But a false claim spread: the fires were supposedly lit by hundreds of arsonists. It was endorsed by 89% of sceptics, 57% of fence-sitters and even 39% of acceptors."
  },
  {
    cat: "🧠 Why we doubt",
    q: "Why is insulting or guilt-tripping a climate sceptic counterproductive?",
    options: [
      "Because of reactance: when we feel pressured, we cling harder to our position",
      "Because it's rude, but it has no other effect",
      "Because it makes them more conspiracy-minded",
      "It isn't counterproductive, it makes them think"
    ],
    answer: 0,
    expl: "Reactance: we defend our freedom by digging in. Whoever insults feels better, and the conversation shuts down."
  },
  {
    cat: "🧠 Why we doubt",
    q: "Playing on fear to convince a sceptic:",
    options: [
      "Works very well, it's the most effective method",
      "Only works on young people",
      "Only works on people who are already convinced, and may backfire with sceptics",
      "Is the only method recommended by the IPCC"
    ],
    answer: 2,
    expl: "Fear mobilises those who already agree. With sceptics, it feeds rejection."
  },

  // ── How to talk about it ─────────────────────────────────────
  {
    cat: "💬 How to talk about it",
    q: "\"Try NOT to think of an elephant in a tutu.\" What does this experiment show?",
    options: [
      "That our imagination cannot be controlled",
      "That a denial repeats the information: the \"no\" is forgotten, the information stays",
      "That images should be used to convince",
      "That humour disarms sceptics"
    ],
    answer: 1,
    expl: "To understand the sentence, you have to picture the elephant. Hence the advice: rather than saying \"that's false\", offer an alternative explanation."
  },
  {
    cat: "💬 How to talk about it",
    q: "When talking to someone who doubts, what is it better to show?",
    options: [
      "The consensus: almost all scientists agree",
      "As many studies as possible",
      "Pictures of disasters",
      "Polar bears in distress"
    ],
    answer: 0,
    expl: "Judging a curve yourself is hard. Understanding that almost all specialists reach the same conclusion is easy."
  },
  {
    cat: "💬 How to talk about it",
    q: "Why does a spokesperson \"from their own side\" convince better?",
    options: [
      "Because they are more competent",
      "Because they speak louder",
      "Because we listen more readily to someone from our own group (the in-group) than from an outside group (the out-group)",
      "They don't convince better"
    ],
    answer: 2,
    expl: "The same message does not land the same way depending on who carries it. You may not be the best person to have the conversation."
  },
  {
    cat: "💬 How to talk about it",
    q: "Which of these levers was NOT presented during the training?",
    options: [
      "Making global warming concrete",
      "Setting social norms",
      "Presenting actions as positive and easy",
      "Ridiculing the other side's arguments in public"
    ],
    answer: 3,
    expl: "Ridicule triggers reactance. The levers that work: listen, build on the person's values, show the consensus, make it concrete, show the benefits, set norms, present actions as easy."
  }
];
