import { createElement, Fragment } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { ArticleDetail, renderStaticBoldMarkup } from "@/components/insights/ArticleDetail";
import { StaticArticleContent, getStaticArticleHeadings } from "@/components/insights/StaticArticleContent";
import { getInlineImages } from "@/data/articleInlineImages";
import { articles, getArticleBySlug, getArticleImage } from "@/data/articles";
import { toInsightCard } from "@/lib/articles/presentation";

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
      const markup = renderToStaticMarkup(createElement(ArticleDetail, { article, image: getArticleImage(article), related: [] }));

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
      createElement(ArticleDetail, { article: articles[0], image: getArticleImage(articles[0]), related: [] }),
    );

    expect(markup).not.toMatch(/\brounded-(?!full\b)/);
  });

  it("renders Aaron's byline and author card with links to the author page", () => {
    const markup = renderToStaticMarkup(
      createElement(ArticleDetail, { article: articles[0], image: getArticleImage(articles[0]), related: [] }),
    );

    expect(markup).toContain('href="/about/aaron-yu"');
    expect(markup).toContain("Aaron Yu・鹿飛 LUFÉ 創辦人");
    expect(markup).toContain("躍馬企業國際物流背景出身，專注研究台灣企業如何在北美與東南亞市場落地");
    expect(markup).toContain("看更多專欄文章 →");
    expect(markup).not.toContain("看更多 Aaron 的文章");
  });

  it("renders TOC anchors, related reading, and inline images before their matching headings", () => {
    const article = getArticleBySlug("go-no-go-framework");
    if (!article) throw new Error("Expected go/no-go article");
    const headings = getStaticArticleHeadings(article.content);
    const inlineImages = getInlineImages(article.slug, article.category);
    expect(headings.length).toBeGreaterThanOrEqual(5);

    const markup = renderToStaticMarkup(createElement(ArticleDetail, {
      article,
      image: getArticleImage(article),
      related: articles.slice(0, 3).map(toInsightCard),
    }));

    expect(markup).toContain('id="section-1"');
    expect(markup).toContain('id="section-3"');
    expect(markup).toContain('id="section-5"');
    for (const heading of headings) expect(markup).toContain(heading.text);
    expect(markup.indexOf(inlineImages[0].alt)).toBeLessThan(markup.indexOf('id="section-3"'));
    expect(markup.indexOf(inlineImages[1].alt)).toBeLessThan(markup.indexOf('id="section-5"'));
    expect(markup).toContain("延伸閱讀");
    expect(markup).toContain("把文章裡的方法，");
  });

  it("skips inline images for an article with fewer than three headings", () => {
    const article = { ...articles[0], content: ["## 第一節", "內容", "## 第二節", "更多內容"] };
    const markup = renderToStaticMarkup(createElement(ArticleDetail, { article, image: getArticleImage(article), related: [] }));

    for (const image of getInlineImages(article.slug, article.category)) expect(markup).not.toContain(image.alt);
  });

  it("provides category defaults and generated files for every inline image", () => {
    const categories = ["菲律賓", "印尼", "東南亞趨勢", "北美市場", "出海實戰", "企業體質"] as const;

    for (const category of categories) {
      const images = getInlineImages("unconfigured-article", category);
      expect(images).toHaveLength(2);
      for (const image of images) {
        const imageRoot = path.join(process.cwd(), "public", image.src.replace(/^\//, "").replace("-1600.webp", ""));
        expect(existsSync(`${imageRoot}.jpg`)).toBe(true);
        for (const width of [640, 1080, 1600, 2400]) expect(existsSync(`${imageRoot}-${width}.webp`)).toBe(true);
      }
    }
  });
});
