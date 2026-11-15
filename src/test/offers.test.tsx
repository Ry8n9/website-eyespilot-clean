import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Offers } from "@/components/sections/Offers";
import { DONNEES_VALIDEES } from "@/content/validated";
import { offers } from "@/content/fr";

const { pack, voiceAgent } = DONNEES_VALIDEES.offers;

describe("Offres", () => {
  it("masque les prix tant que SHOW_PRICES est faux", () => {
    render(<Offers pack={pack} voiceAgent={voiceAgent} showPrices={false} riskReversal={null} />);
    expect(screen.queryByText(/€/)).toBeNull();
    expect(screen.getAllByText(offers.priceOnCall)).toHaveLength(2);
    expect(screen.queryByText(offers.riskTitle)).toBeNull();
  });

  it("affiche le contenu du pack, et rien d'autre", () => {
    render(<Offers pack={pack} voiceAgent={voiceAgent} showPrices={false} riskReversal={null} />);
    pack.includes.forEach((item) => {
      expect(screen.getAllByText(item.title)[0]).toBeInTheDocument();
      if (item.description) expect(screen.getByText(item.description)).toBeInTheDocument();
    });
    expect(screen.getByText(pack.conditions as string)).toBeInTheDocument();
    expect(screen.getByText(offers.recommended)).toBeInTheDocument();
  });

  it("affiche les prix validés quand SHOW_PRICES est vrai", () => {
    render(<Offers pack={pack} voiceAgent={voiceAgent} showPrices riskReversal={null} />);
    expect(screen.getByText("4 500 €")).toBeInTheDocument();
    expect(screen.getByText("1 500 €")).toBeInTheDocument();
    expect(screen.getByText("490 €")).toBeInTheDocument();
  });

  it("affiche le bloc « Votre risque » seulement avec un texte validé", () => {
    render(<Offers pack={pack} voiceAgent={voiceAgent} showPrices={false} riskReversal="Texte validé" />);
    expect(screen.getByText(offers.riskTitle)).toBeInTheDocument();
    expect(screen.getByText("Texte validé")).toBeInTheDocument();
  });
});

describe("Offres : contenu validé", () => {
  it("reprend mot pour mot les éléments du pack", () => {
    expect(pack.includes.map((i) => i.title)).toEqual(["Site web", "SEO local", "Agent vocal", "Accompagnement"]);
    expect(pack.includes[3].description).toBe(
      "Un accompagnement de 6 mois : paramétrage avec vous, période pilote sur vos vrais appels, bilan puis décision.",
    );
  });

  it("masque la liste « Inclus » quand elle est vide", () => {
    render(<Offers pack={{ ...pack, includes: [], conditions: undefined }} voiceAgent={voiceAgent} showPrices={false} riskReversal={null} />);
    expect(screen.queryByText(offers.includesLabel)).toBeNull();
  });
});
