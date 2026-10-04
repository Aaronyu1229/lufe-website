import { CTA_LINE } from "@/data/cta";

export type AaronAuthorPageCopy = {
  readonly home: string;
  readonly about: string;
  readonly founderLine: string;
  readonly intro: string;
  readonly articleCountPrefix: string;
  readonly articleCountSuffix: string;
  readonly latestUpdatePrefix: string;
  readonly articleHeading: string;
  readonly emptyArticles: string;
  readonly cta: {
    readonly heading: string;
    readonly body: string;
    readonly button: string;
    readonly secondary: string;
  };
};

export const aaronAuthorPageZh: AaronAuthorPageCopy = {
  home: "首頁",
  about: "關於我們",
  founderLine: "鹿飛 LUFÉ 創辦人・來自躍馬企業",
  intro: "創辦人來自躍馬企業，底下是 43 年的國際物流。貨代把貨送到，故事才開始；這個專欄寫的是貨到了之後的事。\n台灣品牌進菲律賓的第一年：市場探查、寄賣、公司落地，北美通路另成一條線。你可能已經卡在其中一步，這裡多半有一篇在講它。",
  articleCountPrefix: "專欄文章 ",
  articleCountSuffix: " 篇",
  latestUpdatePrefix: "最近更新 ",
  articleHeading: "專欄文章",
  emptyArticles: "",
  cta: {
    heading: "讀到這裡，還是不確定自己卡在哪？",
    body: CTA_LINE,
    button: "預約 30 分鐘 →",
    secondary: "還不確定像哪一種？先做 2 分鐘處境比對",
  },
};
