import { FocalMark } from "@/components/brand/FocalMark";
import { SectionHeading } from "@/components/SectionHeading";
import { problem } from "@/content/fr";

/**
 * Trois situations du secrétariat, sans chiffre. Fond sombre pleine
 * largeur, composition centrée : le moment où la page change de ton.
 */
export const Problem = () => (
  <section id="probleme" aria-labelledby="probleme-titre" className="ink-band on-dark px-4 py-20 lg:py-28">
    <div className="container mx-auto max-w-6xl px-0">
      <SectionHeading
        id="probleme-titre"
        eyebrow={problem.eyebrow}
        title={problem.title}
        lead={problem.lead}
        tone="light"
        align="center"
      />
      <ul className="mt-12 grid gap-4 md:grid-cols-3 md:gap-5 lg:mt-16">
        {problem.situations.map((s) => (
          <li
            key={s.title}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[inset_0_1px_0_hsl(0_0%_100%/0.06)] md:p-7"
          >
            <FocalMark rings={1} tone="light" className="h-7 w-7" />
            <h3 className="mt-5 font-heading text-xl font-bold leading-snug text-white md:text-[1.35rem]">{s.title}</h3>
            <p className="mt-3 leading-relaxed text-white/75">{s.text}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
