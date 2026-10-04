import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { OneContractSection } from "@/components/home/WhySection";

import { expectEnglishMarkup } from "./helpers";

describe("home one-contract section i18n", () => {
  it("keeps the Chinese section byte-identical", () => {
    expect(renderToStaticMarkup(createElement(OneContractSection))).toBe(readFileSync("tests/fixtures/home-why.zh.html", "utf8"));
  });

  it("renders complete English", () => {
    const html = renderToStaticMarkup(createElement(OneContractSection, { locale: "en" }));
    expectEnglishMarkup(html);
    expect(html).toContain("Market Test &amp; Consignment");
    expect(html).toContain("Jumping Freight");
  });
});
