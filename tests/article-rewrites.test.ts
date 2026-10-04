import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/articles/repository", () => ({
  getPublishedArticleBySlug: async () => null,
  listPublishedArticles: async () => [],
}));

import ArticlePage from "@/app/insights/[slug]/page";
import sitemap from "@/app/sitemap";
import { articles, getArticleBySlug, getArticleImage } from "@/data/articles";
import { CHAPTER_ARTICLES } from "@/data/chapters";

type DraftSource = {
  readonly id: number;
  readonly title: string;
  readonly publisher: string;
  readonly url: string;
  readonly note?: string;
};

type Draft = {
  readonly file: string;
  readonly slug: string;
  readonly title: string;
  readonly excerpt: string;
  readonly category: string;
  readonly faq: readonly { readonly q: string; readonly a: string }[];
  readonly sources: readonly DraftSource[];
  readonly lastVerified: string;
  readonly body: string;
};

const draftDirectory = "docs/proposals/blog-story-2026-10-01";
const newDraftDirectory = "docs/proposals/blog-new-2026-10-01";

function scalar(value: string): string {
  return value.startsWith('"') ? JSON.parse(value) as string : value;
}

function frontMatterValue(frontMatter: string, key: string): string {
  const match = frontMatter.match(new RegExp(`^${key}: (.+)$`, "m"));
  if (!match) throw new Error(`Missing ${key}`);
  return scalar(match[1]);
}

function readDraft(file: string, directory = draftDirectory): Draft {
  const input = readFileSync(join(directory, file), "utf8");
  const match = input.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`Missing front matter in ${file}`);

  const [, frontMatter, body] = match;
  const faq = [...frontMatter.matchAll(/^  - q: (.+)\n    a: (.+)$/gm)].map((item) => ({
    q: scalar(item[1]),
    a: scalar(item[2]),
  }));
  const sources = [...frontMatter.matchAll(/^  - id: (\d+)\n    title: (.+)\n    publisher: (.+)\n    url: (.+)(?:\n    note: (.+))?(?=\n  - id:|\nlastVerified:|$)/gm)].map((item) => ({
    id: Number(item[1]),
    title: scalar(item[2]),
    publisher: scalar(item[3]),
    url: scalar(item[4]),
    ...(item[5] ? { note: scalar(item[5]) } : {}),
  }));

  return {
    file,
    slug: frontMatterValue(frontMatter, "slug"),
    title: frontMatterValue(frontMatter, "title"),
    excerpt: frontMatterValue(frontMatter, "excerpt"),
    category: frontMatterValue(frontMatter, "category"),
    faq,
    sources,
    lastVerified: frontMatterValue(frontMatter, "lastVerified"),
    body: body.trim(),
  };
}

const drafts = readdirSync(draftDirectory)
  .filter((file) => file.endsWith(".md") && file !== "WO.md")
  .sort()
  .map((file) => readDraft(file));
const newDrafts = readdirSync(newDraftDirectory)
  .filter((file) => file.endsWith(".md") && file !== "WO.md")
  .sort()
  .map((file) => readDraft(file, newDraftDirectory));
const reviewedSlugs = new Set([...drafts, ...newDrafts].map((draft) => draft.slug));
const reviewedArticles = articles.filter((article) => reviewedSlugs.has(article.slug));

const seoTitles = {
  "us-fda-registration-guide": "美國 FDA 認證怎麼申請？FDA 不發「認證」：保健品出口美國真正要做的五件事",
  "landed-cost-before-export": "出口報價前先算到岸成本：FOB、CIF、DDP 差在哪、關稅怎麼算",
  "tradepilot-tariff-tutorial": "關稅怎麼計算？用 TradePilot 線上關稅查詢工具查 HS Code、關稅到落地成本",
  "product-testing-best-practices": "市場調查怎麼做？小預算的海外市場測試，先避開三個錯誤",
  "first-time-export-checklist": "第一次出口要走哪五步？從確認有人買、產品證到出口報關與上架",
  "overseas-exhibition-subsidy-115-upgrade": "參展補助怎麼申請？115 年海外參展補助每展最高 16 萬、補到 90%",
  "why-philippines-first": "東南亞市場先去哪一國？越南、泰國、印尼、菲律賓比較，為什麼先從菲律賓開始",
  "philippines-ecommerce-first-year": "菲律賓電商第一年：蝦皮、Lazada、TikTok Shop 先開哪一個？店開誰名下",
  "amazon-us-three-decisions": "產品要上 Amazon 美國站嗎？台灣品牌先做這三個判斷",
} as const;

