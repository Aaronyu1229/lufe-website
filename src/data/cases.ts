/**
 * Cases data layer. Lifted from CasesPage.tsx and expanded with:
 *  — key decisions (the reasoning, not just what happened)
 *  — stages used (links back to /services/[stage])
 *  — timeline events
 * Each case is its own /cases/[slug] route.
 */

import type { StageSlug } from "./services";

export type TagVariant = "sky" | "gold";

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
  readonly challenge: string;
  readonly approach: string;
  readonly result: string;
  readonly stagesUsed: readonly StageSlug[];
  readonly keyDecisions: readonly KeyDecision[];
  readonly timeline: readonly TimelineEvent[];
  readonly quote?: {
    readonly text: string;
    readonly attribution: string;
  };
  readonly related: readonly string[];
}

/* ────────── Case: Costco Health ────────── */

const costcoHealth: CaseStudy = {
  slug: "costco-health",
  tags: [
    { label: "食品", variant: "sky" },
    { label: "北美", variant: "gold" },
  ],
  industry: "food",
  market: "north-america",
  num: "6 個月",
  title: "保健品怎麼從台灣走進北美 Costco？",
  summary:
    "從 FDA 註冊到通路談判，6 個月打進全球最大會員制零售通路。完整走過評估、測試、通路進入的每一步。",
  heroImage: "/images/cases/detail/costco-health-hero.jpg",
  listImage: "/case-costco.jpg",
  stats: [
    { label: "上架時間", value: "6 個月" },
    { label: "首月超標", value: "+40%" },
    { label: "覆蓋門市", value: "120+" },
  ],
  challenge:
    "小山羊保健品在台灣已有穩定市場，但北美市場完全陌生：FDA 註冊流程繁複、Costco 的供應商門檻極高、產品包裝與成分標示需全面合規。過去嘗試過找貿易商，但對方只處理物流，品牌在通路端完全沒有話語權。第二次嘗試找顧問，對方只給了一份 80 頁的市場報告，沒有任何執行。",
  approach:
    "鹿飛從市場評估開始，先確認北美保健品市場的需求缺口與 Costco 會員的消費偏好。同步進行產品配方微調以符合 FDA 要求、包裝在地化設計、並透過既有通路關係直接對接 Costco 採購團隊。小批量測試反饋良好後，快速進入正式上架流程。",
  result:
    "從啟動到產品正式在北美 Costco 門市上架，前後僅花 6 個月。首月銷量超過預期 40%，品牌知名度在北美華人社群迅速擴散。目前已進入第二批訂單，並開始洽談加拿大 Costco。",
  stagesUsed: ["market-assessment", "product-testing", "channel-entry"],
  keyDecisions: [
    {
      moment: "Week 3 — 要不要為 Costco 專門修改配方？",
      options: [
        "維持台灣版配方，直接送 FDA 註冊",
        "針對北美消費者口感偏好調整配方",
        "推出兩個版本：台灣原味 + 北美版",
      ],
      choice: "針對北美消費者口感偏好調整配方",
      reasoning:
        "消費者測試顯示台灣原味的甜度偏低，北美使用者普遍反映「不夠味」。雖然調整配方會多花 3 週認證時間，但我們判斷這是通路採購最在意的點——如果首月數據不漂亮，Costco 會直接砍掉供應商資格。與其搶 3 週，不如用對配方。",
    },
    {
      moment: "Month 2 — Costco 合約條件要不要接受？",
      options: [
        "接受原合約（含 60 天付款週期與 5% 行銷分攤）",
        "談判付款週期到 45 天",
        "退回 Amazon 自營",
      ],
      choice: "談判付款週期到 45 天，接受 5% 行銷分攤",
      reasoning:
        "60 天付款週期會壓垮客戶的現金流，但 5% 行銷分攤在 Costco 算是業界標準。我們用「首批訂單保證交期」作為籌碼，換到 45 天條款。這個差距讓客戶未來 12 個月少借了 800 萬週轉金。",
    },
    {
      moment: "Month 5 — 首批出貨遇到美西港口塞港怎麼辦？",
      options: [
        "延遲上架日期",
        "空運補救，吃掉部分毛利",
        "切換到美東港口重新安排物流",
      ],
      choice: "空運補救，吃掉部分毛利",
      reasoning:
        "Costco 的上架日期是合約級承諾，延遲會影響往後所有合作機會。切換美東會延遲 2 週。空運毛利損失約 6%，但保住了「第一次合作就準時」的信任資本——這個資本對第二批訂單的談判價值遠高於 6% 毛利。",
    },
  ],
  timeline: [
    {
      when: "Month 1",
      title: "市場評估啟動",
      desc: "完成北美保健品市場分析與 Costco 採購決策流程研究",
    },
    {
      when: "Month 2",
      title: "產品配方調整 + FDA 註冊",
      desc: "配方微調、設施登記、標示在地化同步進行",
    },
    {
      when: "Month 3",
      title: "小批量測試",
      desc: "先在亞馬遜投放 500 件測試消費者反應，數據優於預期",
    },
    {
      when: "Month 4",
      title: "Costco 採購對接",
      desc: "透過既有關係直接進入 Costco 採購評估流程",
    },
    {
      when: "Month 5",
      title: "合約談判與首批訂單",
      desc: "合約簽訂、首批訂單執行、物流規劃（含空運補救）",
    },
    {
      when: "Month 6",
      title: "正式上架",
      desc: "北美 120+ 家 Costco 門市同步上架，首月銷量超標 40%",
    },
  ],
  quote: {
    text: "Aaron 的團隊幫我們在 6 個月內把產品從台灣帶進 Costco。從合規到通路，全程不用我們操心。最讓我佩服的是，他們願意為了首批準時而自掏腰包空運——那個判斷力不是一般顧問做得到的。",
    attribution: "陳先生 — 保健品品牌負責人",
  },
  related: ["electronics-tariff", "bubble-tea"],
};

