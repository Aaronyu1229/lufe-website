import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/articles/repository", () => ({
  getPublishedArticleBySlug: async () => null,
  listPublishedArticles: async () => [],
}));

import ArticlePage from "@/app/insights/[slug]/page";
import { getArticleBySlug } from "@/data/articles";
import nextConfig from "../next.config";

const rewrites = [
  ["vietnam-market-entry-guide", "why-philippines-first", "why-philippines-first.md"],
  ["southeast-asia-ecommerce-2026", "philippines-ecommerce-first-year", "philippines-ecommerce-first-year.md"],
  ["china-tariff-relocation-strategy", "landed-cost-before-export", "landed-cost-before-export.md"],
  ["amazon-category-analysis", "amazon-us-three-decisions", "amazon-us-three-decisions.md"],
] as const;

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = join(directory, entry.name);
    return entry.isDirectory() ? sourceFiles(file) : statSync(file).isFile() ? [file] : [];
  });
}

function cleanedDraftBody(file: string): string {
  const input = readFileSync("docs/proposals/blog-rewrites-2026-10-01/" + file, "utf8");
  const match = input.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
  if (!match) throw new Error("Missing body in " + file);

  let body = match[1].replace(/^\s*# .*\n+/, "");
  for (const heading of ["我們在現場看到的", "常見問題", "要問 Aaron 的追問（發文前）"]) {
    body = body.replace(new RegExp("^## " + heading + "\\n[\\s\\S]*?(?=^## )", "m"), "");
  }
  return body.trim();
}

describe("four article rewrites", () => {
  it("publishes each new slug without draft-only text", () => {
    for (const [, slug] of rewrites) {
      const article = getArticleBySlug(slug);
      expect(article).toBeDefined();
      expect(article?.faq).toHaveLength(3);
      expect(article?.updated).toBe("2026-10-01");
      expect(article?.content.join("\n")).not.toContain("待 Aaron 確認");
      expect(article?.content.join("\n")).not.toContain("要問 Aaron");
    }
  });

  it("keeps every non-draft line identical to its approved rewrite", () => {
    for (const [, slug, draft] of rewrites) {
      expect(getArticleBySlug(slug)?.content.map((content) => content.trim())).toEqual([cleanedDraftBody(draft)]);
    }
  });

  it("configures permanent redirects for every old slug", async () => {
    const redirects = await nextConfig.redirects?.();

    for (const [oldSlug, newSlug] of rewrites) {
      expect(redirects).toContainEqual({
        source: "/insights/" + oldSlug,
        destination: "/insights/" + newSlug,
        permanent: true,
      });
    }
  });

  it("removes the old slugs from source code", () => {
    const source = sourceFiles("src").map((file) => readFileSync(file, "utf8")).join("\n");

    for (const [oldSlug] of rewrites) expect(source).not.toContain(oldSlug);
  });

  it("renders three FAQPage entries and the updated date for every rewritten article", async () => {
    for (const [, slug] of rewrites) {
      const article = getArticleBySlug(slug);
      if (!article) throw new Error("Expected rewritten article");

      const markup = renderToStaticMarkup(await ArticlePage({ params: Promise.resolve({ slug }) }));
      const scripts = [...markup.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
        .map((match) => JSON.parse(match[1]) as { "@type": string; mainEntity?: unknown[]; dateModified?: string });
      const faqPage = scripts.find((script) => script["@type"] === "FAQPage");
      const articleJsonLd = scripts.find((script) => script["@type"] === "Article");

      expect(faqPage?.mainEntity).toHaveLength(3);
      expect(articleJsonLd?.dateModified).toBe("2026-10-01T00:00:00+08:00");
      expect(markup).toContain("常見問題");
      for (const item of article.faq ?? []) {
        expect(markup).toContain(item.q);
        expect(markup).toContain(item.a);
      }
    }
  });
});
