import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ResourcesPage } from "@/components/resources/ResourcesPage";

import { expectEnglishMarkup } from "./helpers";

describe("ResourcesPage i18n", () => {
  it("keeps Chinese byte-identical", () => {
    expect(renderToStaticMarkup(createElement(ResourcesPage))).toBe(readFileSync("tests/fixtures/resources-page.zh.html", "utf8"));
  });

  it("renders complete English", () => {
    expectEnglishMarkup(renderToStaticMarkup(createElement(ResourcesPage, { locale: "en" })));
  });
});
