/**
 * Cases data layer. Lifted from CasesPage.tsx and expanded with:
 *  — key decisions (the reasoning, not just what happened)
 *  — stages used (links back to /services/[stage])
 *  — timeline events
 * Each case is its own /cases/[slug] route.
 */

export type TagVariant = "sky" | "gold";
export type CaseStageSlug = "market-assessment" | "product-testing" | "channel-entry" | "localization";

export interface CaseTag {
  readonly label: string;
  readonly variant: TagVariant;
}

export interface CaseStat {
  readonly label: string;
  readonly value: string;
}

export interface KeyDecision {
  readonly moment: string;
  readonly options: readonly string[];
  readonly choice: string;
  readonly reasoning: string;
}

export interface TimelineEvent {
  readonly when: string;
  readonly title: string;
  readonly desc: string;
}

export interface StoryChapter {
  readonly heading: string;
  readonly paragraphs: readonly string[];
  readonly image?: {
    readonly src: string;
    readonly alt: string;
    readonly position?: string;
    readonly aspect?: "16/9";
  };
  readonly showStageLinks?: boolean;
}

export interface CaseStudy {
  readonly slug: string;
  readonly tags: readonly CaseTag[];
  readonly industry: string;
  readonly market: string;
  readonly num: string;
  readonly title: string;
  readonly summary: string;
  readonly heroImage: string;
  readonly listImage: string;
  readonly stats: readonly CaseStat[];
  readonly story: readonly StoryChapter[];
  readonly challenge: string;
  readonly approach: string;
  readonly result: string;
  readonly stagesUsed: readonly CaseStageSlug[];
  readonly keyDecisions: readonly KeyDecision[];
  readonly timeline: readonly TimelineEvent[];
  readonly quote?: {
    readonly text: string;
    readonly attribution: string;
  };
  readonly related: readonly string[];
}

export function isNumericValue(value: string): boolean {
  return /\d/.test(value);
}

/* ────────── Cases ────────── */

const goatMilkSoap: CaseStudy = {
  slug: "goat-milk-soap-global",
  tags: [
    { label: "美妝個護", variant: "sky" },
    { label: "全球", variant: "gold" },
  ],
  industry: "personal-care",
  market: "global",
  num: "全球",
  title: "一塊台灣羊奶皂，怎麼調整成全球都買得到？",
  summary: "產品本身沒有問題，卡住的是海外買家看不懂它。鹿飛協助品牌調整定位、包裝與說法，現在全球都買得到",
  heroImage: "/images/hero-video/case-soap-1600.webp",
  listImage: "/images/hero-video/case-soap-1600.webp",
  stats: [
    { label: "現在的銷售範圍", value: "全球" },
    { label: "品牌定位與溝通方式依市場調整", value: "重新定位" },
    { label: "依各市場的標示規定與閱讀習慣調整", value: "在地化包裝" },
  ],
  story: [
    {
      heading: "在台灣被認識的好皂，到了海外沒人看懂",
      paragraphs: [
        "這個台灣羊奶皂品牌，在國內已經累積穩定的口碑：配方溫和、做工扎實，回購的客人不少。品牌想走出台灣，卻發現海外買家拿起產品，看不出它和架上其他手工皂差在哪裡。",
        "問題不在產品，而在產品被介紹的方式。台灣消費者熟悉的賣點與說法，到了不同市場不一定成立；包裝上的資訊，也不一定是當地買家要找的那幾行。",
      ],
      image: { src: "/images/cases/story/goat-soap-1-1600.webp", alt: "木桌上的手工羊奶皂", position: "center 75%" },
    },
    {
      heading: "先弄清楚海外買家怎麼看羊奶皂",
      paragraphs: [
        "鹿飛從市場調研開始：目標市場的消費者怎麼理解「羊奶」這個成分、在意的是溫和、天然還是功效，同一個價位帶的競品又怎麼說自己的故事。",
        "調研同時盤點各市場的規定。同樣一塊皂，在不同市場可能被歸成不同的品項：在美國，只主打清潔的皂與強調保濕等功效的皂，由不同單位管理；在歐盟，皂屬於化妝品，上市前要指定當地的負責人並完成產品通報。說法一變，要準備的文件就跟著變。",
      ],
      showStageLinks: true,
    },
    {
      heading: "產品的核心不動，調整的是定位、包裝與說法",
      paragraphs: [
        "根據調研結果，品牌把重心放在「怎麼被看懂」：重新整理品牌定位，讓海外買家一眼知道這塊皂為誰而做；包裝改用當地買家熟悉的資訊順序，成分依國際通用的命名方式標示；產品說法對齊各市場允許的宣稱範圍。",
        "最後整理成一套可以帶進不同市場的品牌底稿，讓每一個新市場、每一位新的通路夥伴，講的都是同一個故事。",
      ],
      image: { src: "/images/cases/story/goat-soap-2-1600.webp", alt: "包裝好的手工皂與牛皮紙標籤" },
    },
    {
      heading: "現在，全球都買得到",
      paragraphs: [
        "調整後的品牌，一步步走進不同市場的通路。今天，這塊來自台灣的羊奶皂，在全球都買得到。",
        "這個案例走的是第二條路：產品的核心保留下來，改的是它被理解的方式。",
      ],
    },
  ],
  challenge: "產品在台灣口碑穩定，但海外買家看不出它的價值，各市場的品項歸類與標示規定也不同。",
  approach: "先調研海外買家怎麼理解羊奶皂與競品的說法，同步盤點各市場規定，再調整品牌定位、包裝與產品說法。",
  result: "整理出一套可帶進不同市場的品牌底稿，現在全球都買得到。",
  stagesUsed: ["market-assessment", "product-testing"],
  keyDecisions: [],
  timeline: [
    { when: "第一步", title: "市場調研", desc: "了解目標市場怎麼看羊奶皂、競品怎麼說自己的故事" },
    { when: "第二步", title: "法規盤點", desc: "確認各市場的品項歸類、標示規定與上市前要備齊的文件" },
    { when: "第三步", title: "品牌調整", desc: "定位、包裝資訊與產品說法依市場重新整理" },
    { when: "第四步", title: "進入市場", desc: "帶著同一套品牌底稿，逐一進入不同市場的通路" },
  ],
  related: ["fish-floss-us-fda", "bubble-tea"],
};

