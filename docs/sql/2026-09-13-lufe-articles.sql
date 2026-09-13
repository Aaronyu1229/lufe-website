CREATE TABLE lufe.articles (
  id text PRIMARY KEY NOT NULL,
  slug text NOT NULL,
  title text NOT NULL,
  html text NOT NULL,
  meta_title text,
  meta_description text,
  canonical_url text,
  feature_image text,
  tags jsonb,
  status text NOT NULL,
  published_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone NOT NULL
);

CREATE UNIQUE INDEX articles_slug_idx ON lufe.articles USING btree (slug);
CREATE INDEX articles_status_published_at_idx ON lufe.articles USING btree (status, published_at DESC NULLS LAST);
