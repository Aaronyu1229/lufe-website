import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { AaronAuthorPage } from "@/components/about/AaronAuthorPage";

import { expectEnglishMarkup } from "./helpers";

describe("Aaron author page i18n", () => {
  it("keeps Chinese byte-identical", () => {
    expect(renderToStaticMarkup(createElement(AaronAuthorPage))).toBe(readFileSync("tests/fixtures/aaron-author-page.zh.html", "utf8"));
  });

  it("renders complete English with an English article empty state", () => {
    const markup = renderToStaticMarkup(createElement(AaronAuthorPage, { locale: "en" }));

    expectEnglishMarkup(markup);
    expect(markup).toContain("No English articles are available yet.");
  });
});
