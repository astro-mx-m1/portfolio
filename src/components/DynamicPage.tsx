import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import { Loader2 } from "lucide-react";

const DynamicPage = () => {
  const { slug } = useParams();

  const { data: page, isLoading } = useQuery({
    queryKey: ['page', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen bg-background relative">
        <StarfieldBackground />
        <Navigation />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <h1 className="text-4xl font-bold glow-text mb-4">Page Not Found</h1>
          <p className="text-muted-foreground">This page doesn't exist or hasn't been published yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>{page.title}</title>
        {page.meta_description && <meta name="description" content={page.meta_description} />}
      </Helmet>
      
      <StarfieldBackground />
      <Navigation />
      
      <main className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold glow-text mb-8">{page.title}</h1>
          {page.content && (
            <div className="prose prose-invert max-w-none">
              <div className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                {page.content}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DynamicPage;
