import { cn } from "@/lib/utils";

/**
 * Repère en cercles concentriques (une mise au point), utilisé comme puce
 * de liste et comme marqueur d'annotation. `rings` règle la netteté :
 * de 1 (un simple anneau) à 3 (l'iris complet, net).
 */
export const FocalMark = ({
  rings = 3,
  className,
  tone = "primary",
}: {
  rings?: 1 | 2 | 3;
  className?: string;
  tone?: "primary" | "light" | "muted";
}) => {
  const color =
    tone === "light"
      ? "hsl(0 0% 100%)"
      : tone === "muted"
        ? "hsl(var(--muted-foreground))"
        : "hsl(var(--primary))";
  return (
    <svg viewBox="0 0 20 20" className={cn("h-5 w-5 shrink-0", className)} aria-hidden="true">
      <circle cx="10" cy="10" r="8.5" fill="none" stroke={color} strokeWidth="1.2" opacity={rings >= 2 ? 0.35 : 0.9} />
      {rings >= 2 && <circle cx="10" cy="10" r="5.5" fill="none" stroke={color} strokeWidth="1.4" opacity="0.7" />}
      {rings >= 3 && <circle cx="10" cy="10" r="2.6" fill={color} />}
    </svg>
  );
};
