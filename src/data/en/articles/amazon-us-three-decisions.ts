import type { EnglishArticle } from "./index";

// Fingerprint of the Chinese article this English was translated from; registry.test.ts prints the new value when Chinese changes.
export const article: EnglishArticle = {
  slug: "amazon-us-three-decisions",
  sourceFingerprint: "69d96f0d5b5ac4a7",
  title: "Should your product sell on Amazon US? Three decisions Taiwan brands should make first",
  summary: "Whether to sell on Amazon US is not a product-selection question; it is a decision question. Make three decisions: whether you can clear the regulatory and Amazon requirements, whether margin remains after landed cost and fees, and who will handle complaints and returns. Discuss product selection only after all three have answers.",
  readTime: "6 min read",
  content: [String.raw`> **Short answer:** Before selling on Amazon US, make three decisions: whether you can clear the requirements, whether margin remains after landed cost and fees, and who will handle complaints and returns. Discuss product selection only after all three have answers.

## Scenario: a health-supplement owner finds a Taiwan competitor on Amazon

Your fish oil has steady repeat purchases through pharmacies and e-commerce in Taiwan. One evening, you search Amazon US for "fish oil Taiwan" and find a product from a Taiwan competitor: hundreds of reviews and a four-and-a-half-star rating. You think: "If they can do it, why can’t we?"

The next day, you ask sales to look into it. The answers are all vague: some say to register with the FDA first; some say you need a U.S. company; some say it is enough to ship small parcels directly from Taiwan; some say a marketplace operator can get you listed. When you lay these statements out, none lets you decide whether to proceed. They only say it seems possible. More troublesome, each has a cost whose size you do not yet know: document fees, freight, platform fees, and someone answering messages in the middle of the night.

What you need is not a product-selection report, but three decisions that can answer whether to proceed. We will work through these three questions below.

## Decision 1: How to sell on Amazon US? Two layers of regulatory and platform requirements

Amazon is not a place where you can sell merely by translating a product page into English. Before listing, every category has two layers of requirements: U.S. federal regulations and Amazon’s own rules.

| Category | U.S. regulatory layer | Amazon layer |
|---|---|---|
| Food and dietary supplements | Manufacturing and storage facilities must register with the FDA; every import requires Prior Notice; the importer must maintain an FSVP plan [1] | Since April 2024, dietary supplements must be verified by a third-party testing, inspection, and certification (TIC) organization; from 2026, all dietary supplements must have third-party cGMP verification [2] |
| Cosmetics | Under MoCRA, manufacturing facilities must register, products must be listed, and overseas facilities must appoint a U.S. agent [3] | Additional documents may be required by category |
| All categories | You or your service provider must be the importer of record; Amazon does not serve as one [4] | To sell under a brand name and open a brand page, you need a registered or pending trademark with the U.S. Patent and Trademark Office for Brand Registry [5] |

For the fish oil in the scenario, the red line is clear: **if your product is a dietary supplement but the factory cannot provide third-party cGMP documentation accepted by Amazon, this route is not currently open.** That is a documentation issue, not a marketing issue. Ask the factory first.

Another route often presented as a way around regulations—shipping small parcels directly from Taiwan—has already closed. From August 29, 2025, the United States suspended duty-free treatment for parcels of US$800 or less from all countries; in June 2026, the suspension became indefinite [6]. Every shipment must pay duties and clear customs. "Just ship it directly" is outdated information.

## Decision 2: Does margin remain after the goods land?

Work backward from the selling price. There is much more to deduct than in Taiwan:

1. **Amazon fees:** a monthly Professional selling plan fee, referral fees calculated by category (15% for most categories), and FBA storage and fulfillment fees [7].
2. **Landed cost:** ex-factory cost, international freight, insurance, U.S. duties, customs clearance, and inland delivery. The legal basis for U.S. duties changed three times between 2025 and 2026. Check the rate for the day in [TradePilot](https://tradepiloter.com); do not use a number in an article (the reasons are covered in [Landed cost](/insights/landed-cost-before-export)).
3. **Compliance cost:** FDA registration, a U.S. agent, third-party testing, and trademark applications. These are fixed costs that do not spread well over small volume.
4. **Returns and slow-moving stock:** U.S. consumers have different return habits from consumers in Taiwan; FBA aged-inventory surcharges can consume inventory that does not sell.

In the five-question assessment, the profitability red line is: "adjust the plan if net margin in a pessimistic scenario is below 5%" [8]. Use a pessimistic scenario for this calculation: an unfavorable exchange rate, advertising spend, and returns from the first shipment. If it still works, move on.

## Decision 3: Who will handle complaints, returns, and reviews?

This question is skipped most often. Amazon reviews and customer-service replies directly affect rankings. U.S. consumers write in English, and the time difference is the opposite of Taiwan’s—their afternoon is your middle of the night.

There are three options: have your own team reply overnight, outsource customer service in the United States, or use an English-language support team in the Philippines (many North American brands already locate customer service in the Philippines). Our [Call Center](/services/call-center) is expected to open its first cohort in the first quarter of 2027 for this question. But whoever you use, **someone must be in place before the listing goes live**, not after the first message arrives.

## When we do not recommend selling on Amazon US yet

- **You sell dietary supplements, but the factory does not have third-party cGMP verification accepted by Amazon.** Resolve the documentation first, or the listing application will stall.
- **You do not have a U.S. trademark and do not plan to apply for one.** Without Brand Registry, product pages are vulnerable to other sellers attaching themselves to your listing, and brand protection is close to zero.
- **Your Taiwan margin is already thin.** Referral fees, FBA, duties, and returns leave less than 5% in a pessimistic scenario.
- **No one can respond to complaints in English.** The question is not whether their English is good; it is whether someone can reply at that time.
- **You want to use Amazon as a tool to test the U.S. market.** Amazon’s ranking and advertising systems make it hard for a new product to be seen naturally. Listing it to see what happens without a marketing budget usually produces "no one saw it," not "Americans do not like it." To test, start with a small quantity and people guiding the process, then decide whether to list on Amazon.
- **You are still looking for products and want to do pure trading arbitrage.** That is a different business. We have not done it, so we will not pretend to know it.

## Frequently asked questions

**If I ship small parcels directly from Taiwan to U.S. consumers, don’t I avoid the import issue?**
From August 29, 2025, the United States suspended duty-free treatment for parcels of US$800 or less from all countries; in June 2026, the suspension became indefinite [6]. Direct shipments must still pay duties, and every shipment must clear customs. This is no longer the easy option.

**Will Amazon act as my importer of record?**
No. You or your service provider must act as the importer of record; Amazon does not handle duties and taxes [4]. For food, the importer must also handle FSVP [1].

**What documents do Taiwan dietary supplements need to sell on Amazon US?**
In addition to FDA facility registration and compliant labeling, Amazon has required third-party TIC verification since 2024, and from 2026 all dietary supplements require third-party cGMP verification [2]. Without these, you cannot list.

## One small next step

Ask your product each of the three decisions once. If you cannot answer one, message us (LINE or email). For North America, our model is a low upfront service fee plus a commission on completed sales; we give clear numbers in the first conversation and do not ask you to spend on marketing first.

This article is adapted from the January 2026 article "Amazon category analysis: How to find your blue-ocean product category." Last verified: October 1, 2026. Amazon category policies change faster than regulations, so check Seller Central again before listing.`],
  faq: [
    {
      q: "If I ship small parcels directly from Taiwan to U.S. consumers, don’t I avoid the import issue?",
      a: "From August 29, 2025, the United States suspended duty-free treatment for parcels of US$800 or less from all countries; in June 2026, the suspension became indefinite. Direct shipments must still pay duties, and every shipment must clear customs. This is no longer the easy option.",
    },
    {
      q: "Will Amazon act as my importer of record?",
      a: "No. Amazon states that you or your service provider must act as the exporter and importer of record; Amazon does not handle duties or taxes. For food, the importer must also handle FSVP (Foreign Supplier Verification Program).",
    },
    {
      q: "What documents do Taiwan dietary supplements need to sell on Amazon US?",
      a: "In addition to U.S. FDA facility registration and compliant labeling, Amazon has required dietary supplements to be verified by a third-party testing, inspection, and certification organization since 2024. From 2026, all dietary supplements must also provide third-party cGMP verification. Without these, you cannot list.",
    },
  ],
  sources: [
    {
      id: 1,
      title: "FDA: Requirements for importing food products into the United States",
      publisher: "U.S. Food and Drug Administration",
      url: "https://www.fda.gov/food/food-imports-exports/importing-food-products-united-states",
      note: "Facility registration, Prior Notice, FSVP, and labeling; the FSVP final rule is at https://www.fda.gov/food/food-safety-modernization-act-fsma/fsma-final-rule-foreign-supplier-verification-programs-fsvp-importers-food-humans-and-animals.",
    },
    {
      id: 2,
      title: "Amazon dietary-supplement policy and third-party verification",
      publisher: "Amazon Seller Central (login required) / NutraIngredients",
      url: "https://www.nutraingredients.com/Article/2025/12/22/amazon-expands-tic-cgmp-requirement-to-all-supplement-products/",
      note: "Policy page: https://sellercentral.amazon.com/help/hub/reference/G201829010; TIC verification from April 2024 and third-party cGMP for all products from 2026.",
    },
    {
      id: 3,
      title: "MoCRA cosmetics regulation",
      publisher: "U.S. Food and Drug Administration",
      url: "https://www.fda.gov/cosmetics/cosmetics-laws-regulations/modernization-cosmetics-regulation-act-2022-mocra",
      note: "Facility registration, product listing, and a required U.S. agent for overseas facilities.",
    },
    {
      id: 4,
      title: "Amazon: Selling to the U.S. from overseas",
      publisher: "Amazon",
      url: "https://sell.amazon.com/global-selling/international-to-usa",
      note: "You or your service provider must act as exporter and importer of record; Amazon does not handle duties and taxes for FBA inventory.",
    },
    {
      id: 5,
      title: "Amazon Brand Registry",
      publisher: "Amazon",
      url: "https://sell.amazon.com/brand-registry",
      note: "A registered or pending trademark is required.",
    },
    {
      id: 6,
      title: "Executive Order 14324: Suspension of the de minimis exemption",
      publisher: "Federal Register",
      url: "https://www.federalregister.gov/documents/2025/09/02/2025-16802/notice-of-implementation-of-the-presidents-executive-order-14324-suspending-duty-free-de-minimis",
      note: "Effective August 29, 2025; mail shipments were suspended indefinitely on June 24, 2026 at https://www.federalregister.gov/documents/2026/06/24/2026-12669/indefinite-suspension-of-the-de-minimis-exemption-for-mail-shipments-and-new-postal-informal-entry.",
    },
    {
      id: 7,
      title: "Overview of Amazon U.S. seller fees",
      publisher: "Feedvisor (third-party overview)",
      url: "https://feedvisor.com/university/referral-fee/",
      note: "The Professional plan costs US$39.99 per month and referral fees are 15% for most categories; refer to the current Seller Central rate card.",
    },
    {
      id: 8,
      title: "LUFÉ five-question assessment (profitability red line)",
      publisher: "LUFÉ",
      url: "https://lufe.world/services/methodology",
      note: "Adjust the plan if net margin is below 5% in a pessimistic scenario.",
    },
  ],
};
