-- ============================================
-- SCRIPT PARA CREAR TABLAS EN SUPABASE
-- Pegar esto en SQL Editor de Supabase
-- ============================================

-- Extensión pgcrypto para generar hashes bcrypt
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================
-- 1. ADMIN USERS (autenticación con bcrypt)
-- ============================================
CREATE TABLE admin_users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  hashed_password TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Permitir SELECT para que el login funcione
CREATE POLICY "Admin users accesible para login"
  ON admin_users FOR SELECT
  USING (true);

-- Insertar admin por defecto (email: admin@suerohome.com, pass: admin123)
-- CAMBIA LA CONTRASEÑA DESPUÉS DEL PRIMER INGRESO
INSERT INTO admin_users (email, hashed_password)
VALUES (
  'admin@suerohome.com',
  crypt('admin123', gen_salt('bf'))
) ON CONFLICT (email) DO NOTHING;

-- ============================================
-- 2. HERO SLIDES
-- ============================================
CREATE TABLE hero_slides (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  imagen TEXT NOT NULL,
  titulo TEXT NOT NULL,
  acento TEXT NOT NULL DEFAULT '',
  subtitulo TEXT NOT NULL DEFAULT '',
  texto TEXT NOT NULL DEFAULT '',
  orden INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Hero slides acceso público"
  ON hero_slides FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================
-- 3. SUEROS
-- ============================================
CREATE TABLE sueros (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombre TEXT NOT NULL,
  badge TEXT NOT NULL DEFAULT '',
  descripcion TEXT NOT NULL DEFAULT '',
  descripcion_destacada TEXT[] DEFAULT '{}',
  imagen TEXT NOT NULL DEFAULT '',
  orden INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE sueros ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sueros acceso público"
  ON sueros FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================
-- 4. SERVICIOS
-- ============================================
CREATE TABLE servicios (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  titulo TEXT NOT NULL,
  badge TEXT NOT NULL DEFAULT '',
  icono TEXT NOT NULL DEFAULT 'pi-building',
  descripcion TEXT NOT NULL DEFAULT '',
  imagen TEXT NOT NULL DEFAULT '',
  mensaje_wsp TEXT NOT NULL DEFAULT '',
  orden INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE servicios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Servicios acceso público"
  ON servicios FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================
-- 5. RECLAMACIONES (Libro de Reclamaciones)
-- ============================================
CREATE TABLE reclamaciones (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombres TEXT NOT NULL,
  dni TEXT NOT NULL,
  telefono TEXT NOT NULL,
  email TEXT DEFAULT '',
  direccion TEXT NOT NULL DEFAULT '',
  bien_contratado TEXT NOT NULL DEFAULT '',
  tipo TEXT NOT NULL CHECK (tipo IN ('QUEJA', 'RECLAMO')),
  descripcion TEXT NOT NULL DEFAULT '',
  pedido TEXT NOT NULL DEFAULT '',
  fecha_creacion TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE reclamaciones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reclamaciones acceso público"
  ON reclamaciones FOR ALL
  USING (true)
  WITH CHECK (true);
