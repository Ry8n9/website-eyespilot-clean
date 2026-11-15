import { EyesPilotLogo } from "@/components/brand/EyesPilotLogo";
import { CallButton } from "@/components/CallButton";
import { common, finalCta } from "@/content/fr";

/** L'unique appel à l'action final, dans la carte sombre de la marque. */
export const FinalCta = () => (
  <section id="appel-final" aria-labelledby="appel-final-titre" className="px-4 py-16 md:py-24">
    <div className="container mx-auto max-w-6xl px-0">
      <div className="ink-card relative overflow-hidden rounded-[2rem] px-6 py-14 text-center md:px-16 md:py-20">
        <svg
          aria-hidden="true"
          viewBox="0 0 600 600"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[140%] -translate-x-1/2 -translate-y-1/2 opacity-[0.14]"
        >
          <g fill="none" stroke="white">
            <circle cx="300" cy="300" r="290" strokeWidth="1" />
            <circle cx="300" cy="300" r="220" strokeWidth="1" />
            <circle cx="300" cy="300" r="150" strokeWidth="1" strokeDasharray="2 8" />
          </g>
        </svg>
        <div className="relative mx-auto max-w-2xl">
          <span className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-lg">
            <EyesPilotLogo size={40} />
          </span>
          <h2
            id="appel-final-titre"
            className="font-heading text-3xl font-bold leading-tight text-white md:text-5xl"
          >
            {finalCta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">{finalCta.lead}</p>
          <CallButton placement="appel-final" label={common.ctaLong} tone="light" className="mt-9" />
        </div>
      </div>
    </div>
  </section>
);
