import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/articles/repository", () => ({
  listPublishedArticles: async () => [],
}));

import EnglishHome, { metadata } from "@/app/en/page";
import { getPublishedEnglishArticles } from "@/lib/articles/english";

import { expectEnglishMarkup } from "./helpers";

describe("English home page", () => {
  it("renders complete English, with the insights section only when English articles exist", () => {
    const html = renderToStaticMarkup(createElement(EnglishHome));
    expectEnglishMarkup(html);
    expect(html).toContain("A brand&#x27;s first year in Manila");
    expect(html).toContain("Market Test");
    if (getPublishedEnglishArticles().length > 0) expect(html).toContain("Practical insights on overseas expansion");
    else expect(html).not.toContain("Practical insights on overseas expansion");
  });

  it("uses an English canonical with reciprocal hreflang", () => {
    expect(metadata.alternates).toEqual({
      canonical: "/en",
      languages: {
        "zh-Hant": "/",
        en: "/en",
        "x-default": "/",
      },
    });
  });
});
