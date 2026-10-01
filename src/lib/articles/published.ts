import { articles, type Article } from "@/data/articles";

export function isPublished(article: Article, now = new Date()): boolean {
  return !article.publishAt || new Date(article.publishAt).getTime() <= now.getTime();
}

export function getPublishedArticles(now = new Date()): readonly Article[] {
  return articles.filter((article) => isPublished(article, now));
}

export function getArticlePublishedDate(article: Article): string {
  return article.publishAt?.slice(0, 10) ?? article.date;
}
