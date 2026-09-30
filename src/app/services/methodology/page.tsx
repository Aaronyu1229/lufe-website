import type { Metadata } from "next";
import { MethodologyPage } from "@/components/services/MethodologyPage";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/StructuredData";
import { METHODOLOGY_FAQS } from "@/components/services/MethodologyPage";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/services/methodology",
  title: "方法論",
  description: "鹿飛的 MBCPR 五維評分框架：Market / Barrier / Competition / Profitability / Regulatory。我們怎麼判斷一個跨境案子值不值得做。",
});

export default function MethodologyRoute() {
  return <>
    <BreadcrumbJsonLd items={[{ name: "首頁", path: "/" }, { name: "服務", path: "/services" }, { name: "方法論", path: "/services/methodology" }]} />
    <FaqJsonLd items={METHODOLOGY_FAQS.map(([question, answer]) => ({ question, answer }))} />
    <MethodologyPage />
  </>;
}
