import type { Metadata } from "next";
import { ChapterPage } from "@/components/services/ChapterPage";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/StructuredData";
import { CHAPTERS } from "@/data/chapters";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/services/product-testing",
  title: "品測｜先讓馬尼拉的媽媽拿起來看看",
  description: "你在台灣問了一百個人，還是不知道馬尼拉的媽媽會不會掏錢。品測就是把這個問題，拿去問她本人。",
});

export default function ProductTestingPage() {
  return <>
    <BreadcrumbJsonLd items={[{ name: "首頁", path: "/" }, { name: "服務", path: "/services" }, { name: CHAPTERS.m1.label, path: CHAPTERS.m1.path }]} />
    <FaqJsonLd items={CHAPTERS.m1.faqs} />
    <ChapterPage chapter={CHAPTERS.m1} />
  </>;
}
