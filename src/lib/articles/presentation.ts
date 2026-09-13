import type { Article, ArticleColor, Category } from "@/data/articles";
import { getArticleImage } from "@/data/articles";

import type { DatabaseArticle } from "./repository";

export type InsightCard = Omit<Article, "content"> & {
  readonly image: string;
};

export type DatabaseInsight = Omit<Article, "content"> & {
  readonly content: { readonly html: string };
  readonly image: string;
};

const categoryValues: readonly Category[] = [
  "菲律賓",
  "印尼",
  "東南亞趨勢",
  "北美市場",
  "出海實戰",
  "企業體質",
];

const colors: readonly ArticleColor[] = ["sky", "gold", "ember"];

export const getPlainText = (html: string): string => html
  .replace(/<[^>]*>/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const getCategory = (tags: readonly string[]): Category =>
  tags.find((tag): tag is Category => categoryValues.includes(tag as Category)) ?? "出海實戰";

const getTaipeiDate = (date: Date | null): string => {
  const value = date ?? new Date();
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(value);
  const find = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${find("year")}-${find("month")}-${find("day")}`;
};

const getColor = (slug: string): ArticleColor => {
  let hash = 0;
  for (const character of slug) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  }
  return colors[hash % colors.length];
};

const getFallbackImage = (article: Pick<DatabaseArticle, "slug" | "title">): string =>
  getArticleImage({
    slug: article.slug,
    title: article.title,
    category: "出海實戰",
    date: "",
    summary: "",
    readTime: "",
    color: "sky",
    content: [],
  });

const getArticleImageForDatabaseArticle = (article: DatabaseArticle): string =>
  article.featureImage ?? getFallbackImage(article);

const getSummary = (article: DatabaseArticle): string =>
  article.metaDescription ?? getPlainText(article.html).slice(0, 120);

const getReadTime = (article: DatabaseArticle): string =>
  `${Math.max(1, Math.ceil(getPlainText(article.html).length / 400))} 分鐘`;

const articleProjection = (article: DatabaseArticle) => ({
  slug: article.slug,
  category: getCategory(article.tags),
  date: getTaipeiDate(article.publishedAt),
  title: article.title,
  summary: getSummary(article),
  readTime: getReadTime(article),
  color: getColor(article.slug),
  image: getArticleImageForDatabaseArticle(article),
});

export const toInsightCard = (article: Article): InsightCard => ({
  slug: article.slug,
  category: article.category,
  date: article.date,
  title: article.title,
  summary: article.summary,
  readTime: article.readTime,
  color: article.color,
  image: getArticleImage(article),
});

export const toDatabaseInsightCard = (article: DatabaseArticle): InsightCard => articleProjection(article);

export const toDatabaseInsight = (article: DatabaseArticle): DatabaseInsight => ({
  ...articleProjection(article),
  content: { html: article.html },
});
