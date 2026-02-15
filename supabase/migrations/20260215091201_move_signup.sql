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
  v_existing_signup_id uuid;
  v_actor_id uuid := auth.uid();
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

-- sprawdź czy istnieje zapis do nowej klasy
select id
into v_existing_signup_id
from signups
where class_id = p_new_class_id
  and user_id = v_user_id
    limit 1;

if v_existing_signup_id is not null then
update signups
set status = 'active'
where id = v_existing_signup_id;
else
    insert into signups (class_id, user_id, status)
    values (p_new_class_id, v_user_id, 'active');
end if;

  -- 🔎 AUDIT LOG
insert into audit_logs (
    actor_id,
    action,
    entity,
    entity_id,
    meta
)
values (
           v_actor_id,
           'move_signup',
           'signup',
           p_signup_id,
           jsonb_build_object(
                   'user_id', v_user_id,
                   'from_class_id', v_old_class_id,
                   'to_class_id', p_new_class_id
           )
       );

end;
$$;