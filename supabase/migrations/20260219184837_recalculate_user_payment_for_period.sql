create or replace function public.recalculate_user_payment_for_period(
  p_user_id uuid,
  p_start date,
  p_end date
)
returns void
language plpgsql
security definer
as $$
declare
v_count int;
  v_total numeric;
begin
  -- policz treningi bez typu
select count(*)
into v_count
from signups s
         join classes c on c.id = s.class_id
where s.user_id = p_user_id
  and s.status = 'active'
  and c.training_type_id is null
  and c.starts_at::date between p_start and p_end;

v_total := calculate_month_price(v_count);

insert into payments (
    user_id,
    period_start,
    period_end,
    total_amount
)
values (
           p_user_id,
           p_start,
           p_end,
           v_total
       )
    on conflict (user_id, period_start, period_end)
  do update set total_amount = excluded.total_amount;

end;
$$;