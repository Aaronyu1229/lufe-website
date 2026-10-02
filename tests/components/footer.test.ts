import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Footer } from "@/components/Footer";

describe("Footer", () => {
  it("renders the approved tagline and external link labels", () => {
    const markup = renderToStaticMarkup(createElement(Footer));

    expect(markup).toContain("協助台灣企業在北美與東南亞落地：市場探查、寄賣、公司落地到海外客服，一個窗口走完出海第一年。以躍馬企業 42 年國際物流為後盾");
    expect(markup).toContain("TradePilot - 線上報關工具");
    expect(markup).toContain("躍馬企業 - 官網");
    expect(markup).toContain('href="/contact"');
    expect(markup).not.toContain('href="/contact#partners"');
  });
});