const fishFloss: CaseStudy = {
  slug: "fish-floss-us-fda",
  tags: [
    { label: "食品", variant: "sky" },
    { label: "美國", variant: "gold" },
  ],
  industry: "food",
  market: "north-america",
  num: "FDA",
  title: "台灣魚鬆想進美國，第一關卡在哪裡？",
  summary: "原本以為是行銷問題，調研後發現先要解決的是法規與成分。鹿飛協助品牌釐清 FDA 規範、透過美國消費者調研測試接受度，再重新規劃美國版包裝",
  heroImage: "/images/hero-video/case-floss-1600.webp",
  listImage: "/images/hero-video/case-floss-1600.webp",
  stats: [
    { label: "確認主管機關與進口要件", value: "FDA" },
    { label: "找出成分與過敏原的調整點", value: "配方" },
    { label: "依美國標示格式重新規劃", value: "包裝" },
  ],
  story: [
    {
      heading: "在台灣熟悉的魚鬆，到了美國是陌生的食物",
      paragraphs: [
        "這個台灣魚鬆品牌在國內有穩定的客群，想把產品帶進美國市場。品牌最初的規劃很直接：找通路、做行銷、上架。",
        "但在美國消費者眼中，魚鬆是一個沒見過的品項：不知道它是什麼、怎麼吃、配什麼。更早浮上檯面的，是另一個問題——這罐產品，能不能合法進口。",
      ],
      image: { src: "/images/cases/story/fish-floss-1-1600.webp", alt: "市場攤位上的魚乾與蝦乾", position: "center 60%" },
    },
    {
      heading: "調研之後才發現：先要過的是法規這一關",
      paragraphs: [
        "鹿飛從法規盤點開始。在美國，只用魚做的魚鬆由 FDA 管轄，屬於水產品：國外的加工廠必須符合水產品 HACCP 的規定，進口商也要能驗證這件事；工廠要完成食品設施登記，每一批貨進口前都要事先通報。",
        "台灣常見的魚鬆配方，問題往往藏在成分表裡。只要混入一定比例的肉鬆，產品就改由美國農業部管轄，而台灣肉品輸美的資格受到嚴格限制；用到豬油這類豬肉來源的原料，也會碰上動物疫病相關的進口限制。",
        "醬油帶進黃豆與小麥，芝麻帶進芝麻——這些都屬於美國規定必須標示的主要過敏原；色素與防腐劑也必須是美國允許使用的品項。每一項都要逐一對照，才知道配方哪裡要調整。",
      ],
      showStageLinks: true,
    },
    {
      heading: "用美國消費者的反應，測試產品該怎麼被介紹",
      paragraphs: [
        "法規路徑清楚之後，鹿飛透過調研測試美國消費者的接受度：第一次看到產品時怎麼理解它、願不願意試、會想把它用在哪裡。",
        "這些回饋，決定產品在美國要被當成什麼來介紹：是配飯配粥的傳統食品，還是可以撒在各種餐點上的鹹香配料。",
      ],
    },
    {
      heading: "包裝，照美國的閱讀方式重新設計",
      paragraphs: [
        "美國的食品標示有固定的格式：品名要讓人看得懂產品是什麼，並寫明使用的魚種；淨重同時標示公制與英制；營養標示的份量依美國的規定計算；成分依含量排序，過敏原另外清楚列出，並標示原產地。",
        "英文品名也是包裝的一部分。「Fish Floss」對多數美國消費者是陌生的詞，需要搭配描述性的說明，例如寫明魚種的 shredded fish，讓人第一眼就知道裡面是什麼。",
      ],
      image: { src: "/images/cases/story/fish-floss-2-1600.webp", alt: "尚未印刷的食品包裝袋" },
    },
    {
      heading: "先把路鋪平，再談上市",
      paragraphs: [
        "這個案子最先交出的，不是上架數字，而是一條清楚的進入美國路徑：哪些成分要調整、哪些文件要備齊、包裝要怎麼改、產品要怎麼被介紹。",
        "對想進美國的食品品牌來說，這一段做在前面，後面的每一步才不會重來。",
      ],
    },
  ],
  challenge: "品牌原本規劃直接找通路做行銷，但產品是否能合法進口美國還沒確認，配方成分與標示也未對照美國規定。",
  approach: "先盤點 FDA 與進口規定、逐項對照成分，再透過美國消費者調研測試產品該怎麼被介紹，最後依美國標示格式規劃包裝。",
  result: "整理出清楚的進入美國路徑：成分調整、文件、包裝與產品說法。",
  stagesUsed: ["market-assessment", "product-testing", "channel-entry"],
  keyDecisions: [],
  timeline: [
    { when: "第一步", title: "法規盤點", desc: "確認主管機關、水產品 HACCP、設施登記與進口前通報" },
    { when: "第二步", title: "成分對照", desc: "逐項檢查肉類原料、過敏原、色素與防腐劑" },
    { when: "第三步", title: "消費者調研", desc: "測試美國消費者怎麼理解產品、會怎麼吃" },
    { when: "第四步", title: "包裝規劃", desc: "依美國標示格式規劃品名、營養標示與過敏原" },
  ],
  related: ["goat-milk-soap-global", "bubble-tea"],
};

