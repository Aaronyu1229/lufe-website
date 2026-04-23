/**
 * 政府出海補助 — 當期可申請計畫
 *
 * 這裡的每一筆都對應到鹿飛實際能協助的服務階段。
 * 內容要更新時只要改這份檔案，卡片與 /resources/subsidies 頁面會同步。
 *
 * 資料來源：經濟部、國際貿易署、中小及新創企業署公告整理
 * 最後更新：2026 年 4 月
 */

export type SubsidyStage = "assess" | "enter" | "optimize";

export type Subsidy = {
  readonly slug: string;
  readonly num: string;
  readonly agency: string;
  readonly program: string;
  readonly shortTitle: string;
  readonly amount: string;
  readonly amountNote?: string;
  readonly oneLiner: string;
  readonly whoFor: readonly string[];
  readonly covers: readonly string[];
  readonly lufeAngle: string;
  readonly stage: SubsidyStage;
  readonly accent: "sky" | "gold" | "ember";
  readonly deadline: string;
  /** ISO date string (YYYY-MM-DD) for subsidies with a concrete deadline. Omit for open-ended programs. */
  readonly deadlineDate?: string;
  readonly applicationNote: string;
  readonly iconKey: "globe" | "booth" | "factory" | "cart";
  readonly sourceUrl?: string;
  /** 例如「115 年度加碼版」；非空時卡片會顯示醒目標記 */
  readonly highlight?: string;
  /** 強化 highlight 的一句話脈絡，例如「歷年最優 · 用罄即止」 */
  readonly highlightNote?: string;
  /** 可補助費用項目的明細（給展開區塊用，不干擾 covers 的簡列） */
  readonly coversDetail?: readonly {
    readonly title: string;
    readonly note: string;
    readonly limit?: string;
  }[];
  /** 申請與核銷流程步驟 */
  readonly processSteps?: readonly {
    readonly title: string;
    readonly note: string;
  }[];
  /** 容易被忽略的關鍵注意事項 */
  readonly importantNotes?: readonly string[];
  /** 官方公告的最後確認日（ISO）— 讓使用者知道資料新鮮度 */
  readonly verifiedOn?: string;
};

