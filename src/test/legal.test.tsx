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
  siret: null,
  vatNotice: null,
  phone: null,
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

  it("le bloc LEGAL est rempli et SHOW_LEGAL_LINKS est vrai", () => {
    expect(isLegalBlockEmpty(LEGAL)).toBe(false);
    expect(FLAGS.SHOW_LEGAL_LINKS).toBe(true);
  });

  it("/mentions-legales s'affiche avec les données validées", () => {
    visit("/mentions-legales");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Mentions légales");
    const page = within(screen.getByRole("main"));
    ["941 992 281", "941 992 281 00027", "Rayane Boukef", "TVA non applicable, art. 293 B du CGI"].forEach((v) =>
      expect(page.getByText(v)).toBeInTheDocument(),
    );
    // Adresse de l'hébergeur non confirmée : section masquée
    expect(page.queryByRole("heading", { name: "Hébergement" })).toBeNull();
    expect(page.queryByText(/capital|RCS/i)).toBeNull();
  });

  it("le pied de page porte les deux liens légaux", () => {
    visit("/");
    expect(screen.getByRole("link", { name: "Mentions légales" })).toHaveAttribute("href", "/mentions-legales");
    expect(screen.getByRole("link", { name: "Confidentialité" })).toHaveAttribute("href", "/confidentialite");
  });

  it("aucun chiffre sur les pages légales hors données LEGAL", () => {
    const values = [LEGAL.siren, LEGAL.siret, LEGAL.address, LEGAL.vatNotice, LEGAL.phone, String(new Date().getFullYear())]
      .filter(Boolean)
      .sort((a, b) => (b as string).length - (a as string).length) as string[];
    for (const path of ["/mentions-legales", "/confidentialite"]) {
      const { unmount } = visit(path);
      let text = document.body.textContent ?? "";
      values.forEach((v) => (text = text.split(v).join(" ")));
      expect(text, path).not.toMatch(/\d/);
      unmount();
    }
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
