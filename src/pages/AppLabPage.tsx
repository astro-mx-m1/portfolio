import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Target, Users, Zap, TrendingUp, Code2 } from "lucide-react";

const AppLabPage = () => {
  const concepts = [
    {
      icon: Code2,
      title: "EduCode Platform",
      tagline: "Teaching Programming Through Interactive Challenges",
      description: "A gamified learning platform designed for young students to learn coding through hands-on projects, real-time feedback, and peer collaboration.",
      vision: "Making programming education accessible, engaging, and effective for everyone",
      stage: "Concept Development",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "AI Tutor Assistant",
      tagline: "Personalized Learning at Scale",
      description: "An AI-powered tutoring system that adapts to individual learning styles, identifies knowledge gaps, and provides targeted explanations.",
      vision: "Democratizing access to quality education through intelligent automation",
      stage: "Research Phase",
      color: "text-secondary"
    },
    {
      icon: Target,
      title: "Algorithm Visualizer Pro",
      tagline: "See How Algorithms Think",
      description: "A comprehensive tool for visualizing complex algorithms, data structures, and computational processes in real-time with step-by-step breakdowns.",
      vision: "Making abstract computer science concepts tangible and understandable",
      stage: "Prototype",
      color: "text-primary"
    }
  ];

  const principles = [
    {
      principle: "Impact Over Perfection",
      description: "Build solutions that solve real problems, even if they start small"
    },
    {
      principle: "User-Centered Design",
      description: "Listen to users and iterate based on their needs and feedback"
    },
    {
      principle: "Scalable from Day One",
      description: "Think big but start with a solid, maintainable foundation"
    },
    {
      principle: "Open & Collaborative",
      description: "Share knowledge and build in public to help others learn"
    }
  ];

  return (
    <>
      <Helmet>
        <title>App Lab | Mithil Katkoria - Future Projects</title>
        <meta name="description" content="My future app ideas, startup concepts, and vision for technology that makes a difference." />
      </Helmet>
      <div className="min-h-screen bg-background relative">
        <StarfieldBackground />
        <div className="relative z-10">
          <Navigation />
          <div className="pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16 animate-fade-in">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 glow-text">
                  App Lab
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Where ideas become applications; exploring concepts for meaningful technology
                </p>
              </div>

              {/* App Concepts */}
              <div className="space-y-8 mb-16">
                {concepts.map((concept, index) => {
                  const Icon = concept.icon;
                  return (
                    <Card
                      key={index}
                      className="glow-card bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 animate-fade-in"
                      style={{ animationDelay: `${index * 0.15}s` }}
                    >
                      <CardHeader>
                        <div className="flex items-start gap-4 mb-4">
                          <Icon className={`w-12 h-12 ${concept.color} flex-shrink-0`} />
                          <div className="flex-1">
                            <CardTitle className="text-3xl mb-2">{concept.title}</CardTitle>
                            <p className="text-lg font-medium text-primary">
                              {concept.tagline}
                            </p>
                            <div className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium bg-secondary/20 text-secondary border border-secondary/30">
                              {concept.stage}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <CardDescription className="text-base leading-relaxed">
                          {concept.description}
                        </CardDescription>
                        <div className="flex items-start gap-2 pt-4 border-t border-primary/20">
                          <Lightbulb className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Vision:</p>
                            <p className="text-base text-foreground">{concept.vision}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Design Principles */}
              <div className="mb-16">
                <h2 className="text-4xl font-bold mb-8 text-center glow-text">
                  Design Principles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {principles.map((item, index) => (
                    <Card
                      key={index}
                      className="glow-card bg-card/50 backdrop-blur-sm border-primary/20 animate-fade-in"
                      style={{ animationDelay: `${(index + 3) * 0.1}s` }}
                    >
                      <CardHeader>
                        <CardTitle className="text-xl text-primary">
                          {item.principle}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">
                          {item.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Future Vision */}
              <Card className="glow-card bg-card/50 backdrop-blur-sm border-primary/20 animate-fade-in">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-10 h-10 text-secondary" />
                    <CardTitle className="text-3xl glow-text">
                      Looking Ahead
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    These concepts represent more than just app ideas; they are explorations of how 
                    technology can genuinely improve learning, understanding, and human potential.
                  </p>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    As I continue my computer science journey, I am excited to bring these ideas to 
                    life, learn from the process, and ultimately create tools that make a difference. 
                    The best applications do not just solve problems; they empower people.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppLabPage;
