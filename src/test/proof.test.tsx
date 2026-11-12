import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Proof } from "@/components/sections/Proof";

describe("Preuve", () => {
  it("ne rend rien sans donnée validée", () => {
    const { container } = render(<Proof data={{ practice: null, metric: null, quote: null, callLog: [] }} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("affiche seulement les éléments fournis", () => {
    render(
      <Proof
        data={{
          practice: null,
          metric: null,
          quote: { text: "Citation de test", author: "Dr Test", role: "ophtalmologiste" },
          callLog: [],
        }}
      />,
    );
    expect(screen.getByText(/Citation de test/)).toBeInTheDocument();
    expect(screen.queryByText(/journal d'appels/)).toBeNull();
  });
});
