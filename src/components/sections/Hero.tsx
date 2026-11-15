import { ArrowDown } from "lucide-react";
import { FocalBackdrop } from "@/components/brand/FocalBackdrop";
import { CallButton } from "@/components/CallButton";
import { SmsPhone } from "@/components/mock/SmsPhone";
import { TicketScreen } from "@/components/mock/TicketScreen";
import { callExample, common, hero, mockScreens } from "@/content/fr";

const heroRows = callExample.ticket.rows.filter((r) => mockScreens.heroRowLabels.includes(r.label));

/**
 * Le produit dès le premier écran : la fiche que reçoit le secrétariat,
 * et le SMS reçu par le patient en avant-plan. Données de l'exemple
 * d'appel, étiquetées comme fictives.
 */
const HeroProduct = () => (
  <figure data-exemple className="relative mx-auto w-full max-w-[460px]">
    <FocalBackdrop className="pointer-events-none absolute left-1/2 top-1/2 -z-10 w-[150%] max-w-none -translate-x-1/2 -translate-y-1/2" />
    <div className="rise ml-auto w-[88%] sm:w-[82%]" style={{ animationDelay: "150ms" }}>
      <TicketScreen title={mockScreens.ticket.title} rows={heroRows} />
    </div>
    <div
      className="rise relative -mt-10 w-[50%] max-w-[220px] sm:-mt-14 lg:-ml-6"
      style={{ animationDelay: "450ms" }}
    >
      <SmsPhone sender={callExample.sms.sender} text={callExample.sms.text} linkLabel={callExample.sms.linkLabel} />
    </div>
    <figcaption className="rise mt-4 text-center text-xs text-muted-foreground lg:text-right" style={{ animationDelay: "650ms" }}>
      {hero.mockLabel}
    </figcaption>
  </figure>
);

export const Hero = () => (
  <section
    id="hero"
    aria-labelledby="hero-titre"
    className="relative overflow-hidden px-4 pb-16 pt-28 md:pt-40 lg:pb-24"
  >
    <div className="container mx-auto grid max-w-6xl items-center gap-12 px-0 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
      <div>
        <p className="rise mb-6 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary md:text-sm">
          {hero.eyebrow}
        </p>

        <h1
          id="hero-titre"
          className="rise font-heading text-[2.6rem] font-extrabold leading-[1.04] text-foreground sm:text-6xl lg:text-[3.4rem] xl:text-[3.9rem]"
          style={{ animationDelay: "60ms" }}
        >
          {hero.titleLine1}
          <br />
          <span className="text-primary">{hero.titleLine2}</span>
        </h1>

        <p className="rise mt-6 max-w-[60ch] text-lg leading-relaxed text-muted-foreground" style={{ animationDelay: "120ms" }}>
          {hero.lead}
        </p>

        <div className="rise mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center" style={{ animationDelay: "180ms" }}>
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

      <HeroProduct />
    </div>
  </section>
);
