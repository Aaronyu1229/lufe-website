import type { EnglishArticle } from "./index";

// Fingerprint of the Chinese article this English was translated from; registry.test.ts prints the new value when Chinese changes.
export const article: EnglishArticle = {
  slug: "philippines-food-cosmetic-label-checklist",
  sourceFingerprint: "68e579690c79e6c2",
  title: "What Must Change When a Taiwanese Food Label Goes to the Philippines? A Label Checklist for Food and Cosmetics",
  summary: "When a Taiwanese food label goes to the Philippines, you need to add English, the importer and country of origin, the allergen placement, the date format and the lot code; cosmetics need the nine items of the ASEAN labeling requirements. One checklist compares Philippine AO 2014-0030 and the ASEAN cosmetic labeling requirements, and explains that translation stickers can be used for at most 6 months.",
  readTime: "6 min read",
  content: [String.raw`> **Short answer:** When a Taiwanese food label goes to the Philippines, you need to add at least English, the importer and country of origin, the allergen placement, the date format and the lot code. Cosmetics need the nine items of the ASEAN labeling requirements.

## Scenario: a box of pineapple cakes reaches Manila, and the importer sends back a list

The following is a hypothetical scenario, not the story of a specific client.

Your company makes pineapple cakes and also a hand cream. An importer in Manila looked at the samples and is willing to file with the Philippine FDA for you, but first sends back a list: the box is only in Chinese, there is no importer, the allergens are not listed, the expiry date is written as 2026/12/31, and the outer box has a large photo of a pineapple.

You look at the packaging that has sold in Taiwan for years without anyone questioning the label, and your first thought is: "Can't we just add an English sticker?"

This article separates what a sticker can fix from what has to be redesigned. The short answer: in the Philippines, a translation sticker is a stopgap, not a solution.

## Food: one table of the nine things to change

The Philippine labeling rules for prepackaged food are Department of Health AO 2014-0030 [1]. In Taiwan, the legal basis is Article 22 of the Act Governing Food Safety and Sanitation, which requires the name, contents, net weight, manufacturer, place of origin, expiry date, nutrition labeling and more to be labeled in Chinese [4]. The two point in the same direction; the difference is in how things are written.

| Item | Philippine rule | What to check when redesigning |
|---|---|---|
| Language | English or Filipino, or both; imported products labeled in a foreign language must carry an English translation [1] | Chinese can stay, but English cannot be missing |
| Product name | On the principal display panel, in bold, in a size reasonably related to the largest text on that panel (for example the brand name) [1] | The English name cannot be tucked in a corner |
| Ingredients | In descending order of proportion; flavors must be labeled as natural, nature-identical or artificial [1] | A plain "flavoring" must be broken out |
| Allergens | Directly below the ingredient list; must declare cereals containing gluten, crustaceans, eggs, fish, peanuts and soybeans, milk (including lactose), tree nuts, and sulphite at 10 mg per kg or more [1] | Flour, butter and eggs all need to be listed |
| Net weight | In metric units, parallel to the base of the package [1] | Vertical layouts need to be turned |
| Importer and country of origin | Imported products must show the importer's complete name and address and the country of origin [1] | Until the importer is settled, the label cannot be finalized |
| Expiry date | In day, month, year order; day and year in numbers, the month in words, for example 01 January 2012 [1] | A format like 2026/12/31 must change |
| Lot code | Embossed or otherwise permanently marked on the immediate package [1] | A lot code on a sticker does not count |
| Nutrition labeling | Mandatory; energy, protein, carbohydrate (including dietary fiber and sugar), fat (including saturated fat, trans fat and cholesterol) and sodium, declared per usual serving [1] | Re-lay it out in the Philippine format |

Back to the scenario: all five problems on the importer's list are in this table.

## Package photos and claims: where Taiwanese copy most often goes wrong

**Photos must match the contents.** If the label shows a photo of fruit, vegetables, meat, fish or eggs, the product must actually contain those ingredients or substances naturally derived from them; if flavoring is added to boost the taste, "Flavor Added" must appear conspicuously next to the photo [1]. For the pineapple photo in the scenario, the question is whether the filling actually contains pineapple.

**Claims you cannot make.** AO 2014-0030 prohibits labels from claiming that a food prevents or treats disease, prohibits hygiene words such as wholesome or healthful, and prohibits a "free from" claim for something the product never contained [1]. Nutrition and health claims must follow FDA guidelines and Codex guidelines [1]. The "no additives" wording common in Taiwan should be checked against these rules before it is translated into English.

## What a sticker can fix

- **Translations can go on a sticker first, but for at most 6 months.** Until existing labels run out, the English or Filipino translation can be on a temporary sticker; the information must be accurate and legible, all on a single sticker, and the sticker must not be easy to remove [1].
- **The product authorization number can be added by sticker.** It consists of the LTO number and the registration number [1].
- **Whether the importer's name and address can be added by sticker is not stated in the AO.** As of our verification date we could not find an official answer; ask the importer to confirm with the FDA before filing.

So the safer approach is: use stickers for the first batch and start the redesign at the same time.

## Cosmetics: complete the nine items of the ASEAN labeling requirements

Cosmetics in the Philippines follow the ASEAN Cosmetic Directive. The outer packaging (or the immediate packaging if there is no outer packaging) must show: the product name and function, directions for use, the full ingredient list, the country of manufacture, the name and address of the company responsible for placing the product on the local market, the contents, the manufacturer's batch number, the manufacturing date or expiry date, and special precautions [2].

- **Full ingredients** are listed in descending order of weight; ingredients below 1% may be listed in any order [2].
- **Dates** must be preceded by "expiry date" or "best before"; products with a minimum durability of less than 30 months must show an expiry date [2].
- **Language** is English and/or the national language or a language the consumer understands; member countries may require the name and function, directions for use, responsible company, contents and precautions to be in the national language [2].
- When the Philippine FDA receives cosmetic documents, a label sample must be attached; if the original label does not meet the ASEAN requirements, a separate compliant label draft must be attached [3].

The "company responsible for placing the product on the local market" is the company holding the notification. We broke down whose name the certificates are held under in [What is the difference between the Philippine FDA LTO, CPR and CPN](/insights/philippines-fda-lto-cpr-cpn).

## Redesign order: five steps

1. **Settle the importer first.** The label must show its name and address; for the whole process, see [The steps and documents for exporting Taiwanese food to the Philippines](/insights/taiwan-food-export-philippines-steps).
2. **Check allergens and flavors against the ingredient list.**
3. **Re-lay out the nutrition labeling in the Philippine format.**
4. **Produce the English label draft and have the importer confirm it before filing.**
5. **Use translation stickers for the first batch, and switch to new packaging within 6 months.** If a label violation is found after the certificate is issued and is not corrected within 6 months, the food CPR is revoked [5].

## When we do not recommend redesigning yet

- **You have not found an importer.** The label would be missing a field, and anything printed would have to be reprinted.
- **You do not yet know whether anyone in the Philippines will buy.** A redesign costs money. Start with a [Market Test](/services/product-testing), NT$10,000–20,000, and you can stop there.
- **The product makes therapeutic claims.** It may then be a drug, which is outside the scope of this checklist.

## FAQ

**What must a food label show?**
In the Philippines, prepackaged food must show at least the name, ingredients, allergens, net weight, the business name and address (for imports, the importer and country of origin), the lot code, the expiry date and nutrition labeling [1]. In Taiwan, under Article 22 of the Act Governing Food Safety and Sanitation, the name, contents, net weight, food additives, manufacturer details, place of origin, expiry date, nutrition labeling and more must be labeled in Chinese [4].

**Can a food label in the Philippines be in Chinese only?**
No. Labels must be in English or Filipino, and imported products labeled in a foreign language must carry an English translation [1].

**How long can an English sticker be used?**
A translation sticker is a stopgap until existing labels run out, for at most 6 months, and it must be a single sticker that is not easy to remove [1].

## One small next step

Take a box of your current packaging and tick through the table above row by row. The rows you cannot tick are your redesign list; for any row where you are unsure how to read the original rule, send us one question on LINE.

This article compiles experience and practice and is not legal advice. Last verified: 2026-10-04. Philippine FDA rules are subject to the current announcements.`],
  faq: [
    { q: "What must a food label show?", a: "In the Philippines, under Department of Health AO 2014-0030, prepackaged food must show at least the name, ingredients, allergens, net weight, the business name and address (imports must add the importer and country of origin), the lot code, the expiry date and nutrition labeling. In Taiwan, under Article 22 of the Act Governing Food Safety and Sanitation, the name, contents, net weight, food additives, manufacturer details, place of origin, expiry date, nutrition labeling and more must be labeled in Chinese." },
    { q: "Can a food label in the Philippines be in Chinese only?", a: "No. The Philippines requires labels in English or Filipino, or both; imported food labeled in a foreign language must carry an English translation." },
    { q: "How long can an English sticker be used?", a: "A translation sticker is a stopgap until existing labels run out, for at most 6 months; all information must be accurate and legible, on a single sticker, and the sticker must not be easy to remove. The safer approach is to use stickers for the first batch and start the redesign at the same time." },
  ],
  sources: [
    { id: 1, title: "DOH Administrative Order No. 2014-0030 (revised rules on labeling of prepackaged food)", publisher: "Philippine Department of Health / FDA (full text on FAOLEX)", url: "https://faolex.fao.org/docs/pdf/phi174223.pdf", note: "Labels must be in English or Filipino, and foreign-language labels must carry an English translation; imports must show the importer's name and address and the country of origin; allergens go directly below the ingredient list; expiry dates follow day, month, year with the month in words; lot codes must be permanent; nutrition labeling is mandatory; translation stickers for at most 6 months; prohibited therapeutic and wholesome-type claims and photo rules." },
    { id: 2, title: "Appendix II: ASEAN Cosmetic Labeling Requirements", publisher: "ASEAN Secretariat (ASEAN Cosmetic Directive)", url: "https://asean.org/wp-content/uploads/2012/05/Appendix-II-ASEAN-Cosmetic-Labeling-Requirements.pdf", note: "Nine mandatory items on the outer packaging; full ingredients in descending order of weight, with those below 1% in any order; dates preceded by expiry date or best before, with an expiry date required for minimum durability under 30 months; language rules." },
    { id: 3, title: "Bureau Circular No. 2006-017", publisher: "Philippine FDA (formerly BFAD)", url: "https://www.fda.gov.ph/wp-content/uploads/2021/08/Bureau-Circular-No.-2006-017.pdf", note: "Cosmetics must attach label samples; where the original label does not meet the ASEAN labeling requirements, a compliant label draft must be attached." },
    { id: 4, title: "Article 22 of the Act Governing Food Safety and Sanitation", publisher: "Laws & Regulations Database, Ministry of Justice", url: "https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=L0040001&flno=22", note: "Food containers or outer packaging must clearly label, in Chinese and common symbols, the name, contents, net weight, food additives, manufacturer, place of origin, expiry date, nutrition labeling and other items." },
    { id: 5, title: "DOH Administrative Order No. 2014-0029 (rules on food business licensing and processed food registration)", publisher: "Philippine Department of Health / FDA (full text on FAOLEX)", url: "https://faolex.fao.org/docs/pdf/phi174226.pdf", note: "If a product or label violation is not corrected within 6 months, the CPR is revoked." },
  ],
};
