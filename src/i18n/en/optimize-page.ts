import { CTA_LINE_EN } from "@/data/cta";
import type { OptimizePageCopy } from "@/i18n/zh/optimize-page";

// Fingerprint of the Chinese this English was translated from; registry.test.ts prints the new value when Chinese changes.
export const OPTIMIZE_PAGE_SOURCE_FINGERPRINT = "4d3f90f8666cc985";

export const optimizePageEn: OptimizePageCopy = {
  home: "Home",
  services: "Services",
  breadcrumb: "Operations Optimization",
  heroTitle: "You are already running. Now make every mile more efficient.",
  heroScene: "Your product is selling overseas, but profit keeps seeming to disappear, work does not line up, and each month’s decisions feel like guesses. You may be stuck here already—this is not a first-year issue; it comes after you have made it through the first year.",
  heroAction: "Free 30-minute initial assessment →",
  scrollCueLabel: "Scroll down",
  advanced: {
    title: "Advanced ·",
    beforeLink: " Brands that have not started yet should first see the",
    link: "four chapters",
    afterLink: ". This page is for people who have already been operating overseas for a while.",
  },
  painHeading: {
    prefix: "You may already be stuck in",
    highlight: "one of these five areas",
  },
  painPoints: [
    { anchor: "opt-cost", title: "Costs will not come down", scene: "Ocean-freight quotes keep rising, you have no negotiating leverage, warehouse monthly statements are hard to read, and return shipping costs more than the product", action: "We review your logistics statements" },
    { anchor: "opt-sales", title: "Sales are uneven", scene: "Demand surges during holidays and stays low otherwise; orders vanish when advertising stops; return rates and reviews swing sharply", action: "We help identify what is not aligned" },
    { anchor: "opt-find", title: "You are not being found", scene: "Your product is on the shelf, but you do not appear in search, AI answers, or social conversations", action: "We help identify what is missing" },
    { anchor: "opt-system", title: "Operations keep getting stuck", scene: "Taiwan and the local team work the same hours, yet things still do not line up; SOPs are scattered and new people take a long time to get up to speed", action: "We put the process into a system" },
    { anchor: "opt-dashboard", title: "You cannot see it", scene: "Every month you do not know where money is made or leaking, so decisions feel like guesses", action: "Put the numbers on one screen" },
  ],
  cost: {
    imageAlt: "Reviewing logistics and operations data",
    headingPrefix: "Costs will not come down: ",
    headingHighlight: "start with your logistics statements",
    body: "The founder comes from Jumping Freight, backed by 43 years of international logistics. We can see when numbers on a monthly statement should not look the way they do. We reassess transport methods, warehouse location, and return handling.",
    callout: "After the review, we tell you where you can save and whether it is worth changing. If it is not worth changing, we say so directly.",
  },
  sales: {
    headingPrefix: "Sales are uneven: ",
    headingHighlight: "when orders disappear after ads stop, ads are usually not the problem",
    body: "Sales follow holidays, drop when advertising stops, and reviews swing high and low—usually one of three things is misaligned: channel mix, price band, or listing content.\nWe lay out those three things and tell you which one to adjust. We do not run advertising or manage channels in this part; if you need someone to execute, we introduce you.",
    items: ["Channel mix", "Price band", "Listing content"],
  },
  find: {
    imageAlt: "Online-channel and search data",
    headingPrefix: "You are not being found: ",
    headingHighlight: "customers ask AI and AI does not mention you",
    body: "More and more people ask ChatGPT or Perplexity before buying. If AI answers do not include your name, customers do not know you are on the shelf.\nWe do not write or operate this part for you right now. In the first conversation, we help you see what is missing: search, AI answers, or social conversations. If you need someone to do it, we introduce you.",
    callout: "First identify what is missing, then decide whether to spend money.",
  },
  system: {
    headingPrefix: "Operations keep getting stuck: ",
    headingHighlight: "everything is in people’s heads",
    body: "It is nine in the morning in Taiwan and nine in Manila, but things still do not line up—because the process lives in people, not the system. We help introduce an operations system in five steps:",
    steps: ["First, put tasks on one board", "Second, store documents and ways of working as team knowledge", "Third, give repeated tasks to an AI assistant", "Fourth, put numbers on one dashboard", "Fifth, review and improve together every month"],
    callouts: ["The goal is for a new person to know on the first day where things are and how work runs", "If customer complaints and English emails are going unanswered, that belongs to the Call Center chapter."],
  },
  dashboard: {
    headingPrefix: "You cannot see it: ",
    headingHighlight: "you only learn whether you made money after the month ends",
    body: "The fourth step of the operations system is putting logistics, channel, and customer-service numbers on one screen. It is not for appearance; it is so next month’s decisions do not need to be guesses.",
  },
  startHeading: "How to start",
  servicesOffered: [
    {
      title: "Talk first",
      timeline: "30 minutes, no charge",
      details: [
        ["Deliverable", "We listen to your current situation and tell you which part is stuck and whether it is worth changing. Bring your most recent logistics statement for a more accurate review."],
        ["Scope", "Logistics, channels, operations processes, and numbers"],
        ["A fit for", "People who are not sure which part has the problem"],
      ],
    },
    {
      title: "Work by section",
      timeline: "Quote the section you want to change",
      details: [
        ["Deliverable", "Logistics-statement review, operations-system implementation, and dashboards. For channels and customer acquisition, we review the situation and introduce people."],
        ["A fit for", "People who know where they are stuck and want someone to work alongside them"],
      ],
    },
  ],
  faqs: [
    ["Can I use this even if I did not go through the first year with you?", "Yes. The offering on this page stands alone, and in the first conversation we ask about your current situation.", "Yes, the offering stands alone"],
    ["What if I am not sure what kind of problem I have?", "Start with a conversation. We spend 30 minutes listening to your current situation and tell you which part is stuck and where to start changing. Sometimes we will suggest waiting—that is also an answer.", "Talk for 30 minutes before deciding"],
    ["How do you charge?", "The first 30 minutes are free. Once you decide which section to change, we quote that section and give you a range in the first conversation. We do not quote before asking what you need.", "Talk first at no charge; quote the section you change"],
  ],
  faq: {
    title: "Frequently asked questions",
    ask: "Ask us directly →",
    more: "Have another question?",
  },
  closing: {
    title: "Talk about where you are stuck right now",
    line: CTA_LINE_EN,
    action: "Free 30-minute initial assessment →",
  },
};
