/**
 * 政府出海補助 — 當期可申請計畫
 *
 * 這裡的每一筆都對應到鹿飛實際能協助的服務階段。
 * 內容要更新時只要改這份檔案，卡片與 /resources/subsidies 頁面會同步。
 *
 * 資料來源：經濟部、國際貿易署、中小及新創企業署公告整理
 * 最後更新：2026 年 4 月
 */

export type SubsidyStage = "assess" | "enter" | "optimize";

export type Subsidy = {
  readonly slug: string;
  readonly num: string;
  readonly agency: string;
  readonly program: string;
  readonly shortTitle: string;
  readonly amount: string;
  readonly amountNote?: string;
  readonly oneLiner: string;
  readonly whoFor: readonly string[];
  readonly covers: readonly string[];
  readonly lufeAngle: string;
  readonly stage: SubsidyStage;
  readonly accent: "sky" | "gold" | "ember";
  readonly deadline: string;
  readonly applicationNote: string;
  readonly iconKey: "globe" | "booth" | "factory" | "cart";
  readonly sourceUrl?: string;
};

export const SUBSIDIES: readonly Subsidy[] = [
  {
    slug: "market-expansion",
    num: "01",
    agency: "國際貿易署",
    program: "補助廠商分散及開拓海外市場計畫",
    shortTitle: "海外市場布建補助",
    amount: "最高 NT$1,000 萬",
    amountNote: "單一企業最高 500 萬 · 聯合申請最高 1,000 萬",
    oneLiner:
      "從市場評估、通路進入到海外據點設立，鹿飛的核心服務幾乎 100% 對齊這個補助。",
    whoFor: [
      "想進入新市場但不知從何開始",
      "要在海外設點、找代理商或經銷商",
      "規劃品牌出海行銷計畫",
    ],
    covers: [
      "市場調查與評估",
      "海外通路布建",
      "代理商 / 經銷商開發",
      "海外據點設立費用",
      "品牌行銷與數位推廣",
    ],
    lufeAngle:
      "鹿飛的完整路徑——評估、測試、通路、落地——每一階段都可以納入這個補助。你用補助金來降低找我們的成本。",
    stage: "enter",
    accent: "gold",
    deadline: "2026.09.30",
    applicationNote: "每年 2 期 · 名額有限",
    iconKey: "globe",
    sourceUrl: "https://www.trade.gov.tw/Pages/List.aspx?nodeID=3054",
  },
  {
    slug: "overseas-exhibition",
    num: "02",
    agency: "國際貿易署",
    program: "補助公司或商號參加海外國際展覽",
    shortTitle: "海外展覽參展補助",
    amount: "新創年度最高 NT$40 萬",
    amountNote: "一般企業另有補助級距",
    oneLiner:
      "參加北美、東南亞等大型展覽是接觸買手的最快路徑。場地、佈置、運費、口譯全可補。",
    whoFor: [
      "要參加食品展、電子展等海外 B2B 展覽",
      "想透過展覽直接接觸通路買手",
      "新創或中小企業，預算有限",
    ],
    covers: [
      "展位租金與佈置",
      "樣品運輸費",
      "現場口譯服務",
      "宣傳物料與文宣",
      "部分差旅費用",
    ],
    lufeAngle:
      "我們幫客戶規劃展覽策略、媒合買手、設計展位話術。補助解決錢的問題，鹿飛解決要和誰談、怎麼談的問題。",
    stage: "enter",
    accent: "sky",
    deadline: "依各展覽檔期",
    applicationNote: "展前 60 天申請",
    iconKey: "booth",
    sourceUrl: "https://www.trade.gov.tw/Pages/List.aspx?nodeID=3054",
  },
  {
    slug: "supply-chain-support",
    num: "03",
    agency: "經濟部",
    program: "出口供應鏈支持方案",
    shortTitle: "產地轉移 & 供應鏈支持",
    amount: "研發轉型補助 + 貿易融資",
    amountNote: "針對輸美實績企業",
    oneLiner:
      "美國關稅變動下，產地轉移（如中國 → 越南）是最直接的應對。這個方案就是為此而生。",
    whoFor: [
      "原本輸美、受關稅衝擊的製造業",
      "考慮產地轉移到東南亞的企業",
      "需要爭取海外訂單的出口商",
    ],
    covers: [
      "研發轉型補助",
      "海外訂單爭取補貼",
      "貿易融資支持",
      "供應鏈重組輔導",
    ],
    lufeAngle:
      "鹿飛有實際案例做過「中國轉越南」的產地轉移，從設廠評估、供應商媒合到出口流程全程陪跑。這個補助是我們關稅優化服務的財務助力。",
    stage: "optimize",
    accent: "ember",
    deadline: "長期開放",
    applicationNote: "依個案評估",
    iconKey: "factory",
    sourceUrl: "https://www.moea.gov.tw/",
  },
  {
    slug: "cross-border-ecommerce",
    num: "04",
    agency: "台灣經貿網",
    program: "跨境電商輔導計畫",
    shortTitle: "跨境電商輔導資源",
    amount: "免費培訓 + 廣告投放資源",
    amountNote: "政府資源，非現金補助",
    oneLiner:
      "Amazon、Shopee、Lazada 上架全程輔導。政府免費教你怎麼玩，鹿飛幫你真的賣出去。",
    whoFor: [
      "想上架 Amazon / Shopee / Lazada",
      "需要電商基礎培訓",
      "想申請平台廣告資源",
    ],
    covers: [
      "跨境電商平台培訓",
      "商品上架輔導",
      "廣告投放資源",
      "跨境金流 / 物流諮詢",
    ],
    lufeAngle:
      "培訓讓你懂怎麼操作平台，鹿飛幫你決定賣什麼、定價多少、如何選品、怎麼打廣告。兩者疊加使用最有效率。",
    stage: "assess",
    accent: "sky",
    deadline: "常態招生",
    applicationNote: "依梯次報名",
    iconKey: "cart",
    sourceUrl: "https://www.taiwantrade.com/",
  },
] as const;

