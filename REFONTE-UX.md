# Refonte UX/UI de la collection « Jeux » — brief d'exécution

> Document de travail pour Claude Code. Il contient tout le contexte nécessaire :
> l'état des lieux, les décisions produit déjà prises, et le détail fichier par
> fichier de chaque chantier restant. **Lis-le en entier avant de toucher au code.**
>
> Rédigé le 14 août 2026 après un audit complet (lecture du HTML/CSS/JS des 34 jeux
> + ouverture de 44 pages dans Chromium en 1440 px et 390 px avec relevé des erreurs
> console). **Chantiers 01 et 04 appliqués et commités.**
>
> Dernière mise à jour : 14 août — relecture de la tranche 1 du chantier 05 et **plan
> d'exécution de la tranche 2 (§7 bis)**, qui est la prochaine étape.

---

## 1. Où en est le dépôt

- **Branche de travail : `refonte-ux`** (créée depuis `main` au commit `9fe6f98`).
- **Commits en place :** `65f8b5d` (chantier 01), `0df38b2` (ce brief), `f0fcb93` +
  `afb08fe` (chantier 04).
- `recrutement-de-mehdi/` et `fakemetre/` sont des **dépôts git indépendants**
  (ignorés par le `.gitignore` racine). Un commit y a déjà été fait :
  `recrutement-de-mehdi@d157de8` (zoom rétabli). Toute modification dans ces deux
  dossiers doit être commitée **dans leur propre dépôt**, pas dans celui de la racine.
- Un dossier `_prive/` a été créé et ajouté au `.gitignore` : il reçoit les brouillons
  et fichiers non destinés à la publication.

### Fins de ligne — traité, rien à faire

**Arbitré par Antonin le 14 août, et déjà appliqué (commit `dab242e`).** Trois fichiers
(`snake-fakenews.html`, `Emprise/texto total.html`, `graphiques-trompeurs/app.js`)
apparaissaient en permanence comme entièrement modifiés alors que leur contenu était
identique : conflit CRLF/LF (865 lignes ajoutées pour 865 supprimées,
`git diff --ignore-all-space` vide). Chaque passage d'outil relançait le phénomène.

Un **`.gitattributes`** (`* text=auto`, LF pour les sources, CRLF pour les `.bat`,
`binary` pour les médias) a été ajouté et commité. **Effet vérifié : `git status` ne
signale plus aucun fichier modifié**, et `git add --renormalize .` ne produit plus
aucun changement — l'index était déjà propre, aucun commit de normalisation n'est
nécessaire.

Il reste seulement 4 éléments **non suivis** à la racine, antérieurs à la refonte et
sans rapport avec elle : `HPLsbAMWcAArj4a.jpg`, un `.epub`, `ziM6iQ7v`, et `_to_delete/`
(à supprimer). Les laisser tels quels, ou demander à Antonin.

### Ordre des chantiers décidé avec Antonin

```
01 Correctifs express      ✅ FAIT (commit 65f8b5d)
04 La pédagogie d'abord    ✅ FAIT (commit f0fcb93)
05 Design system           🔸 EN COURS
   ├ tranche 1  ✅ FAIT (fb97b44) — socle, polices, 4 pages migrées
   └ tranche 2  ← COMMENCER ICI — plan détaillé au §7 bis
02 Socle d'accessibilité    puis (à relire d'abord) ≈ 6 j
03 Tactile & mobile         puis (à relire d'abord) ≈ 8 j
06 Industrialisation        puis                    ≈ 10 j
07 Vitrine & catégories     puis                    ≈ 3 j
```

**Tranche 2 du chantier 05 — l'ordre est important**, il est détaillé au **§7 bis** :
1. combler les deux trous du socle (Emprise, Mine) ≈ 1 j
2. les 10 illusions, dont `adelson.html` à écrire ≈ 2 j
3. composants intro/fin et gabarit, **extraits** de l'étape 2 ≈ 2 j
4. migration en 3 lots (arcade, catalogues, le reste) ≈ 6 j

Ne pas commencer par la migration de masse : le socle n'est pas encore complet.

Le chantier 08 (« amener 3 jeux phares au niveau produit ») n'a **pas** été retenu.

**Pourquoi 04 avant 05 :** le chantier 04 corrige des bugs de logique de jeu, pas de
présentation — il ne sera pas invalidé par le design system. À l'inverse, faire 02 et
03 avant 05 reviendrait à corriger 34 fois ce qu'on corrigera une fois après.

---

## 2. Conventions de travail

### Tester une modification

Il n'y a **ni build, ni dépendances, ni framework** : ce sont des fichiers statiques.
Mais `file://` casse les chargements de scripts et l'i18n — il faut un serveur :

```bash
cd "<racine du dépôt>"
python3 -m http.server 8899
# puis http://localhost:8899/<chemin du jeu>
```

**Vérifie toujours en 390 px de large en plus du desktop.** La moitié des défauts
trouvés pendant l'audit n'étaient visibles qu'en mobile. Si tu as Playwright
disponible, une capture aux deux tailles + le relevé des `pageerror` avant/après est
le minimum ; sinon, ouvre les deux tailles à la main.

