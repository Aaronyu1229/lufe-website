import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/articles/repository", () => ({
  listPublishedArticles: async () => [],
}));

import EnglishHome, { metadata } from "@/app/en/page";
import Home from "@/app/page";
import { getPublishedEnglishArticles } from "@/lib/articles/english";

import { expectEnglishMarkup } from "./helpers";

describe("English home page", () => {
  it("keeps the Chinese page byte-identical without the English-only trust block", async () => {
    const html = renderToStaticMarkup(await Home());

    expect(html).not.toContain("Who we are");
    expect(html).toBe(readFileSync("tests/fixtures/home-page.zh.html", "utf8"));
  });

  it("renders complete English, with the insights section only when English articles exist", () => {
    const html = renderToStaticMarkup(createElement(EnglishHome));
    expectEnglishMarkup(html);
    expect(html).toContain("Who we are");
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
