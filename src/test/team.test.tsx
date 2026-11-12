import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Team } from "@/components/sections/Team";
import { DONNEES_VALIDEES } from "@/content/validated";

describe("Équipe", () => {
  it("affiche les deux membres et leur rôle", () => {
    render(<Team members={DONNEES_VALIDEES.team} />);
    expect(screen.getByText("Rayane Boukef")).toBeInTheDocument();
    expect(screen.getByText("Yazid Ben Brahim")).toBeInTheDocument();
    expect(screen.getByText("Technique")).toBeInTheDocument();
    expect(screen.getByText("Commercial")).toBeInTheDocument();
  });

  it("ne rend rien sans membre", () => {
    const { container } = render(<Team members={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
