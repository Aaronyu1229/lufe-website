import type { Metadata } from "next";

import { ServicesPage } from "@/components/services/ServicesPage";

export const metadata: Metadata = {
  title: "服務｜一家品牌在馬尼拉的第一年 | 鹿飛 LUFÉ",
  description:
    "品測、寄賣、公司落地、海外客服——同一家公司在不同月份會遇到的四件事，我們做成四個方案。",
};

export default function Services() {
  return <ServicesPage />;
}
