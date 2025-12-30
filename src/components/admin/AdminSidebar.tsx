import { NavLink } from "react-router-dom";
import { LayoutDashboard, FolderOpen, BookOpen, Award, Users, GraduationCap, Beaker, Settings, Navigation as NavIcon, ExternalLink, FileText, Home, Terminal, Cpu, Activity } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

const adminItems = [
  { title: "Overview", value: "overview", icon: LayoutDashboard, badge: null },
  { title: "Projects", value: "projects", icon: FolderOpen, badge: null },
  { title: "Research", value: "research", icon: BookOpen, badge: null },
  { title: "Achievements", value: "achievements", icon: Award, badge: null },
  { title: "Leadership", value: "leadership", icon: Users, badge: null },
  { title: "Academics", value: "academics", icon: GraduationCap, badge: null },
  { title: "App Lab", value: "applab", icon: Beaker, badge: null },
  { title: "Navigation", value: "navigation", icon: NavIcon, badge: null },
  { title: "Redirects", value: "redirects", icon: ExternalLink, badge: null },
  { title: "Pages", value: "pages", icon: FileText, badge: null },
  { title: "Settings", value: "settings", icon: Settings, badge: "SYS" },
];

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  const { state } = useSidebar();

  return (
    <Sidebar className={`${state === "collapsed" ? "w-16" : "w-64"} bg-black/50 border-r border-cyan-500/20`}>
      <SidebarContent className="bg-gradient-to-b from-cyan-950/20 to-purple-950/20">
        <div className="p-4 border-b border-cyan-500/20">
          {state !== "collapsed" ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <Terminal className="text-white" size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-cyan-400 font-mono">ADMIN</h2>
                <p className="text-xs text-muted-foreground font-mono">v2.0.0</p>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 mx-auto rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
              <Terminal className="text-white" size={16} />
            </div>
          )}
        </div>

        {state !== "collapsed" && (
          <div className="px-4 py-3 border-b border-cyan-500/10">
            <div className="flex items-center gap-2 text-xs font-mono text-green-400">
              <Activity size={12} className="animate-pulse" />
              <span>SYSTEM ACTIVE</span>
            </div>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className="text-cyan-400/60 font-mono text-xs px-4">
            {state !== "collapsed" && "// MODULES"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item, index) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton
                    onClick={() => onTabChange(item.value)}
                    className={`relative transition-all duration-200 ${
                      activeTab === item.value 
                        ? "bg-cyan-500/20 text-cyan-400 border-l-2 border-cyan-400" 
                        : "hover:bg-white/5 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <item.icon size={18} className={activeTab === item.value ? "text-cyan-400" : ""} />
                      {state !== "collapsed" && (
                        <>
                          <span className="flex-1 font-mono text-sm">{item.title}</span>
                          {item.badge && (
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-cyan-500/30 text-cyan-400">
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {state !== "collapsed" && (
          <div className="mt-auto p-4 border-t border-cyan-500/10">
            <div className="bg-gradient-to-r from-cyan-950/50 to-purple-950/50 rounded-lg p-3 border border-cyan-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Cpu size={14} className="text-cyan-400" />
                <span className="text-xs font-mono text-cyan-400">System Status</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-muted-foreground">Database</span>
                  <span className="text-green-400">●</span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-muted-foreground">Auth</span>
                  <span className="text-green-400">●</span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-muted-foreground">CDN</span>
                  <span className="text-green-400">●</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
