-- Eliminar tablas existentes si existen
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS publications CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Crear extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Crear la tabla de perfiles
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  title TEXT,
  bio TEXT,
  specialties TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'lawyer',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Crear la tabla de publicaciones
CREATE TABLE publications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Crear la tabla de mensajes
CREATE TABLE messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  read BOOLEAN DEFAULT false
);

-- Función para actualizar el timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para actualizar timestamps
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_publications_updated_at
  BEFORE UPDATE ON publications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Habilitar RLS en todas las tablas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Políticas para publications
CREATE POLICY "Publications are viewable by everyone"
  ON publications FOR SELECT
  USING (true);

CREATE POLICY "Lawyers can create publications"
  ON publications FOR INSERT
  WITH CHECK (auth.uid() IN (
    SELECT id FROM profiles WHERE role IN ('lawyer', 'admin')
  ));

CREATE POLICY "Users can update own publications"
  ON publications FOR UPDATE
  USING (auth.uid() = author_id);

CREATE POLICY "Users can delete own publications"
  ON publications FOR DELETE
  USING (auth.uid() = author_id);

-- Políticas para messages
CREATE POLICY "Anyone can create messages"
  ON messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only lawyers and admins can view messages"
  ON messages FOR SELECT
  USING (auth.uid() IN (
    SELECT id FROM profiles WHERE role IN ('lawyer', 'admin')
  ));

-- Desactivar temporalmente RLS para la configuración inicial
ALTER TABLE profiles FORCE ROW LEVEL SECURITY; 