import { CTA_LINE } from "@/data/cta";

export type OptimizePainPoint = {
  readonly anchor: string;
  readonly title: string;
  readonly scene: string;
  readonly action: string;
};

export type OptimizeService = {
  readonly title: string;
  readonly timeline: string;
  readonly details: readonly (readonly [string, string])[];
};

export type OptimizeFaq = readonly [string, string, string];

export type OptimizePageCopy = {
  readonly home: string;
  readonly services: string;
  readonly breadcrumb: string;
  readonly heroTitle: string;
  readonly heroScene: string;
  readonly heroAction: string;
  readonly scrollCueLabel: string;
  readonly advanced: {
    readonly title: string;
    readonly beforeLink: string;
    readonly link: string;
    readonly afterLink: string;
  };
  readonly painHeading: {
    readonly prefix: string;
    readonly highlight: string;
  };
  readonly painPoints: readonly OptimizePainPoint[];
  readonly cost: {
    readonly imageAlt: string;
    readonly headingPrefix: string;
    readonly headingHighlight: string;
    readonly body: string;
    readonly callout: string;
  };
  readonly sales: {
    readonly headingPrefix: string;
    readonly headingHighlight: string;
    readonly body: string;
    readonly items: readonly string[];
  };
  readonly find: {
    readonly imageAlt: string;
    readonly headingPrefix: string;
    readonly headingHighlight: string;
    readonly body: string;
    readonly callout: string;
  };
  readonly system: {
    readonly headingPrefix: string;
    readonly headingHighlight: string;
    readonly body: string;
    readonly steps: readonly string[];
    readonly callouts: readonly string[];
  };
  readonly dashboard: {
    readonly headingPrefix: string;
    readonly headingHighlight: string;
    readonly body: string;
  };
  readonly startHeading: string;
  readonly servicesOffered: readonly OptimizeService[];
  readonly faqs: readonly OptimizeFaq[];
  readonly faq: {
    readonly title: string;
    readonly ask: string;
    readonly more: string;
  };
  readonly closing: {
    readonly title: string;
    readonly line: string;
    readonly action: string;
  };
};

