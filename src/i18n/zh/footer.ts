export type FooterCopy = {
  readonly brandPrefix: string;
  readonly description: string;
  readonly servicesHeading: string;
  readonly serviceLinks: readonly string[];
  readonly casesAndInsightsHeading: string;
  readonly insightLinks: readonly string[];
  readonly resourcesHeading: string;
  readonly resourceLinks: readonly string[];
  readonly relatedBusinessesHeading: string;
  readonly partners: readonly { readonly name: string; readonly note: string }[];
  readonly contactHeading: string;
  readonly about: string;
  readonly contact: string;
  readonly contactLinks: readonly string[];
  readonly copyright: string;
};

export const footerZh: FooterCopy = {
  brandPrefix: "鹿飛 LUF",
  description: "協助台灣企業在北美與東南亞落地：市場探查、寄賣、公司落地到海外客服，一個窗口走完出海第一年。以躍馬企業 43 年國際物流為後盾",
  servicesHeading: "服務",
  serviceLinks: ["四章總覽", "市場探查", "寄賣", "公司落地", "海外客服", "北美通路", "運營優化", "鹿飛方法論"],
  casesAndInsightsHeading: "案例與洞察",
  insightLinks: ["案例", "洞察與指南"],
  resourcesHeading: "資源",
  resourceLinks: ["2 分鐘處境比對", "政府補助整理", "全部資源"],
  relatedBusinessesHeading: "相關企業",
  partners: [
    { name: "TradePilot", note: "線上報關工具" },
    { name: "躍馬企業", note: "國際物流・官網" },
  ],
  contactHeading: "聯絡",
  about: "關於我們",
  contact: "聯絡我們",
  contactLinks: ["合作夥伴聯繫"],
  copyright: "© 2026 鹿飛 LUFÉ — 版權所有",
};
