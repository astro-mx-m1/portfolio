import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import { Card } from "@/components/ui/card";
import { Network } from "lucide-react";

const ThoughtGraph = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>Thought Graph | Mithil Katkoria</title>
        <meta name="description" content="An interactive visualization of how my ideas about AI, philosophy, and technology interconnect." />
      </Helmet>
      
      <StarfieldBackground />
      <div className="relative z-10">
        <Navigation />
        
        <main className="container mx-auto px-4 py-24">
          <div className="max-w-6xl mx-auto animate-fade-in">
            <div className="flex items-center gap-4 mb-6">
              <Network className="text-primary" size={48} />
              <h1 className="text-5xl md:text-6xl font-bold glow-text">
                Thought Graph
              </h1>
            </div>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
              A visual representation of how my ideas connect; from Locke's theory of perception to modern machine learning fairness.
            </p>

            <Card className="p-12 bg-card/50 backdrop-blur-sm border-primary/20 glow-card min-h-[600px] flex items-center justify-center">
              <div className="text-center space-y-6">
                <div className="relative w-64 h-64 mx-auto">
                  <div className="absolute inset-0 animate-float">
                    <div className="w-full h-full rounded-full border-2 border-primary/30 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full border-2 border-secondary/30 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-primary/20 animate-glow-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-3">Interactive Visualization Coming Soon</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    An interactive network graph showing the connections between philosophical concepts, 
                    technical implementations, and research questions.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-3 justify-center pt-6">
                  <div className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm">
                    Locke's Theory
                  </div>
                  <div className="px-4 py-2 bg-secondary/10 text-secondary rounded-lg text-sm">
                    ML Fairness
                  </div>
                  <div className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm">
                    Algorithmic Bias
                  </div>
                  <div className="px-4 py-2 bg-secondary/10 text-secondary rounded-lg text-sm">
                    Feature Engineering
                  </div>
                  <div className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm">
                    Interpretive Filters
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ThoughtGraph;