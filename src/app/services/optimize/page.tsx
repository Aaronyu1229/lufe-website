import type { Metadata } from "next";
import { OptimizePageContent } from "@/components/services/OptimizePage";
import { RelatedReading } from "@/components/services/RelatedReading";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/StructuredData";
import { OPTIMIZE_FAQS } from "@/components/services/OptimizePage";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/services/optimize",
  title: "進階優化方案",
  description: "已經在海外？我們幫你診斷效率瓶頸、降低物流成本、優化通路結構、重整營運流程。",
});

export default async function OptimizeRoute() {
  const relatedReading = await RelatedReading({ chapter: "after" });
  return <>
    <BreadcrumbJsonLd items={[{ name: "首頁", path: "/" }, { name: "服務", path: "/services" }, { name: "運營優化", path: "/services/optimize" }]} />
    <FaqJsonLd items={OPTIMIZE_FAQS.map(([question, answer]) => ({ question, answer }))} />
    <OptimizePageContent relatedReading={relatedReading} />
  </>;
}
