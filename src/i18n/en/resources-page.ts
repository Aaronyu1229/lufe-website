import type { ResourcesPageCopy } from "@/i18n/zh/resources-page";

// Fingerprint of resourcesPageZh this English was translated from; registry.test.ts prints the value after the first run.
export const RESOURCES_PAGE_SOURCE_FINGERPRINT = "95c19b4c44dfbf84";

export const resourcesPageEn: ResourcesPageCopy = {
  metadata: {
    title: "Resources · Overseas subsidies and tools",
    description: "Open government subsidies for overseas expansion, cases, practical articles, and a comparison tool—one place to see resources that can support your expansion.",
  },
  home: "Home",
  breadcrumb: "Resources",
  title: ["Overseas expansion resources,", "subsidies and tools in one place"],
  lead: "Government subsidies can reduce the cost of expansion. Cases, articles, and a comparison tool provide a basis for decisions. Each one connects directly to LUFÉ's services.",
  scrollCue: "Scroll down",
  subsidies: {
    heading: "Government subsidies for overseas expansion",
    lead: "Plans related to overseas expansion from the International Trade Administration, Ministry of Economic Affairs, and Small and Medium Enterprise and Startup Administration, organized by who they fit, what they cover, and how to apply.",
    columns: ["No.", "Program", "Agency", "Amount", "Timeline"],
    action: "See the full subsidy guide →",
  },
  explore: {
    heading: ["Before making a decision,", "you can also look at these"],
    items: [
      { href: "/cases", eyebrow: "Cases", title: "Work we have actually done", description: "The full process for each case: where it got stuck, how we decided, and what happened next", action: "See cases →" },
      { href: "/insights", eyebrow: "Insights and guides", title: "Practical articles on markets and regulations", description: "Analysis and practical guides organized by expansion stage", action: "Read articles →" },
      { href: "/assess", eyebrow: "Situation Check", title: "Find the case most like yours in 2 minutes", description: "Three questions compare your situation with cases we have worked on and the decision methods used then", action: "Start the Situation Check →" },
      { href: "https://tradepiloter.com", eyebrow: "TradePilot", title: "Online tariff lookup tool", description: "Developed by LUFÉ. Check tariff classifications before exporting.", action: "Go to TradePilot ↗", external: true, externalAriaLabel: "Go to TradePilot (opens in a new tab)" },
    ],
  },
};
