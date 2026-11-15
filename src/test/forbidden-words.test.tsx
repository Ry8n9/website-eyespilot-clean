import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Index from "@/pages/Index";
import { CONTACT, FLAGS } from "@/config";

/**
 * Garde-fou de la règle 2 du brief : aucune affirmation non prouvable,
 * et rien de l'ancien positionnement. Porte sur le texte réellement
 * affiché et sur index.html.
 */
const FORBIDDEN: RegExp[] = [
  /hébergé en France/i,
  /\bHDS\b/,
  /conforme RGPD/i,
  /\bRGPD\b/,
  /agréé/i,
  /certifié/i,
  /garanti/i,
  /sans donnée médicale/i,
  /%/,
  /\bavis\b/i,
  /gratuit/i,
  /offert/i,
  /\bessai\b/i,
  /places limitées/i,
  /bêta/i,
  /\bpilote gratuit\b/i,
  /J\+\d/i,
  /témoignage/i,
];

/** Pictogrammes et emojis ; le symbole © du pied de page est admis. */
const EMOJI = /(?!©)\p{Extended_Pictographic}/u;

const pageText = () => {
  const { container } = render(<Index />);
  return container.textContent ?? "";
};

const indexHtml = readFileSync(resolve(process.cwd(), "index.html"), "utf-8");

describe("Mots interdits", () => {
  it("aucun mot interdit dans le texte affiché", () => {
    const text = pageText();
    FORBIDDEN.forEach((re) => expect(text, `trouvé : ${re}`).not.toMatch(re));
  });

  it("aucun mot interdit dans index.html", () => {
    FORBIDDEN.forEach((re) => expect(indexHtml, `trouvé : ${re}`).not.toMatch(re));
  });

  it("aucun emoji dans le texte affiché ni dans index.html", () => {
    expect(pageText()).not.toMatch(EMOJI);
    expect(indexHtml).not.toMatch(EMOJI);
  });

  it("aucun chiffre affiché hors téléphone, durée de l'appel, année et simulateur", () => {
    const { container } = render(<Index />);
    // Le simulateur affiche ses bornes de saisie (« sur 10 », « de 0 à 10 ») :
    // ce ne sont pas des affirmations, il est donc exclu de ce contrôle.
    container.querySelector("#simulateur")?.remove();
    const rest = (container.textContent ?? "")
      .replace(CONTACT.phoneDisplay, "")
      .replace(/15 min/g, "")
      .replace(String(new Date().getFullYear()), "");
    expect(rest).not.toMatch(/\d/);
  });

  it("le simulateur est affiché, sans valeur préremplie", () => {
    expect(FLAGS.SHOW_SIMULATOR).toBe(true);
    render(<Index />);
    const sim = document.getElementById("simulateur") as HTMLElement;
    expect(sim).toBeTruthy();
    sim.querySelectorAll("input").forEach((input) => expect(input.value).toBe(""));
  });

  it("aucun prix affiché tant que SHOW_PRICES est faux", () => {
    expect(FLAGS.SHOW_PRICES).toBe(false);
    expect(pageText()).not.toMatch(/€/);
  });

  it("les sections dépendant de données manquantes sont masquées", () => {
    render(<Index />);
    ["preuve", "equipe"].forEach((id) => expect(document.getElementById(id)).toBeNull());
    expect(document.querySelector("audio")).toBeNull();
  });
});
