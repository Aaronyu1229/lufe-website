import type { EnglishArticle } from "./index";

// Fingerprint of the Chinese article this English was translated from; registry.test.ts prints the new value when Chinese changes.
export const article: EnglishArticle = {
  slug: "go-no-go-framework",
  sourceFingerprint: "465600f0b1f5de9f",
  title: "How do we decide whether an overseas expansion is worth doing? Five questions before deciding",
  summary: "Overseas expansion too often relies on instinct. We use five questions to assess a project: market, barrier, competition, profitability, and regulatory. When conditions are not in place, we will tell you directly not to go yet. This article lays out what each question examines. We use the same five questions in the Free 30-minute initial assessment.",
  readTime: "5 min read",
  content: [String.raw`> **Short answer:** We assess an overseas expansion project with five questions: market, barrier, competition, profitability, and regulatory. First identify which question has conditions that are not yet in place; if it is not suitable yet, we will tell you directly not to go. The hypothetical example below only shows how a calculation can work; it is not a fixed set of weights or red lines.

## Scenario: an owner is asked by buyers from two countries at the same trade show, "Should we come?"

Your instant drink mixes have stable distribution in Taiwan. You attend a food trade show. Over three days, a Thai distributor and a Canadian importer both take samples and say, "Your products will have a market where we are." On the flight home, you feel like doing both.

Back at the company meeting, sales says Thailand is close and culturally familiar; finance says Canada has higher unit prices and better margins; marketing says to test both first. You realize that every point makes sense, but all of them are instinct. The question in your mind is: **What basis do I have for deciding which to do first? And what if neither should be done?**

Friends saying it is good, a crowded trade show, and an enthusiastic owner on the other side are all instincts. We turn them into five questions and examine them one by one. This is not for show; it is to identify which question will cause trouble before you spend money.

## What the five questions examine

We call it MBCPR internally: Market, Barrier, Competition, Profitability, Regulatory. For each question, we first examine public information and the conditions you have in hand to identify what needs to be addressed first [1].

| Question | What it examines |
|---|---|
| **Market**: Is this market large enough? | Reachable market size, growth rate, what consumers are willing to pay, and the market's stage |
| **Barrier**: How much effort does entry require? | Certification requirements and costs, difficulty of entering channels, local adaptations (packaging, formula, labeling), and compliance gray areas |
| **Competition**: Can you compete? | Concentration among the top ten brands, competitors' moats and weaknesses, and the likelihood of a price war |
| **Profitability**: Can it work financially? | Landed cost (FOB + tariff + logistics + insurance), channel commissions and marketing allocation, expected returns, and exchange-rate risk |
| **Regulatory**: Could regulation change suddenly? | Stability of local trade policy, history of changes to product-category regulations, political risk, and exit cost |

Back to Thailand and Canada in the scenario: run the five questions for each market and you will find that they lose points in different places. Thailand may lose points on barriers (Thai labeling and importer registration); Canada may lose points on profitability (freight and channel terms). Where a question loses points matters more than the total score, because that question is where your first expenditure will run into trouble.

## Why put it into a framework?

There are two reasons. First, it forces us to run the whole process honestly before taking a project. Sometimes a client wants to do it and we want to take it, but if conditions are not yet in place, we should say no. Second, clients have the right to know how we reached our judgment. A written framework lets us discuss it on the table instead of persuading you with "we have a lot of experience."

## An example of scoring

The following is a hypothetical example; the weights and scores only show how the calculation works and are not a fixed method or a real case: a dietary supplement seeking to enter Costco in North America.

| Dimension | Score | Hypothetical weight | Note |
|---|---|---|---|
| Market | 82 | 20% | The North American dietary-supplement market is large and growing steadily |
| Barrier | 62 | 20% | FDA registration costs are manageable; the Costco relationship is key |
| Competition | 71 | 20% | Moderate concentration among the top three brands |
| Profitability | 78 | 25% | There is enough gross-margin room, but Costco terms must be absorbed |
| Regulatory | 80 | 15% | North American regulation is stable |

The hypothetical weighted total is 74.5 (82×20% + 62×20% + 71×20% + 78×25% + 80×15%).

The point is not the total. Before deciding, you can already see that the Barrier question scores lowest, so that question must be addressed first.

## When this framework will not help

- **You already have an order from one country.** Follow the lead; you do not need to score first. The framework is for people who do not know whether to go, not people who already have a buyer.
- **You have only public data for the market and competition questions.** Before you enter the market, these can only be estimated roughly. Their real scores must wait until a [Market Test](/services/product-testing) puts the product in front of local people. Before you enter the market, the Barrier and Regulatory questions are the two you can compare seriously.
- **You want a thick report.** The five-question assessment is one page, for making the next decision, not for filing away.
- **The assessment shows conditions are not yet in place, but you still want to do it.** We will not take the project, but we will write clearly which question lost points and what conditions need to change before reviewing it again. This is not a rejection; it keeps the money for when conditions are right.

## Frequently asked questions

**Do I have to be assessed before I can begin?**
No. In the first discussion, we run through it roughly in 30 minutes, free of charge [1]. Most people learn where they stand only after that discussion.

**Does a low score mean it cannot be done?**
Not necessarily. When conditions are not yet in place, we do not take the project. This protects both sides. But we will write clearly which question lost points and what conditions need to change before reviewing it again [1].

**How do you score the market and competition questions before you enter the market?**
Before you enter the market, they can only be estimated roughly; their real scores await the Market Test. Barriers and regulations can first be compared from public regulations.

## One small next step

For each of the two (or three) markets you have in hand, write down the one question among the five that you are least certain about. That question is what to bring to the first discussion; or message us that question directly (LINE or email).

Last verified: October 1, 2026.`],
  faq: [
    {
      q: "Do I have to be assessed before I can begin?",
      a: "No. In the first discussion, we run through it roughly in 30 minutes, free of charge. Most people learn where they stand only after that discussion.",
    },
    {
      q: "Does a low score mean it cannot be done?",
      a: "Not necessarily. When conditions are not yet in place, we do not take the project. This protects both sides. But we will write clearly which question lost points and what conditions need to change before reviewing it again.",
    },
    {
      q: "How do you score the market and competition questions before you enter the market?",
      a: "Before you enter the market, these two questions can only be estimated roughly from public data. Their real scores come after the Market Test puts the product in front of local people. Barriers and regulations can first be compared from public regulations.",
    },
  ],
  sources: [
    {
      id: 1,
      title: "LUFÉ five-question assessment (methodology page)",
      publisher: "LUFÉ",
      url: "https://lufe.world/services/methodology",
      note: "What the five dimensions examine.",
    },
  ],
};
