import { FocalMark } from "@/components/brand/FocalMark";
import { CallButton } from "@/components/CallButton";
import { SectionHeading } from "@/components/SectionHeading";
import { offers } from "@/content/fr";
import type { Offer } from "@/content/validated";

type OffersProps = {
  pack: Offer;
  voiceAgent: Offer;
  /** FLAGS.SHOW_PRICES */
  showPrices: boolean;
  /** Texte validé du bloc « Votre risque », affiché seulement si FLAGS.SHOW_GUARANTEE. */
  riskReversal: string | null;
};

const Price = ({ offer, showPrices, large }: { offer: Offer; showPrices: boolean; large?: boolean }) =>
  showPrices && offer.prices.length > 0 ? (
    <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      {offer.prices.map((p) => (
        <span key={p.amount + p.label} className="whitespace-nowrap">
          <span
            className={
              large
                ? "font-heading text-4xl font-extrabold text-foreground"
                : "font-heading text-xl font-bold text-foreground"
            }
          >
            {p.amount}
          </span>
          {p.label && <span className="ml-1 text-sm text-muted-foreground">{p.label}</span>}
        </span>
      ))}
    </p>
  ) : (
    <p className={large ? "font-heading text-lg font-semibold text-foreground" : "text-sm font-semibold text-foreground"}>
      {offers.priceOnCall}
    </p>
  );

/**
 * Le pack en carte principale, l'agent vocal seul en ligne secondaire :
 * pas de grille de tarifs. Contenu et prix viennent de DONNEES_VALIDEES.
 */
export const Offers = ({ pack, voiceAgent, showPrices, riskReversal }: OffersProps) => (
  <section id="offres" aria-labelledby="offres-titre" className="px-4 py-16 md:py-24">
    <div className="container mx-auto max-w-6xl px-0">
      <SectionHeading id="offres-titre" eyebrow={offers.eyebrow} title={offers.title} lead={offers.lead} />

      <article
        aria-labelledby="offre-pack"
        className="relative mt-10 overflow-hidden rounded-3xl border-2 border-primary bg-card p-6 shadow-xl shadow-primary/10 md:p-10"
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary-foreground">
              {offers.recommended}
            </p>
            <h3 id="offre-pack" className="font-heading text-2xl font-extrabold text-foreground md:text-3xl">
              {pack.name}
            </h3>
            <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">{offers.packPitch}</p>
            <div className="mt-6">
              <Price offer={pack} showPrices={showPrices} large />
            </div>
            <CallButton placement="offre-pack" className="mt-6" />
          </div>
          <div className="card-blue rounded-2xl p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{offers.includesLabel}</p>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {pack.includes.map((item) => (
                <li key={item} className="flex items-center gap-3 font-heading text-base font-bold text-foreground">
                  <FocalMark className="h-5 w-5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>

      <article
        aria-labelledby="offre-agent"
        className="mt-5 flex flex-col gap-5 rounded-3xl border border-border bg-card p-6 md:flex-row md:items-center md:justify-between md:p-8"
      >
        <div>
          <h3 id="offre-agent" className="font-heading text-lg font-bold text-foreground md:text-xl">
            {voiceAgent.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{offers.voiceAgentPitch}</p>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <Price offer={voiceAgent} showPrices={showPrices} />
          <CallButton placement="offre-agent" size="sm" className="self-start px-5 md:self-end" />
        </div>
      </article>

      {riskReversal && (
        <div className="mt-5 rounded-3xl border border-dashed border-primary/40 p-6 md:p-8">
          <h3 className="font-heading text-lg font-bold text-foreground">{offers.riskTitle}</h3>
          <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">{riskReversal}</p>
        </div>
      )}
    </div>
  </section>
);
