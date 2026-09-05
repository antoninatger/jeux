#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Panneau de commande de la refonte — généré depuis le dépôt.

    python3 outils/etat-refonte.py

Écrit `_prive/etat.html` (dossier ignoré par git) et affiche un résumé dans le
terminal. Tout ce qu'il montre est MESURÉ : compté dans les fichiers ou lu dans
`git log`. Rien n'est saisi à la main, donc rien ne peut mentir — c'est la
raison d'être de ce script plutôt que d'une page tenue à jour à la main.

À lancer en début de session, et après chaque livraison.
"""
import os, re, io, sys, json, subprocess, datetime

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SORTIE = os.path.join(RACINE, "_prive", "etat.html")
SORTIE_MD = os.path.join(RACINE, "_prive", "ETAT.md")
IGNORE = {"Obso", ".git", ".agents", "_prive", "_to_delete", "Collège Lycée",
          "node_modules", ".claude", "fonts", "extracted"}

# ── Le seul contenu saisi à la main : la liste des bloquants de l'audit et le
#    test qui décide de leur statut. Un bloquant se ferme quand son test passe,
#    pas quand quelqu'un le déclare fermé.
BLOQUANTS = [
    ("Fake Blaster et les deux Snake n'affichaient jamais l'explication",
     lambda f: min(f.get("Arcade quizz/fake-blaster.html", "").count("expl"),
                   f.get("snake-fakenews.html", "").count("expl")) > 0),
    ("Fake News Defender : la consigne affichée contredisait le code",
     lambda f: "La bonne réponse, elle, peut passer" in f.get("Arcade quizz/fakenews_defender.html", "")),
    ("Radar désinfo coupait la partie avant de montrer le contenu restant",
     lambda f: "training" in f.get("radar-desinfo/app.js", "")),
    ("adelson.html : ni titre, ni consigne, ni explication",
     lambda f: "col-enonce" in f.get("Ilusions d'optique/adelson.html", "")),
    ("Mine la planète : texte à 4,5 px, et injouable au doigt",
     lambda f: ".36rem" not in f.get("mine.html", ""),
     lambda f: "pointer:coarse" in f.get("mine.html", "") or "pointer: coarse" in f.get("mine.html", "")),
    ("Snake racine : aucune media query, injouable au doigt",
     lambda f: "@media" in f.get("snake-fakenews.html", ""),
     lambda f: "touchmove" in f.get("snake-fakenews.html", "")),
    ("Graphiques trompeurs : injouable sans la vue",
     lambda f: "Graphique à analyser" not in f.get("graphiques-trompeurs/app.js", "")),
    ("FakeMètre : le curseur central n'est pas opérable au clavier",
     lambda f: 'role="slider"' in f.get("fakemetre/index.html", "")),
    ("Échecs : le mode Exercice exige la souris",
     lambda f: "tabindex" in f.get("echecs-board.js", "")),
]

LOTS = [
    ("Illusions", lambda p: p.startswith("Ilusions d'optique/")),
    ("Arcade", lambda p: p.startswith("Arcade quizz/")),
    ("Catalogues", lambda p: p.split("/")[0] in ("Biais cognitifs", "cobaye", "rhetor")),
    ("Interventions", lambda p: p.startswith("recrutement-de-mehdi/") or p.startswith("exploration/")
                                 or p == "jeu-lignes-numerotees/index.html"),
    ("Le reste", lambda p: True),
]

# ── A3 : contraste du texte secondaire sur les pages migrées ────────────────
# Un deuxième test (présence d'un récapitulatif de fin) est prévu par le plan
# d'action mais différé : son témoin (`data-col-recap` ou équivalent) est
# défini par la tâche E1, qui n'est pas encore écrite. Ne pas ajouter ici un
# test qui renverrait faux partout — l'ajouter quand E1 existe.

SEUIL_CONTRASTE = 4.5

_RE_HEX = re.compile(r'^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$')
_RE_RGB = re.compile(
    r'^rgba?\(\s*([\d.]+)\s*[, ]\s*([\d.]+)\s*[, ]\s*([\d.]+)\s*(?:[,/]\s*[\d.%]+\s*)?\)$', re.I)


def _parser_couleur(valeur):
    """#rgb, #rrggbb, rgb()/rgba() — l'alpha est ignoré (seule la couleur compte
    pour le contraste). Tout le reste (hsl(), couleur nommée, valeur vide…)
    n'est délibérément pas résolu : le script ne fait pas de vraie cascade CSS
    et ne doit pas prétendre le contraire."""
    v = valeur.strip().split("!important")[0].strip()
    m = _RE_HEX.match(v)
    if m:
        h = m.group(1)
        if len(h) == 3:
            h = "".join(c * 2 for c in h)
        return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))
    m = _RE_RGB.match(v)
    if m:
        try:
            return tuple(max(0, min(255, int(round(float(m.group(i)))))) for i in (1, 2, 3))
        except Exception:
            return None
    return None


def _lin_channel(v):
    c = v / 255.0
    return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4


def _luminance(rgb):
    r, g, b = rgb
    return 0.2126 * _lin_channel(r) + 0.7152 * _lin_channel(g) + 0.0722 * _lin_channel(b)


def _ratio_contraste(rgb1, rgb2):
    l1, l2 = _luminance(rgb1), _luminance(rgb2)
    plus_clair, plus_sombre = (l1, l2) if l1 >= l2 else (l2, l1)
    return (plus_clair + 0.05) / (plus_sombre + 0.05)


def _autotest_contraste():
    """Trois paires de référence WCAG. S'arrête en erreur si l'une échoue :
    sans cet auto-test, une erreur de linéarisation donne des ratios plausibles
    et faux, invisibles tant que personne ne les vérifie à la main."""
    ref = [
        ((0, 0, 0), (255, 255, 255), 21.00, None),
        ((0x76, 0x76, 0x76), (255, 255, 255), 4.54, ">="),
        ((0x77, 0x77, 0x77), (255, 255, 255), 4.48, "<"),
    ]
    for rgb1, rgb2, attendu, seuil in ref:
        ratio = _ratio_contraste(rgb1, rgb2)
        if abs(ratio - attendu) > 0.01:
            raise SystemExit(
                u"AUTOTEST CONTRASTE ÉCHEC : %s sur %s -> %.4f, attendu ≈ %.2f"
                % (rgb1, rgb2, ratio, attendu))
        if seuil == ">=" and ratio < SEUIL_CONTRASTE:
            raise SystemExit(u"AUTOTEST CONTRASTE ÉCHEC : #767676 devrait franchir 4,5:1")
        if seuil == "<" and ratio >= SEUIL_CONTRASTE:
            raise SystemExit(u"AUTOTEST CONTRASTE ÉCHEC : #777777 ne devrait pas franchir 4,5:1")


def _theme_de_page(html):
    """Le thème déclaré par la page : `<html data-theme="clair">` → "clair".

    Depuis la tâche E4, le socle fournit un thème clair complet sous
    `[data-theme="clair"]`, et les pages claires (Emprise, les onze pages
    d'illusions, l'éditeur de l'Arcade) le portent au lieu de recopier les
    jetons. Sans cette lecture, le script résolvait --txt-secondaire sur la
    valeur du thème sombre et annonçait 1,80:1 sur une page parfaitement
    conforme."""
    m = re.search(r'<html\b[^>]*\bdata-theme\s*=\s*["\']([\w-]+)["\']', html, re.I)
    return m.group(1) if m else None


def _extraire_declarations(css, theme=None):
    """Retourne une liste de (nom_variable, valeur, conditionnel) dans l'ordre
    d'apparition. conditionnel=True si la déclaration est sous @media/@supports
    ou sous un sélecteur [data-theme=…] qui ne correspond PAS au thème de la
    page — ces valeurs ne sont jamais retenues comme « la » valeur d'un jeton,
    seulement comme motif de non-mesure quand rien d'autre n'existe.

    Le bloc du thème que la page déclare vraiment, lui, s'applique : il compte
    comme n'importe quelle règle de `:root`, et il vient après elle."""
    texte = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    out = []
    pile = []
    buf = []
    for c in texte:
        if c == '{':
            selecteur = "".join(buf).strip()
            buf = []
            porte_theme = "[data-theme" in selecteur
            theme_actif = bool(theme) and ('[data-theme="%s"]' % theme in selecteur
                                           or "[data-theme='%s']" % theme in selecteur)
            est_cond = (selecteur.startswith("@media") or selecteur.startswith("@supports")
                        or (porte_theme and not theme_actif))
            parent_cond = pile[-1] if pile else False
            pile.append(est_cond or parent_cond)
            continue
        if c == '}':
            if pile:
                pile.pop()
            buf = []
            continue
        if c == ';':
            decl = "".join(buf)
            buf = []
            m = re.match(r"^\s*(--[\w-]+)\s*:\s*(.+?)\s*$", decl)
            if m:
                out.append((m.group(1), m.group(2), pile[-1] if pile else False))
            continue
        buf.append(c)
    return out


def _feuilles_liees(html, chemin_page):
    """Renvoie (liste_de_textes_css, motif_si_introuvable). Une feuille externe
    (http/https) est ignorée : hors sujet du contraste. `collection.css` est
    exclu, déjà pris comme première source."""
    dossier_rel = os.path.dirname(chemin_page)
    ordre, vus = [], set()
    for m in re.finditer(r'<link\b([^>]*)>', html, re.I):
        attrs = m.group(1)
        if not re.search(r'rel=["\']stylesheet["\']', attrs, re.I):
            continue
        mh = re.search(r'href=["\']([^"\']+)["\']', attrs, re.I)
        if mh and mh.group(1) not in vus:
            vus.add(mh.group(1))
            ordre.append(mh.group(1))
    textes = []
    for href in ordre:
        if href.startswith(("http:", "https:", "//")):
            continue
        chemin_abs = os.path.normpath(os.path.join(RACINE, dossier_rel, href))
        rel = os.path.relpath(chemin_abs, RACINE).replace("\\", "/")
        if rel == "collection.css":
            continue
        if not os.path.isfile(chemin_abs):
            return None, u"feuille liée introuvable : %s" % href
        textes.append(lire(chemin_abs))
    return textes, None


def _resoudre_jeton(nom, dernier, vu, niveau=0):
    """Dernière déclaration non conditionnelle de `nom`, résolue en (r,g,b), ou
    (None, motif). Un var(--autre) est suivi sur un seul niveau."""
    if nom not in vu:
        return None, u"%s absent" % nom
    if nom not in dernier:
        return None, u"%s déclaré uniquement dans un bloc @media ou [data-theme=…]" % nom
    val = dernier[nom].strip()
    m = re.match(r'^var\(\s*(--[\w-]+)', val)
    if m:
        if niveau >= 1:
            return None, u"%s : plus d'un niveau de var()" % nom
        rgb, motif = _resoudre_jeton(m.group(1), dernier, vu, niveau=niveau + 1)
        if rgb is None:
            return None, u"%s renvoie à %s, non résolu (%s)" % (nom, m.group(1), motif)
        return rgb, None
    rgb = _parser_couleur(val)
    if rgb is None:
        return None, u"%s = %s, format de couleur non reconnu (hsl(), couleur nommée…)" % (nom, val)
    return rgb, None


def _evaluer_contraste(chemin, html, fichiers):
    """('conforme'|'sous_seuil'|'non_mesuree', motif, ratio, #bg, #txt)."""
    try:
        feuilles, motif = _feuilles_liees(html, chemin)
        if motif:
            return "non_mesuree", motif, None, None, None
        sources = [fichiers.get("collection.css", "")] + feuilles + \
            re.findall(r'<style\b[^>]*>(.*?)</style>', html, re.I | re.S)
        theme = _theme_de_page(html)
        dernier, vu = {}, set()
        for css in sources:
            for nom, val, cond in _extraire_declarations(css, theme):
                vu.add(nom)
                if not cond:
                    dernier[nom] = val
        rgb_bg, motif_bg = _resoudre_jeton("--bg", dernier, vu)
        rgb_txt, motif_txt = _resoudre_jeton("--txt-secondaire", dernier, vu)
        if rgb_bg is None or rgb_txt is None:
            return "non_mesuree", (motif_bg or motif_txt), None, None, None
        ratio = _ratio_contraste(rgb_bg, rgb_txt)
        etat = "conforme" if ratio >= SEUIL_CONTRASTE else "sous_seuil"
        return etat, None, ratio, "#%02x%02x%02x" % rgb_bg, "#%02x%02x%02x" % rgb_txt
    except Exception as e:
        return "non_mesuree", u"erreur d'analyse : %s" % e, None, None, None


def lire(chemin):
    try:
        return io.open(chemin, encoding="utf-8", errors="replace").read()
    except Exception:
        return ""


def collecter():
    pages, fichiers = [], {}
    for dp, dn, fn in os.walk(RACINE):
        dn[:] = [d for d in dn if d not in IGNORE]
        for f in fn:
            if not f.endswith((".html", ".js", ".css")):
                continue
            chemin = os.path.relpath(os.path.join(dp, f), RACINE).replace("\\", "/")
            if chemin.startswith("_"):
                continue
            contenu = lire(os.path.join(dp, f))
            fichiers[chemin] = contenu
            if f.endswith(".html"):
                pages.append((chemin, contenu))
    return pages, fichiers


def git(*args):
    try:
        return subprocess.run(["git"] + list(args), cwd=RACINE, capture_output=True,
                              text=True, timeout=20).stdout.strip()
    except Exception:
        return ""


def mesurer():
    pages, fichiers = collecter()
    m = {}
    m["pages"] = len(pages)
    m["migrees"] = [p for p, s in pages if "collection.css" in s]
    m["gfonts"] = [p for p, s in pages if "fonts.googleapis" in s]
    m["arialive"] = [p for p, s in pages if "aria-live" in s]
    m["description"] = [p for p, s in pages if re.search(r'name=["\']description["\']', s)]

    # tailles de police en dur sous le plancher de 12,8 px (0.8rem)
    dur = []
    for p, s in pages:
        for val in re.findall(r"font-size\s*:\s*([0-9.]+)rem", s):
            if float(val) < 0.8:
                dur.append(p)
                break
    m["souspalier"] = sorted(set(dur))

    # lots de migration
    vus, lots = set(), []
    for nom, test in LOTS:
        dedans = [p for p, _ in pages if p not in vus and test(p)]
        vus |= set(dedans)
        faits = [p for p in dedans if p in m["migrees"]]
        if dedans:
            lots.append((nom, len(faits), len(dedans)))
    m["lots"] = lots
    m["nonmigrees"] = sorted(p for p, _ in pages if p not in m["migrees"])

    # contraste du texte secondaire (A3) — mesuré sur chaque page migrée
    pages_par_chemin = dict(pages)
    conformes = 0
    sous_seuil, non_mesurees = [], []
    for chemin in m["migrees"]:
        etat, motif, ratio, hexbg, hextxt = _evaluer_contraste(
            chemin, pages_par_chemin[chemin], fichiers)
        if etat == "conforme":
            conformes += 1
        elif etat == "sous_seuil":
            sous_seuil.append((chemin, ratio, hexbg, hextxt))
        else:
            non_mesurees.append((chemin, motif))
    m["contraste"] = {
        "conformes": conformes,
        "sous_seuil": sorted(sous_seuil),
        "non_mesurees": sorted(non_mesurees),
    }

    # bloquants : chaque test est rejoué, aucun statut n'est saisi
    bl = []
    for entree in BLOQUANTS:
        libelle, test = entree[0], entree[1]
        second = entree[2] if len(entree) > 2 else None
        try:
            a = bool(test(fichiers))
        except Exception:
            a = False
        try:
            b = bool(second(fichiers)) if second else None
        except Exception:
            b = False
        etat = "ok" if (a and (b is None or b)) else ("part" if (a or b) else "non")
        bl.append((libelle, etat))
    m["bloquants"] = bl

    m["branche"] = git("branch", "--show-current") or "?"
    journal = git("log", "--oneline", "-14", "--no-decorate")
    m["journal"] = [l for l in journal.split("\n") if l.strip()]
    m["propre"] = not [l for l in git("status", "--porcelain").split("\n")
                       if l.strip() and "impeccable" not in l and not l.startswith("??")]
    return m


def echapper(t):
    return (t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))


