import { FocalMark } from "@/components/brand/FocalMark";
import { SectionHeading } from "@/components/SectionHeading";
import { comparison } from "@/content/fr";
import { cn } from "@/lib/utils";

const OURS = comparison.columns.length - 1;

/**
 * Comparaison qualitative, sans prix ni pourcentage, sur fond bleuté.
 * Grand écran : vrai tableau, la colonne EyesPilot est surélevée (carte
 * en arrière-plan, bord lumineux), les autres en retrait. Chaque cellule
 * porte un repère focal en plus du texte. Mobile : une carte par critère.
 */
export const Comparison = () => (
  <section id="comparaison" aria-labelledby="comparaison-titre" className="tint-band px-4 section-y">
    <div className="container mx-auto max-w-6xl px-0">
      <SectionHeading id="comparaison-titre" eyebrow={comparison.eyebrow} title={comparison.title} lead={comparison.lead} />

      {/* Grand écran */}
      <div className="relative mt-12 hidden md:block">
        <div
          aria-hidden="true"
          className="surface-raised absolute -bottom-3 -top-3 right-0 w-[30%] rounded-3xl !border-primary/40 shadow-[0_0_0_4px_hsl(var(--primary)/0.08)]"
        />
        <table className="relative w-full table-fixed border-collapse text-left text-sm">
          <caption className="sr-only">{comparison.caption}</caption>
          <colgroup>
            <col className="w-[22%]" />
            <col className="w-[24%]" />
            <col className="w-[24%]" />
            <col className="w-[30%]" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" className="px-5 pb-4 pt-6 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {comparison.criterionLabel}
              </th>
              {comparison.columns.map((col, i) => (
                <th
                  key={col}
                  scope="col"
                  className={cn(
                    "px-5 pb-4 pt-6 font-heading text-base font-bold",
                    i === OURS ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <span className="flex items-center gap-2">
                    {i === OURS && <FocalMark className="h-5 w-5" />}
                    {col}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.rows.map((row) => (
              <tr key={row.criterion}>
                <th scope="row" className="border-t border-[hsl(var(--card-blue-border))] p-5 align-top font-semibold text-foreground">
                  {row.criterion}
                </th>
                {row.values.map((v, i) => (
                  <td
                    key={i}
                    className={cn(
                      "border-t p-5 align-top leading-relaxed",
                      i === OURS
                        ? "border-border font-medium text-foreground"
                        : "border-[hsl(var(--card-blue-border))] text-muted-foreground",
                    )}
                  >
                    <span className="flex gap-2.5">
                      <FocalMark
                        rings={i === OURS ? 3 : 1}
                        tone={i === OURS ? "primary" : "muted"}
                        className={cn("mt-0.5 h-4 w-4", i !== OURS && "opacity-60")}
                      />
                      <span>{v}</span>
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile : une carte par critère */}
      <ul className="mt-8 space-y-4 md:hidden">
        {comparison.rows.map((row) => (
          <li key={row.criterion} className="surface rounded-3xl p-5">
            <h3 className="font-heading text-base font-bold text-foreground">{row.criterion}</h3>
            <dl className="mt-3 space-y-3 text-sm">
              {row.values.map((v, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex gap-2.5",
                    i === OURS && "-mx-2 rounded-2xl border border-primary/30 bg-primary/[0.06] px-2 py-2",
                  )}
                >
                  <FocalMark
                    rings={i === OURS ? 3 : 1}
                    tone={i === OURS ? "primary" : "muted"}
                    className={cn("mt-0.5 h-4 w-4", i !== OURS && "opacity-60")}
                  />
                  <div>
                    <dt className={cn("text-xs font-semibold", i === OURS ? "text-primary" : "text-muted-foreground")}>
                      {comparison.columns[i]}
                    </dt>
                    <dd className={cn("mt-0.5", i === OURS ? "font-medium text-foreground" : "text-muted-foreground")}>{v}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
