// Cobaye — content (categories + historical experiments) — English mirror of data.js
// Every source was verified (author, year, journal/book) before being included.

const CATEGORIES = [
  {
    id: "obeissance",
    nom: "Obedience",
    nomLong: "Obedience and authority",
    classe: "c-obeissance",
    couleur: "#B0402A",
    description: "How far will people go when a legitimate authority figure tells them to keep going?"
  },
  {
    id: "conformisme",
    nom: "Conformity",
    nomLong: "Conformity and group influence",
    classe: "c-conformisme",
    couleur: "#6B7A5E",
    description: "How individual judgment bends to match what the group says or does."
  },
  {
    id: "situations",
    nom: "Situations",
    nomLong: "Roles, institutions and situations",
    classe: "c-situations",
    couleur: "#3D5A80",
    description: "How a role or institutional setting reshapes behaviour, sometimes more than personality itself."
  },
  {
    id: "developpement",
    nom: "Development",
    nomLong: "Child development",
    classe: "c-developpement",
    couleur: "#8B5FBF",
    description: "How attachment, fear and self-regulation take shape in early childhood."
  },
  {
    id: "social",
    nom: "Social behaviour",
    nomLong: "Social behaviour and helping",
    classe: "c-social",
    couleur: "#C98A2C",
    description: "How the presence of other people changes what we're willing to do for them."
  },
  {
    id: "memoire",
    nom: "Memory",
    nomLong: "Memory and testimony",
    classe: "c-memoire",
    couleur: "#4A7A75",
    description: "How memory can be reshaped, sometimes by a single word."
  }
];

