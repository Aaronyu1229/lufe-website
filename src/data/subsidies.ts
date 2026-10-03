/**
 * 政府出海補助 — 當期可申請計畫
 *
 * 這裡的每一筆都對應到鹿飛實際能協助的服務階段。
 * 內容要更新時只要改這份檔案，卡片與 /resources/subsidies 頁面會同步。
 *
 * 資料來源：經濟部、國際貿易署、中小及新創企業署公告整理
 * 最後更新：2026 年 10 月（2026-10-02 逐條核對官方公告）
 */

import { stripLocale } from "@/i18n/locale";

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
  /** 例如「年度加碼版」；非空時卡片會顯示醒目標記 */
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
    program: "補助企業布建海外通路計畫（115 年度）",
    shortTitle: "海外市場布建補助",
    amount: "最高 NT$2,000 萬",
    amountNote:
      "單一企業最高 500 萬 · 2 家以上聯合申請最高 2,000 萬 · 政府補助不超過總經費 50%，企業自籌 50% 以上，且自籌款不得超過實收資本額",
    oneLiner:
      "建海外分公司、發貨倉、展示或維修中心，或新增代理商、經銷商——這個計畫為實體通路而生。114 年度原名「補助廠商分散及開拓海外市場計畫」，115 年度改為現名，執行單位是中華民國管理科學學會。",
    whoFor: [
      "依「出進口廠商登記辦法」登記為出進口廠商的公司或商號（聯合申請時，主導企業須登記）",
      "要在海外新設分公司 / 子公司 / 發貨倉 / 展示或維修中心的品牌",
      "要新增海外代理商、經銷商的企業",
      "非陸資、無欠稅與欠繳推廣貿易服務費，且同一計畫內容未獲其他政府補助",
    ],
    covers: [
      "新設海外分公司、子公司、展示中心",
      "新設海外發貨倉庫、服務（維修）中心",
      "新增海外代理商、經銷商",
      "虛實整合加值作法、電商平台與網站經營",
      "新商業模式 / 整體解決方案",
      "據點租金佈置、海外廣告、翻譯與專業諮詢",
    ],
    coversDetail: [
      {
        title: "海外實體據點新設",
        note: "分公司、子公司、展示中心、發貨倉庫、服務（維修）中心——據點與活動場地的租金、佈置費可補助；佈置費不補助資本門（耐用 2 年以上且 1 萬元以上的設備）。",
        limit: "單科目 ≤ 補助款 50%",
      },
      {
        title: "海外代理商 / 經銷商新增",
        note: "新增代理商或經銷商須提出合約佐證；合約偽造、未確實設立據點或拒絕查核，補助款全數繳回。",
        limit: "須附合約",
      },
      {
        title: "電商平台與網站經營",
        note: "數位通路的平台年費、開辦費、上架費與平台行銷費，以及擴充與經營網站的費用。不含佣金或按銷售量計價的費用。",
        limit: "不含佣金",
      },
      {
        title: "新商業模式 / 整體解決方案",
        note: "多元、創新、虛實整合的加值作法。書面審查中「布建通路之規劃」佔 40%。",
        limit: "鼓勵創新",
      },
      {
        title: "委託勞務費",
        note: "委託海外專業人士的法律、稅務等諮詢，或海外活動代言人。須附委託契約與執行報告。",
        limit: "≤ 補助款 20%",
      },
      {
        title: "國外差旅、廣告、印刷、翻譯",
        note: "差旅限計畫專職人員，依國外出差旅費報支要點報支；文宣不得出現經濟部或本計畫名稱。本計畫經費編列原則沒有人事費科目。",
        limit: "差旅 ≤ 補助款 10%",
      },
    ],
    processSteps: [
      { title: "線上申請", note: "到 market.meettaiwan.com/d-imdp 上傳計畫書、無欠稅證明、票據信用證明、114 年度營所稅申報書等資格文件。" },
      { title: "書面審查", note: "資格審查後由委員線上書審；單家企業擇優進入決審。" },
      { title: "簡報審查（聯合申請）", note: "多家聯合申請案須出席線上簡報審查，由計畫主持人或高階主管出席。" },
      { title: "核定公告", note: "經濟部核定並公告正、備取名單（115 年度第一梯次已於 2026-08-27 公告）。" },
      { title: "簽約與分期撥款", note: "簽約前繳履約保證金（補助款 10%），撥第 1 期 40%；結案後期末審查通過，核實撥付尾款並無息退還保證金。" },
    ],
    importantNotes: [
      "本計畫明確排除「參展、拓銷團、買主媒合」三類——參展請走 02 海外參展補助，邀買主來台請看 04 的買主直達",
      "同一計畫內容不得已獲其他政府補助，違反即不符資格",
      "期末考核 KPI 達成佔 50%；駐外單位查核「欠佳」扣補助 40%、「劣」扣 60%",
      "不可布建的國家：北韓、伊朗、伊拉克、敘利亞、蘇丹、俄羅斯、白俄羅斯、中國大陸（含港澳）",
      "115 年度受理 2026/5/29 至 10/30 18:00，或經費用罄即止；計畫執行至 116/11/30",
    ],
    lufeAngle:
      "鹿飛剛好專做「通路進入、落地執行」——我們幫你把海外據點評估、代理商媒合、O2O 布建寫成能過審的計畫書（市場分析、通路策略、量化 KPI 都是日常產出）。提醒：如果你是要去參展，不是走這個計畫，是走 02 海外參展補助。",
    stage: "enter",
    accent: "gold",
    deadline: "2026/10/30 18:00 截止（或經費用罄）",
    deadlineDate: "2026-10-30",
    applicationNote: "執行單位：中華民國管理科學學會 · 免付費諮詢 0800-235-855",
    iconKey: "globe",
    sourceUrl: "https://market.meettaiwan.com/d-imdp/",
    verifiedOn: "2026-10-02",
  },
  {
    slug: "overseas-exhibition",
    num: "02",
    agency: "經濟部 · 國際貿易署",
    program: "補助公司或商號參加海外國際展覽",
    shortTitle: "海外展覽參展補助",
    amount: "每展最高 NT$16 萬",
    amountNote:
      "115 年度標準：1 攤補助 12 萬，每增一攤 +1 萬，封頂 16 萬 · 補助不超過符合項目的 90%，企業自籌 10% 以上",
    oneLiner:
      "115 年度依「因應國際情勢強化經濟社會及民生國安韌性特別條例」特別預算辦理，每展最高 16 萬、最高補到 90%。116 年度的額度以貿易署公告為準。",
    whoFor: [
      "要參加北美、東南亞實體 B2B 展覽的出進口廠商",
      "新創事業與拓銷新南向農業市場的業者，不受出進口實績限制，並列第 1 優先",
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
      { title: "展前申請", note: "在公告受理期間到 apply.trade.gov.tw/espo 線上申請；帳號與新增展覽審核需 1 個工作天。" },
      { title: "審查核配", note: "評審會議審查並依優先順序核配額度（尚未撥款）。" },
      { title: "赴海外參展", note: "攤位明顯處張貼臺灣一等一標誌（A3 以上），招牌不得標示非我國公司名稱。" },
      { title: "展後核銷", note: "計畫結束後 1 個月內核銷；遇年度終了，須於年度終了後 5 日內辦理。" },
      { title: "撥款入帳", note: "審查通過後匯入公司帳戶。" },
    ],
    importantNotes: [
      "款項非核定後即撥付，而是展後核銷審查通過才撥款",
      "攤位明顯處須張貼臺灣一等一標誌（A3 以上），忘了貼會依扣款原則扣款",
      "一年兩次受理：10–11 月受理次年上半年展覽、4–5 月受理當年下半年展覽；115 年度兩次皆已截止",
      "一般企業全年可申請總額依前一年出進口實績級距設定；新創與新南向農業業者全年 40 萬",
      "北韓、伊朗、俄羅斯、白俄羅斯及中亞五國的展覽不補助",
    ],
    lufeAngle:
      "我們幫客戶規劃展覽策略、媒合買手、設計展位話術，也協助準備申請資料與展後核銷。補助解決錢的問題，鹿飛解決要和誰談、怎麼談、怎麼不卡核銷的問題。",
    stage: "enter",
    accent: "sky",
    highlight: "116 年度待公告",
    highlightNote: "116 年度額度待公告",
    deadline: "116 年度第 1 次預計 10–11 月公告（受理 116 年上半年展覽）",
    applicationNote: "115 年度第 2 次已於 2026/5/19 截止 · 下一輪以貿易署公告為準",
    iconKey: "booth",
    sourceUrl: "https://www.trade.gov.tw/FAQ/Detail.aspx?nodeid=4703",
    verifiedOn: "2026-10-02",
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
      "月平均營業額較基期衰退 10% 以上的製造業（輸美實績衝擊門檻）",
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
        note: "中企署專案。每家上限 3,500 萬、利率 2.22%。一千萬以內半年減免 1.5% 利率。",
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
      "輸美實績衝擊門檻：月均營業額較基期（前一年同期 / 前一年下半年 / 當年 1-2 月，三者擇一）衰退 10% 以上",
      "諮詢專線：工業方案 0800-056-476 · 綜合諮詢 0800-280-280 · 線上專區 twustariff.ey.gov.tw",
      "同一事項不得重複補助——多工具可併行申請，但同一筆支出不得同時向兩個工具請款",
      "施行期：114/8/7 至 116/12/31，部分措施隨預算用罄而截止，建議盡早申請",
    ],
    lufeAngle:
      "我們參與過實際案例「中國轉越南」的產地轉移，從設廠評估、供應商媒合、出口流程到 HS Code 原產地重新認定全程陪跑。這個方案的研發補助和訂單爭取剛好對應我們「優化」階段的服務；而 HS Code 重新認定這一段，可以搭配躍馬集團的 TradePilot 關稅工具做情境試算。",
    stage: "optimize",
    accent: "ember",
    deadline: "施行至 116/12/31",
    applicationNote: "跨部會多工具 · 依個案選擇申請路徑",
    iconKey: "factory",
    sourceUrl: "https://twustariff.ey.gov.tw/page/cases",
    verifiedOn: "2026-10-02",
  },
  {
    slug: "cross-border-ecommerce",
    num: "04",
    agency: "經濟部國際貿易署 · 外貿協會",
    program: "115-116 開拓海外多元市場方案 + 跨境電商海外拓銷韌性輔導",
    shortTitle: "跨境電商輔導資源",
    amount: "AI 行銷 3 萬換 15 萬 / 買主直達每家 20 萬",
    amountNote:
      "AI 行銷：企業分攤 3 萬獲 15 萬平台資源 · 買主直達：機票住宿實報實銷每家上限 NT$20 萬 · 深度輔導（應用 AI 爭取海外商機）官方標示費用 NT$20 萬、名額 100 家",
    oneLiner:
      "外貿協會執行的兩條主線：與 Newegg / Amazon / Walmart / eBay 合作的跨境電商韌性輔導，以及涵蓋 AI 行銷、買主直達、深度輔導的多元市場方案。買主直達受理到 2027/9/15，適合想先低成本試水的中小企業。",
    whoFor: [
      "中小企業（資本額 ≤ 1 億或員工 < 200 人），資本組成不含陸資",
      "已完成出進口廠商登記、近 3 年至少 1 年進出口實績",
      "自 2026/8/14 起，買主直達新申請案不必再附受美國關稅影響佐證",
      "出口產品須為臺灣產製",
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
        title: "跨境電商韌性輔導（北美主打）",
        note: "TAITRA 與 Newegg、Amazon、Walmart、eBay、Payoneer、FedEx 合作；Newegg 新賣家前 90 天享 6% 固定佣金。2026/3 已辦說明會，後續洽吳先生 02-2725-5200 #3934。",
        limit: "洽外貿協會",
      },
      {
        title: "AI 行銷輔導",
        note: "核心服務：企業分攤 NT$3 萬，換得價值 NT$15 萬的平台行銷資源（台灣經貿網、Google、LinkedIn、Meta、Pinterest、Amazon）。支援服務：自付 1,500–8,000 元，換得價值 5,000–60,000 元的 AI 素材、短影音、產品圖優化與顧問陪跑。",
        limit: "3 萬換 15 萬",
      },
      {
        title: "買主直達",
        note: "邀海外買主來台洽談採購，補助機票、住宿（可擇一或兩者都申請）。買主須為在台無據點的外國公司、前一年營業額 10 萬美元以上，每家買主限 1 人，輔導上限依買主營業額級距。",
        limit: "每家 20 萬",
      },
      {
        title: "深度輔導方案",
        note: "「應用 AI 爭取海外商機」，官方標示費用 NT$20 萬、名額 100 家；另有 AI 代理人免費體驗 400 家。洽 02-2725-5200 #1183 / #1184。",
        limit: "限 100 家",
      },
      {
        title: "數位搶單與企業數據看板",
        note: "企業進出口數據看板年費 NT$999；另有產業市場研析報告。",
        limit: "數據看板 999/年",
      },
      {
        title: "Taiwantrade B2B 平台",
        note: "國家級 B2B 平台，基礎會員免費。",
        limit: "基礎免費",
      },
    ],
    processSteps: [
      { title: "線上申請", note: "買主直達到 buyerdirect.taitra.org.tw 線上申請；其他服務到 export.taitra.org.tw/special 各項目報名。" },
      { title: "資格審查", note: "審核中小企業資格、出進口實績與買主資格。" },
      { title: "邀請買主 / 啟動輔導", note: "買主直達啟動海外邀訪；AI 行銷方案啟動 AI 素材與顧問陪跑。" },
      { title: "執行採購洽談 / 投放", note: "買主直達須於 2027/10/31 前執行完畢。" },
      { title: "核銷申請與款項核撥", note: "洽談結束後 30 日內申請核銷，最遲 2027/11/15；線上核銷後 14 天內掛號寄正本。" },
    ],
    importantNotes: [
      "買主直達受理至 116/9/15（2027/9/15），經費用罄將提前截止；執行至 2027/10/31，核銷至 2027/11/15",
      "2026/8/14 起適用新制：免附關稅影響佐證、買主營業額門檻降為 10 萬美元；曾申請過的業者可再申請",
      "採「先出資、後核銷」——不是現金預撥，企業需要先有現金流",
      "排他性與其他補助互斥細則官方未明載，建議致電外貿協會 02-2725-5200 確認個案",
    ],
    lufeAngle:
      "培訓和平台資源讓你懂怎麼操作，鹿飛幫你決定賣什麼、定價多少、選哪個平台先打、怎麼讓買主直達變成實際訂單。AI 行銷 3 萬換 15 萬是划算的起步；但跨境電商是長期戰，策略和選品才是關鍵。",
    stage: "assess",
    accent: "sky",
    deadline: "買主直達受理至 2027/9/15（或經費用罄）",
    deadlineDate: "2027-09-15",
    applicationNote: "深度輔導限 100 家 · AI 代理人免費體驗限 400 家",
    iconKey: "cart",
    sourceUrl: "https://export.taitra.org.tw/special",
    verifiedOn: "2026-10-02",
  },
] as const;

