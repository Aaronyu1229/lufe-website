import type { Metadata } from "next";
import { StagePage } from "@/components/services/StagePage";
import { STAGES } from "@/data/services";

export const metadata: Metadata = {
  title: "通路進入 | 鹿飛 LUFÉ",
  description:
    "從試水溫到正式上架。2–3 個月完成通路談判、合規認證、包裝在地化、首批出貨。",
};

export default function ChannelEntryPage() {
  return <StagePage stage={STAGES["channel-entry"]} />;
}
