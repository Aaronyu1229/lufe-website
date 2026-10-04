import type { HomeJumpingCopy } from "@/i18n/zh/home-jumping";

// Fingerprint of homeJumpingZh this English was translated from; registry.test.ts prints the new value when Chinese changes.
export const HOME_JUMPING_SOURCE_FINGERPRINT = "04d8c2c881e2eb05";

export const homeJumpingEn: HomeJumpingCopy = {
  eyebrow: "Jumping Freight × LUFÉ",
  title: ["From your factory to Philippine shelves,", "one continuous route"],
  intro: "Jumping Freight has handled the first half for 43 years: more than 500 export cases across more than 30 countries. After seeing it for so long, we know exactly where brands get stuck after the container doors open. That is why we started LUFÉ: to handle what happens after the goods arrive.",
  routeAriaLabel: "One route from Taiwan to the Philippines",
  nodes: [
    { title: "Made in Taiwan", note: "Customs & paperwork" },
    { title: "Packed and shipped", note: "Warehousing & consolidation" },
    { title: "At sea", note: "Air & sea freight" },
    { title: "Container opens", note: "LUFÉ starts here" },
    { title: "Market Test", note: "Month 1" },
    { title: "Consignment", note: "Month 3" },
    { title: "Company Setup", note: "Month 9" },
    { title: "Call Center", note: "Every day after" },
  ],
  jumping: { title: "Jumping Freight · Get the goods there", body: "Customs clearance, warehousing, air and sea freight, and the last mile. You do not need to find someone else to ask how the goods get there or roughly what they cost to land." },
  lufe: { title: "LUFÉ · After arrival", body: "We walk Taiwanese brands through their first year in the Philippines. The four steps are below." },
  primaryExit: "See the four chapters below ↓",
  secondaryExit: "Only need to ship goods now? Talk to Jumping Freight ↗",
};
