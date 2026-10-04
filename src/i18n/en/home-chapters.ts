import type { HomeChaptersCopy } from "@/i18n/zh/home-chapters";

// Fingerprint of homeChaptersZh this English was translated from; registry.test.ts prints the new value when Chinese changes.
export const HOME_CHAPTERS_SOURCE_FINGERPRINT = "dc1e7ee18d4011b8";

export const homeChaptersEn: HomeChaptersCopy = {
  heading: ["A brand's first year in Manila,", "usually goes like this"],
  lead: "Four chapters, four services. Start with chapter one or go all the way; each is priced independently, and at the end of each one you can decide whether to continue.",
  timelineLabels: ["Month 1", "Month 3", "Month 9", "Every day after"],
  chapters: [
    { label: "Month 1", title: "Market Test", subtitle: "Let real local consumers try your product and find out who will buy and what they will pay", linkLabel: "See how Market Test works →" },
    { label: "Month 3", title: "Consignment", subtitle: "While product registration is under review, move e-commerce listings and market activities forward in parallel", linkLabel: "See the Consignment package →" },
    { label: "Month 9", title: "Company Setup", subtitle: "Register the company, hire staff and handle FDA licensing to establish a local base", linkLabel: "See how Company Setup works →" },
    { label: "Every day after", title: "Call Center", subtitle: "The Philippines is a global center for English-language customer service outsourcing. A local professional team handles English customer service, with quality standards set and managed in Taiwan. First clients expected from Q1 2027.", linkLabel: "Join the first group →" },
  ],
  starterPackage: "NT$70,000 starter package = NT$10,000–20,000 Market Test + NT$50,000–60,000 Consignment package. Pay for Market Test first; if it does not pass, that is where the cost stops; if it does, the fee is credited toward Consignment. The first 10 brands receive the pilot price.",
  northAmerica: { description: "Your product is already established and your goal is North American shelves? That is a different route, run by the North American team", label: "North America Retail" },
};
