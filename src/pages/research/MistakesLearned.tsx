import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, ArrowRight, Code, Shield, Zap, Database, Eye } from "lucide-react";

const MistakesLearned = () => {
  const mistakes = [
    {
      icon: Zap,
      category: "Performance",
      title: "Client-Side Data Fetching Overload",
      mistake: "Originally, I fetched all projects client-side without pagination. With 50+ projects, the initial load was over 2 seconds.",
      impact: "Poor user experience, unnecessary bandwidth usage, and slow time-to-interactive.",
      solution: "Implemented server-side pagination with Supabase, loading 10 items at a time with infinite scroll.",
      lesson: "Optimize for the common case first. Most users never scroll past the first 10 items.",
      severity: "high"
    },
    {
      icon: Shield,
      category: "Security",
      title: "Missing Row Level Security",
      mistake: "Initially deployed database tables without RLS policies, assuming authentication alone was sufficient.",
      impact: "Any authenticated user could potentially read or modify any other user's data.",
      solution: "Added comprehensive RLS policies to all tables, with policies like `auth.uid() = user_id`.",
      lesson: "Authentication is who you are. Authorization is what you can do. Never confuse them.",
      severity: "critical"
    },
    {
      icon: Code,
      category: "Architecture",
      title: "God Component Anti-Pattern",
      mistake: "Built a 500+ line component that handled form validation, API calls, state management, and UI rendering all in one file.",
      impact: "Impossible to test, debug, or modify without breaking something.",
      solution: "Extracted into smaller components: FormFields, useFormValidation hook, API service layer, and pure UI components.",
      lesson: "If you can't describe what a component does in one sentence, it's doing too much.",
      severity: "medium"
    },
    {
      icon: Database,
      category: "Database Design",
      title: "Over-Normalized Schema",
      mistake: "Created 8 tables for what should have been 3, with complex JOIN operations for simple reads.",
      impact: "Each page load required 5+ database queries. API latency was terrible.",
      solution: "Denormalized frequently-accessed data. Accepted some redundancy for massive read performance gains.",
      lesson: "Normalization is a guideline, not a law. Optimize for your actual access patterns.",
      severity: "medium"
    },
    {
      icon: Eye,
      category: "UX",
      title: "Invisible Loading States",
      mistake: "Added loading spinners but placed them outside the viewport. Users thought the app was frozen.",
      impact: "Users would refresh the page multiple times, triggering duplicate API calls.",
      solution: "Added skeleton loaders in-place and disabled interaction during loading states.",
      lesson: "Every action needs visible feedback. If users can't see something happening, they assume nothing is.",
      severity: "high"
    },
    {
      icon: Code,
      category: "State Management",
      title: "Prop Drilling Through 7 Levels",
      mistake: "Passed authentication state down through 7 component layers instead of using context.",
      impact: "Every intermediate component had to know about auth, creating tight coupling throughout.",
      solution: "Created an AuthContext provider. Components now consume auth state only where needed.",
      lesson: "If you're passing props through components that don't use them, you need a different pattern.",
      severity: "medium"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-destructive/20 text-destructive border-destructive/30";
      case "high": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>Mistakes I've Made | Mithil Katkoria</title>
        <meta name="description" content="A brutally honest reflection on my mistakes in coding, architecture, and security—and what I learned from each." />
      </Helmet>
      
      <StarfieldBackground />
      <div className="relative z-10">
        <Navigation />
        
        <main className="container mx-auto px-4 py-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
                🗣 Ask me about this in interview
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 glow-text">
                Mistakes I've Made
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                A brutally honest page about bad decisions, bugs, and what I learned fixing them.
                Most students hide mistakes. I believe they're the fastest way to learn.
              </p>
            </div>

            <Card className="mb-12 bg-card/50 backdrop-blur-sm border-primary/20 glow-card">
              <CardContent className="p-8">
                <blockquote className="text-2xl font-medium italic text-center text-foreground/90">
                  "I believe mistakes are the fastest way to learn."
                </blockquote>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {mistakes.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card 
                    key={index}
                    className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 animate-fade-in overflow-hidden"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-destructive/10 rounded-lg">
                            <Icon className="text-destructive" size={24} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs">
                                {item.category}
                              </Badge>
                              <Badge className={`text-xs ${getSeverityColor(item.severity)}`}>
                                {item.severity}
                              </Badge>
                            </div>
                            <CardTitle className="text-xl">{item.title}</CardTitle>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-destructive/5 rounded-lg p-4 border border-destructive/20">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="text-destructive" size={16} />
                            <h4 className="font-semibold text-destructive">The Mistake</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.mistake}</p>
                        </div>
                        
                        <div className="bg-orange-500/5 rounded-lg p-4 border border-orange-500/20">
                          <div className="flex items-center gap-2 mb-2">
                            <Zap className="text-orange-400" size={16} />
                            <h4 className="font-semibold text-orange-400">The Impact</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.impact}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-center py-2">
                        <ArrowRight className="text-primary animate-pulse" size={24} />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="text-primary" size={16} />
                            <h4 className="font-semibold text-primary">The Fix</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.solution}</p>
                        </div>
                        
                        <div className="bg-secondary/5 rounded-lg p-4 border border-secondary/20">
                          <div className="flex items-center gap-2 mb-2">
                            <Eye className="text-secondary" size={16} />
                            <h4 className="font-semibold text-secondary">The Lesson</h4>
                          </div>
                          <p className="text-sm text-muted-foreground italic">{item.lesson}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="mt-12 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4 glow-text">The Philosophy</h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
                  Every senior developer I admire has a collection of war stories. These mistakes 
                  aren't weaknesses—they're evidence of pushing boundaries and learning from the results.
                </p>
                <p className="text-muted-foreground italic">
                  "The only real mistake is the one from which we learn nothing." — Henry Ford
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MistakesLearned;
