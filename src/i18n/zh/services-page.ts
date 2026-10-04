import { CTA_LINE } from "@/data/cta";
import { SERVICE_FAQS } from "@/data/serviceFaqs";

export type ServicesPageCopy = {
  readonly breadcrumbAriaLabel: string;
  readonly breadcrumbHome: string;
  readonly breadcrumbServices: string;
  readonly h1: string;
  readonly lead: string;
  readonly primaryCta: string;
  readonly secondaryCta: string;
  readonly scrollCue: string;
  readonly chaptersHeading: string;
  readonly chaptersLead: string;
  readonly tileAriaLabel: string;
  readonly tileMore: string;
  readonly tiles: readonly { readonly month: string; readonly name: string; readonly line: string; readonly alt: string }[];
  readonly pathsHeading: string;
  readonly paths: readonly { readonly alt: string; readonly eyebrow: string; readonly title: string; readonly line: string; readonly specs: readonly (readonly [string, string])[]; readonly cta: string }[];
  readonly windowHeading: string;
  readonly windowHeadingAccent: string;
  readonly windowLead: string;
  readonly capabilities: readonly { readonly title: string; readonly body: string }[];
  readonly faqTitle: string;
  readonly faqAsk: string;
  readonly faqMore: string;
  readonly faqs: readonly { readonly q: string; readonly a: string; readonly takeaway: string }[];
  readonly ctaHeading: string;
  readonly ctaLine: string;
};

export const servicesPageZh: ServicesPageCopy = {
  breadcrumbAriaLabel: "Breadcrumb",
  breadcrumbHome: "首頁",
  breadcrumbServices: "服務",
  h1: "一家品牌在馬尼拉的第一年",
  lead: "市場探查、寄賣、公司落地、海外客服——台灣品牌進菲律賓的第一年，多半會依序遇到這四件事。我們把它做成四個方案，每個都有明碼價格。可以只走一章，也可以一路走完。",
  primaryCta: "免費初步評估 30 分鐘 →",
  secondaryCta: "看四個章節 ↓",
  scrollCue: "往下看",
  chaptersHeading: "四個章節，按你的節奏往前走",
  chaptersLead: "每一章獨立計價。每一章結束，你都可以決定往下走、停下來，或換方向。",
  tileAriaLabel: "了解方案 →",
  tileMore: "了解方案",
  tiles: [
    { month: "第一個月", name: "市場探查", line: "讓當地真實消費者先用、先說，再決定要不要往下走", alt: "會議中討論圖表的團隊" },
    { month: "第三個月", name: "寄賣", line: "產品證由當地持證進口商代辦、代持；證下來之前，先把通路和市場活動準備好", alt: "貨架上待出貨的包裹" },
    { month: "第九個月", name: "公司落地", line: "註冊、招聘、掛證，在當地建立你自己的團隊", alt: "夜晚街角的咖啡店與行人" },
    { month: "之後的每一天", name: "海外客服", line: "英文客服由菲律賓團隊接手，服務規則由台灣端制定。預計 2027 Q1 開放首批", alt: "一邊通話一邊打字的客服人員" },
  ],
  pathsHeading: "主線是菲律賓；產品已經站穩的，另有北美通路",
  paths: [
    {
      alt: "馬尼拉都會區的商業大樓街景",
      eyebrow: "菲律賓 · 第一年四章",
      title: "先花 1～2 萬，確認市場要不要這個產品",
      line: "市場探查 → 寄賣 → 公司落地 → 海外客服，可以只走一章，也可以一路走完",
      specs: [
        ["適合", "有產品的消費品牌與連鎖餐飲；沒出過海，或出過但沒站穩"],
        ["收費", "每章明碼。起手包 7 萬（市場探查 1～2 萬＋寄賣包 5～6 萬，市場探查費可抵寄賣包）；公司落地按案，第一次談給範圍；海外客服第一次談給區間"],
        ["第一步", "市場探查，用一頁報告決定下一步"],
      ],
      cta: "從第一章開始 →",
    },
    {
      alt: "超市貨架走道",
      eyebrow: "北美 · 北美通路",
      title: "進入北美主流零售通路",
      line: "市場研究、展覽、引進買家、上桌談判，由北美合作團隊執行；我們負責合約與進度",
      specs: [
        ["適合", "產品已經在台灣或其他市場站穩的品牌"],
        ["收費與時程", "依品類不同，第一次談就給明確數字"],
      ],
      cta: "了解北美通路 →",
    },
  ],
  windowHeading: "一個窗口，",
  windowHeadingAccent: "串起當地的每一個執行夥伴",
  windowLead: "我們負責合約、進度與品質；當地的試用、通路、法務與招聘，由合作夥伴分工執行。",
  capabilities: [
    { title: "在地試用面板", body: "由當地老師、家長等有固定收入、自己花錢買東西的消費者組成的試用面板，產品上架前先拿到真實反應" },
    { title: "持證進口與通路夥伴", body: "產品證由當地持證進口商代辦、代持，你不用先開公司；上架接合作的電商通路" },
    { title: "律師行與招聘夥伴", body: "公司註冊、文件與招聘，由當地律師行與招聘夥伴執行" },
    { title: "台灣端專案管理", body: "合約、進度與品質指標都在我們的台灣公司，你只對一個窗口" },
  ],
  faqTitle: "選方案之前，最常被問的三件事",
  faqAsk: "直接問鹿飛 →",
  faqMore: "還有其他問題？",
  faqs: SERVICE_FAQS,
  ctaHeading: "想知道該從哪一章開始？",
  ctaLine: CTA_LINE,
};
