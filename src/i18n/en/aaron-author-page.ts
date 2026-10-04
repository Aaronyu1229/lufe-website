import { CTA_LINE_EN } from "@/data/cta";
import type { AaronAuthorPageCopy } from "@/i18n/zh/aaron-author-page";

// Fingerprint of aaronAuthorPageZh this English was translated from; registry.test.ts prints the value after the first run.
export const AARON_AUTHOR_PAGE_SOURCE_FINGERPRINT = "2b513868d24e996c";

export const aaronAuthorPageEn: AaronAuthorPageCopy = {
  home: "Home",
  about: "About LUFÉ",
  founderLine: "LUFÉ founder · from Jumping Freight",
  intro: "The founder comes from Jumping Freight, backed by 43 years of international logistics. Freight forwarders get goods there; the story starts after arrival. This column is about what happens next.\nA Taiwanese brand’s first year in the Philippines: Market Test, Consignment, and Company Setup. North America Retail is a separate path. You may already be stuck on one of these steps; there is likely an article about it here.",
  articleCountPrefix: "Articles ",
  articleCountSuffix: "",
  latestUpdatePrefix: "Latest update ",
  articleHeading: "Founder’s Column",
  emptyArticles: "No English articles are available yet.",
  cta: {
    heading: "Still not sure where you are stuck?",
    body: CTA_LINE_EN,
    button: "Book 30 minutes →",
    secondary: "Not sure which type fits? Start the 2-minute Situation Check",
  },
};
