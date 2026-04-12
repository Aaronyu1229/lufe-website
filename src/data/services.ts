/**
 * Services data layer.
 * Single source of truth for all 4 stage sub-pages, the optimize page, and the
 * methodology page. Each stage sub-page imports its entry from STAGES and
 * renders via <StagePage />.
 */

export type StageSlug =
  | "market-assessment"
  | "product-testing"
  | "channel-entry"
  | "localization";

export type AccentColor = "sky" | "gold" | "ember";

export interface ProcessWeek {
  readonly week: string;
  readonly title: string;
  readonly items: readonly string[];
}

export interface DeliverableItem {
  readonly title: string;
  readonly desc: string;
}

export interface ReadinessSign {
  readonly positive: boolean;
  readonly text: string;
}

export interface RedFlag {
  readonly title: string;
  readonly desc: string;
}

export interface StageFAQ {
  readonly q: string;
  readonly a: string;
}

export interface Stage {
  readonly slug: StageSlug;
  readonly num: string;
  readonly accent: AccentColor;
  readonly title: string;
  readonly subtitle: string;
  readonly timeline: string;
  readonly heroLine: string;
  readonly purpose: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly outcomes: readonly string[];
  readonly deliverables: readonly DeliverableItem[];
  readonly process: readonly ProcessWeek[];
  readonly readiness: readonly ReadinessSign[];
  readonly redFlags: readonly RedFlag[];
  readonly faqs: readonly StageFAQ[];
  readonly relatedCaseSlug: string;
  readonly prevSlug?: StageSlug;
  readonly nextSlug?: StageSlug;
}

/* ────────── 01 Market Assessment ────────── */

const marketAssessment: Stage = {
  slug: "market-assessment",
  num: "01",
  accent: "sky",
  title: "市場評估",
  subtitle: "在你花大錢之前，先花小錢搞清楚",
  timeline: "2–4 週",
  heroLine: "值不值得去，是可以算得出來的。",
  purpose:
    "多數企業跨境失敗不是因為產品不好，而是因為沒把「值不值得去」這件事算清楚就上路。這個階段我們用數據回答五個問題：這個市場夠大嗎？門檻夠低嗎？你打得過競爭嗎？利潤撐得起成本嗎？法規允許嗎？",
  image: "/images/services/stage-01-map-assess.jpg",
  imageAlt: "古地圖與羅盤 — 探索新市場的起點",
  outcomes: [
    "一份明確的 Go / No-Go 建議，附上數據來源",
    "目標市場的需求缺口與競爭密度地圖",
    "進入該市場的合規與認證清單（含成本估算）",
    "預估的到岸成本結構與毛利空間",
    "如果不進，什麼條件改變後可以再考慮",
  ],
  deliverables: [
    {
      title: "市場機會評估報告",
      desc: "30–50 頁，涵蓋市場規模、競品分析、定位建議、進入門檻。資料來源都可追溯。",
    },
    {
      title: "Go / No-Go 決策摘要",
      desc: "一頁 A4 給你高層開會用的結論版，含五維評分矩陣。",
    },
    {
      title: "成本結構試算表",
      desc: "從工廠到貨架的每一筆成本，包含關稅、物流、通路佣金、合規支出。",
    },
    {
      title: "下一步行動建議",
      desc: "如果 Go：列出接下來 3 個月的關鍵任務。如果 No-Go：列出 6–12 個月後可重新評估的觸發條件。",
    },
  ],
  process: [
    {
      week: "Week 1",
      title: "需求訪談 + 資料蒐集",
      items: [
        "與你的團隊 1–2 次深度訪談，釐清目標與現有資源",
        "蒐集目標市場的公開數據、進口紀錄、競品 listing",
        "盤點你現有產品的規格、成本、認證狀態",
      ],
    },
    {
      week: "Week 2",
      title: "市場結構與競品分析",
      items: [
        "建立目標市場的需求與供給圖",
        "Top 10 競品的定價、通路、賣點拆解",
        "初步識別差異化切入點",
      ],
    },
    {
      week: "Week 3",
      title: "合規與成本試算",
      items: [
        "法規盤點：認證、標示、進口限制",
        "到岸成本試算（FOB → 關稅 → 物流 → 通路佣金 → 零售價）",
        "毛利空間與定價帶建議",
      ],
    },
    {
      week: "Week 4",
      title: "Go / No-Go 報告與決策會議",
      items: [
        "完整報告交付",
        "與你的團隊 1 次決策會議，回答所有疑問",
        "如果 Go，輸出下一階段（產品測試）的執行計畫",
      ],
    },
  ],
  readiness: [
    { positive: true, text: "你有一個已在國內市場驗證過的產品，不是概念" },
    { positive: true, text: "你願意在正式投入前先花小錢搞清楚值不值得" },
    { positive: true, text: "決策權在你或你能直接對話的高層" },
    { positive: false, text: "你已經決定非做不可，只是想要一份報告背書" },
    { positive: false, text: "你的產品還在早期原型階段，尚未出貨" },
  ],
  redFlags: [
    {
      title: "市場規模太小",
      desc: "如果目標市場的可觸達需求無法支撐你回收初期投入，我們會直接告訴你「這不是你的市場」。",
    },
    {
      title: "合規成本超過預期毛利",
      desc: "有些市場的認證成本極高（例如部分醫材在歐盟），我們會試算如果做完 CE，毛利還剩多少。",
    },
    {
      title: "你的競品護城河太深",
      desc: "如果前 3 大競品合計超過 70% 市場份額且品牌老牌，我們會建議你換市場而不是正面對決。",
    },
  ],
  faqs: [
    {
      q: "如果評估結果是 No-Go，錢花得值得嗎？",
      a: "絕對值得。一份 No-Go 報告替你省下後面 50–500 萬的錯誤投入。我們看過太多企業沒做評估直接衝，半年後產品卡在港口或毛利被吃光，那時候後悔才是真的貴。",
    },
    {
      q: "報告會告訴我該用什麼品牌名嗎？",
      a: "不會。品牌命名屬於行銷策略範疇，不是市場評估。我們會告訴你市場需要什麼「類型」的品牌定位（例如：高端養生 vs 大眾日用），但具體 naming 建議你找專業的 branding agency。",
    },
    {
      q: "如果我只想評估一個市場，可以縮短到 1–2 週嗎？",
      a: "可以。如果你只要單一市場的快速掃描版（約 15 頁報告），我們有 1 週的 quick scan 版本。但我們不建議——資訊密度會降到無法支持真正的決策。",
    },
  ],
  relatedCaseSlug: "costco-health",
  nextSlug: "product-testing",
};

