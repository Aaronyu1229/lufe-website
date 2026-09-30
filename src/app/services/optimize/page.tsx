import type { Metadata } from "next";
import { OptimizePageContent } from "@/components/services/OptimizePage";
import { RelatedReading } from "@/components/services/RelatedReading";

export const metadata: Metadata = {
  title: "進階優化方案 | 鹿飛 LUFÉ",
  description:
    "已經在海外？我們幫你診斷效率瓶頸、降低物流成本、優化通路結構、重整營運流程。",
};

export default async function OptimizeRoute() {
  const relatedReading = await RelatedReading({ chapter: "after" });
  return <OptimizePageContent relatedReading={relatedReading} />;
}
