import type { AssessPageCopy } from "@/i18n/zh/assess-page";

// Fingerprint of assessPageZh this English was translated from; registry.test.ts prints the value after the first run.
export const ASSESS_PAGE_SOURCE_FINGERPRINT = "5c960a55a631ceaf";

export const assessPageEn: AssessPageCopy = {
  stageShort: { idea: "Starting out", tested: "Testing the waters", scaling: "Scaling" },
  blockerShort: { market: "Finding a market", channel: "Finding channels", cost: "Calculating costs", execution: "Lacking execution", compliance: "Handling regulations" },
  marketShort: { us: "North America", sea: "the Philippines / Southeast Asia", japan: "Japan and Korea", europe: "Europe", other: "Other markets" },
  questions: [
    { id: "stage", label: "Where are you on the path to overseas expansion?", options: [
      { value: "idea", label: "Still selling in Taiwan; have not exported yet", hint: "Signal: the product is steady at home, but you have never actually landed a shipment overseas" },
      { value: "tested", label: "Tried small exports, but they are not steady yet", hint: "Signal: you have run 1–3 trial orders and have data, but cannot find the rhythm or decide whether to scale" },
      { value: "scaling", label: "Already expanding overseas and want to scale or adjust", hint: "Signal: overseas business has run for more than a year, but growth has stalled or one part has started to get stuck" },
    ] },
    { id: "blocker", label: "What is keeping you up at night?", options: [
      { value: "market", label: "Not sure which market to enter", hint: "Signal: you have agent contacts in three or more countries, but have not signed with any of them" },
      { value: "channel", label: "Cannot find the right channels or partners", hint: "Signal: you can get into convenience stores but not mass retail, or you are listed but the product has no traction" },
      { value: "cost", label: "Costs are unclear and margins are being eaten away", hint: "Signal: a quotation looks profitable, then tariffs, logistics, and exchange rates take half after shipment" },
      { value: "execution", label: "You know the direction, but no one is carrying out the work", hint: "Signal: you have reviewed several strategy decks, but no one has actually worked alongside you through local implementation" },
      { value: "compliance", label: "Not sure whether regulations, ingredients, or labeling will clear the bar", hint: "Signal: the product is legally listed in Taiwan, but you do not know the destination regulator, ingredient restrictions, or labeling format" },
    ] },
    { id: "market", label: "Which market are you mainly considering?", options: [
      { value: "sea", label: "The Philippines / Southeast Asia" },
      { value: "us", label: "United States / North America" },
      { value: "other", label: "Another market, or not decided yet" },
    ] },
  ],
  matcher: { previous: "← Previous", restart: "Start over", answered: "Answered questions" },
  chapterHints: {
    market: { text: "People in a situation closest to yours usually begin with “Market Test” →", href: "/services/product-testing" },
    channel: { text: "People in a situation closest to yours usually begin with “Consignment” →", href: "/services/consignment" },
    compliance: { text: "People in a situation closest to yours usually begin with “Consignment”: we handle product registration →", href: "/services/consignment" },
    execution: { text: "People in a situation closest to yours usually begin with “Company Setup” →", href: "/services/localization" },
    cost: { text: "People in a situation closest to yours usually begin with “Operations Optimization” →", href: "/services/optimize" },
  },
  northAmericaChapter: { text: "North America takes a different route. First see how North America Retail works →", href: "/services/north-america" },
  fallback: { headline: "Situation Check", loading: "Loading…" },
  entry: {
    home: "Home", cases: "Cases", compare: "Compare", breadcrumb: "Situation Check", headline: ["See which case", "your situation is most like"], lead: "Three questions, about 2 minutes. Compare two cases we worked on and one our Philippine partners built themselves to find the closest one, how it was assessed at the time, and which chapter it usually starts with.", comparing: "Comparing", start: "Start the check ↓", scrollCue: "Scroll down", compareCases: "Two cases we worked on and one our Philippine partners built themselves are used for comparison",
  },
  narrative: {
    dimensions: { stage: "Stage", blocker: "Blocker", market: "Market" },
    stageMatched: "You're at the same stage they were: {stage}", stageMissed: "Your stage: {answer}. Theirs: {signature}. A different pace", blockerMatched: "Both were stuck on “{blocker}”", blockerMissed: "You are stuck on “{answer}”; they were stuck on “{signature}” — different terrain", marketMatched: "Target market matches: {market}", marketMissed: "You are looking at {answer}; they were working in {signature}",
    exact: { headline: "Your situation is almost exactly what they faced at the time", closing: "How they assessed the situation and what they did first can mostly be compared against your situation. The specifics still depend on your product; this case is worth reading from beginning to end." },
    close: { headline: "Two aligned — the same path, different terrain", closing: "Their decision logic can be used directly, but the specifics need to become your version. This case is worth reading to the end — learn how to think, then adapt how to act." },
    partial: { headline: "One aligned — a useful direction to consider", closing: "Learn how they thought and made decisions; do not copy what they did. If you want a comparison closer to your situation, 30 minutes is enough time to talk." },
    none: { headline: "All three dimensions differ — but the method still applies", closing: "You can scan this case quickly to see how they assessed the situation. Your situation may be better served by talking first before deciding; sometimes we suggest waiting, and that is also an answer." },
  },
  result: {
    loading: "Loading results…", invalid: { headline: "This comparison link is incomplete", restart: "Compare again →" }, restart: "Start over", matched: "Matched", different: "Different", fullCase: "Read the full case →", alternativeMatch: "Match {score}/3", otherPath: "See the other path →", ctaTitle: "What would this method look like for your situation?", copied: "✓ Link copied", copy: "Copy this comparison", book: "Book your free assessment →",
  },
  scorecard: { total: "Try dragging · weighted total", go: "Proceed through the four chapters as usual", conditional: "Proceed after resolving one or two weak areas", hold: "Recommended to pause for 6–12 months until key conditions change", noGo: "Not recommended. LUFÉ will clearly explain what conditions could make it worth reconsidering", minimum: "LUFÉ's rule: below 60, we do not take the case" },
};
