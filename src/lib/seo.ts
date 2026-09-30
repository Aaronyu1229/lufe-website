import type { Metadata } from "next";

import { SITE_NAME, SITE_URL } from "./site";

type PageMetadataOptions = {
  readonly path: string;
  readonly title?: string;
  readonly description?: string;
};

type ArticleMetadataOptions = {
  readonly path: string;
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly publishedTime: string;
  readonly modifiedTime: string;
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

export function createPageMetadata({ path, title, description }: PageMetadataOptions): Metadata {
  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    alternates: { canonical: path },
  };
}

export function createArticleMetadata({
  path,
  title,
  description,
  image,
  publishedTime,
  modifiedTime,
  canonical = toAbsoluteUrl(path),
}: ArticleMetadataOptions): Metadata {
  return {
    title,
    description,
    authors: [{ name: "Aaron Yu" }],
    alternates: { canonical },
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
