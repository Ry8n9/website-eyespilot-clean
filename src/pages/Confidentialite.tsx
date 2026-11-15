import { LegalLayout, LegalRows, LegalSection } from "@/components/LegalLayout";
import { legalPages } from "@/content/fr";
import type { LegalInfo } from "@/content/validated";
import { filledRows } from "@/lib/legal";

/**
 * Confidentialité : décrit uniquement ce que le site fait réellement,
 * vérifié dans le code (voir src/test/privacy.test.tsx). Les sections
 * qui dépendent du bloc LEGAL sont masquées tant qu'il est incomplet.
 */
const Confidentialite = ({ legal }: { legal: LegalInfo }) => {
  const t = legalPages.privacy;
  const owner = filledRows([
    { label: t.owner.name, value: legal.name },
    { label: t.owner.email, value: legal.email },
  ]);

  return (
    <LegalLayout title={t.title}>
      {owner.length > 0 && (
        <LegalSection title={t.owner.title}>
          <LegalRows rows={owner} />
        </LegalSection>
      )}
      {t.facts.map((fact) => (
        <LegalSection key={fact.title} title={fact.title}>
          {fact.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </LegalSection>
      ))}
      {legal.host?.name.trim() && (
        <LegalSection title={t.host.title}>
          <p>
            {t.host.intro} <span className="text-foreground">{legal.host.name}</span>.
          </p>
        </LegalSection>
      )}
    </LegalLayout>
  );
};

export default Confidentialite;
