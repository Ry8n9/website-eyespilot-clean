import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { render, screen, within } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import App from "@/App";
import Confidentialite from "@/pages/Confidentialite";
import { LEGAL, type LegalInfo } from "@/content/validated";
import { footerLegalLinks } from "@/lib/legal";

const root = process.cwd();

/** Fichiers source réellement utilisés par le site (les composants ui inutilisés sont exclus). */
const siteSources = () => {
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) {
        if (name === "test" || p.endsWith(join("components", "ui"))) continue;
        walk(p);
      } else if (/\.(ts|tsx|css)$/.test(name)) out.push(readFileSync(p, "utf-8"));
    }
  };
  walk(resolve(root, "src"));
  out.push(readFileSync(resolve(root, "index.html"), "utf-8"));
  return out.join("\n");
};

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

describe("Confidentialité : la page décrit le code réel", () => {
  const code = siteSources();

  it("aucun cookie ni stockage local", () => {
    expect(code).not.toMatch(/document\.cookie|localStorage|sessionStorage|indexedDB/);
  });

  it("aucun outil d'analyse", () => {
    expect(code).not.toMatch(/gtag|google-analytics|googletagmanager|plausible|matomo|hotjar|posthog|umami|@vercel\/analytics/i);
  });

  it("aucun formulaire ni envoi de données", () => {
    expect(code).not.toMatch(/<form|fetch\(|XMLHttpRequest|sendBeacon|axios/);
  });

  it("le seul tiers est Calendly (polices hébergées sur le site)", () => {
    const hosts = new Set(
      [...code.matchAll(/https?:\/\/([a-z0-9.-]+)/gi)].map((m) => m[1].toLowerCase()),
    );
    hosts.delete("www.w3.org");
    hosts.delete("schema.org");
    hosts.delete("www.eyespilot.net");
    expect([...hosts].sort()).toEqual(["calendly.com"]);
    expect(code).not.toMatch(/fonts\.googleapis|fonts\.gstatic/);
  });
});

describe("Page /confidentialite", () => {
  beforeEach(() => window.history.pushState({}, "", "/"));

  it("s'affiche avec le responsable, Calendly et l'hébergeur (journaux de connexion)", () => {
    window.history.pushState({}, "", "/confidentialite");
    render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Confidentialité");
    const page = within(screen.getByRole("main"));
    expect(page.getByRole("heading", { name: "Responsable du site" })).toBeInTheDocument();
    expect(page.getByText(/Calendly/)).toBeInTheDocument();
    expect(page.getByText("Vercel Inc.")).toBeInTheDocument();
    expect(page.getByText(/journaux de connexion/)).toBeInTheDocument();
    expect(page.queryByText(/\.\./)).toBeNull();
  });

  it("décrit les faits vérifiés et masque le responsable sans données", () => {
    render(<Confidentialite legal={EMPTY} />);
    const page = within(screen.getByRole("main"));
    expect(page.getByRole("heading", { name: "Cookies et mesure d'audience" })).toBeInTheDocument();
    expect(page.getByText(/Calendly/)).toBeInTheDocument();
    expect(page.queryByText(/Google/)).toBeNull();
    expect(page.getByText(/hébergées sur le site/)).toBeInTheDocument();
    expect(page.queryByRole("heading", { name: "Responsable du site" })).toBeNull();
    expect(page.queryByRole("heading", { name: "Hébergement" })).toBeNull();
  });

  it("le lien du pied de page n'apparaît qu'avec le drapeau et des données", () => {
    expect(footerLegalLinks(LEGAL).map((l) => l.href)).toEqual(["/mentions-legales", "/confidentialite"]);
    const links = footerLegalLinks({ ...EMPTY, name: "Test" }, true).map((l) => l.href);
    expect(links).toContain("/confidentialite");
  });
});