/* ────────── 02 Product Testing ────────── */

const productTesting: Stage = {
  slug: "product-testing",
  num: "02",
  accent: "sky",
  title: "產品測試",
  subtitle: "小批量投放，用真實數據取代主觀猜測",
  timeline: "4–6 週",
  heroLine: "市場會告訴你答案——前提是你問對了問題。",
  purpose:
    "評估報告告訴你「應該可以」，但真的出海前你還需要實證。這個階段我們用小批量投放的方式，讓真實消費者用錢投票。數據會告訴你：這個定價站得住嗎？這個包裝打動人嗎？這個通路導得了流嗎？",
  image: "/images/services/stage-02-product-test.jpg",
  imageAlt: "消費者在貨架前挑選商品 — 真實市場反應",
  outcomes: [
    "一組真實的銷售數據（不是問卷調查的偏好）",
    "不同定價 / 包裝 / 通路組合的 AB 測試結果",
    "消費者反饋：為什麼買、為什麼不買、會不會回購",
    "進一步放大的可行性判斷",
  ],
  deliverables: [
    {
      title: "測試計畫書",
      desc: "測試哪些變數、在哪裡測、測多久、成功指標是什麼。",
    },
    {
      title: "測試執行報告",
      desc: "實際銷售數據、消費者評論、退貨率、客服問題分類。",
    },
    {
      title: "AB 對照數據表",
      desc: "不同定價 / 包裝 / 文案的轉換率差異，用數據告訴你哪個方案勝出。",
    },
    {
      title: "下一階段調整建議",
      desc: "基於測試結果，哪些東西要改、哪些東西可以直接放大、哪些要放棄。",
    },
  ],
  process: [
    {
      week: "Week 1",
      title: "設計測試變數",
      items: [
        "決定測試市場（通常是目標市場的次級城市或特定電商平台）",
        "設計 2–3 組對照：定價帶、包裝、通路",
        "準備小批量庫存與物流",
      ],
    },
    {
      week: "Week 2–3",
      title: "鋪貨與啟動",
      items: [
        "產品入倉並上線",
        "基礎行銷素材上架（不做大型廣告，避免污染自然流量）",
        "第一批銷售與客服資料蒐集",
      ],
    },
    {
      week: "Week 4–5",
      title: "持續觀測與 iterate",
      items: [
        "每週追蹤銷售、轉換率、退貨",
        "消費者訪談（至少 10 位實際購買者）",
        "如發現明顯問題，快速微調並繼續觀測",
      ],
    },
    {
      week: "Week 6",
      title: "結論與放大判斷",
      items: [
        "完整測試報告",
        "與你的團隊決策會議",
        "如果結果支持放大，直接進入階段 03 的通路規劃",
      ],
    },
  ],
  readiness: [
    { positive: true, text: "已完成階段 01 的市場評估，有明確的切入市場" },
    { positive: true, text: "有足夠的產品庫存可投入小批量測試（通常 100–500 件）" },
    { positive: true, text: "你接受「數據可能否定你的直覺」這個前提" },
    { positive: false, text: "你已經準備好大量訂單了，只是想快速驗證" },
    { positive: false, text: "你的產品還需要修改配方或外觀" },
  ],
  redFlags: [
    {
      title: "測試樣本太少",
      desc: "如果總樣本數 < 100，數據噪音會大於訊號。我們會建議先集資到足夠的樣本量再啟動。",
    },
    {
      title: "高退貨率",
      desc: "如果測試期退貨率超過 15%，通常代表產品本身或期待值管理出了問題。我們會先回頭修這個，而不是繼續放大。",
    },
    {
      title: "毛利被廣告吃光",
      desc: "如果要靠廣告才賣得動，放大後一定會被 CAC 壓垮。我們會建議先調整通路或定位。",
    },
  ],
  faqs: [
    {
      q: "測試階段的成本大約多少？",
      a: "視產品類型差異很大。快消品（食品、保健品）通常在 50–150 萬台幣之間，包含產品成本、物流、倉儲、測試期廣告與客服。我們會在計畫書階段給你精確的預算範圍。",
    },
    {
      q: "可以只測線上通路，不測實體嗎？",
      a: "可以，而且大多數情況下我們會建議從線上開始——數據收集更快、變數控制更容易。實體通路的測試成本高、時間長，通常留到階段 03 正式進入通路時才做。",
    },
    {
      q: "如果測試結果不如預期，代表要放棄這個市場嗎？",
      a: "不一定。測試結果通常分三類：明確失敗（產品 / 市場錯配）、需要調整（定價或定位可改）、出乎意料好（可以直接放大）。我們會幫你判斷是哪一類，以及下一步該做什麼。",
    },
  ],
  relatedCaseSlug: "shoe-brand",
  prevSlug: "market-assessment",
  nextSlug: "channel-entry",
};

