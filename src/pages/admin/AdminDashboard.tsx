import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import StarfieldBackground from "@/components/StarfieldBackground";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, Loader2, Menu, Terminal, Home, ExternalLink } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { DashboardOverview } from "@/components/admin/DashboardOverview";
import ProjectsManager from "@/components/admin/ProjectsManager";
import ResearchManager from "@/components/admin/ResearchManager";
import AchievementsManager from "@/components/admin/AchievementsManager";
import LeadershipManager from "@/components/admin/LeadershipManager";
import AcademicsManager from "@/components/admin/AcademicsManager";
import AppLabManager from "@/components/admin/AppLabManager";
import SettingsManager from "@/components/admin/SettingsManager";
import NavigationManager from "@/components/admin/NavigationManager";
import RedirectsManager from "@/components/admin/RedirectsManager";
import PagesManager from "@/components/admin/PagesManager";
import { Badge } from "@/components/ui/badge";

const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAccess = async (userId: string) => {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle();

      if (error || !data) {
        navigate("/");
        return;
      }
      
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      }
      setLoading(false);
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/admin/login");
      } else {
        checkAdminAccess(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/admin/login");
      } else {
        setLoading(true);
        checkAdminAccess(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Terminal className="animate-pulse text-cyan-400 mx-auto mb-4" size={48} />
          <p className="font-mono text-cyan-400 text-sm animate-pulse">Initializing admin console...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return <DashboardOverview />;
      case "projects": return <ProjectsManager />;
      case "research": return <ResearchManager />;
      case "achievements": return <AchievementsManager />;
      case "leadership": return <LeadershipManager />;
      case "academics": return <AcademicsManager />;
      case "applab": return <AppLabManager />;
      case "navigation": return <NavigationManager />;
      case "redirects": return <RedirectsManager />;
      case "pages": return <PagesManager />;
      case "settings": return <SettingsManager />;
      default: return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>Admin Console | System Dashboard</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <StarfieldBackground />
      
      <SidebarProvider>
        <div className="relative z-10 flex min-h-screen w-full">
          <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          
          <div className="flex-1 flex flex-col">
            <header className="sticky top-0 z-20 bg-black/80 backdrop-blur-md border-b border-cyan-500/20 px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <SidebarTrigger className="text-cyan-400 hover:text-cyan-300">
                    <Menu size={20} />
                  </SidebarTrigger>
                  <div className="hidden md:flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/10 rounded border border-cyan-500/20">
                      <Terminal size={14} className="text-cyan-400" />
                      <span className="font-mono text-sm text-cyan-400">admin@system</span>
                    </div>
                    <span className="text-muted-foreground">/</span>
                    <Badge variant="outline" className="font-mono text-xs border-cyan-500/30 text-cyan-400">
                      {activeTab.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigate('/')} 
                    className="gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <Home size={14} />
                    <span className="hidden sm:inline">Visit Site</span>
                  </Button>
                  <div className="hidden md:block text-right">
                    <p className="text-xs font-mono text-muted-foreground">{user.email}</p>
                    <p className="text-xs font-mono text-green-400">● authenticated</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleLogout} 
                    className="gap-2 border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                  >
                    <LogOut size={14} />
                    <span className="hidden sm:inline">Exit</span>
                  </Button>
                </div>
              </div>
            </header>

            <main className="flex-1 p-6 overflow-auto bg-gradient-to-br from-background via-background to-cyan-950/5">
              <div className="max-w-7xl mx-auto">
                {renderContent()}
              </div>
            </main>

            <footer className="border-t border-cyan-500/10 px-6 py-2 bg-black/50">
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                <span>System: Lovable Cloud</span>
                <span>Session: Active</span>
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
            </footer>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminDashboard;
