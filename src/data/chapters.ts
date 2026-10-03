export const PHILIPPINES_CHAPTER_KEYS = ["m1", "m3", "m9", "after"] as const;

export type PhilippinesChapterKey = (typeof PHILIPPINES_CHAPTER_KEYS)[number];
export type ChapterKey = PhilippinesChapterKey | "na";
export type ArticleChapterKey = ChapterKey | "sub";

export type StepIcon = "package" | "users" | "pen" | "file" | "inbox" | "badge-check" | "list-checks" | "chart-column" | "search" | "presentation" | "handshake" | "store";

export type ChapterStep = {
  readonly number: string;
  readonly title: string;
  readonly body: string;
  readonly icon: StepIcon;
};

export type ChapterFaq = {
  readonly question: string;
  readonly answer: string;
  readonly takeaway: string;
};

export type ChapterScenario = {
  readonly title: string;
  readonly body: string;
  readonly answer: string;
  readonly image: string;
  readonly imageAlt: string;
};

type NextChapter = {
  readonly label: string;
  readonly title: string;
  readonly heading: string;
  readonly href: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly maxTierWidth?: number;
};

export type ChapterSection =
  | {
      readonly type: "steps";
      readonly heading: string;
      readonly items: readonly ChapterStep[];
    }
  | {
      readonly type: "report";
      readonly heading: string;
      readonly items: readonly string[];
      readonly ending: string;
    }
  | {
      readonly type: "price";
      readonly title: string;
      readonly caption?: string;
      readonly details: readonly string[];
      readonly breakdown?: {
        readonly heading: string;
        readonly rows: readonly { readonly item: string; readonly note: string }[];
      };
      readonly paths?: readonly { readonly label: string; readonly body: string; readonly dark?: boolean }[];
    }
  | {
      readonly type: "tracks";
      readonly heading: string;
      readonly passive: string;
      readonly active: readonly { readonly label: string; readonly body: string }[];
    }
  | {
      readonly type: "cards";
      readonly heading: string;
      readonly items: readonly { readonly title: string; readonly body: string; readonly fit?: string }[];
      readonly ending?: string;
    }
  | {
      readonly type: "included";
      readonly heading: string;
      readonly items: readonly { readonly title: string; readonly body: string; readonly icon: StepIcon }[];
      readonly featureNote: string;
    }
  | {
      readonly type: "table";
      readonly heading: string;
      readonly rows: readonly { readonly task: string; readonly owner: string; readonly isYou?: boolean }[];
    }
  | {
      readonly type: "dark-copy";
      readonly heading: string;
      readonly paragraphs: readonly string[];
    }
  | {
      readonly type: "callout";
      readonly heading: string;
      readonly body: string;
    }
  | {
      readonly type: "two-cards";
      readonly heading: string;
      readonly items: readonly { readonly title: string; readonly body: string }[];
    }
  | {
      readonly type: "fit";
      readonly heading: string;
      readonly lead: string;
      readonly items: readonly { readonly label: string; readonly body: string }[];
      readonly image: string;
      readonly imageAlt: string;
    }
  | {
      readonly type: "waitlist";
    };

export type Chapter = {
  readonly key: ChapterKey;
  readonly path: string;
  readonly label: string;
  readonly title: string;
  readonly scene: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly heroAction: string;
  readonly showChapterBar: boolean;
  readonly scenariosHeading: string;
  readonly scenarioAnswerLabel?: string;
  readonly scenarios: readonly ChapterScenario[];
  readonly sections: readonly ChapterSection[];
  readonly faqs: readonly ChapterFaq[];
  readonly next?: NextChapter;
  readonly cta: {
    readonly title: string;
    readonly body: string;
    readonly action: string;
    readonly href?: string;
    readonly notes?: string;
    readonly link?: { readonly label: string; readonly href: string };
    readonly footnote?: string;
  };
};

