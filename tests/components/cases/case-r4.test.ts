import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { CaseDetailPageContent } from "@/components/cases/CaseDetailPage";
import { CASES } from "@/data/cases";

describe("round 4 cases", () => {
  it("keeps only the approved three cases and their complete stories", () => {
    expect(CASES.map((caseItem) => caseItem.slug)).toEqual([
      "goat-milk-soap-global",
      "fish-floss-us-fda",
      "bubble-tea",
    ]);

    for (const caseItem of CASES) {
      const markup = renderToStaticMarkup(createElement(CaseDetailPageContent, { caseItem }));
      expect(markup).toContain(caseItem.title);
      for (const chapter of caseItem.story) expect(markup).toContain(chapter.heading);
    }
  });

  it("only animates numeric results", () => {
    for (const slug of ["goat-milk-soap-global", "fish-floss-us-fda", "bubble-tea"] as const) {
      const caseItem = CASES.find((item) => item.slug === slug);
      expect(caseItem).toBeDefined();
      expect(renderToStaticMarkup(createElement(CaseDetailPageContent, { caseItem: caseItem! }))).not.toContain("data-lufe-counter");
    }
  });

  it("tells the partner-owned bubble tea story and removes retired case claims", () => {
    const bubbleTea = CASES.find((item) => item.slug === "bubble-tea")!;
    const markup = renderToStaticMarkup(createElement(CaseDetailPageContent, { caseItem: bubbleTea }));
    expect(markup).toContain("十幾家");
    for (const retired of ["10 家", "1.2", "BGC", "P150", "第三次", "拿走了配方", "九宮格", "盲飲"]) expect(markup).not.toContain(retired);
    expect(markup).not.toContain(["甜度", "偏高"].join(""));
    expect(markup).not.toContain(["白", "領"].join(""));

    for (const caseItem of CASES) {
      const caseText = [caseItem.title, caseItem.summary, ...caseItem.story.flatMap((chapter) => [chapter.heading, ...chapter.paragraphs])].join(" ");
      expect(caseText).not.toContain("Costco");
    }
  });
});
