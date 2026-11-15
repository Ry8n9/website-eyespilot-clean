import { FocalMark } from "@/components/brand/FocalMark";
import { SectionHeading } from "@/components/SectionHeading";
import { comparison } from "@/content/fr";
import { cn } from "@/lib/utils";

const OURS = comparison.columns.length - 1;

/**
 * Comparaison qualitative, sans prix ni pourcentage. Tableau sur grand
 * écran ; sur mobile, une carte par critère.
 */
export const Comparison = () => (
  <section id="comparaison" aria-labelledby="comparaison-titre" className="px-4 section-y">
    <div className="container mx-auto max-w-6xl px-0">
      <SectionHeading id="comparaison-titre" eyebrow={comparison.eyebrow} title={comparison.title} lead={comparison.lead} />

      {/* Grand écran : vrai tableau */}
      <div className="mt-10 hidden overflow-hidden rounded-3xl surface md:block">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">{comparison.caption}</caption>
          <thead>
            <tr>
              <th scope="col" className="w-[22%] p-5 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {comparison.criterionLabel}
              </th>
              {comparison.columns.map((col, i) => (
                <th
                  key={col}
                  scope="col"
                  className={cn(
                    "p-5 font-heading text-base font-bold",
                    i === OURS ? "bg-primary text-primary-foreground" : "text-foreground",
                  )}
                >
                  <span className="flex items-center gap-2">
                    {i === OURS && <FocalMark tone="light" className="h-4 w-4" />}
                    {col}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.rows.map((row) => (
              <tr key={row.criterion} className="border-t border-border">
                <th scope="row" className="p-5 align-top font-semibold text-foreground">
                  {row.criterion}
                </th>
                {row.values.map((v, i) => (
                  <td
                    key={i}
                    className={cn(
                      "p-5 align-top leading-relaxed",
                      i === OURS ? "bg-primary/[0.06] font-medium text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {v}
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
          <li key={row.criterion} className="rounded-2xl surface p-5">
            <h3 className="font-heading text-base font-bold text-foreground">{row.criterion}</h3>
            <dl className="mt-3 space-y-3 text-sm">
              {row.values.map((v, i) => (
                <div
                  key={i}
                  className={cn(i === OURS && "-mx-2 rounded-xl bg-primary/[0.07] px-2 py-2")}
                >
                  <dt className={cn("text-xs font-semibold", i === OURS ? "text-primary" : "text-muted-foreground")}>
                    {comparison.columns[i]}
                  </dt>
                  <dd className={cn("mt-0.5", i === OURS ? "font-medium text-foreground" : "text-muted-foreground")}>{v}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
