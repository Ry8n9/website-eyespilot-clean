/**
 * Textes du site, en français.
 *
 * Règles de rédaction : vouvoiement, phrases courtes, vocabulaire du cabinet.
 * Aucun chiffre, prix, délai ni fait qui ne vient pas de
 * `src/content/validated.ts`. Aucune affirmation de conformité ou
 * d'hébergement. La liste des mots interdits est vérifiée par
 * `src/test/forbidden-words.test.tsx`.
 */

export const common = {
  brand: "EyesPilot",
  cta: "Réserver un appel",
  ctaLong: "Réserver un appel de 15 min",
  newTab: "(s'ouvre dans un nouvel onglet)",
};

export const nav = {
  homeLabel: "EyesPilot, retour en haut de page",
  links: [
    { href: "#exemple-appel", label: "Exemple d'appel" },
    { href: "#methode", label: "Méthode" },
    { href: "#offres", label: "Offres" },
    { href: "#faq", label: "Questions" },
  ],
  openMenu: "Ouvrir le menu",
  closeMenu: "Fermer le menu",
  mobileBarLabel: "Réserver un appel de 15 min",
};

export const hero = {
  eyebrow: "Assistant vocal pour les cabinets d'ophtalmologie",
  titleLine1: "Le téléphone sonne.",
  titleLine2: "Votre consultation continue.",
  lead: "L'assistant EyesPilot décroche, comprend la demande du patient et la transmet par écrit à votre secrétariat. Pour les urgences, il applique la règle que vous avez validée.",
  secondaryLink: "Voir un appel en vrai",
};

export const callExample = {
  eyebrow: "Voir un appel en vrai",
  title: "Ce qu'entend votre patient. Ce que reçoit votre secrétariat.",
  lead: "Une demande courante, du premier mot à la fiche transmise. Les annotations montrent ce que vous gardez sous contrôle.",
  caption: "Exemple de conversation, données fictives",
  callStatus: "Appel entrant",
  practice: "Cabinet du Dr Martin, ophtalmologie",
  fictional: "Données fictives",
  speakers: { patient: "Patient", assistant: "Assistant EyesPilot" },
  turns: [
    {
      speaker: "assistant",
      text: "Bonjour, cabinet du Dr Martin. Je suis l'assistant vocal du cabinet, une intelligence artificielle. Que puis-je faire pour vous ?",
      note: 0,
    },
    {
      speaker: "patient",
      text: "Bonjour. Je voudrais renouveler mon ordonnance de lunettes, je vois moins bien de loin.",
    },
    {
      speaker: "assistant",
      text: "Je note. Avant tout : avez-vous une douleur à l'œil, un œil rouge ou une baisse brutale de la vision ?",
      note: 1,
    },
    { speaker: "patient", text: "Non, rien de tout ça. C'est venu petit à petit." },
    {
      speaker: "assistant",
      text: "Merci. Je vous envoie par SMS le lien de prise de rendez-vous du cabinet, et je transmets votre demande au secrétariat.",
      note: 2,
    },
    { speaker: "patient", text: "Et si je préfère parler à quelqu'un ?" },
    {
      speaker: "assistant",
      text: "Bien sûr. Je l'indique au secrétariat, pour qu'une personne du cabinet vous recontacte.",
      note: 3,
    },
  ] as { speaker: "patient" | "assistant"; text: string; note?: number }[],
  notes: [
    {
      title: "Une IA annoncée",
      text: "Dès la première phrase, le patient sait à qui il parle.",
    },
    {
      title: "Votre règle d'urgence",
      text: "Les questions posées et la conduite à tenir sont celles que vous avez validées.",
    },
    {
      title: "Le lien de rendez-vous par SMS",
      text: "Le patient reçoit le lien de prise de rendez-vous du cabinet.",
    },
    {
      title: "Un humain reste joignable",
      text: "Si le patient demande une personne, sa demande part au secrétariat.",
    },
  ],
  ticket: {
    title: "Fiche transmise au secrétariat",
    rows: [
      { label: "Motif", value: "Renouvellement d'ordonnance de lunettes" },
      { label: "Patient", value: "M. Lefèvre, rappel au numéro de l'appel" },
      { label: "Règle d'urgence", value: "Questions posées, aucun signe d'alerte signalé" },
      { label: "Fait", value: "Lien de prise de rendez-vous envoyé par SMS" },
      { label: "À faire", value: "Recontacter le patient : il souhaite parler à une personne" },
    ],
  },
  sms: {
    title: "SMS reçu par le patient",
    sender: "Cabinet Dr Martin",
    text: "Bonjour, voici le lien pour prendre rendez-vous au cabinet du Dr Martin. Message automatique.",
    linkLabel: "Prendre rendez-vous",
  },
  audio: {
    title: "Écouter l'appel",
    transcriptLabel: "Transcription",
  },
};

