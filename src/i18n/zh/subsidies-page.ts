export type SubsidiesPageCopy = {
  readonly metadata: { readonly title: string; readonly description: string };
  readonly home: string;
  readonly resources: string;
  readonly breadcrumb: string;
  readonly hero: {
    readonly title: readonly [string, string];
    readonly leadStart: string;
    readonly northAmerica: string;
    readonly leadBetweenRegions: string;
    readonly southeastAsia: string;
    readonly leadAfterRegions: string;
    readonly leadBeforeCount: string;
    readonly count: string;
    readonly leadAfterCount: string;
  };
  readonly scrollCue: string;
  readonly agencies: { readonly tradeAlt: string; readonly ministryAria: string; readonly ministryName: string; readonly smeaAlt: string };
  readonly subsidyIntroHeading: readonly [string, string];
  readonly pillars: readonly { readonly title: string; readonly description: string }[];
  readonly plans: {
    readonly heading: readonly [string, string];
    readonly segmentedLabel: string;
    readonly compareAction: string;
    readonly amount: string;
    readonly timeline: string;
    readonly stage: string;
    readonly status: string;
    readonly suitable: string;
    readonly covers: string;
    readonly coversCount: string;
    readonly process: string;
    readonly processCount: string;
    readonly notes: string;
    readonly notesCount: string;
    readonly lufeAngle: string;
    readonly assessAction: string;
    readonly officialAnnouncement: string;
    readonly statuses: { readonly open: string; readonly pending: string; readonly closed: string };
  };
  readonly faqs: readonly { readonly question: string; readonly answer: string }[];
  readonly faqTitle: string;
  readonly faqAskLabel: string;
  readonly faqMoreLabel: string;
  readonly updates: { readonly title: string; readonly description: string; readonly action: string; readonly note: string; readonly href: string };
};

export const subsidiesPageZh: SubsidiesPageCopy = {
  metadata: {
    title: "2026 政府出海補助",
    description: "貿易署、經濟部、外貿協會——四個和出海直接相關的計畫，幫台灣企業降低出海成本。鹿飛整理的實戰版本，直接告訴你哪個適合你。",
  },
  home: "首頁",
  resources: "資源",
  breadcrumb: "2026 政府出海補助",
  hero: {
    title: ["政府在幫你出海，", "你知道怎麼拿嗎？"],
    leadStart: "貿易署、經濟部、中企署——每年都有上億元的預算在幫台灣企業進入",
    northAmerica: "北美",
    leadBetweenRegions: "和",
    southeastAsia: "東南亞",
    leadAfterRegions: "兩個主戰場。 但多數中小企業根本沒申請過，不是因為不符合資格，是因為不知道有這些計畫 我們替你整理了 ",
    leadBeforeCount: "",
    count: "4 個",
    leadAfterCount: "計畫",
  },
  scrollCue: "往下看",
  agencies: { tradeAlt: "經濟部國際貿易署", ministryAria: "經濟部", ministryName: "經濟部", smeaAlt: "經濟部中小及新創企業署" },
  subsidyIntroHeading: ["補助不是額外收入，是", "降低你出海的實際成本"],
  pillars: [
    { title: "錢是真的", description: "每年數億元的預算由貿易署、經濟部執行，不是畫大餅。重點是知道怎麼申請、寫對計畫書" },
    { title: "不只是申請表", description: "計畫書要和你的商業目標對齊，執行過程要有產出與報告。鹿飛的交付成果（如市場分析、KPI）正是結案常需要的資料" },
    { title: "可以疊加使用", description: "同一家公司可以同時申請不同計畫——例如用展覽補助去美國展，用市場布建補助建立當地通路" },
  ],
  plans: {
    heading: ["4 個計畫，對應你出海的", "不同階段"], segmentedLabel: "補助計畫", compareAction: "看重點 ↓", amount: "補助額度", timeline: "時程", stage: "適用階段", status: "狀態", suitable: "適合", covers: "補助涵蓋與費用明細", coversCount: " 項", process: "申請與核銷流程", processCount: " 步", notes: "容易踩雷的點", notesCount: " 點", lufeAngle: "鹿飛怎麼幫", assessAction: "查我是否符合 →", officialAnnouncement: "官方公告 ↗", statuses: { open: "開放申請中", pending: "等待公告", closed: "已截止" },
  },
  faqs: [
    { question: "鹿飛會幫我申請補助嗎？", answer: "我們不是代辦公司。但我們能幫你把「為什麼要出海、要去哪、要怎麼做」講清楚——這剛好就是計畫書的核心。我們的評估報告可以作為申請依據。" },
    { question: "我要自己寫計畫書嗎？", answer: "計畫書的主體要由你公司提出（這是規定）。但鹿飛會提供完整的市場分析、策略規劃與執行方案，讓你只要把內容整理成官方格式即可。" },
    { question: "可以同時申請多個計畫嗎？", answer: "可以。不同計畫針對不同用途，例如展覽補助不衝突海外通路布建補助。但同一筆費用不能重複請款，這是基本原則。" },
    { question: "申請通過率高嗎？", answer: "各計畫不同，但有策略、有數據、有明確商業目標的申請案明顯較容易過。鹿飛的產出剛好符合這三項——我們不會保證你一定拿到，但會把你的勝率拉到最高。" },
    { question: "如果我還沒開始出海，現在申請會不會太早？", answer: "第 4 項跨境電商輔導就是為你這種情況設計的——先用免費或低門檻的資源學；部分計畫需要小額自付或先墊款。等你有方向了再申請金額較大的計畫。" },
  ],
  faqTitle: "申請前你最可能想問的事",
  faqAskLabel: "直接問鹿飛 →",
  faqMoreLabel: "還有其他問題？",
  updates: {
    title: "補助一有更新，我們通知你",
    description: "每次有新計畫公告、金額加碼、截止日變動，鹿飛整理成一封信寄給你。不是每週轟炸，只在真的有事時才發",
    action: "訂閱補助快訊 →",
    note: "寄信到 aaron.yu@reborn.in · 隨時退訂",
    href: "mailto:aaron.yu@reborn.in?subject=%E8%A8%82%E9%96%B1%E8%A3%9C%E5%8A%A9%E5%BF%AB%E8%A8%8A&body=%E5%B8%8C%E6%9C%9B%E6%94%B6%E5%88%B0%E9%B9%BF%E9%A3%9B%E7%9A%84%E6%94%BF%E5%BA%9C%E5%87%BA%E6%B5%B7%E8%A3%9C%E5%8A%A9%E6%9B%B4%E6%96%B0%E9%80%9A%E7%9F%A5%EF%BC%9A%0A%0A%E5%85%AC%E5%8F%B8%EF%BC%9A%0A%E5%A7%93%E5%90%8D%EF%BC%9A%0A%E4%B8%BB%E8%A6%81%E5%B8%82%E5%A0%B4%EF%BC%88%E5%8C%97%E7%BE%8E%2F%E6%9D%B1%E5%8D%97%E4%BA%9E%EF%BC%89%EF%BC%9A%0A",
  },
};
