export type HomeHeroCopy = {
  readonly ariaLabel: string;
  readonly h1: string;
  readonly slides: readonly {
    readonly chipLabel: string;
    readonly titleLines: readonly [string, string];
    readonly subtitle: string;
    readonly primaryLabel: string;
    readonly secondaryLabel: string;
  }[];
};

export const homeHeroZh: HomeHeroCopy = {
  ariaLabel: "好產品值得一條順暢的出海路",
  h1: "協助台灣企業在北美與東南亞落地 — 鹿飛 LUFÉ",
  slides: [
    {
      chipLabel: "產品適配性",
      titleLines: ["協助台灣企業", "在北美與東南亞落地"],
      subtitle: "這個市場真的要你嗎？市場評估、產品測試、決策框架 — 先把勝率搞清楚",
      primaryLabel: "看真實案例",
      secondaryLabel: "先做 2 分鐘處境比對",
    },
    {
      chipLabel: "通路銷售力",
      titleLines: ["上得了架", "還要賣得動"],
      subtitle: "通路進入、展會佈局、數位集客 — 把產品放進對的通路，讓消費者找得到",
      primaryLabel: "看完整服務內容",
      secondaryLabel: "先做 2 分鐘處境比對",
    },
    {
      chipLabel: "基石 · 43 年國際物流",
      titleLines: ["真的跑過船的人，", "才懂出海的眉角"],
      subtitle: "出海不是報告寫得出來的。鹿飛站在躍馬企業 43 年的國際物流實戰上，幫你把產品適配跟通路銷售兩件事跑通",
      primaryLabel: "認識躍馬企業",
      secondaryLabel: "看完整服務內容",
    },
  ],
};
