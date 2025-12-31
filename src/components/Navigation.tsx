import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, icons } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface NavItem {
  id: string;
  label: string;
  path: string;
  parent_id: string | null;
  visible: boolean;
  icon?: string;
  subpages?: NavItem[];
}

const DynamicIcon = ({ name, size = 14 }: { name: string; size?: number }) => {
  const LucideIcon = icons[name as keyof typeof icons];
  if (!LucideIcon) return null;
  return <LucideIcon size={size} />;
};

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location]);

  // Fetch navigation from database
  const { data: navItems } = useQuery({
    queryKey: ['navigation'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('navigation_items')
        .select('*')
        .eq('visible', true)
        .order('display_order');
      
      if (error) throw error;

      // Organize into tree structure
      const items: NavItem[] = data || [];
      const tree: NavItem[] = [];
      const itemMap = new Map<string, NavItem>();

      items.forEach(item => {
        itemMap.set(item.id, { ...item, subpages: [] });
      });

      items.forEach(item => {
        const navItem = itemMap.get(item.id)!;
        if (item.parent_id) {
          const parent = itemMap.get(item.parent_id);
          if (parent) {
            parent.subpages = parent.subpages || [];
            parent.subpages.push(navItem);
          }
        } else {
          tree.push(navItem);
        }
      });

      return tree;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const navLinks = navItems || [];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-primary/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-bold glow-text hover:scale-105 transition-transform"
        >
          MK
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <div
              key={link.path}
              className="relative group"
              onMouseEnter={() => link.subpages && link.subpages.length > 0 && setOpenDropdown(link.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to={link.path}
                className={`text-sm font-medium hover:text-primary transition-colors flex items-center gap-1 py-2 ${
                  location.pathname === link.path || (link.subpages && link.subpages.some(sub => location.pathname === sub.path))
                    ? "text-primary"
                    : ""
                }`}
              >
                {link.icon && <DynamicIcon name={link.icon} size={14} />}
                {link.label}
                {link.subpages && link.subpages.length > 0 && <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />}
              </Link>
              
              {/* Desktop Dropdown with improved UX */}
              {link.subpages && link.subpages.length > 0 && openDropdown === link.label && (
                <div 
                  className="absolute top-full left-0 mt-0 w-56 bg-background/98 backdrop-blur-md border border-primary/30 rounded-lg shadow-2xl z-50 py-2"
                  style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}
                >
                  {link.subpages.map((subpage) => (
                    <Link
                      key={subpage.path}
                      to={subpage.path}
                      className={`block px-5 py-3 text-sm hover:text-primary hover:bg-primary/10 transition-all duration-200 ${
                        location.pathname === subpage.path ? "text-primary bg-primary/10 font-semibold" : ""
                      }`}
                    >
                      {subpage.icon && <DynamicIcon name={subpage.icon} size={14} />}
                      {subpage.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-sm border-b border-primary/20 max-h-[70vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <div key={link.path}>
                <Link
                  to={link.path}
                  className={`block w-full text-left py-3 px-4 text-sm font-medium hover:text-primary hover:bg-primary/10 rounded-lg transition-all ${
                    location.pathname === link.path ? "text-primary bg-primary/10" : ""
                  }`}
                >
                  {link.icon && <DynamicIcon name={link.icon} size={14} />}
                  {link.label}
                </Link>
                
                {/* Mobile Subpages */}
                {link.subpages && link.subpages.length > 0 && (
                  <div className="ml-4 mt-1 space-y-1">
                    {link.subpages.map((subpage) => (
                      <Link
                        key={subpage.path}
                        to={subpage.path}
                        className={`block w-full text-left py-2 px-4 text-xs hover:text-primary hover:bg-primary/5 rounded-lg transition-all ${
                          location.pathname === subpage.path ? "text-primary bg-primary/5" : "text-muted-foreground"
                        }`}
                      >
                        {subpage.icon && <DynamicIcon name={subpage.icon} size={14} />}
                        {subpage.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
