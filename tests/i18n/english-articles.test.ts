import { describe, expect, it, vi } from "vitest";

import { articles } from "@/data/articles";
import { getPublishedArticles } from "@/lib/articles/published";

vi.mock("@/data/en/articles", () => ({
  EN_ARTICLES: {
    "agent-vs-distributor-exclusive": {
      slug: "agent-vs-distributor-exclusive",
      sourceFingerprint: "test",
      title: "English published article",
      summary: "An English summary.",
      readTime: "6 min read",
      content: ["English content."],
    },
    "philippines-cpr-transfer-change-importer": {
      slug: "philippines-cpr-transfer-change-importer",
      sourceFingerprint: "test",
      title: "English scheduled article",
      summary: "An English summary.",
      readTime: "6 min read",
      content: ["English content."],
    },
  },
}));

import { getEnglishArticle, getPublishedEnglishArticles } from "@/lib/articles/english";

const { EN_ARTICLES: realEnglishArticles } = await vi.importActual<typeof import("@/data/en/articles")>("@/data/en/articles");

const publishedSlug = "agent-vs-distributor-exclusive";
const scheduledSlug = "philippines-cpr-transfer-change-importer";
const beforeScheduledPublication = new Date("2026-01-01T00:00:00+08:00");

function sourceReferences(content: readonly string[]): readonly number[] {
  return [...new Set([...content.join("\n").matchAll(/\[(\d+)\]/g)].map((match) => Number(match[1])))].sort((left, right) => left - right);
}

describe("English article helpers", () => {
  it("overlays English text onto the published Chinese article", () => {
    const chinese = articles.find((article) => article.slug === publishedSlug)!;
    const english = getEnglishArticle(publishedSlug);

    expect({
      date: english?.date,
      publishAt: english?.publishAt,
      category: english?.category,
      color: english?.color,
      lastVerified: english?.lastVerified,
      title: english?.title,
    }).toEqual({
      date: chinese.date,
      publishAt: chinese.publishAt,
      category: chinese.category,
      color: chinese.color,
      lastVerified: chinese.lastVerified,
      title: "English published article",
    });
  });

  it("does not expose an English article before its Chinese publication time", () => {
    expect(getEnglishArticle(scheduledSlug, beforeScheduledPublication)).toBeUndefined();
  });

  it("returns nothing for unknown slugs and Chinese articles without English copy", () => {
    const untranslated = articles.find((article) => article.slug !== publishedSlug && article.slug !== scheduledSlug)!;

    expect(getEnglishArticle("no-such-slug")).toBeUndefined();
    expect(getEnglishArticle(untranslated.slug)).toBeUndefined();
  });

  it("keeps the Chinese published-article order while retaining only English articles", () => {
    const expected = getPublishedArticles(beforeScheduledPublication)
      .filter((article) => article.slug === publishedSlug || article.slug === scheduledSlug)
      .map((article) => article.slug);

    expect(getPublishedEnglishArticles(beforeScheduledPublication).map((article) => article.slug)).toEqual(expected);
  });
});

describe("real English article data", () => {
  it("maps every English article faithfully to its Chinese article", () => {
    for (const english of Object.values(realEnglishArticles)) {
      const chinese = articles.find((article) => article.slug === english.slug);

      expect(chinese).toBeDefined();
      expect(JSON.stringify({ content: english.content, faq: english.faq, sources: english.sources })).not.toMatch(/\p{Script=Han}/u);
      expect(JSON.stringify(english)).not.toMatch(/guarantee|guaranteed|golden decade|demographic dividend/i);
      expect(sourceReferences(english.content)).toEqual(sourceReferences(chinese!.content));
      expect(english.sources?.map(({ id, url }) => ({ id, url }))).toEqual(chinese!.sources?.map(({ id, url }) => ({ id, url })));
    }
  });
});
