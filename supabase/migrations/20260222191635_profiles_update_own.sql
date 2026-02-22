create policy "profiles_update_own"
on profiles
for update
               using (auth.uid() = id)
    with check (auth.uid() = id);