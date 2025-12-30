import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Edit, Save, X, Plus, Trash2, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

const pageSchema = z.object({
  slug: z.string().trim().min(1, "Slug is required").max(200).regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and hyphens only"),
  title: z.string().trim().min(1, "Title is required").max(200),
  content: z.string().max(50000).optional(),
  meta_description: z.string().max(500).optional(),
  published: z.boolean().default(false),
});

type PageFormData = z.infer<typeof pageSchema>;

interface Page {
  id: string;
  slug: string;
  title: string;
  content?: string;
  meta_description?: string;
  published: boolean;
}

const PagesManager = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<PageFormData>({
    resolver: zodResolver(pageSchema),
    defaultValues: {
      slug: "",
      title: "",
      content: "",
      meta_description: "",
      published: false,
    },
  });

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .order('slug');
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setPages(data || []);
    }
  };

  const onSubmit = async (data: PageFormData) => {
    const pageData = {
      slug: data.slug,
      title: data.title,
      content: data.content || null,
      meta_description: data.meta_description || null,
      published: data.published,
    };

    if (editingId) {
      const { error } = await supabase
        .from('pages')
        .update(pageData)
        .eq('id', editingId);
      
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Page updated" });
      }
    } else {
      const { error } = await supabase
        .from('pages')
        .insert([pageData]);
      
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ 
          title: "Success", 
          description: `Page created! Access it at /page/${pageData.slug}. Add it to navigation for easy access.`,
          duration: 5000
        });
      }
    }

    handleCancel();
    fetchPages();
  };

  const handleEdit = (page: Page) => {
    setEditingId(page.id);
    form.reset({
      slug: page.slug,
      title: page.title,
      content: page.content || "",
      meta_description: page.meta_description || "",
      published: page.published,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this page?")) return;

    const { error } = await supabase
      .from('pages')
      .delete()
      .eq('id', id);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Page deleted" });
      fetchPages();
    }
  };

  const handleTogglePublish = async (id: string, published: boolean) => {
    const { error } = await supabase
      .from('pages')
      .update({ published: !published })
      .eq('id', id);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: `Page ${!published ? 'published' : 'unpublished'}` });
      fetchPages();
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    form.reset({
      slug: "",
      title: "",
      content: "",
      meta_description: "",
      published: false,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold glow-text mb-2">Pages Manager</h2>
        <p className="text-muted-foreground">Create custom pages. They'll be accessible at <code className="bg-primary/10 px-2 py-1 rounded text-primary">/page/your-slug</code>. Add them to Navigation for easy access.</p>
      </div>

      <Card className="glow-card p-6 bg-card/50 backdrop-blur-sm border-primary/20">
        <h3 className="text-2xl font-bold mb-4">{editingId ? "Edit Page" : "Create Page"}</h3>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug * {editingId && "(cannot be changed)"}</FormLabel>
                    <FormControl>
                      <Input placeholder="about-us" disabled={!!editingId} {...field} />
                    </FormControl>
                    <FormDescription>URL-friendly identifier (lowercase, hyphens)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="About Us" {...field} />
                    </FormControl>
                    <FormDescription>Page title</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="meta_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Learn more about our company..." {...field} />
                  </FormControl>
                  <FormDescription>SEO description (150-160 characters)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Page content..." rows={8} {...field} />
                  </FormControl>
                  <FormDescription>Page content (supports Markdown)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Published</FormLabel>
                    <FormDescription>Make this page public</FormDescription>
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
                {editingId ? "Update Page" : "Create Page"}
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
        <h3 className="text-2xl font-bold">Custom Pages ({pages.length})</h3>
        {pages.length === 0 ? (
          <Card className="p-8 text-center bg-card/50 backdrop-blur-sm border-primary/20">
            <p className="text-muted-foreground">No custom pages yet</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pages.map((page) => (
              <Card key={page.id} className={`p-4 glow-card bg-card/50 backdrop-blur-sm border-primary/20 ${!page.published ? 'opacity-60' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-bold truncate">{page.title}</h4>
                    <code className="text-xs text-muted-foreground font-mono">/page/{page.slug}</code>
                    {page.meta_description && (
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{page.meta_description}</p>
                    )}
                    <div className="mt-2">
                      {page.published ? (
                        <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400">Published</span>
                      ) : (
                        <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">Draft</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 flex-shrink-0 ml-2">
                    <Button onClick={() => handleTogglePublish(page.id, page.published)} variant="outline" size="sm">
                      {page.published ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                    <Button onClick={() => handleEdit(page)} variant="outline" size="sm">
                      <Edit size={16} />
                    </Button>
                    <Button onClick={() => handleDelete(page.id)} variant="destructive" size="sm">
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

export default PagesManager;