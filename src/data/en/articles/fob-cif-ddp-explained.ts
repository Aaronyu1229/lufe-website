import type { EnglishArticle } from "./index";

// Fingerprint of the Chinese article this English was translated from; registry.test.ts prints the new value when Chinese changes.
export const article: EnglishArticle = {
  slug: "fob-cif-ddp-explained",
  sourceFingerprint: "c1626ddf2124fd03",
  title: "What do FOB, CIF, and DDP mean? Five Incoterms terms for your first export quotation",
  summary: "With FOB, the seller is responsible before goods are loaded on the ship and the buyer after; CIF adds freight and minimum insurance; DDP has the seller deliver to the door and pay import duties. Compare who is responsible for what under EXW, FOB, CIF, DAP, and DDP, when risk transfers, who pays duties, and how to choose for a first quotation.",
  readTime: "6 min read",
  content: [String.raw`> **Short answer:** Under FOB, the seller is responsible before goods are loaded on the ship and the buyer afterwards, with the buyer paying duties. Under CIF, the seller also pays freight and minimum insurance. Under DDP, the seller delivers to the door and pays the duties too.

## Scenario: a food business owner receives an email asking for “FOB Kaohsiung”

You make sauces that have sold in Taiwan for more than ten years. This year, an importer from Singapore took samples at a trade show. Two weeks later, an email arrives with only three lines: “We tried the samples. Please quote FOB Kaohsiung, 24 bottles per carton, estimated 500 cartons to start.”

You forward the email to your sales manager. She looks it up and says FOB means “free on board.” You ask whether freight should be included, whether you need insurance, and who pays duties at the other end. She says she needs to check. So you search for “what does FOB mean” yourself. The explanations all say “risk transfers when the goods pass the ship’s rail,” but your goods move in containers—where is the ship’s rail in that?

You are actually stuck on three questions: **which price the buyer wants, how far that price covers, and who is responsible for the part it does not cover.** Those are the three things Incoterms define. The table below explains the five terms you will encounter most often.

## Five common terms: who is responsible to where, when risk transfers, and who pays duties

Incoterms are trade terms set by the International Chamber of Commerce (ICC). The current version is Incoterms 2020, with 11 terms in total [1]. Seven apply to any mode of transport, and four apply only to sea and inland-waterway transport [7]. Taiwanese exporters most often encounter these five:

| Term | How far the seller (you) is responsible | When risk transfers to the buyer | Who pays international freight | Who handles import clearance and duties | Transport |
|---|---|---|---|---|---|
| **EXW** Ex Works | Goods are ready at your factory or warehouse; you do not load the vehicle or arrange export clearance [6] | When the goods are made available to the buyer | Buyer | Buyer, including export clearance [6] | Any mode, but the ICC says it is mainly suited to domestic trade [2] |
| **FOB** Free On Board | Deliver to the named port of export, load on the vessel nominated by the buyer, and complete export clearance [3] | When the goods are loaded on board [3] | Buyer [3] | Buyer [3] | Sea and inland waterway only [3] |
| **CIF** Cost, Insurance and Freight | Same as FOB, plus freight and insurance to the destination port [4] | When the goods are loaded at the port of export, the same point as FOB [4] | Seller [4] | Buyer [4] | Sea and inland waterway only [4] |
| **DAP** Delivered At Place | Transport to the place named by the buyer, ready for unloading from the arriving vehicle, and complete export and transit clearance [5] | When the goods arrive at the named place ready for unloading [5] | Seller | Buyer [5] | Any mode |
| **DDP** Delivered Duty Paid | Same as DAP, plus import clearance and payment of import duties and taxes [5] | When the goods arrive at the named place ready for unloading [5] | Seller | Seller [5] | Any mode |

Jumping Freight has a separate article, [What does FOB mean?](https://jumping.group/insights/fob-destination-port-pitfalls), that explains the division of responsibilities under FOB and common extra charges at the destination port in more detail. This article focuses on choosing terms for a first quotation.

Returning to the email in the scenario, “FOB Kaohsiung” means you deliver the goods to Kaohsiung Port, load them onto the vessel the buyer nominated, and complete Taiwan export clearance; your quotation ends there [3]. The buyer finds and pays the shipping line for freight from Kaohsiung to Singapore, chooses whether to buy insurance, and handles import clearance and duties in Singapore. Your quotation should include the ex-works price, export packaging, inland freight to Kaohsiung Port, port charges, and export-clearance fees.

## How to choose a term for your first export quotation

No term is right for every situation, but three questions can guide the decision:

**Did the buyer specify one?** If so, quote it. If the buyer asks for FOB and you reply with CIF, they will think you did not read the email. To change the term, first quote the one requested, then add another figure: “If you need us to arrange transport, the CIF price is …”

**Do you have a freight forwarder?** If you do, you can quote both F and C terms because the forwarder tells you the freight cost. If you do not, you can only quote EXW. Yet the ICC itself says EXW is mainly suited to domestic trade, and buyers can face practical difficulty arranging export clearance in your country [2][6]. For a first export, finding a freight forwarder to calculate an FOB price is a more reliable starting point than quoting EXW.

**How far do you want to carry the risk?** For both F and C terms, risk transfers at the port of export [3][4]; the difference is only who pays freight. Under D terms, risk follows the goods all the way to the buyer’s warehouse [5]. DDP also means that you pay the buyer’s import duties. On a first export, you will usually not want to carry risk that far.

Once you decide on a term, **always write Incoterms 2020 plus the place on the quotation**, for example, “FOB Kaohsiung, Incoterms 2020.” Writing FOB without a port does not clearly state the delivery point.

## Common misunderstandings

- **FOB does not mean freight included.** Under FOB, the buyer separately engages a shipping line to transport the goods [3]. Many first-time exporters mistake FOB for delivery to the buyer’s port, quote FOB, and then pay the freight themselves.
- **FOB is for sea transport only; containers should in fact use FCA.** The ICC says FAS and FOB are limited to sea transport, and containers or multimodal transport should use FCA because containers are delivered to a container terminal rather than loaded onto the vessel by the seller [2][3]. In practice, many buyers still use FOB out of habit, and you can quote it, but you need to know that risk transfers when the goods are loaded on board: while the container waits at the terminal for the vessel, the risk is still yours.
- **CIF insurance is minimum cover.** CIF only requires the seller to buy the minimum cover under Clause C [1][4]. If the buyer assumes CIF means “all risks,” they will come back to you when something goes wrong.
- **The buyer still pays duties under CIF.** Under C terms, the seller only adds freight and insurance; import clearance and duties remain the buyer’s responsibility [4].
- **DDP means you must be able to act as importer in the buyer’s country.** DDP requires the seller to arrange import clearance and pay duties [5]. The ICC itself warns that customs in some countries require a local importer to complete import clearance, leaving the seller unable to do so; DAP should be used instead [2][5]. If a buyer asks for DDP on a first export, first ask who can be the local importer.
- **EXW is not “the easiest.”** It may look as though you need do nothing, but the buyer has to arrange export clearance in Taiwan, which the ICC notes may create accounting and tax complexity [6].

## When we do not recommend choosing a term yet

- **You have not calculated landed cost.** The term defines how far your quotation covers, but the buyer calculates the total cost of having goods ready to sell in its warehouse. First break down the [seven parts of landed cost](/insights/landed-cost-before-export), then decide which parts to include in the quotation.
- **The product is FDA-regulated and product registration in the buyer’s country has not started.** Who acts as importer and whose name holds the registration are the same question. Until the importer is decided, you cannot quote D terms.
- **The buyer asks for DDP but you do not have a local importer.** Resolve the importer first, then discuss terms.
- **You already have a regular freight forwarder and ship every month.** You need to confirm that the contract uses Incoterms 2020, not this article.

## Frequently asked questions

**For a first quotation, should I quote FOB or EXW?**
For most first-time exporters, FOB is more suitable (consider FCA for containerised goods); EXW is not recommended. EXW is mainly suited to domestic trade, and the buyer may not be able to arrange export clearance in Taiwan [2]. With FOB, you complete export clearance and risk transfers to the buyer once goods are loaded on board [3].

**What is the difference between CIF and FOB?**
The point of risk transfer is the same: when goods are loaded on board. The difference is that under CIF the seller also pays freight and minimum insurance to the destination port [4], so a CIF price is higher than an FOB price; the buyer pays duties under both.

**Does DDP mean duty-paid delivery to the door? Can I quote DDP?**
Yes. The seller delivers to the door and pays import duties [5]. But the seller must be able to arrange import clearance in the buyer’s country. If that is not possible, the ICC recommends DAP [2][5]. DDP is not recommended for a first export.

## One smallest next step

Before replying to that email, do two things. Use [TradePilot](https://tradepiloter.com) to check the duty on your product in the buyer’s country, so you know how much the buyer will pay beyond FOB and the quotation does not stall halfway through. Then ask a freight forwarder for the cost of delivery to Kaohsiung Port, loading, and export clearance. You will then have your FOB price. If both steps are blocked, send us a message on LINE.

This article is based on the ICC’s official Incoterms 2020 guidance and contains no freight or tariff-rate figures. Last verified: 2026-10-01.`],
  faq: [
    {
      q: "For a first quotation, should I quote FOB or EXW?",
      a: "For most first-time Taiwanese exporters, FOB is more suitable (consider FCA for containerised goods); EXW is not recommended. The ICC explains that EXW is mainly suited to domestic trade, and the buyer may not be able to arrange export clearance in Taiwan. With FOB, you complete export clearance and risk transfers to the buyer once goods are loaded on board, making the division of responsibility clear. For the responsibilities under FOB and common destination-port charges, see Jumping Freight’s What does FOB mean?",
    },
    {
      q: "What is the difference between CIF and FOB?",
      a: "The point of risk transfer is the same: when goods are loaded on board. The difference is financial: under CIF, the seller also pays international freight and insurance to the destination port, so a CIF price is higher than an FOB price. But CIF insurance only requires the minimum level under the ICC’s Clause C, and import clearance and duties remain the buyer’s responsibility.",
    },
    {
      q: "Does DDP mean duty-paid delivery to the door? Can I quote DDP?",
      a: "Yes. Under DDP, the seller delivers to the place named by the buyer and pays for import clearance, duties, and taxes. But DDP requires the seller to be able to arrange import clearance in the buyer’s country. Customs in some countries require a local importer to do this, in which case the ICC recommends DAP. DDP is not recommended for a first export.",
    },
  ],
  sources: [
    {
      id: 1,
      title: "Incoterms 2020",
      publisher: "International Chamber of Commerce (ICC)",
      url: "https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/",
      note: "Incoterms 2020 contains 11 terms. CIF retains the default insurance level of Institute Cargo Clauses (C), while CIP raises it to (A). Costs under each term are set out in A9/B9.",
    },
    {
      id: 2,
      title: "Incoterms 2020 Checklist and Flowcharts (2024 update)",
      publisher: "International Chamber of Commerce (ICC)",
      url: "https://library.iccwbo.org/content/clp/Others/incoterms_2020_checklist_2024-update.pdf",
      note: "EXW is mainly suited to domestic trade. FAS and FOB are for sea transport only; containers or multimodal transport should use FCA. The CIF seller’s insurance obligation is limited to minimum Clause C cover. DDP includes import clearance, which the seller may not be able to arrange in practice, so choose it carefully. Under DAP, the buyer bears import clearance and duties.",
    },
    {
      id: 3,
      title: "FCA & FOB Incoterms 2020 explained: Key differences",
      publisher: "ICC Academy",
      url: "https://academy.iccwbo.org/incoterms/article/incoterms-2020-fca-or-fob/",
      note: "Under FOB, the seller completes delivery and transfers risk by loading goods onto the vessel at the named port of export, and handles export clearance. The buyer’s shipping line transports the goods and the buyer handles import procedures. FOB applies only to sea and inland-waterway transport.",
    },
    {
      id: 4,
      title: "CIF & CIP Incoterms 2020 explained: Key differences",
      publisher: "ICC Academy",
      url: "https://academy.iccwbo.org/incoterms/article/incoterms-2020-cip-or-cif/",
      note: "Under CIF, risk transfers to the buyer when goods are loaded at the port of export. The seller arranges and pays freight and insurance to the destination port, with insurance limited to minimum Clause C cover. The buyer handles import procedures. CIF applies only to sea and inland-waterway transport.",
    },
    {
      id: 5,
      title: "DAP & DDP Incoterms 2020 explained: Key differences",
      publisher: "ICC Academy",
      url: "https://academy.iccwbo.org/incoterms/article/incoterms-2020-dap-or-ddp/",
      note: "Under DAP, the buyer handles import clearance and duties. Under DDP, the seller handles all export, transit, and import clearances and costs. Customs in some countries require the local importer to complete import clearance, in which case DAP should be used instead.",
    },
    {
      id: 6,
      title: "DDP & EXW Incoterms 2020 explained: Key differences",
      publisher: "ICC Academy",
      url: "https://academy.iccwbo.org/incoterms/article/incoterms-2020-exw-or-ddp/",
      note: "Under EXW, the buyer bears all costs and risks for loading, transport, export clearance, and import clearance. If the buyer cannot complete export formalities in the seller’s country, FCA should be used instead. Using EXW for exports may create accounting or tax complexity.",
    },
    {
      id: 7,
      title: "Know Your Incoterms",
      publisher: "U.S. International Trade Administration (trade.gov)",
      url: "https://www.trade.gov/know-your-incoterms",
      note: "Of the Incoterms 2020 terms, seven apply to any mode of transport, including EXW, DAP, and DDP; four apply only to sea and inland-waterway transport, including FOB and CIF.",
    },
  ],
};
