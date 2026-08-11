// =========================
// Moteur de jeu
// =========================

let freeReadMode = false;
let currentIndex = 0;
let attemptsForCurrentCheckpoint = 0;
let gaugeTotal = MECHANISM_ORDER.length;
let gaugeSpotted = 0;
const spottedResults = {}; // mechanism -> bool (repéré ou non)

const messagesEl = document.getElementById('messages');
const headerTitle = document.getElementById('headerTitle');
const nextBtn = document.getElementById('nextBtn');
const controlsBar = document.getElementById('controlsBar');
const questionPanel = document.getElementById('questionPanel');
const gaugeFill = document.getElementById('gaugeFill');
const gaugeLabel = document.getElementById('gaugeLabel');
const recapScreen = document.getElementById('recapScreen');
const chatFrame = document.getElementById('chatFrame');
const gameArea = document.getElementById('gameArea');

const DIACRITICS_RANGE = new RegExp('[̀-ͯ]', 'g');

function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD").replace(DIACRITICS_RANGE, "")
    .replace(/[^\w\s']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function evaluateAnswer(rawText, checkpoint) {
  const text = normalize(rawText);
  if (!text) return { recognized: false, targetedFeedback: null };
  const hitClusters = checkpoint.clusters.filter(c =>
    c.terms.some(term => text.includes(normalize(term)))
  );
  if (hitClusters.length > 0) {
    return { recognized: true, matchedClusters: hitClusters.map(c => c.label) };
  }
  const misread = (checkpoint.misreadings || []).find(m =>
    m.terms.some(term => text.includes(normalize(term)))
  );
  if (misread) {
    return { recognized: false, targetedFeedback: misread.feedback };
  }
  return { recognized: false, targetedFeedback: null };
}

// =========================
// Rendu des messages
// =========================

function appendMessage(m) {
  if (m.who === 'section') {
    const chip = document.createElement('div');
    chip.className = 'section';
    chip.textContent = m.text;
    messagesEl.appendChild(chip);
    return;
  }
  const wrap = document.createElement('div');
  wrap.className = 'msg ' + (m.who === 'me' ? 'from-me' : 'from-them');
  if (m.who === 'them') {
    const badge = document.createElement('div');
    badge.className = 'name-badge';
    badge.textContent = m.name;
    wrap.appendChild(badge);
  }
  const text = document.createElement('div');
  text.textContent = m.text;
  wrap.appendChild(text);

  const meta = document.createElement('div');
  meta.className = 'meta';
  const time = document.createElement('div');
  time.className = 'time';
  time.textContent = m.time || '';
  meta.appendChild(time);
  if (m.who === 'me') {
    const ticks = document.createElement('div');
    ticks.className = 'ticks';
    if (m.status === 'read') ticks.textContent = '✓✓ (lu)';
    else if (m.status === 'delivered') ticks.textContent = '✓✓';
    else if (m.status === 'sent') ticks.textContent = '✓';
    meta.appendChild(ticks);
  }
  wrap.appendChild(meta);
  messagesEl.appendChild(wrap);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function updateHeaderFromFirstMessage() {
  const first = MESSAGES.find(m => m.who === 'them');
  if (first) headerTitle.textContent = first.name;
}

// =========================
// Jauge de vigilance
// =========================

function updateGauge() {
  const pct = Math.round((gaugeSpotted / gaugeTotal) * 100);
  gaugeFill.style.width = pct + '%';
  gaugeLabel.textContent = `Signaux repérés : ${gaugeSpotted} / ${gaugeTotal}`;
}

// =========================
// Avance dans le script
// =========================

function advance() {
  if (currentIndex >= MESSAGES.length) {
    showRecap();
    return;
  }
  const m = MESSAGES[currentIndex];
  appendMessage(m);
  currentIndex++;

  if (m.checkpoint && !freeReadMode) {
    startCheckpoint(m.checkpoint);
    return;
  }
  if (m.checkpoint && freeReadMode) {
    showFreeReadCard(m.checkpoint);
  }

  if (currentIndex >= MESSAGES.length) {
    nextBtn.textContent = 'Voir le bilan';
  }
}

nextBtn.addEventListener('click', advance);

// =========================
// Mode lecture libre : carte informative sans question
// =========================

function showFreeReadCard(checkpointId) {
  const chk = CHECKPOINTS[checkpointId];
  spottedResults[chk.mechanism] = null; // pas évalué en lecture libre
  const card = document.createElement('div');
  card.className = 'freeread-card';
  card.innerHTML = `<strong>${escapeHtml(chk.mechanismLabel)}</strong><p>${escapeHtml(chk.explanation)}</p>`;
  messagesEl.appendChild(card);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// =========================
// Checkpoint : question à texte libre
// =========================

function startCheckpoint(checkpointId) {
  attemptsForCurrentCheckpoint = 0;
  nextBtn.style.display = 'none';
  const chk = CHECKPOINTS[checkpointId];
  renderFreeTextQuestion(chk, checkpointId);
}

function renderFreeTextQuestion(chk, checkpointId) {
  questionPanel.innerHTML = '';
  questionPanel.style.display = 'block';

  const q = document.createElement('div');
  q.className = 'q-prompt';
  q.textContent = chk.question;
  questionPanel.appendChild(q);

  const textarea = document.createElement('textarea');
  textarea.className = 'q-input';
  textarea.placeholder = 'Qu\'est-ce qui se joue ici, à ton avis ?';
  textarea.setAttribute('aria-label', chk.question);
  questionPanel.appendChild(textarea);

  const hintEl = document.createElement('div');
  hintEl.className = 'q-hint';
  hintEl.style.display = 'none';
  questionPanel.appendChild(hintEl);

  const feedbackEl = document.createElement('div');
  feedbackEl.className = 'q-feedback';
  feedbackEl.style.display = 'none';
  questionPanel.appendChild(feedbackEl);

  const btnRow = document.createElement('div');
  btnRow.className = 'q-btn-row';
  const validateBtn = document.createElement('button');
  validateBtn.textContent = 'Valider';
  validateBtn.className = 'q-validate';
  btnRow.appendChild(validateBtn);
  questionPanel.appendChild(btnRow);

  textarea.focus();

  function submit() {
    const result = evaluateAnswer(textarea.value, chk);
    attemptsForCurrentCheckpoint++;

    if (result.recognized) {
      resolveCheckpoint(checkpointId, chk, true, feedbackEl, btnRow, [textarea, hintEl]);
      return;
    }

    if (attemptsForCurrentCheckpoint >= 2) {
      renderQcmFallback(chk, checkpointId);
      return;
    }

    hintEl.style.display = 'block';
    hintEl.textContent = result.targetedFeedback
      ? result.targetedFeedback + ' Essaie de reformuler.'
      : '💡 ' + chk.hint;
  }

  validateBtn.addEventListener('click', submit);
  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) submit();
  });
}

