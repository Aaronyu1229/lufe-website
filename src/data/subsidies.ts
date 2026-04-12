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
    deadlineDate: "2026-09-30",
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