export const CHAPTER_ARTICLES = {
  m1: [
    "go-no-go-framework",
    "first-time-export-checklist",
    "product-testing-best-practices",
    "why-philippines-first",
    "fob-cif-ddp-explained",
    "market-entry-modes-compared",
  ],
  m3: [
    "tradepilot-tariff-tutorial",
    "philippines-ecommerce-first-year",
    "landed-cost-before-export",
    "agent-vs-distributor-exclusive",
    "philippines-fda-lto-cpr-cpn",
    "philippines-cpr-transfer-change-importer",
  ],
  m9: ["manila-beverage-first-store-90-days"],
  after: [],
  na: ["us-fda-registration-guide", "amazon-us-three-decisions"],
  sub: ["overseas-exhibition-subsidy-115-upgrade"],
} as const satisfies Record<ArticleChapterKey, readonly string[]>;

export const CHAPTER_ARTICLE_TAGS = {
  m1: "第一個月：市場探查",
  m3: "第三個月：通路與證",
  m9: "第九個月：落地與團隊",
  after: "之後的每一天：客服與營運",
  na: "北美市場",
  sub: "補助與資源",
} as const satisfies Record<ArticleChapterKey, string>;

export const TAG_ONLY_ARTICLE_SLUGS = [] as const;

export const CHAPTERS: Record<ChapterKey, Chapter> = {
  m1: {
    key: "m1",
    path: "/services/product-testing",
    label: "第一個月 · 市場探查",
    title: "先驗證市場，再決定投入",
    scene: "市場不會因為你準備好了就要你。\n在台灣問了一百個人，還是不知道菲律賓的消費者會不會買單。\n市場探查把你的產品帶到當地人面前，一個一個問。",
    image: "/images/services/stage-02-product-test-1600.webp",
    imageAlt: "團隊檢視產品資料",
    heroAction: "聊聊你的產品 →",
    showChapterBar: true,
    scenariosHeading: "出海前最常見的三個疑問",
    scenarioAnswerLabel: "我們的做法",
    scenarios: [
      { title: "想出海，不知道從哪裡開始", body: "有產品，聽說東南亞有機會，但不知道從哪裡開始", answer: "先做市場探查：把產品放到當地人面前，一頁報告告訴你要不要往下走", image: "/images/services/scenarios/m1-1-1600.webp", imageAlt: "在世界地圖上標記目的地" },
      { title: "報告很厚，決定還是沒有", body: "找過顧問，拿到一份很厚的報告，還是不知道該不該去", answer: "市場探查只交一頁：誰會買、多少錢會買、為什麼不買。拿來做決定，不是拿來歸檔", image: "/images/services/scenarios/m1-2-1600.webp", imageAlt: "整疊厚重的資料夾" },
      { title: "不想一開始就投入幾百萬", body: "怕一去就是幾百萬，想先花小錢確認", answer: "市場探查 1～2 萬（前 10 家實驗價）。沒過就停在這裡，過了再抵進下一章", image: "/images/services/scenarios/m1-3-1600.webp", imageAlt: "裝滿硬幣的儲蓄罐與計算機" },
    ],
    sections: [
      {
        type: "steps",
        heading: "市場探查的四個步驟",
        items: [
          { number: "01", title: "先做一張產品卡", body: "把你的產品寫成一頁當地人看得懂的介紹：是什麼、怎麼用、多少錢。\n同時查當地有沒有類似的產品、賣多少錢。", icon: "package" },
          { number: "02", title: "一對一，問當地人", body: "請當地有固定收入、會自己掏錢買東西的消費者，\n拿著產品卡、用過試用包，一個一個聊。\n喜歡什麼、看不懂什麼、多少錢會買、為什麼不買。", icon: "users" },
          { number: "03", title: "跟公開資料交叉比對", body: "訪談聽到的，再對照當地電商的評價、競品的價格與說法。\n嘴巴說的，跟市場上真的在賣的，放在一起看。", icon: "pen" },
          { number: "04", title: "一頁報告", body: "誰會買、多少錢會買、為什麼不買，附台菲兩地的價差對比。\n訪談跑完就給，不用等產品證。", icon: "file" },
        ],
      },
      {
        type: "report",
        heading: "交付內容：一頁報告",
        items: [
          "誰會買：哪一群人有興趣、為什麼",
          "多少錢會買：價格帶落在哪、跟台灣差多少",
          "為什麼不買：沒興趣的人說了什麼",
        ],
        ending: "這一頁是拿來做下一個決定的，不是拿來歸檔的",
      },
      {
        type: "price",
        title: "1～2 萬",
        caption: "前 10 家實驗價",
        details: ["訪談跑完就給報告，不用等產品證"],
        paths: [
          { label: "過了 →", body: "這筆抵進第三個月的寄賣包（5～6 萬），合起來就是 7 萬起手包" },
          { label: "沒過 →", body: "故事在這裡停。你花的是 1～2 萬，不是幾百萬", dark: true },
        ],
      },
    ],
    faqs: [
      { question: "市場探查沒過會怎樣？", answer: "報告會寫清楚為什麼、什麼條件改了可以再試。這是 1～2 萬買到的最有價值的答案之一。", takeaway: "報告會寫清楚原因，以及什麼條件改了可以再試" },
      { question: "可以只做市場探查嗎？", answer: "可以。市場探查是獨立的，你拿著那一頁去做任何決定都行。", takeaway: "可以，市場探查獨立計價" },
      { question: "訪談的是誰？樣本夠嗎？", answer: "目前是當地有固定收入、會自己掏錢買東西的消費者，每一位都先用過試用包再聊。\n人數不多、集中在特定族群與地區，我們在每一份報告裡都寫明這件事。\n1～2 萬買的是方向，不是統計。方向對了，再花錢擴樣。", takeaway: "1～2 萬買的是方向，不是統計" },
    ],
    next: { label: "下一章 →", title: "第三個月 · 寄賣", heading: "上架了，讓人先用過再說", href: "/services/consignment", image: "/images/hero-video/chapter-warehouse-1600.webp", imageAlt: "貨架上待出貨的包裹" },
    cta: { title: "從一次評估開始", body: "我們先聽你的產品在台灣怎麼賣，再說適不適合去問菲律賓。\n有時候聽完，我們會建議你再等等——那也是一種答案。", notes: "第一次談 30 分鐘，不收費。\n談完給你一頁：建議從哪一章開始，或建議再等等。\n要不要走、走幾章，由你決定。", action: "預約 30 分鐘 →", link: { label: "想先看我們實際問到了什麼？→ 小步出海法", href: "/services/methodology" }, footnote: "送出後一個工作天內回覆。" },
  },
  m3: {
    key: "m3",
    path: "/services/consignment",
    label: "第三個月 · 寄賣",
    title: "上架了，讓人先用過再說",
    scene: "報告說可以。接下來的問題是：證要多久、貨放哪、上了架誰來推",
    image: "/images/services/stage-03-retail-aisle-1600.webp",
    imageAlt: "倉儲貨架走道",
    heroAction: "看你的產品適不適合寄賣 →",
    showChapterBar: true,
    scenariosHeading: "準備寄賣時的三個卡點",
    scenarios: [
      { title: "市場驗證過了，下一步卡住", body: "市場探查過了，想放貨去賣，但不知道證怎麼辦、貨放哪、誰來推", answer: "寄賣包一次處理：產品證代持、貨放合作夥伴的倉、上架前後的活動與推廣", image: "/images/services/scenarios/m3-1-1600.webp", imageAlt: "倉庫鐵架上的紙箱" },
      { title: "廣告投了，沒有人看見", body: "自己上過東南亞平台，投了廣告，沒人看見", answer: "菲律賓消費者看網紅、看活動、看有沒有人真的用過；寄賣期間先讓人用過，再談廣告", image: "/images/services/scenarios/m3-2-1600.webp", imageAlt: "手機上瀏覽購物應用程式" },
      { title: "代理商只想抽成", body: "有代理商找上門，只想抽成，不管你賣不賣得動", answer: "寄賣是賣多少算多少；產品證資料歸品牌，換通路只換一張合約", image: "/images/services/scenarios/m3-3-1600.webp", imageAlt: "會議桌上準備簽署的合約" },
    ],
    sections: [
      {
        type: "tracks",
        heading: "產品證審核的 6～12 週，兩條進度同時走",
        passive: "持證進口商代辦、代持。資料歸你，換人只換一張合約",
        active: [
          { label: "第 1～2 週", body: "貨進合作夥伴的倉，商品頁、當地說明、價格帶定下來" },
          { label: "第 3～6 週", body: "社群試用活動：先讓人用過。有人在社群裡問，有人拍了影片" },
          { label: "第 6～10 週", body: "網紅與活動配套排進去。市場報告從市場探查那一頁展開：價格帶、競品、通路" },
          { label: "證下來那天", body: "貨上架。架上已經有人在等" },
        ],
      },
      {
        type: "included",
        heading: "寄賣包包含的五件事",
        items: [
          { title: "電商通路上架", body: "放進合作的菲律賓電商通路，貨放合作夥伴的倉，賣多少算多少", icon: "store" },
          { title: "產品證代持", body: "化妝品、食品的證由持證進口商代辦代持，資料歸你", icon: "badge-check" },
          { title: "社群試用活動", body: "證還沒下來的那段時間，先在當地社群做試用與活動", icon: "users" },
          { title: "市場報告", body: "把市場探查那一頁展開，補價格帶、競品、通路", icon: "chart-column" },
          { title: "網紅與活動配套", body: "只投廣告不夠，這部分跟你一起排", icon: "presentation" },
        ],
        featureNote: "核心服務",
      },
      {
        type: "callout",
        heading: "交付內容",
        body: "架上的商品、每月的銷售數字、一份市場報告。\n三個月看數字。賣不動我們會直接說，也會告訴你原因",
      },
      {
        type: "price",
        title: "5～6 萬",
        caption: "市場探查費可抵。跟第一個月合起來，就是 7 萬起手包",
        details: ["產品證 6～12 週，證下來貨就上架；這段時間活動先跑", "平台費用與抽成、產品到當地的包裝與說明調整另計，第一次談會先講"],
      },
    ],
    faqs: [
      { question: "為什麼不直接投廣告？", answer: "老實說，我們的經驗是不夠。菲律賓的消費者看網紅、看活動、看有沒有人真的用過，廣告只是其中一段。", takeaway: "廣告只是其中一段" },
      { question: "賣不動怎麼辦？", answer: "寄賣是賣多少算多少，不會逼你進貨。三個月看數字，賣不動我們會直接說。", takeaway: "賣多少算多少，三個月看數字" },
      { question: "證掛在誰名下？", answer: "持證進口商代持，合約寫清楚資料歸你、轉移配合。不綁任何一家通路。", takeaway: "持證進口商代持，資料歸品牌" },
    ],
    next: { label: "下一章 →", title: "第九個月 · 公司落地", heading: "開始想要在當地有自己的人", href: "/services/localization", image: "/images/hero-video/chapter-storefront-1600.webp", imageAlt: "夜晚街角的咖啡店與行人" },
    cta: { title: "看你的產品適不適合寄賣", body: "沒做過市場探查也可以聊，我們會先問你在台灣賣得怎麼樣", action: "聊聊你的產品 →" },
  },
  m9: {
    key: "m9",
    path: "/services/localization",
    label: "第九個月 · 公司落地",
    title: "開始想要在當地有自己的人",
    scene: "賣得動了。你開始想：要不要開一間自己的公司、找第一個員工、把證掛到自己名下。\n然後你發現，每一件事都需要有人在當地",
    image: "/images/services/stage-04-asian-team-1600.webp",
    imageAlt: "亞洲團隊在辦公室協作",
    heroAction: "聊聊你想在菲律賓開什麼 →",
    showChapterBar: true,
    scenariosHeading: "考慮在當地設點的三種情況",
    scenarios: [
      { title: "想在當地設點，成本與時程不明", body: "寄賣或代理跑順了，想在當地設點，不知道從註冊到招聘要花多少、多久", answer: "第一次談就給成本框架：註冊、律師、招聘、場地各大概多少，以及時間表", image: "/images/services/scenarios/m9-1-1600.webp", imageAlt: "馬尼拉 Ayala 大道的商業區街景" },
      { title: "開第一家店，擔心配方與選址", body: "連鎖餐飲、美業品牌，想開第一家店，怕被拿走配方、怕選錯區", answer: "合約與文件由合作的律師行處理，選址與營運由當地夥伴陪跑；鹿飛與夥伴走過從零開店的路", image: "/images/services/scenarios/m9-2-1600.webp", imageAlt: "咖啡店老闆在門口舉著營業中的牌子" },
      { title: "想在菲律賓聘遠程團隊", body: "在台灣有團隊，想在菲律賓聘人遠程做，不知道怎麼合規", answer: "人在當地、報告給台灣：招聘、到職與合規，由合作夥伴的 HR 體系與律師行處理", image: "/images/services/scenarios/m9-3-1600.webp", imageAlt: "透過筆電進行視訊會議" },
    ],
    sections: [
      {
        type: "table",
        heading: "落地的每一件事，都要有人在當地",
        rows: [
          { task: "公司註冊、律師行文件", owner: "合作的律師行，我們對窗口" },
          { task: "招聘：實體或遠程團隊", owner: "合作夥伴的 HR 體系，面試、到職、第一批人的訓練" },
          { task: "FDA 掛證與合規", owner: "持證進口商＋律師行，我們統籌" },
          { task: "場地、設備、日常營運", owner: "合作夥伴的營運團隊，第一批人到位、流程跑順" },
          { task: "品牌方的角色", owner: "做決定、看進度。不用一直飛", isYou: true },
        ],
      },
      {
        type: "cards",
        heading: "鹿飛跟合作夥伴走過的三條路",
        items: [
          { title: "第一條 · 從零開始", body: "在當地蓋一間英語教育機構——招募師資、找場地、招第一個學生。\n後來用同樣的方法，做了一個連鎖手搖飲品牌", fit: "適合：要在當地從頭建團隊、開店的品牌" },
          { title: "第二條 · 改了再帶過去", body: "台灣的產品到了當地，改配方、改價格、改包裝，\n變成當地人願意掏錢的樣子", fit: "適合：產品好、但知道當地口味和價格帶不一樣的品牌" },
          { title: "第三條 · 原封不動帶過去", body: "一個台灣的美業品牌，什麼都不改，只做當地的行銷，看它站不站得住", fit: "適合：品牌本身就是賣點、不想動產品的" },
        ],
        ending: "三條路的成本、坑、時間都不一樣。第一次談，我們會先問你比較像哪一條",
      },
      {
        type: "price",
        title: "按案報價",
        caption: "第一次談就給成本框架與時間表",
        details: [],
        breakdown: {
          heading: "第一次談會給你",
          rows: [
            { item: "公司註冊", note: "依公司類型給大概範圍" },
            { item: "律師行文件", note: "依文件範圍給大概範圍" },
            { item: "招聘", note: "依人數、實體或遠程給大概範圍" },
            { item: "場地", note: "依地點與規模給大概範圍" },
            { item: "時間表", note: "依公司類型與人數排出時程" },
          ],
        },
      },
    ],
    faqs: [
      { question: "一定要先做市場探查跟寄賣嗎？", answer: "不一定。已經有菲律賓通路、確定要開公司的，可以直接談落地。", takeaway: "不一定，可以直接談落地" },
      { question: "你們負責合規嗎？", answer: "證幫你申請、坑幫你避，合規的最終責任在品牌方，這一點會清楚寫進合約。", takeaway: "協助申請與避坑，責任歸屬寫進合約" },
      { question: "遠程團隊是什麼意思？", answer: "台灣公司在菲律賓聘人，人在當地、報告給台灣。菲律賓很流行這種做法，我們幫你把合規和招聘處理好。", takeaway: "人在當地，報告給台灣" },
    ],
    next: { label: "下一章 →", title: "之後的每一天 · 海外客服", heading: "海外客服，交給專業英語團隊", href: "/services/call-center", image: "/images/hero-video/chapter-callcenter-1600.webp", imageAlt: "一邊通話一邊打字的客服人員", maxTierWidth: 1600 },
    cta: { title: "聊聊你想在菲律賓開什麼", body: "先說你比較像三條路的哪一條，我們告訴你大概要多少、多久", action: "聊聊你的狀況 →" },
  },
  after: {
    key: "after",
    path: "/services/call-center",
    label: "之後的每一天 · 海外客服",
    title: "海外客服，交給專業英語團隊",
    scene: "一封英文客訴信。退貨、換貨、問哪裡有賣。\n你不會想為了這件事養一組人，但也不能不回",
    image: "/images/services/pillar-team-collab-1600.webp",
    imageAlt: "客服團隊在辦公室協作",
    heroAction: "登記首批 →",
    showChapterBar: true,
    scenariosHeading: "需要海外客服的三種情況",
    scenarios: [
      { title: "海外客訴回不了", body: "貨在海外賣，客訴和退換貨的訊息回不了，或回得很慢", answer: "客服信箱、平台訊息、社群私訊集中到同一個工作台，由專業英語客服團隊接手", image: "/images/services/scenarios/after-1-1600.webp", imageAlt: "手上拿著待處理的退貨包裹" },
      { title: "北美客服太貴，自己人英文不夠", body: "去北美賣，請不起北美客服；去東南亞賣，自己人英文不夠", answer: "由菲律賓英語客服團隊承接，品牌不必在當地另聘客服", image: "/images/services/scenarios/after-2-1600.webp", imageAlt: "戴著耳機的客服人員" },
      { title: "客服外包價格偏高", body: "找過台灣的客服外包，價格不便宜", answer: "服務規則、合約與品質指標由鹿飛台灣公司負責；報價區間第一次談就給", image: "/images/services/scenarios/after-3-1600.webp", imageAlt: "指著帳單上的金額討論" },
    ],
    sections: [
      {
        type: "steps",
        heading: "客服服務流程",
        items: [
          { number: "01", title: "訊息集中到同一個工作台", body: "客服信箱、平台訊息、社群私訊，接到同一個工作台", icon: "inbox" },
          { number: "02", title: "由專業英語客服團隊接手", body: "受過完整訓練的菲律賓英語客服團隊，英文溝通是基本功。\n規則與標準由台灣端制定與管理", icon: "badge-check" },
          { number: "03", title: "依品牌規則回覆", body: "回覆範本、退換貨規則、哪些情況要升級給品牌方——都寫進服務流程，由鹿飛台灣公司負責", icon: "list-checks" },
          { number: "04", title: "每月服務報表", body: "每月的訊息量、回覆時間、升級次數，一份報表看清楚", icon: "chart-column" },
        ],
      },
      {
        type: "dark-copy",
        heading: "為什麼選擇菲律賓團隊",
        paragraphs: [
          "菲律賓是全球英語客服外包的重鎮，這是產業長年累積的結果",
          "規則、合約、品質指標留在台灣公司；人在菲律賓。品牌面對的窗口是鹿飛，不是當地的外包廠",
        ],
      },
      {
        type: "fit",
        heading: "適合的品牌",
        lead: "已經在海外銷售，或正準備出海、需要英文客服的品牌",
        items: [
          { label: "寄賣階段", body: "電商平台開始有訂單，客訴、退換貨與商品詢問需要即時回覆" },
          { label: "公司落地之後", body: "當地門市或團隊成立，客服量變大，需要穩定的服務流程" },
          { label: "北美市場", body: "北美品牌的英文客服，多半也由菲律賓團隊承接；不必在北美另聘客服" },
        ],
        image: "/images/services/fit/call-center-fit-1600.webp",
        imageAlt: "兩位團隊成員一邊看筆電一邊包裝網路訂單",
      },
      { type: "waitlist" },
    ],
    faqs: [
      { question: "跟一般客服外包差在哪？", answer: "兩件事：團隊是受過完整訓練的英語客服專業人員，不是一般話務員；服務規則在台灣公司，你面對的窗口是鹿飛，不是菲律賓的外包廠。", takeaway: "專業英語團隊，規則由台灣端負責" },
      { question: "現在可以簽嗎？", answer: "現在是登記首批。2027 Q1 開始服務，登記的人優先。", takeaway: "2027 Q1 開始服務，登記者優先" },
      { question: "訊息量很小也可以嗎？", answer: "可以先登記。首批我們想找的是量不大、但每一封都重要的品牌，正好一起把服務磨好。", takeaway: "量小也可以先登記" },
    ],
    next: { label: "故事從頭來 →", title: "第一個月 · 市場探查", heading: "先驗證市場，再決定投入", href: "/services/product-testing", image: "/images/hero-video/chapter-research-1600.webp", imageAlt: "會議中討論圖表的團隊" },
    cta: { title: "登記首批", body: "留下你的品牌、大概的訊息量、現在誰在接。開放時我們先找你", action: "登記首批 →", href: "#waitlist" },
  },
  na: {
    key: "na",
    path: "/services/north-america",
    label: "北美市場拓展",
    title: "進入北美主流零售通路",
    scene: "從選品、展會到採購談判，協助已在台灣站穩的品牌進入 Costco、Walmart 與 Amazon",
    image: "/images/services/pillar-channel-aisle-1600.webp",
    imageAlt: "超市貨架上的商品",
    heroAction: "聊聊你的產品 →",
    showChapterBar: false,
    scenariosHeading: "進軍北美前的三個卡點",
    scenarios: [
      { title: "想進北美主流通路，不知道第一步", body: "產品在台灣站穩了，想進北美主流通路，不知道從哪一步開始", answer: "從市場研究與選品開始：哪一支產品先去、什麼規格、什麼價格帶", image: "/images/services/scenarios/na-1-1600.webp", imageAlt: "超市走道上的購物車" },
      { title: "參過展、寄過樣品，沒有下文", body: "參過展、寄過樣品，沒有下文", answer: "北美團隊負責展位、銷售與買家邀約，把採購帶到品牌面前，一路談到首單", image: "/images/services/scenarios/na-2-1600.webp", imageAlt: "人潮熱絡的商業展覽會場" },
      { title: "擔心行銷預算回不來", body: "怕砸了幾百萬行銷，回不來", answer: "收費採前期低服務費＋成交抽成，第一次談給明確數字", image: "/images/services/scenarios/na-3-1600.webp", imageAlt: "筆電上的數據分析儀表板" },
    ],
    sections: [
      {
        type: "steps",
        heading: "北美通路拓展四階段",
        items: [
          { number: "步 01", title: "市場研究與選品", body: "哪一支產品先去、什麼規格、什麼價格帶", icon: "search" },
          { number: "步 02", title: "展覽佈局", body: "展位、銷售、把買家帶到你桌前", icon: "presentation" },
          { number: "步 03", title: "上桌談判", body: "合約條件、付款期、首單量", icon: "handshake" },
          { number: "步 04", title: "進通路", body: "平均 6～9 個月，食品保健品 9～12 個月（認證要求較高）", icon: "store" },
        ],
      },
      {
        type: "two-cards",
        heading: "分工方式",
        items: [
          { title: "北美團隊", body: "在當地執行：研究、展覽、買家、談判" },
          { title: "鹿飛", body: "負責合約與進度：品牌面對的是一份合約、一條進度線" },
        ],
      },
      {
        type: "price",
        title: "前期低服務費＋成交抽成",
        details: ["第一次談給明確數字"],
      },
    ],
    faqs: [
      { question: "北美通路拓展要多久？", answer: "平均 6～9 個月；食品與保健品因為認證要求較高，大約 9～12 個月。", takeaway: "平均 6～9 個月" },
      { question: "怎麼收費？", answer: "前期收取較低的服務費，成交後依合約抽成。第一次談就給明確數字。", takeaway: "前期低服務費＋成交抽成" },
      { question: "跟菲律賓四章有關係嗎？", answer: "各自獨立。北美通路由北美專責團隊執行，鹿飛負責合約與進度；去北美的品牌如果需要英文客服，也可以搭配海外客服方案。", takeaway: "各自獨立，可搭配海外客服" },
    ],
    next: { label: "延伸服務 →", title: "海外客服", heading: "去北美的品牌，第一封英文客訴信也會來", href: "/services/call-center", image: "/images/hero-video/chapter-callcenter-1600.webp", imageAlt: "一邊通話一邊打字的客服人員", maxTierWidth: 1600 },
    cta: { title: "聊聊你的產品", body: "先說你的產品現在在哪裡賣、賣得怎麼樣", action: "聊聊你的產品 →" },
  },
};
