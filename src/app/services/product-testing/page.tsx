import type { Metadata } from "next";
import { ChapterPage } from "@/components/services/ChapterPage";
import { CHAPTERS } from "@/data/chapters";

export const metadata: Metadata = {
  title: "品測｜先讓馬尼拉的媽媽拿起來看看 | 鹿飛 LUFÉ",
  description:
    "你在台灣問了一百個人，還是不知道馬尼拉的媽媽會不會掏錢。品測就是把這個問題，拿去問她本人。",
};

export default function ProductTestingPage() {
  return <ChapterPage chapter={CHAPTERS.m1} />;
}
