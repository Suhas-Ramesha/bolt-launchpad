-- Run once on a new empty Supabase project (SQL Editor).
-- Equivalent end state to applying supabase/migrations in order.

create table public.early_access_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  phone text not null,
  created_at timestamptz not null default now(),
  user_agent text,
  unique(email)
);

alter table public.early_access_signups enable row level security;

create policy "anyone can insert valid signups"
  on public.early_access_signups
  for insert
  to anon, authenticated
  with check (
    char_length(email) between 5 and 255
    and email like '%@%.%'
    and char_length(phone) between 7 and 20
  );