def rendre(m):
    n_pages, n_mig = m["pages"], len(m["migrees"])
    pct = round(n_mig * 100.0 / n_pages) if n_pages else 0
    ok = sum(1 for _, e in m["bloquants"] if e == "ok")
    part = sum(1 for _, e in m["bloquants"] if e == "part")
    date = datetime.date.today().strftime("%d/%m/%Y")

    lignes_lots = "\n".join(
        '<tr><td>{}</td><td class="n"><span class="mini"><i style="width:{}%"></i></span> {} / {}</td></tr>'
        .format(echapper(nom), round(f * 100.0 / t) if t else 0, f, t)
        for nom, f, t in m["lots"])

    etiquette = {"ok": ("✅ levé", "ok"), "part": ("🟠 à moitié", "part"), "non": ("🔴 ouvert", "non")}
    lignes_bl = "\n".join(
        '<tr><td>{}</td><td class="st {}">{}</td></tr>'.format(
            echapper(lib), etiquette[e][1], etiquette[e][0])
        for lib, e in m["bloquants"])

    contraste_conf = m["contraste"]["conformes"]
    contraste_nonm = len(m["contraste"]["non_mesurees"])
    lignes_contraste = []
    for p, r, bg, txt in m["contraste"]["sous_seuil"]:
        lignes_contraste.append(
            '<tr><td><code>{}</code></td><td class="st non">🔴 {}:1 ({} sur {})</td></tr>'.format(
                echapper(p), echapper(("%.2f" % r).replace(".", ",")), txt, bg))
    for p, motif in m["contraste"]["non_mesurees"]:
        lignes_contraste.append(
            '<tr><td><code>{}</code></td><td class="st inconnue">⚪ non mesurée : {}</td></tr>'.format(
                echapper(p), echapper(motif)))
    lignes_contraste = "\n".join(lignes_contraste) if lignes_contraste else \
        '<tr><td colspan="2">Toutes les pages migrées sont conformes.</td></tr>'

    if m["journal"]:
        journal = "<br>\n".join(
            "<b>{}</b> {}".format(echapper(l.split(" ", 1)[0]),
                                  echapper(l.split(" ", 1)[1] if " " in l else ""))
            for l in m["journal"])
    else:
        journal = (u"<em>git n'a pas r\u00e9pondu \u2014 journal indisponible. "
                   u"Lance le script depuis le d\u00e9p\u00f4t pour le voir appara\u00eetre.</em>")

    souspalier = len(m["souspalier"])

    return TEMPLATE.format(
        date=date, branche=echapper(m["branche"]),
        propre="arbre propre" if m["propre"] else "modifications non commitées",
        n_pages=n_pages, n_mig=n_mig, pct=pct,
        n_commits=len(m["journal"]),
        ok=ok, part=part, n_bl=len(m["bloquants"]),
        gfonts=len(m["gfonts"]), arialive=len(m["arialive"]),
        description=len(m["description"]), souspalier=souspalier,
        lignes_lots=lignes_lots, lignes_bl=lignes_bl, journal=journal,
        contraste_conf=contraste_conf, contraste_nonm=contraste_nonm,
        lignes_contraste=lignes_contraste)



