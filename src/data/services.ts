/** Shared three-pillar framing used by the services hub and methodology page. */

export type AccentColor = "sky" | "gold" | "ember";
export type PillarSlug = "fit" | "channel" | "team";

export interface PillarService {
  readonly title: string;
  readonly desc: string;
  readonly href?: string;
  readonly external?: boolean;
}

export interface Pillar {
  readonly slug: PillarSlug;
  readonly num: string;
  readonly accent: AccentColor;
  readonly title: string;
  readonly subtitle: string;
  readonly tagline: string;
  readonly description: string;
  readonly services: readonly PillarService[];
  readonly relatedStages: readonly string[];
}

export const PILLARS: Record<PillarSlug, Pillar> = {
  fit: {
    slug: "fit", num: "01", accent: "sky", title: "產品適配性", subtitle: "勝率", tagline: "這個市場真的要你嗎？",
    description: "市場評估、產品測試、決策框架——在你花大錢之前，先用數據搞清楚值不值得去。我們幫你回答：這個市場夠大嗎？你的產品打得過嗎？利潤撐得起成本嗎？",
    services: [
      { title: "市場機會評估", desc: "2–4 週內搞清楚市場規模、競爭密度、進入門檻、法規限制。", href: "/services/market-assessment" },
      { title: "小批量產品測試", desc: "讓真實消費者用錢投票，不靠問卷和主觀判斷。", href: "/services/product-testing" },
    ],
    relatedStages: ["market-assessment", "product-testing"],
  },
  channel: {
    slug: "channel", num: "02", accent: "gold", title: "通路銷售力", subtitle: "潛力", tagline: "上得了架，還要賣得動。",
    description: "通路進入、展會佈局、數位集客——把產品放進對的通路，並且讓消費者在對的時間找得到你。北美連鎖、東南亞零售、線上 AI 搜尋全覆蓋。",
    services: [
      { title: "通路進入與媒合", desc: "北美 Costco、Walmart、Amazon；東南亞連鎖與在地通路的直接對接關係。", href: "/services/channel-entry" },
      { title: "展會與加盟佈局", desc: "食品展、消費電子展、加盟展的策展協助與現場陪同。" },
      { title: "AI 集客引擎", desc: "SEO 文章月產 30 篇以上 + AI 搜尋引擎佈局（AIO），讓 ChatGPT、Perplexity 在回答相關問題時推薦你的品牌。自然流量平均成長 200%+。" },
    ],
    relatedStages: ["channel-entry"],
  },
  team: {
    slug: "team", num: "03", accent: "ember", title: "團隊體質", subtitle: "成功率", tagline: "進得去，還要留得下。",
    description: "海外落地、營運系統、AI 自動化——讓你不用親自飛過去也能把海外業務跑起來。團隊建置、流程數位化、AI 知識庫，三件事同時做。",
    services: [
      { title: "海外團隊建置與落地", desc: "當地 country manager 找人、日常營運陪跑、合規與稅務安排。", href: "/services/localization" },
      { title: "運營優化方案", desc: "已經在海外跑了一段時間、想把某一個環節做更好的進階方案。", href: "/services/optimize" },
      { title: "海外營運系統五階", desc: "從 Notion 任務管理、AI 複利知識庫、AI 數位員工、事業營運儀表板，到團隊創新共創 — 一套五階導入的營運作業系統，讓新人從 90 天縮到 1 天上手。" },
    ],
    relatedStages: ["localization"],
  },
};

export const PILLAR_ORDER: readonly PillarSlug[] = ["fit", "channel", "team"];

export function getPillar(slug: PillarSlug): Pillar {
  return PILLARS[slug];
}
