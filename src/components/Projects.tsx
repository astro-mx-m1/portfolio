import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Loader2, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

interface ProjectsProps {
  limit?: number;
  showViewAll?: boolean;
}

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
}

const Projects = ({ limit, showViewAll = false }: ProjectsProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  if (loading) {
    return (
      <section id="projects" className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
          <Loader2 className="animate-spin text-primary" size={48} />
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text">Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Where curiosity meets code; building solutions that educate, explore, and inspire
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center text-muted-foreground">
            <p>No projects yet. Check back soon!</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-8">
              {displayedProjects.map((project, index) => (
              <Card 
                key={index}
                className="p-6 bg-card border-primary/20 hover:border-primary/50 transition-all glow-card hover:glow-border group"
              >
                {project.image_url && (
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <img 
                      src={project.image_url} 
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
                
                <div className="mb-4">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                </div>

                {project.technologies && project.technologies.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech, i) => (
                        <Badge key={i} variant="outline" className="border-primary/40 text-primary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 mt-auto">
                  {project.github_url && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-primary/50 hover:bg-primary/10"
                      asChild
                    >
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                        <Github size={16} className="mr-2" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.demo_url && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-secondary/50 hover:bg-secondary/10"
                      asChild
                    >
                      <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} className="mr-2" />
                        Demo
                      </a>
                    </Button>
                  )}
                </div>
              </Card>
              ))}
            </div>
            
            {showViewAll && projects.length > (limit || 0) && (
              <div className="text-center mt-12">
                <Button asChild variant="outline" size="lg" className="border-primary/50 hover:bg-primary/10">
                  <Link to="/projects">
                    View All Projects
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;