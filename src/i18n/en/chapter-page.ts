import type { ChapterPageCopy } from "@/i18n/zh/chapter-page";

export const chapterPageEn: ChapterPageCopy = {
  home: "Home",
  services: "Services",
  scrollCueLabel: "Scroll down",
  afterHeroNotice: "Expected to open in Q1 2027 · First-batch registration is open",
  assessAction: "Start the 2-minute Situation Check",
  northAmericaBand: {
    title: "North America Retail",
    body: " follows a separate track from the four Philippines chapters: the North America team works locally, and LUFÉ is your point of contact in Taiwan.",
  },
  scenarioAnswerFallback: "How we work",
  reportPreview: {
    title: "Market Test report · Product A",
    questions: ["Who would buy", "What price would they pay", "Why would they not buy"],
  },
  pricePaths: {
    dark: "You only spend this amount",
    light: "Continue to Month 3 →",
  },
  trackDefaults: {
    passive: "Product registration track (under review, moving forward)",
    active: "LUFÉ track (progress every week)",
  },
  table: {
    task: "What needs to be handled",
    owner: "Who is on the ground",
  },
  waitlist: {
    status: "Registration open",
    title: "Expected to open in Q1 2027; the first batch is limited to a few brands",
    body: "First, book 30 minutes to discuss your current customer-message volume and who handles it. We give you a price range in the first conversation; brands that have met with us get priority when we open. We reply within one business day after you submit.",
    brandLabel: "Brand name *",
    brandPlaceholder: "Your brand",
    emailLabel: "Email *",
    volumeLabel: "Approximate customer messages per month *",
    volumeOptions: ["<100", "100–500", "500 or more"],
    handlerLabel: "Who handles them now",
    handlerPlaceholder: "For example: the founder, Taiwan customer service, or no one yet",
    submit: "Book your free assessment →",
    submitting: "Submitting…",
    submittedTitle: "Received",
    submittedBody: "We will use the email you provided to arrange a time within one business day.",
    errors: {
      name: "Please enter your brand name",
      email: "Please enter your email address",
      emailInvalid: "Please enter a valid email address",
      monthlyVolume: "Please select your monthly customer-message volume",
      currentHandler: "Current handler must be 100 characters or fewer",
    },
    submitError: "We could not send your message. Please email us directly: ",
    fallbackMailto: {
      subject: "LUFÉ Call Center waitlist",
      name: "Brand name",
      email: "Email",
      monthlyVolume: "Monthly messages",
      currentHandler: "Current handler",
    },
  },
  faq: {
    title: "Frequently asked questions",
    ask: "Ask us directly →",
    more: "Have another question?",
  },
};
