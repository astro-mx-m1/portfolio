import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash2, Save, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const contentSchema = z.object({
  section: z.enum(["overview", "ui-design", "dev-journal", "tech-stack"]),
  title: z.string().trim().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  content: z.string().trim().min(1, "Content is required").max(10000, "Content must be less than 10000 characters"),
  image_url: z.string().trim().url("Must be a valid URL").max(500, "URL too long").optional().or(z.literal("")),
  display_order: z.number().int().min(0).max(9999).default(0),
});

type ContentFormData = z.infer<typeof contentSchema>;

interface AppLabContent {
  id: string;
  section: string;
  title: string;
  content: string;
  image_url?: string;
  display_order: number;
}

const AppLabManager = () => {
  const [contents, setContents] = useState<AppLabContent[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<ContentFormData>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      section: "overview",
      title: "",
      content: "",
      image_url: "",
      display_order: 0,
    },
  });

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    const { data, error } = await supabase
      .from('app_lab_content')
      .select('*')
      .order('section')
      .order('display_order');
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setContents(data || []);
    }
  };

  const onSubmit = async (data: ContentFormData) => {
    const contentData = {
      section: data.section,
      title: data.title,
      content: data.content,
      image_url: data.image_url || null,
      display_order: data.display_order,
    };

    if (editingId) {
      const { error } = await supabase
        .from('app_lab_content')
        .update(contentData)
        .eq('id', editingId);
      
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Content updated successfully" });
      }
    } else {
      const { error } = await supabase
        .from('app_lab_content')
        .insert([contentData]);
      
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Content created successfully" });
      }
    }

    handleCancel();
    fetchContents();
  };

  const handleEdit = (content: AppLabContent) => {
    setEditingId(content.id);
    form.reset({
      section: content.section as any,
      title: content.title,
      content: content.content,
      image_url: content.image_url || "",
      display_order: content.display_order,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this content?")) return;

    const { error } = await supabase
      .from('app_lab_content')
      .delete()
      .eq('id', id);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Content deleted successfully" });
      fetchContents();
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    form.reset({
      section: "overview",
      title: "",
      content: "",
      image_url: "",
      display_order: 0,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
        <h2 className="text-2xl font-bold mb-4">{editingId ? "Edit Content" : "Add New Content"}</h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="section"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="overview">Overview</SelectItem>
                        <SelectItem value="ui-design">UI Design</SelectItem>
                        <SelectItem value="dev-journal">Dev Journal</SelectItem>
                        <SelectItem value="tech-stack">Tech Stack</SelectItem>
                      </SelectContent>
                    </Select>
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
                      <Input placeholder="Content title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content *</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Content text (Markdown supported)" rows={6} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="display_order"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormLabel>Display Order</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="w-20"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="gap-2">
                <Save size={16} />
                {editingId ? "Update" : "Create"}
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
        <h2 className="text-2xl font-bold">Existing Content</h2>
        {['overview', 'ui-design', 'dev-journal', 'tech-stack'].map((section) => {
          const sectionContents = contents.filter((c) => c.section === section);
          if (sectionContents.length === 0) return null;

          return (
            <div key={section} className="space-y-2">
              <h3 className="text-lg font-bold capitalize">{section.replace('-', ' ')}</h3>
              {sectionContents.map((content) => (
                <Card key={content.id} className="p-4 bg-card/50 backdrop-blur-sm border-primary/20">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold">{content.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">{content.content}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => handleEdit(content)} variant="outline" size="sm">
                        <Edit size={16} />
                      </Button>
                      <Button onClick={() => handleDelete(content.id)} variant="destructive" size="sm">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AppLabManager;
