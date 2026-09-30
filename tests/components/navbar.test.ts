import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

import { Navbar } from "@/components/Navbar";

const renderNavbar = () => renderToStaticMarkup(createElement(Navbar));

describe("Navbar", () => {
  it("keeps all five mega panels in the server HTML without rounded utility classes", () => {
    const markup = renderNavbar();

    expect(markup).toContain('id="desktop-mega-menu"');
    for (const label of ["菲律賓 · 第一年四章", "已經在海外", "精選案例", "按章節找", "認識鹿飛"]) {
      expect(markup).toContain(label);
    }

    expect(markup).not.toContain("rounded-");
  });

  it("replaces the former about card and keeps cases tags actionable", () => {
    const markup = renderNavbar();

    expect(markup).toContain("鹿飛 LUFÉ 創辦人・來自躍馬企業");
    expect(markup).toContain("看了很多年貨櫃出去，決定去接貨到了之後的事。");
    expect(markup).not.toContain("42+ 年國際物流實戰");
    expect(markup).not.toContain("AY");
    expect(markup).not.toContain("分類瀏覽");
  });
});
