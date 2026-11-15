import { FocalMark } from "@/components/brand/FocalMark";
import { SectionHeading } from "@/components/SectionHeading";
import { patientData } from "@/content/fr";

/** Uniquement les deux engagements actuels. Aucune affirmation de conformité. */
export const PatientData = () => (
  <section id="donnees" aria-labelledby="donnees-titre" className="px-4 section-y">
    <div className="container mx-auto max-w-6xl px-0">
      <div className="rounded-3xl surface p-6 md:p-12">
        <SectionHeading id="donnees-titre" eyebrow={patientData.eyebrow} title={patientData.title} />
        <ul className="mt-8 grid gap-6 md:grid-cols-2 md:gap-10">
          {patientData.commitments.map((c) => (
            <li key={c.title} className="flex gap-4">
              <FocalMark className="mt-1 h-6 w-6" />
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground md:text-xl">{c.title}</h3>
                <p className="mt-1.5 leading-relaxed text-muted-foreground">{c.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
