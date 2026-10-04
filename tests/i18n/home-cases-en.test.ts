import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { CasesSection } from "@/components/home/CasesSection";

import { expectEnglishMarkup } from "./helpers";

describe("home cases i18n", () => {
  it("keeps the Chinese cases byte-identical", () => {
    expect(renderToStaticMarkup(createElement(CasesSection))).toBe(readFileSync("tests/fixtures/home-cases.zh.html", "utf8"));
  });

  it("renders complete English", () => {
    const html = renderToStaticMarkup(createElement(CasesSection, { locale: "en" }));
    expectEnglishMarkup(html);
    expect(html).toContain("All case studies");
    expect(html).toContain('href="/en/cases/bubble-tea"');
  });
});
