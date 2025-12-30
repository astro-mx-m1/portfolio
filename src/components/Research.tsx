import { Card } from "@/components/ui/card";
import { BookOpen, Brain, Scale } from "lucide-react";

const Research = () => {
  return (
    <section id="research" className="py-24 px-4 relative bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text">Research & Reflection</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Exploring the philosophical foundations of computing and artificial intelligence
          </p>
        </div>

        {/* Main Essay */}
        <Card className="p-8 md:p-12 mb-12 bg-card border-primary/30 glow-card">
          <div className="flex items-start gap-6 mb-6">
            <div className="p-4 rounded-lg bg-primary/10">
              <Brain className="text-primary" size={32} />
            </div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold mb-3">
                Objectivity in Human and Algorithmic Systems
              </h3>
              <p className="text-muted-foreground text-lg">
                A philosophical exploration of how perception shapes both human and machine intelligence
              </p>
            </div>
          </div>

          <div className="space-y-6 text-muted-foreground">
            <div className="p-6 border-l-4 border-primary/50 bg-primary/5 rounded">
              <p className="font-semibold text-foreground mb-2">Core Argument</p>
              <p className="italic">
                "Algorithms mirror human interpretive filters; both depend on choices of data, 
                features, and objectives. True objectivity may be an ideal; what we can achieve 
                is transparent, well-reasoned subjectivity."
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <Scale className="text-secondary" size={20} />
                  Key Insights
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>• Human perception is inherently interpretive (Locke's primary versus secondary qualities)</li>
                  <li>• Machine learning algorithms encode human biases through training data selection</li>
                  <li>• Both systems require explicit choices about what features matter</li>
                  <li>• Fairness in AI demands recognition of these built-in perspectives</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <BookOpen className="text-primary" size={20} />
                  Philosophical Framework
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>• Drawing from Locke's epistemology and modern AI ethics</li>
                  <li>• Connecting perceptual theory to machine learning architectures</li>
                  <li>• Examining the role of interpretation in data science</li>
                  <li>• Proposing transparency over false objectivity claims</li>
                </ul>
              </div>
            </div>

            <div className="pt-6">
              <p>
                This research bridges my interests in computer science, mathematics, and philosophy. 
                It examines how the computational systems we build reflect fundamental questions about 
                knowledge, perception, and fairness; questions that have occupied philosophers for 
                centuries but now have immediate practical implications in AI development.
              </p>
            </div>
          </div>
        </Card>

        {/* Additional Research Interests */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-center">Ongoing Explorations</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-card border-primary/20 hover:border-secondary/50 transition-all">
              <h4 className="font-bold mb-3 text-secondary">Philosophy of AI</h4>
              <p className="text-sm text-muted-foreground">
                Can machines truly understand, or do they merely simulate comprehension through pattern matching?
              </p>
            </Card>
            <Card className="p-6 bg-card border-primary/20 hover:border-secondary/50 transition-all">
              <h4 className="font-bold mb-3 text-secondary">Data Fairness & Bias</h4>
              <p className="text-sm text-muted-foreground">
                Investigating how algorithmic decisions can perpetuate or mitigate social inequities.
              </p>
            </Card>
            <Card className="p-6 bg-card border-primary/20 hover:border-secondary/50 transition-all">
              <h4 className="font-bold mb-3 text-secondary">Mathematical Aesthetics</h4>
              <p className="text-sm text-muted-foreground">
                Exploring the beauty and elegance in computational complexity and algorithm design.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Research;