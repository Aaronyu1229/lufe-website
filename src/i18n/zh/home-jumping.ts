export type HomeJumpingCopy = {
  readonly eyebrow: string;
  readonly title: readonly [string, string];
  readonly intro: string;
  readonly routeAriaLabel: string;
  readonly nodes: readonly { readonly title: string; readonly note: string }[];
  readonly jumping: { readonly title: string; readonly body: string };
  readonly lufe: { readonly title: string; readonly body: string };
  readonly primaryExit: string;
  readonly secondaryExit: string;
};

export const homeJumpingZh: HomeJumpingCopy = {
  eyebrow: "躍馬企業 × 鹿飛",
  title: ["從你的工廠，到菲律賓的貨架，", "是同一條路"],
  intro: "這條路的前半段，躍馬企業走了 43 年：500 多個出口案件，30 多個國家。看了這麼多年，我們最清楚貨櫃門打開之後，品牌會卡在哪裡。所以成立了鹿飛，專門處理貨到了之後的事。",
  routeAriaLabel: "從台灣到菲律賓的同一條路",
  nodes: [
    { title: "台灣出廠", note: "報關、文件" },
    { title: "裝櫃出港", note: "倉儲、併櫃" },
    { title: "海上", note: "海空運" },
    { title: "櫃門打開", note: "鹿飛從這裡開始" },
    { title: "市場探查", note: "第一個月" },
    { title: "寄賣", note: "第三個月" },
    { title: "公司落地", note: "第九個月" },
    { title: "海外客服", note: "之後的每一天" },
  ],
  jumping: { title: "躍馬企業 · 把貨送到", body: "報關、倉儲、海空運、最後一哩。貨怎麼過去、到岸成本大概多少，不用另外找人問。" },
  lufe: { title: "鹿飛 · 到了之後", body: "陪台灣品牌走完在菲律賓的第一年。這四步，就在下面。" },
  primaryExit: "往下看這四章 ↓",
  secondaryExit: "現在只需要把貨送出去？找躍馬企業 ↗",
};
