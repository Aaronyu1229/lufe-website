import type { ArticleChapterKey } from "@/data/chapters";

export type InsightsCopy = {
  readonly article: {
    readonly breadcrumb: string;
    readonly tableOfContents: string;
    readonly sourcesSummary: string;
    readonly published: string;
    readonly relatedReading: string;
    readonly backToArticles: string;
    readonly founderByline: string;
    readonly founderLine: string;
    readonly founderBio: string;
    readonly moreFounderArticles: string;
    readonly sourceReference: string;
    readonly faqHeading: string;
    readonly tocComplete: string;
    readonly tocRemaining: string;
    readonly scenarioPrefix: string;
  };
  readonly card: {
    readonly readMore: string;
  };
  readonly page: {
    readonly home: string;
    readonly breadcrumb: string;
    readonly title: readonly [string, string];
    readonly lead: string;
    readonly scrollCue: string;
    readonly chapterFilter: string;
    readonly all: string;
    readonly chapterLabels: Record<ArticleChapterKey, string>;
    readonly firstMonthNote: string;
    readonly productTesting: string;
    readonly featured: string;
    readonly readArticle: string;
    readonly empty: string;
  };
};

export const insightsZh: InsightsCopy = {
  article: {
    breadcrumb: "洞察與資源",
    tableOfContents: "本文目錄",
    sourcesSummary: "出處與查證（{n} 筆）・最後查證 {date}",
    published: "發布：",
    relatedReading: "延伸閱讀",
    backToArticles: "← 回到所有文章",
    founderByline: "Aaron Yu・鹿飛 LUFÉ 創辦人",
    founderLine: "鹿飛 LUFÉ 創辦人・來自躍馬企業",
    founderBio: "創辦人來自躍馬企業，底下是 43 年的國際物流。貨代把貨送到，故事才開始；這個專欄寫的是貨到了之後的事。",
    moreFounderArticles: "看更多專欄文章 →",
    sourceReference: "查看出處 {n}",
    faqHeading: "常見問題",
    tocComplete: "已讀完",
    tocRemaining: "剩約 {n} 分鐘",
    scenarioPrefix: "情境：",
  },
  card: {
    readMore: "閱讀更多 →",
  },
  page: {
    home: "首頁",
    breadcrumb: "洞察",
    title: ["出海第一年，", "每個月會卡住的事"],
    lead: "按你現在走到哪一個月來找：第一個月問市場，第三個月談寄賣，第九個月談公司落地。北美通路另成一條線。",
    scrollCue: "往下看",
    chapterFilter: "洞察章節",
    all: "全部",
    chapterLabels: {
      m1: "第一個月：市場探查",
      m3: "第三個月：寄賣",
      m9: "第九個月：公司落地",
      after: "之後的每一天：海外客服",
      na: "北美通路",
      sub: "補助與資源",
    },
    firstMonthNote: "第一個月只問一件事：當地的人會不會買、願意付多少。\n我們的做法是先花 1～2 萬，在菲律賓找真實消費者試用；答案是「還不會」，也是一個答案。",
    productTesting: "看市場探查怎麼做 →",
    featured: "精選",
    readArticle: "閱讀全文 →",
    empty: "這個分類暫時還沒有文章",
  },
};
