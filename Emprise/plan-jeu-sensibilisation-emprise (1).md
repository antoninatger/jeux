# Plan de travail — Jeu interactif de sensibilisation aux mécanismes d'emprise

## Contexte
Le fichier fourni (`texto_total.html`) est un mock de conversation fictive (Sophie/Lucas) qui illustre déjà, sans le nommer, une vraie progression de mécanismes d'emprise :

1. **Love bombing** (8 mars) — déclarations d'amour excessives et précoces
2. **Premiers tests de disponibilité** (9 mars) — demande de présence immédiate, retrait soudain
3. **Culpabilisation douce / chantage affectif** (15 mars) — "je m'ennuie sans toi"
4. **Induction de jalousie / mise en garde floue** (11 mars) — "attention à la jalousie que tu attires"
5. **Contrôle social déguisé en inquiétude** (19 mars) — le like Instagram, "je dis ça pour ton image"
6. **Gaslighting** (mercredi) — nier les changements d'humeur, "tu te fais des films"
7. **Isolement des ami·e·s** (20 mars) — dénigrement de Cléa, "elle est jalouse"
8. **Dévalorisation physique déguisée en compliment** (22 mars) — le t-shirt "qui fait grossir"
9. **Crise de contrôle + culpabilisation + excuse par l'amour** (23 mars) — cycle tension/explosion/réconciliation
10. **Isolement géographique total / dépendance financière** (12 juin) — déménagement imposé, "tu n'auras plus besoin de travailler"

C'est une base narrative solide : le travail consiste surtout à **rendre visibles ces mécanismes** sans les nommer trop tôt (pour ne pas infantiliser le joueur) et à faire vivre une expérience où le joueur doit exercer son propre jugement.

---

## 1. Objectifs pédagogiques

- Aider le joueur à **repérer en temps réel** les signaux d'alerte plutôt que de les lire a posteriori dans un article.
- Éviter deux écueils fréquents des outils de sensibilisation :
  - **La leçon de morale** (trop explicite, le joueur se sent jugé et décroche)
  - **La banalisation** (jeu trop léger qui minimise la gravité du sujet)
- Donner un vocabulaire (love bombing, gaslighting, isolement, etc.) que le joueur pourra réutiliser pour nommer ce qu'il vit ou observe autour de lui.
- Terminer sur des ressources d'aide concrètes, pas seulement sur un score.

## 2. Mécanique de jeu proposée

**Format recommandé : "repérage en direct" + bilan par thème**, plus engageant qu'un simple quiz après coup.

- Le chat se déroule message par message, comme aujourd'hui.
- À certains messages clés (déjà identifiables dans le script), le jeu **met en pause** et demande au joueur : *"Qu'est-ce qui se joue ici ?"* avec 3-4 propositions (une correcte, des distracteurs plausibles — pas des pièges absurdes).
- Après réponse : feedback court, non moralisateur, qui nomme le mécanisme et explique *pourquoi* c'est un signal d'alerte (pas juste "bonne/mauvaise réponse").
- Un **indicateur de vigilance** discret se remplit au fil du jeu (pas un "score" compétitif — plutôt une jauge "signaux repérés / signaux totaux").
- À la fin : écran de bilan qui reprend la frise chronologique complète avec chaque mécanisme identifié, + ressources d'aide.
- Option secondaire (si vous voulez aller plus loin) : à 2-3 moments, laisser le joueur choisir **la réponse de Sophie** parmi plusieurs options, et montrer comment Lucas réagit différemment — pour illustrer que ce n'est jamais "la faute" de la réponse, le mécanisme se referme quoi qu'il arrive.

## 2bis. Mécanique retenue : texte libre + correspondance par mots-clés (sans IA en jeu)

Décision : le joueur tape librement ce qu'il a repéré, et la réponse est évaluée par une **banque de mots-clés/expressions organisée en clusters de sens**, pas par une IA en direct. Avantages : 100% statique, gratuit, instantané, fonctionne hors-ligne, comportement prévisible et testable.

### Principe de correspondance

Pour chaque checkpoint, on ne définit pas une liste plate de mots-clés, mais **plusieurs clusters**, chacun représentant une façon différente de nommer le même mécanisme. Une réponse est "reconnue" si elle touche **au moins un cluster du bon mécanisme**.

