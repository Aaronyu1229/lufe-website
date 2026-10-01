import type { Metadata } from "next";
import { MethodologyPage } from "@/components/services/MethodologyPage";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/services/methodology",
  title: "小步出海法 — 鹿飛方法論｜市場不會因為你準備好了就要你",
  description: "鹿飛的出海方法論：先用一兩萬問菲律賓市場，再決定投多少。兩個真實研究例子、五個評估問題、打兩次分、60 分不接的規矩。",
});

export default function MethodologyRoute() {
  return <>
    <BreadcrumbJsonLd items={[{ name: "首頁", path: "/" }, { name: "服務", path: "/services" }, { name: "鹿飛方法論", path: "/services/methodology" }]} />
    <MethodologyPage />
  </>;
}
