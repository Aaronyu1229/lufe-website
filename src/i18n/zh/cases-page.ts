import { CTA_LINE } from "@/data/cta";
import type { CaseStageSlug } from "@/data/cases";

type CaseRoadCopy = {
  readonly label: string;
  readonly title: string;
  readonly body: string;
  readonly lesson: string;
};

export type CasesPageCopy = {
  readonly home: string;
  readonly breadcrumb: string;
  readonly title: readonly [string, string];
  readonly lead: string;
  readonly scrollCue: string;
  readonly roads: readonly CaseRoadCopy[];
  readonly filters: {
    readonly industry: string;
    readonly market: string;
    readonly countPrefix: string;
    readonly countSuffix: string;
    readonly empty: string;
  };
  readonly card: {
    readonly lesson: string;
    readonly expand: string;
    readonly detail: string;
    readonly readCase: string;
    readonly compare: string;
    readonly close: string;
  };
  readonly cta: {
    readonly heading: string;
    readonly body: string;
    readonly button: string;
    readonly assessHeading: string;
    readonly assessBody: string;
    readonly assessChips: readonly string[];
    readonly assessLabel: string;
  };
  readonly detail: {
    readonly breadcrumb: string;
    readonly timelineLabel: string;
    readonly previousLabel: string;
    readonly nextLabel: string;
    readonly defaultTimelineHeading: readonly [string, string];
    readonly defaultCtaHeading: readonly [string, string];
    readonly defaultCtaSuffix: string;
    readonly defaultCtaBody: string;
    readonly defaultCtaSecondary: string;
    readonly button: string;
    readonly relatedHeading: string;
    readonly relatedReadCase: string;
    readonly backToCases: string;
    readonly stages: Record<CaseStageSlug, { readonly label: string; readonly title: string }>;
  };
};

export const casesPageZh: CasesPageCopy = {
  home: "首頁",
  breadcrumb: "案例",
  title: ["每一個判斷，", "都有案例可以對照"],
  lead: "台灣品牌出海，大致有三種走法。下面是我們參與過、和我們在菲律賓的當地夥伴自己走過的案例，每一個都寫到當時最關鍵的那個決定。",
  scrollCue: "往下看",
  roads: [
    { label: "第一條", title: "從零開始", body: "在當地從零做起。我們在菲律賓的當地夥伴，先做了一間英語教育機構，後來也從零做起一個連鎖手搖飲品牌", lesson: "找人比找店面難，第一批人決定後面所有事" },
    { label: "第二條", title: "改了再帶過去", body: "台灣的產品到了當地，改配方、改價格、改包裝", lesson: "台灣的「好」不一定是當地的「好」，先讓當地人拿起來看看" },
    { label: "第三條", title: "原封不動帶過去", body: "產品和品牌原封不動，只換在當地講故事的方式。我們的當地夥伴，陪過台灣的美業品牌這樣走", lesson: "品牌可以不改，但講故事的方式一定要改" },
  ],
  filters: { industry: "產業", market: "市場", countPrefix: "共", countSuffix: "則", empty: "這個組合暫時沒有案例。試試調整篩選條件" },
  card: { lesson: "這條路教我們的事", expand: "展開故事 · 四段 20 秒看完 →", detail: "完整的過程，和當時為什麼這樣決定，都在內頁", readCase: "讀完整案例 →", compare: "比對你的處境", close: "關閉" },
  cta: {
    heading: "你的故事會是哪一條？",
    body: CTA_LINE,
    button: "預約 30 分鐘 →",
    assessHeading: "不確定自己比較像哪一條？",
    assessBody: "三個問題，比對我們參與過的三個案例，找出最接近的一個",
    assessChips: ["階段", "卡點", "市場"],
    assessLabel: "開始比對",
  },
  detail: {
    breadcrumb: "案例",
    timelineLabel: "時間軸",
    previousLabel: "上一個",
    nextLabel: "下一個",
    defaultTimelineHeading: ["從啟動到收尾的", "時間節奏"],
    defaultCtaHeading: ["你的產品也有", "類似的機會"],
    defaultCtaSuffix: "嗎？",
    defaultCtaBody: "每個案子的起點都是一場對話。聊聊你的狀況，鹿飛會說明這個故事裡哪一段跟你最相關",
    defaultCtaSecondary: "還不確定像哪一種？先做 2 分鐘處境比對",
    button: "預約 30 分鐘 →",
    relatedHeading: "更多案例",
    relatedReadCase: "看完整案例 →",
    backToCases: "回到所有案例",
    stages: {
      "market-assessment": { label: "第一個月", title: "市場探查" },
      "product-testing": { label: "第一個月", title: "市場探查" },
      "channel-entry": { label: "北美", title: "北美通路" },
      localization: { label: "第九個月", title: "公司落地" },
    },
  },
};
