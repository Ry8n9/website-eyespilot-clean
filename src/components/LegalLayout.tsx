import { useEffect, type ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { EyesPilotLogo } from "@/components/brand/EyesPilotLogo";
import { Footer } from "@/components/sections/Footer";
import { common, legalPages } from "@/content/fr";
import { footerLegalLinks } from "@/lib/legal";

/** Gabarit sobre des pages légales : en-tête, titre, sections, pied de page. */
export const LegalLayout = ({ title, children }: { title: string; children: ReactNode }) => {
  useEffect(() => {
    const previous = document.title;
    document.title = `${title} | ${common.brand}`;
    return () => {
      document.title = previous;
    };
  }, [title]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 py-6">
        <div className="container mx-auto flex max-w-3xl items-center justify-between px-0">
          <a href="/" className="flex items-center gap-2 font-heading text-lg font-extrabold text-primary">
            <EyesPilotLogo size={24} interactive={false} />
            {common.brand}
          </a>
          <a href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {legalPages.backHome}
          </a>
        </div>
      </header>
      <main className="flex-1 px-4 pb-16 pt-8 md:pt-12">
        <article className="container mx-auto max-w-3xl px-0">
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">{title}</h1>
          <div className="mt-10 space-y-10">{children}</div>
        </article>
      </main>
      <Footer legalLinks={footerLegalLinks()} />
    </div>
  );
};

/** Une section de page légale ; rien n'est rendu sans contenu. */
export const LegalSection = ({ title, children }: { title: string; children: ReactNode }) => (
  <section>
    <h2 className="font-heading text-xl font-bold text-foreground md:text-2xl">{title}</h2>
    <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">{children}</div>
  </section>
);

/** Liste de couples libellé / valeur. */
export const LegalRows = ({ rows }: { rows: { label: string; value: string }[] }) => (
  <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-[200px_1fr]">
    {rows.map((r) => (
      <div key={r.label} className="contents">
        <dt className="font-semibold text-foreground">{r.label}</dt>
        <dd className="whitespace-pre-line">{r.value}</dd>
      </div>
    ))}
  </dl>
);
