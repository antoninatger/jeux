# « Répare la Une ! » — Audit UX/UI & plan de corrections

Contexte : jeu de littératie médiatique (`index.html` + `app.js`/`app-en.js`), FR/EN, où
l'élève joue le rédacteur en chef et doit réécrire un titre anxiogène en choisissant de
meilleurs segments (attaque du titre / le fait / la chute), en s'appuyant sur des sources
consultables, pour faire baisser une jauge « émotion » (≤ 30) et monter une jauge
« précision & contexte » (≥ 70). Les jauges restent cachées jusqu'à la publication.
Projet lié aux autres jeux de la collection (self-data / éducation aux médias), mais
livré ici comme document indépendant.

Logique JS identique entre `app.js` (FR) et `app-en.js` (EN), seul le texte change : les
corrections ci-dessous s'appliquent donc aux deux fichiers.

---

## 1. UX — parcours et compréhension

### 1.1 [P0] Ping-pong de scroll à chaque tentative ratée
Ordre actuel dans le DOM : sources → brouillon → **slots de choix** → bouton Publier →
**jauges** → **feedback**. Quand la publication échoue, `publish()` fait un
`scrollIntoView` vers `#feedback`, situé *après* les slots. Pour corriger sa réponse,
le joueur doit remonter vers les slots, changer un choix, puis redescendre pour publier
à nouveau — à chaque tentative ratée.
→ **Corriger** : soit rapprocher visuellement le feedback des slots (ex. le repositionner
juste après les slots, avant les jauges), soit faire en sorte que le scroll d'échec ramène
le joueur vers le premier slot concerné plutôt que vers le message de feedback seul.

### 1.2 [P0] Sources non accessibles au clavier
`.source-hd` est un `<div>` avec `onclick`, sans `tabindex`, sans gestion clavier
(Entrée/Espace), sans `aria-expanded`. Un élève naviguant au clavier ou avec un lecteur
d'écran ne peut pas ouvrir les sources.
→ **Corriger** : utiliser un vrai `<button>` (ou ajouter `role="button"`, `tabindex="0"`,
gestion `keydown` Entrée/Espace) + `aria-expanded="true/false"` mis à jour au clic.

### 1.3 [P1] Règle des étoiles jamais expliquée
Le score en étoiles dépend du nombre de tentatives et du fait d'avoir lu toutes les
sources (1er coup + tout lu = 3⭐, 1er ou 2e coup = 2⭐, au-delà = 1⭐), mais rien dans le
brief d'introduction ne l'explique. Le joueur découvre les étoiles seulement via le HUD
(`⭐ 0`), sans comprendre ce qui les fait varier, à part un indice partiel affiché
uniquement en cas de réussite du premier coup sans sources lues.
→ **Corriger** : ajouter une ligne dans le brief d'intro (`#intro .brief`) expliquant la
règle : lire les sources avant de publier et réussir du premier coup rapporte le plus
d'étoiles.

### 1.4 [P1] Sélection par défaut visuellement ambiguë
Au chargement d'un niveau, `sel` pointe sur l'option 0 de chaque slot (le segment le plus
sensationnaliste, proche du titre original), mais cette option porte déjà la classe `.sel`
avec l'icône ✏️. Le joueur peut croire qu'un choix a déjà été fait pour lui ou qu'il s'agit
d'une bonne réponse pré-cochée.
→ **Corriger** : ne pas appliquer le style « sélectionné » (bordure + ✏️) tant que le
joueur n'a pas cliqué au moins une fois sur un slot donné, ou utiliser un style neutre
distinct pour l'état par défaut.

### 1.5 [P1] Segment fautif non mis en évidence dans l'interface
Quand un « trap » se déclenche (segment contredisant les sources), le message cite le
texte du segment entre guillemets, mais rien n'est mis en évidence visuellement dans les
slots eux-mêmes : le joueur doit relire tous les groupes d'options pour identifier lequel
correspond au texte cité.
→ **Corriger** : ajouter une bordure/couleur d'alerte temporaire sur le bouton `.opt`
concerné quand le feedback d'échec s'affiche.

