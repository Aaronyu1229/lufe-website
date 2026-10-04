import type { Metadata } from "next";

import { EN_PUBLIC, hasEnglishRoute } from "@/i18n/config";
import { localizedHref, type Locale } from "@/i18n/locale";
import { hasEnglishArticle } from "@/lib/articles/english";

import { SITE_NAME, SITE_URL } from "./site";

type PageMetadataOptions = {
  /** Always the Chinese path; English canonicals are derived from it. */
  readonly path: string;
  readonly title?: string;
  readonly description?: string;
  readonly locale?: Locale;
};

type ArticleMetadataOptions = {
  /** Always the Chinese path; English canonicals are derived from it. */
  readonly path: string;
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly publishedTime: string;
  readonly modifiedTime: string;
  readonly locale?: Locale;
  readonly canonical?: string;
};

export function toAbsoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export function toIsoDate(value: string | Date): string {
  return typeof value === "string" ? `${value}T00:00:00+08:00` : value.toISOString();
}

export function withoutSiteName(title: string): string {
  const withoutName = title.replaceAll(SITE_NAME, "").replace(/\s*[|—]\s*$/, "").trim();
  return withoutName || title;
}

export function createPageMetadata({ path, title, description, locale = "zh" }: PageMetadataOptions): Metadata {
  const canonical = localizedHref(locale, path);
  const languages = EN_PUBLIC && hasEnglishRoute(path)
    ? { languages: { "zh-Hant": path, en: localizedHref("en", path), "x-default": path } }
    : {};
  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    alternates: { canonical, ...languages },
  };
}

export function createArticleMetadata({
  path,
  title,
  description,
  image,
  publishedTime,
  modifiedTime,
  locale = "zh",
  canonical = toAbsoluteUrl(localizedHref(locale, path)),
}: ArticleMetadataOptions): Metadata {
  const slug = path.startsWith("/insights/") ? path.slice("/insights/".length) : "";
  const languages = EN_PUBLIC && slug && hasEnglishArticle(slug)
    ? { languages: { "zh-Hant": path, en: localizedHref("en", path), "x-default": path } }
    : {};

  return {
    title,
    description,
    authors: [{ name: "Aaron Yu" }],
    alternates: { canonical, ...languages },
    openGraph: {
      type: "article",
      url: canonical,
      title,
      description,
      images: [toAbsoluteUrl(image)],
      publishedTime,
      modifiedTime,
      authors: ["Aaron Yu"],
    },
  };
}