/* ────────── 03 Channel Entry ────────── */

const channelEntry: Stage = {
  slug: "channel-entry",
  num: "03",
  accent: "gold",
  title: "通路進入",
  subtitle: "從試水溫到正式上架",
  timeline: "2–3 個月",
  heroLine: "上架不難，難的是上對地方、用對條件。",
  purpose:
    "有了測試數據之後，下一步是把產品送進對的通路。這個階段我們負責談判、合規、包裝在地化、首批出貨與鋪貨。重點不是「能不能上架」，而是「以什麼條件上架」——因為通路合約的每一條款都會影響你未來 2–3 年的利潤結構。",
  image: "/images/services/stage-03-retail-aisle.jpg",
  imageAlt: "超市貨架 — 產品正式上架海外通路",
  outcomes: [
    "產品正式在目標通路上架銷售",
    "一份對你有利的通路合約（不是通路模板）",
    "完整的合規認證與產品標示在地化",
    "首批訂單順利出貨與鋪貨",
  ],
  deliverables: [
    {
      title: "通路談判策略書",
      desc: "目標通路的採購決策流程、你的談判籌碼、底線與可讓步的條件。",
    },
    {
      title: "合約審閱建議",
      desc: "通路合約的每一條款我們都會標注紅黃綠三色，告訴你哪些絕對不能簽、哪些可以討論、哪些沒問題。",
    },
    {
      title: "包裝與標示在地化套件",
      desc: "符合當地法規的標示設計、語言版本、警示文字、成分說明。",
    },
    {
      title: "首批訂單執行記錄",
      desc: "從 PO 到鋪貨的完整執行文件，未來 handover 給你團隊時有依據。",
    },
  ],
  process: [
    {
      week: "Month 1",
      title: "通路選擇與接洽",
      items: [
        "根據測試數據與市場評估，鎖定 2–3 個目標通路",
        "透過既有關係直接對接採購窗口",
        "遞交產品資料與樣品",
      ],
    },
    {
      week: "Month 2",
      title: "談判與合規",
      items: [
        "與通路採購團隊進行 2–4 輪談判",
        "同步進行產品合規認證與包裝修改",
        "合約審閱與條件確認",
      ],
    },
    {
      week: "Month 3",
      title: "首批出貨與上架",
      items: [
        "首批訂單執行（PO → 生產 → 出貨 → 入倉）",
        "上架前的通路端行銷協調",
        "正式上架與首週銷售追蹤",
      ],
    },
  ],
  readiness: [
    { positive: true, text: "已完成階段 02 的產品測試，有明確的銷售數據" },
    { positive: true, text: "產能可以支撐通路端的首批訂單" },
    { positive: true, text: "你有足夠的營運現金流撐過 60–90 天的付款週期" },
    { positive: false, text: "你還在尋找代工廠，沒有穩定產能" },
    { positive: false, text: "你期待上架後 30 天內回本" },
  ],
  redFlags: [
    {
      title: "通路條件過於苛刻",
      desc: "如果採購要求的付款週期、退貨條款、行銷分攤超過你的承受範圍，我們會建議你拒絕或換通路，不會為了「上架」而上架。",
    },
    {
      title: "產能跟不上",
      desc: "如果你的工廠無法穩定交付通路要求的量，我們會建議先把產能問題解決再進通路——空架是品牌殺手。",
    },
  ],
  faqs: [
    {
      q: "可以同時進多個通路嗎？",
      a: "初期我們建議集中火力在 1–2 個通路，確認執行品質之後再擴張。同時進多個通路會讓你的資源過度分散，品質難以控制。",
    },
    {
      q: "如果我想自建品牌站而不進通路呢？",
      a: "完全可以——那算是一個「特殊通路」。我們一樣會幫你規劃流量來源、物流、客服，只是結構不同。先告訴我們你的想法，我們會評估哪個策略更適合。",
    },
    {
      q: "合約簽下去之後，你們還會介入嗎？",
      a: "首批出貨我們會陪跑到底。之後你可以選擇接續階段 04（海外落地長期經營），或自行接手——由你決定。",
    },
  ],
  relatedCaseSlug: "costco-health",
  prevSlug: "product-testing",
  nextSlug: "localization",
};