```js
{
  checkpointId: "chk_isolement_clea",
  mechanism: "isolement_amis",
  clusters: [
    {
      label: "isolement (vocabulaire direct)",
      terms: ["isol", "coup", "loign", "eloign", "separ", "distance", "l'ecarte", "l ecarte"]
    },
    {
      label: "dénigrement de l'entourage",
      terms: ["denigr", "rabaisse cle", "critique cle", "dit du mal de cle", "monte contre cle"]
    },
    {
      label: "accusation de jalousie projetée",
      terms: ["accuse cle de jalous", "dit qu'elle est jalouse", "fait passer cle pour jalouse", "rejette la faute sur cle"]
    },
    {
      label: "formulation libre équivalente",
      terms: ["veut plus qu'elle voit ses amies", "veut la garder pour lui", "juste nous deux", "seul avec lui"]
    }
  ],
  // clusters qui indiquent une lecture erronée fréquente -> feedback ciblé, pas juste "faux"
  misreadings: [
    {
      label: "lecture 'inquiétude légitime'",
      terms: ["inquiet pour elle", "juste protecteur", "il l'aime c'est normal", "il a raison"],
      feedback: "C'est ce que Lucas veut faire croire — mais dénigrer systématiquement les proches sans fait concret, ça sert surtout à isoler, pas à protéger."
    }
  ]
}
```

### Normalisation avant comparaison (indispensable en français)

Avant de comparer, appliquer systématiquement :
- minuscules
- suppression des accents (NFD + strip des diacritiques)
- suppression de la ponctuation
- espaces multiples réduits à un seul

```js
function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
```

Les `terms` doivent être écrits **sans accents** et de préférence en **radicaux tronqués** (`"isol"` plutôt que `"isole"`) pour absorber automatiquement isole / isolé / isolement / isolant / isolait, via un simple `includes()` sur la chaîne normalisée — pas besoin de stemmer NLP complexe.

### Algorithme de scoring

```js
function evaluateAnswer(rawText, checkpoint) {
  const text = normalize(rawText);
  const hitClusters = checkpoint.clusters.filter(c =>
    c.terms.some(term => text.includes(normalize(term)))
  );
  if (hitClusters.length > 0) {
    return { recognized: true, matchedClusters: hitClusters.map(c => c.label) };
  }
  const misread = checkpoint.misreadings?.find(m =>
    m.terms.some(term => text.includes(normalize(term)))
  );
  if (misread) {
    return { recognized: false, targetedFeedback: misread.feedback };
  }
  return { recognized: false, targetedFeedback: null }; // -> fallback générique, cf. ci-dessous
}
```

### Filet de sécurité

Même avec des centaines de variantes couvertes, du texte libre ratera toujours des formulations imprévues. Prévoir :
- Si aucune correspondance après une tentative : afficher un **indice** ("Regarde comment Lucas parle de Cléa juste avant") et laisser retenter.
- Après 2 échecs : proposer les options QCM en repli, pour ne jamais bloquer la progression du joueur.
- Toujours logger (localement, pas en ligne) les réponses non reconnues pendant les tests, pour enrichir la banque de mots-clés après coup.

### Méthode pour construire une banque large (le fameux "tester des centaines de réponses")

C'est un travail d'**authoring hors-ligne**, avant de figer le jeu — pas un système qui tourne en jeu :

1. Pour chaque checkpoint, faire brainstormer un grand nombre de formulations plausibles (une IA — Claude — est un excellent outil *pour cette étape offline*, en lui donnant le message concerné et en lui demandant "liste 40 façons différentes dont un joueur pourrait décrire ce qui se passe ici, y compris des formulations vagues, familières, ou avec fautes courantes").
2. Regrouper ces formulations en clusters de sens (comme ci-dessus), et en extraire les radicaux/mots-clés communs.
3. Écrire un **script de test** (`test-checkpoints.js`) qui fait tourner ces centaines de phrases-exemples contre `evaluateAnswer()` et rapporte le taux de reconnaissance par checkpoint.
4. Itérer : les phrases non reconnues indiquent soit un cluster manquant, soit un radical trop restrictif.
5. Une fois le taux de reconnaissance jugé satisfaisant (ex. >90% des phrases-tests plausibles), les clusters sont figés dans le jeu final — statique, rapide, sans dépendance externe.

Ce test peut être demandé directement à Claude Code : *"génère 30 formulations réalistes et variées pour ce checkpoint, teste-les contre la banque de mots-clés actuelle, indique celles qui échouent"*.

## 3. Structuration du contenu (le plus gros du travail)

Chaque message du script doit être enrichi de métadonnées. Exemple de structure cible :

```js
{
  who: "them",
  name: "Lucas 💬",
  text: "...",
  time: "...",
  status: "read",
  mechanism: "isolement",        // null si message neutre
  checkpoint: true,               // déclenche une question à ce moment
  question: "Qu'est-ce que Lucas est en train de faire ?",
  choices: [
    { text: "Il exprime une inquiétude légitime pour son amie", correct: false },
    { text: "Il isole Sophie de ses amies en les dévalorisant", correct: true },
    { text: "Il plaisante", correct: false }
  ],
  explanation: "Décrédibiliser les proches (« elle est jalouse », « elle veut te séparer de moi ») est une stratégie classique d'isolement : cela coupe la personne de ses sources de soutien externe et de regard extérieur sur la relation."
}
```

