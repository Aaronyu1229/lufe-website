import type { HomeCasesCopy } from "@/i18n/zh/home-cases";

// Fingerprint of homeCasesZh this English was translated from; registry.test.ts prints the new value when Chinese changes.
export const HOME_CASES_SOURCE_FINGERPRINT = "bd6d12b916fa67d7";

export const homeCasesEn: HomeCasesCopy = {
  heading: ["Use data to choose direction,", "use experience to adjust the approach"],
  lead: "In the Philippines, we have helped partners take three different routes. Each started with a small-scale test, then adjusted and expanded based on the data.",
  roads: [
    { label: "First route", title: "Starting from zero", detail: "Our local partners in the Philippines first built an English-language education institution;\nlater, they built a chain bubble tea brand from zero" },
    { label: "Second route", title: "Adapt, then bring it over", detail: "Taiwanese products arrive locally, change their formula, price and packaging,\nand become something local people are willing to pay for" },
    { label: "Third route", title: "Bring it over unchanged", detail: "A Taiwanese beauty brand changes nothing and only markets locally, to see whether it can stand on its own" },
  ],
  cards: [
    {
      tags: [{ label: "Beauty & personal care", variant: "sky" }, { label: "North America", variant: "gold" }],
      num: "North America",
      numLabel: "Already in mainstream North American retail",
      scalePrefix: "Taiwanese goat milk soap brand",
      title: "How do North American buyers understand a Taiwanese goat milk soap?",
      painLine: "There is nothing wrong with the product; the problem is that North American buyers do not understand it",
      solutionLine: "The formula stays the same. What changes are the message and labeling, then it enters mainstream North American retail.",
      route: { from: "Taiwan", to: "North America" },
    },
    {
      tags: [{ label: "Food", variant: "sky" }, { label: "United States", variant: "gold" }],
      num: "FDA",
      numLabel: "Resolve regulation first, then discuss launch",
      scalePrefix: "Taiwanese fish floss brand",
      title: "What blocks fish floss from entering the United States?",
      painLine: "Ingredients and labeling in the formula may not clear the requirements in the United States",
      solutionLine: "First clarify FDA requirements and the ingredients and labeling that need adjustment, then discuss packaging and launch.",
      route: { from: "Taiwan", to: "United States" },
    },
    {
      tags: [{ label: "Beverages", variant: "sky" }, { label: "Southeast Asia", variant: "gold" }],
      num: "More than ten",
      numLabel: "From zero to open franchising",
      scalePrefix: "A partner's Philippine bubble tea brand",
      title: "How does a bubble tea brand go from zero to more than ten locations in the Philippines?",
      painLine: "The local bubble tea market already has international brands. A new brand must find its own position while protecting its formula.",
      solutionLine: "Starting with Taiwanese tea, adapt the flavor and price locally, open the first store to test, then open franchising.",
      route: { from: "Taiwan", to: "Philippines" },
    },
  ],
  featuredLabel: "Frequently asked about",
  storyLabels: { featured: "Read the full story →", standard: "Read case study →" },
  painHeading: "The sticking point",
  solutionHeading: "How we solve it",
  carousel: { label: "Case studies", previous: "Previous", next: "Next" },
  closeLabel: "Close",
  allCases: "All case studies →",
};
