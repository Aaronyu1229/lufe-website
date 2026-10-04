import type { HomeWhyCopy } from "@/i18n/zh/home-why";

// Fingerprint of homeWhyZh this English was translated from; registry.test.ts prints the new value when Chinese changes.
export const HOME_WHY_SOURCE_FINGERPRINT = "19aa4720485500d8";

export const homeWhyEn: HomeWhyCopy = {
  heading: ["Consultants, trading companies, freight forwarders and customer service each handle one part,", "and the owner becomes the only point of contact"],
  lead: "This is what a week often looks like for a business going abroad:",
  weekdays: [
    ["Monday", "The consultant follows up on progress"],
    ["Tuesday", "The trading company follows up on payment"],
    ["Wednesday", "The freight forwarder asks about shipping space"],
    ["Thursday", "Customer service outsourcing asks how to reply to this email"],
  ],
  body: "Each company only takes responsibility for its own part. When progress gets stuck, no one is responsible for connecting it.\nWe put Market Test, Consignment, Company Setup and Call Center in one contract; international logistics goes to Jumping Freight.\nOne point of contact coordinates every part, and you only need one meeting.",
  typeLabel: "Type",
  columns: ["Market Test & Consignment", "Company Setup & Call Center", "International logistics"],
  rows: [
    { type: "Consulting firm", desc: "Produces a strategy report" },
    { type: "Trading company", desc: "Helps sell your goods" },
    { type: "Customer service outsourcing", desc: "Answers your calls" },
    { type: "Freight forwarder", desc: "Gets the goods there" },
    { type: "LUFÉ", desc: "One contract all the way", partner: "Jumping Freight" },
  ],
  coverageTemplates: { covered: "{type} - {desc} covers {column}", partner: "{column} is handled by {partner}", missing: "{type} - {desc} does not cover {column}" },
};
