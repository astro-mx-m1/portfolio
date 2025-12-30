import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import { Card } from "@/components/ui/card";
import { Code2, Database, Cloud, Shield } from "lucide-react";

const TechStack = () => {
  const stack = [
    {
      category: "Frontend",
      icon: Code2,
      technologies: [
        { name: "React", purpose: "UI framework for component-based architecture" },
        { name: "TypeScript", purpose: "Type safety and better developer experience" },
        { name: "TailwindCSS", purpose: "Utility-first styling with design system" },
        { name: "React Query", purpose: "Server state management and caching" }
      ]
    },
    {
      category: "Backend",
      icon: Database,
      technologies: [
        { name: "Supabase", purpose: "PostgreSQL database and authentication" },
        { name: "Edge Functions", purpose: "Serverless backend logic" },
        { name: "Row Level Security", purpose: "Database-level access control" }
      ]
    },
    {
      category: "Infrastructure",
      icon: Cloud,
      technologies: [
        { name: "Vercel", purpose: "Deployment and CI/CD pipeline" },
        { name: "Git", purpose: "Version control and collaboration" },
        { name: "GitHub Actions", purpose: "Automated testing and deployment" }
      ]
    },
    {
      category: "Security",
      icon: Shield,
      technologies: [
        { name: "JWT Tokens", purpose: "Secure authentication" },
        { name: "HTTPS", purpose: "Encrypted data transmission" },
        { name: "Input Validation", purpose: "Protection against injection attacks" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>Tech Stack | Mithil Katkoria</title>
        <meta name="description" content="The technologies and tools powering StudySync application - from frontend to infrastructure." />
      </Helmet>
      
      <StarfieldBackground />
      <div className="relative z-10">
        <Navigation />
        
        <main className="container mx-auto px-4 py-24">
          <div className="max-w-6xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 glow-text">
              Tech Stack
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
              The technologies powering StudySync; chosen for performance, scalability, and developer experience.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stack.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 glow-card">
                    <div className="flex items-center gap-3 mb-6">
                      <Icon className="text-primary" size={28} />
                      <h2 className="text-2xl font-bold">{category.category}</h2>
                    </div>
                    <div className="space-y-4">
                      {category.technologies.map((tech, i) => (
                        <div key={i} className="p-3 bg-muted/20 rounded-lg">
                          <h3 className="font-semibold text-primary mb-1">{tech.name}</h3>
                          <p className="text-sm text-muted-foreground">{tech.purpose}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>

            <Card className="mt-6 p-8 bg-card/50 backdrop-blur-sm border-primary/20 glow-card">
              <h2 className="text-2xl font-bold mb-4">Architecture Principles</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span><strong>Separation of Concerns:</strong> Clear boundaries between UI, business logic, and data layers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span><strong>Type Safety:</strong> TypeScript throughout for catching errors at compile time</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span><strong>Security First:</strong> RLS policies, input validation, and secure authentication</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span><strong>Performance:</strong> Code splitting, lazy loading, and optimized bundle sizes</span>
                </li>
              </ul>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TechStack;