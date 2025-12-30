-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('software', 'algorithms', 'creative-tech', 'teamwork', 'archive')),
  technologies TEXT[],
  github_url TEXT,
  demo_url TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create research articles table
CREATE TABLE IF NOT EXISTS public.research_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('philosophy-of-ai', 'essays', 'thought-graph')),
  excerpt TEXT,
  published_date DATE,
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  date DATE,
  category TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create leadership experiences table
CREATE TABLE IF NOT EXISTS public.leadership (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role TEXT NOT NULL,
  organization TEXT NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  current BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create academics table
CREATE TABLE IF NOT EXISTS public.academics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  degree TEXT NOT NULL,
  institution TEXT NOT NULL,
  field_of_study TEXT,
  gpa DECIMAL(3,2),
  start_date DATE,
  end_date DATE,
  current BOOLEAN DEFAULT false,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create app lab content table
CREATE TABLE IF NOT EXISTS public.app_lab_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL CHECK (section IN ('overview', 'ui-design', 'dev-journal', 'tech-stack')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create site settings table
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leadership ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_lab_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public read policies (anyone can view)
CREATE POLICY "Public can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public can view research" ON public.research_articles FOR SELECT USING (true);
CREATE POLICY "Public can view achievements" ON public.achievements FOR SELECT USING (true);
CREATE POLICY "Public can view leadership" ON public.leadership FOR SELECT USING (true);
CREATE POLICY "Public can view academics" ON public.academics FOR SELECT USING (true);
CREATE POLICY "Public can view app lab content" ON public.app_lab_content FOR SELECT USING (true);
CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT USING (true);

-- Admin write policies (only admins can modify)
CREATE POLICY "Admins can manage projects" ON public.projects 
FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) 
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage research" ON public.research_articles 
FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) 
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage achievements" ON public.achievements 
FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) 
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage leadership" ON public.leadership 
FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) 
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage academics" ON public.academics 
FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) 
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage app lab content" ON public.app_lab_content 
FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) 
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage site settings" ON public.site_settings 
FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) 
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create function to update updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_projects_timestamp BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_research_timestamp BEFORE UPDATE ON public.research_articles FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_achievements_timestamp BEFORE UPDATE ON public.achievements FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_leadership_timestamp BEFORE UPDATE ON public.leadership FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_academics_timestamp BEFORE UPDATE ON public.academics FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_app_lab_timestamp BEFORE UPDATE ON public.app_lab_content FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_settings_timestamp BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION update_timestamp();