import { describe, expect, it, vi } from "vitest";

import { articles } from "@/data/articles";

const englishArticle = {
  ...articles[0],
  title: "An English insight article",
  summary: "An English article summary.",
  readTime: "6 min read",
  content: ["## An English section\n\nEnglish article content."],
};

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("not found");
  },
}));

vi.mock("@/lib/articles/english", () => ({
  getEnglishArticle: (slug: string) => slug === englishArticle.slug ? englishArticle : undefined,
  getPublishedEnglishArticles: () => [englishArticle],
  hasEnglishArticle: (slug: string) => slug === englishArticle.slug,
}));

import EnglishArticlePage, {
  generateMetadata,
  generateStaticParams,
} from "@/app/en/insights/[slug]/page";

describe("English insights routes", () => {
  it("generates only published English article paths", async () => {
    await expect(generateStaticParams()).resolves.toEqual([{ slug: englishArticle.slug }]);
  });

  it("uses English metadata and canonical paths for English articles", async () => {
    await expect(generateMetadata({ params: Promise.resolve({ slug: englishArticle.slug }) })).resolves.toMatchObject({
      title: englishArticle.title,
      alternates: {
        canonical: `https://lufe.world/en/insights/${englishArticle.slug}`,
        languages: {
          "zh-Hant": `/insights/${englishArticle.slug}`,
          en: `/en/insights/${englishArticle.slug}`,
          "x-default": `/insights/${englishArticle.slug}`,
        },
      },
    });
    await expect(generateMetadata({ params: Promise.resolve({ slug: "no-english-version" }) })).resolves.toEqual({ title: "Article not found" });
  });

  it("returns not found when the article has no English version", async () => {
    await expect(EnglishArticlePage({ params: Promise.resolve({ slug: "no-english-version" }) })).rejects.toThrow("not found");
  });
});
