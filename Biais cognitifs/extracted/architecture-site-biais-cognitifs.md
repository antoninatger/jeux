# Architecture — Site "Catalogue des Biais Cognitifs"

Document de spécification à transmettre tel quel à Claude (ou Claude Code) pour développement.

---

## 1. Objectif du site

Un site de référence recensant les biais cognitifs, où chaque biais dispose d'une **fiche autonome** contenant :
1. Une **définition** claire et sourcée
2. **1 à 3 exemples** concrets (vie quotidienne, entreprise, actualité, etc.)
3. Un **mini-QCM** (2 à 4 questions) pour tester la compréhension
4. Les **sources scientifiques** (étude ou auteur ayant décrit/découvert le biais)

Le site doit permettre de parcourir, filtrer, rechercher et apprendre progressivement.

---

## 2. Arborescence des pages

```
/                        → Accueil : intro + biais du jour/aléatoire + accès aux catégories
/biais                   → Liste complète (recherche + filtres par catégorie)
/biais/[slug]            → Fiche d'un biais (définition, exemples, QCM, sources)
/categories              → Liste des catégories de biais
/categories/[slug]       → Biais d'une catégorie donnée
/quiz                     → Mode "quiz global" (pioche aléatoire parmi tous les QCM)
/a-propos                → Méthodologie, sources générales, disclaimer scientifique
```

Composants transverses : barre de recherche (nom + synonymes), filtres (catégorie, niveau de difficulté), badge "biais découvert/lu" si un suivi de progression est souhaité (localStorage).

---

## 3. Modèle de données (1 fichier JSON par biais, ou 1 base unique)

Structure recommandée — un objet par biais, stockable dans un fichier `biais.json` ou en base de données :

```json
{
  "id": "biais-confirmation",
  "nom": "Biais de confirmation",
  "nom_anglais": "Confirmation bias",
  "categorie": "Biais de croyance et de raisonnement",
  "difficulte": "facile",
  "definition_courte": "Tendance à privilégier, rechercher et interpréter les informations qui confirment ses croyances préexistantes, tout en négligeant celles qui les contredisent.",
  "definition_longue": "Texte plus développé, 4-6 phrases, expliquant le mécanisme cognitif, pourquoi il existe (économie cognitive, protection de l'ego, etc.) et ses conséquences.",
  "exemples": [
    {
      "titre": "Débat politique",
      "texte": "Une personne convaincue qu'une politique économique est mauvaise ne retient que les statistiques qui vont dans ce sens et ignore celles qui la contredisent."
    },
    {
      "titre": "Recrutement",
      "texte": "Un recruteur qui a un a priori positif sur un candidat interprète ses réponses ambiguës en entretien de façon favorable."
    },
    {
      "titre": "Santé",
      "texte": "Une personne persuadée qu'un remède fonctionne attribue toute amélioration à ce remède et toute absence d'effet à d'autres causes."
    }
  ],
  "qcm": [
    {
      "question": "Le biais de confirmation se manifeste principalement par :",
      "choix": [
        "La recherche active d'informations contradictoires",
        "La recherche et la valorisation d'informations qui confirment une croyance",
        "L'oubli total d'une croyance après un contre-exemple",
        "Un raisonnement toujours neutre et rationnel"
      ],
      "bonne_reponse": 1,
      "explication": "Le biais pousse à privilégier ce qui conforte nos idées, pas à les remettre en cause."
    }
  ],
  "identification": {
    "situation": "Léa est persuadée que les personnes nées en janvier sont plus déterminées. Depuis, elle remarque et retient chaque exemple qui va dans ce sens, et oublie aussitôt les contre-exemples qu'elle croise pourtant tout aussi souvent.",
    "reponses_acceptees": ["biais de confirmation", "confirmation bias", "biais confirmatoire"],
    "indice": "Pense à ce qu'elle fait de l'information qui la contredit."
  },
  "sources": [
    {
      "auteurs": "Wason, P. C.",
      "annee": 1960,
      "titre": "On the failure to eliminate hypotheses in a conceptual task",
      "revue": "Quarterly Journal of Experimental Psychology, 12(3), 129-140",
      "type": "étude fondatrice",
      "lien": "https://doi.org/10.1080/17470216008416717"
    },
    {
      "auteurs": "Nickerson, R. S.",
      "annee": 1998,
      "titre": "Confirmation bias: A ubiquitous phenomenon in many guises",
      "revue": "Review of General Psychology, 2(2), 175-220",
      "type": "revue de synthèse",
      "lien": "https://doi.org/10.1037/1089-2680.2.2.175"
    }
  ],
  "biais_lies": ["biais-ancrage", "effet-halo", "biais-retrospectif"]
}
```

