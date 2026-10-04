import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { CTASection } from "@/components/home/CTASection";

import { expectEnglishMarkup } from "./helpers";

describe("home CTA i18n", () => {
  it("keeps the Chinese CTA byte-identical", () => {
    expect(renderToStaticMarkup(createElement(CTASection))).toBe(readFileSync("tests/fixtures/home-cta.zh.html", "utf8"));
  });

  it("renders complete English", () => {
    const html = renderToStaticMarkup(createElement(CTASection, { locale: "en" }));
    expectEnglishMarkup(html);
    expect(html).toContain("Free 30-minute initial assessment");
    expect(html).toContain('href="/en/assess"');
  });
});