export const SUBSIDIES: readonly Subsidy[] = [
  {
    slug: "market-expansion",
    num: "01",
    agency: "經濟部 · 國際貿易署",
    program: "補助廠商分散及開拓海外市場計畫",
    shortTitle: "海外市場布建補助",
    amount: "最高 NT$2,000 萬",
    amountNote:
      "單一企業最高 500 萬 · 2 家以上聯合申請最高 2,000 萬 · 政府補助不超過總經費 50%，企業自籌 50% 以上",
    oneLiner:
      "建海外分公司、發貨倉、服務中心，或找代理商、經銷商、做 O2O 布建——這個計畫為實體通路而生。執行單位是中華民國管理科學學會，官網 d-imdp.org.tw。",
    whoFor: [
      "依「出進口廠商登記辦法」登記為出進口廠商的公司或商號",
      "要在海外新設分公司 / 子公司 / 發貨倉 / 服務中心的品牌",
      "要新增海外代理商、經銷商或做 O2O 通路布建的企業",
      "須提出「受美國關稅政策影響」情形說明及佐證資料",
    ],
    covers: [
      "新設海外分公司、子公司、展示中心",
      "新設海外發貨倉庫、服務中心",
      "新增海外代理商、經銷商",
      "虛實整合（O2O）、跨境電商平台布建",
      "新商業模式 / 整體解決方案",
      "市場調查與通路布建相關費用",
    ],
    coversDetail: [
      {
        title: "海外實體據點新設",
        note: "分公司、子公司、展示中心、發貨倉庫、服務中心——本計畫的主軸就是實體通路，海外據點的設立費用是核心可補助項目。",
        limit: "依經費編列原則",
      },
      {
        title: "海外代理商 / 經銷商新增",
        note: "新增代理商或經銷商相關費用。包含洽商、法律審閱、授權合約建置。",
        limit: "核實報銷",
      },
      {
        title: "虛實整合（O2O）與跨境電商布建",
        note: "線上線下整合、跨境電商平台上架與布建相關費用。可涵蓋平台建置而非廣告投放。",
        limit: "新商業模式",
      },
      {
        title: "新商業模式 / 整體解決方案",
        note: "多元、創新、整合型的通路方案。須提出創新性與可複製性論述。",
        limit: "鼓勵創新",
      },
      {
        title: "市場調查與研究費",
        note: "委外市場調查、消費者行為研究、通路情報蒐集。須明確服務於通路布建目標。",
        limit: "核實報銷",
      },
      {
        title: "人事費、差旅、認證檢測",
        note: "依官方「經費編列原則」附件逐項報支；差旅與人事有科目上限規定，建議下載作業原則 PDF 逐項確認。",
        limit: "依附件規定",
      },
    ],
    processSteps: [
      { title: "線上申請", note: "到 d-imdp.org.tw 上傳計畫書、公司登記文件、受關稅影響佐證。" },
      { title: "書面審查", note: "審查委員審核計畫書內容、預算合理性、KPI 可行性。" },
      { title: "簡報答辯", note: "15-30 分鐘簡報 + 委員詢答。補件機會通常只有一次。" },
      { title: "核定公告", note: "於經濟部 / 貿易署網站公告受補助廠商名單與核定額度。" },
      { title: "簽約與分期撥款", note: "簽約後撥第 1 期款；期末審查通過後撥尾款，須檢附結案報告、經費收支明細、佐證單據。" },
    ],
    importantNotes: [
      "本計畫明確排除「參展、拓銷團、買主媒合」三類——這三項請走 02 海外參展補助（IMDP），兩者不重疊",
      "同一項目不得重複獲其他政府補助，違反即不符資格",
      "計畫書須承諾具體 KPI（新增代理商數、海外訂單金額等），執行未達成將按比例扣減補助款",
      "114 年度受理已於 2025/11/6 截止；115 年度預計上半年公告，建議關注貿易署或 d-imdp.org.tw 公告",
    ],
    lufeAngle:
      "鹿飛剛好專做「通路進入、落地執行」——我們幫你把海外據點評估、代理商媒合、O2O 布建寫成能過審的計畫書（市場分析、通路策略、量化 KPI 都是日常產出）。提醒：如果你是要去參展，不是走這個計畫，是走 02 海外參展補助。",
    stage: "enter",
    accent: "gold",
    deadline: "115 年度待公告（114 年度 2025/11/6 已截止）",
    applicationNote: "執行單位：中華民國管理科學學會",
    iconKey: "globe",
    sourceUrl: "https://www.d-imdp.org.tw",
    verifiedOn: "2026-04-23",
  },
  {
    slug: "overseas-exhibition",
    num: "02",
    agency: "經濟部 · 國際貿易署",
    program: "補助公司或商號參加海外國際展覽",
    shortTitle: "海外展覽參展補助",
    amount: "每展最高 NT$16 萬",
    amountNote:
      "1 攤補助 12 萬，每增一攤 +1 萬，封頂 16 萬 · 補助比例最高 90%，企業自籌 10%",
    oneLiner:
      "因應國際關稅情勢，經濟部依特別條例加碼補助赴海外參展。往年每展 4-5 萬，115 年度加碼至 16 萬，歷年最優。",
    whoFor: [
      "要參加北美、東南亞 B2B 展覽的企業",
      "新創事業與新南向農業業者享特殊優先待遇",
      "想透過展覽直接接觸通路買手與海外代理商",
    ],
    covers: [
      "場地租金（必要項目）",
      "場地佈置費",
      "口譯費（每日上限 NT$14,000）",
      "展品運費（限至國外）",
      "型錄 / DM / 名片等印刷費",
      "展前展中文宣廣告費",
    ],
    coversDetail: [
      {
        title: "場地租金",
        note: "攤位租賃費用，所有申請案的必備項目。核實報銷。",
        limit: "必要項目",
      },
      {
        title: "場地佈置費",
        note: "攤位設計與裝潢費用。核實報銷，單據須齊全。",
        limit: "核實報銷",
      },
      {
        title: "口譯費",
        note: "口譯人員須為非參展廠商並出具切結書。不含午休時間。",
        limit: "每日上限 NT$14,000",
      },
      {
        title: "展品運費",
        note: "限「至國外」的展品來回運費。國內運費不得申請。",
        limit: "限國外段",
      },
      {
        title: "印刷費",
        note: "型錄、DM、名片等印刷品。須提供實品或照片樣本（不可為設計檔）。",
        limit: "核實報銷",
      },
      {
        title: "文宣廣告費",
        note: "展前展中之宣傳廣告投放費用。須附實品照片樣本。",
        limit: "核實報銷",
      },
    ],
    processSteps: [
      { title: "展前申請", note: "線上填寫公司資料、展覽資訊、預算表。" },
      { title: "審查核配", note: "貿易署審查資格、保留補助額度（尚未撥款）。" },
      { title: "赴海外參展", note: "攤位明顯處張貼臺灣一等一標誌（A3 以上）。" },
      { title: "展後核銷", note: "展後 1 個月內檢附單據、發票、攤位照片。" },
      { title: "撥款入帳", note: "審查通過後匯入公司帳戶。" },
    ],
    importantNotes: [
      "款項非核定後即撥付，而是展後核銷審查通過才撥款",
      "攤位明顯處須張貼臺灣一等一標誌（A3 以上），忘了貼會影響核銷",
      "一年分 2 次公告，115 年度第 2 次預計 4-5 月開放，經費用罄即止",
    ],
    lufeAngle:
      "我們幫客戶規劃展覽策略、媒合買手、設計展位話術，也協助準備申請資料與展後核銷。補助解決錢的問題，鹿飛解決要和誰談、怎麼談、怎麼不卡核銷的問題。",
    stage: "enter",
    accent: "sky",
    highlight: "115 年度加碼版",
    highlightNote: "歷年最優 · 經費用罄即止",
    deadline: "預計 4-5 月開放（第 2 次公告）",
    applicationNote: "第 2 次公告 · 展覽執行期 115/7/1–115/12/31",
    iconKey: "booth",
    sourceUrl: "https://www.trade.gov.tw/Pages/List.aspx?nodeID=3054",
    verifiedOn: "2026-04-23",
  },
  {
    slug: "supply-chain-support",
    num: "03",
    agency: "行政院 · 跨部會方案",
    program: "因應美國關稅我國出口供應鏈支持方案",
    shortTitle: "產地轉移 & 出口供應鏈支持",
    amount: "總經費 NT$930 億 · 20 項措施",
    amountNote:
      "研發轉型單案最高 500 萬 / 聯盟 4,000 萬 · 爭取訂單單家 500 萬 / 聯合 2,000 萬 · 外銷貸款保證中小微每家 6,000 萬",
    oneLiner:
      "行政院 114 年 5 月核定、8 月施行的跨部會方案，涵蓋 9 大面向、20 項措施，整合研發補助、訂單爭取、貿易融資、信保加碼、產業轉型等工具。執行期至 116 年底。",
    whoFor: [
      "月平均對美出口較基期衰退 10% 以上的製造業（輸美實績衝擊門檻）",
      "客戶取消 / 展延訂單、要求吸收關稅、貨品遭退運的企業",
      "考慮產地轉移到東南亞、墨西哥的出口商",
      "優先產業：工具機、機械、汽車零配件、扣件、水五金、手工具、塑膠、自行車、紡織",
    ],
    covers: [
      "研發轉型與製程升級補助（產發署）",
      "海外新訂單爭取補助（貿易署）",
      "貿易融資利息減碼",
      "外銷貸款優惠保證（信保基金）",
      "中小微多元發展貸款",
      "保稅 / 通關 / 稅務優惠",
    ],
    coversDetail: [
      {
        title: "研發轉型補助",
        note: "產發署主辦，總經費 250 億。雙軸轉型、技術加值、跨域整合、行銷布局。可涵蓋研發人事、委託研究、檢測驗證、設備採購（設備費 ≤ 40%）。",
        limit: "單 500 萬 / 聯盟 4,000 萬",
      },
      {
        title: "海外新訂單爭取",
        note: "貿易署主辦，總經費 100 億。新設海外展示中心、服務中心、發貨倉庫、代理商、經銷商，以及加碼參展、共同品牌行銷。自籌 50%+。",
        limit: "單 500 萬 / 聯合 2,000 萬",
      },
      {
        title: "貿易融資利息減碼",
        note: "財政部主辦，總額度 2,000 億。一般企業年利率減碼 1%（上限 100 萬）；中小企業減碼 1.5%（上限 120 萬）。",
        limit: "中小上限 120 萬",
      },
      {
        title: "外銷貸款優惠保證",
        note: "信保基金加碼。中小微企業每家上限 6,000 萬、保證成數 9.5 成；非中小微每家上限 1 億、成數 8-9 成。減免 2 年保證手續費。",
        limit: "中小微 6,000 萬",
      },
      {
        title: "中小微企業多元發展貸款",
        note: "中企署專案。每家上限 3,500 萬、利率 2.22%。1,000 萬以內半年減免 1.5% 利率。",
        limit: "每家 3,500 萬",
      },
      {
        title: "輸出保險與通關優惠",
        note: "徵信費與保險費最低 1 折（額度 1,650 億）。保稅區通關免裝箱單、海關遠端稽核。產創條例研發 / 智慧機械 / 節能減碳投資抵減。",
        limit: "依個案核定",
      },
    ],
    processSteps: [
      { title: "確認受衝擊事證", note: "具備 4 項事證之一：客戶取消訂單、要求吸收關稅、貨品遭退運、其他具體影響。" },
      { title: "選擇工具", note: "研發轉型走產發署、海外訂單走貿易署、融資信保走承貸銀行與信保基金。" },
      { title: "線上提案 / 送件", note: "研發個案走 citd.ekm.org.tw；聯盟走 eii.nat.gov.tw；融資走配合銀行。" },
      { title: "審查核定", note: "研發補助書面 + 簡報審查；融資 / 信保由銀行與信保基金併案評估。" },
      { title: "分期撥款與成效追蹤", note: "依里程碑分期撥款，每季或結案提報產地轉移進度與新訂單金額。" },
    ],
    importantNotes: [
      "輸美實績衝擊門檻：月均對美出口較基期（前一年同期 / 前一年下半年 / 當年 1-2 月，三者擇一）衰退 10% 以上",
      "諮詢專線：工業方案 0800-056-476 · 綜合諮詢 0800-280-280 · 線上專區 twustariff.ey.gov.tw",
      "同一事項不得重複補助——多工具可併行申請，但同一筆支出不得同時向兩個工具請款",
      "施行期：114/8/7 至 116/12/31，部分措施隨預算用罄而截止，建議盡早申請",
    ],
    lufeAngle:
      "鹿飛做過實際案例「中國轉越南」的產地轉移，從設廠評估、供應商媒合、出口流程到 HS Code 原產地重新認定全程陪跑。這個方案的研發補助和訂單爭取剛好對應我們「優化」階段的服務；而 HS Code 重新認定這一段，可以搭配躍馬集團的 TradePilot 關稅工具做情境試算。",
    stage: "optimize",
    accent: "ember",
    deadline: "施行至 116/12/31",
    applicationNote: "跨部會多工具 · 依個案選擇申請路徑",
    iconKey: "factory",
    sourceUrl: "https://twustariff.ey.gov.tw/page/cases",
    verifiedOn: "2026-04-23",
  },
  {
    slug: "cross-border-ecommerce",
    num: "04",
    agency: "經濟部國際貿易署 · 外貿協會",
    program: "2026 跨境電商海外拓銷韌性輔導方案 + 開拓海外多元市場方案",
    shortTitle: "跨境電商輔導資源",
    amount: "AI 行銷 3 萬換 15 萬 / 買主直達每家 20 萬",
    amountNote:
      "2026 開拓海外多元市場方案：AI 行銷輔導企業出 3 萬獲 15 萬服務 · 深度輔導限 100 家 NT$20 萬 · 買主直達機票住宿實報實銷每家上限 NT$20 萬",
    oneLiner:
      "外貿協會在 2026 有兩大主線：與 Newegg/Amazon/Walmart/eBay 合作的韌性輔導方案，以及涵蓋 AI 行銷、買主直達、海外駐點的多元市場方案。適合想先低成本試水的中小企業。",
    whoFor: [
      "中小企業（資本額 ≤ 1 億或員工 < 200 人）",
      "已完成出進口廠商登記、近 3 年至少 1 年進出口實績",
      "須提出受美國關稅政策影響佐證資料（多元市場方案）",
      "優先產業：工具機、機械、汽車零配件、扣件、水五金、紡織、塑膠、自行車",
    ],
    covers: [
      "Newegg / Amazon / Walmart / eBay 上架與營運輔導",
      "AI 行銷輔導（素材、短影音、產品圖優化）",
      "買主直達：邀請海外買主來台洽談",
      "數位搶單：Taiwantrade / Google / LinkedIn / Meta 投放",
      "深度輔導方案（限 100 家）",
      "Taiwantrade B2B 平台上架與買主媒合",
    ],
    coversDetail: [
      {
        title: "2026 韌性輔導方案（北美主打）",
        note: "TAITRA 與 Newegg、Amazon、Walmart、eBay、Payoneer、FedEx 合作。Newegg 新賣家前 90 天享 6% 固定佣金。說明會免費。聯絡吳先生 02-2725-5200 #3934。",
        limit: "說明會免費",
      },
      {
        title: "AI 行銷輔導",
        note: "AI 素材與短影音製作、AI 產品圖優化、專屬數位行銷顧問陪伴。企業自負 NT$3 萬，獲價值 NT$15 萬的服務——自出資放大 5 倍。",
        limit: "3 萬換 15 萬",
      },
      {
        title: "買主直達",
        note: "邀請海外買主來台洽談採購。機票與住宿實報實銷，每家企業最高 NT$200,000。",
        limit: "每家 20 萬",
      },
      {
        title: "深度輔導方案",
        note: "NT$200,000 / 家，限 100 家企業。含多元拓銷、海外駐點、數位平台整合等綜合服務。",
        limit: "限 100 家",
      },
      {
        title: "數位搶單與企業數據看板",
        note: "Taiwantrade / Google / LinkedIn / Meta / Pinterest / Amazon 平台投放；企業數據看板年費 NT$999；產業市場研析報告。",
        limit: "數據看板 999/年",
      },
      {
        title: "Taiwantrade B2B 平台",
        note: "國家級 B2B 平台，基礎會員免費。同步上架 Amazon、eBay 全球平台，年逾 2,000 萬美元採購商機。",
        limit: "基礎免費",
      },
    ],
    processSteps: [
      { title: "參加說明會或線上報名", note: "韌性輔導方案到 events.taiwantrade.com 報名；多元市場方案到 export.taitra.org.tw/special 提交申請。" },
      { title: "資格審查", note: "審核中小企業資格、出進口實績、關稅衝擊佐證。每家限報名核心服務 1 項。" },
      { title: "邀請買主 / 啟動輔導", note: "買主直達啟動海外邀訪；AI 行銷方案啟動 AI 素材與顧問陪跑。" },
      { title: "執行採購洽談 / 投放", note: "依方案執行海外洽談、廣告投放、上架優化。" },
      { title: "核銷申請與款項核撥", note: "補助採事後核銷，企業先出資再申請撥款。核銷最遲 2026/11/15。" },
    ],
    importantNotes: [
      "2026 多元市場方案受理至 2026/9/15，執行至 10/31，核銷至 11/15——時程緊，要申請就現在動",
      "核心服務每家限報名 1 項；報了核心服務後可再報 1 項支援服務",
      "採「先出資、後核銷」——不是現金預撥，企業需要先有現金流",
      "排他性與其他補助互斥細則官方未明載，建議致電外貿協會 02-2725-5200 確認個案",
    ],
    lufeAngle:
      "培訓和平台資源讓你懂怎麼操作，鹿飛幫你決定賣什麼、定價多少、選哪個平台先打、怎麼讓買主直達變成實際訂單。AI 行銷 3 萬換 15 萬是划算的起步；但跨境電商是長期戰，策略和選品才是關鍵。",
    stage: "assess",
    accent: "sky",
    deadline: "2026/9/15 截止（多元市場方案）",
    deadlineDate: "2026-09-15",
    applicationNote: "說明會場次滾動開放 · 深度輔導限 100 家先搶先贏",
    iconKey: "cart",
    sourceUrl: "https://export.taitra.org.tw/special",
    verifiedOn: "2026-04-23",
  },
] as const;

