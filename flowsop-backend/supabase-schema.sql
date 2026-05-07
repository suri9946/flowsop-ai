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

alter table sops enable row level security;
create policy "Users see own SOPs" on sops for all using (auth.uid() = user_id);
