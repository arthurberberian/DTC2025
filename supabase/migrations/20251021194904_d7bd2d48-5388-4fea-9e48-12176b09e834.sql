-- 1) Enum para roles (Admin e Closer)
create type public.app_role as enum ('admin', 'closer');

-- 2) Tabela de roles de usuários (separada por segurança)
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamptz default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

-- 3) Função security definer para verificar role (evita recursão RLS)
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- 4) RLS Policies para user_roles
create policy "Users can view their own roles"
on public.user_roles
for select
to authenticated
using (user_id = auth.uid());

create policy "Admins can view all roles"
on public.user_roles
for select
to authenticated
using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can manage roles"
on public.user_roles
for all
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

-- 5) Tabela principal de aplicações
create table public.applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  
  -- Dados básicos do formulário simples
  full_name text not null,
  email text not null,
  phone text not null,
  age integer check (age >= 18 and age <= 100),
  professional_area text,
  experience_level text,
  main_challenge text,
  main_goal text,
  investment_willingness text,
  commitment_score integer check (commitment_score >= 0 and commitment_score <= 10),
  
  -- Campos de gestão (para closers/admins)
  status text default 'pending' check (status in ('pending', 'reviewing', 'qualified', 'disqualified', 'enrolled', 'archived')),
  assigned_to uuid references auth.users(id) on delete set null,
  closer_notes text,
  qualification_score integer check (qualification_score >= 0 and qualification_score <= 10),
  follow_up_date timestamptz,
  
  -- Metadados
  form_type text default 'simple' check (form_type in ('simple', 'complete')),
  consent_lgpd boolean default false,
  
  constraint applications_email_created_key unique (email, created_at)
);

alter table public.applications enable row level security;

-- Índices para performance
create index applications_status_idx on public.applications(status);
create index applications_assigned_to_idx on public.applications(assigned_to);
create index applications_created_at_idx on public.applications(created_at desc);
create index applications_email_idx on public.applications(email);

-- 6) RLS Policies para applications

-- Closers e admins podem ver todas as aplicações
create policy "Closers and admins can view applications"
on public.applications
for select
to authenticated
using (
  public.has_role(auth.uid(), 'closer') or 
  public.has_role(auth.uid(), 'admin')
);

-- Closers podem atualizar aplicações atribuídas a eles
create policy "Closers can update assigned applications"
on public.applications
for update
to authenticated
using (
  assigned_to = auth.uid() and public.has_role(auth.uid(), 'closer')
)
with check (
  assigned_to = auth.uid() and public.has_role(auth.uid(), 'closer')
);

-- Admins podem atualizar qualquer aplicação
create policy "Admins can update any application"
on public.applications
for update
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

-- Admins podem deletar
create policy "Admins can delete applications"
on public.applications
for delete
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Permitir insert público (formulários)
create policy "Allow public insert"
on public.applications
for insert
to anon, authenticated
with check (true);

-- 7) Trigger para atualizar updated_at
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger applications_updated_at
  before update on public.applications
  for each row
  execute function public.handle_updated_at();

-- 8) Função helper para buscar aplicações com info do closer
create or replace function public.get_applications_with_closer_info()
returns table (
  id uuid,
  created_at timestamptz,
  full_name text,
  email text,
  phone text,
  age integer,
  status text,
  qualification_score integer,
  form_type text,
  assigned_to uuid,
  closer_name text,
  closer_email text
)
language sql
stable
security definer
set search_path = public
as $$
  select 
    a.id,
    a.created_at,
    a.full_name,
    a.email,
    a.phone,
    a.age,
    a.status,
    a.qualification_score,
    a.form_type,
    a.assigned_to,
    au.raw_user_meta_data->>'full_name' as closer_name,
    au.email as closer_email
  from applications a
  left join auth.users au on a.assigned_to = au.id
  order by a.created_at desc;
$$;