/** 卡片顯示的 hook 文案。大部分頁面走預設；子頁透過 CONTEXTUAL_COPY 覆寫。 */
export const SUBSIDY_CARD_COPY = {
  dismissAria: "關閉補助通知",
  image: "/images/subsidies/card-skyline.jpg",
  hero: "/images/subsidies/hero-handshake.jpg",
  /** Link target — always goes to the matcher section for maximum engagement */
  href: "/resources/subsidies#match",
} as const;

/**
 * ContextualCopy — per-pathname copy overrides.
 * 每個 path prefix 對應一組完整文案（eyebrow / headline / oneLiner / cta）。
 * 用最長前綴匹配，未匹配到就用 default。
 */
export interface ContextualCopy {
  readonly eyebrow: string;
  readonly headline: string;
  readonly oneLiner: string;
  readonly cta: string;
}

const DEFAULT_COPY: ContextualCopy = {
  eyebrow: "2026 政府出海補助",
  headline: "政府正在幫你出海",
  oneLiner: "4 個正在開放的計畫 · 最高 NT$1,000 萬",
  cta: "算算我能拿多少",
};

export const CONTEXTUAL_COPY: readonly {
  readonly pathPrefix: string;
  readonly copy: ContextualCopy;
}[] = [
  {
    pathPrefix: "/services/market-assessment",
    copy: {
      eyebrow: "還沒出海的你",
      headline: "先用免費資源試水溫",
      oneLiner: "跨境電商輔導 · 政府免費培訓 + 廣告資源",
      cta: "看這個計畫",
    },
  },
  {
    pathPrefix: "/services/product-testing",
    copy: {
      eyebrow: "要去海外展覽？",
      headline: "展覽費用可以補助",
      oneLiner: "攤位、佈置、運費、口譯一起補 · 展前 60 天申請",
      cta: "看展覽補助",
    },
  },
  {
    pathPrefix: "/services/channel-entry",
    copy: {
      eyebrow: "準備進通路的你",
      headline: "最高 NT$1,000 萬補助",
      oneLiner: "市場評估 · 通路布建 · 海外據點，全可申請",
      cta: "看完整方案",
    },
  },
  {
    pathPrefix: "/services/localization",
    copy: {
      eyebrow: "已經在海外落地",
      headline: "海外據點設立也能補",
      oneLiner: "品牌行銷、在地團隊、長期營運都涵蓋",
      cta: "看適用範圍",
    },
  },
  {
    pathPrefix: "/services/optimize",
    copy: {
      eyebrow: "關稅壓力太大？",
      headline: "政府有補救方案",
      oneLiner: "產地轉移、研發轉型、貿易融資——專案支援",
      cta: "看適用條件",
    },
  },
  {
    pathPrefix: "/services/methodology",
    copy: {
      eyebrow: "2026 政府出海補助",
      headline: "補助是策略的一部分",
      oneLiner: "4 個計畫怎麼疊加使用最划算",
      cta: "看搭配方法",
    },
  },
  {
    pathPrefix: "/cases/electronics-tariff",
    copy: {
      eyebrow: "這個案例的補助",
      headline: "產地轉移有政府支援",
      oneLiner: "研發轉型 + 貿易融資 · 為這種情況設計",
      cta: "看細節",
    },
  },
  {
    pathPrefix: "/cases/costco-health",
    copy: {
      eyebrow: "這個案例的補助",
      headline: "打進通路可以申請",
      oneLiner: "最高 1,000 萬 · 市場布建補助",
      cta: "看細節",
    },
  },
  {
    pathPrefix: "/cases/bubble-tea",
    copy: {
      eyebrow: "這個案例的補助",
      headline: "海外據點有補助",
      oneLiner: "東南亞落地也能申請 · 最高 500 萬",
      cta: "看細節",
    },
  },
  {
    pathPrefix: "/cases/shoe-brand",
    copy: {
      eyebrow: "要上 Amazon？",
      headline: "跨境電商有免費資源",
      oneLiner: "政府免費培訓 · 平台廣告補助",
      cta: "看這個計畫",
    },
  },
  {
    pathPrefix: "/about",
    copy: {
      eyebrow: "2026 政府出海補助",
      headline: "走完這條線最划算的方法",
      oneLiner: "每個階段都有對應的補助——疊加使用省更多",
      cta: "看怎麼搭配",
    },
  },
  {
    pathPrefix: "/insights",
    copy: {
      eyebrow: "2026 政府出海補助",
      headline: "把知識變成行動",
      oneLiner: "文章讀完不動不行——政府有預算幫你做",
      cta: "看怎麼用",
    },
  },
];

