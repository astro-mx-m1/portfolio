import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { Archive as ArchiveIcon } from "lucide-react";

const Archive = () => {
  const archivedProjects = [
    { title: "First Python Scripts", year: "2019", description: "Collection of early Python programs from when I earned my first Microsoft Python certification at age 10.", tags: ["Python", "Learning", "Fundamentals"] },
    { title: "Simple Calculator App", year: "2020", description: "One of my first GUI applications built with Tkinter, teaching me about event-driven programming.", tags: ["Python", "Tkinter", "GUI"] },
    { title: "Text-Based Adventure Game", year: "2021", description: "Interactive story game with multiple paths and outcomes, exploring conditional logic and state management.", tags: ["Python", "Game Dev", "Logic"] },
    { title: "HTML/CSS Experiments", year: "2021", description: "Early web development experiments learning HTML structure and CSS styling basics.", tags: ["HTML", "CSS", "Web Dev"] }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>Project Archive | Mithil Katkoria</title>
        <meta name="description" content="A collection of older projects and experiments from my coding journey." />
      </Helmet>
      <StarfieldBackground />
      <div className="relative z-10">
        <Navigation />
        <main className="container mx-auto px-4 py-24">
          <div className="max-w-6xl mx-auto animate-fade-in">
            <div className="flex items-center gap-4 mb-6">
              <ArchiveIcon className="text-primary" size={48} />
              <h1 className="text-5xl md:text-6xl font-bold glow-text">Project Archive</h1>
            </div>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
              A journey through time; preserving early experiments and projects that shaped my understanding of programming and problem-solving.
            </p>
            <div className="space-y-4">
              {archivedProjects.map((project, index) => (
                <Card key={index} className="p-6 bg-card/30 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar size={16} />{project.year}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (<Badge key={i} variant="outline" className="text-xs">{tag}</Badge>))}
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

export default Archive;