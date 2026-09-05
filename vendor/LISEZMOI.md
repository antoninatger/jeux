# `vendor/` — bibliothèques tierces servies depuis le dépôt

Le projet reste **vanilla, sans build et sans npm**. Ce dossier n'est pas une
exception à cette règle : ce sont des fichiers déjà minifiés, téléchargés une
fois et versionnés tels quels. Rien ne les compile, rien ne les installe.

## Pourquoi les héberger ici

Les pages sont jouées **en classe**, où le réseau n'est ni garanti ni rapide.
Une bibliothèque chargée depuis un CDN qui ne répond pas échoue en silence :
l'ancien hub de l'Arcade affichait « XLSX is not defined » dans la console et
**rien du tout à l'écran** quand un enseignant tentait d'importer son fichier.

## Ce qu'il contient

| Fichier | Version | Origine | Utilisé par |
|---|---|---|---|
| `xlsx.full.min.js` | 0.18.5 | `https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js` | `Arcade quizz/index.html`, `Arcade quizz/editeur-questions.html` |

`xlsx.full.min.js` (SheetJS Community Edition) est sous licence Apache 2.0.

## Pour mettre à jour

Retélécharger le fichier depuis l'URL ci-dessus avec le numéro de version
voulu, remplacer le fichier, mettre à jour le tableau, et vérifier les deux
pages : télécharger le modèle Excel depuis le hub, puis le réimporter.

Les deux pages qui s'en servent affichent un message en français si la
bibliothèque manque — elles ne se contentent plus d'une erreur console.
