import type { NavbarMenuCopy } from "@/i18n/zh/navbar-menu";

// Fingerprint of navbarMenuZh this English was translated from; registry.test.ts prints the new value when Chinese changes.
export const NAVBAR_MENU_SOURCE_FINGERPRINT = "4dc25c64e80a9c6e";

export const navbarMenuEn: NavbarMenuCopy = {
  header: {
    skipToContent: "Skip to main content",
    navAriaLabel: "Main navigation",
    mobileMenuOpen: "Open menu",
    mobileMenuClose: "Close menu",
    backToTop: "Back to top",
  },
  services: {
    marketTest: "Market Test",
    consignment: "Consignment",
    companySetup: "Company Setup",
    callCenter: "Call Center",
    northAmericaRetail: "North America Retail",
    allFourChapters: "All four chapters",
    featuredTitle: "Not sure where to start?",
    featuredBody: "Start with Market Test; let real local consumers' responses decide what comes next",
    featuredAction: "See how Market Test works",
  },
  advanced: {
    operationsOptimization: "Operations Optimization",
    lufeMethod: "The LUFÉ Method",
    methodDescription: "A gradual way abroad · ask the market first, then invest",
    situationCheck: "2-minute Situation Check",
    featuredTitle: "Free initial assessment",
    featuredBody: "30 minutes, using five questions from The LUFÉ Method to assess your conditions for overseas expansion",
    featuredAction: "Book your free assessment →",
  },
  cases: {
    items: {
      "goat-milk-soap-global": { num: "North America", title: "How can North American buyers understand a Taiwanese goat milk soap brand?" },
      "fish-floss-us-fda": { num: "FDA", title: "What is the first hurdle for a Taiwanese fish floss brand entering the United States?" },
      "bubble-tea": { num: "More than ten", title: "How did a bubble tea brand grow from zero to more than ten stores in the Philippines?" },
    },
    allCases: "View all case studies →",
    tags: ["Food", "Electronics", "Apparel", "Beverages"],
    markets: ["North America", "Southeast Asia"],
    featuredTitle: "Not sure which path fits?",
    featuredBody: "2-minute Situation Check to find the closest case",
    featuredAction: "Start the Situation Check",
  },
  insights: {
    chapters: {
      m1: { title: "Market Test", month: "Month 1" },
      m3: { title: "Consignment", month: "Month 3" },
      m9: { title: "Company Setup", month: "Month 9" },
      after: { title: "Call Center", month: "Every day after" },
      na: { title: "North America Retail" },
    },
    fallbackDescription: "Articles are being prepared. See the service overview first →",
    allArticles: "View all articles →",
    subsidiesAndResources: "Subsidies & resources",
    subsidyDescription: "Government subsidy guide",
    tradePilotDescription: "Online tariff lookup tool",
  },
  about: {
    items: ["Brand story", "Team", "Partner network", "Brand philosophy"],
    founderColumn: "Founder's Column",
    founderDescription: "First-hand observations on cross-border markets, channels and regulations",
    founderAction: "Read the column",
  },
};
