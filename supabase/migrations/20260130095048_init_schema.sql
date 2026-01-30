-- 1️⃣ Tabela profiles
create table if not exists public.profiles (
                                               id uuid primary key references auth.users(id) on delete cascade,
    email text not null,
    role text not null default 'user' check (role in ('user', 'admin')),
    created_at timestamptz default now()
    );

-- 2️⃣ Tabela classes
create table if not exists public.classes (
                                              id uuid primary key default gen_random_uuid(),
    title text not null,
    starts_at timestamptz not null,
    capacity int not null check (capacity > 0),
    created_at timestamptz default now()
    );

-- 3️⃣ Tabela signups
create table if not exists public.signups (
                                              id uuid primary key default gen_random_uuid(),
    class_id uuid references classes(id) on delete cascade,
    user_id uuid references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    unique (class_id, user_id)
    );