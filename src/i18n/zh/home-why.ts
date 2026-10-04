export type HomeWhyCopy = {
  readonly heading: readonly [string, string];
  readonly lead: string;
  readonly weekdays: readonly (readonly [string, string])[];
  readonly body: string;
  readonly typeLabel: string;
  readonly columns: readonly string[];
  readonly rows: readonly { readonly type: string; readonly desc: string; readonly partner?: string }[];
  readonly coverageTemplates: { readonly covered: string; readonly partner: string; readonly missing: string };
};

export const homeWhyZh: HomeWhyCopy = {
  heading: ["顧問、貿易商、貨代、客服各管一段，", "老闆成了唯一的窗口"],
  lead: "多數企業出海的一週，是這樣過的：",
  weekdays: [
    ["星期一", "顧問來催進度"],
    ["星期二", "貿易商來催付款"],
    ["星期三", "貨代來催艙位"],
    ["星期四", "客服外包問這封信要怎麼回"],
  ],
  body: "每一家只負責自己那一段，進度卡住時，沒有人負責把它串起來。\n我們把市場探查、寄賣、公司落地與海外客服，放在同一份合約裡；國際物流交給躍馬企業。\n一個窗口對接所有環節，你只需要開一次會。",
  typeLabel: "類型",
  columns: ["市場探查與寄賣", "落地與客服", "國際物流"],
  rows: [
    { type: "顧問公司", desc: "出一份策略報告" },
    { type: "貿易商", desc: "幫你把貨賣掉" },
    { type: "客服外包", desc: "幫你接電話" },
    { type: "貨代", desc: "把貨送到" },
    { type: "鹿飛 LUFÉ", desc: "一份合約走完", partner: "躍馬企業" },
  ],
  coverageTemplates: { covered: "{type} - {desc}涵蓋{column}", partner: "{column}由{partner}負責", missing: "{type} - {desc}不涵蓋{column}" },
};
