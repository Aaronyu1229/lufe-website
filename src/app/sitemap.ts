import type { MetadataRoute } from "next";
import { CASES } from "@/data/cases";
import { articles } from "@/data/articles";
import { STAGE_ORDER } from "@/data/services";
import { SITE_URL } from "@/lib/site";

type ChangeFreq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

type RouteSpec = {
  readonly path: string;
  readonly priority: number;
  readonly changeFrequency: ChangeFreq;
};

const STATIC_ROUTES: readonly RouteSpec[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/optimize", priority: 0.85, changeFrequency: "monthly" },
  { path: "/services/methodology", priority: 0.8, changeFrequency: "monthly" },
  { path: "/cases", priority: 0.9, changeFrequency: "weekly" },
  { path: "/insights", priority: 0.8, changeFrequency: "weekly" },
  { path: "/assess", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  { path: "/resources/subsidies", priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const stageEntries: MetadataRoute.Sitemap = STAGE_ORDER.map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const caseEntries: MetadataRoute.Sitemap = CASES.map((c) => ({
    url: `${SITE_URL}/cases/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}/insights/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [
    ...staticEntries,
    ...stageEntries,
    ...caseEntries,
    ...articleEntries,
  ];
}
