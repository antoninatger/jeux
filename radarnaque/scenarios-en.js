/* RADAR ANTI-SCAMS — Scenario bank (English translation) */

const SCENARIOS = [
  {
    "id": "sms-colis",
    "canal": "sms",
    "entete": "SMS received this morning from an unknown number",
    "expediteur": "+33 7 45 13 81 31",
    "messages": [
      "Hello, your parcel did not fit in the mailbox. Act before 09/01 or it will be returned: https://mon-relay-suivi.com",
      "3e095272b3fe4c7996b"
    ],
    "verdict": "arnaque",
    "categorie": "SMS phishing (“smishing”) — fake parcel",
    "indices": [
      "Personal mobile number (+33 7…): a real carrier does not text from a 06/07 number.",
      "Suspicious link “mon-relay-suivi.com”: this is not the real Mondial Relay / La Poste website.",
      "Pressure with a deadline (“before 09/01, or returned”).",
      "Random string of characters used to look “official”."
    ],
    "reflexe": "Not expecting a parcel? Do not click the link. Check through the carrier’s official app or website.",
    "explication": "This is the most common scam in France. The link leads to a fake site asking for a small “fee” to steal your bank card, then scammers may call pretending to be your bank. Report the SMS by forwarding it to 33700."
  },
  {
    "id": "email-motdepasse",
    "canal": "email",
    "entete": "Email received in your inbox",
    "de": "Microsoft Security Team",
    "deAdresse": "ne-pas-repondre@chronopost.fr",
    "objet": "Security alert: new password request",
    "date": "Today, 09:14",
    "corps": "Hi, antoninatger:<br><br>We received a request to set a new password for your account from a device or location you do not usually use. Was this you?<br><br>Confirm your identity within 24 hours to avoid your account being suspended.",
    "bouton": "Yes, it was me — confirm",
    "verdict": "arnaque",
    "categorie": "Email phishing — fake account security alert",
    "indices": [
      "The sender says “Microsoft” but the email address ends in @chronopost.fr: it does not match.",
      "Awkward wording and language mistakes.",
      "Fear and urgency: “account suspended” and “within 24 hours”.",
      { "risque": "The button leads to a fake page that steals your login and password." }
    ],
    "reflexe": "Always check the sender’s full email address, not just the displayed name. Name ≠ address.",
    "explication": "Scammers display a reassuring name but the real email address gives them away. If in doubt, never use the email button: open the official website yourself in your browser."
  },
  {
    "id": "email-boite-mystere",
    "canal": "email",
    "entete": "Email with an attachment",
    "de": "SHIPPING_CONFIRMATION#",
    "deAdresse": "noreply.LE.04@b8.9a.21.eb",
    "objet": "_YouHave-Won A TEMU--Mystery Box",
    "date": "Sun. 02/02, 17:59",
    "corps": "Congratulations!<br><br>-PLeaSe.ConfIrM Receipt!!-<br><br>Open the attachment to claim your gift before it expires.",
    "piecesJointes": [
      "NQLRF.pdf"
    ],
    "verdict": "arnaque",
    "categorie": "Fake prize / gift — malicious attachment",
    "indices": [
      "Unreadable sender address (noreply.LE.04@b8.9a.21.eb).",
      "Text full of strange capital letters, dashes and mistakes to bypass spam filters.",
      "A “gift” you never entered to win: nobody gives things away for free.",
      "Unknown PDF attachment: never open it, it may install malware."
    ],
    "reflexe": "A prize from a contest you never entered is always a trap. Do not open the attachment; delete it.",
    "explication": "Broken formatting is often deliberate: it helps bypass anti-spam filters. The attachment may install spyware or lead to a page asking for bank details for fake delivery fees."
  },
  {
    "id": "email-panneaux",
    "canal": "email",
    "entete": "Email about government aid",
    "de": "Charlotte Robert",
    "deAdresse": "charlotte.robert@shikisc.com",
    "objet": "Last chance: solar panel grants in your area",
    "date": "Mon. 03/02, 10:58",
    "corps": "Specialists in <b>solar panel installations</b> will be in your region from February 14 to March 14.<br><br>Their goal: provide personalised quotes and information about government grants, valid until 01-01-2025.<br><br>Our teams will not be able to handle every request, so you are advised to <u>sign up today</u> so you do not miss this opportunity.",
    "bouton": "Claim the grants",
    "verdict": "arnaque",
    "categorie": "Fake “energy renovation / government grants” canvassing",
    "indices": [
      "Fantasy company address (@shikisc.com), not linked to a public body.",
      "A grant deadline that has already passed (01-01-2025).",
      "Artificial scarcity: “our teams cannot handle every request”, “last chance”.",
      "The state does not email you to sell work on your home."
    ],
    "reflexe": "Public grants are not claimed by clicking an unsolicited email. Use the official France Rénov’ website or phone number.",
    "explication": "Scammers exploit topics such as insulation, heat pumps and solar panels to collect data, book appointments and push overpriced or non-existent work."
  },
  {
    "id": "chat-celebrite",
    "canal": "chat",
    "plateforme": "Messenger",
    "contact": "Brad Pitt (Official) ✔",
    "avatar": "",
    "messages": [
      {
        "from": "eux",
        "texte": "Hello my darling ❤️ I think about you every day. You are the only one who truly understands me."
      },
      {
        "from": "eux",
        "texte": "My team is keeping our relationship secret because of the media. I will come to France soon for you."
      },
      {
        "from": "eux",
        "texte": "I have a small problem: my accounts are blocked by production. Can you advance me €850 in gift cards? I will pay you back when I arrive. 🌹"
      }
    ],
    "verdict": "arnaque",
    "categorie": "Romance scam / fake celebrity",
    "indices": [
      "A celebrity privately messaging you and falling in love within a few messages: impossible.",
      "Enforced secrecy isolates the victim.",
      { "risque": "The request for money always arrives — often in untraceable gift cards." },
      "A profile photo proves nothing: it can be copied from the internet or built with an AI in seconds."
    ],
    "reflexe": "Whenever an online “love interest” asks for money, it is a scam. No exception.",
    "explication": "Victims have lost tens of thousands of euros to fake celebrities. Scammers build affection over time, then invent an emergency requiring money."
  },
  {
    "id": "appel-banque",
    "canal": "appel",
    "afficheur": "Your bank",
    "numero": "displayed call: 01 40 XX XX XX (your branch number)",
    "transcript": [
      {
        "qui": "lui",
        "texte": "Hello, fraud prevention department of your bank. We see a suspicious transfer of €1,290 to a foreign account. Was that you?"
      },
      {
        "qui": "vous",
        "texte": "No, not at all!"
      },
      {
        "qui": "lui",
        "texte": "Don’t worry, I’ll block it right away. To cancel it, I’m sending you a code by SMS: give it to me, and confirm your app password."
      }
    ],
    "verdict": "arnaque",
    "categorie": "Fake bank adviser (“number spoofing”)",
    "indices": [
      "The displayed number may be your bank’s number, but it can be spoofed.",
      "A fake emergency makes you panic.",
      "You are asked for an SMS code or password: a bank NEVER asks for this.",
      { "risque": "Giving the code actually validates the scammers’ transfer." }
    ],
    "reflexe": "A real adviser never asks for your codes or passwords. Hang up, then call the number on the back of your card.",
    "explication": "This scam is very costly. The scammer may display your bank’s number and know details about you. Do not validate anything or dictate any code."
  },
  {
    "id": "chat-faux-proche",
    "canal": "chat",
    "plateforme": "WhatsApp",
    "contact": "+33 6 51 20 84 77",
    "avatar": "",
    "messages": [
      {
        "from": "eux",
        "texte": "Hi mum, it’s me 😊 I broke my phone, this is my new number. Save it."
      },
      {
        "from": "eux",
        "texte": "So I can’t access my banking app until tomorrow…"
      },
      {
        "from": "eux",
        "texte": "Can you help me with a €680 transfer for an urgent bill? I’ll pay you back as soon as my account works again. Thanks mum ❤️"
      }
    ],
    "verdict": "arnaque",
    "categorie": "Fake relative scam (“Hi mum”)",
    "indices": [
      "Unknown new number claiming to be your child.",
      "Classic excuse: broken phone + banking app blocked “until tomorrow”.",
      "Urgent money request.",
      "They avoid voice contact to avoid being exposed."
    ],
    "reflexe": "Call your relative on their OLD number to check. Never transfer money based only on a message.",
    "explication": "The scammer pretends to be a child or grandchild in distress. Ask a question only the real person would know, or call them directly."
  },
  {
    "id": "image-deepfake",
    "canal": "image",
    "image": "img/deepfake-arrestation.jpg",
    "legende": "“Look what they are hiding from us! A leader arrested in the street.” — Shared 48,000 times",
    "verdict": "arnaque",
    "categorie": "AI-generated image (“deepfake”) / hoax",
    "indices": [
      "Abnormal details: distorted hands, extra fingers, smooth faces or blurry background.",
      "No serious media outlet reports it.",
      "The caption plays on emotion and sensationalism.",
      "An image alone proves nothing: it can be made in seconds."
    ],
    "reflexe": "Before believing or sharing a shocking image, check known sources. Zoom in on hands and details.",
    "explication": "AI images can manipulate opinion, create buzz or lure people to fraudulent sites. If the event appears nowhere else, it is probably false."
  },
  {
    "id": "sms-ameli",
    "canal": "sms",
    "entete": "SMS received this afternoon",
    "expediteur": "AMELI-INFO",
    "messages": [
      "Health Insurance: your Vitale card expires on 15/07. Without an update, your reimbursements will be suspended. Update here: http://ameli-mise-a-jour.info-fr.net"
    ],
    "verdict": "arnaque",
    "categorie": "Public service impersonation (Health Insurance)",
    "indices": [
      "The Vitale card does not have an expiry date that suspends reimbursements.",
      "Misleading link: the real site is ameli.fr, not “ameli-mise-a-jour.info-fr.net”.",
      "Threat + urgency: “reimbursements suspended”.",
      "A public service never asks for bank details by SMS."
    ],
    "reflexe": "A real official site ends with a known official domain such as ameli.fr or impots.gouv.fr. Type the address yourself.",
    "explication": "Scammers impersonate public bodies to steal your social security number and bank card. Official reimbursements are automatic."
  },
  {
    "id": "popup-support",
    "canal": "notif",
    "app": "Security alert",
    "appIcon": "⚠️",
    "fond": "alerte",
    "titre": "YOUR COMPUTER IS INFECTED (5 viruses detected)",
    "texte": "Your passwords and banking data are at risk. Do not turn off the computer. Call Microsoft support immediately: 01 84 88 XX XX.",
    "verdict": "arnaque",
    "categorie": "Fake tech support (“your PC is infected”)",
    "indices": [
      "A real antivirus alert never asks you to call a phone number.",
      "Panic + “do not turn off” prevents you from thinking.",
      "Microsoft support does not monitor your screen or call you.",
      { "risque": "The goal is remote access to your computer and money." }
    ],
    "reflexe": "Never call the displayed number. Close the window or shut down, then ask someone trusted to check the computer.",
    "explication": "If you call, a fake technician asks you to install remote-control software and charges you for a fake repair — or empties your accounts."
  },
  {
    "id": "chat-emploi",
    "canal": "chat",
    "plateforme": "WhatsApp",
    "contact": "Amazon Recruitment (HR)",
    "avatar": "",
    "messages": [
      {
        "from": "eux",
        "texte": "Hello! We are hiring home operators. 30 min/day, €80 to €300 per day, no experience required. Interested?"
      },
      {
        "from": "eux",
        "texte": "You just need to validate orders on our platform. To start, create your account and top up €40, which will be returned with your earnings."
      }
    ],
    "verdict": "arnaque",
    "categorie": "Fake job offer / “task scam”",
    "indices": [
      "Unrealistic pay for “no experience, 30 minutes a day”.",
      "Recruitment by WhatsApp using a major brand name.",
      "You are asked to top up or pay money to start: absolute red flag.",
      { "risque": "Small early “earnings” are used to make you pay more." }
    ],
    "reflexe": "A real job pays you; it never asks you to pay to work. Refuse any required “top-up”.",
    "explication": "These fake missions seem to pay at first, then require growing deposits you never recover."
  },
  {
    "id": "sms-colis-photo-ia",
    "canal": "sms",
    "entete": "SMS received this morning, with an attached photo",
    "expediteur": "+33 6 12 44 90 08",
    "messages": [
      "Hello, your parcel is blocked at our centre: your address is incomplete. Here is a photo of your waiting package 👇",
      {
        "photo": true,
        "nom": "Mrs Martine DUPONT",
        "legende": "Parcel waiting · sorting centre"
      },
      "Confirm your address and pay €1.95 for redelivery here: https://suivi-colis-relais.net"
    ],
    "verdict": "arnaque",
    "categorie": "New-generation fake parcel — AI-generated photo",
    "indices": [
      "SMS from a mobile number (+33 6…): real carriers do not text from 06/07 numbers.",
      "The “photo of the parcel” with your name can be generated by AI in seconds.",
      "Small “redelivery fee” requested by SMS: no carrier charges like this.",
      "The link is not the carrier’s official site."
    ],
    "reflexe": "A photo, even with your name on it, proves nothing. Do not click; check official tracking.",
    "explication": "Scammers add an AI-generated realistic parcel photo to make the scam more convincing. The goal remains to steal your bank card."
  },
  {
    "id": "chat-faux-numero-invest",
    "canal": "chat",
    "plateforme": "SMS",
    "contact": "+33 6 44 71 20 96",
    "avatar": "",
    "messages": [
      {
        "from": "eux",
        "texte": "Hello Julien! I confirm the table for 6 people on Saturday at 8 p.m. at Le Jardin restaurant?"
      },
      {
        "from": "eux",
        "texte": "Oh, sorry, wrong number 😅 Have a lovely day anyway!"
      },
      {
        "from": "eux",
        "texte": "Hello again 🙂 It was nice chatting the other day; polite people are rare now. I’m Léa, I split my life between Paris and Singapore for my finance work."
      },
      {
        "from": "eux",
        "texte": "Thanks to my uncle’s trading platform, I made 32% in three weeks. I can guide you step by step; we start with only €250 and you’ll see the first gains immediately 📈"
      }
    ],
    "verdict": "arnaque",
    "categorie": "Wrong-number scam leading to fake investment",
    "indices": [
      "A supposed wrong-number message from a stranger who keeps talking.",
      "The person becomes friendly and patient to build trust.",
      "They eventually promote a “miracle” investment with fast gains.",
      { "risque": "They push you to place money on a platform they choose: the displayed gains are fake." }
    ],
    "reflexe": "A stranger who wrote “by mistake” and then talks about money or investments: cut it short.",
    "explication": "This is “pig butchering”: the scammer builds trust, then pushes the victim into a fake crypto/trading platform. Withdrawal becomes impossible."
  },
  {
    "id": "email-airbnb-horsplateforme",
    "canal": "email",
    "entete": "Email after contacting a holiday rental host",
    "de": "Marco — Sea-view apartment",
    "deAdresse": "marco.rivas.locations@gmail.com",
    "objet": "Re: Your stay — let’s pay directly, it’s easier 😊",
    "date": "Thu. 12/06, 21:47",
    "corps": "Hello,<br><br>Thank you for your interest! My apartment is in high demand and <b>two other families</b> want it for your dates. To avoid platform service fees, I suggest paying <b>directly between us</b>: pay a 40% deposit by bank transfer and I will block the accommodation in your name today.<br><br>My bank details are attached. Please hurry, I cannot hold the dates for long!",
    "piecesJointes": [
      "RIB_Marco.pdf"
    ],
    "verdict": "arnaque",
    "categorie": "Fake holiday rental — off-platform payment",
    "indices": [
      "You are asked to pay OUTSIDE the booking platform: you lose protection.",
      "Bank transfer directly to a private person is hard to recover.",
      "Gmail address and attached bank details: nothing goes through the official booking site.",
      "Artificial urgency and scarcity: “two other families”, “hurry”."
    ],
    "reflexe": "Never pay for a rental outside the booking platform. Payment must happen on the official site.",
    "explication": "The property often does not exist or does not belong to the scammer. Leaving the platform removes refund and dispute protections."
  },
  {
    "id": "email-prenom-detourne",
    "canal": "email",
    "entete": "Welcome email from a site you know — even though you created nothing",
    "de": "Welcome to the Jungle",
    "deAdresse": "no-reply@welcometothejungle.com",
    "objet": "Welcome! Confirm your new account",
    "date": "Today, 17:46",
    "corps": "<b style=\"font-size:1.12em\">Hello You will be charged 447.00&nbsp;€ by the Health Insurance. Your IBAN is registered for automatic payments. If you did not authorise this operation, please contact your fraud prevention department immediately on 0259509226</b><br><br>Welcome to the Jungle!<br>Thanks for creating your account! Just one last click to activate your profile.",
    "bouton": "Activate my account",
    "verdict": "arnaque",
    "categorie": "Hijacked field — fake message slipped into a real email",
    "indices": [
      "The email genuinely comes from the real site (authentic address and logo): the site is not the scammer.",
      "A stranger created an account with YOUR email address, typing the scam in place of the first name.",
      "So “Hello {first name}” displays a fake message about money, IBAN and direct debits.",
      "You are pushed to call a number (0259509226): that is where the real trap is."
    ],
    "reflexe": "Didn’t create this account? Ignore the content and never call the number shown. An automatic welcome email never asks you for anything by phone.",
    "explication": "A clever trick: the scammer did not hack the site. They simply filled the “first name” field of a sign-up form with a fake alert, then entered YOUR email. In good faith, the site sends “Hello {first name}” in big bold letters — displaying the scam in your place. The goal: make you call the number, where a fake “anti-fraud service” will help you “secure” your money… by transferring it to the crooks. Health insurance never debits anyone this way. Never call back a number contained in the message."
  },
  {
    "id": "email-fausse-boutique-liquidation",
    "canal": "email",
    "entete": "Promotional email received, with very low prices",
    "de": "Official Bike Discount",
    "deAdresse": "contact@velo-discount-shop.top",
    "objet": "TOTAL CLEARANCE before closing: -80% on the whole shop",
    "date": "Today, 11:20",
    "corps": "Store closing for good: everything must go before June 30!<br><br>Electric bike at €149 instead of €899, free helmet. Very limited stock, last items available.<br><br>100% secure payment, delivery within 48h across the country.",
    "bouton": "Get the clearance deal",
    "verdict": "arnaque",
    "categorie": "Fake online shop — fictitious clearance sale",
    "indices": [
      "Unknown, odd domain name (“velo-discount-shop.top”): no link to a real brand.",
      "Huge, unbelievable discount: an electric bike at €149 instead of €899.",
      "Fake urgency and scarcity: “closing for good”, “very limited stock”.",
      { "risque": "After payment, the item never arrives, or your bank details are stolen and reused." }
    ],
    "reflexe": "A discount too good to be true, on an unknown site, should raise a flag. Look for independent reviews and legal notices before paying.",
    "explication": "Scammers set up fake online shops, sometimes using real product photos stolen elsewhere, and rely on huge promotions to create urgency to buy. Result: nothing arrives, or the bank card is compromised. Before buying on an unknown site, check how long it has existed, look for reviews elsewhere, and be wary of a price that is too low."
  },
  {
    "id": "email-prime-video-paiement",
    "canal": "email",
    "entete": "Email received about a streaming subscription",
    "de": "Prime Video",
    "deAdresse": "support@prime-video-facturation.com",
    "objet": "Payment failed: your subscription will be suspended",
    "date": "Today, 08:03",
    "corps": "Hello,<br><br>The payment for your subscription could not be processed. Your access will be suspended within 48h.<br><br>Update your payment details to keep enjoying your films and shows.",
    "bouton": "Update my payment",
    "verdict": "arnaque",
    "categorie": "Email phishing — fake streaming service (subscription)",
    "indices": [
      "Sender address that is neither amazon.com nor primevideo.com: a made-up domain.",
      "Artificial urgency: “suspended within 48h”.",
      { "risque": "The button leads to a fake page that asks for your full card number." },
      "A real service never asks for full bank details through a link in an email."
    ],
    "reflexe": "To check a subscription, open the app directly or type the official address yourself — never through the email link.",
    "explication": "Scammers imitate major streaming or subscription services to collect full card numbers, using a fake “payment failed” excuse. The displayed name is reassuring, but the real sender address always gives it away. If in doubt about a subscription, open the official app yourself."
  },
  {
    "id": "chat-trop-percu-vente",
    "canal": "chat",
    "plateforme": "Classifieds site — messaging",
    "contact": "Interested buyer (sofa)",
    "avatar": "",
    "messages": [
      { "from": "eux", "texte": "Hello! I’m very interested in your sofa at €200. I won’t come myself, a courier will pick it up." },
      { "from": "eux", "texte": "I just sent you a transfer of €350 by mistake instead of €200, the form glitched. Could you send back the extra €150 by instant transfer while mine arrives on your account?" },
      { "from": "eux", "texte": "Here’s the screenshot of the transfer attached, it should land any moment now 😊" }
    ],
    "verdict": "arnaque",
    "categorie": "Overpayment scam (private sale)",
    "indices": [
      "The buyer never comes to see the item herself: she uses a “courier”.",
      "She claims to have sent too much money by mistake and asks you to send back the difference right away.",
      "Her only “proof” is a screenshot of the transfer — never money actually credited to your account.",
      { "risque": "You send a real transfer out of your own pocket, while her first transfer never arrives (or gets cancelled)." }
    ],
    "reflexe": "Never refund an “overpayment” before the money is truly and permanently credited to your account: check yourself in your banking app, not on a screenshot sent by the buyer.",
    "explication": "A classic scam on classifieds sites: the scammer fakes (or forges) an overly large transfer, often with a fake screenshot, and asks to be refunded the difference “urgently”. The first transfer does not exist or gets rejected days later: the victim really did send a genuine transfer — and loses it. Always use the platform’s built-in secure payment, never a direct transfer to a stranger."
  },
  {
    "id": "sms-remboursement-impots",
    "canal": "sms",
    "entete": "SMS received during tax return season",
    "expediteur": "TAX-OFFICE",
    "messages": [
      "Tax Authority: after reviewing your file, you are entitled to a refund of €237.80. To receive it, complete your bank details at: https://tax-refund-online-portal.com"
    ],
    "verdict": "arnaque",
    "categorie": "Impersonation of a public body (tax authority)",
    "indices": [
      "The sender name “TAX-OFFICE” is just as easy to fake as any other: it proves nothing.",
      "Link address that is not the official government tax site.",
      "You are asked to “complete” your bank details: if you have been refunded before, the tax authority already has them.",
      { "risque": "The fake page steals your bank details or tricks you into paying fake “processing fees”." }
    ],
    "reflexe": "Never log in through a link received by SMS: type the official tax website yourself in your browser to check a refund.",
    "explication": "Just like with health insurance or family benefits, scammers impersonate the tax authority during return season to ride the news cycle. A real tax refund is never unlocked by re-entering bank details on an external site: it is paid automatically to the account the administration already has on file."
  },
  {
    "id": "email-clim-aides",
    "canal": "email",
    "entete": "E-mail received during a heatwave, about government aid",
    "de": "Reversible AC",
    "deAdresse": "noreply@mail-cbk-1sa.amberfunnel.com",
    "objet": "Up to €900 in aid for your reversible air conditioning",
    "date": "Thu, 16/07, 03:40",
    "corps": "<b>Before the heatwave hits — Check your eligibility now!</b><br><br>🏠 REVERSIBLE AIR CONDITIONING<br><span style=\"font-size:1.3em;font-weight:bold\">€900</span><br>subject to conditions, for installing or replacing your reversible air conditioning.<br><br>Total potential aid depending on conditions: <b>up to €10,800</b>",
    "bouton": "Estimate my aid 🎯",
    "verdict": "arnaque",
    "categorie": "Fake “energy renovation aid” cold outreach — lead-generation site",
    "indices": [
      "Sender address “amberfunnel.com”: a “funnel” is a marketing tool for businesses, with no link to any public body or real installer.",
      "E-mail sent at 3:40 in the morning: no serious company writes at that hour — this is an automated mass mailing.",
      "The figures don’t add up: “€900” in the headline, then “up to €10,800” further down — theoretical maximums stacked together to impress, not a real personalised calculation.",
      { "risque": "The “Estimate my aid” button leads to a form that collects your name, address and phone number — later resold to renovation cold-callers." }
    ],
    "reflexe": "Energy renovation aid can only be requested on the official government site (or its equivalent in your country), never via a link received by e-mail.",
    "explication": "Same recipe as the fake solar-panel aid, just a summer edition: whenever a heatwave or cold snap makes the news, these lead-generation sites flood inboxes with promises of exceptional aid. The form unlocks no aid at all: it exists to resell your details to renovation companies who will call you back to sell an overpriced installation. Real government aid is never requested by clicking an unsolicited e-mail."
  },
  {
    "id": "email-ameli-regularisation",
    "canal": "email",
    "entete": "E-mail in the colours of the French national health insurance",
    "de": "InfoSante",
    "deAdresse": "theintersection@foundryco.com",
    "objet": "Adjustment of your healthcare costs",
    "date": "Thu, 03/09, 16:52",
    "corps": "<div style=\"background:#0053b3;color:#fff;text-align:center;padding:16px 10px;border-radius:4px\"><span style=\"font-size:1.6em;font-weight:bold;letter-spacing:.2em\">ameli</span><br><span style=\"font-size:.85em\">National Health Insurance</span></div><br><div style=\"text-align:right;color:#777\">2 September 2026</div><b>Subject: adjustment of your healthcare costs</b><br><br>Dear Sir or Madam,<br><br>Your health insurance fund has adjusted your healthcare expenses. The amount of <b>€18.90</b> has been paid into your account by bank transfer.<br><br><div style=\"background:#eef3fb;padding:12px;border-radius:4px\"><b>Amount adjusted:</b> €18.90<br><b>Payment method:</b> bank transfer<br><b>Expected within:</b> 2 to 3 working days</div>",
    "bouton": "Go to my account",
    "verdict": "arnaque",
    "categorie": "Impersonation of a public body (health insurance) — fake refund",
    "indices": [
      "The display name says “InfoSante”, but the real address is theintersection@foundryco.com: nothing to do with the official health insurance site. Name ≠ address.",
      "“Dear Sir or Madam”: your health insurance fund knows exactly who you are and uses your name.",
      "The blue “ameli” banner can be copied in seconds: a neat layout proves nothing.",
      "A small, very believable amount (€18.90): it raises no suspicion and simply makes you want to “check”.",
      { "risque": "The button leads to a fake health insurance page asking for your social security number, your password and then your bank details." }
    ],
    "reflexe": "A refund announced by e-mail is never checked from the e-mail's button: open the official site or app yourself.",
    "explication": "Fake e-mails usually scare you; this one pleases you — the same scam in reverse. By announcing money already paid, it lowers your guard: you click to “see the details” and land on a copy of the official site. Remember that a real refund is automatic, paid to the account the health insurance fund already has on file, and visible in your online account without anyone needing to e-mail you."
  },
  {
    "id": "sms-banque-ok",
    "canal": "sms",
    "entete": "SMS from your bank",
    "expediteur": "CIC",
    "messages": [
      "A transaction of €54.90 at FNAC has been debited from your card. Do you not recognise it? Call the number on the back of your card. We will never ask for your codes."
    ],
    "verdict": "fiable",
    "categorie": "Legitimate message — purchase alert",
    "indices": [
      "No link to click and no attachment.",
      "It sends you to the number on the back of YOUR card.",
      "The bank explicitly says it will never ask for your codes.",
      "No excessive threat or urgency: just information."
    ],
    "reflexe": "A reliable message does not ask for a code, password or click. It lets you use an official channel.",
    "explication": "Even with a real message, never call a number given inside a suspicious SMS. Use the official number. Here, everything is coherent."
  },
  {
    "id": "notif-connexion-ok",
    "canal": "notif",
    "entete": "Notification that appeared in the evening, when you had not switched on any computer",
    "app": "Google Account",
    "appIcon": "🔐",
    "fond": "info",
    "titre": "New sign-in on Windows",
    "texte": "A device signed in to your account. If this was you, no action is needed. Otherwise, secure your account from the Google app, Security section.",
    "verdict": "fiable",
    "categorie": "Legitimate message — sign-in notification",
    "indices": [
      "No urgent link or button to click.",
      "You are invited to act from the official app, not through a message link.",
      "The message covers both cases (it was you / it was not you) instead of frightening you.",
      "No password or bank details requested."
    ],
    "reflexe": "A real notification sends you to the official app/site that you open yourself — not an urgent link.",
    "explication": "The context here is worrying: nobody in your home touched a computer that evening. That does not make the notification fake — it is in fact exactly what it is for. A message can be both true and alarming. So the question is never “does this frighten me?”, but “what is it asking me to do?”. This one asks nothing: open the Google app yourself, Security section, and change your password from there."
  },
  {
    "id": "chat-ami-ok",
    "canal": "chat",
    "plateforme": "SMS",
    "contact": "Jacqueline (neighbour)",
    "avatar": "",
    "messages": [
      {
        "from": "eux",
        "texte": "Hello! Still OK for coffee tomorrow at 3 p.m. at my place?"
      },
      {
        "from": "eux",
        "texte": "I made an apple pie 🥧 Bring nothing, just yourself!"
      }
    ],
    "verdict": "fiable",
    "categorie": "Legitimate message — normal conversation",
    "indices": [
      "Known saved contact, usual tone.",
      "No request for money, code or personal information.",
      "No link, no urgency, no threat.",
      "Content matches your real life."
    ],
    "reflexe": "Not everything is a scam. A message from a known contact with no money request or link is normal.",
    "explication": "Being cautious does not mean distrusting everyone. Real exchanges do not contain urgent money requests or trapped links."
  },
  {
    "id": "sms-code-ok",
    "canal": "sms",
    "entete": "SMS received just after clicking “Sign in” on your bank’s website",
    "expediteur": "CIC",
    "messages": [
      "Your login code is 483 920. It is valid for 5 minutes. Never share it with anyone, not even an adviser."
    ],
    "verdict": "fiable",
    "categorie": "Legitimate message — one-time code YOU requested",
    "indices": [
      "You just asked to sign in: the code is expected.",
      "No link to click, no attachment.",
      "The message reminds you never to share the code.",
      "No abnormal threat or urgency."
    ],
    "reflexe": "You never GIVE an SMS code to anyone: you type it yourself on the official site.",
    "explication": "One-time codes are normal when YOU are logging in. The danger starts if someone calls and asks you to dictate it."
  },
  {
    "id": "notif-virement-ok",
    "canal": "notif",
    "app": "My Bank",
    "appIcon": "🏦",
    "fond": "info",
    "titre": "Transfer received: +€200.00",
    "texte": "You received a transfer of €200.00 from “Paul Durand”. Balance available in your app.",
    "verdict": "fiable",
    "categorie": "Legitimate message — bank notification",
    "indices": [
      "Simple information about a transaction, nothing to do.",
      "No link, code or password requested.",
      "The notification comes from the banking app on your phone.",
      "No urgency or threat."
    ],
    "reflexe": "A real notification informs you; it does not ask you to act urgently or enter codes.",
    "explication": "Bank apps send this kind of notification. If in doubt, open the app yourself."
  },
  {
    "id": "email-newsletter-ok",
    "canal": "email",
    "entete": "Email from an association you subscribed to",
    "de": "Les Restos du Cœur",
    "deAdresse": "contact@restosducoeur.org",
    "objet": "Your January newsletter",
    "date": "Tue. 07/01, 08:30",
    "corps": "Hello,<br><br>Thank you for your loyalty. Discover our actions near you this month and the progress of our collections.<br><br>Happy reading, and thank you again for your support.<br><br><span style=\"color:#64748b;font-size:.85em\">You receive this message because you subscribed to our newsletter. You can unsubscribe at any time.</span>",
    "verdict": "fiable",
    "categorie": "Legitimate message — newsletter",
    "indices": [
      "Sender address matches the organisation (restosducoeur.org).",
      "No immediate request for money, code or bank details.",
      "Informative tone, no threat or urgency.",
      "Clear unsubscribe option, as required by law."
    ],
    "reflexe": "A newsletter from an organisation you subscribed to, with no money or password request, is normal.",
    "explication": "Newsletters from organisations or brands are common. A reassuring sign: no pressure, no passwords, and you can unsubscribe."
  },
  {
    "id": "chat-famille-ok",
    "canal": "chat",
    "plateforme": "WhatsApp",
    "contact": "Sophie (my daughter)",
    "avatar": "",
    "messages": [
      {
        "from": "eux",
        "texte": "Hi mum! Here are the photos from Léa’s dance show 💃 She was so proud 😍"
      },
      {
        "from": "eux",
        "texte": "Are we still coming on Sunday lunchtime as planned? I’ll bring dessert 🍰"
      }
    ],
    "verdict": "fiable",
    "categorie": "Legitimate message — family news",
    "indices": [
      "Known contact, usual number.",
      "Personal content consistent with your life.",
      "No request for money, code or transfer.",
      "No suspicious link or attachment."
    ],
    "reflexe": "A loved one on their usual number sharing news without asking for money is simply family.",
    "explication": "Unlike fake-relative scams, this uses the usual number and asks for nothing sensitive."
  },
  {
    "id": "appel-medecin-ok",
    "canal": "appel",
    "afficheur": "Dr Martin’s office",
    "numero": "call from the medical secretary",
    "transcript": [
      {
        "qui": "lui",
        "texte": "Hello, Dr Martin’s office. I’m calling to confirm your appointment on Thursday at 3 p.m."
      },
      {
        "qui": "vous",
        "texte": "Yes, of course, I’ll be there."
      },
      {
        "qui": "lui",
        "texte": "Perfect. Please remember to bring your Vitale card. Have a nice day!"
      }
    ],
    "verdict": "fiable",
    "categorie": "Legitimate message — appointment confirmation",
    "indices": [
      "They only confirm an appointment you already know about.",
      "No bank details or code requested.",
      "They ask you to bring your card in person, not to read its numbers over the phone.",
      "Polite tone, no pressure or threat."
    ],
    "reflexe": "A real appointment confirmation never asks for your codes or bank card over the phone.",
    "explication": "Not every call is a scam. A secretary confirming an appointment asks for no sensitive information."
  },
  {
    "id": "chat-leboncoin-paiement-securise-ok",
    "canal": "chat",
    "plateforme": "Classifieds site — messaging",
    "contact": "Interested buyer (kids’ bike)",
    "avatar": "",
    "messages": [
      { "from": "eux", "texte": "Hello, I’m interested in the kids’ bike. I’ll come pick it up Saturday morning if that works, and pay with the platform’s secure payment in person." },
      { "from": "eux", "texte": "That way it’s secure for both of us: the money is released once I’ve actually picked up the item. See you Saturday!" }
    ],
    "verdict": "fiable",
    "categorie": "Legitimate message — private sale via the platform’s secure payment",
    "indices": [
      "Payment goes through the platform’s official system, not a direct transfer to a stranger.",
      "No “courier” excuse: the buyer comes to collect the item herself.",
      "No request for a refund or “overpayment”.",
      "Simple tone, no artificial urgency or suspicious attachment."
    ],
    "reflexe": "A safe sale goes through the platform’s built-in payment (or an in-person handover against immediate payment) — never an outside transfer followed by a refund.",
    "explication": "Unlike the overpayment scam, here the money stays held by the platform until the item is actually handed over: neither of you risks losing money. The reassuring signal to remember: payment happens INSIDE the platform’s system, never through a direct bank transfer between individuals."
  },
  {
    "id": "image-deepfake-manifestation",
    "canal": "image",
    "image": "img/deepfake-manifestation.jpg",
    "legende": "“The President confronted by his own riot police in the middle of a protest! What they don’t want you to see…” — Shared 62,000 times",
    "verdict": "arnaque",
    "categorie": "AI-generated image (“deepfake”) / hoax",
    "indices": [
      "Inconsistent details: meaningless numbers on helmets/badges, blurred or duplicated faces in the crowd.",
      "No serious media outlet is reporting this scene.",
      "The caption plays on conspiracy and emotion (“what they don’t want you to see”).",
      "A single image proves nothing: it can be fabricated in seconds."
    ],
    "reflexe": "Before believing or sharing a shocking image, check the story on several recognised news outlets. Zoom in on the details (hands, inscriptions, faces in the background).",
    "explication": "As with any shocking image, the subject doesn’t matter (a celebrity, a politician, a stranger): the reflex is the same. If the event isn’t reported anywhere else, it probably didn’t happen."
  },
  {
    "id": "chat-faux-profil-rencontre",
    "canal": "chat",
    "plateforme": "Dating app",
    "contact": "Philip M. 😊",
    "avatar": "",
    "messages": [
      { "from": "eux", "dateSep": "3 weeks ago", "texte": "Hi! I liked your profile right away 😊" },
      { "from": "eux", "dateSep": "Today", "texte": "I’m an engineer, currently working on an offshore oil platform. We’ve been talking for 3 weeks, and I feel like I’ve known you forever." },
      { "from": "eux", "texte": "I have a problem getting home: customs is asking me for €400 in fees that I don’t have on me here. Could you lend it to me? I’ll pay you back as soon as I’m back, I promise ❤️" }
    ],
    "verdict": "arnaque",
    "categorie": "Romance scam / fake profile",
    "indices": [
      "A relationship that becomes intense within just a few weeks, without ever meeting in person.",
      "A job that conveniently explains being far away and hard to reach (offshore platform, mission abroad…): a very classic excuse.",
      { "risque": "The request for money always arrives — here in the form of “customs fees”." },
      "The profile looks perfectly ordinary, not a celebrity: that is exactly what makes it work. A believable profile photo can be built in seconds today."
    ],
    "reflexe": "As soon as an online match asks for money, even a small amount “to pay back quickly”, it’s a scam. No exception.",
    "explication": "Unlike the fake “Brad Pitt”, this kind of profile doesn’t try to impress with celebrity status, but with ordinariness and closeness built up message by message. The photos on these profiles are often AI-generated and undetectable to the naked eye: it’s the behaviour (the money requested) that should raise the alarm, never the appearance."
  },
  {
    "id": "chat-fausse-vendeuse-acompte",
    "canal": "chat",
    "plateforme": "Classifieds site (WhatsApp contact)",
    "contact": "Camille D.",
    "avatar": "",
    "messages": [
      { "from": "eux", "texte": "Hello! Yes, the item is still available 😊" },
      { "from": "eux", "texte": "As I have a lot of messages, I’m asking for a €30 deposit by direct bank transfer to hold the listing, outside the classifieds app (it avoids the platform’s fees)." },
      { "from": "eux", "texte": "As soon as I receive it I’ll take down the listing and we’ll arrange an in-person handover." }
    ],
    "verdict": "arnaque",
    "categorie": "Off-platform payment (fake seller)",
    "indices": [
      "You are pushed to pay OUTSIDE the website/app, supposedly to “avoid fees”.",
      "A deposit is requested before you’ve even seen the item or arranged a meeting.",
      { "risque": "Once the transfer is made outside the platform, there is no protection left: the money is lost if the item doesn’t exist." },
      "A friendly-looking profile photo guarantees nothing: it can be fake."
    ],
    "reflexe": "On a classifieds platform, payment should always go through the site’s secure system. Never a “deposit” by direct transfer.",
    "explication": "This is the exact opposite of the “secure classifieds sale” scenario: here, as soon as you’re pushed outside the protected system, you lose every guarantee. The excuse (“avoid the fees”) is almost always a sign of a scam."
  },
  {
    "id": "popup-faux-captcha",
    "canal": "notif",
    "entete": "Window that appeared while browsing a website you use regularly",
    "app": "Security check",
    "appIcon": "☁️",
    "fond": "info",
    "titre": "Human verification — confirm you are not a robot",
    "texte": "Follow these 3 steps on your keyboard: 1) press the Windows key + R — 2) press Ctrl + V — 3) press Enter. This check is required to access the page. Ray ID: b2f705a9136c2f36",
    "verdict": "arnaque",
    "categorie": "Fake CAPTCHA (“ClickFix”) — a command pasted without your knowledge",
    "indices": [
      "An “I am not a robot” check is done by ticking a box, never by typing keys.",
      "You are made to open a window of the computer itself (Windows + R): no website ever needs that.",
      "“Ctrl + V” pastes text you never copied: the page slipped it into your clipboard without telling you.",
      {
        "risque": "That text is a command disguised as a verification code. It installs a stealer that sends passwords, cookies and banking access to the scammer."
      }
    ],
    "reflexe": "No anti-robot check ever asks you to press keys or open a window of your computer. If one does: close the tab and paste nothing.",
    "explication": "This page often appears on a perfectly normal website that has been hacked: the address is right, the design is a flawless copy, there is no typo and no urgency. That is why the only reliable clue is not how it looks, but what it asks you to do. On a Mac the same scam asks you to open the “Terminal” (Cmd+Space) instead of Windows + R. If you have already pasted and pressed Enter: disconnect from the internet and get help changing your passwords from another device."
  },

  /* Chantier 04 (§4.9) — 14 cas fiables ajoutés pour rééquilibrer le corpus
     (23 arnaques / 23 fiables). Voir le commentaire détaillé dans scenarios.js. */

  {
    "id": "email-impots-ok",
    "canal": "email",
    "entete": "Email received after your online tax return",
    "de": "impots.gouv.fr",
    "deAdresse": "ne-pas-repondre@dgfip.finances.gouv.fr",
    "objet": "Your 2026 tax notice is available",
    "date": "Mon 03/08, 07:12",
    "corps": "Hello,<br><br>Your income tax notice can be viewed in your personal area on impots.gouv.fr, under “My documents”.<br><br>No action is required if you pay monthly.<br><br>The French public finances directorate",
    "verdict": "fiable",
    "categorie": "Legitimate message — a document has been made available",
    "indices": [
      "Address at @dgfip.finances.gouv.fr: a genuine government domain (.gouv.fr).",
      "No payment link, no promised refund, no bank details requested.",
      "You are pointed to YOUR own account area, which you open yourself.",
      "No threat and no hard deadline."
    ],
    "reflexe": "The tax office asks you to check your account area; it never sends a link to “claim a refund”.",
    "explication": "Compare it with the fake tax-refund SMS elsewhere in this game: this one promises nothing, rushes no one and asks for no bank details. The habit stays the same — type impots.gouv.fr yourself rather than clicking."
  },

  {
    "id": "sms-livraison-ok",
    "canal": "sms",
    "entete": "SMS received on the day you are expecting an order",
    "expediteur": "Colissimo",
    "messages": [
      "Your parcel 6A21847755841 will be delivered today between 2pm and 4pm. Tracking available in the La Poste app or on laposte.fr using your parcel number."
    ],
    "verdict": "fiable",
    "categorie": "Legitimate message — delivery information",
    "indices": [
      "You really are expecting this parcel: the message matches your actual life.",
      "No clickable link and no “€2 fee” to pay.",
      "You are pointed to the official app or website, which you open yourself.",
      "The displayed name (“Colissimo”) proves nothing, anyone can write it: what matters is that nothing is asked of you."
    ],
    "reflexe": "A real carrier informs you. It never asks for a small card payment to “release” a parcel.",
    "explication": "This is the honest twin of the booby-trapped parcel SMS. Three details separate them: no link, no payment, and you genuinely were expecting this parcel. A parcel you never ordered always stays suspicious."
  },

  {
    "id": "appel-banque-fraude-ok",
    "canal": "appel",
    "afficheur": "CIC — fraud team",
    "numero": "call received during the day",
    "transcript": [
      {
        "qui": "lui",
        "texte": "Hello, CIC payment monitoring. A €780 purchase in Spain was blocked on your card. Do you recognise it?"
      },
      {
        "qui": "vous",
        "texte": "No, not at all."
      },
      {
        "qui": "lui",
        "texte": "We declined it and your card is suspended. I will not ask you for any code: go to a branch or call the number on the back of your card to order a new one."
      }
    ],
    "verdict": "fiable",
    "categorie": "Legitimate message — fraud alert with no sensitive request",
    "indices": [
      "You are asked for no code, no password, and to approve nothing in the app.",
      "You are not asked to “move your money to a safe account”.",
      "The payment has already been blocked: nothing needs doing urgently.",
      "You are pointed to the branch or the number on the back of your card."
    ],
    "reflexe": "A real bank blocks first and informs afterwards. It never makes you act during the call.",
    "explication": "A displayed number proves nothing (spoofing). What separates this call from the fake adviser is that it asks for NOTHING. If in any doubt: hang up and call the number on the back of your card yourself — a real adviser will never take offence."
  },

  {
    "id": "notif-ameli-ok",
    "canal": "notif",
    "entete": "Notification received the day after an “ameli” text message you found suspicious",
    "app": "ameli",
    "appIcon": "🩺",
    "fond": "info",
    "titre": "A new reimbursement is available",
    "texte": "Details of your latest reimbursements can be viewed under “My payments” in the app.",
    "verdict": "fiable",
    "categorie": "Legitimate message — notification from the ameli app",
    "indices": [
      "The notification comes from the official app installed on your phone.",
      "No amount to “claim” and no bank details requested.",
      "No external link: everything happens inside the app.",
      "No threat to suspend your entitlements."
    ],
    "reflexe": "The health service pays into the account it already holds. It never asks for bank details by text or email.",
    "explication": "Getting a fake ameli text the day before does not turn this notification into a trap: the two have nothing to do with each other. The fake text promised a refund and asked for your bank details; this notification asks for nothing and leads nowhere, it points you to the app you installed yourself. Distrusting the context is the wrong habit: read the message, not the moment it arrives."
  },

  {
    "id": "email-commande-ok",
    "canal": "email",
    "entete": "Email received ten minutes after your purchase",
    "de": "Nature & Découvertes",
    "deAdresse": "commandes@natureetdecouvertes.com",
    "objet": "Your order no. 4471902 is confirmed",
    "date": "Today, 16:42",
    "corps": "Hello Mrs Renard,<br><br>Thank you for your order of 14 August: 1 wind chime, €39.90.<br><br>Delivery expected within 3 to 5 working days to the address saved in your account. Tracking will appear in your customer area.<br><br>Have a good day,<br>Customer service",
    "verdict": "fiable",
    "categorie": "Legitimate message — order confirmation",
    "indices": [
      "You have just placed this order: amount, item and date all match.",
      "Sender address consistent with the retailer.",
      "You are addressed by name, not with a generic “Dear customer”.",
      "No extra payment, no code, no urgency."
    ],
    "reflexe": "An order confirmation summarises; it never asks you to pay again or to “confirm” your card details.",
    "explication": "The usual trap is a fake “payment problem” arriving after a real purchase, exploiting the fact that you are expecting an email. Here everything matches and nothing is requested: it is legitimate."
  },

  {
    "id": "sms-pharmacie-ok",
    "canal": "sms",
    "entete": "SMS from your local pharmacy",
    "expediteur": "PharmacieCentrale",
    "messages": [
      "Hello, the medicine you ordered on Tuesday has arrived. You can collect it during opening hours, Monday to Saturday 9am-7.30pm. See you soon!"
    ],
    "verdict": "fiable",
    "categorie": "Legitimate message — collection at the pharmacy",
    "indices": [
      "The message matches something you set in motion yourself.",
      "No link, no attachment, no online payment.",
      "No personal or medical data is requested in return.",
      "You are invited to call in, with no urgency at all."
    ],
    "reflexe": "A health professional informs you; they never ask you to pay or identify yourself through a link sent by text.",
    "explication": "Not everything is a scam, and suspecting everything eventually costs you your peace of mind. Here: a real order, no link, no payment. Nothing to flag."
  },

  {
    "id": "chat-petitfils-ok",
    "canal": "chat",
    "messages": [
      {
        "from": "eux",
        "texte": "Hi Grandma! I got my results, I'm in at Rennes university 🎉"
      },
      {
        "from": "eux",
        "texte": "I'll come round on Sunday and tell you all about it, will you make me your gratin? 😋"
      }
    ],
    "plateforme": "WhatsApp",
    "contact": "Théo (grandson)",
    "avatar": "",
    "verdict": "fiable",
    "categorie": "Legitimate message — news from a relative",
    "indices": [
      "The message arrives in the usual conversation, not from a new number.",
      "No request for money, transfers or codes.",
      "The content is personal and can be checked with the family.",
      "No link, no urgency, no announced change of number."
    ],
    "reflexe": "The fake-relative scam almost always starts with “I've changed my number”. Nothing like that here.",
    "explication": "This is the direct counter-example to the fake relative in this game: same affectionate tone, but the usual number and no request for money. The one signal that really matters stays the same — as soon as urgent money comes up, call the person on their old number."
  },

  {
    "id": "email-mutuelle-ok",
    "canal": "email",
    "entete": "Monthly email from your health insurer",
    "de": "Harmonie Mutuelle",
    "deAdresse": "info@harmonie-mutuelle.fr",
    "objet": "Your July benefits statement",
    "date": "Fri 01/08, 06:05",
    "corps": "Hello,<br><br>Your benefits statement is available in your member area.<br><br>You need to do nothing: reimbursements are paid automatically into your usual account.<br><br>Your adviser can be reached on the number shown on your insurance card.",
    "verdict": "fiable",
    "categorie": "Legitimate message — monthly statement",
    "indices": [
      "Sender address consistent with the organisation.",
      "“You need to do nothing”: nobody is rushing you.",
      "You are pointed to the number on YOUR card, not one given in the email.",
      "No bank details, no login, no attachment to open."
    ],
    "reflexe": "An organisation that already pays you money already has your bank details: if it asks for them again, something is wrong.",
    "explication": "The form looks a lot like phishing, and that is exactly what makes the exercise useful. The differences are real: nothing is requested, nothing is urgent, and the callback channel is one you already hold."
  },

  {
    "id": "notif-maj-appli-ok",
    "canal": "notif",
    "app": "Play Store",
    "appIcon": "⚙️",
    "fond": "info",
    "titre": "3 apps have been updated",
    "texte": "Ma Banque, Météo France and Ameli were updated automatically. No action is required.",
    "verdict": "fiable",
    "categorie": "Legitimate message — automatic update",
    "indices": [
      "The notification comes from the phone's app store.",
      "“No action is required”: nothing to click, nothing to install yourself.",
      "No virus alert, no account to unblock, no number to call.",
      "No payment or subscription offered."
    ],
    "reflexe": "Real updates come through the app store, never through a pop-up shouting about a virus.",
    "explication": "Set this against the fake tech support in this game, with its alarming alert and a number to call. A real update is quiet, already done, and asks for nothing."
  },

  {
    "id": "email-abonnement-ok",
    "canal": "email",
    "entete": "Email received before the annual payment",
    "de": "Le Monde",
    "deAdresse": "abonnements@lemonde.fr",
    "objet": "Your subscription renews on 12 September",
    "date": "Thu 13/08, 10:20",
    "corps": "Hello,<br><br>Your digital subscription will renew on 12 September for 12 months at €99.<br><br>You can change or cancel your subscription at any time from your account, under “My subscription”.<br><br>No action is needed if you wish to continue.",
    "verdict": "fiable",
    "categorie": "Legitimate message — renewal information",
    "indices": [
      "You are warned in advance: a month's notice, not 24 hours.",
      "No “update your card” button and no payment form.",
      "You are reminded you can cancel, from the account you open yourself.",
      "Sender address consistent with the newspaper."
    ],
    "reflexe": "A real renewal notice warns you in advance and never needs your card details.",
    "explication": "The fake Prime Video email in this game announces a “payment failure” and pushes you to re-enter your card urgently. That is exactly the difference to remember: advance information versus payment urgency."
  },

  {
    "id": "appel-mairie-ok",
    "canal": "appel",
    "afficheur": "Saint-Aubin town hall",
    "numero": "02 96 41 12 08",
    "transcript": [
      {
        "qui": "lui",
        "texte": "Hello, this is the town hall's older residents service. We are holding the end-of-year lunch on 14 December. Would you like to come?"
      },
      {
        "qui": "vous",
        "texte": "Gladly! Is there anything to pay?"
      },
      {
        "qui": "lui",
        "texte": "It is offered by the council. You will get an invitation by post, with a slip to return to us. Nothing to pay and nothing to sign today."
      }
    ],
    "verdict": "fiable",
    "categorie": "Legitimate message — council invitation",
    "indices": [
      "No bank details and no social security number requested.",
      "A written confirmation by post is announced: you stay in control.",
      "Nothing to sign and nothing to pay during the call.",
      "No pressure, no “only two places left, decide now”."
    ],
    "reflexe": "A public service always confirms in writing. You can safely say “I'll call you back” and look up the town hall number yourself.",
    "explication": "Aggressive doorstep selling aimed at older people often imitates public services, but it demands an immediate decision, a signature or a deposit. None of that here. You can still ring the town hall switchboard to confirm — it costs nothing and is always reasonable."
  },

  {
    "id": "sms-rdv-ok",
    "canal": "sms",
    "entete": "SMS received the day before an appointment you booked",
    "expediteur": "Doctolib",
    "messages": [
      "Reminder: appointment with Dr Nguyen (cardiology) tomorrow 15/08 at 10:30, 4 rue des Lilas. To cancel, sign in to your Doctolib account."
    ],
    "verdict": "fiable",
    "categorie": "Legitimate message — appointment reminder",
    "indices": [
      "The appointment exists: you booked it yourself.",
      "Practitioner, date, time and address are precise and checkable.",
      "No payment, no deposit, no card “confirmation”.",
      "To cancel you are sent to your account, not to a link in the message."
    ],
    "reflexe": "An appointment reminder costs nothing. The moment you are asked to pay to “confirm”, it is a scam.",
    "explication": "Fake medical reminders demanding “administrative fees” by card do exist. The detail that settles it: a real reminder simply informs you and sends you to your own account."
  },

  {
    "id": "email-syndic-ok",
    "canal": "email",
    "entete": "Email from your building's managing agent",
    "de": "Cabinet Berthier — managing agent",
    "deAdresse": "copropriete@cabinet-berthier.fr",
    "objet": "Notice of the owners' meeting on 22 September",
    "date": "Wed 12/08, 14:55",
    "corps": "Dear owner,<br><br>Attached you will find the notice for the owners' meeting of 22 September, together with the agenda and the quotes received for refurbishing the entrance hall.<br><br>The same file will also reach you by registered post, as the law requires.<br><br>Kind regards,<br>Cabinet Berthier",
    "verdict": "fiable",
    "categorie": "Legitimate message — owners' meeting notice",
    "indices": [
      "The same document also arrives by registered post: you will be able to cross-check.",
      "No payment requested in this message, no bank details to “update”.",
      "Identified sender, matching your known managing agent.",
      "No urgency: the meeting is more than a month away."
    ],
    "reflexe": "An expected attachment from a known sender is normal. An unexpected attachment demanding payment never is.",
    "explication": "The classic scam here is “bank detail change fraud”: a fake agent announces a new account for service charges. The reassuring signal in this message: it asks for no payment, and the registered letter lets you check everything."
  },

  {
    "id": "email-facture-energie-ok",
    "canal": "email",
    "entete": "Email from your electricity supplier, with an amount three times higher than usual",
    "de": "EDF",
    "deAdresse": "contact@edf.fr",
    "objet": "Your August bill is available",
    "date": "Mon 11/08, 05:40",
    "corps": "Hello,<br><br>Your August bill comes to €214.60. It can be viewed in your EDF customer area.<br><br>This amount includes the annual reconciliation of your consumption: your monthly payments of €61.20 were lower than the electricity you actually used this year.<br><br>It will be debited on the 20th of the month from the usual account, as in previous months. You need do nothing.",
    "verdict": "fiable",
    "categorie": "Legitimate message — a bill has been made available",
    "indices": [
      "The amount is a shock, but the message itself explains where it comes from (the annual reconciliation) instead of rushing you.",
      "Debited from the account already on file: no new bank details announced.",
      "No payment link, no threat of disconnection, no hard deadline.",
      "“You need do nothing”: the message informs, it does not demand."
    ],
    "reflexe": "An amount that makes you jump is not a sign of a scam. Look at what you are being asked to do: here, nothing — and everything can be checked from your customer area.",
    "explication": "A worrying message is not necessarily a fake message: a real bill can perfectly well bring bad news. Fake energy emails always add two things this one does not have: an immediate payment link and a threat of disconnection within 24 or 48 hours. The habit does not change — never open the link in an email, open your customer area yourself and compare the amount."
  }
];

