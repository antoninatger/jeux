/* =========================================================================
   catalogue.js — le moteur unique des catalogues de la collection
   Tâche E3, décision D11 du 4 septembre 2026.

   ── Le problème qu'il règle ─────────────────────────────────────────────
   Perceptio (« Biais cognitifs »), Cobaye et Rhetor faisaient tourner le
   même moteur, recopié six fois : `app.js` et `app-en.js` dans chacun des
   trois dossiers, près de 4 000 lignes pour un seul comportement. Toute
   correction devait être appliquée six fois ; l'audit du 4 septembre 2026 a
   montré qu'elle ne l'était jamais, et que les six copies avaient dérivé en
   silence les unes des autres.

   ── La réponse ──────────────────────────────────────────────────────────
   Un moteur, paramétré. Chaque catalogue l'appelle depuis son `index.html`
   avec sa configuration et ses données. Les `data.js` / `data-en.js` ne
   bougent pas : c'est le contenu, il reste propre à chaque catalogue.

     <script src="../catalogue.js"></script>
     <script>
       Catalogue.demarrer({ jeu: 'perceptio', route: 'biais', … });
     </script>

   ── Ce que la configuration décrit ──────────────────────────────────────
     jeu              identifiant stable — celui que ColFin mémorise ;
     route            le segment d'URL du catalogue (biais, outils…) ;
     cleProgression   la clé localStorage des fiches déjà consultées ;
     items,
     categories       les données, telles que data.js les déclare ;
     champs           les noms de champs propres au catalogue : résumé de
                      carte, fiches liées, deuxième case du pied de carte,
                      texte indexé par la recherche, nom affiché en réponse ;
     hero             la démonstration d'accueil, propre à chaque catalogue —
                      `html(m)` la dessine, `init(m)` la câble ;
     ficheSousTitre,
     ficheMeta,
     ficheCorps       les morceaux de fiche qui diffèrent d'un catalogue à
                      l'autre (Cobaye a une ligne de méta et un encadré
                      « Controverses », les deux autres non) ;
     styles           les quelques styles en dur qui avaient divergé ;
     apropos          la page « À propos », en FR et en EN ;
     mots             le vocabulaire, en FR et en EN.

   Tout ce qui n'est pas dans cette liste est commun aux trois catalogues :
   c'est le sens même de la manœuvre.
   ========================================================================= */
