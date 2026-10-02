import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/articles/repository", () => ({
  listPublishedArticles: vi.fn().mockResolvedValue([]),
}));

import { ChapterPage } from "@/components/services/ChapterPage";
import { MethodologyPage } from "@/components/services/MethodologyPage";
import { CHAPTERS, type ChapterKey } from "@/data/chapters";

const renderChapter = async (key: ChapterKey) =>
  renderToStaticMarkup(await ChapterPage({ chapter: CHAPTERS[key] }));

describe("services round four", () => {
  it("uses the professional product-testing heading without audience labels", async () => {
    const markup = await renderChapter("m1");

    expect(markup).toContain("先驗證市場，再決定投入");
    expect(markup).not.toMatch(/媽媽|家長|上班族/);
  });

  it("uses the professional call-center h1", async () => {
    const markup = await renderChapter("after");

    expect(markup).toMatch(/<h1[^>]*>海外客服，交給專業英語團隊<\/h1>/);
  });

  it("renders the five consignment inclusions without the withdrawn activity", async () => {
    const markup = await renderChapter("m3");

    expect(markup).toContain("寄賣包包含的五件事");
    for (const title of ["電商通路上架", "產品證代持", "社群試用活動", "市場報告", "網紅與活動配套"]) expect(markup).toContain(title);
    expect(markup).toContain("核心服務");
    expect(markup).not.toContain("學校家長");
  });

  it("uses the localization pricing specification table", async () => {
    const markup = await renderChapter("m9");
    const priceSection = markup.match(/<section[^>]*data-lufe-price[^>]*>[\s\S]*?<\/section>/)?.[0] ?? "";

    for (const copy of ["費用", "按案報價", "第一次談會給你", "公司註冊", "律師行文件", "招聘", "場地", "時間表"]) expect(priceSection).toContain(copy);
    expect(priceSection).not.toMatch(/class="[^"]*(?:border-navy-l[^"]*bg-navy|bg-navy[^"]*border-navy-l)[^"]*"/);
  });

  it("renders both methodology examples and all findings without audience labels", () => {
    const markup = renderToStaticMarkup(createElement(MethodologyPage));

    for (const copy of [
      "一盒台灣手工花生糖禮盒，想去菲律賓",
      "一瓶台灣防曬，想去菲律賓",
      "花生糖禮盒",
      "防曬乳",
      "決策意涵",
      "換算後是當地心理價位的兩倍以上",
      "效期遠長於當地主流產品",
      "其中一個口味評價兩極",
      "沒有競品主打全素與潔淨標章",
      "「維他命 C」在當地等於美白",
      "當地偏好有香味",
    ]) expect(markup).toContain(copy);

    expect(markup).not.toMatch(/女性上班族|小資|她們/);
  });
});
