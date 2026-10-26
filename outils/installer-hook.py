#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Installe le hook git qui régénère l'état après chaque commit.

    python3 outils/installer-hook.py

À lancer UNE FOIS par clone. Les hooks vivent dans `.git/hooks/`, qui n'est pas
versionné : ils ne suivent pas un `git clone`. D'où ce script, lui versionné.

Le hook appelle `outils/etat-refonte.py`, qui écrit `_prive/etat.html` (pour
l'humain) et `_prive/ETAT.md` (pour les agents). Les deux sont dans `_prive/`,
donc ignorés par git : le hook ne salit jamais l'arbre de travail et ne peut pas
déclencher de conflit.
"""
import os, io, sys, stat

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HOOKS = os.path.join(RACINE, ".git", "hooks")
MARQUE = "# etat-refonte"

HOOK = """#!/bin/sh
{marque} — régénère le panneau de commande après chaque commit.
# Installé par outils/installer-hook.py. Silencieux en cas d'échec : un hook
# ne doit jamais bloquer un commit.
python3 "$(git rev-parse --show-toplevel)/outils/etat-refonte.py" >/dev/null 2>&1 || true
""".format(marque=MARQUE)


def poser(nom):
    chemin = os.path.join(HOOKS, nom)
    if os.path.isfile(chemin):
        existant = io.open(chemin, encoding="utf-8", errors="replace").read()
        if MARQUE in existant:
            print(u"  %-14s déjà installé" % nom)
            return
        # ne jamais écraser un hook que quelqu'un d'autre a posé
        sauve = chemin + ".avant-etat-refonte"
        io.open(sauve, "w", encoding="utf-8").write(existant)
        print(u"  %-14s hook existant sauvegardé dans %s" % (nom, os.path.basename(sauve)))
    io.open(chemin, "w", encoding="utf-8", newline="\n").write(HOOK)
    try:
        os.chmod(chemin, os.stat(chemin).st_mode | stat.S_IEXEC | stat.S_IXGRP | stat.S_IXOTH)
    except Exception:
        pass
    print(u"  %-14s installé" % nom)


def main():
    if not os.path.isdir(HOOKS):
        print(u"Pas de dossier .git/hooks — lance ce script depuis le dépôt.")
        return 1
    print(u"Installation des hooks dans .git/hooks :")
    # post-commit  : après un commit local
    # post-merge   : après un pull ou un merge
    # post-checkout: après un changement de branche
    for nom in ("post-commit", "post-merge", "post-checkout"):
        poser(nom)
    print(u"")
    print(u"Fait. `_prive/ETAT.md` et `_prive/etat.html` seront régénérés")
    print(u"automatiquement à chaque commit, merge et changement de branche.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
