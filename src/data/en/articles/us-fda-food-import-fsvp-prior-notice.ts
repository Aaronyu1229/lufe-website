import type { EnglishArticle } from "./index";

// Fingerprint of the Chinese article this English was translated from; registry.test.ts prints the new value when Chinese changes.
export const article: EnglishArticle = {
  slug: "us-fda-food-import-fsvp-prior-notice",
  sourceFingerprint: "199ea534187e266d",
  title: "What Is FSVP? Three Things US FDA Food Imports Require: Facility Registration, FSVP and Prior Notice",
  summary: "FSVP is the verification a US importer performs on a foreign food supplier, not a certificate a Taiwanese factory applies for. Conventional food entering the US needs facility registration by the factory, FSVP carried out by the importer, and prior notice before each shipment arrives. One table shows who is responsible and what happens if it is skipped, plus the special rules for seafood, low-acid canned foods and labeling.",
  readTime: "6 min read",
  content: [String.raw`> **Short answer:** FSVP is the supplier verification a US importer performs on your Taiwanese factory, not a certificate you apply for. Conventional food entering the US also needs facility registration by the factory and prior notice before each shipment arrives.

## Scenario: a buyer in Los Angeles asks "Do you have FSVP?"

The following is a hypothetical scenario, not the story of a specific client.

Your factory makes shacha sauce and chili sauce and has steady channels in Taiwan. A buyer from an Asian supermarket in Los Angeles looked at the samples and wrote back: "Do you have an FDA registration number? Who is the FSVP importer?"

You search for FSVP and get a list of English training courses and consulting services. You start to worry: is this yet another certificate that costs money? How long does it take? Does the factory have to be audited by Americans first?

The conclusion first: FSVP is not a certificate; it is the US importer's obligation. But when the importer carries out FSVP, most of the information it needs is in your hands. Below, the three things are taken apart.

## Three things in one table

| Item | What to do | Who is responsible | What happens if it is skipped |
|---|---|---|---|
| Facility registration | Facilities that manufacture, process, pack or hold food for consumption in the US register with the FDA; foreign facilities must designate a US agent; renew from October 1 to December 31 of every even-numbered year; no fee [1][2] | Taiwanese factory | The food may be held at the port [1] |
| FSVP | The importer conducts a hazard analysis, evaluates the supplier's performance and the food's risk, and carries out verification activities [3] | US importer | At customs entry, the FSVP importer's name, email and an FDA-recognized facility identifier must be provided; the FDA recognizes the DUNS number [3][4] |
| Prior Notice | Notify the FDA before each shipment arrives: 2 hours before by road, 4 hours by rail and air, 8 hours by sea; for mail, before it is sent [5] | Importer or customs broker | Refused admission and held at the port [5] |

Back to the scenario: of the buyer's two questions, the registration number is your factory's job, and the FSVP importer has to be someone on their side.

## What is FSVP? What will a Taiwanese factory be asked for?

FSVP (Foreign Supplier Verification Program) ensures that food produced by a foreign supplier provides at least the same level of public health protection as US requirements for hazard analysis and preventive controls, is not adulterated, and has correct allergen labeling [3].

**Who is the FSVP importer?** The US owner or consignee at the time of entry; if there is no US owner or consignee, it is the US agent designated by the foreign owner, who signs a statement of consent [3]. The Taiwanese factory itself cannot be the importer.

**The importer's verification activities** include on-site audits, sampling and testing, and reviewing the supplier's food safety records [3]. For you, what you will actually be asked for is: a food safety plan, test reports, or cooperation with an audit.

Two details:

- Records must be kept for at least 2 years, and records not in English must be translated into English upon FDA request [3]. Chinese HACCP documents need to be translatable into English.
- Very small importers get simplified rules; the threshold is an average of less than US$1 million per year in human food sales plus imports over the previous three years, adjusted for inflation [3]; the adjusted figure published by the FDA is US$1,409,899 [6].

## Two special cases: seafood, and low-acid canned and acidified foods

**Seafood follows a different rule.** Fish and fishery products from a foreign supplier that is required to comply with, and complies with, the seafood HACCP rules are not subject to FSVP; the importer instead carries out verification under 21 CFR 123.12 [7][8]. LUFÉ's [fish floss case](/cases/fish-floss-us-fda) notes: fish floss made only from fish is regulated by the FDA as a seafood product; once a certain proportion of meat floss is mixed in, it moves under the US Department of Agriculture; and whether dried fish floss must go through the low-acid canned food process depends on the measured water activity [9].

**Low-acid canned and acidified foods must register their processes first.** The processing plant registers on Form FDA 2541 within 10 days of starting production, and files its process within 60 days of registration and before packing a new product; if a foreign plant does not, the FDA asks the Treasury to refuse the product entry [10]. The form depends on the product: acidified foods use 2541e, and low-acid canned foods use 2541d, 2541f or 2541g [11]. For the shacha and chili sauces in the scenario, first confirm whether they are acidified foods.

## Labeling: nutrition facts and the 9 major allergens

- **Nutrition labeling**: required on food offered for sale for human consumption, except for exempt items [12].
- **Allergens**: FALCPA in 2004 named 8 major allergens; the FASTER Act, signed on April 23, 2021, made sesame the 9th, effective January 1, 2023 [13]. Sesame, soybeans and fish, common in shacha sauce, all need to be checked one by one.

## One thing to know for 2026

For the FDA's Food Traceability Rule, the FDA proposed moving the compliance date from January 20, 2026, to July 20, 2028 [14]; in a 2026 appropriations act, Congress also directed the FDA not to enforce it before that date [15]. As of our verification date we could not find a final rule for the extension in the Federal Register.

## When we do not recommend doing these things yet

- **You do not have a US importer yet.** FSVP and prior notice both need someone to do them; with no one on the other end, the shipment cannot go no matter how well you prepare.
- **The product contains meat.** Jurisdiction may move to the US Department of Agriculture, which is outside the scope of this article.
- **The product is a dietary supplement.** The rules are different; see [How do you get US FDA certification? Five things for exporting supplements to the US](/insights/us-fda-registration-guide).
- **You do not yet know whether US channels want it.** Spend a little first to confirm whether channels want you; see [North American retail](/services/north-america).

## FAQ

**What is FSVP?**
FSVP is the US Foreign Supplier Verification Program, under which the US importer conducts hazard analysis, evaluation and verification of a foreign food supplier to ensure imported food meets US safety requirements [3]. It is not a certificate a Taiwanese factory applies for.

**Can a Taiwanese factory act as its own FSVP importer?**
No. The FSVP importer is the US owner or consignee at the time of entry; if there is none, it is the US agent designated by the foreign owner, who signs a statement of consent [3].

**Does FDA food facility registration cost money?**
No, registration is free [1][2]. The FDA also does not issue registration certificates and does not recognize registration certificates issued by private businesses [2].

## One small next step

Before replying to the buyer, write three lines: the factory's FDA registration number, who is the FSVP importer, and who submits prior notice. For any line you cannot fill in, send us one question on LINE.

This article compiles experience and practice and is not legal advice. Last verified: 2026-10-04. FDA rules are subject to the current version of the official pages.`],
  faq: [
    { q: "What is FSVP?", a: "FSVP (Foreign Supplier Verification Program) is the US importer's obligation: to conduct a hazard analysis of a foreign food supplier, evaluate the supplier's performance, and carry out verification activities such as on-site audits, sampling and testing, or record review, to ensure imported food meets US safety requirements. It is not a certificate a Taiwanese factory applies for." },
    { q: "Can a Taiwanese factory act as its own FSVP importer?", a: "No. The FSVP importer is the US owner or consignee at the time of entry; if there is no US owner or consignee, it is the US agent designated by the foreign owner, who signs a statement of consent." },
    { q: "Does FDA food facility registration cost money?", a: "No. FDA food facility registration is free; foreign facilities must designate a US agent and renew from October 1 to December 31 of every even-numbered year. The FDA also does not issue registration certificates and does not recognize registration certificates issued by private businesses." },
  ],
  sources: [
    { id: 1, title: "21 CFR Part 1 Subpart H: Food facility registration", publisher: "Electronic Code of Federal Regulations (eCFR)", url: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-A/part-1/subpart-H", note: "Who must register, foreign facilities need a US agent, renewal from October 1 to December 31 of even-numbered years, no registration fee; food from unregistered facilities may be held at the port." },
    { id: 2, title: "Questions regarding whether food facilities are required to pay registration fees and private entities' claims of FDA affiliation", publisher: "US FDA", url: "https://www.fda.gov/food/guidance-regulation-food-and-dietary-supplements/questions-regarding-whether-food-facilities-are-required-pay-registration-fees-and-private", note: "Registration is free; the FDA does not issue registration certificates and does not recognize registration certificates issued by private businesses." },
    { id: 3, title: "21 CFR Part 1 Subpart L: Foreign Supplier Verification Programs (FSVP)", publisher: "Electronic Code of Federal Regulations (eCFR)", url: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-A/part-1/subpart-L", note: "Definition of FSVP importer, hazard analysis, supplier evaluation and verification activities, entry filing, 2-year record retention and English translation, and the very small importer threshold." },
    { id: 4, title: "FSMA Final Rule on Foreign Supplier Verification Programs", publisher: "US FDA", url: "https://www.fda.gov/food/food-safety-modernization-act-fsma/fsma-final-rule-foreign-supplier-verification-programs-fsvp-importers-food-humans-and-animals", note: "The FDA recognizes the DUNS number as an acceptable facility identifier for FSVP." },
    { id: 5, title: "21 CFR Part 1 Subpart I: Prior notice of imported food", publisher: "Electronic Code of Federal Regulations (eCFR)", url: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-A/part-1/subpart-I", note: "Notice 2 hours before by road, 4 hours by rail and air, 8 hours by sea; for mail, before it is sent; food without notice is refused admission and held at the port." },
    { id: 6, title: "FSMA Inflation Adjusted Cut Offs", publisher: "US FDA", url: "https://www.fda.gov/food/food-safety-modernization-act-fsma/fsma-inflation-adjusted-cut-offs", note: "Inflation-adjusted threshold for FSVP very small importers (human food): US$1,409,899." },
    { id: 7, title: "21 CFR 1.501: Scope of FSVP", publisher: "Electronic Code of Federal Regulations (eCFR)", url: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-A/part-1/subpart-L/section-1.501", note: "Juice, fish and fishery products from suppliers required to comply with and in compliance with part 120 or part 123 are not subject to FSVP and follow 120.14 or 123.12 instead." },
    { id: 8, title: "21 CFR 123.12: Special requirements for imported products", publisher: "Electronic Code of Federal Regulations (eCFR)", url: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-B/part-123/subpart-A/section-123.12", note: "Seafood importers must have written verification procedures confirming that foreign processors meet the seafood HACCP rules." },
    { id: 9, title: "Taiwanese fish floss wants to enter the US: where is the first hurdle?", publisher: "LUFÉ case study", url: "https://lufe.world/cases/fish-floss-us-fda", note: "Fish floss made only from fish is regulated by the FDA as a seafood product; once a certain proportion of meat floss is mixed in, it moves under the US Department of Agriculture; whether it follows the low-acid canned food process depends on measured water activity." },
    { id: 10, title: "21 CFR Part 108: Emergency permit control (registration of low-acid canned and acidified foods)", publisher: "Electronic Code of Federal Regulations (eCFR)", url: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-B/part-108", note: "Register on Form FDA 2541 within 10 days of starting production, and file processes within 60 days of registration and before packing a new product; products from non-compliant foreign plants are refused entry." },
    { id: 11, title: "Establishment Registration & Process Filing for Acidified and Low-Acid Canned Foods", publisher: "US FDA", url: "https://www.fda.gov/food/registration-food-facilities-and-other-submissions/establishment-registration-process-filing-acidified-and-low-acid-canned-foods-lacf", note: "Acidified foods use Form FDA 2541e; low-acid canned foods use 2541d, 2541f or 2541g." },
    { id: 12, title: "21 CFR 101.9: Nutrition labeling of food", publisher: "Electronic Code of Federal Regulations (eCFR)", url: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-B/part-101/subpart-A/section-101.9", note: "Except where exempt, food offered for sale for human consumption must carry nutrition labeling." },
    { id: 13, title: "Food Allergies", publisher: "US FDA", url: "https://www.fda.gov/food/nutrition-food-labeling-and-critical-foods/food-allergies", note: "FALCPA in 2004 named 8 major allergens; the FASTER Act of April 23, 2021, made sesame the 9th, effective January 1, 2023." },
    { id: 14, title: "Requirements for Additional Traceability Records for Certain Foods: Compliance Date Extension (Proposed Rule)", publisher: "Federal Register", url: "https://www.federalregister.gov/documents/2025/08/07/2025-14967/requirements-for-additional-traceability-records-for-certain-foods-compliance-date-extension", note: "Proposed 2025-08-07: move the compliance date 30 months, from January 20, 2026, to July 20, 2028." },
    { id: 15, title: "FSMA Final Rule on Requirements for Additional Traceability Records for Certain Foods", publisher: "US FDA", url: "https://www.fda.gov/food/food-safety-modernization-act-fsma/fsma-final-rule-requirements-additional-traceability-records-certain-foods", note: "In a 2026 appropriations act, Congress directed the FDA not to enforce the Food Traceability Rule before the same date." },
  ],
};
