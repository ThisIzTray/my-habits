-- Habits table
create table public.habits (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  emoji text not null default '🎯',
  color text not null default '#6b5ff7',
  target_per_week integer not null default 3,
  position integer not null default 0,
  active boolean not null default true,
  created_at timestamptz default now()
);

-- Sessions table
create table public.sessions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  habit_id uuid references public.habits(id) on delete cascade not null,
  date date not null,
  count integer not null default 1,
  created_at timestamptz default now(),
  unique(habit_id, date)
);

-- RLS
alter table public.habits enable row level security;
alter table public.sessions enable row level security;

create policy "habits: user owns" on public.habits
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "sessions: user owns" on public.sessions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Auto-fill user_id on insert
create or replace function public.fill_user_id()
returns trigger language plpgsql security definer as $$
begin
  new.user_id := auth.uid();
  return new;
end;
$$;

create trigger habits_fill_user_id before insert on public.habits
  for each row execute function public.fill_user_id();

create trigger sessions_fill_user_id before insert on public.sessions
  for each row execute function public.fill_user_id();
