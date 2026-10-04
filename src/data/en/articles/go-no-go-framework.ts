import type { EnglishArticle } from "./index";

// Fingerprint of the Chinese article this English was translated from; registry.test.ts prints the new value when Chinese changes.
export const article: EnglishArticle = {
  slug: "go-no-go-framework",
  sourceFingerprint: "40acb6c4d4b832e9",
  title: "How do we decide whether an overseas expansion is worth doing? Five questions and their red lines",
  summary: "Going abroad too often relies on instinct. We use five questions to assess a project: market, barrier, competition, profitability, and regulatory. Each has a red line; when one is crossed, we directly recommend that you do not proceed. This article lays out what each question examines and its red line. We use the same five questions in the Free 30-minute initial assessment.",
  readTime: "5 min read",
  content: [String.raw`> **Short answer:** We score an overseas expansion project with five questions: market, barrier, competition, profitability, and regulatory. Each has a weight and a red line. A weighted total of 75 or above is Go, 60–74 is Conditional Go, 45–59 is Hold, and below 45 is No-Go [1]. We do not take projects below 60.

## Scenario: an owner is asked by buyers from two countries at the same trade show, "Should we come?"

Your ready-to-drink beverages have stable distribution in Taiwan. You attend a food trade show. Over three days, a Thai distributor and a Canadian importer both take samples and say, "Your products will have a market where we are." On the flight home, you feel like doing both.

Back at the company meeting, sales says Thailand is close and culturally familiar; finance says Canada has higher unit prices and better margins; marketing says to test both first. You realise that every point makes sense, but all of them are instinct. The question in your mind is: **What basis do I have for deciding which to do first? And what if neither should be done?**

Friends saying it is good, a crowded trade show, and an enthusiastic owner on the other side are all instincts. We turn them into five questions, each with a score and a red line. The score is not for show; it is to identify which question will cause trouble before you spend money.

## What the five questions examine, and where their red lines are

We call it MBCPR internally: Market, Barrier, Competition, Profitability, Regulatory. Each question is scored from 0–100, with a different weight, and the weighted result maps to four conclusions [1].

| Question | Weight | What it examines | Red line |
|---|---|---|---|
| **Market**: Is this market large enough? | 20% | Reachable market size, growth rate, what consumers are willing to pay, and the market's stage | If the reachable market is less than 20 times your estimated annual revenue, consider another market |
| **Barrier**: How much effort does entry require? | 20% | Certification requirements and costs, difficulty of entering channels, local adaptations (packaging, formula, labelling), and compliance grey areas | If compliance-certification cost exceeds half of first-year gross profit, it is directly No-Go |
| **Competition**: Can you compete? | 20% | Concentration among the top ten brands, competitors' moats and weaknesses, and the likelihood of a price war | If the top three together hold more than 70%, do not compete head-on |
| **Profitability**: Can it work financially? | 25% | Landed cost (FOB + tariff + logistics + insurance), channel commissions and marketing allocation, expected returns, and exchange-rate risk | If net margin is below 5% in a pessimistic scenario, adjust the plan |
| **Regulatory**: Could regulation change suddenly? | 15% | Stability of local trade policy, history of changes to product-category regulations, political risk, and exit cost | If the product was banned or tariffs were sharply increased in the past three years, give risk extra weight |

The four conclusions [1]:

- **≥ 75 Go**: You can enter and proceed through all four chapters as normal.
- **60–74 Conditional Go**: You can enter after resolving one or two weak points.
- **45–59 Hold**: We recommend waiting 6–12 months for a key change.
- **< 45 No-Go**: We do not recommend it. We will write clearly which conditions need to change before reviewing it again.

Back to Thailand and Canada in the scenario: run the five questions for each market and you will find that they lose points in different places. Thailand may lose points on barriers (Thai labelling and importer registration); Canada may lose points on profitability (freight and channel terms). Where a question loses points matters more than the total score, because that question is where your first expenditure will run into trouble.

## Why put it into a framework?

There are two reasons. First, it forces us to run the whole process honestly before taking a project. Sometimes a client wants to do it and we want to take it, but if the total comes out below 60, we should say no. Second, clients have the right to know how we reached our judgment. A written framework lets us discuss it on the table instead of persuading you with "we have a lot of experience."

## An example of scoring

This is a case we have published on our methodology page: a health supplement entering Costco in North America [1][2].

| Dimension | Score | Note |
|---|---|---|
| Market | 82 | The North American health-supplement market is large and growing steadily |
| Barrier | 62 | FDA registration costs are manageable; the Costco relationship is key |
| Competition | 71 | Moderate concentration among the top three brands |
| Profitability | 78 | There is enough gross-margin room, but Costco terms must be absorbed |
| Regulatory | 80 | North American regulation is stable |

The weighted total was 74, so the conclusion was Conditional Go, on the condition that the formula be adjusted slightly for North American tastes. The actual result: it launched in 6 months, and first-month sales exceeded target by 40%.

The point is not that the result was good. Before making the decision, we already knew that the Barrier question was the weak point, so we addressed it early.

## When this framework will not help

- **You already have an order from one country.** Follow the lead; you do not need to score first. The framework is for people who do not know whether to go, not people who already have a buyer.
- **You have only public data for the market and competition questions.** Before you leave, these can only be estimated roughly. Their real scores must wait until a [Market Test](/services/product-testing) puts the product in front of local people. Before leaving, the Barrier and Regulatory questions are the two you can compare seriously.
- **You want a thick report.** The five-question assessment is one page, for making the next decision, not for filing away.
- **Your score is below 60 but you still want to do it.** We will not take the project, but we will write clearly which question lost points and what conditions need to change before reviewing it again. This is not a rejection; it keeps the money for when conditions are right.

## Frequently asked questions

**Do I have to be assessed before I can begin?**
No. In the first discussion, we run through it roughly in 30 minutes, free of charge [1]. Most people learn where they stand only after that discussion.

**Does a low score mean it cannot be done?**
We do not take projects below 60. This protects both sides. But we will write clearly which question lost points and what conditions need to change before reviewing it again [1].

**How do you score the market and competition questions before leaving?**
Before leaving, they can only be estimated roughly; their real scores await the Market Test. Barriers and regulations can first be compared from public regulations.

## One smallest next step

For each of the two (or three) markets you have in hand, write down the one question among the five that you are least certain about. That question is what to bring to the first discussion; or send us that question directly on LINE.

Last verified: 2026-10-01. The weights and red lines for the five questions follow the current version of the methodology page.`],
  faq: [
    {
      q: "Do I have to be assessed before I can begin?",
      a: "No. In the first discussion, we run through it roughly in 30 minutes, free of charge. Most people learn where they stand only after that discussion.",
    },
    {
      q: "Does a low score mean it cannot be done?",
      a: "We do not take projects below 60. This protects both sides. But we will write clearly which question lost points and what conditions need to change before reviewing it again.",
    },
    {
      q: "How do you score the market and competition questions before leaving?",
      a: "Before leaving, these two questions can only be estimated roughly from public data. Their real scores come after the Market Test puts the product in front of local people. Barriers and regulations can first be compared from public regulations.",
    },
  ],
  sources: [
    {
      id: 1,
      title: "LUFÉ five-question assessment (methodology page)",
      publisher: "LUFÉ",
      url: "https://lufe.world/services/methodology",
      note: "The five dimensions' weights, what they examine, red lines, four conclusions, and the scoring example for a health supplement entering Costco in North America.",
    },
    {
      id: 2,
      title: "Case study: How a health supplement entered Costco in North America",
      publisher: "LUFÉ",
      url: "https://lufe.world/cases/costco-health",
    },
  ],
};