**Attention aux polices :** les 33 pages chargent leur typo depuis
`fonts.googleapis.com`. Hors ligne, tout bascule en police système et le rendu paraît
cassé alors qu'il ne l'est pas. Ne « corrige » pas un problème de typo sans avoir
vérifié que les polices ont bien chargé. (C'est traité au chantier 05.)

### Style de code attendu

- **HTML/CSS/JS vanilla, pas de framework, pas d'étape de build.** Ne pas introduire
  npm, bundler, TypeScript ou dépendance externe. C'est un choix assumé du projet :
  chaque jeu doit pouvoir être ouvert et compris seul.
- Commentaires et messages de commit **en français**.
- **Ne pas reformater** un fichier que tu modifies : ces fichiers ont des styles
  d'indentation hétérogènes (certains minifiés à la main), un reformatage rendrait
  toute revue impossible. Modifie uniquement les lignes concernées.
- Chaque jeu existe en double, `app.js` **et** `app-en.js` (idem `data.js`/`data-en.js`,
  `scenarios.js`/`scenarios-en.js`). **Toute correction de logique doit être appliquée
  aux deux fichiers** tant que le chantier 06 n'a pas fusionné les paires. C'est la
  première cause de dérive du projet — vérifie systématiquement.

### Git — deux pièges

1. Le dossier contient des fichiers pré-modifiés sans rapport avec la refonte
   (`Arcade quizz/.agents/skills/impeccable/**`, quelques binaires à la racine).
   **Ne jamais faire `git add -A`** : commit toujours avec une liste de chemins
   explicite.
2. Un commit par chantier, avec le détail en corps de message. Ne pas pousser sur
   `main` sans relecture d'Antonin.

---

## 3. Décisions produit déjà arbitrées

À appliquer telles quelles, elles ont été validées :

| Sujet | Décision |
|---|---|
| **Catégorisation** | **Quatre familles par nature** : **Jeux**, **Illusions & démonstrations**, **Sensibilisation** (Emprise uniquement), **Interventions**. Plus un **marqueur transversal « utilisable en conférence »** posable sur n'importe quelle carte — une illusion d'optique reste dans sa famille mais ressort quand on filtre « pour animer une intervention ». Aucun jeu n'est dupliqué dans deux familles. Affectation complète et arrêtée au §11.1. |
| **Portée du design system** | **Structure commune, identités préservées.** Le socle impose l'en-tête, le focus, les espacements, l'échelle typographique, les cibles 44 px et l'accessibilité. **Chaque jeu garde sa palette et ses polices** : l'arcade reste néon, Perceptio reste sobre en sérif, Radar'naque reste clair, Emprise reste doux. On ne converge pas la direction artistique. Voir §7. |
| **Fins de ligne** | ✅ Réglé : `.gitattributes` ajouté et vérifié (commit `dab242e`). Voir §1. |
| **Arborescence** | **Rien ne bouge sur le disque.** La catégorisation est purement à l'écran (portail). Les URL existantes ont été partagées à des enseignants, des favoris et des QR codes pointent dessus. |
| **`Emprise/texto total.html`** | **Publié**, dans la famille **Sensibilisation**, aux côtés d'Emprise. Ne pas le déplacer dans `_prive/`. |
| **Chantier 08** | Écarté. |
| **Périmètre** | Le dossier `Obso/` et les supports `.pptx`/`.pdf`/`Collège Lycée/` sont hors sujet. |

---

## 4. Erreurs de l'audit initial — à ne pas propager

Deux constats de l'audit se sont révélés faux à la vérification. Ils circulent peut-être
dans les notes d'Antonin ; **ce document fait foi** :

- ❌ **« Perceptio annonce 10 biais mais en contient 16 »** — **FAUX**. `BIAIS.length` vaut
  bien 10, `EXPERIENCES.length` 10, `OUTILS.length` 10. Le comptage initial additionnait
  les catégories aux entrées. Les pieds de page disaient vrai. (Ils ont quand même été
  rendus dynamiques au chantier 01 : c'est désormais auto-correctif.)
- ⚠️ **Radar'naque « 22 arnaques / 9 fiables »** — le chiffre exact est **23 / 9**.
  Le déséquilibre reste réel et l'action reste valable.

Le seul compteur réellement faux était « **Onze** illusions » pour 10 pages (corrigé).

---

## 5. Chantier 01 — FAIT, mais deux restes

Appliqué par le script `_prive/patch01.py` (idempotent, relançable sans dégât).
Contenu du commit `65f8b5d` :

- `@media` rétabli devant 15 règles `prefers-reduced-motion` écrites
  `(prefers-reduced-motion:reduce){…}` — CSS invalide, donc **totalement ignoré**
  (10 pages d'illusions + `brick-breaker-quiz`, `fake-blaster`, `fakenews_defender`,
  `snake-fakenews`, `whac-a-quiz`).
- `Ilusions d'optique/muller_lyer_illusion.html` : le fichier commençait directement par
  `<style>`, sans `<!DOCTYPE>` ni `<head>`, donc **sans `meta charset`** → le titre
  s'affichait « Illusion de MÃ¼ller-Lyer ». En-tête complet ajouté + clé `pageTitle`
  ajoutée aux dictionnaires fr/en (sans elle, `I18N.t()` affichait la clé brute).
- Compteurs de contenu rendus dynamiques (4 pages).
- `user-scalable=no` retiré (`Planète connaissance.html`, `recrutement-de-mehdi/index.html`,
  `recrutement-de-mehdi/participant.html`).
- `Reco Alberte/reso-alberte.html` : `<a class="back-hub" href="reso-alberte.html">`
  pointait sur lui-même → `../index.html`.
- Pastille « ← Retour aux illusions » ajoutée aux 10 pages d'illusions, **en flux**
  (`display:inline-flex`, pas `position:fixed`) : ces pages ont leur titre en haut à
  gauche, un élément flottant le recouvrait.
- Brouillons et images orphelines déplacés dans `_prive/` : `SUGGESTIONS-JEUX.html`
  (feuille de route interne atteignable par URL publique), `preview (3).html`,
  `coffer illusion.jpg`, `20220131_124102.jpg`, `chien.webp`, `flèches longueur.png`,
  `repare-la-une/image mélenchon.jpg`.
- `i18n.js` : bouton FR/EN passé à `min-height:44px`, et fonction `placeToggle()` qui
  réserve `padding-top:56px` sur le `<header>` en dessous de 680 px.

### Reste à faire (basculé au chantier 03)

- `placeToggle()` ne traite que les pages **qui ont un `<header>`**. Sur `echecs.html`,
  `terre_ronde_plate.html`, `Emprise/index.html` et `mine.html`, le titre est en position
  absolue ou dans un conteneur ad hoc : **le chevauchement persiste en 390 px**.
  Une heuristique de détection de collision a été tentée puis retirée — elle produisait
  un placement différent d'une page à l'autre, ce qui était pire. La vraie réponse est
  l'en-tête unifié du chantier 05.
- `Emprise/texto total.html` a été **laissé en place** volontairement : ça ressemble à une
  démo de conférence, sa place est dans la famille « Interventions » du chantier 07,
  pas dans `_prive/`. À trancher avec Antonin.

---

## 6. Chantier 04 — La pédagogie d'abord — ✅ FAIT (commit `f0fcb93`)

**L'enjeu :** dans 5 jeux d'arcade sur 6, l'élève se trompe et n'apprend rien. C'est le
moment où il est le plus disponible pour apprendre, et il est perdu.

> **Appliqué le 14 août 2026.** Les neuf points ci-dessous sont traités. Trois écarts
> par rapport au brief initial, à connaître :
>
> - **§4.4 — `fake-blaster` et les deux Snake mélangeaient déjà correctement.**
>   `fake-blaster` mélange `opts` dans `spawnBubbles()`, les Snake placent les réponses
>   à des positions aléatoires. Seuls **brick-breaker** et **fakenews_defender** avaient
>   besoin du correctif.
> - **§4.9 — le calcul « 72 % de réussite » était faux.** `radarnaque/app.js` (l. 97-104)
>   tire déjà un paquet **équilibré** (7 arnaques / 7 fiables sur 14). Répondre
>   « arnaque » systématiquement donnait donc 50 %, pas 72 %. Le rééquilibrage reste
>   utile pour une autre raison : avec seulement 9 fiables, les **mêmes 7 revenaient à
>   chaque partie** pendant que les arnaques tournaient parmi 23.
> - **§4.5 — arbitrage rendu :** la pénalité de la ligne 617 est **supprimée**, et la
>   consigne réécrite pour dire la vraie règle (ne pas laisser passer une *fausse*
>   réponse).
>
> **Hors brief, corrigé au passage :** `Arcade quizz/questions-en.js` contenait des
> explications de traduction automatique inutilisables (« Fake news, it is A information
> false! ») et des options restées à moitié en français. Elles ont été réécrites — sans
> quoi les correctifs ci-dessus les auraient rendues visibles partout en anglais.

> **Relecture indépendante du 14 août — conforme.** Contrôlé au navigateur, pas
> seulement lu : `expl` bien transporté dans `fake-blaster` (0 → 39 occurrences) avec le
> bandeau `#explbar` ; consigne de Defender réécrite et `lives--` de la ligne 617
> supprimé ; QCM Classique testé avec une explication de 530 caractères →
> `max-height: none`, `clientHeight === scrollHeight`, **plus de troncature**, et les 4
> boutons passent bien en `disabled` ; Radar'naque à **46 scénarios, 23 arnaques /
> 23 fiables**, avec **FR et EN strictement synchronisés** (mêmes 46 `id`, glossaire de
> 17 entrées des deux côtés) ; accordéon « Les 8 techniques » présent dans Radar désinfo.
> Les 10 jeux touchés ouverts en 1440 px et 390 px : **0 erreur console, 0 `pageerror`**.
>
> **Constaté au passage, pour le chantier 03 :** en 390 px, le titre de
> **Brick Breaker**, **Defender** et **Whac-a-Quiz** est écrasé par le HUD SCORE/VIES et
> leur bouton « JOUER » est recouvert par la barre du bas ; **Snake racine** a son
> panneau latéral coupé. Ce ne sont pas des régressions du chantier 04 — c'est le §9.3.

### 4.1 — `Arcade quizz/fake-blaster.html` : aucune explication, jamais

**Vérifié :** `grep -c 'expl' fake-blaster.html` → **0**. Le champ `expl` des questions
n'est pas seulement non affiché, il **n'arrive jamais jusqu'au jeu**.

À faire :
- Transporter `q.expl` depuis le jeu de questions jusqu'au moteur.
- L'afficher **à l'erreur comme à la réussite**, via le mécanisme de feedback existant.
- Modèle à copier : `brick-breaker-quiz.html`, fonction de fin de question —
  `showFeedback(currentQ.expl || '✅ …', 'ok')`.

### 4.2 — `Arcade quizz/snake-fakenews.html` : idem

**Vérifié :** `grep -c 'expl'` → **0**. Attention : il existe **deux** Snake, celui-ci et
`snake-fakenews.html` à la racine. Traiter les deux (ils ont divergé).

### 4.3 — Explication à l'erreur dans Brick / Defender / Whac

**Vérifié :** ces trois-là transportent bien `expl`, mais **ne l'affichent que sur le
chemin de réussite** :

| Fichier | Ligne | Code actuel |
|---|---|---|
| `brick-breaker-quiz.html` | ~419 | `showFeedback(currentQ.expl \|\| '✅ Toutes les fausses réponses détruites !', 'ok');` |
| `fakenews_defender.html` | ~441 | `showFeedback(currentQ.expl, 'ok');` |
| `whac-a-quiz.html` | ~791 | `showFeedback(currentQ.expl \|\| I18N.t('allHit'), 'ok');` |

À faire : sur chaque chemin `'ko'` (perte de vie, mauvaise réponse, temps écoulé),
afficher aussi `currentQ.expl`. Laisser au joueur le temps de lire — un feedback
d'erreur qui disparaît en 400 ms ne sert à rien.

### 4.4 — La bonne réponse est toujours à la même place

**Vérifié :** `Arcade quizz/questions.js` — les **15** questions du set « Par défaut » ont
toutes `answer: 0`. Et `brick-breaker-quiz.html` (l. ~280-298) comme
`fakenews_defender.html` (l. ~305-318) n'ont qu'une fonction **`shuffleColors()`** : elle
mélange les *couleurs*, pas l'ordre des options. Les réponses sortent dans l'ordre du
fichier → **la bonne réponse est systématiquement la première brique**.

À faire : mélanger l'ordre des options avant affichage dans **brick-breaker-quiz**,
**fakenews_defender**, **fake-blaster** et **snake-fakenews** (les 4 sans mélange).

Le correctif existe déjà dans le projet, à copier tel quel —
`qcm-classique.html` l. ~328-330 :

```js
shuffled = shuffle(raw).map(q => {
  const indices = shuffle(Array.from({ length: q.options.length }, (_, i) => i));
  …
});
```

`whac-a-quiz.html` mélange déjà correctement (l. ~662, `optOrder`) : **ne pas y toucher**.

### 4.5 — `fakenews_defender.html` : la règle se contredit

**Vérifié.** La consigne affichée (l. 177 et 201) dit :

> ⚠️ Ne tire pas sur la bonne réponse — tu perdras une vie !
> ⚠️ **Laisse la bonne réponse passer** — elle ne doit pas s'échapper !

Or dans le code, la bonne réponse coûte une vie **dans les deux cas** :

- l. ~583 — on lui tire dessus : `lives--` + « ❌ Tu as tiré sur la BONNE réponse ! -1 vie »
- l. ~617 — elle atteint le bas : `lives--` + « 💨 La bonne réponse s'est échappée ! -1 vie »

Le joueur est donc puni pour avoir fait exactement ce qu'on lui a dit de faire. Le seul
chemin gagnant réel est de détruire **toutes** les fausses réponses avant que la bonne
n'atteigne le bas (`checkAllWrongGone()`), ce qui n'est écrit nulle part.

À faire : réécrire la consigne pour dire la vraie règle, **ou** retirer la pénalité de la
ligne 617. À trancher avec Antonin — la seconde option est plus simple et plus juste.

### 4.6 — `Arcade quizz/qcm-classique.html` : explication tronquée en silence

**Vérifié** l. 160-166 : le panneau d'explication passe de `max-height:0` à
`max-height:120px` avec `overflow:hidden`. Toute explication dépassant 120 px est
**coupée sans indicateur** — et c'est le seul jeu d'arcade qui fait bien le travail
pédagogique, donc ses explications sont les plus longues.

À faire : `max-height` suffisante (ou transition sur `grid-template-rows: 0fr → 1fr`,
qui s'anime sans plafond arbitraire).

### 4.7 — `radar-desinfo/app.js` : la partie s'arrête avant la fin du contenu

**Vérifié** l. 61-139 : `lives = 3`, et l. 116/126 `if(lives<=0 || idx===deck.length-1)`
→ `endGame()`. Le joueur qui perd ses 3 vies ne voit **jamais** les dépêches restantes
ni leurs explications — c'est-à-dire l'essentiel du contenu pédagogique.

À faire :
- À la fin (perdue ou gagnée), proposer un récapitulatif des cas non vus avec leur
  explication, ou permettre de continuer sans score.
- Ajouter un **lexique des 8 techniques de désinformation avant de jouer** : on demande
  aujourd'hui de choisir parmi 8 catégories jamais définies au préalable.
- Appliquer aussi à `radar-desinfo/app-en.js`.

### 4.8 — `grand-oral/app.js` : animation de 4,2 s non interruptible

**Vérifié** l. ~211-230 : `setTimeout(…, 500 + s*1400)` pour s = 0, 1, 2 → la dernière
étape démarre à 3 300 ms, puis `setTimeout(()=>verdict(total), 900)` → **~4,2 s** avant
le verdict, sans possibilité de passer. Multiplié par 5 missions.

À faire : clic (ou touche) pour accélérer / passer à la suite. Respecter
`prefers-reduced-motion` : y sauter directement au verdict.

**Aussi :** le barème des étoiles n'est expliqué nulle part (`stars`, l. 156/238/246) —
le joueur reçoit 0 à 3 ⭐ sans savoir pourquoi. Et les missions passent toujours dans le
même ordre (`mi=0` puis incrément) : mélanger.

### 4.9 — `radarnaque/scenarios.js` : corpus déséquilibré

**Vérifié :** **23** scénarios `verdict: 'arnaque'` contre **9** `verdict: 'fiable'`.
Le joueur qui répond « arnaque » systématiquement a 72 % de réussite — on entraîne la
méfiance généralisée, pas le discernement. C'est contraire à l'objectif du jeu.

À faire : rééquilibrer vers ~50/50, en ajoutant des cas fiables **crédibles et piégeux**
(un vrai SMS de banque, une vraie relance d'impôts, un vrai mail de livraison). Ne pas
supprimer d'arnaques existantes. Appliquer à `scenarios-en.js`.

---

## 7. Chantier 05 — Design system de collection ≈ 12 j

**L'enjeu :** c'est la cause racine. Chaque jeu réimplémente son en-tête, son bouton
retour, son focus, sa typo. Tant que ce socle n'existe pas, chaque correctif coûte 34
applications. Après, il en coûte une.

> ### ⚖️ Périmètre arbitré par Antonin — lire avant de commencer
>
> **Structure commune, identités visuelles préservées.**
>
> Le socle prend en charge **ce qui est cassé partout** : en-tête (retour / titre /
> langue), focus, `prefers-reduced-motion`, échelle typographique, espacements, cibles
> 44 px, écrans d'intro et de fin, comportement responsive.
>
> Le socle **ne touche pas** à la palette ni aux polices de chaque jeu. L'arcade reste
> néon sur fond noir, Perceptio reste sobre en sérif, Radar'naque reste clair et
> rassurant, Emprise reste doux, Recrutement de Mehdi garde sa direction artistique en
> `oklch`. Ce sont des choix délibérés et réussis, ils font partie de la valeur de la
> collection.
>
> **En pratique :** `collection.css` définit des variables avec des valeurs *par défaut*,
> et chaque jeu surcharge celles qui portent son identité (`--bg`, `--acc`, `--font-*`).
> Il définit aussi les **rôles** (`--txt-secondaire` garanti ≥ 4,5:1 sur `--bg`) que le
> jeu doit renseigner — c'est le socle qui impose la *contrainte*, pas la *couleur*.
>
> Le test de réussite : après le chantier, une capture de chaque jeu doit rester
> reconnaissable, mais l'en-tête, le focus et les espacements doivent être identiques
> partout.

> ### ▶ Avancement — première tranche appliquée (commit `fb97b44`)
>
> | Point | État |
> |---|---|
> | **5.1 `collection.css` / `collection.js`** | ✅ Écrits et branchés |
> | **5.2 Polices locales** | ✅ 17 familles, 36 `.woff2`, 1,1 Mo, latin + latin-ext |
> | **5.3 Composants intro / fin** | ⬜ à faire |
> | **5.4 Les 10 illusions (+ `adelson.html`)** | ⬜ à faire |
> | **5.5 `_gabarit/`** | ⬜ à faire |
> | **Migration des pages** | 🔸 4 sur 59 |
>
> **Pages migrées :** `terre_ronde_plate.html`, `mine.html`, `Emprise/index.html`,
> `echecs.html` — c'est-à-dire exactement les quatre restes du chantier 01 (§5).
> Le chevauchement en 390 px y est **structurellement** réglé : les trois zones
> se partagent une grille au lieu de se superposer.
>
> **Trois pièges rencontrés en branchant le socle, déjà corrigés — à connaître
> avant de migrer les 55 pages restantes :**
>
> 1. **Un titre sans fond disparaît sur les pages à canvas plein écran.** Le
>    décor de « La Terre ronde ou plate ? » passe du bleu nuit au blanc pendant
>    le jeu : un titre blanc s'y effaçait complètement. Réglé par un voile en
>    dégradé `--entete-voile` → transparent, pleine largeur de fenêtre —
>    invisible sur une page à fond uni, indispensable sur média.
> 2. **Un `<h1>` enfermé dans une modale n'est pas le titre de la page.**
>    Emprise n'a que « Avant de commencer », dans son avertissement. Le
>    reprendre affichait le mauvais titre, le masquer cassait la modale.
>    `collection.js` ignore désormais les `<h1>` sous `.modal`, `[role=dialog]`,
>    `[hidden]`. Les pages sans `<h1>` exploitable déclarent
>    `data-col-titre-cle="…"` (clé i18n, donc titre traduit) sur `<body>`.
> 3. **`header { … }` au sélecteur de type retombe sur l'en-tête unifié**, qui
>    est lui aussi un `<header>` (echecs y posait un fond et une bordure).
>
> **Deux facilités fournies aux pages :** `--entete-h` est publié par
> `collection.js` avec la hauteur réelle de l'en-tête (les HUD en
> `position:fixed; top:0` s'y adossent au lieu de le recouvrir), et la bascule
> de langue n'est rendue que si `I18N` existe — inutile de promettre une
> traduction absente, comme sur `echecs.html`.
>
> **Recette de migration d'une page**, telle qu'appliquée aux quatre premières :
> ```html
> <link rel="stylesheet" href="fonts/fonts.css">   <!-- ../ en sous-dossier -->
> <link rel="stylesheet" href="collection.css">
> <link rel="stylesheet" href="le-jeu.css">        <!-- APRÈS : il surcharge -->
> …
> <script src="i18n.js"></script>
> <script src="collection.js"></script>
> ```
> puis déclarer dans le `:root` du jeu ses jetons d'identité — au minimum
> `--bg`, `--txt`, `--txt-secondaire` (≥ 4,5:1 sur `--bg`), `--acc`,
> `--font-texte`, `--font-titre` — et retirer le `<link>` Google Fonts.

> ### ✅ Relecture indépendante de la tranche 1 — conforme, deux réserves
>
> Contrôlé au navigateur en 1440 px et 390 px, par test de collision réel
> (`elementFromPoint` sur trois points du `<h1>`), pas à l'œil.
>
> **Ce qui est confirmé :**
>
> - **Le chevauchement est réellement réglé** sur `echecs.html` et
>   `terre_ronde_plate.html` — les deux pages où il était avéré. Titre non
>   recouvert aux deux largeurs, aucun débordement horizontal. L'en-tête
>   d'échecs est net et lisible là où le titre était écrasé auparavant, et le
>   voile en dégradé fait bien son travail sur le canvas de « Terre ».
> - **Zéro appel à `fonts.googleapis.com`** sur les 4 pages migrées ; les
>   `.woff2` locaux répondent en 200.
> - **Aucune régression sur les pages non migrées** : `chasse-aux-biais`,
>   `Biais cognitifs`, `radarnaque` et `ponzo` contrôlées — pas de
>   chevauchement, pas de débordement, comportement inchangé.
>
> **Réserve 1 — l'échelle typographique n'est adoptée nulle part.**
> `collection.css` déclare `--fs-100: 0.8rem` comme « plancher », mais aucune
> page migrée ne consomme les jetons : `echecs.html` **0** occurrence de
> `--fs-`, `mine.html` **1**, `terre_ronde_plate.html` **0**,
> `Emprise/index.html` **0**, `echecs.css` **0**, `Emprise/style.css` **0**.
> Conséquence mesurée sur `mine.html`, la page que le §5.1 cite nommément :
> **11 éléments sont encore sous 12,8 px**, dont
>
> | Taille rendue | Classe | Texte |
> |---|---|---|
> | **4,5 px** | `.slot-n` | `0` |
> | **5,1 px** | `.click-hint` | ⛏ CLIQUE POUR MINER |
> | **5,1 px** | `.sbtn` | 📋 VOIR LES MOTS AJOUTÉS |
> | **5,8 px** | `.lt` | EXTRACTION FACILE / DIFFICILE |
> | **8,8 px** | `.stit` | MINE LA PLANÈTE |
>
> `mine.html` garde `.lt{font-size:.36rem}` en dur. Le socle **offre** l'échelle,
> il ne l'**impose** pas — c'est cohérent avec « identités préservées », mais il
> faut alors une étape explicite de reprise des tailles à chaque migration,
> sinon le plancher ne servira jamais. **À traiter :** reprendre les tailles de
> `mine.html` sur les jetons (c'est un jeu destiné au primaire), et ajouter
> l'étape à la recette de migration ci-dessus.
>
> **Réserve 2 — Emprise a encore un chevauchement en 390 px.** Ce n'est plus
> celui du titre : c'est le lien **« Besoin d'aide ? »** (fixe, en haut à
> gauche, **12 px de haut**) qui recouvre le bandeau rouge « FICTION —
> conversation fictive… », lequel se retrouve tronqué. Sur un jeu qui traite
> des violences dans le couple, c'est précisément le lien qui ne doit ni gêner
> ni être gêné. Il est aussi la cible tactile la plus petite de la page
> (§9.4 le signalait déjà comme prioritaire).

---

## 7 bis. Tranche 2 du chantier 05 — plan d'exécution

> **Principe : finir de définir le socle avant de s'en servir 55 fois.**
> Les deux réserves ci-dessus ne sont pas des retouches cosmétiques, ce sont deux
> trous dans l'API du socle. Migrer les 55 pages avant d'y avoir répondu revient à
> inscrire une recette incomplète 55 fois. L'ordre ci-dessous met les décisions
> structurantes au début et garde l'enveloppe de 12 jours.

### Étape 1 — Combler les deux trous du socle ≈ 1 j

**1a. Emprise : un emplacement libre dans l'en-tête.**
Le lien « Besoin d'aide ? » ne doit plus être un élément flottant. La question qu'il
pose dépasse Emprise : **comment l'en-tête accueille-t-il un troisième élément ?** —
un lien d'aide aujourd'hui, demain un bouton son, un chrono, un compteur de vies.
La grille actuelle est figée à `retour | titre | langue`.

À faire : ouvrir un emplacement déclaratif (par exemple un `<slot>`/conteneur
`data-col-entete-extra`, ou une zone `col-entete__extra` que la page remplit), puis
y déplacer « Besoin d'aide ? » — qui gagne au passage sa cible de 44 px et cesse de
recouvrir le bandeau « FICTION » en 390 px. Si le socle ne sait pas accueillir un
troisième élément, mieux vaut le découvrir ici qu'à la 40ᵉ page.

**1b. Mine : la première adoption réelle de l'échelle typographique.**
⚠️ **Ce n'est pas un remplacement de valeurs, c'est une reprise de mise en page.**
`Press Start 2P` est une police très large : passer `.lt` de 5,8 px à `--fs-100`
(12,8 px) fera déborder les cartouches « EXTRACTION FACILE / DIFFICILE », et le même
effet touchera `.stit`, `.sbtn`, `.click-hint`, `.slot-n` et le HUD. Prévoir de
reprendre les conteneurs, pas seulement les `font-size`. C'est un jeu destiné au
primaire : c'est la page de la collection où l'enjeu de lisibilité est le plus fort.

**Livrable de l'étape :** la recette de migration du §7 est complétée d'une étape
« reprendre les tailles sur les jetons », sans quoi le plancher à 12,8 px restera une
intention que personne n'applique.

### Étape 2 — Les 10 illusions, §5.4 ≈ 2 j

Meilleur premier lot : dix pages quasi identiques, sans identité visuelle forte à
préserver, et déjà dotées de la pastille de retour du chantier 01.

- Les faire converger sur un gabarit unique (elles ont aujourd'hui dix jeux de classes
  différents : `.exp-panel` ici, `#explication` là, `.page-hint` vs `#question`).
- **`adelson.html` est à écrire entièrement** — ni titre, ni consigne, ni explication.
  C'est l'occasion de définir le composant **« énoncé + panneau pédagogique »** que les
  neuf autres réimplémentent chacune à sa façon. Ce composant servira bien au-delà des
  illusions.
- Aucune de ces pages n'a de `<h1>` : vérifier que `data-col-titre-cle` (introduit en
  tranche 1) couvre bien le cas, et en profiter pour leur donner une vraie hiérarchie.

### Étape 3 — §5.3 composants intro/fin et §5.5 gabarit ≈ 2 j

**À faire après l'étape 2, pas avant.** Les composants doivent être extraits de ce que
le lot d'illusions aura révélé, pas devinés à l'avance : un gabarit écrit sur du vécu
vaut mieux qu'un gabarit écrit sur une intention.

### Étape 4 — Migration en lots ≈ 6 j

> ⚙️ **C'est l'étape à signaler à Antonin comme candidate à Fable 5** (voir la section
> « Quel modèle pour cette session » de `CLAUDE.md`). Les étapes 1 à 3 sont du travail
> de précision sur un ou deux fichiers : le modèle courant suffit. L'étape 4 est une
> migration de masse où la difficulté est de rester cohérent du premier au dernier
> fichier — c'est exactement le profil annoncé pour Fable. Le signaler, ne pas basculer
> soi-même.

Trois lots cohérents plutôt que 55 cas particuliers :

| Lot | Pages | Ce qu'elles partagent |
|---|---|---|
| **Arcade** | les 11 pages d'`Arcade quizz/` | même HUD SCORE/VIES, même structure de canvas, mêmes chevauchements en 390 px (§9.3) |
| **Catalogues** | Perceptio, Cobaye, Rhetor | gabarit strictement identique — ce qui est corrigé sur l'un se transpose tel quel |
| **Le reste** | les ~30 pages restantes | à traiter par proximité (jeux de scénario, pages racine, modules) |

Traiter un lot = régler une fois un défaut partagé par 11 pages. C'est le retour sur
investissement du socle, et le moment où il devient visible.

### Après le chantier 05 — relire 02 et 03 avant de les lancer

Une bonne partie du contenu des chantiers **02** (contrastes, `:focus-visible`, cibles
44 px) et **03** (chevauchements en 390 px) sera **absorbée par la migration
elle-même**. Ne pas les exécuter tels qu'ils sont écrits : faire une passe de
vérification à l'issue du 05 pour ne garder que ce qui reste réellement à faire —
notamment ce que le socle ne peut pas régler seul : `aria-live`, opérabilité clavier
de l'échiquier, du curseur du FakeMètre et des pastilles d'Exploration, alternatives
textuelles des graphiques trompeurs, contrôles tactiles des jeux d'arcade.

### 5.1 — Créer `collection.css` et `collection.js` à la racine

`collection.css` doit fournir, en variables CSS surchargeables par jeu :

- une échelle typographique (`--fs-100` … `--fs-700`) — aujourd'hui `mine.html` descend
  à `font-size:.28rem`, soit **4,5 px**, sur un jeu destiné au primaire ;
- des tokens de couleur avec **une variante « texte secondaire » garantie ≥ 4,5:1** sur
  chaque fond (voir la table du §8.4) ;
- `:focus-visible` unique ;
- le bloc `@media (prefers-reduced-motion:reduce)` correct, **une seule fois** ;
- des cibles tactiles à 44 px par défaut sur `button`, `a.chip`, `input[type=range]`.

`collection.js` doit fournir un **en-tête unifié** qui règle définitivement le
chevauchement du chantier 01 : une grille `retour | titre | langue` en flux normal, pas
trois éléments flottants qui se disputent le coin supérieur. C'est ce qui remplacera
`placeToggle()` dans `i18n.js`.

### 5.2 — Héberger les polices localement

33 pages dépendent de `fonts.googleapis.com`. Beaucoup de réseaux d'établissement le
filtrent : la page s'affiche alors en police système et perd toute son identité.
Télécharger les `.woff2` utilisés dans `/fonts/`, servir en `@font-face` avec
`font-display: swap`.

### 5.3 — Composants « intro » et « fin » réutilisables

Chaque jeu réécrit son écran de règles et son écran de score. Un composant unique
permettra d'ajouter partout d'un coup ce qui manque aujourd'hui : durée annoncée,
rappel des commandes, bouton « rejouer » et lien de retour.

### 5.4 — Unifier les 10 pages d'illusions

Elles n'ont **aucun CSS ni JS commun** : chacune redéfinit ses classes avec des noms
différents (`.exp-panel` ici, `#explication` là, `.page-hint` vs `#question`). Les faire
converger sur un gabarit unique.

**Cas particulier — `adelson.html` :** la page n'a **ni titre, ni consigne, ni
explication** (aucun `<h1>`/`<h2>`, aucun bloc d'explication). C'est deux formes grises
glissables sans un mot de contexte, alors que les 9 autres ont toutes un énoncé et un
panneau pédagogique. À écrire entièrement.

### 5.5 — Un gabarit de départ

`_gabarit/` avec un jeu vide qui inclut déjà accessibilité, i18n, responsive et en-tête.
Objectif : que le prochain jeu n'ait plus à être rattrapé après coup.

---

## 8. Chantier 02 — Socle d'accessibilité ≈ 6 j

> À faire **après** le chantier 05 : la moitié de ces points se règlent une seule fois
> dans `collection.css`/`collection.js` au lieu de 34 fois.

**Le modèle à généraliser existe déjà dans le dépôt :** `arene-rhetorique/index.html` est
le seul jeu avec `aria-live`, gestion du focus et confirmation avant de quitter. S'en
inspirer plutôt que réinventer.

### 8.1 — `aria-live`

**Vérifié :** seuls **4 fichiers sur 61** en contiennent (`radarnaque/app.js`,
`radarnaque/app-en.js`, `repare-la-une/index.html`, `arene-rhetorique/index.html`).
Partout ailleurs, le résultat d'une réponse, le score et les vies changent en silence.

Ajouter `aria-live="polite"` sur chaque zone de feedback, de score et de vies.
Utiliser `aria-live="assertive"` uniquement pour la fin de partie.

### 8.2 — Boutons de QCM jamais désactivés

Dans **Perceptio** (`Biais cognitifs/`), **Cobaye** et **Rhetor**, les boutons de réponse
ne passent jamais en `disabled` après une réponse — alors que le CSS `:disabled` existe
et n'est jamais déclenché. On peut recliquer, rien ne se passe, et rien ne l'explique.

### 8.3 — Focus

- Déplacer le focus vers « Suivant » après chaque réponse.
- Déplacer le focus vers le titre à chaque changement de vue (ces trois catalogues sont
  des SPA à routes : la navigation est aujourd'hui muette pour un lecteur d'écran).
- `:focus-visible` manquant sur : `Emprise/style.css`, `Reco Alberte/reso-alberte.html`,
  les 4 pages `recrutement-de-mehdi/*`, `Arcade quizz/editeur-questions.html`,
  `exploration/carte.html`, `jeu-lignes-numerotees/index.html`.
- Plusieurs `outline:none` sans remplacement dans `recrutement-de-mehdi/` sur le champ
  code et les curseurs de vote.

### 8.4 — Contrastes sous 4,5:1 — valeurs mesurées et corrections proposées

| Fichier | Variable | Actuel | Ratio | Proposé | Ratio |
|---|---|---|---|---|---|
| `Arcade quizz/qcm-classique.html` l.44 (+ `editeur-questions.html`) | `--dim` sur `#0a0a1a` | `#4040aa` | **2,36:1** | `#7070c9` | 4,53:1 |
| `echecs.css` `#session-score` | sur `#16213e` | `#666666` | **2,77:1** | `#8a8a8a` | 4,60:1 |
| `Ilusions d'optique/*.html` `qSub` (inline) | sur `#ffffff` | `#999999` | **2,85:1** | `#757575` | 4,61:1 |
| `Emprise/style.css` l.5 | `--muted` sur `#f4f6fa` | `#7b8794` | **3,38:1** | `#67727f` | 4,52:1 |

`echecs.css` `.opening-category h4` (`#888` sur `#16213e`, 4,49:1) est juste sous le
seuil — à remonter aussi. Vérifier également `radarnaque/styles.css`,
`radar-desinfo/` et `fakemetre/fakemetre.css`, signalés lors de l'audit mais non
remesurés depuis.

### 8.5 — Interactions non opérables au clavier

| Jeu | Problème |
|---|---|
| `echecs-board.js` l.40-56 | Les cases sont des `<div>` avec un `click` : ni `tabindex`, ni `role`, ni `keydown`. **Le mode Exercice est injouable sans souris.** |
| `exploration/index.html` l.492-501 | Les pastilles de couleur (peau, cheveux, habit) sont des `<div onclick>`. On ne peut pas choisir sa couleur de peau au clavier — alors que les choix de style/genre juste à côté sont de vrais `<button class="chip">`. |
| `fakemetre/index.html` | Le curseur de ressenti — l'interaction centrale du jeu — n'a ni `tabindex`, ni `role="slider"`, ni gestion clavier. |
| `graphiques-trompeurs/` | La loupe n'est pas atteignable au clavier. |

### 8.6 — `graphiques-trompeurs/` : le graphique **est** la question

Son `alt` vaut « Graphique à analyser ». Un élève non-voyant ne peut pas jouer du tout.
Il faut une alternative textuelle **réelle** par graphique : décrire les données et la
manipulation (axe tronqué, échelle bricolée, perspective 3D…), sans donner la réponse.
C'est un travail de contenu, pas de code : ~20 images dans `graphiques-trompeurs/images/`.

### 8.7 — `chasse-aux-biais/app.js` : chrono non désactivable

**Vérifié** l. 158 : `const QTIME = 15;` — 15 secondes pour répondre, sans possibilité de
désactiver. C'est le seul manquement au critère WCAG 2.2.1 (« Réglage du délai ») de la
collection. Ajouter une option « sans limite de temps ».

*Ne pas toucher* au verrouillage de 2 secondes (l. 201, « respiration ») : c'est un choix
pédagogique délibéré et réussi.

### 8.8 — Contenu dessiné dans un `<canvas>`

`terre_ronde_plate.html` dessine tout le texte informatif (badge d'échelle, « ▼ Vous »,
ligne d'horizon) dans le canvas : invisible aux lecteurs d'écran et non zoomable.
Dupliquer les repères clés en HTML (`sr-only` + `aria-live`) synchronisés avec
`updateInfo()`.

---

## 9. Chantier 03 — Tactile & mobile ≈ 8 j

**L'enjeu :** six jeux sont inutilisables sur une tablette de classe, qui est le support
le plus probable en établissement. Et rien à l'écran ne le signale.

### 9.1 — Jeux clavier seulement

| Jeu | À faire |
|---|---|
| `snake-fakenews.html` (racine) **et** `Arcade quizz/snake-fakenews.html` | Swipe ou D-pad tactile. Les deux fichiers ont divergé, traiter les deux. |
| `Arcade quizz/brick-breaker-quiz.html` | `touchmove` sur la raquette. |
| `Arcade quizz/fakenews_defender.html` | `touchmove` sur l'avion. |
| `Arcade quizz/fake-blaster.html` | Boutons de déplacement + tir tactiles, et **préserver le ratio du canvas** (hauteur figée → image déformée en mobile). |
| `echecs-board.js` | Rendre les cases activables au doigt (le `click` fonctionne, mais les cases tombent sous 44 px en dessous de 520 px — `echecs.css` l. 673-682). |
| `mine.html` / `mine.js` | `body{cursor:none}` (l. 11) + curseur suivi au `mousemove` (`mine.js` l. 234-238) : **inutilisable au tactile**. Conditionner à `@media (pointer:fine)`. Faire de `#block` (l. 292) un vrai `<button>`. |

### 9.2 — `snake-fakenews.html` (racine) : aucune media query

**Vérifié :** zéro `@media` dans tout le fichier. `<canvas width="420" height="420">` fixe
+ `.main-layout{display:flex}` avec un panneau latéral de 200 px → **636 px de large
minimum**. Déborde de tout téléphone.

### 9.3 — Chevauchements en 390 px

Reste du chantier 01 : `echecs.html`, `terre_ronde_plate.html`, `Emprise/index.html`,
`mine.html` — le titre est recouvert par la pastille de retour ou le bouton FR/EN.
**À traiter avec l'en-tête unifié du chantier 05**, pas avec une rustine par page.

Voir aussi le HUD des jeux d'arcade (SCORE / VIES) qui chevauche le titre en 390 px, et
`Arcade quizz/editeur-questions.html` qui déborde (459 px).

### 9.4 — Cibles tactiles

Passer à 44 px : boutons mute, curseurs de vitesse, chips, onglets, et en priorité le
lien **« Besoin d'aide ? » d'Emprise** — c'est aujourd'hui l'élément le plus petit de la
page (12 px), sur un jeu qui parle de violences dans le couple.

---

## 10. Chantier 06 — Industrialisation technique ≈ 10 j

**L'enjeu :** invisible pour le joueur, décisif pour la suite. Aujourd'hui chaque
correctif doit être écrit deux fois et rien ne signale l'oubli.

### 10.1 — Fusionner les paires FR/EN

10 jeux dupliquent **toute leur logique** entre `app.js` et `app-en.js` (idem `data.js`,
`scenarios.js`) : `arene-rhetorique`, `Biais cognitifs`, `chasse-aux-biais`, `cobaye`,
`Emprise`, `grand-oral`, `graphiques-trompeurs`, `radar-desinfo`, `radarnaque`,
`repare-la-une`, `rhetor`.

Cible : un fichier de logique + un dictionnaire de contenu par langue, chargé selon
`I18N.lang`. **Preuve que la dérive a déjà commencé :** `Arcade quizz/qcm-store-en.js`
a gardé 4 noms de séries en français.

### 10.2 — `fakemetre/` (dépôt séparé)

- `index.html` fait **3 900 lignes** — à découper.
- Les **deux** fichiers de questions sont chargés quelle que soit la langue :
  `questions_fr.js` (407 Ko) + `questions_en.js` (358 Ko) = **750 Ko** dont la moitié est
  du code mort à chaque visite.
- ~3,5 Mo d'images dupliquées FR/EN **identiques à l'octet près** : dédupliquer,
  redimensionner (une image de 1 254 px est affichée à 280 px), passer en WebP + `lazy`.
- **52 `alert()`/`confirm()` natifs** alors que le jeu a déjà ses propres modales.
- Des clés d'API sont dans le code de jeu — à sortir.

### 10.3 — `document.write`

`Planète connaissance.html` (l. ~357) et `arene-rhetorique/index.html` chargent leur
moteur par `document.write`. Si le script échoue, **page blanche silencieuse**.
Remplacer par une insertion DOM classique avec message d'erreur visible.

Même symptôme constaté sur `recrutement-de-mehdi/index.html` : écran entièrement noir
quand Supabase ne répond pas. Prévoir un état d'erreur.

### 10.4 — Boucle éditeur → hub cassée

`Arcade quizz/editeur-questions.html` exporte un fichier `.js` que
`Arcade quizz/index.html` **ne sait pas réimporter** (il n'accepte que `.xlsx`/`.json`).
L'éditeur édite par ailleurs toujours le set par défaut, jamais la série sélectionnée.
C'est aussi la seule page de l'arcade non traduite.

---

## 11. Chantier 07 — Vitrine & découvrabilité ≈ 3 j

### 11.1 — La taxonomie à implémenter dans `index.html`

**Quatre** sections. Un jeu n'apparaît que dans **une** section.

**🎮 Jeux** — ce à quoi on joue
> FakeMètre · **Radar'naque** · Radar de la désinfo · Més·Dés·Mal · Répare la Une ·
> Arène rhétorique · Le Grand Oral · Chasse aux biais · **RÉSO · Alberte** ·
> Arcade quizz (hub) · Planète Connaissance · Mine la planète · Snake · Échecs ·
> Biais de confirmation CM1

**👁️ Illusions & démonstrations** — ce qu'on montre, sans gagner ni perdre
> Les 10 illusions d'optique (via leur hub) · Terre ronde ou plate ? ·
> Graphiques trompeurs · Notes Google

**🫂 Sensibilisation** — la seule famille où l'on ne joue pas
> Emprise · `Emprise/texto total.html`

**🎤 Interventions** — ce qui sert à animer devant un public
> Recrutement de Mehdi · Lignes numérotées · Éditeur de questions ·
> Exploration (parcours + avatar)

> **Affectation arrêtée par Antonin le 14 août.** « Sensibilisation » ne contient
> **qu'Emprise** (le jeu et sa conversation `texto total.html`). Radar'naque et
> RÉSO · Alberte sont des **jeux** et restent dans la famille « Jeux » — j'avais proposé
> de les basculer, c'était à tort.
>
> La famille peut donc n'afficher qu'une ou deux cartes au lancement : c'est assumé, elle
> existe parce que le registre est différent, pas parce qu'il y a du volume à ranger.
> Prévoir une mise en page qui reste digne avec une seule carte.

**Marqueur transversal :** un badge « 🎤 utilisable en conférence » posable sur
n'importe quelle carte des quatre sections, avec un filtre correspondant. Une illusion
d'optique reste dans sa famille mais ressort quand on filtre « pour animer ».

**Filtres à prévoir** : famille · durée · niveau scolaire · support (clavier / tactile) ·
langue disponible.

### 11.2 — Métadonnées par carte

Sur chaque carte : **durée**, **niveau scolaire**, **support**, **langue**. Aujourd'hui
un enseignant voit 12 cartes alignées sans savoir laquelle dure 10 minutes.

### 11.3 — Publier les jeux orphelins

**Vérifié :** `jeu-lignes-numerotees/` et `Reco Alberte/` ne sont liés **depuis aucune
page**. Ce sont deux jeux finis, invisibles. Les ajouter au portail.

`jeu-lignes-numerotees/index.html` est par ailleurs la seule page à n'avoir reçu
**aucune** passe d'harmonisation : ni lien retour, ni `focus-visible`, ni
`prefers-reduced-motion`, ni i18n. À rattraper avec le gabarit du chantier 05.

### 11.4 — Métadonnées de page

**Vérifié : 4 pages sur 61** ont une `meta description`. Plusieurs `<title>` ne sont pas
descriptifs. Ajouter `description` + `og:title`/`og:description`/`og:image` sur les 61
pages — les liens partagés à des enseignants s'affichent aujourd'hui sans aperçu.

### 11.5 — `notes_google.html`

Maquette réaliste d'une fiche d'avis Google, mais **aucune consigne, aucune interaction,
aucun objectif et aucune sortie**. On y arrive depuis le portail sans savoir quoi
chercher ; le seul indice pédagogique est un texte gris de 12 px en pied de page.

À faire : une consigne en tête (« Repère les indices d'un faux avis : dates groupées,
texte générique, notes extrêmes… »), idéalement une interaction (survol/clic qui annote
les indices), et un lien de sortie discret hors du cadre de la fausse page.

### 11.6 — Page « pour les enseignants »

Quel jeu pour quel objectif, en combien de temps, à quel niveau. C'est le premier besoin
d'un enseignant qui découvre la collection.

---

## 12. Annexes

### 12.1 — Les 9 problèmes bloquants, par ordre de gravité

1. ~~`fake-blaster` et les deux `snake` : aucune explication pédagogique, jamais~~ ✅ (**04**)
2. `snake-fakenews.html` racine : aucune media query, déborde de tout téléphone (**03**)
3. `mine.html` : `cursor:none` + textes à 4,5 px, sur un jeu pour le primaire (**03**, **05**)
4. ~~`fakenews_defender` : la règle affichée contredit le code~~ ✅ (**04**)
5. `graphiques-trompeurs` : injouable sans la vue, le graphique est la question (**02**)
6. `fakemetre` : le curseur central inopérable au clavier (**02**)
7. `echecs` : mode Exercice injouable sans souris (**02**, **03**)
8. `adelson.html` : ni titre, ni consigne, ni explication (**05**)
9. ~~`radar-desinfo` : la partie coupe avant de montrer le contenu restant~~ ✅ (**04**)

Restent donc **6 bloquants sur 9**, tous couverts par les chantiers 02, 03 et 05.

### 12.2 — Ce qui est déjà bon — ne pas casser

- **`arene-rhetorique`** : `aria-live`, focus géré, confirmation avant de quitter. Le modèle.
- **`chasse-aux-biais`** : le verrouillage de 2 s (« respiration ») avant de pouvoir
  répondre est le meilleur trouvaille pédagogique de la collection.
- **`qcm-classique`** : mélange des questions **et** des options + explication systématique.
- **`Reco Alberte`** : détection de contenu de détresse avec réponse adaptée et numéro
  d'aide, indices progressifs, reprise de session, export de conversation.
- **`Més·Dés·Mal`** : légende pédagogique en intro, formats de scénario variés, raccourcis
  clavier 1/2/3.
- **`radarnaque`** et **`repare-la-une`** : leurs audits internes respectifs ont été
  appliqués presque intégralement. Lire `radarnaque/Radarnaque-audit-et-nouveaux-scenarios.md`
  et `repare-la-une/Repare-la-Une-audit-UXUI.md` avant d'y toucher.
- **`Planète connaissance`** : clavier complet, tactile, canvas redimensionné au `resize`.

### 12.3 — Documents internes existants à lire selon le chantier

| Fichier | Utile pour |
|---|---|
| `Arcade quizz/TODO-UX.md`, `TODO-audit.md`, `PRODUCT.md` | chantiers 04, 03 |
| `radarnaque/Radarnaque-audit-et-nouveaux-scenarios.md` | chantier 04 |
| `repare-la-une/Repare-la-Une-audit-UXUI.md` | chantier 04 |
| `Reco Alberte/RESO-retours-tests.md` | points §9.2 et §8 encore ouverts |
| `fakemetre/TODO_FAKEMETRE.md` (69 Ko) | chantier 06 |
| `recrutement-de-mehdi/TODO.md` | contenu de phase 2 signalé non finalisé |
| `Biais cognitifs/extracted/architecture-site-biais-cognitifs.md` | chantier 05 |
| `_prive/SUGGESTIONS-JEUX.html` | historique des correctifs déjà passés |
| `_prive/patch01.py` | ce qui a été fait au chantier 01, exactement |

### 12.4 — Recette avant chaque commit

- [ ] Ouvert en **1440 px et 390 px**, sur le serveur local (pas `file://`)
- [ ] **0 erreur** dans la console
- [ ] Testé **au clavier seul** (Tab, Entrée, Espace, flèches) sur le parcours modifié
- [ ] Le correctif est appliqué **aux deux fichiers FR et EN** (tant que 06 n'est pas fait)
- [ ] Le lien « ← Retour aux jeux » fonctionne encore
- [ ] Bascule FR/EN testée : aucun texte n'est resté dans l'autre langue, aucune clé
      brute affichée (`pageTitle`, `footerTag`…)
- [ ] `git add` avec des chemins **explicites**, jamais `-A`
