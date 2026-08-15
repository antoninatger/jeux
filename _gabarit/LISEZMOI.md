# `_gabarit/` — point de départ d'un nouveau jeu

Chantier 05, §5.5. Objectif : **que le prochain jeu n'ait plus à être rattrapé
après coup.** Les chantiers 01 à 05 ont consisté, pour l'essentiel, à rattraper
34 jeux écrits sans socle. Ce dossier existe pour que ça ne recommence pas.

## Démarrer

```bash
cp -r _gabarit mon-nouveau-jeu
# puis dans index.html : le <title>, le :root d'identité, les clés i18n
python3 -m http.server 8899   # file:// casse les scripts et l'i18n
```

Ouvrir `http://localhost:8899/mon-nouveau-jeu/`.

## Ce qui est déjà en place — ne pas le réécrire

| Acquis | D'où il vient |
|---|---|
| En-tête `retour \| titre \| langue` | `collection.js`, automatique |
| Polices servies depuis le dépôt | `fonts/fonts.css` — **jamais** Google Fonts |
| `:focus-visible`, `prefers-reduced-motion` | `collection.css`, une seule fois |
| Cibles tactiles à 44 px | `collection.css`, par défaut sur les contrôles |
| Échelle typographique, plancher à 12,8 px | `--fs-100` … `--fs-700` |
| Écrans intro / jeu / fin | `.col-intro`, `.col-fin` |
| Énoncé + panneau pédagogique | `.col-enonce`, `.col-savoir` (`<details>` natif) |
| Grille de cartes (pour un hub) | `.col-cartes`, `.col-carte` |
| FR/EN | `i18n.js`, dictionnaires en bas de page |

**Il ne faut donc écrire ni pastille de retour, ni bouton FR/EN, ni bloc de
focus, ni `@media (prefers-reduced-motion)`.** C'était le cas dans les 34 jeux :
c'est ce qui coûtait 34 corrections à chaque changement.

## Ce qu'il reste à faire, à chaque fois

1. **L'identité, dans le `:root`.** Le socle impose la structure et le
   contraste, pas la direction artistique. Redéfinir `--bg`, `--surface`,
   `--txt`, `--acc`, `--font-texte`, `--font-titre`.
   `--txt-secondaire` est le seul rôle **contraint** : il doit tenir **4,5:1
   sur `--bg`**. Le vérifier, ne pas le recopier au hasard.
2. **Les tailles sur les jetons.** Aucun `font-size` en dur sous `--fs-100`.
   Attention : une police d'affichage large tient pour un libellé court et
   déborde pour une phrase — voir la reprise de `mine.html`, où les phrases
   ont changé de police pour être **plus grandes et plus étroites**.
3. **FR et EN dès le départ.** Toute chaîne visible passe par une clé, y
   compris celles injectées en JS. Les rattraper après coup coûte dix fois
   plus cher.
4. **La méta de l'intro** : durée, niveau, commandes. C'est ce que le §5.3
   reprochait à toute la collection — un enseignant voyait douze jeux sans
   savoir lequel dure dix minutes.
5. **`aria-live` sur le retour au joueur.** Un résultat doit être *annoncé*,
   pas seulement affiché. Seuls 4 fichiers sur 61 le faisaient.

## Deux principes qui viennent du chantier 04

- **L'énoncé avant la manipulation.** On ne demande pas de chercher sans dire
  quoi chercher.
- **L'explication à l'erreur comme à la réussite.** Le moment où l'élève se
  trompe est celui où il est le plus disponible pour apprendre. Dans cinq jeux
  d'arcade sur six, il ne recevait rien.

## Recette avant de publier

1440 px **et** 390 px (et 320/360 si la page est dense) · **0 erreur console** ·
testé **au clavier seul** · **FR et EN** à jour, aucune clé brute affichée ·
lien de retour fonctionnel · **0 élément sous 12,8 px** · 0 débordement
horizontal.
