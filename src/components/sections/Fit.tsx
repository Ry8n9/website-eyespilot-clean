import { FocalMark } from "@/components/brand/FocalMark";
import { SectionHeading } from "@/components/SectionHeading";
import { fit } from "@/content/fr";

/** Deux colonnes honnêtes : pour qui l'offre est adaptée, et pour qui elle ne l'est pas. */
export const Fit = () => (
  <section id="pour-qui" aria-labelledby="pour-qui-titre" className="px-4 py-16 md:py-24">
    <div className="container mx-auto max-w-6xl px-0">
      <SectionHeading id="pour-qui-titre" eyebrow={fit.eyebrow} title={fit.title} lead={fit.lead} />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <div className="card-blue rounded-3xl p-6 md:p-8">
          <h3 className="font-heading text-lg font-bold text-foreground md:text-xl">{fit.yes.title}</h3>
          <ul className="mt-5 space-y-4">
            {fit.yes.items.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed text-foreground">
                <FocalMark className="mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
          <h3 className="font-heading text-lg font-bold text-foreground md:text-xl">{fit.no.title}</h3>
          <ul className="mt-5 space-y-4">
            {fit.no.items.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed text-muted-foreground">
                <FocalMark rings={1} tone="muted" className="mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);
