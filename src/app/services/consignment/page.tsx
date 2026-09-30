import type { Metadata } from "next";

import { ChapterPage } from "@/components/services/ChapterPage";
import { CHAPTERS } from "@/data/chapters";

export const metadata: Metadata = {
  title: "寄賣｜上架了，讓人先用過再說 | 鹿飛 LUFÉ",
  description: "報告說可以。接下來的問題是：證要多久、貨放哪、上了架誰來推。",
};

export default function ConsignmentPage() {
  return <ChapterPage chapter={CHAPTERS.m3} />;
}