/* ────────── 04 Localization ────────── */

const localization: Stage = {
  slug: "localization",
  num: "04",
  accent: "ember",
  title: "海外落地",
  subtitle: "不只是賣出去，還要站得穩",
  timeline: "持續（通常以 6 個月為一期）",
  heroLine: "進去是一次性的，站穩是持續的。",
  purpose:
    "產品上架不等於成功。真正的長期成功來自於在當地建立可持續的營運體系：穩定的供應鏈、在地客服、行銷節奏、通路關係維護、以及數據驅動的迭代。這個階段我們轉換成長期夥伴的角色，陪你把「一次性上架」變成「持續成長的業務」。",
  image: "/images/services/stage-04-asian-team.jpg",
  imageAlt: "亞洲在地團隊討論 — 落地營運的日常",
  outcomes: [
    "一套可持續運作的在地營運體系",
    "穩定的通路績效與月度銷售節奏",
    "在地團隊或夥伴關係（根據你的資源規模選擇）",
    "數據儀表板與月度復盤機制",
  ],
  deliverables: [
    {
      title: "營運手冊",
      desc: "從供應鏈、庫存管理、客服流程到通路溝通，全部標準化成可執行的 SOP。",
    },
    {
      title: "月度營運報告",
      desc: "銷售、庫存、客服、通路表現的整合報告，加上下個月的行動建議。",
    },
    {
      title: "在地夥伴網絡",
      desc: "物流、倉儲、客服、行銷的當地合作夥伴名單與已談妥的合作條件。",
    },
    {
      title: "數據儀表板",
      desc: "即時看得到銷售與庫存的自建 dashboard（或接入你既有的 BI 系統）。",
    },
  ],
  process: [
    {
      week: "Month 1–2",
      title: "體系建構",
      items: [
        "SOP 建立：供應鏈、庫存、客服、通路溝通",
        "在地夥伴選定與簽約",
        "數據追蹤體系上線",
      ],
    },
    {
      week: "Month 3–4",
      title: "迭代與優化",
      items: [
        "月度復盤會議",
        "根據數據調整 SKU、定價、鋪貨策略",
        "客戶反饋循環",
      ],
    },
    {
      week: "Month 5–6",
      title: "擴張準備",
      items: [
        "評估擴展到第二個通路或第二個市場的可行性",
        "產能與供應鏈的擴充規劃",
        "handover 給你的內部團隊（如果你要自己接手）",
      ],
    },
  ],
  readiness: [
    { positive: true, text: "產品已在目標通路正式銷售" },
    { positive: true, text: "有月度 review 與持續優化的意願" },
    { positive: true, text: "願意投入至少 6 個月的時間讓數據累積" },
    { positive: false, text: "你只想上架就好，長期運營想自己來" },
    { positive: false, text: "你沒有資源支撐持續的庫存與行銷投入" },
  ],
  redFlags: [
    {
      title: "首三個月銷售遠低於預期",
      desc: "如果實際銷售只有預估的 30% 以下，我們會先停下來檢討，而不是盲目加碼。",
    },
    {
      title: "通路關係惡化",
      desc: "如果通路採購與你開始產生信任問題，我們會介入修復，必要時協助你退出。",
    },
  ],
  faqs: [
    {
      q: "這階段的費用怎麼算？",
      a: "通常以月費 + 績效獎金的混合模式。月費覆蓋基礎營運支援，績效獎金與銷售成長掛鉤。我們不做純佣金制——因為那會扭曲決策。",
    },
    {
      q: "可以只做 3 個月嗎？",
      a: "理論上可以，但通常不建議。數據要跑滿一個完整的季節週期才能看出趨勢，3 個月太短，判斷容易失真。",
    },
    {
      q: "你們會幫我建在地團隊嗎？",
      a: "會，但我們不做純招聘。我們會幫你找到關鍵角色（例如在地 country manager），但日常的行政招聘建議交給當地 HR 公司。",
    },
  ],
  relatedCaseSlug: "bubble-tea",
  prevSlug: "channel-entry",
};

