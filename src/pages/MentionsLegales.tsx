import { LegalLayout, LegalRows, LegalSection } from "@/components/LegalLayout";
import { legalPages } from "@/content/fr";
import type { LegalInfo } from "@/content/validated";
import { filledRows } from "@/lib/legal";

/**
 * Mentions légales, alimentées uniquement par le bloc LEGAL.
 * Une section sans donnée n'est pas rendue.
 */
const MentionsLegales = ({ legal }: { legal: LegalInfo }) => {
  const t = legalPages.mentions;
  const publisher = filledRows([
    { label: t.publisher.name, value: legal.name },
    { label: t.publisher.legalForm, value: legal.legalForm },
    { label: t.publisher.siren, value: legal.siren },
    { label: t.publisher.address, value: legal.address },
  ]);
  const host = legal.host
    ? filledRows([
        { label: t.host.name, value: legal.host.name },
        { label: t.host.address, value: legal.host.address },
        { label: t.host.contact, value: legal.host.contact },
      ])
    : [];

  return (
    <LegalLayout title={t.title}>
      {publisher.length > 0 && (
        <LegalSection title={t.publisher.title}>
          <p>{t.publisher.intro}</p>
          <LegalRows rows={publisher} />
        </LegalSection>
      )}
      {legal.publicationDirector?.trim() && (
        <LegalSection title={t.director.title}>
          <p className="text-foreground">{legal.publicationDirector}</p>
        </LegalSection>
      )}
      {host.length > 0 && (
        <LegalSection title={t.host.title}>
          <p>{t.host.intro}</p>
          <LegalRows rows={host} />
        </LegalSection>
      )}
      {legal.email?.trim() && (
        <LegalSection title={t.contact.title}>
          <p>{t.contact.intro}</p>
          <p>
            <a href={`mailto:${legal.email}`} className="font-medium text-primary underline underline-offset-4">
              {legal.email}
            </a>
          </p>
        </LegalSection>
      )}
    </LegalLayout>
  );
};

export default MentionsLegales;