const EXPERIENCES = [
  // ───────────────────────── OBEDIENCE ─────────────────────────
  {
    id: "milgram",
    nom: "Milgram's obedience experiment",
    chercheurs: "Stanley Milgram",
    annee: "1961",
    lieu: "Yale University",
    categorie: "obeissance",
    difficulte: "easy",
    resume_court: "Volunteers are ordered to administer increasingly strong electric shocks to a \"learner\" who makes mistakes on a memory task — to measure how far obedience to authority can go.",
    histoire: "In 1961, at Yale University, Stanley Milgram recruited ordinary volunteers for what he presented as a study of learning and punishment. Each participant played the role of \"teacher\" and had to administer an electric shock to a \"learner\" (actually an actor, never really shocked) for every mistake, increasing the intensity each time, up to a switch labelled \"450 volts — danger: severe shock.\" When a participant hesitated, an experimenter in a lab coat simply repeated standardised prods (\"The experiment requires that you continue\"). Milgram had asked psychiatrists to predict how many participants would go all the way: their estimate was around 1%. In fact, 65% of participants in the original experiment administered the maximum shock, despite obvious signs of distress (trembling, sweating, nervous laughter).",
    controverses: "The experiment immediately raised major ethical questions — deceiving participants, causing real psychological distress without full informed consent — which directly contributed to the writing of modern research ethics rules. More recent re-analyses of Milgram's archives (Gina Perry, 2013) show that the experimenter's script varied more than Milgram described, and that some participants had guessed the shocks weren't real — which nuances, without erasing, the scale of the original result.",
    exemples: [
      { titre: "Professional justifications", texte: "\"I was just following orders\" remains one of the most studied explanations for organisational wrongdoing, from corporate scandals to war crimes." },
      { titre: "Reality TV", texte: "The French show \"Le Jeu de la Mort\" (2010) reproduced Milgram's protocol almost exactly as a game show, with similar results." },
      { titre: "Cybersecurity", texte: "IT security training often cites Milgram to explain why an authoritative tone in a phishing email increases the click-through rate." }
    ],
    qcm: [
      {
        question: "In Milgram's experiment, what percentage of participants administered the maximum 450-volt shock?",
        choix: ["About 1%", "About 35%", "About 65%", "100%"],
        bonne_reponse: 2,
        explication: "65% of participants in the original experiment (1963) went all the way, far exceeding the predictions of the psychiatrists consulted beforehand (about 1%)."
      },
      {
        question: "What element played the central role in maintaining participants' obedience?",
        choix: ["A large financial reward", "An authority figure who kept insisting with standardised prods", "The fact that participants personally knew the \"learner\"", "A complete absence of supervision"],
        bonne_reponse: 1,
        explication: "It was the pressure exerted by the calm, insistent presence of the experimenter, perceived as a legitimate authority, that pushed people to continue despite visible distress."
      },
      {
        question: "Why did Milgram's experiment lastingly change research practices?",
        choix: ["Because it proved psychology wasn't a science", "Because the real distress inflicted without full informed consent helped drive the creation of modern ethics committees", "Because it was banned by the US Supreme Court", "Because it was never published"],
        bonne_reponse: 1,
        explication: "The experiment became a textbook case in the history of research ethics, contributing to informed-consent rules still in force today."
      }
    ],
    identification: {
      situation: "A call centre employee is told by management to keep following a procedure they find increasingly pushy and off-putting to customers, despite growing discomfort — their supervisor simply repeats: \"The procedure must be followed.\" They keep going.",
      reponses_acceptees: ["milgram", "milgram experiment", "milgram obedience experiment"],
      indice: "Think of the famous 1960s experiment on obedience to authority, run at Yale University."
    },
    sources: [
      { auteurs: "Milgram, S.", annee: 1963, titre: "Behavioral study of obedience", revue: "Journal of Abnormal and Social Psychology, 67(4), 371–378", type: "original study" },
      { auteurs: "Perry, G.", annee: 2013, titre: "Behind the Shock Machine: The Untold Story of the Notorious Milgram Psychology Experiments", revue: "The New Press", type: "historical re-examination" }
    ],
    experiences_liees: ["asch", "zimbardo"]
  },

  // ───────────────────────── CONFORMITY ─────────────────────────
  {
    id: "asch",
    nom: "The Asch conformity experiment",
    chercheurs: "Solomon Asch",
    annee: "1951",
    lieu: "Swarthmore College",
    categorie: "conformisme",
    difficulte: "easy",
    resume_court: "Participants must judge the length of obviously comparable lines — but when every other member of the group (actors) deliberately gives the wrong answer, a share of the real participants go along with the collective error rather than trust their own eyes.",
    histoire: "Solomon Asch gathered groups of seven to nine students for an apparently trivial task: indicating which of three lines matched the length of a reference line — a visual judgment so obvious that anyone could get it right alone, every time. Only one member of each group was a real participant; everyone else was a confederate instructed to repeatedly give an obviously wrong answer out loud before the real participant answered. Result: about 75% of participants went along with the group's wrong answer at least once across twelve trials, even though none of them made mistakes when answering alone. In follow-up interviews, some said they had genuinely doubted their own perception; others admitted they had lied to avoid standing out from the group.",
    controverses: "The original experiment was run on a homogeneous sample (white American male students in the 1950s), which raised questions about how well the result generalises. Later meta-analyses (Bond & Smith, 1996) confirm the effect but show it varies sharply across cultures — stronger in more collectivist societies — and has generally declined in Western replications conducted after the 1950s.",
    exemples: [
      { titre: "Work meetings", texte: "An individual disagreement often melts away in a meeting when the whole team already seems to agree, even on an objectively debatable point." },
      { titre: "Social media", texte: "The number of likes already under a post shapes how new readers judge its content, regardless of its actual quality." },
      { titre: "Road safety", texte: "Prevention campaigns exploit the reverse effect: showing that \"most people\" adopt a safe behaviour pushes others to imitate it." }
    ],
    qcm: [
      {
        question: "In Asch's experiment, what task were participants asked to perform?",
        choix: ["Solve a complex maths problem", "Judge which of three lines matched a reference line in length", "Memorise a list of words", "Judge the guilt of a defendant"],
        bonne_reponse: 1,
        explication: "The visual task was deliberately obvious and unambiguous — which makes the conformity rate all the more striking."
      },
      {
        question: "Roughly what proportion of participants went along with the group's wrong answer at least once?",
        choix: ["0%", "25%", "75%", "100%"],
        bonne_reponse: 2,
        explication: "About 75% of participants conformed to the group's obviously wrong answer at least once across the twelve trials."
      },
      {
        question: "What do meta-analyses conducted since the 1950s show about this conformity effect?",
        choix: ["The effect has completely disappeared since 1951", "The effect persists but varies by culture and has generally declined in the West", "The effect has stayed exactly identical everywhere in the world", "The effect could never be replicated"],
        bonne_reponse: 1,
        explication: "Replications show a real effect that is sensitive to cultural context and era, stronger in collectivist societies."
      }
    ],
    identification: {
      situation: "In a class discussion, a teacher asks each student, out loud, whether a historical claim sounds true. The first five students questioned — briefed in advance for this demonstration — all confidently give an answer the next student knows is plainly wrong. He hesitates, then gives the same answer as his classmates.",
      reponses_acceptees: ["asch", "asch experiment", "asch conformity experiment"],
      indice: "Think of the 1950s experiment on judging line length in a group."
    },
    sources: [
      { auteurs: "Asch, S. E.", annee: 1951, titre: "Effects of group pressure upon the modification and distortion of judgments", revue: "In H. Guetzkow (Ed.), Groups, Leadership and Men, Carnegie Press, 177–190", type: "original study" },
      { auteurs: "Bond, R., & Smith, P. B.", annee: 1996, titre: "Culture and conformity: A meta-analysis of studies using Asch's line judgment task", revue: "Psychological Bulletin, 119(1), 111–137", type: "synthesis / meta-analysis" }
    ],
    experiences_liees: ["milgram", "robbers-cave"]
  },
  {
    id: "robbers-cave",
    nom: "The Robbers Cave experiment (Sherif)",
    chercheurs: "Muzafer Sherif and colleagues",
    annee: "1954",
    lieu: "Robbers Cave State Park, Oklahoma",
    categorie: "conformisme",
    difficulte: "intermediate",
    resume_court: "Two groups of eleven-year-old boys, sent to summer camp without knowing it, develop intense hostility as soon as they're put in competition — then cooperate again once given a shared goal neither group can reach alone.",
    histoire: "Muzafer Sherif organised an apparently ordinary summer camp for twenty-two eleven- to twelve-year-old boys, all strangers to one another and carefully screened to be psychologically stable. Split into two separate groups from the start (who named themselves the \"Eagles\" and the \"Rattlers\"), the boys first developed a strong group identity without even knowing the other team existed. In a second phase, Sherif organised sports competitions with a single prize: rivalry quickly escalated into open hostility — insults, camp raids, burned flags — far beyond what the research team had anticipated. In a third phase, Sherif introduced \"superordinate goals\": staged breakdowns (a stuck truck, a water-supply cut) that the two groups could only fix by cooperating. Hostility then gradually subsided, until the two groups ended up sharing the same bus on the way home.",
    controverses: "The study is now a classic of realistic conflict theory, but it has also been criticised for the lack of genuine consent from the children and their parents (the boys believed they were attending an ordinary summer camp), and for an earlier, similar attempt by Sherif (1953) that had to be abandoned because the boys united against the researchers themselves instead of splitting as planned — a result rarely mentioned in textbooks.",
    exemples: [
      { titre: "Sports rivalries", texte: "Hostility between rival club fans dramatically eases when their countries face a common opponent in the national team." },
      { titre: "Workplace", texte: "Two chronically conflicting departments find genuine cooperation when facing a shared project neither can pull off alone." },
      { titre: "International diplomacy", texte: "International scientific cooperation is sometimes deliberately used to ease geopolitical tensions." }
    ],
    qcm: [
      {
        question: "What caused the hostility between the two groups of boys to subside?",
        choix: ["A collective punishment from the researchers", "The introduction of shared goals the two groups could only reach by cooperating", "Permanently separating the two groups", "An individual reward for each boy"],
        bonne_reponse: 1,
        explication: "The \"superordinate goals\" — problems neither group could solve alone — forced cooperation that gradually dissolved the hostility."
      },
      {
        question: "What initially triggered the hostility between the two groups?",
        choix: ["An age difference between the groups", "Sports competitions with a single prize, exclusive to one group", "A difference in nationality", "No interaction ever took place between the groups"],
        bonne_reponse: 1,
        explication: "It was the introduction of a zero-sum competition that quickly turned a mere group difference into open hostility."
      },
      {
        question: "Why is this study now considered ethically problematic?",
        choix: ["Because no child actually took part", "Because the boys and their parents hadn't given full informed consent to an experiment disguised as a summer camp", "Because the study was never published", "Because it involved no observation by researchers"],
        bonne_reponse: 1,
        explication: "Participants believed they were attending an ordinary summer camp, unaware they were being observed and manipulated as part of an experiment."
      }
    ],
    identification: {
      situation: "At a company, two sales teams have been competing for months over a single annual bonus — the atmosphere between them is toxic. Management then hands them a joint project whose success depends on both teams' complementary skills, and which neither can pull off alone. Within weeks, the tension eases.",
      reponses_acceptees: ["sherif", "robbers cave", "robbers cave experiment"],
      indice: "Think of the 1950s experiment run at a summer camp with two rival groups of boys."
    },
    sources: [
      { auteurs: "Sherif, M., Harvey, O. J., White, B. J., Hood, W. R., & Sherif, C. W.", annee: 1961, titre: "Intergroup Conflict and Cooperation: The Robbers Cave Experiment", revue: "University Book Exchange", type: "original study" }
    ],
    experiences_liees: ["asch", "milgram"]
  },

  // ───────────────────────── SITUATIONS ─────────────────────────
  {
    id: "zimbardo",
    nom: "The Stanford Prison Experiment (Zimbardo)",
    chercheurs: "Philip Zimbardo, Craig Haney, Curtis Banks",
    annee: "1971",
    lieu: "Stanford University",
    categorie: "situations",
    difficulte: "intermediate",
    resume_court: "Students randomly assigned to play \"guards\" or \"prisoners\" in a mock prison built in Stanford's basement slide, within days, into behaviour so abusive that the experiment, planned to run for two weeks, is stopped after six days.",
    histoire: "Philip Zimbardo recruited 24 student volunteers, screened as psychologically stable, and randomly assigned them to play either \"guard\" or \"prisoner\" in a simulated prison set up in the basement of Stanford's psychology department. \"Prisoners\" were genuinely arrested at home by local police, stripped, and numbered. \"Guards\", in uniform and reflective sunglasses, were given only the instruction to maintain order, with no explicit order to use violence. Within days, some guards adopted humiliating, abusive behaviour toward prisoners, while several prisoners showed signs of acute distress. Zimbardo, who himself played the role of prison superintendent, stopped the experiment after six of the planned fourteen days, after his partner Christina Maslach intervened, alarmed by what she was witnessing.",
    controverses: "Long presented as a demonstration of the power of situations over individual behaviour, the experiment underwent a major reassessment in 2019: historian Thibault Le Texier, digging through Zimbardo's original archives, showed that several guards had received far more direct instructions to be tough than previously admitted, that some prisoners had faked their distress, and that Zimbardo had actively steered events rather than merely observing. These revelations don't erase the study's historical interest, but they now require presenting it as much as a piece of stage direction as a rigorous scientific experiment.",
    exemples: [
      { titre: "Popular culture", texte: "The experiment has inspired several films and documentaries, extending its fame well beyond academia." },
      { titre: "Total institutions", texte: "The study is still cited in debates about prison abuse, despite the now well-documented methodological reservations." },
      { titre: "Research ethics training", texte: "The experiment now serves as an emblematic case study — for its failures as much as for its findings." }
    ],
    qcm: [
      {
        question: "How long did the experiment actually last, out of the two weeks planned?",
        choix: ["2 days", "6 days", "14 days", "1 month"],
        bonne_reponse: 1,
        explication: "The experiment was stopped after six days, following Christina Maslach's intervention, alarmed by what she observed."
      },
      {
        question: "What does Thibault Le Texier's 2019 reassessment reveal?",
        choix: ["That the experiment never happened", "That some guards had received direct instructions to be tough, and that Zimbardo steered events more than he originally admitted", "That all the results were entirely fabricated", "That the experiment was a perfectly neutral success"],
        bonne_reponse: 1,
        explication: "The archival analysis shows more active stage-managing by the researchers than the classic account of the experiment suggested."
      },
      {
        question: "Why is this experiment cited both in social psychology and in research methodology?",
        choix: ["Because it has nothing to do with methodology", "Because it illustrates both the power of social situations and the risks of researcher bias and stage-managing", "Because it has been successfully replicated dozens of times", "Because it was never published"],
        bonne_reponse: 1,
        explication: "It serves as a double textbook case: on substance (the influence of situations) and on method (vigilance against researcher stage-managing)."
      }
    ],
    identification: {
      situation: "In a corporate crisis-simulation exercise, employees randomly assigned a senior hierarchical role adopt, within hours, a noticeably more authoritarian tone toward colleagues playing a subordinate role — to the point that organisers have to step in to defuse the tension, even though no instruction called for that behaviour.",
      reponses_acceptees: ["zimbardo", "stanford prison experiment"],
      indice: "Think of the 1970s experiment where students played guards and prisoners in a mock prison."
    },
    sources: [
      { auteurs: "Haney, C., Banks, C., & Zimbardo, P.", annee: 1973, titre: "Interpersonal dynamics in a simulated prison", revue: "International Journal of Criminology and Penology, 1, 69–97", type: "original study" },
      { auteurs: "Le Texier, T.", annee: 2019, titre: "Debunking the Stanford Prison Experiment", revue: "American Psychologist, 74(7), 823–839", type: "historical re-examination", lien: "https://doi.org/10.1037/amp0000401" }
    ],
    experiences_liees: ["milgram", "rosenhan"]
  },
  {
    id: "rosenhan",
    nom: "On Being Sane in Insane Places (Rosenhan)",
    chercheurs: "David Rosenhan and seven other \"pseudopatients\"",
    annee: "1973",
    lieu: "Twelve US psychiatric hospitals",
    categorie: "situations",
    difficulte: "advanced",
    resume_court: "Eight perfectly sane people check into psychiatric hospitals reporting a single symptom, and are all admitted with a diagnosis of mental illness — then immediately stop simulating anything once admitted, without staff ever noticing they were sane.",
    histoire: "David Rosenhan and seven collaborators separately checked into twelve US psychiatric hospitals claiming to hear a voice repeating words like \"empty\", \"hollow\", \"thud\" — then, once admitted, completely stopped simulating any symptom and behaved normally. Despite this, all were admitted (eleven diagnosed with schizophrenia, one with manic depression) for an average stay of nineteen days, and were only released with a diagnosis of \"in remission\". Rosenhan published these findings in 1973 in the journal Science under the title \"On Being Sane in Insane Places\", as a scathing critique of the reliability of psychiatric diagnosis — staff, he wrote, never detected the deception, while several actual patients, by contrast, correctly suspected that the \"pseudopatients\" weren't really ill.",
    controverses: "For decades, the study was seen as one of the founding texts of the critique of psychiatric diagnosis, and it influenced the revision of diagnostic criteria (DSM-III, 1980). But investigative journalist Susannah Cahalan's book (\"The Great Pretender\", 2019), based on digging through Rosenhan's personal archives after his death, raised serious doubts: several of the \"eight pseudopatients\" could never be identified or traced, some elements of Rosenhan's own account appear exaggerated or inconsistent with his own notes, and at least one documented case suggests the patient genuinely had symptoms. The study remains a historical landmark, but its factual accuracy is now widely questioned.",
    exemples: [
      { titre: "DSM reform", texte: "The study is regularly cited as a factor that accelerated the overhaul of diagnostic criteria toward more observable, less interpretive standards." },
      { titre: "Social labelling", texte: "The concept of a \"label\" shaping the perception of all subsequent behaviour is echoed in research on mental-health stigma." },
      { titre: "Investigative journalism", texte: "Cahalan's investigation itself shows how an unchallenged classic study can be re-examined decades later through archival work." }
    ],
    qcm: [
      {
        question: "What did the \"pseudopatients\" do once admitted to hospital?",
        choix: ["They kept simulating symptoms throughout their stay", "They immediately stopped all simulation and behaved normally", "They tried to escape", "They told staff about the deception"],
        bonne_reponse: 1,
        explication: "Once admitted, the pseudopatients completely stopped simulating — yet none was ever unmasked by staff."
      },
      {
        question: "What did Susannah Cahalan's 2019 investigation reveal about this study?",
        choix: ["That the study was entirely fictional", "That several elements of Rosenhan's account are unverifiable or appear exaggerated, casting serious doubt on its accuracy", "That the study has since been perfectly replicated ten times", "That Rosenhan received a Nobel Prize for this work"],
        bonne_reponse: 1,
        explication: "The investigation uncovered major inconsistencies in the original account, without being able to fully disprove or confirm it."
      },
      {
        question: "What was this study's main historical impact, regardless of the doubts raised since?",
        choix: ["No measurable impact", "It fuelled a critique of psychiatric diagnosis that influenced later revisions of diagnostic manuals", "It led to the closure of every US psychiatric hospital", "It fully validated the reliability of psychiatric diagnosis at the time"],
        bonne_reponse: 1,
        explication: "Despite recent doubts about its factual accuracy, the study had a real historical influence on the debate over psychiatric diagnosis reliability."
      }
    ],
    identification: {
      situation: "A journalist quietly gets himself admitted to an administrative service by reporting one vague symptom at intake. Once the file is open, he stops simulating anything and behaves completely normally — but every neutral email he sends afterward gets reinterpreted by staff through the lens of his original complaint, with no one ever questioning the initial assessment.",
      reponses_acceptees: ["rosenhan", "rosenhan experiment", "on being sane in insane places"],
      indice: "Think of the 1970s study where fake patients stopped simulating once admitted."
    },
    sources: [
      { auteurs: "Rosenhan, D. L.", annee: 1973, titre: "On being sane in insane places", revue: "Science, 179(4070), 250–258", type: "original study" },
      { auteurs: "Cahalan, S.", annee: 2019, titre: "The Great Pretender: The Undercover Mission That Changed Our Understanding of Madness", revue: "Grand Central Publishing", type: "historical re-examination" }
    ],
    experiences_liees: ["zimbardo", "milgram"]
  },

  // ───────────────────────── DEVELOPMENT ─────────────────────────
  {
    id: "harlow",
    nom: "The surrogate mother experiments (Harlow)",
    chercheurs: "Harry Harlow",
    annee: "1958",
    lieu: "University of Wisconsin",
    categorie: "developpement",
    difficulte: "intermediate",
    resume_court: "Infant rhesus monkeys separated from their mothers consistently prefer clinging to a soft-cloth dummy, even with no food, over a wire dummy that provides milk — challenging the dominant idea that attachment reduces to meeting physiological needs.",
    histoire: "In the 1950s, the dominant theory held that the bond between a child and its mother was explained solely by the satisfaction of physiological needs (food). Harry Harlow separated infant rhesus monkeys from their biological mothers at birth and raised them with two artificial surrogate \"mothers\": one, bare wire, fitted with a feeding bottle; the other, covered in soft cloth, providing no food. Contrary to what the theory of the time predicted, the infant monkeys spent most of their time clinging to the cloth mother, visiting the wire mother only for as long as strictly necessary to feed, before immediately returning to the comfort of the soft cloth — including when frightened, when they consistently sought refuge against it. Harlow concluded that \"contact comfort\" is a fundamental psychological need, independent of food.",
    controverses: "Harlow's later work, notably his total social isolation experiments causing severe and lasting psychological disorders in the monkeys, is now considered ethically unacceptable and has, in hindsight, contributed to the emergence of strict animal-welfare rules in research. The paradox is that this same work, by scientifically documenting the devastating effects of early affective deprivation, also strengthened the case for physical contact and greater emotional care for children — including in orphanages and neonatal care.",
    exemples: [
      { titre: "Attachment theory", texte: "Harlow's work directly influenced John Bowlby and the development of attachment theory, now central to developmental psychology." },
      { titre: "Hospital practice", texte: "Routine skin-to-skin contact now offered in maternity wards partly rests on the same intuition documented by Harlow." },
      { titre: "Animal research ethics", texte: "The excesses of some of Harlow's experiments are now cited in animal-research ethics training as a counter-example not to repeat." }
    ],
    qcm: [
      {
        question: "What did the infant monkeys in Harlow's experiment prefer, most of the time?",
        choix: ["The wire mother, which provided milk", "The soft cloth mother, even with no food", "Neither of the two artificial mothers", "Only the company of other infant monkeys"],
        bonne_reponse: 1,
        explication: "The infant monkeys clung to the soft cloth mother most of the time, visiting the wire mother only to feed."
      },
      {
        question: "What dominant idea did this experiment directly challenge?",
        choix: ["The idea that monkeys feel no emotion at all", "The idea that mother-infant attachment is explained solely by meeting physiological needs (food)", "The idea that baby animals need no contact at all", "The idea that genetics has no influence on behaviour"],
        bonne_reponse: 1,
        explication: "Harlow showed that comforting contact mattered at least as much as food in forming the attachment bond."
      },
      {
        question: "Why are Harlow's later total-isolation experiments criticised today?",
        choix: ["Because they produced no usable results", "Because they inflicted severe, lasting psychological suffering on the animals, judged ethically unacceptable by today's standards", "Because they involved no animals at all", "Because they were conducted with no scientific publication"],
        bonne_reponse: 1,
        explication: "Harlow's extreme isolation experiments caused lasting disorders in the monkeys and are now cited as a textbook case of ethical overreach in animal research."
      }
    ],
    identification: {
      situation: "At a shelter for very young orphaned animals, caretakers notice the young actively seek contact with a soft plush toy placed in their enclosure long after they've finished feeding from an automatic bottle, and take refuge against it whenever a noise startles them.",
      reponses_acceptees: ["harlow", "harlow experiment", "surrogate mother experiment"],
      indice: "Think of the 1950s experiment with infant monkeys and two artificial mothers, one cloth, one wire."
    },
    sources: [
      { auteurs: "Harlow, H. F.", annee: 1958, titre: "The nature of love", revue: "American Psychologist, 13(12), 573–685", type: "original study" }
    ],
    experiences_liees: ["little-albert", "marshmallow"]
  },
  {
    id: "little-albert",
    nom: "Little Albert (Watson & Rayner)",
    chercheurs: "John B. Watson and Rosalie Rayner",
    annee: "1920",
    lieu: "Johns Hopkins University",
    categorie: "developpement",
    difficulte: "intermediate",
    resume_court: "A nine-month-old baby, who initially showed no fear of a white rat, learns to fear it after researchers repeatedly paired its presence with a loud, frightening noise — demonstrating that fear can be conditioned, and can generalise to similar objects.",
    histoire: "John Watson and Rosalie Rayner recruited \"Albert B.\", a nine-month-old baby raised in a hospital, to test whether an emotional reaction could be conditioned like a reflex. They first confirmed Albert showed no fear of a white rat, a rabbit, a dog, or a mask. They then exposed Albert to the white rat while striking a steel bar with a hammer right behind his head, producing a loud noise that startled him into crying. After several repetitions of this pairing, Albert began crying at the mere sight of the rat, even without the noise — and his fear generalised to other white, furry objects (a rabbit, a fur coat, a cotton-wool Santa Claus beard). Watson and Rayner never attempted to \"decondition\" Albert before the study ended.",
    controverses: "The experiment is now unanimously judged ethically unacceptable — it would be impossible to run under modern research standards, lacking genuine informed consent (Albert's mother, a hospital employee, was in a position of dependency) and lacking any attempt to undo the induced fear. The real identity of \"Little Albert\" remained a mystery for decades; research in the 2000s–2010s (Beck, Levinson & Irons, 2009) proposed an identification that was later partly disputed by other researchers (Powell et al., 2014), with no definitive certainty to this day about what became of the child.",
    exemples: [
      { titre: "Behavioural therapy", texte: "The reverse principle — counter-conditioning — is used today in therapy to treat phobias, by gradually pairing the feared object with pleasant sensations." },
      { titre: "Marketing and association", texte: "Repeatedly pairing a brand with pleasant music or mood relies on the same classical-conditioning mechanism, applied to positive emotions." },
      { titre: "Generalised fears", texte: "The \"stimulus generalisation\" observed in Albert (fear spreading to merely similar objects) helps explain why some phobias extend beyond their original trigger." }
    ],
    qcm: [
      {
        question: "How did Watson and Rayner condition Little Albert's fear of the white rat?",
        choix: ["By depriving him of food in the rat's presence", "By pairing the rat's presence with a loud, frightening noise produced right behind his head", "By showing him pictures of the rat for several weeks", "By rewarding him each time he approached the rat"],
        bonne_reponse: 1,
        explication: "The repeated pairing of the rat (initially neutral) with a frightening noise conditioned the fear, following the principle of classical conditioning."
      },
      {
        question: "What happened when Albert was later exposed to a rabbit or a fur coat?",
        choix: ["He showed no particular reaction", "His fear generalised to these other white, furry objects, even though they had never been paired with the noise", "He immediately lost his fear of the rat", "He developed a fear only of loud noises"],
        bonne_reponse: 1,
        explication: "The conditioned fear extended (generalised) to stimuli merely similar to the original rat, with no new direct learning."
      },
      {
        question: "Why could this study no longer be conducted today?",
        choix: ["Because conditioning doesn't exist in very young children", "Because it violates current ethical standards on consent and the failure to attempt to undo the harm caused", "Because babies no longer react to loud noises", "Because no lab has white rats anymore"],
        bonne_reponse: 1,
        explication: "The lack of genuine informed consent and the absence of any final deconditioning make this study incompatible with current research ethics rules."
      }
    ],
    identification: {
      situation: "A very young child who initially showed no fear of dogs starts crying at the sight of one after being barked at aggressively several times — and, a few weeks later, also cries at the sight of furry stuffed toys that have never barked at all.",
      reponses_acceptees: ["little albert", "little albert experiment", "watson and rayner"],
      indice: "Think of the 1920s experiment with a baby, a white rat, and a loud noise."
    },
    sources: [
      { auteurs: "Watson, J. B., & Rayner, R.", annee: 1920, titre: "Conditioned emotional reactions", revue: "Journal of Experimental Psychology, 3(1), 1–14", type: "original study" }
    ],
    experiences_liees: ["harlow", "marshmallow"]
  },
  {
    id: "marshmallow",
    nom: "The marshmallow test (Mischel)",
    chercheurs: "Walter Mischel and colleagues",
    annee: "1970–1972",
    lieu: "Stanford University",
    categorie: "developpement",
    difficulte: "intermediate",
    resume_court: "Preschool children are offered one marshmallow right away, or two if they wait alone for fifteen minutes without eating it — a test that became famous for its supposed link to later success, though its predictive power has since been substantially revised downward.",
    histoire: "Walter Mischel and colleagues sat four- and five-year-olds, one at a time, in a room with a treat (marshmallow, cookie, pretzel) placed in front of them. The experimenter offered a simple choice: eat the treat right away, or wait for their return (about fifteen minutes) to get two instead. The children were left alone with the temptation in plain sight, filmed developing various strategies to resist — covering their eyes, talking to themselves, physically moving away from the treat. Decades later, longitudinal follow-ups of the same children (Shoda, Mischel & Peake, 1990) reported a correlation between how long a child waited and more favourable academic or social outcomes in adolescence, popularising the idea that early self-control predicts later success.",
    controverses: "A much larger replication with a more socioeconomically representative sample (Watts, Duncan & Quan, 2018) substantially qualified this result: once family socioeconomic status and parental education are accounted for, the link between waiting time and later success becomes much weaker, close to negligible. Mischel's original study drew on a small, privileged sample (children from the Stanford campus community), which limited how far it could generalise. The test remains an elegant experimental design for studying self-regulation in children, but its interpretation as a predictor of life success is now considered largely overstated relative to current data.",
    exemples: [
      { titre: "Parenting advice", texte: "The test has fuelled (sometimes excessively) parenting advice about the importance of training self-control in young children." },
      { titre: "Popular science", texte: "The marshmallow test is one of the most widely retold psychology experiments in talks and training sessions, often without mentioning the nuances added since 2018." },
      { titre: "Socioeconomic research", texte: "The 2018 replication has itself become a reference for illustrating how much a background factor can explain a correlation initially attributed to an individual trait." }
    ],
    qcm: [
      {
        question: "What choice was offered to children in the marshmallow test?",
        choix: ["Eat a treat immediately, or wait to get two", "Choose between two different toys", "Answer a quiz to win a reward", "Share a treat with another child"],
        bonne_reponse: 0,
        explication: "The central choice was about waiting: an immediate, modest reward, or a doubled reward after a delay."
      },
      {
        question: "What does the Watts, Duncan and Quan (2018) replication show about the link between waiting and later success?",
        choix: ["That the link is even stronger than Mischel thought", "That once socioeconomic background is accounted for, the link becomes much weaker, close to negligible", "That the original experiment never took place", "That children who wait always do worse later"],
        bonne_reponse: 1,
        explication: "The larger, more representative replication shows that socioeconomic background explains much of the correlation originally attributed to self-control alone."
      },
      {
        question: "Why did the sample in Mischel's original study limit the reach of its conclusions?",
        choix: ["Because it included no children at all", "Because it was limited to children from a privileged socioeconomic background, not representative of the general population", "Because all the children were over ten years old", "Because the experiment was never filmed"],
        bonne_reponse: 1,
        explication: "A socioeconomically narrow sample limits how far a result can be generalised to the wider population."
      }
    ],
    identification: {
      situation: "In a classroom study, a teacher offers students a small gift right away, or a bigger one if they agree to wait until the end of the week. She quietly films their reactions to see how each child handles the wait while the temptation sits visibly on their desk.",
      reponses_acceptees: ["marshmallow", "marshmallow test", "marshmallow experiment", "mischel"],
      indice: "Think of the 1970s test where children had to resist eating a treat to get two later."
    },
    sources: [
      { auteurs: "Mischel, W., Ebbesen, E. B., & Raskoff Zeiss, A.", annee: 1972, titre: "Cognitive and attentional mechanisms in delay of gratification", revue: "Journal of Personality and Social Psychology, 21(2), 204–218", type: "original study" },
      { auteurs: "Watts, T. W., Duncan, G. J., & Quan, H.", annee: 2018, titre: "Revisiting the Marshmallow Test: A Conceptual Replication", revue: "Psychological Science, 29(7), 1159–1177", type: "replication / re-examination" }
    ],
    experiences_liees: ["harlow", "little-albert"]
  },

  // ───────────────────────── SOCIAL BEHAVIOUR ─────────────────────────
  {
    id: "bystander-effect",
    nom: "The bystander effect (Latané & Darley)",
    chercheurs: "John Darley and Bibb Latané",
    annee: "1968",
    lieu: "Columbia University, New York",
    categorie: "social",
    difficulte: "easy",
    resume_court: "Faced with a simulated emergency, a lone bystander steps in to help almost every time — but the more witnesses are present, the less personally responsible each one feels for acting, and the slower help arrives.",
    histoire: "In 1964, the murder of Kitty Genovese in New York, reported by the press as having been witnessed by dozens of neighbours who did nothing, prompted Darley and Latané to study this paradox scientifically. In a series of experiments, they placed participants alone in a room, communicating by intercom with other participants (actually recordings), one of whom simulated a serious medical emergency mid-conversation. When the participant believed they were the sole witness to the emergency, they intervened 85% of the time, usually very quickly. But when they believed several other people could also hear the emergency, that rate dropped to 62%, and the delay before acting increased markedly. The researchers explained this with \"diffusion of responsibility\": the more potential witnesses there are, the more each one unconsciously assumes someone else will step in.",
    controverses: "The Kitty Genovese case itself, the starting point for this research, has since been widely reassessed: later journalistic investigations (notably a 2016 New York Times piece) showed that the number of witnesses who genuinely watched the whole scene without reacting had been greatly exaggerated by the original 1964 media coverage, and that several neighbours had in fact called the police. The bystander effect itself, however, has been replicated many times in the lab and remains one of the most robust findings in social psychology, independent of the accuracy of the news story that inspired it.",
    exemples: [
      { titre: "First aid training", texte: "First-aid courses now explicitly teach naming a specific person in a crowd (\"you, in the red coat, call emergency services\") to counter diffusion of responsibility." },
      { titre: "Online harassment", texte: "The bystander effect is cited to explain why hateful comments seen by thousands of people rarely prompt any individual intervention." },
      { titre: "Corporate safety", texte: "Internal whistleblowing protocols are partly designed to counteract diffusion of responsibility in large organisations." }
    ],
    qcm: [
      {
        question: "What does Darley and Latané's experiment show about helping someone in distress?",
        choix: ["The more witnesses present, the faster help arrives", "The more witnesses present, the less personally responsible each one feels for intervening", "The number of witnesses has no influence on the help given", "Witnesses always intervene immediately, regardless of their number"],
        bonne_reponse: 1,
        explication: "It's \"diffusion of responsibility\": the assumed presence of other witnesses reduces each person's sense of individual responsibility."
      },
      {
        question: "What did a more recent journalistic investigation reveal about the Kitty Genovese murder?",
        choix: ["That the murder never happened", "That the number of passive witnesses had been greatly exaggerated, and that several neighbours had actually called the police", "That Kitty Genovese herself had invented the story", "That the bystander effect was invented afterward, unrelated to this case"],
        bonne_reponse: 1,
        explication: "The original 1964 media account turned out to be exaggerated, even though the bystander effect later documented in the lab remains solidly established."
      },
      {
        question: "What practical recommendation follows directly from the bystander effect?",
        choix: ["Avoid calling for help in public", "Name a specific person to ask for help rather than addressing the crowd in general", "Always wait for a professional to intervene first", "Never intervene alone in an emergency"],
        bonne_reponse: 1,
        explication: "Targeting a specific person removes the ambiguity over who is responsible for acting, bypassing diffusion of responsibility."
      }
    ],
    identification: {
      situation: "In a crowded shopping mall, someone collapses to the ground. Dozens of passers-by slow down, look, but keep walking without stopping — each one probably assuming someone else in the crowd will deal with it.",
      reponses_acceptees: ["bystander effect", "diffusion of responsibility"],
      indice: "Think of the 1960s experiment on helping someone in distress depending on how many witnesses were present."
    },
    sources: [
      { auteurs: "Darley, J. M., & Latané, B.", annee: 1968, titre: "Bystander intervention in emergencies: Diffusion of responsibility", revue: "Journal of Personality and Social Psychology, 8(4), 377–383", type: "original study" }
    ],
    experiences_liees: ["asch", "rosenhan"]
  },

  // ───────────────────────── MEMORY ─────────────────────────
  {
    id: "loftus-palmer",
    nom: "Reconstructed memory (Loftus & Palmer)",
    chercheurs: "Elizabeth Loftus and John Palmer",
    annee: "1974",
    lieu: "University of Washington",
    categorie: "memoire",
    difficulte: "easy",
    resume_court: "Participants who watch the exact same video of a car accident estimate a higher speed when asked how fast the cars were going when they \"smashed\" rather than \"hit\" each other — a single word in the question is enough to alter the reported memory.",
    histoire: "Elizabeth Loftus and John Palmer showed participants short videos of car accidents, then asked a question about the vehicles' speed, varying only a single verb: \"About how fast were the cars going when they [contacted / hit / bumped / collided with / smashed into] each other?\" Reported speed estimates varied significantly depending on the verb used — \"smashed\" produced markedly higher estimates than \"contacted\", even though every participant had seen exactly the same footage. In a second experiment, a week later, participants asked with the word \"smashed\" were also significantly more likely to wrongly claim they had seen broken glass at the scene — when there was none in the video. The wording of the question hadn't just influenced the reported estimate; it appeared to have altered the memory itself.",
    controverses: "This landmark study opened up an entire field of research on \"false memories\" and eyewitness reliability, with direct implications for legal practice. Loftus was later criticised by parts of the legal profession for her role as an expert witness in trials where her testimony on the fragility of memory was sometimes used to cast doubt on victims' accounts, particularly in sexual-abuse cases — a debate that remains active over the balance between scientific rigour about memory and the risk of discrediting genuine testimony.",
    exemples: [
      { titre: "Police interviews", texte: "Modern witness-interview protocols recommend open, neutral questions, precisely to avoid the effect documented by Loftus and Palmer." },
      { titre: "Trials and cross-examination", texte: "How a lawyer phrases a question to a witness on the stand can influence, even unintentionally, the memory that witness reports." },
      { titre: "Opinion polling", texte: "The same principle — question wording shapes the answer — is exploited (or avoided) when designing survey questionnaires." }
    ],
    qcm: [
      {
        question: "What did Loftus and Palmer vary between conditions in their experiment?",
        choix: ["The actual speed of the cars in the video", "A single verb in the question asked of participants after the video", "The number of participants watching the video", "The length of the video"],
        bonne_reponse: 1,
        explication: "Only the verb used in the question changed — the video itself was strictly identical for everyone."
      },
      {
        question: "What happened a week later among participants who were asked with the word \"smashed\"?",
        choix: ["They forgot the video entirely", "More of them wrongly claimed to have seen broken glass that wasn't in the video", "They remembered the exact speed perfectly", "No difference was observed"],
        bonne_reponse: 1,
        explication: "The wording of the initial question altered the memory of the scene itself, not just the estimate reported at the time."
      },
      {
        question: "What practical application follows directly from this research?",
        choix: ["None, the study remains purely theoretical", "Witness-interview protocols recommend neutral, open questions to limit memory distortion", "Accidents must always be filmed to avoid any human testimony", "Witnesses must always answer with a single word"],
        bonne_reponse: 1,
        explication: "This study directly influenced best practices for witness interviews in legal settings, to limit the effect of leading questions."
      }
    ],
    identification: {
      situation: "Two investigators separately question the same witness to a fight. The first asks: \"How fast did the man strike the victim?\" The second asks: \"What happened, in your view?\" The two resulting accounts differ noticeably, even though the witness saw the same scene.",
      reponses_acceptees: ["loftus and palmer", "reconstructed memory", "leading question effect", "memory reconstruction"],
      indice: "Think of the 1970s experiment involving car-crash videos and differently worded questions."
    },
    sources: [
      { auteurs: "Loftus, E. F., & Palmer, J. C.", annee: 1974, titre: "Reconstruction of automobile destruction: An example of the interaction between language and memory", revue: "Journal of Verbal Learning and Verbal Behavior, 13(5), 585–589", type: "original study" }
    ],
    experiences_liees: ["rosenhan", "marshmallow"]
  }
];
