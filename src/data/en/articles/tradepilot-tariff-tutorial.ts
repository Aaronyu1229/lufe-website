import type { EnglishArticle } from "./index";

// Fingerprint of the Chinese article this English was translated from; registry.test.ts prints the new value when Chinese changes.
export const article: EnglishArticle = {
  slug: "tradepilot-tariff-tutorial",
  sourceFingerprint: "c7754808f5f9df64",
  title: "How do you calculate tariffs? Use TradePilot to look up HS codes, tariffs, and landed cost for free",
  summary: "How are tariffs calculated, and how do you look up an HS code? TradePilot is a free tool built by Jumping Freight that requires no registration: enter a product and amount, and AI assigns an HS code and breaks down customs duty and taxes through to landed cost.",
  readTime: "5 min read",
  content: [String.raw`> **Short answer:** Tariff calculations start with an HS code. TradePilot is free and requires no registration [1]: enter the product and amount, confirm the tariff heading, and you have the tariff portion.

## Scenario: a snack-brand manager has to answer, 'How much tax will we pay to enter the United States?' before tomorrow's presentation

You are the sales manager of a rice-cracker brand. Your owner will have a video call with a U.S. importer tomorrow and sends you one sentence this afternoon: "Please check how much tariff our rice crackers will pay entering the United States."

You search and first find a stream of tariff news, each article showing a different number. Then you find the U.S. customs tariff schedule. It is all in English, with thousands of headings, and you are not even sure which category rice crackers belong in: "rice products" or "baked snacks"? The rate can differ substantially if you classify it incorrectly. You want to ask the customs broker your company works with, but they have already gone home.

You do not need a tariff analysis. You need a tool that can tell you in 3 minutes, "which heading this product is likely to fall under, what the rate is, and how the number is calculated," then let the customs broker confirm it tomorrow. That is why we built TradePilot.

## What is TradePilot?

TradePilot is a free tariff tool built by Jumping Freight. It requires no registration [1]. Enter a product name and amount, and AI assigns an HS code with a confidence score. It then breaks down customs duty, excise tax, and business tax through to landed cost, with a formula and regulatory basis for every item. Its data comes from Taiwan's Customs Administration announcements and it supports multiple currencies. It works in two directions: exports from Taiwan and imports into Taiwan.

Jumping Freight has handled international logistics for 43 years, and customs declaration is part of daily work. We made this into a tool because too many first-time exporters have never been told clearly what price tariffs are calculated on.

## How do you look up an HS code and calculate tariffs? Three steps

**Step one: choose a direction and enter the product.** Back to the scenario: choose "export from Taiwan" and enter "rice crackers," or a more specific description such as "puffed glutinous-rice crackers with seasoning." The more specific the description, the higher the AI classification confidence score.

**Step two: confirm the HS code.** The tool gives you one or more candidate headings with confidence scores. You can begin with a high-confidence result. For a low-confidence result, review the listed candidates and choose the one closest to the product's actual ingredients and production process. Do not skip this step: the rate can differ substantially when the same product falls under different headings.

**Step three: review the tax breakdown.** You will see how customs duty, excise tax, and business tax are each calculated, what each is based on, and their combined landed-cost total. Send this page as a screenshot to your owner. They can see why it is this number, rather than only seeing a number.

Before tomorrow's video call, send the screenshot and tariff heading to the customs broker for one confirmation. The tool means you do not have to go into tonight empty-handed; it does not mean you no longer need a customs broker.

## Three things it will not do for you

- **It will not tell you the freight or insurance cost.** Landed cost has seven parts. TradePilot covers the tariff and tax portions; ask a freight forwarder about freight, and check warehouse and platform commissions against their rate sheets. The [landed-cost article](/insights/landed-cost-before-export) explains how to break down the full table.
- **It will not decide Incoterms for you.** Who pays tariffs depends on whether you agree on FOB or DDP with the buyer. If the importer in the scenario wants an FOB price, it pays the tariff. You look up the tariff to help calculate its retail price and decide, "Can this price sell in the United States?"
- **It will not determine customs' classification.** The customs broker and customs authorities have the final say on which heading applies.

One other point that is often misunderstood: Taiwan has no FTA with any ASEAN country. Exports to the Philippines, Vietnam, Thailand, and Indonesia all use MFN rates [3]. Do not be encouraged by claims of "zero tariffs within ASEAN"; that applies between ASEAN member states. You can also check Philippine rates against the Tariff Commission's [Tariff Finder](https://finder.tariffcommission.gov.ph/) [2].

## When we do not recommend relying only on the tool

- **The product has complex ingredients or sits between two headings.** For example, prepared food containing meat, alcoholic drinks, or products whose classification changes with ingredient proportions. Ask a customs broker to classify these; do not guess yourself.
- **You are preparing a formal quotation.** The tool provides an estimate. A quotation's tariffs and taxes need a customs broker's confirmed heading and current rate.
- **The destination country has just changed its legal basis.** U.S. tariff legal bases changed three times from 2025 to 2026. Tool updates take time, so check the date marked "tariff data updated" after your lookup.
- **You do not yet know what price people will pay.** Landed cost is the denominator, while the selling price is the numerator. If you do not know the numerator, start with a [Market Test](/services/product-testing).

## Frequently asked questions

**Does TradePilot cost money? Do I need to register?**
No. It is free and requires no registration [1].

**Can I use the HS code returned by a lookup directly for customs declaration?**
We do not recommend it. Low-confidence results need human confirmation; the customs broker and customs authorities have the final say.

**Does checking the tariff tell me the landed cost?**
Not yet. Tariff is only one of the seven parts; ask freight forwarders and partner warehouses about the others.

## One small next step

Open [TradePilot](https://tradepiloter.com) now, look up the one product you most want to sell abroad, and save a screenshot of the heading and tax page. The next time you discuss overseas expansion with anyone, show this first. For the fields you cannot fill in, message us (LINE or email).

Last verified: October 1, 2026. Use the current TradePilot page at tradepiloter.com for tool functions.`],
  faq: [
    {
      q: "Does TradePilot cost money? Do I need to register?",
      a: "No. It is free and requires no registration. It calculates from Customs Administration announcement data, and every tax item includes its formula and regulatory basis.",
    },
    {
      q: "Can I use the HS code returned by a lookup directly for customs declaration?",
      a: "We do not recommend it. The tool provides a confidence score, and low-confidence results need human confirmation. The customs broker and customs authorities have the final say on which heading is used for declaration. If customs reclassifies an incorrectly declared heading, you bear both the additional tax and the fine.",
    },
    {
      q: "Does checking the tariff tell me the landed cost?",
      a: "Not yet. Tariff is only one of the seven parts of landed cost. Ask freight forwarders and partner warehouses separately about freight, insurance, local customs clearance, warehousing, and platform commissions. TradePilot gives you the part of the structure that changes fastest.",
    },
  ],
  sources: [
    {
      id: 1,
      title: "TradePilot homepage",
      publisher: "Jumping Freight",
      url: "https://tradepiloter.com",
      note: "Free and requires no registration; import and export tax calculations, tariff lookup, AI classification with confidence scores, multiple currencies, and data from Customs Administration announcements.",
    },
    {
      id: 2,
      title: "Philippine Tariff Finder",
      publisher: "Philippine Tariff Commission",
      url: "https://finder.tariffcommission.gov.ph/about",
      note: "Official lookup for Philippine MFN and FTA rates, using the AHTN 2022 edition.",
    },
    {
      id: 3,
      title: "Taiwan's current FTA: Singapore ASTEP",
      publisher: "Office of the President, Republic of China (Taiwan)",
      url: "https://english.president.gov.tw/NEWS/4289",
      note: "Taiwan has no FTA with any ASEAN country and uses MFN rates. Its other FTA is New Zealand ANZTEC.",
    },
  ],
};
