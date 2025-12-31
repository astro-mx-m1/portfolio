import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash2, Save, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const leadershipSchema = z.object({
  role: z.string().trim().min(1, "Role is required").max(200, "Role must be less than 200 characters"),
  organization: z.string().trim().min(1, "Organization is required").max(200, "Organization must be less than 200 characters"),
  description: z.string().trim().max(2000, "Description must be less than 2000 characters").optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  current: z.boolean().default(false),
  display_order: z.number().int().min(0).max(9999).default(0),
});

type LeadershipFormData = z.infer<typeof leadershipSchema>;

interface Leadership {
  id: string;
  role: string;
  organization: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  current: boolean;
  display_order: number;
}

const LeadershipManager = () => {
  const [experiences, setExperiences] = useState<Leadership[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<LeadershipFormData>({
    resolver: zodResolver(leadershipSchema),
    defaultValues: {
      role: "",
      organization: "",
      description: "",
      start_date: "",
      end_date: "",
      current: false,
      display_order: 0,
    },
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    const { data, error } = await supabase
      .from('leadership')
      .select('*')
      .order('display_order');
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setExperiences(data || []);
    }
  };

  const onSubmit = async (data: LeadershipFormData) => {
    const leadershipData = {
      role: data.role,
      organization: data.organization,
      description: data.description || null,
      start_date: data.start_date || null,
      end_date: data.end_date || null,
      current: data.current,
      display_order: data.display_order,
    };

    if (editingId) {
      const { error } = await supabase
        .from('leadership')
        .update(leadershipData)
        .eq('id', editingId);
      
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Leadership updated successfully" });
      }
    } else {
      const { error } = await supabase
        .from('leadership')
        .insert([leadershipData]);
      
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Leadership created successfully" });
      }
    }

    handleCancel();
    fetchExperiences();
  };

  const handleEdit = (experience: Leadership) => {
    setEditingId(experience.id);
    form.reset({
      role: experience.role,
      organization: experience.organization,
      description: experience.description || "",
      start_date: experience.start_date || "",
      end_date: experience.end_date || "",
      current: experience.current,
      display_order: experience.display_order,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this leadership experience?")) return;

    const { error } = await supabase
      .from('leadership')
      .delete()
      .eq('id', id);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Leadership deleted successfully" });
      fetchExperiences();
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    form.reset({
      role: "",
      organization: "",
      description: "",
      start_date: "",
      end_date: "",
      current: false,
      display_order: 0,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
        <h2 className="text-2xl font-bold mb-4">{editingId ? "Edit Leadership" : "Add New Leadership"}</h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. President, Team Lead" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="organization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization *</FormLabel>
                    <FormControl>
                      <Input placeholder="Organization name" {...field} />
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
                    <Textarea placeholder="Describe your responsibilities and achievements" rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="date" disabled={form.watch("current")} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center gap-6">
              <FormField
                control={form.control}
                name="current"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          if (checked) form.setValue("end_date", "");
                        }}
                      />
                    </FormControl>
                    <FormLabel className="!mt-0">Current Position</FormLabel>
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
        <h2 className="text-2xl font-bold">Existing Leadership Experiences</h2>
        {experiences.map((experience) => (
          <Card key={experience.id} className="p-4 bg-card/50 backdrop-blur-sm border-primary/20">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold">{experience.role}</h3>
                  {experience.current && (
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Current</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {experience.organization} • {experience.start_date} - {experience.current ? "Present" : experience.end_date}
                </p>
                <p className="text-sm">{experience.description}</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => handleEdit(experience)} variant="outline" size="sm">
                  <Edit size={16} />
                </Button>
                <Button onClick={() => handleDelete(experience.id)} variant="destructive" size="sm">
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

export default LeadershipManager;
