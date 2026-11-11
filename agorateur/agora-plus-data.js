/* =========================================================================
   Agorateur — l'Agora vivante : CONTENU FRANÇAIS
   Miroir anglais : agora-plus-data-en.js (mêmes clés, mêmes emojis).
   La logique n'existe qu'une fois, dans agora-plus.js.

   Chaque personnage est repéré par son emoji, identique dans les deux langues.
   - remplissage : des phrases sans argument (le décor d'une tirade), au
     milieu desquelles il faut repérer le piège ;
   - braque / ouvert : ce que dit le personnage en reprenant la parole quand
     il se ferme ou quand il s'ouvre ;
   - plaidoyer : à toi de le convaincre, en trois arguments. Chaque tour
     propose deux arguments honnêtes (t, et la réaction r du personnage) et
     deux sophismes (t, et a : l'id du sophisme, celui du dojo).
   ========================================================================= */
const AGORA_PLUS = {
  textes: {
    reperPrompt: "🔍 Une de ces phrases cache-t-elle un piège ? Touche-la… ou dis que tout va bien.",
    rienARedire: "👌 Rien à redire",
    objectionPrompt: "✋ Écoute bien : « Objection ! » au moment où passe le piège. Rien de piégé ? Laisse parler.",
    objection: "✋ Objection !",
    fausseAlerte: "🙅 Objection rejetée : cette phrase-là n'avait rien de piégé. −1 lucidité.",
    fausseAlerteFacile: "🙅 Rien de piégé dans celle-ci. −1 lucidité. Cherche encore.",
    repere: "🎯 Piège repéré ! Reste à le nommer.",
    repereVite: "⚡ Objection retenue, du premier coup d'œil ! Reste à nommer le piège.",
    rate: "😶 Le piège est passé sans que tu le voies. ",
    laisseOk: "👌 Tu as bien fait de laisser parler : c'était un vrai argument. ",
    objectionSain: "🙅 Objection rejetée : c'était un argument valable. ",
    contexte: "Le reste de la tirade",
    foule: "🏟️ Le public",
    fouleAvec: "{x} sur 10 avec toi",
    fouleSeduite: "👏 La foule applaudit {n}…",
    fouleRevient: "🙌 La foule se tourne vers toi.",
    fouleSiffle: "😒 La foule siffle.",
    fouleEnnui: "🥱 La foule s'ennuie.",
    fouleRit: "😂 La foule rit… mais {n} se ferme.",
    fouleSophisme: "👏 La foule applaudit ton sophisme : c'est bien pour ça qu'ils marchent.",
    fouleApplaudit: "👏 La foule applaudit…",
    tagHonnete: "✔ Argument honnête",
    humeur: ["😠 braqué", "😒 sur la défensive", "😐 neutre", "🙂 à l'écoute", "😊 en confiance"],
    humeurLabel: "Humeur de {n} : {h}",
    plaidoyerProgres: "🗣️ Ton plaidoyer · argument {i} / {t}",
    plaidoyerConsigne: "Choisis un argument honnête : chaque sophisme te coûtera de la lucidité, même s'il plaît à la foule.",
    bonTitre: "✔ Argument honnête : {n} t'écoute.",
    piegeTitre: "🚫 {l} ! Pénalité : −1 lucidité.",
    piegeDemasque: "{n} l'a repéré :",
    suivant: "Argument suivant ➜",
    plaidoyerFin: "Fin du plaidoyer ➜",
    finParfait: "🏆 Plaidoyer parfait : {c} arguments honnêtes sur {t}, sans un seul sophisme.",
    finMoyen: "🗣️ Plaidoyer : {c} arguments honnêtes sur {t}. Chaque sophisme t'a coûté de la lucidité et la confiance de {n}.",
    finRate: "😬 Plaidoyer raté : aucun argument honnête. La foule a peut-être applaudi, mais {n} n'a pas bougé d'un pouce.",
    convaincreBtn: "🗣️ À toi de convaincre ➜",
    embarque: "😵 Tu t'es laissé embarquer… ➜",
    suivantPerso: "Personnage suivant ➜",
    voirBilan: "🏁 Voir le bilan ➜",
    bilan: "<br><br>🎯 Dans les tirades : {r} pièges repérés, {fa} fausses alertes.<br>🗣️ Tes plaidoyers : {b} arguments honnêtes, {p} sophismes glissés (et pénalisés).<br>🏟️ Le public a fini de ton côté face à {f} personnages sur {m}."
  },

  // Ce que répond le personnage quand tu glisses un sophisme dans ton plaidoyer.
  retorques: {
    popu: "« Que beaucoup de gens le pensent ne prouve rien. Joli appel à la popularité. »",
    dilemme: "« Il n'y aurait que deux options ? C'est un faux dilemme, et je ne tombe pas dedans. »",
    adhom: "« On s'en prend à la personne, maintenant ? Ça ne répond pas à la question. »",
    pente: "« Et de là, droit à la catastrophe ? Chaque étape reste à prouver. »",
    halo: "« Célèbre, oui. Compétent sur ce sujet, non. »",
    genehat: "« Un seul cas ne fait pas une règle. »",
    preuve: "« C'est à celui qui affirme d'apporter la preuve, pas l'inverse. »",
    paille: "« Ce n'est pas du tout ce que j'ai dit. Belle caricature. »",
    posthoc: "« L'un après l'autre, ça ne veut pas dire l'un à cause de l'autre. »",
    cherry: "« Trois exemples bien choisis ne disent rien de l'ensemble. »",
    circulaire: "« La conclusion sert de preuve à elle-même : on tourne en rond. »",
    whatabout: "« Et alors ? Ça ne répond pas à ce que je dis. »",
    hareng: "« Tu changes de sujet. Revenons à la question. »",
    nature: "« Naturel ne veut pas dire meilleur. »"
  },

  persos: {
    "🍗": {
      remplissage: ["« Ressers-toi de tarte, c'est mamie qui l'a faite ce matin. »", "« Ta cousine m'a dit que tu faisais du théâtre cette année. »", "« Il fait doux pour la saison, hein ? »", "« Passe-moi le sel, s'il te plaît. »"],
      braque: ["« Ah, tu le prends sur ce ton ? Très bien. »", "« Puisque tu sais tout mieux que tout le monde… »"],
      ouvert: ["« Tu sais, c'est agréable de discuter comme ça. »", "« Bon, je vais te dire franchement ce que je pense. »"],
      plaidoyer: {
        but: "Convaincs Gérard que tu peux manger moins de viande sans gâcher les repas de famille.",
        tours: [
          { bons: [{t:"« Je ne te demande pas de changer ce que tu manges : je viendrai toujours le dimanche, et je goûterai tout sauf la viande. »", r:"« Bon… si tu viens toujours, c'est déjà ça. »"},
                   {t:"« Les grandes études sur la santé disent qu'on peut très bien se nourrir avec moins de viande, à condition de varier. On regarde ensemble ? »", r:"« Hmm. Si ce sont des médecins qui le disent, je veux bien lire. »"}],
            pieges: [{t:"« Tout le monde devient végétarien aujourd'hui, tu es complètement dépassé ! »", a:"popu"},
                     {t:"« Soit tu acceptes mon choix, soit tu ne me revois plus jamais à table. »", a:"dilemme"}] },
          { bons: [{t:"« Qu'est-ce qui compte le plus pour toi dans ces repas : le poulet, ou qu'on soit tous réunis ? »", r:"« …Qu'on soit tous là, évidemment. »"},
                   {t:"« Je peux apporter un plat que j'ai cuisiné moi-même : mamie n'aura rien de plus à préparer. »", r:"« Ah ! Ça, ta grand-mère va adorer. »"}],
            pieges: [{t:"« Un footballeur que je suis sur les réseaux est végétarien, et il est champion : c'est bien la preuve que c'est meilleur. »", a:"halo"},
                     {t:"« Si on continue à manger autant de viande, bientôt il n'y aura plus de forêts, plus d'eau, et plus rien du tout sur Terre ! »", a:"pente"}] },
          { bons: [{t:"« Ta cuisine, c'est un souvenir pour moi. Je ne veux pas le perdre, je veux juste en changer un peu la recette. »", r:"« Un souvenir… Tu sais parler, toi. »"},
                   {t:"« On pourrait essayer un dimanche sans viande, juste pour voir ce qu'en pense la famille. »", r:"« Un seul dimanche ? Bon. Mais c'est moi qui choisis le dessert. »"}],
            pieges: [{t:"« Toi, de toute façon, tu fumes encore : tu n'as aucune leçon de santé à me donner ! »", a:"adhom"},
                     {t:"« Ma copine est devenue végétarienne et elle n'a plus jamais été malade : c'est prouvé, ça marche. »", a:"genehat"}] }
        ]
      }
    },
    "🤳": {
      remplissage: ["« Salut à tous ceux qui arrivent sur le live ! »", "« N'oubliez pas de vous abonner, ça m'aide énormément. »", "« Je tourne depuis mon nouvel appart, d'ailleurs. »", "« Le code promo est en description, comme d'hab. »"],
      braque: ["« Ok, ok, encore un hater. Regardez-moi ça, la commu. »", "« Tu cherches le clash ? Tu vas l'avoir. »"],
      ouvert: ["« Attends, je coupe le live deux secondes. »", "« Franchement, t'es pas comme les autres haters. »"],
      plaidoyer: {
        but: "Convaincs Maxx_Buzz d'indiquer clairement ses placements de produit.",
        tours: [
          { bons: [{t:"« La loi oblige à signaler les partenariats payés. Si tu le fais, tu es en règle et personne ne peut te le reprocher. »", r:"« Ah… je savais pas que c'était obligatoire. »"},
                   {t:"« Tes abonnés te suivent parce qu'ils te font confiance. Leur dire quand tu es payé, c'est protéger cette confiance. »", r:"« C'est vrai que la commu, c'est tout ce que j'ai. »"}],
            pieges: [{t:"« Tous les vrais influenceurs le font déjà, tu vas passer pour un amateur. »", a:"popu"},
                     {t:"« Avec ta tête de vendeur de jus, de toute façon, personne ne te croit. »", a:"adhom"}] },
          { bons: [{t:"« Qu'est-ce qui te fait peur, si tu affiches « sponsorisé » ? »", r:"« Que les marques me lâchent… et que mes vues baissent. »"},
                   {t:"« Certains créateurs affichent leurs partenariats et gardent leur audience : on peut regarder leurs chiffres ensemble. »", r:"« Montre-moi. Si ça marche pour eux… »"}],
            pieges: [{t:"« Prouve-moi que tes abonnés ne se sentent pas trahis ! Tu ne peux pas ? Alors c'est qu'ils le sont. »", a:"preuve"},
                     {t:"« Si tu caches un partenariat aujourd'hui, demain tu mentiras sur tout, et dans un an tu finiras en prison ! »", a:"pente"}] },
          { bons: [{t:"« Tu pourrais faire une vidéo où tu expliques comment tu choisis tes partenaires. Ça te rendrait plus crédible. »", r:"« Une vidéo coulisses… ça pourrait faire des vues, en vrai. »"},
                   {t:"« Tu as le droit de gagner ta vie avec des marques. Je te demande juste de le dire. »", r:"« Dit comme ça, c'est pas si terrible. »"}],
            pieges: [{t:"« J'ai trouvé trois commentaires d'abonnés en colère : la preuve que toute ta communauté te déteste. »", a:"cherry"},
                     {t:"« Un acteur célèbre a dit que les influenceurs étaient tous des menteurs. Il doit savoir de quoi il parle. »", a:"halo"}] }
        ]
      }
    },
    "🏛️": {
      remplissage: ["« Merci à toutes et à tous d'être venus si nombreux ce soir. »", "« Je salue monsieur le maire, présent au premier rang. »", "« Je suis né dans cette ville, à deux rues d'ici. »", "« Permettez-moi de boire une gorgée d'eau. »"],
      braque: ["« Je ne me laisserai pas insulter devant mes électeurs. »", "« Voilà bien l'arrogance de la jeunesse ! »"],
      ouvert: ["« Vous m'intriguez. Poursuivons. »", "« Hors micro, je vous dirai ceci. »"],
      plaidoyer: {
        but: "Convainquez le Sénateur Brutus de publier ses sources avant chaque meeting.",
        tours: [
          { bons: [{t:"« Vos électeurs pourront vérifier vos chiffres eux-mêmes : c'est la meilleure façon de leur montrer que vous ne mentez pas. »", r:"« Hmm. Des électeurs qui vérifient… c'est audacieux. »"},
                   {t:"« Votre proposition sur les écoles s'appuyait sur un rapport public, et c'était votre moment le plus convaincant. »", r:"« C'est vrai, ce passage a bien porté. »"}],
            pieges: [{t:"« Tous les jeunes pensent que les politiques mentent : vous mentez donc forcément. »", a:"popu"},
                     {t:"« Soit vous publiez tout, soit vous êtes un menteur. Il n'y a pas d'autre option. »", a:"dilemme"}] },
          { bons: [{t:"« Qu'est-ce qui vous retient de publier vos sources ? »", r:"« La peur qu'on m'attaque sur un détail, je l'avoue. »"},
                   {t:"« Si une erreur s'y glisse, vous pourrez la corriger publiquement : c'est un signe d'honnêteté, pas de faiblesse. »", r:"« Corriger une erreur… en public ? Intéressant. »"}],
            pieges: [{t:"« On vous a vu avec une montre de luxe : comment vous faire confiance sur quoi que ce soit ? »", a:"adhom"},
                     {t:"« Vous voulez cacher vos sources, donc cacher la vérité aux citoyens, donc vous méprisez la démocratie ! »", a:"paille"}] },
          { bons: [{t:"« Je comprends que vous vouliez gagner. Vous gagnerez plus durablement avec des électeurs qui vous font confiance. »", r:"« Durablement… C'est un mot qui plaît à un politicien. »"},
                   {t:"« Vous pourriez commencer par un seul meeting, avec les sources affichées à l'écran. »", r:"« Un essai, pourquoi pas. »"}],
            pieges: [{t:"« Depuis que vous êtes sénateur, les impôts ont augmenté : c'est bien la preuve que vous êtes le problème. »", a:"posthoc"},
                     {t:"« Un chanteur très engagé a dit que vous ne valiez rien : je lui fais confiance. »", a:"halo"}] }
        ]
      }
    },
    "🕵️": {
      remplissage: ["« Attends, je referme la fenêtre. »", "« J'ai imprimé tout ça cette nuit, d'ailleurs. »", "« Assieds-toi, il y a de la place sur le canapé. »", "« Ce post-it jaune, c'est le plus récent. »"],
      braque: ["« Je le savais : toi aussi, tu es avec eux. »", "« Évidemment, tu répètes ce qu'on t'a appris. »"],
      ouvert: ["« T'es le premier à m'écouter sans te moquer. »", "« Bon. Je vais te montrer un truc. »"],
      plaidoyer: {
        but: "Convaincs le Complotiste de vérifier une de ses infos avant de la partager.",
        tours: [
          { bons: [{t:"« On pourrait prendre une seule de tes infos et chercher ensemble ce qu'en disent plusieurs sources. »", r:"« Une seule ? …D'accord, mais c'est moi qui choisis. »"},
                   {t:"« Tu as raison de vouloir comprendre par toi-même. Vérifier, c'est justement aller jusqu'au bout de tes recherches. »", r:"« Aller jusqu'au bout… Personne ne m'avait dit ça comme ça. »"}],
            pieges: [{t:"« Tous les gens intelligents savent que ce sont des bêtises. »", a:"popu"},
                     {t:"« Toi, tu as perdu ton travail, c'est pour ça que tu racontes n'importe quoi. »", a:"adhom"}] },
          { bons: [{t:"« Qu'est-ce qui te ferait changer d'avis sur cette info ? »", r:"« Si je voyais les vraies données… pas celles de la télé. »"},
                   {t:"« Les données brutes sont souvent publiques : on peut les lire sans passer par la télé. »", r:"« Les données brutes ? Ça, je veux bien les voir. »"}],
            pieges: [{t:"« Si tu continues à croire ça, bientôt tu croiras que la Terre est plate et tu finiras seul dans une cave ! »", a:"pente"},
                     {t:"« Mon prof de sport dit que les complots n'existent jamais. Il a toujours raison. »", a:"halo"}] },
          { bons: [{t:"« Tu as le droit de te méfier des institutions. Mais se méfier de tout, c'est aussi se méfier de ses propres sources. »", r:"« …Même de mon site ? Hmm. »"},
                   {t:"« Si l'info est vraie, la vérifier la rendra plus solide. Tu n'as rien à perdre. »", r:"« Rien à perdre… C'est pas faux. »"}],
            pieges: [{t:"« Prouve-moi que ton site ne ment pas ! Tu ne peux pas ? Alors il ment. »", a:"preuve"},
                     {t:"« J'ai lu un article qui dit le contraire de toi. Un seul, mais ça suffit : tu as tort. »", a:"genehat"}] }
        ]
      }
    },
    "👔": {
      remplissage: ["« Merci d'avoir accepté cette interview. »", "« Notre siège est installé à Lyon depuis vingt ans. »", "« Nous employons 4 000 personnes dans le monde. »", "« Je vous laisse poser vos questions juste après. »"],
      braque: ["« Je crois que cette interview touche à sa fin. Une dernière chose, cependant. »", "« Nos avocats apprécieront le ton. »"],
      ouvert: ["« Entre nous, et sans micro… »", "« C'est une bonne question. Je vais essayer d'y répondre honnêtement. »"],
      plaidoyer: {
        but: "Convainquez la Directrice de publier le bilan carbone complet, site par site.",
        tours: [
          { bons: [{t:"« Un bilan complet, vérifié par un organisme indépendant, vous protégerait des accusations de greenwashing. »", r:"« Nous protéger… Le service juridique aimerait ça. »"},
                   {t:"« Vos résultats à Lyon sont réels et vérifiés : publiés avec le reste, ils montreront que vous savez progresser. »", r:"« C'est vrai que Lyon est un bon exemple. »"}],
            pieges: [{t:"« Tout le monde déteste les grandes entreprises : vous n'avez pas le choix. »", a:"popu"},
                     {t:"« Soit vous publiez tout demain, soit vous êtes des pollueurs sans cœur. »", a:"dilemme"}] },
          { bons: [{t:"« Qu'est-ce qui vous inquiète dans la publication du bilan complet ? »", r:"« Les mauvais chiffres de nos autres sites… et mon équipe. »"},
                   {t:"« Publier un mauvais chiffre avec un plan pour l'améliorer, c'est plus crédible qu'un bon chiffre isolé. »", r:"« Un plan à côté du chiffre… Ça se défend. »"}],
            pieges: [{t:"« Vous portez un tailleur de luxe : comment osez-vous parler d'écologie ? »", a:"adhom"},
                     {t:"« Si vous ne publiez pas, la planète sera détruite et ce sera entièrement de votre faute ! »", a:"pente"}] },
          { bons: [{t:"« Je comprends que vous craigniez pour votre poste. La transparence peut aussi devenir votre force face à la direction. »", r:"« Ma force… Je n'avais pas vu les choses comme ça. »"},
                   {t:"« Vous pourriez commencer par publier deux sites de plus cette année, avec les mêmes contrôles qu'à Lyon. »", r:"« Deux sites, c'est faisable. »"}],
            pieges: [{t:"« Vos concurrents ont publié leur bilan, et depuis leurs ventes ont augmenté : publier fait donc vendre. »", a:"posthoc"},
                     {t:"« Une influenceuse écolo très suivie dit que vous mentez : c'est forcément vrai. »", a:"halo"}] }
        ]
      }
    },
    "🧑‍🦳": {
      remplissage: ["« Assieds-toi, la nuit va être longue. »", "« Écoute le vent dans les colonnes de l'Agora. »", "« Ce livre orange m'accompagne depuis trente ans. »", "« Sophisuke, cesse de gigoter. »"],
      braque: ["« Tu frappes avant d'écouter. Encore. »", "« La colère t'aveugle, élève. »"],
      ouvert: ["« Bien. Tu écoutes. Continuons. »", "« Voilà une vraie question. »"],
      plaidoyer: {
        but: "Convaincs ton maître que tu sais penser par toi-même, même face à lui.",
        tours: [
          { bons: [{t:"« J'ai vérifié ce que dit ton livre orange sur les vaccins : voici ce que j'ai trouvé, et voici où je ne suis pas d'accord. »", r:"« Tu as vérifié… Bien. »"},
                   {t:"« Tu m'as appris à juger un argument sur ses preuves. Je l'applique, même à tes leçons. »", r:"« Hmph. Tu retiens ce qu'il faut. »"}],
            pieges: [{t:"« Tous tes anciens élèves pensent que tu te trompes. »", a:"popu"},
                     {t:"« Soit tu me laisses penser seul, soit tu es un mauvais maître. »", a:"dilemme"}] },
          { bons: [{t:"« Qu'est-ce qui te prouverait que je pense par moi-même ? »", r:"« Que tu me contredises… avec de bonnes raisons. »"},
                   {t:"« Je peux me tromper, et je te demanderai de me le dire. Mais je veux d'abord chercher seul. »", r:"« Chercher seul, se tromper, recommencer. C'est la voie. »"}],
            pieges: [{t:"« Tu es vieux, tes idées sont forcément dépassées. »", a:"adhom"},
                     {t:"« Sophisuke a quitté le dojo et il va très bien : la preuve que ton enseignement ne sert à rien. »", a:"genehat"}] },
          { bons: [{t:"« Tu as raison sur beaucoup de choses. C'est justement pour ça que je veux pouvoir le vérifier moi-même. »", r:"« …Voilà ce que je voulais entendre. »"},
                   {t:"« Je garderai tes leçons, et j'en ajouterai d'autres que j'aurai trouvées. »", r:"« Un élève qui enrichit la leçon du maître. Enfin. »"}],
            pieges: [{t:"« J'ai raison parce que je pense par moi-même, et je pense par moi-même parce que j'ai raison. »", a:"circulaire"},
                     {t:"« Prouve-moi que je ne pense pas par moi-même ! Tu ne peux pas ? Alors c'est réglé. »", a:"preuve"}] }
        ]
      }
    }
  }
};
