import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import { Card } from "@/components/ui/card";
import { Brain, Scale, Eye, MessageSquare } from "lucide-react";

const PhilosophyOfAI = () => {
  const topics = [
    {
      title: "Objectivity in Algorithms",
      icon: Scale,
      description: "Exploring whether algorithms can ever be truly objective, or if they inevitably reflect human biases and interpretive frameworks.",
      keyPoints: [
        "Algorithms as interpretive filters",
        "Role of feature selection and data framing",
        "Connection to Locke's theory of perception"
      ]
    },
    {
      title: "Machine Perception vs Human Perception",
      icon: Eye,
      description: "Comparing how machines 'see' and process information versus human cognitive processes and phenomenological experience.",
      keyPoints: [
        "Raw sensory data vs meaningful perception",
        "The gap between classification and understanding",
        "Embodied cognition and context"
      ]
    },
    {
      title: "Ethics of AI Decision-Making",
      icon: MessageSquare,
      description: "Examining moral frameworks for AI systems and the responsibility for automated decisions affecting human lives.",
      keyPoints: [
        "Accountability in automated systems",
        "Transparency vs black-box models",
        "Fairness across demographic groups"
      ]
    },
    {
      title: "Intelligence & Understanding",
      icon: Brain,
      description: "What does it mean to 'understand'? Can machines understand, or do they merely process patterns without comprehension?",
      keyPoints: [
        "Chinese Room argument revisited",
        "Strong vs weak AI",
        "Consciousness and computation"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>Philosophy of AI | Mithil Katkoria</title>
        <meta name="description" content="Exploring the philosophical foundations of artificial intelligence, perception, ethics, and the nature of machine understanding." />
      </Helmet>
      
      <StarfieldBackground />
      <div className="relative z-10">
        <Navigation />
        
        <main className="container mx-auto px-4 py-24">
          <div className="max-w-6xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 glow-text">
              Philosophy of AI
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
              Examining the conceptual foundations, ethical implications, and epistemological questions that arise when we create thinking machines.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {topics.map((topic, index) => {
                const Icon = topic.icon;
                return (
                  <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all glow-card">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Icon className="text-primary" size={28} />
                      </div>
                      <h3 className="text-2xl font-bold flex-1">{topic.title}</h3>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{topic.description}</p>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-primary">Key Questions:</p>
                      <ul className="space-y-1">
                        {topic.keyPoints.map((point, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start">
                            <span className="text-primary mr-2">•</span>
                            {point}
                          </li>
                        ))}
                      </ul>
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

export default PhilosophyOfAI;