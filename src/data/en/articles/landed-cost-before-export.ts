import type { EnglishArticle } from "./index";

// Fingerprint of the Chinese article this English was translated from; registry.test.ts prints the new value when Chinese changes.
export const article: EnglishArticle = {
  slug: "landed-cost-before-export",
  sourceFingerprint: "36b2b0c1a9864437",
  title: "Calculate landed cost before export quotations: what FOB, CIF, and DDP mean, and how to calculate tariffs",
  summary: "A customer asks for an FOB price. What does FOB mean, how does it differ from CIF and DDP, who can estimate the seven parts of landed cost, how are tariffs calculated, and why do we not publish tariff rates in this article?",
  readTime: "6 min read",
  content: [String.raw`> **Short answer:** Tariff is only the fastest-changing part of the seven parts of landed cost. First understand whether FOB, CIF, or DDP makes you or the buyer pay tariff. Calculate the other six parts, then fill the tariff field using the rate on the verification date.

## Scenario: a food-business owner receives the first email asking for an FOB price

Your tea-drink gift boxes sell steadily in Taiwan department stores. One day, a Philippine importer emails to say it picked up your samples at a trade show and would like a quotation: "Please provide an FOB price, and let me know the approximate landed cost to Manila so I can calculate the retail price."

You open Excel. The first field is the ex-factory price, which you know best. You want to enter freight in the second field, but do not know whom to ask or how much sea freight differs from air freight. You want to enter tariff in the third field, but an online search shows three versions of U.S. tariff news from this year alone, and you have even less idea where to check for the Philippines. Then you remember that the product is food, so there may be another tax to pay at import.

You realize that what is holding you up is not "how much is the tariff?" but **how many fields this table needs and whom to ask about each one.** This article is that table.

## How do you calculate landed cost? Who can estimate the seven parts?

Landed cost is the total cost at the moment goods reach the destination warehouse and can begin selling. We usually split it into seven parts and identify who can estimate each one:

| # | What this part covers | Who can estimate it | What is most often missed |
|---|---|---|---|
| 1 | **Ex-factory price** | You | Export packaging, outer cartons, pallets, and label changes required locally are often left out |
| 2 | **International freight** | Freight forwarder (this is what Jumping Freight does) | Sea versus air freight, full-container versus consolidated shipments; origin-port charges, document fees, and peak-season surcharges |
| 3 | **Insurance** | Freight forwarder or insurer | Most destination countries use "goods value + freight + insurance" as the basis for customs value, so insurance is not only insurance |
| 4 | **Destination-country tariff** | TradePilot or the destination country's official lookup tool | Incorrect HS-code classification, or assuming an FTA preference exists when Taiwan does not have one |
| 5 | **Destination-country value-added tax/excise tax** | Destination-country tax law or customs broker | Payable at import, not when goods are sold; some categories have additional excise tax |
| 6 | **Customs clearance and local delivery** | Destination-country customs broker or licensed importer [12] | The importer needs customs registration; FDA-regulated goods need registration before release |
| 7 | **Warehousing, platform commissions, and returns** | Platform rate sheet or partner warehouse | First-year volume is small, so fixed costs cannot be spread out |

A few points need to be clear first. They are also exactly where the owner in the scenario is likely to stumble:

**Which price tariff is calculated on depends on Incoterms.** If the other party asks for an FOB price, it means that freight and import tariff are both its responsibility. If it changes its request to DDP, you cover everything [1]. A quotation without Incoterms is not a quotation.

**Using the Philippines as an example, this is how the taxes stack.** Tariff is based on the transaction value (the goods value, in practice plus freight and insurance) [2]. On top of tariff, a 12% value-added tax applies, based on "customs value + tariff" [3]. Sugary drinks also have excise tax of 6 or 12 pesos per liter; imported finished products must pay it before customs release [4]. If the tea-drink gift box contains sugar, this field cannot be missed. A single shipment with an FOB value of 10,000 pesos or less is duty-free [2], but this is for small personal parcels, not a way to split shipments to avoid tax.

**Taiwan has no FTA with any ASEAN country.** Exports to the Philippines, Vietnam, Thailand, and Indonesia all use MFN rates [5]. Information about "zero tariffs within ASEAN" applies between ASEAN member states, not to exports from Taiwan.

## What is the difference between FOB, CIF, and DDP?

FOB is one of the Incoterms 2020 rules published by the International Chamber of Commerce. The three differ on three points: who pays freight and insurance, where risk transfers to the buyer, and who is responsible for import customs clearance and tariff [13].

**FOB (free on board at the port of shipment):** You handle export customs clearance and load the goods onto the vessel. Once the goods are on board, costs and risk transfer to the buyer; freight, insurance, and import tariff are all the buyer's responsibility [13][14].

**CIF (cost, insurance, and freight):** You additionally pay freight to the destination port and buy insurance for the buyer, but risk still transfers when the goods are loaded on board [13]. Insurance is only at the minimum level, Clauses C [14], and import tariff remains the buyer's responsibility [13].

**DDP (delivered duty paid):** You are responsible for all costs and risk through delivery at the place named by the buyer, including import customs clearance and tariff [13][14]. The ICC cautions that a seller may not be able to complete import clearance in the buyer's country [14].

| Term | Who pays international freight | Who pays insurance | When risk transfers to the buyer | Who pays import tariff |
|---|---|---|---|---|
| FOB | Buyer | Incoterms does not require it; risk is the buyer's, so the buyer insures if it wants cover | When the goods are loaded on board at the port of shipment | Buyer |
| CIF | Seller | Seller, at the minimum level (Clauses C) | When the goods are loaded on board at the port of shipment | Buyer |
| DDP | Seller | Incoterms does not require it; risk remains with the seller throughout | When the goods are delivered at the named destination | Seller |

FOB and CIF apply only to sea and inland-waterway transport [13][15]. Incoterms does not govern when ownership of goods transfers [15]. Quoting FOB or DDP determines whether the tariff field sits in the buyer's column or yours.

## Why we do not publish tariff rates in this article

Because in the past 18 months, the legal basis for U.S. tariffs alone has changed three times:

- April 2, 2025: The United States imposed "reciprocal tariffs" on countries under IEEPA (EO 14257) [6]
- August 29, 2025: The United States suspended duty-free treatment for parcels of US$800 or less from all countries (EO 14324); in June 2026, the suspension became indefinite [7]
- February 20, 2026: The U.S. Supreme Court ruled that IEEPA does not authorize the president to impose tariffs (Learning Resources v. Trump) [8]
- February 24, 2026: Temporary tariffs were imposed under Trade Act Section 122, which has a statutory maximum of 150 days [9]
- July 24, 2026: Section 122 expired. From July 25, 2026, Section 301 tariffs applied to 60 economies; the combined MFN + Section 301 rate on Taiwan-origin goods has a 10% floor [10]

And that is only the United States. Any tariff rate printed in this article would be wrong three months later. Our approach is: **write the structure in the article and look up the rate for the day with a tool.**

- Exports from Taiwan to each market: [TradePilot](https://tradepiloter.com). Enter the product name and destination country; AI assigns an HS code and breaks down the tariff field. See [this article](/insights/tradepilot-tariff-tutorial) for how to use it.
- Philippines: the Tariff Commission's [Philippine Tariff Finder](https://finder.tariffcommission.gov.ph/), which lists MFN and FTA rates in the AHTN 2022 edition [11].
- United States: use the USITC HTS lookup together with current Section 301/232 notices.

## When we do not recommend estimating yet

- **You do not yet know how the product will enter the market.** Consignment, an agent, and setting up your own company involve different importers, different tax bases, and different parties paying tax. Decide the model first, then estimate cost.
- **You do not yet know what price people will pay.** Landed cost is the denominator and selling price is the numerator. If you do not know the numerator, calculating the denominator has no meaning. This is why a [Market Test](/services/product-testing) comes first: its one-page report compares the Taiwan–Philippines price gap.
- **The product is FDA-regulated, but registration has not started.** Registration cost and time enter landed cost, while the Philippine FDA's fee rules have been suspended since 2025; use the position on the verification date. We will provide this part in the first discussion.
- **You already have a regular freight forwarder, ship every month, and have long maintained a cost table.** You need updated tariff rates, not this article.

## Frequently asked questions

**Tariffs keep changing. Does it still make sense to estimate landed cost now?**
Yes. Tariff is only one of the seven parts; the other six do not change as quickly. Calculate the structure first, then fill the tariff field using the rate on the verification date.

**How are tariffs calculated? Can I estimate landed cost myself?**
You can estimate the framework. Tariff is based on transaction value, in practice plus freight and insurance [2], and who pays depends on Incoterms [1]. But the HS code to declare and which costs belong in customs value are often estimated incorrectly, so ask someone who has done it to check the first time.

**Why does the article not include estimated figures?**
For the same product and market, landed cost can differ greatly between sea and air freight, FOB and DDP, and full-container and consolidated shipments. Publishing one figure would only lead people to make decisions with the wrong number.

## One small next step

First use [TradePilot](https://tradepiloter.com) to check your product and destination country and obtain the tariff field. Fill the other six fields using the table above. The fields you cannot complete are the ones to message us about (LINE or email).

This article is rewritten from the February 2026 article, "Strategies for shifting origin amid the China-U.S. tariff war." Last verified: October 1, 2026. Tariff legal bases change frequently, and the timeline records information only through the verification date.`],
  faq: [
    {
      q: "Tariffs keep changing. Does it still make sense to estimate landed cost now?",
      a: "Yes. Tariff is only one part of landed cost. The other parts — freight, insurance, local value-added tax, customs clearance, warehousing, and platform commissions — do not change as quickly. Calculate the structure first, then fill the tariff field using the rate on the verification date. When the rate changes, replace only that field.",
    },
    {
      q: "How are tariffs calculated? Can I estimate landed cost myself?",
      a: "You can estimate the framework. Tariff is calculated on customs value: based on the transaction value, in practice plus freight and insurance [2]. Which price applies and who pays depend on the Incoterms on the quotation [1]. Look up the rate through TradePilot or the destination country's official tool, ask a freight forwarder for freight quotations, and consult destination-country tax law for local tax. But the HS code to declare and the costs included in customs value are often estimated incorrectly, so ask someone who has done it to check the first time.",
    },
    {
      q: "Why does the article not include estimated figures?",
      a: "For the same product and market, landed cost can differ greatly between sea and air freight, FOB and DDP, and full-container and consolidated shipments. Publishing one figure would only lead people to make decisions with the wrong number.",
    },
  ],
  sources: [
    {
      id: 1,
      title: "Who pays tariff under each Incoterms 2020 rule",
      publisher: "Netherlands Chamber of Commerce (KVK, third-party summary)",
      url: "https://www.kvk.nl/en/international/incoterms-2020-everything-you-need-to-know/",
      note: "The buyer pays import tariff under EXW, FOB, and CIF; the seller covers everything under DDP.",
    },
    {
      id: 2,
      title: "Customs Modernization and Tariff Act (CMTA), RA 10863",
      publisher: "LawPhil (Philippine legal database)",
      url: "https://lawphil.net/statutes/repacts/ra2016/ra_10863_2016.html",
      note: "Section 423 exempts FOB/FCA shipments of 10,000 pesos or less; Section 701 makes transaction value the tax base.",
    },
    {
      id: 3,
      title: "How to calculate Philippine import duties, VAT, and taxes",
      publisher: "Respicio & Co. (third-party summary)",
      url: "https://www.respicio.ph/commentaries/how-to-compute-import-duties-vat-and-taxes-philippines",
      note: "12%, based on customs value plus tariff.",
    },
    {
      id: 4,
      title: "BIR RR 20-2018 excise tax on sugary drinks",
      publisher: "Philippine Bureau of Internal Revenue (BIR)",
      url: "https://bir-cdn.bir.gov.ph/local/pdf/RR%2020-2018.pdf",
      note: "6 pesos per liter, or 12 pesos for high-fructose corn syrup; imported finished products pay before release.",
    },
    {
      id: 5,
      title: "Taiwan's current FTA: Singapore ASTEP",
      publisher: "Office of the President, Republic of China (Taiwan)",
      url: "https://english.president.gov.tw/NEWS/4289",
      note: "The other FTA is New Zealand ANZTEC; see the U.S. Library of Congress at https://www.loc.gov/item/global-legal-monitor/2013-07-18/new-zealand-taiwan-free-trade-agreement-signed/.",
    },
    {
      id: 6,
      title: "USTR fact sheet on the U.S.-Taiwan reciprocal trade agreement",
      publisher: "Office of the United States Trade Representative (USTR)",
      url: "https://ustr.gov/about/policy-offices/press-office/fact-sheets/2026/february/fact-sheet-us-taiwan-agreement-reciprocal-trade",
      note: "Cites EO 14257 and EO 14346.",
    },
    {
      id: 7,
      title: "EO 14324 suspension of the de minimis exemption",
      publisher: "Federal Register",
      url: "https://www.federalregister.gov/documents/2025/09/02/2025-16802/notice-of-implementation-of-the-presidents-executive-order-14324-suspending-duty-free-de-minimis",
      note: "Effective August 29, 2025; postal parcels suspended indefinitely from June 24, 2026 at https://www.federalregister.gov/documents/2026/06/24/2026-12669/indefinite-suspension-of-the-de-minimis-exemption-for-mail-shipments-and-new-postal-informal-entry.",
    },
    {
      id: 8,
      title: "Learning Resources v. Trump decision summary",
      publisher: "U.S. Congressional Research Service (CRS)",
      url: "https://www.congress.gov/crs-product/LSB11398",
      note: "On February 20, 2026, the Supreme Court held that IEEPA does not authorize tariffs.",
    },
    {
      id: 9,
      title: "Explanation of temporary tariffs under Section 122",
      publisher: "Wiley law firm",
      url: "https://www.wiley.law/alert-Trump-Imposes-Section-122-Tariffs-After-Halting-IEEPA-Tariffs-Previews-New-Section-301-Investigations",
      note: "Effective February 24, 2026, with a statutory maximum of 150 days.",
    },
    {
      id: 10,
      title: "Section 301 tariffs effective on July 25",
      publisher: "Focus Taiwan",
      url: "https://focustaiwan.tw/politics/202607240007",
      note: "The combined MFN + Section 301 rate on Taiwan-origin goods has a 10% floor. See also Morgan Lewis at https://www.morganlewis.com/pubs/2026/07/us-administration-rebuilds-global-tariff-program-under-section-301.",
    },
    {
      id: 11,
      title: "Philippine Tariff Finder",
      publisher: "Philippine Tariff Commission",
      url: "https://finder.tariffcommission.gov.ph/about",
      note: "MFN and FTA rates, using the AHTN 2022 edition.",
    },
    {
      id: 12,
      title: "Philippine importer registration (CPRS and Bureau of Customs accreditation)",
      publisher: "Triple i Consulting (third-party summary)",
      url: "https://www.tripleiconsulting.com/import-permit-philippines-secure-boc-accreditation-this-guide/",
    },
    {
      id: 13,
      title: "Incoterms 2020 transport obligations, costs, and risk overview (official wallchart)",
      publisher: "International Chamber of Commerce (ICC)",
      url: "https://academy.iccwbo.org/wp-content/uploads/2020/08/803E_Incoterms-2020-Wallchart-A4.pdf",
      note: "Costs and risk-transfer points for the eleven rules, who completes export and import procedures, FOB and CIF in the sea and inland-waterway group, and seller insurance obligations only for CIF and CIP.",
    },
    {
      id: 14,
      title: "Incoterms 2020 Checklist and Flowcharts (2024 update)",
      publisher: "International Chamber of Commerce (ICC)",
      url: "https://library.iccwbo.org/content/clp/Others/incoterms_2020_checklist_2024-update.pdf",
      note: "Under FOB, costs and risk transfer after loading on board and the seller handles export clearance. CIF seller insurance is limited to the minimum level (LMA/IUA Clauses C). Under DDP, the seller is fully responsible, including import clearance, and may not be able to complete it.",
    },
    {
      id: 15,
      title: "Know Your Incoterms",
      publisher: "U.S. International Trade Administration (ITA)",
      url: "https://www.trade.gov/know-your-incoterms",
      note: "FOB and CIF are two of the four rules exclusively for sea and inland-waterway transport. Incoterms does not regulate when ownership of goods transfers.",
    },
  ],
};
