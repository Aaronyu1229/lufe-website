import type { Metadata } from "next";

import { ChapterPage } from "@/components/services/ChapterPage";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/StructuredData";
import { CHAPTERS } from "@/data/chapters";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/services/consignment",
  title: "寄賣｜上架了，讓人先用過再說",
  description: "報告說可以。接下來的問題是：證要多久、貨放哪、上了架誰來推。",
});

export default function ConsignmentPage() {
  return <>
    <BreadcrumbJsonLd items={[{ name: "首頁", path: "/" }, { name: "服務", path: "/services" }, { name: CHAPTERS.m3.label, path: CHAPTERS.m3.path }]} />
    <FaqJsonLd items={CHAPTERS.m3.faqs} />
    <ChapterPage chapter={CHAPTERS.m3} />
  </>;
}