### Champs à retenir pour le schéma (résumé)
| Champ | Type | Description |
|---|---|---|
| `id` / `slug` | string | identifiant URL |
| `nom`, `nom_anglais` | string | |
| `categorie` | string (clé vers table catégories) | |
| `difficulte` | enum: facile / intermédiaire / avancé | pour filtrage |
| `definition_courte` | string (1-2 phrases, pour les listes/cards) | |
| `definition_longue` | string (fiche détaillée) | |
| `exemples` | array (1 à 3 objets `titre` + `texte`) | |
| `qcm` | array de questions (voir §5) | |
| `identification` | objet (voir §6) : situation + réponses acceptées + indice | exercice "trouve le nom du biais" |
| `sources` | array de références scientifiques (voir §7) | |
| `biais_lies` | array d'ids | suggestions de biais proches, en bas de fiche |

---

## 4. Catégories proposées

Une classification simple et pédagogique (inspirée des typologies usuelles, à adapter) :

1. **Biais de croyance et de raisonnement** (confirmation, rétrospectif, faux consensus…)
2. **Biais liés à la mémoire** (disponibilité, effet de récence, biais de négativité…)
3. **Biais sociaux et relationnels** (halo, autorité, conformisme, biais endogroupe…)
4. **Biais de décision et d'estimation** (ancrage, aversion à la perte, statu quo, coût irrécupérable…)
5. **Biais liés à la surconfiance** (Dunning-Kruger, excès de confiance, illusion de contrôle…)
6. **Biais liés à la perception du temps/des probabilités** (biais d'optimisme, escompte temporel, gambler's fallacy…)

---

## 5. Format du mini-QCM

- 2 à 4 questions par biais
- Format QCM classique : 1 question, 4 propositions, 1 seule bonne réponse
- Chaque question doit avoir une **explication pédagogique** affichée après la réponse (pourquoi c'est vrai/faux)
- Possibilité d'un score en fin de fiche ("2/3 bonnes réponses") sans nécessiter de compte utilisateur (stockage local)
- Idéalement, varier les formats de questions :
  - Reconnaissance de définition
  - Identification du biais dans une mise en situation
  - Distinction entre deux biais proches (piège classique)

---

## 6. Format de l'exercice d'identification libre ("Trouve le biais")

Un second type d'exercice, plus exigeant que le QCM : l'utilisateur lit une situation où **le nom du biais n'apparaît jamais**, et doit **taper lui-même** le nom du biais concerné (pas de choix à reconnaître dans une liste).

### Pourquoi c'est différent du QCM
Le QCM teste la reconnaissance ("je sais reconnaître la bonne réponse parmi 4"). L'identification libre teste le rappel actif ("je sais retrouver le concept sans indice visuel") — c'est un niveau d'apprentissage plus profond, à proposer en complément, pas en remplacement du QCM.

### Modèle de données (champ `identification`, voir §3)
```json
{
  "situation": "Texte de mise en situation, sans jamais nommer le biais ni utiliser un mot trop proche du nom.",
  "reponses_acceptees": ["biais de confirmation", "confirmation bias", "biais confirmatoire"],
  "indice": "Indice optionnel, affiché après un premier essai incorrect."
}
```

### Logique de validation (à implémenter côté client)
La réponse tapée doit être normalisée avant comparaison, pour ne pas pénaliser des variantes légitimes :
1. Passage en minuscules, suppression des accents et de la ponctuation
2. Suppression des préfixes usuels ("biais de", "biais du", "biais d'", "effet")
3. Comparaison à la liste `reponses_acceptees` (elle-même normalisée)
4. Tolérance aux fautes de frappe : distance de Levenshtein ≤ 2 (ou ≤ 20% de la longueur du mot) acceptée comme correcte

Exemple : "Biais De Confirmation", "confirmation", "biais confirmatoir" (faute de frappe) doivent tous être acceptés ; "biais d'ancrage" doit être refusé.

### Comportement UX proposé
- Champ de saisie libre + bouton "Valider" (et validation au clavier avec Entrée)
- 1er essai incorrect → message neutre ("Pas encore. Un indice ?") + affichage de l'`indice`
- 2e essai incorrect → révélation du nom exact du biais + lien direct vers sa fiche complète
- Bonne réponse (à tout essai) → confirmation + courte explication de pourquoi
- Pas de pénalité punitive : l'objectif est l'apprentissage, pas la sanction

### Où l'intégrer dans le site
- Dans chaque fiche de biais, en complément du QCM (section "Testez-vous autrement")
- Dans un **mode dédié** `/identification` (ou intégré à `/quiz`) : pioche aléatoire de situations parmi tous les biais, sans indiquer la catégorie — c'est l'exercice le plus proche d'un usage réel ("je lis une situation dans la vraie vie, je dois nommer le biais")

---

## 7. Format des sources scientifiques

Pour chaque biais, viser :
- **1 source "fondatrice"** : l'étude ou l'auteur qui a défini/découvert le biais (ex. Tversky & Kahneman 1974 pour l'heuristique de disponibilité et l'ancrage, Festinger 1957 pour la dissonance cognitive, Ross 1977 pour l'erreur fondamentale d'attribution)
- **1 source de synthèse** (optionnelle) : article de revue plus récent, pour donner un état de l'art

Format bibliographique conseillé (APA simplifié) :
`Auteur(s), Initiale. (Année). Titre. Revue, volume(numéro), pages.`

⚠️ Point de vigilance à transmettre à Claude Code : lors du remplissage effectif du contenu, il faudra **vérifier chaque référence** (années, revues, DOI) plutôt que de faire confiance à la mémoire du modèle, certaines études étant citées de façon approximative dans la culture populaire du sujet.

---

## 8. Direction UI/UX

**Concept : le laboratoire de perception.** Plutôt que de décrire les biais de l'extérieur (registre "catalogue/collection", trop proche d'un pattern visuel déjà très vu), le site fait *vivre* un biais dès la page d'accueil, avant toute définition — mais via une vraie démonstration comportementale plutôt qu'un effet visuel : une question directe ("Comment évalues-tu tes compétences de conducteur, par rapport à la moyenne ?"), suivie d'une révélation statistique (environ 80% des gens se classent au-dessus de la moyenne — statistiquement impossible). C'est l'effet de supériorité illusoire, documenté par Svenson (1981). Le visiteur vient de se prendre en flagrant délit avant même d'avoir lu une définition — sans recourir à un tour visuel dont l'effet est difficile à garantir selon les écrans.

