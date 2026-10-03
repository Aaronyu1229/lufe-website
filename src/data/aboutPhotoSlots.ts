/**
 * Photo slots on /about. Drop a file at public/images/about/<file> and the slot shows it;
 * search the codebase for the slotId (also rendered as data-slot) to find where it lands.
 */
export type AboutPhotoSlotId = "PHOTO-SLOT-01" | "PHOTO-SLOT-03" | "PHOTO-SLOT-05A" | "PHOTO-SLOT-05B" | "PHOTO-SLOT-05C";

export type AboutPhotoSlot = {
  readonly slotId: AboutPhotoSlotId;
  readonly file: string;
  readonly alt: string;
  readonly caption?: string;
  /** What to shoot; shown in the dev-only placeholder. */
  readonly hint: string;
  readonly fallback?: { readonly src: string; readonly alt: string; readonly caption: string };
};

export const ABOUT_PHOTO_SLOTS = {
  "PHOTO-SLOT-01": {
    slotId: "PHOTO-SLOT-01",
    file: "slot-01-jumping-early.webp",
    alt: "躍馬企業早年的辦公現場",
    caption: "躍馬 43 年，從這裡開始",
    hint: "躍馬早年的真實老照片：第一間辦公室、舊招牌、手寫報關單或早期倉庫；沒有老照片就用現在躍馬報關／倉庫的真實現場",
    fallback: { src: "/images/about/about-port-1600.webp", alt: "貨櫃碼頭——躍馬 43 年的日常", caption: "貨櫃碼頭——躍馬 43 年的日常" },
  },
  "PHOTO-SLOT-03": {
    slotId: "PHOTO-SLOT-03",
    file: "slot-03-after-arrival.webp",
    alt: "貨抵達海外之後的現場",
    caption: "貨送到了，接下來的事才開始",
    hint: "「抵達之後」的真實畫面：海外貨架上的台灣產品、當地倉庫或卸櫃現場；不露可辨識的客戶品牌",
    fallback: { src: "/images/about/story-belief-compass-1600.webp", alt: "羅盤放在世界地圖上——有計畫的探索", caption: "羅盤放在世界地圖上——有計畫的探索" },
  },
  "PHOTO-SLOT-05A": {
    slotId: "PHOTO-SLOT-05A",
    file: "slot-05a-taiwan-core.webp",
    alt: "創辦人在躍馬企業現場",
    hint: "創辦人在躍馬現場（辦公室、倉庫或報關櫃台），或與躍馬團隊的合照",
  },
  "PHOTO-SLOT-05B": {
    slotId: "PHOTO-SLOT-05B",
    file: "slot-05b-philippines.webp",
    alt: "菲律賓合作夥伴的現場",
    hint: "夥伴的英語教室或手搖飲店面；不露店招、人臉要取得同意",
  },
  "PHOTO-SLOT-05C": {
    slotId: "PHOTO-SLOT-05C",
    file: "slot-05c-north-america.webp",
    alt: "北美團隊在展覽現場",
    hint: "北美展覽攤位或買家會議現場；不露客戶品牌",
  },
} as const satisfies Record<AboutPhotoSlotId, AboutPhotoSlot>;

/** slotId → public path of the uploaded photo, only for slots whose file exists. Resolved at build time. */
export type AboutPhotoSources = Partial<Record<AboutPhotoSlotId, string>>;
