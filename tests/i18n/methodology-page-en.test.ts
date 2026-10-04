import { readFileSync } from "node:fs";

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { MethodologyPage } from "@/components/services/MethodologyPage";

import { expectEnglishMarkup } from "./helpers";

describe("methodology page i18n", () => {
  it("keeps the Chinese page byte-identical", () => {
    expect(renderToStaticMarkup(createElement(MethodologyPage))).toBe(readFileSync("tests/fixtures/methodology.zh.html", "utf8"));
  });

  it("renders complete English", () => {
    const html = renderToStaticMarkup(createElement(MethodologyPage, { locale: "en" }));
    expectEnglishMarkup(html);
    expect(html).toContain("The LUFÉ Method");
    expect(html).toContain("Market Test");
  });
});
