create table sops (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  summary text,
  estimated_time text,
  tags jsonb default '[]',
  steps jsonb default '[]',
  checklist jsonb default '[]',
  video_url text,
  screenshot_urls jsonb default '[]',
  status text default 'processing',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  credits integer default 3,
  is_pro boolean default false,
  updated_at timestamptz default now()
);

create table payments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  amount decimal not null,
  currency text default 'INR',
  status text default 'pending', -- pending, completed, failed
  utr text,
  payment_method text,
  created_at timestamptz default now()
);


alter table sops enable row level security;
create policy "Users see own SOPs" on sops for all using (auth.uid() = user_id);

alter table profiles enable row level security;
create policy "Users see own profile" on profiles for all using (auth.uid() = id);

alter table payments enable row level security;
create policy "Users see own payments" on payments for select using (auth.uid() = user_id);

-- Function to decrement credits
create or replace function decrement_credits(user_id uuid)
returns void as $$
begin
  update profiles
  set credits = credits - 1
  where id = user_id;
end;
$$ language plpgsql security definer;


