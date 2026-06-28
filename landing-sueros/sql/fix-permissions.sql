-- 1) Grant table-level access to anon (required even with RLS)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sueros TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.servicios TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.hero_slides TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.reclamaciones TO anon;

-- 2) Ensure RLS is enabled
ALTER TABLE public.sueros ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.servicios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reclamaciones ENABLE ROW LEVEL SECURITY;

-- 3) Drop existing policies (safe if they don't exist)
DROP POLICY IF EXISTS "anon_select_sueros" ON public.sueros;
DROP POLICY IF EXISTS "anon_insert_sueros" ON public.sueros;
DROP POLICY IF EXISTS "anon_update_sueros" ON public.sueros;
DROP POLICY IF EXISTS "anon_delete_sueros" ON public.sueros;

DROP POLICY IF EXISTS "anon_select_servicios" ON public.servicios;
DROP POLICY IF EXISTS "anon_insert_servicios" ON public.servicios;
DROP POLICY IF EXISTS "anon_update_servicios" ON public.servicios;
DROP POLICY IF EXISTS "anon_delete_servicios" ON public.servicios;

DROP POLICY IF EXISTS "anon_select_hero_slides" ON public.hero_slides;
DROP POLICY IF EXISTS "anon_insert_hero_slides" ON public.hero_slides;
DROP POLICY IF EXISTS "anon_update_hero_slides" ON public.hero_slides;
DROP POLICY IF EXISTS "anon_delete_hero_slides" ON public.hero_slides;

DROP POLICY IF EXISTS "anon_select_reclamaciones" ON public.reclamaciones;
DROP POLICY IF EXISTS "anon_insert_reclamaciones" ON public.reclamaciones;
DROP POLICY IF EXISTS "anon_update_reclamaciones" ON public.reclamaciones;
DROP POLICY IF EXISTS "anon_delete_reclamaciones" ON public.reclamaciones;

-- 4) Create permissive RLS policies for anon
CREATE POLICY "anon_select_sueros" ON public.sueros FOR SELECT TO anon USING (true);
CREATE POLICY "anon_insert_sueros" ON public.sueros FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_update_sueros" ON public.sueros FOR UPDATE TO anon USING (true);
CREATE POLICY "anon_delete_sueros" ON public.sueros FOR DELETE TO anon USING (true);

CREATE POLICY "anon_select_servicios" ON public.servicios FOR SELECT TO anon USING (true);
CREATE POLICY "anon_insert_servicios" ON public.servicios FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_update_servicios" ON public.servicios FOR UPDATE TO anon USING (true);
CREATE POLICY "anon_delete_servicios" ON public.servicios FOR DELETE TO anon USING (true);

CREATE POLICY "anon_select_hero_slides" ON public.hero_slides FOR SELECT TO anon USING (true);
CREATE POLICY "anon_insert_hero_slides" ON public.hero_slides FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_update_hero_slides" ON public.hero_slides FOR UPDATE TO anon USING (true);
CREATE POLICY "anon_delete_hero_slides" ON public.hero_slides FOR DELETE TO anon USING (true);

CREATE POLICY "anon_select_reclamaciones" ON public.reclamaciones FOR SELECT TO anon USING (true);
CREATE POLICY "anon_insert_reclamaciones" ON public.reclamaciones FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_update_reclamaciones" ON public.reclamaciones FOR UPDATE TO anon USING (true);
CREATE POLICY "anon_delete_reclamaciones" ON public.reclamaciones FOR DELETE TO anon USING (true);