/**
 * 取得該 pathname 的 copy。最長前綴優先，無匹配則回傳 default。
 */
export function getContextualCopy(pathname: string): ContextualCopy {
  if (!pathname) return DEFAULT_COPY;
  const sorted = [...CONTEXTUAL_COPY].sort(
    (a, b) => b.pathPrefix.length - a.pathPrefix.length
  );
  for (const entry of sorted) {
    if (pathname.startsWith(entry.pathPrefix)) return entry.copy;
  }
  return DEFAULT_COPY;
}

/**
 * Contextual routing.
 * 當使用者在特定頁面時，顯示最相關的補助而非泛用版本。
 * 路徑前綴比對——最長匹配優先。
 */
export const CONTEXT_SUBSIDY_MAP: readonly {
  readonly pathPrefix: string;
  readonly subsidySlug: string;
}[] = [
  {
    pathPrefix: "/services/market-assessment",
    subsidySlug: "cross-border-ecommerce",
  },
  {
    pathPrefix: "/services/product-testing",
    subsidySlug: "overseas-exhibition",
  },
  {
    pathPrefix: "/services/channel-entry",
    subsidySlug: "market-expansion",
  },
  {
    pathPrefix: "/services/localization",
    subsidySlug: "market-expansion",
  },
  {
    pathPrefix: "/services/optimize",
    subsidySlug: "supply-chain-support",
  },
  {
    pathPrefix: "/cases/electronics-tariff",
    subsidySlug: "supply-chain-support",
  },
  {
    pathPrefix: "/cases/costco-health",
    subsidySlug: "market-expansion",
  },
  {
    pathPrefix: "/cases/bubble-tea",
    subsidySlug: "market-expansion",
  },
  {
    pathPrefix: "/cases/shoe-brand",
    subsidySlug: "cross-border-ecommerce",
  },
];

