import type { Metadata } from "next";
import { StagePage } from "@/components/services/StagePage";
import { STAGES } from "@/data/services";

export const metadata: Metadata = {
  title: "產品測試 | 鹿飛 LUFÉ",
  description:
    "小批量投放，用真實數據取代主觀猜測。4–6 週內讓市場告訴你產品該怎麼調整。",
};

export default function ProductTestingPage() {
  return <StagePage stage={STAGES["product-testing"]} />;
}
