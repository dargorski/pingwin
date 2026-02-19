create table profiles (
                          id uuid primary key references auth.users(id) on delete cascade,
                          email text not null,
                          full_name text,
                          role text not null default 'user'
                              check (role in ('admin','user')),
                          created_at timestamptz default now()
);

create table training_types (
                                id uuid primary key default gen_random_uuid(),
                                name text not null,
                                default_price numeric(10,2),
                                color text,
                                max_capacity int,
                                active boolean default true,
                                created_at timestamptz default now()
);

create table classes (
                         id uuid primary key default gen_random_uuid(),
                         training_type_id uuid references training_types(id),
                         title text,
                         starts_at timestamptz not null,
                         capacity int not null,
                         price_override numeric(10,2),
                         created_by uuid references profiles(id),
                         created_at timestamptz default now(),
                         cancelled boolean default false
);

create table signups (
                         id uuid primary key default gen_random_uuid(),
                         class_id uuid references classes(id) on delete cascade,
                         user_id uuid references profiles(id) on delete cascade,
                         status text default 'active'
                             check (status in ('active','moved','cancelled')),
                         created_at timestamptz default now(),
                         moved_to_class_id uuid references classes(id),
                         unique (class_id, user_id)
);

create table payments (
                          id uuid primary key default gen_random_uuid(),
                          user_id uuid references profiles(id) on delete cascade,
                          period_start date not null,
                          period_end date not null,
                          total_amount numeric(10,2) not null,
                          paid boolean default false,
                          paid_at timestamptz,
                          created_at timestamptz default now(),
                          unique (user_id, period_start, period_end)
);

create table payment_items (
                               id uuid primary key default gen_random_uuid(),
                               payment_id uuid references payments(id) on delete cascade,
                               class_id uuid references classes(id),
                               amount numeric(10,2) not null,
                               created_at timestamptz default now()
);

create table audit_logs (
                            id uuid primary key default gen_random_uuid(),
                            actor_id uuid references profiles(id),
                            action text,
                            entity text,
                            entity_id uuid,
                            meta jsonb,
                            created_at timestamptz default now()
);

create view class_slots as
select
    c.id,
    c.capacity,
    count(s.*) as taken
from classes c
         left join signups s on s.class_id = c.id and s.status = 'active'
group by c.id;