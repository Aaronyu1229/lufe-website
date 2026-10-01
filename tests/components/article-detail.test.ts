import { createElement, Fragment } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ArticleDetail, renderStaticBoldMarkup } from "@/components/insights/ArticleDetail";
import { StaticArticleContent } from "@/components/insights/StaticArticleContent";
import { articles, getArticleBySlug, getArticleImage } from "@/data/articles";

const renderMarkup = (text: string) =>
  renderToStaticMarkup(createElement(Fragment, null, renderStaticBoldMarkup(text)));

describe("renderStaticBoldMarkup", () => {
  it("renders balanced ** markers as strong elements", () => {
    const markup = renderMarkup("補助比例最高 **90%**，而且 **經費用罄即止**。");

    expect(markup).toContain('<strong class="text-tx font-semibold">90%</strong>');
    expect(markup).toContain('<strong class="text-tx font-semibold">經費用罄即止</strong>');
    expect(markup).not.toContain("**");
  });

  it("keeps an unpaired marker as text", () => {
    expect(renderMarkup("這個 **標記沒有結尾")).toBe("這個 **標記沒有結尾");
  });
});

describe("ArticleDetail", () => {
  it("keeps every static article's metadata in the server markup", () => {
    for (const article of articles) {
      const markup = renderToStaticMarkup(createElement(ArticleDetail, { article, image: getArticleImage(article) }));

      expect(markup).toContain(article.title);
      expect(markup).toContain(article.summary);
      expect(markup).toContain(article.category);
      expect(markup).toContain(article.date);
      expect(markup).toContain(article.readTime);

    }
  });

  it("renders tables, lists, quotes, and safe links from rewritten article Markdown", () => {
    const article = getArticleBySlug("landed-cost-before-export");
    if (!article) throw new Error("Expected rewritten article");

    const markup = renderToStaticMarkup(createElement(StaticArticleContent, { content: article.content }));

    expect(markup).toContain("<table");
    expect(markup).toContain("<blockquote");
    expect(markup).toContain("<ul");
    expect(markup).toContain('href="/services/product-testing"');
    expect(markup).toContain('href="https://tradepiloter.com"');
    expect(markup).toContain('target="_blank"');
    expect(markup).toContain('rel="noopener"');
  });

  it("does not render rounded utility classes", () => {
    const markup = renderToStaticMarkup(
      createElement(ArticleDetail, { article: articles[0], image: getArticleImage(articles[0]) }),
    );

    expect(markup).not.toMatch(/\brounded-(?!full\b)/);
  });

  it("renders Aaron's byline and author card with links to the author page", () => {
    const markup = renderToStaticMarkup(
      createElement(ArticleDetail, { article: articles[0], image: getArticleImage(articles[0]) }),
    );

    expect(markup).toContain('href="/about/aaron-yu"');
    expect(markup).toContain("Aaron Yu・鹿飛 LUFÉ 創辦人");
    expect(markup).toContain("鹿飛 LUFÉ 創辦人・來自躍馬企業");
    expect(markup).toContain("看更多 Aaron 的文章 →");
  });
});
