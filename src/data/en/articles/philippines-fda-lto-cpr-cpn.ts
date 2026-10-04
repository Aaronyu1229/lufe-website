import type { EnglishArticle } from "./index";

// Fingerprint of the Chinese article this English was translated from; registry.test.ts prints the new value when Chinese changes.
export const article: EnglishArticle = {
  slug: "philippines-fda-lto-cpr-cpn",
  sourceFingerprint: "82ce78742ebb3f11",
  title: "What is the difference between the Philippines FDA’s LTO, CPR, and CPN? Which document do food, supplements, and cosmetics need?",
  summary: "The Philippines FDA’s LTO is an operating license for a company, CPR is a product registration certificate for food, and CPN is a notification certificate for cosmetics. You need an LTO before applying for the other two. This table compares what the three documents cover, who holds them, and official fees and processing days, including the impact of the 2025–2026 fee suspension and registration-system change.",
  readTime: "6 min read",
  content: [String.raw`> **Short answer:** The Philippines FDA’s LTO is an operating license for a company, CPR is a product registration certificate for food, and CPN is a notification certificate for cosmetics. You need an LTO before applying for the other two.

## Scenario: a health-supplement brand manager is told by the owner to “sort out the FDA”

This is a hypothetical scenario, not a story about a specific client.

Your company makes collagen powder and a face mask, with stable distribution in Taiwan. The owner returns from a trade show and says that an importer in Manila is interested. The instruction is one sentence: “Go sort out the Philippines FDA.”

You email the other party and receive a quick reply: “Our company has FDA approval, no problem.” You feel relieved, but searches for “Philippines FDA” bring up three abbreviations: LTO, CPR, and CPN. Some sources say 90 days; others say 3 weeks. You are no longer sure: which document does the other party mean when it says it “has FDA approval”? Do collagen powder and a face mask use the same document? Once approved, will the document be in your company’s name or theirs?

Those are the three questions this article separates.

## The three documents in one table

| What to compare | LTO (License to Operate) | CPR (Certificate of Product Registration) | CPN (Cosmetic Product Notification) |
|---|---|---|---|
| Issued to | A company. It must have one before importing, distributing, or manufacturing in the Philippines [1] | A single product. Processed food, dietary supplements, bottled water, and similar products must be registered before sale [1] | A single cosmetic product. It must be notified before sale [3][4] |
| Who may apply | A company registered in the Philippines, with SEC or DTI registration documents [2] | A manufacturer, trader, or distributor with a valid LTO; every CPR application must include an LTO [2] | A company with a valid LTO that lists cosmetic manufacturing, trading, or distribution-import activities [3] |
| Validity | Varies by company size and by old or new rules; refer to the issued certificate | 2–5 years initially; 5 years on renewal [1] | 1, 2, or 3 years, selected when applying [3] |
| Official fee under the old rate applicable on the verification date | Php 8,000 plus a 1% legal research fund fee for food distributors (import, export, wholesale) [2] | Php 200 per year for general food Category 1, Php 250 per year for Category 2, and Php 1,000 per year for dietary supplements, each plus a 1% legal research fund fee [2] | Php 500 per year, up to Php 1,500 for 3 years, plus Php 100 for each additional variant [3] |
| Official committed processing days | 14 working days for an initial application by a food trader or distributor [2] | 20 working days for a variation application [2] | 23 working days [3] |

The days in the table are the processing times in the FDA’s own Citizen’s Charter [2][3]. They do not include preparing documents in Taiwan, translation, or rounds of supplemental documents with the other party. Online estimates of “90 days” or “3 weeks” usually include all of this; they vary widely and should not be used to set a listing date.

Back to the scenario. When the other party says “we have FDA approval,” it most likely means its company has an LTO. That only means it can import. Your collagen powder does not yet have a CPR, and the face mask does not yet have a CPN.

## Which document does your product need? Four decision steps

**Step 1: Check the claims on the packaging and website.** Philippines rules say dietary supplements must not make therapeutic or medicinal claims, and food advertising must not make such claims without scientific evidence [1]. Claims that are routine in Taiwan may cause a product to be classified as a drug in the Philippines, which is outside the three documents covered here.

**Step 2: Classify the product.** Products that are eaten (including dietary supplements, beverages, and bottled water) use CPR [1]. Products applied to the body, used for washing, or used as cosmetics use CPN [3]. In the scenario, collagen powder uses CPR and the face mask uses CPN; the two tracks run separately.

**Step 3: Decide which company will hold the document.** A CPN may only be filed by a company registered to operate in the Philippines [4], and an LTO also requires Philippine company-registration documents [2]. If a Taiwan brand has no Philippines company, the document will be held in the name of the local company that holds the LTO. So do not ask merely, “Do you have FDA approval?” Ask, “Which activities are listed on your LTO?” A cosmetics business must list cosmetics activities [3], while a food business needs an LTO for food establishments [2].

**Step 4: File first, then import.** CPR is registered before sale [1], and cosmetics may only be sold after receiving the notification response [4]. Arranging certification after the goods arrive at the port reverses the order.

## What changed in 2025–2026

Philippines FDA rules have changed quickly over the past two years. Old online articles often have not caught up, so know at least these two points before filing:

- **New fees are suspended.** The new fee order, AO 2024-0016, issued by the Department of Health in 2024, increased most fees. Its implementation was suspended for 60 working days beginning in June 2025 [7], then extended. DC 2025-0574 in January 2026 extended the suspension for another 120 working days, during which the old rates continued to apply [6]. We found no official announcement by the verification date on whether the rates resumed after that extension. The table above uses the old rates; use the payment notice actually issued by the FDA before filing.
- **Food registration has moved to a new system.** FDA Circular 2026-0002 moved processed-food registration to the new eServices system, replacing the old electronic registration portal. For products registered in the old system, renewal or variation must be refiled as an initial application in the new system [5]. If the other party registered your product years ago in the old system, the next renewal is not just a one-form exercise.

## Which changes mean starting over

After a document is issued, some changes that seem small amount to a new registration in the Philippines:

- **Changing the manufacturer or contract manufacturer, or changing the formula:** this is treated as an initial CPR registration for food [1]. The common Taiwan move of changing contract manufacturers to reduce cost must account for this time.
- **Changing the brand name or the company that holds distribution rights:** cosmetics require a new notification, not a modification [4].
- **A product or its label is found noncompliant:** if it is not corrected within 6 months, the CPR will be revoked and an initial application is required again [1].

Why changing the distributor can become stuck is related to whose name the document is under. We covered the contract provisions to address first in [the difference between agents, distributors, and exclusivity](/insights/agent-vs-distributor-exclusive).

## When we do not recommend following this article

- **Your product makes therapeutic claims, or it is already a drug or medical device.** Those use procedures from other FDA centers and are outside these three documents.
- **You already have a Philippines company and your own regulatory staff.** You need to read the FDA’s administrative orders and Citizen’s Charter directly, not this article.
- **You do not yet know whether anyone in the Philippines will buy.** All three documents require time and official fees. Confirm demand first. Start with a [Market Test](/services/product-testing) for NT$10,000–NT$20,000; you can stop after it is complete.

## Frequently asked questions

**How long does Philippines FDA registration take?**
The FDA Citizen’s Charter lists 14 working days for an initial food-distributor LTO application, 20 working days for a food CPR variation, and 23 working days for a cosmetic CPN [2][3]. Those are official processing times and exclude document preparation and supplemental documents; the LTO must also come first before CPR or CPN can be filed.

**Can a Taiwan company apply for Philippines FDA registration itself?**
No. An LTO requires Philippines company-registration documents [2], and a cosmetic notification may only be filed by a company registered to operate in the Philippines [4]. Without a local company, a Taiwan brand applies through a local importer or distributor holding an LTO, and the document is held in that company’s name.

**Do cosmetics also need a CPR?**
No. Cosmetics use CPN, a notification system [3][4]; CPR is for food and dietary supplements [1]. If the same company sells both categories, its LTO must list the corresponding activities.

## One smallest next step

Make a table of the products you plan to sell in the Philippines with just three columns: **product name, food/dietary supplement/cosmetic, and the claims on the packaging.** Then ask the other party one question: “Which activities are listed on your LTO?” If you can fill out the table and the other party can answer, you already know which documents to apply for. If one column is stuck, ask us about that one on LINE.

Last verified: 2026-10-01. The Philippines FDA’s fees and registration system are changing, so check the FDA’s current notices before filing.`],
  faq: [
    {
      q: "How long does Philippines FDA registration take?",
      a: "The FDA Citizen’s Charter lists 14 working days for an initial food-distributor LTO application, 20 working days for a food CPR variation, and 23 working days for a cosmetic CPN. Those are official processing times and exclude preparing documents in Taiwan, translation, and supplemental documents; an LTO must come first before CPR and CPN can be filed.",
    },
    {
      q: "Can a Taiwan company apply for Philippines FDA registration itself?",
      a: "No. An LTO requires Philippines company-registration documents, and a cosmetic notification may only be filed by a company registered to operate in the Philippines. Without a local company, a Taiwan brand applies through a local importer or distributor holding an LTO, and the document is held in that company’s name.",
    },
    {
      q: "Do cosmetics also need a CPR?",
      a: "No. Cosmetics use CPN, a pre-market notification; food and dietary supplements use CPR registration. If the same local company sells both categories, its LTO must list the corresponding food and cosmetics activities.",
    },
  ],
  sources: [
    {
      id: 1,
      title: "DOH Administrative Order No. 2014-0029: Rules for food-establishment licensing and processed-food registration",
      publisher: "Philippines Department of Health / FDA (full text collected by FAOLEX)",
      url: "https://faolex.fao.org/docs/pdf/phi174226.pdf",
      note: "Food establishments need an LTO before operating; CPR is initially valid for 2–5 years and for 5 years on renewal; dietary supplements may not make therapeutic claims; changing manufacturer or formula is treated as an initial registration; CPR is revoked if noncompliance is not corrected within 6 months.",
    },
    {
      id: 2,
      title: "FDA Citizen’s Charter 2024 (1st Edition, as of 18 July 2024)",
      publisher: "Philippines FDA",
      url: "https://www.fda.gov.ph/wp-content/uploads/2024/07/CC_FDA-CC-2024-as-of-18-July-2024.pdf",
      note: "Initial LTO for a food distributor (import, export, wholesale): Php 8,000 plus 1% LRF and 14 working days, with SEC or DTI registration required; every CPR application requires a valid LTO; annual food CPR fees are Php 200 for Category 1, Php 250 for Category 2, and Php 1,000 for dietary supplements; CPR variations take 20 working days.",
    },
    {
      id: 3,
      title: "Citizen’s Charter: Issuance of Cosmetic Product Notification",
      publisher: "Philippines FDA",
      url: "https://www.fda.gov.ph/wp-content/uploads/2025/09/1.-Issuance-of-Cosmetic-Product-Notification.pdf",
      note: "Applicants must hold a valid LTO listing cosmetic manufacturing, trading, or distribution-import activities; Php 500 for 1 year, Php 1,000 for 2 years, Php 1,500 for 3 years, plus 1% LRF and Php 100 per variant; processing takes 23 working days and 15 minutes.",
    },
    {
      id: 4,
      title: "ASEAN Cosmetic Directive: Frequently Asked Questions on Cosmetic Product Notification",
      publisher: "Philippines FDA (ASEAN Cosmetic Directive Appendix 5)",
      url: "https://www.fda.gov.ph/wp-content/uploads/2021/03/FAQ_Notification.pdf",
      note: "Question 1: notification and a response are required before sale; Question 7: only companies registered to operate locally may file notifications; Question 9: changing the company because distribution rights changed requires a new notification.",
    },
    {
      id: 5,
      title: "Philippines FDA upgrades food registration with new eServices",
      publisher: "ChemLinked (regulatory media reporting on FDA Circular No. 2026-0002)",
      url: "https://food.chemlinked.com/news/food-news/philippines-fda-upgrades-food-registration-with-new-eservices",
      note: "Reported 2026-06-08: processed-food registration has moved to the eServices system; renewals and variations for products registered through the old portal must be refiled as initial applications.",
    },
    {
      id: 6,
      title: "Further extension of the suspension period for implementation of AO No. 2024-0016",
      publisher: "Andaman Medical (reporting on Department Circular No. 2025-0574)",
      url: "https://andamanmed.com/philippines-further-extension-of-the-suspension-period-under-department-circular-no-2025-0240-and-its-subsequent-extension-pertaining-to-the-implementation-of-administrative-order-no-2024-0016-ent/",
      note: "On 2026-01-20, the suspension of the new-fee AO 2024-0016 was extended by another 120 working days; existing rates continued during the suspension.",
    },
    {
      id: 7,
      title: "Department Circular No. 2025-0240: Temporary suspension for sixty (60) working days of implementation of AO No. 2024-0016",
      publisher: "Philippines Department of Health / FDA",
      url: "https://www.fda.gov.ph/department-circular-no-2025-0240-all-undersecretaries-and-assistant-secretaries-directors-of-bureaus-services-and-centers-for-health-development-minister-of-health-bangsamoro-autonomous-region/",
      note: "Implementation of the new fees was suspended for 60 working days beginning in June 2025.",
    },
  ],
};