function renderQcmFallback(chk, checkpointId) {
  questionPanel.innerHTML = '';

  const q = document.createElement('div');
  q.className = 'q-prompt';
  q.textContent = chk.question;
  questionPanel.appendChild(q);

  const note = document.createElement('div');
  note.className = 'q-note';
  note.textContent = 'Pas de souci — choisis la proposition qui décrit le mieux ce qui se passe :';
  questionPanel.appendChild(note);

  const choicesEl = document.createElement('div');
  choicesEl.className = 'q-choices';
  chk.qcm.forEach((choice) => {
    const btn = document.createElement('button');
    btn.className = 'q-choice';
    btn.textContent = choice.text;
    btn.addEventListener('click', () => {
      Array.from(choicesEl.children).forEach(c => c.disabled = true);
      btn.classList.add(choice.correct ? 'q-choice-correct' : 'q-choice-wrong');
      btn.textContent = (choice.correct ? '✓ ' : '✗ ') + choice.text;
      if (!choice.correct) {
        const correctBtn = Array.from(choicesEl.children).find((c, i) => chk.qcm[i].correct);
        if (correctBtn) {
          correctBtn.classList.add('q-choice-correct');
          const correctChoice = chk.qcm[Array.from(choicesEl.children).indexOf(correctBtn)];
          correctBtn.textContent = '✓ ' + correctChoice.text;
        }
      }
      const feedbackEl = document.createElement('div');
      feedbackEl.className = 'q-feedback';
      const btnRow = document.createElement('div');
      btnRow.className = 'q-btn-row';
      questionPanel.appendChild(feedbackEl);
      questionPanel.appendChild(btnRow);
      resolveCheckpoint(checkpointId, chk, choice.correct, feedbackEl, btnRow, []);
    });
    choicesEl.appendChild(btn);
  });
  questionPanel.appendChild(choicesEl);
}

function resolveCheckpoint(checkpointId, chk, recognized, feedbackEl, btnRow, elsToHide) {
  elsToHide.forEach(el => el.style.display = 'none');
  const qChoices = questionPanel.querySelector('.q-choices');
  if (qChoices) qChoices.style.pointerEvents = 'none';
  const note = questionPanel.querySelector('.q-note');
  if (note) note.style.display = 'none';

  spottedResults[chk.mechanism] = recognized;
  if (recognized) gaugeSpotted++;
  updateGauge();

  feedbackEl.style.display = 'block';
  feedbackEl.className = 'q-feedback ' + (recognized ? 'q-feedback-ok' : 'q-feedback-info');
  feedbackEl.innerHTML = `<strong>${escapeHtml(chk.mechanismLabel)}</strong><p>${escapeHtml(chk.explanation)}</p>`;

  btnRow.innerHTML = '';
  const continueBtn = document.createElement('button');
  continueBtn.textContent = 'Continuer la lecture';
  continueBtn.className = 'q-continue';
  continueBtn.addEventListener('click', () => {
    questionPanel.style.display = 'none';
    nextBtn.style.display = 'block';
    if (currentIndex >= MESSAGES.length) {
      nextBtn.textContent = 'Voir le bilan';
    }
  });
  btnRow.appendChild(continueBtn);
}

// =========================
// Écran de bilan
// =========================

