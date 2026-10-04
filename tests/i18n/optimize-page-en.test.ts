import { readFileSync } from "node:fs";

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { OptimizePage } from "@/components/services/OptimizePage";

import { expectEnglishMarkup } from "./helpers";

describe("Operations Optimization page i18n", () => {
  it("keeps the Chinese page byte-identical", () => {
    expect(renderToStaticMarkup(createElement(OptimizePage))).toBe(readFileSync("tests/fixtures/optimize.zh.html", "utf8"));
  });

  it("renders complete English without the removed traffic claim", () => {
    const html = renderToStaticMarkup(createElement(OptimizePage, { locale: "en" }));
    expectEnglishMarkup(html);
    expect(html).toContain("Operations Optimization");
    expect(html).toContain("Jumping Freight");
    expect(html).not.toContain("200%+");
  });
});