def rendre_md(m):
    """Version courte et lisible par un agent. C'est CE fichier que Claude Code et
    Claude (Cowork) lisent en debut de session — pas le HTML, qui est pour l'humain."""
    n_pages, n_mig = m["pages"], len(m["migrees"])
    pct = round(n_mig * 100.0 / n_pages) if n_pages else 0
    date = datetime.date.today().strftime("%d/%m/%Y")
    L = []
    a = L.append
    a(u"# État de la refonte — %s" % date)
    a(u"")
    a(u"> Fichier **généré** par `outils/etat-refonte.py`, régénéré à chaque commit par")
    a(u"> le hook `post-commit`. Ne pas le modifier à la main : toute correction se fait")
    a(u"> dans le script. Pour la suite des travaux et les décisions produit, la")
    a(u"> référence reste `REFONTE-UX.md` — ce fichier ne dit que l'état mesuré.")
    a(u"")
    a(u"Branche `%s` — %s." % (m["branche"], u"arbre propre" if m["propre"] else u"modifications non commitées"))
    a(u"")
    a(u"## Chiffres")
    a(u"")
    a(u"| Mesure | Valeur |")
    a(u"|---|---|")
    a(u"| Pages sur le socle commun | **%d / %d** (%d %%) |" % (n_mig, n_pages, pct))
    a(u"| Bloquants levés | **%d / %d** (%d à moitié) |" % (
        sum(1 for _, e in m["bloquants"] if e == "ok"), len(m["bloquants"]),
        sum(1 for _, e in m["bloquants"] if e == "part")))
    a(u"| Pages encore sur Google Fonts | %d |" % len(m["gfonts"]))
    a(u"| Fichiers avec une taille en dur sous 12,8 px | %d |" % len(m["souspalier"]))
    a(u"| Pages avec `aria-live` | %d / %d |" % (len(m["arialive"]), n_pages))
    a(u"| Pages avec une `meta description` | %d / %d |" % (len(m["description"]), n_pages))
    a(u"| Pages migrées au contraste secondaire ≥ 4,5:1 | **%d / %d** (%d non mesurées) |" % (
        m["contraste"]["conformes"], n_mig, len(m["contraste"]["non_mesurees"])))
    a(u"")
    a(u"## Migration par lot")
    a(u"")
    a(u"| Lot | Fait | Total |")
    a(u"|---|---|---|")
    for nom, f, t in m["lots"]:
        a(u"| %s | %d | %d |" % (nom, f, t))
    a(u"")
    a(u"## Bloquants")
    a(u"")
    sym = {"ok": u"✅ levé", "part": u"🟠 à moitié", "non": u"🔴 ouvert"}
    for lib, e in m["bloquants"]:
        a(u"- %s — %s" % (sym[e], lib))
    a(u"")
    a(u"## Contraste du texte secondaire")
    a(u"")
    if m["contraste"]["sous_seuil"] or m["contraste"]["non_mesurees"]:
        for p, r, bg, txt in m["contraste"]["sous_seuil"]:
            a(u"- 🔴 `%s` — %s:1 (%s sur %s)" % (p, ("%.2f" % r).replace(".", ","), txt, bg))
        for p, motif in m["contraste"]["non_mesurees"]:
            a(u"- ⚪ `%s` — non mesurée : %s" % (p, motif))
    else:
        a(u"- toutes les pages migrées sont conformes.")
    a(u"")
    if m["nonmigrees"]:
        a(u"## Pages non encore migrées (%d)" % len(m["nonmigrees"]))
        a(u"")
        for chemin in m["nonmigrees"]:
            a(u"- `%s`" % chemin)
        a(u"")
    a(u"## Derniers commits")
    a(u"")
    if m["journal"]:
        for l in m["journal"][:10]:
            a(u"- `%s`" % l)
    else:
        a(u"- _git n'a pas répondu._")
    a(u"")
    return u"\n".join(L)


