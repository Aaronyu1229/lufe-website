-- LUFÉ website leads. Applied 2026-09-29 via the Supabase management API.
-- The LUFÉ data lives in the `lufe` schema of a shared Supabase project; never use `public`.
create table if not exists lufe.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  form text not null check (form in ('quick','contact')),
  name text, contact text, email text, phone text, company text, product text, stage text,
  message text not null, page text, user_agent text,
  notified boolean not null default false, notify_error text
);
revoke all on lufe.leads from public, anon, authenticated;
grant select, insert, update on lufe.leads to lufe_app;
alter table lufe.leads enable row level security;
drop policy if exists lufe_app_all on lufe.leads;
create policy lufe_app_all on lufe.leads for all to lufe_app using (true) with check (true);
comment on table lufe.leads is 'LUFÉ website contact + quick-message leads (2026-09-29). Contains personal data; only lufe_app may read/write.';