(function () {
  'use strict';

  /* La configuration du catalogue en cours, et le vocabulaire de la langue
     en cours. Un seul catalogue par page : deux variables de module
     suffisent, et évitent de les passer en argument à chaque fonction. */
  let C = null;
  let M = null;

  /* ---------------------------------------------------------------- */
  /* Utils                                                             */
  /* ---------------------------------------------------------------- */

  const DIACRITICS_RE = /[̀-ͯ]/g;

  function itemById(id){ return C.items.find(it => it.id === id); }
  function catById(id){ return C.categories.find(c => c.id === id); }
  function countByCat(catId){ return C.items.filter(it => it.categorie === catId).length; }

  function resumeDe(it){ return it[C.champs.resume]; }
  function liesDe(it){ return it[C.champs.lies] || []; }

  function normalizeSearch(s){
    return (s || '').toLowerCase().normalize('NFD').replace(DIACRITICS_RE, '').trim();
  }

  /* Les mots vides à retirer avant comparaison dépendent de la langue ET du
     catalogue (« biais de », « l'expérience de », « sophisme de »…). Le
     français les retire AVANT le nettoyage de la ponctuation, l'anglais
     APRÈS (il enlève un suffixe : « … effect », « … fallacy ») : les deux
     positions sont donc distinctes dans la configuration. */
  function normalizeAnswer(s){
    let n = (s || '').toLowerCase()
      .normalize('NFD').replace(DIACRITICS_RE, '')
      .replace(/[’'-]/g, ' ');
    (M.reglesAvant || []).forEach(r => { n = n.replace(r, ''); });
    n = n.replace(/[^a-z0-9\s]/g, '');
    (M.reglesApres || []).forEach(r => { n = n.replace(r, ''); });
    return n.replace(/\s+/g, ' ').trim();
  }

  function levenshtein(a, b){
    const m = [];
    for (let i = 0; i <= b.length; i++) m[i] = [i];
    for (let j = 0; j <= a.length; j++) m[0][j] = j;
    for (let i = 1; i <= b.length; i++){
      for (let j = 1; j <= a.length; j++){
        m[i][j] = b.charAt(i - 1) === a.charAt(j - 1)
          ? m[i - 1][j - 1]
          : Math.min(m[i - 1][j - 1] + 1, m[i][j - 1] + 1, m[i - 1][j] + 1);
      }
    }
    return m[b.length][a.length];
  }

  function isAnswerCorrect(input, acceptedList){
    const n = normalizeAnswer(input);
    if (!n) return false;
    return acceptedList.some(ans => {
      const na = normalizeAnswer(ans);
      const tol = Math.max(2, Math.round(na.length * 0.2));
      return n === na || levenshtein(n, na) <= tol;
    });
  }

  function dayIndex(len){
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const day = Math.floor(diff / 86400000);
    return day % len;
  }

  function capitalize(s){ return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

  /* Les libellés du vocabulaire portent des trous nommés — {n}, {i}, {s} —
     plutôt que d'être découpés en morceaux à recoller : une phrase traduite
     ne se recolle pas dans le même ordre d'une langue à l'autre. */
  function tpl(chaine, valeurs){
    return String(chaine).replace(/\{(\w+)\}/g, (tout, cle) =>
      (valeurs && valeurs[cle] !== undefined) ? valeurs[cle] : tout);
  }

  /* ---------------------------------------------------------------- */
  /* Progression (localStorage)                                        */
  /* ---------------------------------------------------------------- */

  function getVus(){
    try { return new Set(JSON.parse(localStorage.getItem(C.cleProgression) || '[]')); }
    catch (e) { return new Set(); }
  }
  function markVu(id){
    const s = getVus();
    s.add(id);
    try { localStorage.setItem(C.cleProgression, JSON.stringify([...s])); } catch (e) {}
  }

  /* ---------------------------------------------------------------- */
  /* Router                                                             */
  /* ---------------------------------------------------------------- */

  function parseHash(){
    return location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  }

  function navigate(path){ location.hash = path; }

  function updateActiveTab(parts){
    const map = {
      categories: '#/categories', quiz: '#/quiz',
      identification: '#/identification', 'a-propos': '#/a-propos'
    };
    map[C.route] = '#/' + C.route;
    const active = parts.length ? map[parts[0]] : null;
    document.querySelectorAll('#mainnav .tab').forEach(t => {
      t.classList.toggle('active', active && t.getAttribute('href') === active);
    });
  }

  function render(){
    const parts = parseHash();
    updateActiveTab(parts);
    const app = document.getElementById('app');

    if (parts.length === 0){
      app.innerHTML = renderHome();
      initHome();
    } else if (parts[0] === C.route && parts.length === 1){
      app.innerHTML = renderCatalogue();
      initCatalogue();
    } else if (parts[0] === C.route && parts[1]){
      const it = itemById(parts[1]);
      if (!it){ app.innerHTML = renderNotFound(); }
      else { app.innerHTML = renderFiche(it); initFiche(it); markVu(it.id); }
    } else if (parts[0] === 'categories' && parts.length === 1){
      app.innerHTML = renderCategoriesPage();
    } else if (parts[0] === 'categories' && parts[1]){
      const c = catById(parts[1]);
      if (!c){ app.innerHTML = renderNotFound(); }
      else { app.innerHTML = renderCatalogue(c.id); initCatalogue(c.id); }
    } else if (parts[0] === 'quiz'){
      app.innerHTML = renderQuizStart();
      initQuizStart();
    } else if (parts[0] === 'identification'){
      app.innerHTML = '';
      loadIdentificationCard();
    } else if (parts[0] === 'a-propos'){
      app.innerHTML = renderApropos();
    } else {
      app.innerHTML = renderNotFound();
    }
    window.scrollTo(0, 0);
  }

  /* ---------------------------------------------------------------- */
  /* Fragments communs                                                  */
  /* ---------------------------------------------------------------- */

  /* Le badge « lu » n'existe que dans la vue Explorer. Ailleurs la liste des
     fiches vues n'est pas chargée, et la carte n'en porte pas. */
  let vusCourants = null;

  function badgeVu(it){
    if (!vusCourants || !vusCourants.has(it.id)) return '';
    return `<span class="badge-lu">${M.badgeVu}</span>`;
  }

  function carteItem(it, extra){
    const c = catById(it.categorie);
    return `
      <a class="col-carte col-carte--fiche" href="#/${C.route}/${it.id}"${extra || ''}>
        ${badgeVu(it)}
        <div class="swatch-top ${c.classe}"></div>
        <div class="card-body">
          <h3 class="col-carte__titre">${it.nom}</h3>
          <p class="col-carte__desc">${resumeDe(it)}</p>
          <div class="card-foot"><span>${c.nom}</span><span>${C.champs.pied(it, capitalize)}</span></div>
        </div>
      </a>
    `;
  }

  function cartesCategories(){
    return C.categories.map(c => `
      <a class="col-carte col-carte--cat ${c.classe}" href="#/categories/${c.id}">
        <h3 class="col-carte__titre">${c.nom}</h3>
        <p class="col-carte__desc">${c.description}</p>
        <span class="count">${countByCat(c.id)} ${M.uniteItems}</span>
      </a>
    `).join('');
  }

  /* ---------------------------------------------------------------- */
  /* Vue : accueil                                                      */
  /* ---------------------------------------------------------------- */

  function renderHome(){
    const jour = C.items[dayIndex(C.items.length)];
    const n = C.items.length;
    return `
      <div class="hero">
        <div>
          <p class="eyebrow">${M.heroEyebrow}</p>
          <h1>${tpl(M.heroTitre, { n })}</h1>
          <p class="lead">${tpl(M.heroLead, { n })}</p>
        </div>
        ${C.hero.html(M)}
      </div>

      <div class="home-block">
        <p class="section-lab">${M.duJour}</p>
        ${carteItem(jour, ' style="max-width:420px;"')}
      </div>

      <div class="home-block">
        <p class="section-lab">${M.categories}</p>
        <div class="col-cartes">
          ${cartesCategories()}
        </div>
        <div class="cta-row">
          <a class="btn-primary" href="#/${C.route}">${M.explorerTout}</a>
          <a class="btn-ghost" href="#/identification">${M.tenterIdentification}</a>
        </div>
      </div>
    `;
  }

  function initHome(){ C.hero.init(M); }

  /* ---------------------------------------------------------------- */
  /* Vue : catalogue (Explorer)                                        */
  /* ---------------------------------------------------------------- */

  function renderCatalogue(presetCat){
    return `
      <p class="fiche-back" style="visibility:hidden;">&nbsp;</p>
      <p class="section-lab">${M.explorerTitre}</p>
      <div class="searchbar">
        <input type="search" id="q-search" placeholder="${M.rechercherPlaceholder}" aria-label="${M.rechercheAria}">
        <select id="q-cat" aria-label="${M.filtreCatAria}">
          <option value="">${M.toutesCategories}</option>
          ${C.categories.map(c => `<option value="${c.id}" ${presetCat === c.id ? 'selected' : ''}>${c.nom}</option>`).join('')}
        </select>
        <select id="q-diff" aria-label="${M.filtreDiffAria}">
          <option value="">${M.toutesDifficultes}</option>
          ${M.difficultes.map(d => `<option value="${d.valeur}">${d.libelle}</option>`).join('')}
        </select>
      </div>
      <div id="cat-results"></div>
    `;
  }

  function initCatalogue(presetCat){
    const search = document.getElementById('q-search');
    const selCat = document.getElementById('q-cat');
    const selDiff = document.getElementById('q-diff');
    if (presetCat) selCat.value = presetCat;

    function apply(){
      const q = normalizeSearch(search.value);
      const cat = selCat.value;
      const diff = selDiff.value;
      vusCourants = getVus();

      const list = C.items.filter(it => {
        if (cat && it.categorie !== cat) return false;
        if (diff && it.difficulte !== diff) return false;
        if (q){
          const hay = normalizeSearch(C.champs.recherche(it));
          if (!hay.includes(q)) return false;
        }
        return true;
      });

      const results = document.getElementById('cat-results');
      if (!list.length){
        results.innerHTML = `<div class="empty">${M.aucunResultat}</div>`;
        vusCourants = null;
        return;
      }
      results.innerHTML = `
        <p class="result-count">${list.length} ${M.uniteItems}</p>
        <div class="col-cartes col-cartes--catalogue">
          ${list.map(it => carteItem(it)).join('')}
        </div>
      `;
      vusCourants = null;
    }

    search.addEventListener('input', apply);
    selCat.addEventListener('change', apply);
    selDiff.addEventListener('change', apply);
    apply();
  }

  /* ---------------------------------------------------------------- */
  /* Vue : catégories                                                   */
  /* ---------------------------------------------------------------- */

  function renderCategoriesPage(){
    return `
      <p class="section-lab">${M.toutesCategoriesTitre}</p>
      <div class="col-cartes">
        ${cartesCategories()}
      </div>
    `;
  }

  /* ---------------------------------------------------------------- */
  /* Vue : fiche détaillée                                             */
  /* ---------------------------------------------------------------- */

  function boiteQcm(q, i){
    return `
      <div class="test-box" data-idx="${i}">
        <div class="scan-ring" data-ring>✓</div>
        <p class="test-q">${q.question}</p>
        <div class="choices" data-choices>
          ${q.choix.map((ch, ci) => `<button class="choice" data-correct="${ci === q.bonne_reponse}">${ch}</button>`).join('')}
        </div>
        <p class="explain" data-explain>${q.explication}</p>
      </div>
    `;
  }

  function renderFiche(it){
    const c = catById(it.categorie);
    const related = liesDe(it).map(id => itemById(id)).filter(Boolean);
    return `
      <a class="fiche-back" href="#/${C.route}">${M.retourExploration}</a>
      <article class="fiche">
        <div class="fiche-band" style="background:${c.couleur};"></div>
        <div class="fiche-inner">

          <div class="fiche-head">
            <div>
              <a class="fiche-cat" href="#/categories/${c.id}">${c.nomLong}</a>
              <h2>${it.nom}</h2>
              ${C.ficheSousTitre(it, M)}
            </div>
            <span class="diff-badge">${M.niveau} · ${capitalize(it.difficulte)}</span>
          </div>
          ${C.ficheMeta(it, M)}
          ${C.ficheCorps(it, M)}

          <p class="label">${M.labelExemples}</p>
          <div class="examples">
            ${it.exemples.map(ex => `
              <div class="example"><span class="mark"></span><div><strong>${ex.titre}</strong><span>${ex.texte}</span></div></div>
            `).join('')}
          </div>

          <p class="label">${M.labelTesteToi}</p>
          <p class="qcm-score" id="qcm-score">${M.scorePrefixe}<b>0/${it.qcm.length}</b></p>
          ${it.qcm.map((q, i) => boiteQcm(q, i)).join('')}

          <p class="label">${M.labelIdentifieAutrement}</p>
          <div class="id-card" style="margin-bottom:34px;">
            <div class="id-band"></div>
            <div class="id-inner" style="padding:26px clamp(18px,3vw,34px);">
              <p class="id-eyebrow"><span>${M.identificationLibre}</span></p>
              <p class="id-situation" style="font-size:15px;margin-bottom:20px;">${it.identification.situation}</p>
              <div class="id-row">
                <input class="id-input" id="fiche-id-input" type="text" placeholder="${M.placeholderReponse}" autocomplete="off">
                <button class="id-btn" id="fiche-id-submit" type="button">${M.valider}</button>
              </div>
              <div class="id-feedback" id="fiche-id-feedback"></div>
            </div>
          </div>

          <p class="label">${M.labelSources}</p>
          <div class="sources">
            ${it.sources.map(s => `
              <div class="source">
                <span class="meta">${s.type}</span>
                <b>${s.auteurs}</b> (${s.annee}). ${s.titre}. <i>${s.revue}</i>.
                ${s.lien ? ` <a href="${s.lien}" target="_blank" rel="noopener">↗</a>` : ''}
              </div>
            `).join('')}
          </div>

          ${related.length ? `
            <p class="label">${M.labelLies}</p>
            <div class="related">
              ${related.map(r => `<a href="#/${C.route}/${r.id}">${r.nom}</a>`).join('')}
            </div>
          ` : ''}

        </div>
      </article>
    `;
  }

  /* Câble une boîte de QCM : le clic marque la bonne et la mauvaise réponse,
     déroule l'explication, et ne compte qu'une fois. `onReponse` reçoit le
     résultat — la fiche s'en sert pour son score, le quiz pour le sien. */
  function cablerBoiteQcm(box, onReponse){
    const choices = box.querySelectorAll('.choice');
    const ring = box.querySelector('[data-ring]');
    const explain = box.querySelector('[data-explain]');
    let done = false;
    choices.forEach(btn => {
      btn.addEventListener('click', () => {
        if (done) return;
        done = true;
        const ok = btn.dataset.correct === 'true';
        choices.forEach(c => {
          if (c.dataset.correct === 'true') c.classList.add('correct');
          else if (c === btn) c.classList.add('wrong');
        });
        ring.textContent = ok ? '✓' : '✕';
        ring.classList.toggle('wrong', !ok);
        requestAnimationFrame(() => ring.classList.add('show'));
        explain.classList.add('show');
        onReponse(ok);
      });
    });
  }

  /* Câble un exercice d'identification libre. `lien` décide si le nom de la
     réponse est cliquable : dans la fiche on y est déjà, dans le mode dédié
     c'est le seul chemin vers elle. */
  function cablerIdentification(it, opts){
    const idInput = document.getElementById(opts.idInput);
    const idSubmit = document.getElementById(opts.idSubmit);
    const idFeedback = document.getElementById(opts.idFeedback);
    let attempts = 0;

    function nomAffiche(){
      const nom = C.champs.nomReponse(it);
      return opts.lien ? `<a href="#/${C.route}/${it.id}">${nom}</a>` : nom;
    }

    function submit(){
      const val = idInput.value.trim();
      if (!val) return;
      attempts++;
      idFeedback.className = 'id-feedback';
      if (isAnswerCorrect(val, it.identification.reponses_acceptees)){
        idFeedback.classList.add('correct');
        idFeedback.innerHTML = tpl(M.reponseCorrecte, { nom: nomAffiche() });
        idInput.disabled = true; idSubmit.disabled = true;
        if (opts.onTrouve) opts.onTrouve();
      } else if (attempts === 1){
        idFeedback.classList.add('hint');
        idFeedback.innerHTML = tpl(M.reponseIndice, { indice: it.identification.indice });
      } else {
        idFeedback.classList.add('reveal');
        idFeedback.innerHTML = tpl(M.reponseRevelee, { nom: nomAffiche() });
        idInput.disabled = true; idSubmit.disabled = true;
        if (opts.onEpuise) opts.onEpuise();
      }
    }
    idSubmit.addEventListener('click', submit);
    idInput.addEventListener('keydown', ev => { if (ev.key === 'Enter') submit(); });
  }

  function initFiche(it){
    let correct = 0;
    const scoreEl = document.getElementById('qcm-score');

    document.querySelectorAll('.test-box').forEach(box => {
      cablerBoiteQcm(box, ok => {
        if (ok) correct++;
        scoreEl.innerHTML = M.scorePrefixe + `<b>${correct}/${it.qcm.length}</b>`;
      });
    });

    cablerIdentification(it, {
      idInput: 'fiche-id-input',
      idSubmit: 'fiche-id-submit',
      idFeedback: 'fiche-id-feedback',
      lien: false
    });
  }

  /* ---------------------------------------------------------------- */
  /* Vue : identification libre (mode dédié)                           */
  /* ---------------------------------------------------------------- */

  function renderIdentificationCard(it){
    return `
      <p class="section-lab">${M.identificationTitre}</p>
      <article class="id-card">
        <div class="id-band"></div>
        <div class="id-inner">
          <p class="id-eyebrow"><span>${M.exerciceSansIndice}</span></p>
          <p class="id-situation">${it.identification.situation}</p>

          <div class="id-row">
            <input class="id-input" id="id-input" type="text" placeholder="${M.placeholderReponse}" autocomplete="off">
            <button class="id-btn" id="id-submit" type="button">${M.valider}</button>
          </div>

          <div class="id-feedback" id="id-feedback"></div>
          <div class="id-next" id="id-next" style="display:none;">
            <button class="btn-primary" id="id-next-btn" type="button">${M.situationSuivante}</button>
          </div>
        </div>
      </article>
    `;
  }

  function loadIdentificationCard(excludeId){
    let pool = C.items;
    if (excludeId && C.items.length > 1) pool = C.items.filter(it => it.id !== excludeId);
    const it = pool[Math.floor(Math.random() * pool.length)];

    document.getElementById('app').innerHTML = renderIdentificationCard(it);

    const idNext = document.getElementById('id-next');
    const idNextBtn = document.getElementById('id-next-btn');

    cablerIdentification(it, {
      idInput: 'id-input',
      idSubmit: 'id-submit',
      idFeedback: 'id-feedback',
      lien: true,
      onTrouve: () => { markVu(it.id); idNext.style.display = 'block'; },
      onEpuise: () => { idNext.style.display = 'block'; }
    });

    idNextBtn.addEventListener('click', () => loadIdentificationCard(it.id));
    document.getElementById('id-input').focus();
  }

  /* ---------------------------------------------------------------- */
  /* Vue : quiz global                                                  */
  /* ---------------------------------------------------------------- */

  let quizState = null;

  function buildQuizPool(){
    const pool = [];
    C.items.forEach(it => it.qcm.forEach(q => pool.push({ q, itemId: it.id, itemNom: it.nom })));
    for (let i = pool.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, Math.min(10, pool.length));
  }

  function renderQuizStart(){
    const total = C.items.reduce((n, it) => n + it.qcm.length, 0);
    return `
      <p class="section-lab">${M.quizGlobal}</p>
      <div class="quiz-end">
        <p class="disp" style="${C.styles.dispQuiz}">${tpl(M.quizIntroTitre, { n: total })}</p>
        <p>${M.quizIntroTexte}</p>
        <button class="btn-primary" id="quiz-start-btn" type="button">${M.quizCommencer}</button>
      </div>
    `;
  }

  function initQuizStart(){
    document.getElementById('quiz-start-btn').addEventListener('click', () => {
      quizState = { pool: buildQuizPool(), idx: 0, correct: 0 };
      renderQuizQuestion();
    });
  }

  function renderQuizQuestion(){
    const app = document.getElementById('app');
    if (quizState.idx >= quizState.pool.length){
      app.innerHTML = `
        <p class="section-lab">${M.quizResultat}</p>
        <div class="quiz-end">
          <p class="mono" style="font-size:var(--fs-100);color:var(--ink-dim);text-transform:uppercase;letter-spacing:.05em;">${M.scoreFinal}</p>
          <p class="score">${quizState.correct}/${quizState.pool.length}</p>
          <p>${quizState.correct === quizState.pool.length ? M.quizSansFaute : M.quizAvecErreurs}</p>
          <div class="cta-row" style="justify-content:center;">
            <button class="btn-primary" id="quiz-replay-btn" type="button">${M.rejouer}</button>
            <a class="btn-ghost" href="#/${C.route}">${M.explorerFiches}</a>
          </div>
        </div>
      `;
      document.getElementById('quiz-replay-btn').addEventListener('click', () => {
        quizState = { pool: buildQuizPool(), idx: 0, correct: 0 };
        renderQuizQuestion();
      });
      return;
    }

    const item = quizState.pool[quizState.idx];
    const q = item.q;
    app.innerHTML = `
      <p class="quiz-progress">${tpl(M.quizProgression, {
        i: '<b>' + (quizState.idx + 1) + '</b>',
        n: quizState.pool.length,
        s: '<b>' + quizState.correct + '</b>'
      })}</p>
      <div class="test-box">
        <div class="scan-ring" data-ring>✓</div>
        <p class="test-q">${q.question}</p>
        <div class="choices" data-choices>
          ${q.choix.map((ch, ci) => `<button class="choice" data-correct="${ci === q.bonne_reponse}">${ch}</button>`).join('')}
        </div>
        <p class="explain" data-explain>${q.explication}</p>
        <p class="quiz-origin">${M.issuDeLaFiche}<a href="#/${C.route}/${item.itemId}">${item.itemNom}</a></p>
      </div>
      <div class="cta-row" id="quiz-next-wrap" style="display:none;">
        <button class="btn-primary" id="quiz-next-btn" type="button">${quizState.idx + 1 < quizState.pool.length ? M.questionSuivante : M.voirResultat}</button>
      </div>
    `;

    cablerBoiteQcm(app.querySelector('.test-box'), ok => {
      if (ok) quizState.correct++;
      document.getElementById('quiz-next-wrap').style.display = 'flex';
    });
    document.getElementById('quiz-next-btn').addEventListener('click', () => {
      quizState.idx++;
      renderQuizQuestion();
    });
  }

  /* ---------------------------------------------------------------- */
  /* Vue : à propos                                                     */
  /* ---------------------------------------------------------------- */

  function renderApropos(){
    return `
      <p class="section-lab">${M.apropos}</p>
      <div class="apropos">
        ${C.aproposHtml()}
      </div>
    `;
  }

  /* ---------------------------------------------------------------- */
  /* Vue : introuvable                                                   */
  /* ---------------------------------------------------------------- */

  function renderNotFound(){
    return `
      <div class="empty">
        <p class="disp" style="${C.styles.dispIntrouvable}">${M.pageIntrouvable}</p>
        <p>${M.introuvableTexte}</p>
        <div class="cta-row" style="justify-content:center;"><a class="btn-primary" href="#/${C.route}">${M.retourExplorationCourt}</a></div>
      </div>
    `;
  }

  /* ---------------------------------------------------------------- */
  /* Démarrage                                                          */
  /* ---------------------------------------------------------------- */

  function demarrer(config){
    C = config;
    const langue = (window.I18N && window.I18N.lang === 'en') ? 'en' : 'fr';
    M = config.mots[langue];
    C.aproposHtml = () => config.apropos[langue];

    window.addEventListener('hashchange', render);

    const lancer = () => {
      const rand = document.getElementById('rand-btn');
      if (rand) rand.addEventListener('click', () => {
        const current = parseHash();
        const currentId = current[0] === C.route ? current[1] : null;
        let pool = C.items;
        if (currentId && C.items.length > 1) pool = C.items.filter(it => it.id !== currentId);
        const it = pool[Math.floor(Math.random() * pool.length)];
        navigate('/' + C.route + '/' + it.id);
      });
      render();
    };
    if (document.readyState === 'loading') window.addEventListener('DOMContentLoaded', lancer);
    else lancer();
  }

  window.Catalogue = { demarrer: demarrer };
})();
