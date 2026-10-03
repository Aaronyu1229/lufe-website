import type { NavbarCriticalCopy } from "@/i18n/zh/navbar-critical";

// Fingerprint of navbarCriticalZh this English was translated from; registry.test.ts prints the new value when Chinese changes.
export const NAVBAR_CRITICAL_SOURCE_FINGERPRINT = "876e0a61b6e294d2";

export const navbarCriticalEn: NavbarCriticalCopy = {
  brandPrefix: "LUF",
  navItems: [
    { key: "services", label: "Services" },
    { key: "advanced", label: "More" },
    { key: "cases", label: "Case studies" },
    { key: "insights", label: "Insights" },
    { key: "about", label: "About us" },
  ],
  messageBoxTrigger: "Talk about your product →",
  mobileCtaLine: "Your first conversation is free",
  mobileCtaAction: "Talk about your product →",
  insightMenuLabels: {
    byChapter: "Articles by chapter",
    toolsAndResources: "Tools & resources",
    latestArticles: "Latest articles",
  },
};
