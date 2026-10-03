import type { Metadata } from "next";
import { OptimizePageContent } from "@/components/services/OptimizePage";
import { RelatedReading } from "@/components/services/RelatedReading";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/StructuredData";
import { OPTIMIZE_FAQS } from "@/components/services/OptimizePage";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createPageMetadata({
    path: "/services/optimize",
    description: "產品已經在海外賣，但利潤被運費吃掉、事情對不上、決策像在猜。創辦人來自躍馬企業，背後是 42 年的國際物流；先用 30 分鐘，告訴你卡在哪一段。",
  }),
  title: { absolute: "運營優化｜已經在海外的品牌｜鹿飛 LUFÉ" },
};

export default async function OptimizeRoute() {
  const relatedReading = await RelatedReading({ chapter: "after" });
  return <>
    <BreadcrumbJsonLd items={[{ name: "首頁", path: "/" }, { name: "服務", path: "/services" }, { name: "運營優化", path: "/services/optimize" }]} />
    <FaqJsonLd items={OPTIMIZE_FAQS.map(([question, answer]) => ({ question, answer }))} />
    <OptimizePageContent relatedReading={relatedReading} />
  </>;
}
