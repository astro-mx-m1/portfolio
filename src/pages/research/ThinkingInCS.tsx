import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, GitBranch, Layers, Repeat, ArrowRightLeft, Database, MessageSquare } from "lucide-react";

const ThinkingInCS = () => {
  const thinkingModels = [
    {
      icon: Brain,
      title: "Problem Decomposition",
      quote: "How I model problems before writing code",
      description: "Every complex problem is just a collection of simple problems in disguise.",
      process: [
        "Identify the core input/output transformation",
        "Break into sub-problems that are independently solvable",
        "Find the dependencies between sub-problems",
        "Determine the optimal order of execution"
      ],
      example: "When building a search feature, I first separate: query parsing, index lookup, relevance scoring, and result formatting. Each can be reasoned about independently.",
      badge: "Decomposition"
    },
    {
      icon: Repeat,
      title: "Recursion vs Iteration",
      quote: "When recursion is better than iteration (with examples)",
      description: "Recursion isn't just a technique—it's a way of thinking about self-similar structures.",
      process: [
        "Identify if the problem has recursive structure",
        "Consider stack depth and memory implications",
        "Evaluate readability vs performance trade-offs",
        "Check for tail-call optimization opportunities"
      ],
      example: "Tree traversal is naturally recursive—the structure mirrors the algorithm. But for simple counting, iteration avoids call stack overhead.",
      badge: "Pattern Recognition"
    },
    {
      icon: Database,
      title: "Schema Design Trade-offs",
      quote: "Trade-offs I considered when designing my database schema",
      description: "Good schema design is about predicting access patterns and optimizing for the common case.",
      process: [
        "Analyze read vs write frequency",
        "Consider normalization vs query performance",
        "Plan for future scalability without over-engineering",
        "Design indexes based on actual query patterns"
      ],
      example: "For my portfolio, I chose denormalized project data for faster reads, accepting some update complexity since content changes infrequently.",
      badge: "Systems Thinking"
    },
    {
      icon: ArrowRightLeft,
      title: "State Management Decisions",
      quote: "Where should state live? Client, server, or URL?",
      description: "The location of state determines the complexity and reliability of your application.",
      process: [
        "Identify who needs access to the state",
        "Consider persistence requirements",
        "Evaluate synchronization complexity",
        "Plan for offline/error scenarios"
      ],
      example: "URL state for shareable filters, client state for UI interactions, server state for authoritative data. Each has its place.",
      badge: "Architecture"
    },
    {
      icon: Layers,
      title: "Abstraction Levels",
      quote: "Knowing when to abstract and when to keep things concrete",
      description: "Premature abstraction is the root of all evil—but so is repetition.",
      process: [
        "Wait for patterns to emerge naturally",
        "Abstract only when you have 3+ similar cases",
        "Keep abstractions discoverable and debuggable",
        "Prefer composition over inheritance"
      ],
      example: "I created a generic DataTable component only after building three specific tables. The commonalities became obvious through use.",
      badge: "Clean Code"
    },
    {
      icon: GitBranch,
      title: "Algorithm Selection",
      quote: "Choosing the right algorithm isn't about memorization",
      description: "Understanding the constraints of a problem tells you which algorithms to consider.",
      process: [
        "Identify time and space constraints",
        "Consider input size and characteristics",
        "Evaluate implementation complexity vs gains",
        "Think about maintainability and edge cases"
      ],
      example: "For small datasets (n < 100), a simple O(n²) algorithm is often clearer and faster in practice than O(n log n) alternatives due to constants.",
      badge: "Algorithms"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>Thinking in Computer Science | Mithil Katkoria</title>
        <meta name="description" content="How I approach problem-solving, reasoning about algorithms, and making design decisions in computer science." />
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
                Thinking in Computer Science
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                This isn't about what I built—it's about how I think. These are the mental models
                and reasoning patterns I apply to every problem I encounter.
              </p>
            </div>

            <Card className="mb-12 bg-card/50 backdrop-blur-sm border-primary/20 glow-card">
              <CardContent className="p-8">
                <blockquote className="text-2xl font-medium italic text-center text-foreground/90">
                  "On my portfolio, I document my problem-solving process rather than just outcomes."
                </blockquote>
              </CardContent>
            </Card>

            <div className="space-y-8">
              {thinkingModels.map((model, index) => {
                const Icon = model.icon;
                return (
                  <Card 
                    key={index}
                    className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/20 rounded-lg">
                          <Icon className="text-primary" size={28} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-2xl">{model.title}</CardTitle>
                            <Badge variant="secondary" className="text-xs">
                              {model.badge}
                            </Badge>
                          </div>
                          <p className="text-primary/80 italic">"{model.quote}"</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-lg text-muted-foreground">
                        {model.description}
                      </p>
                      
                      <div className="bg-background/50 rounded-lg p-4 border border-border/50">
                        <h4 className="font-semibold mb-3 text-foreground/90">My Process:</h4>
                        <ol className="space-y-2">
                          {model.process.map((step, i) => (
                            <li key={i} className="flex items-start gap-3 text-muted-foreground">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-medium">
                                {i + 1}
                              </span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div className="bg-secondary/10 rounded-lg p-4 border border-secondary/30">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageSquare className="text-secondary" size={16} />
                          <h4 className="font-semibold text-secondary">Example:</h4>
                        </div>
                        <p className="text-muted-foreground italic">
                          {model.example}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="mt-12 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4 glow-text">Why This Matters</h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Tools and languages change. The ability to reason clearly about problems, 
                  make informed trade-offs, and communicate technical decisions—that's what lasts.
                  I believe in showing the thinking, not just the result.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ThinkingInCS;
