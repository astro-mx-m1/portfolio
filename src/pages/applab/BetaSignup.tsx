import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Rocket, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const betaSchema = z.object({
  name: z.string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters")
    .trim(),
  currentRole: z.string()
    .min(1, "Current role is required")
    .max(200, "Current role must be less than 200 characters")
    .trim(),
  excitement: z.string()
    .min(1, "Please share what excites you")
    .max(1000, "Message must be less than 1000 characters")
    .trim()
});

const BetaSignup = () => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof betaSchema>>({
    resolver: zodResolver(betaSchema),
    defaultValues: {
      name: "",
      email: "",
      currentRole: "",
      excitement: ""
    }
  });

  const handleSubmit = (values: z.infer<typeof betaSchema>) => {
    toast({
      title: "Application received!",
      description: "Thank you for your interest. We'll review your application and be in touch soon.",
    });
    form.reset();
  };

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>Beta Signup | Mithil Katkoria</title>
        <meta name="description" content="Join the StudySync beta program and be among the first to experience the future of collaborative learning." />
      </Helmet>
      
      <StarfieldBackground />
      <div className="relative z-10">
        <Navigation />
        
        <main className="container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <div className="text-center mb-12">
              <Rocket className="text-primary mx-auto mb-4" size={64} />
              <h1 className="text-5xl md:text-6xl font-bold mb-6 glow-text">
                Join the Beta
              </h1>
              <p className="text-xl text-muted-foreground">
                Be among the first to experience StudySync and help shape the future of collaborative learning.
              </p>
            </div>

            <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/20 glow-card">
              <h2 className="text-2xl font-bold mb-6">Beta Access Benefits</h2>
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary mt-1" size={20} />
                  <span>Early access to all features before public launch</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary mt-1" size={20} />
                  <span>Direct communication channel with the developer</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary mt-1" size={20} />
                  <span>Influence the product roadmap with your feedback</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary mt-1" size={20} />
                  <span>Free lifetime access as a founding user</span>
                </div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Your full name"
                            className="bg-muted/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="email"
                            placeholder="your.email@example.com"
                            className="bg-muted/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="currentRole"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Role</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="e.g., Student, Teacher, Professional"
                            className="bg-muted/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="excitement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What features are you most excited about?</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Tell us what you're looking for in a study collaboration tool..."
                            className="bg-muted/20 min-h-[100px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" size="lg">
                    Request Beta Access
                  </Button>
                </form>
              </Form>
            </Card>

            <p className="text-center text-sm text-muted-foreground mt-6">
              We'll review applications on a rolling basis. Expected beta launch: Q2 2025
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BetaSignup;
