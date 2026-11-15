import { EyesPilotLogo } from "@/components/brand/EyesPilotLogo";
import { FocalMark } from "@/components/brand/FocalMark";
import { SectionHeading } from "@/components/SectionHeading";
import { processSteps as process } from "@/content/fr";

/**
 * Les quatre étapes, en frise qui suit le parcours d'un appel. Le repère
 * de chaque étape devient de plus en plus net, jusqu'à l'œil EyesPilot :
 * une mise au point progressive. Aucun délai précis.
 */
const StepMark = ({ index }: { index: number }) => (
  <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full surface">
    {index < 3 ? (
      <FocalMark rings={(index + 1) as 1 | 2 | 3} className="h-6 w-6" />
    ) : (
      <EyesPilotLogo size={28} interactive={false} />
    )}
  </span>
);

export const Process = () => (
  <section id="methode" aria-labelledby="methode-titre" className="px-4 section-y">
    <div className="container mx-auto max-w-6xl px-0">
      <SectionHeading id="methode-titre" eyebrow={process.eyebrow} title={process.title} lead={process.lead} />

      <ol className="relative mt-12 grid gap-10 lg:grid-cols-4 lg:gap-6">
        {/* Le fil de l'appel */}
        <span
          aria-hidden="true"
          className="absolute bottom-6 left-6 top-6 w-px border-l-2 border-dashed border-primary/25 lg:bottom-auto lg:left-6 lg:right-6 lg:top-6 lg:h-px lg:w-auto lg:border-l-0 lg:border-t-2"
        />
        {process.steps.map((step, i) => (
          <li key={step.title} className="relative flex gap-5 lg:flex-col lg:gap-6">
            <StepMark index={i} />
            <div className="flex-1">
              <h3 className="font-heading text-lg font-bold text-foreground md:text-xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              <dl className="mt-4 space-y-2 rounded-2xl surface p-4 text-sm">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">{process.callsLabel}</dt>
                  <dd className="mt-0.5 text-foreground">{step.calls}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                    {process.yourPartLabel}
                  </dt>
                  <dd className="mt-0.5 text-foreground">{step.yourPart}</dd>
                </div>
              </dl>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
