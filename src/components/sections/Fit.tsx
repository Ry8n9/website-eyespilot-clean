import { FocalMark } from "@/components/brand/FocalMark";
import { SectionHeading } from "@/components/SectionHeading";
import { fit } from "@/content/fr";

/**
 * Pour qui, pour qui pas, sur fond bleuté. « Adapté » sur fond indigo,
 * « Pas adapté » en retrait : l'opposition se lit d'un coup d'œil.
 */
export const Fit = () => (
  <section id="pour-qui" aria-labelledby="pour-qui-titre" className="tint-band px-4 section-y">
    <div className="container mx-auto max-w-6xl px-0">
      <SectionHeading id="pour-qui-titre" eyebrow={fit.eyebrow} title={fit.title} lead={fit.lead} align="center" />
      <div className="mt-12 grid items-start gap-5 md:grid-cols-[1.1fr_0.9fr]">
        <div className="on-dark rounded-3xl bg-primary p-6 text-white shadow-[0_24px_48px_-20px_hsl(var(--primary)/0.55),inset_0_1px_0_hsl(0_0%_100%/0.15)] md:p-9">
          <h3 className="font-heading text-xl font-bold md:text-2xl">{fit.yes.title}</h3>
          <ul className="mt-6 space-y-4">
            {fit.yes.items.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed text-white/95">
                <FocalMark tone="light" className="mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-dashed border-[hsl(var(--card-blue-border))] p-6 md:mt-8 md:p-8">
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
