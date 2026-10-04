export type AssessOptionCopy = {
  readonly value: string;
  readonly label: string;
  readonly hint?: string;
};

export type AssessQuestionCopy = {
  readonly id: string;
  readonly label: string;
  readonly sublabel?: string;
  readonly options: readonly AssessOptionCopy[];
};

export type AssessPageCopy = {
  readonly stageShort: Readonly<Record<string, string>>;
  readonly blockerShort: Readonly<Record<string, string>>;
  readonly marketShort: Readonly<Record<string, string>>;
  readonly questions: readonly AssessQuestionCopy[];
  readonly matcher: { readonly previous: string; readonly restart: string; readonly answered: string };
  readonly chapterHints: Readonly<Record<string, { readonly text: string; readonly href: string }>>;
  readonly northAmericaChapter: { readonly text: string; readonly href: string };
  readonly fallback: { readonly headline: string; readonly loading: string };
  readonly entry: {
    readonly home: string;
    readonly cases: string;
    readonly compare: string;
    readonly breadcrumb: string;
    readonly headline: readonly [string, string];
    readonly lead: string;
    readonly comparing: string;
    readonly start: string;
    readonly scrollCue: string;
    readonly compareCases: string;
  };
  readonly narrative: {
    readonly dimensions: { readonly stage: string; readonly blocker: string; readonly market: string };
    readonly stageMatched: string;
    readonly stageMissed: string;
    readonly blockerMatched: string;
    readonly blockerMissed: string;
    readonly marketMatched: string;
    readonly marketMissed: string;
    readonly exact: { readonly headline: string; readonly closing: string };
    readonly close: { readonly headline: string; readonly closing: string };
    readonly partial: { readonly headline: string; readonly closing: string };
    readonly none: { readonly headline: string; readonly closing: string };
  };
  readonly result: {
    readonly loading: string;
    readonly invalid: { readonly headline: string; readonly restart: string };
    readonly restart: string;
    readonly matched: string;
    readonly different: string;
    readonly fullCase: string;
    readonly alternativeMatch: string;
    readonly otherPath: string;
    readonly ctaTitle: string;
    readonly copied: string;
    readonly copy: string;
    readonly book: string;
  };
  readonly scorecard: {
    readonly total: string;
    readonly go: string;
    readonly conditional: string;
    readonly hold: string;
    readonly noGo: string;
    readonly minimum: string;
  };
};

