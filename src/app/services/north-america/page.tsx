import type { Metadata } from "next";

import { ChapterPage } from "@/components/services/ChapterPage";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/StructuredData";
import { CHAPTERS } from "@/data/chapters";
import { createPageMetadata } from "@/lib/seo";
import { SITE_LOCALE, SITE_NAME } from "@/lib/site";

const TITLE = "北美通路｜台灣品牌進北美零售通路";
const DESCRIPTION = "參過展、寄過樣品、沒有下文——很多品牌的北美故事停在這裡。北美通路由北美團隊在當地執行：選品、送評、展覽、上桌談判；鹿飛是你在台灣的窗口。";

export const metadata: Metadata = {
  ...createPageMetadata({ path: "/services/north-america", title: TITLE, description: DESCRIPTION }),
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    siteName: SITE_NAME,
    url: "/services/north-america",
    title: `${TITLE} | ${SITE_NAME}`,
    description: DESCRIPTION,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: `${SITE_NAME} — 企業出海的導航系統` }],
  },
  twitter: { card: "summary_large_image", title: `${TITLE} | ${SITE_NAME}`, description: DESCRIPTION, images: ["/og-image.jpg"] },
};

export default function NorthAmericaPage() {
  return <>
    <BreadcrumbJsonLd items={[{ name: "首頁", path: "/" }, { name: "服務", path: "/services" }, { name: CHAPTERS.na.label, path: CHAPTERS.na.path }]} />
    <FaqJsonLd items={CHAPTERS.na.faqs} />
    <ChapterPage chapter={CHAPTERS.na} />
  </>;
}
