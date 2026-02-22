create or replace function public.generate_payments_for_period(
  p_start date,
  p_end date
)
returns void
language plpgsql
security definer
as $$
declare
r record;
begin

for r in
select distinct s.user_id
from signups s
         join classes c on c.id = s.class_id
where s.status = 'active'
  and c.starts_at::date between p_start and p_end
  loop

    perform recalculate_user_payment_for_period(
      r.user_id,
      p_start,
      p_end
    );

end loop;

end;
$$;