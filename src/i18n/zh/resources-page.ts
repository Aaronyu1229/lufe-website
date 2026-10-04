export type ResourcesPageCopy = {
  readonly metadata: { readonly title: string; readonly description: string };
  readonly home: string;
  readonly breadcrumb: string;
  readonly title: readonly [string, string];
  readonly lead: string;
  readonly scrollCue: string;
  readonly subsidies: {
    readonly heading: string;
    readonly lead: string;
    readonly columns: readonly [string, string, string, string, string];
    readonly action: string;
  };
  readonly explore: {
    readonly heading: readonly [string, string];
    readonly items: readonly {
      readonly href: string;
      readonly eyebrow: string;
      readonly title: string;
      readonly description: string;
      readonly action: string;
      readonly external?: boolean;
      readonly externalAriaLabel?: string;
    }[];
  };
};

export const resourcesPageZh: ResourcesPageCopy = {
  metadata: {
    title: "資源 · 出海補助與工具",
    description: "正在開放的政府出海補助、案例、實務文章與比對工具——一個入口看完所有可以幫你出海的資源。",
  },
  home: "首頁",
  breadcrumb: "資源",
  title: ["出海資源中心，", "補助與工具一次看完"],
  lead: "政府出海補助協助降低成本，案例、文章與比對工具提供判斷依據。每一項都能直接銜接鹿飛的服務",
  scrollCue: "往下看",
  subsidies: {
    heading: "政府出海補助",
    lead: "貿易署、經濟部、中企署的出海相關計畫，鹿飛整理成適用對象、補助範圍與申請重點",
    columns: ["編號", "計畫", "主管機關", "額度", "時程"],
    action: "看完整補助整理 →",
  },
  explore: {
    heading: ["做決定之前，", "還可以先看這些"],
    items: [
      { href: "/cases", eyebrow: "案例", title: "實際做過的案子", description: "每個案例的完整過程：卡在哪、怎麼判斷、後來怎麼走", action: "看案例 →" },
      { href: "/insights", eyebrow: "洞察與指南", title: "市場與法規的實務文章", description: "依出海階段整理的分析與實務指南", action: "讀文章 →" },
      { href: "/assess", eyebrow: "處境比對", title: "2 分鐘找到最像你的案例", description: "三個問題，比對我們參與過的案例與當時的判斷方法", action: "開始比對 →" },
      { href: "https://tradepiloter.com", eyebrow: "TradePilot", title: "線上關稅查詢工具", description: "鹿飛自主開發，出口前先把稅則查清楚", action: "前往 TradePilot ↗", external: true, externalAriaLabel: "前往 TradePilot（另開新分頁）" },
    ],
  },
};