TEMPLATE = u"""<!DOCTYPE html>
<html lang="fr" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Refonte « Jeux » — panneau de commande</title>
<style>
  :root{{color-scheme:light;--bg:#f7f7f5;--surface:#fcfcfb;--surface-2:#f0f0ed;--line:#e0e0da;
    --line-strong:#c9c9c1;--ink:#0b0b0b;--ink-2:#52514e;--ink-3:#7a7975;--s1:#2a78d6;--s3:#1baf7a;
    --ok:#1a6b3c;--warn:#a35a00;--crit:#b3261e;--neutre:#d7d7d0;--r:10px;
    --sans:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
    --mono:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;}}
  :root[data-theme="dark"]{{color-scheme:dark;--bg:#141413;--surface:#1a1a19;--surface-2:#242423;
    --line:#33332f;--line-strong:#4a4a45;--ink:#fff;--ink-2:#c3c2b7;--ink-3:#918f86;--s1:#3987e5;
    --s3:#199e70;--ok:#6cd39a;--warn:#e8b25c;--crit:#ff8a80;--neutre:#3d3d38;}}
  *{{box-sizing:border-box}}
  body{{margin:0;background:var(--bg);color:var(--ink);font-family:var(--sans);line-height:1.55}}
  .wrap{{max-width:920px;margin:0 auto;padding:0 20px 70px}}
  h1{{font-size:clamp(1.5rem,3vw,2rem);letter-spacing:-.02em;margin:0}}
  h2{{font-size:1.15rem;margin:0 0 10px;letter-spacing:-.01em}}
  :focus-visible{{outline:3px solid var(--s1);outline-offset:2px;border-radius:4px}}
  @media (prefers-reduced-motion:reduce){{*{{transition-duration:.001ms!important}}}}
  code{{font-family:var(--mono);font-size:.85em;background:var(--surface-2);padding:1px 5px;
    border-radius:4px;border:1px solid var(--line)}}
  header.top{{background:var(--surface);border-bottom:1px solid var(--line);padding:22px 0 18px;margin-bottom:24px}}
  .ti{{position:relative;max-width:920px;margin:0 auto;padding:0 20px}}
  .kicker{{font:600 .7rem/1 var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--ink-3);margin:0 0 8px}}
  .sub{{color:var(--ink-2);max-width:62ch;margin:8px 0 0;font-size:.92rem}}
  .tb{{position:absolute;top:0;right:20px;background:var(--surface-2);color:var(--ink);
    border:1px solid var(--line-strong);border-radius:50px;padding:0 15px;min-height:44px;
    font:600 .8rem var(--sans);cursor:pointer}}
  .ti .kicker,.ti h1,.ti .sub{{padding-right:190px}}
  @media(max-width:720px){{.tb{{position:static;margin-bottom:12px}}
    .ti .kicker,.ti h1,.ti .sub{{padding-right:0}}}}
  section{{margin-top:34px}}
  .stats{{display:grid;grid-template-columns:repeat(auto-fit,minmax(146px,1fr));gap:11px}}
  .stat{{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:13px 15px}}
  .stat .n{{font:700 1.7rem/1 var(--sans);letter-spacing:-.02em;display:block}}
  .stat .l{{font-size:.78rem;color:var(--ink-2);margin-top:6px;display:block}}
  .carte{{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:16px 18px}}
  .barre{{height:32px;border-radius:6px;background:var(--neutre);overflow:hidden;margin:2px 0 10px}}
  .barre i{{display:block;height:100%;background:var(--s3)}}
  .leg{{display:flex;gap:16px;font-size:.82rem;color:var(--ink-2);margin:0}}
  .leg i{{width:12px;height:12px;border-radius:3px;display:inline-block;margin-right:6px;vertical-align:-1px}}
  table{{width:100%;border-collapse:collapse;font-size:.88rem;margin-top:12px}}
  th,td{{text-align:left;padding:9px 10px;border-bottom:1px solid var(--line);vertical-align:top}}
  tr:last-child td{{border-bottom:none}}
  td.n{{font-family:var(--mono);white-space:nowrap}}
  .mini{{display:inline-block;width:96px;height:8px;border-radius:4px;background:var(--neutre);
    vertical-align:middle;overflow:hidden}}
  .mini i{{display:block;height:100%;background:var(--s3)}}
  .st{{white-space:nowrap;font-weight:700;font-size:.82rem}}
  .st.ok{{color:var(--ok)}} .st.part{{color:var(--warn)}} .st.non{{color:var(--crit)}}
  .st.inconnue{{color:var(--ink-3)}}
  .journal{{font:.82rem/1.9 var(--mono);color:var(--ink-2)}}
  .journal b{{color:var(--ink);font-weight:600}}
  .note{{font-size:.82rem;color:var(--ink-3);margin-top:26px;border-top:1px solid var(--line);padding-top:14px}}
</style>
</head>
<body>
<header class="top"><div class="ti">
  <button class="tb" id="tb" type="button" aria-pressed="false">🌙 Mode sombre</button>
  <p class="kicker">Généré le {date} · branche {branche} · {propre}</p>
  <h1>Collection « Jeux » — panneau de commande</h1>
  <p class="sub">Page <strong>générée</strong> par <code>outils/etat-refonte.py</code>. Chaque chiffre est
  compté dans les fichiers ou lu dans <code>git log</code> au moment de l'exécution. Rien n'est saisi
  à la main : la page ne peut pas se désynchroniser du dépôt.</p>
</div></header>
<div class="wrap">

<section>
  <h2>Où on en est</h2>
  <div class="stats">
    <div class="stat"><span class="n">{n_commits}</span><span class="l">derniers commits lus</span></div>
    <div class="stat"><span class="n">{n_mig} / {n_pages}</span><span class="l">pages sur le socle</span></div>
    <div class="stat"><span class="n">{ok} / {n_bl}</span><span class="l">bloquants levés ({part} à moitié)</span></div>
    <div class="stat"><span class="n">{gfonts}</span><span class="l">pages encore sur Google Fonts</span></div>
    <div class="stat"><span class="n">{souspalier}</span><span class="l">fichiers avec une taille en dur sous 12,8 px</span></div>
    <div class="stat"><span class="n">{arialive} / {n_pages}</span><span class="l">pages avec <code>aria-live</code></span></div>
    <div class="stat"><span class="n">{description} / {n_pages}</span><span class="l">pages avec une <code>meta description</code></span></div>
    <div class="stat"><span class="n">{contraste_conf} / {n_mig}</span><span class="l">pages migrées au contraste secondaire ≥ 4,5:1 ({contraste_nonm} non mesurées)</span></div>
  </div>
</section>

<section>
  <h2>Migration sur le socle</h2>
  <div class="carte">
    <div class="barre" role="img" aria-label="{n_mig} pages migrées sur {n_pages}, soit {pct} pour cent"><i style="width:{pct}%"></i></div>
    <p class="leg"><span><i style="background:var(--s3)"></i>{n_mig} migrées</span>
      <span><i style="background:var(--neutre)"></i>{n_pages} au total — {pct} %</span></p>
    <table><thead><tr><th scope="col">Lot</th><th scope="col">Avancement</th></tr></thead>
    <tbody>
{lignes_lots}
    </tbody></table>
  </div>
</section>

<section>
  <h2>Les bloquants de l'audit</h2>
  <div class="carte" style="padding:0">
    <table><thead><tr><th scope="col">Défaut</th><th scope="col">Statut</th></tr></thead>
    <tbody>
{lignes_bl}
    </tbody></table>
  </div>
</section>

<section>
  <h2>Contraste du texte secondaire</h2>
  <div class="carte" style="padding:0">
    <table><thead><tr><th scope="col">Page</th><th scope="col">Mesure</th></tr></thead>
    <tbody>
{lignes_contraste}
    </tbody></table>
  </div>
</section>

<section>
  <h2>Journal</h2>
  <p class="journal">{journal}</p>
</section>

<p class="note">Le statut de chaque bloquant est obtenu en <strong>rejouant son test</strong> sur le code
(présence d'un champ, d'un attribut, d'une media query…), pas en lisant une case cochée. Un bloquant
se ferme donc quand le code le ferme. Pour la suite des travaux et les décisions produit, la référence
reste <code>REFONTE-UX.md</code> — cette page en est le tableau de bord, pas le remplaçant.</p>

</div>
<script>
document.getElementById('tb').addEventListener('click',function(){{
  var d=document.documentElement.getAttribute('data-theme')==='dark';
  document.documentElement.setAttribute('data-theme',d?'light':'dark');
  this.setAttribute('aria-pressed',String(!d));
  this.textContent=d?'🌙 Mode sombre':'☀️ Mode clair';
}});
</script>
</body></html>
"""


