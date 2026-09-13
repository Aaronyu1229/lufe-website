import { describe, expect, it } from "vitest";

import { toDatabaseInsight, toDatabaseInsightCard } from "@/lib/articles/presentation";
import { sanitizeArticleHtml } from "@/lib/articles/sanitize";
import type { DatabaseArticle } from "@/lib/articles/repository";

const article = (overrides: Partial<DatabaseArticle> = {}): DatabaseArticle => ({
  id: "0123456789abcdef01234567",
  slug: "mapping-test",
  title: "Mapping title",
  html: `<p>${"a".repeat(401)}</p>`,
  metaTitle: null,
  metaDescription: null,
  canonicalUrl: null,
  featureImage: "https://images.example.com/feature.jpg",
  tags: ["not-a-category", "北美市場"],
  status: "published",
  publishedAt: new Date("2026-09-12T16:30:00.000Z"),
  createdAt: new Date("2026-09-12T16:30:00.000Z"),
  updatedAt: new Date("2026-09-12T16:30:00.000Z"),
  ...overrides,
});

describe("database insight presentation", () => {
  it("maps tags, Taipei date, summary, read time, color, and external image", () => {
    const card = toDatabaseInsightCard(article());

    expect(card).toMatchObject({
      category: "北美市場",
      date: "2026-09-13",
      image: "https://images.example.com/feature.jpg",
      readTime: "2 分鐘",
      slug: "mapping-test",
      summary: "a".repeat(120),
    });
    expect(["sky", "gold", "ember"]).toContain(card.color);
    expect(card).not.toHaveProperty("content");
  });

  it("uses the default category and keeps sanitized HTML only for the detail model", () => {
    const detail = toDatabaseInsight(article({ featureImage: null, tags: [] }));

    expect(detail.category).toBe("出海實戰");
    expect(detail.image).toBeTruthy();
    expect(detail.content.html).toContain("a".repeat(20));
  });
});

describe("article sanitization", () => {
  it("removes script, event handlers, and javascript URLs", () => {
    expect(sanitizeArticleHtml("<p onclick='x()'>safe</p><script>x()</script><img src='javascript:x'>"))
      .toBe("<p>safe</p><img />");
  });
});
