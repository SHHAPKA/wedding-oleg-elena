create table if not exists rsvp_responses (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null,
  attendance_status text not null check (attendance_status in ('alone', 'with_partner', 'declined')),
  partner_name text,
  has_children boolean default false,
  children_count integer default 0,
  children_info text,
  comment text,
  total_guests integer default 0,
  created_at timestamp with time zone default now()
);

alter table rsvp_responses enable row level security;

revoke all on table rsvp_responses from anon, authenticated;
grant insert on table rsvp_responses to anon, authenticated;
grant select on table rsvp_responses to authenticated;

drop policy if exists "Anyone can submit RSVP responses" on rsvp_responses;
create policy "Anyone can submit RSVP responses"
  on rsvp_responses
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Authenticated users can view RSVP responses" on rsvp_responses;
create policy "Authenticated users can view RSVP responses"
  on rsvp_responses
  for select
  to authenticated
  using (true);
