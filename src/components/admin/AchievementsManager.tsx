import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash2, Save, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const achievementSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  description: z.string().trim().max(2000, "Description must be less than 2000 characters").optional(),
  date: z.string().optional(),
  category: z.string().trim().max(100, "Category must be less than 100 characters").optional(),
  image_url: z.string().trim().url("Must be a valid URL").max(500, "URL too long").optional().or(z.literal("")),
  display_order: z.number().int().min(0).max(9999).default(0),
});

type AchievementFormData = z.infer<typeof achievementSchema>;

interface Achievement {
  id: string;
  title: string;
  description?: string;
  date?: string;
  category?: string;
  image_url?: string;
  display_order: number;
}

const AchievementsManager = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<AchievementFormData>({
    resolver: zodResolver(achievementSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date().toISOString().split('T')[0],
      category: "",
      image_url: "",
      display_order: 0,
    },
  });

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('display_order');
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setAchievements(data || []);
    }
  };

  const onSubmit = async (data: AchievementFormData) => {
    const achievementData = {
      title: data.title,
      description: data.description || null,
      date: data.date || null,
      category: data.category || null,
      image_url: data.image_url || null,
      display_order: data.display_order,
    };

    if (editingId) {
      const { error } = await supabase
        .from('achievements')
        .update(achievementData)
        .eq('id', editingId);
      
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Achievement updated successfully" });
      }
    } else {
      const { error } = await supabase
        .from('achievements')
        .insert([achievementData]);
      
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Achievement created successfully" });
      }
    }

    handleCancel();
    fetchAchievements();
  };

  const handleEdit = (achievement: Achievement) => {
    setEditingId(achievement.id);
    form.reset({
      title: achievement.title,
      description: achievement.description || "",
      date: achievement.date || "",
      category: achievement.category || "",
      image_url: achievement.image_url || "",
      display_order: achievement.display_order,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this achievement?")) return;

    const { error } = await supabase
      .from('achievements')
      .delete()
      .eq('id', id);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Achievement deleted successfully" });
      fetchAchievements();
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    form.reset({
      title: "",
      description: "",
      date: new Date().toISOString().split('T')[0],
      category: "",
      image_url: "",
      display_order: 0,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
        <h2 className="text-2xl font-bold mb-4">{editingId ? "Edit Achievement" : "Add New Achievement"}</h2>
        
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
                      <Input placeholder="Achievement title" {...field} />
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
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Certification, Award, Competition" {...field} />
                    </FormControl>
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
                    <Textarea placeholder="Achievement description" rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
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
        <h2 className="text-2xl font-bold">Existing Achievements</h2>
        {achievements.map((achievement) => (
          <Card key={achievement.id} className="p-4 bg-card/50 backdrop-blur-sm border-primary/20">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-bold">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{achievement.category} • {achievement.date}</p>
                <p className="text-sm">{achievement.description}</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => handleEdit(achievement)} variant="outline" size="sm">
                  <Edit size={16} />
                </Button>
                <Button onClick={() => handleDelete(achievement.id)} variant="destructive" size="sm">
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

export default AchievementsManager;
