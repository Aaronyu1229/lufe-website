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
      expect(markup.replaceAll("<br/>", "")).toContain(caseItem.title);
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

  it("tells the goat soap case as North America and keeps retired wording off every case page", () => {
    const goat = CASES.find((item) => item.slug === "goat-milk-soap-global")!;
    const goatMarkup = renderToStaticMarkup(createElement(CaseDetailPageContent, { caseItem: goat }));
    expect(goatMarkup).toContain("一塊台灣羊奶皂，<br/>怎麼讓北美買家看懂？");
    expect(goatMarkup).toContain("這一案走的");
    expect(goatMarkup).toContain("「別人看不懂」");
    expect(goatMarkup).toContain('href="/services/north-america"');
    expect(goatMarkup).toContain("先釐清 FDA 規範與成分、標示要調整的地方，再談包裝與上市。");
    for (const retired of ["跨境電商與海外通路", "多個海外市場", "怎麼調整成海外也買得到", "品牌底稿", "歐盟", "鹿飛協助", "第二條路", "先做 2 分鐘評估", "盲測"]) {
      expect(goatMarkup).not.toContain(retired);
    }

    for (const caseItem of CASES) {
      const markup = renderToStaticMarkup(createElement(CaseDetailPageContent, { caseItem }));
      expect(markup).toContain("預約 30 分鐘 →");
      expect(markup).toContain("還不確定像哪一種？先做 2 分鐘處境比對");
      expect(markup).not.toContain("先做 2 分鐘評估");
    }
  });
});
