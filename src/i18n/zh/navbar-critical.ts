export type NavbarMenuKey = "services" | "advanced" | "cases" | "insights" | "about";

export type NavbarCriticalCopy = {
  readonly brandPrefix: string;
  readonly navItems: readonly { readonly key: NavbarMenuKey; readonly label: string }[];
  readonly messageBoxTrigger: string;
  readonly mobileCtaLine: string;
  readonly mobileCtaAction: string;
  readonly insightMenuLabels: {
    readonly byChapter: string;
    readonly toolsAndResources: string;
    readonly latestArticles: string;
  };
};

export const navbarCriticalZh: NavbarCriticalCopy = {
  brandPrefix: "鹿飛 LUF",
  navItems: [
    { key: "services", label: "服務" },
    { key: "advanced", label: "進階" },
    { key: "cases", label: "案例" },
    { key: "insights", label: "洞察" },
    { key: "about", label: "關於我們" },
  ],
  messageBoxTrigger: "聊聊你的產品 →",
  mobileCtaLine: "第一次談不收費",
  mobileCtaAction: "聊聊你的產品 →",
  insightMenuLabels: {
    byChapter: "依章節看文章",
    toolsAndResources: "工具與資源",
    latestArticles: "最新文章",
  },
};
