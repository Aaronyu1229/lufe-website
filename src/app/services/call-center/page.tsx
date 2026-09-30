import type { Metadata } from "next";

import { ChapterPage } from "@/components/services/ChapterPage";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/StructuredData";
import { CHAPTERS } from "@/data/chapters";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/services/call-center",
  title: "海外客服｜星期五晚上十一點的那封信",
  description: "一封英文客訴信。退貨、換貨、問哪裡有賣。你不會想為了這件事養一組人，但也不能不回。",
});

export default function CallCenterPage() {
  return <>
    <BreadcrumbJsonLd items={[{ name: "首頁", path: "/" }, { name: "服務", path: "/services" }, { name: CHAPTERS.after.label, path: CHAPTERS.after.path }]} />
    <FaqJsonLd items={CHAPTERS.after.faqs} />
    <ChapterPage chapter={CHAPTERS.after} />
  </>;
}
