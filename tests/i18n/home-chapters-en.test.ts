import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ChaptersSection } from "@/components/home/PositioningBand";

import { expectEnglishMarkup } from "./helpers";

describe("home chapters i18n", () => {
  it("keeps the Chinese chapters byte-identical", () => {
    expect(renderToStaticMarkup(createElement(ChaptersSection))).toBe(readFileSync("tests/fixtures/home-chapters.zh.html", "utf8"));
  });

  it("renders complete English", () => {
    const html = renderToStaticMarkup(createElement(ChaptersSection, { locale: "en" }));
    expectEnglishMarkup(html);
    expect(html).toContain("Market Test");
    expect(html).toContain("First clients expected from Q1 2027");
    expect(html).toContain('href="/en/services/consignment"');
  });
});
