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

const academicSchema = z.object({
  degree: z.string().trim().min(1, "Degree is required").max(200, "Degree must be less than 200 characters"),
  institution: z.string().trim().min(1, "Institution is required").max(200, "Institution must be less than 200 characters"),
  field_of_study: z.string().trim().max(200, "Field of study must be less than 200 characters").optional(),
  gpa: z.number().min(0).max(4.0, "GPA must be between 0 and 4.0").optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().trim().max(2000, "Description must be less than 2000 characters").optional(),
  display_order: z.number().int().min(0).max(9999).default(0),
});

type AcademicFormData = z.infer<typeof academicSchema>;

interface Academic {
  id: string;
  degree: string;
  institution: string;
  field_of_study?: string;
  gpa?: number;
  start_date?: string;
  end_date?: string;
  current: boolean;
  description?: string;
  display_order: number;
}

const AcademicsManager = () => {
  const [academics, setAcademics] = useState<Academic[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<AcademicFormData>({
    resolver: zodResolver(academicSchema),
    defaultValues: {
      degree: "",
      institution: "",
      field_of_study: "",
      gpa: undefined,
      start_date: "",
      end_date: "",
      current: false,
      description: "",
      display_order: 0,
    },
  });

  useEffect(() => {
    fetchAcademics();
  }, []);

  const fetchAcademics = async () => {
    const { data, error } = await supabase
      .from('academics')
      .select('*')
      .order('display_order');
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setAcademics(data || []);
    }
  };

  const onSubmit = async (data: AcademicFormData) => {
    const academicData = {
      degree: data.degree,
      institution: data.institution,
      field_of_study: data.field_of_study || null,
      gpa: data.gpa || null,
      start_date: data.start_date || null,
      end_date: data.end_date || null,
      current: data.current,
      description: data.description || null,
      display_order: data.display_order,
    };

    if (editingId) {
      const { error } = await supabase
        .from('academics')
        .update(academicData)
        .eq('id', editingId);
      
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Academic info updated successfully" });
      }
    } else {
      const { error } = await supabase
        .from('academics')
        .insert([academicData]);
      
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Academic info created successfully" });
      }
    }

    handleCancel();
    fetchAcademics();
  };

  const handleEdit = (academic: Academic) => {
    setEditingId(academic.id);
    form.reset({
      degree: academic.degree,
      institution: academic.institution,
      field_of_study: academic.field_of_study || "",
      gpa: academic.gpa || undefined,
      start_date: academic.start_date || "",
      end_date: academic.end_date || "",
      current: academic.current,
      description: academic.description || "",
      display_order: academic.display_order,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this academic record?")) return;

    const { error } = await supabase
      .from('academics')
      .delete()
      .eq('id', id);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Academic record deleted successfully" });
      fetchAcademics();
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    form.reset({
      degree: "",
      institution: "",
      field_of_study: "",
      gpa: undefined,
      start_date: "",
      end_date: "",
      current: false,
      description: "",
      display_order: 0,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
        <h2 className="text-2xl font-bold mb-4">{editingId ? "Edit Academic Info" : "Add New Academic Info"}</h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="degree"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Degree *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Bachelor of Science" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="institution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institution *</FormLabel>
                    <FormControl>
                      <Input placeholder="University name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="field_of_study"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Field of Study</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Computer Science" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gpa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GPA</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        max="4"
                        placeholder="4.00"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                      />
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
                    <Textarea placeholder="Honors, relevant coursework, etc." rows={3} {...field} />
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
                    <FormLabel className="!mt-0">Currently Studying</FormLabel>
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
        <h2 className="text-2xl font-bold">Existing Academic Records</h2>
        {academics.map((academic) => (
          <Card key={academic.id} className="p-4 bg-card/50 backdrop-blur-sm border-primary/20">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold">{academic.degree}</h3>
                  {academic.current && (
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Current</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {academic.institution} • {academic.field_of_study} {academic.gpa && `• GPA: ${academic.gpa}`}
                </p>
                <p className="text-xs text-muted-foreground mb-2">
                  {academic.start_date} - {academic.current ? "Present" : academic.end_date}
                </p>
                <p className="text-sm">{academic.description}</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => handleEdit(academic)} variant="outline" size="sm">
                  <Edit size={16} />
                </Button>
                <Button onClick={() => handleDelete(academic.id)} variant="destructive" size="sm">
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

export default AcademicsManager;
