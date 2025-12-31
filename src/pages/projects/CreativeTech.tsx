import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import { Card } from "@/components/ui/card";
import { Palette, Sparkles, Wand2 } from "lucide-react";

const CreativeTech = () => {
  const projects = [
    {
      title: "Neural Network Visualizer",
      description: "Interactive 3D visualization of neural networks with dynamic node connections and real-time learning animations.",
      icon: Sparkles,
      tech: ["Three.js", "WebGL", "React"]
    },
    {
      title: "Generative Art Gallery",
      description: "Collection of algorithmic art pieces generated using mathematical functions, fractals, and particle systems.",
      icon: Palette,
      tech: ["Canvas API", "P5.js", "JavaScript"]
    },
    {
      title: "CSS Art Experiments",
      description: "Pure CSS animations and illustrations demonstrating advanced styling techniques and creative problem-solving.",
      icon: Wand2,
      tech: ["CSS3", "HTML5", "Animation"]
    }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>Creative Tech Projects | Mithil Katkoria</title>
        <meta name="description" content="Where technology meets art - creative coding projects, generative art, and experimental interfaces." />
      </Helmet>
      
      <StarfieldBackground />
      <div className="relative z-10">
        <Navigation />
        
        <main className="container mx-auto px-4 py-24">
          <div className="max-w-6xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 glow-text">
              Creative Tech
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
              Exploring the intersection of code and creativity through generative art, interactive visualizations, and experimental design.
            </p>

            <div className="space-y-6">
              {projects.map((project, index) => {
                const Icon = project.icon;
                return (
                  <Card key={index} className="p-8 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all glow-card">
                    <div className="flex items-start gap-6">
                      <div className="p-4 bg-primary/10 rounded-lg">
                        <Icon className="text-primary" size={32} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                        <p className="text-muted-foreground mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, i) => (
                            <span key={i} className="px-3 py-1 text-sm bg-primary/20 text-primary rounded-full">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreativeTech;