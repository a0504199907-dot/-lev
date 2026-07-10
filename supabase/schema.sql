-- ============================================================
-- Business Table — לוח העסקים הפיזי | סכימה מלאה
-- הסכימה הזו כבר הוחלה על פרויקט ה-Supabase (lvds-production)
-- כמיגרציה בשם business_table_platform. שמורה כאן כתיעוד
-- ולשחזור בפרויקט חדש.
-- ============================================================

-- 1. טבלת משבצות הלוח הפיזי
create table if not exists slots (
  id uuid default gen_random_uuid() primary key,
  slot_code varchar(50) unique not null,
  display_name varchar(100) not null,
  width_multiplier int not null,  -- Grid span X
  height_multiplier int not null, -- Grid span Y
  base_price decimal not null
);

-- 2. טבלת הזמנות ושריונים
create table if not exists bookings (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now() not null,
  week_start_date date not null,
  slot_id uuid references slots(id) on delete cascade,
  business_name varchar(255) not null,
  contact_name varchar(255) not null,
  contact_phone varchar(50) not null,
  ad_image_url text not null,
  status varchar(50) default 'pending' -- pending | approved | rejected | blocked
);

alter table bookings
  add constraint bookings_status_check
  check (status in ('pending', 'approved', 'rejected', 'blocked'));

-- משבצת אחת תפוסה לכל שבוע (מונע כפל שריונים)
create unique index if not exists bookings_slot_week_taken_uq
  on bookings (slot_id, week_start_date)
  where status in ('approved', 'blocked');

-- 3. טבלת ארכיון
create table if not exists archives (
  id uuid default gen_random_uuid() primary key,
  published_date date not null,
  title varchar(255) not null,
  pdf_url text not null,
  preview_image_url text not null
);

-- ============================================================
-- RLS
-- ============================================================
alter table slots enable row level security;
alter table bookings enable row level security;
alter table archives enable row level security;

create policy "bt_slots_public_read" on slots for select using (true);

create policy "bt_bookings_public_read" on bookings for select using (true);
create policy "bt_bookings_public_insert" on bookings for insert with check (true);
create policy "bt_bookings_public_update" on bookings for update using (true);
create policy "bt_bookings_public_delete" on bookings for delete using (true);

create policy "bt_archives_public_read" on archives for select using (true);
create policy "bt_archives_public_insert" on archives for insert with check (true);
create policy "bt_archives_public_delete" on archives for delete using (true);

-- ============================================================
-- Storage buckets
-- ============================================================
insert into storage.buckets (id, name, public)
values ('board-ads', 'board-ads', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('board-archives', 'board-archives', true)
on conflict (id) do nothing;

create policy "bt_ads_public_read" on storage.objects
  for select using (bucket_id in ('board-ads', 'board-archives'));
create policy "bt_ads_public_upload" on storage.objects
  for insert with check (bucket_id in ('board-ads', 'board-archives'));

-- ============================================================
-- Seed: פריסת הלוח הפיזי (גריד 8 עמודות)
-- ============================================================
insert into slots (slot_code, display_name, width_multiplier, height_multiplier, base_price) values
  ('P1', 'פרימיום ענק', 2, 2, 480),
  ('P2', 'פרימיום ענק', 2, 2, 480),
  ('W1', 'רוחבית בולטת', 2, 1, 260),
  ('W2', 'רוחבית בולטת', 2, 1, 260),
  ('W3', 'רוחבית בולטת', 2, 1, 260),
  ('W4', 'רוחבית בולטת', 2, 1, 260),
  ('S1', 'סטנדרט', 1, 1, 140),
  ('S2', 'סטנדרט', 1, 1, 140),
  ('S3', 'סטנדרט', 1, 1, 140),
  ('S4', 'סטנדרט', 1, 1, 140),
  ('S5', 'סטנדרט', 1, 1, 140),
  ('S6', 'סטנדרט', 1, 1, 140),
  ('S7', 'סטנדרט', 1, 1, 140),
  ('S8', 'סטנדרט', 1, 1, 140),
  ('S9', 'סטנדרט', 1, 1, 140),
  ('S10', 'סטנדרט', 1, 1, 140),
  ('S11', 'סטנדרט', 1, 1, 140),
  ('S12', 'סטנדרט', 1, 1, 140),
  ('S13', 'סטנדרט', 1, 1, 140),
  ('S14', 'סטנדרט', 1, 1, 140),
  ('S15', 'סטנדרט', 1, 1, 140),
  ('S16', 'סטנדרט', 1, 1, 140)
on conflict (slot_code) do nothing;
