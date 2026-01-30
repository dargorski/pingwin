create or replace function public.book_class(p_class_id uuid)
returns void
language plpgsql
security definer
as $$
begin
insert into signups (class_id, user_id)
values (p_class_id, auth.uid())
    on conflict (class_id, user_id) do nothing;
end;
$$;