/* ────────── exports ────────── */

export const STAGES: Record<StageSlug, Stage> = {
  "market-assessment": marketAssessment,
  "product-testing": productTesting,
  "channel-entry": channelEntry,
  localization: localization,
};

export const STAGE_ORDER: readonly StageSlug[] = [
  "market-assessment",
  "product-testing",
  "channel-entry",
  "localization",
];

export function getStage(slug: StageSlug): Stage {
  return STAGES[slug];
}

export const ACCENT_CLASSES: Record<
  AccentColor,
  {
    readonly border: string;
    readonly bg: string;
    readonly text: string;
    readonly dot: string;
    readonly softBg: string;
  }
> = {
  sky: {
    border: "border-sky",
    bg: "bg-[rgba(91,143,168,0.08)]",
    text: "text-sky",
    dot: "bg-sky",
    softBg: "bg-[rgba(91,143,168,0.04)]",
  },
  gold: {
    border: "border-gold",
    bg: "bg-[rgba(212,168,92,0.08)]",
    text: "text-gold",
    dot: "bg-gold",
    softBg: "bg-[rgba(212,168,92,0.04)]",
  },
  ember: {
    border: "border-ember",
    bg: "bg-[rgba(217,139,74,0.08)]",
    text: "text-ember",
    dot: "bg-ember",
    softBg: "bg-[rgba(217,139,74,0.04)]",
  },
};

