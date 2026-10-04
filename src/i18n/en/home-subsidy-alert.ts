import type { HomeSubsidyAlertCopy } from "@/i18n/zh/home-subsidy-alert";

// Fingerprint of homeSubsidyAlertZh this English was translated from; registry.test.ts prints the new value when Chinese changes.
export const HOME_SUBSIDY_ALERT_SOURCE_FINGERPRINT = "3011e73108fb8246";

export const homeSubsidyAlertEn: HomeSubsidyAlertCopy = {
  ariaLabel: "Limited-time government funding",
  marketExpansion: {
    badge: "Open",
    title: "Overseas channel development subsidy closes 2026/10/30 18:00",
    description: "Up to NT$5,000,000 per company, up to NT$20,000,000 for joint applications, or until funding is exhausted",
  },
  ecommerce: {
    badge: "Buyer Direct",
    title: "Buyer Direct accepts applications through 2027/9/15",
    description: "Bring overseas buyers to Taiwan for procurement discussions, up to NT$200,000 per company, or until funding is exhausted",
  },
  verifiedPrefix: "Verified: ",
  primaryCta: "See application details",
  secondaryCta: "Or start a 2-minute Situation Check",
};
