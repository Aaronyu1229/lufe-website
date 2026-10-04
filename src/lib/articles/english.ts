import { EN_ARTICLES, type EnglishArticle } from "@/data/en/articles";
import { articles, type Article } from "@/data/articles";
import { getPublishedArticles, isPublished } from "@/lib/articles/published";

export function toEnglishArticle(zh: Article, en: EnglishArticle): Article {
  return {
    ...zh,
    title: en.title,
    summary: en.summary,
    readTime: en.readTime,
    content: en.content,
    faq: en.faq,
    sources: en.sources,
  };
}

export function getEnglishArticle(slug: string, now = new Date()): Article | undefined {
  const chinese = articles.find((article) => article.slug === slug);
  const english = EN_ARTICLES[slug];
  if (!chinese || !english || !isPublished(chinese, now)) return undefined;

  return toEnglishArticle(chinese, english);
}

export function getPublishedEnglishArticles(now = new Date()): readonly Article[] {
  return getPublishedArticles(now).flatMap((chinese) => {
    const english = EN_ARTICLES[chinese.slug];
    return english ? [toEnglishArticle(chinese, english)] : [];
  });
}

export function hasEnglishArticle(slug: string): boolean {
  return Boolean(EN_ARTICLES[slug]);
}

export function articleZhText(zh: Article) {
  return {
    title: zh.title,
    summary: zh.summary,
    content: zh.content,
    faq: zh.faq,
    sources: zh.sources?.map(({ title, publisher, note }) => ({ title, publisher, note })),
  };
}
