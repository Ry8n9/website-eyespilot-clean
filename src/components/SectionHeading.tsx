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
  <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
    {eyebrow && (
      <p
        className={cn(
          "mb-4 text-xs font-medium uppercase tracking-[0.2em]",
          tone === "light" ? "text-white/75" : "text-primary",
        )}
      >
        {eyebrow}
      </p>
    )}
    <h2
      id={id}
      className={cn(
        "font-heading text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.08]",
        tone === "light" ? "text-white" : "text-foreground",
      )}
    >
      {title}
    </h2>
    {lead && (
      <p
        className={cn(
          "mt-5 max-w-[60ch] text-lg leading-relaxed",
          tone === "light" ? "text-white/80" : "text-muted-foreground",
        )}
      >
        {lead}
      </p>
    )}
  </div>
);