def main():
    _autotest_contraste()
    m = mesurer()
    html = rendre(m)
    dossier = os.path.dirname(SORTIE)
    if not os.path.isdir(dossier):
        os.makedirs(dossier)
    io.open(SORTIE, "w", encoding="utf-8").write(html)
    io.open(SORTIE_MD, "w", encoding="utf-8").write(rendre_md(m))

    ok = sum(1 for _, e in m["bloquants"] if e == "ok")
    part = sum(1 for _, e in m["bloquants"] if e == "part")
    print(u"Panneau écrit  : %s" % os.path.relpath(SORTIE, RACINE))
    print(u"État pour agent : %s" % os.path.relpath(SORTIE_MD, RACINE))
    print(u"  branche              : %s (%s)" % (m["branche"], "propre" if m["propre"] else "modifiée"))
    print(u"  pages sur le socle   : %d / %d" % (len(m["migrees"]), m["pages"]))
    print(u"  bloquants levés      : %d / %d  (%d à moitié)" % (ok, len(m["bloquants"]), part))
    print(u"  encore Google Fonts  : %d pages" % len(m["gfonts"]))
    print(u"  tailles sous 12,8 px : %d fichiers" % len(m["souspalier"]))
    print(u"  contraste secondaire : %d / %d conformes (%d non mesurées)" % (
        m["contraste"]["conformes"], len(m["migrees"]), len(m["contraste"]["non_mesurees"])))
    for nom, f, t in m["lots"]:
        print(u"    %-14s %d / %d" % (nom, f, t))


if __name__ == "__main__":
    main()
