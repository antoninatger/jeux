// Perceptio — content (categories + biases) — English mirror of data.js
// Every source was verified (author, year, journal, volume/pages) before being included.

const CATEGORIES = [
  {
    id: "croyance",
    nom: "Belief",
    nomLong: "Belief and reasoning biases",
    classe: "c-croyance",
    couleur: "#2B4CFF",
    description: "How we convince ourselves we're right, and how we resist evidence to the contrary."
  },
  {
    id: "memoire",
    nom: "Memory",
    nomLong: "Memory-related biases",
    classe: "c-memoire",
    couleur: "#7A5CFA",
    description: "How memory distorts what actually matters, based on what's easy to recall."
  },
  {
    id: "social",
    nom: "Social",
    nomLong: "Social and relational biases",
    classe: "c-social",
    couleur: "#FF6FA5",
    description: "How a person's status, appearance or group shapes what we think of them."
  },
  {
    id: "decision",
    nom: "Decision",
    nomLong: "Decision and estimation biases",
    classe: "c-decision",
    couleur: "#17B890",
    description: "How we misjudge gains, losses and numbers when it's time to choose."
  },
  {
    id: "confiance",
    nom: "Overconfidence",
    nomLong: "Overconfidence-related biases",
    classe: "c-confiance",
    couleur: "#FF9F1C",
    description: "How we overestimate — or underestimate — what we actually know how to do."
  },
  {
    id: "temps",
    nom: "Time & probability",
    nomLong: "Biases related to the perception of time and probability",
    classe: "c-temps",
    couleur: "#6FA83C",
    description: "How the future and risk always look more favourable when they concern us personally."
  }
];

