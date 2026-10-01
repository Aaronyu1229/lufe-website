import type { Category } from "@/data/articles";

export interface InlineImage {
  readonly src: string;
  readonly alt: string;
  readonly beforeH2: number;
}

const inlineImages = (first: Omit<InlineImage, "beforeH2">, second: Omit<InlineImage, "beforeH2">): readonly [InlineImage, InlineImage] => [
  { ...first, beforeH2: 3 },
  { ...second, beforeH2: 5 },
];

export const CATEGORY_INLINE_IMAGES: Record<Category, readonly [InlineImage, InlineImage]> = {
  "菲律賓": inlineImages(
    { src: "/images/insights/inline/ph-jeepney-1600.webp", alt: "菲律賓街頭的吉普尼" },
    { src: "/images/insights/inline/ph-taguig-1600.webp", alt: "夜晚的 Taguig 市街景" },
  ),
  "北美市場": inlineImages(
    { src: "/images/insights/inline/na-grocery-1600.webp", alt: "超市貨架上的商品陳列" },
    { src: "/images/insights/inline/na-warehouse-1600.webp", alt: "量販倉儲賣場的貨架走道" },
  ),
  "出海實戰": inlineImages(
    { src: "/images/insights/inline/export-containers-1600.webp", alt: "港口堆疊的貨櫃" },
    { src: "/images/insights/inline/export-boxes-1600.webp", alt: "準備出貨的紙箱" },
  ),
  "企業體質": inlineImages(
    { src: "/images/insights/inline/biz-charts-1600.webp", alt: "桌上的筆記本與數據圖表" },
    { src: "/images/insights/inline/biz-notes-1600.webp", alt: "在筆記本上整理數據重點" },
  ),
  "東南亞趨勢": inlineImages(
    { src: "/images/insights/inline/sea-mobile-1600.webp", alt: "手機上的購物應用程式" },
    { src: "/images/insights/inline/sea-saigon-1600.webp", alt: "胡志明市西貢河上的貨櫃船" },
  ),
  "印尼": inlineImages(
    { src: "/images/insights/inline/sea-mobile-1600.webp", alt: "手機上的購物應用程式" },
    { src: "/images/insights/inline/sea-saigon-1600.webp", alt: "胡志明市西貢河上的貨櫃船" },
  ),
};

export const SLUG_INLINE_IMAGES: Partial<Record<string, readonly InlineImage[]>> = {};

export function getInlineImages(slug: string, category: Category): readonly InlineImage[] {
  return SLUG_INLINE_IMAGES[slug] ?? CATEGORY_INLINE_IMAGES[category];
}
