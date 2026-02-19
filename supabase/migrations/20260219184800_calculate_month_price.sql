create or replace function public.calculate_month_price(p_count int)
returns numeric
language plpgsql
as $$
declare
v_sum numeric := 0;
begin

  if p_count <= 0 then
    return 0;

  elsif p_count <= 4 then
    v_sum := p_count * 70;

    if v_sum > 250 then
      v_sum := 250;
end if;

return v_sum;

elsif p_count <= 8 then
    v_sum := p_count * 60;

    if v_sum > 350 then
      v_sum := 350;
end if;

return v_sum;

elsif p_count <= 12 then
    v_sum := p_count * 50;

    if v_sum > 450 then
      v_sum := 450;
end if;

return v_sum;

else
    return 450 + (p_count - 12) * 40;

end if;

end;
$$;