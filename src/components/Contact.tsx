import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useSettings, getSetting } from "@/hooks/useSettings";
import SocialLinks from "@/components/SocialLinks";

const contactSchema = z.object({
  name: z.string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters")
    .trim(),
  message: z.string()
    .min(1, "Message is required")
    .max(1000, "Message must be less than 1000 characters")
    .trim()
});

const Contact = () => {
  const { toast } = useToast();
  const { data } = useSettings();
  
  const email = data ? getSetting(data.settingsMap, 'contact_email', 'hello@example.com') : 'hello@example.com';
  const githubUrl = data ? getSetting(data.settingsMap, 'github_url', 'https://github.com') : 'https://github.com';
  const linkedinUrl = data ? getSetting(data.settingsMap, 'linkedin_url', 'https://linkedin.com') : 'https://linkedin.com';
  
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const handleSubmit = (values: z.infer<typeof contactSchema>) => {
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    form.reset();
  };

  return (
    <section id="contact" className="py-24 px-4 relative bg-gradient-to-t from-background to-muted/20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text">Get In Touch</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Interested in collaborating, discussing ideas, or just saying hello? I'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="p-8 bg-card border-primary/30 glow-card">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Name</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="bg-background border-primary/30 focus:border-primary"
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
                      <FormLabel className="font-semibold">Email</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="email"
                          className="bg-background border-primary/30 focus:border-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          className="bg-background border-primary/30 focus:border-primary min-h-[150px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-border font-semibold"
                >
                  <Mail size={16} className="mr-2" />
                  Send Message
                </Button>
              </form>
            </Form>
          </Card>

          {/* Links & Info */}
          <div className="space-y-6">
            <Card className="p-6 bg-card border-primary/20 hover:border-primary/50 transition-all glow-card">
              <h3 className="font-bold text-xl mb-4">Connect With Me</h3>
              <div className="space-y-4">
                {githubUrl && (
                  <a 
                    href={githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors group"
                  >
                    <Github className="text-primary group-hover:scale-110 transition-transform" size={24} />
                    <div>
                      <div className="font-semibold">GitHub</div>
                      <div className="text-sm text-muted-foreground">View my code and projects</div>
                    </div>
                  </a>
                )}
                {linkedinUrl && (
                  <a 
                    href={linkedinUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors group"
                  >
                    <Linkedin className="text-primary group-hover:scale-110 transition-transform" size={24} />
                    <div>
                      <div className="font-semibold">LinkedIn</div>
                      <div className="text-sm text-muted-foreground">Professional network</div>
                    </div>
                  </a>
                )}
                {email && (
                  <a 
                    href={`mailto:${email}`} 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors group"
                  >
                    <Mail className="text-primary group-hover:scale-110 transition-transform" size={24} />
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-sm text-muted-foreground">{email}</div>
                    </div>
                  </a>
                )}
              </div>
              <div className="mt-6 flex justify-center">
                <SocialLinks />
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-secondary/10 to-primary/10 border-secondary/30">
              <h3 className="font-bold text-xl mb-3">Download Resume</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get a comprehensive overview of my education, skills, and achievements.
              </p>
              <Button 
                variant="outline" 
                className="w-full border-primary/50 hover:bg-primary/10 font-semibold"
              >
                <FileText size={16} className="mr-2" />
                Download CV (PDF)
              </Button>
            </Card>

            <div className="text-center text-sm text-muted-foreground p-6">
              <p className="font-mono">$ whoami</p>
              <p className="mt-2">Student • Programmer • Thinker</p>
              <p className="mt-1">Avanti House Secondary School</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