/* ────────── Case: Electronics Tariff ────────── */

const electronicsTariff: CaseStudy = {
  slug: "electronics-tariff",
  tags: [
    { label: "電子", variant: "sky" },
    { label: "美國", variant: "gold" },
  ],
  industry: "electronics",
  market: "north-america",
  num: "-15%",
  title: "電子大廠怎麼靠產地轉移省下關稅？",
  summary: "從大陸轉越南出貨，找到中美關稅戰中的最優路徑。年省 200 萬美金。",
  heroImage: "/images/cases/detail/electronics-tariff-hero.jpg",
  listImage: "/case-electronics.jpg",
  stats: [
    { label: "關稅降低", value: "-15%" },
    { label: "時效縮短", value: "3 天" },
    { label: "年省成本", value: "$200萬" },
  ],
  challenge:
    "中美貿易戰讓這家電子大廠的美國出貨成本暴增，25% 的額外關稅直接吃掉利潤。工廠在大陸，客戶在美國，短期內無法完全搬遷產線。客戶給出的降價要求已經讓毛利變負，再不動就要流失訂單。時間壓力極大，幾乎沒有 6 個月以上的緩衝期。",
  approach:
    "鹿飛團隊先盤點所有可行的產地轉移方案（越南、印度、墨西哥、馬來西亞），從成本、時效、風險三個維度打分。最終建議將部分組裝線移至越南，利用 CPTPP 框架降低關稅負擔。同時重新規劃物流路線，從越南直接出貨到美國西岸港口，減少中轉環節。",
  result:
    "整體關稅成本降低 15%，物流時效反而縮短了 3 天。越南產線在 4 個月內完成設置並通過客戶驗廠。年節省成本超過 USD 200 萬。客戶的美國訂單不但保住，還因為交期優勢拿到了新的 SKU。",
  stagesUsed: ["market-assessment", "channel-entry"],
  keyDecisions: [
    {
      moment: "Week 2 — 越南 vs 墨西哥？",
      options: [
        "越南：成熟的供應鏈，但進美國需要 15 天海運",
        "墨西哥：USMCA 免關稅，但當地勞動力成本高",
        "印度：長期潛力，但基礎設施不成熟",
      ],
      choice: "越南",
      reasoning:
        "墨西哥雖然免關稅，但客戶需要的元件在當地供應鏈不足，等於要拉整條供應鏈過去。印度太慢、風險太高。越南雖然海運略長，但可以靠直飛美西縮短整體時程，加上既有的組件廠生態，轉移成本最低。",
    },
    {
      moment: "Month 2 — 要不要同時運兩條線？",
      options: [
        "完全切換到越南",
        "台灣 + 越南雙線並行 6 個月作為緩衝",
        "逐步轉移，每月遷移 20% 產能",
      ],
      choice: "雙線並行 6 個月",
      reasoning:
        "完全切換有交期風險——越南新廠良率不穩定時，客戶訂單就會斷。雙線並行雖然短期成本高，但提供了「任一條出問題都有 backup」的保險。6 個月之後越南廠驗證完成，再關閉大陸線。這個保守選擇事後證明救了命——越南廠第 3 個月確實出現一次品質事故。",
    },
  ],
  timeline: [
    {
      when: "Month 1",
      title: "評估與方案比較",
      desc: "四個候選地點從成本、時效、風險三維度打分，鎖定越南",
    },
    {
      when: "Month 2",
      title: "越南廠建置啟動",
      desc: "選址、設備進駐、關鍵人員從大陸派駐",
    },
    {
      when: "Month 3",
      title: "試產與客戶驗廠",
      desc: "首批試產完成，客戶實地驗廠通過",
    },
    {
      when: "Month 4",
      title: "正式量產",
      desc: "越南線正式量產，雙線並行模式啟動",
    },
  ],
  related: ["costco-health", "shoe-brand"],
};

