import type { MetadataRoute } from "next";
import { CASES } from "@/data/cases";
import { EN_PUBLIC, hasEnglishRoute } from "@/i18n/config";
import { localizedHref } from "@/i18n/locale";
import { getPublishedEnglishArticles, hasEnglishArticle } from "@/lib/articles/english";
import { listPublishedArticles } from "@/lib/articles/repository";
import { getPublishedArticles } from "@/lib/articles/published";
import { SITE_URL } from "@/lib/site";

export const revalidate = 300;

type ChangeFreq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

type RouteSpec = {
  readonly path: string;
  readonly priority: number;
  readonly changeFrequency: ChangeFreq;
};

const STATIC_ROUTES: readonly RouteSpec[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/product-testing", priority: 0.75, changeFrequency: "monthly" },
  { path: "/services/consignment", priority: 0.75, changeFrequency: "monthly" },
  { path: "/services/localization", priority: 0.75, changeFrequency: "monthly" },
  { path: "/services/call-center", priority: 0.75, changeFrequency: "monthly" },
  { path: "/services/north-america", priority: 0.75, changeFrequency: "monthly" },
  { path: "/services/optimize", priority: 0.85, changeFrequency: "monthly" },
  { path: "/services/methodology", priority: 0.8, changeFrequency: "monthly" },
  { path: "/cases", priority: 0.9, changeFrequency: "weekly" },
  { path: "/insights", priority: 0.8, changeFrequency: "weekly" },
  { path: "/assess", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about/aaron-yu", priority: 0.65, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  { path: "/resources", priority: 0.7, changeFrequency: "monthly" },
  { path: "/resources/subsidies", priority: 0.7, changeFrequency: "monthly" },
];

function siteUrl(path: string): string {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

function languageAlternates(path: string) {
  const zhUrl = siteUrl(path);
  return {
    languages: {
      "zh-Hant": zhUrl,
      en: siteUrl(localizedHref("en", path)),
      "x-default": zhUrl,
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => {
    const path = route.path || "/";
    return {
      url: siteUrl(path),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      ...(EN_PUBLIC && hasEnglishRoute(path) ? { alternates: languageAlternates(path) } : {}),
    };
  });

  const englishStaticEntries: MetadataRoute.Sitemap = EN_PUBLIC
    ? STATIC_ROUTES
      .map((route) => ({ ...route, path: route.path || "/" }))
      .filter((route) => hasEnglishRoute(route.path))
      .map((route) => ({
        url: siteUrl(localizedHref("en", route.path)),
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: languageAlternates(route.path),
      }))
    : [];

  const caseEntries: MetadataRoute.Sitemap = CASES.map((caseItem) => {
    const path = `/cases/${caseItem.slug}`;
    return {
      url: siteUrl(path),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      ...(EN_PUBLIC ? { alternates: languageAlternates(path) } : {}),
    };
  });

  const englishCaseEntries: MetadataRoute.Sitemap = EN_PUBLIC
    ? CASES.map((caseItem) => {
      const path = `/cases/${caseItem.slug}`;
      return {
        url: siteUrl(localizedHref("en", path)),
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: languageAlternates(path),
      };
    })
    : [];

  const articleEntries: MetadataRoute.Sitemap = getPublishedArticles(now)
    .map((article) => {
      const path = `/insights/${article.slug}`;
      return {
        url: siteUrl(path),
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.65,
        ...(EN_PUBLIC && hasEnglishArticle(article.slug) ? { alternates: languageAlternates(path) } : {}),
      };
    });

  const englishArticleEntries: MetadataRoute.Sitemap = EN_PUBLIC
    ? getPublishedEnglishArticles(now).map((article) => {
      const path = `/insights/${article.slug}`;
      return {
        url: siteUrl(localizedHref("en", path)),
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.65,
        alternates: languageAlternates(path),
      };
    })
    : [];

  let databaseEntries: MetadataRoute.Sitemap = [];
  try {
    const databaseArticles = await listPublishedArticles();
    databaseEntries = databaseArticles
      .map((article) => ({
      url: siteUrl(`/insights/${article.slug}`),
      lastModified: article.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.65,
      }));
  } catch {
    databaseEntries = [];
  }

  return [
    ...staticEntries,
    ...englishStaticEntries,
    ...caseEntries,
    ...englishCaseEntries,
    ...articleEntries,
    ...englishArticleEntries,
    ...databaseEntries,
  ];
}
