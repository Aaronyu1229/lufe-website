import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

import { Navbar, normalizePathname, pathnameHasDarkHero } from "@/components/Navbar";

const renderNavbar = () => renderToStaticMarkup(createElement(Navbar));

describe("Navbar", () => {
  it("keeps all five mega panels in the server HTML without rounded utility classes", () => {
    const markup = renderNavbar();

    expect(markup).toContain('id="desktop-mega-menu"');
    for (const label of ["菲律賓 · 第一年四章", "另一條線", "從這裡開始", "一頁看完", "第一個月 · 1～2 萬"]) {
      expect(markup).not.toContain(label);
    }
    expect(markup).not.toContain("bg-navy");
    for (const title of ["不確定從哪裡開始？", "免費初步評估", "不確定比較像哪一條？", "創辦人專欄"]) {
      expect(markup).toContain(title);
    }
    expect(markup).not.toContain("/about#how-we-work");
    expect(markup).not.toContain("/about#what-we-dont-do");
    expect(markup).not.toContain("rounded-");
  });

  it("groups the insights menu and shows TradePilot with its mark in desktop and mobile menus", () => {
    const markup = renderNavbar();

    expect(markup).not.toContain("TradePilot - 線上報關工具");
    expect(markup).toContain("tradepilot-gold.png");
    expect(markup.match(/線上報關工具/g)).toHaveLength(2);
    for (const label of ["依章節看文章", "工具與資源", "最新文章"]) expect(markup).toContain(label);
    expect(markup).not.toContain("第一個月：市場探查");
  });

  it("uses the new resources label in desktop and mobile menus", () => {
    const markup = renderNavbar();

    expect(markup.match(/補助與資源/g)).toHaveLength(2);
    expect(markup).not.toContain("補助與活動");
  });

  it("never lists an insight chapter that has no articles", () => {
    const markup = renderNavbar();

    expect(markup).not.toContain("0 篇");
  });

  it.each([null, "", "/index"])("normalizes %j to the homepage pathname", (pathname) => {
    expect(normalizePathname(pathname)).toBe("/");
    expect(pathnameHasDarkHero(normalizePathname(pathname))).toBe(true);
  });

  it("keeps the assess result shell on a dark hero", () => {
    expect(pathnameHasDarkHero("/assess/result")).toBe(true);
  });
});
