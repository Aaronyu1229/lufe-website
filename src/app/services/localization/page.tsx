import type { Metadata } from "next";
import { StagePage } from "@/components/services/StagePage";
import { STAGES } from "@/data/services";

export const metadata: Metadata = {
  title: "海外落地 | 鹿飛 LUFÉ",
  description:
    "不只是賣出去，還要站得穩。持續性的在地營運支援，從 SOP 到數據儀表板。",
};

export default function LocalizationPage() {
  return <StagePage stage={STAGES.localization} />;
}
