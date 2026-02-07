create or replace function public.unbook_class(p_class_id uuid)
returns void
language plpgsql
security definer
as $$
begin
delete from signups
where class_id = p_class_id
  and user_id = auth.uid();
end;
$$;