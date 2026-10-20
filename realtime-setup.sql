-- Habilitar eventos em tempo real para vitrine e painel da LOBI.
-- Execute no SQL Editor do projeto Supabase conectado à loja.
-- Não desative as políticas RLS existentes. O acesso aos eventos
-- continua condicionado às políticas SELECT da tabela products.

do $realtime$
begin
  if not exists(select 1 from pg_catalog.pg_publication where pubname = 'supabase_realtime') then
    create publication supabase_realtime;
  end if;
  if not exists(
    select 1 from pg_catalog.pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'products'
  ) then
    alter publication supabase_realtime add table public.products;
  end if;
end
$realtime$;

-- Verificação:
select pubname, schemaname, tablename from pg_catalog.pg_publication_tables
where pubname = 'supabase_realtime' and schemaname = 'public'
  and tablename = 'products';
