import { mockScreens } from "@/content/fr";
import { cn } from "@/lib/utils";

type SmsPhoneProps = {
  sender: string;
  text: string;
  linkLabel: string;
  /** Le SMS est arrivé (sinon l'écran attend). Par défaut : oui. */
  received?: boolean;
  className?: string;
};

/**
 * Maquette d'un téléphone en CSS (cadre sombre, écran, encoche) affichant
 * le SMS reçu par le patient. Purement illustratif, aucune interaction.
 */
export const SmsPhone = ({ sender, text, linkLabel, received = true, className }: SmsPhoneProps) => (
  <div
    className={cn(
      "rounded-[2rem] bg-[hsl(var(--ink))] p-2 shadow-[0_2px_4px_hsl(230_25%_15%/0.1),0_28px_56px_-20px_hsl(240_76%_20%/0.45)]",
      className,
    )}
  >
    <div className="relative overflow-hidden rounded-[1.6rem] bg-card">
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-[hsl(var(--ink))]"
      />
      <div className="border-b border-border px-4 pb-2.5 pt-8 text-center">
        <span className="mx-auto mb-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
          {sender.slice(0, 1)}
        </span>
        <p className="text-[12px] font-semibold text-foreground">{sender}</p>
        <p className="text-[10px] text-muted-foreground">{mockScreens.sms.channel}</p>
      </div>
      <div className="min-h-[7.5rem] px-3 py-3">
        <div
          className={cn(
            "max-w-[92%] rounded-2xl rounded-bl-md bg-muted px-3 py-2 text-[12px] leading-snug text-foreground transition-all duration-500",
            received ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
          )}
        >
          {text}
          <span className="mt-1.5 block font-semibold text-primary underline underline-offset-2">{linkLabel}</span>
        </div>
      </div>
    </div>
  </div>
);
