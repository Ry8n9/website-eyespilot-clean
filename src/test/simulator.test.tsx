import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { estimateMinutes, formatMinutes, Simulator } from "@/components/sections/Simulator";
import { simulator } from "@/content/fr";

describe("Simulateur", () => {
  it("calcule appels × minutes × part confiée", () => {
    expect(estimateMinutes(20, 3, 5)).toBe(30);
    expect(formatMinutes(30)).toBe("30 min");
    expect(formatMinutes(65)).toBe("1 h 05 min");
  });

  it("ne présente aucune valeur par défaut et affiche la mention", () => {
    render(<Simulator />);
    screen.getAllByRole("spinbutton").forEach((input) => expect(input).toHaveValue(null));
    expect(screen.getByText(simulator.empty)).toBeInTheDocument();
    expect(screen.getByText(simulator.disclaimer)).toBeInTheDocument();
  });

  it("affiche le résultat une fois les trois chiffres saisis", () => {
    render(<Simulator />);
    const [calls, minutes, share] = screen.getAllByRole("spinbutton");
    fireEvent.change(calls, { target: { value: "20" } });
    fireEvent.change(minutes, { target: { value: "3" } });
    fireEvent.change(share, { target: { value: "5" } });
    expect(screen.getByText("30 min")).toBeInTheDocument();
  });
});
