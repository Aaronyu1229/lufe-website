import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/en/assess",
  useRouter: () => ({ push: () => {} }),
  useSearchParams: () => new URLSearchParams("stage=idea&blocker=compliance&market=us"),
}));

import { AaronAuthorPage } from "@/components/about/AaronAuthorPage";
import { AboutPage, storyChapters } from "@/components/about/AboutPage";
import { FreightRateChart } from "@/components/about/FreightRateChart";
import { NetworkGlobe } from "@/components/about/NetworkGlobe";
import { EntryScreen, AssessResult, assessQuestions } from "@/components/assess/AssessWizard";
import { MatcherFlow } from "@/components/assess/MatcherFlow";
import { CaseDetailPageContent } from "@/components/cases/CaseDetailPage";
import { CasesPageContent } from "@/components/cases/CasesPage";
import { ContactPage } from "@/components/contact/ContactPage";
import { InteractiveScorecard } from "@/components/InteractiveScorecard";
import { StoryChapters } from "@/components/story/StoryChapters";
import { CASES, CASE_CARD_META, INDUSTRIES, MARKETS } from "@/data/cases";
import { CASES_EN, CASE_CARD_META_EN, INDUSTRIES_EN, MARKETS_EN } from "@/i18n/en/cases";
import { expectEnglishMarkup } from "./helpers";

const render = (element: React.ReactElement<any>) => renderToStaticMarkup(element);

describe("Batch D Chinese snapshots", () => {
  it("keeps every changed Chinese component byte-identical", () => {
    expect(render(createElement(AboutPage))).toBe(readFileSync("tests/fixtures/about-page.zh.html", "utf8"));
    expect(render(createElement(StoryChapters, { chapters: storyChapters }))).toBe(readFileSync("tests/fixtures/about-story-chapters.zh.html", "utf8"));
    expect(render(createElement(FreightRateChart))).toBe(readFileSync("tests/fixtures/freight-rate-chart.zh.html", "utf8"));
    expect(render(createElement(NetworkGlobe))).toBe(readFileSync("tests/fixtures/network-globe.zh.html", "utf8"));
    expect(render(createElement(AaronAuthorPage))).toBe(readFileSync("tests/fixtures/aaron-author-page.zh.html", "utf8"));
    expect(render(createElement(ContactPage))).toBe(readFileSync("tests/fixtures/contact-page.zh.html", "utf8"));
    expect(render(createElement(CasesPageContent, { industry: "all", market: "all" }))).toBe(readFileSync("tests/fixtures/cases-page.zh.html", "utf8"));
    expect(CASES.map((caseItem) => render(createElement(CaseDetailPageContent, { caseItem }))).join("\n")).toBe(readFileSync("tests/fixtures/case-detail-pages.zh.html", "utf8"));
    expect(render(createElement(EntryScreen))).toBe(readFileSync("tests/fixtures/assess-entry.zh.html", "utf8"));
    expect(render(createElement(AssessResult))).toBe(readFileSync("tests/fixtures/assess-result.zh.html", "utf8"));
    expect(render(createElement(MatcherFlow, { questions: assessQuestions, onComplete: () => null }))).toBe(readFileSync("tests/fixtures/matcher-flow.zh.html", "utf8"));
    expect(render(createElement(InteractiveScorecard, { dimensions: [{ name: "市場", weight: "20%" }, { name: "通路", weight: "20%" }, { name: "成本", weight: "20%" }, { name: "執行", weight: "25%" }, { name: "法規", weight: "15%" }] }))).toBe(readFileSync("tests/fixtures/interactive-scorecard.zh.html", "utf8"));
  });
});

describe("Batch D English components", () => {
  it("renders the About page and Founder’s Column in complete English", () => {
    expectEnglishMarkup(render(createElement(AboutPage, { locale: "en" } as any)));
    expectEnglishMarkup(render(createElement(AaronAuthorPage, { locale: "en" } as any)));
  });

  it("renders the contact interface in English while retaining Chinese form values", () => {
    const html = render(createElement(ContactPage, { locale: "en" } as any));
    expectEnglishMarkup(html);
    expect(html).toContain("We reply within one business day");
    expect(html).toContain("aaron.yu@reborn.in");
  });

  it("renders the case index and every case detail in complete English", () => {
    expectEnglishMarkup(render(createElement(CasesPageContent, {
      industry: "all",
      market: "all",
      locale: "en",
      cases: CASES_EN,
      cardMeta: CASE_CARD_META_EN,
      industries: INDUSTRIES_EN,
      markets: MARKETS_EN,
    } as any)));
    for (const caseItem of CASES_EN) {
      expectEnglishMarkup(render(createElement(CaseDetailPageContent, { caseItem, locale: "en", cases: CASES_EN } as any)));
    }
  });

  it("renders the Situation Check and its controls in complete English", () => {
    expectEnglishMarkup(render(createElement(EntryScreen, { locale: "en", cases: CASES_EN, cardMeta: CASE_CARD_META_EN } as any)));
    expectEnglishMarkup(render(createElement(AssessResult, { locale: "en", cases: CASES_EN, cardMeta: CASE_CARD_META_EN } as any)));
    expectEnglishMarkup(render(createElement(MatcherFlow, { questions: assessQuestions, locale: "en", onComplete: () => null } as any)));
    expectEnglishMarkup(render(createElement(InteractiveScorecard, { locale: "en", dimensions: [{ name: "Market", weight: "20%" }, { name: "Channels", weight: "20%" }, { name: "Cost", weight: "20%" }, { name: "Execution", weight: "25%" }, { name: "Compliance", weight: "15%" }] } as any)));
  });
});
