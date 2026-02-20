-- usuń starą policy
drop policy if exists "profiles_select_own" on profiles;

-- utwórz nową policy
create policy "profiles_select_own_and_by_admin"
on profiles
for select
                    using (
                    auth.uid() = id
                    or is_admin()
                    );