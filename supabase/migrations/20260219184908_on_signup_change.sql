create or replace function public.on_signup_change()
returns trigger
language plpgsql
security definer
as $$
declare
v_class_date date;
  v_start date;
  v_end date;
begin
select starts_at::date
into v_class_date
from classes
where id = coalesce(new.class_id, old.class_id);

v_start := date_trunc('month', v_class_date)::date;
  v_end := (v_start + interval '1 month - 1 day')::date;

  perform recalculate_user_payment_for_period(
    coalesce(new.user_id, old.user_id),
    v_start,
    v_end
  );

return null;
end;
$$;


create trigger signup_after_change
    after insert or update or delete
                    on signups
                        for each row
                        execute function public.on_signup_change();