/**
 * Cases data layer. Lifted from CasesPage.tsx and expanded with:
 *  — key decisions (the reasoning, not just what happened)
 *  — stages used (links back to /services/[stage])
 *  — timeline events
 * Each case is its own /cases/[slug] route.
 */

import { CTA_LINE } from "./cta";

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
  /** A single chapter link that replaces the stage links for this chapter. */
  readonly link?: { readonly text: string; readonly href: string };
}

export interface CaseCta {
  /** [plain, gold] heading parts; defaults to the shared heading. */
  readonly heading?: readonly [string, string];
  readonly body: string;
  /** Small lines between body and buttons. */
  readonly notes?: string;
  /** Secondary /assess link label; defaults to the shared label. */
  readonly secondary?: string;
  /** Small line under the buttons. */
  readonly footnote?: string;
}

export interface CaseStudy {
  readonly slug: string;
  readonly tags: readonly CaseTag[];
  readonly industry: string;
  readonly market: string;
  readonly num: string;
  readonly title: string;
  readonly summary: string;
  /** Meta description when it should differ from the hero summary. */
  readonly metaDescription?: string;
  /** Label above the stats row; defaults to "成果". */
  readonly statsLabel?: string;
  /** Hard line break in the hero title after this phrase. */
  readonly titleBreakAfter?: string;
  /** Shorter summary for "更多案例" cards on other case pages; defaults to summary. */
  readonly cardSummary?: string;
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
  /** [plain, gold] timeline heading parts; defaults to the shared heading. */
  readonly timelineHeading?: readonly [string, string];
  readonly cta?: CaseCta;
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
    { label: "北美", variant: "gold" },
  ],
  industry: "personal-care",
  market: "north-america",
  num: "北美",
  title: "一塊台灣羊奶皂，怎麼讓北美買家看懂？",
  titleBreakAfter: "台灣羊奶皂，",
  summary: "產品本身沒有問題，卡住的是北美買家看不懂它。配方不動，改的是說法與標示，再帶進北美的量販通路。",
  heroImage: "/images/hero-video/case-soap-1600.webp",
  listImage: "/images/hero-video/case-soap-1600.webp",
  stats: [
    { label: "已進入北美的量販通路", value: "北美" },
    { label: "改的是說法與標示，不是產品", value: "配方不動" },
    { label: "宣稱範圍與包裝標示，依美國規定重新整理", value: "合規標示" },
  ],
  story: [
    {
      heading: "在台灣賣得好的皂，到了北美沒人看懂",
      paragraphs: [
        "這個台灣羊奶皂品牌，在台灣有自己的客人。想往北美走，卻發現北美買家拿起產品，看不出它跟架上其他的皂差在哪裡。",
        "問題不在產品，而在產品被介紹的方式。台灣客人熟悉的賣點與說法，到了北美不一定成立；包裝上的資訊，也不一定是當地買家要找的那幾行。",
      ],
      image: { src: "/images/cases/story/goat-soap-1-1600.webp", alt: "木桌上的手工羊奶皂", position: "center 75%" },
    },
    {
      heading: "先問兩件事：北美買家怎麼看羊奶皂，這塊皂在美國歸誰管",
      paragraphs: [
        "第一件是市場的事：同一個價位帶的皂，用什麼故事和宣稱說自己；「台灣手工」在北美的架上，是不是一個會讓人停下來的理由。",
        "第二件是規定的事。同樣一塊皂，在美國會因為說法不同，被歸到不同類：只講清潔的真皂，和強調保濕等效果的皂，由不同單位管理；講到治療，又是另一條路。說法一變，要走的路徑就跟著變。所以品牌想講的每一句話，都要先對照這個框架。",
      ],
      link: { text: "看北美通路怎麼走 →", href: "/services/north-america" },
    },
    {
      heading: "產品的核心不動，調整的是說法與標示",
      paragraphs: [
        "配方沒有動。改的是它被理解的方式：宣稱守在允許的範圍，講溫和、講成分，不講治療；包裝上的資訊，照北美買家拿起產品時要找的那幾行重新排。",
        "這一路上，北美的團隊在當地負責研究、送評與談判；我們在台灣當品牌的窗口，有事找同一個人。",
      ],
      image: { src: "/images/cases/story/goat-soap-2-1600.webp", alt: "包裝好的手工皂與牛皮紙標籤" },
    },
    {
      heading: "現在，這塊皂進了北美的量販通路",
      paragraphs: [
        "從台灣的櫃上到北美的貨架，配方一樣，換的是說法。",
        "不是每一支產品都該這樣走。有時候我們會建議你再等等，那也是一種答案。",
      ],
    },
  ],
  challenge: "產品本身沒有問題，卡住的是北美買家看不懂它。",
  approach: "配方不動，改的是說法與標示。",
  result: "這塊皂進了北美的量販通路。",
  stagesUsed: ["channel-entry"],
  keyDecisions: [],
  timeline: [
    { when: "第一步", title: "市場調研", desc: "北美買家怎麼看羊奶皂、同價位的皂用什麼故事與宣稱" },
    { when: "第二步", title: "法規盤點", desc: "這塊皂在美國歸哪一類、能講什麼、標示要寫什麼" },
    { when: "第三步", title: "說法與標示", desc: "宣稱範圍與包裝標示，依美國規定重新整理" },
    { when: "第四步", title: "進入通路", desc: "送評、談判，進北美的量販通路" },
  ],
  timelineHeading: ["這一案走的", "四步"],
  cta: {
    heading: ["你的產品，可能也卡在", "「別人看不懂」"],
    body: CTA_LINE,
  },
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
  summary: "原本以為是行銷問題，盤點後發現先要過的是法規與成分。我們先釐清 FDA 規範與成分調整點，再想清楚產品在美國該怎麼被介紹、包裝該怎麼改。",
  metaDescription: "原本以為是行銷問題，盤點後發現先要過的是法規與成分。一個台灣魚鬆品牌進美國的第一段：FDA 規範、成分調整點、產品怎麼被介紹、包裝怎麼改。",
  statsLabel: "交出來的",
  cardSummary: "先釐清 FDA 規範與成分、標示要調整的地方，再談包裝與上市。",
  heroImage: "/images/hero-video/case-floss-1600.webp",
  listImage: "/images/hero-video/case-floss-1600.webp",
  stats: [
    { label: "確認主管機關、水產品 HACCP 與進口要件", value: "FDA" },
    { label: "逐項對照成分，找出肉類原料、過敏原與色素的調整點", value: "配方" },
    { label: "依美國標示格式重新規劃", value: "包裝" },
  ],
  story: [
    {
      heading: "在台灣熟悉的魚鬆，到了美國是陌生的食物",
      paragraphs: [
        "這個台灣魚鬆品牌在國內有穩定的客群，想把以魚肉製成的魚鬆帶進美國市場。品牌最初的規劃很直接：找通路、做行銷、上架。",
        "但在美國消費者眼中，魚鬆是一個沒見過的品項：不知道它是什麼、怎麼吃、配什麼。更早浮上檯面的，是另一個問題——這罐產品，能不能合法進口。",
      ],
      image: { src: "/images/cases/story/fish-floss-1-1600.webp", alt: "市場攤位上的魚乾與蝦乾", position: "center 60%" },
    },
    {
      heading: "調研之後才發現：先要過的是法規這一關",
      paragraphs: [
        "我們從法規盤點開始。在美國，只用魚做的魚鬆由 FDA 管轄，屬於水產品：國外的加工廠必須符合水產品 HACCP 的規定，進口商也要依規定驗證這件事；工廠要完成食品設施登記，每一批貨進口前都要事先通報。乾燥的魚鬆要不要走低酸罐頭食品的程序，則看實測的水活性，不能用猜的。",
        "台灣常見的魚鬆配方，問題往往藏在成分表裡。只要混入一定比例的肉鬆，產品就改由美國農業部管轄，而台灣肉品輸美的資格受到嚴格限制；用到豬油這類豬肉來源的原料，也會碰上動物疫病相關的進口限制。",
        "醬油帶進黃豆與小麥，裹粉帶進小麥，芝麻帶進芝麻——這些都屬於美國規定必須標示的主要過敏原，魚本身也是，而且要寫明魚種；色素與防腐劑必須是美國允許使用的品項。我們把成分表逐項攤開，一項一項對照，才分得出哪裡要改配方、哪裡只要改標示。",
      ],
    },
    {
      heading: "產品該怎麼被介紹，要讓美國消費者說了算",
      paragraphs: [
        "法規路徑清楚之後，下一個問題是：美國人看到這罐東西，知不知道它是什麼、怎麼吃。",
        "名字是第一關。「Fish Floss」對多數美國消費者是陌生的詞；「flakes」又容易讓人想到魚飼料。比較好用的參照點，是他們已經認識的鹹香配料——魚鬆可以是撒在飯、蛋、沙拉上的 savory topping，而不只是配粥的傳統食品。哪個名字、哪一句說明最好懂，要拿給美國消費者實際試吃、實際看過才算數，不能在台灣猜。",
        "這也把兩條路攤在桌上：走亞裔超市，買家本來就認識魚鬆，競爭的是價格與既有的進口品牌；走主流通路，要重新命名、教吃法，但沒有直接競品。我們的工作，是讓品牌有依據地選，不是替它選。",
      ],
    },
    {
      heading: "包裝，照美國的閱讀方式重新規劃",
      paragraphs: [
        "美國的食品標示有固定的格式：品名要讓人看得懂產品是什麼，並寫明使用的魚種；淨重同時標示公制與英制；營養標示的份量依美國的規定計算；成分依含量排序，過敏原另外清楚列出，並標示原產地。",
        "包裝本身也要適應不同的用法與氣候：第一次接觸的產品，小份量比較好試，魚鬆又怕潮，可重複密封的小包裝比台灣常見的大罐更合理。英文品名搭配描述性的說明，例如寫明魚種的 shredded fish，再加一句怎麼吃，讓人第一眼就知道裡面是什麼、可以怎麼用。",
      ],
      image: { src: "/images/cases/story/fish-floss-2-1600.webp", alt: "尚未印刷的食品包裝袋" },
    },
    {
      heading: "先把路鋪平，再談上市",
      paragraphs: [
        "這個案子最先交出的，不是上架數字，而是一條清楚的進入美國路徑：哪些成分要調整、哪些只要改標示、哪些文件要備齊、包裝要怎麼改、產品要怎麼被介紹——整理到可以直接和進口商與通路談的程度。",
        "對想進美國的食品品牌來說，這一段做在前面，後面的每一步才不會重來。現在，這個品牌正帶著這份路徑和美國的主流通路洽談。",
        "如果盤點下來，配方要大改才進得去，我們也會直說。有時候我們會建議你再等等，那也是一種答案。",
      ],
      link: { text: "北美走另一條線，看「北美通路」怎麼做 →", href: "/services/north-america" },
    },
  ],
  challenge: "品牌原本規劃直接找通路做行銷，但產品能不能合法進口美國還沒確認，配方成分與標示也未對照美國規定，美國消費者更不認識這個品項。",
  approach: "先盤點 FDA 與進口規定、逐項對照成分，再以美國消費者的盲試吃與命名測試決定產品該怎麼被介紹，最後依美國標示格式與使用情境規劃包裝。",
  result: "一條可直接和進口商與通路談的進入美國路徑：成分調整、文件、包裝與產品說法。",
  stagesUsed: ["market-assessment", "product-testing", "channel-entry"],
  keyDecisions: [],
  timeline: [
    { when: "第一步", title: "法規盤點", desc: "確認主管機關、水產品 HACCP、設施登記、進口前通報與水活性" },
    { when: "第二步", title: "成分對照", desc: "逐項檢查肉類原料、豬油、過敏原、色素與防腐劑" },
    { when: "第三步", title: "消費者測試", desc: "用盲試吃與命名測試，確認美國消費者怎麼理解、會怎麼吃" },
    { when: "第四步", title: "包裝規劃", desc: "依美國標示格式規劃品名、營養標示、過敏原與小份量包裝" },
  ],
  timelineHeading: ["這個案子的", "四個步驟"],
  cta: {
    heading: ["你的產品，可能也卡在", "同一關"],
    body: CTA_LINE,
    secondary: "不確定像哪一個案例？先做 2 分鐘處境比對",
  },
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
  num: "十幾家",
  title: "一個手搖飲品牌，怎麼在菲律賓從零做到十幾家？",
  summary: "我們在菲律賓的當地夥伴從零做起的手搖飲品牌：從台灣茶出發，改成當地的口味與價格，先開第一家驗證，再開放加盟，現在十幾家。",
  heroImage: "/images/cases/detail/bubbletea-manila-hero-1080.webp",
  listImage: "/case-bubbletea.jpg",
  stats: [
    { label: "從第一家店開始，一路開到十幾家", value: "十幾家" },
    { label: "第一家站穩之後，才開放加盟", value: "開放加盟" },
    { label: "原料從台灣進口，口味與價格照當地調整", value: "台灣茶" },
  ],
  story: [
    {
      heading: "這不是我們幫別人做的案子，是合作夥伴自己做起來的",
      paragraphs: [
        "這個手搖飲品牌，是我們在菲律賓的當地夥伴從零做起來的。他們先在當地蓋了一間英語教育機構——招募師資、找場地、招第一個學生；後來也從零做起這個連鎖手搖飲品牌。",
        "我們把它放進案例，是因為台灣品牌在菲律賓落地時，陪在現場的就是這群人：他們自己開過第一家店、聘過第一批人，也自己決定過什麼時候該開放加盟。",
      ],
      image: { src: "/images/cases/story/bubble-tea-1-1600.webp", alt: "櫃檯上的珍珠奶茶" },
    },
    {
      heading: "市場上已經有國際品牌",
      paragraphs: [
        "進場的時候，當地手搖飲市場已經有國際品牌。一個新品牌要做的，不是跟它們比大，是找到自己的位置，還要守住配方。",
      ],
    },
    {
      heading: "從台灣茶出發，改成當地的口味與價格",
      paragraphs: [
        "產品的底是台灣茶，原料也從台灣進口。但口味和價格，照當地人的習慣重新調整——在台灣賣得好的那一杯，不一定是菲律賓人願意掏錢的那一杯。",
      ],
      image: { src: "/images/cases/story/bubble-tea-tasting-1600.webp", alt: "三杯不同口味的珍珠奶茶", position: "center 62%", aspect: "16/9" },
    },
    {
      heading: "先開一家驗證，再開放加盟",
      paragraphs: [
        "不是一開始就鋪點。先開第一家，確認口味、價格和營運都站得住，再開放加盟往外擴。現在這個品牌在菲律賓已經有十幾家店。",
        "我們帶台灣品牌進菲律賓，也是同樣的順序：先用市場探查問當地消費者，再用寄賣小量上架；站得住了，才談公司落地。",
      ],
      showStageLinks: true,
    },
  ],
  challenge: "當地手搖飲市場已有國際品牌，新品牌要找到自己的位置，還要守住配方。",
  approach: "從台灣茶出發、原料從台灣進口，口味與價格照當地調整；先開第一家驗證，再開放加盟。",
  result: "從零開始，現在在菲律賓已有十幾家店，並已開放加盟。",
  stagesUsed: ["localization"],
  keyDecisions: [],
  timeline: [],
  cta: {
    body: CTA_LINE,
    secondary: "還不確定？先做 2 分鐘處境比對",
  },
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
    headline: "配方不動，改的是說法與標示",
    painTitle: "在台灣賣得好的皂，到了北美沒人看懂",
    beats: [
      "這個台灣羊奶皂品牌，在台灣有自己的客人，想往北美走",
      "北美買家拿起產品，看不出它跟架上其他的皂差在哪裡",
      "宣稱守在允許的範圍，包裝上的資訊照北美買家要找的那幾行重新排",
      "這塊皂進了北美的量販通路",
    ],
  },
  "fish-floss-us-fda": {
    headline: "先過法規，再談包裝與上市",
    painTitle: "以為是行銷問題，其實先卡在法規與成分",
    beats: [
      "台灣魚鬆品牌想進美國，原本的規劃是直接找通路、做行銷",
      "調研發現產品要先過 FDA 這一關：台灣常見配方裡，有幾項成分、過敏原和色素的標示，到美國都要先調整",
      "逐項對照法規與成分，再用美國消費者的盲試吃與命名測試決定產品怎麼被介紹",
      "整理出可直接和進口商談的進入路徑，並依美國標示格式重新規劃包裝",
    ],
  },
  "bubble-tea": {
    headline: "先開一家驗證，再開放加盟",
    painTitle: "在台灣賣得好的那一杯，不一定是菲律賓人願意掏錢的那一杯",
    beats: [
      "我們在菲律賓的當地夥伴，先在當地做起一間英語教育機構，後來也從零做起一個手搖飲品牌",
      "進場時市場上已經有國際品牌，新品牌要找到自己的位置，還要守住配方",
      "產品的底是台灣茶、原料從台灣進口，口味與價格照當地習慣重新調整；先開第一家驗證，不急著鋪點",
      "第一家站穩之後才開放加盟，現在在菲律賓已經有十幾家店",
    ],
  },
};