const GLOSSAIRE = [
  {
    "key": "hameconnage",
    "terme": "Phishing",
    "aliases": [
      "phishing",
      "hameçonnage"
    ],
    "def": "A scam technique where someone pretends to be a trusted organisation to make you click a link and reveal passwords or bank details."
  },
  {
    "key": "smishing",
    "terme": "Smishing",
    "aliases": [
      "smishing"
    ],
    "def": "Phishing by SMS. A fake message contains a trapped link. Do not click; check the official site and report to 33700."
  },
  {
    "key": "vishing",
    "terme": "Vishing",
    "aliases": [
      "vishing"
    ],
    "def": "Voice phishing by phone. The scammer calls pretending to be your bank or a service to obtain codes."
  },
  {
    "key": "spoofing",
    "terme": "Spoofing",
    "aliases": [
      "spoofing"
    ],
    "def": "Faking the displayed phone number. A scammer can make your bank’s real number appear on screen."
  },
  {
    "key": "deepfake",
    "terme": "Deepfake",
    "aliases": [
      "deepfake"
    ],
    "def": "An image, video or voice made with AI to imitate a real person."
  },
  {
    "key": "romance",
    "terme": "Romance scam",
    "aliases": [
      "romance scam",
      "arnaque aux sentiments"
    ],
    "def": "A scammer creates a fake online relationship, gains trust, then asks for money."
  },
  {
    "key": "faux-conseiller",
    "terme": "Fake bank adviser",
    "aliases": [
      "fake bank adviser",
      "faux conseiller"
    ],
    "def": "A scammer pretends to be your bank and makes you validate codes that authorise their transfers."
  },
  {
    "key": "faux-proche",
    "terme": "Fake relative scam",
    "aliases": [
      "fake relative",
      "hi mum",
      "bonjour maman"
    ],
    "def": "A message from an unknown number claims to be your child and asks for urgent money."
  },
  {
    "key": "faux-support",
    "terme": "Fake tech support",
    "aliases": [
      "fake tech support",
      "support technique"
    ],
    "def": "A pop-up or call claims your computer is infected and pushes you to call a fake technician."
  },
  {
    "key": "usurpation",
    "terme": "Identity impersonation",
    "aliases": [
      "impersonation",
      "usurpation"
    ],
    "def": "Pretending to be a person, brand or official organisation to gain trust."
  },
  {
    "key": "carte-cadeau",
    "terme": "Gift card payment",
    "aliases": [
      "gift cards",
      "cartes cadeaux"
    ],
    "def": "A favourite scammer payment method because codes are hard to trace and recover."
  },
  {
    "key": "piece-jointe",
    "terme": "Malicious attachment",
    "aliases": [
      "attachment",
      "pièce jointe"
    ],
    "def": "An attached file that may install malware or spyware when opened."
  },
  {
    "key": "code-unique",
    "terme": "One-time code",
    "aliases": [
      "one-time code",
      "SMS code"
    ],
    "def": "A code used to validate a login or purchase. Type it yourself; never give it to someone else."
  },
  {
    "key": "pig-butchering",
    "terme": "Investment scam (“pig butchering”)",
    "aliases": [
      "pig butchering"
    ],
    "def": "A scammer builds trust, then pushes the victim to invest on a fake crypto or trading platform."
  },
  {
    "key": "hors-plateforme",
    "terme": "Off-platform payment",
    "aliases": [
      "off-platform",
      "outside the platform"
    ],
    "def": "Paying outside the official site, which removes the protections of the platform."
  },
  {
    "key": "trop-percu",
    "terme": "Overpayment scam",
    "aliases": [
      "overpayment scam",
      "trop-perçu"
    ],
    "def": "A buyer claims to have sent too much money by mistake (often with a fake transfer screenshot) and asks to be refunded the difference before the money has actually arrived. The first transfer does not exist or gets cancelled: the victim loses the real money sent back."
  },
  {
    "key": "fausse-boutique",
    "terme": "Fake online shop",
    "aliases": [
      "fake online shop",
      "fausse boutique en ligne"
    ],
    "def": "A fake sales website, often with extreme discounts and artificial urgency (“clearance”, “limited stock”), that takes payment without ever delivering, or steals bank details."
  },
  {
    "key": "clickfix",
    "terme": "Fake CAPTCHA (“ClickFix”)",
    "aliases": [
      "clickfix",
      "fake captcha"
    ],
    "def": "A fake “I am not a robot” page that, instead of a box to tick, asks you to press keys (Windows + R, or the Terminal on a Mac) to paste a “verification code”. That code is in fact a command that installs a stealer. Absolute rule: an anti-robot check never asks you to open a window of your computer."
  },
  {
    "key": "presse-papiers",
    "terme": "Clipboard",
    "aliases": [
      "clipboard",
      "presse-papiers"
    ],
    "def": "The invisible memory where everything you copy lands, and where everything you paste comes from (Ctrl + V). A web page can drop text into it without warning you: what you paste is therefore not necessarily what you think you copied."
  }
];

