import type { Metadata } from "next";
import { ChapterPage } from "@/components/services/ChapterPage";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/StructuredData";
import { CHAPTERS } from "@/data/chapters";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/services/product-testing",
  title: "市場探查｜先驗證市場，再決定投入",
  description: "在台灣問了一百個人，還是不知道當地消費者會不會買單。市場探查把產品帶到當地，直接取得市場反應。",
});

export default function ProductTestingPage() {
  return <>
    <BreadcrumbJsonLd items={[{ name: "首頁", path: "/" }, { name: "服務", path: "/services" }, { name: CHAPTERS.m1.label, path: CHAPTERS.m1.path }]} />
    <FaqJsonLd items={CHAPTERS.m1.faqs} />
    <ChapterPage chapter={CHAPTERS.m1} />
  </>;
}