/* ────────── Case: Shoe Brand Pivot ────────── */

const shoeBrand: CaseStudy = {
  slug: "shoe-brand",
  tags: [
    { label: "服飾", variant: "sky" },
    { label: "美國", variant: "gold" },
  ],
  industry: "apparel",
  market: "north-america",
  num: "3x",
  title: "知名皮鞋品牌為什麼改賣襪子大賺？",
  summary: "分析亞馬遜數據後調整品類策略，找到高毛利藍海品項。三個月做到三倍營收。",
  heroImage: "/images/cases/detail/shoe-brand-hero.jpg",
  listImage: "/case-shoes.jpg",
  stats: [
    { label: "營收成長", value: "3x" },
    { label: "退貨率", value: "2%" },
    { label: "品牌評分", value: "4.7★" },
  ],
  challenge:
    "這家台灣皮鞋品牌在國內市場穩定，但想進入美國市場時發現：皮鞋品類在亞馬遜上競爭極為激烈，前 20 名賣家都是知名國際品牌，且皮鞋的退貨率高達 30%（尺寸問題）。品牌投入了 200 萬台幣的行銷預算，半年只換回 50 萬營收，完全不成比例。",
  approach:
    "鹿飛深入分析亞馬遜品類數據後發現，該品牌的「機能襪」（原本只是搭配商品）搜索量高但競品少、退貨率極低、平均售價 $15–$25 美金落在良好價帶。建議品牌以襪子品項作為切入點，先建立品牌認知和好評基礎，累積 4★+ 評價後再導流到皮鞋主力品類。",
  result:
    "襪子品類上線三個月內，營收達到皮鞋品類的 3 倍，退貨率僅 2%。品牌 review 迅速累積至 4.7 星，為後續皮鞋品類上架建立了強大的品牌信任基礎。第六個月皮鞋銷量也因為品牌認知累積而成長 120%。",
  stagesUsed: ["market-assessment", "product-testing"],
  keyDecisions: [
    {
      moment: "Week 2 — 品牌方一開始堅持先推皮鞋",
      options: [
        "尊重品牌意願先推皮鞋",
        "用數據說服轉向襪子",
        "同時推兩個品類",
      ],
      choice: "用數據說服轉向襪子",
      reasoning:
        "品牌的情感反應是「我們叫某某鞋業，不賣襪子很奇怪」。但資料顯示皮鞋的 CAC 是襪子的 4.2 倍，而襪子的 LTV 反而更高（回購率高）。我們花了一次兩小時的會議把數字攤在桌上，最後品牌方同意「先用襪子賺到進場票」。",
    },
    {
      moment: "Month 2 — 要不要降價衝銷量？",
      options: [
        "降價 20% 衝銷量",
        "維持價格，加強 listing 優化",
        "推出組合包提升 AOV",
      ],
      choice: "維持價格，加強 listing 優化 + 推出組合包",
      reasoning:
        "襪子的平均售價已經在競品低位，再降會進入血海。我們的判斷是：問題不在價格，在產品頁的說服力。優化 listing + 組合包提升 AOV 效果更好，毛利也保住了。",
    },
  ],
  timeline: [
    {
      when: "Week 1–2",
      title: "品類分析",
      desc: "深度分析亞馬遜襪子、皮鞋兩個品類的數據",
    },
    {
      when: "Week 3",
      title: "品牌決策會議",
      desc: "說服品牌方接受「先襪子後皮鞋」策略",
    },
    {
      when: "Month 2",
      title: "襪子上架",
      desc: "首批襪子正式上架，搭配優化後的 listing",
    },
    {
      when: "Month 3",
      title: "口碑與銷量起飛",
      desc: "4.7 星評價累積，月銷售達皮鞋品類的 3 倍",
    },
  ],
  related: ["costco-health", "bubble-tea"],
};

