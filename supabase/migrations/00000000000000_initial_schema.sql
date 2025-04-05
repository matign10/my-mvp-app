-- Crear extensiones
create extension if not exists "uuid-ossp";

-- Tabla de perfiles de usuario
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Función para actualizar el timestamp
create or replace function update_timestamp()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger para actualizar timestamps
create trigger update_profiles_timestamp
before update on profiles
for each row execute procedure update_timestamp();

-- Políticas RLS (Row Level Security)
alter table profiles enable row level security;

-- Políticas para perfiles
create policy "Los perfiles son visibles para todos los usuarios autenticados"
  on profiles for select
  using ( auth.role() = 'authenticated' );

create policy "Los usuarios pueden insertar sus propios perfiles"
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Los usuarios pueden actualizar sus propios perfiles"
  on profiles for update
  using ( auth.uid() = id );

-- Tabla de proyectos
create table projects (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  owner_id uuid references profiles(id) on delete cascade not null,
  is_public boolean default false,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Trigger para actualizar timestamps de proyectos
create trigger update_projects_timestamp
before update on projects
for each row execute procedure update_timestamp();

-- Políticas RLS para proyectos
alter table projects enable row level security;

create policy "Los proyectos públicos son visibles para todos los usuarios autenticados"
  on projects for select
  using ( is_public = true or auth.uid() = owner_id );

create policy "Los usuarios pueden crear sus propios proyectos"
  on projects for insert
  with check ( auth.uid() = owner_id );

create policy "Los usuarios pueden actualizar sus propios proyectos"
  on projects for update
  using ( auth.uid() = owner_id );

create policy "Los usuarios pueden eliminar sus propios proyectos"
  on projects for delete
  using ( auth.uid() = owner_id );

-- Tabla de tareas
create table tasks (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  status text default 'pendiente' not null,
  project_id uuid references projects(id) on delete cascade not null,
  assigned_to uuid references profiles(id),
  due_date timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Trigger para actualizar timestamps de tareas
create trigger update_tasks_timestamp
before update on tasks
for each row execute procedure update_timestamp();

-- Políticas RLS para tareas
alter table tasks enable row level security;

create policy "Las tareas son visibles para los propietarios del proyecto"
  on tasks for select
  using ( 
    auth.uid() IN (
      SELECT owner_id FROM projects WHERE id = tasks.project_id
    ) 
    OR 
    tasks.assigned_to = auth.uid()
    OR
    EXISTS (
      SELECT 1 FROM projects 
      WHERE id = tasks.project_id AND is_public = true
    )
  );

create policy "Los propietarios del proyecto pueden crear tareas"
  on tasks for insert
  with check ( 
    auth.uid() IN (
      SELECT owner_id FROM projects WHERE id = tasks.project_id
    )
  );

create policy "Los propietarios del proyecto y los asignados pueden actualizar tareas"
  on tasks for update
  using ( 
    auth.uid() IN (
      SELECT owner_id FROM projects WHERE id = tasks.project_id
    ) 
    OR 
    tasks.assigned_to = auth.uid()
  );

create policy "Solo los propietarios del proyecto pueden eliminar tareas"
  on tasks for delete
  using ( 
    auth.uid() IN (
      SELECT owner_id FROM projects WHERE id = tasks.project_id
    )
  );

-- Crear funciones para notificaciones
create type notification_type as enum ('task_assigned', 'task_updated', 'project_shared');

create table notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  type notification_type not null,
  content json not null,
  is_read boolean default false,
  created_at timestamptz default now() not null
);

-- Políticas RLS para notificaciones
alter table notifications enable row level security;

create policy "Los usuarios solo pueden ver sus propias notificaciones"
  on notifications for select
  using ( auth.uid() = user_id );

create policy "Solo el sistema puede crear notificaciones"
  on notifications for insert
  with check ( false );  -- Esta política se sobrescribirá con funciones específicas

create policy "Los usuarios pueden marcar como leídas sus propias notificaciones"
  on notifications for update
  using ( auth.uid() = user_id )
  with check ( 
    auth.uid() = user_id
    AND (
      -- Solo permite actualizar el campo is_read
      (old.is_read IS DISTINCT FROM new.is_read AND old.content = new.content AND old.type = new.type)
    )
  );

-- Función para crear notificaciones de asignación de tareas
create or replace function notify_task_assigned()
returns trigger as $$
begin
  if new.assigned_to is not null and (old.assigned_to is null or old.assigned_to != new.assigned_to) then
    insert into notifications (user_id, type, content)
    values (
      new.assigned_to,
      'task_assigned',
      json_build_object(
        'task_id', new.id,
        'task_title', new.title,
        'project_id', new.project_id
      )
    );
  end if;
  return new;
end;
$$ language plpgsql;

-- Trigger para notificaciones de asignación
create trigger on_task_assigned
after insert or update on tasks
for each row execute procedure notify_task_assigned();