Un mockup HTML fonctionnel est fourni séparément (`mockup-ui-biais-cognitifs.html`) : hero avec auto-démonstration interactive (question + révélation statistique), vue catalogue (grille de "nuanciers"), vue fiche détaillée (définition, exemples, QCM avec feedback en anneau scanné), et vue "Trouve le biais" (identification libre), à utiliser comme référence directe pour l'intégration.

### Tokens de design

**Couleurs**
| Rôle | Valeur |
|---|---|
| Fond | `#E7EAF0` (gris-bleu froid clair) |
| Fond profond (hero, contraste illusion) | `#10131C` |
| Surface carte | `#FFFFFF` |
| Bordure | `#C9CEDA` |
| Accent primaire (liens, boutons, validation QCM) | `#2B4CFF` (cobalt) |
| Accent secondaire (highlight, bande identification) | `#D6FF3F` (citron-vert) |
| Erreur | `#FF4D6D` (framboise) |
| Validation QCM | `#17B890` (teal) |
| Texte principal | `#10131C` |
| Texte atténué | `#565B66` |

Couleur de catégorie (coin de carte façon nuancier peinture) : Croyance `#2B4CFF` · Mémoire `#7A5CFA` · Social `#FF6FA5` · Décision `#17B890` · Surconfiance `#FF9F1C`.

**Typographie**
- Display (titres) : **Space Grotesk** — sans géométrique avec du caractère (traitement du "y"/"G"), utilisé pour titres et labels
- Corps de texte long (définitions) : **Source Serif 4** — volontairement l'inverse du pairing habituel (serif display / sans body), pour une lecture confortable des définitions
- Utilitaire (métadonnées, sources, éléments courts) : **JetBrains Mono**

