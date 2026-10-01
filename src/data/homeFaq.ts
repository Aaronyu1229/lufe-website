export type HomeFaqItem = {
  readonly num: string;
  readonly question: string;
  readonly answer: string;
  readonly takeaway: string;
};

export const HOME_FAQ_ITEMS: readonly HomeFaqItem[] = [
  {
    num: "01",
    question: "這要花多少錢？",
    answer: "數字：市場探查 1～2 萬（前 10 家實驗價）。寄賣包 5～6 萬，合起來是 7 萬起手包，市場探查費可抵。\n公司落地按案，第一次談就給範圍；海外客服的區間，也是第一次談就給。\n\n真心話：我們不會先報價再問你需求。\n第一次見面，我們想先聽你的產品在台灣怎麼賣、為什麼想出去。\n有時候聽完，我們會建議你再等等——那也是一種答案。",
    takeaway: "先講數字，再講一句真心話",
  },
  {
    num: "02",
    question: "從開始到看到結果要多久？",
    answer: "市場探查：面板跑完就給你那一頁，不用等證。\n寄賣：產品證要 6～12 週，這段時間學校活動先跑，證下來貨就上架。\n公司落地：看你要開什麼公司、要幾個人，第一次談給時間表。\n我們不說「一個月交付」，因為證的時間不是我們能壓的。",
    takeaway: "市場探查跑完就有報告 · 產品證 6～12 週",
  },
  {
    num: "03",
    question: "如果發現我的產品不適合怎麼辦？",
    answer: "花 1～2 萬知道菲律賓現在不要你，比花幾百萬落地才知道，便宜太多。\n報告會寫清楚為什麼、什麼條件改了可以再試。\n我們想跟你做久一點，不是收一次錢。",
    takeaway: "那是市場探查最有價值的一種結果",
  },
];
