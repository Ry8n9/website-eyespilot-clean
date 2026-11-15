import { FLAGS } from "@/config";
import { legalPages } from "@/content/fr";
import { LEGAL, type LegalInfo, type LegalLink } from "@/content/validated";

/** Vrai si aucune information légale n'a été fournie. */
export const isLegalBlockEmpty = (legal: LegalInfo) =>
  Object.values(legal).every((v) => v === null || (typeof v === "string" && v.trim() === ""));

/** Liste les lignes renseignées, dans l'ordre donné ; les valeurs vides sont écartées. */
export const filledRows = (rows: { label: string; value: string | null | undefined }[]) =>
  rows.filter((r): r is { label: string; value: string } => Boolean(r.value && r.value.trim()));

/**
 * Liens légaux du pied de page : seulement si FLAGS.SHOW_LEGAL_LINKS et si
 * les pages sont accessibles (bloc LEGAL non vide).
 */
export const footerLegalLinks = (
  legal: LegalInfo = LEGAL,
  show: boolean = FLAGS.SHOW_LEGAL_LINKS,
): LegalLink[] => {
  if (!show || isLegalBlockEmpty(legal)) return [];
  return [legalPages.links.mentions];
};