const bubbleTea: CaseStudy = {
  slug: "bubble-tea",
  tags: [
    { label: "飲品", variant: "sky" },
    { label: "東南亞", variant: "gold" },
  ],
  industry: "fnb",
  market: "sea",
  num: "10 家",
  title: "珍珠奶茶品牌怎麼在菲律賓成功落地？",
  summary: "從市場探索到門市營運，一年開設 10 家門市，建立穩定營收基地",
  heroImage: "/images/cases/detail/bubbletea-manila-hero-1080.webp",
  listImage: "/case-bubbletea.jpg",
  stats: [
    { label: "門市數", value: "10 家" },
    { label: "其中加盟", value: "6 家" },
    { label: "單店月營收", value: "1.2x" },
  ],
  story: [
    {
      heading: "第三次進馬尼拉，前兩次都敗在夥伴",
      paragraphs: [
        "這個台灣珍奶品牌想進入菲律賓，卻面臨多重挑戰：當地已有大量珍奶品牌，包括日出茶太、COCO、麥吉、Tiger Sugar；原物料供應鏈不穩定，加盟模式也水土不服。",
        "前兩次嘗試都因為找不到合適的在地夥伴而失敗——第一次被合資夥伴拿走了配方，第二次進了馬尼拉錯的區域。",
      ],
      image: { src: "/images/cases/story/bubble-tea-1-1600.webp", alt: "櫃檯上的珍珠奶茶" },
    },
    {
      heading: "先找機會點，再把市場上的奶茶全部攤開",
      paragraphs: [
        "進場之前，鹿飛先做機會點調研：馬尼拉的珍奶市場哪裡已經擠滿、哪裡還有空間。競品集中在低價帶，打不過日出茶太的規模；高端精品在馬尼拉又不夠大。",
        "接著把市場上買得到的奶茶全部收齊，用九宮格依價格帶與產品定位逐一歸位，看清每個品牌站在哪一格、哪幾格還空著。",
        "最關鍵的一步，是同一天的盲飲測試：拿掉所有品牌標示，請菲律賓消費者逐杯試飲、逐杯評分。沒有品牌光環，只剩口味本身。",
      ],
      image: { src: "/images/cases/story/bubble-tea-tasting-1600.webp", alt: "三杯不同口味的珍珠奶茶，等待試飲", position: "center 62%", aspect: "16/9" },
      showStageLinks: true,
    },
    {
      heading: "盲飲的答案：健康賽道，加上當地人愛的口味",
      paragraphs: [
        "盲飲與調研指向同一個方向：健康取向的珍奶，在馬尼拉還沒有品牌站穩。中高端價位帶 P150–200 競品少；消費者研究也顯示，當地消費者對「台灣正統」有明確的 premium 感知，願意多付 20–30% 換取品質保證。",
        "產品線依盲飲結果調整：走健康取向，口味貼近菲律賓消費者的偏好，並加入 ube 等在地特色口味。",
      ],
    },
    {
      heading: "第一家店開在 BGC，當成行銷投資",
      paragraphs: [
        "第二個月，透過鹿飛在馬尼拉的商會關係，從 6 組候選夥伴中篩選出 1 組可靠的合資夥伴。供應鏈同步建立：珍珠從台灣直送，茶葉在地採購。",
        "第三個月，首家店開在 BGC。BGC 是租金最貴的中央商業區，但客群精準、媒體曝光度最高；第一家店是招牌，也是未來加盟商的參考樣板。鹿飛說服品牌方把這筆租金當成行銷預算，而不是單店損益。",
      ],
    },
    {
      heading: "核心直營、外圍加盟",
      paragraphs: [
        "第四到第八個月，陸續開設 3 家直營門市，測試不同商圈。第六個月面臨擴張模式的選擇：純直營太慢、資本壓力大；純加盟品質容易失控。",
        "最終採用混合模式：核心商圈直營，保留樣板與定價權；外圍以加盟快速鋪點，並用「首年績效評核」機制，過濾想賺快錢的加盟商。",
      ],
    },
    {
      heading: "一年 10 家門市，單店營收是台灣的 1.2 倍",
      paragraphs: [
        "一年內開設 10 家門市，其中 6 家為加盟店。單店月均營收達到台灣門市的 1.2 倍，品牌在馬尼拉都會區建立了穩定的消費者基礎。",
        "目前正在評估擴展到宿霧與達沃市。",
      ],
    },
  ],
  challenge: "台灣珍奶品牌想進入菲律賓市場，但面臨多重挑戰：當地已有大量珍奶品牌（包括日出茶太、COCO、麥吉、Tiger Sugar 等）、原物料供應鏈不穩定、加盟模式水土不服。前兩次嘗試都因為找不到合適的在地夥伴而失敗——第一次被合資夥伴拿走了配方，第二次進了馬尼拉錯的區域。",
  approach: "鹿飛先做機會點調研，再收齊市場上所有奶茶用九宮格歸位，並以同一天、不看品牌的盲飲測試找出健康賽道與適合的口味。協助品牌找到可靠的在地合資夥伴、建立穩定的原物料供應鏈（珍珠從台灣直送，茶葉在地採購）。",
  result: "一年內成功開設 10 家門市，其中 6 家為加盟店。單店月均營收達到台灣門市的 1.2 倍，品牌在馬尼拉都會區建立了穩定的消費者基礎。目前正在評估擴展到宿霧與達沃市。",
  stagesUsed: ["market-assessment", "channel-entry", "localization"],
  keyDecisions: [
    {
      moment: "Month 1 — 中高端定位 vs 低價衝量？",
      options: [
        "跟進競品低價策略",
        "走中高端差異化定位",
        "高端精品路線",
      ],
      choice: "中高端差異化定位",
      reasoning: "低價帶競品太多，打不過日出茶太的規模；高端精品在馬尼拉市場不夠大。中高端價位帶（P150–200）競品少，盲飲也指向健康取向。消費者研究裡還有一個關鍵訊號：當地消費者對「台灣正統」有明確的 premium 感知，願意多付 20–30% 換品質保證。",
    },
    {
      moment: "Month 3 — 第一家店開在哪？",
      options: [
        "BGC（中央商業區，租金最貴但人流最穩）",
        "Makati（金融區，租金中上）",
        "Ortigas（中端商圈，租金合理）",
      ],
      choice: "BGC",
      reasoning: "第一家店是招牌，也是加盟商的參考樣板。BGC 雖然租金最貴但客群精準、媒體曝光度最高、未來吸引加盟商時「BGC 店」就是背書。這個成本我們說服品牌方把它當成行銷預算的一部分來看，不是單店損益。",
    },
    {
      moment: "Month 6 — 加盟擴張 vs 直營擴張？",
      options: [
        "繼續直營確保品質",
        "開放加盟快速擴張",
        "混合模式：核心商圈直營、外圍加盟",
      ],
      choice: "混合模式",
      reasoning: "純直營太慢、資本壓力大；純加盟品質失控。混合模式讓品牌在核心區保留樣板與定價權，外圍用加盟快速鋪貨。加盟合約用「首年績效評核」機制過濾想賺快錢的加盟商。",
    },
  ],
  timeline: [
    { when: "Month 1", title: "市場調研", desc: "機會點調研、九宮格盤點市場上所有奶茶、同一天盲飲測試" },
    { when: "Month 2", title: "找到合資夥伴", desc: "透過在地商會介紹，篩選 6 組候選夥伴，最終敲定 1 組" },
    { when: "Month 3", title: "首家 BGC 店開幕", desc: "作為品牌樣板店與加盟招商的活廣告" },
    { when: "Month 4–8", title: "直營擴張", desc: "陸續開設 3 家直營門市，測試不同商圈" },
    { when: "Month 9–12", title: "加盟開放", desc: "篩選加盟商，半年內新增 6 家加盟店" },
  ],
  related: ["goat-milk-soap-global", "fish-floss-us-fda"],
};

