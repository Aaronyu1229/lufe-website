import { HOME_FAQ_ITEMS, type HomeFaqItem } from "@/data/homeFaq";

export type HomeFaqCopy = {
  readonly title: string;
  readonly askLabel: string;
  readonly moreLabel: string;
  readonly items: readonly HomeFaqItem[];
};

export const homeFaqZh: HomeFaqCopy = {
  title: "你可能想先問的三件事",
  askLabel: "直接問鹿飛 →",
  moreLabel: "還有其他問題？",
  items: HOME_FAQ_ITEMS,
};