function showRecap() {
  chatFrame.style.display = 'none';
  const gaugeBar = document.querySelector('.gauge-bar');
  if (gaugeBar) gaugeBar.style.display = 'none';
  recapScreen.style.display = 'block';
  recapScreen.innerHTML = '';

  const title = document.createElement('h2');
  title.textContent = 'Bilan de la conversation';
  recapScreen.appendChild(title);

  const anyEvaluated = Object.values(spottedResults).some(v => v !== null);
  const intro = document.createElement('p');
  intro.className = 'recap-intro';
  intro.textContent = anyEvaluated
    ? `Voici les ${MECHANISM_ORDER.length} mécanismes qui se sont enchaînés au fil de cette conversation fictive. Tu en as repéré ${gaugeSpotted} sur ${gaugeTotal}.`
    : `Voici les ${MECHANISM_ORDER.length} mécanismes qui se sont enchaînés au fil de cette conversation fictive.`;
  recapScreen.appendChild(intro);

  const timeline = document.createElement('div');
  timeline.className = 'recap-timeline';
  MECHANISM_ORDER.forEach(mech => {
    const chk = Object.values(CHECKPOINTS).find(c => c.mechanism === mech);
    const item = document.createElement('div');
    item.className = 'recap-item';
    const spotted = spottedResults[mech];
    const badge = spotted === true ? '✓ repéré' : (spotted === false ? 'à revoir' : '—');
    const badgeClass = spotted === true ? 'badge-ok' : (spotted === false ? 'badge-miss' : 'badge-neutral');
    item.innerHTML = `
      <div class="recap-item-header">
        <span class="recap-date">${escapeHtml(chk.date)}</span>
        <span class="recap-badge ${badgeClass}">${badgeClass === 'badge-neutral' ? '' : badge}</span>
      </div>
      <div class="recap-mechanism">${escapeHtml(chk.mechanismLabel)}</div>
      <div class="recap-explanation">${escapeHtml(chk.explanation)}</div>
    `;
    timeline.appendChild(item);
  });
  recapScreen.appendChild(timeline);

  recapScreen.appendChild(buildResourcesBlock());

  const actions = document.createElement('div');
  actions.className = 'recap-actions';
  const replayBtn = document.createElement('button');
  replayBtn.textContent = 'Rejouer';
  replayBtn.addEventListener('click', () => location.reload());
  actions.appendChild(replayBtn);
  recapScreen.appendChild(actions);

  recapScreen.scrollIntoView({ behavior: 'smooth' });
}

function buildResourcesBlock() {
  const block = document.createElement('div');
  block.className = 'resources-block';
  const h = document.createElement('h3');
  h.textContent = 'Besoin d\'en parler ?';
  block.appendChild(h);
  const list = document.createElement('div');
  list.className = 'resources-list';
  RESOURCES.forEach(r => {
    const item = document.createElement('div');
    item.className = 'resource-item';
    const link = r.type === 'tel' ? `tel:${r.value.replace(/\s/g, '')}` : r.value;
    item.innerHTML = `<a href="${link}" ${r.type === 'url' ? 'target="_blank" rel="noopener"' : ''}><strong>${escapeHtml(r.name)}</strong></a><p>${escapeHtml(r.desc)}</p>`;
    list.appendChild(item);
  });
  block.appendChild(list);
  return block;
}

// =========================
// Avertissement initial + lien ressources permanent
// =========================

function openResourcesModal() {
  const modal = document.getElementById('resourcesModal');
  const content = document.getElementById('resourcesModalContent');
  content.innerHTML = '';
  content.appendChild(buildResourcesBlock());
  modal.style.display = 'flex';
}

document.getElementById('resourcesLink').addEventListener('click', (e) => {
  e.preventDefault();
  openResourcesModal();
});
document.getElementById('resourcesModalClose').addEventListener('click', () => {
  document.getElementById('resourcesModal').style.display = 'none';
});

document.getElementById('startNormalBtn').addEventListener('click', () => {
  freeReadMode = false;
  startGame();
});
document.getElementById('startFreeReadBtn').addEventListener('click', () => {
  freeReadMode = true;
  startGame();
});

function startGame() {
  document.getElementById('warningModal').style.display = 'none';
  gameArea.style.display = 'block';
  if (freeReadMode) {
    document.querySelector('.gauge-bar').style.display = 'none';
  }
  updateHeaderFromFirstMessage();
  updateGauge();
  advance();
}

document.getElementById('skipQuestionsLink').addEventListener('click', (e) => {
  e.preventDefault();
  freeReadMode = true;
  e.target.style.display = 'none';
});

// =========================
// Export PNG (conserve le comportement du mock d'origine)
// =========================

document.getElementById('exportBtn').addEventListener('click', async () => {
  const frame = document.getElementById('chatFrame');
  try {
    const canvas = await html2canvas(frame, { scale: 2, useCORS: true, backgroundColor: null });
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mock-chat-fictif-sensibilisation.png';
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (e) {
    alert('Export échoué — essayez Imprimer → Enregistrer en PDF.');
    console.error(e);
  }
});
