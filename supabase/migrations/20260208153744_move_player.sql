create or replace function public.move_signup(
  p_signup_id uuid,
  p_new_class_id uuid
)
returns void
language plpgsql
security definer
as $$
begin
update signups
set status = 'moved',
    moved_to_class_id = p_new_class_id
where id = p_signup_id;

insert into signups (class_id, user_id)
select p_new_class_id, user_id
from signups
where id = p_signup_id;
end;
$$;