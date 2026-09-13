import { execFileSync, spawn, spawnSync, type ChildProcess } from "node:child_process";
import { once } from "node:events";
import net from "node:net";
import path from "node:path";
import postgres, { type Sql } from "postgres";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { articles } from "@/data/articles";

import { createAdminToken, createGhostPublisher } from "../fixtures/nikablog-ghost-publisher";

const testDatabaseUrl = process.env.LUFE_DATABASE_URL;
const adminApiKey = process.env.GHOST_COMPAT_ADMIN_KEY;
const shouldRun = process.env.LUFE_GHOST_HTTP_TEST === "1"
  && Boolean(testDatabaseUrl)
  && Boolean(adminApiKey);
const workspaceRoot = path.resolve(import.meta.dirname, "../..");
const seededArticleId = "000000000000000000000014";
const insertedArticleIds = new Set<string>([seededArticleId]);
let database: Sql | undefined;
let server: ChildProcess | undefined;
let serverUrl = "";

const isLocalDatabase = (url: string): boolean => {
  const hostname = new URL(url).hostname;
  return hostname === "127.0.0.1" || hostname === "localhost" || hostname === "::1";
};

const getFreePort = async (): Promise<number> => new Promise((resolve, reject) => {
  const listener = net.createServer();
  listener.once("error", reject);
  listener.listen(0, "127.0.0.1", () => {
    const address = listener.address();
    listener.close((error) => error ? reject(error) : resolve(
      typeof address === "object" && address ? address.port : 0,
    ));
  });
});

const startServer = async (environment: NodeJS.ProcessEnv): Promise<void> => {
  const port = await getFreePort();
  serverUrl = `http://127.0.0.1:${port}`;
  server = spawn("./node_modules/.bin/next", ["start", "--hostname", "127.0.0.1", "--port", String(port)], {
    cwd: workspaceRoot,
    env: environment,
    stdio: "pipe",
  });
  await once(server, "spawn");
};

const stopServer = async (): Promise<void> => {
  if (server && !server.killed) {
    server.kill("SIGTERM");
    await once(server, "exit");
  }
  server = undefined;
};

