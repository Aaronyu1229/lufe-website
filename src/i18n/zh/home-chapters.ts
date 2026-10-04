export type HomeChaptersCopy = {
  readonly heading: readonly [string, string];
  readonly lead: string;
  readonly timelineLabels: readonly string[];
  readonly chapters: readonly { readonly label: string; readonly title: string; readonly subtitle: string; readonly linkLabel: string }[];
  readonly starterPackage: string;
  readonly northAmerica: { readonly description: string; readonly label: string };
};

export const homeChaptersZh: HomeChaptersCopy = {
  heading: ["一家品牌在馬尼拉的第一年，", "通常是這樣走的"],
  lead: "四個章節，四個方案。可從第一章開始，也可一路走完；每一章獨立計價，每一章結束都能決定是否繼續",
  timelineLabels: ["第一個月", "第三個月", "第九個月", "之後的每一天"],
  chapters: [
    { label: "第一個月", title: "市場探查", subtitle: "在當地找真實消費者試用，確認誰會買、願意付多少", linkLabel: "看市場探查怎麼做 →" },
    { label: "第三個月", title: "寄賣", subtitle: "產品證審核期間，電商上架與市場活動同步推進", linkLabel: "看寄賣包內容 →" },
    { label: "第九個月", title: "公司落地", subtitle: "公司註冊、人員招聘、FDA 掛證，建立當地據點", linkLabel: "看落地怎麼做 →" },
    { label: "之後的每一天", title: "海外客服", subtitle: "菲律賓是全球英語客服外包的重鎮。由當地專業團隊接手英文客服，品質標準由台灣端制定與管理。預計 2027 Q1 開放首批。", linkLabel: "登記首批 →" },
  ],
  starterPackage: "出海起手包 7 萬 ＝ 市場探查 1～2 萬 ＋ 寄賣包 5～6 萬。先付市場探查；沒過，錢到此為止；過了，這筆抵進寄賣包。前 10 家是實驗價。",
  northAmerica: { description: "產品已經成熟、目標是北美貨架？那是另一條路，由北美團隊執行", label: "北美通路" },
};
