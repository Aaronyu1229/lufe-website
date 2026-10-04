import { CTA_LINE_EN } from "@/data/cta";
import type { HomeCtaCopy } from "@/i18n/zh/home-cta";

// Fingerprint of homeCtaZh this English was translated from; registry.test.ts prints the new value when Chinese changes.
export const HOME_CTA_SOURCE_FINGERPRINT = "c5f45e7d4f055b3a";

export const homeCtaEn: HomeCtaCopy = {
  heading: ["Start with an assessment and", "see your next step clearly"],
  line: CTA_LINE_EN,
  primary: "Book your free assessment →",
  secondary: "Not sure yet? Start a 2-minute Situation Check →",
};
