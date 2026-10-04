import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import EnglishNotFound from "@/app/en/not-found";

import { expectEnglishMarkup } from "./helpers";

describe("English not found page", () => {
  it("uses English copy and keeps visitors under /en", () => {
    const html = renderToStaticMarkup(createElement(EnglishNotFound));

    expectEnglishMarkup(html);
    expect(html).toContain("This page is not here.");
  });
});
