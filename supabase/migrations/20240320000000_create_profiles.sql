-- Crear la tabla de perfiles si no existe
create table if not exists public.profiles (
    id uuid references auth.users on delete cascade primary key,
    email text,
    name text,
    role text default 'user',
    avatar_url text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Habilitar RLS
alter table public.profiles enable row level security;

-- Crear políticas de seguridad
create policy "Los usuarios pueden ver sus propios perfiles"
    on public.profiles
    for select
    using (auth.uid() = id);

create policy "Los usuarios pueden actualizar sus propios perfiles"
    on public.profiles
    for update
    using (auth.uid() = id);

-- Función para manejar nuevos usuarios
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
    insert into public.profiles (id, email, name, role)
    values (
        new.id,
        new.email,
        coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
        coalesce(new.raw_user_meta_data->>'role', 'user')
    );
    return new;
end;
$$;

-- Trigger para crear perfil automáticamente
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user(); 