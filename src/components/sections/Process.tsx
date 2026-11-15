import { useEffect, useRef, useState } from "react";
import { EyesPilotLogo } from "@/components/brand/EyesPilotLogo";
import { FocalMark } from "@/components/brand/FocalMark";
import { SectionHeading } from "@/components/SectionHeading";
import { processSteps as process } from "@/content/fr";
import { cn } from "@/lib/utils";

/** Repère d'étape : de plus en plus net, jusqu'à l'œil EyesPilot. */
const StepMark = ({ index, lit = true }: { index: number; lit?: boolean }) => (
  <span
    className={cn(
      "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full surface transition-all duration-500",
      lit ? "!border-primary/40 shadow-[0_0_0_4px_hsl(var(--primary)/0.08)]" : "opacity-60",
    )}
  >
    {index < 3 ? (
      <FocalMark rings={(index + 1) as 1 | 2 | 3} tone={lit ? "primary" : "muted"} className="h-6 w-6" />
    ) : (
      <EyesPilotLogo size={28} interactive={false} />
    )}
  </span>
);

/**
 * Les quatre étapes. Grand écran : la frise reste fixe à gauche et
 * s'allume au fil du défilement, les étapes défilent à droite. Mobile :
 * les étapes s'empilent, chacune avec son repère. Aucun délai précis.
 */
export const Process = () => {
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (typeof window.IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="methode" aria-labelledby="methode-titre" className="px-4 section-y">
      <div className="container mx-auto grid max-w-6xl gap-10 px-0 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Frise fixe (grand écran) */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="methode-titre" eyebrow={process.eyebrow} title={process.title} lead={process.lead} />
          <ol aria-hidden="true" className="relative mt-10 hidden space-y-5 lg:block">
            <span className="absolute bottom-6 left-6 top-6 w-px border-l-2 border-dashed border-primary/25" />
            {process.steps.map((step, i) => (
              <li key={step.title} className="relative flex items-center gap-4">
                <StepMark index={i} lit={i <= active} />
                <span
                  className={cn(
                    "font-heading text-base font-bold transition-colors duration-500",
                    i === active ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {step.title}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Étapes */}
        <ol className="relative space-y-5">
          <span
            aria-hidden="true"
            className="absolute bottom-6 left-6 top-6 w-px border-l-2 border-dashed border-primary/25 lg:hidden"
          />
          {process.steps.map((step, i) => (
            <li
              key={step.title}
              ref={(el) => (stepRefs.current[i] = el)}
              data-index={i}
              className="relative flex gap-5 lg:block"
            >
              <span className="lg:hidden">
                <StepMark index={i} />
              </span>
              <div
                className={cn(
                  "surface flex-1 rounded-3xl p-6 transition-all duration-500 md:p-8 lg:min-h-[17rem]",
                  i === active && "lg:!border-primary/30",
                )}
              >
                <h3 className="font-heading text-xl font-bold text-foreground md:text-2xl">{step.title}</h3>
                <p className="mt-2 max-w-[60ch] leading-relaxed text-muted-foreground">{step.text}</p>
                <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                  <div className="rounded-2xl bg-primary/[0.06] p-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">{process.callsLabel}</dt>
                    <dd className="mt-1 text-foreground">{step.calls}</dd>
                  </div>
                  <div className="rounded-2xl bg-muted p-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                      {process.yourPartLabel}
                    </dt>
                    <dd className="mt-1 text-foreground">{step.yourPart}</dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
