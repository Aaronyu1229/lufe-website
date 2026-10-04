import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { expectEnglishMarkup } from "./helpers";

const pathname = vi.hoisted(() => ({ current: "/" }));

vi.mock("next/navigation", () => ({
  usePathname: () => pathname.current,
}));

import { Navbar } from "@/components/Navbar";

const zhGolden = readFileSync("tests/fixtures/navbar.zh.html", "utf8");

const chineseArticlePayload = Buffer.from(JSON.stringify({
  slug: "fixture",
  category: "出海實戰",
  date: "2026-10-04",
  title: "中文文章標題",
  summary: "中文文章摘要",
  readTime: "5 分鐘",
  color: "sky",
  image: "/images/hero/hero-poster-1600.webp",
}), "utf8").toString("base64");

const renderNavbar = (latestArticlePayload?: string) => renderToStaticMarkup(createElement(Navbar, { latestArticlePayload }));

describe("navbar i18n", () => {
  it("keeps the Chinese navbar byte-identical", () => {
    pathname.current = "/";
    expect(renderNavbar()).toBe(zhGolden);
  });

  it("renders complete English", () => {
    pathname.current = "/en/services";
    const html = renderNavbar(chineseArticlePayload);

    expectEnglishMarkup(html);
    for (const label of ["Market Test", "Consignment", "Company Setup", "Call Center", "North America Retail"]) {
      expect(html).toContain(label);
    }
  });

  it("keeps links inside English routes", () => {
    pathname.current = "/en/services";
    expect(renderNavbar()).toContain('href="/en/services/consignment"');
  });
});
