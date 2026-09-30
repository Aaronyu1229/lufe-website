import { createElement, type ReactNode } from "react";
import { renderToReadableStream, renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("@/lib/articles/repository", () => ({
  getPublishedArticleBySlug: async () => null,
  listPublishedArticles: async () => [],
}));

import ArticlePage, { generateMetadata as generateArticleMetadata } from "@/app/insights/[slug]/page";
import ProductTestingPage from "@/app/services/product-testing/page";
import Services, { metadata as servicesMetadata } from "@/app/services/page";
import { Navbar } from "@/components/Navbar";
import { SiteStructuredData } from "@/components/seo/StructuredData";
import { articles } from "@/data/articles";
import { CHAPTERS } from "@/data/chapters";
import { SITE_NAME } from "@/lib/site";
import { toIsoDate } from "@/lib/seo";

type JsonLd = {
  readonly "@type"?: string;
  readonly "@graph"?: readonly JsonLd[];
  readonly [key: string]: unknown;
};

function parseJsonLd(markup: string): JsonLd[] {
  return [...markup.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]) as JsonLd);
}

function findJsonLd(markup: string, type: string): JsonLd {
  const scripts = parseJsonLd(markup);
  for (const script of scripts) {
    if (script["@type"] === type) return script;
    const graphNode = script["@graph"]?.find((node) => node["@type"] === type);
    if (graphNode) return graphNode;
  }
  throw new Error(`Missing JSON-LD type: ${type}`);
}

async function renderAsync(element: ReactNode): Promise<string> {
  const stream = await renderToReadableStream(element);
  await stream.allReady;
  return new Response(stream).text();
}

describe("technical SEO", () => {
  it("renders Organization and WebSite JSON-LD in the homepage layout", () => {
    const markup = renderToStaticMarkup(createElement(SiteStructuredData));
    const organization = findJsonLd(markup, "Organization");
    const website = findJsonLd(markup, "WebSite");

    expect(organization.name).toBe(SITE_NAME);
    expect(organization.sameAs).toEqual([]);
    expect(website.url).toBe("https://lufe.world");
    expect(findJsonLd(markup, "Person").sameAs).toEqual(["https://www.linkedin.com/in/wibp/"]);
  });

  it("renders Article JSON-LD with Aaron Yu and a publication date", async () => {
    const article = articles[0];
    const markup = renderToStaticMarkup(await ArticlePage({ params: Promise.resolve({ slug: article.slug }) }));
    const articleJsonLd = findJsonLd(markup, "Article");

    expect((articleJsonLd.author as { name: string }).name).toBe("Aaron Yu");
    expect(articleJsonLd.datePublished).toBe(toIsoDate(article.date));
  });

  it("keeps each product-testing FAQPage answer identical to the displayed FAQ data", async () => {
    const markup = await renderAsync(createElement(ProductTestingPage));
    const faqPage = findJsonLd(markup, "FAQPage");
    const mainEntity = faqPage.mainEntity as Array<{ name: string; acceptedAnswer: { text: string } }>;

    expect(mainEntity).toEqual(CHAPTERS.m1.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })));
  });

  it("sets a non-home canonical and BreadcrumbList", () => {
    const markup = renderToStaticMarkup(createElement(Services));
    const breadcrumb = findJsonLd(markup, "BreadcrumbList");

    expect(servicesMetadata.alternates?.canonical).toBe("/services");
    expect(breadcrumb.itemListElement).toEqual([
      { "@type": "ListItem", position: 1, name: "首頁", item: "https://lufe.world/" },
      { "@type": "ListItem", position: 2, name: "服務", item: "https://lufe.world/services" },
    ]);
  });

  it("adds the brand once to an article title through the root title template", async () => {
    const metadata = await generateArticleMetadata({ params: Promise.resolve({ slug: articles[0].slug }) });
    const articleTitle = String(metadata.title);
    const documentTitle = `${articleTitle} | ${SITE_NAME}`;

    expect(articleTitle).not.toContain(SITE_NAME);
    expect(documentTitle.match(new RegExp(SITE_NAME, "g"))).toHaveLength(1);
  });

  it("places main before the desktop mega panel in server HTML", () => {
    const markup = renderToStaticMarkup(
      createElement(Navbar, null, createElement("main", { id: "main-content" }, "主要內容")),
    );

    expect(markup.indexOf("<main")).toBeLessThan(markup.indexOf('id="desktop-mega-menu"'));
  });
});