export const optimizePageZh: OptimizePageCopy = {
  home: "首頁",
  services: "服務",
  breadcrumb: "運營優化",
  heroTitle: "已經跑起來了，該讓每公里更省",
  heroScene: "產品在海外已經賣得動，但利潤好像一直被吃掉、事情一直對不上、每個月的決定像在猜。你可能已經卡在這裡——這不是第一年的事，是走過第一年之後的事。",
  heroAction: "免費初步評估 30 分鐘 →",
  scrollCueLabel: "往下看",
  advanced: {
    title: "進階 ·",
    beforeLink: " 還沒開始的品牌，先看",
    link: "四章",
    afterLink: "。這一頁是給已經在海外跑了一段時間的人",
  },
  painHeading: {
    prefix: "你可能已經卡在",
    highlight: "這五段之一",
  },
  painPoints: [
    { anchor: "opt-cost", title: "省不下來", scene: "海運報價一直漲，你沒有議價籌碼；倉儲月結單看不懂；退貨的運費比正品還貴", action: "我們看你的物流帳單" },
    { anchor: "opt-sales", title: "賣得起伏", scene: "節慶暴增、平常低迷；廣告一停就沒訂單；退貨率和評價忽高忽低", action: "我們幫你看是哪一件沒對" },
    { anchor: "opt-find", title: "沒被找到", scene: "產品在架上，但搜尋、AI 問答、社群裡都沒有你", action: "我們幫你看缺在哪" },
    { anchor: "opt-system", title: "跑得卡卡", scene: "台灣和當地明明同一個時間上班，事情還是對不上；SOP 散在各處，新人要很久才上手", action: "我們幫你把流程放進系統" },
    { anchor: "opt-dashboard", title: "看不見", scene: "每個月不知道哪裡賺、哪裡漏，決策像在猜", action: "把數字放到同一個畫面" },
  ],
  cost: {
    imageAlt: "檢視物流與營運資料",
    headingPrefix: "省不下來：",
    headingHighlight: "先看你的物流帳單",
    body: "創辦人來自躍馬企業，背後是 43 年的國際物流。一張月結單裡哪些數字不該長那樣，我們看得出來。我們從運輸方式、倉儲位置、退貨處理三個層面重新盤點。",
    callout: "盤完，我們告訴你哪裡能省、值不值得動。不值得動的，我們會直接說。",
  },
  sales: {
    headingPrefix: "賣得起伏：",
    headingHighlight: "廣告一停就沒單，通常不是廣告的問題",
    body: "銷量跟著節慶走、廣告停了就掉、評價忽高忽低——多半是通路組合、價格帶、上架內容三件事有一件沒對。\n我們把三件事攤開來看，告訴你該調哪一個。這一段我們不代操廣告、不代管通路；要找人執行，我們幫你介紹。",
    items: ["通路組合", "價格帶", "上架內容"],
  },
  find: {
    imageAlt: "線上通路與搜尋資料",
    headingPrefix: "沒被找到：",
    headingHighlight: "客人在問 AI，AI 沒提到你",
    body: "越來越多人買東西前，先問 ChatGPT、Perplexity。AI 回答時沒有你的名字，客人就不知道你在架上。\n這一段我們現在不代寫、不代操。第一次談，我們幫你看缺在哪：是搜尋、是 AI 問答，還是社群；要找人做，我們幫你介紹。",
    callout: "先弄清楚缺在哪，再決定花不花錢。",
  },
  system: {
    headingPrefix: "跑得卡卡：",
    headingHighlight: "事情都在人的腦子裡",
    body: "台灣早上九點，馬尼拉也是九點，但事情還是對不上——因為流程在人身上，不在系統裡。我們幫你導入一套營運系統，分五步：",
    steps: ["① 任務放進同一個看板", "② 文件和做法存成團隊知識庫", "③ 重複的事交給 AI 助手", "④ 數字放到同一個儀表板", "⑤ 每個月一起看、一起改"],
    callouts: ["目標是新人第一天就知道東西在哪、事情怎麼跑", "如果卡的是客訴和英文信沒人回，那是海外客服那一章的事。"],
  },
  dashboard: {
    headingPrefix: "看不見：",
    headingHighlight: "每個月結束才知道賺沒賺",
    body: "營運系統的第四步就是這件事：把物流、通路、客服的數字放到同一個畫面。不是為了好看，是為了下個月的決定不用猜。",
  },
  startHeading: "怎麼開始",
  servicesOffered: [
    {
      title: "先談",
      timeline: "30 分鐘，不收費",
      details: [
        ["交付", "我們聽你現在的狀況，告訴你卡在哪一段、值不值得動。帶上最近的物流月結單，會看得更準"],
        ["範圍", "物流、通路、營運流程、數字"],
        ["適合", "不確定問題在哪一段的"],
      ],
    },
    {
      title: "按段做",
      timeline: "動哪一段，按那一段報價",
      details: [
        ["交付", "物流帳單盤點、營運系統導入、儀表板。通路和集客兩段，我們幫你看、幫你介紹人"],
        ["適合", "已經知道卡哪裡、要人進來一起做的"],
      ],
    },
  ],
  faqs: [
    ["沒跟你們走過第一年也可以嗎？", "可以。這一頁的方案是獨立的，第一次談我們會先問你現在的狀況。", "可以，方案獨立"],
    ["不確定自己的問題屬於哪一類？", "先聊聊。我們花 30 分鐘聽你現在的狀況，告訴你卡在哪一段、該從哪裡動。有時候我們會建議你再等等，那也是一種答案。", "先聊 30 分鐘再決定"],
    ["怎麼收費？", "第一次 30 分鐘不收費。決定要動哪一段之後，按那一段報價，第一次談就給範圍。我們不會先報價再問你需求。", "先談不收費，動哪一段報哪一段"],
  ],
  faq: {
    title: "常見問題",
    ask: "直接問我們 →",
    more: "還有其他問題？",
  },
  closing: {
    title: "聊聊目前卡在哪一段",
    line: CTA_LINE,
    action: "免費初步評估 30 分鐘 →",
  },
};
