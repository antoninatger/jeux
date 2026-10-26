'use strict';

// ─── 2.4 Pièces Unicode ──────────────────────────────────────────────────────
// On utilise les glyphes remplis (♟♜…) pour les deux couleurs ;
// la couleur réelle (blanc vs noir) est gérée par CSS via la classe piece-w / piece-b.
const PIECES_UNICODE = {
  wK: '♚', wQ: '♛', wR: '♜', wB: '♝', wN: '♞', wP: '♟',
  bK: '♚', bQ: '♛', bR: '♜', bB: '♝', bN: '♞', bP: '♟'
};

// État interne du module
let _flipped = false;
let _squareClickHandler = null;

// Accès clavier (chantier 02) : la grille se parcourt aux flèches, une seule case
// est tabulable à la fois (« roving tabindex »), et un compte rendu vocal discret
// dit ce que la souris montrait par la couleur seule.
let _squares      = [];    // les 64 cases dans l'ordre du DOM (donc de l'affichage)
let _roving       = 0;     // index de la case tabulable
let _selected     = null;  // case sélectionnée, telle que la dit setHighlights
let _legal        = [];    // cases d'arrivée possibles, idem
let _statusEl     = null;  // région d'annonce (aria-live)

const _NOMS_PIECES = {
  K: 'roi', Q: 'dame', R: 'tour', B: 'fou', N: 'cavalier', P: 'pion'
};

// ─── Helpers orientation ─────────────────────────────────────────────────────
function _files() {
  return _flipped
    ? ['h','g','f','e','d','c','b','a']
    : ['a','b','c','d','e','f','g','h'];
}

function _ranks() {
  return _flipped
    ? [1,2,3,4,5,6,7,8]
    : [8,7,6,5,4,3,2,1];
}

// a1 est foncée → (index_fichier + rang) pair = foncé
function _isLight(file, rank) {
  return (file.charCodeAt(0) - 97 + rank) % 2 === 1;
}

// ─── 2.1 + 2.2 : Construction de la grille ───────────────────────────────────
function _buildBoard() {
  const boardEl = document.getElementById('board');
  boardEl.innerHTML = '';

  // L'échiquier est une grille ARIA : le lecteur d'écran annonce la rangée et la
  // colonne, et les flèches y naviguent comme dans un tableau. Les rangées sont en
  // `display: contents` (echecs.css) : elles portent le sens sans toucher au dessin.
  boardEl.setAttribute('role', 'grid');
  boardEl.setAttribute('aria-label', 'Échiquier');
  boardEl.setAttribute('aria-rowcount', '8');
  boardEl.setAttribute('aria-colcount', '8');

  _squares = [];

  for (const rank of _ranks()) {
    const rowEl = document.createElement('div');
    rowEl.className = 'board-rank';
    rowEl.setAttribute('role', 'row');

    for (const file of _files()) {
      const sq = document.createElement('div');
      sq.className = 'square ' + (_isLight(file, rank) ? 'light' : 'dark');
      sq.dataset.square = file + rank;
      sq.setAttribute('role', 'gridcell');
      sq.setAttribute('tabindex', '-1');
      sq.setAttribute('aria-label', _libelleCase(file + rank, null));

      const pieceEl = document.createElement('span');
      pieceEl.className = 'piece';
      // Le glyphe est déjà décrit par le libellé de la case : ne pas le dire deux fois.
      pieceEl.setAttribute('aria-hidden', 'true');
      sq.appendChild(pieceEl);

      // Le handler sera positionné par l'app (étapes 6+)
      sq.addEventListener('click', () => {
        _poserRoving(_squares.indexOf(sq));
        if (typeof _squareClickHandler === 'function') {
          _squareClickHandler(file + rank);
        }
      });

      rowEl.appendChild(sq);
      _squares.push(sq);
    }

    boardEl.appendChild(rowEl);
  }

  // Une seule case tabulable : on entre dans l'échiquier par une tabulation, on en
  // sort par la suivante — on ne traverse pas 64 arrêts.
  _roving = 0;
  _selected = null;
  _legal = [];
  if (_squares[0]) _squares[0].setAttribute('tabindex', '0');

  boardEl.addEventListener('keydown', _surToucheGrille);
}

// ─── Accès clavier — libellés, curseur, annonces ─────────────────────────────

