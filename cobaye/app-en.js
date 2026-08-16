// Cobaye — routing + logic (SPA, no build, data lives in data-en.js)

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
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+(experiment|effect)$/, '')
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
/* View: home                                                         */
/* ---------------------------------------------------------------- */

function renderHome(){
  const jour = EXPERIENCES[dayIndex(EXPERIENCES.length)];
  const jourCat = catById(jour.categorie);
  return `
    <div class="hero">
      <div>
        <p class="eyebrow">Cobaye — inside the subjects' shoes</p>
        <h1>Ten experiments.<br>One brain that hasn't changed.</h1>
        <p class="lead">${EXPERIENCES.length} of the most famous psychology experiments — their history, what they actually showed, and what we know about them today.</p>
      </div>
      <div class="asch-demo" id="selfdemo">
        <p class="asch-q">Which line (A, B or C) matches the reference line in length?</p>
        <div class="asch-ref"><span class="asch-bar" style="width:120px;"></span> reference</div>
        <p class="asch-votes">4 previous participants already answered: <b>B</b></p>
        <div class="asch-choices" id="asch-choices">
          <button class="asch-choice" data-v="a"><span class="asch-bar" style="width:120px;"></span> A</button>
          <button class="asch-choice" data-v="b"><span class="asch-bar" style="width:82px;"></span> B</button>
          <button class="asch-choice" data-v="c"><span class="asch-bar" style="width:152px;"></span> C</button>
        </div>
        <p class="asch-result" id="asch-result"></p>
      </div>
    </div>

    <div class="home-block">
      <p class="section-lab">Study of the day</p>
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
      <p class="section-lab">Categories</p>
      <div class="col-cartes">
        ${CATEGORIES.map(c => `
          <a class="col-carte col-carte--cat ${c.classe}" href="#/categories/${c.id}">
            <h3 class="col-carte__titre">${c.nom}</h3>
            <p class="col-carte__desc">${c.description}</p>
            <span class="count">${countByCat(c.id)} studies</span>
          </a>
        `).join('')}
      </div>
      <div class="cta-row">
        <a class="btn-primary" href="#/experiences">Explore all studies →</a>
        <a class="btn-ghost" href="#/identification">Try "Name the study"</a>
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
      if (v === 'b'){
        result.innerHTML = 'The correct answer was <b>A</b> — look closely, its bar is exactly the same length as the reference. If you picked B, you just lived a simplified version of the Asch experiment (1951): about 75% of original participants went along with an incorrect group answer at least once.';
      } else {
        result.innerHTML = '<b>A</b> was indeed correct, and you found it — you resisted the fake majority you were told about. In Asch\'s original experiment (1951), about 75% of participants nonetheless went along with an obviously wrong group answer at least once.';
      }
    });
  });
}

/* ---------------------------------------------------------------- */
/* View: catalogue (Explore)                                         */
/* ---------------------------------------------------------------- */

function renderCatalogue(presetCat){
  return `
    <p class="fiche-back" style="visibility:hidden;">&nbsp;</p>
    <p class="section-lab">Explore the experiments</p>
    <div class="searchbar">
      <input type="search" id="q-search" placeholder="Search an experiment (name, researcher)…" aria-label="Search">
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
      results.innerHTML = `<div class="empty">No experiment matches these criteria.</div>`;
      return;
    }
    results.innerHTML = `
      <p class="result-count">${list.length} studies</p>
      <div class="col-cartes col-cartes--catalogue">
        ${list.map(e => {
          const c = catById(e.categorie);
          return `
            <a class="col-carte col-carte--fiche" href="#/experiences/${e.id}">
              ${vus.has(e.id) ? '<span class="badge-lu">seen</span>' : ''}
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
          <span class="count">${countByCat(c.id)} studies</span>
        </a>
      `).join('')}
    </div>
  `;
}

/* ---------------------------------------------------------------- */
/* View: fiche (study page)                                           */
/* ---------------------------------------------------------------- */

