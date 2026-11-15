import { render, screen, within } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import App from "@/App";
import MentionsLegales from "@/pages/MentionsLegales";
import { FLAGS } from "@/config";
import { LEGAL, type LegalInfo } from "@/content/validated";
import { footerLegalLinks, isLegalBlockEmpty } from "@/lib/legal";

const EMPTY: LegalInfo = {
  name: null,
  legalForm: null,
  siren: null,
  address: null,
  publicationDirector: null,
  host: null,
  email: null,
};

const visit = (path: string) => {
  window.history.pushState({}, "", path);
  return render(<App />);
};

describe("Pages légales", () => {
  beforeEach(() => window.history.pushState({}, "", "/"));

  it("le bloc LEGAL est vide et SHOW_LEGAL_LINKS est faux", () => {
    expect(isLegalBlockEmpty(LEGAL)).toBe(true);
    expect(FLAGS.SHOW_LEGAL_LINKS).toBe(false);
  });

  it("/mentions-legales n'est pas accessible tant que le bloc est vide", () => {
    visit("/mentions-legales");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("404");
  });

  it("aucun lien légal dans le pied de page", () => {
    visit("/");
    expect(screen.queryByRole("link", { name: /Mentions légales|Confidentialité/ })).toBeNull();
    expect(footerLegalLinks()).toEqual([]);
  });

  it("les liens restent masqués si le drapeau est faux, même avec des données", () => {
    expect(footerLegalLinks({ ...EMPTY, name: "Test" }, false)).toEqual([]);
    expect(footerLegalLinks(EMPTY, true)).toEqual([]);
    expect(footerLegalLinks({ ...EMPTY, name: "Test" }, true).length).toBeGreaterThan(0);
  });

  it("n'affiche que les sections renseignées", () => {
    render(<MentionsLegales legal={{ ...EMPTY, name: "Nom de test", publicationDirector: "Personne de test" }} />);
    const page = within(screen.getByRole("main"));
    expect(page.getByText("Nom de test")).toBeInTheDocument();
    expect(page.getByRole("heading", { name: "Directeur de la publication" })).toBeInTheDocument();
    expect(page.queryByRole("heading", { name: "Hébergement" })).toBeNull();
    expect(page.queryByRole("heading", { name: "Contact" })).toBeNull();
    expect(page.queryByText("SIREN")).toBeNull();
  });
});
