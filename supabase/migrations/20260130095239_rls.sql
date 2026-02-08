create or replace function public.is_admin()
returns boolean
language plpgsql
security definer
as $$
begin
return exists (
    select 1
    from profiles
    where id = auth.uid()
      and role = 'admin'
);
end;
$$;

alter table profiles enable row level security;

create policy "profiles_select_own"
on profiles for select
using (auth.uid() = id);

create policy "profiles_insert_trigger"
on profiles for insert
with check (true);
       
create policy "profiles_admin_update"
on profiles for update
using (is_admin());

create policy "profiles_admin_delete"
on profiles for delete
using (is_admin());

alter table training_types enable row level security;

create policy "training_types_select_all"
on training_types for select
using (true);

create policy "training_types_admin_write"
on training_types for insert
with check (is_admin());

create policy "training_types_admin_update"
on training_types for update
using (is_admin());

create policy "training_types_admin_delete"
on training_types for delete
using (is_admin());

alter table classes enable row level security;

create policy "classes_select_all"
on classes for select
using (true);

create policy "classes_admin_write"
on classes for insert
with check (is_admin());

create policy "classes_admin_update"
on classes for update
using (is_admin());

create policy "classes_admin_delete"
on classes for delete
using (is_admin());

alter table signups enable row level security;

create policy "signups_select_own"
on signups for select
using (auth.uid() = user_id);

create policy "signups_insert_rpc"
on signups for insert
with check (auth.uid() = user_id);
       
create policy "signups_delete_rpc"
on signups for delete
using (auth.uid() = user_id);

create policy "signups_admin_update"
on signups for update
using (is_admin());

alter table payments enable row level security;

create policy "payments_select_owner_or_admin"
on payments for select
using (
auth.uid() = user_id
or is_admin()
);

create policy "payments_admin_update"
on payments for update
using (is_admin());

create policy "payments_admin_write"
on payments for insert
with check (is_admin());

alter table payment_items enable row level security;

create policy "payment_items_admin_only"
on payment_items for select
using (is_admin());


create policy "payment_items_admin_insert"
on payment_items for insert
with check (is_admin());

create policy "payment_items_admin_delete"
on payment_items for delete
using (is_admin());

alter table audit_logs enable row level security;

create policy "audit_insert"
on audit_logs for insert
with check (true);
       
create policy "audit_select_admin"
on audit_logs for select
using (is_admin());