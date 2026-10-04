export type HomeSubsidyAlertCopy = {
  readonly ariaLabel: string;
  readonly marketExpansion: { readonly badge: string; readonly title: string; readonly description: string };
  readonly ecommerce: { readonly badge: string; readonly title: string; readonly description: string };
  readonly verifiedPrefix: string;
  readonly primaryCta: string;
  readonly secondaryCta: string;
};

export const homeSubsidyAlertZh: HomeSubsidyAlertCopy = {
  ariaLabel: "限期政府補助加碼",
  marketExpansion: {
    badge: "受理中",
    title: "海外通路布建補助 2026/10/30 18:00 截止",
    description: "單家最高 500 萬，聯合申請最高 2,000 萬，或經費用罄即止",
  },
  ecommerce: {
    badge: "買主直達",
    title: "買主直達受理至 2027/9/15",
    description: "邀海外買主來台洽談採購，每家最高 20 萬，或經費用罄即止",
  },
  verifiedPrefix: "資料確認：",
  primaryCta: "看申請細節",
  secondaryCta: "或先做 2 分鐘處境比對",
};