export function getSubsidyBySlug(slug: string): Subsidy | undefined {
  return SUBSIDIES.find((s) => s.slug === slug);
}

/** Find the best-matching subsidy for a given pathname. Returns null if none match. */
export function getContextualSubsidy(pathname: string): Subsidy | null {
  // Longest prefix wins so /services/channel-entry matches before /services
  const sorted = [...CONTEXT_SUBSIDY_MAP].sort(
    (a, b) => b.pathPrefix.length - a.pathPrefix.length
  );
  for (const entry of sorted) {
    if (pathname.startsWith(entry.pathPrefix)) {
      const s = getSubsidyBySlug(entry.subsidySlug);
      if (s) return s;
    }
  }
  return null;
}

/** 延續性：把補助對應到 hero 的三個階段。 */
export const STAGE_LABELS: Record<
  SubsidyStage,
  { label: string; desc: string }
> = {
  assess: {
    label: "不確定能不能出海",
    desc: "先用政府資源低成本試水溫",
  },
  enter: {
    label: "準備出海找方向",
    desc: "補助降低市場進入的實際費用",
  },
  optimize: {
    label: "出海中想優化",
    desc: "轉型與供應鏈調整的財務助力",
  },
};

/* ────────────────────────────────────────────────
 * SubsidyMatcher — 4 題自助問卷 + 媒合邏輯
 * 每題有 3–4 個選項。作答後依優先序媒合主推 + 次推。
 * ──────────────────────────────────────────────── */

