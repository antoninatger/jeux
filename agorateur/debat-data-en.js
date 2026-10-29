/* =========================================================================
   L'Agora en classe — CONTENU ANGLAIS
   Miroir de debat-data.js : mêmes `id`, même structure, textes traduits.
   La logique n'existe qu'une fois, dans debat.js.
   ========================================================================= */
const DEBAT = {

  categories: {
    ecole:    "🏫 School life",
    numerique:"📱 Digital life and social media",
    environnement: "🌍 Environment",
    societe:  "🏛️ Society and citizenship",
    sante:    "🧪 Science and health",
    culture:  "🎮 Culture and leisure",
    philo:    "🤔 Philosophy"
  },
  niveaux: { college: "Middle school", lycee: "High school", tous: "Middle and high school" },

  themes: [
    { id: "telephone", cat: "ecole", niveau: "college",
      q: "Should phones be banned throughout the whole school?",
      aff: "Phones should be banned everywhere in school, even at break time.",
      positions: [
        { nom: "For a total ban", pistes: ["What do phones do to attention in class?", "What happens at break when everyone is looking at a screen?"] },
        { nom: "Against a ban", pistes: ["How do you reach your parents in an emergency?", "Can a phone help you learn?"] },
        { nom: "Allowed in some places and at some times", pistes: ["Where and when are phones really a problem?", "Who would set the rules, and how would they be enforced?"] }
      ],
      pieges: ["pente", "genehat", "adhom"],
      motivations: ["fear of online bullying", "the need to stay in touch with family", "the wish for independence", "teachers tired of saying “put your phone away”"],
      bons: ["One clear rule for everyone avoids endless case-by-case bargaining.", "Some students need to reach a sick parent or say they'll be late."] },

    { id: "devoirs", cat: "ecole", niveau: "college",
      q: "Is homework useful?",
      aff: "Homework is essential for learning well.",
      positions: [
        { nom: "Yes, it's useful", pistes: ["What happens when you never go back over a lesson?", "Does homework teach you to organise yourself?"] },
        { nom: "No, it widens the gaps", pistes: ["Does everyone have someone to help them at home?", "How much free time is left after a full school day?"] },
        { nom: "Yes, but done differently", pistes: ["Which kinds of homework really help, and which less?", "What if it were done at school, in a study period?"] }
      ],
      pieges: ["genehat", "popu", "dilemme"],
      motivations: ["fear of falling behind", "lack of free time", "a sense of unfairness between students who get help and those who don't", "wanting parents to follow what you do"],
      bons: ["Going back over a lesson in the evening helps you remember it for longer.", "A student with no help at home starts with a handicap the school doesn't see."] },

    { id: "uniforme", cat: "ecole", niveau: "college",
      q: "Should students wear a school uniform?",
      aff: "All students should wear a uniform.",
      positions: [
        { nom: "Yes, a uniform", pistes: ["Do designer clothes lead to teasing?", "Does a uniform change the atmosphere of a school?"] },
        { nom: "No, everyone dresses as they like", pistes: ["Is the way you dress a way of expressing yourself?", "Who would pay for the uniform?"] },
        { nom: "A shared dress code, but a flexible one", pistes: ["Would a simple shared top be enough?", "Who would choose what to wear?"] }
      ],
      pieges: ["pente", "popu", "cherry"],
      motivations: ["fear of being teased", "wanting to show who you are", "the cost for families", "a sense of belonging"],
      bons: ["A shared outfit limits comparisons between students.", "Clothes are part of how you build who you are, especially as a teenager."] },

    { id: "reseaux15", cat: "numerique", niveau: "tous",
      q: "Should there be a minimum age of 15 for social media?",
      aff: "Social media should be banned for under-15s.",
      positions: [
        { nom: "Yes, not before 15", pistes: ["What do we know about the effects of social media on younger teens' sleep and mood?", "At what age can you spot manipulation?"] },
        { nom: "No ban", pistes: ["How would you check ages without keeping files on everyone?", "Does social media also help you keep friends?"] },
        { nom: "Allowed, with guidance", pistes: ["What would guided use actually mean?", "Who should teach young people to use it?"] }
      ],
      pieges: ["pente", "posthoc", "whatabout", "genehat"],
      motivations: ["fear of bullying", "fear of being left out of the group", "parents' worries", "wanting to be treated as an adult"],
      bons: ["Younger teens are more exposed to shocking content and peer pressure.", "A ban you can get round in one click protects little, and pushes people to hide what they do."] },

    { id: "ia", cat: "numerique", niveau: "tous",
      q: "Is it OK to let an AI help with homework?",
      aff: "Using an AI for homework is cheating.",
      positions: [
        { nom: "No, it's cheating", pistes: ["What do you learn if a machine does the work for you?", "How does the teacher know what the student understood?"] },
        { nom: "Yes, it's a tool like any other", pistes: ["Is it so different from a calculator or a dictionary?", "Shouldn't we learn to use it, since we'll use it later?"] },
        { nom: "Yes, but with rules", pistes: ["For which tasks does an AI help you learn?", "How can you say honestly that you used it?"] }
      ],
      pieges: ["dilemme", "genehat", "halo", "pente"],
      motivations: ["fear of being wrongly suspected", "lack of time", "fear that school becomes pointless", "curiosity about the tool"],
      bons: ["If the machine does the exercise, the student doesn't practise.", "An AI can explain an idea another way, at your own pace, at any time."] },

    { id: "vols", cat: "environnement", niveau: "tous",
      q: "Should short-haul flights be banned when there's a train?",
      aff: "Flying should be banned when you can make the same trip by train in under four hours.",
      positions: [
        { nom: "Yes, ban them", pistes: ["How much does flying weigh in a trip's emissions?", "Could trains take all those passengers?"] },
        { nom: "No, leave people the choice", pistes: ["Is the train always affordable?", "What happens to regions with poor rail links?"] },
        { nom: "Make trains more attractive instead", pistes: ["What would make people choose the train without banning planes?", "Who would pay for those trains?"] }
      ],
      pieges: ["whatabout", "cherry", "paille", "pente"],
      motivations: ["worry about the climate", "ticket prices", "airport jobs", "the feeling that the same people are always asked to make the effort"],
      bons: ["On the same route, the train usually emits far less than the plane.", "A train that's too expensive or too rare isn't a real solution for everyone."] },

    { id: "cantine", cat: "environnement", niveau: "tous",
      q: "Should the school canteen go vegetarian two days a week?",
      aff: "The canteen should serve vegetarian meals two days a week.",
      positions: [
        { nom: "Yes, two days", pistes: ["How much does meat change a meal's carbon footprint?", "Can you eat a balanced diet without meat?"] },
        { nom: "No, keep meat every day", pistes: ["For some students, is the canteen their only proper meal?", "What happens to local farmers?"] },
        { nom: "Offer a choice every day", pistes: ["Can the kitchen manage a two-option menu?", "What if everyone picks the same thing?"] }
      ],
      pieges: ["nature", "paille", "pente", "popu"],
      motivations: ["worry about the climate", "taste and habit", "standing up for farmers", "fear of not eating well"],
      bons: ["Eating less meat is one of the simplest ways to shrink a meal's footprint.", "A badly planned vegetarian meal can be less filling, and the canteen matters a lot to some students."] },

    { id: "vote16", cat: "societe", niveau: "lycee",
      q: "Should the voting age be lowered to 16?",
      aff: "People should be able to vote from age 16.",
      positions: [
        { nom: "Yes, at 16", pistes: ["Don't today's decisions affect young people most?", "What do the countries that have done it show?"] },
        { nom: "No, keep it at 18", pistes: ["At 16, are you informed enough, or too influenced by your parents?", "Why should voting come before other rights?"] },
        { nom: "Start with local elections", pistes: ["Is starting with the town council a good apprenticeship?", "Would more citizenship education be needed first?"] }
      ],
      pieges: ["adhom", "genehat", "pente", "halo"],
      motivations: ["wanting to be heard", "fear that young people will be manipulated", "political calculation", "the feeling that the future is decided without us"],
      bons: ["Young people will live longest with the consequences of today's decisions.", "One age for adulthood and voting keeps things simple and consistent."] },

    { id: "cameras", cat: "societe", niveau: "lycee",
      q: "Should there be more cameras in public spaces?",
      aff: "Many more cameras should be installed in the streets.",
      positions: [
        { nom: "Yes, more cameras", pistes: ["Do cameras help find the people who commit offences?", "Do you feel safer when you're being filmed?"] },
        { nom: "No, it's too much surveillance", pistes: ["Who watches the footage, and how long is it kept?", "Do people behave differently when they know they're filmed?"] },
        { nom: "Only in some places, with rules", pistes: ["Where is a camera really useful?", "What rules would protect privacy?"] }
      ],
      pieges: ["dilemme", "pente", "popu", "preuve"],
      motivations: ["fear of crime", "standing up for privacy", "distrust of those in power", "the need to feel protected"],
      bons: ["Footage can help an investigation once an offence has happened.", "Constant surveillance changes how we live together, even when we have nothing to hide."] },

    { id: "pubmalbouffe", cat: "sante", niveau: "tous",
      q: "Should junk-food ads be banned when children are watching?",
      aff: "Ads for foods high in fat or sugar should be banned when children are watching.",
      positions: [
        { nom: "Yes, ban them", pistes: ["Do ads influence what children ask for?", "Who is responsible for what children eat?"] },
        { nom: "No, it's up to parents", pistes: ["Can we ban everything that's bad for our health?", "Don't the ads run online anyway?"] },
        { nom: "Regulate rather than ban", pistes: ["What would a clear label on products change?", "What if we learned to decode ads at school?"] }
      ],
      pieges: ["paille", "dilemme", "whatabout", "nature"],
      motivations: ["worry about children's health", "standing up for freedom of choice", "advertising money", "fear of being judged a bad parent"],
      bons: ["Young children struggle to tell an ad from a programme.", "A TV ban doesn't reach the screens where children spend most of their time today."] },

    { id: "jeuvideo", cat: "culture", niveau: "tous",
      q: "Are video games an art form?",
      aff: "Video games are an art form, just like cinema or painting.",
      positions: [
        { nom: "Yes, it's an art", pistes: ["Can a game move you like a film or a book?", "What do the musicians, artists and writers who work on games do?"] },
        { nom: "No, it's entertainment", pistes: ["Is a game designed to keep you playing as long as possible a work of art?", "What separates an art from a pastime?"] },
        { nom: "Some games, not all", pistes: ["Are all films art?", "What criteria would decide?"] }
      ],
      pieges: ["genehat", "popu", "circulaire", "halo"],
      motivations: ["wanting your passion to be recognised", "fear of screens", "attachment to “classic” arts", "simply enjoying playing"],
      bons: ["A game brings together music, drawing, writing and staging, like cinema.", "Many games are designed first to sell and to keep players hooked, not to say something."] },

    { id: "mentir", cat: "philo", niveau: "lycee",
      q: "Is it right to lie to protect someone?",
      aff: "Lying is acceptable when it's to protect someone.",
      positions: [
        { nom: "Yes, sometimes", pistes: ["What would you do if telling the truth put someone in danger?", "Can a lie be an act of kindness?"] },
        { nom: "No, never", pistes: ["If everyone lies “for a good cause”, can we still trust each other?", "Who decides what protects the other person?"] },
        { nom: "It depends who you protect, and from what", pistes: ["Is lying to protect someone else the same as lying to protect yourself?", "Is there a third way: staying silent?"] }
      ],
      pieges: ["dilemme", "pente", "genehat", "circulaire"],
      motivations: ["the memory of a lie that hurt", "wanting to protect loved ones", "the need to be able to trust", "fear of being judged"],
      bons: ["There are situations where the truth would clearly put someone in danger.", "Trust between people rests on the idea that we don't lie to each other, even with good intentions."] }
  ],

  positionsLibres: ["For", "Against", "Nuanced position"],

  formats: {
    ligne: {
      emoji: "📏", nom: "The moving line",
      duree: "15 to 20 min", qui: "The whole class", travail: "Changing your mind, and saying why",
      resume: "A line on the floor, from “strongly agree” to “strongly disagree”. The teacher reads the statement, students take their places. In turn, one student from each zone gives a reason. Those who are convinced move.",
      regle: "Whoever moves says which sentence made them move, and whether it was an argument or a trap.",
      durees: [15, 20], dureeDefaut: 15,
      equipes: 0,
      zones: ["👍 Agree", "🤔 Torn", "👎 Disagree"],
      phases: [
        { nom: "Reading the statement: everyone takes a place", min: 1.5 },
        { nom: "First round: one reason per zone", min: 5 },
        { nom: "Moves: whoever moves explains why", min: 4 },
        { nom: "Second round: the missing arguments", min: 3 },
        { nom: "Last move", min: 1.5 }
      ]
    },
    aquarium: {
      emoji: "🐠", nom: "The fishbowl",
      duree: "30 to 45 min", qui: "4 to 6 in the centre, the others observe", travail: "Listening, rephrasing, spotting traps",
      resume: "Four to six students debate in the centre; the rest of the class, around them, each has an observation mission. An empty chair lets an observer step in for one contribution. Groups swap halfway through.",
      regle: "Before answering, you rephrase what the previous person said, until they say “yes, that's it”.",
      missions: ["🔍 Spot the traps, on both sides", "🪞 Count the rephrasings and the questions", "🤝 Note the points of agreement"],
      durees: [30, 40, 45], dureeDefaut: 30,
      equipes: [2, 3, 2],
      phases: [
        { nom: "Preparation: each side looks for its arguments", min: 5 },
        { nom: "First round in the centre", min: 10 },
        { nom: "Swap: the observers take their seats", min: 2 },
        { nom: "Second round in the centre", min: 10 },
        { nom: "Observers report back", min: 3 }
      ]
    },
    vivante: {
      emoji: "🍗", nom: "The Living Agora",
      duree: "20 min", qui: "The teacher against the class", travail: "Getting a character to open up, as in the game",
      resume: "The teacher (or a volunteer student) plays a character from the game, with their hidden motivation. The class, in teams, must get the character to open up. The screen shows the openness gauge, which the teacher raises or lowers depending on the answers. At the end, the class suggests the hidden motivation.",
      regle: "A real question or a faithful rephrasing opens the character up; a sledgehammer blow makes them close up.",
      durees: [15, 20, 25], dureeDefaut: 20,
      equipes: [2, 4, 3],
      phases: [
        { nom: "The character introduces themselves", min: 2 },
        { nom: "The exchange: each team in turn", min: 12 },
        { nom: "Last chance to open them up", min: 3 },
        { nom: "The class suggests the hidden motivation", min: 3 }
      ]
    }
  },

  persos: [
    { id: "gerard", emoji: "🍗", nom: "Uncle Gerard", desc: "family-dinner champion",
      q: "Should we eat organic food?",
      position: "“Organic is nonsense. In my day, we ate what there was, and it never killed us!”",
      pieges: ["genehat", "nature", "pente", "adhom"],
      motiv: "He is afraid of losing his place in the family: the world is changing fast, and he feels left behind.",
      indices: ["“You know, at my age, it feels like nobody listens to what you've lived through anymore.”", "“These dinners are all we have left to be together… If you change everything, what will be left?”", "“Sorry. It's just… I struggle to keep up with everything you young people know.”"] },
    { id: "maxx", emoji: "🤳", nom: "Maxx_Buzz", desc: "influencer with 2.4M followers",
      q: "Should we trust online reviews and influencers?",
      position: "“My community is never wrong. 2.4 million followers can't be made up!”",
      pieges: ["popu", "halo", "posthoc", "preuve"],
      motiv: "He is afraid of losing followers, and so his income: he says what the brands ask him to say.",
      indices: ["“If my videos don't get views, I can't pay my rent next month.”", "“Honestly? I don't know if it's the juice. It's the line the brand asked me to say.”", "“I'd love to make more honest videos, but I'm scared nobody would watch them.”"] },
    { id: "brutus", emoji: "🏛️", nom: "Senator Brutus", desc: "formidable political speaker",
      q: "Should there be more surveillance cameras in town?",
      position: "“It's simple: either we put cameras everywhere, or we accept total insecurity.”",
      pieges: ["dilemme", "paille", "popu", "adhom"],
      motiv: "He is afraid of losing the election and letting down those who believed in him: so he exaggerates.",
      indices: ["“I admit it, I caricature. My advisers say you need punchlines, otherwise nobody remembers anything.”", "“My team tells me I'm slipping in the polls. When I'm scared, I oversimplify.”", "“The people who elected me are counting on me. I don't want to let them down.”"] },
    { id: "complotiste", emoji: "🕵️", nom: "The Conspiracy Uncle", desc: "has done his own research",
      q: "Can we trust scientists?",
      position: "“The official scientists are hiding the truth from us. I've done my own research.”",
      pieges: ["cherry", "circulaire", "posthoc", "preuve"],
      motiv: "He felt looked down on and alone: in his online group, people finally listen to him.",
      indices: ["“Scientists never answered me. In my group, at least, people take me seriously.”", "“A doctor once talked to me like I was an idiot. Since then, I'd rather manage on my own.”", "“It feels good to be spoken to without being mocked.”"] },
    { id: "directrice", emoji: "👔", nom: "The Greenwashing CEO", desc: "master of corporate spin",
      q: "Can a big company be green?",
      position: "“Our company is already exemplary: look at our paper-cup recycling programme!”",
      pieges: ["hareng", "whatabout", "popu", "halo"],
      motiv: "They know the overall record is bad, and fear for their job and their team if they say so.",
      indices: ["“Emissions aren't my department. I was handed this speech this morning.”", "“If I say we pollute, my colleagues will pay the price.”", "“Management wants positive messages. The rest, I'm not allowed to talk about.”"] }
  ],

  gestes: [
    { id: "question", emoji: "❓", nom: "Open question", effet: 1 },
    { id: "reformulation", emoji: "🪞", nom: "Rephrasing", effet: 1 },
    { id: "esquive", emoji: "🙈", nom: "Dodge", effet: 0 },
    { id: "massue", emoji: "🔨", nom: "Sledgehammer blow", effet: -1 }
  ],

  familles: {
    grecs:   { nom: "Greek schools", noms: ["the Pythagoreans", "the Stoics", "the Epicureans", "the Cynics", "the Academy", "the Lyceum"] },
    figures: { nom: "Figures of dialogue", noms: ["the Socrateses", "the Hypatias", "the Montaignes", "the Olympe de Gouges", "the Mandelas", "the Eleanor Roosevelts"] },
    dojo:    { nom: "Dojo names", noms: ["the Open Eyes", "the Sliced Leaves", "the Bells", "the Steelmen", "the Common Grounds", "the Unmaskers"] },
    animaux: { nom: "Animals", noms: ["the Owls", "the Dolphins", "the Bees", "the Ravens", "the Elephants", "the Foxes"] }
  },

  distinctions: [
    { emoji: "🪞", nom: "Steelman", pour: "the most faithful rephrasing" },
    { emoji: "❓", nom: "The question that changed everything", pour: "the question that moved the exchange forward" },
    { emoji: "🔍", nom: "Open Eye", pour: "the best-spotted trap, without attacking the person" },
    { emoji: "🤝", nom: "Dialogue builder", pour: "whoever found a point of agreement" }
  ]
};
