import type { AboutPageCopy } from "@/i18n/zh/about-page";

// Fingerprint of aboutPageZh and ABOUT_PHOTO_SLOTS this English was translated from; registry.test.ts prints the value after the first run.
export const ABOUT_PAGE_SOURCE_FINGERPRINT = "8a7be8e1aecbbff7";

export const aboutPageEn: AboutPageCopy = {
  home: "Home",
  breadcrumb: "About LUFÉ",
  hero: {
    title: ["We started with containers.", "Now we stay with Taiwanese brands after the goods arrive"],
    quote: "“Others drive for you. We help you find the road.”",
    lead: "We help Taiwanese companies establish themselves in North America and Southeast Asia: market validation, channel entry, local teams, and customer service. One point of contact connects every part of overseas expansion. The story starts with Jumping Freight.",
    scrollCue: "Scroll down",
  },
  storyChapters: [
    {
      num: "01",
      label: "The beginning · Jumping Freight",
      title: "For 43 years, sending Taiwan’s goods around the world",
      paragraphs: [
        "Jumping Freight has handled international freight forwarding for 43 years: customs clearance, warehousing, sea and air freight, and last-mile delivery.",
        "Over 43 years, we have seen more than customs declarations and containers. We have seen what our clients are up against.",
      ],
      stats: true,
      image: { src: "/images/about/about-port-1600.webp", alt: "Container terminal—the everyday work of Jumping Freight for 43 years", position: "center 40%" },
      photoSlot: "PHOTO-SLOT-01",
    },
    {
      num: "02",
      label: "What we observed in the market",
      title: "The goods arrived, but our clients’ work became harder every year",
      paragraphs: [
        "After each shipment, we would call to check in. What we heard was increasingly not about logistics: how to register a product locally, whose name a license should be under, and orders that came and went.",
        "The pandemic years made this especially clear. In September 2021, the global average rate for a 40-foot container rose to US$10,377—more than seven times the 2019 rate. For many clients, the problem was not getting goods shipped; it was that shipping them no longer made business sense.",
        "The pandemic passed, but the pressure did not. Taiwan’s 1.71 million small and medium enterprises sold NT$31.1 trillion in 2024, with only NT$3.2 trillion sold overseas—about one dollar in every ten. Taiwan’s population has been declining every month since 2024.",
      ],
      chartAfterParagraph: 1,
    },
    {
      num: "03",
      label: "The key insight",
      title: "The difference is not logistics; it is whether someone takes over after arrival",
      paragraphs: [
        "Our clients face the same pressure to adapt and survive as the market changes. Conversation after conversation made one thing clear: goods can all be delivered. What creates the real gap is whether someone carries on after arrival—handles licenses, pushes products onto shelves, and answers the first customer complaint in English.",
        "These tasks are outside every freight forwarder’s scope of service, including Jumping Freight’s.",
      ],
      image: { src: "/images/about/story-belief-compass-1600.webp", alt: "A compass on a world map—planned exploration", maxTierWidth: 1600, position: "center" },
      photoSlot: "PHOTO-SLOT-03",
    },
    {
      num: "04",
      label: "Founding LUFÉ",
      title: "Staying with our core business was safe, but our clients needed us to take one more step",
      paragraphs: [
        "The safest path was to handle customs clearance and transportation well, protecting the core business built over 43 years. But what held our clients back was no longer at the port.",
        "So we stepped outside Jumping Freight’s existing framework and founded LUFÉ, moving forward from those pain points: first understanding overseas markets and local regulations, then finding channels, helping companies establish themselves, and handling customer service. We made the four hardest tasks into four services: Market Test, Consignment, Company Setup, and Call Center.",
        "Jumping Freight is our foundation: it gets goods there, and LUFÉ helps them get bought locally.",
      ],
      servicesLink: true,
      image: { src: "/images/about/aaron-news-interview-1080.webp", alt: "Taiwan Television News interviews Jumping Freight’s market manager", maxTierWidth: 1080, position: "42% center" },
    },
  ],
  storyStats: [
    { value: "43", label: "years in international logistics · Jumping Freight" },
    { value: "500+", label: "export cases · Jumping Freight" },
    { value: "30+", label: "countries and regions · Jumping Freight logistics network" },
  ],
  servicesLink: "See all four services ",
  freightRateChart: {
    ariaLabel: "Comparison of global average 40-foot container rates in 2019 and 2021",
    description: "Global average rate per 40-foot container",
    rates: [
      { label: "2019 average", value: 1420, unit: "US$" },
      { label: "September 2021 peak", value: 10377, unit: "US$" },
    ],
  },
  team: {
    title: ["Less fear, more certainty", "for Taiwanese companies expanding overseas"],
    lead: "That is why we founded LUFÉ. We break overseas expansion into smaller steps: spend NT$10,000–20,000 to see how the market responds, then decide whether to move forward. So the first conversation is only questions. Sometimes we will advise you to wait—that is also an answer.",
    roles: {
      taiwan: { title: "Taiwan core team", description: "Contracts, progress, and your point of contact are all in Taiwan. From the first assessment to the final chapter, you only need to work with one person. For goods that need shipping, leave customs clearance and transportation to Jumping Freight—our core business for 43 years." },
      philippines: { title: "Philippine partners", description: "Once goods arrive in Manila, a group with years of local experience takes over. They run English-language education organizations and chain restaurants, growing a Taiwanese bubble-tea brand from one location to more than ten. The people for Market Test panels, Company Setup paperwork and legwork, and Call Center services all come from here." },
      northAmerica: { title: "North America team", description: "Another path leads to North America. The local team researches, attends trade shows, brings in buyers, and sits at the negotiatingating table. They support a Taiwanese fish-floss brand through its first stage in the United States. They deliver North America Retail while the point of contact in Taiwan stays the same." },
    },
  },
  network: {
    title: ["A resource network across three regions,", "supporting every overseas plan"],
    lead: "Channel relationships, local partners, and technology tools integrated into one cross-border operating system.",
    cities: "Taipei · Manila · Los Angeles · New York · San Francisco · Las Vegas",
    networkCities: "Resource network cities",
    focusMarkets: "Markets we are watching: Singapore · Kuala Lumpur · Bangkok · Ho Chi Minh City · Jakarta · Cebu",
    fallbackImageAlt: "Saigon at night",
    cards: {
      northAmerica: { title: "North America", description: "North America team: research, trade shows, buyers, and negotiations" },
      southeastAsia: { title: "Southeast Asia", description: "Philippine partners: education organizations, chain restaurants, customer service teams, law firms, and licensed importers" },
      globalLogistics: { title: "Global logistics", description: "43 years of international freight forwarding at Jumping Freight: customs clearance, warehousing, sea and air freight, and last-mile delivery" },
      technology: { title: "Technology tools", description: "Our in-house TradePilot tariff lookup tool is used by 2,400+ users. Using technology to lower the information barrier in cross-border business." },
    },
  },
  beliefs: {
    title: "Four things LUFÉ believes",
    items: [
      "Going overseas will happen sooner or later: starting earlier and smaller costs the least.",
      "Do the hardest things first: secure licenses, set up the company, and handle customer complaints. Say so plainly if they cannot be done.",
      "Take a position: recommend the option that helps a company grow, not the one that is easiest.",
      "Use data to make judgments and real experience to guide action.",
    ],
    imageAlt: "Compass and map",
  },
  cta: {
    imageAlt: "Workshop session with hands-on guidance for participants",
    title: "Let the next chapter start with your product",
    body: "The first consultation is free. Clarify the direction first, then decide the next step.",
    button: "Talk about your product →",
  },
};
