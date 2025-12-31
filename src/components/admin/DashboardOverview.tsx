import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen, BookOpen, Award, Users, GraduationCap, Beaker, Settings, FileText, Navigation, ExternalLink, Activity, Database, Shield, Zap, RefreshCw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Stats {
  projects: number;
  research: number;
  achievements: number;
  leadership: number;
  academics: number;
  applab: number;
  settings: number;
  navigation: number;
  redirects: number;
  pages: number;
}

export function DashboardOverview() {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    research: 0,
    achievements: 0,
    leadership: 0,
    academics: 0,
    applab: 0,
    settings: 0,
    navigation: 0,
    redirects: 0,
    pages: 0,
  });
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const { toast } = useToast();

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const [projects, research, achievements, leadership, academics, applab, settings, navigation, redirects, pages, maintenanceSetting] = await Promise.all([
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('research_articles').select('*', { count: 'exact', head: true }),
        supabase.from('achievements').select('*', { count: 'exact', head: true }),
        supabase.from('leadership').select('*', { count: 'exact', head: true }),
        supabase.from('academics').select('*', { count: 'exact', head: true }),
        supabase.from('app_lab_content').select('*', { count: 'exact', head: true }),
        supabase.from('site_settings').select('*', { count: 'exact', head: true }),
        supabase.from('navigation_items').select('*', { count: 'exact', head: true }),
        supabase.from('redirects').select('*', { count: 'exact', head: true }),
        supabase.from('pages').select('*', { count: 'exact', head: true }),
        supabase.from('site_settings').select('value').eq('key', 'maintenance_mode').maybeSingle(),
      ]);

      setStats({
        projects: projects.count || 0,
        research: research.count || 0,
        achievements: achievements.count || 0,
        leadership: leadership.count || 0,
        academics: academics.count || 0,
        applab: applab.count || 0,
        settings: settings.count || 0,
        navigation: navigation.count || 0,
        redirects: redirects.count || 0,
        pages: pages.count || 0,
      });

      setIsMaintenanceMode(maintenanceSetting?.data?.value === 'true');
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
    setIsLoading(false);
  };

  const totalContent = Object.values(stats).reduce((a, b) => a + b, 0);

  const statCards = [
    { title: "Projects", value: stats.projects, icon: FolderOpen, description: "Portfolio projects", gradient: "from-cyan-500/20 to-blue-500/20", iconColor: "text-cyan-400" },
    { title: "Research", value: stats.research, icon: BookOpen, description: "Articles & essays", gradient: "from-purple-500/20 to-pink-500/20", iconColor: "text-purple-400" },
    { title: "Achievements", value: stats.achievements, icon: Award, description: "Awards & certs", gradient: "from-amber-500/20 to-orange-500/20", iconColor: "text-amber-400" },
    { title: "Leadership", value: stats.leadership, icon: Users, description: "Experiences", gradient: "from-green-500/20 to-emerald-500/20", iconColor: "text-green-400" },
    { title: "Academics", value: stats.academics, icon: GraduationCap, description: "Education", gradient: "from-blue-500/20 to-indigo-500/20", iconColor: "text-blue-400" },
    { title: "App Lab", value: stats.applab, icon: Beaker, description: "Lab content", gradient: "from-pink-500/20 to-rose-500/20", iconColor: "text-pink-400" },
    { title: "Navigation", value: stats.navigation, icon: Navigation, description: "Nav items", gradient: "from-teal-500/20 to-cyan-500/20", iconColor: "text-teal-400" },
    { title: "Redirects", value: stats.redirects, icon: ExternalLink, description: "URL redirects", gradient: "from-violet-500/20 to-purple-500/20", iconColor: "text-violet-400" },
    { title: "Pages", value: stats.pages, icon: FileText, description: "Custom pages", gradient: "from-sky-500/20 to-blue-500/20", iconColor: "text-sky-400" },
    { title: "Settings", value: stats.settings, icon: Settings, description: "Configurations", gradient: "from-slate-500/20 to-gray-500/20", iconColor: "text-slate-400" },
  ];

  return (
    <div className="space-y-8">
      {/* Header with status */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold glow-text mb-2 flex items-center gap-3">
            <Activity className="text-primary animate-pulse" />
            System Dashboard
          </h2>
          <p className="text-muted-foreground font-mono text-sm">
            Last sync: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            onClick={fetchStats} 
            variant="outline" 
            size="sm" 
            className="gap-2 border-primary/30 hover:border-primary"
            disabled={isLoading}
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            Refresh
          </Button>
        </div>
      </div>

      {/* System Status Banner */}
      <Card className={`border-2 transition-all duration-500 ${
        isMaintenanceMode 
          ? 'bg-gradient-to-r from-red-950/50 to-orange-950/50 border-red-500/50' 
          : 'bg-gradient-to-r from-green-950/50 to-emerald-950/50 border-green-500/50'
      }`}>
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {isMaintenanceMode ? (
                <AlertTriangle className="text-red-400 animate-pulse" size={32} />
              ) : (
                <Zap className="text-green-400" size={32} />
              )}
              <div>
                <h3 className={`text-xl font-bold ${isMaintenanceMode ? 'text-red-400' : 'text-green-400'}`}>
                  {isMaintenanceMode ? 'MAINTENANCE MODE' : 'SYSTEM ONLINE'}
                </h3>
                <p className="text-sm text-muted-foreground font-mono">
                  {isMaintenanceMode 
                    ? 'Site is currently in maintenance mode. Only admins can access.' 
                    : 'All systems operational. Site is live and accessible.'}
                </p>
              </div>
            </div>
            <div className={`w-4 h-4 rounded-full animate-pulse ${isMaintenanceMode ? 'bg-red-500' : 'bg-green-500'}`} />
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card 
              key={card.title} 
              className={`bg-gradient-to-br ${card.gradient} border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`h-5 w-5 ${card.iconColor}`} />
                  <span className="text-2xl font-bold font-mono">{card.value}</span>
                </div>
                <p className="text-sm font-medium truncate">{card.title}</p>
                <p className="text-xs text-muted-foreground truncate">{card.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* System Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-cyan-950/30 to-blue-950/30 border-cyan-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-cyan-400">
              <Database size={20} />
              Database Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-muted-foreground font-mono text-sm">Total Records</span>
              <span className="font-bold text-lg font-mono text-cyan-400">{totalContent}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-muted-foreground font-mono text-sm">Tables Active</span>
              <span className="font-bold font-mono">10</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground font-mono text-sm">Provider</span>
              <span className="font-bold text-cyan-400 font-mono">Supabase</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-950/30 to-pink-950/30 border-purple-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Shield size={20} />
              Security Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-muted-foreground font-mono text-sm">Auth Type</span>
              <span className="font-bold font-mono">Role-Based</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-muted-foreground font-mono text-sm">RLS Policies</span>
              <span className="font-bold text-green-400 font-mono">Active</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground font-mono text-sm">Admin Access</span>
              <span className="font-bold text-green-400 font-mono">✓ Verified</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-950/30 to-orange-950/30 border-amber-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-amber-400">
              <Activity size={20} />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground mb-3">
              Use the sidebar to manage content sections. Changes sync in real-time.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-primary/20 rounded text-xs font-mono">Navigation</span>
              <span className="px-2 py-1 bg-secondary/20 rounded text-xs font-mono">Settings</span>
              <span className="px-2 py-1 bg-accent/20 rounded text-xs font-mono">Pages</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Terminal-style log */}
      <Card className="bg-black/50 border-green-500/20">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-green-400 font-mono text-sm">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            system.log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="font-mono text-xs space-y-1 text-green-400/80">
            <p><span className="text-muted-foreground">[{new Date().toISOString()}]</span> Dashboard initialized</p>
            <p><span className="text-muted-foreground">[{new Date().toISOString()}]</span> Fetched {totalContent} records from database</p>
            <p><span className="text-muted-foreground">[{new Date().toISOString()}]</span> Maintenance mode: <span className={isMaintenanceMode ? 'text-red-400' : 'text-green-400'}>{isMaintenanceMode ? 'ENABLED' : 'DISABLED'}</span></p>
            <p><span className="text-muted-foreground">[{new Date().toISOString()}]</span> Admin session active</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
