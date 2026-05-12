create table public.early_access_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  phone text not null,
  created_at timestamptz not null default now(),
  user_agent text,
  unique(email)
);

alter table public.early_access_signups enable row level security;

create policy "anyone can insert signups"
  on public.early_access_signups
  for insert
  to anon, authenticated
  with check (true);
