import { useId, useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { faq } from "@/content/fr";
import { cn } from "@/lib/utils";

/** FAQ orientée objections. La première réponse est ouverte par défaut. */
export const Faq = () => {
  const uid = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-titre" className="px-4 py-16 md:py-24">
      <div className="container mx-auto grid max-w-6xl gap-10 px-0 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading id="faq-titre" eyebrow={faq.eyebrow} title={faq.title} lead={faq.lead} />
        </div>
        <div className="divide-y divide-border border-y border-border">
          {faq.items.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    type="button"
                    id={`${uid}-q${i}`}
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    aria-controls={`${uid}-r${i}`}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left font-heading text-base font-bold text-foreground transition-colors hover:text-primary md:text-lg"
                  >
                    {item.q}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-lg leading-none text-primary transition-transform duration-200",
                        open && "rotate-45 border-primary",
                      )}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={`${uid}-r${i}`}
                  role="region"
                  aria-labelledby={`${uid}-q${i}`}
                  hidden={!open}
                  className="pb-6 pr-12"
                >
                  <p className="leading-relaxed text-muted-foreground">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
