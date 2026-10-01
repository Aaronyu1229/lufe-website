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
    for (const [question, answer] of OPTIMIZE_FAQS) {
      expect(markup).toContain(question);
      expect(markup).toContain(answer);
    }
  });

  it("uses the D10 soft wording and does not restore unsupported claims", () => {
    const markup = renderPage();

    expect(markup).toContain("盤完通常都有可省的空間，數字第一次談給你範圍");
    expect(markup).toContain("目標是讓 AI 回答時有你的名字");
    expect(markup).toContain("目標是新人第一天就知道東西在哪、事情怎麼跑");
    expect(markup).not.toContain("12–25%");
    expect(markup).not.toContain("200%+");
    expect(markup).not.toContain("90 天縮到 1 天");
  });

  it("does not render rounded utility classes", () => {
    expect(renderPage()).not.toMatch(/\brounded-/);
  });
});
