import { Loader2 } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { useLocation } from "react-router-dom";

const SettingsLoader = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useSettings();
  const location = useLocation();

  // Don't block admin pages - they don't need settings to load
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isLoading && !data && !isAdminRoute) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return <>{children}</>;
};

export default SettingsLoader;
