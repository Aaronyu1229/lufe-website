/**
 * Canonical site URL used across metadata, sitemap, robots, OG tags.
 * Override via NEXT_PUBLIC_SITE_URL at build time for preview deployments.
 */
export const SITE_URL: string =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://lufe-website.vercel.app";

export const SITE_NAME = "鹿飛 LUFÉ" as const;

export const SITE_DESCRIPTION =
  "協助台灣企業在北美與東南亞落地：產品適配性、通路銷售力、團隊體質三個支柱，一條線陪你走完。底層還有躍馬國際 42 年的國際物流實戰。" as const;

export const SITE_LOCALE = "zh_TW" as const;
