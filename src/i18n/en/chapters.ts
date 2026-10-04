import { CTA_LINE_EN } from "@/data/cta";
import { CHAPTERS, type Chapter, type ChapterKey } from "@/data/chapters";

// Fingerprint of the Chinese this English was translated from; registry.test.ts prints the new value when Chinese changes.
export const CHAPTERS_SOURCE_FINGERPRINT = "7297339649f47017";

export const CHAPTERS_EN: Record<ChapterKey, Chapter> = {
  m1: {
    ...CHAPTERS.m1,
    label: "Month 1 · Market Test",
    title: "Validate the market before deciding what to invest",
    scene: "Being ready doesn't mean the market wants you.\nAsk a hundred people in Taiwan and you still will not know whether consumers in the Philippines will buy.\nMarket Test puts your product in front of people there and asks them one by one.",
    imageAlt: "Team reviewing product information",
    heroAction: "Book your free assessment →",
    scenariosHeading: "The three questions brands ask most before going overseas",
    scenarioAnswerLabel: "How we work",
    scenarios: [
      { ...CHAPTERS.m1.scenarios[0]!, title: "You want to go overseas but do not know where to start", body: "You have a product and have heard there may be an opportunity in Southeast Asia, but do not know where to begin", answer: "Start with a Market Test: put the product in front of local people, then use a one-page report to decide whether to continue", imageAlt: "Marking destinations on a world map" },
      { ...CHAPTERS.m1.scenarios[1]!, title: "The report is thick, but there is still no decision", body: "You have hired a consultant and received a thick report, but still do not know whether to go", answer: "Market Test delivers only one page: who would buy, what price they would pay, and why they would not buy. It is for making a decision, not for filing away", imageAlt: "A stack of thick folders" },
      { ...CHAPTERS.m1.scenarios[2]!, title: "You do not want to invest millions at the start", body: "You are worried that going overseas will cost millions and want to validate it with a smaller amount first", answer: "Market Test costs NT$10,000–20,000 for the first 10 brands. If it does not pass, you stop here; if it does, the Market Test fee is credited toward the Consignment package", imageAlt: "A coin-filled piggy bank and calculator" },
    ],
    sections: [
      {
        type: "steps",
        heading: "The four steps of a Market Test",
        items: [
          { number: "01", title: "Create a product card", body: "Write your product into a one-page introduction local people can understand: what it is, how to use it, and its price.\nAt the same time, check for similar local products and what they sell for.", icon: "package" },
          { number: "02", title: "Talk to local people one on one", body: "Talk individually with local teachers, parents, and other salaried consumers who pay for their own purchases,\nusing the product card and a trial pack.\nWhat do they like, what do they not understand, what price would they pay, and why would they not buy?", icon: "users" },
          { number: "03", title: "Cross-check with public information", body: "Compare what you hear in interviews with local e-commerce reviews, competitor prices, and competitor messaging.\nPut what people say alongside what the market is actually selling.", icon: "pen" },
          { number: "04", title: "A one-page report", body: "Who would buy, what price they would pay, and why they would not buy, with a Taiwan–Philippines price-gap comparison.\nYou receive it as soon as the interviews are complete; there is no need to wait for product registration.", icon: "file" },
        ],
      },
      {
        type: "report",
        heading: "Deliverable: a one-page report",
        items: [
          "Who would buy: which group is interested and why",
          "What price would they pay: the price band and how it differs from Taiwan",
          "Why would they not buy: what uninterested people said",
        ],
        ending: "This page is for making the next decision, not for filing away",
      },
      {
        type: "price",
        title: "NT$10,000–20,000",
        caption: "Pilot price for the first 10 brands",
        details: ["You receive the report as soon as the interviews are complete; there is no need to wait for product registration."],
        paths: [
          { label: "Pass →", body: "The Market Test fee is credited toward the Month 3 Consignment package (NT$50,000–60,000); together they make the NT$70,000 starter package" },
          { label: "Doesn't pass →", body: "The story stops here. You spend NT$10,000–20,000, not millions", dark: true },
        ],
      },
    ],
    faqs: [
      { question: "What happens if the Market Test does not pass?", answer: "The report explains why and what conditions would make it worth trying again. That is one of the most valuable answers NT$10,000–20,000 can buy.", takeaway: "The report explains the reason and what conditions would make it worth trying again" },
      { question: "Can I do only a Market Test?", answer: "Yes. Market Test stands alone, and you can use that page to make any decision.", takeaway: "Yes. Market Test is priced independently" },
      { question: "Who do you interview? Is the sample enough?", answer: "We currently speak with local teachers, parents, and other salaried consumers who pay for their own purchases; every person tries a sample before talking.\nThe group is small and concentrated in particular audiences and regions, and we state that in every report.\nNT$10,000–20,000 buys direction, not statistics. Once the direction is right, you can spend more to expand the sample.", takeaway: "NT$10,000–20,000 buys direction, not statistics" },
    ],
    next: { ...CHAPTERS.m1.next!, label: "Next chapter →", title: "Month 3 · Consignment", heading: "Getting listed: let people try it first", imageAlt: "Packages waiting to ship on a shelf" },
    cta: {
      ...CHAPTERS.m1.cta,
      title: "Start with an assessment",
      body: CTA_LINE_EN,
      action: "Book your free assessment →",
      link: { ...CHAPTERS.m1.cta.link!, label: "Want to see what we actually ask? → The LUFÉ Method" },
    },
  },
  m3: {
    ...CHAPTERS.m3,
    label: "Month 3 · Consignment",
    title: "Get listed, then let people try it",
    scene: "The Market Test says yes. The next questions are: how long will certification take, where will the inventory go, and who will promote it once it is listed?\nWe do not run stores ourselves. We connect you with channels that are already selling, then take care of what those channels do not do.",
    imageAlt: "Warehouse shelving aisle",
    heroAction: "Book your free assessment →",
    scenariosHeading: "The three sticking points when preparing for Consignment",
    scenarioAnswerLabel: "How we work",
    scenarios: [
      { ...CHAPTERS.m3.scenarios[0]!, title: "The market is validated, but the next step is stuck", body: "The Market Test passed and you want to ship inventory to sell, but do not know how product registration works, where inventory goes, or who promotes it", answer: "The Consignment package handles this in one go: finding the right channel, having a licensed importer hold the product registration, pre-listing trial activity, and one contract.", imageAlt: "Cardboard boxes on warehouse racks" },
      { ...CHAPTERS.m3.scenarios[1]!, title: "You ran ads and no one saw them", body: "You have listed on a Southeast Asian platform and run ads, but no one saw them", answer: "Consumers in the Philippines look at influencers, events, and whether someone has actually tried the product; during Consignment, let people try it first, then discuss advertising", imageAlt: "Browsing a shopping app on a phone" },
      { ...CHAPTERS.m3.scenarios[2]!, title: "An agent only wants a cut", body: "An agent approached you but only wants a commission, whether or not your product sells", answer: "Channel partners settle based on actual sales, and we do not require exclusivity. The contract requires the importer to cooperate with the transfer, so you do not start from scratch; the FDA transfer or re-notification procedure still applies.", imageAlt: "A contract ready to sign on a meeting table" },
    ],
    sections: [
      {
        type: "included",
        heading: "Three kinds of channels we will approach for you",
        items: [
          { title: "E-commerce channels", body: "Philippine e-commerce sellers already selling food, fast-moving consumer goods, and household products.\nWe bring your product onto their shelves and settle only after it sells. This is the fastest route to start.", icon: "store" },
          { title: "Community channels", body: "Local consumer communities and partners’ online channels.\nIn the weeks while certification is underway, start by letting people try the product here.", icon: "users" },
          { title: "Physical and enterprise channels", body: "Larger channels such as drugstore chains, department stores, and restaurant groups.\nThe threshold is higher: certification, numbers, and commercial terms are needed.\nAfter e-commerce shows results, we take those numbers to negotiate for you.", icon: "handshake" },
        ],
      },
      {
        type: "tracks",
        heading: "During the 6–12 weeks of product-registration review, two tracks move at once",
        passive: "A licensed importer applies for and holds the product registration. The materials belong to you; the contract requires the importer to cooperate with the transfer, so you do not start from scratch; the FDA transfer or re-notification procedure still applies.",
        activeLabel: "Our track (progress every week)",
        active: [
          { label: "Weeks 1–2", body: "Choose channels and send trial packs; settle the product page, local explanation, and price band.\nInventory for listing enters after certification is approved." },
          { label: "Weeks 3–6", body: "Community trials: let people try it first and hear what they say and ask." },
          { label: "Weeks 6–10", body: "Expand the Market Test page into a market report: price band, competitors, and channels.\nIf influencers or events are needed, schedule them at this point." },
          { label: "The day certification is approved", body: "Inventory enters the warehouse and is listed. The people who have tried it become the first people to look for you." },
        ],
      },
      {
        type: "included",
        heading: "The four parts of the Consignment package",
        items: [
          { title: "Channel matching", body: "Find suitable Philippine e-commerce channels and negotiate listing terms; inventory stays in the channel partner’s warehouse and settles after it sells.", icon: "store" },
          { title: "Product-registration holding", body: "For cosmetics and food, a licensed importer applies for and holds the product registration; the contract requires the importer to cooperate with the transfer, so you do not start from scratch; the FDA transfer or re-notification procedure still applies.", icon: "badge-check" },
          { title: "Community trials", body: "Before certification comes through, let people try the product in local communities.", icon: "users" },
          { title: "Market report", body: "Expand the Market Test page with price bands, competitors, and channels.", icon: "chart-column" },
        ],
        featureNote: "Core service",
        footnote: "Influencer and event support: advertising alone is not enough. We can plan it together when needed; fees are separate.",
      },
      {
        type: "tracks",
        heading: "After you connect to a channel, we are still here",
        passiveLabel: "What channel partners do",
        passive: "Listing, display, and shipping\nDay-to-day platform operations\nCustomers they already understand",
        activeLabel: "What we do",
        active: [
          { label: "Product registration", body: "Handled and held by a licensed importer" },
          { label: "Trials", body: "While product registration is underway, let people try the product first" },
          { label: "Data", body: "Review advertising, clicks, conversion, and sales every month" },
          { label: "Contract", body: "You sign only one contract with us; we coordinate with the channel" },
        ],
        ending: "You do not have to negotiate with or chase every company one by one.",
      },
      {
        type: "callout",
        heading: "Deliverables",
        body: "Products on the shelf, monthly sales figures, and a market report.\nReview the numbers after three months. If it does not sell, we will say so directly and tell you why",
      },
      {
        type: "price",
        title: "NT$50,000–60,000",
        caption: "The Market Test fee is credited toward the Consignment package. Together with Month 1, it makes the NT$70,000 starter package",
        details: ["Product registration takes 6–12 weeks; inventory is listed once it is approved, while activities can begin during that time.", "Channel commissions vary by channel. Packaging and explanation adjustments for the local market are separate; we explain them clearly in the first conversation."],
      },
    ],
    faqs: [
      { question: "Why not just run ads directly?", answer: "Honestly, our experience says that is not enough. Consumers in the Philippines look at influencers, events, and whether someone has actually tried the product; advertising is only one part.", takeaway: "Consumers in the Philippines need to see that someone has tried it first" },
      { question: "What if it does not sell?", answer: "Consignment settles based on what sells; we will not push you to ship in more stock. Review the numbers after three months, and we will say so directly if it does not sell.", takeaway: "Settle by actual sales and review the numbers after three months" },
      { question: "Whose name holds the product registration?", answer: "A licensed importer applies for and holds the product registration. The contract requires the importer to cooperate with the transfer, so you do not start from scratch; the FDA transfer or re-notification procedure still applies. We do not tie you to any one channel.", takeaway: "A licensed importer holds it; you are not tied to any one channel" },
      { question: "Are you a channel?", answer: "We do not run stores or buy your inventory outright. We connect you to channels already selling, then connect the product registration, trials, data, and contracts that channels do not handle.", takeaway: "No. We connect you to channels" },
    ],
    next: { ...CHAPTERS.m3.next!, label: "Next chapter →", title: "Month 9 · Company Setup", heading: "When you want your own people on the ground", imageAlt: "A café and pedestrians on a street corner at night" },
    cta: {
      ...CHAPTERS.m3.cta,
      title: "See whether your product is a fit for Consignment",
      body: CTA_LINE_EN,
      action: "Book your free assessment →",
    },
    partnerStrip: {
      ...CHAPTERS.m3.partnerStrip!,
      body: "Are you a channel: an e-commerce seller, chain, or restaurant group that wants more Taiwanese brands listed?\nEvery brand we bring has completed a Market Test, uses a licensed importer for certification, and signs with us. You can focus on your channel.",
      action: "Become a channel partner →",
    },
  },
  m9: {
    ...CHAPTERS.m9,
    label: "Month 9 · Company Setup",
    title: "When you want your own people on the ground",
    scene: "It is selling. You start wondering whether to open your own company, hire the first employee, or put product registration in your own name.\nThen you find that every part needs someone on the ground.\nWe connect those pieces with local partners, so you have one point of contact.",
    imageAlt: "Asian team collaborating in an office",
    heroAction: "Book your free assessment →",
    scenariosHeading: "You may be stuck at one of these three points",
    scenarios: [
      { ...CHAPTERS.m9.scenarios[0]!, title: "You want a local presence, but costs and timing are unclear", body: "Consignment or agency operations are running smoothly and you want a local presence, but do not know what registration through hiring will cost or how long it will take", answer: "First clarify what company you want, how many people you need, and whether it is physical or remote. Then we give you a cost framework for registration, lawyers, hiring, and premises, along with a timeline.", imageAlt: "Business district street along Ayala Avenue in Manila" },
      { ...CHAPTERS.m9.scenarios[1]!, title: "You want to open the first store but worry about the formula and location", body: "A chain restaurant or beauty brand wants to open its first store and worries about losing its formula or choosing the wrong area", answer: "Local lawyers handle contracts and documents. Local partners support site selection and store opening; they have opened stores from zero themselves.", imageAlt: "A café owner holding an open sign at the entrance" },
      { ...CHAPTERS.m9.scenarios[2]!, title: "You want to hire a remote team in the Philippines", body: "You have a team in Taiwan and want people in the Philippines to work remotely, but do not know how to stay compliant", answer: "People are on the ground and report to Taiwan: local partners handle hiring and onboarding, and local lawyers handle compliance documents.", imageAlt: "A video meeting through a laptop" },
    ],
    sections: [
      {
        type: "table",
        heading: "Every part of getting established needs someone on the ground",
        rows: [
          { task: "Company registration and legal documents", owner: "Local lawyers, with us as your point of contact" },
          { task: "Hiring: physical or remote team", owner: "Local partners handle interviews, onboarding, and training the first group" },
          { task: "Philippine FDA licenses (LTO / product registration)", owner: "First held by a licensed importer; we help apply when you want it under your own company name" },
          { task: "Premises, equipment, and day-to-day operations", owner: "The local partner’s operations team stays with you until the first group is in place and the process runs smoothly" },
          { task: "Your role", owner: "Make decisions and review progress without constantly flying over", isYou: true },
        ],
      },
      {
        type: "cards",
        heading: "The three paths our local partners have taken",
        items: [
          { title: "First path · Start from zero", body: "Built an English-language education institution locally—recruiting teachers, finding a location, and enrolling the first student.\nLater, they also built a chain bubble-tea brand from zero", fit: "A fit for brands building a local team or opening stores from scratch" },
          { title: "Second path · Adapt it, then bring it over", body: "A Taiwanese product arrived locally, changed its name, price, and packaging,\nand became something local people would pay for", fit: "A fit for brands with a good product that know local tastes and price bands differ" },
          { title: "Third path · Bring it over unchanged", body: "A Taiwanese beauty brand changed nothing and only marketed locally to see whether it could stand on its own", fit: "A fit for brands whose brand itself is the selling point and do not want to change the product" },
        ],
      },
      {
        type: "price",
        title: "Quoted by project",
        caption: "Company Setup is the largest package among the four chapters, and most brands do not need to take this route at the start.\nFirst clarify what you want to set up, then we give you a cost framework and timeline.",
        details: [],
        breakdown: {
          heading: "What you receive once everything is clear",
          rows: [
            { item: "Company registration", note: "An approximate range based on company type" },
            { item: "Legal documents", note: "An approximate range based on document scope" },
            { item: "Hiring", note: "An approximate range based on headcount and physical or remote work" },
            { item: "Premises", note: "An approximate range based on location and scale" },
            { item: "Timeline", note: "A schedule based on company type and headcount" },
          ],
        },
      },
    ],
    faqs: [
      { question: "Do I have to do Market Test and Consignment first?", answer: "Not necessarily. If you already have Philippine channels and are certain you want a company, you can discuss getting established directly.\nIf you have not started selling yet, we will usually suggest beginning with Market Test or Consignment.", takeaway: "Not necessarily. You can discuss Company Setup directly" },
      { question: "Do you handle compliance?", answer: "We help apply for product registration and avoid pitfalls, but the brand has final responsibility for compliance. That is stated clearly in the contract.", takeaway: "We help with applications and pitfalls; responsibilities are written into the contract" },
      { question: "What does a remote team mean?", answer: "A Taiwan company hires people in the Philippines; they are local and report to Taiwan. This is common in the Philippines, and we support compliance and hiring.", takeaway: "People are local and report to Taiwan" },
      { question: "Will you operate my local company for me?", answer: "No. We coordinate and run alongside you: connecting registration, hiring, product registration, and premises until the first group is in place and the process runs smoothly.\nThe company and the decisions are yours. We do not operate it for you or promise what day product registration will be approved—the review timeline is not ours to control.", takeaway: "No. We coordinate and run alongside you; the company is yours" },
    ],
    next: { ...CHAPTERS.m9.next!, label: "Next chapter →", title: "Every day after · Call Center", heading: "Let a professional English-speaking team handle customer service", imageAlt: "A customer-service agent talking and typing" },
    cta: {
      ...CHAPTERS.m9.cta,
      title: "Talk about what you want to set up in the Philippines",
      body: CTA_LINE_EN,
      action: "Book your free assessment →",
    },
  },
  after: {
    ...CHAPTERS.after,
    label: "Every day after · Call Center",
    title: "Let a professional English-speaking team handle customer service",
    scene: "An English customer complaint: returns, exchanges, and questions about where to buy.\nHiring an English-speaking customer-service representative in Taiwan is hard, and keeping one is hard too; but customers’ messages cannot go unanswered.",
    imageAlt: "Customer-service team collaborating in an office",
    heroAction: "Book your free assessment →",
    scenariosHeading: "You may already be stuck at one of these three points",
    scenarioAnswerLabel: "How we work",
    scenarios: [
      { ...CHAPTERS.after.scenarios[0]!, title: "You cannot respond to overseas customer complaints", body: "Your products are selling overseas, but English complaints, returns, exchanges, and questions keep coming in and your team cannot respond, or responds too slowly.", answer: "Bring the customer-service inbox, platform messages, and social direct messages into one place, then let our English-speaking customer-service team in the Philippines take over replies.", imageAlt: "A return package waiting to be handled" },
      { ...CHAPTERS.after.scenarios[1]!, title: "You want an English-speaking representative but cannot hire or keep one", body: "The job has been open for a long time and people with strong English are scarce; after you finally hire and train someone, they leave and everything starts again.", answer: "We handle hiring, training, scheduling, and replacing people when they leave. You do not need to maintain your own English-speaking customer-service team.", imageAlt: "A customer-service agent wearing a headset" },
      { ...CHAPTERS.after.scenarios[2]!, title: "You have looked at outsourcing but cannot understand the quote", body: "You have asked Taiwan customer-service outsourcers, but the price is not low and it is unclear where the money goes.", answer: "We give you a price range in the first conversation and place it next to the cost of hiring one person yourself. We are responsible in Taiwan for service rules, contracts, and quality indicators.", imageAlt: "Discussing amounts on an invoice" },
    ],
    sections: [
      {
        type: "steps",
        heading: "Call Center service flow",
        items: [
          { number: "01", title: "Bring messages into one workspace", body: "Bring the customer-service inbox, platform messages, and social direct messages into one workspace", icon: "inbox" },
          { number: "02", title: "An English-speaking customer-service team takes over", body: "We recruit Philippine customer-service staff who communicate professionally in English, then train them on your product and rules before they go live.\nWhen someone takes leave or leaves, the team fills the role; you do not need to recruit again.", icon: "badge-check" },
          { number: "03", title: "Reply by your brand rules", body: "Before starting, we write reply templates, return and exchange rules, and the cases that should go back to you into your service rules. After that, replies follow the rules.", icon: "list-checks" },
          { number: "04", title: "Monthly service report", body: "One report shows each month’s message volume, response time, and number of cases returned to you.", icon: "chart-column" },
        ],
      },
      {
        type: "dark-copy",
        heading: "People in the Philippines, rules in Taiwan",
        paragraphs: [
          "Taiwan companies take nearly 45 days on average to find one employee, and only 62% of new hires stay for six months (104 Job Bank’s 2026 HR FBI Report). The person you need must also have strong English and want to do customer service for the long term. The Philippines has long been one of the main places for outsourced English customer service, where this talent has been built by the industry.",
          "Service rules, contracts, and quality indicators stay in Taiwan. You deal with us, not a large outsourcing (BPO) vendor. We only handle matters your customers contact you about; we do not do telemarketing, collections, or back-office work such as data entry.",
        ],
      },
      {
        type: "fit",
        heading: "A fit for brands",
        lead: "Brands already selling overseas, or preparing to go overseas and needing English-speaking customer service",
        items: [
          { label: "Consignment stage", body: "E-commerce platforms are starting to receive orders, and complaints, returns, exchanges, and product questions need timely replies" },
          { label: "After Company Setup", body: "A local store or team is in place, customer-service volume grows, and a stable service process is needed" },
          { label: "North America market", body: "For sales in North America, let the Philippine team handle English-speaking customer service; there is no need to hire another team in North America." },
        ],
        image: CHAPTERS.after.sections[2]!.type === "fit" ? CHAPTERS.after.sections[2]!.image : "",
        imageAlt: "Two team members packing online orders while reviewing a laptop",
      },
      { type: "waitlist" },
    ],
    faqs: [
      { question: "How is this different from hiring one English-speaking representative myself?", answer: "If you hire yourself, you recruit, train, and manage the person, then start over when they leave. With us, recruitment, training, scheduling, and replacements are handled by us; service rules, contracts, and quality indicators are in Taiwan, and you deal with us rather than a large outsourcing (BPO) vendor. For the first three months, the founder personally leads the first team, writes your rules into the process, and then hands it to a dedicated supervisor.", takeaway: "No need to recruit, manage, or replace people yourself" },
      { question: "Can I sign now?", answer: "Not yet. Service is expected to begin in Q1 2027; for now, book 30 minutes to discuss your needs, and brands that have met with us get priority when we open. If the schedule changes, we will notify you first.", takeaway: "Expected to begin in Q1 2027; brands that have met with us get priority" },
      { question: "Can I use it with a very small message volume?", answer: "You can book a conversation. For the first batch, we want brands with low volume where every message matters, so we can refine the service together. If your volume is small enough that replying yourself is more economical, we will say so directly. Sometimes we will suggest waiting—that is also an answer.", takeaway: "You can discuss it; we will say directly whether it is worthwhile" },
    ],
    next: { ...CHAPTERS.after.next!, label: "Start the story again →", title: "Month 1 · Market Test", heading: "Validate the market before deciding what to invest", imageAlt: "A team discussing charts in a meeting" },
    cta: {
      ...CHAPTERS.after.cta,
      title: "First, book 30 minutes",
      body: CTA_LINE_EN,
      action: "Book your free assessment →",
    },
  },
  na: {
    ...CHAPTERS.na,
    label: "North America Retail",
    title: "Put Taiwanese products on North American shelves",
    scene: "From Asian supermarkets to warehouse clubs such as Costco—product selection, buyer samples, trade shows, and negotiation are carried out locally by the North America team. It is for brands established in Taiwan and ready to meet North American purchasing requirements.",
    imageAlt: "Products on supermarket shelves",
    heroAction: "Book your free assessment →",
    scenariosHeading: "You may already be stuck here",
    scenarios: [
      { ...CHAPTERS.na.scenarios[0]!, title: "You want to enter North America but do not know the first step", body: "Your product is established in Taiwan and you want to go to North America, but do not know whether to exhibit, send samples, or adapt packaging first.", answer: "Start with market research and product selection: which product goes first, what specification, and what price band. Sometimes the answer is, “Do not send this one yet.”", imageAlt: "A shopping cart in a supermarket aisle" },
      { ...CHAPTERS.na.scenarios[1]!, title: "You exhibited, sent samples, and heard nothing", body: "You collected a stack of business cards and sent several boxes of samples, then nothing happened.", answer: "The North America team handles local evaluations, booth arrangements, and buyer follow-up, so every business card after an exhibition is followed up.", imageAlt: "A busy business exhibition floor" },
      { ...CHAPTERS.na.scenarios[2]!, title: "You worry the marketing budget will not come back", body: "You worry about spending millions on marketing and getting only one lesson in return.", answer: "First spend a smaller amount to confirm whether the channel wants you, then decide on the next investment. Fees are quoted by stage and explained clearly in the first conversation.", imageAlt: "A data-analysis dashboard on a laptop" },
    ],
    sections: [
      {
        type: "steps",
        heading: "The North America route has four steps",
        items: [
          { number: "Step 01", title: "Market research and product selection", body: "Which product goes first, what specification, and what price band.", icon: "search" },
          { number: "Step 02", title: "Buyer samples and trade shows", body: "Send samples for channel evaluation, arrange a booth, and bring buyers to your table.", icon: "presentation" },
          { number: "Step 03", title: "Negotiate at the table", body: "Vendor terms, payment terms, and opening-order quantity.", icon: "handshake" },
          { number: "Step 04", title: "Enter the channel", body: "Timing depends on the category and channel. Food and supplements must first meet U.S. FDA requirements (facility registration, U.S. labeling, a U.S. importer who can handle FSVP), which usually takes longer; in the first conversation, we give you a timeline for this product.", icon: "store" },
        ],
      },
      {
        type: "two-cards",
        heading: "Who does what",
        items: [
          { title: "North America team", body: "Works locally on research, evaluations, trade shows, U.S. FDA requirements and labeling, and negotiation." },
          { title: "LUFÉ", body: "Your point of contact in Taiwan: one contract and one person to contact when something comes up." },
        ],
      },
      {
        type: "price",
        title: "Quoted in stages: start small, then grow",
        details: ["Start with research and evaluations. Once it is time to negotiate, quote the next stage. We give clear figures in the first conversation."],
      },
    ],
    faqs: [
      { question: "How long does North America Retail take?", answer: "It depends on the category and target channel. Food and supplements must first meet U.S. FDA requirements (facility registration, U.S. labeling, a U.S. importer who can handle FSVP), which usually takes longer. In the first conversation, we give you a timeline for this product.", takeaway: "It depends on category and channel" },
      { question: "Do you guarantee entry?", answer: "No. Whether a channel accepts you is the channel’s decision. What we guarantee is follow-up at every step and visibility into every result. If the product is not ready for North American requirements, we will directly suggest waiting—that is also an answer.", takeaway: "No guarantee, but every step is followed up" },
      { question: "Is this related to the four Philippines chapters?", answer: "They are separate tracks. The North America team works locally, and LUFÉ is your point of contact in Taiwan; brands going to North America can pair this with Call Center if they need English-speaking customer service.", takeaway: "Separate tracks; it can be paired with Call Center" },
    ],
    next: { ...CHAPTERS.na.next!, label: "Related service →", title: "Call Center", heading: "For brands going to North America, the first English customer complaint will arrive too", imageAlt: "A customer-service agent talking and typing" },
    cta: {
      ...CHAPTERS.na.cta,
      title: "First, talk for 30 minutes",
      body: CTA_LINE_EN,
      action: "Book your free assessment →",
    },
  },
};
