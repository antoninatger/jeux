# Collection « Jeux » — contexte projet

Collection de ~34 jeux et modules web pédagogiques (esprit critique, désinformation,
biais cognitifs, rhétorique, illusions d'optique), par Antonin Atger. Publiée sur
GitHub Pages, utilisée en classe et en conférence.

## 👉 Avant toute modification : lire `REFONTE-UX.md`

Une refonte UX/UI en 7 chantiers est en cours sur la branche `refonte-ux`.
`REFONTE-UX.md` contient l'état des lieux, les décisions produit déjà arbitrées et le
détail fichier par fichier de ce qui reste à faire. **Le chantier en cours est le 04
(« La pédagogie d'abord »).**

## Règles non négociables

- **HTML/CSS/JS vanilla. Pas de framework, pas d'étape de build, pas de npm.**
  C'est un choix assumé : chaque jeu doit pouvoir être ouvert et compris seul.
- **Ne jamais faire `git add -A`.** Le dossier contient des fichiers pré-modifiés sans
  rapport avec la refonte. Commit toujours avec une liste de chemins explicite.
- **Chaque correction de logique doit être appliquée deux fois**, dans `app.js` **et**
  `app-en.js` (idem `data.js`/`data-en.js`, `scenarios.js`/`scenarios-en.js`), tant que
  le chantier 06 n'a pas fusionné les paires. C'est la première cause de bugs du projet.
- `recrutement-de-mehdi/` et `fakemetre/` sont des **dépôts git indépendants** : y
  commiter séparément.
- **Ne pas reformater** un fichier existant : indentation hétérogène assumée, un
  reformatage rendrait la revue impossible.
- Commentaires et messages de commit **en français**.

## 👉 En début de session : lire `_prive/ETAT.md`

C'est l'état **mesuré** du dépôt : pages migrées sur le socle, bloquants encore
ouverts, pages restées sur Google Fonts, tailles en dur sous le plancher, avancement
par lot, liste nominative des pages non migrées, derniers commits.

**Lis-le avant de commencer.** C'est l'état réel, pas un souvenir — et il évite de
reposer des questions dont la réponse est dans le code.

Il est **régénéré automatiquement** après chaque commit, merge et changement de
branche, par un hook git. Rien à lancer à la main. Deux sorties, même source :

- `_prive/ETAT.md` — pour les agents (Claude Code et Claude dans Cowork), 3 Ko ;
- `_prive/etat.html` — pour Antonin, le même contenu en tableau de bord.

Si `_prive/ETAT.md` est absent ou visiblement périmé, c'est que les hooks ne sont pas
installés sur ce clone (ils vivent dans `.git/hooks/`, qui n'est pas versionné) :

```bash
python3 outils/installer-hook.py     # une fois par clone
python3 outils/etat-refonte.py       # régénère à la demande
```

Tout y est mesuré. Le statut d'un bloquant est obtenu en **rejouant son test** sur le
code (présence d'un champ, d'un attribut, d'une media query), jamais en cochant une
case : un bloquant se ferme quand le code le ferme. Si un test devient faux parce que
le code a été écrit autrement, corrige le test dans `outils/etat-refonte.py` — ne
contourne pas, et ne modifie jamais `ETAT.md` à la main, il sera écrasé.

L'état est un tableau de bord, pas une source de vérité : pour la suite des travaux
et les décisions produit, la référence reste `REFONTE-UX.md`.

## Quel modèle pour cette session — à signaler à Antonin

Antonin veut être **prévenu en début de session** quand la tâche demandée justifie de
basculer sur **Fable 5** (`/model claude-fable-5`) plutôt que le modèle courant. Ne pas
basculer soi-même : le signaler en une phrase, il décide.

**Le signaler quand la session correspond à au moins deux de ces critères :**

- migration ou refactorisation **de masse** — plus d'une dizaine de fichiers à
  transformer de la même façon dans une seule session (typiquement l'étape 4 de la
  tranche 2 : les 11 pages d'arcade, puis les 3 catalogues, puis ~30 pages) ;
- la difficulté n'est pas de savoir quoi faire, mais de **rester cohérent du premier
  au dernier fichier** ;
- travail autonome long, sans point de contrôle intermédiaire ;
- besoin de tenir beaucoup de fichiers volumineux en contexte simultanément
  (`fakemetre/index.html` fait 3 900 lignes, `questions_fr.js` 407 Ko).

**Ne pas le signaler pour :** le travail de précision sur un ou deux fichiers, la
rédaction de contenu, les passes de relecture, la correction d'un bug identifié. Le
modèle courant y suffit largement — la qualité livrée sur le chantier 04 et la
tranche 1 du chantier 05 le montre.

Fable 5 coûte 10 $/M en entrée et 50 $/M en sortie : le signalement doit rester
l'exception, pas un réflexe.

## Tester

Pas de build. Mais `file://` casse les scripts et l'i18n — il faut un serveur :

```bash
python3 -m http.server 8899
# http://localhost:8899/<jeu>
```

Vérifier systématiquement **en 390 px de large en plus du desktop** : la moitié des
défauts du projet ne sont visibles qu'en mobile.

Les polices viennent de Google Fonts : hors ligne, tout bascule en police système et le
rendu paraît cassé sans l'être. Ne pas « corriger » une typo sans avoir vérifié ça.

## Recette avant commit

1440 px **et** 390 px · 0 erreur console · testé au clavier seul · FR **et** EN à jour ·
lien de retour fonctionnel · bascule de langue sans clé brute affichée.
