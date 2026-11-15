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
 * Une seule carte : le pack en tête (plus profond : dégradé fin, halo,
 * liste plus grande), l'agent vocal seul en ligne visuelle en dessous.
 * Contenu et prix viennent uniquement de DONNEES_VALIDEES ; la liste
 * « Inclus » est masquée tant qu'elle est vide.
 */
export const Offers = ({ pack, voiceAgent, showPrices, riskReversal }: OffersProps) => (
  <section id="offres" aria-labelledby="offres-titre" className="px-4 section-y">
    <div className="container mx-auto max-w-6xl px-0">
      <SectionHeading id="offres-titre" eyebrow={offers.eyebrow} title={offers.title} lead={offers.lead} />

      <div className="relative mt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-6 -top-10 bottom-1/3 rounded-[3rem] bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.16),transparent_70%)] blur-2xl"
        />
        <div className="surface-raised relative overflow-hidden rounded-[2rem] !border-primary/50 shadow-[0_0_0_1px_hsl(var(--primary)/0.15),0_40px_80px_-32px_hsl(var(--primary)/0.45)]">
          <article
            aria-labelledby="offre-pack"
            className="bg-[linear-gradient(160deg,hsl(var(--card))_0%,hsl(230_60%_98%)_55%,hsl(230_60%_95%)_100%)] p-6 md:p-10"
          >
            <div className={pack.includes.length > 0 ? "grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12" : ""}>
              <div>
                <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary-foreground shadow-[0_6px_16px_-6px_hsl(var(--primary)/0.6)]">
                  {offers.recommended}
                </p>
                <h3 id="offre-pack" className="font-heading text-3xl font-extrabold text-foreground md:text-4xl">
                  {pack.name}
                </h3>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">{offers.packPitch}</p>
                <div className="mt-8">
                  <Price offer={pack} showPrices={showPrices} large />
                </div>
                <CallButton placement="offre-pack" className="mt-6" />
              </div>
              {pack.includes.length > 0 && (
                <div className="surface rounded-3xl p-6 lg:px-8">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{offers.includesLabel}</p>
                  <ul className="mt-3 divide-y divide-border">
                    {pack.includes.map((item) => (
                      <li key={item.title} className="flex gap-4 py-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/[0.08]">
                          <FocalMark className="h-5 w-5" />
                        </span>
                        <div>
                          <h4 className="font-heading text-lg font-bold text-foreground">{item.title}</h4>
                          {item.description && (
                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                  {pack.conditions && (
                    <p className="mt-2 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
                      {pack.conditions}
                    </p>
                  )}
                </div>
              )}
            </div>
          </article>

          <article
            aria-labelledby="offre-agent"
            className="flex flex-col gap-5 border-t border-border bg-card/80 p-6 md:flex-row md:items-center md:justify-between md:px-10 md:py-7"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background">
                <FocalMark rings={2} className="h-5 w-5" />
              </span>
              <div>
                <h3 id="offre-agent" className="font-heading text-lg font-bold text-foreground md:text-xl">
                  {voiceAgent.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground md:text-base">{offers.voiceAgentPitch}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <Price offer={voiceAgent} showPrices={showPrices} />
              <CallButton placement="offre-agent" size="sm" className="self-start px-5 md:self-end" />
            </div>
          </article>
        </div>
      </div>

      {riskReversal && (
        <div className="mt-6 rounded-3xl border border-dashed border-primary/40 p-6 md:p-8">
          <h3 className="font-heading text-lg font-bold text-foreground">{offers.riskTitle}</h3>
          <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">{riskReversal}</p>
        </div>
      )}
    </div>
  </section>
);
