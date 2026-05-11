alter table sops add column version integer default 1;
alter table sops add column parent_sop_id uuid references sops(id) on delete set null;
alter table sops add column diff_result jsonb default null;

-- Performance: Add index on parent_sop_id
create index if not exists idx_sops_parent_sop_id on sops(parent_sop_id);

-- Update decrement_credits to respect is_pro status
create or replace function decrement_credits(user_id uuid)
returns void as $$
begin
  update profiles
  set credits = credits - 1
  where id = user_id and is_pro = false;
end;
$$ language plpgsql security definer;
