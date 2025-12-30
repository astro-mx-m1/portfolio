-- Create navigation items table for managing nav structure
CREATE TABLE public.navigation_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  path TEXT NOT NULL,
  parent_id UUID REFERENCES public.navigation_items(id) ON DELETE CASCADE,
  display_order INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create redirects table for URL redirects
CREATE TABLE public.redirects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_path TEXT NOT NULL UNIQUE,
  to_path TEXT NOT NULL,
  type TEXT DEFAULT 'permanent' CHECK (type IN ('permanent', 'temporary')),
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create pages table for custom pages
CREATE TABLE public.pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content TEXT,
  meta_description TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public can view visible navigation"
  ON public.navigation_items FOR SELECT
  USING (visible = true);

CREATE POLICY "Public can view enabled redirects"
  ON public.redirects FOR SELECT
  USING (enabled = true);

CREATE POLICY "Public can view published pages"
  ON public.pages FOR SELECT
  USING (published = true);

-- Admin policies
CREATE POLICY "Admins can manage navigation"
  ON public.navigation_items FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage redirects"
  ON public.redirects FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage pages"
  ON public.pages FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Triggers for updated_at
CREATE TRIGGER update_navigation_items_updated_at
  BEFORE UPDATE ON public.navigation_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_timestamp();

CREATE TRIGGER update_redirects_updated_at
  BEFORE UPDATE ON public.redirects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_timestamp();

CREATE TRIGGER update_pages_updated_at
  BEFORE UPDATE ON public.pages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_timestamp();

-- Insert default navigation structure
INSERT INTO public.navigation_items (label, path, parent_id, display_order, visible) VALUES
  ('Home', '/', NULL, 0, true),
  ('Projects', '/projects', NULL, 1, true),
  ('Research', '/research', NULL, 2, true),
  ('App Lab', '/app-lab', NULL, 3, true),
  ('Achievements', '/achievements', NULL, 4, true),
  ('Academics', '/academics', NULL, 5, true),
  ('Leadership', '/leadership', NULL, 6, true),
  ('Sandbox', '/sandbox', NULL, 7, true),
  ('Contact', '/contact', NULL, 8, true);

-- Get IDs for parent items to insert children
DO $$
DECLARE
  projects_id UUID;
  research_id UUID;
  applab_id UUID;
  contact_id UUID;
BEGIN
  SELECT id INTO projects_id FROM public.navigation_items WHERE path = '/projects' AND parent_id IS NULL;
  SELECT id INTO research_id FROM public.navigation_items WHERE path = '/research' AND parent_id IS NULL;
  SELECT id INTO applab_id FROM public.navigation_items WHERE path = '/app-lab' AND parent_id IS NULL;
  SELECT id INTO contact_id FROM public.navigation_items WHERE path = '/contact' AND parent_id IS NULL;

  -- Projects subpages
  INSERT INTO public.navigation_items (label, path, parent_id, display_order, visible) VALUES
    ('Software', '/projects/software', projects_id, 0, true),
    ('Algorithms', '/projects/algorithms', projects_id, 1, true),
    ('Creative Tech', '/projects/creative-tech', projects_id, 2, true),
    ('Teamwork', '/projects/teamwork', projects_id, 3, true),
    ('Archive', '/projects/archive', projects_id, 4, true);

  -- Research subpages
  INSERT INTO public.navigation_items (label, path, parent_id, display_order, visible) VALUES
    ('Philosophy of AI', '/research/philosophy-of-ai', research_id, 0, true),
    ('Essays', '/research/essays', research_id, 1, true),
    ('Reading List', '/research/reading-list', research_id, 2, true),
    ('Thought Graph', '/research/thought-graph', research_id, 3, true);

  -- App Lab subpages
  INSERT INTO public.navigation_items (label, path, parent_id, display_order, visible) VALUES
    ('Overview', '/app-lab/overview', applab_id, 0, true),
    ('UI Design', '/app-lab/ui-design', applab_id, 1, true),
    ('Dev Journal', '/app-lab/dev-journal', applab_id, 2, true),
    ('Tech Stack', '/app-lab/tech-stack', applab_id, 3, true),
    ('Beta Signup', '/app-lab/beta-signup', applab_id, 4, true);

  -- Contact subpages
  INSERT INTO public.navigation_items (label, path, parent_id, display_order, visible) VALUES
    ('QR Resume', '/contact/qr-resume', contact_id, 0, true);
END $$;

-- Insert default redirect (admin -> admin/login)
INSERT INTO public.redirects (from_path, to_path, type, enabled) VALUES
  ('/admin', '/admin/login', 'temporary', true);