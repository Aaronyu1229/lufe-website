export type ChapterPageCopy = {
  readonly home: string;
  readonly services: string;
  readonly scrollCueLabel: string;
  readonly afterHeroNotice: string;
  readonly assessAction: string;
  readonly northAmericaBand: {
    readonly title: string;
    readonly body: string;
  };
  readonly scenarioAnswerFallback: string;
  readonly reportPreview: {
    readonly title: string;
    readonly questions: readonly string[];
  };
  readonly pricePaths: {
    readonly dark: string;
    readonly light: string;
  };
  readonly trackDefaults: {
    readonly passive: string;
    readonly active: string;
  };
  readonly table: {
    readonly task: string;
    readonly owner: string;
  };
  readonly waitlist: {
    readonly status: string;
    readonly title: string;
    readonly body: string;
    readonly brandLabel: string;
    readonly brandPlaceholder: string;
    readonly emailLabel: string;
    readonly volumeLabel: string;
    readonly volumeOptions: readonly string[];
    readonly handlerLabel: string;
    readonly handlerPlaceholder: string;
    readonly submit: string;
    readonly submitting: string;
    readonly submittedTitle: string;
    readonly submittedBody: string;
  };
  readonly faq: {
    readonly title: string;
    readonly ask: string;
    readonly more: string;
  };
};

export const chapterPageZh: ChapterPageCopy = {
  home: "首頁",
  services: "服務",
  scrollCueLabel: "往下看",
  afterHeroNotice: "預計 2027 Q1 開放・首批登記中",
  assessAction: "先做 2 分鐘處境比對",
  northAmericaBand: {
    title: "北美通路",
    body: "　跟菲律賓的四章是兩條線：北美團隊在當地執行，鹿飛是你在台灣的窗口。",
  },
  scenarioAnswerFallback: "鹿飛的做法",
  reportPreview: {
    title: "市場探查報告 · 產品 A",
    questions: ["誰會買", "多少錢會買", "為什麼不買"],
  },
  pricePaths: {
    dark: "你只花了這一筆",
    light: "接到第三個月 →",
  },
  trackDefaults: {
    passive: "產品證這一軌（審核中，持續推進）",
    active: "鹿飛這一軌（每週都有進度）",
  },
  table: {
    task: "要處理的事",
    owner: "誰在當地",
  },
  waitlist: {
    status: "登記中",
    title: "預計 2027 Q1 開放，首批只收少數幾家",
    body: "先約 30 分鐘，聊你現在的客訊量和誰在接。報價區間第一次談就給；約過的品牌，開放時優先。送出後一個工作天內回覆。",
    brandLabel: "品牌名稱 *",
    brandPlaceholder: "你的品牌",
    emailLabel: "Email *",
    volumeLabel: "每月大概幾封客訊 *",
    volumeOptions: ["<100", "100～500", "500 以上"],
    handlerLabel: "現在誰在接",
    handlerPlaceholder: "例如：老闆自己、台灣客服、還沒人接",
    submit: "預約 30 分鐘初步評估 →",
    submitting: "送出中…",
    submittedTitle: "收到了！",
    submittedBody: "我們會在一個工作天內用你提供的 Email 跟你約時間",
  },
  faq: {
    title: "常見問題",
    ask: "直接問鹿飛 →",
    more: "還有其他問題？",
  },
};
