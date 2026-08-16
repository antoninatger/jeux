// Perceptio — routing + logic (SPA, no build, data lives in data-en.js)

/* ---------------------------------------------------------------- */
/* Utils                                                             */
/* ---------------------------------------------------------------- */

function biaisById(id){ return BIAIS.find(b => b.id === id); }
function catById(id){ return CATEGORIES.find(c => c.id === id); }
function countByCat(catId){ return BIAIS.filter(b => b.categorie === catId).length; }

const DIACRITICS_RE = new RegExp('[̀-ͯ]', 'g');

function normalizeSearch(s){
  return (s || '').toLowerCase().normalize('NFD').replace(DIACRITICS_RE, '').trim();
}

function normalizeAnswer(s){
  return (s || '').toLowerCase()
    .normalize('NFD').replace(DIACRITICS_RE, '')
    .replace(/[’'-]/g, ' ')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+(cognitive\s+)?(bias(es)?|effect|heuristic)$/, '')
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
/* Progress (localStorage)                                           */
/* ---------------------------------------------------------------- */

const LS_KEY = 'perceptio-lus';

function getLus(){
  try { return new Set(JSON.parse(localStorage.getItem(LS_KEY) || '[]')); }
  catch (e) { return new Set(); }
}
function markLu(id){
  const s = getLus();
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
  const map = { biais: '#/biais', categories: '#/categories', quiz: '#/quiz', identification: '#/identification', 'a-propos': '#/a-propos' };
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
  } else if (parts[0] === 'biais' && parts.length === 1){
    app.innerHTML = renderCatalogue();
    initCatalogue();
  } else if (parts[0] === 'biais' && parts[1]){
    const b = biaisById(parts[1]);
    if (!b){ app.innerHTML = renderNotFound(); }
    else { app.innerHTML = renderFiche(b); initFiche(b); markLu(b.id); }
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
/* View: home                                                         */
/* ---------------------------------------------------------------- */

function renderHome(){
  const jour = BIAIS[dayIndex(BIAIS.length)];
  const jourCat = catById(jour.categorie);
  return `
    <div class="hero">
      <div>
        <p class="eyebrow">Perceptio — a lab for perception</p>
        <h1>Your brain lies.<br>Politely.</h1>
        <p class="lead">${BIAIS.length} cognitive biases catalogued, explained and tested — starting with proof, not a definition.</p>
      </div>
      <div class="illusion" id="selfdemo">
        <p class="demo-q">How would you rate your driving skills, compared with the average person?</p>
        <div class="demo-choices" id="demo-choices">
          <button class="demo-btn" data-v="1">Well below average</button>
          <button class="demo-btn" data-v="2">Below average</button>
          <button class="demo-btn" data-v="3">Average</button>
          <button class="demo-btn" data-v="4">Above average</button>
          <button class="demo-btn" data-v="5">Well above average</button>
        </div>
        <p class="illusion-caption" id="demo-result"></p>
      </div>
    </div>

    <div class="home-block">
      <p class="section-lab">Bias of the day</p>
      <a class="col-carte col-carte--fiche" href="#/biais/${jour.id}" style="max-width:420px;">
        <div class="swatch-top ${jourCat.classe}"></div>
        <div class="card-body">
          <h3 class="col-carte__titre">${jour.nom}</h3>
          <p class="col-carte__desc">${jour.definition_courte}</p>
          <div class="card-foot"><span>${jourCat.nom}</span><span>${capitalize(jour.difficulte)}</span></div>
        </div>
      </a>
    </div>

    <div class="home-block">
      <p class="section-lab">Categories</p>
      <div class="col-cartes">
        ${CATEGORIES.map(c => `
          <a class="col-carte col-carte--cat ${c.classe}" href="#/categories/${c.id}">
            <h3 class="col-carte__titre">${c.nom}</h3>
            <p class="col-carte__desc">${c.description}</p>
            <span class="count">${countByCat(c.id)} biases</span>
          </a>
        `).join('')}
      </div>
      <div class="cta-row">
        <a class="btn-primary" href="#/biais">Explore all biases →</a>
        <a class="btn-ghost" href="#/identification">Try “Spot the bias”</a>
      </div>
    </div>
  `;
}

function initHome(){
  document.querySelectorAll('.demo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.demo-btn').forEach(b => b.classList.remove('picked'));
      btn.classList.add('picked');
      const v = parseInt(btn.dataset.v, 10);
      const result = document.getElementById('demo-result');
      if (v >= 4){
        result.innerHTML = 'About <b>80% of drivers</b> rate themselves above average — statistically impossible. You may have just experienced illusory superiority (Svenson, 1981).';
      } else {
        result.innerHTML = "Don't worry: most people overrate themselves on this test. Rating yourself modestly is already rare — but illusory superiority (Svenson, 1981) still lurks elsewhere.";
      }
    });
  });
}

