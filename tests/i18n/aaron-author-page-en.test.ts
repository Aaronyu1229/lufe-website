import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { AaronAuthorPage } from "@/components/about/AaronAuthorPage";
import { getPublishedEnglishArticles } from "@/lib/articles/english";

import { expectEnglishMarkup } from "./helpers";

describe("Aaron author page i18n", () => {
  it("keeps Chinese byte-identical", () => {
    const markup = renderToStaticMarkup(createElement(AaronAuthorPage));

    expect(markup).not.toContain("About Aaron Yu");
    expect(markup).toBe(readFileSync("tests/fixtures/aaron-author-page.zh.html", "utf8"));
  });

  it("renders complete English with English articles or the empty state", () => {
    const markup = renderToStaticMarkup(createElement(AaronAuthorPage, { locale: "en" }));
    const [latest] = getPublishedEnglishArticles();

    expectEnglishMarkup(markup);
    expect(markup).toContain("About Aaron Yu");
    if (latest) expect(markup).toContain(renderToStaticMarkup(createElement("span", null, latest.title)).slice(6, -7));
    else expect(markup).toContain("No English articles are available yet.");
  });
});