### 1.6 [P2] Pas de récapitulatif par titre en fin de partie
`endGame()` affiche un score total et un message générique, mais aucun détail par niveau
(quels titres ont été réussis du premier coup, lesquels ont nécessité plusieurs
tentatives, sources lues ou non) — utile en contexte de classe pour revenir sur les
erreurs types avec les élèves.
→ **Ajouter** : un petit récapitulatif ligne par ligne (1 titre = 1 ligne avec son nombre
d'étoiles) sous le score final.

---

## 2. UI — accessibilité et rendu visuel

### 2.1 [P1] États de sélection non exposés aux lecteurs d'écran
Les boutons `.opt` n'ont pas d'`aria-pressed` : l'état sélectionné n'est perceptible que
visuellement (bordure + icône), pas annoncé par un lecteur d'écran.
→ **Corriger** : ajouter `aria-pressed="true/false"` mis à jour au clic sur chaque `.opt`.

### 2.2 [P1] Changements dynamiques non annoncés
L'apparition du feedback (`#feedback`) et des jauges (`#gauges`) après publication n'est
pas signalée aux lecteurs d'écran (pas de zone live).
→ **Corriger** : ajouter `aria-live="polite"` sur `#feedback` et `#gauges`.

### 2.3 [P2] Contraste à vérifier sur le texte discret
Le texte "muted" (`--mu:#857a64`) sur fonds clairs (`--bg`/`--panel`) est utilisé pour des
libellés très petits (`0.62rem` à `0.78rem` : metas de journal, titres de section,
indices sous les jauges). À vérifier précisément avec un outil de contraste (risque de ne
pas atteindre le seuil WCAG AA pour du texte aussi petit).
→ **Vérifier et ajuster** la couleur ou la taille si besoin.

### 2.4 [P2] Cible tactile un peu juste sur les options courtes
Les boutons `.opt` à texte court sur une seule ligne (ex. juste un point « . », ou
« TRAGIQUE : ») avec `padding:10px 13px` et `font-size:.86rem` arrivent autour de 38-40px
de hauteur, sous la recommandation usuelle de 44px pour une cible tactile.
→ **Corriger** : ajouter un `min-height` (ex. 44px) sur `.opt`.

### 2.5 [P2] Risque de chevauchement du bouton retour flottant
`.back-hub` est en `position:fixed` (haut-gauche, `z-index:9999`) par-dessus tout le
contenu, alors que le `<header>` est centré avec peu de marge sur petit écran — risque de
chevauchement avec le `h1` sur téléphones étroits.
→ **Vérifier** sur un vrai petit écran (ex. 320-360px de large) et ajuster si besoin
(marge de sécurité en haut du header, ou repositionner le bouton).

### 2.6 [P2 — à confirmer] Attribut `lang` figé sur "fr"
`<html lang="fr">` est codé en dur dans `index.html`, alors que la page peut basculer en
anglais via `i18n.js`. Sans accès à `i18n.js`, impossible de confirmer si l'attribut
`lang` est mis à jour dynamiquement au changement de langue.
→ **À vérifier** dans `i18n.js` : si `lang` n'est pas mis à jour, l'ajouter (impact
accessibilité : prononciation correcte par les lecteurs d'écran, et signalement correct
aux moteurs de recherche/traducteurs).

---

## 3. Points positifs déjà en place (à ne pas casser)

- `@media (prefers-reduced-motion: reduce)` déjà géré globalement.
- Pas de `maximum-scale` bloquant le zoom pincé — bon réflexe d'accessibilité déjà présent.
- Styles `:focus-visible` déjà définis globalement pour boutons/liens/inputs.
- Bonne structure sémantique générale (vrais `<button>` pour les options de jeu et les
  actions principales).

---

## 4. Plan de correction priorisé (résumé)

**P0 — à corriger en premier**
1. Éliminer le ping-pong de scroll entre feedback et slots (1.1).
2. Rendre les en-têtes de sources accessibles au clavier (1.2).

**P1 — important**
3. Expliquer la règle des étoiles dans le brief d'intro (1.3).
4. Neutraliser le style "sélectionné" par défaut tant que le joueur n'a pas choisi (1.4).
5. Mettre en évidence le segment fautif dans les slots (1.5).
6. Ajouter `aria-pressed` sur les options (2.1).
7. Ajouter `aria-live="polite"` sur feedback/jauges (2.2).

**P2 — amélioration**
8. Récapitulatif par titre en fin de partie (1.6).
9. Vérifier/ajuster le contraste des textes discrets (2.3).
10. Ajuster la hauteur minimale des boutons d'options courtes (2.4).
11. Vérifier le chevauchement du bouton retour flottant sur petit écran (2.5).
12. Vérifier la mise à jour de l'attribut `lang` dans `i18n.js` (2.6).
