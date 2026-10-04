import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: () => {} }),
  useSearchParams: () => new URLSearchParams("stage=idea&blocker=compliance&market=us"),
}));

import { InteractiveScorecard } from "@/components/InteractiveScorecard";
import { AssessResult, EntryScreen, assessQuestions } from "@/components/assess/AssessWizard";
import { MatcherFlow } from "@/components/assess/MatcherFlow";
import { assessPageEn } from "@/i18n/en/assess-page";
import { expectEnglishMarkup } from "./helpers";

const chineseDimensions = [
  { name: "市場", weight: "20%" },
  { name: "通路", weight: "20%" },
  { name: "成本", weight: "20%" },
  { name: "執行", weight: "25%" },
  { name: "法規", weight: "15%" },
];

const englishDimensions = [
  { name: "Market", weight: "20%" },
  { name: "Channels", weight: "20%" },
  { name: "Cost", weight: "20%" },
  { name: "Execution", weight: "25%" },
  { name: "Compliance", weight: "15%" },
];

describe("Situation Check i18n", () => {
  it("keeps Chinese byte-identical", () => {
    expect(renderToStaticMarkup(createElement(EntryScreen))).toBe(readFileSync("tests/fixtures/assess-entry.zh.html", "utf8"));
    expect(renderToStaticMarkup(createElement(AssessResult))).toBe(readFileSync("tests/fixtures/assess-result.zh.html", "utf8"));
    expect(renderToStaticMarkup(createElement(MatcherFlow, { questions: assessQuestions, onComplete: () => null }))).toBe(readFileSync("tests/fixtures/matcher-flow.zh.html", "utf8"));
    expect(renderToStaticMarkup(createElement(InteractiveScorecard, { dimensions: chineseDimensions }))).toBe(readFileSync("tests/fixtures/interactive-scorecard.zh.html", "utf8"));
  });

  it("renders the Situation Check controls and result in complete English", () => {
    expectEnglishMarkup(renderToStaticMarkup(createElement(EntryScreen, { locale: "en" })));
    expectEnglishMarkup(renderToStaticMarkup(createElement(AssessResult, { locale: "en" } as any)));
    expectEnglishMarkup(renderToStaticMarkup(createElement(MatcherFlow, {
      questions: assessPageEn.questions,
      previousLabel: assessPageEn.matcher.previous,
      onRestartLabel: assessPageEn.matcher.restart,
      answeredLabel: assessPageEn.matcher.answered,
      onComplete: () => null,
    })));
    expectEnglishMarkup(renderToStaticMarkup(createElement(InteractiveScorecard, { dimensions: englishDimensions, locale: "en" })));
  });
});
