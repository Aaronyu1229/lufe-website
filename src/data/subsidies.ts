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
  /** ISO date string (YYYY-MM-DD) for subsidies with a concrete deadline. Omit for open-ended programs. */
  readonly deadlineDate?: string;
  readonly applicationNote: string;
  readonly iconKey: "globe" | "booth" | "factory" | "cart";
  readonly sourceUrl?: string;
  /** 例如「115 年度加碼版」；非空時卡片會顯示醒目標記 */
  readonly highlight?: string;
  /** 強化 highlight 的一句話脈絡，例如「歷年最優 · 用罄即止」 */
  readonly highlightNote?: string;
  /** 可補助費用項目的明細（給展開區塊用，不干擾 covers 的簡列） */
  readonly coversDetail?: readonly {
    readonly title: string;
    readonly note: string;
    readonly limit?: string;
  }[];
  /** 申請與核銷流程步驟 */
  readonly processSteps?: readonly {
    readonly title: string;
    readonly note: string;
  }[];
  /** 容易被忽略的關鍵注意事項 */
  readonly importantNotes?: readonly string[];
  /** 官方公告的最後確認日（ISO）— 讓使用者知道資料新鮮度 */
  readonly verifiedOn?: string;
};

export const SUBSIDIES: readonly Subsidy[] = [
  {
    slug: "market-expansion",
    num: "01",
    agency: "經濟部 · 國際貿易署",
    program: "補助廠商分散及開拓海外市場計畫",
    shortTitle: "海外市場布建補助",
    amount: "最高 NT$1,000 萬",
    amountNote:
      "單一企業最高 500 萬 · 聯合申請（3 家以上）最高 1,000 萬 · 補助比例最高 50%",
    oneLiner:
      "從市場評估、通路進入到海外據點設立，鹿飛的核心服務幾乎 100% 對齊這個補助。這是一個中長期、可執行 1 年以上的整合型計畫。",
    whoFor: [
      "想進入新市場但不知從何開始的中小企業",
      "要在海外設點、找代理商或經銷商的品牌",
      "規劃品牌出海行銷、有明確 KPI 的團隊",
    ],
    covers: [
      "海外市場調查與策略規劃",
      "海外通路與買主開發",
      "參加海外展覽與洽商活動",
      "海外據點設立與法遵費用",
      "品牌行銷與數位推廣",
      "認證、檢測、法規諮詢",
    ],
    coversDetail: [
      {
        title: "海外市場調查與策略規劃",
        note: "委外市場研究、消費者行為調查、競品分析、產業報告購置。須具體提報調查方法與預期產出。",
        limit: "核實報銷",
      },
      {
        title: "海外通路與買主開發",
        note: "買主拜訪、經銷商媒合、通路進入費用、樣品寄送。自行拜訪的員工差旅有上限規定。",
        limit: "差旅有上限",
      },
      {
        title: "參加海外展覽與洽商活動",
        note: "攤位租金、佈置、運輸、口譯、文宣。可與「海外展覽參展補助」擇一申請，不能重複請款。",
        limit: "不可與 02 重複",
      },
      {
        title: "海外據點設立與法遵費用",
        note: "海外辦公室租金、設立登記費、當地法律會計諮詢、稅務申報。",
        limit: "依計畫核定",
      },
      {
        title: "品牌行銷與數位推廣",
        note: "海外廣告投放、品牌官網建置（須為目標市場語言）、SEO、社群經營委外。",
        limit: "須具 KPI",
      },
      {
        title: "認證、檢測、法規諮詢",
        note: "目標市場所需之產品認證（如 FDA、CE、HACCP）、測試費、智財權註冊。",
        limit: "核實報銷",
      },
    ],
    processSteps: [
      { title: "線上提案", note: "填寫公司資料、海外布建計畫書、預算表與 KPI 指標。" },
      { title: "書面審查", note: "貿易署審查企業資格、計畫可行性、預算合理性。" },
      { title: "簡報答辯", note: "現場簡報讓審查委員提問，補件機會通常只有一次。" },
      { title: "核定額度", note: "依審查結果核定補助額度（可能低於申請金額）。" },
      { title: "執行與核銷", note: "依預算執行，每季提報進度與核銷，計畫結束後做總結報告。" },
    ],
    importantNotes: [
      "款項採分期撥付（通常按季或按里程碑），不是一次性到帳",
      "計畫書必須有明確的量化 KPI（例如出口金額、通路數、買主成交數），執行結果會被逐項檢核",
      "每年 2 期公告，競爭激烈，建議提前 2-3 個月準備計畫書",
      "自籌款比例視企業規模不同，一般至少自籌 50%",
    ],
    lufeAngle:
      "鹿飛的完整路徑——評估、測試、通路、落地——每一階段都可以納入這個補助。我們幫你把計畫書寫到能過審的程度（市場分析、通路策略、量化 KPI 都是我們日常產出），你用補助金來降低找我們的成本。",
    stage: "enter",
    accent: "gold",
    deadline: "2026.09.30",
    deadlineDate: "2026-09-30",
    applicationNote: "每年 2 期 · 名額有限",
    iconKey: "globe",
    sourceUrl: "https://www.trade.gov.tw/Pages/List.aspx?nodeID=3054",
    verifiedOn: "2026-04-23",
  },
  {
    slug: "overseas-exhibition",
    num: "02",
    agency: "經濟部 · 國際貿易署",
    program: "補助公司或商號參加海外國際展覽",
    shortTitle: "海外展覽參展補助",
    amount: "每展最高 NT$16 萬",
    amountNote:
      "1 攤補助 12 萬，每增一攤 +1 萬，封頂 16 萬 · 補助比例最高 90%，企業自籌 10%",
    oneLiner:
      "因應國際關稅情勢，經濟部依特別條例加碼補助赴海外參展。往年每展 4-5 萬，115 年度加碼至 16 萬，歷年最優。",
    whoFor: [
      "要參加北美、東南亞 B2B 展覽的企業",
      "新創事業與新南向農業業者享特殊優先待遇",
      "想透過展覽直接接觸通路買手與海外代理商",
    ],
    covers: [
      "場地租金（必要項目）",
      "場地佈置費",
      "口譯費（每日上限 NT$14,000）",
      "展品運費（限至國外）",
      "型錄 / DM / 名片等印刷費",
      "展前展中文宣廣告費",
    ],
    coversDetail: [
      {
        title: "場地租金",
        note: "攤位租賃費用，所有申請案的必備項目。核實報銷。",
        limit: "必要項目",
      },
      {
        title: "場地佈置費",
        note: "攤位設計與裝潢費用。核實報銷，單據須齊全。",
        limit: "核實報銷",
      },
      {
        title: "口譯費",
        note: "口譯人員須為非參展廠商並出具切結書。不含午休時間。",
        limit: "每日上限 NT$14,000",
      },
      {
        title: "展品運費",
        note: "限「至國外」的展品來回運費。國內運費不得申請。",
        limit: "限國外段",
      },
      {
        title: "印刷費",
        note: "型錄、DM、名片等印刷品。須提供實品或照片樣本（不可為設計檔）。",
        limit: "核實報銷",
      },
      {
        title: "文宣廣告費",
        note: "展前展中之宣傳廣告投放費用。須附實品照片樣本。",
        limit: "核實報銷",
      },
    ],
    processSteps: [
      { title: "展前申請", note: "線上填寫公司資料、展覽資訊、預算表。" },
      { title: "審查核配", note: "貿易署審查資格、保留補助額度（尚未撥款）。" },
      { title: "赴海外參展", note: "攤位明顯處張貼臺灣一等一標誌（A3 以上）。" },
      { title: "展後核銷", note: "展後 1 個月內檢附單據、發票、攤位照片。" },
      { title: "撥款入帳", note: "審查通過後匯入公司帳戶。" },
    ],
    importantNotes: [
      "款項非核定後即撥付，而是展後核銷審查通過才撥款",
      "攤位明顯處須張貼臺灣一等一標誌（A3 以上），忘了貼會影響核銷",
      "一年分 2 次公告，115 年度第 2 次預計 4-5 月開放，經費用罄即止",
    ],
    lufeAngle:
      "我們幫客戶規劃展覽策略、媒合買手、設計展位話術，也協助準備申請資料與展後核銷。補助解決錢的問題，鹿飛解決要和誰談、怎麼談、怎麼不卡核銷的問題。",
    stage: "enter",
    accent: "sky",
    highlight: "115 年度加碼版",
    highlightNote: "歷年最優 · 經費用罄即止",
    deadline: "預計 4-5 月開放（第 2 次公告）",
    applicationNote: "第 2 次公告 · 展覽執行期 115/7/1–115/12/31",
    iconKey: "booth",
    sourceUrl: "https://www.trade.gov.tw/Pages/List.aspx?nodeID=3054",
    verifiedOn: "2026-04-23",
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

/** 卡片顯示的 hook 文案。大部分頁面走預設；子頁透過 CONTEXTUAL_COPY 覆寫。 */
export const SUBSIDY_CARD_COPY = {
  dismissAria: "關閉補助通知",
  image: "/images/subsidies/card-skyline.jpg",
  hero: "/images/subsidies/hero-handshake.jpg",
  /** Link target — always goes to the matcher section for maximum engagement */
  href: "/resources/subsidies#match",
} as const;

/**
 * ContextualCopy — per-pathname copy overrides.
 * 每個 path prefix 對應一組完整文案（eyebrow / headline / oneLiner / cta）。
 * 用最長前綴匹配，未匹配到就用 default。
 */
export interface ContextualCopy {
  readonly eyebrow: string;
  readonly headline: string;
  readonly oneLiner: string;
  readonly cta: string;
}

const DEFAULT_COPY: ContextualCopy = {
  eyebrow: "2026 政府出海補助",
  headline: "政府正在幫你出海",
  oneLiner: "4 個正在開放的計畫 · 最高 NT$1,000 萬",
  cta: "算算我能拿多少",
};

export const CONTEXTUAL_COPY: readonly {
  readonly pathPrefix: string;
  readonly copy: ContextualCopy;
}[] = [
  {
    pathPrefix: "/services/market-assessment",
    copy: {
      eyebrow: "還沒出海的你",
      headline: "先用免費資源試水溫",
      oneLiner: "跨境電商輔導 · 政府免費培訓 + 廣告資源",
      cta: "看這個計畫",
    },
  },
  {
    pathPrefix: "/services/product-testing",
    copy: {
      eyebrow: "要去海外展覽？",
      headline: "展覽費用可以補助",
      oneLiner: "攤位、佈置、運費、口譯一起補 · 展前 60 天申請",
      cta: "看展覽補助",
    },
  },
  {
    pathPrefix: "/services/channel-entry",
    copy: {
      eyebrow: "準備進通路的你",
      headline: "最高 NT$1,000 萬補助",
      oneLiner: "市場評估 · 通路布建 · 海外據點，全可申請",
      cta: "看完整方案",
    },
  },
  {
    pathPrefix: "/services/localization",
    copy: {
      eyebrow: "已經在海外落地",
      headline: "海外據點設立也能補",
      oneLiner: "品牌行銷、在地團隊、長期營運都涵蓋",
      cta: "看適用範圍",
    },
  },
  {
    pathPrefix: "/services/optimize",
    copy: {
      eyebrow: "關稅壓力太大？",
      headline: "政府有補救方案",
      oneLiner: "產地轉移、研發轉型、貿易融資——專案支援",
      cta: "看適用條件",
    },
  },
  {
    pathPrefix: "/services/methodology",
    copy: {
      eyebrow: "2026 政府出海補助",
      headline: "補助是策略的一部分",
      oneLiner: "4 個計畫怎麼疊加使用最划算",
      cta: "看搭配方法",
    },
  },
  {
    pathPrefix: "/cases/electronics-tariff",
    copy: {
      eyebrow: "這個案例的補助",
      headline: "產地轉移有政府支援",
      oneLiner: "研發轉型 + 貿易融資 · 為這種情況設計",
      cta: "看細節",
    },
  },
  {
    pathPrefix: "/cases/costco-health",
    copy: {
      eyebrow: "這個案例的補助",
      headline: "打進通路可以申請",
      oneLiner: "最高 1,000 萬 · 市場布建補助",
      cta: "看細節",
    },
  },
  {
    pathPrefix: "/cases/bubble-tea",
    copy: {
      eyebrow: "這個案例的補助",
      headline: "海外據點有補助",
      oneLiner: "東南亞落地也能申請 · 最高 500 萬",
      cta: "看細節",
    },
  },
  {
    pathPrefix: "/cases/shoe-brand",
    copy: {
      eyebrow: "要上 Amazon？",
      headline: "跨境電商有免費資源",
      oneLiner: "政府免費培訓 · 平台廣告補助",
      cta: "看這個計畫",
    },
  },
  {
    pathPrefix: "/about",
    copy: {
      eyebrow: "2026 政府出海補助",
      headline: "走完這條線最划算的方法",
      oneLiner: "每個階段都有對應的補助——疊加使用省更多",
      cta: "看怎麼搭配",
    },
  },
  {
    pathPrefix: "/insights",
    copy: {
      eyebrow: "2026 政府出海補助",
      headline: "把知識變成行動",
      oneLiner: "文章讀完不動不行——政府有預算幫你做",
      cta: "看怎麼用",
    },
  },
];

/**
 * 取得該 pathname 的 copy。最長前綴優先，無匹配則回傳 default。
 */
export function getContextualCopy(pathname: string): ContextualCopy {
  if (!pathname) return DEFAULT_COPY;
  const sorted = [...CONTEXTUAL_COPY].sort(
    (a, b) => b.pathPrefix.length - a.pathPrefix.length
  );
  for (const entry of sorted) {
    if (pathname.startsWith(entry.pathPrefix)) return entry.copy;
  }
  return DEFAULT_COPY;
}

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

/* ────────────────────────────────────────────────
 * SubsidyMatcher — 4 題自助問卷 + 媒合邏輯
 * 每題有 3–4 個選項。作答後依優先序媒合主推 + 次推。
 * ──────────────────────────────────────────────── */

export type SizeAnswer = "solo" | "small" | "medium" | "large";
export type StageAnswer = "not-yet" | "planning" | "doing" | "optimizing";
export type IndustryAnswer = "food" | "electronics" | "apparel" | "service" | "other";
export type ProblemAnswer =
  | "dont-know-where"
  | "need-channel"
  | "meet-buyers"
  | "reduce-cost"
  | "scale-operations";

export interface MatcherAnswers {
  readonly size: SizeAnswer;
  readonly stage: StageAnswer;
  readonly industry: IndustryAnswer;
  readonly problem: ProblemAnswer;
}

export interface MatcherQuestion<T extends string = string> {
  readonly id: keyof MatcherAnswers;
  readonly label: string;
  readonly sublabel: string;
  readonly options: readonly {
    readonly value: T;
    readonly label: string;
    readonly hint: string;
  }[];
}

export const MATCHER_QUESTIONS: readonly [
  MatcherQuestion<SizeAnswer>,
  MatcherQuestion<StageAnswer>,
  MatcherQuestion<IndustryAnswer>,
  MatcherQuestion<ProblemAnswer>,
] = [
  {
    id: "size",
    label: "你的公司規模大約是？",
    sublabel: "不同規模適用不同計畫，先從這題開始",
    options: [
      { value: "solo", label: "1 人 / SOHO", hint: "個人品牌或新創單打" },
      { value: "small", label: "2–20 人", hint: "小型團隊" },
      { value: "medium", label: "21–200 人", hint: "中型企業" },
      { value: "large", label: "200 人以上", hint: "成熟企業" },
    ],
  },
  {
    id: "stage",
    label: "你現在在哪個階段？",
    sublabel: "決定你最該先申請哪一種補助",
    options: [
      { value: "not-yet", label: "還在觀望", hint: "不確定該不該出海" },
      { value: "planning", label: "準備出海", hint: "決定了但還沒動" },
      { value: "doing", label: "正在出海", hint: "已在談通路 / 鋪貨中" },
      { value: "optimizing", label: "已在海外", hint: "想優化成本或擴大" },
    ],
  },
  {
    id: "industry",
    label: "你的產業是？",
    sublabel: "不同產業有不同的補助重點",
    options: [
      { value: "food", label: "食品 / 保健", hint: "含加工食品、飲品" },
      { value: "electronics", label: "電子 / 消費品", hint: "含 3C、家電、配件" },
      { value: "apparel", label: "服飾 / 配件", hint: "含鞋類、包包" },
      { value: "service", label: "餐飲 / 服務", hint: "含飲料、連鎖" },
      { value: "other", label: "其他製造 / 品牌", hint: "含零組件、工具" },
    ],
  },
  {
    id: "problem",
    label: "你現在最想解決什麼？",
    sublabel: "最後一題——幫我們推薦最對的那個",
    options: [
      {
        value: "dont-know-where",
        label: "不知從何開始",
        hint: "沒頭緒、想先試看看",
      },
      { value: "need-channel", label: "要找海外通路", hint: "要上架、要代理商" },
      { value: "meet-buyers", label: "要接觸買手", hint: "要去展覽、要見採購" },
      {
        value: "reduce-cost",
        label: "成本 / 關稅太高",
        hint: "要搬產線、要降物流",
      },
      { value: "scale-operations", label: "要擴大海外營運", hint: "要建在地團隊" },
    ],
  },
] as const;

/**
 * Matching logic — takes the 4 answers and returns 1 primary + up to 2 secondary subsidies,
 * each with a specific reasoning string for why it matches.
 */
export interface MatchResult {
  readonly primary: {
    readonly subsidy: Subsidy;
    readonly reason: string;
  };
  readonly secondary: readonly {
    readonly subsidy: Subsidy;
    readonly reason: string;
  }[];
  readonly verdict: string;
}

/* ────────────────────────────────────────────────
 * Date-aware helpers — powers the SubsidyCard "still open" logic
 * ──────────────────────────────────────────────── */

/** Returns true if a subsidy is still active (no concrete deadline, or deadline is in the future). */
export function isSubsidyActive(subsidy: Subsidy): boolean {
  if (!subsidy.deadlineDate) return true; // open-ended programs are always active
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadline = new Date(subsidy.deadlineDate + "T23:59:59");
  return deadline >= today;
}

/** Returns count of currently active subsidies. */
export function getActiveSubsidyCount(): number {
  return SUBSIDIES.filter(isSubsidyActive).length;
}

/** Returns the nearest upcoming deadline (formatted), or null if none have concrete dates. */
export function getNearestDeadline(): { formatted: string; daysLeft: number } | null {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let nearest: { formatted: string; daysLeft: number } | null = null;

  for (const s of SUBSIDIES) {
    if (!s.deadlineDate) continue;
    const deadline = new Date(s.deadlineDate + "T00:00:00");
    if (deadline < today) continue;
    const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (!nearest || daysLeft < nearest.daysLeft) {
      const m = deadline.getMonth() + 1;
      const d = deadline.getDate();
      nearest = { formatted: `${m}/${d}`, daysLeft };
    }
  }

  return nearest;
}

/** Format today's date as M/D for display. */
export function getTodayFormatted(): string {
  const now = new Date();
  return `${now.getMonth() + 1}/${now.getDate()}`;
}

export function matchSubsidies(answers: MatcherAnswers): MatchResult {
  const ma = getSubsidyBySlug("market-expansion")!;
  const oe = getSubsidyBySlug("overseas-exhibition")!;
  const sc = getSubsidyBySlug("supply-chain-support")!;
  const ce = getSubsidyBySlug("cross-border-ecommerce")!;

  // Rule tree — ordered by specificity
  // 1) Optimizing + cost problem → supply chain
  if (
    answers.stage === "optimizing" &&
    (answers.problem === "reduce-cost" || answers.problem === "scale-operations")
  ) {
    return {
      primary: {
        subsidy: sc,
        reason:
          "你已經在海外且面臨成本或擴大運營的問題，產地轉移與供應鏈支持方案就是為這種情況設計的。",
      },
      secondary:
        answers.size === "medium" || answers.size === "large"
          ? [
              {
                subsidy: ma,
                reason: "同步申請市場布建補助，可用於海外據點與在地團隊建置。",
              },
            ]
          : [],
      verdict: "你最該優先申請的是：產地轉移 & 供應鏈支持",
    };
  }

  // 2) Not yet started → cross-border ecommerce (free resources)
  if (answers.stage === "not-yet" || answers.problem === "dont-know-where") {
    return {
      primary: {
        subsidy: ce,
        reason:
          "你現階段最該用的是「免費資源」而不是花錢——跨境電商輔導有政府免費培訓與廣告資源，零成本就能開始。",
      },
      secondary:
        answers.size !== "solo" && answers.size !== "small"
          ? [
              {
                subsidy: oe,
                reason:
                  "如果想用展覽快速接觸海外買手，參展補助最高 40 萬可以同步申請。",
              },
            ]
          : [],
      verdict: "先從免費資源開始：跨境電商輔導",
    };
  }

  // 3) Planning or doing + meet-buyers → exhibition
  if (
    (answers.stage === "planning" || answers.stage === "doing") &&
    answers.problem === "meet-buyers"
  ) {
    return {
      primary: {
        subsidy: oe,
        reason:
          "要接觸海外買手最快的路徑就是國際展覽，這個補助把展位、佈置、運費、口譯全包了，新創最高 40 萬。",
      },
      secondary: [
        {
          subsidy: ma,
          reason: "同時申請市場布建補助，展後的通路進入與據點設立可以銜接。",
        },
      ],
      verdict: "展覽是最快的方法：海外展覽參展補助",
    };
  }

  // 4) Planning/doing + need-channel → market expansion (the big one)
  if (
    (answers.stage === "planning" || answers.stage === "doing") &&
    (answers.problem === "need-channel" ||
      answers.problem === "scale-operations")
  ) {
    const primaryReason =
      answers.size === "solo" || answers.size === "small"
        ? "雖然總額最高 1,000 萬，但你的規模申請的是「單一企業最高 500 萬」區間。市場評估、通路談判、在地行銷全可申請。"
        : "你的規模剛好是這個補助的主力對象。從市場評估到據點設立，整條鏈都可以申請——聯合申請甚至能達到 1,000 萬。";

    return {
      primary: {
        subsidy: ma,
        reason: primaryReason,
      },
      secondary: [
        {
          subsidy: oe,
          reason: "參展也能幫助通路進入，展覽補助可同時疊加申請。",
        },
      ],
      verdict: "你的主力補助：海外市場布建補助",
    };
  }

  // 5) Optimizing without cost problem → fall back to market expansion
  if (answers.stage === "optimizing") {
    return {
      primary: {
        subsidy: ma,
        reason:
          "你已經在海外，但還想擴大市場或建立新據點——市場布建補助涵蓋品牌行銷、數位推廣、海外據點維運。",
      },
      secondary: [
        {
          subsidy: sc,
          reason: "如果未來面臨關稅或成本壓力，供應鏈支持方案也可以同步評估。",
        },
      ],
      verdict: "你的主力補助：海外市場布建補助",
    };
  }

  // 6) Generic fallback — market expansion + exhibition
  return {
    primary: {
      subsidy: ma,
      reason:
        "根據你的條件，市場布建補助覆蓋範圍最廣，大部分出海活動都能申請。",
    },
    secondary: [
      {
        subsidy: oe,
        reason: "展覽補助短期見效快，可作為第二順位同時申請。",
      },
    ],
    verdict: "最推薦：海外市場布建補助",
  };
}