export const problem = {
  eyebrow: "Le problème",
  title: "Ce qui interrompt votre journée.",
  lead: "Rien d'exceptionnel. Justement : ces appels reviennent tous les jours.",
  situations: [
    {
      title: "En pleine consultation, le téléphone sonne.",
      text: "Le patient en face de vous attend. Au bout du fil, une question sur les horaires ou les documents à apporter.",
    },
    {
      title: "Le secrétariat est déjà en ligne.",
      text: "L'appel suivant sonne dans le vide. Le patient rappellera plus tard, ou prendra rendez-vous ailleurs.",
    },
    {
      title: "Encore une demande d'ordonnance.",
      text: "Lunettes, lentilles : la demande est simple, mais elle occupe un appel entier et une note à retranscrire.",
    },
  ],
};

export const simulator = {
  eyebrow: "Simulateur",
  title: "Estimez le temps de secrétariat consacré aux appels répétitifs.",
  lead: "Saisissez vos propres chiffres. Rien n'est prérempli : vous seul connaissez votre cabinet.",
  fields: {
    calls: { label: "Appels répétitifs par jour", hint: "Horaires, documents, ordonnances…" },
    minutes: { label: "Minutes par appel, en moyenne", hint: "Prise de notes comprise" },
    share: { label: "Sur 10 de ces appels, combien confier à l'assistant ?", hint: "De 0 à 10" },
  },
  formulaLabel: "Le calcul",
  formula: "appels par jour × minutes par appel × part confiée",
  empty: "Renseignez vos trois chiffres pour voir l'estimation.",
  resultLabel: "Temps de secrétariat concerné, par jour",
  disclaimer: "Estimation indicative à partir de vos propres chiffres, pas une promesse de résultat.",
};

export const comparison = {
  eyebrow: "Comparer",
  title: "Trois façons de gérer le téléphone.",
  lead: "Sans prix ni promesse : ce qui change concrètement pour votre cabinet.",
  caption: "Comparaison qualitative entre trois organisations du téléphone",
  columns: ["Ne rien faire", "Secrétariat externalisé", "EyesPilot"],
  criterionLabel: "Critère",
  rows: [
    {
      criterion: "Connaît votre cabinet",
      values: [
        "Oui, c'est votre équipe",
        "Selon les consignes transmises au prestataire",
        "Paramétré avec vous : vos motifs d'appel, vos consignes",
      ],
    },
    {
      criterion: "Règle d'urgence validée par vous",
      values: [
        "Dépend de la personne qui décroche",
        "Selon le protocole du prestataire",
        "Rédigée et validée par vous avant la mise en service",
      ],
    },
    {
      criterion: "Trace de chaque appel",
      values: [
        "Notes prises entre deux patients",
        "Selon le prestataire",
        "Une fiche écrite pour le secrétariat à la fin de l'appel",
      ],
    },
    {
      criterion: "Mise à jour de vos horaires",
      values: [
        "Votre équipe les connaît",
        "À transmettre au prestataire",
        "Vous nous les transmettez, nous mettons l'assistant à jour",
      ],
    },
  ],
};

