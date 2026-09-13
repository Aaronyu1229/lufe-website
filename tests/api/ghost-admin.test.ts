import { createHmac } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { createAdminToken, createGhostPublisher } from "../fixtures/nikablog-ghost-publisher";

type ArticleRow = {
  id: string;
  slug: string;
  title: string;
  html: string;
  metaTitle: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  featureImage: string | null;
  tags: string[];
  status: "draft" | "published";
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

const state = vi.hoisted(() => ({
  databaseConfigured: true,
  failList: false,
  revalidatePath: vi.fn(),
  rows: [] as ArticleRow[],
}));

const cloneArticle = (article: ArticleRow): ArticleRow => ({
  ...article,
  tags: [...article.tags],
  publishedAt: article.publishedAt ? new Date(article.publishedAt) : null,
  createdAt: new Date(article.createdAt),
  updatedAt: new Date(article.updatedAt),
});

vi.mock("server-only", () => ({}));

vi.mock("next/cache", () => ({
  revalidatePath: state.revalidatePath,
}));

vi.mock("@/lib/articles/repository", () => ({
  createArticle: async (values: ArticleRow) => {
    const article = cloneArticle(values);
    state.rows.push(article);
    return cloneArticle(article);
  },
  getArticleById: async (id: string, includeDraft = false) => {
    const article = state.rows.find((row) => row.id === id
      && (includeDraft || row.status === "published"));
    return article ? cloneArticle(article) : null;
  },
  getArticleBySlug: async (slug: string, includeDraft = false) => {
    const article = state.rows.find((row) => row.slug === slug
      && (includeDraft || row.status === "published"));
    return article ? cloneArticle(article) : null;
  },
  getPublishedArticleBySlug: async (slug: string) => {
    const article = state.rows.find((row) => row.slug === slug && row.status === "published");
    return article ? cloneArticle(article) : null;
  },
  isArticleDatabaseConfigured: () => state.databaseConfigured,
  listPublishedArticles: async () => {
    if (state.failList) throw new Error("Database unavailable");
    return state.rows.filter((row) => row.status === "published").map(cloneArticle);
  },
  updateArticleById: async (id: string, values: Omit<ArticleRow, "id">) => {
    const article = state.rows.find((row) => row.id === id);
    if (!article) return null;
    Object.assign(article, values);
    return cloneArticle(article);
  },
}));

import { GET as getPosts, POST as createPost } from "@/app/ghost/api/admin/posts/route";
import { GET as getPostById, PUT as updatePost } from "@/app/ghost/api/admin/posts/[id]/route";
import { GET as getPostBySlug } from "@/app/ghost/api/admin/posts/slug/[slug]/route";
import { getArticleBySlug as getPublicArticleBySlug } from "@/lib/articles/repository";
import sitemap from "@/app/sitemap";

const keyId = "ghost-test-id";
const keySecret = "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
const adminKey = `${keyId}:${keySecret}`;

const createToken = (
  payload: Record<string, unknown> = {},
  header: Record<string, unknown> = {},
  secret = keySecret,
) => {
  const encodedHeader = Buffer.from(JSON.stringify({
    alg: "HS256",
    kid: keyId,
    typ: "JWT",
    ...header,
  })).toString("base64url");
  const encodedPayload = Buffer.from(JSON.stringify({
    aud: "/admin/",
    exp: Math.floor(Date.now() / 1000) + 300,
    ...payload,
  })).toString("base64url");
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const signature = createHmac("sha256", Buffer.from(secret, "hex"))
    .update(unsignedToken)
    .digest("base64url");

  return `${unsignedToken}.${signature}`;
};

const authHeaders = () => ({ authorization: `Ghost ${createAdminToken(adminKey, new Date())}` });

const postPayload = (overrides: Record<string, unknown> = {}) => ({
  canonical_url: null,
  feature_image: null,
  html: "<p>Article body</p>",
  meta_description: "Description",
  meta_title: "Metadata title",
  published_at: "2026-09-10T16:00:00.000Z",
  slug: "ghost-article",
  status: "published",
  tags: ["tariff"],
  title: "Ghost article title",
  ...overrides,
});

const jsonRequest = (
  url: string,
  method: "POST" | "PUT",
  body: unknown,
  headers: Record<string, string> = authHeaders(),
) => new Request(url, {
  method,
  headers: { "content-type": "application/json", ...headers },
  body: JSON.stringify(body),
});

const getRequest = (url: string, headers: Record<string, string> = authHeaders()) => new Request(url, { headers });

const createDispatchingFetch = (): typeof fetch => async (input, init) => {
  const url = new URL(typeof input === "string" ? input : input.toString());
  const method = init?.method ?? "GET";
  const request = new Request(url, {
    method,
    headers: init?.headers,
    ...(method === "GET" ? {} : { body: init?.body }),
  });
  const slugMatch = url.pathname.match(/^\/ghost\/api\/admin\/posts\/slug\/([^/]+)\/?$/);
  const idMatch = url.pathname.match(/^\/ghost\/api\/admin\/posts\/([^/]+)\/?$/);

  if (slugMatch && method === "GET") {
    return getPostBySlug(request, { params: Promise.resolve({ slug: decodeURIComponent(slugMatch[1]) }) });
  }
  if (idMatch && method === "GET") {
    return getPostById(request, { params: Promise.resolve({ id: idMatch[1] }) });
  }
  if (idMatch && method === "PUT") {
    return updatePost(request, { params: Promise.resolve({ id: idMatch[1] }) });
  }
  if (url.pathname === "/ghost/api/admin/posts/" && method === "POST") {
    return createPost(request);
  }

  return new Response("Not found", { status: 404 });
};

beforeEach(() => {
  state.databaseConfigured = true;
  state.failList = false;
  state.revalidatePath.mockReset();
  state.rows = [];
  process.env.GHOST_COMPAT_ADMIN_KEY = adminKey;
});

afterEach(() => {
  delete process.env.GHOST_COMPAT_ADMIN_KEY;
  vi.restoreAllMocks();
});

describe("Ghost-compatible Admin API", () => {
  it("publishes twice through the unmodified NikaBlog publisher", async () => {
    const publisher = createGhostPublisher({
      adminApiKey: adminKey,
      fetchImpl: createDispatchingFetch(),
      ghostUrl: "http://localhost",
      retryDelayMs: 0,
      status: "published",
    });
    const input = {
      authorName: "Nika",
      canonicalUrl: null,
      featureImage: null,
      ghostPostId: null,
      html: "<p>First version</p>",
      metaDescription: null,
      metaTitle: null,
      slug: "nikablog-contract",
      tags: "tariff, export",
      title: "NikaBlog contract title",
    };

    const created = await publisher.publish(input);
    const updated = await publisher.publish({ ...input, html: "<p>Updated version</p>" });

    expect(created).toEqual({
      postId: expect.stringMatching(/^[0-9a-f]{24}$/),
      publishedUrl: "https://lufe.world/insights/nikablog-contract",
    });
    expect(updated).toEqual(created);
    expect(state.rows).toHaveLength(1);
    expect(state.rows[0]).toMatchObject({ html: "<p>Updated version</p>", tags: ["tariff", "export"] });
    expect(state.revalidatePath).toHaveBeenCalledWith("/insights/nikablog-contract");
    expect(state.revalidatePath).toHaveBeenCalledWith("/insights");
    expect(state.revalidatePath).toHaveBeenCalledWith("/sitemap.xml");
  });

  it("returns 404 instead of an empty posts array for a missing slug", async () => {
    const response = await getPostBySlug(
      getRequest("http://localhost/ghost/api/admin/posts/slug/does-not-exist/"),
      { params: Promise.resolve({ slug: "does-not-exist" }) },
    );

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({
      errors: [{ message: "Resource not found", type: "ResourceNotFoundError" }],
    });
  });

  it.each([
    ["wrong secret", createToken({}, {}, "abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcd")],
    ["expired token", createToken({ exp: Math.floor(Date.now() / 1000) - 1 })],
    ["wrong audience", createToken({ aud: "/other/" })],
    ["alg none", createToken({}, { alg: "none" })],
    ["wrong key id", createToken({}, { kid: "not-the-key-id" })],
  ])("returns 401 for %s", async (_label, token) => {
    const response = await getPostBySlug(
      getRequest("http://localhost/ghost/api/admin/posts/slug/anything/", { authorization: `Ghost ${token}` }),
      { params: Promise.resolve({ slug: "anything" }) },
    );

    expect(response.status).toBe(401);
  });

  it("returns a JSON 401 for a missing Authorization header", async () => {
    const response = await getPosts(getRequest("http://localhost/ghost/api/admin/posts/", {}));

    expect(response.status).toBe(401);
    expect(response.headers.get("content-type")).toContain("application/json");
    await expect(response.json()).resolves.toEqual({
      errors: [{ message: "Unauthorized", type: "UnauthorizedError" }],
    });
  });

  it("stores drafts for Ghost lookup but excludes them from public reads and sitemap", async () => {
    const response = await createPost(jsonRequest(
      "http://localhost/ghost/api/admin/posts/",
      "POST",
      { posts: [postPayload({ slug: "draft-article", status: "draft", tags: [] })] },
    ));
    const ghostLookup = await getPostBySlug(
      getRequest("http://localhost/ghost/api/admin/posts/slug/draft-article/"),
      { params: Promise.resolve({ slug: "draft-article" }) },
    );

    expect(response.status).toBe(200);
    expect(ghostLookup.status).toBe(200);
    await expect(getPublicArticleBySlug("draft-article")).resolves.toBeNull();
    await expect(sitemap()).resolves.not.toEqual(expect.arrayContaining([
      expect.objectContaining({ url: "https://lufe.world/insights/draft-article" }),
    ]));
  });

  it("sanitizes HTML before persisting it", async () => {
    const response = await createPost(jsonRequest(
      "http://localhost/ghost/api/admin/posts/",
      "POST",
      { posts: [postPayload({ html: "<p>x</p><script>document.title=1</script><a href='javascript:x'>bad</a>" })] },
    ));

    expect(response.status).toBe(200);
    expect(state.rows[0]?.html).toBe("<p>x</p><a>bad</a>");
  });

  it("accepts equivalent ISO offsets and revalidates the old slug after a rename", async () => {
    state.rows = [{
      id: "0123456789abcdef01234567",
      slug: "offset-update",
      title: "Original title",
      html: "<p>Original</p>",
      metaTitle: null,
      metaDescription: null,
      canonicalUrl: null,
      featureImage: null,
      tags: ["old"],
      status: "published",
      publishedAt: new Date("2026-09-10T16:00:00.000Z"),
      createdAt: new Date("2026-09-10T16:00:00.000Z"),
      updatedAt: new Date("2026-09-10T16:00:00.000Z"),
    }];

    const response = await updatePost(jsonRequest(
      "http://localhost/ghost/api/admin/posts/0123456789abcdef01234567/?source=html",
      "PUT",
      { posts: [postPayload({ slug: "renamed-article", updated_at: "2026-09-11T00:00:00+08:00" })] },
    ), { params: Promise.resolve({ id: "0123456789abcdef01234567" }) });

    expect(response.status).toBe(200);
    expect(state.revalidatePath).toHaveBeenCalledWith("/insights/offset-update");
    expect(state.revalidatePath).toHaveBeenCalledWith("/insights/renamed-article");
  });

  it("returns 409 when updated_at is stale", async () => {
    state.rows = [{
      id: "0123456789abcdef01234567",
      slug: "stale-update",
      title: "Original title",
      html: "<p>Original</p>",
      metaTitle: null,
      metaDescription: null,
      canonicalUrl: null,
      featureImage: null,
      tags: ["old"],
      status: "published",
      publishedAt: new Date("2026-09-10T16:00:00.000Z"),
      createdAt: new Date("2026-09-10T16:00:00.000Z"),
      updatedAt: new Date("2026-09-10T16:00:00.000Z"),
    }];

    const response = await updatePost(jsonRequest(
      "http://localhost/ghost/api/admin/posts/0123456789abcdef01234567/?source=html",
      "PUT",
      { posts: [postPayload({ slug: "stale-update", updated_at: "2026-09-10T15:59:59.999Z" })] },
    ), { params: Promise.resolve({ id: "0123456789abcdef01234567" }) });

    expect(response.status).toBe(409);
  });

  it("rejects reserved and malformed slugs without creating a database row", async () => {
    const reserved = await createPost(jsonRequest(
      "http://localhost/ghost/api/admin/posts/",
      "POST",
      { posts: [postPayload({ slug: "go-no-go-framework" })] },
    ));
    const malformed = await createPost(jsonRequest(
      "http://localhost/ghost/api/admin/posts/",
      "POST",
      { posts: [postPayload({ slug: "../unsafe" })] },
    ));

    expect(reserved.status).toBe(422);
    await expect(reserved.json()).resolves.toEqual({
      errors: [{ message: "slug is reserved", type: "ValidationError" }],
    });
    expect(malformed.status).toBe(422);
    expect(state.rows).toHaveLength(0);
  });

  it("keeps the static sitemap available when the database fails", async () => {
    state.failList = true;

    const entries = await sitemap();

    expect(entries).toEqual(expect.arrayContaining([
      expect.objectContaining({ url: "https://lufe.world/insights/go-no-go-framework" }),
    ]));
  });

  it("returns 503 JSON when the service configuration is incomplete", async () => {
    state.databaseConfigured = false;

    const missingDatabase = await getPosts(getRequest("http://localhost/ghost/api/admin/posts/", {}));
    state.databaseConfigured = true;
    delete process.env.GHOST_COMPAT_ADMIN_KEY;
    const missingKey = await getPosts(getRequest("http://localhost/ghost/api/admin/posts/", {}));

    expect(missingDatabase.status).toBe(503);
    expect(missingDatabase.headers.get("content-type")).toContain("application/json");
    expect(missingKey.status).toBe(503);
    expect(missingKey.headers.get("content-type")).toContain("application/json");
  });
});
