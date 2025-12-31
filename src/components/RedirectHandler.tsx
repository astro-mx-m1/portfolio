import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const RedirectHandler = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: redirects } = useQuery({
    queryKey: ['redirects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('redirects')
        .select('*')
        .eq('enabled', true);
      
      if (error) throw error;
      return data || [];
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  useEffect(() => {
    if (!redirects) return;
    
    const redirect = redirects.find(r => r.from_path === location.pathname);
    if (redirect) {
      navigate(redirect.to_path, { replace: true });
    }
  }, [location.pathname, redirects, navigate]);

  return <>{children}</>;
};

export default RedirectHandler;
