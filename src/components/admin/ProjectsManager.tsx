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
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const projectSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  description: z.string().trim().max(2000, "Description must be less than 2000 characters").optional(),
  category: z.enum(["software", "algorithms", "creative-tech", "teamwork", "archive"]),
  technologies: z.string().trim().max(500, "Technologies must be less than 500 characters").optional(),
  github_url: z.string().trim().url("Must be a valid URL").max(500, "URL too long").optional().or(z.literal("")),
  demo_url: z.string().trim().url("Must be a valid URL").max(500, "URL too long").optional().or(z.literal("")),
  image_url: z.string().trim().url("Must be a valid URL").max(500, "URL too long").optional().or(z.literal("")),
  featured: z.boolean().default(false),
  display_order: z.number().int().min(0).max(9999).default(0),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  github_url?: string;
  demo_url?: string;
  image_url?: string;
  featured: boolean;
  display_order: number;
}

const ProjectsManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();
  
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "software",
      technologies: "",
      github_url: "",
      demo_url: "",
      image_url: "",
      featured: false,
      display_order: 0,
    },
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order');
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setProjects(data || []);
    }
  };

  const onSubmit = async (data: ProjectFormData) => {
    const techArray = data.technologies ? data.technologies.split(",").map(t => t.trim()).filter(t => t) : [];
    
    const projectData = {
      title: data.title,
      description: data.description || "",
      category: data.category,
      technologies: techArray,
      github_url: data.github_url || null,
      demo_url: data.demo_url || null,
      image_url: data.image_url || null,
      featured: data.featured,
      display_order: data.display_order,
    };

    if (editingId) {
      const { error } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', editingId);
      
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Project updated successfully" });
      }
    } else {
      const { error } = await supabase
        .from('projects')
        .insert([projectData]);
      
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Project created successfully" });
      }
    }

    handleCancel();
    fetchProjects();
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    form.reset({
      title: project.title,
      description: project.description,
      category: project.category as any,
      technologies: (project.technologies || []).join(", "),
      github_url: project.github_url || "",
      demo_url: project.demo_url || "",
      image_url: project.image_url || "",
      featured: project.featured,
      display_order: project.display_order,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Project deleted successfully" });
      fetchProjects();
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    form.reset({
      title: "",
      description: "",
      category: "software",
      technologies: "",
      github_url: "",
      demo_url: "",
      image_url: "",
      featured: false,
      display_order: 0,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
        <h2 className="text-2xl font-bold mb-4">{editingId ? "Edit Project" : "Add New Project"}</h2>
        
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
                      <Input placeholder="Project title" {...field} />
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
                        <SelectItem value="software">Software</SelectItem>
                        <SelectItem value="algorithms">Algorithms</SelectItem>
                        <SelectItem value="creative-tech">Creative Tech</SelectItem>
                        <SelectItem value="teamwork">Teamwork</SelectItem>
                        <SelectItem value="archive">Archive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Project description" rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="technologies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technologies (comma separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="React, TypeScript, Node.js" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="github_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://github.com/..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="demo_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Demo URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
            </div>

            <div className="flex items-center gap-6">
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
        <h2 className="text-2xl font-bold">Existing Projects</h2>
        {projects.map((project) => (
          <Card key={project.id} className="p-4 bg-card/50 backdrop-blur-sm border-primary/20">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  {project.featured && (
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Featured</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{project.category}</p>
                <p className="text-sm mb-2">{project.description}</p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="text-xs bg-secondary/20 px-2 py-1 rounded">{tech}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button onClick={() => handleEdit(project)} variant="outline" size="sm">
                  <Edit size={16} />
                </Button>
                <Button onClick={() => handleDelete(project.id)} variant="destructive" size="sm">
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

export default ProjectsManager;