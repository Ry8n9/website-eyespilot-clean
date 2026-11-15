import { EyesPilotLogo } from "@/components/brand/EyesPilotLogo";
import { mockScreens } from "@/content/fr";
import { cn } from "@/lib/utils";

type Row = { label: string; value: string };

type TicketScreenProps = {
  title: string;
  rows: Row[];
  /** Nombre de lignes remplies (les autres restent en attente). Par défaut : toutes. */
  filled?: number;
  className?: string;
};

/**
 * Maquette d'écran : la fiche que reçoit le secrétariat après un appel.
 * Barre d'application, pastille d'état, champs en lignes, horodatage fictif.
 * Purement illustratif (données fictives), aucune interaction.
 */
export const TicketScreen = ({ title, rows, filled = rows.length, className }: TicketScreenProps) => (
  <div className={cn("surface-raised overflow-hidden rounded-2xl text-left", className)}>
    <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/60 px-4 py-2.5">
      <div className="flex min-w-0 items-center gap-2">
        <EyesPilotLogo size={18} interactive={false} />
        <span className="truncate text-xs font-semibold text-foreground">{mockScreens.ticket.app}</span>
      </div>
      <span className="shrink-0 whitespace-nowrap text-[11px] font-medium text-muted-foreground">
        <span className="hidden sm:inline">{mockScreens.ticket.day} </span>
        {mockScreens.ticket.time}
      </span>
    </div>
    <div className="px-5 pb-4 pt-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {mockScreens.ticket.kicker}
          </p>
          <p className="mt-0.5 font-heading text-base font-bold leading-snug text-foreground">{title}</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
          {mockScreens.ticket.status}
        </span>
      </div>
      <dl className="mt-4 divide-y divide-border border-t border-border text-[13px]">
        {rows.map((row, i) => (
          <div key={row.label} className="grid grid-cols-[96px_1fr] gap-3 py-2">
            <dt className="font-medium text-muted-foreground">{row.label}</dt>
            <dd
              className={cn(
                "text-foreground transition-opacity duration-500",
                i < filled ? "opacity-100" : "opacity-0",
              )}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
    <p className="border-t border-border bg-muted/40 px-5 py-2.5 text-[11px] text-muted-foreground">
      {mockScreens.ticket.footer}
    </p>
  </div>
);