/* ────────── exports ────────── */

export const CASES: readonly CaseStudy[] = [goatMilkSoap, fishFloss, bubbleTea] as const;

export const CASE_SLUGS: readonly string[] = CASES.map((c) => c.slug);

export function getCase(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}

export function getRelatedCases(slug: string): readonly CaseStudy[] {
  const caseItem = getCase(slug);
  if (!caseItem) return [];
  return caseItem.related
    .map((relatedSlug) => getCase(relatedSlug))
    .filter((relatedCase): relatedCase is CaseStudy => relatedCase !== undefined);
}

export const INDUSTRIES = [
  { value: "all", label: "全部產業" },
  { value: "food", label: "食品" },
  { value: "personal-care", label: "美妝個護" },
  { value: "fnb", label: "餐飲飲品" },
] as const;

export const MARKETS = [
  { value: "all", label: "全部市場" },
  { value: "north-america", label: "北美" },
  { value: "sea", label: "東南亞" },
  { value: "global", label: "全球" },
] as const;

export type IndustryFilter = (typeof INDUSTRIES)[number]["value"];
export type MarketFilter = (typeof MARKETS)[number]["value"];

/* ────────── Card-level meta (for /cases list UI) ────────── */

export interface CaseCardMeta {
  readonly headline: string;
  readonly painTitle: string;
  readonly beats: readonly [string, string, string, string];
}

