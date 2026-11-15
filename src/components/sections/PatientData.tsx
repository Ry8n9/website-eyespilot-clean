import { FocalMark } from "@/components/brand/FocalMark";
import { SectionHeading } from "@/components/SectionHeading";
import { CONTACT } from "@/config";
import { patientData } from "@/content/fr";

/**
 * Uniquement les deux engagements actuels, en bandeau fin pleine largeur.
 * Aucune affirmation de conformité.
 */
export const PatientData = () => (
  <section id="donnees" aria-labelledby="donnees-titre" className="border-y border-border bg-card px-4 py-10 lg:py-12">
    <div className="container mx-auto grid max-w-6xl items-start gap-8 px-0 lg:grid-cols-[0.7fr_1.3fr] lg:gap-12">
      <div>
        <SectionHeading id="donnees-titre" eyebrow={patientData.eyebrow} title={patientData.title} size="compact" />
        <p className="mt-4 text-sm text-muted-foreground">
          {patientData.contactIntro}{" "}
          <a href={`mailto:${CONTACT.email}`} className="font-medium text-primary underline underline-offset-4">
            {CONTACT.email}
          </a>
        </p>
      </div>
      <ul className="grid gap-6 md:grid-cols-2 md:gap-10">
        {patientData.commitments.map((c) => (
          <li key={c.title} className="flex gap-4">
            <FocalMark className="mt-0.5 h-6 w-6" />
            <div>
              <h3 className="font-heading text-base font-bold text-foreground md:text-lg">{c.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground md:text-base">{c.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
