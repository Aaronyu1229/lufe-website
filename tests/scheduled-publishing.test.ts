import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NOT_FOUND");
  },
  usePathname: () => "/",
}));

vi.mock("@/lib/articles/repository", () => ({
  getPublishedArticleBySlug: async () => null,
  listPublishedArticles: async () => [],
}));

import Home from "@/app/page";
import Insights from "@/app/insights/page";
import ArticlePage, { generateStaticParams } from "@/app/insights/[slug]/page";
import sitemap from "@/app/sitemap";
import { AaronAuthorPage } from "@/components/about/AaronAuthorPage";
import { Navbar } from "@/components/Navbar";
import { RelatedReading } from "@/components/services/RelatedReading";
import { articles, type Article } from "@/data/articles";
import { CHAPTER_ARTICLES } from "@/data/chapters";
import { toInsightCard } from "@/lib/articles/presentation";
import { getPublishedArticles, isPublished } from "@/lib/articles/published";

const scheduledSlug = "scheduled-publishing-test";
const scheduledTitle = "排程發布測試文章";
const publishAt = "2026-10-03T09:00:00+08:00";
const beforePublication = new Date("2026-10-02T12:00:00+08:00");
const afterPublication = new Date("2026-10-03T12:00:00+08:00");
const scheduledArticle: Article = {
  ...articles[0],
  slug: scheduledSlug,
  title: scheduledTitle,
  summary: "這篇文章用來驗證定時發布。",
  date: "2026-10-03",
  publishAt,
};
const mutableArticles = articles as unknown as Article[];
const mutableChapterArticles = CHAPTER_ARTICLES.m1 as unknown as string[];

function renderNavbar(now: Date): string {
  const publishedArticles = getPublishedArticles(now);
  const latestArticle = publishedArticles[0] ? toInsightCard(publishedArticles[0]) : undefined;
  return renderToStaticMarkup(createElement(Navbar, {
    latestArticlePayload: latestArticle ? Buffer.from(JSON.stringify(latestArticle), "utf8").toString("base64") : undefined,
    publishedArticleSlugs: publishedArticles.map((article) => article.slug),
  }));
}

function removeScheduledArticle() {
  const articleIndex = mutableArticles.findIndex((article) => article.slug === scheduledSlug);
  if (articleIndex >= 0) mutableArticles.splice(articleIndex, 1);

  const chapterIndex = mutableChapterArticles.indexOf(scheduledSlug);
  if (chapterIndex >= 0) mutableChapterArticles.splice(chapterIndex, 1);
}

beforeEach(() => {
  vi.useFakeTimers();
  mutableArticles.unshift(scheduledArticle);
  mutableChapterArticles.unshift(scheduledSlug);
});

afterEach(() => {
  removeScheduledArticle();
  vi.useRealTimers();
});

describe("scheduled publishing", () => {
  it("keeps a future article out of every public surface and returns a 404", async () => {
    vi.setSystemTime(beforePublication);

    expect(isPublished(scheduledArticle, beforePublication)).toBe(false);
    expect(getPublishedArticles(beforePublication)).not.toContainEqual(scheduledArticle);
    await expect(generateStaticParams()).resolves.not.toContainEqual({ slug: scheduledSlug });
    await expect(ArticlePage({ params: Promise.resolve({ slug: scheduledSlug }) })).rejects.toThrow("NOT_FOUND");

    const [insights, home, relatedReading, sitemapEntries] = await Promise.all([
      Insights(),
      Home(),
      RelatedReading({ chapter: "m1" }),
      sitemap(),
    ]);

    expect(renderToStaticMarkup(insights)).not.toContain(scheduledTitle);
    expect(renderToStaticMarkup(home)).not.toContain(scheduledTitle);
    expect(renderToStaticMarkup(createElement(AaronAuthorPage))).not.toContain(scheduledTitle);
    expect(renderToStaticMarkup(relatedReading)).not.toContain(scheduledTitle);
    expect(renderNavbar(beforePublication)).not.toContain(scheduledTitle);
    expect(sitemapEntries).not.toEqual(expect.arrayContaining([
      expect.objectContaining({ url: `https://lufe.world/insights/${scheduledSlug}` }),
    ]));
  });

  it("publishes the article across public surfaces after publishAt", async () => {
    vi.setSystemTime(afterPublication);

    expect(isPublished(scheduledArticle, afterPublication)).toBe(true);
    expect(getPublishedArticles(afterPublication)).toContainEqual(scheduledArticle);
    await expect(generateStaticParams()).resolves.toContainEqual({ slug: scheduledSlug });

    const articleMarkup = renderToStaticMarkup(await ArticlePage({ params: Promise.resolve({ slug: scheduledSlug }) }));
    expect(articleMarkup).toContain(scheduledTitle);
    expect(articleMarkup).toContain("發布：<time dateTime=\"2026-10-03\">2026-10-03</time>");
    expect(articleMarkup).toContain(`\"datePublished\":\"${publishAt}\"`);

    const [insights, home, relatedReading, sitemapEntries] = await Promise.all([
      Insights(),
      Home(),
      RelatedReading({ chapter: "m1" }),
      sitemap(),
    ]);

    expect(renderToStaticMarkup(insights)).toContain(scheduledTitle);
    expect(renderToStaticMarkup(home)).toContain(scheduledTitle);
    expect(renderToStaticMarkup(createElement(AaronAuthorPage))).toContain(scheduledTitle);
    expect(renderToStaticMarkup(relatedReading)).toContain(scheduledTitle);
    expect(renderNavbar(afterPublication)).toContain(scheduledTitle);
    expect(sitemapEntries).toEqual(expect.arrayContaining([
      expect.objectContaining({ url: `https://lufe.world/insights/${scheduledSlug}` }),
    ]));
  });
});
