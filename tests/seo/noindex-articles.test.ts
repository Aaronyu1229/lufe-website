import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/articles/repository", () => ({
  getPublishedArticleBySlug: async () => null,
  listPublishedArticles: async () => [],
}));

import { generateMetadata as generateEnglishArticleMetadata } from "@/app/en/insights/[slug]/page";
import { generateMetadata as generateArticleMetadata } from "@/app/insights/[slug]/page";
import sitemap from "@/app/sitemap";
import { articles } from "@/data/articles";
import { EN_ARTICLES } from "@/data/en/articles";
import { isNoindexArticle, NOINDEX_ARTICLE_SLUGS } from "@/data/seo-noindex";

const NOINDEX_SLUGS = [
  "tradepilot-tariff-tutorial",
  "us-fda-registration-guide",
  "why-philippines-first",
  "philippines-cpr-transfer-change-importer",
  "amazon-us-three-decisions",
  "market-entry-modes-compared",
  "first-time-export-checklist",
  "philippines-food-cosmetic-label-checklist",
  "us-fda-food-import-fsvp-prior-notice",
  "philippines-market-assessment-deck",
  "philippines-registration-waiting-period",
  "distribution-agreement-clause-checklist",
  "taiwan-products-philippines-barriers",
  "how-to-read-market-research-report",
  "first-year-overseas-small-budget",
  "philippines-ads-not-enough",
  "overseas-market-exit-checklist",
] as const;

const INDEXABLE_SLUGS = [
  "agent-vs-distributor-exclusive",
  "landed-cost-before-export",
  "fob-cif-ddp-explained",
  "manila-beverage-first-store-90-days",
  "taiwan-food-export-philippines-steps",
  "go-no-go-framework",
  "philippines-fda-lto-cpr-cpn",
  "philippines-ecommerce-first-year",
  "overseas-exhibition-subsidy-115-upgrade",
  "product-testing-best-practices",
] as const;

describe("noindex articles", () => {
  it("has exactly the requested static articles in both language datasets", () => {
    expect([...NOINDEX_ARTICLE_SLUGS]).toEqual(NOINDEX_SLUGS);
    expect(NOINDEX_ARTICLE_SLUGS.size).toBe(17);

    for (const slug of NOINDEX_SLUGS) {
      expect(articles.some((article) => article.slug === slug)).toBe(true);
      expect(EN_ARTICLES[slug]).toBeDefined();
      expect(isNoindexArticle(slug)).toBe(true);
    }
  });

  it("excludes noindex articles while retaining the requested articles in both sitemaps", async () => {
    const urls = (await sitemap()).map((entry) => entry.url);

    for (const slug of NOINDEX_SLUGS) {
      expect(urls).not.toContain(`https://lufe.world/insights/${slug}`);
      expect(urls).not.toContain(`https://lufe.world/en/insights/${slug}`);
    }

    for (const slug of INDEXABLE_SLUGS) {
      expect(urls).toContain(`https://lufe.world/insights/${slug}`);
      expect(urls).toContain(`https://lufe.world/en/insights/${slug}`);
    }
  });

  it("returns noindex, follow metadata for noindex articles in both languages", async () => {
    const slug = "tradepilot-tariff-tutorial";
    const params = { params: Promise.resolve({ slug }) };
    const [zhMetadata, enMetadata] = await Promise.all([
      generateArticleMetadata(params),
      generateEnglishArticleMetadata(params),
    ]);

    expect(zhMetadata.robots).toEqual({ index: false, follow: true });
    expect(enMetadata.robots).toEqual({ index: false, follow: true });
  });

  it("does not set index false for a retained article", async () => {
    const slug = "agent-vs-distributor-exclusive";
    const params = { params: Promise.resolve({ slug }) };
    const [zhMetadata, enMetadata] = await Promise.all([
      generateArticleMetadata(params),
      generateEnglishArticleMetadata(params),
    ]);

    expect((zhMetadata.robots as { index?: boolean } | undefined)?.index).not.toBe(false);
    expect((enMetadata.robots as { index?: boolean } | undefined)?.index).not.toBe(false);
  });
});
