import type { EnglishArticle } from "./index";

// Fingerprint of the Chinese article this English was translated from; registry.test.ts prints the new value when Chinese changes.
export const article: EnglishArticle = {
  slug: "taiwan-food-export-philippines-steps",
  sourceFingerprint: "71da1605efa3611d",
  title: "How Do You Export Taiwanese Food to the Philippines? The Steps and Documents from Samples to Shelf",
  summary: "Exporting Taiwanese food to the Philippines runs in this order: find an importer with an LTO, apply for a sample import permit, prepare Taiwanese official certificates for the CPR, change the label, then clear customs and stock the shelf. One table lists who handles each step and which documents it needs, including the official fees and processing times for the Philippine FDA sample import permit and the TFDA Certificate of Free Sale.",
  readTime: "6 min read",
  content: [String.raw`> **Short answer:** Exporting Taiwanese food to the Philippines runs in this order: find an importer with an LTO, apply for a sample import permit, prepare Taiwanese official certificates for the CPR, change the label, and only then clear customs and stock the shelf.

## Scenario: a buyer in Manila says "send us ten boxes of samples first"

The following is a hypothetical scenario, not the story of a specific client.

Your company makes nougat. A buyer from a Manila supermarket tasted it at a trade show and left a business card: "Send us ten boxes of samples first and we will evaluate them."

Your first thought is to just send them by courier. Then a string of questions follows: do samples need some kind of permit? After the "evaluation," do you still have to deal with the Philippine FDA? Which certificates do you need on the Taiwan side? Could the samples arrive fine while the real shipment gets stuck because one document is missing?

This article breaks food exports to the Philippines into six steps and spells out who handles each one and which documents it needs.

## Six steps in one table

| Step | What to do | Who handles it | Documents to prepare |
|---|---|---|---|
| 1. Find an importer | Importing and distributing food in the Philippines requires an LTO; every CPR application must attach a valid LTO [1][2] | Philippine importer | The importer's LTO; check that its activities include food importing |
| 2. Send samples | For unregistered processed food imported for research or testing, a business holding an LTO first applies to the FDA for an import permit [2] | The importer applies; you prepare the documents | Application letter, notarized affidavit of undertaking, certificate of analysis or Certificate of Free Sale, pro forma invoice, packing list, bill of lading or air waybill [2] |
| 3. Prepare certificates in Taiwan | Apply to the TFDA for a Certificate of Free Sale or a health certificate [3] | You (the manufacturer or brand owner) | The original certificate or an electronic certificate [3] |
| 4. File the CPR | Register each product before it goes on sale [1] | The importer files | Distribution agreement or appointment letter, Taiwanese official certificate, complete label artwork for every package size [2] |
| 5. Change the label | English or Filipino, plus the importer's name and address and the country of origin [5] | You revise it; the importer confirms | The new label |
| 6. Ship and clear customs | Plant-based ingredients or products first need a quarantine import clearance from the Bureau of Plant Industry of the Philippine Department of Agriculture [6] | Importer and customs broker | Depends on the product |

Back to the scenario: the ten boxes of samples the buyer wants go through Step 2. What actually decides whether you can sell is Step 4.

## Step 2: samples are not just something you hand to a courier

The Philippine FDA's citizen's charter is clear: importing unregistered processed food for research or testing requires an import permit applied for by a business holding an LTO. The fee is Php 500 per invoice plus a 1% legal research fee, and the official processing time is 3 working days [2].

Two details to know first:

- **The applicant is the importer, not you.** The permit requires a valid LTO [2]. A Taiwanese company has no Philippine LTO, so only the importer or distributor can apply.
- **This permit cannot be used for market testing** [2]. The samples are for the other side to evaluate, not to sell and not to run a trial-sale event.

On your side, you prepare a certificate of analysis or Certificate of Free Sale, plus the pro forma invoice and packing list [2].

## Step 3: the certificates to obtain in Taiwan

For a Philippine CPR application, an imported product must attach one of the following five documents issued to the manufacturer by the regulatory authority of the country of origin [2]:

- GMP registration certificate
- Health certificate
- ISO 22000 or FSSC certificate
- HACCP certificate
- Certificate of Free Sale, attested by a recognized association or authenticated by a Philippine consular office

The TFDA's application notice states: a Certificate of Free Sale costs NT$3,000 per application and takes at most 8 working days; a health certificate that requires an on-site inspection costs NT$8,000 per application and takes at most 20 working days, and one without an on-site inspection costs NT$3,400 per application [3]. Since September 16, 2025, the TFDA has also offered electronic certificates [3].

If your factory already holds a HACCP or ISO 22000 certificate, ask the importer whether it can be used directly and save yourself an application.

## Step 4: the importer files the CPR, and the label must be fixed first

The CPR is a pre-market registration for a single product [1]. The importer holding the LTO files it, attaching complete label artwork for every package size [2]. So the label revision (Step 5) actually has to be finished before filing. Philippine labels must be in English or Filipino, and imported products must also show the importer's name and address and the country of origin [5].

From 2026, processed food registration moves to the FDA's new eServices system [4]. For how the LTO, CPR and CPN differ, see [What is the difference between the Philippine FDA LTO, CPR and CPN](/insights/philippines-fda-lto-cpr-cpn).

## Step 6: check two things before customs clearance

- **Plant-based ingredients.** Plant products such as tea leaves or dried fruit need a quarantine import clearance from the Bureau of Plant Industry of the Philippine Department of Agriculture before import [6]. Meat, dairy and seafood fall under other authorities; as of our verification date we had not opened the original texts, so confirm with the importer before shipping.
- **Taiwan and the Philippines have no free trade agreement.** The economic cooperation and free trade agreement partners listed by Taiwan's International Trade Administration do not include the Philippines [7], so duties are charged at the Philippines' general rates.

Who pays freight and where the goods are handed over depends on the trade terms you agree with the importer; Jumping Group's [Incoterms guide](https://jumping.group/insights/incoterms-trade-terms-guide) explains each term.

## When we do not recommend exporting yet

- **You do not have an importer yet.** The sample permit and the CPR both need the importer's LTO; with no one on the other end, none of the first five steps can move. For how to choose among the four entry modes, see [Four international market entry modes compared](/insights/market-entry-modes-compared).
- **The product contains meat ingredients.** The authority and import restrictions are different, and that is outside the scope of this article.
- **You do not yet know whether anyone in the Philippines will buy.** Samples, certificates and registration all cost money and time. Start with a [Market Test](/services/product-testing), NT$10,000–20,000, and you can stop there.

## FAQ

**What documents do I need to export food to the Philippines?**
On the Taiwan side: one official document from the country of origin (GMP, health certificate, ISO 22000 or FSSC, HACCP, or Certificate of Free Sale), a distribution agreement or appointment letter, and complete label artwork. On the Philippine side: the importer's LTO and a CPR for each product [1][2].

**What do I need to apply for to send samples to the Philippines?**
For unregistered processed food imported for research or testing, a Philippine business holding an LTO applies to the FDA for an import permit. The fee is Php 500 per invoice plus a 1% legal research fee, the official processing time is 3 working days, and the permit cannot be used for market testing [2].

**Do Taiwan and the Philippines have a free trade agreement?**
No. The agreement partners listed by the International Trade Administration do not include the Philippines [7].

## One small next step

Before replying to the buyer, ask one question: "Does your company have an LTO? Can you apply for the sample import permit?" If they can answer, Step 2 can start. If they cannot, or you are unsure which certificate to get in Taiwan, send us one question on LINE.

This article compiles experience and practice and is not legal advice. Last verified: 2026-10-04. The Philippine FDA's fees and systems are being revised; check the FDA's current announcements before filing.`],
  faq: [
    { q: "What documents do I need to export food to the Philippines?", a: "On the Taiwan side, prepare one document issued to the manufacturer by the authority of the country of origin (GMP registration, health certificate, ISO 22000 or FSSC, HACCP, or Certificate of Free Sale), a distribution agreement or appointment letter, and complete label artwork for every package size. On the Philippine side, the importer needs an LTO, and each product needs a CPR registration before it goes on sale." },
    { q: "What do I need to apply for to send samples to the Philippines?", a: "For unregistered processed food imported for research or testing, a Philippine business holding an LTO applies to the FDA for an import permit. The fee is Php 500 per invoice plus a 1% legal research fee, and the official processing time is 3 working days. This permit cannot be used for market testing." },
    { q: "Do Taiwan and the Philippines have a free trade agreement?", a: "No. The economic cooperation and free trade agreement partners listed by the International Trade Administration of the Ministry of Economic Affairs do not include the Philippines, so Taiwanese food entering the Philippines is charged at general rates." },
  ],
  sources: [
    { id: 1, title: "DOH Administrative Order No. 2014-0029 (rules on food business licensing and processed food registration)", publisher: "Philippine Department of Health / FDA (full text on FAOLEX)", url: "https://faolex.fao.org/docs/pdf/phi174226.pdf", note: "Food businesses must obtain an LTO before operating; processed food must be registered for a CPR before going on sale." },
    { id: 2, title: "FDA Citizen's Charter 2024 (1st Edition, as of 18 July 2024)", publisher: "Philippine FDA", url: "https://www.fda.gov.ph/wp-content/uploads/2024/07/CC_FDA-CC-2024-as-of-18-July-2024.pdf", note: "Import permit for research samples: Php 500 per invoice plus 1% LRF, 3 working days, not for market testing, and the required documents; every CPR application must attach a valid LTO; imported-product CPRs must attach one document from the country-of-origin authority, a distribution agreement and complete label artwork." },
    { id: 3, title: "Application notice for export food (additive) English health certificates, processing health certificates, test reports and Certificates of Free Sale", publisher: "Taiwan Food and Drug Administration, Ministry of Health and Welfare", url: "https://www.fda.gov.tw/TC/siteContent.aspx?sid=12413", note: "Certificate of Free Sale NT$3,000 per application, at most 8 working days; health certificate with on-site inspection NT$8,000 per application, at most 20 working days, without inspection NT$3,400 per application; electronic certificates offered since September 16, 2025." },
    { id: 4, title: "Philippines FDA Upgrades Food Registration with New eServices", publisher: "ChemLinked (regulatory news, reporting on FDA Circular No. 2026-0002)", url: "https://food.chemlinked.com/news/food-news/philippines-fda-upgrades-food-registration-with-new-eservices", note: "Reported 2026-06-08: processed food registration moves to the new eServices system." },
    { id: 5, title: "DOH Administrative Order No. 2014-0030 (revised rules on labeling of prepackaged food)", publisher: "Philippine Department of Health / FDA (full text on FAOLEX)", url: "https://faolex.fao.org/docs/pdf/phi174223.pdf", note: "Labels must be in English or Filipino; imported products must show the importer's name and address and the country of origin." },
    { id: 6, title: "DA Department Circular, Series of 2016: Guidelines on the Importation of Plants, Planting Materials and Plant Products", publisher: "Philippine Department of Agriculture (full text on FAOLEX)", url: "https://faolex.fao.org/docs/pdf/phi192241.pdf", note: "2016-06-09: plant products need an SPS import clearance (SPSIC) issued by the Bureau of Plant Industry (BPI) before import." },
    { id: 7, title: "Economic Cooperation and Free Trade Agreements portal", publisher: "International Trade Administration, Ministry of Economic Affairs", url: "https://fta.trade.gov.tw/", note: "Listed partners include Singapore, New Zealand and Paraguay, among others; the Philippines is not listed." },
  ],
};
