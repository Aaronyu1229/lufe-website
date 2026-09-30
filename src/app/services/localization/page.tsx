import type { Metadata } from "next";
import { ChapterPage } from "@/components/services/ChapterPage";
import { CHAPTERS } from "@/data/chapters";

export const metadata: Metadata = {
  title: "公司落地｜開始想要在當地有自己的人 | 鹿飛 LUFÉ",
  description:
    "賣得動了。你開始想：要不要開一間自己的公司、找第一個員工、把證掛到自己名下。然後你發現，每一件事都需要有人在當地。",
};

export default function LocalizationPage() {
  return <ChapterPage chapter={CHAPTERS.m9} />;
}
