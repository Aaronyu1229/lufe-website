import { createElement, Fragment } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ArticleDetail, renderStaticBoldMarkup, stripDatabaseArticleImages } from "@/components/insights/ArticleDetail";
import { ArticleFaq } from "@/components/insights/ArticleFaq";
import { StaticArticleContent, getStaticArticleHeadings } from "@/components/insights/StaticArticleContent";
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
  it("uses the shared numbered FAQ while keeping every answer in server markup", () => {
    const faq = [
      { q: "第一個常見問題", a: "第一個常見問題的答案。" },
      { q: "第二個常見問題", a: "第二個常見問題的答案。" },
    ];
    const markup = renderToStaticMarkup(createElement(ArticleFaq, { faq }));

    expect(markup).toContain(">01<");
    expect(markup).toContain(">02<");
    for (const item of faq) {
      expect(markup).toContain(item.q);
      expect(markup).toContain(item.a);
    }
  });

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

  it("renders exactly one figure for static articles and no inline-image references", () => {
    const article = getArticleBySlug("go-no-go-framework");
    if (!article) throw new Error("Expected go/no-go article");

    const markup = renderToStaticMarkup(createElement(ArticleDetail, {
      article,
      image: getArticleImage(article),
      related: articles.slice(0, 3).map(toInsightCard),
    }));

    expect((markup.match(/<figure\b/g) ?? [])).toHaveLength(1);
    expect(markup).not.toContain("insights/inline");
    expect(markup).toContain("延伸閱讀");
    for (const heading of getStaticArticleHeadings(article.content)) expect(markup).toContain(heading.text);
  });

  it("strips figures, bare images, image-only paragraphs, and uppercase image tags from database HTML", () => {
    expect(stripDatabaseArticleImages('<figure><img src="figure.jpg" /><figcaption>圖說</figcaption></figure><p>留下文字</p>')).toBe("<p>留下文字</p>");
    expect(stripDatabaseArticleImages('<h2>標題</h2><img src="bare.jpg" /><p>內容</p>')).toBe("<h2>標題</h2><p>內容</p>");
    expect(stripDatabaseArticleImages('<p><img src="inside.jpg" /></p><p>內容</p>')).toBe("<p>內容</p>");
    expect(stripDatabaseArticleImages('<FIGURE><IMG SRC="upper.jpg" /></FIGURE><P>內容</P>')).toBe("<P>內容</P>");
  });

  it("does not render rounded utility classes", () => {
    const markup = renderToStaticMarkup(
      createElement(ArticleDetail, { article: articles[0], image: getArticleImage(articles[0]), related: [] }),
    );

    expect(markup).not.toMatch(/\brounded-(?!full\b)/);
  });

  it("renders the shared numbered TOC in every article presentation", () => {
    const article = articles.find((candidate) => getStaticArticleHeadings(candidate.content).length >= 3);
    if (!article) throw new Error("Expected article with at least three headings");
    const headings = getStaticArticleHeadings(article.content);
    const markup = renderToStaticMarkup(createElement(ArticleDetail, { article, image: getArticleImage(article), related: [] }));
    const sheetStart = markup.indexOf('data-article-toc-variant="sheet"');
    const sheetMarkup = markup.slice(sheetStart, markup.indexOf("</nav>", sheetStart));

    expect(markup).toContain("本文目錄");
    expect(markup).toContain(">01<");
    expect(markup).toContain(">02<");
    expect(markup).toContain('<nav aria-label="本文目錄"');
    expect((sheetMarkup.match(/href="#/g) ?? [])).toHaveLength(headings.length);
    expect(markup).not.toMatch(/\brounded-(?!full\b)/);
  });

  it("omits every TOC presentation for an article without headings", () => {
    const article = { ...articles[0], content: ["只有一段沒有章節的文字。"] };
    const markup = renderToStaticMarkup(createElement(ArticleDetail, { article, image: getArticleImage(article), related: [] }));

    expect(markup).not.toContain("本文目錄");
    expect(markup).not.toContain("data-article-toc-variant");
  });

  it("renders Aaron's byline and author card with links to the author page", () => {
    const markup = renderToStaticMarkup(
      createElement(ArticleDetail, { article: articles[0], image: getArticleImage(articles[0]), related: [] }),
    );

    expect(markup).toContain('href="/about/aaron-yu"');
    expect(markup).toContain("Aaron Yu・鹿飛 LUFÉ 創辦人");
    expect(markup).toContain("創辦人來自躍馬企業，底下是 42 年的國際物流。貨代把貨送到，故事才開始；這個專欄寫的是貨到了之後的事。");
    expect(markup).toContain("看更多專欄文章 →");
    expect(markup).not.toContain("看更多 Aaron 的文章");
  });
});
