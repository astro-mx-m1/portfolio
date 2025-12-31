import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Edit, Save, X, Plus, Trash2, Power, PowerOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const redirectSchema = z.object({
  from_path: z.string().trim().min(1, "From path is required").max(500).regex(/^\//, "Path must start with /"),
  to_path: z.string().trim().min(1, "To path is required").max(500),
  type: z.enum(['permanent', 'temporary']),
  enabled: z.boolean().default(true),
});

type RedirectFormData = z.infer<typeof redirectSchema>;

interface Redirect {
  id: string;
  from_path: string;
  to_path: string;
  type: string;
  enabled: boolean;
}

const RedirectsManager = () => {
  const [redirects, setRedirects] = useState<Redirect[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<RedirectFormData>({
    resolver: zodResolver(redirectSchema),
    defaultValues: {
      from_path: "",
      to_path: "",
      type: 'temporary',
      enabled: true,
    },
  });

  useEffect(() => {
    fetchRedirects();
  }, []);

  const fetchRedirects = async () => {
    const { data, error } = await supabase
      .from('redirects')
      .select('*')
      .order('from_path');
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setRedirects(data || []);
    }
  };

  const onSubmit = async (data: RedirectFormData) => {
    const redirectData = {
      from_path: data.from_path,
      to_path: data.to_path,
      type: data.type,
      enabled: data.enabled,
    };

    if (editingId) {
      const { error } = await supabase
        .from('redirects')
        .update(redirectData)
        .eq('id', editingId);
      
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Redirect updated" });
      }
    } else {
      const { error } = await supabase
        .from('redirects')
        .insert([redirectData]);
      
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Redirect created" });
      }
    }

    handleCancel();
    fetchRedirects();
  };

  const handleEdit = (redirect: Redirect) => {
    setEditingId(redirect.id);
    form.reset({
      from_path: redirect.from_path,
      to_path: redirect.to_path,
      type: redirect.type as 'permanent' | 'temporary',
      enabled: redirect.enabled,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this redirect?")) return;

    const { error } = await supabase
      .from('redirects')
      .delete()
      .eq('id', id);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Redirect deleted" });
      fetchRedirects();
    }
  };

  const handleToggle = async (id: string, enabled: boolean) => {
    const { error } = await supabase
      .from('redirects')
      .update({ enabled: !enabled })
      .eq('id', id);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: `Redirect ${!enabled ? 'enabled' : 'disabled'}` });
      fetchRedirects();
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    form.reset({
      from_path: "",
      to_path: "",
      type: 'temporary',
      enabled: true,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold glow-text mb-2">URL Redirects Manager</h2>
        <p className="text-muted-foreground">Create automatic redirects from one URL to another (e.g., /admin → /admin/login)</p>
      </div>

      <Card className="glow-card p-6 bg-card/50 backdrop-blur-sm border-primary/20">
        <h3 className="text-2xl font-bold mb-4">{editingId ? "Edit Redirect" : "Add Redirect"}</h3>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="from_path"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From Path * {editingId && "(cannot be changed)"}</FormLabel>
                    <FormControl>
                      <Input placeholder="/old-page" disabled={!!editingId} {...field} />
                    </FormControl>
                    <FormDescription>Source URL to redirect from</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="to_path"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To Path *</FormLabel>
                    <FormControl>
                      <Input placeholder="/new-page" {...field} />
                    </FormControl>
                    <FormDescription>Destination URL</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Redirect Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="permanent">Permanent (301)</SelectItem>
                        <SelectItem value="temporary">Temporary (302)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Use permanent for SEO</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="enabled"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Enabled</FormLabel>
                      <FormDescription>Activate this redirect</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="gap-2">
                {editingId ? <Save size={16} /> : <Plus size={16} />}
                {editingId ? "Update Redirect" : "Create Redirect"}
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
        <h3 className="text-2xl font-bold">Active Redirects ({redirects.length})</h3>
        {redirects.length === 0 ? (
          <Card className="p-8 text-center bg-card/50 backdrop-blur-sm border-primary/20">
            <p className="text-muted-foreground">No redirects configured yet</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {redirects.map((redirect) => (
              <Card key={redirect.id} className={`p-4 glow-card bg-card/50 backdrop-blur-sm border-primary/20 ${!redirect.enabled ? 'opacity-60' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <code className="text-sm font-mono text-primary font-bold">{redirect.from_path}</code>
                      <span className="text-muted-foreground">→</span>
                      <code className="text-sm font-mono">{redirect.to_path}</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded ${redirect.type === 'permanent' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                        {redirect.type === 'permanent' ? '301 Permanent' : '302 Temporary'}
                      </span>
                      {!redirect.enabled && (
                        <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">Disabled</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button onClick={() => handleToggle(redirect.id, redirect.enabled)} variant="outline" size="sm">
                      {redirect.enabled ? <Power size={16} /> : <PowerOff size={16} />}
                    </Button>
                    <Button onClick={() => handleEdit(redirect)} variant="outline" size="sm">
                      <Edit size={16} />
                    </Button>
                    <Button onClick={() => handleDelete(redirect.id)} variant="destructive" size="sm">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RedirectsManager;