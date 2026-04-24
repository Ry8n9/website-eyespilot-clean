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
    expect(h1).toHaveTextContent(/Moins d.appels/);
    expect(h1).toHaveTextContent(/Votre secrétariat respire/);
  });

  it("renders all section headings", () => {
    render(<Index />);
    expect(screen.getByText(/ces situations vous parlent/i)).toBeInTheDocument();
    expect(screen.getByText(/Trois briques/i)).toBeInTheDocument();
    expect(screen.getByText(/De l.appel au premier avis/i)).toBeInTheDocument();
    expect(screen.getByText(/on prend ça au sérieux/i)).toBeInTheDocument();
    expect(screen.getByText(/10 cabinets pilotes/i)).toBeInTheDocument();
    expect(screen.getByText(/Les questions qu.on nous pose/i)).toBeInTheDocument();
  });

  it("all primary CTA links open in a new tab with rel=noopener", () => {
    render(<Index />);
    const ctaLinks = screen.getAllByRole("link", { name: /Réserver|Candidater/i });
    expect(ctaLinks.length).toBeGreaterThan(0);
    ctaLinks.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  it("FAQ first item is open by default, toggles on click", () => {
    render(<Index />);
    const faqSection = document.querySelector("#faq")!;
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
