import type { Metadata } from "next";

import { ChapterPage } from "@/components/services/ChapterPage";
import { CHAPTERS } from "@/data/chapters";

export const metadata: Metadata = {
  title: "海外客服｜星期五晚上十一點的那封信 | 鹿飛 LUFÉ",
  description: "一封英文客訴信。退貨、換貨、問哪裡有賣。你不會想為了這件事養一組人，但也不能不回。",
};

export default function CallCenterPage() {
  return <ChapterPage chapter={CHAPTERS.after} />;
}
