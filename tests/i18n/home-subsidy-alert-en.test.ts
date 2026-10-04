import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { SubsidyAlertBand } from "@/components/home/SubsidyAlertBand";

import { expectEnglishMarkup } from "./helpers";

const now = new Date("2026-10-04T00:00:00.000Z");

describe("home subsidy alert i18n", () => {
  it("keeps the Chinese alert byte-identical", () => {
    expect(renderToStaticMarkup(createElement(SubsidyAlertBand, { now }))).toBe(readFileSync("tests/fixtures/home-subsidy-alert.zh.html", "utf8"));
  });

  it("renders complete English", () => {
    const html = renderToStaticMarkup(createElement(SubsidyAlertBand, { now, locale: "en" }));
    expectEnglishMarkup(html);
    expect(html).toContain("NT$5,000,000");
    expect(html).toContain('href="/en/resources/subsidies#market-expansion"');
  });
});
