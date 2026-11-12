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
