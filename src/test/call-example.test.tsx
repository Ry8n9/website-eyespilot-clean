import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
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
