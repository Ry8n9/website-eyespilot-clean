import { CONTACT } from "@/config";

/**
 * DONNEES_VALIDEES
 *
 * Seule source autorisée pour les chiffres, prix, preuves et faits affichés
 * sur le site. Tout ce qui n'est pas ici n'est pas affiché. Un champ à `null`
 * (ou une liste vide) masque l'élément correspondant, même si son drapeau
 * dans `src/config.ts` vaut `true`.
 */

export type OfferItem = {
  title: string;
  /** Description validée, reprise mot pour mot. Absente : seul le titre s'affiche. */
  description?: string;
};

export type Offer = {
  name: string;
  /** Ce qui est inclus, tel que validé. Aucun détail ajouté. */
  includes: OfferItem[];
  /** Conditions validées, affichées en petit sous la liste. */
  conditions?: string;
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

/**
 * Informations légales. Tout est vide tant que ce n'est pas fourni :
 * aucune valeur n'est inventée. Tant que le bloc entier est vide, les
 * pages /mentions-legales et /confidentialite ne sont pas accessibles ;
 * une information manquante masque la section correspondante.
 */
export type LegalInfo = {
  /** Raison sociale ou nom de l'éditeur. */
  name: string | null;
  legalForm: string | null;
  siren: string | null;
  siret: string | null;
  address: string | null;
  /** Mention de TVA, reprise telle quelle. */
  vatNotice: string | null;
  publicationDirector: string | null;
  /** La section hébergement des mentions légales exige le nom ET l'adresse. */
  host: { name: string; address: string | null; contact: string | null } | null;
  email: string | null;
  phone: string | null;
};

export const DONNEES_VALIDEES = {
  offers: {
    pack: {
      name: "Le pack cabinet",
      includes: [
        {
          title: "Site web",
          description:
            "Un site d'une page ou plus complet, selon votre besoin défini lors de l'appel de découverte. Nom de domaine, hébergement et petites mises à jour compris.",
        },
        {
          title: "SEO local",
          description: "Gestion de vos fiches Google, de vos avis et de vos annuaires.",
        },
        {
          title: "Agent vocal",
          description:
            "Un assistant qui décroche, envoie le lien de rendez-vous par SMS et transmet une fiche écrite au secrétariat, selon la règle d'urgence que vous avez validée.",
        },
        {
          title: "Accompagnement",
          description:
            "Un accompagnement de 6 mois : paramétrage avec vous, période pilote sur vos vrais appels, bilan puis décision.",
        },
      ],
      conditions:
        "Paiement en plusieurs fois possible. Abonnement mensuel de l'agent vocal en plus, à partir du mois suivant la signature. Refontes complètes, nouvelles pages et grosses mises à jour : sur devis.",
      prices: [{ amount: "4 500 €", label: "" }],
    } satisfies Offer,
    voiceAgent: {
      name: "L'agent vocal seul",
      includes: [{ title: "Agent vocal" }],
      prices: [
        { amount: "1 500 €", label: "de mise en place" },
        { amount: "490 €", label: "par mois" },
      ],
    } satisfies Offer,
  },

  /**
   * Chiffres validés, autorisés tels quels dans le texte affiché (le test
   * des chiffres retire uniquement ces occurrences exactes).
   */
  figures: ["6 mois"],

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

};

export const LEGAL: LegalInfo = {
  name: "EyesPilot, exploité par Rayane Boukef",
  legalForm: "Entrepreneur individuel",
  siren: "941 992 281",
  siret: "941 992 281 00027",
  address: "18 rue Frédéric Mistral Prolongée, 94320 Thiais",
  vatNotice: "TVA non applicable, art. 293 B du CGI",
  publicationDirector: "Rayane Boukef",
  // Adresse de l'hébergeur à confirmer : la section reste masquée d'ici là.
  host: { name: "Vercel Inc.", address: null, contact: null },
  email: CONTACT.email,
  phone: CONTACT.phoneDisplay,
};
