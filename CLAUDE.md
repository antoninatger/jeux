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