const BIAIS = [
  // ───────────────────────── BELIEF ─────────────────────────
  {
    id: "biais-confirmation",
    nom: "Confirmation bias",
    nom_anglais: "Confirmation bias",
    categorie: "croyance",
    difficulte: "easy",
    definition_courte: "The tendency to favour, seek out and interpret information that confirms one's pre-existing beliefs, while neglecting information that contradicts them.",
    definition_longue: "This bias leads us to treat information asymmetrically: we readily accept whatever fits what we already think, and scrutinise — or simply ignore — whatever contradicts it. It exists because it saves mental energy (revisiting a belief takes real cognitive effort) and because it protects our self-image: being wrong is uncomfortable. The problem is that it turns the search for information into a confirmation of what we already believed, rather than a genuine check. At scale, it explains why two people exposed to the exact same facts can each come away more certain they were right.",
    exemples: [
      { titre: "Political debate", texte: "Someone convinced an economic policy is bad only remembers the statistics that support that view, and forgets the ones that contradict it." },
      { titre: "Recruitment", texte: "A recruiter with a positive first impression of a candidate interprets their ambiguous interview answers favourably — and the reverse if the first impression was negative." },
      { titre: "Social media", texte: "People share an article that confirms what they already thought, without checking its source, far more readily than one that would contradict them." }
    ],
    qcm: [
      {
        question: "Confirmation bias mainly shows up as:",
        choix: [
          "Actively seeking out contradictory information",
          "Seeking out and favouring information that confirms a belief",
          "Completely forgetting a belief after a counter-example",
          "Reasoning that is always neutral and rational"
        ],
        bonne_reponse: 1,
        explication: "The bias pushes us to favour whatever supports our ideas — not to question or abandon them."
      },
      {
        question: "Karim is convinced a car brand is unreliable. Since then, he notices and remembers every breakdown he sees involving that brand, but forgets those of other brands just as quickly, even though he encounters them just as often. This is an example of:",
        choix: [
          "Halo effect",
          "Confirmation bias",
          "Loss aversion",
          "Hindsight bias"
        ],
        bonne_reponse: 1,
        explication: "Karim selectively filters information that confirms his initial belief (\"this brand is unreliable\") — that's the very definition of confirmation bias."
      },
      {
        question: "How does confirmation bias differ from hindsight bias?",
        choix: [
          "They are two names for the same bias",
          "Confirmation bias filters information before forming an opinion; hindsight bias distorts the memory afterwards, once the outcome is known",
          "Hindsight bias only applies to sporting events",
          "Confirmation bias only applies to political opinions"
        ],
        bonne_reponse: 1,
        explication: "Both biases distort our relationship to information, but at different moments: confirmation = an upstream filter; hindsight = a downstream reconstruction of memory, once the result is known."
      }
    ],
    identification: {
      situation: "Léa is convinced that people born in January are more determined. Since then, she notices and remembers every example that fits, and just as quickly forgets the counter-examples she encounters just as often.",
      reponses_acceptees: ["confirmation bias", "confirmatory bias"],
      indice: "Think about what she does with information that contradicts her."
    },
    sources: [
      { auteurs: "Wason, P. C.", annee: 1960, titre: "On the failure to eliminate hypotheses in a conceptual task", revue: "Quarterly Journal of Experimental Psychology, 12(3), 129–140", type: "founding study", lien: "https://doi.org/10.1080/17470216008416717" },
      { auteurs: "Nickerson, R. S.", annee: 1998, titre: "Confirmation bias: A ubiquitous phenomenon in many guises", revue: "Review of General Psychology, 2(2), 175–220", type: "review article", lien: "https://doi.org/10.1037/1089-2680.2.2.175" }
    ],
    biais_lies: ["biais-ancrage", "effet-halo", "biais-retrospectif"]
  },
  {
    id: "biais-retrospectif",
    nom: "Hindsight bias",
    nom_anglais: "Hindsight bias",
    categorie: "croyance",
    difficulte: "intermediate",
    definition_courte: "The tendency, once an event has happened, to overestimate the probability we would have assigned to it beforehand — the famous \"I knew it all along\".",
    definition_longue: "After the fact, the brain reconstructs the memory of what we thought \"before\" by quietly adjusting it to what we now know: a known outcome makes the past look more predictable than it really was. It isn't a conscious lie — the person sincerely believes they suspected the result. The mechanism serves to create a sense of coherence and control over events that were, in reality, uncertain, which is psychologically reassuring. The downside is that it prevents us from drawing the real lessons from an event: if we believe it was predictable, we don't bother asking why we failed to anticipate it.",
    exemples: [
      { titre: "Sports result", texte: "After their team loses, a fan claims they \"knew\" it would lose, even though they were betting on a win the day before." },
      { titre: "Investing", texte: "After a stock market crash, many analysts consider the warning signs to have been \"obvious\", even though they didn't flag them at the time." },
      { titre: "Medical decision", texte: "A missed diagnosis looks, in hindsight, easy to spot, which leads to harshly judging a doctor who, at the time, didn't have the same information." }
    ],
    qcm: [
      {
        question: "Hindsight bias consists of:",
        choix: [
          "Correctly predicting the future thanks to experience",
          "Overestimating, after the fact, the probability we assigned to an event before it happened",
          "Refusing to believe an event even after it has occurred",
          "Completely forgetting one's past predictions"
        ],
        bonne_reponse: 1,
        explication: "The bias isn't about forgetting, but about reconstruction: the memory of our past certainty is inflated by knowledge of the outcome."
      },
      {
        question: "Why is hindsight bias especially problematic after an accident or a failed project?",
        choix: [
          "Because it has no practical consequences",
          "Because it creates a false impression that the outcome was obvious, which undermines an honest analysis of the real causes",
          "Because it completely prevents remembering the event",
          "Because it only concerns experts"
        ],
        bonne_reponse: 1,
        explication: "By making the outcome look \"obvious\" in hindsight, the bias diverts attention from a rigorous analysis of what was, at the time, anything but obvious."
      }
    ],
    identification: {
      situation: "After the match results are announced, Farid tells his friends he \"felt\" from the start that his team would lose — even though he had publicly bet on their win the day before, and nobody in the group remembers him doubting it before kick-off.",
      reponses_acceptees: ["hindsight bias", "i knew it all along"],
      indice: "Compare what he's saying now to what he actually said before the match."
    },
    sources: [
      { auteurs: "Fischhoff, B., & Beyth, R.", annee: 1975, titre: "“I knew it would happen”: Remembered probabilities of once-future things", revue: "Organizational Behavior and Human Performance, 13(1), 1–16", type: "founding study", lien: "https://doi.org/10.1016/0030-5073(75)90002-1" }
    ],
    biais_lies: ["biais-confirmation", "effet-dunning-kruger"]
  },

  // ───────────────────────── MEMORY ─────────────────────────
  {
    id: "heuristique-disponibilite",
    nom: "Availability heuristic",
    nom_anglais: "Availability heuristic",
    categorie: "memoire",
    difficulte: "intermediate",
    definition_courte: "The tendency to estimate how frequent or probable an event is based on how easily examples come to mind, rather than on the actual statistics.",
    definition_longue: "The brain uses a shortcut: the easier a memory is to recall — because it's recent, striking, or often repeated in the media — the more we wrongly assume the event it represents is common. This shortcut is generally useful (frequent things are indeed easier to recall), but it breaks down as soon as an external factor — intense media coverage, a strong emotion, personal proximity — makes a rare event exceptionally memorable. We then end up overestimating the risk of spectacular but rare events, and underestimating that of mundane but far more frequent ones.",
    exemples: [
      { titre: "Fear of flying", texte: "After a heavily covered plane crash, many people overestimate the risk of dying in a plane, even though driving remains statistically far more dangerous." },
      { titre: "Sense of insecurity", texte: "Someone who watches a lot of crime coverage on TV estimates the crime rate in their neighbourhood as higher than it actually is." },
      { titre: "Sharks and coconuts", texte: "Widely reported shark attacks seem more frequent than accidents caused by falling coconuts — which statistically kill more people every year." }
    ],
    qcm: [
      {
        question: "The availability heuristic leads us to judge how frequent an event is based on:",
        choix: [
          "Official statistics consulted beforehand",
          "How easily examples of that event come to mind",
          "A rational probability calculation",
          "The opinion of a recognised expert"
        ],
        bonne_reponse: 1,
        explication: "It's the ease of recall — not the actual frequency — that serves as the mental shortcut."
      },
      {
        question: "Why can intense media coverage of a rare event (like a terrorist attack) distort risk perception?",
        choix: [
          "Because the media always give false statistics",
          "Because repeating the image makes the event very easy to recall, which makes it seem more frequent than it really is",
          "Because the public systematically ignores media coverage",
          "Because this isn't an example of the availability heuristic"
        ],
        bonne_reponse: 1,
        explication: "How mentally available a memory is depends on its emotional salience and repetition, not on its actual statistical frequency."
      }
    ],
    identification: {
      situation: "Ever since a plane crash made headlines for a week, Sophie has cancelled her holiday flight and prefers to drive instead, which she considers \"safer\" — even though she's flown without hesitation for ten years and nothing in the statistics has actually changed in the meantime.",
      reponses_acceptees: ["availability heuristic", "availability bias"],
      indice: "Think about what makes a memory easy to recall, regardless of how often it actually happens."
    },
    sources: [
      { auteurs: "Tversky, A., & Kahneman, D.", annee: 1973, titre: "Availability: A heuristic for judging frequency and probability", revue: "Cognitive Psychology, 5(2), 207–232", type: "founding study", lien: "https://doi.org/10.1016/0010-0285(73)90033-9" }
    ],
    biais_lies: ["biais-negativite", "biais-ancrage"]
  },
  {
    id: "biais-negativite",
    nom: "Negativity bias",
    nom_anglais: "Negativity bias",
    categorie: "memoire",
    difficulte: "easy",
    definition_courte: "The tendency to give more weight, attention and memory space to negative information than to positive information of equal intensity.",
    definition_longue: "At equal intensity, a negative event leaves a stronger mark on memory, grabs more attention, and shapes overall judgment more strongly than an equivalent positive event. This imbalance is thought to have an evolutionary origin: quickly spotting a threat (danger, betrayal, mistake) has long been more useful for survival than noticing something pleasant. In practice, this means it takes several positive experiences to offset the effect of a single negative one on an overall impression — whether of a person, a product or a situation.",
    exemples: [
      { titre: "Online reviews", texte: "A restaurant with a hundred glowing reviews sees its reputation lastingly dented by a handful of very negative ones, read and remembered out of all proportion." },
      { titre: "Performance review", texte: "An employee remembers a manager's single critical remark far longer than ten compliments received the same week." },
      { titre: "News", texte: "Alarming or negative headlines statistically get more clicks than positive news, which shapes what the media choose to highlight." }
    ],
    qcm: [
      {
        question: "Negativity bias refers to the fact that:",
        choix: [
          "Positive and negative events always carry the same psychological weight",
          "Negative information weighs more heavily on our judgment and memory than equivalent positive information",
          "We systematically forget bad news",
          "It only applies to professional relationships"
        ],
        bonne_reponse: 1,
        explication: "The imbalance of weight in favour of the negative is precisely the definition of the bias."
      },
      {
        question: "A customer remembers a single late delivery far more than the ten previous on-time deliveries. Which bias is most directly at work?",
        choix: [
          "Anchoring bias",
          "Negativity bias",
          "Loss aversion",
          "Halo effect"
        ],
        bonne_reponse: 1,
        explication: "Loss aversion concerns how we evaluate a financial or material gain/loss; here, it's the disproportionate weight of a negative experience in memory that's at play — that's negativity bias."
      }
    ],
    identification: {
      situation: "A teacher receives twenty end-of-year evaluations from students: nineteen are very positive, one is harsh. That evening, it's this single negative evaluation that keeps them up at night, while they barely reread the others.",
      reponses_acceptees: ["negativity bias"],
      indice: "Compare the number of positive and negative reviews to the attention each one actually gets."
    },
    sources: [
      { auteurs: "Rozin, P., & Royzman, E. B.", annee: 2001, titre: "Negativity bias, negativity dominance, and contagion", revue: "Personality and Social Psychology Review, 5(4), 296–320", type: "review article", lien: "https://doi.org/10.1207/S15327957PSPR0504_2" }
    ],
    biais_lies: ["heuristique-disponibilite", "effet-halo"]
  },

  // ───────────────────────── SOCIAL ─────────────────────────
  {
    id: "effet-halo",
    nom: "Halo effect",
    nom_anglais: "Halo effect",
    categorie: "social",
    difficulte: "easy",
    definition_courte: "The tendency to let an overall positive (or negative) impression of a person — often based on a single visible trait — influence our judgment of their other qualities, with no logical link between them.",
    definition_longue: "The brain seeks coherence: once a striking trait (beauty, presence, eloquence) creates a favourable impression, that impression \"bleeds\" into completely unrelated qualities, such as competence or honesty. It's a social judgment shortcut that avoids evaluating each quality separately — a time-saver, at the cost of accuracy. The effect also works in reverse (the \"horn effect\"): a single negative trait can make the whole person come across unfavourably.",
    exemples: [
      { titre: "Recruitment", texte: "A well-dressed candidate who is at ease speaking is perceived as more competent, regardless of the actual quality of their answers." },
      { titre: "Marketing", texte: "A charismatic spokesperson or an attractive packaging design boosts perceived trust in a product, without changing its actual quality at all." },
      { titre: "School life", texte: "A student who excels in maths is sometimes judged as more reliable or mature in completely unrelated areas, like sport or classroom behaviour." }
    ],
    qcm: [
      {
        question: "The halo effect consists of:",
        choix: [
          "Judging every quality of a person completely independently",
          "Letting a striking trait influence judgment of qualities that have no logical link to it",
          "Only trusting a person's qualifications",
          "Always favouring people we've known for a long time"
        ],
        bonne_reponse: 1,
        explication: "It's the contamination of judgment by an isolated trait, with no logical link, that characterises the halo effect."
      },
      {
        question: "How does the halo effect differ from authority bias?",
        choix: [
          "They are two names for the same phenomenon",
          "The halo effect starts from a perceived trait (looks, charisma) that bleeds into other qualities; authority bias starts from a hierarchical or institutional status that pushes towards obedience",
          "Authority bias only applies to children",
          "The halo effect only applies to objects, never to people"
        ],
        bonne_reponse: 1,
        explication: "The two social biases sometimes overlap (an authority figure can also benefit from a halo), but their starting mechanism differs: an isolated trait vs. a recognised status."
      }
    ],
    identification: {
      situation: "In an interview, Nadia is immediately won over by a candidate who is elegant, smiling and very much at ease talking about himself. She then rates him very highly on \"rigour\" and \"organisational skills\" — two qualities she never actually tested at any point during the interview.",
      reponses_acceptees: ["halo effect"],
      indice: "Look at what Nadia actually assessed, versus what she simply assumed."
    },
    sources: [
      { auteurs: "Thorndike, E. L.", annee: 1920, titre: "A constant error in psychological ratings", revue: "Journal of Applied Psychology, 4(1), 25–29", type: "founding study", lien: "https://doi.org/10.1037/h0071663" }
    ],
    biais_lies: ["biais-autorite", "biais-confirmation"]
  },
  {
    id: "biais-autorite",
    nom: "Authority bias",
    nom_anglais: "Authority bias",
    categorie: "social",
    difficulte: "intermediate",
    definition_courte: "The tendency to give more credibility to a statement, and to obey more readily, when it comes from a figure perceived as a legitimate authority — regardless of how valid the statement actually is.",
    definition_longue: "Faced with an authority figure (status, uniform, title, apparent expertise), we tend to lower our critical thinking and feel less personally responsible for our own choices, as if responsibility had been transferred to the authority itself. This mechanism has real social value: it allows efficient cooperation without having to double-check everything ourselves constantly. But it becomes dangerous when the authority is wrong, overstates its expertise, or deliberately pushes for an unjustified action — deference can then override personal judgment, even in morally troubling situations.",
    exemples: [
      { titre: "Healthcare", texte: "A patient follows a prescription without question, even when something seems inconsistent to them, simply because it comes from a doctor." },
      { titre: "Advertising", texte: "A person in a white coat recommending a cosmetic product in an advert increases viewers' trust, even without any real dermatological expertise." },
      { titre: "Workplace", texte: "An employee carries out an instruction they find questionable without objecting, simply because it comes from their management." }
    ],
    qcm: [
      {
        question: "Authority bias refers to:",
        choix: [
          "Always disobeying an authority figure on principle",
          "The tendency to give more credibility and obedience to a figure perceived as an authority, regardless of how valid their statement is",
          "A preference for decisions made as a group",
          "The ability to objectively evaluate a source of information"
        ],
        bonne_reponse: 1,
        explication: "The bias isn't about the content of the message, but about the perceived status of whoever states it."
      },
      {
        question: "What do Milgram's experiments on obedience to authority show?",
        choix: [
          "That most people refuse to obey an order they consider immoral",
          "That a majority of participants kept administering what they believed were painful electric shocks simply because an experimenter in a white coat asked them to",
          "That obedience depends solely on participants' level of education",
          "That authority has no measurable effect on behaviour"
        ],
        bonne_reponse: 1,
        explication: "Milgram's experiment (1963) showed that a majority of participants obeyed problematic orders from an authority figure, despite visible discomfort."
      }
    ],
    identification: {
      situation: "In a department, an employee receives an instruction from management that clearly seems to go against common sense. They carry it out anyway without comment, telling themselves that \"if they're asking for it, they must have a good reason\".",
      reponses_acceptees: ["authority bias"],
      indice: "Think about what stops the employee from questioning the instruction."
    },
    sources: [
      { auteurs: "Milgram, S.", annee: 1963, titre: "Behavioral study of obedience", revue: "Journal of Abnormal and Social Psychology, 67(4), 371–378", type: "founding study", lien: "https://doi.org/10.1037/h0040525" }
    ],
    biais_lies: ["effet-halo", "biais-confirmation"]
  },

  // ───────────────────────── DECISION ─────────────────────────
  {
    id: "biais-ancrage",
    nom: "Anchoring bias",
    nom_anglais: "Anchoring bias",
    categorie: "decision",
    difficulte: "easy",
    definition_courte: "The tendency to be disproportionately influenced by the first piece of information received (the \"anchor\"), even when we know it's arbitrary, when making an estimate or negotiating.",
    definition_longue: "Faced with an uncertain estimate, we don't start from zero: we adjust a number from the first available reference point, even if that reference point has objectively nothing to do with the correct answer. The adjustment that follows is generally insufficient, so the final estimate stays \"stuck\" close to the starting anchor. This mechanism works even when the person knows perfectly well that the anchor is arbitrary — the result of a random draw, for instance — which shows it isn't a conscious reasoning process but a genuine perceptual bias.",
    exemples: [
      { titre: "Negotiation", texte: "The first price mentioned in a negotiation keeps influencing what seems \"reasonable\" afterwards, even after seeing very different prices elsewhere." },
      { titre: "Sales", texte: "A crossed-out price (\"€199\" struck through, \"€99\" displayed) gives the impression of a good deal, even if €99 wasn't a particularly low price to begin with." },
      { titre: "Salary negotiation", texte: "The first salary range mentioned in an interview tends to frame the whole rest of the negotiation, in one direction or the other." }
    ],
    qcm: [
      {
        question: "Anchoring bias occurs when:",
        choix: [
          "The first piece of information received is completely ignored",
          "An estimate stays influenced by an initial reference number, even if that number is arbitrary",
          "Several experts are always consulted before deciding",
          "An announced price is never negotiated"
        ],
        bonne_reponse: 1,
        explication: "The anchor keeps weighing on the final judgment, even when we know it has no real informational value."
      },
      {
        question: "Why does anchoring work even when we know the first number was picked at random?",
        choix: [
          "Because it isn't a real bias, just a myth",
          "Because it's an automatic perceptual adjustment, not a conscious reasoning process that could simply be corrected by knowing about it",
          "Because people always trust random numbers",
          "Because anchoring only applies to professional negotiations"
        ],
        bonne_reponse: 1,
        explication: "Experiments have shown that even an anchor explicitly presented as random (for instance, drawn from a roulette wheel) still influences the estimate that follows."
      }
    ],
    identification: {
      situation: "Marc is negotiating the purchase of a used car. The seller first quotes a price of €18,000. Even after seeing similar models sold for €12,000 elsewhere, Marc negotiates around €15,000–16,000 — the first figure keeps shaping what feels \"reasonable\" to him.",
      reponses_acceptees: ["anchoring bias", "anchoring"],
      indice: "Think about what was said first in the negotiation."
    },
    sources: [
      { auteurs: "Tversky, A., & Kahneman, D.", annee: 1974, titre: "Judgment under uncertainty: Heuristics and biases", revue: "Science, 185(4157), 1124–1131", type: "founding study", lien: "https://doi.org/10.1126/science.185.4157.1124" }
    ],
    biais_lies: ["aversion-perte", "heuristique-disponibilite"]
  },
  {
    id: "aversion-perte",
    nom: "Loss aversion",
    nom_anglais: "Loss aversion",
    categorie: "decision",
    difficulte: "easy",
    definition_courte: "The tendency to feel the pain of a loss more intensely than the pleasure of an equivalent gain, which pushes us towards excessively cautious decisions just to avoid losing.",
    definition_longue: "For the same amount, losing €50 psychologically hurts more than gaining €50 feels good — studies estimate the gap at roughly a factor of 2. This imbalance drives choices that, on paper, are actually suboptimal: turning down a statistically favourable bet out of fear of losing, sticking with a failed decision rather than \"accepting\" the loss, or avoiding a beneficial change simply because it means giving up something already owned. This mechanism was formalised in prospect theory, which earned Daniel Kahneman the Nobel Prize in economics.",
    exemples: [
      { titre: "Stock market", texte: "An investor holds on to a sharply falling stock hoping it will recover, rather than accepting the loss and reinvesting elsewhere more wisely." },
      { titre: "Subscriptions", texte: "A free trial with the option to cancel converts more paying customers than an equivalent offer without a trial, because cancelling afterwards feels like a loss." },
      { titre: "Everyday life", texte: "Most people demand the chance to win far more than they could lose before accepting a simple coin-flip bet." }
    ],
    qcm: [
      {
        question: "Loss aversion means that:",
        choix: [
          "Gaining and losing the same amount produce emotions of equal intensity",
          "Losing an amount hurts psychologically more than gaining the same amount feels good",
          "We always prefer taking risks over playing it safe",
          "It only applies to financial decisions"
        ],
        bonne_reponse: 1,
        explication: "The asymmetry in how gains and equivalent losses feel is at the heart of the concept, formalised by prospect theory."
      },
      {
        question: "An investor refuses to sell a stock at a loss, convinced it will \"definitely bounce back\", even though nothing suggests it will. Which bias is most directly at play?",
        choix: [
          "Anchoring bias",
          "Loss aversion",
          "Halo effect",
          "Authority bias"
        ],
        bonne_reponse: 1,
        explication: "Refusing to accept a loss, even at the cost of a financially worse decision, is the signature of loss aversion."
      }
    ],
    identification: {
      situation: "A company invested in a piece of software that turns out, after six months, to be clearly unsuitable. Rather than switching tools as every internal report recommends, management prefers to keep using it and patch it up as best they can, so as not to \"lose\" the investment already made.",
      reponses_acceptees: ["loss aversion"],
      indice: "Compare what it would actually cost to keep going, versus what it would cost to switch tools."
    },
    sources: [
      { auteurs: "Kahneman, D., & Tversky, A.", annee: 1979, titre: "Prospect theory: An analysis of decision under risk", revue: "Econometrica, 47(2), 263–291", type: "founding study", lien: "https://doi.org/10.2307/1914185" }
    ],
    biais_lies: ["biais-ancrage", "effet-dunning-kruger"]
  },

  // ───────────────────────── OVERCONFIDENCE ─────────────────────────
  {
    id: "effet-dunning-kruger",
    nom: "Dunning-Kruger effect",
    nom_anglais: "Dunning-Kruger effect",
    categorie: "confiance",
    difficulte: "intermediate",
    definition_courte: "The tendency for people who are least competent in a domain to overestimate their competence, because they lack the knowledge needed to correctly assess their own shortcomings.",
    definition_longue: "To correctly judge one's own level of competence in a domain, one must already have a minimum grasp of it — otherwise one doesn't even have the reference points needed to spot one's own mistakes. It's this paradox that leads the least knowledgeable beginners to feel competent: they simply don't know what they don't know. Conversely, genuinely competent people often tend to underestimate their level, because they perceive the real difficulty of the domain more clearly and wrongly assume that others master these subtleties just as well as they do.",
    exemples: [
      { titre: "Learning", texte: "After watching a few online videos, someone may feel able to handle a complex electrical installation, without grasping the extent of what they still don't know." },
      { titre: "Public debate", texte: "On a complex scientific topic, the most confident and outspoken opinions sometimes come from people who have read very little, unlike specialists who tend to be more cautious in how they phrase things." },
      { titre: "Workplace", texte: "A very self-assured new employee may underestimate how complex a role really is, while a more experienced colleague tends to stress the difficulties and nuances instead." }
    ],
    qcm: [
      {
        question: "The Dunning-Kruger effect describes:",
        choix: [
          "The fact that everyone systematically overestimates their skills, regardless of their level",
          "The fact that people who are least competent in a domain often lack the reference points needed to correctly assess their own shortcomings",
          "The fact that experts are always perfectly aware of their level",
          "A phenomenon that only applies to IQ tests"
        ],
        bonne_reponse: 1,
        explication: "The core of the phenomenon is being unable to assess one's own incompetence, for lack of the knowledge needed to self-evaluate correctly."
      },
      {
        question: "How do genuinely competent people generally behave, according to Kruger and Dunning's study?",
        choix: [
          "They systematically overestimate their level, just like beginners",
          "They tend to slightly underestimate their relative competence, because they perceive the difficulty of the domain more clearly",
          "They refuse to self-assess",
          "They statistically have no awareness of their own level at all"
        ],
        bonne_reponse: 1,
        explication: "The original study shows an asymmetry: the least competent clearly overestimate their level, while the most competent tend to slightly underestimate theirs instead."
      }
    ],
    identification: {
      situation: "After a two-day introductory course, Jonas presents himself as able to single-handedly manage a complex project in that field, and confidently dismisses the remarks of a colleague who has practised that trade for fifteen years.",
      reponses_acceptees: ["dunning kruger effect", "dunning-kruger effect"],
      indice: "Compare how long Jonas trained for to how confidently he speaks."
    },
    sources: [
      { auteurs: "Kruger, J., & Dunning, D.", annee: 1999, titre: "Unskilled and unaware of it: How difficulties in recognizing one's own incompetence lead to inflated self-assessments", revue: "Journal of Personality and Social Psychology, 77(6), 1121–1134", type: "founding study", lien: "https://doi.org/10.1037/0022-3514.77.6.1121" }
    ],
    biais_lies: ["biais-retrospectif", "biais-optimisme"]
  },

  // ───────────────────────── TIME & PROBABILITY ─────────────────────────
  {
    id: "biais-optimisme",
    nom: "Optimism bias",
    nom_anglais: "Optimism bias",
    categorie: "temps",
    difficulte: "easy",
    definition_courte: "The tendency to underestimate one's own probability of experiencing negative events, and to overestimate that of experiencing positive ones, compared with other people.",
    definition_longue: "Faced with a well-established statistical risk (accident, illness, failure), most people estimate that this risk applies to them less than to the average person — a statistically impossible line of reasoning if everyone holds it at once. This bias protects self-esteem and reduces anxiety about the future, which partly explains why it persists even in people who are otherwise well informed about the relevant statistics. The downside is that it reduces genuine precaution-taking: why guard against a risk we wrongly believe is less likely for us than for others?",
    exemples: [
      { titre: "Smoking", texte: "A smoker who is well informed about lung cancer risks often estimates their own chances of being affected as lower than those of the average smoker." },
      { titre: "Driving", texte: "The vast majority of drivers rate themselves as more careful and less likely to have an accident than the average driver." },
      { titre: "Project management", texte: "When planning a project, people systematically underestimate the risk of delay that applies to them personally, even while knowing how often similar projects run late." }
    ],
    qcm: [
      {
        question: "Optimism bias refers to:",
        choix: [
          "Always expecting the worst to avoid disappointment",
          "Underestimating one's own probability of experiencing a negative event, compared with the probability attributed to others",
          "Completely ignoring risk statistics",
          "Feeling more vulnerable than the average person"
        ],
        bonne_reponse: 1,
        explication: "The bias specifically concerns the gap between the risk we assign to ourselves and the risk we assign to others, in an identical situation."
      },
      {
        question: "Why does optimism bias persist even among people who are well informed about the real risks?",
        choix: [
          "Because they don't know the statistics",
          "Because it protects self-esteem and reduces anxiety about the future, regardless of how well-informed someone is",
          "Because this bias doesn't exist among informed people",
          "Because statistics keep changing constantly"
        ],
        bonne_reponse: 1,
        explication: "The gap isn't an information problem but a psychological self-protection mechanism, which is why it resists simply knowing the numbers."
      }
    ],
    identification: {
      situation: "Even though he knows the statistics on smoking risks perfectly well, Julien keeps thinking \"it only happens to other people\" and that he'll easily be able to quit the day he really decides to, unlike most smokers around him.",
      reponses_acceptees: ["optimism bias"],
      indice: "Compare what Julien knows about the statistics to what he thinks about his own case."
    },
    sources: [
      { auteurs: "Weinstein, N. D.", annee: 1980, titre: "Unrealistic optimism about future life events", revue: "Journal of Personality and Social Psychology, 39(5), 806–820", type: "founding study", lien: "https://doi.org/10.1037/0022-3514.39.5.806" }
    ],
    biais_lies: ["effet-dunning-kruger", "biais-ancrage"]
  }
];