export type SizeAnswer = "solo" | "small" | "medium" | "large";
export type StageAnswer = "not-yet" | "planning" | "doing" | "optimizing";
export type IndustryAnswer = "food" | "electronics" | "apparel" | "service" | "other";
export type ProblemAnswer =
  | "dont-know-where"
  | "need-channel"
  | "meet-buyers"
  | "reduce-cost"
  | "scale-operations";

export interface MatcherAnswers {
  readonly size: SizeAnswer;
  readonly stage: StageAnswer;
  readonly industry: IndustryAnswer;
  readonly problem: ProblemAnswer;
}

export interface MatcherQuestion<T extends string = string> {
  readonly id: keyof MatcherAnswers;
  readonly label: string;
  readonly sublabel: string;
  readonly options: readonly {
    readonly value: T;
    readonly label: string;
    readonly hint: string;
  }[];
}

export const MATCHER_QUESTIONS: readonly [
  MatcherQuestion<SizeAnswer>,
  MatcherQuestion<StageAnswer>,
  MatcherQuestion<IndustryAnswer>,
  MatcherQuestion<ProblemAnswer>,
] = [
  {
    id: "size",
    label: "你的公司規模大約是？",
    sublabel: "不同規模適用不同計畫，先從這題開始",
    options: [
      { value: "solo", label: "1 人 / SOHO", hint: "個人品牌或新創單打" },
      { value: "small", label: "2–20 人", hint: "小型團隊" },
      { value: "medium", label: "21–200 人", hint: "中型企業" },
      { value: "large", label: "200 人以上", hint: "成熟企業" },
    ],
  },
  {
    id: "stage",
    label: "你現在在哪個階段？",
    sublabel: "決定你最該先申請哪一種補助",
    options: [
      { value: "not-yet", label: "還在觀望", hint: "不確定該不該出海" },
      { value: "planning", label: "準備出海", hint: "決定了但還沒動" },
      { value: "doing", label: "正在出海", hint: "已在談通路 / 鋪貨中" },
      { value: "optimizing", label: "已在海外", hint: "想優化成本或擴大" },
    ],
  },
  {
    id: "industry",
    label: "你的產業是？",
    sublabel: "不同產業有不同的補助重點",
    options: [
      { value: "food", label: "食品 / 保健", hint: "含加工食品、飲品" },
      { value: "electronics", label: "電子 / 消費品", hint: "含 3C、家電、配件" },
      { value: "apparel", label: "服飾 / 配件", hint: "含鞋類、包包" },
      { value: "service", label: "餐飲 / 服務", hint: "含飲料、連鎖" },
      { value: "other", label: "其他製造 / 品牌", hint: "含零組件、工具" },
    ],
  },
  {
    id: "problem",
    label: "你現在最想解決什麼？",
    sublabel: "最後一題——幫我們推薦最對的那個",
    options: [
      {
        value: "dont-know-where",
        label: "不知從何開始",
        hint: "沒頭緒、想先試看看",
      },
      { value: "need-channel", label: "要找海外通路", hint: "要上架、要代理商" },
      { value: "meet-buyers", label: "要接觸買手", hint: "要去展覽、要見採購" },
      {
        value: "reduce-cost",
        label: "成本 / 關稅太高",
        hint: "要搬產線、要降物流",
      },
      { value: "scale-operations", label: "要擴大海外營運", hint: "要建在地團隊" },
    ],
  },
] as const;