const waitForServer = async (expectedStatus: 401 | 503 = 401): Promise<Response> => {
  const deadline = Date.now() + 30_000;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${serverUrl}/ghost/api/admin/posts/`, { redirect: "manual" });
      if (response.status === expectedStatus) return response;
    } catch {
      // The process is still starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error("Timed out waiting for the Next.js server");
};

const productionEnvironment = (): NodeJS.ProcessEnv => ({
  ...process.env,
  GHOST_COMPAT_ADMIN_KEY: adminApiKey,
  LUFE_DATABASE_SSL: "disable",
  LUFE_DATABASE_URL: testDatabaseUrl,
  NEXT_PUBLIC_SITE_URL: "https://lufe.world",
  NEXT_TELEMETRY_DISABLED: "1",
});

describe.skipIf(!shouldRun)("Ghost Admin API over a real Next.js HTTP server", () => {
  beforeAll(async () => {
    if (!testDatabaseUrl || !adminApiKey || !isLocalDatabase(testDatabaseUrl)) {
      throw new Error("LUFE_GHOST_HTTP_TEST requires a local Docker PostgreSQL URL");
    }

    database = postgres(testDatabaseUrl, { max: 1, ssl: false });
    await database`delete from lufe.articles where id = ${seededArticleId}`;
    await database`
      insert into lufe.articles (
        id, slug, title, html, meta_title, meta_description, canonical_url,
        feature_image, tags, status, published_at, created_at, updated_at
      ) values (
        ${seededArticleId}, 'build-gate-subset', 'Build gate 龘', '<p>龘</p>', null, null, null,
        null, ${database.json(["test"])}, 'published', now(), now(), now()
      )
    `;

    execFileSync("npm", ["run", "build"], {
      cwd: workspaceRoot,
      env: productionEnvironment(),
      stdio: "inherit",
    });

    const grepResult = spawnSync("grep", ["-l", "龘", "-r", ".next/server/app"], {
      cwd: workspaceRoot,
      encoding: "utf8",
    });
    console.log(`F2 grep output: ${grepResult.stdout.trim() || "(no matches)"}`);
    expect(grepResult.status).toBe(1);

    await startServer(productionEnvironment());
  }, 120_000);

  afterAll(async () => {
    await stopServer();
    if (database) {
      for (const id of insertedArticleIds) {
        await database`delete from lufe.articles where id = ${id}`;
      }
      await database.end();
    }
  });

  it("keeps trailing slashes outside Ghost and returns JSON 401 inside Ghost", async () => {
    const unauthorized = await waitForServer();
    expect(unauthorized.headers.get("content-type")).toContain("application/json");

    const [insights, about, ghost] = await Promise.all([
      fetch(`${serverUrl}/insights/`, { redirect: "manual" }),
      fetch(`${serverUrl}/about/`, { redirect: "manual" }),
      fetch(`${serverUrl}/ghost/api/admin/posts/`, { redirect: "manual" }),
    ]);

    expect(insights.status).toBe(308);
    expect(about.status).toBe(308);
    expect(ghost.status).toBe(401);
    expect(ghost.headers.get("content-type")).toContain("application/json");
  });

  it("publishes twice through the unchanged fixture and exposes the page at once", async () => {
    const slug = `ghost-http-${Date.now()}`;
    const title = "NikaBlog Ghost HTTP contract title";
    const publisher = createGhostPublisher({
      adminApiKey: adminApiKey!,
      ghostUrl: serverUrl,
      retryDelayMs: 0,
      status: "published",
    });
    const input = {
      authorName: "Nika",
      canonicalUrl: `https://lufe.world/insights/${slug}`,
      featureImage: "https://images.example.com/feature.jpg",
      ghostPostId: null,
      html: "<p>Published through the real HTTP server.</p>",
      metaDescription: null,
      metaTitle: "HTTP metadata title",
      slug,
      tags: "北美市場, compatibility",
      title,
    };

    const first = await publisher.publish(input);
    insertedArticleIds.add(first.postId);
    const second = await publisher.publish({ ...input, html: "<p>Updated through the real HTTP server.</p>" });
    const publishedPath = new URL(second.publishedUrl).pathname;
    const publishedResponse = await fetch(`${serverUrl}${publishedPath}`);
    const publishedHtml = await publishedResponse.text();

    expect(first.postId).toMatch(/^[0-9a-f]{24}$/);
    expect(second).toEqual(first);
    expect(second.publishedUrl).toBe(`https://lufe.world/insights/${slug}`);
    expect(publishedResponse.status).toBe(200);
    expect(publishedHtml).toContain(title);
    expect(publishedHtml).toContain(`rel="canonical" href="https://lufe.world/insights/${slug}"`);
    expect(publishedHtml).not.toContain("hreflang=\"en\"");
  }, 60_000);

  it("keeps drafts private, sanitizes HTML, and includes one database and one static page", async () => {
    const draftSlug = `ghost-draft-${Date.now()}`;
    const xssSlug = `ghost-xss-${Date.now()}`;
    const draftPublisher = createGhostPublisher({
      adminApiKey: adminApiKey!,
      ghostUrl: serverUrl,
      retryDelayMs: 0,
      status: "draft",
    });
    const publishedPublisher = createGhostPublisher({
      adminApiKey: adminApiKey!,
      ghostUrl: serverUrl,
      retryDelayMs: 0,
      status: "published",
    });

    const draft = await draftPublisher.publish({
      authorName: "Nika",
      canonicalUrl: null,
      featureImage: null,
      ghostPostId: null,
      html: "<p>Draft body</p>",
      metaDescription: null,
      metaTitle: null,
      slug: draftSlug,
      tags: null,
      title: "Draft title",
    });
    insertedArticleIds.add(draft.postId);
    const xss = await publishedPublisher.publish({
      authorName: "Nika",
      canonicalUrl: null,
      featureImage: null,
      ghostPostId: null,
      html: "<p>Safe HTML</p><script>document.title='bad'</script>",
      metaDescription: null,
      metaTitle: null,
      slug: xssSlug,
      tags: null,
      title: "Sanitized title",
    });
    insertedArticleIds.add(xss.postId);

    const [draftPage, draftLookup, sitemapResponse, xssPage, staticPage] = await Promise.all([
      fetch(`${serverUrl}/insights/${draftSlug}`),
      fetch(`${serverUrl}/ghost/api/admin/posts/slug/${draftSlug}/`, {
        headers: { authorization: `Ghost ${createAdminToken(adminApiKey!, new Date())}` },
      }),
      fetch(`${serverUrl}/sitemap.xml`),
      fetch(`${serverUrl}/insights/${xssSlug}`),
      fetch(`${serverUrl}/insights/${articles[0].slug}`),
    ]);

    expect(draftPage.status).toBe(404);
    expect(draftLookup.status).toBe(200);
    expect(sitemapResponse.status).toBe(200);
    expect(await sitemapResponse.text()).not.toContain(draftSlug);
    expect(await xssPage.text()).not.toContain("<script>document.title='bad'</script>");
    expect(staticPage.status).toBe(200);
  }, 60_000);

  it("rejects a static article slug without inserting a row", async () => {
    const response = await fetch(`${serverUrl}/ghost/api/admin/posts/?source=html`, {
      method: "POST",
      headers: {
        authorization: `Ghost ${createAdminToken(adminApiKey!, new Date())}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        posts: [{
          html: "<p>Reserved</p>",
          slug: articles[0].slug,
          status: "published",
          tags: [],
          title: "Reserved slug",
        }],
      }),
    });

    expect(response.status).toBe(422);
    await expect(response.json()).resolves.toEqual({
      errors: [{ message: "slug is reserved", type: "ValidationError" }],
    });
  });

  it("serves all static insights when LUFE_DATABASE_URL is absent", async () => {
    await stopServer();
    const noDatabaseEnvironment = productionEnvironment();
    delete noDatabaseEnvironment.LUFE_DATABASE_URL;
    delete noDatabaseEnvironment.GHOST_COMPAT_ADMIN_KEY;
    await startServer(noDatabaseEnvironment);
    await waitForServer(503);

    const [listPage, articlePage] = await Promise.all([
      fetch(`${serverUrl}/insights`),
      fetch(`${serverUrl}/insights/${articles[0].slug}`),
    ]);
    const listHtml = await listPage.text();

    expect(listPage.status).toBe(200);
    expect(articlePage.status).toBe(200);
    for (const article of articles) {
      expect(listHtml).toContain(article.title);
    }
  }, 60_000);
});