/* ────────── 3 Pillars data layer ──────────
 * New top-level framing: three pillars wrap the existing 4 stages and add
 * bolt-on service lines (digital acquisition engine, operations system).
 * STAGES above remain the depth pages; PILLARS here is the hub layer the
 * home page and /services use for storytelling.
 */

export type PillarSlug = "fit" | "channel" | "team";

export interface PillarService {
  readonly title: string;
  readonly desc: string;
  readonly href?: string; // optional — some services are informational only
  readonly external?: boolean;
}

export interface Pillar {
  readonly slug: PillarSlug;
  readonly num: string;
  readonly accent: AccentColor;
  readonly title: string; // 產品適配性
  readonly subtitle: string; // 勝率
  readonly tagline: string; // 一句話白話
  readonly description: string; // 較長的段落描述
  readonly services: readonly PillarService[];
  readonly relatedStages: readonly StageSlug[];
}

export const PILLARS: Record<PillarSlug, Pillar> = {
  fit: {
    slug: "fit",
    num: "01",
    accent: "sky",
    title: "產品適配性",
    subtitle: "勝率",
    tagline: "這個市場真的要你嗎？",
    description:
      "市場評估、產品測試、決策框架——在你花大錢之前，先用數據搞清楚值不值得去。我們幫你回答：這個市場夠大嗎？你的產品打得過嗎？利潤撐得起成本嗎？",
    services: [
      {
        title: "市場機會評估",
        desc: "2–4 週內搞清楚市場規模、競爭密度、進入門檻、法規限制。",
        href: "/services/market-assessment",
      },
      {
        title: "小批量產品測試",
        desc: "讓真實消費者用錢投票，不靠問卷和主觀判斷。",
        href: "/services/product-testing",
      },
      {
        title: "MBCPR 決策框架",
        desc: "Go / No-Go 五維評分矩陣，讓判斷有根據。",
        href: "/services/methodology",
      },
    ],
    relatedStages: ["market-assessment", "product-testing"],
  },
  channel: {
    slug: "channel",
    num: "02",
    accent: "gold",
    title: "通路銷售力",
    subtitle: "潛力",
    tagline: "上得了架，還要賣得動。",
    description:
      "通路進入、展會佈局、數位集客——把產品放進對的通路，並且讓消費者在對的時間找得到你。北美連鎖、東南亞零售、線上 AI 搜尋全覆蓋。",
    services: [
      {
        title: "通路進入與媒合",
        desc: "北美 Costco、Walmart、Amazon；東南亞連鎖與在地通路的直接對接關係。",
        href: "/services/channel-entry",
      },
      {
        title: "展會與加盟佈局",
        desc: "食品展、消費電子展、加盟展的策展協助與現場陪同。",
      },
      {
        title: "AI 集客引擎",
        desc: "SEO 文章月產 30 篇以上 + AI 搜尋引擎佈局（AIO），讓 ChatGPT、Perplexity 在回答相關問題時推薦你的品牌。自然流量平均成長 200%+。",
      },
    ],
    relatedStages: ["channel-entry"],
  },
  team: {
    slug: "team",
    num: "03",
    accent: "ember",
    title: "團隊體質",
    subtitle: "成功率",
    tagline: "進得去，還要留得下。",
    description:
      "海外落地、營運系統、AI 自動化——讓你不用親自飛過去也能把海外業務跑起來。團隊建置、流程數位化、AI 知識庫，三件事同時做。",
    services: [
      {
        title: "海外團隊建置與落地",
        desc: "當地 country manager 找人、日常營運陪跑、合規與稅務安排。",
        href: "/services/localization",
      },
      {
        title: "運營優化方案",
        desc: "已經在海外跑了一段時間、想把某一個環節做更好的進階方案。",
        href: "/services/optimize",
      },
      {
        title: "海外營運系統五階",
        desc: "從 Notion 任務管理、AI 複利知識庫、AI 數位員工、事業營運儀表板，到團隊創新共創 — 一套五階導入的營運作業系統，讓新人從 90 天縮到 1 天上手。",
      },
    ],
    relatedStages: ["localization"],
  },
};

export const PILLAR_ORDER: readonly PillarSlug[] = ["fit", "channel", "team"];

export function getPillar(slug: PillarSlug): Pillar {
  return PILLARS[slug];
}
