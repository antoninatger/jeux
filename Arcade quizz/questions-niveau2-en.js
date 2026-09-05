// Level 2 — Disinformation, Beyond Fake News (high school, 15-18)
// Source : QCM - Désinformation au-delà de la Fake News.txt

var QUESTIONS_NIVEAU2 = [
  // ── Fake News & verification ──────────────────────────────────
  {
    cat: "🔍 Fake News & verification",
    q: "What is fake news?",
    options: [
      "Information that contradicts reality",
      "An opinion disguised as a fact",
      "A humorous hoax",
      "Information stripped of its context"
    ],
    answer: 0,
    expl: "Fake news is deliberately false information, at odds with reality — to be distinguished from an opinion, a hoax, or information stripped of its context."
  },
  {
    cat: "🔍 Fake News & verification",
    q: "Who popularised the term \"fake news\" in 2016?",
    options: [
      "Barack Obama",
      "Hillary Clinton",
      "Donald Trump",
      "Mark Zuckerberg"
    ],
    answer: 2,
    expl: "Donald Trump popularised the expression in 2016 to label true reporting that he found inconvenient — turning the concept back against the press itself."
  },
  {
    cat: "🔍 Fake News & verification",
    q: "Which criterion helps you check a piece of information?",
    options: [
      "The number of \"likes\"",
      "The length of the article",
      "The number of separate sources",
      "The presence of images"
    ],
    answer: 2,
    expl: "Cross-checking several independent sources is the basic method of fact-checking. Likes, length and images say nothing about reliability."
  },
  {
    cat: "🔍 Fake News & verification",
    q: "Verification criteria are not 100% reliable because…?",
    options: [
      "They are too complicated",
      "Only journalists can use them",
      "They only work online",
      "They are clues, not absolute proof"
    ],
    answer: 3,
    expl: "No verification criterion guarantees absolute truth: they are clues that raise or lower the probability that a piece of information is reliable."
  },

  // ── Disinformation & misinformation ──────────────────────────
  {
    cat: "⚠️ Disinformation & misinformation",
    q: "What is disinformation?",
    options: [
      "Sharing false information unintentionally",
      "Publishing an opinion as a fact",
      "Passing on false information deliberately",
      "Circulating a story without naming its source"
    ],
    answer: 2,
    expl: "Disinformation is intentional: you know the story is false and you spread it anyway, in order to deceive. That is what sets it apart from misinformation."
  },
  {
    cat: "⚠️ Disinformation & misinformation",
    q: "What is misinformation?",
    options: [
      "Refusing to share a true story",
      "Manufacturing false evidence",
      "Passing on false information deliberately",
      "Sharing false information unintentionally"
    ],
    answer: 3,
    expl: "Misinformation is spread in good faith: you believe the story is true, but it is false. The intent is not malicious, unlike disinformation."
  },

  // ── Correlation & causation ───────────────────────────────────
  {
    cat: "🔗 Correlation & causation",
    q: "What is the difference between correlation and causation?",
    options: [
      "Correlation is the stronger of the two",
      "They are synonyms",
      "Correlation links without one causing the other",
      "Causation is a statistical link"
    ],
    answer: 2,
    expl: "Correlation = a statistical link between two variables. Causation = one brings about the other. Confusing the two is among the most frequent sources of disinformation."
  },
  {
    cat: "🔗 Correlation & causation",
    q: "What does \"concomitance\" refer to?",
    options: [
      "A cause-and-effect link",
      "A proven correlation",
      "Two events that coincide by chance",
      "A manipulation technique"
    ],
    answer: 2,
    expl: "Concomitance is when two events happen at the same time with no link between them. The classic example: the correlation between Nicolas Cage films and swimming-pool drownings."
  },

  // ── Disinformation techniques ─────────────────────────────
  {
    cat: "🎭 Disinformation techniques",
    q: "Disinforming by stripping a true story of its context is called…?",
    options: [
      "Astroturfing",
      "Manufacturing doubt",
      "Decontextualisation",
      "Mute news"
    ],
    answer: 2,
    expl: "Decontextualisation uses genuinely true information but removes its context, which radically distorts its meaning without any direct lie."
  },
  {
    cat: "🎭 Disinformation techniques",
    q: "Decontextualisation is dangerous because it…",
    options: [
      "Invents facts that never existed",
      "Relies on computer-generated images",
      "Distorts a true story without lying outright",
      "Deletes online archives"
    ],
    answer: 2,
    expl: "That is its strength: it uses a real fact, which makes it hard to refute. But out of context, a true story can lead to a completely false conclusion."
  },
  {
    cat: "🎭 Disinformation techniques",
    q: "What is astroturfing?",
    options: [
      "Spreading false stories on a massive scale",
      "Deleting inconvenient information",
      "Faking a spontaneous grassroots movement",
      "Paying corrupt journalists"
    ],
    answer: 2,
    expl: "Astroturfing means creating the illusion of a spontaneous citizens' movement — fake accounts, fake comments, fake polls — to suggest an artificial groundswell of support."
  },
  {
    cat: "🎭 Disinformation techniques",
    q: "Which country is cited for its paid \"trolls\" as an example of astroturfing?",
    options: [
      "China",
      "North Korea",
      "The United States",
      "Russia"
    ],
    answer: 3,
    expl: "Russia is the best-documented example, with its \"troll factories\" (the Internet Research Agency) employing thousands of people to simulate favourable public opinion."
  },
  {
    cat: "🎭 Disinformation techniques",
    q: "What is \"manufacturing doubt\"?",
    options: [
      "Creating false scientific evidence",
      "Erasing information from the internet",
      "Sowing confusion about a specific subject",
      "Producing fake news in volume"
    ],
    answer: 2,
    expl: "Manufacturing doubt (agnotology) means deliberately sowing confusion about an established scientific consensus, so as to paralyse any decision or regulation."
  },
  {
    cat: "🎭 Disinformation techniques",
    q: "Which industry is the best-known example of manufacturing doubt?",
    options: [
      "The pharmaceutical industry",
      "The oil industry",
      "The food industry",
      "The tobacco industry"
    ],
    answer: 3,
    expl: "The tobacco industry funded studies for decades to \"sow doubt\" about the effects of smoking, when its own researchers had known since the 1950s that it caused cancer."
  },
  {
    cat: "🎭 Disinformation techniques",
    q: "Since when have we known that cigarettes are dangerous?",
    options: [
      "The 1970s",
      "The 1990s",
      "The 1950s",
      "The 2000s"
    ],
    answer: 2,
    expl: "The tobacco industry's own scientists knew from the 1950s that cigarettes were carcinogenic. Manufacturing doubt held off regulation for decades."
  },
  {
    cat: "🎭 Disinformation techniques",
    q: "What is \"mute news\"?",
    options: [
      "Spreading false information",
      "Using bots to amplify messages",
      "Silencing or playing down certain information",
      "Correcting a story far too late"
    ],
    answer: 2,
    expl: "Mute news is disinformation by omission: leaving an important event uncovered, giving it little airtime or burying it down the page is also a way of manipulating information."
  },
  {
    cat: "🎭 Disinformation techniques",
    q: "Which event eclipsed the uprisings in Iran (an example of mute news)?",
    options: [
      "The Benalla affair",
      "The Yellow Vests",
      "Pierre Palmade's car crash",
      "The Me Too movement"
    ],
    answer: 2,
    expl: "The car crash involving the comedian Pierre Palmade in February 2023 captured the whole of French media attention, eclipsing the uprisings in Iran — a perfect illustration of mute news by saturation of the media space."
  },

  // ── Cognitive biases & framing ─────────────────────────────────
  {
    cat: "🧠 Bias & framing",
    q: "What is \"framing bias\"?",
    options: [
      "Inventing a false story",
      "Deleting true information",
      "Spreading rumours on a massive scale",
      "Steering how a true story is perceived"
    ],
    answer: 3,
    expl: "Framing bias means presenting true information in a way that steers the reader's interpretation — without lying, but by selecting the words, the angle and the facts put forward."
  },
  {
    cat: "🧠 Bias & framing",
    q: "Which bias makes us believe something because a great many people subscribe to it?",
    options: [
      "Survivorship bias",
      "Framing bias",
      "Popularity bias",
      "Confirmation bias"
    ],
    answer: 2,
    expl: "Popularity bias (or \"social proof\") makes us believe that an opinion shared by many must be right. It is a mechanism heavily exploited on social media."
  },
  {
    cat: "🧠 Bias & framing",
    q: "Which channel is cited for anti-vaccine framing without outright fake news?",
    options: [
      "CNN",
      "MSNBC",
      "Fox News",
      "ABC News"
    ],
    answer: 2,
    expl: "Fox News often steered its coverage of the Covid-19 vaccines through its choice of experts, angles and highlighted facts — without broadcasting fake news in the strict sense, but with heavily loaded framing."
  },
  {
    cat: "🧠 Bias & framing",
    q: "What is the right lesson of survivorship bias on warplanes?",
    options: [
      "Reinforce the areas that were hit",
      "Replace the damaged aircraft",
      "The most heavily hit aircraft are the sturdiest",
      "Reinforce the areas with no bullet holes"
    ],
    answer: 3,
    expl: "Abraham Wald realised that the planes that came back showed the areas a plane could survive being hit. The planes shot down, invisible in the data, had been hit elsewhere — and that is where the armour was needed."
  },
  {
    cat: "🧠 Bias & framing",
    q: "Which scientist brought survivorship bias to light?",
    options: [
      "Charles Darwin",
      "Albert Einstein",
      "Abraham Wald",
      "Isaac Newton"
    ],
    answer: 2,
    expl: "Abraham Wald, a Hungarian statistician, demonstrated survivorship bias during the Second World War by analysing the bullet holes on United States Army aircraft."
  },

  // ── Media, neutrality & theories ────────────────────────────
  {
    cat: "📡 Media & neutrality",
    q: "How did Trump use the term \"fake news\" in 2016?",
    options: [
      "To denounce lies told about him",
      "To censor media outlets",
      "To label true reporting that he found inconvenient",
      "To promote his own media outlets"
    ],
    answer: 2,
    expl: "Trump turned the term back against the press, calling true but inconvenient reporting \"fake news\" — converting a critical tool into a rhetorical weapon against journalists."
  },
  {
    cat: "📡 Media & neutrality",
    q: "Can a media outlet be entirely neutral?",
    options: [
      "Yes, by publishing nothing but facts",
      "Yes, with well-trained journalists",
      "No, because every outlet has political backers",
      "No, neutrality always depends on the context"
    ],
    answer: 3,
    expl: "Absolute neutrality is impossible: choosing which facts to publish, in what order and in which words is already taking a position. Neutrality is subjective and always depends on the context."
  },
  {
    cat: "📡 Media & neutrality",
    q: "Which conspiracy theory contributed to Putin's attack on Ukraine?",
    options: [
      "The Great Replacement",
      "The New World Order",
      "The \"golden billion\" theory",
      "Chemtrails"
    ],
    answer: 2,
    expl: "The Russian \"golden billion\" theory holds that the West wants to cut the world population to one billion people (hence its hostility towards Russia). It served as ideological justification for the invasion of Ukraine."
  }
];
