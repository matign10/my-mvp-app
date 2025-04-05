-- Tabla de publicaciones
create table publications (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  content text,
  image_url text,
  views integer default 0,
  author_id uuid references auth.users on delete cascade not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Tabla de mensajes
create table messages (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  read boolean default false,
  created_at timestamptz default now() not null
);

-- Tabla de configuración de usuarios
create table user_settings (
  user_id uuid references auth.users on delete cascade primary key,
  notifications_enabled boolean default true,
  email_notifications boolean default true,
  language text default 'es',
  theme text default 'light',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Trigger para actualizar timestamps
create trigger update_publications_timestamp
  before update on publications
  for each row
  execute procedure update_timestamp();

create trigger update_user_settings_timestamp
  before update on user_settings
  for each row
  execute procedure update_timestamp();

-- Políticas RLS
alter table publications enable row level security;
alter table messages enable row level security;
alter table user_settings enable row level security;

-- Políticas para publicaciones
create policy "Los usuarios pueden ver todas las publicaciones"
  on publications for select
  using (true);

create policy "Los usuarios pueden crear sus propias publicaciones"
  on publications for insert
  with check (auth.uid() = author_id);

create policy "Los usuarios pueden actualizar sus propias publicaciones"
  on publications for update
  using (auth.uid() = author_id);

create policy "Los usuarios pueden eliminar sus propias publicaciones"
  on publications for delete
  using (auth.uid() = author_id);

-- Políticas para mensajes
create policy "Solo los administradores pueden ver los mensajes"
  on messages for select
  using (
    exists (
      select 1 from profiles
      where id = auth.uid()
      and role = 'admin'
    )
  );

create policy "Cualquiera puede crear mensajes"
  on messages for insert
  with check (true);

create policy "Solo los administradores pueden actualizar mensajes"
  on messages for update
  using (
    exists (
      select 1 from profiles
      where id = auth.uid()
      and role = 'admin'
    )
  );

-- Políticas para configuración de usuarios
create policy "Los usuarios pueden ver su propia configuración"
  on user_settings for select
  using (auth.uid() = user_id);

create policy "Los usuarios pueden actualizar su propia configuración"
  on user_settings for insert
  with check (auth.uid() = user_id);

create policy "Los usuarios pueden actualizar su propia configuración"
  on user_settings for update
  using (auth.uid() = user_id); 