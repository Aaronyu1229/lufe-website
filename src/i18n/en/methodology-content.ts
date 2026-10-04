import { type MethodologyContent } from "@/i18n/zh/methodology-content";
import { methodologyContentZh } from "@/i18n/zh/methodology-content";

export const methodologyContentEn: MethodologyContent = {
  originStory: `At the logistics end, we have seen too many Taiwanese brands ship their goods out without building a business.
The most common sequence goes like this:

First, spend millions on marketing, find local influencers, and start selling.
After a quarter, the market tells you:
the price is too high, the flavor is wrong, and people do not understand what you are saying.
Then go back and change the product. Results are flat, or you lose money.

Those millions bought a lesson.
What we want to do is lower that tuition from millions to ten or twenty thousand—
ask the market for you before you spend heavily.

Then we do not just hand over a report and leave.
We look at the answers with you, change what needs changing, and ask again.
That is what we mean by running alongside you.`,
  examples: [
    {
      ...methodologyContentZh.examples[0]!,
      tab: "Peanut-candy gift box",
      title: "A handmade Taiwanese peanut-candy gift box wants to go to the Philippines",
      tags: ["One-on-one interviews", "Competitor comparison"],
      method: "Interview five local participants one on one: show the product card, have them try the product, and follow up question by question.\nAt the same time, lay out ten local peanut-sweet competitors in one comparison: a long-established Baguio brand, supermarket staple snacks, Taiwanese imported nougat, and local premium gift boxes—price, messaging, positive and negative reviews, and channels.",
      findings: [
        { label: "Price", headline: "After conversion, it is more than twice the local price people expect", detail: "One participant compared it directly with a day’s wages" },
        { label: "Shelf life", headline: "The shelf life is much longer than local mainstream products", detail: "The best-known local peanut brittle has a shelf life of about one month; in tropical humidity, that is a practical selling point" },
        { label: "Flavor", headline: "One flavor produced divided reactions", detail: "Responses differed noticeably by age group and need a larger sample to confirm" },
        { label: "Market gap", headline: "No competitor leads with vegan and clean-label credentials", detail: "Among ten competitors, this space is open" },
      ],
      implications: ["Redesign the price", "Gift-giving is the only setting that can support the higher price", "Vegan is a space no one occupies"],
      note: "Five interviews are not statistics; they are direction. The report states that this is a positioning hypothesis, not a validated position. Once the direction is right, spend more to expand the sample.",
    },
    {
      ...methodologyContentZh.examples[1]!,
      tab: "Sunscreen",
      title: "A Taiwanese sunscreen wants to go to the Philippines",
      tags: ["One-on-one interviews", "Public-data cross-check"],
      method: "Ask working people with steady income who pay for their own purchases one by one after they have used a trial pack.\nThen compare what they say with local e-commerce reviews, competitor wording, and social conversations.",
      findings: [
        { label: "Perception", headline: '“Vitamin C” is heard as whitening', detail: "What you describe as antioxidant benefits in Taiwan is heard as something else by participants" },
        { label: "Fragrance preference", headline: "Local consumers prefer fragrance", detail: "Taiwan consumers prefer fragrance-free products; the Philippines is the opposite" },
      ],
      implications: ["Change the communication and fragrance, not the formula", "Keep claims within what local regulations allow", "It costs far less than remaking the product"],
      note: "You cannot learn these two things by asking a hundred people in Taiwan.",
    },
  ],
  examplesIntro: "Two real research examples: how we ask, what we learn, and what the brand does next",
  examplesClosing: "We do not answer for the market. We bring the market’s answers back and decide the next step with you.",
  firstMonthCopy: `In the first month, you receive one page:
who would buy, what price they would pay, and why they would not buy.
It is for making the next decision, not filing away.`,
  thirdMonthIntro: `By the time you reach the Consignment chapter, there is a complete market study.
The report we actually deliver looks like this:`,
  reportOutline: [
    "Research premise",
    "Competitor list",
    "Material collection",
    "Comparison table",
    "Point of differentiation",
    "Relative advantages",
    "Entry challenges",
    "Research conclusion",
  ],
  reportDisclaimer: `Every report states who the sample is, what comes from first-hand interviews, what comes from public data, and the confidence level.
The final sentence of every report is the same—
“This report is the factual basis for a decision, not the decision itself.”`,
  scaleIntro: `In the first conversation, we run your case roughly through five questions.
These five questions have red lines; if we encounter one, we stop and discuss it clearly first.`,
  dimensions: [
    { name: "Market", question: "Is this market large enough?", criteria: "Reachable market size, growth rate, what consumers are willing to pay, and the market’s stage", redAt: "If the reachable market cannot support the revenue you need, we suggest changing the market or product category." },
    { name: "Barrier", question: "How much effort does entry take?", criteria: "Certification requirements and cost, channel-entry difficulty, localization work such as packaging, formula, and labeling, and regulatory gray areas", redAt: "If certification and compliance costs consume most of the first year’s gross margin, we do not recommend entering." },
    { name: "Competition", question: "Can you compete?", criteria: "Concentration of the top ten brands’ market share, competitor moats, competitor weaknesses, and the likelihood of a price war", redAt: "If the largest brands already fill the shelves, we do not recommend competing head-on." },
    { name: "Profitability", question: "Can it work financially?", criteria: "Landed cost including FOB, tariffs, logistics, and insurance; channel commissions and marketing allocation; expected returns and exchanges; and foreign-exchange risk", redAt: "If a pessimistic scenario cannot produce a profit, adjust the structure before discussing entry." },
    { name: "Regulatory", question: "Could regulations change suddenly?", criteria: "Stability of local trade policy, history of product-category regulatory changes, political risk, and exit cost", redAt: "If this category has been banned or sharply taxed in recent years, the risk needs greater weight." },
  ],
  decisions: [
    { score: "≥ 75", verdict: "Go", advice: "Enter and follow the four chapters" },
    { score: "60–74", verdict: "Conditional Go", advice: "Enter, but resolve one or two weaknesses first" },
    { score: "45–59", verdict: "Hold", advice: "We suggest waiting 6–12 months for a key change" },
    { score: "< 45", verdict: "No-Go", advice: "We do not recommend it. We state clearly what changed conditions would make it worth reviewing again" },
  ],
  doubleScoreCopy: `The first score is a paper score.
It uses public data, the costs you provide, and our local experience.
It tells you whether you should try.

The second score is the real score.
After a Market Test, the Market and Competition questions are scored again using participants’ actual responses.
It tells you whether you should invest more.

Take the peanut-candy case: in the competitor comparison, the closest rival was Taiwanese imported nougat;
only after talking with five participants did we learn that the real barrier was the price they carried in their minds.

Most assessments stop at the first score. We put the second score into the process.
No matter how good it looks on paper, it does not compare with someone asking: where can I buy it?`,
  rulesCopy: `When we encounter any red line, we say so first, then discuss whether to continue.

Sometimes we will suggest waiting.
That is also an answer, and it is free.

If you want to sell first and ask questions later, we may not be the right partner.`,
  companionshipCopy: `Handing over the report is not the end.

After Market Test, we look at that page with you:
which sentence needs changing, which price band needs rethinking, and which flavor should not go over yet.
Then we ask again.

After Consignment, we review the numbers every month: what sold, what did not, and why.
After Company Setup, once people are in place and the process runs smoothly, you do not need to keep flying over.

Every case’s real score returns to the same scorecard; the more we do, the more accurate it becomes.

You can stop after every chapter.
But as long as you keep going, we are here.`,
  foundations: [
    { lead: "“Understand a little more, invest a little more” comes from the most cited model in internationalization research", footnote: "¹", body: ":\nCompanies move overseas gradually: export first, then find an agent, then establish a presence. Investment follows understanding." },
    { lead: "“Ask the market first with the smallest amount of money” comes from lean startup", footnote: "²", body: ":\nExchange the lowest cost for real learning, then decide whether to invest more." },
    { lead: "“Every chapter has a gate” comes from stage-gate management in new-product development", footnote: "³", body: ":\nPass this gate before making the next investment." },
  ],
  foundationsClosing: "What we do is compress these three ideas into a version a Taiwanese small or medium-sized brand can afford and complete in one three-month cycle.",
  foundationsFootnote: "¹ Uppsala internationalization model (Johanson & Vahlne, 1977)　² Lean Startup (Ries, 2011)　³ Stage-Gate (Cooper)",
  boundariesCopy: `This method currently does one thing: help consumer brands enter the Philippines.
Industrial equipment, large B2B manufacturing, and building factories are outside its scope.
North America Retail is a separate track, carried out by the North America team.
Call Center is not among the five questions—it is not a question of whether to go, but of what happens after you go.

First-hand interview samples are small and concentrated in particular groups.
We state that in every report because it determines how much weight you should give the answer.`,
};
