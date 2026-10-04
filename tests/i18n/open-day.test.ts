import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/articles/repository", () => ({
  getPublishedArticleBySlug: async () => null,
  listPublishedArticles: async () => [],
}));

import sitemap from "@/app/sitemap";
import { generateMetadata as generateZhArticleMetadata } from "@/app/insights/[slug]/page";
import { generateMetadata as generateEnArticleMetadata } from "@/app/en/insights/[slug]/page";
import { generateMetadata as generateZhCaseMetadata } from "@/app/cases/[slug]/page";
import { generateMetadata as generateEnCaseMetadata } from "@/app/en/cases/[slug]/page";
import { ArticleJsonLd, SiteStructuredData } from "@/components/seo/StructuredData";
import { articles, type Article } from "@/data/articles";
import { CASES } from "@/data/cases";
import { EN_ARTICLES } from "@/data/en/articles";
import { EN_ROUTES } from "@/i18n/config";
import { localizedHref } from "@/i18n/locale";
import { getPublishedEnglishArticles, hasEnglishArticle } from "@/lib/articles/english";
import { EN_SITE_DESCRIPTION } from "@/lib/english-site";
import { createPageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const mutableArticles = articles as unknown as Article[];
const expectedLanguages = (path: string) => ({
  "zh-Hant": path,
  en: localizedHref("en", path),
  "x-default": path,
});

function sitemapLanguages(path: string) {
  const zhUrl = `${SITE_URL}${path === "/" ? "" : path}`;
  return {
    "zh-Hant": zhUrl,
    en: `${SITE_URL}${localizedHref("en", path)}`,
    "x-default": zhUrl,
  };
}

afterEach(() => {
  const index = mutableArticles.findIndex((article) => article.slug.startsWith("open-day-without-english-"));
  if (index >= 0) mutableArticles.splice(index, 1);
});

describe("open-day hreflang", () => {
  it("emits the same reciprocal set from both versions of a static page", () => {
    const zh = createPageMetadata({ path: "/services", title: "服務" });
    const en = createPageMetadata({ path: "/services", locale: "en", title: "Services" });

    expect(zh.alternates).toMatchObject({ canonical: "/services", languages: expectedLanguages("/services") });
    expect(en.alternates).toMatchObject({ canonical: "/en/services", languages: expectedLanguages("/services") });
  });

  it("emits the same reciprocal set from both versions of every case", async () => {
    for (const caseItem of CASES) {
      const params = { params: Promise.resolve({ slug: caseItem.slug }) };
      const [zh, en] = await Promise.all([generateZhCaseMetadata(params), generateEnCaseMetadata(params)]);
      const path = `/cases/${caseItem.slug}`;

      expect(zh.alternates).toMatchObject({ canonical: path, languages: expectedLanguages(path) });
      expect(en.alternates).toMatchObject({ canonical: `/en${path}`, languages: expectedLanguages(path) });
    }
  });

  it("emits the same reciprocal set for a published English article", async () => {
    const article = getPublishedEnglishArticles()[0]!;
    const params = { params: Promise.resolve({ slug: article.slug }) };
    const [zh, en] = await Promise.all([generateZhArticleMetadata(params), generateEnArticleMetadata(params)]);
    const path = `/insights/${article.slug}`;

    expect(zh.alternates).toMatchObject({ canonical: `${SITE_URL}${path}`, languages: expectedLanguages(path) });
    expect(en.alternates).toMatchObject({ canonical: `${SITE_URL}/en${path}`, languages: expectedLanguages(path) });
  });

  it("does not emit hreflang for a Chinese article without English data", async () => {
    const source = articles[0]!;
    const missingSlug = `open-day-without-english-${source.slug}`;
    mutableArticles.push({ ...source, slug: missingSlug });
    expect(hasEnglishArticle(missingSlug)).toBe(false);

    const metadata = await generateZhArticleMetadata({ params: Promise.resolve({ slug: missingSlug }) });
    expect(metadata.alternates).toEqual({ canonical: `${SITE_URL}/insights/${missingSlug}` });
  });
});

describe("open-day sitemap", () => {
  it("includes every public English twin with reciprocal alternates and excludes scheduled articles", async () => {
    const entries = await sitemap();
    // Noindex result pages (answers-dependent) are deliberately left out of the sitemap.
    const staticRoutes = EN_ROUTES.filter((route) => !route.includes("[") && route !== "/assess/result");

    for (const path of staticRoutes) {
      const englishPath = localizedHref("en", path);
      expect(entries).toContainEqual(expect.objectContaining({
        url: `${SITE_URL}${englishPath}`,
        alternates: { languages: sitemapLanguages(path) },
      }));
    }

    for (const caseItem of CASES) {
      const path = `/cases/${caseItem.slug}`;
      expect(entries).toContainEqual(expect.objectContaining({
        url: `${SITE_URL}/en${path}`,
        alternates: { languages: sitemapLanguages(path) },
      }));
    }

    for (const article of getPublishedEnglishArticles()) {
      const path = `/insights/${article.slug}`;
      expect(entries).toContainEqual(expect.objectContaining({
        url: `${SITE_URL}/en${path}`,
        alternates: { languages: sitemapLanguages(path) },
      }));
    }

    for (const article of articles.filter((candidate) => candidate.publishAt && new Date(candidate.publishAt) > new Date())) {
      expect(entries).not.toContainEqual(expect.objectContaining({ url: `${SITE_URL}/insights/${article.slug}` }));
      expect(entries).not.toContainEqual(expect.objectContaining({ url: `${SITE_URL}/en/insights/${article.slug}` }));
    }
  });
});

describe("open-day structured data", () => {
  it("uses the English organization, website, and article JSON-LD on English pages", () => {
    const siteMarkup = renderToStaticMarkup(createElement(SiteStructuredData, { locale: "en" }));
    const siteData = JSON.parse(siteMarkup.match(/<script type="application\/ld\+json">([\s\S]+)<\/script>/)?.[1] ?? "{}") as {
      "@graph": Array<Record<string, unknown>>;
    };
    const organization = siteData["@graph"].find((node) => node["@type"] === "Organization");
    const website = siteData["@graph"].find((node) => node["@type"] === "WebSite");

    expect(organization).toMatchObject({ name: "LUFÉ", description: EN_SITE_DESCRIPTION, inLanguage: "en", url: "https://lufe.world/en" });
    expect(website).toMatchObject({ name: "LUFÉ", description: EN_SITE_DESCRIPTION, inLanguage: "en", url: "https://lufe.world/en" });

    const articleMarkup = renderToStaticMarkup(createElement(ArticleJsonLd, {
      headline: "English article",
      description: "English description.",
      image: "/og-image.jpg",
      datePublished: "2026-10-01T00:00:00+08:00",
      dateModified: "2026-10-01T00:00:00+08:00",
      canonical: "https://lufe.world/en/insights/english-article",
      locale: "en",
    }));
    const articleData = JSON.parse(articleMarkup.match(/<script type="application\/ld\+json">([\s\S]+)<\/script>/)?.[1] ?? "{}");
    expect(articleData.inLanguage).toBe("en");
  });
});

describe("open-day article data", () => {
  it("has English data for every published English sitemap article", () => {
    for (const article of getPublishedEnglishArticles()) {
      expect(EN_ARTICLES[article.slug]).toBeDefined();
    }
  });
});

describe("assess result pages stay out of the index", () => {
  it("omits /assess/result from the sitemap and marks the English result noindex", async () => {
    const { default: sitemap } = await import("@/app/sitemap");
    const urls = (await sitemap()).map((entry) => entry.url);
    expect(urls.some((url) => url.includes("/assess/result"))).toBe(false);
    const { metadata } = await import("@/app/en/assess/result/page");
    expect(metadata.robots).toEqual({ index: false, follow: true });
  });
});
