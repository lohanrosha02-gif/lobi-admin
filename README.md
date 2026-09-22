# LOBI Admin

Painel inicial com login, listagem, cadastro, edição, exclusão e upload de imagens usando Supabase.

## Instalação rápida

1. Crie um projeto no Supabase.
2. Abra SQL Editor e execute `supabase-setup.sql`.
3. Vá em Authentication > Users e crie seu usuário.
4. No SQL Editor, rode:

```sql
insert into public.admins (user_id)
select id from auth.users where email='SEU_EMAIL@EXEMPLO.COM'
on conflict (user_id) do nothing;
```

5. Pegue a Project URL e a Publishable Key.
6. Cole as duas em `supabase-config.js`.
7. Publique os arquivos no GitHub Pages.

## Segurança

Use apenas a Publishable Key no navegador. Nunca coloque `service_role` ou secret key no GitHub.
