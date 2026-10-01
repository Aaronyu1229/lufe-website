import type { MetadataRoute } from "next";
import { CASES } from "@/data/cases";
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
  { path: "/resources/subsidies", priority: 0.7, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const caseEntries: MetadataRoute.Sitemap = CASES.map((c) => ({
    url: `${SITE_URL}/cases/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const articleEntries: MetadataRoute.Sitemap = getPublishedArticles()
    .map((a) => ({
    url: `${SITE_URL}/insights/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.65,
    }));

  let databaseEntries: MetadataRoute.Sitemap = [];
  try {
    const databaseArticles = await listPublishedArticles();
    databaseEntries = databaseArticles
      .map((article) => ({
      url: `${SITE_URL}/insights/${article.slug}`,
      lastModified: article.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.65,
      }));
  } catch {
    databaseEntries = [];
  }

  return [
    ...staticEntries,
    ...caseEntries,
    ...articleEntries,
    ...databaseEntries,
  ];
}
