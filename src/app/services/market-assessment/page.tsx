import type { Metadata } from "next";
import { StagePage } from "@/components/services/StagePage";
import { STAGES } from "@/data/services";

export const metadata: Metadata = {
  title: "市場評估 | 鹿飛 LUFÉ",
  description:
    "在你花大錢之前，先花小錢搞清楚。2–4 週的完整市場評估，給你一份清楚的 Go / No-Go 決策報告。",
};

export default function MarketAssessmentPage() {
  return <StagePage stage={STAGES["market-assessment"]} />;
}