/* ────────── Case: Bubble Tea Manila ────────── */

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
  summary: "從市場探索到門市營運，一年開設 10 家門市，建立穩定營收基地。",
  heroImage: "/images/cases/detail/bubbletea-manila-hero.jpg",
  listImage: "/case-bubbletea.jpg",
  stats: [
    { label: "門市數", value: "10 家" },
    { label: "其中加盟", value: "6 家" },
    { label: "單店月營收", value: "1.2x" },
  ],
  challenge:
    "台灣珍奶品牌想進入菲律賓市場，但面臨多重挑戰：當地已有大量珍奶品牌（包括日出茶太、COCO、麥吉、Tiger Sugar 等）、原物料供應鏈不穩定、加盟模式水土不服。前兩次嘗試都因為找不到合適的在地夥伴而失敗——第一次被合資夥伴拿走了配方，第二次進了馬尼拉錯的區域。",
  approach:
    "鹿飛先做了菲律賓珍奶市場的深度調研，發現中高端定位（價位帶 P150–200）仍有空間，競品集中在低價帶。協助品牌找到可靠的在地合資夥伴（透過我們在馬尼拉的商會關係直接介紹），建立穩定的原物料供應鏈（珍珠從台灣直送，茶葉在地採購），並設計了適合菲律賓消費習慣的產品線（甜度偏高、加入在地特色口味如 ube）。",
  result:
    "一年內成功開設 10 家門市，其中 6 家為加盟店。單店月均營收達到台灣門市的 1.2 倍，品牌在馬尼拉都會區建立了穩定的消費者基礎。目前正在評估擴展到宿霧與達沃市。",
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
      reasoning:
        "低價帶競品太多，打不過日出茶太的規模；高端精品在馬尼拉市場不夠大。中高端價位帶（P150–200）競品少，同時符合目標客群（25–35 歲白領）的消費能力。我們在消費者研究裡找到一個關鍵訊號：這個客群對「台灣正統」有明確的 premium 感知，願意多付 20–30% 換品質保證。",
    },
    {
      moment: "Month 3 — 第一家店開在哪？",
      options: [
        "BGC（中央商業區，租金最貴但人流最穩）",
        "Makati（金融區，租金中上）",
        "Ortigas（中端商圈，租金合理）",
      ],
      choice: "BGC",
      reasoning:
        "第一家店是招牌，也是加盟商的參考樣板。BGC 雖然租金最貴但客群精準、媒體曝光度最高、未來吸引加盟商時「BGC 店」就是背書。這個成本我們說服品牌方把它當成行銷預算的一部分來看，不是單店損益。",
    },
    {
      moment: "Month 6 — 加盟擴張 vs 直營擴張？",
      options: [
        "繼續直營確保品質",
        "開放加盟快速擴張",
        "混合模式：核心商圈直營、外圍加盟",
      ],
      choice: "混合模式",
      reasoning:
        "純直營太慢、資本壓力大；純加盟品質失控。混合模式讓品牌在核心區保留樣板與定價權，外圍用加盟快速鋪貨。加盟合約用「首年績效評核」機制過濾想賺快錢的加盟商。",
    },
  ],
  timeline: [
    {
      when: "Month 1",
      title: "市場調研",
      desc: "菲律賓珍奶市場 + 競品 + 消費者行為深度研究",
    },
    {
      when: "Month 2",
      title: "找到合資夥伴",
      desc: "透過在地商會介紹，篩選 6 組候選夥伴，最終敲定 1 組",
    },
    {
      when: "Month 3",
      title: "首家 BGC 店開幕",
      desc: "作為品牌樣板店與加盟招商的活廣告",
    },
    {
      when: "Month 4–8",
      title: "直營擴張",
      desc: "陸續開設 3 家直營門市，測試不同商圈",
    },
    {
      when: "Month 9–12",
      title: "加盟開放",
      desc: "篩選加盟商，半年內新增 6 家加盟店",
    },
  ],
  related: ["costco-health", "electronics-tariff"],
};

/* ────────── exports ────────── */

export const CASES: readonly CaseStudy[] = [
  costcoHealth,
  electronicsTariff,
  shoeBrand,
  bubbleTea,
] as const;

export const CASE_SLUGS: readonly string[] = CASES.map((c) => c.slug);

export function getCase(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}

export function getRelatedCases(slug: string): readonly CaseStudy[] {
  const c = getCase(slug);
  if (!c) return [];
  return c.related
    .map((s) => getCase(s))
    .filter((c): c is CaseStudy => c !== undefined);
}

export const INDUSTRIES = [
  { value: "all", label: "全部產業" },
  { value: "food", label: "食品保健" },
  { value: "electronics", label: "電子產品" },
  { value: "apparel", label: "服飾配件" },
  { value: "fnb", label: "餐飲飲品" },
] as const;

export const MARKETS = [
  { value: "all", label: "全部市場" },
  { value: "north-america", label: "北美" },
  { value: "sea", label: "東南亞" },
] as const;

export type IndustryFilter = (typeof INDUSTRIES)[number]["value"];
export type MarketFilter = (typeof MARKETS)[number]["value"];
