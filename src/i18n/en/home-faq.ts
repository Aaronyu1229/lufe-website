import type { HomeFaqItem } from "@/data/homeFaq";
import type { HomeFaqCopy } from "@/i18n/zh/home-faq";

// Fingerprint of homeFaqZh this English was translated from; registry.test.ts prints the new value when Chinese changes.
export const HOME_FAQ_SOURCE_FINGERPRINT = "770baf5c38fa4542";

export const HOME_FAQ_ITEMS_EN: readonly HomeFaqItem[] = [
  {
    num: "01",
    question: "How much does this cost?",
    answer: "The numbers: Market Test NT$10,000–20,000 (pilot price for the first 10 brands). The Consignment package is NT$50,000–60,000; together they make the NT$70,000 starter package, and the Market Test fee is credited.\nCompany Setup is per project, with a range in the first conversation; Call Center also gets a range in the first conversation.\n\nHonestly: we will not quote first and ask what you need later.\nAt our first meeting, we want to hear how your product sells in Taiwan and why you want to go abroad.\nSometimes, after listening, we suggest that you wait. That is an answer too.",
    takeaway: "Start with the numbers, then one honest answer",
  },
  {
    num: "02",
    question: "How long does it take to see results?",
    answer: "Market Test: once the panel is done, we give you that one page; no need to wait for registration.\nConsignment: product registration takes 6–12 weeks. School activities run during that time, and goods go on shelves when approval comes through.\nCompany Setup: it depends on the company you want to establish and how many people you need; we give a timeline in the first conversation.\nCall Center: first clients expected from Q1 2027; you can register now.\nWe do not say \"delivered in one month\" because we cannot compress registration time.",
    takeaway: "A report after Market Test · product registration takes 6–12 weeks",
  },
  {
    num: "03",
    question: "What if my product is not a fit?",
    answer: "Spending NT$10,000–20,000 to learn that the Philippines does not want your product now is far less costly than learning it after you have spent a great deal to establish locally.\nThe report explains why, and what conditions could change for another try.\nWe want to work with you for longer, not collect one payment.",
    takeaway: "That is one of the most valuable Market Test outcomes",
  },
];

export const homeFaqEn: HomeFaqCopy = {
  title: "Three things you may want to ask first",
  askLabel: "Ask LUFÉ directly →",
  moreLabel: "Other questions?",
  items: HOME_FAQ_ITEMS_EN,
};