export const assessPageZh: AssessPageCopy = {
  stageShort: { idea: "起步期", tested: "試水期", scaling: "放大期" },
  blockerShort: { market: "找市場", channel: "找通路", cost: "算成本", execution: "缺執行", compliance: "搞法規" },
  marketShort: { us: "北美", sea: "菲律賓 / 東南亞", japan: "日韓", europe: "歐洲", other: "其他市場" },
  questions: [
    { id: "stage", label: "你目前在出海這條路上的哪個位置？", options: [
      { value: "idea", label: "還在台灣賣，沒真的外銷過", hint: "訊號：產品在國內穩定，但從來沒真的把一批貨送到海外落地過" },
      { value: "tested", label: "少量試過外銷，但還沒穩定", hint: "訊號：跑過 1–3 次試單，有資料但抓不到節奏，下一步放不放大都不確定" },
      { value: "scaling", label: "已經在出海，想放大或修正", hint: "訊號：海外業務跑了超過一年，但成長停滯、或某一個環節開始卡住" },
    ] },
    { id: "blocker", label: "最讓你睡不著的是哪一件事？", options: [
      { value: "market", label: "不知道該去哪個市場", hint: "訊號：手上有三個以上國家的代理聯絡，但沒有任何一個真的簽下去" },
      { value: "channel", label: "找不到對的通路或合作夥伴", hint: "訊號：進得去超商、卻進不了量販；或是上架了但產品沒有聲量" },
      { value: "cost", label: "成本算不清、毛利被吃掉", hint: "訊號：報價時覺得賺的，出貨後發現關稅、物流、匯率分掉一半" },
      { value: "execution", label: "方向知道，但沒人真的做執行", hint: "訊號：策略簡報看過好幾份，但沒有人真的陪你跑到落地" },
      { value: "compliance", label: "不確定法規、成分或標示過不過得了關", hint: "訊號：產品在台灣合法上架，但不知道目的地的主管機關、成分限制與標示格式" },
    ] },
    { id: "market", label: "你主要在看哪個市場？", options: [
      { value: "sea", label: "菲律賓 / 東南亞" },
      { value: "us", label: "美國 / 北美" },
      { value: "other", label: "其他市場，或還沒決定" },
    ] },
  ],
  matcher: { previous: "← 上一步", restart: "重新開始", answered: "已回答的題目" },
  chapterHints: {
    market: { text: "跟你處境最像的人，多半從「市場探查」開始談 →", href: "/services/product-testing" },
    channel: { text: "跟你處境最像的人，多半從「寄賣」開始談 →", href: "/services/consignment" },
    compliance: { text: "跟你處境最像的人，多半從「寄賣」開始談：產品證我們代辦、掛證 →", href: "/services/consignment" },
    execution: { text: "跟你處境最像的人，多半從「公司落地」開始談 →", href: "/services/localization" },
    cost: { text: "跟你處境最像的人，多半從「運營優化」開始談 →", href: "/services/optimize" },
  },
  northAmericaChapter: { text: "北美走另一條線，先看「北美通路」怎麼做 →", href: "/services/north-america" },
  fallback: { headline: "處境比對", loading: "載入中…" },
  entry: {
    home: "首頁", cases: "案例", compare: "比對", breadcrumb: "處境比對", headline: ["看看你的處境，", "跟哪個案例最像"], lead: "三個問題，約 2 分鐘。比對我們參與過的三個案例，找出最接近的一個、當時怎麼判斷，以及多半從哪一章開始。", comparing: "正在比對", start: "開始比對 ↓", scrollCue: "往下看", compareCases: "會和這三個案例比對",
  },
  narrative: {
    dimensions: { stage: "階段", blocker: "卡點", market: "市場" },
    stageMatched: "你和他們都在{stage} — 同樣的壓力點", stageMissed: "你在{answer}，他們當時在{signature} — 節奏不同", blockerMatched: "都卡在「{blocker}」這件事上", blockerMissed: "你卡在「{answer}」，他們當時卡在「{signature}」 — 不同的戰場", marketMatched: "目標市場一致：{market}", marketMissed: "你看{answer}，他們做的是{signature}",
    exact: { headline: "你的處境，幾乎就是他們當時遇到的事", closing: "他們當時怎麼判斷、先做了哪一步，大多能拿來對照你的情況。具體做法還是要看你的產品，這份值得從頭讀到尾。" },
    close: { headline: "兩項對齊 — 同路但不同戰場", closing: "他們的判斷邏輯可以直接用，但具體做法要換成你的版本。這份案例值得讀到最後 — 學怎麼想，換怎麼做" },
    partial: { headline: "一項對齊 — 可以當參考方向", closing: "學他們怎麼想事情、怎麼做決定，不要照抄他們做的事。想對照更貼近你的狀況，30 分鐘就能聊。" },
    none: { headline: "三個維度都不同 — 但判斷方法仍然能用", closing: "這份案例可以快速瀏覽，看他們當時怎麼判斷就好。你的狀況，也許適合先聊一次再決定；有時候我們會建議你再等等，那也是一種答案。" },
  },
  result: {
    loading: "載入結果…", invalid: { headline: "這份比對連結不完整", restart: "重新比對 →" }, restart: "重新比對", matched: "相同", different: "不同", fullCase: "讀完整案例 →", alternativeMatch: "吻合 {score}/3", otherPath: "看另一條路 →", ctaTitle: "想知道這個方法放在你身上會長什麼樣？", copied: "✓ 連結已複製", copy: "複製這份比對", book: "預約 30 分鐘 →",
  },
  scorecard: { total: "拖拖看 · 加權總分", go: "可以進，照四章正常走", conditional: "可以進，先解決一到兩個弱項", hold: "建議暫緩 6–12 個月，等關鍵變化", noGo: "不建議，鹿飛會寫清楚什麼條件改了可以再看", minimum: "鹿飛的規矩：不到 60 分，不接" },
};
