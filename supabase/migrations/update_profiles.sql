-- Agregar columnas faltantes a la tabla profiles
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS name TEXT,
ADD COLUMN IF NOT EXISTS title TEXT,
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS specialties TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'lawyer',
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Asegurarnos de que las políticas estén actualizadas
DROP POLICY IF EXISTS "Los perfiles son visibles para todos los usuarios autenticados" ON profiles;
DROP POLICY IF EXISTS "Los usuarios pueden insertar sus propios perfiles" ON profiles;
DROP POLICY IF EXISTS "Los usuarios pueden actualizar sus propios perfiles" ON profiles;

-- Crear nuevas políticas
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profiles"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id); 