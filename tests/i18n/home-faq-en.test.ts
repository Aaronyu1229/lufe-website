import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { HomeFAQ } from "@/components/home/HomeFAQ";

import { expectEnglishMarkup } from "./helpers";

describe("home FAQ i18n", () => {
  it("keeps the Chinese FAQ byte-identical", () => {
    expect(renderToStaticMarkup(createElement(HomeFAQ))).toBe(readFileSync("tests/fixtures/home-faq.zh.html", "utf8"));
  });

  it("renders complete English", () => {
    const html = renderToStaticMarkup(createElement(HomeFAQ, { locale: "en" }));
    expectEnglishMarkup(html);
    expect(html).toContain("NT$10,000–20,000");
    expect(html).toContain("expected from Q1 2027");
  });
});