/** 卡片顯示的 hook 文案。大部分頁面走預設；子頁透過 CONTEXTUAL_COPY 覆寫。 */
export const SUBSIDY_CARD_COPY = {
  dismissAria: "關閉補助通知",
  image: "/images/subsidies/card-skyline-1600.webp",
  hero: "/images/subsidies/hero-handshake-1600.webp",
  /** Link target — the plans section */
  href: "/resources/subsidies#plans",
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
  oneLiner: "聯合申請最高 NT$2,000 萬 · 2 分鐘找出你能申請的",
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
      oneLiner: "攤位、佈置、運費、口譯一起補 · 每展最高 16 萬",
      cta: "看展覽補助",
    },
  },
  {
    pathPrefix: "/services/channel-entry",
    copy: {
      eyebrow: "準備進通路的你",
      headline: "最高 NT$2,000 萬補助",
      oneLiner: "通路布建 · 代理經銷 · 海外據點，全可申請",
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
    pathPrefix: "/cases/goat-milk-soap-global",
    copy: {
      eyebrow: "想同時進多個市場？",
      headline: "海外布建有補助",
      oneLiner: "通路、據點、參展——依出海階段對應不同計畫",
      cta: "看細節",
    },
  },
  {
    pathPrefix: "/cases/fish-floss-us-fda",
    copy: {
      eyebrow: "這個案例的補助",
      headline: "進美國市場也有補助",
      oneLiner: "海外通路布建、參展都有對應的計畫",
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
  const path = stripLocale(pathname);
  const sorted = [...CONTEXTUAL_COPY].sort(
    (a, b) => b.pathPrefix.length - a.pathPrefix.length
  );
  for (const entry of sorted) {
    if (path.startsWith(entry.pathPrefix)) return entry.copy;
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
    pathPrefix: "/cases/goat-milk-soap-global",
    subsidySlug: "market-expansion",
  },
  {
    pathPrefix: "/cases/fish-floss-us-fda",
    subsidySlug: "market-expansion",
  },
  {
    pathPrefix: "/cases/bubble-tea",
    subsidySlug: "market-expansion",
  },
];

export function getSubsidyBySlug(slug: string): Subsidy | undefined {
  return SUBSIDIES.find((s) => s.slug === slug);
}

/** Find the best-matching subsidy for a given pathname. Returns null if none match. */
export function getContextualSubsidy(pathname: string): Subsidy | null {
  const path = stripLocale(pathname);
  // Longest prefix wins so /services/channel-entry matches before /services
  const sorted = [...CONTEXT_SUBSIDY_MAP].sort(
    (a, b) => b.pathPrefix.length - a.pathPrefix.length
  );
  for (const entry of sorted) {
    if (path.startsWith(entry.pathPrefix)) {
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
 * Date-aware helpers — powers the SubsidyCard "still open" logic
 * ──────────────────────────────────────────────── */

/** Returns true if a subsidy is currently accepting applications. */
export function isSubsidyActive(subsidy: Subsidy, now = new Date()): boolean {
  if (!subsidy.deadlineDate) {
    return !subsidy.deadline.includes("預計") && !subsidy.deadline.includes("待公告");
  }

  const time = subsidy.deadline.match(/(\d{1,2}):(\d{2})/)?.slice(1).join(":") ?? "23:59";
  const deadline = new Date(`${subsidy.deadlineDate}T${time}:00+08:00`);
  return deadline >= now;
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
