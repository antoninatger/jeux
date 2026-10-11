/* =====================================================================
   partage.js — « Faire connaître » et « Un mot au créateur » pour les jeux
   ---------------------------------------------------------------------
   Une seule ligne par jeu :
     <script src="https://antoninatger.github.io/jeux/partage.js" defer
             data-jeu="Radar'naque" data-texte="Un jeu gratuit pour…"></script>
   Options (attributs du <script>) :
     data-jeu       nom du jeu (obligatoire)
     data-url       adresse à partager (défaut : la page, sans ?lang ni #)
     data-texte     message de partage (défaut : « {jeu}, un jeu gratuit d'Antonin Atger »)
     data-texte-en  le même message en anglais, pour les jeux traduits
     data-flottant  "non" : pas de bouton flottant (on place soi-même des rangées)
     data-position  "bas-droite" (défaut), "bas-gauche", "haut-droite", "haut-gauche"
     data-avis      "non" : pas de formulaire (le jeu a déjà le sien)
   Dans la page, un <div class="pj-rangee"></div> reçoit une rangée de boutons
   (utile sur l'écran de fin). En JavaScript : PartageJeux.ouvrir('partage'|'avis').
   Les messages partent par Web3Forms, comme les autres formulaires du site.
   ===================================================================== */
(function () {
  if (window.PartageJeux) return;
  var S = document.currentScript || document.querySelector('script[src*="partage.js"]');
  var A = function (k, d) { var v = S && S.getAttribute('data-' + k); return v == null || v === '' ? d : v; };
  var JEU = A('jeu', document.title.split(/[—|–-]/)[0].trim());
  var URL_ = A('url', location.href.replace(/[?#].*$/, ''));
  var CLE = 'ef1fe549-c616-4a27-a6c2-97f06caa913d';
  var EN = (window.I18N && I18N.lang === 'en') || /[?&]lang=en\b/.test(location.search) || /^en/i.test(document.documentElement.lang || '');
  var T = EN ? {
    bouton: 'Share', partageT: 'Spread the word', partageP: 'A colleague, a class, a friend could enjoy it? Send it in one click.',
    texte: JEU + ', a free game by Antonin Atger', copier: 'Copy link', copie: 'Link copied ✓', autres: 'More…',
    avisT: 'A word to the creator?', avisP: 'An idea, a bug, a success in class or a question: your message goes straight to me, Antonin, and I read everything.',
    msg: 'What you think', msgPh: 'Played it with my class, they loved… / It would need…', nom: 'First name', email: 'Email',
    fac: 'optional', facRep: 'optional, for a reply', envoyer: '📨 Send', envoi: '⏳ Sending…', merci: '✅ Thank you, your message is on its way!',
    erreur: 'The message did not go through (connection?). Try again in a moment.', fermer: 'Close', avisB: '💬 A word to the creator',
    mailSujet: 'A game you might like: ', mailCorps: 'Hello,\n\nI think you might like this: '
  } : {
    bouton: 'Partager', partageT: 'Faire connaître ' + JEU, partageP: 'Un collègue, une classe, un ami pourrait l’aimer ? Envoyez-le en un clic.',
    texte: JEU + ', un jeu gratuit d’Antonin Atger', copier: 'Copier le lien', copie: 'Lien copié ✓', autres: 'Autres…',
    avisT: 'Un mot au créateur ?', avisP: 'Une idée, un bug, une réussite en classe ou une question : votre message arrive directement chez moi, Antonin, et je lis tout.',
    msg: 'Ce que vous en pensez', msgPh: 'Joué en classe, les élèves ont adoré… / Il manquerait…', nom: 'Prénom', email: 'E-mail',
    fac: 'facultatif', facRep: 'facultatif, pour une réponse', envoyer: '📨 Envoyer', envoi: '⏳ Envoi…', merci: '✅ Merci, votre message est bien parti !',
    erreur: 'Le message n’est pas parti (connexion ?). Réessayez dans un instant.', fermer: 'Fermer', avisB: '💬 Un mot au créateur',
    mailSujet: 'Un jeu qui pourrait t’intéresser : ', mailCorps: 'Bonjour,\n\nJe pense que ce jeu pourrait t’intéresser : '
  };
  var TEXTE = (EN && A('texte-en', '')) || A('texte', T.texte), AVIS = A('avis', 'oui') !== 'non';
  var e = encodeURIComponent;
  var ICO = {
    wa: '<path d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H10l-4.5 3.5V16.5H5A1.5 1.5 0 0 1 3.5 15V7A1.5 1.5 0 0 1 5 5.5z"/>',
    mail: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3.5 7l8.5 6 8.5-6"/>',
    fb: '<circle cx="9" cy="8.5" r="3"/><circle cx="16.5" cy="9.5" r="2.3"/><path d="M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5M14.5 14.3c.6-.2 1.3-.3 2-.3 2.2 0 3.7 1.4 4.2 3.8"/>',
    x: '<path d="M5 5l14 14M19 5L5 19"/>',
    lien: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    plus: '<path d="M12 15V4M7.5 8.5L12 4l4.5 4.5M5 13v6h14v-6"/>'
  };
  var svg = function (k) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICO[k] + '</svg>'; };

  var css = document.createElement('style');
  css.textContent = [
    '.pj-flot{position:fixed;z-index:2147483000;display:flex;gap:6px;font:500 14px/1.2 system-ui,-apple-system,"Segoe UI",sans-serif}',
    '.pj-flot.bas-droite{right:12px;bottom:12px}.pj-flot.bas-gauche{left:12px;bottom:12px}.pj-flot.haut-droite{right:12px;top:12px}.pj-flot.haut-gauche{left:12px;top:12px}',
    '.pj-flot button{font:inherit;cursor:pointer;border:1px solid rgba(0,0,0,.15);border-radius:99px;padding:7px 12px;background:rgba(255,255,255,.92);color:#14222c;box-shadow:0 4px 14px rgba(0,0,0,.25);backdrop-filter:blur(4px)}',
    '.pj-flot button:hover{background:#fff}',
    '.pj-fond{position:fixed;inset:0;z-index:2147483001;display:grid;place-items:center;padding:14px;background:rgba(10,16,22,.62);font:15px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif;color:#14222c}',
    '.pj-fond[hidden]{display:none}',
    '.pj-carte{position:relative;width:min(560px,100%);max-height:100%;overflow:auto;background:#fff;border-radius:14px;padding:22px 22px 18px;box-shadow:0 24px 70px rgba(0,0,0,.45);text-align:left}',
    '.pj-carte h2{font-size:19px;margin:0 0 4px;color:#14222c}.pj-carte p{margin:0 0 12px;color:#3d4f5c}',
    '.pj-x{position:absolute;right:10px;top:8px;border:0;background:none;font-size:22px;cursor:pointer;color:#586874;padding:4px 8px}',
    '.pj-sep{border:0;border-top:1px solid #dce3e8;margin:18px 0}',
    '.pj-btns{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-start}.pj-btns.pj-centre{justify-content:center}',
    '.pj-b{display:inline-flex;align-items:center;gap:6px;padding:8px 13px;border:1px solid #c9d3da;border-radius:99px;background:#fff;color:#14222c;font:500 14px/1.2 system-ui,-apple-system,"Segoe UI",sans-serif;text-decoration:none;cursor:pointer}',
    '.pj-b:hover,.pj-b:focus-visible{border-color:#1b6a8f;background:#e3f1f7;color:#134f6b;outline:none}',
    '.pj-b svg{width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}',
    '.pj-f label{display:block;font-weight:600;font-size:13.5px;margin:8px 0 4px}.pj-f small{font-weight:400;color:#586874}',
    '.pj-f input,.pj-f textarea{width:100%;box-sizing:border-box;font:inherit;padding:9px 11px;border:1px solid #aab8c3;border-radius:8px;color:#14222c;background:#fff}',
    '.pj-f textarea{min-height:84px;resize:vertical}.pj-deux{display:grid;grid-template-columns:1fr 1fr;gap:10px}',
    '.pj-envoyer{margin-top:12px;font:600 15px/1 system-ui,sans-serif;padding:11px 18px;border:0;border-radius:8px;background:#1b6a8f;color:#fff;cursor:pointer}',
    '.pj-envoyer:disabled{opacity:.6;cursor:wait}.pj-etat{margin-left:8px;color:#b3361e;font-size:13.5px}.pj-ok{color:#127942;font-weight:600}',
    '@media (max-width:520px){.pj-deux{grid-template-columns:1fr}.pj-flot button{padding:6px 10px;font-size:13px}}'
  ].join('');
  document.head.appendChild(css);

  function boutons() {
    var d = document.createElement('div'); d.className = 'pj-btns';
    d.innerHTML =
      '<a class="pj-b" target="_blank" rel="noopener" href="https://wa.me/?text=' + e(TEXTE + ' ' + URL_) + '">' + svg('wa') + 'WhatsApp</a>' +
      '<a class="pj-b" href="mailto:?subject=' + e(T.mailSujet + JEU) + '&body=' + e(T.mailCorps + TEXTE + '.\n' + URL_) + '">' + svg('mail') + (EN ? 'Email' : 'E-mail') + '</a>' +
      '<a class="pj-b" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=' + e(URL_) + '">' + svg('fb') + 'Facebook</a>' +
      '<a class="pj-b" target="_blank" rel="noopener" href="https://x.com/intent/post?text=' + e(TEXTE) + '&url=' + e(URL_) + '">' + svg('x') + 'X</a>' +
      '<button type="button" class="pj-b pj-copier">' + svg('lien') + '<span>' + T.copier + '</span></button>' +
      (navigator.share ? '<button type="button" class="pj-b pj-natif">' + svg('plus') + T.autres + '</button>' : '');
    d.querySelector('.pj-copier').addEventListener('click', function () {
      var s = this.querySelector('span'), ok = function () { s.textContent = T.copie; setTimeout(function () { s.textContent = T.copier; }, 2000); };
      if (navigator.clipboard) navigator.clipboard.writeText(URL_).then(ok, function () { prompt(T.copier, URL_); }); else prompt(T.copier, URL_);
    });
    var n = d.querySelector('.pj-natif');
    if (n) n.addEventListener('click', function () { navigator.share({ title: JEU, text: TEXTE, url: URL_ }).catch(function () {}); });
    return d;
  }

  var fond = null;
  function fenetre() {
    if (fond) return fond;
    fond = document.createElement('div'); fond.className = 'pj-fond'; fond.hidden = true;
    fond.setAttribute('role', 'dialog'); fond.setAttribute('aria-modal', 'true'); fond.setAttribute('aria-label', T.partageT);
    var c = document.createElement('div'); c.className = 'pj-carte';
    c.innerHTML = '<button type="button" class="pj-x" aria-label="' + T.fermer + '">✕</button><h2>📣 ' + T.partageT + '</h2><p>' + T.partageP + '</p>';
    c.appendChild(boutons());
    if (AVIS) {
      var f = document.createElement('div');
      f.innerHTML = '<hr class="pj-sep"><h2 id="pj-avis">💬 ' + T.avisT + '</h2><p>' + T.avisP + '</p>' +
        '<form class="pj-f"><label>' + T.msg + '<textarea name="m" required placeholder="' + T.msgPh + '"></textarea></label>' +
        '<div class="pj-deux"><label>' + T.nom + ' <small>(' + T.fac + ')</small><input name="n" autocomplete="given-name"></label>' +
        '<label>' + T.email + ' <small>(' + T.facRep + ')</small><input name="e" type="email" autocomplete="email"></label></div>' +
        '<input name="b" type="checkbox" tabindex="-1" aria-hidden="true" style="display:none">' +
        '<button class="pj-envoyer" type="submit">' + T.envoyer + '</button><span class="pj-etat" role="status"></span></form>';
      c.appendChild(f);
      var form = f.querySelector('form');
      form.addEventListener('submit', function (ev) {
        ev.preventDefault(); if (form.b.checked) return;
        var m = form.m.value.trim(); if (!m) return;
        var bt = form.querySelector('.pj-envoyer'), et = form.querySelector('.pj-etat');
        bt.disabled = true; bt.textContent = T.envoi; et.textContent = '';
        var corps = { access_key: CLE, from_name: 'Avis ' + JEU, subject: '[Avis ' + JEU + '] Message depuis le jeu' + (form.n.value.trim() ? ' | ' + form.n.value.trim() : ''),
          name: form.n.value.trim() || (EN ? 'Anonymous player' : 'Joueur anonyme'), message: m + '\n\n— ' + location.href.replace(/#.*$/, '') + (EN ? ' (English)' : '') };
        if (form.e.value.trim()) corps.email = form.e.value.trim();
        fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(corps) })
          .then(function (r) { return r.json(); })
          .then(function (r) { if (!r.success) throw 0; form.outerHTML = '<p class="pj-ok">' + T.merci + '</p>'; })
          .catch(function () { bt.disabled = false; bt.textContent = T.envoyer; et.textContent = T.erreur; });
      });
    }
    fond.appendChild(c); document.body.appendChild(fond);
    var fermer = function () { fond.hidden = true; };
    c.querySelector('.pj-x').addEventListener('click', fermer);
    fond.addEventListener('click', function (ev) { if (ev.target === fond) fermer(); });
    document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape' && !fond.hidden) { ev.stopPropagation(); fermer(); } }, true);
    return fond;
  }
  function ouvrir(quoi) {
    var f = fenetre(); f.hidden = false;
    var cible = quoi === 'avis' && f.querySelector('#pj-avis');
    if (cible) { cible.scrollIntoView({ block: 'start' }); var t = f.querySelector('textarea'); t && t.focus({ preventScroll: true }); }
    else { var b = f.querySelector('.pj-b'); b && b.focus(); }
  }
  // rangées placées par le jeu (écran de fin…) : on les remplit, maintenant et quand elles apparaissent
  function remplir() {
    Array.prototype.forEach.call(document.querySelectorAll('.pj-rangee:not([data-pj])'), function (r) {
      r.setAttribute('data-pj', '1');
      var b = boutons(); b.className = 'pj-btns pj-centre'; r.appendChild(b);
      if (AVIS) { var a = document.createElement('button'); a.type = 'button'; a.className = 'pj-b'; a.textContent = T.avisB; a.addEventListener('click', function () { ouvrir('avis'); }); b.appendChild(a); }
    });
  }
  function demarrer() {
    if (A('flottant', 'oui') !== 'non') {
      var fl = document.createElement('div'); fl.className = 'pj-flot ' + A('position', 'bas-droite');
      var p = document.createElement('button'); p.type = 'button'; p.textContent = '📣 ' + T.bouton; p.addEventListener('click', function () { ouvrir('partage'); });
      fl.appendChild(p);
      if (AVIS) { var v = document.createElement('button'); v.type = 'button'; v.textContent = '💬'; v.title = T.avisT; v.setAttribute('aria-label', T.avisT); v.addEventListener('click', function () { ouvrir('avis'); }); fl.appendChild(v); }
      document.body.appendChild(fl);
    }
    remplir();
    if (window.MutationObserver) new MutationObserver(remplir).observe(document.body, { childList: true, subtree: true });
  }
  window.PartageJeux = { ouvrir: ouvrir, remplir: remplir };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', demarrer); else demarrer();
})();
