-- Primero, eliminar las tablas que no necesitamos
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TYPE IF EXISTS notification_type;

-- Modificar la tabla profiles existente
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS title TEXT,
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS specialties TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'lawyer';

-- Crear la tabla de publicaciones
CREATE TABLE IF NOT EXISTS publications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Crear la tabla de mensajes
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  read BOOLEAN DEFAULT false
);

-- Aplicar el trigger de actualización a publications
CREATE TRIGGER update_publications_timestamp
BEFORE UPDATE ON publications
FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

-- Habilitar RLS en las nuevas tablas
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Políticas para publicaciones
CREATE POLICY "Public publications are viewable by everyone"
  ON publications FOR SELECT
  USING (true);

CREATE POLICY "Lawyers can create publications"
  ON publications FOR INSERT
  WITH CHECK (auth.uid() IN (
    SELECT id FROM profiles WHERE role = 'lawyer'
  ));

CREATE POLICY "Lawyers can update own publications"
  ON publications FOR UPDATE
  USING (auth.uid() = author_id);

-- Políticas para mensajes
CREATE POLICY "Messages are viewable by lawyers"
  ON messages FOR SELECT
  USING (auth.uid() IN (
    SELECT id FROM profiles WHERE role = 'lawyer'
  ));

CREATE POLICY "Anyone can create messages"
  ON messages FOR INSERT
  WITH CHECK (true); 