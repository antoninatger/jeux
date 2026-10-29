// Avatar du joueur, partagé par l'accueil, l'Agora et le dojo.
// Trois réglages (genre, peau, cheveux) gardés dans localStorage
// « agorateur.avatar », rendus en un seul emoji (séquences ZWJ standard).
(function(){
  const CLE = 'agorateur.avatar';
  const TEINTES = ['', '🏻', '🏼', '🏽', '🏾', '🏿'];
  const BASE = { f: '👩', m: '👨', n: '🧑' };
  const CHEVEUX = ['bruns', 'blonds', 'roux', 'boucles', 'blancs', 'chauve'];
  const SUFFIXE = { roux: '‍🦰', boucles: '‍🦱', blancs: '‍🦳', chauve: '‍🦲' };
  const DEFAUT = { genre: 'n', peau: 0, cheveux: 'bruns' };

  function lire(){
    let a = {};
    try { a = JSON.parse(localStorage.getItem(CLE)) || {}; } catch (e) {}
    return {
      genre: BASE[a.genre] ? a.genre : DEFAUT.genre,
      peau: TEINTES[a.peau] !== undefined ? a.peau : DEFAUT.peau,
      cheveux: CHEVEUX.indexOf(a.cheveux) >= 0 ? a.cheveux : DEFAUT.cheveux
    };
  }
  function ecrire(a){ try { localStorage.setItem(CLE, JSON.stringify(a)); } catch (e) {} }

  function emoji(a){
    a = a || lire();
    const t = TEINTES[a.peau];
    if (a.cheveux === 'blonds') return '👱' + t + ({ f: '‍♀️', m: '‍♂️', n: '' }[a.genre]);
    return BASE[a.genre] + t + (SUFFIXE[a.cheveux] || '');
  }

  const TXT = {
    fr: { titre: '🎭 Ton personnage', genre: 'Genre', peau: 'Peau', cheveux: 'Cheveux',
          genres: { f: 'Femme', m: 'Homme', n: 'Neutre' },
          peaux: ['Jaune (emoji)', 'Très claire', 'Claire', 'Mate', 'Foncée', 'Très foncée'],
          coiffures: { bruns: 'Bruns', blonds: 'Blonds', roux: 'Roux', boucles: 'Bouclés', blancs: 'Blancs', chauve: 'Chauve' } },
    en: { titre: '🎭 Your character', genre: 'Gender', peau: 'Skin', cheveux: 'Hair',
          genres: { f: 'Woman', m: 'Man', n: 'Neutral' },
          peaux: ['Yellow (emoji)', 'Very light', 'Light', 'Medium', 'Dark', 'Very dark'],
          coiffures: { bruns: 'Brown', blonds: 'Blond', roux: 'Red', boucles: 'Curly', blancs: 'White', chauve: 'Bald' } }
  };

  // Construit le sélecteur dans `boite` : un aperçu et trois groupes de boutons radio.
  function monter(boite, auChangement){
    if (!boite) return;
    const L = TXT[(window.I18N && I18N.lang) === 'en' ? 'en' : 'fr'];
    let a = lire();
    boite.innerHTML = '';
    const leg = document.createElement('legend'); leg.textContent = L.titre;
    const apercu = document.createElement('span'); apercu.className = 'av-apercu'; apercu.setAttribute('aria-hidden', 'true');
    const grille = document.createElement('div'); grille.className = 'av-grille';
    boite.append(leg, apercu, grille);
    function groupe(nom, titre, valeurs, rendu, libelle){
      const ligne = document.createElement('div'); ligne.className = 'av-ligne'; ligne.setAttribute('role', 'radiogroup'); ligne.setAttribute('aria-label', titre);
      const t = document.createElement('span'); t.className = 'av-titre'; t.textContent = titre; ligne.appendChild(t);
      valeurs.forEach(v => {
        const lab = document.createElement('label'); lab.className = 'av-choix'; lab.title = libelle(v);
        const inp = document.createElement('input'); inp.type = 'radio'; inp.name = 'av-' + nom; inp.value = v;
        inp.checked = String(a[nom]) === String(v);
        inp.setAttribute('aria-label', libelle(v));
        const s = document.createElement('span'); s.setAttribute('aria-hidden', 'true'); s.textContent = rendu(v);
        inp.addEventListener('change', () => { a[nom] = nom === 'peau' ? +v : v; ecrire(a); maj(); });
        lab.append(inp, s); ligne.appendChild(lab);
      });
      grille.appendChild(ligne);
    }
    groupe('genre', L.genre, ['f', 'm', 'n'], v => BASE[v], v => L.genres[v]);
    groupe('peau', L.peau, [0, 1, 2, 3, 4, 5], v => '✋' + TEINTES[v], v => L.peaux[v]);
    groupe('cheveux', L.cheveux, CHEVEUX, v => emoji({ genre: a.genre, peau: a.peau, cheveux: v }), v => L.coiffures[v]);
    function maj(){
      apercu.textContent = emoji(a);
      // Les vignettes de coiffure suivent le genre et la peau choisis.
      grille.querySelectorAll('input[name="av-cheveux"]').forEach(i => { i.nextSibling.textContent = emoji({ genre: a.genre, peau: a.peau, cheveux: i.value }); });
      if (auChangement) auChangement(emoji(a));
    }
    maj();
  }

  window.Avatar = { lire: lire, emoji: emoji, monter: monter };
})();
