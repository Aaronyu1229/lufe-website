import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { CaseDetailPageContent } from "@/components/cases/CaseDetailPage";
import { CasesPageContent } from "@/components/cases/CasesPage";
import { CASES } from "@/data/cases";
import { CASES_EN } from "@/i18n/en/cases";
import { expectEnglishMarkup } from "./helpers";

describe("Cases i18n", () => {
  it("keeps Chinese byte-identical", () => {
    expect(renderToStaticMarkup(createElement(CasesPageContent, { industry: "all", market: "all" }))).toBe(readFileSync("tests/fixtures/cases-page.zh.html", "utf8"));
    expect(CASES.map((caseItem) => renderToStaticMarkup(createElement(CaseDetailPageContent, { caseItem }))).join("\n")).toBe(readFileSync("tests/fixtures/case-detail-pages.zh.html", "utf8"));
  });

  it("renders the index and every detail page in complete English", () => {
    expectEnglishMarkup(renderToStaticMarkup(createElement(CasesPageContent, { industry: "all", market: "all", locale: "en" })));
    for (const caseItem of CASES_EN) {
      expectEnglishMarkup(renderToStaticMarkup(createElement(CaseDetailPageContent, { caseItem, locale: "en" })));
    }
  });
});
