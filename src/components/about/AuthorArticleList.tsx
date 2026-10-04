"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { InsightArticleCard } from "@/components/insights/InsightArticleCard";
import { Segmented, flip } from "@/components/ui";
import type { Category } from "@/data/articles";
import type { InsightCard } from "@/lib/articles/presentation";

const CATEGORY_ORDER: readonly Category[] = [
  "菲律賓",
  "印尼",
  "東南亞趨勢",
  "北美市場",
  "出海實戰",
  "企業體質",
];

/** Display names that differ from the category key on this page. */
const CATEGORY_LABELS: Partial<Record<Category, string>> = { "北美市場": "北美通路" };

type AuthorArticleFilter = "all" | Category;

function categoryFromLocation(categories: readonly Category[]): AuthorArticleFilter {
  if (typeof window === "undefined") return "all";
  const category = new URLSearchParams(window.location.search).get("cat");
  return categories.includes(category as Category) ? category as Category : "all";
}

export function AuthorArticleList({ articles, emptyLabel }: { readonly articles: readonly InsightCard[]; readonly emptyLabel?: string }) {
  const categories = useMemo(
    () => CATEGORY_ORDER.filter((category) => articles.some((article) => article.category === category)),
    [articles],
  );
  const counts = new Map<Category, number>(categories.map((category) => [category, 0]));
  articles.forEach((article) => counts.set(article.category, (counts.get(article.category) ?? 0) + 1));

  const [active, setActive] = useState<AuthorArticleFilter>("all");
  const gridRef = useRef<HTMLDivElement>(null);

  const selectCategory = (category: AuthorArticleFilter) => {
    const update = () => setActive(category);
    const grid = gridRef.current;
    if (grid && category !== active) flip(grid, update); else update();

    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.delete("cat");
    const otherParams = params.toString();
    url.search = category === "all"
      ? otherParams
      : `${otherParams ? `${otherParams}&` : ""}cat=${encodeURIComponent(category)}`;
    window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
  };

  useEffect(() => {
    const syncCategory = () => setActive(categoryFromLocation(categories));
    syncCategory();
    window.addEventListener("popstate", syncCategory);
    return () => window.removeEventListener("popstate", syncCategory);
  }, [categories]);

  if (articles.length === 0) return emptyLabel ? <p className="text-[15.5px] leading-[1.8] text-tx2">{emptyLabel}</p> : null;

  return (
    <>
      <div className="mb-10 max-w-full overflow-x-auto pb-1">
        <Segmented
          label="文章分類"
          value={active}
          onChange={(value) => {
            if (value === "all" || categories.includes(value as Category)) selectCategory(value as AuthorArticleFilter);
          }}
          options={[
            { value: "all", label: <>全部<span className="lufe-insight-count" aria-hidden="true">{articles.length}</span></> },
            ...categories.map((category) => ({
              value: category,
              label: <>{CATEGORY_LABELS[category] ?? category}<span className="lufe-insight-count" aria-hidden="true">{counts.get(category) ?? 0}</span></>,
            })),
          ]}
          className="max-w-none"
        />
      </div>
      <div ref={gridRef} className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <div key={article.slug} data-key={article.slug} className={active === "all" || active === article.category ? "" : "hidden"}>
            <InsightArticleCard article={article} />
          </div>
        ))}
      </div>
    </>
  );
}
