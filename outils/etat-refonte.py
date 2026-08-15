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
        lignes_lots=lignes_lots, lignes_bl=lignes_bl, journal=journal)


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
    m = mesurer()
    html = rendre(m)
    dossier = os.path.dirname(SORTIE)
    if not os.path.isdir(dossier):
        os.makedirs(dossier)
    io.open(SORTIE, "w", encoding="utf-8").write(html)

    ok = sum(1 for _, e in m["bloquants"] if e == "ok")
    part = sum(1 for _, e in m["bloquants"] if e == "part")
    print(u"Panneau écrit : %s" % os.path.relpath(SORTIE, RACINE))
    print(u"  branche              : %s (%s)" % (m["branche"], "propre" if m["propre"] else "modifiée"))
    print(u"  pages sur le socle   : %d / %d" % (len(m["migrees"]), m["pages"]))
    print(u"  bloquants levés      : %d / %d  (%d à moitié)" % (ok, len(m["bloquants"]), part))
    print(u"  encore Google Fonts  : %d pages" % len(m["gfonts"]))
    print(u"  tailles sous 12,8 px : %d fichiers" % len(m["souspalier"]))
    for nom, f, t in m["lots"]:
        print(u"    %-14s %d / %d" % (nom, f, t))


if __name__ == "__main__":
    main()
