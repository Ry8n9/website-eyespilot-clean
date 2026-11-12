import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "default" | "light";
  className?: string;
};

/** Surtitre, titre de section (h2) et chapeau, avec la même échelle partout. */
export const SectionHeading = ({
  id,
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "default",
  className,
}: SectionHeadingProps) => (
  <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
    {eyebrow && (
      <p
        className={cn(
          "mb-3 text-sm font-semibold uppercase tracking-[0.14em]",
          tone === "light" ? "text-white/75" : "text-primary",
        )}
      >
        {eyebrow}
      </p>
    )}
    <h2
      id={id}
      className={cn(
        "font-heading text-3xl font-bold leading-[1.15] tracking-tight md:text-[2.5rem]",
        tone === "light" ? "text-white" : "text-foreground",
      )}
    >
      {title}
    </h2>
    {lead && (
      <p
        className={cn(
          "mt-4 text-base leading-relaxed md:text-lg",
          tone === "light" ? "text-white/80" : "text-muted-foreground",
        )}
      >
        {lead}
      </p>
    )}
  </div>
);
