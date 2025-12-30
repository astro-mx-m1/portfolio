import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SiteSetting {
  key: string;
  value: string;
  description?: string;
}

export const useSettings = () => {
  return useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');
      
      if (error) throw error;
      
      // Convert to key-value map for easy access
      const settingsMap: Record<string, string> = {};
      data?.forEach(setting => {
        settingsMap[setting.key] = setting.value;
      });
      
      return {
        settings: data || [],
        settingsMap
      };
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchOnMount: false, // Don't refetch if data is cached
    refetchOnWindowFocus: false, // Don't refetch on window focus
  });
};

export const getSetting = (settingsMap: Record<string, string>, key: string, defaultValue: string = '') => {
  return settingsMap[key] || defaultValue;
};

export const getSettingBool = (settingsMap: Record<string, string>, key: string, defaultValue: boolean = false) => {
  const value = settingsMap[key];
  if (!value) return defaultValue;
  return value.toLowerCase() === 'true';
};