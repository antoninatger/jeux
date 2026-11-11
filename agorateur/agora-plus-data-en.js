/* =========================================================================
   Agorator — the living Agora: ENGLISH CONTENT
   French original: agora-plus-data.js (same keys, same emojis).
   The logic exists only once, in agora-plus.js.
   ========================================================================= */
const AGORA_PLUS = {
  textes: {
    reperPrompt: "🔍 Is one of these sentences hiding a trap? Tap it… or say it's all fine.",
    rienARedire: "👌 Nothing wrong here",
    objectionPrompt: "✋ Listen closely: hit “Objection!” the moment the trap goes by. Nothing tricky? Let them talk.",
    objection: "✋ Objection!",
    fausseAlerte: "🙅 Objection overruled: that sentence had no trap in it. −1 clarity.",
    fausseAlerteFacile: "🙅 Nothing tricky in that one. −1 clarity. Keep looking.",
    repere: "🎯 Trap spotted! Now name it.",
    repereVite: "⚡ Objection sustained, at first glance! Now name the trap.",
    rate: "😶 The trap slipped by without you noticing. ",
    laisseOk: "👌 You were right to let them talk: it was a real argument. ",
    objectionSain: "🙅 Objection overruled: it was a sound argument. ",
    contexte: "The rest of the speech",
    foule: "🏟️ The crowd",
    fouleAvec: "{x} out of 10 on your side",
    fouleSeduite: "👏 The crowd cheers for {n}…",
    fouleRevient: "🙌 The crowd turns towards you.",
    fouleSiffle: "😒 The crowd boos.",
    fouleEnnui: "🥱 The crowd is getting bored.",
    fouleRit: "😂 The crowd laughs… but {n} shuts down.",
    fouleSophisme: "👏 The crowd cheers your fallacy: that's exactly why fallacies work.",
    fouleApplaudit: "👏 The crowd cheers…",
    tagHonnete: "✔ Honest argument",
    humeur: ["😠 hostile", "😒 defensive", "😐 neutral", "🙂 listening", "😊 trusting"],
    humeurLabel: "{n}'s mood: {h}",
    plaidoyerProgres: "🗣️ Your case · argument {i} / {t}",
    plaidoyerConsigne: "Pick an honest argument: every fallacy will cost you clarity, even if the crowd loves it.",
    bonTitre: "✔ Honest argument: {n} is listening.",
    piegeTitre: "🚫 {l}! Penalty: −1 clarity.",
    piegeDemasque: "{n} saw through it:",
    suivant: "Next argument ➜",
    plaidoyerFin: "End of your case ➜",
    finParfait: "🏆 Perfect case: {c} honest arguments out of {t}, not a single fallacy.",
    finMoyen: "🗣️ Your case: {c} honest arguments out of {t}. Every fallacy cost you clarity and {n}'s trust.",
    finRate: "😬 Case lost: not one honest argument. The crowd may have cheered, but {n} didn't budge an inch.",
    convaincreBtn: "🗣️ Your turn to convince ➜",
    embarque: "😵 You got carried away… ➜",
    suivantPerso: "Next character ➜",
    voirBilan: "🏁 See the summary ➜",
    bilan: "<br><br>🎯 In the speeches: {r} traps spotted, {fa} false alarms.<br>🗣️ Your cases: {b} honest arguments, {p} fallacies slipped in (and penalised).<br>🏟️ The crowd ended up on your side against {f} characters out of {m}."
  },

  retorques: {
    popu: "'Lots of people thinking it proves nothing. Nice appeal to popularity.'",
    dilemme: "'Only two options? That's a false dilemma, and I'm not falling for it.'",
    adhom: "'Attacking the person now? That doesn't answer the question.'",
    pente: "'And from there, straight to disaster? Every step still needs proving.'",
    halo: "'Famous, yes. An expert on this, no.'",
    genehat: "'One case doesn't make a rule.'",
    preuve: "'It's up to whoever makes the claim to prove it, not the other way round.'",
    paille: "'That's not what I said at all. Nice caricature.'",
    posthoc: "'One thing after another doesn't mean one because of the other.'",
    cherry: "'Three hand-picked examples say nothing about the whole.'",
    circulaire: "'The conclusion is its own proof: we're going round in circles.'",
    whatabout: "'So what? That doesn't answer what I'm saying.'",
    hareng: "'You're changing the subject. Back to the question.'",
    nature: "'Natural doesn't mean better.'"
  },

  persos: {
    "🍗": {
      remplissage: ["'Have some more tart, Grandma made it this morning.'", "'Your cousin tells me you're doing drama this year.'", "'Mild weather for the time of year, isn't it?'", "'Pass me the salt, would you?'"],
      braque: ["'Oh, so that's your tone? Fine.'", "'Since you know better than everyone…'"],
      ouvert: ["'You know, it's nice to talk like this.'", "'Right, I'll tell you honestly what I think.'"],
      plaidoyer: {
        but: "Convince Uncle Gerard that you can eat less meat without spoiling family dinners.",
        tours: [
          { bons: [{t:"'I'm not asking you to change what you eat: I'll still come every Sunday, and I'll try everything except the meat.'", r:"'Well… if you still come, that's something.'"},
                   {t:"'Big health studies say you can eat perfectly well with less meat, as long as you vary your diet. Shall we look together?'", r:"'Hmm. If it's doctors saying so, I'll have a read.'"}],
            pieges: [{t:"'Everyone's going vegetarian these days, you're completely out of touch!'", a:"popu"},
                     {t:"'Either you accept my choice, or you never see me at the table again.'", a:"dilemme"}] },
          { bons: [{t:"'What matters most to you at these dinners: the chicken, or all of us being together?'", r:"'…All of us being there, of course.'"},
                   {t:"'I can bring a dish I've cooked myself: Grandma won't have anything extra to make.'", r:"'Ah! Your grandmother will love that.'"}],
            pieges: [{t:"'A footballer I follow online is vegetarian, and he's a champion: that proves it's better.'", a:"halo"},
                     {t:"'If we keep eating this much meat, soon there'll be no forests, no water, and nothing left on Earth!'", a:"pente"}] },
          { bons: [{t:"'Your cooking is a memory for me. I don't want to lose it, I just want to change the recipe a little.'", r:"'A memory… You've got a way with words.'"},
                   {t:"'We could try one Sunday without meat, just to see what the family thinks.'", r:"'Just one Sunday? Fine. But I'm choosing the dessert.'"}],
            pieges: [{t:"'You still smoke anyway: you're in no position to lecture me about health!'", a:"adhom"},
                     {t:"'My girlfriend went vegetarian and she's never been ill since: it's proven, it works.'", a:"genehat"}] }
        ]
      }
    },
    "🤳": {
      remplissage: ["'Hi to everyone joining the live!'", "'Don't forget to subscribe, it really helps me out.'", "'I'm filming from my new flat, by the way.'", "'The promo code is in the description, as usual.'"],
      braque: ["'OK, OK, another hater. Look at this, fam.'", "'You want a fight? You've got one.'"],
      ouvert: ["'Hang on, I'm pausing the live for a sec.'", "'Honestly, you're not like the other haters.'"],
      plaidoyer: {
        but: "Convince Maxx_Buzz to clearly label his sponsored posts.",
        tours: [
          { bons: [{t:"'The law says paid partnerships must be disclosed. If you do it, you're in the clear and nobody can blame you.'", r:"'Oh… I didn't know it was mandatory.'"},
                   {t:"'Your followers follow you because they trust you. Telling them when you're paid protects that trust.'", r:"'True, the community is all I've got.'"}],
            pieges: [{t:"'All the real influencers already do it, you'll look like an amateur.'", a:"popu"},
                     {t:"'With your juice-salesman face, nobody believes you anyway.'", a:"adhom"}] },
          { bons: [{t:"'What scares you about putting “sponsored” on screen?'", r:"'That brands will drop me… and my views will go down.'"},
                   {t:"'Some creators show their partnerships and keep their audience: we can look at their numbers together.'", r:"'Show me. If it works for them…'"}],
            pieges: [{t:"'Prove your followers don't feel betrayed! You can't? Then they do.'", a:"preuve"},
                     {t:"'If you hide one partnership today, tomorrow you'll lie about everything, and in a year you'll end up in prison!'", a:"pente"}] },
          { bons: [{t:"'You could make a video explaining how you choose your partners. It would make you more credible.'", r:"'A behind-the-scenes video… that could actually get views.'"},
                   {t:"'You're allowed to earn a living from brands. I'm just asking you to say so.'", r:"'Put like that, it's not so bad.'"}],
            pieges: [{t:"'I found three angry comments from followers: proof that your whole community hates you.'", a:"cherry"},
                     {t:"'A famous actor said influencers are all liars. He must know what he's talking about.'", a:"halo"}] }
        ]
      }
    },
    "🏛️": {
      remplissage: ["'Thank you all for coming in such numbers tonight.'", "'I greet the mayor, here in the front row.'", "'I was born in this town, two streets from here.'", "'Allow me a sip of water.'"],
      braque: ["'I will not be insulted in front of my voters.'", "'Ah, the arrogance of youth!'"],
      ouvert: ["'You intrigue me. Let us go on.'", "'Off the record, I'll tell you this.'"],
      plaidoyer: {
        but: "Convince Senator Brutus to publish his sources before every rally.",
        tours: [
          { bons: [{t:"'Your voters could check your figures themselves: it's the best way to show them you're not lying.'", r:"'Hmm. Voters who fact-check… that's bold.'"},
                   {t:"'Your plan for the schools was based on a public report, and it was your most convincing moment.'", r:"'True, that part went down well.'"}],
            pieges: [{t:"'All young people think politicians lie: so you must be lying.'", a:"popu"},
                     {t:"'Either you publish everything, or you're a liar. There's no other option.'", a:"dilemme"}] },
          { bons: [{t:"'What's holding you back from publishing your sources?'", r:"'The fear of being attacked over some detail, I admit.'"},
                   {t:"'If a mistake slips in, you can correct it publicly: that's a sign of honesty, not weakness.'", r:"'Correcting a mistake… in public? Interesting.'"}],
            pieges: [{t:"'You've been seen wearing a luxury watch: how can anyone trust you about anything?'", a:"adhom"},
                     {t:"'You want to hide your sources, so you want to hide the truth from citizens, so you despise democracy!'", a:"paille"}] },
          { bons: [{t:"'I understand you want to win. You'll win more lastingly with voters who trust you.'", r:"'Lastingly… That's a word a politician likes.'"},
                   {t:"'You could start with a single rally, with the sources shown on screen.'", r:"'A trial run, why not.'"}],
            pieges: [{t:"'Taxes have gone up since you became a senator: that proves you're the problem.'", a:"posthoc"},
                     {t:"'A very committed singer said you're worthless: I trust him.'", a:"halo"}] }
        ]
      }
    },
    "🕵️": {
      remplissage: ["'Hang on, let me shut the window.'", "'I printed all this last night, by the way.'", "'Sit down, there's room on the sofa.'", "'This yellow sticky note is the newest one.'"],
      braque: ["'I knew it: you're with them too.'", "'Of course, you're repeating what they taught you.'"],
      ouvert: ["'You're the first one to listen without laughing at me.'", "'Right. Let me show you something.'"],
      plaidoyer: {
        but: "Convince the Conspiracy Uncle to check one of his stories before sharing it.",
        tours: [
          { bons: [{t:"'We could take just one of your stories and look together at what several sources say about it.'", r:"'Just one? …OK, but I'm choosing.'"},
                   {t:"'You're right to want to understand for yourself. Checking is exactly how you take your research all the way.'", r:"'All the way… Nobody ever put it like that.'"}],
            pieges: [{t:"'All smart people know it's nonsense.'", a:"popu"},
                     {t:"'You lost your job, that's why you talk rubbish.'", a:"adhom"}] },
          { bons: [{t:"'What would make you change your mind about this story?'", r:"'If I saw the real data… not the TV version.'"},
                   {t:"'The raw data is often public: you can read it without going through TV.'", r:"'The raw data? That I'd like to see.'"}],
            pieges: [{t:"'If you keep believing that, soon you'll think the Earth is flat and end up alone in a cellar!'", a:"pente"},
                     {t:"'My PE teacher says conspiracies never exist. He's always right.'", a:"halo"}] },
          { bons: [{t:"'You have every right to distrust institutions. But distrusting everything means distrusting your own sources too.'", r:"'…Even my website? Hmm.'"},
                   {t:"'If the story is true, checking it will only make it stronger. You've got nothing to lose.'", r:"'Nothing to lose… Fair enough.'"}],
            pieges: [{t:"'Prove your website isn't lying! You can't? Then it's lying.'", a:"preuve"},
                     {t:"'I read one article that says the opposite of you. Just one, but that's enough: you're wrong.'", a:"genehat"}] }
        ]
      }
    },
    "👔": {
      remplissage: ["'Thank you for agreeing to this interview.'", "'Our headquarters have been in Lyon for twenty years.'", "'We employ 4,000 people worldwide.'", "'I'll take your questions right after.'"],
      braque: ["'I think this interview is coming to an end. One last thing, however.'", "'Our lawyers will appreciate the tone.'"],
      ouvert: ["'Between us, and with the mic off…'", "'That's a good question. I'll try to answer it honestly.'"],
      plaidoyer: {
        but: "Convince the CEO to publish the full carbon report, site by site.",
        tours: [
          { bons: [{t:"'A full report, checked by an independent body, would protect you from accusations of greenwashing.'", r:"'Protect us… Legal would like that.'"},
                   {t:"'Your Lyon results are real and verified: published with the rest, they'll show you know how to improve.'", r:"'True, Lyon is a good example.'"}],
            pieges: [{t:"'Everyone hates big companies: you have no choice.'", a:"popu"},
                     {t:"'Either you publish everything tomorrow, or you're heartless polluters.'", a:"dilemme"}] },
          { bons: [{t:"'What worries you about publishing the full report?'", r:"'The bad figures from our other sites… and my team.'"},
                   {t:"'Publishing a bad figure alongside a plan to improve it is more credible than one good figure on its own.'", r:"'A plan next to the figure… That's a fair point.'"}],
            pieges: [{t:"'You wear a designer suit: how dare you talk about ecology?'", a:"adhom"},
                     {t:"'If you don't publish, the planet will be destroyed and it will be entirely your fault!'", a:"pente"}] },
          { bons: [{t:"'I understand you fear for your job. Transparency can also become your strength with the board.'", r:"'My strength… I hadn't seen it that way.'"},
                   {t:"'You could start by publishing two more sites this year, with the same checks as in Lyon.'", r:"'Two sites is doable.'"}],
            pieges: [{t:"'Your competitors published their report, and their sales have gone up since: so publishing sells.'", a:"posthoc"},
                     {t:"'A hugely popular green influencer says you're lying: it must be true.'", a:"halo"}] }
        ]
      }
    },
    "🧑‍🦳": {
      remplissage: ["'Sit down, it will be a long night.'", "'Listen to the wind in the columns of the Agora.'", "'This orange book has been with me for thirty years.'", "'Sophisuke, stop fidgeting.'"],
      braque: ["'You strike before you listen. Again.'", "'Anger blinds you, student.'"],
      ouvert: ["'Good. You are listening. Let us go on.'", "'Now that is a real question.'"],
      plaidoyer: {
        but: "Convince your master that you can think for yourself, even against him.",
        tours: [
          { bons: [{t:"'I checked what your orange book says about vaccines: here's what I found, and here's where I disagree.'", r:"'You checked… Good.'"},
                   {t:"'You taught me to judge an argument by its evidence. I apply that, even to your lessons.'", r:"'Hmph. You remember what matters.'"}],
            pieges: [{t:"'All your former students think you're wrong.'", a:"popu"},
                     {t:"'Either you let me think for myself, or you're a bad master.'", a:"dilemme"}] },
          { bons: [{t:"'What would prove to you that I think for myself?'", r:"'That you contradict me… with good reasons.'"},
                   {t:"'I may be wrong, and I'll ask you to tell me. But first I want to search on my own.'", r:"'Search alone, be wrong, start again. That is the way.'"}],
            pieges: [{t:"'You're old, your ideas must be outdated.'", a:"adhom"},
                     {t:"'Sophisuke left the dojo and he's doing fine: proof your teaching is useless.'", a:"genehat"}] },
          { bons: [{t:"'You're right about many things. That's exactly why I want to be able to check them myself.'", r:"'…That is what I wanted to hear.'"},
                   {t:"'I'll keep your lessons, and add others I've found myself.'", r:"'A student who enriches the master's lesson. At last.'"}],
            pieges: [{t:"'I'm right because I think for myself, and I think for myself because I'm right.'", a:"circulaire"},
                     {t:"'Prove I don't think for myself! You can't? Then that settles it.'", a:"preuve"}] }
        ]
      }
    }
  }
};
