import { CTA_LINE } from "@/data/cta";

export type HomeCtaCopy = {
  readonly heading: readonly [string, string];
  readonly line: string;
  readonly primary: string;
  readonly secondary: string;
};

export const homeCtaZh: HomeCtaCopy = {
  heading: ["從一次評估開始，", "看清楚出海的下一步"],
  line: CTA_LINE,
  primary: "預約 30 分鐘 →",
  secondary: "還不確定？先做 2 分鐘處境比對 →",
};
