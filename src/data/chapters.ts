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
      readonly passiveLabel?: string;
      readonly activeLabel?: string;
      readonly ending?: string;
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
      readonly featureNote?: string;
      readonly footnote?: string;
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
  readonly partnerStrip?: { readonly body: string; readonly action: string; readonly href: string };
};

export const CHAPTER_ARTICLES = {
  m1: [
    "go-no-go-framework",
    "first-time-export-checklist",
    "product-testing-best-practices",
    "why-philippines-first",
    "market-entry-modes-compared",
  ],
  m3: [
    "fob-cif-ddp-explained",
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
    cta: { title: "從一次評估開始", body: "我們先聽你的產品在台灣怎麼賣，再說適不適合去問菲律賓。\n有時候聽完，我們會建議你再等等——那也是一種答案。", notes: "第一次談 30 分鐘，不收費。\n談完給你一頁：建議從哪一章開始，或建議再等等。\n要不要走、走幾章，由你決定。", action: "預約 30 分鐘 →", link: { label: "想先看我們實際問到了什麼？→ 小步出海法", href: "/services/methodology" }, footnote: "送出後 24 小時內回覆。" },
  },
  m3: {
    key: "m3",
    path: "/services/consignment",
    label: "第三個月 · 寄賣",
    title: "上架了，讓人先用過再說",
    scene: "市場探查說可以。接下來的問題是：證要多久、貨放哪、上了架誰來推。\n我們不自己開店。我們把你接到已經在賣的通路，然後把通路不做的事接起來。",
    image: "/images/services/stage-03-retail-aisle-1600.webp",
    imageAlt: "倉儲貨架走道",
    heroAction: "看你的產品適不適合寄賣 →",
    showChapterBar: true,
    scenariosHeading: "準備寄賣時的三個卡點",
    scenarioAnswerLabel: "我們的做法",
    scenarios: [
      { title: "市場驗證過了，下一步卡住", body: "市場探查過了，想放貨去賣，但不知道證怎麼辦、貨放哪、誰來推", answer: "寄賣包一次處理：找到合適的通路、產品證代持、上架前的試用活動，一份合約。", image: "/images/services/scenarios/m3-1-1600.webp", imageAlt: "倉庫鐵架上的紙箱" },
      { title: "廣告投了，沒有人看見", body: "自己上過東南亞平台，投了廣告，沒人看見", answer: "菲律賓消費者看網紅、看活動、看有沒有人真的用過；寄賣期間先讓人用過，再談廣告", image: "/images/services/scenarios/m3-2-1600.webp", imageAlt: "手機上瀏覽購物應用程式" },
      { title: "代理商只想抽成", body: "有代理商找上門，只想抽成，不管你賣不賣得動", answer: "通路夥伴按實際賣出結算，我們不要求獨家；證由持證進口商代持，換通路、換進口商，都只換一張合約。", image: "/images/services/scenarios/m3-3-1600.webp", imageAlt: "會議桌上準備簽署的合約" },
    ],
    sections: [
      {
        type: "included",
        heading: "三種通路，我們替你去談",
        items: [
          { title: "電商通路", body: "菲律賓的電商店家，已經在賣食品、快消、生活用品。\n我們把你的產品帶進他們的架上，賣出才結算。最快開始的一條路。", icon: "store" },
          { title: "社群通路", body: "當地的消費社群與合作夥伴的線上通路。\n證還在跑的那幾週，先從這裡讓人用過。", icon: "users" },
          { title: "實體與企業通路", body: "藥妝連鎖、百貨、餐飲集團這類大通路。\n門檻比較高，要證、要數字、要談條件。\n電商跑出成績之後，我們拿著數字替你去談。", icon: "handshake" },
        ],
      },
      {
        type: "tracks",
        heading: "產品證審核的 6～12 週，兩條進度同時走",
        passive: "持證進口商代辦、代持。資料歸你，換人只換一張合約",
        activeLabel: "我們這一軌（每週都有進度）",
        active: [
          { label: "第 1～2 週", body: "選通路，試用包寄到；商品頁、當地說明、價格帶定下來。\n上架用的貨，等證下來再進。" },
          { label: "第 3～6 週", body: "社群試用：先讓人用過，聽他們怎麼說、怎麼問。" },
          { label: "第 6～10 週", body: "市場報告從市場探查那一頁展開：價格帶、競品、通路。\n需要網紅或活動，這時候一起排。" },
          { label: "證下來那天", body: "貨進倉、上架。先用過的人，就是第一批會找你的人。" },
        ],
      },
      {
        type: "included",
        heading: "寄賣包包含的四件事",
        items: [
          { title: "通路媒合", body: "替你找合適的菲律賓電商通路，談上架條件；貨放通路夥伴的倉，賣出才結算。", icon: "store" },
          { title: "產品證代持", body: "化妝品、食品的證由持證進口商代辦、代持；換進口商只換一張合約。", icon: "badge-check" },
          { title: "社群試用", body: "證還沒下來的那段時間，先在當地社群讓人用過。", icon: "users" },
          { title: "市場報告", body: "把市場探查那一頁展開，補價格帶、競品、通路。", icon: "chart-column" },
        ],
        featureNote: "核心服務",
        footnote: "網紅與活動配套：只投廣告不夠，需要的話一起規劃，費用另計。",
      },
      {
        type: "tracks",
        heading: "接上通路之後，我們還在",
        passiveLabel: "通路夥伴做的",
        passive: "上架、陳列、出貨\n平台上的日常營運\n自己熟悉的客群",
        activeLabel: "我們做的",
        active: [
          { label: "產品證", body: "交給持證進口商代辦代持" },
          { label: "試用", body: "證還在跑的那幾週，先讓人用過" },
          { label: "數據", body: "每月看廣告、點擊、轉換、銷售" },
          { label: "合約", body: "你只跟我們簽一份，通路那邊我們去對" },
        ],
        ending: "你不用一家一家去談、一家一家去催。",
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
        details: ["產品證 6～12 週，證下來貨就上架；這段時間活動先跑", "通路的抽成依通路不同、產品到當地的包裝與說明調整另計，第一次談會先講清楚。"],
      },
    ],
    faqs: [
      { question: "為什麼不直接投廣告？", answer: "老實說，我們的經驗是不夠。菲律賓的消費者看網紅、看活動、看有沒有人真的用過，廣告只是其中一段。", takeaway: "菲律賓的消費者要先看到有人用過" },
      { question: "賣不動怎麼辦？", answer: "寄賣是賣多少算多少，不會逼你進貨。三個月看數字，賣不動我們會直接說。", takeaway: "賣多少算多少，三個月看數字" },
      { question: "證掛在誰名下？", answer: "產品證由持證進口商代辦、代持。合約寫清楚轉移配合：換進口商只換一張合約，不用從頭重辦。我們不綁任何一家通路。", takeaway: "持證進口商代持，不綁任何一家通路" },
      { question: "你們是通路嗎？", answer: "我們不開店、不買斷你的貨。我們把你接到已經在賣的通路，然後把證、試用、數據、合約這些通路不做的事接起來。", takeaway: "不是，我們把你接到通路" },
    ],
    next: { label: "下一章 →", title: "第九個月 · 公司落地", heading: "開始想要在當地有自己的人", href: "/services/localization", image: "/images/hero-video/chapter-storefront-1600.webp", imageAlt: "夜晚街角的咖啡店與行人" },
    cta: {
      title: "看你的產品適不適合寄賣",
      body: "沒做過市場探查也可以聊，我們會先問你在台灣賣得怎麼樣。\n有時候聽完，我們會建議你先做市場探查，或再等等——那也是一種答案。",
      notes: "第一次談 30 分鐘，不收費。\n談完給你一頁：建議從哪一章開始，或建議再等等。\n要不要走、走幾章，由你決定。",
      action: "預約 30 分鐘 →",
      footnote: "送出後 24 小時內回覆。",
    },
    partnerStrip: {
      body: "你是通路？電商店家、連鎖、餐飲集團，想要更多台灣品牌上架？\n我們帶來的品牌都先做過市場探查、證走持證進口商、合約跟我們簽，你專心做通路。",
      action: "成為通路夥伴 →",
      href: "/contact#partners",
    },
  },
  m9: {
    key: "m9",
    path: "/services/localization",
    label: "第九個月 · 公司落地",
    title: "開始想要在當地有自己的人",
    scene: "賣得動了。你開始想：要不要開一間自己的公司、找第一個員工、把證掛到自己名下。\n然後你發現，每一件事都需要有人在當地。\n我們和當地夥伴把這些事接起來，你只對一個窗口。",
    image: "/images/services/stage-04-asian-team-1600.webp",
    imageAlt: "亞洲團隊在辦公室協作",
    heroAction: "聊聊你想在菲律賓開什麼 →",
    showChapterBar: true,
    scenariosHeading: "你可能卡在這三個地方之一",
    scenarios: [
      { title: "想在當地設點，成本與時程不明", body: "寄賣或代理跑順了，想在當地設點，不知道從註冊到招聘要花多少、多久", answer: "先問清楚你要開什麼公司、要幾個人、實體還是遠程；再給你成本框架：註冊、律師、招聘、場地各大概多少，以及時間表", image: "/images/services/scenarios/m9-1-1600.webp", imageAlt: "馬尼拉 Ayala 大道的商業區街景" },
      { title: "開第一家店，擔心配方與選址", body: "連鎖餐飲、美業品牌，想開第一家店，怕被拿走配方、怕選錯區", answer: "合約與文件交給當地律師；選址與開店由當地夥伴陪跑，他們自己從零開過店", image: "/images/services/scenarios/m9-2-1600.webp", imageAlt: "咖啡店老闆在門口舉著營業中的牌子" },
      { title: "想在菲律賓聘遠程團隊", body: "在台灣有團隊，想在菲律賓聘人遠程做，不知道怎麼合規", answer: "人在當地、報告給台灣：招聘與到職由當地夥伴處理，合規文件交給當地律師", image: "/images/services/scenarios/m9-3-1600.webp", imageAlt: "透過筆電進行視訊會議" },
    ],
    sections: [
      {
        type: "table",
        heading: "落地的每一件事，都要有人在當地",
        rows: [
          { task: "公司註冊、律師文件", owner: "當地律師，我們當你的窗口" },
          { task: "招聘：實體或遠程團隊", owner: "當地夥伴負責面試、到職、第一批人的訓練" },
          { task: "FDA 證照", owner: "先由持證進口商代持；要掛到你自己的公司名下時，我們協助申請" },
          { task: "場地、設備、日常營運", owner: "當地夥伴的營運團隊，陪到第一批人到位、流程跑順" },
          { task: "你的角色", owner: "做決定、看進度，不用一直飛", isYou: true },
        ],
      },
      {
        type: "cards",
        heading: "我們的當地夥伴走過的三條路",
        items: [
          { title: "第一條 · 從零開始", body: "在當地蓋一間英語教育機構——招募師資、找場地、招第一個學生。\n後來也從零做起一個連鎖手搖飲品牌", fit: "適合：要在當地從頭建團隊、開店的品牌" },
          { title: "第二條 · 改了再帶過去", body: "台灣的產品到了當地，改名字、改價格、改包裝，\n變成當地人願意掏錢的樣子", fit: "適合：產品好、但知道當地口味和價格帶不一樣的品牌" },
          { title: "第三條 · 原封不動帶過去", body: "一個台灣的美業品牌，什麼都不改，只做當地的行銷，看它站不站得住", fit: "適合：品牌本身就是賣點、不想動產品的" },
        ],
        ending: "三條路的成本、坑、時間都不一樣。第一次談，我們會先問你比較像哪一條",
      },
      {
        type: "price",
        title: "按案報價",
        caption: "公司落地是四章裡最大的一包，多數品牌不需要一開始就走到這裡。\n先問清楚你要開什麼，再給你成本框架與時間表。",
        details: [],
        breakdown: {
          heading: "談清楚之後會給你",
          rows: [
            { item: "公司註冊", note: "依公司類型給大概範圍" },
            { item: "律師文件", note: "依文件範圍給大概範圍" },
            { item: "招聘", note: "依人數、實體或遠程給大概範圍" },
            { item: "場地", note: "依地點與規模給大概範圍" },
            { item: "時間表", note: "依公司類型與人數排出時程" },
          ],
        },
      },
    ],
    faqs: [
      { question: "一定要先做市場探查跟寄賣嗎？", answer: "不一定。已經有菲律賓通路、確定要開公司的，可以直接談落地。\n還沒賣動的，我們多半會建議你先從市場探查或寄賣開始。", takeaway: "不一定，可以直接談落地" },
      { question: "你們負責合規嗎？", answer: "證幫你申請、坑幫你避，合規的最終責任在品牌方，這一點會清楚寫進合約。", takeaway: "協助申請與避坑，責任歸屬寫進合約" },
      { question: "遠程團隊是什麼意思？", answer: "台灣公司在菲律賓聘人，人在當地、報告給台灣。菲律賓很流行這種做法，我們幫你把合規和招聘處理好。", takeaway: "人在當地，報告給台灣" },
      { question: "你們會替我經營當地公司嗎？", answer: "不會。我們做的是統籌與代跑：把註冊、招人、證照、場地這些事接起來，陪到第一批人到位、流程跑順。\n公司是你的，決定也是你的。我們不替你經營，也不保證證照哪一天下來——審核時間不是我們能壓的。", takeaway: "不會。我們統籌、代跑，公司是你的" },
    ],
    next: { label: "下一章 →", title: "之後的每一天 · 海外客服", heading: "海外客服，交給專業英語團隊", href: "/services/call-center", image: "/images/hero-video/chapter-callcenter-1600.webp", imageAlt: "一邊通話一邊打字的客服人員", maxTierWidth: 1600 },
    cta: { title: "聊聊你想在菲律賓開什麼", body: "先說你比較像三條路的哪一條，我們告訴你大概要多少、多久。\n有時候聽完，我們會建議你再等等——那也是一種答案。", notes: "第一次談 30 分鐘，不收費。\n談完給你一頁：建議從哪一章開始，或建議再等等。\n要不要走、走幾章，由你決定。", action: "預約 30 分鐘 →", footnote: "送出後一個工作天內回覆。" },
  },
  after: {
    key: "after",
    path: "/services/call-center",
    label: "之後的每一天 · 海外客服",
    title: "海外客服，交給專業英語團隊",
    scene: "一封英文客訴信。退貨、換貨、問哪裡有賣。\n在台灣請一個英文客服，難招也難留；但客人的信不能不回。",
    image: "/images/services/pillar-team-collab-1600.webp",
    imageAlt: "客服團隊在辦公室協作",
    heroAction: "預約 30 分鐘初步評估 →",
    showChapterBar: true,
    scenariosHeading: "你可能已經卡在這三個地方",
    scenarioAnswerLabel: "我們的做法",
    scenarios: [
      { title: "海外客訴回不了", body: "貨在海外賣了，英文的客訴、退換貨、詢問一直進來，你們回不了，或回得很慢。", answer: "把客服信箱、平台訊息、社群私訊接到同一個地方，由我們在菲律賓的英語客服接手回覆。", image: "/images/services/scenarios/after-1-1600.webp", imageAlt: "手上拿著待處理的退貨包裹" },
      { title: "想請一個英文客服，請不到也留不住", body: "職缺開了很久，英文好的人不多；好不容易請到，教會了，人又走了，一切從頭來。", answer: "招人、訓練、排班、有人離職再補，都由我們處理。你不用自己養一個英文客服。", image: "/images/services/scenarios/after-2-1600.webp", imageAlt: "戴著耳機的客服人員" },
      { title: "找過外包，報價看不懂", body: "問過台灣的客服外包，價格不便宜，也說不清楚錢花在哪。", answer: "第一次談就給你報價區間，放在「自己請一個人」的成本旁邊比。服務規則、合約與品質指標由我們在台灣負責。", image: "/images/services/scenarios/after-3-1600.webp", imageAlt: "指著帳單上的金額討論" },
    ],
    sections: [
      {
        type: "steps",
        heading: "客服服務流程",
        items: [
          { number: "01", title: "訊息集中到同一個工作台", body: "客服信箱、平台訊息、社群私訊，接到同一個工作台", icon: "inbox" },
          { number: "02", title: "由英語客服團隊接手", body: "我們找的是英文溝通專業的菲律賓客服，上線前先用你的產品和規則訓練。\n有人請假或離職，由團隊補上，你不用重新招人。", icon: "badge-check" },
          { number: "03", title: "依品牌規則回覆", body: "回覆範本、退換貨規則、哪些情況要轉回給你處理，開始前一起寫成你的服務規則，之後照規則回。", icon: "list-checks" },
          { number: "04", title: "每月服務報表", body: "每月的訊息量、回覆時間、轉回給你的次數，一份報表看清楚。", icon: "chart-column" },
        ],
      },
      {
        type: "dark-copy",
        heading: "人在菲律賓，規則在台灣",
        paragraphs: [
          "台灣企業平均要花近 45 天才找到一位員工，新人待滿半年的只有六成二（104 人力銀行《2026 年人資 FBI 報告》）。你要找的，還得英文好、願意長期做客服。菲律賓長年是英語客服外包的主要地區之一，這樣的人才是整個產業累積出來的。",
          "服務規則、合約與品質指標留在台灣，你面對的窗口是我們，不是當地的外包廠。我們只接你的客人主動來問的事：不做電話行銷、不做催收，也不做資料輸入這類後勤。",
        ],
      },
      {
        type: "fit",
        heading: "適合的品牌",
        lead: "已經在海外銷售，或正準備出海、需要英文客服的品牌",
        items: [
          { label: "寄賣階段", body: "電商平台開始有訂單，客訴、退換貨與商品詢問需要即時回覆" },
          { label: "公司落地之後", body: "當地門市或團隊成立，客服量變大，需要穩定的服務流程" },
          { label: "北美市場", body: "在北美賣，英文客服交給菲律賓團隊接，不必在北美另外請客服。" },
        ],
        image: "/images/services/fit/call-center-fit-1600.webp",
        imageAlt: "兩位團隊成員一邊看筆電一邊包裝網路訂單",
      },
      { type: "waitlist" },
    ],
    faqs: [
      { question: "跟自己請一個英文客服比，差在哪？", answer: "自己請，你要招人、訓練、帶人，有人離職就從頭來。交給我們，招募、訓練、排班和補人都由我們處理；服務規則、合約和品質指標在台灣，你面對的窗口是我們，不是菲律賓的外包廠。前三個月由創辦人親自帶第一批團隊，把你的規則寫進流程，再交給固定的主管。", takeaway: "不用自己招、自己帶、自己補人" },
      { question: "現在可以簽嗎？", answer: "現在還不能簽。預計 2027 Q1 開始服務；現在先約 30 分鐘聊需求，約過的品牌開放時優先。時程有變，我們會先通知你。", takeaway: "預計 2027 Q1 開始，約過的優先" },
      { question: "訊息量很小也可以嗎？", answer: "可以先約。首批我們想找的是量不大、但每一封都重要的品牌，一起把服務磨好。如果你的量小到自己回比較划算，我們會直接說。有時候我們會建議你再等等，那也是一種答案。", takeaway: "可以談，但划不划算我們會直說" },
    ],
    next: { label: "故事從頭來 →", title: "第一個月 · 市場探查", heading: "先驗證市場，再決定投入", href: "/services/product-testing", image: "/images/hero-video/chapter-research-1600.webp", imageAlt: "會議中討論圖表的團隊" },
    cta: { title: "先約 30 分鐘", body: "免費初步評估。聊你現在的客訊量、誰在接、卡在哪；外包和自己請人哪個划算，第一次就告訴你。", action: "預約 30 分鐘初步評估 →", href: "#waitlist" },
  },
  na: {
    key: "na",
    path: "/services/north-america",
    label: "北美通路",
    title: "把台灣產品，送進北美的貨架",
    scene: "從亞洲超市到 Costco 這類量販通路——選品、送評、展覽、上桌談判，由北美團隊在當地執行。適合已經在台灣站穩、準備好面對北美採購條件的品牌。",
    image: "/images/services/pillar-channel-aisle-1600.webp",
    imageAlt: "超市貨架上的商品",
    heroAction: "免費初步評估 30 分鐘 →",
    showChapterBar: false,
    scenariosHeading: "你可能已經卡在這裡",
    scenarios: [
      { title: "想進北美，不知道第一步", body: "產品在台灣站穩了，想去北美，但不知道第一步是參展、寄樣，還是先改包裝。", answer: "先做市場研究與選品：哪一支先去、什麼規格、什麼價格帶。有時候答案是「這一支先別去」。", image: "/images/services/scenarios/na-1-1600.webp", imageAlt: "超市走道上的購物車" },
      { title: "參過展、寄過樣品，沒有下文", body: "名片收了一疊，樣品寄了好幾箱，然後就沒有然後了。", answer: "北美團隊在當地處理送評、展位與買家跟進，展後的每一張名片都有人接著追。", image: "/images/services/scenarios/na-2-1600.webp", imageAlt: "人潮熱絡的商業展覽會場" },
      { title: "擔心行銷預算回不來", body: "怕砸了幾百萬行銷，最後只換到一次教訓。", answer: "先花小錢確認通路要不要你，再決定下一筆。費用分段報，第一次談就講清楚。", image: "/images/services/scenarios/na-3-1600.webp", imageAlt: "筆電上的數據分析儀表板" },
    ],
    sections: [
      {
        type: "steps",
        heading: "北美這條路，分四步走",
        items: [
          { number: "步 01", title: "市場研究與選品", body: "哪一支產品先去、什麼規格、什麼價格帶。", icon: "search" },
          { number: "步 02", title: "送評與展覽", body: "寄樣給通路評估、安排展位，把買家帶到你桌前。", icon: "presentation" },
          { number: "步 03", title: "上桌談判", body: "合約條件、付款期、首單量。", icon: "handshake" },
          { number: "步 04", title: "進通路", body: "時間看品類和通路。食品與保健品要先完成 FDA 註冊與標示，通常比較久；第一次談，我們會給你這支產品的時間表。", icon: "store" },
        ],
      },
      {
        type: "two-cards",
        heading: "誰在做",
        items: [
          { title: "北美團隊", body: "在當地執行：研究、送評、展覽、FDA 註冊與標示、談判。" },
          { title: "鹿飛", body: "在台灣當你的窗口：一份合約，有事找同一個人。" },
        ],
      },
      {
        type: "price",
        title: "分段報價，先小後大",
        details: ["先做研究與送評，確定要上桌了，再報下一段。第一次談就給明確數字。"],
      },
    ],
    faqs: [
      { question: "北美通路要多久？", answer: "看品類和目標通路。食品與保健品要先完成 FDA 註冊與標示，通常比一般消費品久。第一次談，我們會給你這支產品的時間表。", takeaway: "看品類和通路" },
      { question: "保證進得去嗎？", answer: "不保證。通路收不收，是通路決定的。我們保證的是每一步都有人追、每一步都讓你看到結果。產品還沒準備好面對北美的條件時，我們會直接建議你再等等——那也是一種答案。", takeaway: "不保證，但每一步都有人追" },
      { question: "跟菲律賓四章有關係嗎？", answer: "兩條線。北美由北美團隊在當地執行，鹿飛是你在台灣的窗口；要去北美的品牌如果需要英文客服，可以搭配海外客服。", takeaway: "兩條線，可搭配海外客服" },
    ],
    next: { label: "延伸服務 →", title: "海外客服", heading: "去北美的品牌，第一封英文客訴信也會來", href: "/services/call-center", image: "/images/hero-video/chapter-callcenter-1600.webp", imageAlt: "一邊通話一邊打字的客服人員", maxTierWidth: 1600 },
    cta: { title: "先談 30 分鐘", body: "免費初步評估。先說你的產品現在在哪裡賣、賣得怎麼樣，我們一起看北美是不是你現在該走的那一步。不收費，談完你會知道下一步。", action: "預約 30 分鐘 →" },
  },
};
