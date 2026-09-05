// Influencers — Fake News, influencers and critical thinking
// Source: slides of "formation-fake-news-influenceurs"
// 20 questions

var QUESTIONS_INFLUENCEURS = [

  {
    cat: "💅 Who influencers are",
    q: "An influencer is:",
    options: [
      "Someone paid by a brand to sell a product",
      "Someone who influences their audience's opinions or purchases on social media",
      "Someone with more than 100,000 followers",
      "A celebrity who posts regularly"
    ],
    answer: 1,
    expl: "The definition says nothing about follower count, money or sincerity. It describes a position: someone speaks, many listen, and what is said has effects."
  },
  {
    cat: "💅 Who influencers are",
    q: "Are influencers a good thing?",
    options: [
      "Yes: they make information more accessible",
      "No: they live off disguised advertising",
      "It depends: ZEvent raised over 10 million euros for charities, while a trading influencer was fined 150,000 euros",
      "The question makes no sense, they are just entertainers"
    ],
    answer: 2,
    expl: "Both examples are true and coexist. ZEvent 2024 passed 10 million euros in donations; France's consumer watchdog fined a trading influencer for misleading commercial practice. It is a job, not a moral category."
  },
  {
    cat: "💅 Who influencers are",
    q: "Why do we like influencers?",
    options: [
      "Because they are better informed than traditional media",
      "Because they give us emotions, a sense of closeness, and make us dream",
      "Because they are free",
      "Because they say what others dare not say"
    ],
    answer: 1,
    expl: "Three drivers, none of which has anything to do with the quality of the information: emotion, closeness, aspiration. That is what makes vigilance hard."
  },

  {
    cat: "🤝 Why we believe them",
    q: "A parasocial relationship is:",
    options: [
      "A friendship formed online between two strangers",
      "A one-way bond: you know every facet of someone's life, and they do not know you",
      "A working relationship between an influencer and a brand",
      "A group of followers who know each other"
    ],
    answer: 1,
    expl: "The brain treats these daily signals like those of a friendship, because it never had to tell a real presence from a broadcast one. Hence the trust granted on topics where the person knows no more than you."
  },
  {
    cat: "🤝 Why we believe them",
    q: "Asch's experiment (1951) shows that:",
    options: [
      "Memory is unreliable under stress",
      "Participants knowingly give a wrong answer to a simple question, purely because the group gave it first",
      "People obey an authority figure even against their conscience",
      "Children imitate adult violence"
    ],
    answer: 1,
    expl: "The question was simple and the right answer obvious. Group pressure, not difficulty, produces the error. We are all influenceable, and knowing it is the first step."
  },
  {
    cat: "🤝 Why we believe them",
    q: "Storytelling works because:",
    options: [
      "A personal story holds attention far better than a figure or a proof",
      "Stories are easier to verify",
      "It is regulated by law, therefore more reliable",
      "It is built on real data, staged"
    ],
    answer: 0,
    expl: "\"From nothing to everything\" is remembered and passed on, where an accurate figure is forgotten. The useful question is not \"is this a good story?\" but \"what does it prove?\"."
  },

  {
    cat: "🧠 Our biases",
    q: "A sports champion promotes a product unrelated to their field, and it works. Which mechanism?",
    options: ["Confirmation bias", "Popularity bias, or halo effect", "Commitment bias", "Emotional bias"],
    answer: 1,
    expl: "Someone we like influences us on everything else. It is not their competence that convinces, it is the sympathy they inspire."
  },
  {
    cat: "🧠 Our biases",
    q: "Confirmation bias, applied to influencers:",
    options: [
      "If you like an influencer, it is hard not to believe them when they sell you something",
      "You only follow influencers your own age",
      "You systematically check what an influencer you dislike says",
      "You believe the most-followed influencers more"
    ],
    answer: 0,
    expl: "The brain favours what confirms what it already thinks, including its fondness for someone. Doubting an influencer you like means doubting your own judgement."
  },
  {
    cat: "🧠 Our biases",
    q: "Commitment bias explains that:",
    options: [
      "The longer you follow, the more the algorithm shows you",
      "Once you have committed to a belief, going back is very hard",
      "Content that provokes reactions spreads better",
      "We value more what we have paid for"
    ],
    answer: 1,
    expl: "Having publicly defended someone, bought what they recommended, convinced a friend: each act raises the cost of turning back. Hence communities defending an influencer harder after a damaging revelation."
  },
  {
    cat: "🧠 Our biases",
    q: "A woman is scammed out of hundreds of thousands of euros by an AI-generated fake Brad Pitt. How to explain it?",
    options: [
      "Lack of digital literacy",
      "Naivety",
      "It is not stupidity: anyone can fall into these traps",
      "The victim's social isolation"
    ],
    answer: 2,
    expl: "And this is the most counter-intuitive point: whoever is convinced they cannot be fooled is a prime target, precisely because they are not paying attention."
  },
  {
    cat: "🧠 Our biases",
    q: "A racket and a ball cost 12 euros together. The racket costs 10 euros more than the ball. How much is the ball?",
    options: ["2 euros", "1 euro", "1.50 euros", "11 euros"],
    answer: 1,
    expl: "The instinctive answer is 2, and it is wrong: the racket would cost 12 and the total 14. With 1, the racket is 11, which is indeed 10 more, and the total works out. The brain answers fast without checking, exactly as it does with fake news."
  },
  {
    cat: "🧠 Our biases",
    q: "The intuitive system, compared with the analytical one:",
    options: [
      "Is slower but more reliable",
      "Is fast, cheap in energy, and can make mistakes",
      "Only kicks in under stress",
      "Is reserved for important decisions"
    ],
    answer: 1,
    expl: "The analytical system is slow, energy-hungry and rational. On social media we run almost entirely on the intuitive one, and that is where errors settle."
  },

  {
    cat: "💰 When it goes wrong",
    q: "A pyramid scheme works because:",
    options: [
      "The product sold is real but overpriced",
      "Early joiners are paid with later joiners' money, not by any real activity",
      "Profits come from risky financial investments",
      "Participants recruit each other among professionals"
    ],
    answer: 1,
    expl: "There is no real activity behind it. The scheme holds as long as new entrants arrive, and collapses when the flow stops. The last in lose everything."
  },
  {
    cat: "💰 When it goes wrong",
    q: "\"Treats over 15 skin problems\", \"Before / After 5 minutes\". What reflex?",
    options: [
      "Check the account's follower count",
      "Look for reviews in the comments",
      "Remember that if something looks too incredible to be true, it usually is false",
      "Ask another influencer's opinion"
    ],
    answer: 2,
    expl: "The rule applies to advertising as to information. A simple promise to a complex problem is almost always a scam."
  },
  {
    cat: "💰 When it goes wrong",
    q: "Why is the line between sincere advice and advertising blurred?",
    options: [
      "Because the law requires no disclosure",
      "Because promo codes, affiliate links and \"ad\" labels blend into ordinary content",
      "Because brands forbid mentioning it",
      "Because influencers often do not know they are paid"
    ],
    answer: 1,
    expl: "The legal disclosure often exists, but it is brief and arrives after trust is established. The brain has already filed the message under friendly advice."
  },
  {
    cat: "💰 When it goes wrong",
    q: "In a tightly knit group around an influencer:",
    options: [
      "Criticism becomes hard to voice, and the group can radicalise without noticing",
      "Members watch each other, which limits excesses",
      "Information circulates better than elsewhere",
      "Disagreement is easier, since members know each other"
    ],
    answer: 0,
    expl: "This is groupthink. The tighter the group, the higher the social cost of disagreeing, and the less critical thinking is voiced."
  },
  {
    cat: "💰 When it goes wrong",
    q: "Why do public clashes and disagreements go viral?",
    options: [
      "Because they are quicker to watch",
      "Because they generate huge engagement, and therefore algorithmic visibility",
      "Because platforms promote them for a fee",
      "Because the audience explicitly asks for them"
    ],
    answer: 1,
    expl: "The algorithm does not judge content, it measures reaction. Divisive topics produce the most, hence polarisation."
  },

  {
    cat: "🔍 Staying alert",
    q: "A \"reputational\" interest is:",
    options: [
      "An undisclosed paid partnership",
      "Holding one's character, not backtracking, staying who the community expects",
      "Defending a cause one believes in",
      "Trying to gain followers"
    ],
    answer: 1,
    expl: "Often stronger than the financial interest, and far more discreet: it leaves no accounting trace and nothing to declare."
  },
  {
    cat: "🔍 Staying alert",
    q: "A happy photo posted by a creator shows:",
    options: [
      "A chosen instant, never everything around it",
      "A staging that is always entirely fake",
      "Their real life, embellished by filters",
      "Whatever the partner brand approved"
    ],
    answer: 0,
    expl: "Nothing is faked, and yet the image lies through what it leaves out. That is framing, applied to an entire life."
  },
  {
    cat: "🔍 Staying alert",
    q: "Two aerobatic teams, two different flags, and yet the same possible image. What does this show?",
    options: [
      "That images are often retouched",
      "That angle and framing change the whole reading of an image, without faking anything",
      "That colours are unreliable on screen",
      "That all flags look alike"
    ],
    answer: 1,
    expl: "No retouching, no lie: only a choice of viewpoint. The question before an image is not only \"is it authentic?\" but \"what am I not being shown?\"."
  }
];
