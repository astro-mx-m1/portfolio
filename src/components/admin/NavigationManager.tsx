import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Edit, Save, X, Plus, Trash2, Eye, EyeOff, ArrowUp, ArrowDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const navSchema = z.object({
  label: z.string().trim().min(1, "Label is required").max(100),
  path: z.string().trim().min(1, "Path is required").max(500).regex(/^\//, "Path must start with /"),
  parent_id: z.string().optional(),
  visible: z.boolean().default(true),
  icon: z.string().max(50).optional(),
});

type NavFormData = z.infer<typeof navSchema>;

interface NavItem {
  id: string;
  label: string;
  path: string;
  parent_id: string | null;
  display_order: number;
  visible: boolean;
  icon?: string;
  children?: NavItem[];
}

const NavigationManager = () => {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<NavFormData>({
    resolver: zodResolver(navSchema),
    defaultValues: {
      label: "",
      path: "",
      parent_id: "",
      visible: true,
      icon: "",
    },
  });

  useEffect(() => {
    fetchNavItems();
  }, []);

  const fetchNavItems = async () => {
    const { data, error } = await supabase
      .from('navigation_items')
      .select('*')
      .order('display_order');
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      // Organize into tree structure
      const items = data || [];
      const tree: NavItem[] = [];
      const itemMap = new Map<string, NavItem>();

      items.forEach(item => {
        itemMap.set(item.id, { ...item, children: [] });
      });

      items.forEach(item => {
        const navItem = itemMap.get(item.id)!;
        if (item.parent_id) {
          const parent = itemMap.get(item.parent_id);
          if (parent) {
            parent.children = parent.children || [];
            parent.children.push(navItem);
          }
        } else {
          tree.push(navItem);
        }
      });

      setNavItems(tree);
    }
  };

  const onSubmit = async (data: NavFormData) => {
    const navData = {
      label: data.label,
      path: data.path,
      parent_id: data.parent_id || null,
      visible: data.visible,
      icon: data.icon || null,
    };

    if (editingId) {
      const { error } = await supabase
        .from('navigation_items')
        .update(navData)
        .eq('id', editingId);
      
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Navigation item updated" });
      }
    } else {
      const { error } = await supabase
        .from('navigation_items')
        .insert([navData]);
      
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Navigation item created" });
      }
    }

    handleCancel();
    fetchNavItems();
  };

  const handleEdit = (item: NavItem) => {
    setEditingId(item.id);
    form.reset({
      label: item.label,
      path: item.path,
      parent_id: item.parent_id || "",
      visible: item.visible,
      icon: item.icon || "",
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this navigation item and all its children?")) return;

    const { error } = await supabase
      .from('navigation_items')
      .delete()
      .eq('id', id);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Navigation item deleted" });
      fetchNavItems();
    }
  };

  const handleToggleVisibility = async (id: string, visible: boolean) => {
    const { error } = await supabase
      .from('navigation_items')
      .update({ visible: !visible })
      .eq('id', id);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Visibility updated" });
      fetchNavItems();
    }
  };

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    const allItems = [...navItems];
    const flatItems: NavItem[] = [];
    
    const flatten = (items: NavItem[]) => {
      items.forEach(item => {
        flatItems.push(item);
        if (item.children) flatten(item.children);
      });
    };
    flatten(allItems);

    const index = flatItems.findIndex(item => item.id === id);
    if (index === -1) return;
    
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= flatItems.length) return;

    const item1 = flatItems[index];
    const item2 = flatItems[swapIndex];

    await supabase.from('navigation_items').update({ display_order: item2.display_order }).eq('id', item1.id);
    await supabase.from('navigation_items').update({ display_order: item1.display_order }).eq('id', item2.id);

    fetchNavItems();
  };

  const handleCancel = () => {
    setEditingId(null);
    form.reset({
      label: "",
      path: "",
      parent_id: "",
      visible: true,
      icon: "",
    });
  };

  const renderNavTree = (items: NavItem[], level = 0) => {
    return items.map((item) => (
      <div key={item.id} className={`${level > 0 ? 'ml-8 mt-2' : 'mt-4'}`}>
        <Card className={`glow-card bg-card/50 backdrop-blur-sm border-primary/20 ${!item.visible ? 'opacity-60' : ''}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {item.icon && <span className="text-lg">{item.icon}</span>}
                  <h4 className="text-lg font-bold truncate">{item.label}</h4>
                  {!item.visible && <EyeOff size={16} className="text-muted-foreground" />}
                </div>
                <p className="text-sm text-muted-foreground font-mono">{item.path}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button onClick={() => handleReorder(item.id, 'up')} variant="outline" size="sm">
                  <ArrowUp size={16} />
                </Button>
                <Button onClick={() => handleReorder(item.id, 'down')} variant="outline" size="sm">
                  <ArrowDown size={16} />
                </Button>
                <Button onClick={() => handleToggleVisibility(item.id, item.visible)} variant="outline" size="sm">
                  {item.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                </Button>
                <Button onClick={() => handleEdit(item)} variant="outline" size="sm">
                  <Edit size={16} />
                </Button>
                <Button onClick={() => handleDelete(item.id)} variant="destructive" size="sm">
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        {item.children && item.children.length > 0 && renderNavTree(item.children, level + 1)}
      </div>
    ));
  };

  const getAllParentItems = () => {
    const parents: NavItem[] = [];
    const flatten = (items: NavItem[]) => {
      items.forEach(item => {
        parents.push(item);
        if (item.children) flatten(item.children);
      });
    };
    flatten(navItems);
    return parents;
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold glow-text mb-2">Navigation Manager</h2>
        <p className="text-muted-foreground">Control your website's navigation structure, links, and dropdowns</p>
      </div>

      <Card className="glow-card p-6 bg-card/50 backdrop-blur-sm border-primary/20">
        <h3 className="text-2xl font-bold mb-4">{editingId ? "Edit Navigation Item" : "Add Navigation Item"}</h3>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label *</FormLabel>
                    <FormControl>
                      <Input placeholder="Home" {...field} />
                    </FormControl>
                    <FormDescription>Display name in navigation</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="path"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Path *</FormLabel>
                    <FormControl>
                      <Input placeholder="/home" {...field} />
                    </FormControl>
                    <FormDescription>URL path (must start with /)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parent_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent Item</FormLabel>
                    <Select 
                      onValueChange={(value) => field.onChange(value === "none" ? "" : value)} 
                      value={field.value || "none"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="None (Top Level)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">None (Top Level)</SelectItem>
                        {getAllParentItems().map(item => (
                          <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Make this a dropdown item</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="🏠" {...field} />
                    </FormControl>
                    <FormDescription>Emoji or icon character</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="visible"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Visible</FormLabel>
                    <FormDescription>Show this item in navigation</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <Button type="submit" className="gap-2">
                {editingId ? <Save size={16} /> : <Plus size={16} />}
                {editingId ? "Update Item" : "Create Item"}
              </Button>
              {editingId && (
                <Button type="button" onClick={handleCancel} variant="outline" className="gap-2">
                  <X size={16} />
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Form>
      </Card>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold">Navigation Structure ({navItems.length} top-level items)</h3>
        {navItems.length === 0 ? (
          <Card className="p-8 text-center bg-card/50 backdrop-blur-sm border-primary/20">
            <p className="text-muted-foreground">No navigation items yet. Create your first one above!</p>
          </Card>
        ) : (
          renderNavTree(navItems)
        )}
      </div>
    </div>
  );
};

export default NavigationManager;