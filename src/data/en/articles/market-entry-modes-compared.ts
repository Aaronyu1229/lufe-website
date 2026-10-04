import type { EnglishArticle } from "./index";

// Fingerprint of the Chinese article this English was translated from; registry.test.ts prints the new value when Chinese changes.
export const article: EnglishArticle = {
  slug: "market-entry-modes-compared",
  sourceFingerprint: "8255d7a96edef0cb",
  title: "Importers, agents, your own company, or cross-border e-commerce: four international market-entry modes compared, using the Philippines as an example",
  summary: "For small and midsize brands, international market entry is effectively a choice among four options: an importing distributor, an agent, your own company, or cross-border e-commerce. This table compares who buys the goods, whose name holds the registration, how high the entry barrier is, and how hard it is to exit. It also explains why food and cosmetics cannot bypass the Philippines FDA through cross-border e-commerce.",
  readTime: "6 min read",
  content: [String.raw`> **Short answer:** For small and midsize brands, international market entry is a choice among four options: an importing distributor, an agent, your own company, or cross-border e-commerce. First check whether the product needs registration, then decide how much inventory you are willing to carry.

## Scenario: four options are raised at the same board meeting

This is a hypothetical scenario, not a story about a specific client.

Your company makes powdered beverages in Taiwan and has decided to try the Philippines this year. At a meeting, four people propose four directions. The sales manager says a Manila importer at a trade show wants samples: “The easiest way is to let them buy outright.” Another colleague knows a local agent who earns only commission and does not require you to hold inventory. The chief financial officer says that if you are going to do it, set up your own company: “Then the channels and customers will be ours.” A younger colleague responsible for e-commerce says to open a Shopee cross-border store and see how it sells.

All four directions make sense, and all have worked for someone. But you realise that people are comparing different things: some are comparing money, some control, and some speed. No one has mentioned that beverages need a product registration certificate in the Philippines, and that certificate must be held under the name of a local company. That fact removes half the options before the discussion begins.

## The four modes in one table

| What to compare | Importing distributor | Agent | Your own company | Cross-border e-commerce |
|---|---|---|---|---|
| Who buys the goods and carries inventory | The distributor orders from you, buys outright, and holds inventory [1] | Does not stock goods. Customers order directly from you, and the agent earns commission [1] | Your subsidiary | You; the platform handles listings and part of the logistics [7] |
| How you earn | The difference between your selling price to the distributor and its onward selling price | You keep the full selling price and pay commission, commonly 5–10% [1] | You keep the full local selling price | Selling price less platform fees |
| Whose name holds registration for food and cosmetics | The distributor: it needs an LTO before import and the product needs a CPR [5] | The local customer placing the import order must hold its own LTO and CPR [1][5] | Your subsidiary applies under its own LTO [6] | A local certificate-holding company is still needed; platforms cannot sell regulated products without permit information [9] |
| Starting threshold (official figures) | Low | Low | Foreign-owned domestic-market enterprises generally need paid-in capital from US$200,000; direct retail sales to consumers require Php 25,000,000 [3][4] | Low; shipments to the Philippines valued at Php 10,000 or less are duty-free [8] |
| Control over pricing and customers | Low | High | Highest | Medium; platform rules control the environment [7] |
| Difficulty of exit | Contracts commonly provide 30 days’ notice [1], but the registration is under its name | Contracts commonly provide 30 days’ notice [1] | Most difficult; you must handle the company, people, and registrations | Easiest; delist the products |

The U.S. International Trade Administration describes the Philippines plainly: **local agents or distributors remain a necessary part of entering and expanding the market** [1]. This does not mean you must use them. It means that if you do not, you must do the work they do yourself.

## Decision steps: remove options in this order

**Step 1: Does the product need registration?** Food, beverages, dietary supplements, and cosmetics need a local importer holding an LTO before import into the Philippines, and every product needs a CPR before its first import [5]. An LTO application requires Philippines SEC or DTI registration documents [6]. For products that need registration, this effectively removes “cross-border e-commerce only”: the e-commerce law requires platforms to prohibit regulated goods that do not provide permit information [9]. The Php 10,000 duty-free threshold concerns customs duty [8], not FDA registration.

**Step 2: How much inventory are you willing to carry?** If you want to ship the goods, receive payment, and avoid managing the local market, choose a distributor. If you want to retain pricing control and keep the goods and invoices on your side, choose an agent. The full comparison is in [the difference between agents, distributors, and exclusivity](/insights/agent-vs-distributor-exclusive).

**Step 3: Can you afford to set up your own company?** The Philippines allows foreigners to own 100% of domestic-market enterprises, but small and midsize enterprises with paid-in capital below US$200,000 are reserved for Filipinos. The threshold can fall to US$100,000 for qualifying advanced technology, certified startups, or businesses that directly employ at least 15 people, more than half of them Filipino [3]. To open your own shop and sell directly to consumers, a foreign retailer needs paid-in capital of at least Php 25,000,000; each additional store requires investment of at least Php 10,000,000 [4]. These two figures usually lead first-year brands to put this option later.

**Step 4: Which company holds the registration, and how does it move when you change parties?** Whether you choose a distributor or an agent, the registration is held under a local company’s name. We cover the rules for changing parties in [what happens when a Philippines product registration is under an importer’s name](/insights/philippines-cpr-transfer-change-importer), and the difference among the three documents in [the Philippines FDA’s LTO, CPR, and CPN](/insights/philippines-fda-lto-cpr-cpn).

## What cross-border e-commerce suits, and what it does not

The main advantages of cross-border e-commerce are a quick start and an easy exit. In Shopee’s Taiwan cross-border program, for example, sellers must be legally established companies or registered organisations. The seller sends goods to a designated Taiwan consolidation point, Shopee bears international-leg logistics costs, and Shopee may list the goods on overseas sites and set overseas selling prices [7].

But know three things:

- **Which countries are open depends on the platform’s notice at that time** [7]. The terms themselves do not list countries. Ask the platform directly whether the Philippines site is open to Taiwan sellers.
- **You do not fully set the selling price** [7]. This is the opposite of an agency model, where you set the price.
- **Products requiring registration still require registration** [5][9]. Cross-border e-commerce suits ordinary goods that do not need FDA registration, or brands whose registration has already been completed through a local importer and which want to add an online channel.

We cover how to choose a Philippines e-commerce platform separately in [the first year of Philippines e-commerce](/insights/philippines-ecommerce-first-year).

## When we do not recommend following this article

- **Your product is an industrial product, piece of equipment, or component, and the buyer is a factory.** The indent arrangement described by the U.S. International Trade Administration—where the customer orders directly from you and the agent earns commission [1]—is more common for these products. The decision points differ from consumer goods.
- **You already have a stable distributor in the Philippines and only want to add a channel.** Check the exclusivity and territory terms in the agreement before discussing a mode.
- **You are actually comparing two specific companies.** Comparing modes will not help. Examine the other party’s LTO, channels, and finances.
- **You do not yet know whether people in the Philippines will buy.** All four modes depend on demand. Start with a [Market Test](/services/product-testing) for NT$10,000–NT$20,000; you can stop after it is complete. Only after deciding to operate for the long term and wanting your own people should you consider [Company Setup](/services/localization).

## Frequently asked questions

**What international market-entry modes are available, and how should small businesses choose?**
For small and midsize brands, there are effectively four: an importing distributor, an agent, your own company, and cross-border e-commerce. The U.S. International Trade Administration classifies selling through agents, distributors, and e-commerce platforms as indirect sales; handling the entire export process yourself is direct sales [2]. First check whether the product needs registration locally, then decide how much inventory you are willing to carry.

**Can food be sold to the Philippines through cross-border e-commerce alone?**
It is difficult. Before food is imported into the Philippines, a local importer must hold an LTO, and every product must have a CPR before its first import [5]. The e-commerce law also requires platforms to prohibit regulated goods that do not provide permit information [9]. The small-parcel duty-free threshold exempts duties only [8], not FDA registration.

**How much does it cost to set up your own company in the Philippines?**
It depends on what you do. A foreign-owned domestic-market enterprise generally needs paid-in capital from US$200,000, which can fall to US$100,000 if it meets conditions such as advanced technology, certified startup status, or employing at least 15 people with more than half Filipino [3]. A foreign retailer selling directly to consumers needs paid-in capital of at least Php 25,000,000 [4]. These are legal thresholds and exclude rent, payroll, and licensing fees.

## One smallest next step

Write two lines on paper: **Does my product need registration? How much inventory am I willing to carry in the first year?** If the answer to the first line is “yes,” remove cross-border e-commerce first. If the answer to the second is “I do not want to carry inventory,” remove a distributor first. The remaining options are the ones worth discussing. If you cannot answer either line, ask us on LINE.

Based on practical experience; not legal advice. Before establishing a company or signing an agency or distribution agreement, consult a lawyer and accountant in the Philippines. Last verified: 2026-10-01.`],
  faq: [
    {
      q: "What international market-entry modes are available, and how should small businesses choose?",
      a: "For small and midsize brands, there are effectively four: an importing distributor, an agent, your own company, and cross-border e-commerce. The U.S. International Trade Administration classifies selling through agents, distributors, and e-commerce platforms as indirect sales; handling the entire export process yourself is direct sales. First check whether the product needs registration locally, then decide how much inventory you are willing to carry.",
    },
    {
      q: "Can food be sold to the Philippines through cross-border e-commerce alone?",
      a: "It is difficult. Before food is imported into the Philippines, a local importer must hold an LTO, and every product must have a CPR before its first import. The e-commerce law also requires platforms to prohibit regulated goods that do not provide permit information. The small-parcel duty-free threshold exempts duties only, not FDA registration.",
    },
    {
      q: "How much does it cost to set up your own company in the Philippines?",
      a: "It depends on what you do. A foreign-owned domestic-market enterprise generally needs paid-in capital from US$200,000, which can fall to US$100,000 if it meets conditions such as advanced technology, certified startup status, or employing at least 15 people with more than half Filipino. A foreign retailer selling directly to consumers needs paid-in capital of at least Php 25,000,000. These are legal thresholds and exclude rent, payroll, and licensing fees.",
    },
  ],
  sources: [
    {
      id: 1,
      title: "Philippines Country Commercial Guide: Distribution and Sales Channels",
      publisher: "U.S. International Trade Administration (trade.gov)",
      url: "https://www.trade.gov/country-commercial-guides/philippines-distribution-and-sales-channels",
      note: "Local agents or distributors remain necessary for entering and expanding the market. The two importer types are distributors that buy outright and hold inventory, and indenters that do not stock goods and earn commission. Agent commission is commonly 5–10%, and contracts commonly provide 30 days’ termination notice.",
    },
    {
      id: 2,
      title: "Sales Channels",
      publisher: "U.S. International Trade Administration (trade.gov)",
      url: "https://www.trade.gov/sales-channels",
      note: "Direct sales: the exporter handles the entire export process. Indirect sales: selling through agents, representatives, distributors, wholesalers, export intermediaries, or e-commerce platforms.",
    },
    {
      id: 3,
      title: "Republic Act No. 11647 (Foreign Investments Act amendment)",
      publisher: "Philippines Congress (full text collected by Lawphil)",
      url: "https://lawphil.net/statutes/repacts/ra2022/ra_11647_2022.html",
      note: "Foreigners may generally own 100% of domestic-market enterprises. Micro and small domestic-market enterprises with paid-in capital below US$200,000 are reserved for Filipinos. The threshold falls to US$100,000 for advanced technology, certified startups, or businesses directly employing at least 15 people, more than half Filipino.",
    },
    {
      id: 4,
      title: "Republic Act No. 11595 (Retail Trade Liberalization Act amendment)",
      publisher: "Philippines Congress (full text collected by Lawphil)",
      url: "https://lawphil.net/statutes/repacts/ra2021/ra_11595_2021.html",
      note: "Foreign retailers need paid-in capital of at least Php 25,000,000. Where multiple stores are opened, investment in each store must be at least Php 10,000,000.",
    },
    {
      id: 5,
      title: "FAIRS Country Report Annual: Philippines (RP2026-0009)",
      publisher: "U.S. Department of Agriculture Foreign Agricultural Service (USDA FAS)",
      url: "https://apps.fas.usda.gov/newgainapi/api/Report/DownloadReportByFileName?fileName=FAIRS+Country+Report+Annual_Manila_Philippines_RP2026-0009",
      note: "On 2026-04-21: before import, Philippines importers must obtain an FDA LTO; each food or beverage product must obtain a CPR before first import; only accredited registered individuals or businesses may import food.",
    },
    {
      id: 6,
      title: "FDA Citizen’s Charter 2024 (1st Edition, as of 18 July 2024)",
      publisher: "Philippines FDA",
      url: "https://www.fda.gov.ph/wp-content/uploads/2024/07/CC_FDA-CC-2024-as-of-18-July-2024.pdf",
      note: "For initial LTO applications by food traders and distributors, companies must provide an SEC certificate of registration and articles of incorporation; sole proprietors must provide DTI registration.",
    },
    {
      id: 7,
      title: "Taiwan cross-border program terms of service",
      publisher: "Shopee Taiwan",
      url: "https://help.shopee.tw/portal/4/article/77289",
      note: "Effective 2025-03-28: applicants must be legally established corporations or registered unincorporated organisations. Shopee may list products on overseas Shopee sites and set overseas selling prices. Sellers deliver products to a designated Taiwan cross-border location, while Shopee bears international-leg logistics and related costs. Service scope follows Shopee’s notices.",
    },
    {
      id: 8,
      title: "Republic Act No. 10863 (Customs Modernization and Tariff Act), Section 423",
      publisher: "Philippines Congress (full text collected by Lawphil)",
      url: "https://lawphil.net/statutes/repacts/ra2016/ra_10863_2016.html",
      note: "Goods with an FOB or FCA value of Php 10,000 or less are not subject to customs duty or other taxes.",
    },
    {
      id: 9,
      title: "Republic Act No. 11967 (Internet Transactions Act of 2023)",
      publisher: "Philippines Congress (full text collected by Lawphil)",
      url: "https://lawphil.net/statutes/repacts/ra2023/ra_11967_2023.html",
      note: "Section 21: before listing, e-commerce platforms must, as far as practicable, collect identity or business-registration information from domestic and foreign online merchants and prohibit regulated goods that do not provide necessary permit and licence information.",
    },
  ],
};
