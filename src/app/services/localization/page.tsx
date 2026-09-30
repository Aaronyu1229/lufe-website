import type { Metadata } from "next";
import { ChapterPage } from "@/components/services/ChapterPage";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/StructuredData";
import { CHAPTERS } from "@/data/chapters";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/services/localization",
  title: "公司落地｜開始想要在當地有自己的人",
  description: "賣得動了。你開始想：要不要開一間自己的公司、找第一個員工、把證掛到自己名下。然後你發現，每一件事都需要有人在當地。",
});

export default function LocalizationPage() {
  return <>
    <BreadcrumbJsonLd items={[{ name: "首頁", path: "/" }, { name: "服務", path: "/services" }, { name: CHAPTERS.m9.label, path: CHAPTERS.m9.path }]} />
    <FaqJsonLd items={CHAPTERS.m9.faqs} />
    <ChapterPage chapter={CHAPTERS.m9} />
  </>;
}
