/**
 * Field Notes data layer — placeholder slots for activity, notes, media, partners.
 * All content is deliberately "tbd" so the structure ships empty and fills in
 * as Aaron delivers real photos, event records, and partner logos.
 *
 * Each list has 4–12 slots. When a slot has `tbd: true`, the UI renders a
 * gradient placeholder with an icon instead of a real image. Once assets
 * arrive, flip `tbd` to false and drop the image into the correct path.
 */

export type ActivityTag =
  | "加盟展"
  | "論壇"
  | "商會活動"
  | "演講"
  | "客戶現場"
  | "訪談";

export interface Activity {
  readonly id: string;
  readonly tag: ActivityTag;
  readonly title: string;
  readonly location: string;
  readonly date: string; // "2026 Q2" or "待補" for masking
  readonly summary: string;
  readonly image?: string; // if undefined → placeholder
  readonly tbd: boolean;
}

export interface FieldNote {
  readonly id: string;
  readonly location: string; // "馬尼拉" / "雅加達" / "洛杉磯"
  readonly date: string;
  readonly title: string;
  readonly body: string;
  readonly image?: string;
  readonly tbd: boolean;
}

export interface MediaMention {
  readonly id: string;
  readonly outlet: string;
  readonly title: string;
  readonly date: string;
  readonly href?: string;
  readonly tbd: boolean;
}

export interface PartnerLogo {
  readonly id: string;
  readonly name: string;
  readonly type: "商會" | "顧問" | "物流" | "通路" | "協會" | "政府";
  readonly image?: string;
  readonly tbd: boolean;
}

/* ────────── Placeholder seed data ────────── */

export const ACTIVITIES: readonly Activity[] = [
  {
    id: "a1",
    tag: "加盟展",
    title: "待補 · 加盟展參展紀錄",
    location: "台北",
    date: "2026 Q2",
    summary: "Aaron 參與的加盟展現場，幫 3 家台灣品牌媒合東南亞通路。",
    tbd: true,
  },
  {
    id: "a2",
    tag: "商會活動",
    title: "待補 · 台菲商會交流活動",
    location: "馬尼拉",
    date: "2026 Q1",
    summary: "和菲律賓當地台商會的深度交流，討論進入菲律賓零售通路的 3 條路徑。",
    tbd: true,
  },
  {
    id: "a3",
    tag: "論壇",
    title: "待補 · 東南亞出海論壇主持",
    location: "台北",
    date: "2026 Q1",
    summary: "受邀主持東南亞出海主題論壇，與會者包含 40+ 家台灣中小企業主。",
    tbd: true,
  },
  {
    id: "a4",
    tag: "演講",
    title: "待補 · 中小企業出海工作坊",
    location: "高雄",
    date: "2026 Q1",
    summary: "3 小時工作坊，用 MBCPR 框架帶領 25 位創辦人自我評估出海條件。",
    tbd: true,
  },
  {
    id: "a5",
    tag: "客戶現場",
    title: "待補 · 印尼客戶營運交接",
    location: "雅加達",
    date: "2025 Q4",
    summary: "飛一趟印尼，親自交接海外團隊營運系統給當地 country manager。",
    tbd: true,
  },
  {
    id: "a6",
    tag: "訪談",
    title: "待補 · 媒體專訪 · 二代與出海",
    location: "台北",
    date: "2025 Q4",
    summary: "受邀專訪，談二代創業者如何結合家族底層資源與新世代方法論。",
    tbd: true,
  },
];

export const FIELD_NOTES: readonly FieldNote[] = [
  {
    id: "f1",
    location: "馬尼拉",
    date: "2026 XX 月",
    title: "上週在馬尼拉見了三家連鎖通路",
    body:
      "待補 · 這裡會寫一段 150–250 字的現場觀察：我上週見了哪幾家通路、他們對台灣品牌的態度、哪些類別現在最缺、哪些類別已經過度競爭。這類觀察平常不會寫成正式文章，但是對正在考慮菲律賓的台灣老闆來說很有用。",
    tbd: true,
  },
  {
    id: "f2",
    location: "雅加達",
    date: "2026 XX 月",
    title: "印尼清真認證這件事沒你想得那麼難",
    body:
      "待補 · 印尼的 Halal 認證在台灣老闆心裡是個難關，但實際上流程和成本沒有那麼嚇人。這段記錄一個真實的認證過程，從送件到拿到證書大約花了多少時間、多少錢、卡在哪幾個環節。",
    tbd: true,
  },
  {
    id: "f3",
    location: "洛杉磯",
    date: "2025 XX 月",
    title: "在 Costco 總部門口等了 40 分鐘",
    body:
      "待補 · 北美 Costco 採購會議的現場紀錄。從機場到總部、門口等候、會議室內的 18 分鐘、會後的停車場對話——這些細節才是真的「怎麼跟美國大通路打交道」。",
    tbd: true,
  },
];

export const MEDIA_MENTIONS: readonly MediaMention[] = [
  { id: "m1", outlet: "待補 · 財經媒體", title: "待補 · 文章標題", date: "2026 XX", tbd: true },
  { id: "m2", outlet: "待補 · 產業雜誌", title: "待補 · 訪談標題", date: "2026 XX", tbd: true },
  { id: "m3", outlet: "待補 · Podcast", title: "待補 · 節目名稱", date: "2025 XX", tbd: true },
  { id: "m4", outlet: "待補 · 新聞媒體", title: "待補 · 報導標題", date: "2025 XX", tbd: true },
];

export const PARTNER_LOGOS: readonly PartnerLogo[] = [
  { id: "p1", name: "待補 · 台菲商會", type: "商會", tbd: true },
  { id: "p2", name: "待補 · 台印商會", type: "商會", tbd: true },
  { id: "p3", name: "待補 · 東南亞連鎖", type: "通路", tbd: true },
  { id: "p4", name: "待補 · 北美代理", type: "通路", tbd: true },
  { id: "p5", name: "待補 · 躍馬國際", type: "物流", tbd: true },
  { id: "p6", name: "待補 · 顧問夥伴", type: "顧問", tbd: true },
  { id: "p7", name: "待補 · 中小企業協會", type: "協會", tbd: true },
  { id: "p8", name: "待補 · 政府單位", type: "政府", tbd: true },
];
