import { createHmac } from "node:crypto";

export interface GhostPublishInput {
  authorName: string;
  canonicalUrl: string | null;
  featureImage: string | null;
  ghostPostId: string | null;
  html: string;
  metaDescription: string | null;
  metaTitle: string | null;
  slug: string;
  tags: string | null;
  title: string;
}

export interface GhostPublishResult {
  postId: string;
  publishedUrl: string;
}

export interface GhostPublisher {
  publish(input: GhostPublishInput): Promise<GhostPublishResult>;
}

export type GhostFetch = typeof fetch;

interface GhostPublisherOptions {
  adminApiKey: string;
  fetchImpl?: GhostFetch;
  ghostUrl: string;
  now?: () => Date;
  retryDelayMs?: number;
  status?: string; // "published"(預設) | "draft"（dogfood/測試用·不公開）
}

interface GhostPost {
  id: string;
  updated_at?: string;
  url?: string;
}

interface GhostResponse {
  posts?: GhostPost[];
}

function base64Url(value: string): string {
  return Buffer.from(value).toString("base64url");
}

export function validateGhostAdminApiKey(adminApiKey: string): void {
  const parts = adminApiKey.split(":");
  const [id, secret] = parts;
  if (parts.length !== 2 || !id || !secret || !/^[0-9a-f]+$/i.test(secret)) {
    throw new Error("Ghost Admin API key is invalid");
  }
}

export function createAdminToken(adminApiKey: string, now: Date): string {
  validateGhostAdminApiKey(adminApiKey);
  const [id, secret] = adminApiKey.split(":") as [string, string];

  const issuedAt = Math.floor(now.getTime() / 1000);
  const header = base64Url(
    JSON.stringify({ alg: "HS256", kid: id, typ: "JWT" }),
  );
  const payload = base64Url(
    JSON.stringify({
      aud: "/admin/",
      exp: issuedAt + 300,
      iat: issuedAt,
    }),
  );
  const unsignedToken = `${header}.${payload}`;
  const signature = createHmac("sha256", Buffer.from(secret, "hex"))
    .update(unsignedToken)
    .digest("base64url");

  return `${unsignedToken}.${signature}`;
}

function normalizeBaseUrl(ghostUrl: string): string {
  return ghostUrl.replace(/\/+$/, "");
}

function parseTags(tags: string | null): string[] {
  if (!tags) {
    return [];
  }

  return tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

async function sleep(delayMs: number): Promise<void> {
  if (delayMs > 0) {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
}

export function createGhostPublisher(
  options: GhostPublisherOptions,
): GhostPublisher {
  const fetchImpl = options.fetchImpl ?? fetch;
  const now = options.now ?? (() => new Date());
  const retryDelayMs = options.retryDelayMs ?? 100;
  const baseUrl = normalizeBaseUrl(options.ghostUrl);
  const status = options.status === "draft" ? "draft" : "published";

  async function request(
    path: string,
    method: "GET" | "POST" | "PUT",
    body?: unknown,
    maxAttempts = 3,
  ): Promise<GhostResponse> {
    let lastError: Error | undefined;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      try {
        const response = await fetchImpl(`${baseUrl}${path}`, {
          body: body === undefined ? undefined : JSON.stringify(body),
          headers: {
            "Accept-Version": "v5.0",
            Authorization: `Ghost ${createAdminToken(
              options.adminApiKey,
              now(),
            )}`,
            "Content-Type": "application/json",
          },
          method,
        });

        if (response.ok) {
          return (await response.json()) as GhostResponse;
        }

        lastError = Object.assign(
          new Error(`Ghost request failed with status ${response.status}`),
          { status: response.status },
        );
        if (response.status < 500) {
          throw lastError;
        }
      } catch (error) {
        lastError =
          error instanceof Error ? error : new Error("Ghost request failed");
        if (
          error instanceof Error &&
          "status" in error &&
          typeof error.status === "number" &&
          error.status < 500
        ) {
          throw error;
        }
      }

      if (attempt < maxAttempts) {
        await sleep(retryDelayMs);
      }
    }

    throw lastError ?? new Error("Ghost request failed");
  }

  async function getPostBySlug(slug: string): Promise<GhostPost | undefined> {
    try {
      const response = await request(
        `/ghost/api/admin/posts/slug/${encodeURIComponent(slug)}/`,
        "GET",
      );
      return response.posts?.[0];
    } catch (error) {
      if (error instanceof Error && "status" in error && error.status === 404) {
        return undefined;
      }
      throw error;
    }
  }

  async function updatePost(postId: string, post: Record<string, unknown>) {
    const current = await request(`/ghost/api/admin/posts/${postId}/`, "GET");
    const updatedAt = current.posts?.[0]?.updated_at;
    if (!updatedAt) {
      throw new Error("Ghost post response is missing updated_at");
    }
    return request(`/ghost/api/admin/posts/${postId}/?source=html`, "PUT", {
      posts: [{ ...post, updated_at: updatedAt }],
    });
  }

  return {
    async publish(input) {
      const publishedAt = now().toISOString();
      const post = {
        // 不送 authors：Ghost POST 要求作者是已存在的 staff user，光給 name 會 422。
        // 先讓 Ghost 用整合擁有者當作者；真正的作者對應（建 Ghost user / 顯示名）留 v0.3。
        // input.authorName 仍保留在介面供日後使用。
        canonical_url: input.canonicalUrl,
        feature_image: input.featureImage,
        html: input.html,
        meta_description: input.metaDescription,
        meta_title: input.metaTitle,
        published_at: publishedAt,
        slug: input.slug,
        status,
        tags: parseTags(input.tags),
        title: input.title,
      };

      const updatePayload: Record<string, unknown> = { ...post };
      delete updatePayload.published_at;
      let response: GhostResponse | undefined;
      if (input.ghostPostId) {
        response = await updatePost(input.ghostPostId, updatePayload);
      } else {
        let lastError: Error | undefined;
        for (let attempt = 1; attempt <= 3; attempt += 1) {
          const existing = await getPostBySlug(input.slug);
          if (existing?.id) {
            response = await updatePost(existing.id, updatePayload);
            break;
          }

          try {
            response = await request(
              "/ghost/api/admin/posts/?source=html",
              "POST",
              {
                posts: [post],
              },
              1,
            );
            break;
          } catch (error) {
            lastError =
              error instanceof Error
                ? error
                : new Error("Ghost request failed");
          }

          if (attempt < 3) {
            await sleep(retryDelayMs);
          }
        }

        if (!response) {
          throw lastError ?? new Error("Ghost request failed");
        }
      }

      const published = response.posts?.[0];
      if (!published?.id || !published.url) {
        throw new Error("Ghost publish response is incomplete");
      }

      return {
        postId: published.id,
        publishedUrl: published.url,
      };
    },
  };
}

// （已移除 createGhostPublisherFromEnv：全域 GHOST_URL/GHOST_ADMIN_API_KEY 回退是跨客誤發
// footgun·全 repo 無使用處。發布一律走 loadClientPublishConfig 的 per-client 設定。）