const ownerApprovedBody = (draft: Draft) => draft.slug === "agent-vs-distributor-exclusive"
  ? draft.body.replace(
    "鹿飛的[寄賣包](/services/consignment)用的是另一種做法：證由合作的持證進口商代辦、代持，資料歸你，合約寫清楚轉移配合，換人只換一張合約，不綁任何一家通路。這不是唯一解，但它把「證掛誰名下」從代理談判桌上拿掉了。",
    "鹿飛的[寄賣包](/services/consignment)用的是另一種做法：證由合作的持證進口商代辦、代持，資料歸你；合約要求進口商配合轉移，你不用從頭來；FDA 的轉移或重新通報程序仍要走，不綁任何一家通路。這不是唯一解，但它把「證掛誰名下」從代理談判桌上拿掉了。",
  )
  : draft.body;

describe("article rewrites and additions", () => {
  it("copies each approved new draft into a static article", () => {
    expect(drafts).toHaveLength(11);
    expect(newDrafts).toHaveLength(2);
    expect(reviewedArticles).toHaveLength(13);

    for (const draft of newDrafts) {
      const article = getArticleBySlug(draft.slug);
      expect(article).toMatchObject({
        slug: draft.slug,
        title: draft.title,
        summary: draft.excerpt,
        category: draft.category,
        content: [ownerApprovedBody(draft)],
        faq: draft.faq,
        sources: draft.sources,
        lastVerified: draft.lastVerified,
        updated: draft.slug === "agent-vs-distributor-exclusive" ? "2026-10-04" : "2026-10-01",
      });
    }
  });

  it("uses every approved SEO title", () => {
    for (const [slug, title] of Object.entries(seoTitles)) {
      expect(getArticleBySlug(slug)?.title).toBe(title);
    }
  });

  it("keeps every citation valid and every approved source cited", () => {
    for (const article of articles) {
      const body = article.content.join("\n");
      const citedIds = new Set([...body.matchAll(/\[(\d+)\]/g)].map((match) => Number(match[1])));
      const sourceIds = new Set((article.sources ?? []).map((source) => source.id));

      expect(article.faq).toHaveLength(3);
      expect(article.sources?.length).toBeGreaterThan(0);
      expect(body).toMatch(/^## 情境：/m);
      expect(body).not.toContain("待 Aaron");
      expect([...citedIds].every((id) => sourceIds.has(id))).toBe(true);
      expect([...sourceIds].every((id) => citedIds.has(id))).toBe(true);
    }
  });

  it("places the new articles in their required chapter reading lists with dedicated tiered covers", () => {
    expect(CHAPTER_ARTICLES.m3).toContain("agent-vs-distributor-exclusive");
    expect(CHAPTER_ARTICLES.m3).toContain("fob-cif-ddp-explained");
    expect(getArticleImage(getArticleBySlug("agent-vs-distributor-exclusive")!)).toBe("/images/contact/partners-handshake-1600.webp");
    expect(getArticleImage(getArticleBySlug("fob-cif-ddp-explained")!)).toBe("/images/about/author-hero-port-1600.webp");
  });

  it("includes both new static articles in the sitemap", async () => {
    const entries = await sitemap();
    expect(entries).toEqual(expect.arrayContaining([
      expect.objectContaining({ url: "https://lufe.world/insights/agent-vs-distributor-exclusive" }),
      expect.objectContaining({ url: "https://lufe.world/insights/fob-cif-ddp-explained" }),
    ]));
  });

  it("renders the story treatment, citations, sources, FAQPage, and Article citations in server HTML", async () => {
    for (const article of reviewedArticles) {
      const markup = renderToStaticMarkup(await ArticlePage({ params: Promise.resolve({ slug: article.slug }) }));
      const scripts = [...markup.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
        .map((match) => JSON.parse(match[1]) as { "@type": string; mainEntity?: unknown[]; citation?: string[]; dateModified?: string });
      const faqPage = scripts.find((script) => script["@type"] === "FAQPage");
      const articleJsonLd = scripts.find((script) => script["@type"] === "Article");

      expect(markup).toContain("bg-cream");
      expect(markup).toContain('href="#source-1"');
      expect(markup).toContain('id="article-sources"');
      expect(markup).toContain('id="source-1"');
      expect(markup).toContain("出處與查證（");
      expect(markup).toContain("常見問題");
      expect(markup).not.toMatch(/>https?:\/\//);
      expect(faqPage?.mainEntity).toHaveLength(3);
      expect(articleJsonLd?.citation).toEqual(article.sources?.map((source) => source.url));
      expect(articleJsonLd?.dateModified).toBe(`${article.updated}T00:00:00+08:00`);
    }
  });
});
