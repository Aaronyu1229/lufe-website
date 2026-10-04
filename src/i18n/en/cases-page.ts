import { CTA_LINE_EN } from "@/data/cta";
import type { CasesPageCopy } from "@/i18n/zh/cases-page";

export const casesPageEn: CasesPageCopy = {
  home: "Home",
  breadcrumb: "Cases",
  title: ["Every decision", "has a case to compare"],
  lead: "Taiwanese brands generally take one of three paths overseas. These are cases we have worked on and cases our local Philippine partners have taken themselves. Each one explains the decision that mattered most at the time.",
  scrollCue: "Scroll down",
  roads: [
    { label: "First path", title: "Start from zero", body: "Build from zero in the local market. Our Philippine partners first built an English-language education organization, then built a bubble-tea chain from zero.", lesson: "Finding people is harder than finding a storefront. The first team shapes everything that follows." },
    { label: "Second path", title: "Adjust before taking it overseas", body: "Take a Taiwanese product to the local market and change the formula, price, and packaging.", lesson: "What is good in Taiwan is not necessarily good locally. Let local people pick it up first." },
    { label: "Third path", title: "Take it as is", body: "Keep the product and brand as they are, changing only how the story is told locally. Our local partners have supported Taiwanese beauty brands this way.", lesson: "The brand may stay the same, but how its story is told must change." },
  ],
  filters: { industry: "Industry", market: "Market", countPrefix: "", countSuffix: " cases", empty: "No cases match this combination. Try adjusting the filters." },
  card: { lesson: "What this path taught us", expand: "Expand the story · four sections, 20 seconds →", detail: "The full process and why these decisions were made are in the case page.", readCase: "Read the full case →", compare: "Compare your situation", close: "Close" },
  cta: {
    heading: "Which path could be yours?",
    body: CTA_LINE_EN,
    button: "Book 30 minutes →",
    assessHeading: "Not sure which path is closest?",
    assessBody: "Three questions compare your situation with three cases we have worked on to find the closest one.",
    assessChips: ["Stage", "Hurdle", "Market"],
    assessLabel: "Start the Situation Check",
  },
  detail: {
    breadcrumb: "Cases",
    timelineLabel: "Timeline",
    previousLabel: "Previous",
    nextLabel: "Next",
    defaultTimelineHeading: ["The pace from start to", "finish"],
    defaultCtaHeading: ["Could your product have a", "similar opportunity"],
    defaultCtaSuffix: "?",
    defaultCtaBody: "Every case starts with a conversation. Tell us about your situation, and LUFÉ will explain which part of this story is most relevant to you.",
    defaultCtaSecondary: "Not sure which type fits? Start the 2-minute Situation Check",
    button: "Book 30 minutes →",
    relatedHeading: "More cases",
    relatedReadCase: "Read the full case →",
    backToCases: "Back to all cases",
    stages: {
      "market-assessment": { label: "Month one", title: "Market Test" },
      "product-testing": { label: "Month one", title: "Market Test" },
      "channel-entry": { label: "North America", title: "North America Retail" },
      localization: { label: "Month nine", title: "Company Setup" },
    },
  },
};
