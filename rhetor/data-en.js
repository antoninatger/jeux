// Rhetor — content (categories + rhetorical tools) — English mirror of data.js
// Every source was verified (author, date, work) before being included.

const CATEGORIES = [
  {
    id: "figures",
    nom: "Figures of speech",
    nomLong: "Figures of speech and devices of expression",
    classe: "c-figures",
    couleur: "#C9932E",
    description: "How the shape of a sentence — repetition, imagery, symmetry — works on the mind before its content even registers."
  },
  {
    id: "sophismes",
    nom: "Fallacies",
    nomLong: "Fallacies and flawed reasoning",
    classe: "c-sophismes",
    couleur: "#A6303D",
    description: "How a piece of reasoning can look valid while being, underneath, misleading or invalid."
  },
  {
    id: "lexique",
    nom: "Vocabulary",
    nomLong: "Foundational vocabulary of argumentation",
    classe: "c-lexique",
    couleur: "#2F6F76",
    description: "The basic concepts for naming precisely what you observe in a piece of discourse."
  }
];

const OUTILS = [
  // ───────────────────────── FIGURES OF SPEECH ─────────────────────────
  {
    id: "metaphore",
    nom: "Metaphor",
    origine: "From the Greek metaphora, \"transfer, carrying across\"",
    categorie: "figures",
    difficulte: "easy",
    definition_courte: "A figure of speech that names one thing with a word that normally names another, based on a resemblance, without a comparison word (\"like\", \"as\").",
    definition_longue: "A metaphor carries the meaning of a word into another domain by relying on an implicit common point: calling a person \"a rock\" doesn't compare explicitly, it directly equates, forcing the mind to reconstruct the link of resemblance itself (here, solidity, unshakeability). This economy — naming one thing by calling it another — makes the message denser and more memorable than a literal description, because it engages the imagination rather than logic alone. Aristotle already considered it the greatest quality of style, the one skill that cannot be learned from someone else, since it requires perceiving resemblances oneself. It is so pervasive in everyday language that it becomes invisible (\"the leg of the table\", \"grasping an idea\").",
    exemples: [
      { titre: "Politics", texte: "\"This bill is a wall against injustice\" directly equates the law with a protective wall, never saying \"like a wall\"." },
      { titre: "Everyday language", texte: "\"He devoured his opponent\" frames a debate as a meal, transferring the idea of total, physical domination." },
      { titre: "Advertising", texte: "\"This cream is a second skin\" suggests perfect adherence and naturalness, without literally claiming it." }
    ],
    qcm: [
      {
        question: "What distinguishes a metaphor from a simile?",
        choix: [
          "A metaphor uses a comparison word like \"like\" or \"as\"",
          "A metaphor directly equates two things, without a comparison word",
          "A metaphor only applies to people",
          "There is no difference between the two"
        ],
        bonne_reponse: 1,
        explication: "A simile links two things with a word such as \"like\"; a metaphor fuses them directly, without that explicit link."
      },
      {
        question: "\"This company is a ship taking on water\" is an example of:",
        choix: ["Litotes", "Metaphor", "Chiasmus", "Syllogism"],
        bonne_reponse: 1,
        explication: "The company is directly equated with a sinking ship, with no explicit comparison: that's a metaphor."
      },
      {
        question: "Why is a metaphor often more persuasive than a literal description?",
        choix: [
          "Because it's always shorter",
          "Because it engages the imagination and imposes a mental image rather than a plain logical argument",
          "Because it's easier to translate",
          "Because it avoids all ambiguity"
        ],
        bonne_reponse: 1,
        explication: "By forcing the mind to reconstruct the link of resemblance, the metaphor engages the imagination, which strengthens memorability and assent."
      }
    ],
    identification: {
      situation: "In her speech, the candidate declares: \"Our economy is a garden left to run wild: it's time to weed it, replant it, and finally harvest it.\" She never explicitly says she's comparing the economy to a garden — she simply treats it as one, from the start of the sentence to the end.",
      reponses_acceptees: ["metaphor"],
      indice: "Look for a comparison word (\"like\", \"as\") — you won't find one, even though the image runs through the whole sentence."
    },
    sources: [
      { auteurs: "Aristotle", annee: "c. 350 BCE", titre: "Poetics and Rhetoric (treatment of metaphor)", revue: "Aristotelian corpus", type: "founding text" },
      { auteurs: "Fontanier, P.", annee: 1968, titre: "Les Figures du discours [Figures of Discourse] (reissue, pref. G. Genette)", revue: "Flammarion", type: "reference work" }
    ],
    outils_lies: ["chiasme", "triade-ethos-pathos-logos"]
  },
  {
    id: "anaphore",
    nom: "Anaphora",
    origine: "From the Greek anaphora, \"a carrying back, repetition\"",
    categorie: "figures",
    difficulte: "easy",
    definition_courte: "A figure of speech that repeats the same word or phrase at the start of several successive sentences, clauses or lines, to create an effect of rhythm and insistence.",
    definition_longue: "By systematically repeating the same opening, anaphora builds a sonic architecture that guides listening: each repetition renews attention and sets up a variation, which makes the whole easier to follow and remember than a string of ideas with no apparent link. This hammering also creates a cumulative effect that can make an argument feel stronger than it is in isolation — the force doesn't come from new content at each repetition, but from the rhythm itself, which installs a form of conviction before the content has even been weighed. It's one of the most heavily used tools in political and advertising rhetoric, precisely because its effect doesn't depend on the logical quality of the argument.",
    exemples: [
      { titre: "Political speech", texte: "\"We shall fight on the beaches, we shall fight on the landing grounds, we shall fight in the fields and in the streets\" (Churchill, 1940) repeats \"we shall fight\" to install unshakeable resolve." },
      { titre: "Advertising", texte: "\"A car for the city. A car for the road. A car for life.\" repeats \"a car for\" to make a single product feel universally suited." },
      { titre: "Song lyrics", texte: "Repeating \"I remember\" at the start of every verse sets a nostalgic tone before the content of each memory is even stated." }
    ],
    qcm: [
      {
        question: "Anaphora consists of:",
        choix: [
          "Repeating a word or phrase at the end of a sentence",
          "Repeating a word or phrase at the start of successive sentences or clauses",
          "Using one word in place of another based on resemblance",
          "Asking a question with no answer expected"
        ],
        bonne_reponse: 1,
        explication: "It is repetition in the initial position, across several successive units, that defines anaphora."
      },
      {
        question: "Why can anaphora make an argument more persuasive without making it logically stronger?",
        choix: [
          "Because it systematically adds new evidence with each repetition",
          "Because the rhythm and accumulation create a sense of strength independent of the actual content",
          "Because it always shortens the message",
          "Because it is reserved for written texts"
        ],
        bonne_reponse: 1,
        explication: "The persuasive effect comes from the rhythmic form, not from any additional information supplied at each repetition."
      },
      {
        question: "How does anaphora differ from metaphor?",
        choix: [
          "They are two names for the same device",
          "Anaphora relies on repeating a structure; metaphor relies on equating two ideas",
          "Metaphor is a spoken-only device",
          "Anaphora is only used in poetry"
        ],
        bonne_reponse: 1,
        explication: "Anaphora is a device of rhythmic repetition; metaphor is a device of meaning substitution. They can combine, but rest on different mechanisms."
      }
    ],
    identification: {
      situation: "In his launch speech, the CEO repeats: \"This year, we invest. This year, we hire. This year, we win.\" None of these three sentences offers a single figure — yet the audience leaves the talk convinced the company is booming.",
      reponses_acceptees: ["anaphora"],
      indice: "Look at what's repeated at the very start of each sentence."
    },
    sources: [
      { auteurs: "Quintilian", annee: "c. 95 CE", titre: "Institutio Oratoria [The Orator's Education] (book IX, figures of repetition)", revue: "Roman treatise on rhetoric", type: "founding text" },
      { auteurs: "Fontanier, P.", annee: 1968, titre: "Les Figures du discours [Figures of Discourse] (reissue, pref. G. Genette)", revue: "Flammarion", type: "reference work" }
    ],
    outils_lies: ["metaphore", "triade-ethos-pathos-logos"]
  },
  {
    id: "litote",
    nom: "Litotes",
    origine: "From the Greek litotēs, \"plainness, simplicity\"",
    categorie: "figures",
    difficulte: "intermediate",
    definition_courte: "A figure of speech that says less to suggest more, often through a negation of the opposite of what is meant.",
    definition_longue: "Litotes apparently softens an expression to, paradoxically, strengthen the idea actually intended: saying \"it's not bad\" to mean \"it's excellent\" leaves the listener to supply the intensity of the judgment themselves, which makes the statement harder to challenge head-on than a direct claim would be. Unlike a euphemism, which softens an unpleasant reality, litotes keeps the strong idea intact but routes it through a negative or minimising detour — a device common in negotiation and diplomacy, where stating something too directly invites contradiction. English conversational and literary style leans on understatement for exactly this effect: calling a magnificent view \"not unpleasant\" forces the listener to supply the missing intensity themselves.",
    exemples: [
      { titre: "Diplomacy", texte: "\"We are not entirely satisfied with this agreement\" signals, in diplomatic register, sharp disagreement — without ever stating it head-on." },
      { titre: "Everyday life", texte: "\"That's not cheap\" to describe a very high price softens the judgment while still making it perfectly clear." },
      { titre: "Literary understatement", texte: "Describing a devastating defeat as \"not our finest hour\" admits to the disaster without ever naming it outright." }
    ],
    qcm: [
      {
        question: "Litotes consists of:",
        choix: [
          "Exaggerating a reality to make it spectacular",
          "Saying less to suggest more, often through negating the opposite",
          "Repeating a word at the start of a sentence",
          "Asking a question with an obvious answer"
        ],
        bonne_reponse: 1,
        explication: "It's the apparent understatement — saying less — that paradoxically strengthens the real idea: that's the definition of litotes."
      },
      {
        question: "What is the difference between litotes and euphemism?",
        choix: [
          "They are two names for the same device",
          "Litotes softens the form while keeping the intensity of the underlying idea; euphemism softens a reality judged too harsh to state directly",
          "Euphemism is only used in speech",
          "Litotes is always an exaggeration"
        ],
        bonne_reponse: 1,
        explication: "Litotes says less to make a point land harder; euphemism says it differently to soften an unpleasant underlying reality (\"passed away\" for \"died\")."
      },
      {
        question: "A recruiter writes: \"This candidate's file is not uninteresting.\" What effect is intended?",
        choix: [
          "To fully discourage the candidate",
          "To suggest, via litotes, real interest without committing fully",
          "To indirectly insult the candidate",
          "No particular effect"
        ],
        bonne_reponse: 1,
        explication: "The softened double negative (\"not uninteresting\") implies genuine interest, while keeping the cautious distance typical of professional register."
      }
    ],
    identification: {
      situation: "After reading the report, the director simply says: \"This wasn't our best quarter.\" No one in the room is fooled: the numbers are bad, but she never once used the word \"failure\".",
      reponses_acceptees: ["litotes"],
      indice: "Look at what she isn't saying directly, and compare it with what everyone understands anyway."
    },
    sources: [
      { auteurs: "Fontanier, P.", annee: 1968, titre: "Les Figures du discours [Figures of Discourse] (reissue, pref. G. Genette)", revue: "Flammarion", type: "reference work" }
    ],
    outils_lies: ["metaphore", "chiasme"]
  },
  {
    id: "chiasme",
    nom: "Chiasmus",
    origine: "From the Greek khiasmos, after the letter chi (Χ), for its cross-shaped layout",
    categorie: "figures",
    difficulte: "intermediate",
    definition_courte: "A figure of speech that arranges two pairs of terms in mirror image (A-B then B-A), creating an effect of inverted symmetry.",
    definition_longue: "Chiasmus lays a sentence out in a cross: the elements appear in order A then B, then are repeated in reverse order B then A, which creates a sense of closure that lodges durably in memory — it's one of the most quoted structures in political history (\"Ask not what your country can do for you — ask what you can do for your country\", Kennedy, 1961, inverts \"country\"/\"you\" then \"you\"/\"country\"). This symmetry gives an impression of great rhetorical mastery and near-geometric truth, even though it proves nothing more than an ordinarily constructed sentence would — the effect rests entirely on the sentence's architecture, not on the strength of the argument it carries.",
    exemples: [
      { titre: "Political speech", texte: "\"Ask not what your country can do for you — ask what you can do for your country\" (J.F. Kennedy, 1961) inverts exactly the same two terms." },
      { titre: "Maxim", texte: "\"Eat to live, not live to eat\" inverts \"eat\"/\"live\" to oppose two hierarchies of value." },
      { titre: "Slogan", texte: "\"It's not the size of the dog in the fight, it's the size of the fight in the dog\" builds the same cross-shaped symmetry to flip the perspective." }
    ],
    qcm: [
      {
        question: "Chiasmus is recognisable by:",
        choix: [
          "The repetition of the same word at the start of a sentence",
          "A mirror-image arrangement of two pairs of terms (A-B then B-A)",
          "A negation that suggests the opposite of what it states",
          "A question with no expected answer"
        ],
        bonne_reponse: 1,
        explication: "It's the symmetrical, cross-shaped inversion of terms that defines chiasmus."
      },
      {
        question: "Why is chiasmus often perceived as a strong argument, even though it adds no new proof?",
        choix: [
          "Because it's always accompanied by statistics",
          "Because its symmetry gives an impression of mastery and near-geometric truth, independent of the content",
          "Because it can only be used in mathematics",
          "Because it always repeats the same figures"
        ],
        bonne_reponse: 1,
        explication: "The effect of chiasmus rests on its structure — the symmetrical architecture of the sentence — not on the logical soundness of what it claims."
      },
      {
        question: "What is the difference between chiasmus and anaphora?",
        choix: [
          "None, they are two names for the same device",
          "Anaphora repeats the same element at the head of several sentences; chiasmus inverts two pairs of terms in mirror image",
          "Chiasmus only applies in writing",
          "Anaphora is always longer than chiasmus"
        ],
        bonne_reponse: 1,
        explication: "Anaphora repeats; chiasmus inverts. Two different sentence-building mechanics, both used to lodge in memory."
      }
    ],
    identification: {
      situation: "A trainer closes their workshop with: \"You don't learn to decide by avoiding mistakes, you learn to avoid mistakes by deciding.\" The room mostly remembers this one line, even though it adds nothing to the examples already given during the workshop.",
      reponses_acceptees: ["chiasmus"],
      indice: "Spot the same two words, and look at the order they appear in the first time, then the second."
    },
    sources: [
      { auteurs: "Quintilian", annee: "c. 95 CE", titre: "Institutio Oratoria [The Orator's Education] (figures of symmetrical construction)", revue: "Roman treatise on rhetoric", type: "founding text" },
      { auteurs: "Fontanier, P.", annee: 1968, titre: "Les Figures du discours [Figures of Discourse] (reissue, pref. G. Genette)", revue: "Flammarion", type: "reference work" }
    ],
    outils_lies: ["anaphore", "metaphore"]
  },

  // ───────────────────────── FALLACIES ─────────────────────────
  {
    id: "ad-hominem",
    nom: "Ad hominem",
    origine: "Latin phrase, literally \"[directed] at the person\"",
    categorie: "sophismes",
    difficulte: "easy",
    definition_courte: "A fallacy that attacks the person making an argument — their credibility, character, or motives — instead of addressing the argument itself.",
    definition_longue: "An ad hominem argument shifts the debate: instead of examining whether a claim is true or false, it seeks to discredit whoever made it, hoping the audience will reject the argument by association. The move works because it exploits a natural shortcut — we more readily trust a source we judge credible — but it is logically invalid: the worth of an argument doesn't depend on the character of the person stating it (a liar can state a mathematical truth; a saint can make an arithmetic mistake). Not every personal remark is a strict ad hominem fallacy: legitimately questioning an expert's competence on the precise topic they're discussing can be relevant — the fallacy appears when the personal attack completely replaces engagement with the argument, never returning to it.",
    exemples: [
      { titre: "Political debate", texte: "\"How can we trust his economic proposals, he's gone bankrupt twice himself\" dismisses the argument without ever examining its content." },
      { titre: "Social media", texte: "\"He criticises this government but he's never voted, so his opinion doesn't count\" dismisses a critique based on its author's biography, not its content." },
      { titre: "Scientific debate", texte: "\"This climate study is worthless, its author is funded by an NGO\" ignores the study's methodology to focus on who funded its author." }
    ],
    qcm: [
      {
        question: "The ad hominem fallacy consists of:",
        choix: [
          "Demonstrating that an argument is false using facts",
          "Attacking the person making an argument rather than the argument itself",
          "Repeating an argument until it is accepted",
          "Offering a choice limited to two options"
        ],
        bonne_reponse: 1,
        explication: "It is the shift of the discussion, from the argument to the person, that defines ad hominem."
      },
      {
        question: "Why is an ad hominem argument logically invalid?",
        choix: [
          "Because it is always factually false",
          "Because the truth or falsity of an argument doesn't depend on the character of the person stating it",
          "Because it can only be used verbally",
          "Because it only exists in politics"
        ],
        bonne_reponse: 1,
        explication: "An argument can be true even when stated by an unsavoury person — logical validity is independent of the source."
      },
      {
        question: "In which case is a remark about the person NOT an ad hominem fallacy?",
        choix: [
          "When it entirely replaces examination of the argument",
          "When it legitimately questions the author's competence on the precise topic at hand, without ruling out engaging with the argument itself",
          "Never, any mention of the person is a fallacy",
          "Only if it is phrased politely"
        ],
        bonne_reponse: 1,
        explication: "Questioning relevant competence can be legitimate; the fallacy appears when that remark substitutes entirely for discussing the argument."
      }
    ],
    identification: {
      situation: "In a meeting, someone proposes revisiting the marketing budget. A colleague replies: \"Easy for you to say, you've always had the biggest budget on the team.\" The proposed budget is never discussed on its merits.",
      reponses_acceptees: ["ad hominem", "ad hominem argument", "personal attack"],
      indice: "Check whether the reply addresses the proposed budget, or the person who proposed it."
    },
    sources: [
      { auteurs: "Locke, J.", annee: 1690, titre: "An Essay Concerning Human Understanding (book IV, ch. XVII)", revue: "Classic philosophical treatise", type: "founding text" },
      { auteurs: "Walton, D.", annee: 1998, titre: "Ad Hominem Arguments", revue: "University of Alabama Press", type: "reference work" }
    ],
    outils_lies: ["homme-de-paille", "faux-dilemme"]
  },
  {
    id: "pente-glissante",
    nom: "Slippery slope",
    origine: "From the physical image of a slope one cannot stop sliding down once one has stepped onto it",
    categorie: "sophismes",
    difficulte: "intermediate",
    definition_courte: "A fallacy that claims a first action will inevitably lead, through a chain of consequences, to an extreme and undesirable outcome — without demonstrating that this chain is actually necessary.",
    definition_longue: "The slippery slope argument builds a causal chain between a harmless first step and a catastrophic conclusion, acting as though each link automatically follows from the one before. The problem isn't the idea that an action can have cascading consequences — that genuinely happens — but the lack of any demonstration that this cascade is likely or inevitable: the fallacy replaces a real assessment of probability with a rhetorical chain that only sounds logical. Some slippery-slope reasoning is legitimate, when each step is actually substantiated; the fallacy appears when the intermediate steps are merely asserted, never demonstrated.",
    exemples: [
      { titre: "Public debate", texte: "\"If we allow this one exception, tomorrow everyone will demand one, and the whole system will collapse\" jumps from \"one exception\" to \"system collapse\" without spelling out any intermediate step." },
      { titre: "Education", texte: "\"If we allow phones in class, students will stop listening to anything, and academic standards will collapse\" chains several undemonstrated consequences as if they were automatic." },
      { titre: "Workplace", texte: "\"If we allow one day of remote work a week, nobody will ever come to the office again, and the company will lose its culture\" presents an extreme consequence as the logical, inevitable outcome of a minor change." }
    ],
    qcm: [
      {
        question: "The slippery slope argument consists of:",
        choix: [
          "Demonstrating step by step that a consequence is likely",
          "Claiming a first action will inevitably lead to an extreme consequence, without demonstrating the chain",
          "Attacking the person proposing the action",
          "Offering a choice limited to two extreme options"
        ],
        bonne_reponse: 1,
        explication: "The fallacy lies in the lack of demonstration for each step of the chain, not in the idea of cascading consequences itself."
      },
      {
        question: "Can a slippery-slope argument be legitimate?",
        choix: [
          "No, never, it's always a fallacy",
          "Yes, if each step of the chain is actually demonstrated and likely, not merely asserted",
          "Yes, but only in the exact sciences",
          "No, because it's always a personal attack"
        ],
        bonne_reponse: 1,
        explication: "Slippery slope becomes a fallacy when the intermediate steps are unsupported assertions; a genuinely demonstrated chain isn't fallacious."
      },
      {
        question: "\"If we push this meeting back an hour, nobody will ever respect schedules again, and the whole organisation will fall apart\" is an example of:",
        choix: ["Ad hominem", "Slippery slope", "Chiasmus", "Litotes"],
        bonne_reponse: 1,
        explication: "The chain runs from a minor fact (pushing back a meeting) to an extreme consequence (the organisation falling apart) without demonstrating a single intermediate step."
      }
    ],
    identification: {
      situation: "Faced with a proposal to allow sneakers on Fridays, an HR manager objects: \"Sneakers today, jogging pants tomorrow, and the day after nobody will dress properly at all, and our image will suffer with every one of our clients.\"",
      reponses_acceptees: ["slippery slope", "slippery slope argument", "slippery slope fallacy"],
      indice: "Count the number of steps between the starting point and the catastrophic conclusion — and ask whether each one is demonstrated."
    },
    sources: [
      { auteurs: "Walton, D.", annee: 1992, titre: "Slippery Slope Arguments", revue: "Oxford University Press", type: "reference work" }
    ],
    outils_lies: ["faux-dilemme", "homme-de-paille"]
  },
  {
    id: "homme-de-paille",
    nom: "Straw man",
    origine: "From the image of a straw dummy, easier to knock down than a real opponent",
    categorie: "sophismes",
    difficulte: "intermediate",
    definition_courte: "A fallacy that distorts, oversimplifies or exaggerates an opponent's position to make it easier to attack, then refutes that distorted version as if it were the real argument.",
    definition_longue: "The device is named after a dummy made of straw: it's far easier to \"defeat\" a weakened, caricatured version of an argument than to engage with its real, strongest form. A straw man gives the illusion of having refuted a position, when in fact only a caricature of it was refuted — which proves nothing against the argument the person actually held. Recent academic work distinguishes several forms: outright distortion of the argument, but also responding only to its weakest version among several possible formulations, while ignoring the stronger ones.",
    exemples: [
      { titre: "Public debate", texte: "To someone proposing better regulation of an industry, the reply comes: \"So you want to ban everything and destroy the economy?\" — something nobody proposed." },
      { titre: "Relationships", texte: "\"You're saying you want us to go out more often? So you're saying I never do anything right at home?\" inflates a specific remark into a sweeping accusation." },
      { titre: "Scientific debate", texte: "Reducing a nuanced theory to its most simplistic version to ridicule it more easily, without ever engaging with the actual version defended by specialists in the field." }
    ],
    qcm: [
      {
        question: "The straw man fallacy consists of:",
        choix: [
          "Faithfully responding to the opponent's strongest argument",
          "Distorting or oversimplifying an opponent's position to refute it more easily",
          "Attacking the opponent's personal credibility",
          "Claiming an action will lead to a catastrophe"
        ],
        bonne_reponse: 1,
        explication: "It is the distortion of the real argument into a caricatured, easier-to-attack version that defines the straw man."
      },
      {
        question: "Why does refuting a straw man prove nothing against the opponent's real argument?",
        choix: [
          "Because the refuted version isn't the one the opponent actually held",
          "Because a straw man is always true",
          "Because the opponent constantly changes their mind",
          "Because it's a personal attack rather than an argument"
        ],
        bonne_reponse: 0,
        explication: "Defeating a caricature says nothing about the strength of the position actually held — the victory is illusory."
      },
      {
        question: "How does straw man differ from ad hominem?",
        choix: [
          "They are two names for the same fallacy",
          "Straw man distorts the opponent's argument; ad hominem attacks the person instead of the argument",
          "Ad hominem is only used in writing",
          "Straw man is always more polite than ad hominem"
        ],
        bonne_reponse: 1,
        explication: "Both avoid engaging with the real argument, but by different routes: distorting the content vs. attacking the source."
      }
    ],
    identification: {
      situation: "An employee suggests allowing two days of remote work per week. Their manager replies in a meeting: \"So you're saying nobody should ever come to the office again?\" — even though the employee never mentioned eliminating office presence entirely.",
      reponses_acceptees: ["straw man", "straw man argument", "straw man fallacy"],
      indice: "Compare what the employee actually proposed with what the manager is putting in their mouth."
    },
    sources: [
      { auteurs: "Talisse, R., & Aikin, S. F.", annee: 2006, titre: "Two Forms of the Straw Man", revue: "Argumentation, 20(3), 345–352", type: "reference work", lien: "https://doi.org/10.1007/s10503-006-9017-8" }
    ],
    outils_lies: ["ad-hominem", "faux-dilemme"]
  },
  {
    id: "faux-dilemme",
    nom: "False dilemma",
    origine: "Also called \"false dichotomy\"; from the Greek dilēmma, \"double proposition\"",
    categorie: "sophismes",
    difficulte: "easy",
    definition_courte: "A fallacy that presents a situation as offering only two possible options, usually extreme ones, when other options actually exist.",
    definition_longue: "A false dilemma forces a choice between two outcomes presented as exhaustive and mutually exclusive (\"it's either this or that\"), when in reality a range of intermediate or alternative positions exists. This framing is rhetorically effective because it removes an option from the listener before they've even had a chance to consider it: by accepting the terms of the dilemma, you've already lost the part of the discussion that concerned how many options were actually available. Not every two-option choice is a false dilemma — some situations really are binary — the fallacy appears when real options are hidden to artificially simplify the choice.",
    exemples: [
      { titre: "Political debate", texte: "\"Either you're with us, or you're against us\" eliminates any nuanced or conditional position." },
      { titre: "Workplace", texte: "\"Either we lay people off, or the company sinks\" ignores other possible levers (cost-cutting, new markets, partial restructuring)." },
      { titre: "Everyday life", texte: "\"If you don't back me up on this, it means you're against me\" leaves no room for a one-off disagreement without a full-blown rift." }
    ],
    qcm: [
      {
        question: "A false dilemma consists of:",
        choix: [
          "Presenting a situation as offering only two options, hiding the alternatives that actually exist",
          "Repeating an argument until it is accepted",
          "Attacking the credibility of the person speaking",
          "Distorting an opponent's position"
        ],
        bonne_reponse: 0,
        explication: "It is the artificial reduction of the number of available options that defines a false dilemma."
      },
      {
        question: "Is every two-option choice a false dilemma?",
        choix: [
          "Yes, always",
          "No: some situations really are binary; the fallacy only appears when real options are hidden",
          "No, a false dilemma always involves more than two options",
          "Yes, because no situation is ever truly binary"
        ],
        bonne_reponse: 1,
        explication: "A false dilemma is a fallacy only when real alternatives exist and are concealed — not when the choice is genuinely binary."
      },
      {
        question: "\"Either we adopt this reform exactly as written, or we change nothing at all\" is an example of:",
        choix: ["Straw man", "False dilemma", "Anaphora", "Ad hominem"],
        bonne_reponse: 1,
        explication: "This sentence hides any possibility of a partial or amended reform, artificially narrowing the choice to two extremes."
      }
    ],
    identification: {
      situation: "In a staff meeting, a teacher declares: \"Either you accept this pop quiz, or you accept that you won't learn anything seriously this year.\" No other method of assessment is even mentioned.",
      reponses_acceptees: ["false dilemma", "false dichotomy"],
      indice: "Actually count the options that exist, beyond the two you're being offered."
    },
    sources: [
      { auteurs: "Hamblin, C. L.", annee: 1970, titre: "Fallacies", revue: "Methuen", type: "reference work" }
    ],
    outils_lies: ["pente-glissante", "homme-de-paille"]
  },

  // ───────────────────────── VOCABULARY ─────────────────────────
  {
    id: "triade-ethos-pathos-logos",
    nom: "The ethos, pathos, logos triad",
    origine: "From the Greek ēthos (character), pathos (emotion) and logos (reason, speech)",
    categorie: "lexique",
    difficulte: "intermediate",
    definition_courte: "The three means of persuasion identified by Aristotle: convincing through the speaker's credibility (ethos), through the emotion stirred in the audience (pathos), or through the soundness of the reasoning (logos).",
    definition_longue: "Aristotle distinguishes three levers, usable separately or together, to win an audience's assent: ethos rests on the perceived credibility of the speaker (their expertise, apparent honesty, authority); pathos rests on the emotion they manage to stir (fear, indignation, hope, compassion); logos rests on logical coherence and the evidence offered in support of the claim. An effective speech generally mobilises all three to varying degrees — a perfectly logical argument delivered by a speaker perceived as dishonest rarely convinces, just as a purely emotional speech with no factual content eventually rings hollow. More than two thousand years after it was formulated, this triad remains the reference framework for analysing any persuasive discourse, from courtroom pleading to contemporary advertising.",
    exemples: [
      { titre: "Ethos", texte: "A doctor who opens by mentioning twenty years of clinical experience establishes credibility before even stating their argument." },
      { titre: "Pathos", texte: "A charity that shows one child's personal story rather than aggregate statistics is banking on emotion to trigger a donation." },
      { titre: "Logos", texte: "A report that lines up figures, methodology and international comparisons to justify a public policy relies mainly on logos." }
    ],
    qcm: [
      {
        question: "What does pathos refer to in Aristotle's rhetorical triad?",
        choix: ["The speaker's credibility", "The emotion stirred in the audience", "The logical soundness of the argument", "The length of the speech"],
        bonne_reponse: 1,
        explication: "Pathos corresponds to persuasion through emotion, distinct from ethos (credibility) and logos (reasoning)."
      },
      {
        question: "Why can a purely logical speech fail to convince despite solid arguments?",
        choix: [
          "Because logos alone never convinces anyone",
          "Because if the speaker inspires no trust (ethos) or stirs no emotional engagement (pathos), sound logic alone struggles to win assent",
          "Because logos is always less important than pathos",
          "Because logic has no effect on persuasion at all"
        ],
        bonne_reponse: 1,
        explication: "The three levers reinforce one another; solid logos with no ethos or pathos rarely convinces a non-specialist audience on its own."
      },
      {
        question: "A candidate who repeats unemployment figures on a loop, never telling a human story or establishing personal credibility, is mainly relying on:",
        choix: ["Pathos", "Ethos", "Logos", "Chiasmus"],
        bonne_reponse: 2,
        explication: "Relying exclusively on figures, with no appeal to emotion or personal credibility-building, is mainly a matter of logos."
      }
    ],
    identification: {
      situation: "Before presenting her three sales charts, the sales director reminds everyone she's held the role for twelve years and personally negotiated the company's biggest contracts — then tells the story of a client who nearly closed down before their solution saved it, before finally moving on to the figures.",
      reponses_acceptees: ["ethos pathos logos", "rhetorical triad", "the three modes of persuasion", "ethos pathos and logos"],
      indice: "Spot the three distinct moments in her talk: what she establishes about herself, what she narrates, and what she proves."
    },
    sources: [
      { auteurs: "Aristotle", annee: "c. 350 BCE", titre: "Rhetoric (book I, the three means of persuasion)", revue: "Aristotelian corpus", type: "founding text" },
      { auteurs: "Perelman, C., & Olbrechts-Tyteca, L.", annee: 1969, titre: "The New Rhetoric: A Treatise on Argumentation (trans. J. Wilkinson & P. Weaver)", revue: "University of Notre Dame Press", type: "reference work" }
    ],
    outils_lies: ["syllogisme", "anaphore"]
  },
  {
    id: "syllogisme",
    nom: "Syllogism",
    origine: "From the Greek syllogismos, \"inference, conclusion\"",
    categorie: "lexique",
    difficulte: "advanced",
    definition_courte: "A logical argument in three steps — two premises and a conclusion — where the conclusion necessarily follows from the premises if they are true and the structure is valid.",
    definition_longue: "The syllogism is the most classic form of deductive reasoning: from a general major premise and a particular minor premise, a conclusion follows necessarily — the canonical example being \"All men are mortal; Socrates is a man; therefore Socrates is mortal.\" Its strength is also its trap: a syllogism can be perfectly valid in its structure (the conclusion genuinely follows from the premises) while being factually false, if one of the premises is false (\"All birds fly; penguins are birds; therefore penguins fly\" is structurally valid but factually false, because the major premise is false). Many rhetorical fallacies borrow the appearance of a syllogism — the reassuring three-step shape of the reasoning — without the starting premises being actually true or relevant, which creates a false impression of logical rigour.",
    exemples: [
      { titre: "Valid reasoning", texte: "\"All metal conducts electricity; copper is a metal; therefore copper conducts electricity\" is a valid syllogism with true premises." },
      { titre: "Fallacious syllogism", texte: "\"All great champions train early in the morning; I train early in the morning; therefore I will become a great champion\" has the shape of a syllogism but its logic is invalid." },
      { titre: "Advertising", texte: "\"Healthy people drink our juice; drink our juice; you will be healthy\" borrows the reassuring structure of a syllogism to dress up a commercial promise with no real causal proof." }
    ],
    qcm: [
      {
        question: "A syllogism is made up of:",
        choix: ["A single general statement", "Two premises and a conclusion that logically follows from them", "A question followed by an answer", "Three concrete examples with no logical link"],
        bonne_reponse: 1,
        explication: "The three-step structure — major premise, minor premise, conclusion — defines the classic syllogism."
      },
      {
        question: "Can a structurally valid syllogism lead to a false conclusion?",
        choix: [
          "No, never, validity always guarantees truth",
          "Yes, if one of the starting premises is false, even when the logical structure is correct",
          "No, because a syllogism never has false premises",
          "Yes, but only in mathematics"
        ],
        bonne_reponse: 1,
        explication: "Logical validity concerns the structure (does the conclusion follow from the premises?), not the factual truth of the premises themselves."
      },
      {
        question: "Why do some fallacies borrow the form of a syllogism?",
        choix: [
          "Because it's the only sentence structure that exists",
          "Because the three-step shape creates an impression of logical rigour, even when the premises are false or beside the point",
          "Because a syllogism is always a fallacy by nature",
          "Because it always shortens the argument"
        ],
        bonne_reponse: 1,
        explication: "The structured appearance of a syllogism is reassuring and can mask unverified premises — the form imitates rigour without guaranteeing it."
      }
    ],
    identification: {
      situation: "An article reads: \"Every great civilisation has valued manual labour. Ours values manual labour less and less. Therefore our civilisation is in decline.\" The article never checks whether the first claim is even true.",
      reponses_acceptees: ["syllogism"],
      indice: "Spot the three steps of the reasoning: a general rule, a specific case, and a conclusion that would follow from them."
    },
    sources: [
      { auteurs: "Aristotle", annee: "c. 350 BCE", titre: "Prior Analytics (Organon)", revue: "Aristotelian corpus", type: "founding text" }
    ],
    outils_lies: ["triade-ethos-pathos-logos", "faux-dilemme"]
  }
];
