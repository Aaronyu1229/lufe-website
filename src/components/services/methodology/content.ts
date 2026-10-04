export const ORIGIN_STORY = `我們在物流那一端，看過太多台灣品牌的貨出去了，生意沒做起來。
最常見的順序是這樣：

先花幾百萬做行銷，找當地網紅，開始賣。
賣了一季，市場才告訴你：
價格太高、味道不對、他們聽不懂你在講什麼。
然後回頭改產品。業績平平，或者賠錢。

那幾百萬買到的，其實是一堂課。
我們想做的，是把這堂課的學費，從幾百萬降到一兩萬——
在你花大錢之前，先替你去問市場。

然後不是交一份報告就走。
問到的答案，我們跟你一起看、一起改、再問一次。
這是我們說的陪跑。`;

export interface MethodologyFinding {
  readonly label: string;
  readonly headline: string;
  readonly detail: string;
}

export interface MethodologyExample {
  readonly key: "peanut" | "sunscreen";
  readonly tab: string;
  readonly title: string;
  readonly tags: readonly string[];
  readonly method: string;
  readonly findings: readonly MethodologyFinding[];
  readonly implications: readonly string[];
  readonly note: string;
}

export interface MethodologyDimension {
  readonly name: string;
  readonly question: string;
  readonly criteria: string;
  readonly redAt: string;
}

export type MethodologyDecisionVerdict = "Go" | "Conditional Go" | "Hold" | "No-Go";

export interface MethodologyDecision {
  readonly score: string;
  readonly verdict: MethodologyDecisionVerdict;
  readonly advice: string;
}

export interface MethodologyFoundation {
  readonly lead: string;
  readonly footnote: string;
  readonly body: string;
}

export const METHODOLOGY_EXAMPLES: readonly MethodologyExample[] = [
  {
    key: "peanut",
    tab: "花生糖禮盒",
    title: "一盒台灣手工花生糖禮盒，想去菲律賓",
    tags: ["一對一訪談", "競品橫表"],
    method: "一對一訪談五位當地受訪者：看產品卡、現場試吃、逐題追問。\n同時把當地十個花生甜食競品攤成一張橫表：碧瑤的老牌、超市裡的國民零食、台灣進口的牛軋糖、在地的精品禮盒——價格、訴求、好評負評、通路",
    findings: [
      { label: "價格", headline: "換算後是當地心理價位的兩倍以上", detail: "有受訪者直接拿一天的工資來比" },
      { label: "效期", headline: "效期遠長於當地主流產品", detail: "當地最知名的花生脆糖效期約一個月；在熱帶濕氣下，這是實際的賣點" },
      { label: "口味", headline: "其中一個口味評價兩極", detail: "不同年齡層的反應明顯分歧，需要擴樣再確認" },
      { label: "市場空白", headline: "沒有競品主打全素與潔淨標章", detail: "十個競品裡，這一格是空的" },
    ],
    implications: ["價格要重新設計", "送禮是唯一撐得住高價的場景", "全素是沒有人站的位置"],
    note: "五份訪談不是統計，是方向。報告標明這是「定位假設」，不是已驗證的定位；方向對了，再花錢擴樣",
  },
  {
    key: "sunscreen",
    tab: "防曬乳",
    title: "一瓶台灣防曬乳，想去菲律賓",
    tags: ["一對一訪談", "公開資料交叉比對"],
    method: "請當地有固定收入、會自己掏錢買東西的上班族，用過試用包，一個一個問。\n再把聽到的，對照當地電商的評價、競品怎麼寫、社群怎麼聊。",
    findings: [
      { label: "認知", headline: "「維他命 C」被聽成美白", detail: "你在台灣講抗氧化，受訪者聽到的是另一件事" },
      { label: "香味偏好", headline: "當地偏好有香味", detail: "台灣消費者偏好無香，菲律賓剛好相反" },
    ],
    implications: ["要改的是溝通方式與香味，不是配方", "宣稱要落在當地法規允許的範圍內", "比重做產品便宜得多"],
    note: "這兩件事，在台灣問一百個人也問不到",
  },
];

export const EXAMPLES_INTRO = "兩個真實的研究例子：怎麼問、問到什麼、品牌接下來怎麼做";

export const EXAMPLES_CLOSING = "我們不替市場回答。我們把市場的答案帶回來，跟你一起決定下一步。";

export const FIRST_MONTH_COPY = `第一個月，你拿到一頁
誰會買、多少錢會買、為什麼不買。
拿來做下一個決定的，不是拿來歸檔的`;

export const THIRD_MONTH_INTRO = `走到寄賣那一章時，有一份完整的市場研究
我們實際交出去的報告長這樣：`;

export const REPORT_OUTLINE = [
  "研究前提",
  "競品名單",
  "素材收集",
  "橫表對照",
  "差異切入口",
  "相對優勢",
  "進入挑戰",
  "研究結論",
];

export const REPORT_DISCLAIMER = `每一份都寫清楚：樣本是誰、哪些是一手訪談、哪些是公開資料、信心度多高。
報告的最後一句永遠是同一句——
「本報告為決策的事實基礎，而非決策本身」`;