**Layout**
- Hero : question d'auto-évaluation interactive en ouverture (boutons de choix), révélation immédiate qui retourne la réponse contre le visiteur, sur fond sombre isolé du reste de la page (rupture de ton volontaire)
- Vue catalogue : grille de cartes blanches type "nuancier", bande de couleur en haut (catégorie), titre, accroche en italique, catégorie + difficulté en pied de carte
- Vue fiche : bande de couleur fine en haut de carte (pas de tampon ni d'étiquette), sections séparées par des labels sans-serif avec ligne de fuite, exemples marqués d'un simple point de couleur, QCM avec anneau de feedback qui se résout en check/croix
- Vue identification libre : carte isolée avec bande citron-vert, champ de saisie + validation, indice progressif

**Interaction / mouvement**
- Survol des cartes : légère élévation + ombre portée douce (pas de changement de bordure façon "carte à jouer")
- Réponse au QCM : anneau qui grossit avec un effet de rebond (`cubic-bezier` overshoot) et se fixe en check (vert) ou croix (framboise) — évoque un scan plutôt qu'un tampon administratif
- `prefers-reduced-motion` respecté
- Focus clavier visible (`outline` cobalt) sur tous les éléments interactifs

**Accessibilité / responsive**
- Grille en `auto-fill` : passe naturellement de 4-5 colonnes à 1 colonne sur mobile ; hero repasse en une colonne sous 640px
- Contraste texte/fond vérifié pour AA
- Boutons de choix et champ d'identification navigables au clavier (Tab + Entrée)

---

## 9. Stack technique suggérée

- **Frontend** : Next.js (ou simple site statique HTML/CSS/JS si volume raisonnable) — permet des routes `/biais/[slug]` propres et un bon référencement
- **Contenu** : fichiers JSON ou Markdown+frontmatter (un fichier par biais), lus au build → facilite l'ajout de nouveaux biais sans toucher au code
- **Recherche** : recherche côté client (ex. lib `Fuse.js`) sur nom, synonymes, définition courte
- **Style** : sobre, lisible, un système de badges de couleur par catégorie
- **QCM** : composant réutilisable prenant en props un tableau de questions (cf. schéma §5)
- **Progression utilisateur** : `localStorage` (biais lus, scores aux QCM) — pas besoin de backend/compte pour une v1

---

## 10. Fonctionnalités transverses

- Recherche instantanée (nom + synonymes)
- Filtres par catégorie et niveau de difficulté
- "Biais aléatoire" (bouton sur l'accueil)
- Fiches liées ("biais souvent confondus avec celui-ci")
- Mode quiz global piochant dans toutes les fiches
- Page "méthodologie" expliquant comment les sources ont été sélectionnées (transparence scientifique)

---

## 11. Liste de départ de biais à couvrir (par catégorie, avec source de référence indicative)

> À vérifier/compléter précisément lors de la rédaction — liste de cadrage, pas garantie exhaustive.

**Croyance et raisonnement**
- Biais de confirmation — Wason (1960)
- Biais rétrospectif ("je le savais depuis le début") — Fischhoff (1975)
- Dissonance cognitive — Festinger (1957)
- Erreur fondamentale d'attribution — Ross (1977)
- Biais de faux consensus — Ross, Greene & House (1977)

**Mémoire**
- Heuristique de disponibilité — Tversky & Kahneman (1973)
- Biais de négativité — Rozin & Royzman (2001)
- Effet de récence / primauté — Murdock (1962)

**Social et relationnel**
- Effet de halo — Thorndike (1920)
- Biais d'autorité — Milgram (1963)
- Conformisme — Asch (1951)
- Biais endogroupe (in-group bias) — Tajfel (1970)

**Décision et estimation**
- Ancrage — Tversky & Kahneman (1974)
- Aversion à la perte — Kahneman & Tversky (1979), théorie des perspectives
- Biais du coût irrécupérable (sunk cost) — Arkes & Blumer (1985)
- Biais de statu quo — Samuelson & Zeckhauser (1988)

**Surconfiance**
- Effet Dunning-Kruger — Kruger & Dunning (1999)
- Excès de confiance (overconfidence) — Fischhoff, Slovic & Lichtenstein (1977)
- Illusion de contrôle — Langer (1975)

**Temps et probabilités**
- Biais d'optimisme — Weinstein (1980)
- Sophisme du joueur (gambler's fallacy) — décrit dès les analyses de Laplace, formalisé en psychologie cognitive au 20e siècle
- Escompte temporel (present bias) — Thaler (1981)

---

## 12. Instructions de rédaction (à donner à Claude Code lors de la génération de contenu)

Pour chaque biais, produire :
1. Définition courte (1-2 phrases) + définition longue (4-6 phrases, mécanisme + conséquence)
2. 2 à 3 exemples concrets et variés (contextes différents : perso, pro, société)
3. 2 à 4 questions de QCM avec explication de la bonne réponse
4. Au moins 1 source vérifiée (auteur, année, titre, revue) — vérifier avant publication plutôt que citer de mémoire
5. Respecter le schéma JSON du §3 pour une intégration directe

---

Ce document peut être utilisé tel quel comme brief de développement. Si tu veux, je peux aussi générer directement le fichier `biais.json` rempli avec 5-10 premiers biais entièrement rédigés pour amorcer le contenu.
