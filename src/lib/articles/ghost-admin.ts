import "server-only";

import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";

import { getArticleBySlug as getStaticArticleBySlug } from "@/data/articles";
import { SITE_URL } from "@/lib/site";
import { ghostUnauthorizedResponse, isGhostAdminConfigured, isGhostAdminRequest } from "@/lib/security/ghost-auth";

import {
  createArticle,
  getArticleById,
  getArticleBySlug,
  isArticleDatabaseConfigured,
  type ArticleWriteValues,
  type DatabaseArticle,
  updateArticleById,
} from "./repository";
import { sanitizeArticleHtml } from "./sanitize";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type GhostPostInput = {
  canonical_url?: string | null;
  feature_image?: string | null;
  html: string;
  meta_description?: string | null;
  meta_title?: string | null;
  published_at?: string | null;
  slug: string;
  status: "draft" | "published";
  tags: string[];
  title: string;
};

type GhostUpdatePostInput = GhostPostInput & { updated_at: string };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

const isOptionalString = (value: unknown): value is string | null | undefined =>
  value === undefined || value === null || typeof value === "string";

const isValidDate = (value: unknown): value is string =>
  typeof value === "string" && !Number.isNaN(new Date(value).getTime());

const isValidSlug = (slug: string): boolean => slug.length <= 120 && slugPattern.test(slug);

const parsePost = (value: unknown, requiresUpdatedAt: boolean): GhostPostInput | GhostUpdatePostInput | null => {
  if (!isRecord(value)) return null;
  const { posts } = value;
  if (!Array.isArray(posts) || posts.length !== 1 || !isRecord(posts[0])) return null;

  const post = posts[0];
  if (
    typeof post.html !== "string" ||
    typeof post.title !== "string" ||
    !post.title ||
    typeof post.slug !== "string" ||
    !isValidSlug(post.slug) ||
    (post.status !== "draft" && post.status !== "published") ||
    !Array.isArray(post.tags) ||
    !post.tags.every((tag) => typeof tag === "string") ||
    !isOptionalString(post.canonical_url) ||
    !isOptionalString(post.feature_image) ||
    !isOptionalString(post.meta_description) ||
    !isOptionalString(post.meta_title) ||
    !(post.published_at === undefined || post.published_at === null || isValidDate(post.published_at))
  ) {
    return null;
  }

  const parsed: GhostPostInput = {
    canonical_url: post.canonical_url as string | null | undefined,
    feature_image: post.feature_image as string | null | undefined,
    html: post.html,
    meta_description: post.meta_description as string | null | undefined,
    meta_title: post.meta_title as string | null | undefined,
    published_at: post.published_at as string | null | undefined,
    slug: post.slug,
    status: post.status,
    tags: post.tags as string[],
    title: post.title,
  };

  if (!requiresUpdatedAt) return parsed;
  if (!isValidDate(post.updated_at)) return null;

  return { ...parsed, updated_at: post.updated_at };
};

export const parseCreateGhostPost = async (request: Request): Promise<GhostPostInput | null> => {
  try {
    return parsePost(await request.json(), false);
  } catch {
    return null;
  }
};

export const parseUpdateGhostPost = async (request: Request): Promise<GhostUpdatePostInput | null> => {
  try {
    return parsePost(await request.json(), true) as GhostUpdatePostInput | null;
  } catch {
    return null;
  }
};

const getOptionalValue = <Key extends keyof GhostPostInput>(
  post: GhostPostInput,
  key: Key,
) => post[key] === undefined ? undefined : post[key] ?? null;

const getArticleValues = (
  post: GhostPostInput,
  current?: DatabaseArticle,
): ArticleWriteValues => {
  const canonicalUrl = getOptionalValue(post, "canonical_url");
  const featureImage = getOptionalValue(post, "feature_image");
  const metaDescription = getOptionalValue(post, "meta_description");
  const metaTitle = getOptionalValue(post, "meta_title");

  return {
    canonicalUrl: canonicalUrl === undefined ? current?.canonicalUrl ?? null : canonicalUrl,
    featureImage: featureImage === undefined ? current?.featureImage ?? null : featureImage,
    html: sanitizeArticleHtml(post.html),
    metaDescription: metaDescription === undefined ? current?.metaDescription ?? null : metaDescription,
    metaTitle: metaTitle === undefined ? current?.metaTitle ?? null : metaTitle,
    publishedAt: post.published_at === undefined
      ? current?.publishedAt ?? null
      : post.published_at === null ? null : new Date(post.published_at),
    slug: post.slug,
    status: post.status,
    tags: post.tags,
    title: post.title,
    createdAt: current?.createdAt ?? new Date(),
    updatedAt: current?.updatedAt ?? new Date(),
  };
};

