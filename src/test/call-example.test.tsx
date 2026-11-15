import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, it, expect } from "vitest";
import { CallExample } from "@/components/sections/CallExample";
import { callExample } from "@/content/fr";

describe("Exemple d'appel", () => {
  it("affiche la conversation, la fiche, le SMS et la légende données fictives", () => {
    render(<CallExample audio={null} />);
    const section = document.getElementById("exemple-appel") as HTMLElement;
    expect(section).toBeTruthy();
    expect(within(section).getByText(callExample.caption)).toBeInTheDocument();
    expect(within(section).getByText(callExample.ticket.title)).toBeInTheDocument();
    expect(within(section).getByText(callExample.sms.title)).toBeInTheDocument();
    expect(within(section).getAllByRole("listitem").length).toBeGreaterThanOrEqual(callExample.turns.length);
  });

  it("porte les quatre réassurances en annotations", () => {
    render(<CallExample audio={null} />);
    callExample.notes.forEach((note) => expect(screen.getByText(note.title)).toBeInTheDocument());
    expect(screen.getByText(/une intelligence artificielle/)).toBeInTheDocument();
  });

  it("n'affiche pas de lecteur audio sans fichier", () => {
    const { container } = render(<CallExample audio={null} />);
    expect(container.querySelector("audio")).toBeNull();
  });

  it("affiche le lecteur et la transcription quand l'audio est fourni", () => {
    const { container } = render(
      <CallExample
        audio={{
          src: "/audio/exemple.mp3",
          transcript: [
            { start: 0, speaker: "assistant", text: "Ligne une" },
            { start: 4, speaker: "patient", text: "Ligne deux" },
          ],
        }}
      />,
    );
    expect(container.querySelector("audio")).toHaveAttribute("src", "/audio/exemple.mp3");
    expect(screen.getByText("Ligne deux")).toBeInTheDocument();
  });
});

const setReducedMotion = (reduce: boolean) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: reduce && query.includes("prefers-reduced-motion"),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
};

describe("Appel joué tour par tour", () => {
  afterEach(() => setReducedMotion(false));

  it("garde tout le texte de l'appel dans la page, même en cours de lecture", () => {
    render(<CallExample audio={null} />);
    callExample.turns.forEach((t) => expect(screen.getByText(t.text)).toBeInTheDocument());
    expect(screen.getByText(callExample.caption)).toBeInTheDocument();
  });

  it("propose un vrai bouton « Rejouer », utilisable au clavier", () => {
    render(<CallExample audio={null} />);
    const button = screen.getByRole("button", { name: callExample.replay });
    expect(button).toHaveAttribute("type", "button");
    button.focus();
    expect(button).toHaveFocus();
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });

  it("affiche l'appel complet et sans bouton sous prefers-reduced-motion", () => {
    setReducedMotion(true);
    render(<CallExample audio={null} />);
    expect(screen.queryByRole("button", { name: callExample.replay })).toBeNull();
    const items = screen.getAllByRole("listitem").filter((li) => li.className.includes("opacity-0"));
    expect(items).toHaveLength(0);
  });

  it("n'affiche aucune onde sonore sans audio", () => {
    const { container } = render(<CallExample audio={null} />);
    expect(container.querySelector("audio, canvas, [data-onde]")).toBeNull();
  });
});