function capitalize(s){ return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

/* ---------------------------------------------------------------- */
/* View: catalogue (Explore)                                         */
/* ---------------------------------------------------------------- */

function renderCatalogue(presetCat){
  return `
    <p class="fiche-back" style="visibility:hidden;">&nbsp;</p>
    <p class="section-lab">Explore the biases</p>
    <div class="searchbar">
      <input type="search" id="q-search" placeholder="Search a bias (name, synonym)…" aria-label="Search">
      <select id="q-cat" aria-label="Filter by category">
        <option value="">All categories</option>
        ${CATEGORIES.map(c => `<option value="${c.id}" ${presetCat === c.id ? 'selected' : ''}>${c.nom}</option>`).join('')}
      </select>
      <select id="q-diff" aria-label="Filter by difficulty">
        <option value="">All difficulties</option>
        <option value="easy">Easy</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
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
    const lus = getLus();

    const list = BIAIS.filter(b => {
      if (cat && b.categorie !== cat) return false;
      if (diff && b.difficulte !== diff) return false;
      if (q){
        const hay = normalizeSearch(b.nom + ' ' + b.nom_anglais + ' ' + b.definition_courte);
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const results = document.getElementById('cat-results');
    if (!list.length){
      results.innerHTML = `<div class="empty">No bias matches these criteria.</div>`;
      return;
    }
    results.innerHTML = `
      <p class="result-count">${list.length} biases</p>
      <div class="col-cartes col-cartes--catalogue">
        ${list.map(b => {
          const c = catById(b.categorie);
          return `
            <a class="col-carte col-carte--fiche" href="#/biais/${b.id}">
              ${lus.has(b.id) ? '<span class="badge-lu">read</span>' : ''}
              <div class="swatch-top ${c.classe}"></div>
              <div class="card-body">
                <h3 class="col-carte__titre">${b.nom}</h3>
                <p class="col-carte__desc">${b.definition_courte}</p>
                <div class="card-foot"><span>${c.nom}</span><span>${capitalize(b.difficulte)}</span></div>
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
/* View: categories                                                   */
/* ---------------------------------------------------------------- */

function renderCategoriesPage(){
  return `
    <p class="section-lab">All categories</p>
    <div class="col-cartes">
      ${CATEGORIES.map(c => `
        <a class="col-carte col-carte--cat ${c.classe}" href="#/categories/${c.id}">
          <h3 class="col-carte__titre">${c.nom}</h3>
          <p class="col-carte__desc">${c.description}</p>
          <span class="count">${countByCat(c.id)} biases</span>
        </a>
      `).join('')}
    </div>
  `;
}

/* ---------------------------------------------------------------- */
/* View: fiche (bias page)                                            */
/* ---------------------------------------------------------------- */

function renderFiche(b){
  const c = catById(b.categorie);
  const related = (b.biais_lies || []).map(id => biaisById(id)).filter(Boolean);
  return `
    <a class="fiche-back" href="#/biais">← Back to exploration</a>
    <article class="fiche">
      <div class="fiche-band" style="background:${c.couleur};"></div>
      <div class="fiche-inner">

        <div class="fiche-head">
          <div>
            <a class="fiche-cat" href="#/categories/${c.id}">${c.nomLong}</a>
            <h2>${b.nom}</h2>
            <p class="eng">${b.nom_anglais}</p>
          </div>
          <span class="diff-badge">Level · ${capitalize(b.difficulte)}</span>
        </div>

        <p class="label">Definition</p>
        <p style="font-style:italic;color:var(--ink-dim);font-size:15px;margin:0 0 14px;max-width:640px;">${b.definition_courte}</p>
        <p class="definition">${b.definition_longue}</p>

        <p class="label">Examples</p>
        <div class="examples">
          ${b.exemples.map(ex => `
            <div class="example"><span class="mark"></span><div><strong>${ex.titre}</strong><span>${ex.texte}</span></div></div>
          `).join('')}
        </div>

        <p class="label">Test yourself</p>
        <p class="qcm-score" id="qcm-score">Score: <b>0/${b.qcm.length}</b></p>
        ${b.qcm.map((q, i) => `
          <div class="test-box" data-idx="${i}">
            <div class="scan-ring" data-ring>✓</div>
            <p class="test-q">${q.question}</p>
            <div class="choices" data-choices>
              ${q.choix.map((ch, ci) => `<button class="choice" data-correct="${ci === q.bonne_reponse}">${ch}</button>`).join('')}
            </div>
            <p class="explain" data-explain>${q.explication}</p>
          </div>
        `).join('')}

        <p class="label">Test yourself differently</p>
        <div class="id-card" style="margin-bottom:34px;">
          <div class="id-band"></div>
          <div class="id-inner" style="padding:26px clamp(18px,3vw,34px);">
            <p class="id-eyebrow"><span>Free recall · no visual clue</span></p>
            <p class="id-situation" style="font-size:15px;margin-bottom:20px;">${b.identification.situation}</p>
            <div class="id-row">
              <input class="id-input" id="fiche-id-input" type="text" placeholder="Type the name of the bias…" autocomplete="off">
              <button class="id-btn" id="fiche-id-submit" type="button">Submit</button>
            </div>
            <div class="id-feedback" id="fiche-id-feedback"></div>
          </div>
        </div>

        <p class="label">Sources</p>
        <div class="sources">
          ${b.sources.map(s => `
            <div class="source">
              <span class="meta">${s.type}</span>
              <b>${s.auteurs}</b> (${s.annee}). ${s.titre}. <i>${s.revue}</i>.
              ${s.lien ? ` <a href="${s.lien}" target="_blank" rel="noopener">↗</a>` : ''}
            </div>
          `).join('')}
        </div>

        ${related.length ? `
          <p class="label">Related biases</p>
          <div class="related">
            ${related.map(r => `<a href="#/biais/${r.id}">${r.nom}</a>`).join('')}
          </div>
        ` : ''}

      </div>
    </article>
  `;
}

function initFiche(b){
  let answered = 0, correct = 0;
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
        answered++;
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
        scoreEl.innerHTML = `Score: <b>${correct}/${b.qcm.length}</b>`;
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
    if (isAnswerCorrect(val, b.identification.reponses_acceptees)){
      idFeedback.classList.add('correct');
      idFeedback.innerHTML = `<b>Correct.</b> This is indeed the ${b.nom.toLowerCase()}.`;
      idInput.disabled = true; idSubmit.disabled = true;
    } else if (attempts === 1){
      idFeedback.classList.add('hint');
      idFeedback.innerHTML = `Not quite. A hint: <b>${b.identification.indice}</b>`;
    } else {
      idFeedback.classList.add('reveal');
      idFeedback.innerHTML = `The answer was: <b>${b.nom.toLowerCase()}</b>.`;
      idInput.disabled = true; idSubmit.disabled = true;
    }
  }
  idSubmit.addEventListener('click', submit);
  idInput.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });
}

/* ---------------------------------------------------------------- */
/* View: free identification (dedicated mode)                        */
/* ---------------------------------------------------------------- */

function renderIdentificationCard(b, isLast){
  return `
    <p class="section-lab">Spot the bias</p>
    <article class="id-card">
      <div class="id-band"></div>
      <div class="id-inner">
        <p class="id-eyebrow"><span>Exercise · no visual clue</span><span>${countByCat(b.categorie) ? '' : ''}</span></p>
        <p class="id-situation">${b.identification.situation}</p>

        <div class="id-row">
          <input class="id-input" id="id-input" type="text" placeholder="Type the name of the bias…" autocomplete="off">
          <button class="id-btn" id="id-submit" type="button">Submit</button>
        </div>

        <div class="id-feedback" id="id-feedback"></div>
        <div class="id-next" id="id-next" style="display:none;">
          <button class="btn-primary" id="id-next-btn" type="button">Next situation →</button>
        </div>
      </div>
    </article>
  `;
}

function loadIdentificationCard(excludeId){
  let pool = BIAIS;
  if (excludeId && BIAIS.length > 1) pool = BIAIS.filter(b => b.id !== excludeId);
  const b = pool[Math.floor(Math.random() * pool.length)];

  document.getElementById('app').innerHTML = renderIdentificationCard(b);

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
    if (isAnswerCorrect(val, b.identification.reponses_acceptees)){
      idFeedback.classList.add('correct');
      idFeedback.innerHTML = `<b>Correct.</b> This is indeed the <a href="#/biais/${b.id}">${b.nom.toLowerCase()}</a>.`;
      idInput.disabled = true; idSubmit.disabled = true;
      markLu(b.id);
      idNext.style.display = 'block';
    } else if (attempts === 1){
      idFeedback.classList.add('hint');
      idFeedback.innerHTML = `Not quite. A hint: <b>${b.identification.indice}</b>`;
    } else {
      idFeedback.classList.add('reveal');
      idFeedback.innerHTML = `The answer was: <b><a href="#/biais/${b.id}">${b.nom.toLowerCase()}</a></b>.`;
      idInput.disabled = true; idSubmit.disabled = true;
      idNext.style.display = 'block';
    }
  }
  idSubmit.addEventListener('click', submit);
  idInput.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });
  idNextBtn.addEventListener('click', () => loadIdentificationCard(b.id));
  idInput.focus();
}

/* ---------------------------------------------------------------- */
/* View: global quiz                                                  */
/* ---------------------------------------------------------------- */

let quizState = null;

function buildQuizPool(){
  const pool = [];
  BIAIS.forEach(b => b.qcm.forEach(q => pool.push({ q, biaisId: b.id, biaisNom: b.nom })));
  for (let i = pool.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(10, pool.length));
}

function renderQuizStart(){
  const total = BIAIS.reduce((n, b) => n + b.qcm.length, 0);
  return `
    <p class="section-lab">Global quiz</p>
    <div class="quiz-end">
      <p class="disp" style="font-size:19px;font-weight:600;margin-bottom:10px;">A random draw from the catalogue's ${total} questions</p>
      <p>10 questions drawn at random from every bias in the catalogue — the exercise closest to real life: recognising a bias without knowing beforehand which one it is.</p>
      <button class="btn-primary" id="quiz-start-btn" type="button">Start the quiz</button>
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
      <p class="section-lab">Global quiz — result</p>
      <div class="quiz-end">
        <p class="mono" style="font-size:var(--fs-100);color:var(--ink-dim);text-transform:uppercase;letter-spacing:.05em;">Final score</p>
        <p class="score">${quizState.correct}/${quizState.pool.length}</p>
        <p>${quizState.correct === quizState.pool.length ? 'Flawless — your brain resisted every trap in this draw.' : 'Each mistake points to a bias worth re-reading: head to its fiche to dig into the mechanism.'}</p>
        <div class="cta-row" style="justify-content:center;">
          <button class="btn-primary" id="quiz-replay-btn" type="button">Play again</button>
          <a class="btn-ghost" href="#/biais">Browse the fiches</a>
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
    <p class="quiz-progress">Question <b>${quizState.idx + 1}</b>/${quizState.pool.length} · Score: <b>${quizState.correct}</b></p>
    <div class="test-box">
      <div class="scan-ring" data-ring>✓</div>
      <p class="test-q">${q.question}</p>
      <div class="choices" data-choices>
        ${q.choix.map((ch, ci) => `<button class="choice" data-correct="${ci === q.bonne_reponse}">${ch}</button>`).join('')}
      </div>
      <p class="explain" data-explain>${q.explication}</p>
      <p class="quiz-origin">From the fiche: <a href="#/biais/${item.biaisId}">${item.biaisNom}</a></p>
    </div>
    <div class="cta-row" id="quiz-next-wrap" style="display:none;">
      <button class="btn-primary" id="quiz-next-btn" type="button">${quizState.idx + 1 < quizState.pool.length ? 'Next question →' : 'See the result →'}</button>
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
/* View: about                                                        */
/* ---------------------------------------------------------------- */

function renderApropos(){
  return `
    <p class="section-lab">About</p>
    <div class="apropos">
      <p>Perceptio is an educational catalogue of cognitive biases: systematic shortcuts in thinking that predictably distort our perception, memory or judgment.</p>
      <h2>Methodology</h2>
      <p>Each entry pairs a definition with concrete examples from varied contexts, a short quiz, and a free-recall exercise where you have to come up with the bias's name yourself, with no visual clue — a deeper level of learning than simple recognition.</p>
      <p>For every bias, at least one founding scientific source is cited (author, year, journal), verified individually before publication rather than quoted from memory — references on this topic often circulate in an approximate form.</p>
      <h2>Disclaimer</h2>
      <p>This site is a popularisation tool, not a scientific review. Definitions are simplified to stay accessible; refer to the cited sources to go deeper into a mechanism.</p>
      <h2>Progress</h2>
      <p>Biases you've viewed are remembered locally in your browser (a "read" badge in the Explore view) — no data is ever sent to a server.</p>
    </div>
  `;
}

/* ---------------------------------------------------------------- */
/* View: not found                                                    */
/* ---------------------------------------------------------------- */

function renderNotFound(){
  return `
    <div class="empty">
      <p class="disp" style="font-size:18px;font-weight:600;margin-bottom:10px;">Page not found</p>
      <p>This bias doesn't exist (yet) in the catalogue.</p>
      <div class="cta-row" style="justify-content:center;"><a class="btn-primary" href="#/biais">Back to exploration</a></div>
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
    const currentId = current[0] === 'biais' ? current[1] : null;
    let pool = BIAIS;
    if (currentId && BIAIS.length > 1) pool = BIAIS.filter(b => b.id !== currentId);
    const b = pool[Math.floor(Math.random() * pool.length)];
    navigate('/biais/' + b.id);
  });
  render();
});
