import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/articles/repository", () => ({
  getPublishedArticleBySlug: async () => null,
  listPublishedArticles: async () => [],
}));

import ArticlePage from "@/app/insights/[slug]/page";
import { articles, getArticleBySlug } from "@/data/articles";

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

function scalar(value: string): string {
  return value.startsWith('"') ? JSON.parse(value) as string : value;
}

function frontMatterValue(frontMatter: string, key: string): string {
  const match = frontMatter.match(new RegExp(`^${key}: (.+)$`, "m"));
  if (!match) throw new Error(`Missing ${key}`);
  return scalar(match[1]);
}

function readDraft(file: string): Draft {
  const input = readFileSync(join(draftDirectory, file), "utf8");
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
  .map(readDraft);

describe("eleven story article rewrites", () => {
  it("copies every approved draft into its matching static article", () => {
    expect(drafts).toHaveLength(11);
    expect(articles).toHaveLength(11);

    for (const draft of drafts) {
      const article = getArticleBySlug(draft.slug);
      expect(article).toMatchObject({
        slug: draft.slug,
        title: draft.title,
        summary: draft.excerpt,
        category: draft.category,
        content: [draft.body],
        faq: draft.faq,
        sources: draft.sources,
        lastVerified: draft.lastVerified,
        updated: "2026-10-01",
      });
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

  it("renders the story treatment, citations, sources, FAQPage, and Article citations in server HTML", async () => {
    for (const article of articles) {
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
      expect(articleJsonLd?.dateModified).toBe("2026-10-01T00:00:00+08:00");
    }
  });
});
