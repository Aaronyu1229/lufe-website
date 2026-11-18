// Google demoted lufe.world on 2026-10-28. Added 2026-11-18; remove a slug to make it indexable again.
export const NOINDEX_ARTICLE_SLUGS: ReadonlySet<string> = new Set([
  "tradepilot-tariff-tutorial",
  "us-fda-registration-guide",
  "why-philippines-first",
  "philippines-cpr-transfer-change-importer",
  "amazon-us-three-decisions",
  "market-entry-modes-compared",
  "first-time-export-checklist",
  "philippines-food-cosmetic-label-checklist",
  "us-fda-food-import-fsvp-prior-notice",
  "philippines-market-assessment-deck",
  "philippines-registration-waiting-period",
  "distribution-agreement-clause-checklist",
  "taiwan-products-philippines-barriers",
  "how-to-read-market-research-report",
  "first-year-overseas-small-budget",
  "philippines-ads-not-enough",
  "overseas-market-exit-checklist",
  "overseas-expansion-provider-questions",
]);

export function isNoindexArticle(slug: string): boolean {
  return NOINDEX_ARTICLE_SLUGS.has(slug);
}
