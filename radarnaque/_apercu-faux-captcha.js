/* =========================================================================
   APERÇU — carte unique « faux CAPTCHA (ClickFix) »
   Fichier de test, hors jeu. Il fournit à app.js les mêmes globales que
   scenarios.js (SCENARIOS, GLOSSAIRE, REPERES), mais avec une seule carte.
   À supprimer une fois la carte validée et intégrée à scenarios.js.
   ========================================================================= */

const SCENARIOS = [

  /* ---------- Faux CAPTCHA « ClickFix » — ARNAQUE -------------------- */
  {
    id: 'popup-faux-captcha',
    canal: 'notif',
    entete: 'Fenêtre apparue en consultant un site internet habituel',
    app: 'Vérification de sécurité',
    appIcon: '☁️',
    fond: 'info',
    titre: 'Vérification humaine — confirmez que vous n’êtes pas un robot',
    texte: 'Suivez ces 3 étapes sur votre clavier : 1) appuyez sur la touche Windows + R — 2) appuyez sur Ctrl + V — 3) appuyez sur Entrée. Cette vérification est obligatoire pour accéder à la page. Ray ID : b2f705a9136c2f36',
    verdict: 'arnaque',
    categorie: 'Faux CAPTCHA (« ClickFix ») — commande collée à votre insu',
    indices: [
      'Une vérification « je ne suis pas un robot » se fait en cochant une case, jamais en tapant des touches.',
      'On vous fait ouvrir une fenêtre de l’ordinateur (Windows + R) : aucun site web n’a besoin de ça.',
      'Le « Ctrl + V » colle un texte que vous n’avez jamais copié : la page l’a glissé dans le presse-papiers à votre insu.',
      { risque: 'Ce texte est une commande déguisée en code de vérification. Elle installe un voleur qui envoie mots de passe, cookies et accès bancaires à l’escroc.' }
    ],
    reflexe: 'Aucun contrôle anti-robot ne demande d’appuyer sur des touches ni d’ouvrir une fenêtre de l’ordinateur. Si on vous le demande : fermez l’onglet, ne collez rien.',
    explication: 'Cette page apparaît souvent sur un site tout à fait normal qui s’est fait pirater : l’adresse est la bonne, le décor est parfaitement imité, il n’y a ni faute ni urgence. C’est pourquoi le seul repère fiable n’est pas l’apparence, mais la demande elle-même. Sur Mac, la même arnaque demande d’ouvrir le « Terminal » (Cmd+Espace) au lieu de Windows + R. Si vous avez déjà collé et validé : coupez la connexion internet et faites-vous aider pour changer vos mots de passe depuis un autre appareil.'
  }

];

const GLOSSAIRE = [
  { key:'clickfix', terme:'Faux CAPTCHA (« ClickFix »)',
    aliases:['clickfix','faux captcha'],
    def:'Fausse page « je ne suis pas un robot » qui, au lieu de cocher une case, vous demande d’appuyer sur des touches (Windows + R, ou le Terminal sur Mac) pour coller un « code de vérification ». Ce code est en réalité une commande qui installe un logiciel voleur. Règle absolue : un contrôle anti-robot ne demande jamais d’ouvrir une fenêtre de l’ordinateur.' },
  { key:'presse-papiers', terme:'Presse-papiers',
    aliases:['presse-papiers'],
    def:'Mémoire invisible de l’ordinateur où atterrit tout ce que vous copiez, et d’où sort tout ce que vous collez (Ctrl + V). Une page web peut y déposer un texte sans vous prévenir : ce que vous collez n’est donc pas forcément ce que vous croyez avoir copié.' },
  { key:'faux-support', terme:'Faux support technique',
    aliases:['faux support technique','support technique'],
    def:'Une fenêtre ou un appel prétend que votre ordinateur est infecté et vous pousse à appeler un « technicien » qui prend le contrôle de la machine et vous soutire de l’argent. Un vrai éditeur ne fait jamais cela.' }
];

const REPERES = {
  'popup-faux-captcha': [
    { texte:'Windows + R', bon:true, aide:'Que vous demande-t-on de faire, exactement ? Un site web a-t-il besoin d’ouvrir une fenêtre de votre ordinateur ?', note:'Aucun site n’a besoin que vous ouvriez une fenêtre de l’ordinateur. C’est le vrai signal d’alarme.' },
    { texte:'Ctrl + V', bon:true, aide:'« Coller »… mais qu’avez-vous copié ? Cherchez l’étape qui vous fait coller quelque chose.', note:'On vous fait coller un texte que vous n’avez jamais copié : c’est la page qui l’a mis dans le presse-papiers, à votre insu.' },
    { texte:'appuyez sur Entrée', bon:true, aide:'Cherchez le geste qui déclenche tout, celui après lequel on ne peut plus revenir en arrière.', note:'C’est ce dernier geste qui exécute la commande. Tant qu’on n’a pas validé, rien n’est fait.' },
    { texte:'obligatoire pour accéder à la page', bon:true, aide:'Cherchez ce qui vous laisse croire que vous n’avez pas le choix.', note:'On vous fait croire qu’il n’y a pas d’alternative. Il y en a toujours une : fermer l’onglet.' },
    { texte:'b2f705a9136c2f36', bon:false, note:'Un vrai Cloudflare affiche bien un identifiant de ce genre. Ce n’est pas lui qui trahit l’arnaque — c’est ce qu’on vous demande de faire.' }
  ]
};
