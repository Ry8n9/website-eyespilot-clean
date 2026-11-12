import { ArrowDown } from "lucide-react";
import { Gaze } from "@/components/brand/Gaze";
import { CallButton } from "@/components/CallButton";
import { common, hero } from "@/content/fr";

export const Hero = () => (
  <section
    id="hero"
    aria-labelledby="hero-titre"
    className="relative overflow-hidden px-4 pb-16 pt-32 md:pb-24 md:pt-44"
  >
    <div className="container mx-auto grid max-w-6xl items-center gap-12 px-0 lg:grid-cols-[1.45fr_0.55fr]">
      <div>
        <p className="mb-6 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary md:text-sm">
          {hero.eyebrow}
        </p>

        <h1
          id="hero-titre"
          className="font-heading text-[2.6rem] font-extrabold leading-[1.04] tracking-tight text-foreground sm:text-6xl lg:text-[4.1rem] xl:text-[4.5rem]"
        >
          {hero.titleLine1}
          <br />
          <span className="text-primary">{hero.titleLine2}</span>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {hero.lead}
        </p>

        <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <CallButton placement="hero" label={common.ctaLong} />
          <a
            href="#exemple-appel"
            className="inline-flex items-center gap-2 rounded-full px-1 py-2 text-sm font-semibold text-foreground underline decoration-primary/30 underline-offset-[6px] transition-colors hover:text-primary hover:decoration-primary"
          >
            {hero.secondaryLink}
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="relative hidden lg:block">
        <Gaze className="mx-auto w-full max-w-[360px]" />
      </div>
    </div>
  </section>
);