/**
 * Matching logic — takes the 4 answers and returns 1 primary + up to 2 secondary subsidies,
 * each with a specific reasoning string for why it matches.
 */
export interface MatchResult {
  readonly primary: {
    readonly subsidy: Subsidy;
    readonly reason: string;
  };
  readonly secondary: readonly {
    readonly subsidy: Subsidy;
    readonly reason: string;
  }[];
  readonly verdict: string;
}

/* ────────────────────────────────────────────────
 * Date-aware helpers — powers the SubsidyCard "still open" logic
 * ──────────────────────────────────────────────── */

/** Returns true if a subsidy is still active (no concrete deadline, or deadline is in the future). */
export function isSubsidyActive(subsidy: Subsidy): boolean {
  if (!subsidy.deadlineDate) return true; // open-ended programs are always active
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadline = new Date(subsidy.deadlineDate + "T23:59:59");
  return deadline >= today;
}

/** Returns count of currently active subsidies. */
export function getActiveSubsidyCount(): number {
  return SUBSIDIES.filter(isSubsidyActive).length;
}

/** Returns the nearest upcoming deadline (formatted), or null if none have concrete dates. */
export function getNearestDeadline(): { formatted: string; daysLeft: number } | null {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let nearest: { formatted: string; daysLeft: number } | null = null;

  for (const s of SUBSIDIES) {
    if (!s.deadlineDate) continue;
    const deadline = new Date(s.deadlineDate + "T00:00:00");
    if (deadline < today) continue;
    const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (!nearest || daysLeft < nearest.daysLeft) {
      const m = deadline.getMonth() + 1;
      const d = deadline.getDate();
      nearest = { formatted: `${m}/${d}`, daysLeft };
    }
  }

  return nearest;
}

