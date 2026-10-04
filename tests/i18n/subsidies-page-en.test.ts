import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { SubsidiesPage } from "@/components/subsidy/SubsidiesPage";

import { expectEnglishMarkup } from "./helpers";

const now = new Date("2026-10-04T12:00:00+08:00");

describe("SubsidiesPage i18n", () => {
  it("keeps Chinese byte-identical", () => {
    expect(renderToStaticMarkup(createElement(SubsidiesPage, { now }))).toBe(readFileSync("tests/fixtures/subsidies-page.zh.html", "utf8"));
  });

  it("renders complete English", () => {
    expectEnglishMarkup(renderToStaticMarkup(createElement(SubsidiesPage, { locale: "en", now })));
  });
});