function renderFiche(e){
  const c = catById(e.categorie);
  const related = (e.experiences_liees || []).map(id => expById(id)).filter(Boolean);
  return `
    <a class="fiche-back" href="#/experiences">← Back to exploration</a>
    <article class="fiche">
      <div class="fiche-band" style="background:${c.couleur};"></div>
      <div class="fiche-inner">

        <div class="fiche-head">
          <div>
            <a class="fiche-cat" href="#/categories/${c.id}">${c.nomLong}</a>
            <h2>${e.nom}</h2>
          </div>
          <span class="diff-badge">Level · ${capitalize(e.difficulte)}</span>
        </div>
        <p class="meta-line">${e.chercheurs} · ${e.annee} · ${e.lieu}</p>

        <p class="label">The story</p>
        <p style="font-style:italic;color:var(--ink-dim);font-size:15px;margin:0 0 14px;max-width:640px;">${e.resume_court}</p>
        <p class="definition">${e.histoire}</p>

        <p class="label">Controversies & legacy</p>
        <div class="controverse-box">
          <p class="controverse-eyebrow">What we know today</p>
          <p>${e.controverses}</p>
        </div>

        <p class="label">Where it shows up today</p>
        <div class="examples">
          ${e.exemples.map(ex => `
            <div class="example"><span class="mark"></span><div><strong>${ex.titre}</strong><span>${ex.texte}</span></div></div>
          `).join('')}
        </div>

        <p class="label">Test yourself</p>
        <p class="qcm-score" id="qcm-score">Score: <b>0/${e.qcm.length}</b></p>
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

        <p class="label">Name it differently</p>
        <div class="id-card" style="margin-bottom:34px;">
          <div class="id-band"></div>
          <div class="id-inner" style="padding:26px clamp(18px,3vw,34px);">
            <p class="id-eyebrow"><span>Free recall · no visual clue</span></p>
            <p class="id-situation" style="font-size:15px;margin-bottom:20px;">${e.identification.situation}</p>
            <div class="id-row">
              <input class="id-input" id="fiche-id-input" type="text" placeholder="Name the experiment…" autocomplete="off">
              <button class="id-btn" id="fiche-id-submit" type="button">Submit</button>
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
          <p class="label">Related studies</p>
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
        scoreEl.innerHTML = `Score: <b>${correct}/${e.qcm.length}</b>`;
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
      idFeedback.innerHTML = `<b>Correct.</b> This is indeed: ${e.nom}.`;
      idInput.disabled = true; idSubmit.disabled = true;
    } else if (attempts === 1){
      idFeedback.classList.add('hint');
      idFeedback.innerHTML = `Not quite. A hint: <b>${e.identification.indice}</b>`;
    } else {
      idFeedback.classList.add('reveal');
      idFeedback.innerHTML = `The answer was: <b>${e.nom}</b>.`;
      idInput.disabled = true; idSubmit.disabled = true;
    }
  }
  idSubmit.addEventListener('click', submit);
  idInput.addEventListener('keydown', ev => { if (ev.key === 'Enter') submit(); });
}

/* ---------------------------------------------------------------- */
/* View: free identification (dedicated mode)                        */
/* ---------------------------------------------------------------- */

function renderIdentificationCard(e){
  return `
    <p class="section-lab">Name the study</p>
    <article class="id-card">
      <div class="id-band"></div>
      <div class="id-inner">
        <p class="id-eyebrow"><span>Exercise · no visual clue</span></p>
        <p class="id-situation">${e.identification.situation}</p>

        <div class="id-row">
          <input class="id-input" id="id-input" type="text" placeholder="Name the experiment…" autocomplete="off">
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
      idFeedback.innerHTML = `<b>Correct.</b> This is indeed: <a href="#/experiences/${e.id}">${e.nom}</a>.`;
      idInput.disabled = true; idSubmit.disabled = true;
      markVu(e.id);
      idNext.style.display = 'block';
    } else if (attempts === 1){
      idFeedback.classList.add('hint');
      idFeedback.innerHTML = `Not quite. A hint: <b>${e.identification.indice}</b>`;
    } else {
      idFeedback.classList.add('reveal');
      idFeedback.innerHTML = `The answer was: <b><a href="#/experiences/${e.id}">${e.nom}</a></b>.`;
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
/* View: global quiz                                                  */
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
    <p class="section-lab">Global quiz</p>
    <div class="quiz-end">
      <p class="disp" style="font-size:18px;font-weight:400;margin-bottom:10px;">A random draw from the catalogue's ${total} questions</p>
      <p>10 questions drawn at random from every experiment in the catalogue — a good test of what you actually retained, beyond each study's popular retelling.</p>
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
        <p>${quizState.correct === quizState.pool.length ? "Flawless — you know these studies better than their Wikipedia summary." : 'Each mistake points to a study worth re-reading: head to its fiche to dig into the full story.'}</p>
        <div class="cta-row" style="justify-content:center;">
          <button class="btn-primary" id="quiz-replay-btn" type="button">Play again</button>
          <a class="btn-ghost" href="#/experiences">Explore the fiches</a>
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
      <p class="quiz-origin">From the fiche: <a href="#/experiences/${item.expId}">${item.expNom}</a></p>
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
      <p>Cobaye tells the story of ten of the most famous experiments in psychology: what was actually done, what was found, and — often missing from popular retellings — what we know about it today, decades later.</p>
      <h2>Methodology</h2>
      <p>Each entry pairs the story of the experiment with a "Controversies & legacy" box documenting methodological critiques, replications or later historical re-examinations, a short quiz, and a free-recall exercise where you have to come up with the study's name yourself, with no visual clue.</p>
      <p>For every experiment, the original study is cited (author, year, journal) along with, where one exists, a more recent re-examination or replication — verified individually before publication rather than quoted from memory.</p>
      <h2>Disclaimer</h2>
      <p>This site is a popularisation tool, not a literature review. Several of the studies presented here have since faced serious methodological criticism, documented in each entry: presenting them as settled fact alone would be misleading.</p>
      <h2>Progress</h2>
      <p>Studies you've viewed are remembered locally in your browser (a "seen" badge in the Explore view) — no data is ever sent to a server.</p>
    </div>
  `;
}

/* ---------------------------------------------------------------- */
/* View: not found                                                    */
/* ---------------------------------------------------------------- */

function renderNotFound(){
  return `
    <div class="empty">
      <p class="disp" style="font-size:17px;font-weight:400;margin-bottom:10px;">Page not found</p>
      <p>This experiment doesn't exist (yet) in the catalogue.</p>
      <div class="cta-row" style="justify-content:center;"><a class="btn-primary" href="#/experiences">Back to exploration</a></div>
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
