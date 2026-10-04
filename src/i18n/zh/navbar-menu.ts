import { CASES } from "@/data/cases";
import { CHAPTER_DISPLAY_LABELS, type ArticleChapterKey } from "@/data/chapters";

export type NavbarMenuCopy = {
  readonly header: {
    readonly skipToContent: string;
    readonly navAriaLabel: string;
    readonly mobileMenuOpen: string;
    readonly mobileMenuClose: string;
    readonly backToTop: string;
  };
  readonly services: {
    readonly marketTest: string;
    readonly consignment: string;
    readonly companySetup: string;
    readonly callCenter: string;
    readonly northAmericaRetail: string;
    readonly allFourChapters: string;
    readonly featuredTitle: string;
    readonly featuredBody: string;
    readonly featuredAction: string;
  };
  readonly advanced: {
    readonly operationsOptimization: string;
    readonly lufeMethod: string;
    readonly methodDescription: string;
    readonly situationCheck: string;
    readonly featuredTitle: string;
    readonly featuredBody: string;
    readonly featuredAction: string;
  };
  readonly cases: {
    readonly items: Record<string, { readonly num: string; readonly title: string }>;
    readonly allCases: string;
    readonly tags: readonly string[];
    readonly markets: readonly string[];
    readonly featuredTitle: string;
    readonly featuredBody: string;
    readonly featuredAction: string;
  };
  readonly insights: {
    readonly chapters: Record<Exclude<ArticleChapterKey, "sub">, { readonly title: string; readonly month?: string }>;
    readonly fallbackDescription: string;
    readonly allArticles: string;
    readonly subsidiesAndResources: string;
    readonly subsidyDescription: string;
    readonly tradePilotDescription: string;
  };
  readonly about: {
    readonly items: readonly string[];
    readonly founderColumn: string;
    readonly founderDescription: string;
    readonly founderAction: string;
  };
};

const chapterParts = (chapter: Exclude<ArticleChapterKey, "sub">) => {
  const [month, title] = CHAPTER_DISPLAY_LABELS[chapter].split("：");
  return title ? { title, month } : { title: month };
};

export const navbarMenuZh: NavbarMenuCopy = {
  header: {
    skipToContent: "跳到主要內容",
    navAriaLabel: "主要導航",
    mobileMenuOpen: "開啟選單",
    mobileMenuClose: "關閉選單",
    backToTop: "回到頂端",
  },
  services: {
    marketTest: "市場探查",
    consignment: "寄賣",
    companySetup: "公司落地",
    callCenter: "海外客服",
    northAmericaRetail: "北美通路",
    allFourChapters: "四章總覽",
    featuredTitle: "不確定從哪裡開始？",
    featuredBody: "先做市場探查，用當地真實消費者的反應決定下一步",
    featuredAction: "看市場探查怎麼做",
  },
  advanced: {
    operationsOptimization: "運營優化",
    lufeMethod: "鹿飛方法論",
    methodDescription: "小步出海法 · 先問市場，再投錢",
    situationCheck: "2 分鐘處境比對",
    featuredTitle: "免費初步評估",
    featuredBody: "30 分鐘，用鹿飛方法論的五個問題，初步檢視出海條件",
    featuredAction: "預約 30 分鐘",
  },
  cases: {
    items: Object.fromEntries(CASES.map((caseItem) => [caseItem.slug, { num: caseItem.num, title: caseItem.title }])),
    allCases: "看所有案例 →",
    tags: ["食品", "電子", "服飾", "飲品"],
    markets: ["北美", "東南亞"],
    featuredTitle: "不確定比較像哪一條？",
    featuredBody: "2 分鐘處境比對，找出最接近的案例",
    featuredAction: "開始比對",
  },
  insights: {
    chapters: {
      m1: chapterParts("m1"),
      m3: chapterParts("m3"),
      m9: chapterParts("m9"),
      after: chapterParts("after"),
      na: chapterParts("na"),
    },
    fallbackDescription: "文章整理中，先看服務說明 →",
    allArticles: "看所有文章 →",
    subsidiesAndResources: "補助與資源",
    subsidyDescription: "政府補助整理",
    tradePilotDescription: "線上關稅查詢工具",
  },
  about: {
    items: ["品牌故事", "團隊組成", "合作夥伴網絡", "品牌理念"],
    founderColumn: "創辦人專欄",
    founderDescription: "跨境市場、通路與法規的第一手觀察",
    founderAction: "閱讀專欄",
  },
};
