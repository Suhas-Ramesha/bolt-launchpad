drop policy "anyone can insert signups" on public.early_access_signups;

create policy "anyone can insert valid signups"
  on public.early_access_signups
  for insert
  to anon, authenticated
  with check (
    char_length(email) between 5 and 255
    and email like '%@%.%'
    and char_length(phone) between 7 and 20
  );
