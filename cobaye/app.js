// Cobaye — routing + logique (SPA, sans build, données dans data.js)

/* ---------------------------------------------------------------- */
/* Utils                                                             */
/* ---------------------------------------------------------------- */

function expById(id){ return EXPERIENCES.find(e => e.id === id); }
function catById(id){ return CATEGORIES.find(c => c.id === id); }
function countByCat(catId){ return EXPERIENCES.filter(e => e.categorie === catId).length; }

const DIACRITICS_RE = new RegExp('[̀-ͯ]', 'g');

function normalizeSearch(s){
  return (s || '').toLowerCase().normalize('NFD').replace(DIACRITICS_RE, '').trim();
}

function normalizeAnswer(s){
  return (s || '').toLowerCase()
    .normalize('NFD').replace(DIACRITICS_RE, '')
    .replace(/[’'-]/g, ' ')
    .replace(/\bl['a]\s*experience\s+(de|du|d)\b/g, '')
    .replace(/\bexperience\s+(de|du|d)\b/g, '')
    .replace(/\betude\s+(de|du|d)\b/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
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

/* ---------------------------------------------------------------- */
/* Progression (localStorage)                                        */
/* ---------------------------------------------------------------- */

const LS_KEY = 'cobaye-vus';

function getVus(){
  try { return new Set(JSON.parse(localStorage.getItem(LS_KEY) || '[]')); }
  catch (e) { return new Set(); }
}
function markVu(id){
  const s = getVus();
  s.add(id);
  localStorage.setItem(LS_KEY, JSON.stringify([...s]));
}

/* ---------------------------------------------------------------- */
/* Router                                                             */
/* ---------------------------------------------------------------- */

function parseHash(){
  return location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
}

function navigate(path){ location.hash = path; }

function updateActiveTab(parts){
  const map = { experiences: '#/experiences', categories: '#/categories', quiz: '#/quiz', identification: '#/identification', 'a-propos': '#/a-propos' };
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
  } else if (parts[0] === 'experiences' && parts.length === 1){
    app.innerHTML = renderCatalogue();
    initCatalogue();
  } else if (parts[0] === 'experiences' && parts[1]){
    const e = expById(parts[1]);
    if (!e){ app.innerHTML = renderNotFound(); }
    else { app.innerHTML = renderFiche(e); initFiche(e); markVu(e.id); }
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
/* Vue : accueil                                                      */
/* ---------------------------------------------------------------- */

function renderHome(){
  const jour = EXPERIENCES[dayIndex(EXPERIENCES.length)];
  const jourCat = catById(jour.categorie);
  return `
    <div class="hero">
      <div>
        <p class="eyebrow">Cobaye — dans la peau des sujets</p>
        <h1>${EXPERIENCES.length} expériences.<br>Un cerveau qui n'a pas changé.</h1>
        <p class="lead">${EXPERIENCES.length} expériences de psychologie parmi les plus célèbres — leur histoire, ce qu'elles ont vraiment montré, et ce qu'on en sait aujourd'hui.</p>
      </div>
      <div class="asch-demo" id="selfdemo">
        <p class="asch-q">Quelle ligne (A, B ou C) a la même longueur que la ligne de référence ?</p>
        <div class="asch-ref"><span class="asch-bar" style="width:120px;"></span> référence</div>
        <p class="asch-votes">4 participants précédents ont déjà répondu : <b>B</b></p>
        <div class="asch-choices" id="asch-choices">
          <button class="asch-choice" data-v="a"><span class="asch-bar" style="width:120px;"></span> A</button>
          <button class="asch-choice" data-v="b"><span class="asch-bar" style="width:82px;"></span> B</button>
          <button class="asch-choice" data-v="c"><span class="asch-bar" style="width:152px;"></span> C</button>
        </div>
        <p class="asch-result" id="asch-result"></p>
      </div>
    </div>

    <div class="home-block">
      <p class="section-lab">Étude du jour</p>
      <a class="col-carte col-carte--fiche" href="#/experiences/${jour.id}" style="max-width:420px;">
        <div class="swatch-top ${jourCat.classe}"></div>
        <div class="card-body">
          <h3 class="col-carte__titre">${jour.nom}</h3>
          <p class="col-carte__desc">${jour.resume_court}</p>
          <div class="card-foot"><span>${jourCat.nom}</span><span>${jour.annee}</span></div>
        </div>
      </a>
    </div>

    <div class="home-block">
      <p class="section-lab">Catégories</p>
      <div class="col-cartes">
        ${CATEGORIES.map(c => `
          <a class="col-carte col-carte--cat ${c.classe}" href="#/categories/${c.id}">
            <h3 class="col-carte__titre">${c.nom}</h3>
            <p class="col-carte__desc">${c.description}</p>
            <span class="count">${countByCat(c.id)} études</span>
          </a>
        `).join('')}
      </div>
      <div class="cta-row">
        <a class="btn-primary" href="#/experiences">Explorer toutes les études →</a>
        <a class="btn-ghost" href="#/identification">Tenter « Identifie l'étude »</a>
      </div>
    </div>
  `;
}

function initHome(){
  document.querySelectorAll('.asch-choice').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.asch-choice').forEach(b => b.classList.remove('picked'));
      btn.classList.add('picked');
      const v = btn.dataset.v;
      const result = document.getElementById('asch-result');
      const disclaimer = 'Précision : les « 4 participants précédents » n\'existaient pas, c\'était une mise en scène pour te mettre dans la peau d\'un vrai sujet de l\'expérience.';
      if (v === 'a'){
        result.innerHTML = 'C\'est <b>A</b> la bonne réponse, et tu l\'as trouvée — tu as résisté à la fausse majorité annoncée. Dans l\'expérience originale d\'Asch (1951), environ 75% des participants se sont pourtant ralliés au moins une fois à une réponse de groupe manifestement fausse. ' + disclaimer;
      } else if (v === 'b'){
        result.innerHTML = 'La bonne réponse était <b>A</b> — regarde bien, sa barre fait exactement la même longueur que la référence. Si tu as choisi B, tu viens de vivre une version simplifiée de l\'expérience d\'Asch (1951) : environ 75% des participants originaux se sont ralliés au moins une fois à une réponse de groupe pourtant fausse. ' + disclaimer;
      } else {
        result.innerHTML = 'La bonne réponse était <b>A</b>, pas C — regarde bien, sa barre fait exactement la même longueur que la référence. Ici, pas de conformisme en jeu : C n\'était pas la réponse annoncée par le groupe, juste une mauvaise lecture. ' + disclaimer;
      }
    });
  });
}

/* ---------------------------------------------------------------- */
/* Vue : catalogue (Explorer)                                        */
/* ---------------------------------------------------------------- */

function renderCatalogue(presetCat){
  return `
    <p class="fiche-back" style="visibility:hidden;">&nbsp;</p>
    <p class="section-lab">Explorer les expériences</p>
    <div class="searchbar">
      <input type="search" id="q-search" placeholder="Rechercher une expérience (nom, chercheur)…" aria-label="Recherche">
      <select id="q-cat" aria-label="Filtrer par catégorie">
        <option value="">Toutes les catégories</option>
        ${CATEGORIES.map(c => `<option value="${c.id}" ${presetCat === c.id ? 'selected' : ''}>${c.nom}</option>`).join('')}
      </select>
      <select id="q-diff" aria-label="Filtrer par difficulté">
        <option value="">Toutes les difficultés</option>
        <option value="facile">Facile</option>
        <option value="intermédiaire">Intermédiaire</option>
        <option value="avancé">Avancé</option>
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
    const vus = getVus();

    const list = EXPERIENCES.filter(e => {
      if (cat && e.categorie !== cat) return false;
      if (diff && e.difficulte !== diff) return false;
      if (q){
        const hay = normalizeSearch(e.nom + ' ' + e.chercheurs + ' ' + e.resume_court);
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const results = document.getElementById('cat-results');
    if (!list.length){
      results.innerHTML = `<div class="empty">Aucune expérience ne correspond à ces critères.</div>`;
      return;
    }
    results.innerHTML = `
      <p class="result-count">${list.length} études</p>
      <div class="col-cartes col-cartes--catalogue">
        ${list.map(e => {
          const c = catById(e.categorie);
          return `
            <a class="col-carte col-carte--fiche" href="#/experiences/${e.id}">
              ${vus.has(e.id) ? '<span class="badge-lu">vu</span>' : ''}
              <div class="swatch-top ${c.classe}"></div>
              <div class="card-body">
                <h3 class="col-carte__titre">${e.nom}</h3>
                <p class="col-carte__desc">${e.resume_court}</p>
                <div class="card-foot"><span>${c.nom}</span><span>${e.annee}</span></div>
              </div>
            </a>
          `;
        }).join('')}
      </div>
    `;
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
    <p class="section-lab">Toutes les catégories</p>
    <div class="col-cartes">
      ${CATEGORIES.map(c => `
        <a class="col-carte col-carte--cat ${c.classe}" href="#/categories/${c.id}">
          <h3 class="col-carte__titre">${c.nom}</h3>
          <p class="col-carte__desc">${c.description}</p>
          <span class="count">${countByCat(c.id)} études</span>
        </a>
      `).join('')}
    </div>
  `;
}

/* ---------------------------------------------------------------- */
/* Vue : fiche détaillée                                             */
/* ---------------------------------------------------------------- */

function renderFiche(e){
  const c = catById(e.categorie);
  const related = (e.experiences_liees || []).map(id => expById(id)).filter(Boolean);
  return `
    <a class="fiche-back" href="#/experiences">← Retour à l'exploration</a>
    <article class="fiche">
      <div class="fiche-band" style="background:${c.couleur};"></div>
      <div class="fiche-inner">

        <div class="fiche-head">
          <div>
            <a class="fiche-cat" href="#/categories/${c.id}">${c.nomLong}</a>
            <h2>${e.nom}</h2>
          </div>
          <span class="diff-badge">Niveau · ${capitalize(e.difficulte)}</span>
        </div>
        <p class="meta-line">${e.chercheurs} · ${e.annee} · ${e.lieu}</p>

        <p class="label">L'histoire</p>
        <p style="font-style:italic;color:var(--ink-dim);font-size:15px;margin:0 0 14px;max-width:640px;">${e.resume_court}</p>
        <p class="definition">${e.histoire}</p>

        <p class="label">Controverses & postérité</p>
        <div class="controverse-box">
          <p class="controverse-eyebrow">Ce qu'on en sait aujourd'hui</p>
          <p>${e.controverses}</p>
        </div>

        <p class="label">Où on le retrouve aujourd'hui</p>
        <div class="examples">
          ${e.exemples.map(ex => `
            <div class="example"><span class="mark"></span><div><strong>${ex.titre}</strong><span>${ex.texte}</span></div></div>
          `).join('')}
        </div>

        <p class="label">Teste-toi</p>
        <p class="qcm-score" id="qcm-score">Score : <b>0/${e.qcm.length}</b></p>
        ${e.qcm.map((q, i) => `
          <div class="test-box" data-idx="${i}">
            <div class="scan-ring" data-ring>✓</div>
            <p class="test-q">${q.question}</p>
            <div class="choices" data-choices>
              ${q.choix.map((ch, ci) => `<button class="choice" data-correct="${ci === q.bonne_reponse}">${ch}</button>`).join('')}
            </div>
            <p class="explain" data-explain>${q.explication}</p>
          </div>
        `).join('')}

        <p class="label">Identifie-la autrement</p>
        <div class="id-card" style="margin-bottom:34px;">
          <div class="id-band"></div>
          <div class="id-inner" style="padding:26px clamp(18px,3vw,34px);">
            <p class="id-eyebrow"><span>Identification libre · sans indice visuel</span></p>
            <p class="id-situation" style="font-size:15px;margin-bottom:20px;">${e.identification.situation}</p>
            <div class="id-row">
              <input class="id-input" id="fiche-id-input" type="text" placeholder="Nomme l'expérience…" autocomplete="off">
              <button class="id-btn" id="fiche-id-submit" type="button">Valider</button>
            </div>
            <div class="id-feedback" id="fiche-id-feedback"></div>
          </div>
        </div>

        <p class="label">Sources</p>
        <div class="sources">
          ${e.sources.map(s => `
            <div class="source">
              <span class="meta">${s.type}</span>
              <b>${s.auteurs}</b> (${s.annee}). ${s.titre}. <i>${s.revue}</i>.
              ${s.lien ? ` <a href="${s.lien}" target="_blank" rel="noopener">↗</a>` : ''}
            </div>
          `).join('')}
        </div>

        ${related.length ? `
          <p class="label">Études liées</p>
          <div class="related">
            ${related.map(r => `<a href="#/experiences/${r.id}">${r.nom}</a>`).join('')}
          </div>
        ` : ''}

      </div>
    </article>
  `;
}

function capitalize(s){ return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

function initFiche(e){
  let correct = 0;
  const scoreEl = document.getElementById('qcm-score');

  document.querySelectorAll('.test-box').forEach(box => {
    const choices = box.querySelectorAll('.choice');
    const ring = box.querySelector('[data-ring]');
    const explain = box.querySelector('[data-explain]');
    let done = false;
    choices.forEach(btn => {
      btn.addEventListener('click', () => {
        if (done) return;
        done = true;
        const ok = btn.dataset.correct === 'true';
        if (ok) correct++;
        choices.forEach(c => {
          if (c.dataset.correct === 'true') c.classList.add('correct');
          else if (c === btn) c.classList.add('wrong');
        });
        ring.textContent = ok ? '✓' : '✕';
        ring.classList.toggle('wrong', !ok);
        requestAnimationFrame(() => ring.classList.add('show'));
        explain.classList.add('show');
        scoreEl.innerHTML = `Score : <b>${correct}/${e.qcm.length}</b>`;
      });
    });
  });

  const idInput = document.getElementById('fiche-id-input');
  const idSubmit = document.getElementById('fiche-id-submit');
  const idFeedback = document.getElementById('fiche-id-feedback');
  let attempts = 0;

  function submit(){
    const val = idInput.value.trim();
    if (!val) return;
    attempts++;
    idFeedback.className = 'id-feedback';
    if (isAnswerCorrect(val, e.identification.reponses_acceptees)){
      idFeedback.classList.add('correct');
      idFeedback.innerHTML = `<b>Correct.</b> Il s'agit bien de : ${e.nom}.`;
      idInput.disabled = true; idSubmit.disabled = true;
    } else if (attempts === 1){
      idFeedback.classList.add('hint');
      idFeedback.innerHTML = `Pas encore. Un indice : <b>${e.identification.indice}</b>`;
    } else {
      idFeedback.classList.add('reveal');
      idFeedback.innerHTML = `La réponse était : <b>${e.nom}</b>.`;
      idInput.disabled = true; idSubmit.disabled = true;
    }
  }
  idSubmit.addEventListener('click', submit);
  idInput.addEventListener('keydown', ev => { if (ev.key === 'Enter') submit(); });
}

/* ---------------------------------------------------------------- */
/* Vue : identification libre (mode dédié)                           */
/* ---------------------------------------------------------------- */

function renderIdentificationCard(e){
  return `
    <p class="section-lab">Identifie l'étude</p>
    <article class="id-card">
      <div class="id-band"></div>
      <div class="id-inner">
        <p class="id-eyebrow"><span>Exercice · sans indice visuel</span></p>
        <p class="id-situation">${e.identification.situation}</p>

        <div class="id-row">
          <input class="id-input" id="id-input" type="text" placeholder="Nomme l'expérience…" autocomplete="off">
          <button class="id-btn" id="id-submit" type="button">Valider</button>
        </div>

        <div class="id-feedback" id="id-feedback"></div>
        <div class="id-next" id="id-next" style="display:none;">
          <button class="btn-primary" id="id-next-btn" type="button">Situation suivante →</button>
        </div>
      </div>
    </article>
  `;
}

function loadIdentificationCard(excludeId){
  let pool = EXPERIENCES;
  if (excludeId && EXPERIENCES.length > 1) pool = EXPERIENCES.filter(e => e.id !== excludeId);
  const e = pool[Math.floor(Math.random() * pool.length)];

  document.getElementById('app').innerHTML = renderIdentificationCard(e);

  const idInput = document.getElementById('id-input');
  const idSubmit = document.getElementById('id-submit');
  const idFeedback = document.getElementById('id-feedback');
  const idNext = document.getElementById('id-next');
  const idNextBtn = document.getElementById('id-next-btn');
  let attempts = 0;

  function submit(){
    const val = idInput.value.trim();
    if (!val) return;
    attempts++;
    idFeedback.className = 'id-feedback';
    if (isAnswerCorrect(val, e.identification.reponses_acceptees)){
      idFeedback.classList.add('correct');
      idFeedback.innerHTML = `<b>Correct.</b> Il s'agit bien de : <a href="#/experiences/${e.id}">${e.nom}</a>.`;
      idInput.disabled = true; idSubmit.disabled = true;
      markVu(e.id);
      idNext.style.display = 'block';
    } else if (attempts === 1){
      idFeedback.classList.add('hint');
      idFeedback.innerHTML = `Pas encore. Un indice : <b>${e.identification.indice}</b>`;
    } else {
      idFeedback.classList.add('reveal');
      idFeedback.innerHTML = `La réponse était : <b><a href="#/experiences/${e.id}">${e.nom}</a></b>.`;
      idInput.disabled = true; idSubmit.disabled = true;
      idNext.style.display = 'block';
    }
  }
  idSubmit.addEventListener('click', submit);
  idInput.addEventListener('keydown', ev => { if (ev.key === 'Enter') submit(); });
  idNextBtn.addEventListener('click', () => loadIdentificationCard(e.id));
  idInput.focus();
}

/* ---------------------------------------------------------------- */
/* Vue : quiz global                                                  */
/* ---------------------------------------------------------------- */

let quizState = null;

function buildQuizPool(){
  const pool = [];
  EXPERIENCES.forEach(e => e.qcm.forEach(q => pool.push({ q, expId: e.id, expNom: e.nom })));
  for (let i = pool.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(10, pool.length));
}

function renderQuizStart(){
  const total = EXPERIENCES.reduce((n, e) => n + e.qcm.length, 0);
  return `
    <p class="section-lab">Quiz global</p>
    <div class="quiz-end">
      <p class="disp" style="font-size:18px;font-weight:400;margin-bottom:10px;">Pioche aléatoire dans les ${total} questions du catalogue</p>
      <p>10 questions tirées au hasard parmi toutes les expériences recensées — un bon test pour vérifier ce que tu as vraiment retenu, au-delà du récit populaire de chaque étude.</p>
      <button class="btn-primary" id="quiz-start-btn" type="button">Commencer le quiz</button>
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
      <p class="section-lab">Quiz global — résultat</p>
      <div class="quiz-end">
        <p class="mono" style="font-size:var(--fs-100);color:var(--ink-dim);text-transform:uppercase;letter-spacing:.05em;">Score final</p>
        <p class="score">${quizState.correct}/${quizState.pool.length}</p>
        <p>${quizState.correct === quizState.pool.length ? 'Sans faute — tu connais ces études mieux que leur résumé Wikipédia.' : 'Chaque erreur pointe une étude à relire : direction sa fiche pour creuser l\'histoire complète.'}</p>
        <div class="cta-row" style="justify-content:center;">
          <button class="btn-primary" id="quiz-replay-btn" type="button">Rejouer</button>
          <a class="btn-ghost" href="#/experiences">Explorer les fiches</a>
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
    <p class="quiz-progress">Question <b>${quizState.idx + 1}</b>/${quizState.pool.length} · Score : <b>${quizState.correct}</b></p>
    <div class="test-box">
      <div class="scan-ring" data-ring>✓</div>
      <p class="test-q">${q.question}</p>
      <div class="choices" data-choices>
        ${q.choix.map((ch, ci) => `<button class="choice" data-correct="${ci === q.bonne_reponse}">${ch}</button>`).join('')}
      </div>
      <p class="explain" data-explain>${q.explication}</p>
      <p class="quiz-origin">Issu de la fiche : <a href="#/experiences/${item.expId}">${item.expNom}</a></p>
    </div>
    <div class="cta-row" id="quiz-next-wrap" style="display:none;">
      <button class="btn-primary" id="quiz-next-btn" type="button">${quizState.idx + 1 < quizState.pool.length ? 'Question suivante →' : 'Voir le résultat →'}</button>
    </div>
  `;

  const box = app.querySelector('.test-box');
  const choices = box.querySelectorAll('.choice');
  const ring = box.querySelector('[data-ring]');
  const explain = box.querySelector('[data-explain]');
  let done = false;
  choices.forEach(btn => {
    btn.addEventListener('click', () => {
      if (done) return;
      done = true;
      const ok = btn.dataset.correct === 'true';
      if (ok) quizState.correct++;
      choices.forEach(c => {
        if (c.dataset.correct === 'true') c.classList.add('correct');
        else if (c === btn) c.classList.add('wrong');
      });
      ring.textContent = ok ? '✓' : '✕';
      ring.classList.toggle('wrong', !ok);
      requestAnimationFrame(() => ring.classList.add('show'));
      explain.classList.add('show');
      document.getElementById('quiz-next-wrap').style.display = 'flex';
    });
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
    <p class="section-lab">À propos</p>
    <div class="apropos">
      <p>Cobaye raconte l'histoire de dix expériences parmi les plus célèbres de la psychologie : ce qui a réellement été fait, ce qui a été découvert, et — point souvent absent des résumés populaires — ce qu'on en sait aujourd'hui, plusieurs décennies plus tard.</p>
      <h2>Méthodologie</h2>
      <p>Chaque fiche associe le récit de l'expérience, un encadré « Controverses & postérité » qui documente les critiques méthodologiques, réplications ou réexamens historiques ultérieurs, un mini-QCM et un exercice d'identification libre où il faut retrouver soi-même le nom de l'étude, sans indice visuel.</p>
      <p>Pour chaque expérience, l'étude originale est citée (auteur, année, revue) ainsi que, quand elle existe, une source de réexamen ou de réplique plus récente — vérifiées individuellement avant publication plutôt que citées de mémoire.</p>
      <h2>Disclaimer</h2>
      <p>Ce site est un outil de vulgarisation, pas une revue de littérature scientifique. Plusieurs des études présentées ici ont depuis fait l'objet de critiques méthodologiques sérieuses, documentées dans chaque fiche : les présenter uniquement comme des faits acquis serait trompeur.</p>
      <h2>Progression</h2>
      <p>Les études consultées sont mémorisées localement dans votre navigateur (badge « vu » dans la vue Explorer) — aucune donnée n'est envoyée à un serveur.</p>
    </div>
  `;
}

/* ---------------------------------------------------------------- */
/* Vue : introuvable                                                   */
/* ---------------------------------------------------------------- */

function renderNotFound(){
  return `
    <div class="empty">
      <p class="disp" style="font-size:17px;font-weight:400;margin-bottom:10px;">Page introuvable</p>
      <p>Cette expérience n'existe pas (encore) dans le catalogue.</p>
      <div class="cta-row" style="justify-content:center;"><a class="btn-primary" href="#/experiences">Retour à l'exploration</a></div>
    </div>
  `;
}

/* ---------------------------------------------------------------- */
/* Init                                                                */
/* ---------------------------------------------------------------- */

window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('rand-btn').addEventListener('click', () => {
    const current = parseHash();
    const currentId = current[0] === 'experiences' ? current[1] : null;
    let pool = EXPERIENCES;
    if (currentId && EXPERIENCES.length > 1) pool = EXPERIENCES.filter(e => e.id !== currentId);
    const e = pool[Math.floor(Math.random() * pool.length)];
    navigate('/experiences/' + e.id);
  });
  render();
});
