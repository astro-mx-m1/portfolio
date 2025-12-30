import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Beaker, Rocket, Sparkles, Cpu, Zap, Code } from "lucide-react";

const SandboxPage = () => {
  const experiments = [
    {
      icon: Beaker,
      title: "Algorithm Playground",
      description: "Interactive visualizations of sorting algorithms, pathfinding, and data structures.",
      status: "In Development",
      color: "text-primary"
    },
    {
      icon: Cpu,
      title: "AI Model Experiments",
      description: "Testing machine learning concepts, neural networks, and exploring bias in algorithms.",
      status: "Research Phase",
      color: "text-secondary"
    },
    {
      icon: Code,
      title: "Code Challenges",
      description: "Daily coding puzzles and solutions to strengthen problem-solving skills.",
      status: "Ongoing",
      color: "text-primary"
    },
    {
      icon: Sparkles,
      title: "Creative Coding",
      description: "Generative art, animations, and visual experiments using p5.js and Three.js.",
      status: "Experimental",
      color: "text-secondary"
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Testing and benchmarking different approaches to improve code efficiency.",
      status: "Active",
      color: "text-primary"
    },
    {
      icon: Rocket,
      title: "Future Projects",
      description: "Brainstorming and prototyping ideas for innovative applications and tools.",
      status: "Ideation",
      color: "text-secondary"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Sandbox & Experiments | Mithil Katkoria</title>
        <meta name="description" content="My experimental projects, coding playground, and space for innovation and creative exploration." />
      </Helmet>
      <div className="min-h-screen bg-background relative">
        <StarfieldBackground />
        <div className="relative z-10">
          <Navigation />
          <div className="pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16 animate-fade-in">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 glow-text">
                  Sandbox & Experiments
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  A playground for ideas, experiments, and continuous learning
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiments.map((experiment, index) => {
                  const Icon = experiment.icon;
                  return (
                    <Card
                      key={index}
                      className="glow-card bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardHeader>
                        <Icon className={`w-10 h-10 ${experiment.color} mb-4`} />
                        <CardTitle className="text-xl">{experiment.title}</CardTitle>
                        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30">
                          {experiment.status}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">
                          {experiment.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="mt-16 text-center">
                <Card className="glow-card bg-card/50 backdrop-blur-sm border-primary/20 max-w-3xl mx-auto">
                  <CardHeader>
                    <CardTitle className="text-3xl glow-text">
                      Why a Sandbox?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-left">
                    <p className="text-muted-foreground text-lg">
                      This space represents my commitment to continuous learning and experimentation. 
                      Not every project needs to be perfect; some of the best learning happens when 
                      you are willing to break things, test ideas, and iterate.
                    </p>
                    <p className="text-muted-foreground text-lg">
                      From algorithm visualizations to AI ethics explorations, this is where curiosity 
                      meets code. It is messy, exciting, and always evolving; just like my journey in 
                      computer science.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SandboxPage;
