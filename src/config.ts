/**
 * Drapeaux d'affichage du site.
 *
 * Chaque section qui dépend d'une donnée pas encore fournie est construite
 * mais reste masquée tant que son drapeau vaut `false`. Passer un drapeau à
 * `true` ne suffit pas : la donnée correspondante doit aussi être remplie
 * dans `src/content/validated.ts`, sinon la section reste masquée.
 */
export const FLAGS = {
  /** Cas du cabinet en production (chiffre mesuré, citation, extrait de journal). */
  SHOW_PROOF: false,
  /** Lecteur audio de l'exemple d'appel (fichier attendu dans public/audio/). */
  SHOW_DEMO_AUDIO: false,
  /** Section équipe (photos et bios). */
  SHOW_TEAM: false,
  /** Montants des offres. Sinon : « Tarif présenté lors de l'appel ». */
  SHOW_PRICES: false,
  /** Bloc « Votre risque » sous les offres. */
  SHOW_GUARANTEE: false,
  /** Liens vers les pages légales dans le pied de page. */
  SHOW_LEGAL_LINKS: false,
  /** Simulateur de temps de secrétariat. */
  SHOW_SIMULATOR: false,
} as const;

export const CONTACT = {
  email: "contact@eyespilot.net",
  phone: "+33644832903",
  phoneDisplay: "06 44 83 29 03",
} as const;

const CALENDLY_BASE = "https://calendly.com/rayane-boukef-eyespilot/new-meeting";

/**
 * Lien Calendly avec paramètres utm pour savoir depuis quel endroit de la
 * page l'appel a été réservé. Aucun outil d'analyse ni cookie n'est ajouté :
 * ces paramètres sont lus par Calendly uniquement.
 */
export const calendlyUrl = (placement: string) =>
  `${CALENDLY_BASE}?utm_source=eyespilot.net&utm_medium=site&utm_content=${encodeURIComponent(placement)}`;
