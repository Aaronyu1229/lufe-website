import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { HeroSection } from "@/components/home/HeroSection";

import { expectEnglishMarkup } from "./helpers";

describe("home hero i18n", () => {
  it("keeps the Chinese hero byte-identical", () => {
    expect(renderToStaticMarkup(createElement(HeroSection))).toBe(readFileSync("tests/fixtures/home-hero.zh.html", "utf8"));
  });

  it("renders complete English", () => {
    const html = renderToStaticMarkup(createElement(HeroSection, { locale: "en" }));
    expectEnglishMarkup(html);
    expect(html).toContain("Product-market fit");
    expect(html).toContain("Jumping Freight");
    expect(html).toContain('href="/en/cases"');
  });
});
