-- Primero, eliminamos las políticas existentes
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profiles" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Creamos las nuevas políticas
-- Política para permitir ver perfiles públicamente
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

-- Política para permitir la inserción de perfiles
-- Esta política permite la inserción si el ID del usuario coincide con el ID del perfil
CREATE POLICY "Enable insert for authentication users only"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Política para permitir la actualización de perfiles
CREATE POLICY "Enable update for users based on id"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Política para permitir la eliminación de perfiles
CREATE POLICY "Enable delete for users based on id"
  ON profiles FOR DELETE
  USING (auth.uid() = id);

-- Asegurarnos de que RLS está habilitado
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Permitir temporalmente todas las operaciones para la configuración inicial
ALTER TABLE profiles FORCE ROW LEVEL SECURITY; 