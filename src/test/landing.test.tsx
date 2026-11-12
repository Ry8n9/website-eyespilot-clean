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
    expect(screen.getByText(/Comment procède-t-on/i)).toBeInTheDocument();
    expect(screen.getByText(/on prend ça au sérieux/i)).toBeInTheDocument();
    expect(screen.getByText(/Testez EyesPilot pendant 30 jours/i)).toBeInTheDocument();
    expect(screen.getByText(/Les questions qu.on nous pose/i)).toBeInTheDocument();
  });

  it("all primary CTA links open Calendly in a new tab with an utm source", () => {
    render(<Index />);
    const ctaLinks = screen.getAllByRole("link", { name: /Réserver|Candidater/i });
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

    expect(faqButtons).toHaveLength(6);
    expect(faqButtons[0]).toHaveAttribute("aria-expanded", "true");
    expect(faqButtons[1]).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(faqButtons[0]);
    expect(faqButtons[0]).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(faqButtons[2]);
    expect(faqButtons[2]).toHaveAttribute("aria-expanded", "true");
  });

  it("displays contact email and phone", () => {
    render(<Index />);
    expect(screen.getByText("contact@eyespilot.net")).toBeInTheDocument();
    expect(screen.getByText("06 44 83 29 03")).toBeInTheDocument();
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
