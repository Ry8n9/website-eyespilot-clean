/**
 * DONNEES_VALIDEES
 *
 * Seule source autorisée pour les chiffres, prix, preuves et faits affichés
 * sur le site. Tout ce qui n'est pas ici n'est pas affiché. Un champ à `null`
 * (ou une liste vide) masque l'élément correspondant, même si son drapeau
 * dans `src/config.ts` vaut `true`.
 */

export type Offer = {
  name: string;
  /** Ce qui est inclus, tel que validé. Aucun détail ajouté. */
  includes: string[];
  /** Montant(s) affiché(s) uniquement si FLAGS.SHOW_PRICES. */
  prices: { amount: string; label: string }[];
};

export type ProofData = {
  /** Nom ou description du cabinet, avec son accord. */
  practice: string | null;
  /** Un chiffre mesuré, avec sa période et sa méthode. */
  metric: { value: string; label: string; source: string } | null;
  /** Citation signée du médecin, avec son accord. */
  quote: { text: string; author: string; role: string } | null;
  /** Extrait de journal d'appel anonymisé. */
  callLog: { time: string; text: string }[];
};

export type TeamMember = {
  name: string;
  role: string;
  /** Chemin dans public/, par exemple "/team/rayane.webp". */
  photo: string | null;
  bio: string | null;
};

export type DemoAudio = {
  /** Chemin dans public/audio/, par exemple "/audio/exemple-appel.mp3". */
  src: string;
  /** Transcription synchronisée : `start` en secondes. */
  transcript: { start: number; speaker: "patient" | "assistant"; text: string }[];
};

export type LegalLink = { label: string; href: string };

export const DONNEES_VALIDEES = {
  offers: {
    pack: {
      name: "Le pack cabinet",
      includes: ["Site web", "SEO local", "Agent vocal", "Accompagnement"],
      prices: [{ amount: "4 500 €", label: "" }],
    } satisfies Offer,
    voiceAgent: {
      name: "L'agent vocal seul",
      includes: ["Agent vocal"],
      prices: [
        { amount: "1 500 €", label: "de mise en place" },
        { amount: "490 €", label: "par mois" },
      ],
    } satisfies Offer,
  },

  /** Texte du bloc « Votre risque ». Vide tant qu'il n'est pas validé. */
  riskReversal: null as string | null,

  proof: {
    practice: null,
    metric: null,
    quote: null,
    callLog: [],
  } as ProofData,

  team: [
    { name: "Rayane Boukef", role: "Technique", photo: null, bio: null },
    { name: "Yazid Ben Brahim", role: "Commercial", photo: null, bio: null },
  ] as TeamMember[],

  demoAudio: null as DemoAudio | null,

  legalLinks: [] as LegalLink[],
};