const REPERES = {
  "sms-colis": [
    {
      "texte": "+33 7 45 13 81 31",
      "bon": true,
      "aide": "Look at who sent the message.",
      "note": "A real carrier does not write from a personal mobile number."
    },
    {
      "texte": "https://mon-relay-suivi.com",
      "bon": true,
      "aide": "Is this the carrier’s official address?",
      "note": "This is not an official carrier website."
    },
    {
      "texte": "or it will be returned",
      "bon": true,
      "aide": "Find the pressure phrase.",
      "note": "False urgency pushes you to click."
    },
    {
      "texte": "3e095272b3fe4c7996b",
      "bon": false,
      "type": "leurre",
      "note": "Impressive, but it is set dressing: a string of characters meant to look “official”."
    }
  ],
  "email-motdepasse": [
    {
      "texte": "ne-pas-repondre@chronopost.fr",
      "bon": true,
      "aide": "Does the email address match Microsoft?",
      "note": "The displayed name and real address do not match."
    },
    {
      "texte": "within 24 hours",
      "bon": true,
      "aide": "Look for urgency.",
      "note": "Artificial urgency."
    },
    {
      "texte": "account being suspended",
      "bon": true,
      "aide": "Look for the threat.",
      "note": "Fear is used to make you click."
    },
    {
      "texte": "antoninatger",
      "bon": true,
      "aide": "How are you addressed? Does a real service use your first name, or a squashed-together login?",
      "note": "You are addressed by a squashed-together lowercase login (“antoninatger”) rather than “Hi Antonin”: a real service names you properly. A sign of a malicious automated blast."
    }
  ],
  "email-boite-mystere": [
    {
      "texte": "noreply.LE.04@b8.9a.21.eb",
      "bon": true,
      "aide": "Does the sender address look real?",
      "note": "Unreadable sender address."
    },
    {
      "texte": "YouHave-Won",
      "bon": true,
      "aide": "Did you enter a contest?",
      "note": "Unexpected gift/prize is bait."
    },
    {
      "texte": "NQLRF.pdf",
      "bon": true,
      "aide": "Is there an unexpected attachment?",
      "note": "Unknown attachment: do not open."
    },
    {
      "texte": "-PLeaSe.ConfIrM Receipt!!-",
      "bon": true,
      "aide": "Does the layout of this message look normal to you?",
      "note": "Broken formatting (capitals, dashes) used to slip past spam filters."
    }
  ],
  "email-panneaux": [
    {
      "texte": "charlotte.robert@shikisc.com",
      "bon": true,
      "aide": "Look at the sender address.",
      "note": "No link with a public body."
    },
    {
      "texte": "Last chance",
      "bon": true,
      "aide": "Find the pressure phrase.",
      "note": "Pressure to act quickly."
    },
    {
      "texte": "01-01-2025",
      "bon": true,
      "aide": "Is the date coherent?",
      "note": "Already expired date."
    },
    {
      "texte": "will not be able to handle every request",
      "bon": true,
      "aide": "Look for what suggests you must hurry before there is nothing left.",
      "note": "Artificial scarcity, to create urgency."
    }
  ],
  "chat-celebrite": [
    {
      "texte": "Brad Pitt (Official) ✔",
      "bon": true,
      "aide": "Would a celebrity really contact you privately?",
      "note": "Impersonated profile."
    },
    {
      "texte": "€850 in gift cards",
      "bon": true,
      "aide": "What payment method is requested?",
      "note": "Gift cards are untraceable scam payments."
    },
    {
      "texte": "relationship secret",
      "bon": true,
      "aide": "Look for secrecy.",
      "note": "Secrecy isolates the victim."
    },
    {
      "texte": "You are the only one who truly understands me",
      "bon": false,
      "type": "leurre",
      "note": "Touching… and calculated: flattery is there to win your trust."
    }
  ],
  "appel-banque": [
    {
      "texte": "01 40 XX XX XX (your branch number)",
      "bon": true,
      "aide": "Can the displayed number be trusted?",
      "note": "Displayed numbers can be spoofed."
    },
    {
      "texte": "suspicious transfer of €1,290",
      "bon": true,
      "aide": "Find the panic trigger.",
      "note": "Fake emergency."
    },
    {
      "texte": "give it to me",
      "bon": true,
      "aide": "Is a bank allowed to ask for an SMS code?",
      "note": "A bank never asks you to dictate a code."
    },
    {
      "texte": "confirm your app password",
      "bon": true,
      "aide": "Would a real adviser ask you for your password?",
      "note": "A real adviser never asks for your password."
    }
  ],
  "chat-faux-proche": [
    {
      "texte": "+33 6 51 20 84 77",
      "bon": true,
      "aide": "Is this the saved number of your relative?",
      "note": "Unknown number claiming to be your child."
    },
    {
      "texte": "new number",
      "bon": true,
      "aide": "Find the excuse for the unknown number.",
      "note": "Classic fake-relative excuse."
    },
    {
      "texte": "€680 transfer",
      "bon": true,
      "aide": "Find the money request.",
      "note": "Urgent money request: verify by calling."
    },
    {
      "texte": "can’t access my banking app",
      "bon": true,
      "aide": "Why can this person not pay the bill themselves?",
      "note": "An excuse to justify not paying themselves."
    }
  ],
  "image-deepfake": [
    {
      "texte": "__IMG__",
      "bon": true,
      "aide": "Look closely at the image details.",
      "note": "AI images often contain distorted hands or faces."
    },
    {
      "texte": "Look what they are hiding from us",
      "bon": true,
      "aide": "Find the emotional hook.",
      "note": "Sensational wording."
    },
    {
      "texte": "Shared 48,000 times",
      "bon": false,
      "type": "neutre",
      "note": "The number of shares proves nothing: fakes spread very fast."
    }
  ],
  "sms-ameli": [
    {
      "texte": "Vitale card expires",
      "bon": true,
      "aide": "Does a Vitale card expire like this?",
      "note": "False claim."
    },
    {
      "texte": "reimbursements will be suspended",
      "bon": true,
      "aide": "Find the threat.",
      "note": "Threat creates panic."
    },
    {
      "texte": "http://ameli-mise-a-jour.info-fr.net",
      "bon": true,
      "aide": "Is this the real ameli.fr website?",
      "note": "Misleading link."
    },
    {
      "texte": "AMELI-INFO",
      "bon": false,
      "type": "neutre",
      "note": "The sender name on a text message or an email is free text: anyone can sign “AMELI-INFO”. It proves nothing — neither that a message is fake, nor that it is genuine."
    }
  ],
  "popup-support": [
    {
      "texte": "5 viruses detected",
      "bon": true,
      "aide": "Find the scary alert.",
      "note": "Fake scare alert."
    },
    {
      "texte": "Do not turn off the computer",
      "bon": true,
      "aide": "Find the instruction that prevents you from thinking.",
      "note": "They want to keep you under pressure."
    },
    {
      "texte": "Microsoft support immediately: 01 84 88 XX XX",
      "bon": true,
      "aide": "Would antivirus ask you to call?",
      "note": "Real antivirus alerts do not ask you to call a number."
    },
    {
      "texte": "banking data are at risk",
      "bon": false,
      "type": "neutre",
      "note": "A genuine security alert says the same thing: this sentence does not tell the real from the fake. What gives it away here is the number to call."
    }
  ],
  "chat-emploi": [
    {
      "texte": "Amazon Recruitment (HR)",
      "bon": true,
      "aide": "Do major brands recruit by WhatsApp?",
      "note": "Major brands do not recruit like this."
    },
    {
      "texte": "€80 to €300 per day",
      "bon": true,
      "aide": "Is the salary realistic?",
      "note": "Unrealistic pay."
    },
    {
      "texte": "top up €40",
      "bon": true,
      "aide": "Are you asked to pay to work?",
      "note": "Paying to work is an absolute red flag."
    },
    {
      "texte": "no experience required",
      "bon": false,
      "type": "leurre",
      "note": "It is written to put you at ease, and that is exactly its job here."
    }
  ],
  "sms-colis-photo-ia": [
    {
      "texte": "+33 6 12 44 90 08",
      "bon": true,
      "aide": "Look at the sender number.",
      "note": "Personal mobile number."
    },
    {
      "texte": "__IMG__",
      "bon": true,
      "aide": "Does the photo prove the parcel exists?",
      "note": "AI-generated photo proves nothing."
    },
    {
      "texte": "€1.95 for redelivery",
      "bon": true,
      "aide": "Find the payment request.",
      "note": "Fake redelivery fee."
    },
    {
      "texte": "https://suivi-colis-relais.net",
      "bon": true,
      "aide": "Is this the official carrier site?",
      "note": "Trapped link."
    },
    {
      "texte": "sorting centre",
      "bon": false,
      "type": "leurre",
      "note": "“Sorting centre” sounds very official… but it is only set dressing added under the fake photo."
    }
  ],
  "chat-faux-numero-invest": [
    {
      "texte": "wrong number",
      "bon": true,
      "aide": "Was the message really meant for you?",
      "note": "Wrong-number pretext."
    },
    {
      "texte": "nice chatting",
      "bon": true,
      "aide": "Why is the stranger coming back?",
      "note": "They are building trust."
    },
    {
      "texte": "32% in three weeks",
      "bon": true,
      "aide": "Is that return realistic?",
      "note": "Unrealistic gains."
    },
    {
      "texte": "only €250",
      "bon": true,
      "aide": "Find the money request.",
      "note": "They push you to invest money."
    },
    {
      "texte": "between Paris and Singapore",
      "bon": false,
      "type": "leurre",
      "note": "These snippets of life feel real… but they are invented to sound serious."
    }
  ],
  "email-airbnb-horsplateforme": [
    {
      "texte": "directly between us",
      "bon": true,
      "aide": "Where are you asked to pay?",
      "note": "Off-platform payment removes protection."
    },
    {
      "texte": "bank transfer",
      "bon": true,
      "aide": "Is this payment easy to recover?",
      "note": "Bank transfers are hard to recover."
    },
    {
      "texte": "marco.rivas.locations@gmail.com",
      "bon": true,
      "aide": "Would a platform message come from Gmail?",
      "note": "Personal Gmail address."
    },
    {
      "texte": "two other families",
      "bon": true,
      "aide": "Find the urgency/scarcity phrase.",
      "note": "Artificial scarcity."
    },
    {
      "texte": "I cannot hold the dates for long",
      "bon": true,
      "aide": "Find the phrase that pressures you with time so you don't stop to think.",
      "note": "Urgency tone: “hurry”, “I cannot hold the dates” — they want you to pay before you think."
    },
    {
      "texte": "Thank you for your interest",
      "bon": false,
      "type": "neutre",
      "note": "A polite formula: pleasant, but this is not where the trap is."
    }
  ],
  "email-prenom-detourne": [
    {
      "texte": "You will be charged 447.00",
      "bon": true,
      "aide": "Does a mere first name contain a sentence about money and an IBAN? Look for what has no business being in a “Hello”.",
      "note": "A “first name” that talks about money, an IBAN and direct debits: this text was slipped into the first-name field in place of your name."
    },
    {
      "texte": "0259509226",
      "bon": true,
      "aide": "What are they trying to get you to do? Spot the number to call: that is where the trap is.",
      "note": "The real trap: calling this number reaches a fake “anti-fraud service” that will help you “secure” your money by transferring it to the crooks."
    },
    {
      "texte": "no-reply@welcometothejungle.com",
      "bon": false,
      "type": "neutre",
      "note": "Here the address is genuine: the email really does come from the site. The sender is not the problem — the injected text in place of your first name is."
    }
  ],
  "sms-banque-ok": [
    {
      "texte": "Call the number on the back of your card",
      "bon": true,
      "aide": "Find the safe official channel.",
      "note": "It sends you to a channel you control."
    },
    {
      "texte": "never ask for your codes",
      "bon": true,
      "aide": "Find the safety reminder.",
      "note": "A real bank reminds you not to share codes."
    },
    {
      "texte": "CIC",
      "bon": false,
      "type": "neutre",
      "note": "The sender name on a text message or an email is free text: anyone can sign “CIC”. Recognising your own bank therefore proves nothing — what makes this message reliable is that it asks for no code and no click."
    },
    {
      "texte": "€54.90 at FNAC",
      "bon": false,
      "type": "neutre",
      "note": "That is just the purchase detail: neither a good nor a bad sign in itself."
    }
  ],
  "notif-connexion-ok": [
    {
      "texte": "Google Account",
      "bon": true,
      "aide": "Where does the notification come from? Find what shows it comes from the official app.",
      "note": "The notification is pushed by the Google app installed on this phone: its origin can be checked, unlike the sender name on a text message or an email, which is free text."
    },
    {
      "texte": "no action is needed",
      "bon": true,
      "aide": "Find the sentence showing there is nothing urgent to do.",
      "note": "Informative tone, no threat: you are given time to check instead of being rushed."
    },
    {
      "texte": "Google app, Security section",
      "bon": true,
      "aide": "Find what points you to the official app rather than to a link to click.",
      "note": "You are sent to the app you open yourself, not to a link: you keep control."
    },
    {
      "texte": "New sign-in on Windows",
      "bon": false,
      "type": "neutre",
      "note": "This sentence is frightening, and rightly so: it describes a real risk. But an alarming sentence is neither proof of a scam nor proof of the opposite. What settles it is what you are asked to do — here, nothing urgent."
    }
  ],
  "chat-ami-ok": [
    {
      "texte": "Jacqueline (neighbour)",
      "bon": true,
      "aide": "Is this a known contact?",
      "note": "Known saved contact."
    },
    {
      "texte": "coffee tomorrow at 3 p.m.",
      "bon": true,
      "aide": "Does it match real life?",
      "note": "Coherent everyday appointment."
    },
    {
      "texte": "Bring nothing, just yourself",
      "bon": true,
      "aide": "Any money or code request?",
      "note": "No sensitive request."
    }
  ],
  "sms-code-ok": [
    {
      "texte": "Never share it with anyone",
      "bon": true,
      "aide": "Find the security reminder.",
      "note": "The code must never be shared."
    },
    {
      "texte": "valid for 5 minutes",
      "bon": true,
      "aide": "Find the normal technical detail.",
      "note": "Normal one-time code detail."
    },
    {
      "texte": "483 920",
      "bon": false,
      "type": "neutre",
      "note": "The code itself is not a clue: what matters is never to pass it on."
    }
  ],
  "notif-virement-ok": [
    {
      "texte": "My Bank",
      "bon": true,
      "aide": "Where does this notification come from? Find what shows it comes from your banking app.",
      "note": "Remember this difference, it holds for the whole game. A notification is PUSHED by an app you installed yourself: nobody else can send one in its place, so its origin can be trusted. The sender name on a text message or an email, on the other hand, is simply text the sender chooses: anyone can sign “CIC”, “TAX-OFFICE” or “ameli”. A displayed name never proves anything; an app notification does."
    },
    {
      "texte": "Balance available in your app",
      "bon": true,
      "aide": "Find what points you to the app, with no link and no urgency.",
      "note": "You are sent to the app, with no link and no urgent action: you go and check, at your own pace."
    },
    {
      "texte": "Paul Durand",
      "bon": false,
      "type": "neutre",
      "note": "The sender's name is only a line of text copied along with the transfer: the bank did not verify it for you. Knowing him proves nothing, and not knowing him proves nothing either. What is reassuring here is where the notification comes from and the fact that nothing is asked of you."
    }
  ],
  "email-newsletter-ok": [
    {
      "texte": "contact@restosducoeur.org",
      "bon": true,
      "aide": "Does the address match the organisation?",
      "note": "Coherent sender address."
    },
    {
      "texte": "unsubscribe at any time",
      "bon": true,
      "aide": "Find the unsubscribe option.",
      "note": "Clear unsubscribe option."
    },
    {
      "texte": "Thank you for your loyalty",
      "bon": false,
      "type": "neutre",
      "note": "A polite formula: pleasant, but not a clue."
    }
  ],
  "chat-famille-ok": [
    {
      "texte": "Sophie (my daughter)",
      "bon": true,
      "aide": "Is this the usual contact?",
      "note": "Known usual contact."
    },
    {
      "texte": "Léa’s dance show",
      "bon": true,
      "aide": "Find the personal detail.",
      "note": "Personal content consistent with real life."
    },
    {
      "texte": "as planned",
      "bon": true,
      "aide": "Is it referring to an existing plan?",
      "note": "Refers to a real agreed plan."
    }
  ],
  "appel-medecin-ok": [
    {
      "texte": "Dr Martin’s office",
      "bon": true,
      "aide": "Who is calling?",
      "note": "Clearly identified caller."
    },
    {
      "texte": "confirm your appointment",
      "bon": true,
      "aide": "What is the purpose?",
      "note": "Only confirming a known appointment."
    },
    {
      "texte": "bring your Vitale card",
      "bon": true,
      "aide": "Are numbers requested?",
      "note": "Bring it in person, no phone details requested."
    }
  ],
  "email-fausse-boutique-liquidation": [
    {
      "texte": "contact@velo-discount-shop.top",
      "bon": true,
      "aide": "Look at the sender address: does it match a real known brand?",
      "note": "Unknown, odd domain name, with no link to a real brand."
    },
    {
      "texte": "€149 instead of €899",
      "bon": true,
      "aide": "Does this discount seem realistic for an electric bike?",
      "note": "Huge, unbelievable discount: a classic fake-shop sign."
    },
    {
      "texte": "Very limited stock",
      "bon": true,
      "aide": "Find what pushes you to buy right now without thinking.",
      "note": "Fake scarcity to rush you into buying."
    },
    {
      "texte": "100% secure payment",
      "bon": false,
      "type": "leurre",
      "note": "A fake shop can easily write “secure payment” too: the claim alone proves nothing."
    }
  ],
  "email-prime-video-paiement": [
    {
      "texte": "support@prime-video-facturation.com",
      "bon": true,
      "aide": "Look at the full sender address: is it the real streaming service’s domain?",
      "note": "Made-up domain, unrelated to the real streaming service."
    },
    {
      "texte": "suspended within 48h",
      "bon": true,
      "aide": "Find the deadline that pushes you to act quickly.",
      "note": "Artificial urgency to make you click fast."
    },
    {
      "texte": "Update your payment details",
      "bon": true,
      "aide": "What does the button ask you to do?",
      "note": "The button leads to a fake page asking for your full card number."
    },
    {
      "texte": "Payment failed",
      "bon": false,
      "type": "neutre",
      "note": "A real service can write this too one day: it is the address and the link that give the scam away, not this phrase alone."
    }
  ],
  "chat-trop-percu-vente": [
    {
      "texte": "a courier will pick it up",
      "bon": true,
      "aide": "Does the buyer come to see the item herself? Find the excuse for not coming in person.",
      "note": "She never comes in person: a classic setup for this scam."
    },
    {
      "texte": "send back the extra €150",
      "bon": true,
      "aide": "What are you asked to do with money you have not actually received yet?",
      "note": "Asked to refund an “overpayment” before the money has even arrived."
    },
    {
      "texte": "screenshot of the transfer",
      "bon": true,
      "aide": "Does this “proof” of payment really show the money is in your account?",
      "note": "A screenshot is easy to fake: it is not proof the money has arrived."
    },
    {
      "texte": "€200",
      "bon": false,
      "type": "neutre",
      "note": "The item’s price itself is not a clue: the scam plays out around it."
    }
  ],
  "sms-remboursement-impots": [
    {
      "texte": "TAX-OFFICE",
      "bon": false,
      "type": "neutre",
      "note": "The sender name on a text message or an email is free text: anyone can sign “TAX-OFFICE”. It proves nothing — neither that a message is fake, nor that it is genuine."
    },
    {
      "texte": "https://tax-refund-online-portal.com",
      "bon": true,
      "aide": "Does this address look like the real official tax website?",
      "note": "Not the official tax website: a trapped link."
    },
    {
      "texte": "complete your bank details",
      "bon": true,
      "aide": "If you have been refunded before, does the tax authority need you to re-enter your bank details?",
      "note": "The administration already has your bank details if you have been refunded before: it does not ask again by SMS."
    }
  ],
  "email-clim-aides": [
    {
      "texte": "noreply@mail-cbk-1sa.amberfunnel.com",
      "bon": true,
      "aide": "Look at the sender’s full address: does it have anything to do with a public body or a real installer?",
      "note": "“amberfunnel.com” is a marketing tool (a “funnel”), with no link to any public body or real installer."
    },
    {
      "texte": "03:40",
      "bon": true,
      "aide": "Look at the time it was sent: is this a normal time for a genuine business message?",
      "note": "Sent at 3:40 in the morning: no serious company writes at that hour — a sign of an automated mass mailing."
    },
    {
      "texte": "up to €10,800",
      "bon": true,
      "aide": "Is this figure consistent with the “€900” announced just above it?",
      "note": "The figures don’t add up: “€900” in the headline, then “up to €10,800” further down — theoretical maximums stacked together to impress."
    },
    {
      "texte": "subject to conditions",
      "bon": false,
      "type": "leurre",
      "note": "A vague, reassuring phrase… but one you’ll also find in real ads: it proves nothing on its own."
    }
  ],
  "chat-leboncoin-paiement-securise-ok": [
    {
      "texte": "secure payment in person",
      "bon": true,
      "aide": "How does the buyer propose to pay? Find the payment system used.",
      "note": "Payment goes through the platform’s secure system, not a direct transfer."
    },
    {
      "texte": "actually picked up the item",
      "bon": true,
      "aide": "At what point is the money released to you?",
      "note": "Money is only released after the item is actually handed over: neither side risks anything."
    },
    {
      "texte": "See you Saturday",
      "bon": false,
      "type": "neutre",
      "note": "A polite closing line: nice, but not where the important information is."
    }
  ],
  "image-deepfake-manifestation": [
    {
      "texte": "__IMG__",
      "bon": true,
      "aide": "Look closely at the image: do the faces in the crowd and the inscriptions on the helmets look consistent to you? Click on it.",
      "note": "Zoom in: meaningless numbers on the helmets, blurred or distorted faces in the background — signs of an AI-generated image."
    },
    {
      "texte": "What they don’t want you to see",
      "bon": true,
      "aide": "Look for the phrase that plays on conspiracy and emotion.",
      "note": "Classic conspiracy-style phrasing designed to make you react without checking."
    },
    {
      "texte": "Shared 62,000 times",
      "bon": false,
      "type": "neutre",
      "note": "The number of shares proves nothing: fake content can spread just as fast, or faster, than real news."
    }
  ],
  "chat-faux-profil-rencontre": [
    {
      "texte": "engineer, currently working on an offshore oil platform",
      "bon": true,
      "aide": "Why is this person so hard to reach or meet in real life? Look for the excuse.",
      "note": "A classic job that conveniently explains being far away and unavailable."
    },
    {
      "texte": "We’ve been talking for 3 weeks",
      "bon": true,
      "aide": "Is this relationship moving at a normal pace?",
      "note": "A relationship progressing very fast online: a warning sign."
    },
    {
      "texte": "€400 in fees",
      "bon": true,
      "aide": "What are you always eventually asked for in this kind of exchange?",
      "note": "A request for money: the sign that never lies."
    },
    {
      "texte": "I liked your profile right away",
      "bon": false,
      "type": "neutre",
      "note": "A generic opening compliment: pleasant, but not a clue on its own."
    }
  ],
  "chat-fausse-vendeuse-acompte": [
    {
      "texte": "outside the classifieds app",
      "bon": true,
      "aide": "Where are you being pushed to make the payment, compared to the platform?",
      "note": "You are being pushed outside the platform’s secure system: a classic warning sign."
    },
    {
      "texte": "€30 deposit by direct bank transfer",
      "bon": true,
      "aide": "Are you being asked for money before you’ve even seen the item?",
      "note": "A request for a direct payment before any real contact: be cautious."
    },
    {
      "texte": "it avoids the platform’s fees",
      "bon": true,
      "aide": "What excuse is used to justify stepping outside the secure payment system?",
      "note": "A classic excuse to get you to step outside the secure payment system."
    },
    {
      "texte": "still available",
      "bon": false,
      "type": "neutre",
      "note": "A generic seller reply: pleasant, but not a clue on its own."
    }
  ],
  "email-ameli-regularisation": [
    {
      "texte": "theintersection@foundryco.com",
      "bon": true,
      "aide": "The message has the colours of the health insurance fund… but look at the sender's full address: does it have anything to do with the official site?",
      "note": "A company address with no link whatsoever to the health insurance fund: the banner is copied, the address gives the scammer away."
    },
    {
      "texte": "Dear Sir or Madam",
      "bon": true,
      "aide": "How are you addressed? Does your health insurance fund know who you are?",
      "note": "Your health insurance fund uses your name: this catch-all greeting means a mass mailing."
    },
    {
      "texte": "Go to my account",
      "bon": true,
      "aide": "What are you invited to do, when the money has supposedly already been paid? Where does this button lead?",
      "note": "The button leads to a fake health insurance page that steals your login details, then your bank details."
    },
    {
      "texte": "bank transfer",
      "bon": false,
      "type": "leurre",
      "note": "That really is how the health insurance fund pays refunds: this line is true and gives nothing away. The trap is elsewhere."
    }
  ],
  "popup-faux-captcha": [
    {
      "texte": "Windows key + R",
      "bon": true,
      "aide": "What exactly are you being asked to do? Does a website ever need to open a window of your computer?",
      "note": "No website needs you to open a window of the computer. That is the real alarm signal."
    },
    {
      "texte": "Ctrl + V",
      "bon": true,
      "aide": "“Paste”… but what did you copy? Find the step that makes you paste something.",
      "note": "You are made to paste text you never copied: the page put it in your clipboard without telling you."
    },
    {
      "texte": "press Enter",
      "bon": true,
      "aide": "Find the gesture that sets everything off, the one there is no coming back from.",
      "note": "That last gesture is what runs the command. As long as you have not pressed Enter, nothing has happened."
    },
    {
      "texte": "required to access the page",
      "bon": true,
      "aide": "Find what makes you believe you have no choice.",
      "note": "You are made to believe there is no alternative. There always is one: close the tab."
    },
    {
      "texte": "b2f705a9136c2f36",
      "bon": false,
      "type": "leurre",
      "note": "A genuine anti-robot check does display an identifier like this. It is not what gives the scam away — what you are asked to do is."
    }
  ],
  "email-impots-ok": [
    {
      "texte": "ne-pas-repondre@dgfip.finances.gouv.fr",
      "bon": true,
      "aide": "The displayed name proves nothing: look at the full address just below. What does it end with?",
      "note": "The address ends in .gouv.fr, a domain only the French state can use. It is the full address that can be checked, never the name displayed above it."
    },
    {
      "texte": "can be viewed in your personal area",
      "bon": true,
      "aide": "Where are you sent to read this document: to a link in the message, or to an area you open yourself?",
      "note": "You are sent to your own account area, which you open yourself by typing the address. No link to click in the message: you keep control."
    },
    {
      "texte": "No action is required if you pay monthly",
      "bon": true,
      "aide": "Find what tells you there is nothing to do, neither now nor later.",
      "note": "Nothing is asked of you and no deadline is imposed. A scam needs you to do something: this one asks for nothing."
    },
    {
      "texte": "My documents",
      "bon": false,
      "type": "neutre",
      "note": "The exact name of a section looks serious, but it can be copied from the real website in two minutes. A fake email quotes the right sections too: this detail is not what makes the message reliable."
    }
  ],
  "sms-livraison-ok": [
    {
      "texte": "Tracking available in the La Poste app",
      "bon": true,
      "aide": "How are you invited to track the parcel: through a link, or through something you open yourself?",
      "note": "You are sent to the official app you open yourself. The booby-trapped parcel text always contains a link: that is the difference that counts."
    },
    {
      "texte": "using your parcel number",
      "bon": true,
      "aide": "What do you need in order to check: something you already have, or something you must hand over?",
      "note": "You are asked to check using information you already hold. At no point are your details or your card requested."
    },
    {
      "texte": "will be delivered today between 2pm and 4pm",
      "bon": true,
      "aide": "What is this message really doing: telling you something, or asking you for something?",
      "note": "The message announces a delivery slot and stops there. A real carrier informs you; it never demands two euros of “fees” to release a parcel."
    },
    {
      "texte": "Colissimo",
      "bon": false,
      "type": "neutre",
      "note": "The sender name on a text message or an email is free text: anyone can sign “Colissimo”. It proves nothing — neither that a message is fake, nor that it is genuine."
    }
  ],
  "appel-banque-fraude-ok": [
    {
      "texte": "I will not ask you for any code",
      "bon": true,
      "aide": "What are you asked to say or to do during the call? Find the sentence that answers that.",
      "note": "This is the sentence that settles it. A fake adviser needs a code, a password or an approval in the app: without that, he has nothing."
    },
    {
      "texte": "call the number on the back of your card",
      "bon": true,
      "aide": "Which number are you pointed to: one given during the call, or one you already have?",
      "note": "You are sent to a number you already hold, on your own card. A scammer cannot send you there: he would lose control."
    },
    {
      "texte": "was blocked on your card",
      "bon": true,
      "aide": "Is the payment still in progress, or already dealt with? Find what tells you there is nothing urgent to do.",
      "note": "The purchase has already been blocked: there is no urgency left, so no reason to rush. A real bank blocks first and informs afterwards."
    },
    {
      "texte": "CIC — fraud team",
      "bon": false,
      "type": "neutre",
      "note": "The name and number shown during a call can be faked (“spoofing”): they prove neither that it is your bank nor the opposite. What makes this call reliable is that nothing is asked of you."
    }
  ],
  "notif-ameli-ok": [
    {
      "texte": "ameli",
      "bon": true,
      "aide": "Where does this notification come from: an app installed on your phone, or a message somebody sent?",
      "note": "This notification is pushed by the ameli app you installed yourself: nobody else can send one in its place. That is the whole difference with a text signed “AMELI-INFO”, whose name is free text."
    },
    {
      "texte": "under “My payments” in the app",
      "bon": true,
      "aide": "Where are you taken to see the detail: outside, or inside the app?",
      "note": "Everything happens inside the app, with no link to anywhere else. The fake ameli text exists only to push you out towards a fake page."
    },
    {
      "texte": "Details of your latest reimbursements",
      "bon": true,
      "aide": "What are you asked to hand over in exchange for this information?",
      "note": "Nothing is asked of you: no bank details, no social security number, no login. A notification that informs without asking for anything is of no use to a scammer."
    },
    {
      "texte": "A new reimbursement is available",
      "bon": false,
      "type": "neutre",
      "note": "“A reimbursement available” is exactly the bait of the fake ameli text. The sentence is the same: what differs is that here nothing is asked of you to get it."
    }
  ],
  "email-commande-ok": [
    {
      "texte": "commandes@natureetdecouvertes.com",
      "bon": true,
      "aide": "The displayed name proves nothing: look at the full address. Does it really match the retailer?",
      "note": "The full address matches the shop where you bought. That is what can be checked — the name displayed above it is free text."
    },
    {
      "texte": "Hello Mrs Renard",
      "bon": true,
      "aide": "How are you addressed: by your name, or with a form of words that fits anybody?",
      "note": "You are named correctly, because the shop knows you. A mass mailing writes “Dear customer”: it has no idea who it is talking to."
    },
    {
      "texte": "to the address saved in your account",
      "bon": true,
      "aide": "Are you asked again for something you have already given?",
      "note": "Nothing is asked again: no address, no card, no login. The fake “payment problem” that arrives after a real purchase always demands you re-enter your card."
    },
    {
      "texte": "no. 4471902",
      "bon": false,
      "type": "neutre",
      "note": "An order number looks serious, but it can be invented in three seconds. What makes this message reliable is that the order exists and nothing is asked of you."
    }
  ],
  "sms-pharmacie-ok": [
    {
      "texte": "the medicine you ordered on Tuesday",
      "bon": true,
      "aide": "Does this message refer to something you set in motion yourself?",
      "note": "The message answers something you did yourself, on Tuesday. A scam, by contrast, lands on an event you never set off."
    },
    {
      "texte": "You can collect it during opening hours",
      "bon": true,
      "aide": "What are you invited to do: click, pay, or call in?",
      "note": "You are invited to call in at the shop, in person. There is nothing to click, nothing to pay online, nothing to confirm."
    },
    {
      "texte": "Monday to Saturday 9am-7.30pm",
      "bon": true,
      "aide": "Can the content of this message be checked without giving anything away?",
      "note": "Practical information, checkable simply by walking past the pharmacy. The message holds no link, no attachment and no question: there is nothing in it to steal."
    },
    {
      "texte": "PharmacieCentrale",
      "bon": false,
      "type": "neutre",
      "note": "The sender name on a text message or an email is free text: anyone can sign “PharmacieCentrale”. It proves nothing — neither that a message is fake, nor that it is genuine."
    }
  ],
  "chat-petitfils-ok": [
    {
      "texte": "Théo (grandson)",
      "bon": true,
      "aide": "Where does this name come from: did the sender write it, or did you save this contact yourself?",
      "note": "This name was not written by the sender: you saved this contact in your own phone, and the message arrives in the usual conversation. A stranger would show up as a number."
    },
    {
      "texte": "I'm in at Rennes university",
      "bon": true,
      "aide": "Can this content be checked with somebody other than the person writing?",
      "note": "A precise fact, which anyone in the family can confirm. The fake relative stays vague and cuts the conversation short as soon as you try to check."
    },
    {
      "texte": "will you make me your gratin?",
      "bon": true,
      "aide": "What is this message about: money, or your shared life?",
      "note": "The conversation carries on a story you have shared for years. No request for money, no code, no link: nothing to do."
    },
    {
      "texte": "Hi Grandma!",
      "bon": false,
      "type": "neutre",
      "note": "A scammer also opens with “Hi Grandma”. The affectionate greeting proves nothing: what is reassuring here is the number already saved and the absence of any request."
    }
  ],
  "email-mutuelle-ok": [
    {
      "texte": "info@harmonie-mutuelle.fr",
      "bon": true,
      "aide": "Look at the full sender address: does the domain, after the @ sign, match the organisation?",
      "note": "The domain after the @ sign matches the insurer, and it cannot be invented the way a displayed name can. It is the only part of the header that can be checked."
    },
    {
      "texte": "on the number shown on your insurance card",
      "bon": true,
      "aide": "Which number are you given to call back: one written in the email, or one you already have?",
      "note": "You are sent to the number printed on YOUR card, not to a number given in the message. That is precisely what a scammer cannot afford."
    },
    {
      "texte": "paid automatically into your usual account",
      "bon": true,
      "aide": "Are your bank details requested? Find what shows they are not.",
      "note": "No bank details are asked for, because the insurer already has yours: it has been paying you for years. An organisation that asks for your bank details again by email is a fake."
    },
    {
      "texte": "Harmonie Mutuelle",
      "bon": false,
      "type": "neutre",
      "note": "The displayed name is free text: a fake message can display “Harmonie Mutuelle” just as easily as a real one. It is the full address, just below it, that can be checked."
    }
  ],
  "notif-maj-appli-ok": [
    {
      "texte": "Play Store",
      "bon": true,
      "aide": "Where does this notification come from: an app on the phone, or a window that appeared while browsing?",
      "note": "This notification is pushed by the phone's app store, which handles updates itself. The fake virus alert, by contrast, appears in the browser, on a web page."
    },
    {
      "texte": "No action is required",
      "bon": true,
      "aide": "What are you asked to install, to click or to call?",
      "note": "Nothing to click, nothing to install, no number to call. Fake tech support lives only on the action it wrings out of you."
    },
    {
      "texte": "were updated automatically",
      "bon": true,
      "aide": "Is this still to be done, or already done?",
      "note": "It is already done: the message states a fact, it does not demand anything. A real update is quiet and never puts you on the spot."
    },
    {
      "texte": "Ma Banque",
      "bon": false,
      "type": "neutre",
      "note": "Seeing the names of your real apps is reassuring, but this notification comes from the app store, not from them. A name quoted in a text proves nothing: what counts is where the notification comes from."
    }
  ],
  "email-abonnement-ok": [
    {
      "texte": "abonnements@lemonde.fr",
      "bon": true,
      "aide": "Look at the full address: is the domain, after the @ sign, really the newspaper's?",
      "note": "The domain after the @ sign is that of the newspaper you subscribe to. It is the checkable part of the header, unlike the displayed name."
    },
    {
      "texte": "change or cancel your subscription at any time from your account",
      "bon": true,
      "aide": "Are you left a choice? Find what hands control back to you.",
      "note": "You are reminded that you can leave, from the account you open yourself. A scam never hands control back: it locks you in."
    },
    {
      "texte": "No action is needed if you wish to continue",
      "bon": true,
      "aide": "Is there a payment button, a card to re-enter, a hard deadline?",
      "note": "No payment button, no card to re-enter, and a month's notice. The fake renewal notice announces a payment failure and demands the card right now."
    },
    {
      "texte": "at €99",
      "bon": false,
      "type": "neutre",
      "note": "The amount jumps out, and that is exactly what fake payment notices play on. A figure proves nothing: what counts is that you are asked for no card and no click."
    }
  ],
  "appel-mairie-ok": [
    {
      "texte": "You will get an invitation by post",
      "bon": true,
      "aide": "Will this call remain just words, or will you have a trace of it?",
      "note": "A written confirmation is announced: you will be able to read it all again calmly. A scammer needs everything settled during the call, leaving no trace."
    },
    {
      "texte": "Nothing to pay and nothing to sign today",
      "bon": true,
      "aide": "What are you asked to decide right now?",
      "note": "No immediate decision is wrung out of you. Aggressive doorstep selling lives on the signature obtained before you have had time to think."
    },
    {
      "texte": "It is offered by the council",
      "bon": true,
      "aide": "Is money involved? Find the answer to your own question.",
      "note": "Your question about money gets a straight answer: there is none. No bank details are requested, at any point."
    },
    {
      "texte": "02 96 41 12 08",
      "bon": false,
      "type": "neutre",
      "note": "A local number, looking like your council's, proves nothing: caller ID can be faked (“spoofing”). What makes this call reliable is that you are asked for no money and no signature."
    }
  ],
  "sms-rdv-ok": [
    {
      "texte": "To cancel, sign in to your Doctolib account",
      "bon": true,
      "aide": "How are you invited to cancel: through a link in the message, or through your account?",
      "note": "You are sent to your own account, which you open yourself. There is no link in the message: you are the one who goes and looks."
    },
    {
      "texte": "Dr Nguyen (cardiology)",
      "bon": true,
      "aide": "Does the appointment announced match something you did yourself?",
      "note": "The practitioner is named, and you are the one who booked. A fake reminder stays vague on the essentials, because it knows nothing about you."
    },
    {
      "texte": "tomorrow 15/08 at 10:30, 4 rue des Lilas",
      "bon": true,
      "aide": "Can this information be checked without giving anything away?",
      "note": "Date, time and address are precise and match your own diary. Above all, nothing is asked in return: no payment, no card “confirmation”."
    },
    {
      "texte": "Doctolib",
      "bon": false,
      "type": "neutre",
      "note": "The sender name on a text message or an email is free text: anyone can sign “Doctolib”. It proves nothing — neither that a message is fake, nor that it is genuine."
    }
  ],
  "email-syndic-ok": [
    {
      "texte": "The same file will also reach you by registered post",
      "bon": true,
      "aide": "Is this message the only way to get this document? Find the second channel.",
      "note": "The same file also arrives by post: you will be able to cross-check the two. A scammer carefully avoids any second channel, because he does not control it."
    },
    {
      "texte": "copropriete@cabinet-berthier.fr",
      "bon": true,
      "aide": "Look at the full address: does the domain match the managing agent you know?",
      "note": "The domain after the @ sign is your managing agent's, the one printed on your service charge statements. It is the checkable part of the header."
    },
    {
      "texte": "the quotes received for refurbishing the entrance hall",
      "bon": true,
      "aide": "Does the content match something real in your building?",
      "note": "The message refers to a file genuinely under way in your building, which your neighbours know about too. A fake agent invents a generic reason."
    },
    {
      "texte": "Attached you will find",
      "bon": false,
      "type": "neutre",
      "note": "An attachment is frightening, and rightly so: it is the favourite vehicle for viruses. But this one is expected, it comes from a known sender, and its content also arrives by post. It is not the attachment that decides, it is whether it was expected or not."
    }
  ],
  "email-facture-energie-ok": [
    {
      "texte": "contact@edf.fr",
      "bon": true,
      "aide": "Look at the full sender address: is the domain the supplier's?",
      "note": "The domain after the @ sign is the supplier's, and it cannot be invented the way a displayed name can. It is the part of the header you can check."
    },
    {
      "texte": "This amount includes the annual reconciliation of your consumption",
      "bon": true,
      "aide": "Does the message explain where the figure comes from, or does it just alarm you?",
      "note": "The message explains where the figure comes from, with the calculation. A fake email never does that: it needs you to panic, not to understand."
    },
    {
      "texte": "from the usual account",
      "bon": true,
      "aide": "Are you told about a change of bank account? Find the answer.",
      "note": "No new account is announced: the payment is taken as in previous months. That is exactly where bank-detail-change fraud operates, and there is no trace of it here."
    },
    {
      "texte": "€214.60",
      "bon": false,
      "type": "neutre",
      "note": "That is the figure that jumps out, and the one you look at first. But a high amount is neither proof of a scam nor proof of the opposite: what counts is that you are asked for no link, no card and no new bank details."
    }
  ]
};

if (typeof window !== 'undefined'){
  window.SCENARIOS = SCENARIOS;
  window.GLOSSAIRE = GLOSSAIRE;
  window.REPERES = REPERES;
}
