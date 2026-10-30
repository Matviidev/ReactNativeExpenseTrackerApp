-- Profiles: one row per auth user, inserted by the client right after sign-up.
create table public.user_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null,
  email text not null,
  profile_picture text,
  created_at timestamptz not null default now()
);

alter table public.user_profiles enable row level security;

create policy "Users can view own profile"
  on public.user_profiles for select
  to authenticated
  using ((select auth.uid()) = id);

create policy "Users can create own profile"
  on public.user_profiles for insert
  to authenticated
  with check ((select auth.uid()) = id);

create policy "Users can update own profile"
  on public.user_profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- Transactions
create table public.transactions (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name text not null,
  amount numeric(12, 2) not null check (amount > 0),
  type text not null check (type in ('income', 'expense')),
  category text not null,
  date date not null,
  description text,
  created_at timestamptz not null default now()
);

create index transactions_user_id_date_idx
  on public.transactions (user_id, date desc, created_at desc);

alter table public.transactions enable row level security;

create policy "Users can view own transactions"
  on public.transactions for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can create own transactions"
  on public.transactions for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can update own transactions"
  on public.transactions for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users can delete own transactions"
  on public.transactions for delete
  to authenticated
  using ((select auth.uid()) = user_id);

-- Data API access (RLS above restricts rows)
grant select, insert, update on public.user_profiles to authenticated;
grant select, insert, update, delete on public.transactions to authenticated;

-- Avatars: public bucket, files named "<user id>-<timestamp>.jpg"
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('main', 'main', true, 5242880, array['image/jpeg', 'image/png', 'image/webp']);

create policy "Users can upload own avatars"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'main'
    and name like (select auth.uid())::text || '-%'
  );

create policy "Users can read own avatars"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'main'
    and name like (select auth.uid())::text || '-%'
  );

create policy "Users can replace own avatars"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'main'
    and name like (select auth.uid())::text || '-%'
  )
  with check (
    bucket_id = 'main'
    and name like (select auth.uid())::text || '-%'
  );
