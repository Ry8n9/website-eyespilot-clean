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
