import type { Metadata } from "next";
import { MethodologyPage } from "@/components/services/MethodologyPage";

export const metadata: Metadata = {
  title: "方法論 | 鹿飛 LUFÉ",
  description:
    "鹿飛的 MBCPR 五維評分框架：Market / Barrier / Competition / Profitability / Regulatory。我們怎麼判斷一個跨境案子值不值得做。",
};

export default function MethodologyRoute() {
  return <MethodologyPage />;
}
