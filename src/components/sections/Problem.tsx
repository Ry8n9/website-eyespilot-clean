import { FocalMark } from "@/components/brand/FocalMark";
import { SectionHeading } from "@/components/SectionHeading";
import { problem } from "@/content/fr";

/** Trois situations du secrétariat, sans chiffre. */
export const Problem = () => (
  <section id="probleme" aria-labelledby="probleme-titre" className="px-4 py-16 md:py-24">
    <div className="container mx-auto grid max-w-6xl gap-10 px-0 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <SectionHeading id="probleme-titre" eyebrow={problem.eyebrow} title={problem.title} lead={problem.lead} />
      </div>
      <ul className="divide-y divide-border border-y border-border">
        {problem.situations.map((s) => (
          <li key={s.title} className="flex gap-5 py-8 md:gap-6 md:py-10">
            <FocalMark rings={1} className="mt-1.5 h-6 w-6 md:h-7 md:w-7" />
            <div>
              <h3 className="font-heading text-xl font-bold leading-snug text-foreground md:text-2xl">{s.title}</h3>
              <p className="mt-2 max-w-xl leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
