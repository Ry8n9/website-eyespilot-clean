import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { calendlyUrl } from "@/config";
import { common } from "@/content/fr";
import { cn } from "@/lib/utils";

type CallButtonProps = {
  /** Emplacement sur la page, transmis à Calendly en utm_content. */
  placement: string;
  label?: string;
  size?: "sm" | "lg";
  tone?: "primary" | "light";
  className?: string;
  onClick?: () => void;
  tabIndex?: number;
};

/** L'unique appel à l'action du site : réserver un appel (Calendly). */
export const CallButton = ({
  placement,
  label = common.cta,
  size = "lg",
  tone = "primary",
  className,
  onClick,
  tabIndex,
}: CallButtonProps) => (
  <Button
    asChild
    size={size}
    className={cn(
      "rounded-full font-semibold",
      size === "lg" && "h-auto text-base pl-7 pr-6 py-4",
      tone === "primary" && "shadow-xl shadow-primary/20",
      tone === "light" && "bg-white text-primary hover:bg-white/90 shadow-lg",
      className,
    )}
  >
    <a href={calendlyUrl(placement)} target="_blank" rel="noopener noreferrer" onClick={onClick} tabIndex={tabIndex}>
      {label}
      <span className="sr-only"> {common.newTab}</span>
      {size === "lg" && <ArrowRight className="h-5 w-5" aria-hidden="true" />}
    </a>
  </Button>
);
