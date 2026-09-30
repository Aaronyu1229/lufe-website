import type { Metadata } from "next";

import { ServicesPage } from "@/components/services/ServicesPage";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/lib/seo";
import { SERVICE_FAQS } from "@/data/serviceFaqs";

export const metadata: Metadata = createPageMetadata({
  path: "/services",
  title: "服務｜一家品牌在馬尼拉的第一年",
  description: "品測、寄賣、公司落地、海外客服——同一家公司在不同月份會遇到的四件事，我們做成四個方案。",
});

export default function Services() {
  return <>
    <BreadcrumbJsonLd items={[{ name: "首頁", path: "/" }, { name: "服務", path: "/services" }]} />
    <FaqJsonLd items={SERVICE_FAQS.map(({ q, a }) => ({ question: q, answer: a }))} />
    <ServicesPage />
  </>;
}
