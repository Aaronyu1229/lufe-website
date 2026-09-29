CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  form text NOT NULL,
  name text,
  contact text,
  email text,
  phone text,
  company text,
  product text,
  stage text,
  message text NOT NULL,
  page text,
  user_agent text,
  notified boolean NOT NULL DEFAULT false,
  notify_error text
);