// « e2, pion blanc » · « d4, case vide » · « f3, case vide, coup possible »
function _libelleCase(square, piece) {
  let texte = square;
  if (piece) {
    texte += ', ' + _NOMS_PIECES[piece[1]] + (piece[0] === 'w' ? ' blanc' : ' noir');
  } else {
    texte += ', case vide';
  }
  if (_legal.includes(square)) texte += ', coup possible';
  if (_selected === square)    texte += ', sélectionnée';
  return texte;
}

// Recalcule les libellés depuis ce qui est réellement affiché. Appelée après chaque
// rendu et chaque changement de surbrillance : la couleur ne doit jamais être la
// seule porteuse d'une information (chantier 02).
function _rafraichirLibelles() {
  _squares.forEach(sq => {
    const glyphe = sq.querySelector('.piece');
    const classes = glyphe ? glyphe.className : '';
    let piece = null;
    if (glyphe && glyphe.textContent) {
      const couleur = classes.includes('piece-w') ? 'w' : 'b';
      const entree = Object.entries(PIECES_UNICODE)
        .find(([code, g]) => g === glyphe.textContent && code[0] === couleur);
      piece = entree ? entree[0] : null;
    }
    sq.setAttribute('aria-label', _libelleCase(sq.dataset.square, piece));
    if (_selected === sq.dataset.square) sq.setAttribute('aria-selected', 'true');
    else                                 sq.removeAttribute('aria-selected');
  });
}

function _poserRoving(index) {
  if (index < 0 || index > 63) return;
  if (_squares[_roving]) _squares[_roving].setAttribute('tabindex', '-1');
  _roving = index;
  if (_squares[_roving]) _squares[_roving].setAttribute('tabindex', '0');
}

function _deplacerVers(index) {
  if (index < 0 || index > 63) return;
  _poserRoving(index);
  _squares[index].focus();
}

// Compte rendu discret. `polite` : ne coupe jamais la lecture en cours.
function _annoncer(texte) {
  if (!_statusEl || !texte) return;
  _statusEl.textContent = texte;
}

function _surToucheGrille(e) {
  const index = _squares.indexOf(document.activeElement);
  if (index === -1) return;

  const colonne = index % 8;
  let cible = null;

  switch (e.key) {
    case 'ArrowRight': cible = colonne < 7 ? index + 1 : null; break;
    case 'ArrowLeft':  cible = colonne > 0 ? index - 1 : null; break;
    case 'ArrowDown':  cible = index + 8 <= 63 ? index + 8 : null; break;
    case 'ArrowUp':    cible = index - 8 >= 0  ? index - 8 : null; break;
    case 'Home':       cible = e.ctrlKey ? 0  : index - colonne;     break;
    case 'End':        cible = e.ctrlKey ? 63 : index - colonne + 7; break;
    case 'Enter':
    case ' ':
      e.preventDefault();
      if (typeof _squareClickHandler === 'function') {
        _squareClickHandler(_squares[index].dataset.square);
      }
      return;
    case 'Escape':
      // Reposer une pièce prise en main : le geste équivalent du clic sur elle-même.
      if (_selected && typeof _squareClickHandler === 'function') {
        e.preventDefault();
        _squareClickHandler(_selected);
      }
      return;
    default:
      return;
  }

  if (cible === null || cible === undefined) return;
  e.preventDefault();
  _deplacerVers(cible);
}

// ─── 2.3 : Coordonnées ───────────────────────────────────────────────────────
function _updateCoords() {
  const files = _files();
  const ranks = _ranks();

  ['coords-top', 'coords-bottom'].forEach(id => {
    document.getElementById(id).innerHTML =
      files.map(f => `<span>${f}</span>`).join('');
  });

  ['coords-left', 'coords-right'].forEach(id => {
    document.getElementById(id).innerHTML =
      ranks.map(r => `<span>${r}</span>`).join('');
  });
}

// ─── 2.5 : renderBoard(position) ─────────────────────────────────────────────
// position : { "e2": "wP", "e1": "wK", ... } — null/undefined = plateau vide
function renderBoard(position) {
  document.querySelectorAll('#board .square').forEach(sq => {
    const pieceEl = sq.querySelector('.piece');
    const piece   = position ? position[sq.dataset.square] : null;
    pieceEl.textContent = piece ? PIECES_UNICODE[piece] : '';
    pieceEl.classList.remove('piece-w', 'piece-b');
    if (piece) pieceEl.classList.add(piece[0] === 'w' ? 'piece-w' : 'piece-b');
    sq.classList.toggle('occupied', !!piece);
  });
  _rafraichirLibelles();
}

