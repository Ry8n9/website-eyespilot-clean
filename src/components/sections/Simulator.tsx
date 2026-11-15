import { useEffect, useId, useRef, useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { simulator } from "@/content/fr";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

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

/** Valeur affichée qui rejoint la cible en douceur (immédiate si mouvement réduit). */
const useEased = (target: number | null, reduced: boolean) => {
  const [value, setValue] = useState(target ?? 0);
  const from = useRef(target ?? 0);

  useEffect(() => {
    if (target === null) return;
    if (reduced || typeof window.requestAnimationFrame !== "function") {
      from.current = target;
      setValue(target);
      return;
    }
    const start = performance.now();
    const origin = from.current;
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / 450, 1);
      const eased = 1 - (1 - t) ** 3;
      const v = origin + (target - origin) * eased;
      from.current = v;
      setValue(v);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, reduced]);

  return value;
};

/** Jauge circulaire en iris : la part confiée, sur 10 (le chiffre du visiteur). */
const ShareGauge = ({ share }: { share: number | null }) => {
  const r = 52;
  const c = 2 * Math.PI * r;
  const p = share === null ? 0 : share / 10;
  return (
    <svg viewBox="0 0 128 128" className="h-20 w-20 shrink-0 sm:h-28 sm:w-28 md:h-32 md:w-32" aria-hidden="true">
      <circle cx="64" cy="64" r={r} fill="none" stroke="hsl(var(--primary) / 0.12)" strokeWidth="10" />
      <circle
        cx="64"
        cy="64"
        r={r}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - p)}
        transform="rotate(-90 64 64)"
        style={{ transition: "stroke-dashoffset 450ms ease-out" }}
      />
      <circle cx="64" cy="64" r="30" fill="hsl(var(--primary))" opacity={share === null ? 0.15 : 1} />
      <g stroke="hsl(var(--primary-foreground))" strokeLinecap="round" opacity={share === null ? 0.5 : 1}>
        <circle cx="64" cy="64" r="21" fill="none" strokeWidth="2.5" opacity="0.9" />
        <line x1="64" y1="64" x2="64" y2="43" strokeWidth="3" />
        <line x1="64" y1="64" x2="82.2" y2="74.5" strokeWidth="3" />
        <line x1="64" y1="64" x2="45.8" y2="74.5" strokeWidth="3" />
      </g>
      <circle cx="64" cy="64" r="6" fill="hsl(var(--primary-foreground))" />
    </svg>
  );
};

/**
 * Le visiteur saisit lui-même ses chiffres. Aucune valeur par défaut,
 * formule affichée en clair, unités visibles.
 */
export const Simulator = () => {
  const uid = useId();
  const reduced = useReducedMotion();
  const [values, setValues] = useState({ calls: "", minutes: "", share: "" });
  const calls = toNumber(values.calls, 1000);
  const minutes = toNumber(values.minutes, 120);
  const share = toNumber(values.share, 10);
  const ready = calls !== null && minutes !== null && share !== null;
  const result = ready ? estimateMinutes(calls, minutes, share) : null;
  const shown = useEased(result, reduced);

  const field = (key: keyof typeof values, max: number, step: string) => (
    <div>
      <label htmlFor={`${uid}-${key}`} className="block font-semibold text-foreground">
        {simulator.fields[key].label}
      </label>
      <p id={`${uid}-${key}-aide`} className="mt-0.5 text-sm text-muted-foreground">
        {simulator.fields[key].hint}
      </p>
      <div className="relative mt-3">
        <input
          id={`${uid}-${key}`}
          type="number"
          inputMode="decimal"
          min={0}
          max={max}
          step={step}
          value={values[key]}
          aria-describedby={`${uid}-${key}-aide ${uid}-${key}-unite`}
          onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
          className="h-14 w-full rounded-2xl [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none border border-input bg-background pl-5 pr-28 font-heading text-xl font-bold text-foreground shadow-[inset_0_1px_2px_hsl(230_25%_15%/0.05)] transition-colors hover:border-primary/40 focus:border-primary"
        />
        <span
          id={`${uid}-${key}-unite`}
          className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground"
        >
          {simulator.units[key]}
        </span>
      </div>
    </div>
  );

  return (
    <section id="simulateur" aria-labelledby="simulateur-titre" className="px-4 section-y">
      <div className="container mx-auto max-w-6xl px-0">
        <SectionHeading id="simulateur-titre" eyebrow={simulator.eyebrow} title={simulator.title} lead={simulator.lead} />
        <div className="surface mt-10 grid gap-8 rounded-3xl p-6 md:p-10 lg:grid-cols-[1fr_0.95fr] lg:gap-12">
          <div className="space-y-7">
            {field("calls", 1000, "1")}
            {field("minutes", 120, "0.5")}
            {field("share", 10, "1")}
          </div>
          <div className="card-blue flex flex-col gap-6 rounded-3xl p-6 md:p-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{simulator.formulaLabel}</p>
              <p className="mt-2 text-sm text-foreground">{simulator.formula}</p>
              {ready && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {calls} × {minutes} min × {share}/10
                </p>
              )}
            </div>
            <div className="flex flex-1 items-center gap-4 sm:gap-6">
              <ShareGauge share={share} />
              <div aria-live="polite">
                {ready ? (
                  <>
                    <p className="text-sm font-semibold text-foreground">{simulator.resultLabel}</p>
                    <p className="sr-only">{formatMinutes(result ?? 0)}</p>
                    <p
                      aria-hidden="true"
                      className="mt-1 font-heading text-4xl font-extrabold tabular-nums text-primary md:text-5xl"
                    >
                      {formatMinutes(shown)}
                    </p>
                  </>
                ) : (
                  <p className="text-sm leading-relaxed text-muted-foreground">{simulator.empty}</p>
                )}
              </div>
            </div>
            <p className="border-t border-[hsl(var(--card-blue-border))] pt-4 text-xs leading-relaxed text-muted-foreground">
              {simulator.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
