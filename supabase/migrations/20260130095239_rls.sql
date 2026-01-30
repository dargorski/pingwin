-- 4️⃣ Włącz RLS
alter table profiles enable row level security;
alter table classes enable row level security;
alter table signups enable row level security;

create policy "user reads own profile"
on profiles for select
using (auth.uid() = id);

-- INSERT: trigger wstawia profil, pozwalamy na insert
create policy "allow insert by trigger"
on profiles for insert
with check (true);

-- UPDATE / DELETE: tylko admin może update/delete swojego profilu (lub przez service_role)
create policy "admin updates profiles"
on profiles for update
using (role = 'admin' and auth.uid() = id);

create policy "admin deletes profiles"
on profiles for delete
using (role = 'admin' and auth.uid() = id);

-- 6️⃣ Polityki classes

-- SELECT: każdy widzi klasy
create policy "everyone reads classes"
on classes for select
                          using (true);

create function is_admin()
    returns boolean
    language plpgsql
security definer -- will run as the creator
as $$
begin
return exists (
    select * from profiles
    where (select auth.uid()) = id and role = 'admin'
    limit 1
);
end;
$$;

create policy "admin inserts classes"
on classes for insert
    with check ( (select is_admin()) );
       
create policy "admin updates classes"
on classes for update
    with check ( (select is_admin()) );
              
create policy "admin deletes classes"
on classes for delete
    using ( (select is_admin()) );

-- 7️⃣ Polityki signups

-- INSERT: user zapisuje siebie na zajęcia
create policy "user inserts own signup"
on signups for insert
with check (auth.uid() = user_id);
       
create policy "user updates own signup"
on signups for update
with check (auth.uid() = user_id);

create policy "user removes own signup"
on signups for delete
using (auth.uid() = user_id);

-- SELECT: user widzi swoje zapisy
create policy "user reads own signups"
on signups for select
using (auth.uid() = user_id);