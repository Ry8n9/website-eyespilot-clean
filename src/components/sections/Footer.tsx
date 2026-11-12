import { Mail, Phone } from "lucide-react";
import { EyesPilotLogo } from "@/components/brand/EyesPilotLogo";
import { CONTACT } from "@/config";
import { common, footer } from "@/content/fr";
import type { LegalLink } from "@/content/validated";

/** Pied de page : contact ; liens légaux seulement si FLAGS.SHOW_LEGAL_LINKS. */
export const Footer = ({ legalLinks }: { legalLinks: LegalLink[] }) => (
  <footer className="border-t border-border px-4 py-10">
    <div className="container mx-auto flex max-w-6xl flex-col gap-8 px-0 md:flex-row md:items-start md:justify-between">
      <div>
        <p className="flex items-center gap-2 font-heading text-lg font-extrabold text-primary">
          <EyesPilotLogo size={24} interactive={false} />
          {common.brand}
        </p>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">{footer.tagline}</p>
      </div>

      <div>
        <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{footer.contactTitle}</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li>
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
              {CONTACT.email}
            </a>
          </li>
          <li>
            <a
              href={`tel:${CONTACT.phone}`}
              className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary"
            >
              <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
              {CONTACT.phoneDisplay}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div className="container mx-auto mt-10 flex max-w-6xl flex-col gap-3 border-t border-border px-0 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
      <p>
        © {new Date().getFullYear()} {common.brand}
      </p>
      {legalLinks.length > 0 && (
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {legalLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-primary">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  </footer>
);
