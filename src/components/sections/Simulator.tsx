import { useId, useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { simulator } from "@/content/fr";

const toNumber = (v: string, max: number) => {
  if (v.trim() === "") return null;
  const n = Number(v.replace(",", "."));
  if (!Number.isFinite(n) || n < 0) return null;
  return Math.min(n, max);
};

/** Durée en minutes, formatée « 1 h 05 min » ou « 45 min ». */
export const formatMinutes = (total: number) => {
  const rounded = Math.round(total);
  const h = Math.floor(rounded / 60);
  const m = rounded % 60;
  if (h === 0) return `${m} min`;
  return `${h} h ${String(m).padStart(2, "0")} min`;
};

export const estimateMinutes = (calls: number, minutes: number, share: number) => calls * minutes * (share / 10);

/**
 * Le visiteur saisit lui-même ses chiffres. Aucune valeur par défaut,
 * formule affichée en clair. Masqué par FLAGS.SHOW_SIMULATOR.
 */
export const Simulator = () => {
  const uid = useId();
  const [values, setValues] = useState({ calls: "", minutes: "", share: "" });
  const calls = toNumber(values.calls, 1000);
  const minutes = toNumber(values.minutes, 120);
  const share = toNumber(values.share, 10);
  const ready = calls !== null && minutes !== null && share !== null;

  const field = (key: keyof typeof values, max: number, step: string) => (
    <div>
      <label htmlFor={`${uid}-${key}`} className="block text-sm font-semibold text-foreground">
        {simulator.fields[key].label}
      </label>
      <p id={`${uid}-${key}-aide`} className="mt-0.5 text-xs text-muted-foreground">
        {simulator.fields[key].hint}
      </p>
      <input
        id={`${uid}-${key}`}
        type="number"
        inputMode="decimal"
        min={0}
        max={max}
        step={step}
        value={values[key]}
        aria-describedby={`${uid}-${key}-aide`}
        onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
        className="mt-2 h-12 w-full rounded-xl border border-input bg-background px-4 text-base text-foreground"
      />
    </div>
  );

  return (
    <section id="simulateur" aria-labelledby="simulateur-titre" className="px-4 section-y">
      <div className="container mx-auto max-w-6xl px-0">
        <SectionHeading id="simulateur-titre" eyebrow={simulator.eyebrow} title={simulator.title} lead={simulator.lead} />
        <div className="mt-10 grid gap-6 rounded-3xl surface p-6 md:p-10 lg:grid-cols-[1fr_0.9fr] lg:gap-12">
          <div className="space-y-6">
            {field("calls", 1000, "1")}
            {field("minutes", 120, "0.5")}
            {field("share", 10, "1")}
          </div>
          <div className="card-blue flex flex-col justify-between gap-6 rounded-2xl p-6 md:p-8" aria-live="polite">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {simulator.formulaLabel}
              </p>
              <p className="mt-2 text-sm text-foreground">{simulator.formula}</p>
              {ready && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {calls} × {minutes} min × {share}/10
                </p>
              )}
            </div>
            <div>
              {ready ? (
                <>
                  <p className="text-sm font-semibold text-foreground">{simulator.resultLabel}</p>
                  <p className="mt-1 font-heading text-4xl font-extrabold text-primary md:text-5xl">
                    {formatMinutes(estimateMinutes(calls, minutes, share))}
                  </p>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">{simulator.empty}</p>
              )}
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">{simulator.disclaimer}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
