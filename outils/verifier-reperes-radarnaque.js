/* Compare le nombre de repères (REPERES) par carte entre scenarios.js (FR) et
   scenarios-en.js (EN). Objectif : zéro écart sur les 48 cartes.

   Usage : node outils/verifier-reperes-radarnaque.js
*/
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function charger(fichier) {
  const code = fs.readFileSync(fichier, 'utf8');
  const sandbox = {};
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: fichier });
  return { SCENARIOS: sandbox.SCENARIOS || [], REPERES: sandbox.REPERES || {} };
}

const dir = path.join(__dirname, '..', 'radarnaque');
const fr = charger(path.join(dir, 'scenarios.js'));
const en = charger(path.join(dir, 'scenarios-en.js'));

const idsFr = fr.SCENARIOS.map(c => c.id);
const idsEn = en.SCENARIOS.map(c => c.id);
const tousIds = Array.from(new Set(idsFr.concat(idsEn))).sort();

let ecarts = 0;
console.log(`Cartes FR : ${idsFr.length} · Cartes EN : ${idsEn.length}`);

tousIds.forEach(id => {
  const dansFr = idsFr.includes(id);
  const dansEn = idsEn.includes(id);
  if (!dansFr || !dansEn) {
    ecarts++;
    console.log(`✗ ${id} — absente de ${!dansFr ? 'scenarios.js' : 'scenarios-en.js'}`);
    return;
  }
  const nFr = (fr.REPERES[id] || []).length;
  const nEn = (en.REPERES[id] || []).length;
  if (nFr !== nEn) {
    ecarts++;
    console.log(`✗ ${id} — ${nFr} repère(s) FR vs ${nEn} EN`);
  }
});

if (ecarts === 0) {
  console.log(`OK — 0 écart sur ${tousIds.length} cartes.`);
  process.exit(0);
} else {
  console.log(`${ecarts} écart(s) trouvé(s) sur ${tousIds.length} cartes.`);
  process.exit(1);
}
