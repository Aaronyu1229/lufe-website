import type { EnglishArticle } from "./index";

// Fingerprint of the Chinese article this English was translated from; registry.test.ts prints the new value when Chinese changes.
export const article: EnglishArticle = {
  slug: "how-to-read-market-research-report",
  sourceFingerprint: "71a55aef1dc094bf",
  title: "How do you read a market research report? Ask these 6 questions before making a decision",
  summary: "What matters in a market research report is not the conclusion but how the conclusion was reached. Based on the disclosure standards of the American Association for Public Opinion Research (AAPOR), this article lists 6 questions to ask when you receive a report: who paid, who was asked, how many were asked, when, how, and what limitations the report admits, and explains which figures you can skip at first.",
  readTime: "6 min read",
  content: [String.raw`> **Short answer:** With a market research report, look at how the conclusion was reached: who paid, who was asked, how many, when, how, and what limitations it admits. If you cannot get answers, do not use it to decide.

## Scenario: a very thick report whose conclusion is “huge market potential”

This is a hypothetical scenario, not a story about a specific client.

You handle overseas business at a skincare company. Last month you attended a Southeast Asia briefing and came away with a very thick market research report: the Philippine skincare market is growing fast, consumers have a good impression of Taiwanese products, and the recommendation is to enter as soon as possible.

After reading it, your boss asks: “So should we go?” You flip back through the report and realize you cannot answer. The report is full of figures, but you do not know how they were produced, or what they have to do with your product.

There are plenty of online tutorials on how to write a market research report; far fewer explain how to read someone else's. Below is a list you can take straight to the report's author.

## When you get a report, ask these 6 questions first

The professional code of the American Association for Public Opinion Research (AAPOR) lists the items that must be disclosed when survey results are released [1]. Those items are also exactly the questions a reader should ask:

| # | Question | Why ask it |
|---|---|---|
| 1 | Who paid and who conducted it | When the sponsor and the conductor differ, both must be disclosed [1] |
| 2 | Who was asked | How the population was defined and how respondents were recruited [1] |
| 3 | How many were asked | Sample size determines how far the conclusion can be trusted [1][2] |
| 4 | When they were asked | Data from long ago may not apply today [1] |
| 5 | How they were asked | The exact wording and answer options of questions affect the answers [1][2] |
| 6 | What limitations the report admits | The code requires stating the limitations of the design and data collection [1] |

If any one of these questions has no answer, the report's conclusion can only serve as a reference, not as a basis.

## Question 3: look at sample size down to the subgroup

Pew Research Center explains that a simple random sample of 1,067 cases has a margin of error of about plus or minus 3 percentage points, but a subgroup of only about 160 cases within it has a margin of error of plus or minus 8 percentage points [2].

This matters for anyone reading a report. The report may say “1,000 respondents,” but you may care about “women in a certain age group, living in Manila, who buy skincare,” and that group may be only a small part of the total. How far you can trust the conclusion depends on how many people are in that group, not on the total.

Also, the AAPOR code requires disclosure of the margin of error only for probability samples [1]. If the report uses an online opt-in sample and you see “margin of error plus or minus 3%,” you can ask how that figure was calculated.

## Question 5: change how you ask, and the answers change

Pew's explanation also notes that different survey firms use different procedures and question wording, which can affect results; and the margin of error covers only sampling error, while errors from question wording or from who was not reached are hard to quantify and rarely reported [2].

“What is your impression of Taiwanese products?” and “How many times did you buy Taiwanese products last month?” produce two different kinds of answers. The first tells you goodwill; only the second tells you behavior. If the report does not include the original questionnaire, ask the author for it.

## Which figures you can skip at first

- **Overall economic and population figures.** The Philippines' 2024 census counted 112,729,484 people [3] and its economy grew 5.6% in 2024 [4]. These figures show the market is not small, but they will not tell you whether anyone will buy your product.
- **Market sizes with no source or year.** If you cannot see who calculated them or in which year, you cannot cross-check them.
- **Descriptions such as “consumers love it” or “good impression.”** If it does not say who was asked or how many, go back to questions 2 and 3 above.

## The three things you should really look for in a report

A decision usually needs three answers: who will buy, at what price, and why not. If a report cannot answer these three, however thick it is, it is only background material.

Our own [Market Test](/services/product-testing) reports are checked against the same standard: the interviewees are local consumers with steady incomes who spend their own money, such as teachers and parents; the number is small and concentrated in particular groups and areas, and every report states this [5]. Only when the limitations are written down does the reader know how far the conclusion can be applied.

If what you need to write is an assessment deck for your boss, see the outline in [how to write a market analysis report: 12 pages are enough](/insights/philippines-market-assessment-deck); to judge whether to go ahead, see [how we judge whether an overseas project is worth doing](/insights/go-no-go-framework).

## When this article does not apply

- **The report is just background reading and you are not using it to make a decision.** There is no need to press each question.
- **The report is official statistics.** Government statistics usually come with a methodology note; read that note directly.
- **You are evaluating an investment-grade decision**, such as building a plant locally. That needs professional due diligence, and these six questions are only a starting point.
- **You do not have a report at all.** First spend NT$10,000–20,000 on a Market Test and get one page on who will buy, at what price, and why not; you can stop after it.

## FAQ

**How do you read a market research report?**
Look at how the conclusion was reached before looking at the conclusion itself. Ask six questions: who paid, who was asked, how many were asked, when, how, and what limitations it admits [1]. A report that cannot answer them can only serve as a reference.

**How large does the sample need to be?**
It depends on how many people are in the group you care about. A random sample of 1,067 has a margin of error of about plus or minus 3 percentage points, while a subgroup of about 160 has plus or minus 8 percentage points [2].

**The report's conclusion differs from what I saw locally. Which should I trust?**
First check whether both asked the same group, at the same time, with the same question. If they still differ after matching, confirm again with a small on-the-ground test instead of betting big money right away.

## One small next step

Open the report you have, look for an answer to each of the six questions above, write down the ones you cannot find, and send them to the report's author. If they can answer, the report is usable; if not, you also know what to fill in next. If any question is unclear, send us one question on LINE.

Last verified: 2026-10-18.`],
  faq: [{ q: "How do you read a market research report?", a: "Look at how the conclusion was reached before looking at the conclusion itself. Following the disclosure standards of the American Association for Public Opinion Research (AAPOR), ask six questions: who paid, who was asked, how many were asked, when they were asked, how they were asked, and what limitations the report admits. A report that cannot answer these six can only serve as a reference, not as a basis for a decision." }, { q: "How large does the sample need to be?", a: "It depends on how many people are in the group you care about, not on the total. Pew Research Center explains that a simple random sample of 1,067 cases has a margin of error of about plus or minus 3 percentage points, while a subgroup of about 160 cases within it has plus or minus 8 percentage points." }, { q: "The report's conclusion differs from what I saw locally. Which should I trust?", a: "First check whether both asked the same group, at the same time, with the same question. If they still differ after matching, confirm again with a small on-the-ground test instead of betting big money right away." }],
  sources: [{ id: 1, title: "Disclosure Standards (AAPOR Code of Professional Ethics and Practice, Section III)", publisher: "American Association for Public Opinion Research (AAPOR)", url: "https://aapor.org/standards-and-ethics/disclosure-standards/", note: "Revised April 2021: when results are released, disclose the data collection strategy, sponsor and conductor, exact question wording and response options, population under study, sample generation and recruitment, mode of data collection, dates of data collection, sample sizes and precision (margin of error required for probability samples), weighting, data processing and quality procedures, and limitations of the design and data collection." }, { id: 2, title: "5 key things to know about the margin of error in election polls", publisher: "Pew Research Center", url: "https://www.pewresearch.org/short-reads/2016/09/08/understanding-the-margin-of-error-in-election-polls/", note: "2016-09-08, Andrew Mercer: a simple random sample of 1,067 cases has a margin of error of about plus or minus 3 percentage points; a subgroup of about 160 cases has plus or minus 8 percentage points; the margin of error covers only sampling error, while errors such as question wording and coverage are hard to quantify and rarely reported." }, { id: 3, title: "Proclamation No. 973, s. 2025 (announcing the 2024 census results)", publisher: "Office of the President of the Philippines (full text on Lawphil)", url: "https://lawphil.net/executive/proc/proc2025/proc_973_2025.html", note: "The total population of the Philippines as of July 1, 2024 was 112,729,484." }, { id: 4, title: "Philippines Country Commercial Guide: Market Overview", publisher: "U.S. International Trade Administration (trade.gov)", url: "https://www.trade.gov/country-commercial-guides/philippines-market-overview", note: "The Philippine economy grew 5.6% in 2024." }, { id: 5, title: "Market Test (Month 1)", publisher: "LUFÉ", url: "https://lufe.world/services/product-testing", note: "Interviewees are local consumers with steady incomes who spend their own money, such as teachers and parents; the number is small and concentrated in particular groups and areas, which every report states; the one-page report answers who will buy, at what price, and why not." }],
};
