import "server-only";

import { cache } from "react";
import postgres, { type Sql } from "postgres";

export type ArticleStatus = "draft" | "published";

export type DatabaseArticle = {
  id: string;
  slug: string;
  title: string;
  html: string;
  metaTitle: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  featureImage: string | null;
  tags: string[];
  status: ArticleStatus;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ArticleWriteValues = Omit<DatabaseArticle, "id">;

let database: Sql | undefined;

const isProductionBuild = (): boolean => process.env.NEXT_PHASE === "phase-production-build";

const getDatabase = (): Sql | null => {
  if (isProductionBuild()) return null;

  const databaseUrl = process.env.LUFE_DATABASE_URL;
  if (!databaseUrl) return null;

  if (!database) {
    database = postgres(databaseUrl, {
      prepare: false,
      max: 3,
      ssl: process.env.LUFE_DATABASE_SSL === "disable" ? false : "require",
      idle_timeout: 20,
      connect_timeout: 10,
    });
  }

  return database;
};

export const isArticleDatabaseConfigured = (): boolean =>
  !isProductionBuild() && Boolean(process.env.LUFE_DATABASE_URL);

const normalizeArticle = (article: DatabaseArticle): DatabaseArticle => ({
  ...article,
  tags: Array.isArray(article.tags) ? article.tags.filter((tag): tag is string => typeof tag === "string") : [],
  publishedAt: article.publishedAt ? new Date(article.publishedAt) : null,
  createdAt: new Date(article.createdAt),
  updatedAt: new Date(article.updatedAt),
});

export const listPublishedArticles = async (): Promise<DatabaseArticle[]> => {
  const sql = getDatabase();
  if (!sql) return [];

  const rows = await sql<DatabaseArticle[]>`
    SELECT id, slug, title, html, meta_title AS "metaTitle",
      meta_description AS "metaDescription", canonical_url AS "canonicalUrl",
      feature_image AS "featureImage", tags, status, published_at AS "publishedAt",
      created_at AS "createdAt", updated_at AS "updatedAt"
    FROM lufe.articles
    WHERE status = 'published'
    ORDER BY published_at DESC NULLS LAST
  `;

  return rows.map(normalizeArticle);
};

export const getArticleBySlug = async (
  slug: string,
  includeDraft = false,
): Promise<DatabaseArticle | null> => {
  const sql = getDatabase();
  if (!sql) return null;

  const rows = includeDraft
    ? await sql<DatabaseArticle[]>`
      SELECT id, slug, title, html, meta_title AS "metaTitle",
        meta_description AS "metaDescription", canonical_url AS "canonicalUrl",
        feature_image AS "featureImage", tags, status, published_at AS "publishedAt",
        created_at AS "createdAt", updated_at AS "updatedAt"
      FROM lufe.articles
      WHERE slug = ${slug}
      LIMIT 1
    `
    : await sql<DatabaseArticle[]>`
      SELECT id, slug, title, html, meta_title AS "metaTitle",
        meta_description AS "metaDescription", canonical_url AS "canonicalUrl",
        feature_image AS "featureImage", tags, status, published_at AS "publishedAt",
        created_at AS "createdAt", updated_at AS "updatedAt"
      FROM lufe.articles
      WHERE slug = ${slug} AND status = 'published'
      LIMIT 1
    `;

  return rows[0] ? normalizeArticle(rows[0]) : null;
};

export const getPublishedArticleBySlug = cache(async (slug: string) =>
  getArticleBySlug(slug));

export const getArticleById = async (
  id: string,
  includeDraft = false,
): Promise<DatabaseArticle | null> => {
  const sql = getDatabase();
  if (!sql) return null;

  const rows = includeDraft
    ? await sql<DatabaseArticle[]>`
      SELECT id, slug, title, html, meta_title AS "metaTitle",
        meta_description AS "metaDescription", canonical_url AS "canonicalUrl",
        feature_image AS "featureImage", tags, status, published_at AS "publishedAt",
        created_at AS "createdAt", updated_at AS "updatedAt"
      FROM lufe.articles
      WHERE id = ${id}
      LIMIT 1
    `
    : await sql<DatabaseArticle[]>`
      SELECT id, slug, title, html, meta_title AS "metaTitle",
        meta_description AS "metaDescription", canonical_url AS "canonicalUrl",
        feature_image AS "featureImage", tags, status, published_at AS "publishedAt",
        created_at AS "createdAt", updated_at AS "updatedAt"
      FROM lufe.articles
      WHERE id = ${id} AND status = 'published'
      LIMIT 1
    `;

  return rows[0] ? normalizeArticle(rows[0]) : null;
};

export const createArticle = async (
  values: DatabaseArticle,
): Promise<DatabaseArticle | null> => {
  const sql = getDatabase();
  if (!sql) return null;

  const rows = await sql<DatabaseArticle[]>`
    INSERT INTO lufe.articles (
      id, slug, title, html, meta_title, meta_description, canonical_url,
      feature_image, tags, status, published_at, created_at, updated_at
    ) VALUES (
      ${values.id}, ${values.slug}, ${values.title}, ${values.html},
      ${values.metaTitle}, ${values.metaDescription}, ${values.canonicalUrl},
      ${values.featureImage}, ${sql.json(values.tags)}, ${values.status},
      ${values.publishedAt}, ${values.createdAt}, ${values.updatedAt}
    )
    RETURNING id, slug, title, html, meta_title AS "metaTitle",
      meta_description AS "metaDescription", canonical_url AS "canonicalUrl",
      feature_image AS "featureImage", tags, status, published_at AS "publishedAt",
      created_at AS "createdAt", updated_at AS "updatedAt"
  `;

  return rows[0] ? normalizeArticle(rows[0]) : null;
};

export const updateArticleById = async (
  id: string,
  values: ArticleWriteValues,
): Promise<DatabaseArticle | null> => {
  const sql = getDatabase();
  if (!sql) return null;

  const rows = await sql<DatabaseArticle[]>`
    UPDATE lufe.articles
    SET slug = ${values.slug}, title = ${values.title}, html = ${values.html},
      meta_title = ${values.metaTitle}, meta_description = ${values.metaDescription},
      canonical_url = ${values.canonicalUrl}, feature_image = ${values.featureImage},
      tags = ${sql.json(values.tags)}, status = ${values.status},
      published_at = ${values.publishedAt}, updated_at = ${values.updatedAt}
    WHERE id = ${id}
    RETURNING id, slug, title, html, meta_title AS "metaTitle",
      meta_description AS "metaDescription", canonical_url AS "canonicalUrl",
      feature_image AS "featureImage", tags, status, published_at AS "publishedAt",
      created_at AS "createdAt", updated_at AS "updatedAt"
  `;

  return rows[0] ? normalizeArticle(rows[0]) : null;
};