export const proof = {
  eyebrow: "En production",
  title: "Un cabinet l'utilise déjà.",
  metricSourcePrefix: "Source :",
  callLogTitle: "Extrait du journal d'appels, anonymisé",
};

export const processSteps = {
  eyebrow: "Comment ça se passe",
  title: "De votre premier appel à votre décision.",
  lead: "Quatre étapes. À chacune, vous savez ce que deviennent vos appels et ce que l'on attend de vous.",
  callsLabel: "Vos appels",
  yourPartLabel: "Votre part",
  steps: [
    {
      title: "Appel de cadrage",
      text: "Nous écoutons comment votre cabinet reçoit ses appels aujourd'hui et quelles demandes reviennent.",
      calls: "Rien ne change encore.",
      yourPart: "Un appel avec nous.",
    },
    {
      title: "Paramétrage avec vous",
      text: "Nous préparons l'assistant avec vos motifs d'appel et vos consignes. Vous rédigez et validez la règle d'urgence.",
      calls: "L'assistant apprend votre cabinet.",
      yourPart: "Relire et valider la règle d'urgence.",
    },
    {
      title: "Période pilote",
      text: "L'assistant décroche pour de vrai. Votre secrétariat reçoit les fiches, nous ajustons le paramétrage avec vous.",
      calls: "L'assistant décroche, le secrétariat reçoit les fiches.",
      yourPart: "Nous signaler ce qui doit changer.",
    },
    {
      title: "Bilan et décision",
      text: "Nous regardons ensemble les appels traités et les fiches transmises. Vous décidez de la suite.",
      calls: "Vous choisissez : continuer ou arrêter.",
      yourPart: "Décider.",
    },
  ],
};

export const offers = {
  eyebrow: "Les offres",
  title: "Une offre complète, ou l'assistant seul.",
  lead: "Le tarif dépend de ce que vous choisissez. Nous le présentons pendant l'appel, avec ce qui est inclus.",
  recommended: "Recommandé",
  includesLabel: "Inclus",
  priceOnCall: "Tarif présenté lors de l'appel",
  packPitch: "Pour un cabinet qui veut tout regrouper : être trouvé en ligne, et ne plus laisser sonner le téléphone.",
  voiceAgentPitch: "Vous avez déjà un site ? L'agent vocal existe aussi seul.",
  riskTitle: "Votre risque",
};

export const fit = {
  eyebrow: "Pour qui",
  title: "Pour qui c'est fait, et pour qui ça ne l'est pas.",
  lead: "Mieux vaut le savoir avant l'appel.",
  yes: {
    title: "Adapté si…",
    items: [
      "Votre secrétariat est souvent déjà en ligne quand le téléphone sonne.",
      "Les mêmes demandes reviennent : horaires, documents, renouvellements d'ordonnance.",
      "Vous voulez fixer vous-même la conduite à tenir en cas d'urgence.",
      "Votre cabinet propose déjà la prise de rendez-vous en ligne.",
    ],
  },
  no: {
    title: "Pas adapté si…",
    items: [
      "Vous voulez que chaque appel, même simple, soit pris par une personne.",
      "Les urgences de votre cabinet doivent être traitées uniquement par un humain, dès le premier mot.",
      "Personne au cabinet ne peut relire les fiches transmises au secrétariat.",
      "Votre cabinet ne propose pas de prise de rendez-vous en ligne : le lien envoyé par SMS perd son intérêt.",
    ],
  },
};

export const patientData = {
  eyebrow: "Données patients",
  title: "Deux engagements, sans jargon.",
  commitments: [
    {
      title: "Le strict nécessaire",
      text: "Nous limitons les données des patients à ce qui est nécessaire pour traiter leur demande.",
    },
    {
      title: "Des messages identifiés, un humain joignable",
      text: "Les messages envoyés aux patients sont identifiés comme automatiques, et une personne du cabinet reste joignable.",
    },
  ],
};

