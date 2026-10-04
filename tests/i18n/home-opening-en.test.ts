import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { OpeningSection } from "@/components/home/OpeningSection";

import { expectEnglishMarkup } from "./helpers";

describe("home opening i18n", () => {
  it("keeps the Chinese opening byte-identical", () => {
    expect(renderToStaticMarkup(createElement(OpeningSection))).toBe(readFileSync("tests/fixtures/home-opening.zh.html", "utf8"));
  });

  it("renders complete English", () => {
    const html = renderToStaticMarkup(createElement(OpeningSection, { locale: "en" }));
    expectEnglishMarkup(html);
    expect(html).toContain("NT$10,000–20,000 Market Test");
  });
});
