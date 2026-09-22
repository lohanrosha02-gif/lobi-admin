create extension if not exists pgcrypto;

create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;

create or replace function public.is_admin(p_uid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = p_uid);
$$;
revoke all on function public.is_admin(uuid) from public;
grant execute on function public.is_admin(uuid) to authenticated;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric(10,2) not null check (price >= 0),
  category text not null,
  description text,
  image_url text,
  image_path text,
  sizes text[] not null default '{}',
  stock integer not null default 0 check (stock >= 0),
  tag text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.products enable row level security;

drop policy if exists "Public read active products" on public.products;
drop policy if exists "Admins read all products" on public.products;
drop policy if exists "Admins insert products" on public.products;
drop policy if exists "Admins update products" on public.products;
drop policy if exists "Admins delete products" on public.products;

create policy "Public read active products" on public.products for select to anon using (active = true);
create policy "Admins read all products" on public.products for select to authenticated using (public.is_admin(auth.uid()));
create policy "Admins insert products" on public.products for insert to authenticated with check (public.is_admin(auth.uid()));
create policy "Admins update products" on public.products for update to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));
create policy "Admins delete products" on public.products for delete to authenticated using (public.is_admin(auth.uid()));

grant select on public.products to anon;
grant select, insert, update, delete on public.products to authenticated;

insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('product-images','product-images',true,5242880,array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public=excluded.public,file_size_limit=excluded.file_size_limit,allowed_mime_types=excluded.allowed_mime_types;

drop policy if exists "Admins upload product images" on storage.objects;
drop policy if exists "Admins update product images" on storage.objects;
drop policy if exists "Admins delete product images" on storage.objects;

create policy "Admins upload product images" on storage.objects for insert to authenticated with check (bucket_id='product-images' and public.is_admin(auth.uid()));
create policy "Admins update product images" on storage.objects for update to authenticated using (bucket_id='product-images' and public.is_admin(auth.uid())) with check (bucket_id='product-images' and public.is_admin(auth.uid()));
create policy "Admins delete product images" on storage.objects for delete to authenticated using (bucket_id='product-images' and public.is_admin(auth.uid()));

-- Depois de criar seu usuário em Authentication > Users, rode:
-- insert into public.admins (user_id)
-- select id from auth.users where email='SEU_EMAIL@EXEMPLO.COM'
-- on conflict (user_id) do nothing;