// ─── 2.7 : Highlights ────────────────────────────────────────────────────────
const _HIGHLIGHT_CLASSES = [
  'highlight-last', 'highlight-selected',
  'highlight-legal', 'highlight-correct', 'highlight-wrong'
];

// map : { "e2": "highlight-selected", "f3": "highlight-legal", ... }
function setHighlights(map) {
  document.querySelectorAll('#board .square').forEach(sq => {
    _HIGHLIGHT_CLASSES.forEach(c => sq.classList.remove(c));
    const cls = map[sq.dataset.square];
    if (cls) sq.classList.add(cls);
  });

  // Les surbrillances ne disent leur sens que par la couleur et un point CSS :
  // on les redit en toutes lettres, ici et dans les libellés des cases.
  const avant = _selected;
  _selected = Object.keys(map).find(k => map[k] === 'highlight-selected') || null;
  _legal    = Object.keys(map).filter(k => map[k] === 'highlight-legal');
  _rafraichirLibelles();

  if (_selected && _selected !== avant) {
    _annoncer(_legal.length
      ? `${_selected} sélectionnée, ${_legal.length} coup${_legal.length > 1 ? 's' : ''} possible${_legal.length > 1 ? 's' : ''} : ${_legal.join(', ')}.`
      : `${_selected} sélectionnée, aucun coup possible.`);
  } else if (!_selected && avant) {
    _annoncer('Sélection abandonnée.');
  }
}

function clearHighlights() {
  setHighlights({});
}

function highlightLastMove(from, to) {
  setHighlights({ [from]: 'highlight-last', [to]: 'highlight-last' });
}

// ─── 2.8 : Animation de déplacement ─────────────────────────────────────────
// Traduit la pièce visuellement de `from` vers `to`, PUIS appelle callback.
// La position doit être mise à jour (renderBoard) dans le callback.
function animateMove(from, to, callback) {
  const fromEl = document.querySelector(`#board [data-square="${from}"]`);
  const toEl   = document.querySelector(`#board [data-square="${to}"]`);

  if (!fromEl || !toEl) {
    if (callback) callback();
    return;
  }

  const fromRect = fromEl.getBoundingClientRect();
  const toRect   = toEl.getBoundingClientRect();
  const dx = toRect.left - fromRect.left;
  const dy = toRect.top  - fromRect.top;

  const pieceEl = fromEl.querySelector('.piece');

  // Départ immédiat sans transition pour positionner à (0,0)
  pieceEl.style.transition = 'none';
  pieceEl.style.transform  = 'translate(0,0)';
  pieceEl.offsetHeight; // force reflow

  // Déplacement animé
  pieceEl.style.transition = 'transform 0.18s ease';
  pieceEl.style.transform  = `translate(${dx}px, ${dy}px)`;

  pieceEl.addEventListener('transitionend', function handler() {
    pieceEl.removeEventListener('transitionend', handler);
    pieceEl.style.transition = '';
    pieceEl.style.transform  = '';
    if (callback) callback();
  }, { once: true });
}

// ─── 2.6 : flipBoard ─────────────────────────────────────────────────────────
function flipBoard(flipped) {
  _flipped = !!flipped;
  _buildBoard();
  _updateCoords();
}

function isFlipped() { return _flipped; }

// ─── Init ─────────────────────────────────────────────────────────────────────
// À appeler une seule fois au chargement de la page.
function setBoardClickHandler(fn) {
  _squareClickHandler = fn;
}

function initBoard() {
  _buildBoard();
  _updateCoords();

  // Région d'annonce, invisible à l'écran, lue par les lecteurs d'écran.
  if (!_statusEl) {
    _statusEl = document.createElement('p');
    _statusEl.id = 'board-status';
    _statusEl.className = 'sr-only';
    _statusEl.setAttribute('role', 'status');
    _statusEl.setAttribute('aria-live', 'polite');
    document.getElementById('board-section').appendChild(_statusEl);
  }

  document.getElementById('btn-flip').addEventListener('click', () => {
    flipBoard(!_flipped);
    // L'app peut réagir au retournement via ce hook global
    if (typeof onBoardFlipped === 'function') onBoardFlipped(_flipped);
  });
}