/** Format today's date as M/D for display. */
export function getTodayFormatted(): string {
  const now = new Date();
  return `${now.getMonth() + 1}/${now.getDate()}`;
}

export function matchSubsidies(answers: MatcherAnswers): MatchResult {
  const ma = getSubsidyBySlug("market-expansion")!;
  const oe = getSubsidyBySlug("overseas-exhibition")!;
  const sc = getSubsidyBySlug("supply-chain-support")!;
  const ce = getSubsidyBySlug("cross-border-ecommerce")!;

  // Rule tree — ordered by specificity
  // 1) Optimizing + cost problem → supply chain
  if (
    answers.stage === "optimizing" &&
    (answers.problem === "reduce-cost" || answers.problem === "scale-operations")
  ) {
    return {
      primary: {
        subsidy: sc,
        reason:
          "你已經在海外且面臨成本或擴大運營的問題，產地轉移與供應鏈支持方案就是為這種情況設計的。",
      },
      secondary:
        answers.size === "medium" || answers.size === "large"
          ? [
              {
                subsidy: ma,
                reason: "同步申請市場布建補助，可用於海外據點與在地團隊建置。",
              },
            ]
          : [],
      verdict: "你最該優先申請的是：產地轉移 & 供應鏈支持",
    };
  }

  // 2) Not yet started → cross-border ecommerce (free resources)
  if (answers.stage === "not-yet" || answers.problem === "dont-know-where") {
    return {
      primary: {
        subsidy: ce,
        reason:
          "你現階段最該用的是「免費資源」而不是花錢——跨境電商輔導有政府免費培訓與廣告資源，零成本就能開始。",
      },
      secondary:
        answers.size !== "solo" && answers.size !== "small"
          ? [
              {
                subsidy: oe,
                reason:
                  "如果想用展覽快速接觸海外買手，參展補助最高 40 萬可以同步申請。",
              },
            ]
          : [],
      verdict: "先從免費資源開始：跨境電商輔導",
    };
  }

  // 3) Planning or doing + meet-buyers → exhibition
  if (
    (answers.stage === "planning" || answers.stage === "doing") &&
    answers.problem === "meet-buyers"
  ) {
    return {
      primary: {
        subsidy: oe,
        reason:
          "要接觸海外買手最快的路徑就是國際展覽，這個補助把展位、佈置、運費、口譯全包了，新創最高 40 萬。",
      },
      secondary: [
        {
          subsidy: ma,
          reason: "同時申請市場布建補助，展後的通路進入與據點設立可以銜接。",
        },
      ],
      verdict: "展覽是最快的方法：海外展覽參展補助",
    };
  }

  // 4) Planning/doing + need-channel → market expansion (the big one)
  if (
    (answers.stage === "planning" || answers.stage === "doing") &&
    (answers.problem === "need-channel" ||
      answers.problem === "scale-operations")
  ) {
    const primaryReason =
      answers.size === "solo" || answers.size === "small"
        ? "雖然總額最高 1,000 萬，但你的規模申請的是「單一企業最高 500 萬」區間。市場評估、通路談判、在地行銷全可申請。"
        : "你的規模剛好是這個補助的主力對象。從市場評估到據點設立，整條鏈都可以申請——聯合申請甚至能達到 1,000 萬。";

    return {
      primary: {
        subsidy: ma,
        reason: primaryReason,
      },
      secondary: [
        {
          subsidy: oe,
          reason: "參展也能幫助通路進入，展覽補助可同時疊加申請。",
        },
      ],
      verdict: "你的主力補助：海外市場布建補助",
    };
  }

  // 5) Optimizing without cost problem → fall back to market expansion
  if (answers.stage === "optimizing") {
    return {
      primary: {
        subsidy: ma,
        reason:
          "你已經在海外，但還想擴大市場或建立新據點——市場布建補助涵蓋品牌行銷、數位推廣、海外據點維運。",
      },
      secondary: [
        {
          subsidy: sc,
          reason: "如果未來面臨關稅或成本壓力，供應鏈支持方案也可以同步評估。",
        },
      ],
      verdict: "你的主力補助：海外市場布建補助",
    };
  }

  // 6) Generic fallback — market expansion + exhibition
  return {
    primary: {
      subsidy: ma,
      reason:
        "根據你的條件，市場布建補助覆蓋範圍最廣，大部分出海活動都能申請。",
    },
    secondary: [
      {
        subsidy: oe,
        reason: "展覽補助短期見效快，可作為第二順位同時申請。",
      },
    ],
    verdict: "最推薦：海外市場布建補助",
  };
}