export const CASE_CARD_META: Record<string, CaseCardMeta> = {
  "goat-milk-soap-global": {
    headline: "重新定位之後，全球都買得到",
    painTitle: "產品在台灣口碑好，到了海外卻沒人看得懂",
    beats: [
      "台灣羊奶皂品牌在國內口碑穩定，想把產品帶到海外",
      "海外買家看不出它和其他手工皂的差別，各市場的品項歸類與標示規定也不一樣",
      "先調研海外買家怎麼看羊奶皂，再調整品牌定位、包裝與產品說法",
      "帶著同一套品牌底稿進入不同市場，現在全球都買得到",
    ],
  },
  "fish-floss-us-fda": {
    headline: "先過法規，再談包裝與上市",
    painTitle: "以為是行銷問題，其實先卡在法規與成分",
    beats: [
      "台灣魚鬆品牌想進美國，原本的規劃是直接找通路、做行銷",
      "調研發現產品歸 FDA 管轄，配方裡的肉鬆、豬油、過敏原與色素都可能過不了關",
      "逐項對照法規與成分，再透過美國消費者調研測試產品該怎麼被介紹",
      "整理出清楚的進入路徑，並依美國標示格式重新規劃包裝",
    ],
  },
  "bubble-tea": {
    headline: "一年 10 家店，單店超母店 1.2x",
    painTitle: "前兩次進菲律賓都失敗，一次被拿走配方、一次選錯區",
    beats: [
      "台灣珍奶第三次進馬尼拉，市場已被日出茶太、COCO、Tiger Sugar 佔住",
      "低價打不過規模、高端市場太窄、加盟合約怎麼寫都有被反吃掉的風險",
      "機會點調研、九宮格盤點全市場奶茶、盲飲找到健康賽道，再以 BGC 首店與直營加盟混合模式展店",
      "一年開 10 家店（含 6 家加盟）、單店月營收做到台灣母店的 1.2 倍",
    ],
  },
};
