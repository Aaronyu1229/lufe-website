import type { Metadata } from "next";

import { ChapterPage } from "@/components/services/ChapterPage";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { CHAPTERS } from "@/data/chapters";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/services/north-america",
  title: "北美通路｜產品成熟了，要進 Costco、Walmart、Amazon",
  description: "參過展、發過樣品、沒有下文——很多品牌的北美故事停在這裡。",
});

export default function NorthAmericaPage() {
  return <>
    <BreadcrumbJsonLd items={[{ name: "首頁", path: "/" }, { name: "服務", path: "/services" }, { name: CHAPTERS.na.label, path: CHAPTERS.na.path }]} />
    <ChapterPage chapter={CHAPTERS.na} />
  </>;
}
