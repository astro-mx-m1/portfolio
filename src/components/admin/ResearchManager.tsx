import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash2, Save, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const articleSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  content: z.string().trim().min(1, "Content is required").max(50000, "Content must be less than 50000 characters"),
  category: z.enum(["philosophy-of-ai", "essays", "thought-graph"]),
  excerpt: z.string().trim().max(500, "Excerpt must be less than 500 characters").optional(),
  published_date: z.string().optional(),
  featured: z.boolean().default(false),
  display_order: z.number().int().min(0).max(9999).default(0),
});

type ArticleFormData = z.infer<typeof articleSchema>;

interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  excerpt?: string;
  published_date?: string;
  featured: boolean;
  display_order: number;
}

const ResearchManager = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "essays",
      excerpt: "",
      published_date: new Date().toISOString().split('T')[0],
      featured: false,
      display_order: 0,
    },
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from('research_articles')
      .select('*')
      .order('display_order');
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setArticles(data || []);
    }
  };

  const onSubmit = async (data: ArticleFormData) => {
    const articleData = {
      title: data.title,
      content: data.content,
      category: data.category,
      excerpt: data.excerpt || null,
      published_date: data.published_date || null,
      featured: data.featured,
      display_order: data.display_order,
    };

    if (editingId) {
      const { error } = await supabase
        .from('research_articles')
        .update(articleData)
        .eq('id', editingId);
      
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Article updated successfully" });
      }
    } else {
      const { error } = await supabase
        .from('research_articles')
        .insert([articleData]);
      
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Article created successfully" });
      }
    }

    handleCancel();
    fetchArticles();
  };

  const handleEdit = (article: Article) => {
    setEditingId(article.id);
    form.reset({
      title: article.title,
      content: article.content,
      category: article.category as any,
      excerpt: article.excerpt || "",
      published_date: article.published_date || "",
      featured: article.featured,
      display_order: article.display_order,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    const { error } = await supabase
      .from('research_articles')
      .delete()
      .eq('id', id);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Article deleted successfully" });
      fetchArticles();
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    form.reset({
      title: "",
      content: "",
      category: "essays",
      excerpt: "",
      published_date: new Date().toISOString().split('T')[0],
      featured: false,
      display_order: 0,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
        <h2 className="text-2xl font-bold mb-4">{editingId ? "Edit Article" : "Add New Article"}</h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="Article title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="philosophy-of-ai">Philosophy of AI</SelectItem>
                        <SelectItem value="essays">Essays</SelectItem>
                        <SelectItem value="thought-graph">Thought Graph</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Brief summary or excerpt" rows={2} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content *</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Full article content (Markdown supported)" rows={8} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-6">
              <FormField
                control={form.control}
                name="published_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Published Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="!mt-0">Featured</FormLabel>
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
        <h2 className="text-2xl font-bold">Existing Articles</h2>
        {articles.map((article) => (
          <Card key={article.id} className="p-4 bg-card/50 backdrop-blur-sm border-primary/20">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold">{article.title}</h3>
                  {article.featured && (
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Featured</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{article.category} • {article.published_date}</p>
                <p className="text-sm">{article.excerpt}</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => handleEdit(article)} variant="outline" size="sm">
                  <Edit size={16} />
                </Button>
                <Button onClick={() => handleDelete(article.id)} variant="destructive" size="sm">
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ResearchManager;
