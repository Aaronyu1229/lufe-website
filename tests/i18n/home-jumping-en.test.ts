import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { JumpingSection } from "@/components/home/JumpingSection";

import { expectEnglishMarkup } from "./helpers";

describe("home Jumping Freight section i18n", () => {
  it("keeps the Chinese section byte-identical", () => {
    expect(renderToStaticMarkup(createElement(JumpingSection))).toBe(readFileSync("tests/fixtures/home-jumping.zh.html", "utf8"));
  });

  it("renders complete English", () => {
    const html = renderToStaticMarkup(createElement(JumpingSection, { locale: "en" }));
    expectEnglishMarkup(html);
    expect(html).toContain("Jumping Freight");
    expect(html).toContain("Market Test");
  });
});
