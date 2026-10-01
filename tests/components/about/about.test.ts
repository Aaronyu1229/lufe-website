import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { AboutPage, storyCards } from "@/components/about/AboutPage";

describe("AboutPage", () => {
  it("keeps the approved story, beliefs, and network copy in SSR markup", () => {
    const markup = renderToStaticMarkup(createElement(AboutPage));

    for (const card of storyCards) {
      expect(markup).toContain(card.title);
      expect(markup).toContain(card.copy);
    }

    for (const belief of [
      "出海是遲早的事：早一點、小一點開始，成本最低",
      "先做最難的事：辦證、設公司、接客訴，做不到就直說",
      "有立場：建議能讓企業長大的選項，而非最省事的",
      "判斷有數據，做法有實績",
    ]) expect(markup).toContain(belief);

    expect(markup).toContain("跨越三地的資源網絡");
    expect(markup).toContain("30+");
    expect(markup).toContain("500+");
    expect(markup).not.toContain("誠實的邊界");
    expect(markup).not.toContain("你會得到什麼樣的陪跑");
    expect(markup).not.toContain("看 Aaron 的文章");
    expect(markup).not.toContain("不是 Aaron 一個人");
    expect(markup).not.toContain("* 我們的定位");
    expect(markup).not.toContain("<canvas");
    expect(markup).not.toContain("section-heading");
    expect(markup).not.toContain("hero-title");
    expect(markup).not.toContain("rounded-");
  });
});
