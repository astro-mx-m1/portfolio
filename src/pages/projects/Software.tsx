import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const Software = () => {
  const projects = [
    {
      title: "Portfolio Website",
      description: "A modern, responsive portfolio built with React, TypeScript, and TailwindCSS featuring dynamic animations and neural network visualizations.",
      tech: ["React", "TypeScript", "TailwindCSS", "Vite"],
      github: "#",
      live: "#",
      status: "Active"
    },
    {
      title: "Algorithm Visualizer",
      description: "Interactive web application demonstrating sorting algorithms, graph traversal, and data structures with step-by-step animations.",
      tech: ["JavaScript", "Canvas API", "React"],
      github: "#",
      live: "#",
      status: "Active"
    },
    {
      title: "Coding Club Platform",
      description: "Educational platform for Avanti House Coding Club with lesson materials, challenges, and progress tracking for students.",
      tech: ["React", "Supabase", "TailwindCSS"],
      github: "#",
      live: "#",
      status: "In Development"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>Software Projects | Mithil Katkoria</title>
        <meta name="description" content="Explore my software development projects including web applications, tools, and educational platforms." />
      </Helmet>
      
      <StarfieldBackground />
      <div className="relative z-10">
        <Navigation />
        
        <main className="container mx-auto px-4 py-24">
          <div className="max-w-6xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 glow-text">
              Software Projects
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
              A collection of web applications, tools, and platforms I've built to solve real problems and explore new technologies.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all glow-card">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                    <Badge variant={project.status === "Active" ? "default" : "secondary"}>
                      {project.status}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <Badge key={i} variant="outline">{tech}</Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <Button size="sm" variant="outline" className="gap-2">
                      <Github size={16} />
                      Code
                    </Button>
                    <Button size="sm" variant="default" className="gap-2">
                      <ExternalLink size={16} />
                      Live Demo
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Software;