create or replace function public.move_signup(
  p_signup_id uuid,
  p_new_class_id uuid
)
returns void
language plpgsql
security definer
as $$
declare
v_user_id uuid;
  v_old_class_id uuid;
begin
  -- pobierz dane starego zapisu
select user_id, class_id
into v_user_id, v_old_class_id
from signups
where id = p_signup_id;

if v_user_id is null then
    raise exception 'Signup not found';
end if;

  -- oznacz stary jako moved
update signups
set status = 'moved'
where id = p_signup_id;

-- dodaj nowy zapis
insert into signups (class_id, user_id, status)
values (p_new_class_id, v_user_id, 'active');

end;
$$;