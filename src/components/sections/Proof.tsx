import { FocalMark } from "@/components/brand/FocalMark";
import { SectionHeading } from "@/components/SectionHeading";
import { proof } from "@/content/fr";
import type { ProofData } from "@/content/validated";

/**
 * Cas du cabinet en production. Chaque élément (chiffre mesuré, citation
 * signée, extrait de journal) n'apparaît que s'il est rempli dans
 * DONNEES_VALIDEES. Masqué par FLAGS.SHOW_PROOF.
 */
export const Proof = ({ data }: { data: ProofData }) => {
  const hasContent = Boolean(data.metric || data.quote || data.callLog.length);
  if (!hasContent) return null;

  return (
    <section id="preuve" aria-labelledby="preuve-titre" className="px-4 py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-0">
        <SectionHeading id="preuve-titre" eyebrow={proof.eyebrow} title={proof.title} lead={data.practice ?? undefined} />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {data.metric && (
            <div className="card-blue rounded-3xl p-8">
              <p className="font-heading text-5xl font-extrabold text-primary md:text-6xl">{data.metric.value}</p>
              <p className="mt-3 text-base font-semibold text-foreground">{data.metric.label}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {proof.metricSourcePrefix} {data.metric.source}
              </p>
            </div>
          )}
          {data.quote && (
            <figure className="rounded-3xl border border-border bg-card p-8">
              <blockquote className="font-heading text-xl font-semibold leading-snug text-foreground md:text-2xl">
                « {data.quote.text} »
              </blockquote>
              <figcaption className="mt-5 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{data.quote.author}</span>, {data.quote.role}
              </figcaption>
            </figure>
          )}
          {data.callLog.length > 0 && (
            <div className="rounded-3xl border border-border bg-card p-8 lg:col-span-2">
              <p className="mb-4 flex items-center gap-2 font-heading text-sm font-bold text-foreground">
                <FocalMark className="h-4 w-4" />
                {proof.callLogTitle}
              </p>
              <ol className="space-y-2 font-mono text-sm">
                {data.callLog.map((line, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="shrink-0 text-muted-foreground">{line.time}</span>
                    <span className="text-foreground">{line.text}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
