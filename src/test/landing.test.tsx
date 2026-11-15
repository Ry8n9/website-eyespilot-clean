import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Index from "@/pages/Index";

describe("EyesPilot Landing Page", () => {
  it("renders without throwing", () => {
    const { container } = render(<Index />);
    expect(container.firstChild).toBeTruthy();
  });

  it("displays the hero heading", () => {
    render(<Index />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("Le téléphone sonne.");
    expect(h1).toHaveTextContent("Votre consultation continue.");
  });

  it("hero links to the call example", () => {
    render(<Index />);
    const link = screen.getByRole("link", { name: /Voir un appel en vrai/ });
    expect(link).toHaveAttribute("href", "#exemple-appel");
  });

  it("renders all section headings", () => {
    render(<Index />);
    expect(screen.getByRole("heading", { name: "Ce qui interrompt votre journée." })).toBeInTheDocument();
    expect(screen.getByRole("table", { name: /Comparaison qualitative/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "De votre premier appel à votre décision." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Deux engagements, sans jargon." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Une offre complète, ou l'assistant seul." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Pas adapté si/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Les questions que vous vous posez." })).toBeInTheDocument();
  });

  it("all primary CTA links open Calendly in a new tab with an utm source", () => {
    render(<Index />);
    const ctaLinks = screen.getAllByRole("link", { name: /Réserver/i });
    expect(ctaLinks.length).toBeGreaterThan(0);
    ctaLinks.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
    const calendly = ctaLinks.filter((l) => l.getAttribute("href")?.includes("calendly.com"));
    calendly.forEach((link) => expect(link.getAttribute("href")).toContain("utm_source=eyespilot.net"));
  });

  it("FAQ first item is open by default, toggles on click", () => {
    render(<Index />);
    const faqSection = document.querySelector("#faq") as HTMLElement;
    const faqButtons = within(faqSection)
      .getAllByRole("button")
      .filter((btn) => btn.hasAttribute("aria-expanded"));

    expect(faqButtons).toHaveLength(7);
    expect(faqButtons[0]).toHaveAttribute("aria-expanded", "true");
    expect(faqButtons[1]).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(faqButtons[0]);
    expect(faqButtons[0]).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(faqButtons[2]);
    expect(faqButtons[2]).toHaveAttribute("aria-expanded", "true");
  });

  it("FAQ Doctolib answer is the validated text, without integration claim", () => {
    render(<Index />);
    const answer = screen.getByText("Le patient reçoit par SMS le lien de prise de rendez-vous de votre cabinet. L'agenda peut être pris en charge dans le CRM EyesPilot, mis en place avec votre cabinet. L'assistant, lui, envoie le lien de prise de rendez-vous par SMS.");
    expect(answer).toBeInTheDocument();
    expect(answer.textContent).not.toMatch(/intégr|synchronis|connecté|compatible/i);
  });

  it("FAQ no longer duplicates the patient data section, which keeps the contact address", () => {
    render(<Index />);
    expect(screen.queryByRole("button", { name: "Mes données ?" })).toBeNull();
    const data = document.getElementById("donnees") as HTMLElement;
    expect(within(data).getByRole("link", { name: "contact@eyespilot.net" })).toHaveAttribute(
      "href",
      "mailto:contact@eyespilot.net",
    );
  });

  it("Pour qui and Bilan use the updated wording", () => {
    render(<Index />);
    expect(
      screen.getByText("Votre cabinet propose déjà la prise de rendez-vous en ligne, ou souhaite la mettre en place avec nous."),
    ).toBeInTheDocument();
    expect(screen.queryByText(/le lien envoyé par SMS perd son intérêt/)).toBeNull();
    expect(screen.getByText("Vous décidez de la suite avec nous.")).toBeInTheDocument();
    expect(screen.queryByText(/continuer ou arrêter/)).toBeNull();
  });

  it("keeps the footer outside of main", () => {
    render(<Index />);
    const footer = screen.getByRole("contentinfo");
    expect(footer.closest("main")).toBeNull();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("displays contact email and phone in the footer", () => {
    render(<Index />);
    const footer = within(screen.getByRole("contentinfo"));
    expect(footer.getByText("contact@eyespilot.net")).toBeInTheDocument();
    expect(footer.getByText("06 44 83 29 03")).toBeInTheDocument();
  });

  it("mobile menu button toggles aria-label and renders nav links", () => {
    render(<Index />);
    const openButton = screen.getByRole("button", { name: /Ouvrir le menu/i });
    expect(openButton).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(openButton);

    const closeButton = screen.getByRole("button", { name: /Fermer le menu/i });
    expect(closeButton).toHaveAttribute("aria-expanded", "true");
  });
});