export const SCALE_INTRO = `第一次談，我們會用五個問題把你的案子粗跑一遍。
這五題有紅線，碰到就先停下來講清楚`;

export const METHODOLOGY_DIMENSIONS: readonly MethodologyDimension[] = [
  {
    name: "Market 市場",
    question: "這個市場夠大嗎？",
    criteria: "可觸達的市場規模、成長率、消費者願意付多少、市場在哪個階段",
    redAt: "可觸達的市場撐不起你要的營收，我們會建議換市場或換品項。",
  },
  {
    name: "Barrier 門檻",
    question: "進去要花多少力氣？",
    criteria: "認證要求與成本、通路進入難度、在地化改造（包裝、配方、標示）、合規灰色地帶",
    redAt: "證照與合規的成本，會吃掉首年大部分的毛利，不建議進。",
  },
  {
    name: "Competition 競爭",
    question: "你打得過嗎？",
    criteria: "前十大品牌市佔集中度、競品護城河、競品弱點、會不會打價格戰",
    redAt: "前幾大品牌已經把架上佔滿，我們不建議正面打。",
  },
  {
    name: "Profitability 獲利",
    question: "做得動嗎？",
    criteria: "到岸成本（FOB＋關稅＋物流＋保險）、通路佣金與行銷攤提、退換貨預估、匯率風險",
    redAt: "悲觀情境下算不出利潤，先調結構再談。",
  },
  {
    name: "Regulatory 法規",
    question: "法規會不會突然變？",
    criteria: "當地貿易政策穩定度、產品類別法規變動歷史、政治風險、退出成本",
    redAt: "這個品類近幾年被禁過、或被大幅加稅，風險要加權。",
  },
];

export const METHODOLOGY_DECISIONS: readonly MethodologyDecision[] = [
  { score: "≥ 75", verdict: "Go", advice: "可以進，照四章走" },
  { score: "60–74", verdict: "Conditional Go", advice: "可以進，先解決一到兩個弱項" },
  { score: "45–59", verdict: "Hold", advice: "建議暫緩 6–12 個月，等關鍵變化" },
  { score: "< 45", verdict: "No-Go", advice: "不建議。我們會寫清楚什麼條件改了可以再看" },
];

export const DOUBLE_SCORE_COPY = `第一次是紙上分數。
用公開數據、你給的成本、我們在當地的經驗打的。
它告訴你：該不該試。

第二次是真實分數。
市場探查跑完，Market 和 Competition 兩題，用受訪者的真實反應重打一次。
它告訴你：該不該加碼。

拿花生糖那一案來說：競品橫表上，最像的對手是台灣進口的牛軋糖；
五位受訪者聊完才知道，真正擋在前面的，是他們心裡那個價位。

大多數的評估停在第一次。我們把第二次寫進流程。
紙上看起來再好，都比不上真的有人問：哪裡買得到？`;

export const RULES_COPY = `碰到任何一條紅線，我們會先說，再談要不要繼續。

有時候我們會建議你再等等。
那也是一種答案，而且是不收費的那種。

如果你想要的是先賣再說，我們可能不是對的夥伴。`;

export const COMPANIONSHIP_COPY = `報告交出去，不是結束。

市場探查之後，我們跟你一起看那一頁：
哪一句話要改、哪個價格帶要重想、哪個口味先不帶過去。
改完，再問一次。

寄賣之後，每個月看數字：賣動了什麼、沒賣動什麼、為什麼。
公司落地之後，人到位了、流程順了，你才不用一直飛。

每一案的真實分數，都會回到同一套量尺；做得越多，量尺越準。

每一章結束，你都可以停。
但只要你往下走，我們就在。`;

export const METHODOLOGY_FOUNDATIONS: readonly MethodologyFoundation[] = [
  {
    lead: "「了解多一分，才投入多一分」來自國際化研究裡被引用最多的模型",
    footnote: "¹",
    body: "：\n企業走向海外是漸進的，先出口、再找代理、再設點，投入跟著了解走",
  },
  {
    lead: "「用最小的錢先問市場」來自精實創業",
    footnote: "²",
    body: "：\n最小成本換真實學習，再決定加碼",
  },
  {
    lead: "「每一章都有閘門」來自新產品開發的階段管理",
    footnote: "³",
    body: "：\n過了這一關，才投下一筆",
  },
];

export const FOUNDATIONS_CLOSING = "我們做的，是把這三件事壓成一個台灣中小品牌負擔得起、三個月跑得完一輪的版本";

export const FOUNDATIONS_FOOTNOTE = "¹ Uppsala 國際化模型（Johanson & Vahlne, 1977）　² Lean Startup（Ries, 2011）　³ Stage-Gate（Cooper）";

export const BOUNDARIES_COPY = `這套方法現在只做一件事：消費品牌進菲律賓。
工業設備、大型 B2B 製造、設廠，不在這裡。
北美通路是另一條線，由北美團隊執行。
海外客服不在五題裡——它不是「該不該去」的問題，是「去了之後」的問題。

一手訪談的樣本都不大，而且集中在特定族群。
我們在每一份報告裡都寫明這件事，因為它決定了你該把這份答案當多重`;
