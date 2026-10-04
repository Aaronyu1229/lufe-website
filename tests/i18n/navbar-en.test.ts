import { readFileSync } from "node:fs";
import { createElement, type ComponentProps } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { expectEnglishMarkup } from "./helpers";

const pathname = vi.hoisted(() => ({ current: "/" }));

vi.mock("next/navigation", () => ({
  usePathname: () => pathname.current,
}));

import { Navbar } from "@/components/Navbar";
import type { InsightCard } from "@/lib/articles/presentation";

const zhGolden = readFileSync("tests/fixtures/navbar.zh.html", "utf8");
const englishLatestArticle: InsightCard = {
  slug: "fixture-insight",
  title: "An English navigation article",
  summary: "An English navigation summary.",
  category: "菲律賓",
  date: "2026-10-04",
  readTime: "5 min read",
  color: "sky",
  image: "/images/hero/hero-poster-1600.webp",
};

const renderNavbar = (props: Partial<ComponentProps<typeof Navbar>> = {}) => renderToStaticMarkup(createElement(Navbar, props));

describe("navbar i18n", () => {
  it("keeps the Chinese navbar byte-identical", () => {
    pathname.current = "/";
    expect(renderNavbar()).toBe(zhGolden);
  });

  it("renders complete English", () => {
    pathname.current = "/en/services";
    const html = renderNavbar();

    expectEnglishMarkup(html);
    for (const label of ["Market Test", "Consignment", "Company Setup", "Call Center", "North America Retail"]) {
      expect(html).toContain(label);
    }
  });

  it("keeps links inside English routes", () => {
    pathname.current = "/en/services";
    expect(renderNavbar()).toContain('href="/en/services/consignment"');
  });

  it("renders the English latest article when supplied", () => {
    pathname.current = "/en/services";
    const html = renderNavbar({ latestArticleEn: englishLatestArticle });

    expectEnglishMarkup(html);
    expect(html).toContain("An English navigation article");
    expect(html).toContain('href="/en/insights/fixture-insight"');
  });
});
