/**
 * Canonical site URL used across metadata, sitemap, robots, OG tags.
 * Override via NEXT_PUBLIC_SITE_URL at build time for preview deployments.
 */
export const SITE_URL: string =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://lufe-website.vercel.app";

export const SITE_NAME = "鹿飛 LUFÉ" as const;

export const SITE_DESCRIPTION =
  "從市場驗證到落地營運，我們陪你走完全程。平均 6-9 個月讓你的產品站上海外貨架。" as const;

export const SITE_LOCALE = "zh_TW" as const;