Taxonomie des mécanismes à tagger (basée sur le contenu existant) :
- `love_bombing`
- `culpabilisation`
- `chantage_affectif`
- `jalousie_induite`
- `controle_social` (réseaux sociaux, image, réputation)
- `gaslighting`
- `isolement_amis`
- `devalorisation`
- `cycle_tension_reconciliation`
- `isolement_geographique` / `dependance_financiere`

**Étape de travail concrète** : reprendre les ~90 messages et déterminer, pour chacun, s'il porte un mécanisme et lequel. C'est un travail éditorial que vous pouvez faire vous-même (vous connaissez le sujet) ou déléguer à Claude Code avec une consigne du type *"propose un tag pour chaque message, je validerai ensuite"* — mais une relecture humaine reste importante vu la sensibilité du sujet.

## 4. Architecture technique (en gardant la base existante)

- **Garder** : le rendu de chat, le style, l'export PNG (ils fonctionnent bien et donnent un rendu crédible).
- **Ajouter** :
  - Un state machine simple (vanilla JS suffit, pas besoin de framework) : `idle → affichage progressif des messages → pause sur checkpoint → question → feedback → reprise`.
  - Un composant "question" (overlay ou carte sous le chat) avec les choix cliquables.
  - Une jauge de progression / vigilance.
  - Un écran de bilan final (frise chronologique + mécanismes + ressources).
  - Un bouton "rejouer" et éventuellement un mode "lecture libre" (défiler sans les questions, pour ceux qui veulent juste (re)lire l'histoire).
- **Accessibilité** : navigation clavier pour les choix, contraste suffisant, pas de dépendance uniquement à la couleur pour signaler bonne/mauvaise réponse.

## 5. Précautions de contenu (important vu le sujet)

- **Message d'avertissement en amont** (trigger warning doux) : préciser que le contenu aborde des mécanismes de contrôle et d'emprise dans le couple, et que le jeu peut faire écho à un vécu personnel.
- **Ressources d'aide visibles à la fin** (et idéalement accessibles à tout moment via un petit lien discret) :
  - **3919** — Violences Femmes Info (écoute anonyme et gratuite, France)
  - Un numéro/site équivalent pertinent selon le public visé (à adapter si le jeu n'est pas destiné à un public français)
- Éviter tout ton ludique/léger sur les feedbacks (pas d'émojis "victoire", pas de musique entraînante sur les moments de crise).
- Garder le filigrane "FICTION" déjà présent — bonne pratique à conserver.

## 6. Découpage en tâches pour Claude Code

1. **Phase 1 — Modèle de données** : reprendre le script existant, identifier les checkpoints et taguer chaque message pertinent avec `mechanism` + `explanation` (proposer un premier jet, à valider).
2. **Phase 2 — Banques de mots-clés** : pour chaque checkpoint, générer les clusters de formulations (cf. section 2bis), écrire `evaluateAnswer()` + `normalize()`, puis générer un jeu de phrases-tests (30-50 par checkpoint) et itérer jusqu'à un bon taux de reconnaissance.
3. **Phase 3 — Moteur de jeu** : implémenter la pause/reprise sur checkpoint, le champ de texte libre, l'appel à `evaluateAnswer()`, le feedback (ciblé ou générique), le repli QCM après 2 échecs, la jauge de progression.
4. **Phase 4 — Écran de bilan** : frise récapitulative + mécanismes identifiés + ressources d'aide.
5. **Phase 5 — Habillage** : avertissement initial, mode lecture libre, polish visuel (garder l'identité graphique actuelle du mock).
6. **Phase 6 — Test et relecture de contenu** : relire chaque explication pédagogique pour vérifier qu'elle est juste, non culpabilisante envers "Sophie", et centrée sur les comportements de "Lucas" ; revalider le taux de reconnaissance des banques de mots-clés avec des phrases nouvelles non utilisées à l'entraînement.

## 7. Point de vigilance éditorial

Un piège fréquent dans ce type de contenu : faire porter, même involontairement, une part de responsabilité à la victime ("Sophie n'aurait pas dû..."). Toutes les questions et explications devraient rester centrées sur **ce que fait Lucas** et sur les mécanismes eux-mêmes, jamais sur ce que Sophie "aurait pu faire différemment".

---

Ce plan peut être transmis tel quel à Claude Code, phase par phase (commencer par la Phase 1 est recommandé, car le tagging conditionne tout le reste).
