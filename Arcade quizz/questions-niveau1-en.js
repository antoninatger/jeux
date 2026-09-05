// Level 1 — Fake News & Critical Thinking
// 26 questions

var QUESTIONS_NIVEAU1 = [

  // ── Defining information ────────────────────────────────────────────
  {
    cat: "🔍 Defining information",
    q: "What is fake news?",
    options: [
      "A rumour shared on social media",
      "Information that contradicts the current state of knowledge",
      "An opinion presented as a fact",
      "A misleading advertisement"
    ],
    answer: 1,
    expl: "Fake news is information that runs counter to what is actually known — it is defined by its content, not by the intention behind it."
  },
  {
    cat: "🔍 Defining information",
    q: "Fake news is about…?",
    options: [
      "Opinions and feelings",
      "Verifiable facts",
      "Scientific theories",
      "Satirical content"
    ],
    answer: 1,
    expl: "Fake news concerns facts, not the opinions or feelings that are subjective by nature."
  },
  {
    cat: "🔍 Defining information",
    q: "Can fake news be shared in good faith?",
    options: [
      "No, it is always deliberate",
      "No, people know it is false",
      "Yes, by sincere people",
      "Yes, but only on social media"
    ],
    answer: 2,
    expl: "Plenty of people share fake news while sincerely believing it to be true. Intention is not what defines fake news."
  },
  {
    cat: "🔍 Defining information",
    q: "\"Schizophrenia = having several personalities\" is an example of…?",
    options: [
      "Confirmation bias",
      "Fake news that comes from fiction",
      "A medical heuristic",
      "The framing effect"
    ],
    answer: 1,
    expl: "This widespread idea comes from films and television series, not from medical reality. It is fake news spread by popular fiction."
  },

  // ── Framing & perception ──────────────────────────────────────
  {
    cat: "🖼️ Framing & perception",
    q: "What is the framing effect?",
    options: [
      "Inventing a story out of nothing",
      "Stripping a video of its context",
      "Steering how a true story is understood",
      "Amplifying a rumour on social media"
    ],
    answer: 2,
    expl: "The framing effect means presenting true information in a way that steers perception — without lying, but influencing judgement all the same."
  },
  {
    cat: "🖼️ Framing & perception",
    q: "Adelson's optical illusion (squares A and B are identical) shows that…?",
    options: [
      "Our eyes work badly",
      "Our brain interprets reality according to context",
      "Pictures online are often retouched",
      "Photographs cannot be trusted"
    ],
    answer: 1,
    expl: "The brain judges the colour of a square by what surrounds it. It interprets reality rather than simply seeing it — which can lead us astray."
  },

  // ── Thinking systems ────────────────────────────────────────
  {
    cat: "🧠 Thinking systems",
    q: "How many modes of thinking does our brain run on?",
    options: [
      "Only one",
      "Two",
      "Three",
      "Four"
    ],
    answer: 1,
    expl: "The brain runs in an intuitive mode (fast, automatic) and an analytical mode (slow, considered)."
  },
  {
    cat: "🧠 Thinking systems",
    q: "Which mode of thinking is the brain's \"default\"?",
    options: [
      "Analytical",
      "Critical",
      "Intuitive",
      "Rational"
    ],
    answer: 2,
    expl: "The intuitive mode is on by default: it is fast and cheap in energy, but prone to reasoning errors."
  },
  {
    cat: "🧠 Thinking systems",
    q: "What is the problem with the intuitive mode on social media?",
    options: [
      "It is too slow",
      "It uses too much energy",
      "It makes us believe things that are false",
      "It blocks the sharing of information"
    ],
    answer: 2,
    expl: "On social media we are usually in intuitive mode: we react to a headline without analysing it, and that is what helps fake news spread."
  },
  {
    cat: "🧠 Thinking systems",
    q: "What is a heuristic?",
    options: [
      "A method for checking sources",
      "The tendency to draw conclusions without all the evidence",
      "A bias linked to the emotions",
      "A fact-checking tool"
    ],
    answer: 1,
    expl: "A heuristic is the mental shortcut that pushes the brain to conclude even on incomplete information — a frequent source of error."
  },
  {
    cat: "🧠 Thinking systems",
    q: "In the puzzle racket + ball = 1.10 euros (the racket costs 1 euro more), how much does the ball cost?",
    options: [
      "10 cents",
      "1 euro",
      "5 cents",
      "50 cents"
    ],
    answer: 2,
    expl: "5 cents is the right answer (0.05 + 1.05 = 1.10). Intuition says 10 cents — the classic error of the intuitive system."
  },
  {
    cat: "🧠 Thinking systems",
    q: "What does the racket-and-ball puzzle show?",
    options: [
      "That maths is difficult",
      "That intuition can make us miss the right answer",
      "That the analytical mode is always wrong",
      "That social media distorts our reasoning"
    ],
    answer: 1,
    expl: "The puzzle shows that the intuitive system produces a fast answer that is wrong. Taking the time to analyse changes everything."
  },
  {
    cat: "🧠 Thinking systems",
    q: "The example of the American flag on the Moon illustrates which concept?",
    options: [
      "Confirmation bias",
      "Emotional bias",
      "The heuristic — concluding too fast",
      "The framing effect"
    ],
    answer: 2,
    expl: "Reasoning \"a waving flag means wind, there is no wind on the Moon, so we were lied to\" is a heuristic shortcut. In reality, a rod holds the flag out."
  },
  {
    cat: "🧠 Thinking systems",
    q: "What is the real reason the flag stays up on the Moon?",
    options: [
      "There is a little wind on the Moon",
      "The flag is held out by a metal rod",
      "The flag is extremely light",
      "NASA faked the footage"
    ],
    answer: 1,
    expl: "A horizontal rod holds the flag out. It needs no wind to stay up — the conspiracy argument rests on a false premise."
  },

  // ── Cognitive biases ───────────────────────────────────────────
  {
    cat: "🎭 Cognitive biases",
    q: "What is a cognitive bias?",
    options: [
      "A memory error",
      "A media manipulation",
      "An automatic reasoning error",
      "A lack of information"
    ],
    answer: 2,
    expl: "A cognitive bias is an unconscious filter that distorts how we process information. It can make us hold something to be true for no valid reason."
  },
  {
    cat: "🎭 Cognitive biases",
    q: "What is popularity bias?",
    options: [
      "Believing a story because it is moving",
      "Believing a story because it confirms our ideas",
      "Trusting someone popular even outside their field",
      "Sharing a story without checking it"
    ],
    answer: 2,
    expl: "Popularity bias pushes us to follow the view of a popular person, or of a majority, even where they have no standing on the subject."
  },
  {
    cat: "🎭 Cognitive biases",
    q: "What is emotional bias?",
    options: [
      "Rejecting the information that annoys us",
      "Favouring the information that triggers an emotion",
      "Believing information from the people we like",
      "Sharing sad stories rather than happy ones"
    ],
    answer: 1,
    expl: "Emotional bias pushes us to believe and remember information that stirs a strong emotion — anger, fear, outrage — even when it is false."
  },
  {
    cat: "🎭 Cognitive biases",
    q: "Why are social networks so fond of emotive information?",
    options: [
      "Because it is easier to check",
      "Because it generates engagement",
      "Because it is generally true",
      "Because censorship algorithms like it"
    ],
    answer: 1,
    expl: "True or false, emotive information draws more likes, shares and comments. Platforms therefore favour it algorithmically."
  },
  {
    cat: "🎭 Cognitive biases",
    q: "What is confirmation bias?",
    options: [
      "Believing a story because it is popular",
      "Favouring the stories that confirm what we already think",
      "Rejecting every piece of new information",
      "Trusting the experts of a given field"
    ],
    answer: 1,
    expl: "Confirmation bias drives us to seek out, believe and remember whatever validates our existing beliefs — and to ignore whatever contradicts them."
  },
  {
    cat: "🎭 Cognitive biases",
    q: "What is the halo effect?",
    options: [
      "Believing a story because it is repeated",
      "Transferring someone's competence to another field",
      "Ignoring information that contradicts our beliefs",
      "Trusting headlines without reading the articles"
    ],
    answer: 1,
    expl: "The halo effect: if someone is seen as an expert, or as popular, in one field, we trust them in every field — well beyond their competence."
  },

  // ── Critical attitude ─────────────────────────────────────────
  {
    cat: "💡 Critical attitude",
    q: "\"If a story is too good to be true…\"",
    options: [
      "It probably comes from a reliable expert",
      "It is probably false",
      "It deserves to be shared at once",
      "It may well be satire"
    ],
    answer: 1,
    expl: "A useful maxim: stories too good, too scandalous or too neat to be true deserve to be checked immediately."
  },
  {
    cat: "💡 Critical attitude",
    q: "\"A solution too simple for a complex problem\"… that is generally…?",
    options: [
      "A lead worth exploring seriously",
      "False",
      "A major scientific discovery",
      "A media framing technique"
    ],
    answer: 1,
    expl: "If a complex problem (AIDS, say) had a simple solution (lemon juice), it would have been found. Excessive simplicity should raise the alarm."
  },
  {
    cat: "💡 Critical attitude",
    q: "What is scientific consensus?",
    options: [
      "A vote between politicians and scientists",
      "The agreement of the vast majority of scientists in a field",
      "A report published by the United Nations",
      "The opinion of a single recognised expert"
    ],
    answer: 1,
    expl: "Scientific consensus is the agreement of the great majority of the experts in a field. It is one of the most reliable sources of knowledge there is."
  },
  {
    cat: "💡 Critical attitude",
    q: "On global warming, which source is the most reliable?",
    options: [
      "A mainstream documentary",
      "A disaster film",
      "An article in a celebrity magazine",
      "The word of an expert in the field"
    ],
    answer: 3,
    expl: "Not all sources are equal. On a scientific subject, an expert in the field is more reliable than a film or a non-specialist article."
  },
  {
    cat: "💡 Critical attitude",
    q: "Why is admitting your own ignorance useful against fake news?",
    options: [
      "To avoid hurting other people",
      "Because admitting you do not know lets you listen and learn",
      "Because experts dislike arrogant people",
      "To come across as more credible online"
    ],
    answer: 1,
    expl: "Admitting your ignorance is the first step towards questioning yourself, listening to the experts and making progress. Pride is fertile ground for fake news."
  },
  {
    cat: "💡 Critical attitude",
    q: "What is metacognition?",
    options: [
      "A memorisation technique",
      "The ability to learn quickly",
      "Standing back to watch how your own brain works",
      "A cognitive bias linked to emotion"
    ],
    answer: 2,
    expl: "Metacognition is thinking about your own way of thinking. Becoming aware of your biases is what allows you to keep them in check against fake news."
  }
];
