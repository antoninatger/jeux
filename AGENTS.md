# AGENTS.md — collection « Jeux »

Ce fichier est pour Codex : il lit `AGENTS.md`, pas `CLAUDE.md`. La référence complète du
dépôt reste [`CLAUDE.md`](CLAUDE.md) (contexte projet, chantier UX en cours, comment
tester) — la lire s'il faut plus de contexte qu'une tâche bornée n'en donne. Le plan
d'action qui a produit ta tâche est dans `_prive/audit-2026-09/PLAN-ACTION.md`.

## Les cinq règles non négociables

- **HTML/CSS/JS vanilla. Pas de framework, pas d'étape de build, pas de npm.** Chaque jeu
  doit pouvoir être ouvert et compris seul.
- **Ne jamais faire `git add -A`.** Le dépôt contient des fichiers pré-modifiés sans
  rapport avec ta tâche. Toujours une liste de chemins explicite.
- **Chaque correction de logique s'applique deux fois** : `app.js` **et** `app-en.js`
  (idem `data.js`/`data-en.js`, `scenarios.js`/`scenarios-en.js`). Une PR qui ne touche
  qu'un fichier de la paire est refusée.
- `recrutement-de-mehdi/` et `fakemetre/` sont des **dépôts git indépendants** : ne pas
  les commiter depuis ce dépôt-ci.
- **Ne pas reformater** un fichier existant : modifier uniquement les lignes concernées,
  indentation hétérogène conservée.

Commits en français, une PR par tâche. Vérifier en 1440 px et 390 px, 0 erreur console.