const revalidateArticlePaths = (slug: string, previousSlug?: string): void => {
  revalidatePath(`/insights/${slug}`);
  if (previousSlug && previousSlug !== slug) {
    revalidatePath(`/insights/${previousSlug}`);
  }
  revalidatePath("/insights");
  revalidatePath("/sitemap.xml");
};

const toIsoString = (value: Date | null): string | null => value?.toISOString() ?? null;

export const toGhostPost = (article: DatabaseArticle) => ({
  id: article.id,
  url: `${SITE_URL}/insights/${article.slug}`,
  updated_at: article.updatedAt.toISOString(),
  canonical_url: article.canonicalUrl,
  feature_image: article.featureImage,
  html: article.html,
  meta_description: article.metaDescription,
  meta_title: article.metaTitle,
  published_at: toIsoString(article.publishedAt),
  slug: article.slug,
  status: article.status,
  tags: article.tags,
  title: article.title,
});

export const isReservedInsightSlug = (slug: string): boolean => Boolean(getStaticArticleBySlug(slug));

export const createGhostArticle = async (post: GhostPostInput): Promise<DatabaseArticle> => {
  const now = new Date();
  const article = await createArticle({
    id: randomBytes(12).toString("hex"),
    ...getArticleValues(post),
    createdAt: now,
    updatedAt: now,
  });

  if (!article) throw new Error("Article creation did not return a row");

  revalidateArticlePaths(article.slug);
  return article;
};

export const updateGhostArticle = async (
  id: string,
  post: GhostUpdatePostInput,
): Promise<{ article: DatabaseArticle | null; conflict: boolean; duplicate: boolean }> => {
  const current = await getArticleById(id, true);
  if (!current) return { article: null, conflict: false, duplicate: false };

  if (new Date(post.updated_at).getTime() !== current.updatedAt.getTime()) {
    return { article: null, conflict: true, duplicate: false };
  }

  const existing = await getArticleBySlug(post.slug, true);
  if (existing && existing.id !== id) {
    return { article: null, conflict: false, duplicate: true };
  }

  const updatedAt = new Date(Math.max(Date.now(), current.updatedAt.getTime() + 1));
  const article = await updateArticleById(id, {
    ...getArticleValues(post, current),
    updatedAt,
  });
  if (!article) return { article: null, conflict: false, duplicate: false };

  revalidateArticlePaths(article.slug, current.slug);
  return { article, conflict: false, duplicate: false };
};

export const authorizeGhostAdminRequest = (request: Request): Response | null =>
  isGhostAdminRequest(request) ? null : ghostUnauthorizedResponse();

export const isGhostAdminServiceConfigured = (): boolean =>
  isGhostAdminConfigured() && isArticleDatabaseConfigured();

export const ghostNotFoundResponse = () => Response.json(
  { errors: [{ message: "Resource not found", type: "ResourceNotFoundError" }] },
  { status: 404 },
);

export const ghostValidationResponse = (message = "Invalid post payload") => Response.json(
  { errors: [{ message, type: "ValidationError" }] },
  { status: 422 },
);

export const ghostConflictResponse = () => Response.json(
  { errors: [{ message: "Post has been modified", type: "UpdateCollisionError" }] },
  { status: 409 },
);

export const ghostServiceUnavailableResponse = () => Response.json(
  { errors: [{ message: "Ghost Admin API is not configured", type: "ServiceUnavailableError" }] },
  { status: 503 },
);

export const ghostServerErrorResponse = () => Response.json(
  { errors: [{ message: "Unable to process post", type: "InternalServerError" }] },
  { status: 500 },
);

export { getArticleById, getArticleBySlug };