export const team = {
  eyebrow: "Équipe",
  title: "Les personnes que vous aurez au téléphone.",
};

export const faq = {
  eyebrow: "Questions",
  title: "Les questions que vous vous posez.",
  lead: "Des réponses prudentes. Pour le reste, posez-les-nous pendant l'appel.",
  items: [
    {
      q: "Et si l'assistant se trompe ?",
      a: "Il ne pose aucun diagnostic et ne prend pas de décision médicale. Chaque appel se termine par une fiche écrite pour votre secrétariat, qui voit ce qui a été dit et peut recontacter le patient. Pendant la période pilote, nous relisons ces fiches avec vous et corrigeons le paramétrage.",
    },
    {
      q: "Et les urgences ?",
      a: "Avant la mise en service, vous rédigez et validez la règle d'urgence : les signes d'alerte et la consigne à donner au patient. L'assistant applique cette règle telle que vous l'avez validée.",
    },
    {
      q: "Mes patients âgés ?",
      a: "L'assistant annonce dès le début qu'il est une intelligence artificielle. Un patient qui préfère parler à une personne peut le dire : sa demande est transmise au secrétariat. Pendant la période pilote, les fiches vous montrent comment ces appels se passent.",
    },
    {
      q: "Doctolib ?",
      a: "Le patient reçoit par SMS le lien de prise de rendez-vous du cabinet.",
    },
    {
      q: "Mes données ?",
      a: "Nous limitons les données des patients au strict nécessaire. Les messages envoyés sont identifiés comme automatiques, et une personne du cabinet reste joignable. Pour toute question précise : contact@eyespilot.net.",
    },
    {
      q: "Combien de temps cela me demande-t-il ?",
      a: "Un appel de cadrage, puis un temps de paramétrage où vous validez la règle d'urgence. Pendant la période pilote, nous vous demandons de nous signaler ce qui doit changer. Ensuite, le bilan.",
    },
    {
      q: "Et si ça ne me convient pas ?",
      a: "Le bilan sert à cela : à la fin de la période pilote, vous décidez de continuer ou d'arrêter. Les conditions vous sont présentées pendant l'appel, avant tout engagement.",
    },
    {
      q: "Pourquoi pas un secrétariat externalisé ?",
      a: "C'est une option sérieuse. La différence : l'assistant est paramétré avec vous pour votre cabinet, applique la règle d'urgence que vous avez validée et laisse une fiche écrite à la fin de chaque appel. Le tableau de comparaison plus haut détaille les trois options.",
    },
  ],
};

export const finalCta = {
  title: "Un appel de 15 minutes pour savoir si c'est adapté à votre cabinet.",
  lead: "Nous écoutons comment votre cabinet reçoit ses appels. Vous repartez avec une réponse claire, oui ou non.",
};

export const footer = {
  tagline: "Assistant vocal pour les cabinets d'ophtalmologie.",
  contactTitle: "Contact",
};

export const legalPages = {
  backHome: "Retour à l'accueil",
  links: {
    mentions: { href: "/mentions-legales", label: "Mentions légales" },
    privacy: { href: "/confidentialite", label: "Confidentialité" },
  },
  mentions: {
    title: "Mentions légales",
    publisher: {
      title: "Éditeur du site",
      intro: "Le site www.eyespilot.net est édité par :",
      name: "Raison sociale ou nom",
      legalForm: "Forme juridique",
      siren: "SIREN",
      address: "Adresse",
    },
    director: { title: "Directeur de la publication" },
    host: {
      title: "Hébergement",
      intro: "Le site est hébergé par :",
      name: "Hébergeur",
      address: "Adresse",
      contact: "Contact",
    },
    contact: { title: "Contact", intro: "Pour toute question concernant le site :" },
  },
};
