import { EyesPilotLogo } from "@/components/brand/EyesPilotLogo";
import { CallButton } from "@/components/CallButton";
import { common, finalCta } from "@/content/fr";

/**
 * L'unique appel à l'action final : bord à bord, sur l'encre de la marque,
 * cercles de mise au point et pupille vivante (elle suit le curseur).
 */
export const FinalCta = () => (
  <section
    id="appel-final"
    aria-labelledby="appel-final-titre"
    className="ink-band on-dark relative overflow-hidden px-4 py-24 text-center lg:py-32"
  >
    <svg
      aria-hidden="true"
      viewBox="0 0 600 600"
      className="pointer-events-none absolute left-1/2 top-1/2 h-[160%] -translate-x-1/2 -translate-y-1/2 opacity-[0.16]"
    >
      <g fill="none" stroke="white">
        <circle cx="300" cy="300" r="290" strokeWidth="1" />
        <circle cx="300" cy="300" r="220" strokeWidth="1" />
        <circle cx="300" cy="300" r="150" strokeWidth="1" strokeDasharray="2 8" />
        <circle cx="300" cy="300" r="80" strokeWidth="1" />
      </g>
    </svg>
    <div className="relative mx-auto max-w-2xl">
      <span className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-[0_0_0_8px_hsl(0_0%_100%/0.08),0_20px_40px_-12px_hsl(0_0%_0%/0.5)]">
        <EyesPilotLogo size={52} />
      </span>
      <h2
        id="appel-final-titre"
        className="font-heading text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.08] text-white"
      >
        {finalCta.title}
      </h2>
      <p className="mx-auto mt-5 max-w-[60ch] text-lg leading-relaxed text-white/80">{finalCta.lead}</p>
      <CallButton placement="appel-final" label={common.ctaLong} tone="light" className="mt-10" />
    </div>
  </section>
);
