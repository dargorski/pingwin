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
v_regular_count int;
  v_regular_total numeric;
  v_typed_total numeric;
  v_total numeric;
begin

  -- 1️⃣ policz treningi BEZ typu (Twoja progresja cenowa)
select count(*)
into v_regular_count
from signups s
         join classes c on c.id = s.class_id
where s.user_id = p_user_id
  and s.status = 'active'
  and c.training_type_id is null
  and c.starts_at::date between p_start and p_end;

v_regular_total := calculate_month_price(v_regular_count);

  -- 2️⃣ policz treningi Z typem (np. serwis 15zł)
select coalesce(sum(coalesce(c.price_override, tt.default_price)), 0)
into v_typed_total
from signups s
         join classes c on c.id = s.class_id
         join training_types tt on tt.id = c.training_type_id
where s.user_id = p_user_id
  and s.status = 'active'
  and c.training_type_id is not null
  and c.starts_at::date between p_start and p_end;

-- 3️⃣ suma całości
v_total := v_regular_total + v_typed_total;

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
  do update
             set total_amount = excluded.total_amount;

end;
$$;