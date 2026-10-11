import type { EnglishArticle } from "./index";

// Fingerprint of the Chinese article this English was translated from; registry.test.ts prints the new value when Chinese changes.
export const article: EnglishArticle = {
  slug: "philippines-market-assessment-deck",
  sourceFingerprint: "130f9413df2959d1",
  title: "How do you write a market analysis report? When your boss asks you to assess the Philippines, these 12 slides are enough (outline included)",
  summary: "A market analysis report exists to help your boss make a decision, not to display data. One table lays out a 12-page outline for assessing the Philippine market: what each page answers, what goes on it, and where to find the data. It also covers the five pages people most often get wrong, and how to write the stop-loss point on the last page.",
  readTime: "6 min read",
  content: [String.raw`> **Short answer:** A market analysis report is for your boss to make a decision, not to display data. To assess the Philippine market, 12 pages are enough: page 1 states the conclusion, and the last page says what result means continue and what result means stop.

## Scenario: a "Philippine market assessment" is due by Friday

This is a hypothetical scenario, not a story about a specific client.

You handle sales at a company that makes sauces and condiments. On Monday your boss says in a meeting: “People say the Philippines is promising. Assess it and show me on Friday.” No budget, no scope, and no page count.

You search for “how to write a market analysis report” and find definitions of market research, five-step processes, and all kinds of analysis tools. All of it is correct, but on Friday you face only one question: after reading it, can your boss say “go” or “no go”? Forty pages of industry data cannot do that, because what they really want to know is three things: will anyone buy, how much will it cost, and how long until there are results.

The 12-page outline below is ordered around those three things. Each page answers one question and states what goes on it and where to find the data.

## The 12-page outline in one table

| Page | What this page answers | What goes on it | Where the data comes from |
|---|---|---|---|
| 1 | Conclusion | Recommend go, no go, or a small trial first; one reason; how much it costs | The whole report |
| 2 | What we are deciding this time | Only whether to spend the first sum of money, not whether to set up a company | Your boss's own words |
| 3 | How big the market is | Population and economic growth, with only two or three figures [1][2] | Official statistics |
| 4 | Who will buy | Who the target customers are, where they buy, and what they use instead today | On-the-ground observation |
| 5 | Who is on the shelf | Prices, pack sizes, and channels of similar products | Local supermarkets and e-commerce |
| 6 | Which registrations are needed | Who handles the LTO, CPR, or CPN, and the official processing days [4][5][7] | Philippine FDA |
| 7 | How to enter | Choose among a distributor, an agent, your own company, or cross-border e-commerce [3][6] | Entry-mode comparison |
| 8 | What each landed unit costs | From ex-factory price to local shelf price | Landed-cost estimate |
| 9 | Timeline | Every step from finding an importer to reaching the shelf | Pages 6 and 7 |
| 10 | The three biggest risks | For each risk, write “what we do if it happens” | Pages 4–9 |
| 11 | Where the first money goes | Amount, and what answer it buys | Package quote |
| 12 | Decision and stop-loss point | What result means continue and what means stop | Your boss decides |

## The five pages most often written wrong

**Page 1: put the conclusion first.** Your boss may read only this page. Write three lines: recommendation, reason, amount. Do not write “the Philippine market has great potential”; write “we recommend spending this much to confirm one thing first, then deciding whether to look for an importer.”

**Page 3: give market size in only two or three figures.** The official figure from the Philippines' 2024 census is 112,729,484 people (as of July 1, 2024) [1]; the U.S. Commerce Department's country commercial guide says the Philippine economy grew 5.6% in 2024 [2]. These two figures are enough to show this is not a small market, but they will not tell you whether anyone will buy your sauce. Keep this to no more than one page.

**Page 5: the shelf is more useful than an industry report.** For a brand going overseas for the first time, the prices, pack sizes, and brands of similar local products answer “does my price fit?” better than market size does. Take photos, note prices, and note which shelf the products sit on.

**Page 6: write registration first, then discuss channels.** A Philippine food importer must first hold an FDA LTO, and each food product needs a CPR before its first import [4]; cosmetics use a pre-market notification (CPN), filed by a local company holding an LTO [7]. The official processing times in the FDA Citizen's Charter are: 14 working days for an initial LTO for a food distributor [5], and 23 working days for a cosmetic CPN [7], excluding document preparation and corrections. Get this page wrong and the timeline on page 9 will be wrong throughout. For how the three certificates differ, see [LTO, CPR, and CPN at the Philippine FDA](/insights/philippines-fda-lto-cpr-cpn).

**Page 7: write the entry mode as a multiple-choice question.** The U.S. Commerce Department describes the Philippines this way: a local agent or distributor remains essential for entering and expanding in the market [3]. Also write down the threshold for setting up your own company: a foreign-owned domestic-market enterprise generally needs paid-in capital of at least US$200,000 [6]. The full comparison of the four modes is in [four international market-entry modes compared](/insights/market-entry-modes-compared).

For page 8, break down the cost using the method in [calculate landed cost before quoting an export price](/insights/landed-cost-before-export), and look up duties with [TradePilot](/insights/tradepilot-tariff-tutorial).

## Page 12: write the stop-loss point

Most market analysis reports stop at “recommendations.” But your boss needs a decision that can be acted on, so write the last page as three lines:

- **Conditions to continue:** for example, target customers are willing to buy at the price you planned.
- **Conditions to stop:** for example, the price must fall below cost before anyone buys, or you cannot find an importer willing to hold the registration.
- **How much this round costs, and how long until there is an answer.**

A report that can state a stop-loss point makes it easier for your boss to approve the first sum of money, because they know what the worst case costs. For a decision framework, see [how we decide whether an overseas project is worth doing](/insights/go-no-go-framework).

## When we do not recommend following this article

- **Your boss has already decided to go and wants an execution plan.** That document is about timelines and division of work, not whether to do it.
- **You need investment-grade industry research**, such as whether to build a local factory. That needs a full market-size, regulatory, and financial model; 12 pages are not enough.
- **The product does not need FDA registration locally.** Shrink page 6 to one line and give the space to channels and prices.
- **You have no local prices or customer reactions at all.** If pages 4 and 5 are empty, the report is only secondhand data. Do a [market probe](/services/product-testing) first: NT$10,000–20,000, and you can stop when it is done.

## Frequently asked questions

**What should a market analysis report include?**
The version for your boss's decision should include: conclusion, market size, who will buy, competitor shelf, regulatory thresholds, entry mode, cost, timeline, risks, first budget, and stop-loss point. Give market size in only two or three official figures [1][2], and use the space for whether anyone will buy and how much it will cost.

**For a Philippine market assessment, what goes on the regulatory page?**
Write who must obtain which certificate and how long official processing takes. A food importer must first hold an LTO, and each product needs a CPR before its first import [4]; for cosmetics, a local company holding an LTO files a CPN, with official processing of 23 working days [7]. This excludes preparation and corrections.

**How many slides does an assessment deck need?**
For a decision, 12 pages are enough: page 1 is the conclusion, the last page is the stop-loss point, and each page in between answers one question. Put data-heavy material in an appendix rather than the main deck.

## One minimal next step

Open a blank slide and write page 12 first: what result means continue and what means stop. If you cannot write it, you do not yet know what you are assessing; if you can, the other 11 pages are just gathering evidence. If you get stuck on a page, send us one question on LINE.

Last verified: 2026-10-11. FDA processing days follow the current edition of the Citizen's Charter.`],
  faq: [
    { q: "What should a market analysis report include?", a: "The version for your boss's decision should include: conclusion, market size, who will buy, competitor shelf, regulatory thresholds, entry mode, cost, timeline, risks, first budget, and stop-loss point. Give market size in only two or three official figures, such as the 112,729,484 people counted in the Philippines' 2024 census, and use the space for whether anyone will buy and how much it will cost." },
    { q: "For a Philippine market assessment, what goes on the regulatory page?", a: "Write who must obtain which certificate and how long official processing takes. A food importer must first hold an FDA LTO, and each food product needs a CPR before its first import; for cosmetics, a local company holding an LTO files a CPN, and the official processing time in the FDA Citizen's Charter is 23 working days. This excludes document preparation and corrections." },
    { q: "How many slides does an assessment deck need?", a: "For a decision, 12 pages are enough: page 1 states the conclusion, the last page states the stop-loss point, and each page in between answers one question. Put data-heavy material in an appendix rather than the main deck." },
  ],
  sources: [
    { id: 1, title: "Proclamation No. 973, s. 2025 (official results of the 2024 census)", publisher: "Office of the President of the Philippines (full text on Lawphil)", url: "https://lawphil.net/executive/proc/proc2025/proc_973_2025.html", note: "Signed 2025-07-11: the total population of the Philippines as of July 1, 2024 is 112,729,484." },
    { id: 2, title: "Philippines Country Commercial Guide: Market Overview", publisher: "U.S. International Trade Administration (trade.gov)", url: "https://www.trade.gov/country-commercial-guides/philippines-market-overview", note: "Last published 2026-05-08: the Philippine economy grew 5.6% in 2024." },
    { id: 3, title: "Philippines Country Commercial Guide: Distribution and Sales Channels", publisher: "U.S. International Trade Administration (trade.gov)", url: "https://www.trade.gov/country-commercial-guides/philippines-distribution-and-sales-channels", note: "A local agent or distributor remains essential for entering and expanding in the market; agent commissions are commonly 5–10%; contracts usually specify 30 days' termination notice." },
    { id: 4, title: "FAIRS Country Report Annual: Philippines (RP2026-0009)", publisher: "USDA Foreign Agricultural Service (USDA FAS)", url: "https://apps.fas.usda.gov/newgainapi/api/Report/DownloadReportByFileName?fileName=FAIRS+Country+Report+Annual_Manila_Philippines_RP2026-0009", note: "2026-04-21: Philippine importers must obtain an FDA LTO before importing; each food or beverage product must obtain a CPR before its first import." },
    { id: 5, title: "FDA Citizen's Charter 2024 (1st Edition, as of 18 July 2024)", publisher: "Philippine FDA", url: "https://www.fda.gov.ph/wp-content/uploads/2024/07/CC_FDA-CC-2024-as-of-18-July-2024.pdf", note: "Initial LTO application for food distributors (importer, exporter, wholesaler): official processing of 14 working days; every CPR application requires a valid LTO." },
    { id: 6, title: "Republic Act No. 11647 (amending the Foreign Investments Act)", publisher: "Congress of the Philippines (full text on Lawphil)", url: "https://lawphil.net/statutes/repacts/ra2022/ra_11647_2022.html", note: "Foreigners may generally own 100% of domestic-market enterprises; micro and small domestic-market enterprises with paid-in capital below US$200,000 are reserved for Filipinos." },
    { id: 7, title: "Citizen's Charter: Issuance of Cosmetic Product Notification", publisher: "Philippine FDA", url: "https://www.fda.gov.ph/wp-content/uploads/2025/09/1.-Issuance-of-Cosmetic-Product-Notification.pdf", note: "Applicants are companies holding a valid LTO that lists a cosmetics activity; official processing of 23 working days and 15 minutes." },
  ],
};
