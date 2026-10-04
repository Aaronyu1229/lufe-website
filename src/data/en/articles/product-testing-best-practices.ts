import type { EnglishArticle } from "./index";

// Fingerprint of the Chinese article this English was translated from; registry.test.ts prints the new value when Chinese changes.
export const article: EnglishArticle = {
  slug: "product-testing-best-practices",
  sourceFingerprint: "5bc4038fd2a0e98d",
  title: "How do you conduct market research? Three mistakes to avoid in a small-budget overseas market test",
  summary: "How do you conduct market research before going abroad without spending money and still failing to get an answer you can use to decide? Three common mistakes are asking only people you know, running ads during the test, and looking only at sales without asking why. A useful test must answer four questions.",
  readTime: "5 min read",
  content: [String.raw`> **Short answer:** Useful market research answers four questions: whether anyone will buy, who buys, why they buy, and why they do not buy. When the design is not useful, the problem is not too little volume; it is that the answers still cannot support a decision.

## Scenario: a snack-business owner sends a box of products to a friend in Manila

You make seaweed crisps with steady repeat purchases in Taiwan convenience stores and e-commerce. A university classmate working in Manila says, "Taiwan snacks are popular here," so you send a box and ask the classmate to give them to colleagues and neighbours to try. Three weeks later, a voice message arrives: "Everyone says they taste great. They are asking where to buy them."

You are pleased, but after thinking about it for a night, you realise that the message answers none of the questions you need for a decision: Who ate them? Were they people working at foreign companies like your classmate, or ordinary households? Did they know how many pesos a package would cost? Would people asking where to buy still purchase after seeing the price? For those who did not say they tasted good, did they not get to try them, or did they try them and say nothing?

The box did not cost much, but what it gave you was "a good feeling," not "a decision you can make." This article explains **how to design a test so that it can support a decision.**

## Mistake one: asking only people you know, or using a sample too small to distinguish signal from noise

The problem with the box in the scenario is not that the quantity is too small. It is that **everyone who ate it is connected to you.** Friends, colleagues, and neighbours will not say to your face that it tastes bad, and they will not volunteer, "I would not buy it at this price."

Even if you increase the quantity, if everyone who receives the product is from the same circle, such as Taiwanese people living locally, the signal you get is "nostalgia," not "market." Once amplified, that signal becomes distorted: the first batch sells because people miss the taste of Taiwan; the second batch does not sell because local people never saw it.

A test that can support a decision needs local people who **do not know you** to see the product. Our [Market Test](/services/product-testing) uses teachers and parents from local schools [1]: teachers are locally employed people with higher incomes, and parents are the people who actually pay for purchases. Neither group has a connection with you; a frown is a frown.

## Mistake two: running ads while testing

Many brands think, "Since we have already shipped the products, we might as well run a little advertising." The result is that you cannot tell whether people bought because the product was truly right, or because the advertising worked; when no one buys, you cannot tell whether the product was wrong or the advertising targeted the wrong people.

Turn off paid traffic during the test. What you see then is the product's own response. Advertising is an amplifier; before amplifying, you need to know what it is amplifying.

## Mistake three: looking only at how much sold, not why

Good sales do not mean the product is right. "Everyone says they taste great" in the scenario gives you only the result, not the reason. A useful test needs to answer at least four questions:

| Question | Can the data answer it? | How to obtain it |
|---|---|---|
| Does anyone buy? | Yes | Who picked it up a second time |
| Who are the buyers? | Yes | Which group picked it up, and which group did not |
| Why do they buy? | No, you need to ask | What they asked about: ingredients, origin, or where to buy |
| Why do they not buy? | No, you need to ask | What they said at the moment they put it down after seeing the price |

The last two questions require someone to observe and ask alongside them. On the day of the Market Test, we record exactly these things: who picked it up a second time, who put it down after seeing the price, and who asked about ingredients. Each product has at least six data sources [1]. In the end, you receive one page: who will buy, what price they will pay, and why they will not buy, including a Taiwan-Philippines price-gap comparison.

"Why they do not buy" is the most valuable question. It tells you whether the problem is the price range, packaging they do not understand, or a flavor mismatch. Those three answers lead to three different next steps, and two of them can be changed.

## How do you conduct small-budget market research? Four design principles

Reversing the three mistakes gives you the design principles:

1. **Show it to local people who do not know you, and show them the price.** Sampling without a price tests only taste, not purchase.
2. **Do not run ads during the test.** Let the product speak for itself.
3. **Have someone alongside to record the reasons.** Picking it up, putting it down, and asking questions are all data.
4. **End with a clear decision point.** Scale up, adjust, or stop. Do not keep spending money in a grey area.

After the test, there needs to be a clear answer. Our approach is a one-page report, not an eighty-page report [1]. That page is for making the next decision, not for filing away.

## When we do not recommend testing yet

- **The product is not yet established in Taiwan.** A test confirms whether something that sells in one place will sell elsewhere; it does not use an overseas market to rescue a product that is not selling in Taiwan.
- **You have already decided to do it and are testing only because you want to hear good news.** Then do not spend this money. One of a test's most valuable results is "do not go now," and you need to be willing to accept that answer first.
- **The product needs cold chain or has a short shelf life.** Sending samples to Manila will get stuck at this step, so first consider whether there is a way to produce locally.
- **You have not decided which country to enter first.** First read [why we recommend beginning with the Philippines](/insights/why-philippines-first).

## Frequently asked questions

**Does sending samples to local friends for tasting count as market research?**
It can be a first step, but it cannot support a decision. Friends will not tell you that it tastes bad, and they will not tell you how much they are willing to pay.

**Does testing always require shipping products to the destination first?**
You do not need to ship a container. Send three products to Manila, and the report comes after the panel; you do not need to wait for the product certificate [1].

**What happens after the test passes?**
If it passes, the fee is credited toward the Consignment package and you review the figures after three months. If it does not pass, the report explains which conditions need to change before trying again.

## One smallest next step

First spend NT$10,000–20,000 on a [Market Test](/services/product-testing): send three products to Manila, have a table of teachers and parents pick them up and look at them, and receive a one-page report. Sometimes the most valuable answer this money buys is "do not go now."

Last verified: 2026-10-01.`],
  faq: [
    {
      q: "Does sending samples to local friends for tasting count as market research?",
      a: "It can be a first step, but it cannot support a decision. Friends will not tell you that it tastes bad, and they will not tell you how much they are willing to pay. A test that can support a decision needs local people who do not know you to see the product and its price, with someone alongside to record why they pick it up and why they put it down.",
    },
    {
      q: "Does testing always require shipping products to the destination first?",
      a: "You do not need to ship a container. A Market Test sends three products to Manila, lets a table of teachers and parents from local schools pick them up and look at the price, and provides a one-page report after the panel. You do not need to wait for the product certificate.",
    },
    {
      q: "What happens after the test passes?",
      a: "The report tells you who will buy, what price they will pay, and why they will not buy. If it passes, the fee is credited toward the Consignment package, and the products are placed in a partner's warehouse to see whether they sell; you review the figures after three months. If it does not pass, the report explains which conditions need to change before trying again. The story stops there.",
    },
  ],
  sources: [
    {
      id: 1,
      title: "How the Market Test works",
      publisher: "LUFÉ",
      url: "https://lufe.world/services/product-testing",
      note: "Three products, a table of teachers and parents, and a one-page report; at least six data sources for each product; NT$10,000–20,000.",
    },
  ],
};
