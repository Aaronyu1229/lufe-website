import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  OptimizePageContent,
  OPTIMIZE_FAQS,
  OPTIMIZE_PAIN_POINTS,
  OPTIMIZE_SERVICES,
} from "@/components/services/OptimizePage";

const renderPage = () => renderToStaticMarkup(createElement(OptimizePageContent));

describe("OptimizePageContent", () => {
  it("keeps every pain point, cooperation detail, and FAQ answer in server markup", () => {
    const markup = renderPage();

    for (const point of OPTIMIZE_PAIN_POINTS) {
      expect(markup).toContain(point.title);
      expect(markup).toContain(point.scene);
      expect(markup).toContain(point.action);
    }
    for (const service of OPTIMIZE_SERVICES) {
      expect(markup).toContain(service.title);
      expect(markup).toContain(service.timeline);
      for (const [label, detail] of service.details) {
        expect(markup).toContain(label);
        expect(markup).toContain(detail);
      }
    }
    for (const [question, answer, takeaway] of OPTIMIZE_FAQS) {
      expect(markup).toContain(question);
      expect(markup).toContain(answer);
      expect(markup).toContain(takeaway);
    }
  });

  it("uses the five-role soft wording and does not restore unsupported claims", () => {
    const markup = renderPage();

    expect(markup).toContain("盤完，我們告訴你哪裡能省、值不值得動。不值得動的，我們會直接說。");
    expect(markup).toContain("先弄清楚缺在哪，再決定花不花錢。");
    expect(markup).toContain("目標是新人第一天就知道東西在哪、事情怎麼跑");
    expect(markup).toContain("直接問我們 →");
    for (const banned of ["績效獎金", "月費", "2–3 週", "1–3 個月", "定額診斷", "SEO 文章月產", "AIO", "跨時區溝通延遲", "五階裡的第四階", "AI 複利知識庫", "AI 數位員工", "團隊創新共創", "我們是做物流出身的", "直接問鹿飛"]) expect(markup).not.toContain(banned);
    expect(markup).not.toContain("12–25%");
    expect(markup).not.toContain("200%+");
    expect(markup).not.toContain("90 天縮到 1 天");
  });

  it("does not render rounded utility classes", () => {
    expect(renderPage()).not.toMatch(/\brounded-/);
  });
});
