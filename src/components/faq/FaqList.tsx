import type { JSX } from "react";

import { FaqItem, type FaqEntry } from "./FaqItem";

export function FaqList({ items, idPrefix }: { readonly items: readonly FaqEntry[]; readonly idPrefix: string }): JSX.Element {
  return <div className="min-w-0">{items.map((item) => <FaqItem key={item.num} item={item} idPrefix={idPrefix} />)}</div>;
}