/** 卡片顯示的 hook 文案。改文案不用動 UI 代碼。 */
export const SUBSIDY_CARD_COPY = {
  eyebrow: "2026 政府出海補助",
  title: "最高 NT$1,000 萬",
  subtitle: "補助你出海的實際成本",
  contextualTitle: "這個階段有補助",
  contextualSubtitle: "政府正在幫你出海，別放過",
  agencies: "國際貿易署 · 經濟部 · 中小企業署",
  cta: "看看哪個適合你",
  dismissAria: "關閉補助通知",
  image: "/images/subsidies/card-document.jpg",
  hero: "/images/subsidies/hero-handshake.jpg",
} as const;

/**
 * Contextual routing.
 * 當使用者在特定頁面時，顯示最相關的補助而非泛用版本。
 * 路徑前綴比對——最長匹配優先。
 */
export const CONTEXT_SUBSIDY_MAP: readonly {
  readonly pathPrefix: string;
  readonly subsidySlug: string;
}[] = [
  {
    pathPrefix: "/services/market-assessment",
    subsidySlug: "cross-border-ecommerce",
  },
  {
    pathPrefix: "/services/product-testing",
    subsidySlug: "overseas-exhibition",
  },
  {
    pathPrefix: "/services/channel-entry",
    subsidySlug: "market-expansion",
  },
  {
    pathPrefix: "/services/localization",
    subsidySlug: "market-expansion",
  },
  {
    pathPrefix: "/services/optimize",
    subsidySlug: "supply-chain-support",
  },
  {
    pathPrefix: "/cases/electronics-tariff",
    subsidySlug: "supply-chain-support",
  },
  {
    pathPrefix: "/cases/costco-health",
    subsidySlug: "market-expansion",
  },
  {
    pathPrefix: "/cases/bubble-tea",
    subsidySlug: "market-expansion",
  },
  {
    pathPrefix: "/cases/shoe-brand",
    subsidySlug: "cross-border-ecommerce",
  },
];

export function getSubsidyBySlug(slug: string): Subsidy | undefined {
  return SUBSIDIES.find((s) => s.slug === slug);
}

/** Find the best-matching subsidy for a given pathname. Returns null if none match. */
export function getContextualSubsidy(pathname: string): Subsidy | null {
  // Longest prefix wins so /services/channel-entry matches before /services
  const sorted = [...CONTEXT_SUBSIDY_MAP].sort(
    (a, b) => b.pathPrefix.length - a.pathPrefix.length
  );
  for (const entry of sorted) {
    if (pathname.startsWith(entry.pathPrefix)) {
      const s = getSubsidyBySlug(entry.subsidySlug);
      if (s) return s;
    }
  }
  return null;
}

/** 延續性：把補助對應到 hero 的三個階段。 */
export const STAGE_LABELS: Record<
  SubsidyStage,
  { label: string; desc: string }
> = {
  assess: {
    label: "不確定能不能出海",
    desc: "先用政府資源低成本試水溫",
  },
  enter: {
    label: "準備出海找方向",
    desc: "補助降低市場進入的實際費用",
  },
  optimize: {
    label: "出海中想優化",
    desc: "轉型與供應鏈調整的財務助力",
  },
};
