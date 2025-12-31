import { useSettings, getSettingBool } from "@/hooks/useSettings";
import { Construction } from "lucide-react";
import StarfieldBackground from "@/components/StarfieldBackground";
import { useLocation } from "react-router-dom";

interface MaintenanceModeProps {
  children: React.ReactNode;
}

const MaintenanceMode = ({ children }: MaintenanceModeProps) => {
  const { data } = useSettings();
  const location = useLocation();

  const isMaintenanceMode = data ? getSettingBool(data.settingsMap, 'maintenance_mode') : false;
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Allow admin routes even in maintenance mode
  if (isMaintenanceMode && !isAdminRoute) {
    return (
      <div className="min-h-screen bg-background relative flex items-center justify-center">
        <StarfieldBackground />
        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
          <Construction size={80} className="text-primary mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl font-bold glow-text mb-4">Site Under Maintenance</h1>
          <p className="text-lg text-muted-foreground mb-6">
            We're currently performing scheduled maintenance to improve your experience.
          </p>
          <p className="text-sm text-muted-foreground">
            We'll be back shortly. Thank you for your patience!
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default MaintenanceMode;