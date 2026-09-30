import type { Metadata } from "next";

import { ChapterPage } from "@/components/services/ChapterPage";
import { CHAPTERS } from "@/data/chapters";

export const metadata: Metadata = {
  title: "北美通路｜產品成熟了，要進 Costco、Walmart、Amazon | 鹿飛 LUFÉ",
  description: "參過展、發過樣品、沒有下文——很多品牌的北美故事停在這裡。",
};

export default function NorthAmericaPage() {
  return <ChapterPage chapter={CHAPTERS.na} />;
}
