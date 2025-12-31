import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, Tag, ArrowRight } from "lucide-react";

const ResearchLog = () => {
  const entries = [
    {
      date: "2024-12-15",
      title: "What is Alignment in AI?",
      tags: ["AI Safety", "Ethics"],
      excerpt: "Exploring the challenge of ensuring AI systems do what we actually want, not just what we say.",
      content: `The alignment problem is perhaps the most important unsolved problem in AI. It's not about making AI 'safe' in a simplistic sense—it's about ensuring that as AI systems become more capable, their goals remain aligned with human values.

The challenge is multi-faceted:
1. **Specification Problem**: We can't fully specify what we want. Any reward function we write will have edge cases we didn't anticipate.
2. **Goodhart's Law**: "When a measure becomes a target, it ceases to be a good measure." An AI optimizing for a proxy of what we want might game that proxy.
3. **Value Learning**: Can AI learn human values by observing behavior? Humans themselves don't agree on values.

My current thinking: Alignment might require AI systems that are uncertain about human preferences and actively seek clarification rather than optimizing confidently for potentially wrong goals.`,
      opinion: "I believe we need alignment research to run ahead of capability research, not behind it. The field currently has this backwards."
    },
    {
      date: "2024-12-01",
      title: "Why is Big-O Not the Whole Story?",
      tags: ["Algorithms", "Performance"],
      excerpt: "Big-O tells us about scaling, but real-world performance involves constants, cache, and context.",
      content: `Every CS student learns Big-O notation, but few understand its limitations. Big-O describes asymptotic behavior—what happens as n approaches infinity. Real programs don't run on infinite data.

Consider these often-ignored factors:
1. **Constants Matter**: O(n) with a constant of 1000 is worse than O(n²) with a constant of 0.01 for small n.
2. **Cache Behavior**: A linked list is O(1) for insertion, but its cache-unfriendly memory layout makes it slower than arrays in practice.
3. **Memory Allocation**: That 'O(1)' hash table insertion might trigger memory allocation, making it effectively O(n) occasionally.
4. **Hardware Differences**: SIMD instructions can make certain O(n) operations effectively O(n/4) or O(n/8).

Practical optimization requires profiling real code on real hardware, not just analyzing theoretical complexity.`,
      opinion: "I think Big-O should be taught alongside its limitations from day one. It's a useful abstraction, but over-reliance on it leads to 'theoretically optimal' code that's actually slow."
    },
    {
      date: "2024-11-20",
      title: "What Limits Does Moore's Law Face Today?",
      tags: ["Hardware", "Computing History"],
      excerpt: "Moore's Law is dying. What comes next for computing performance?",
      content: `Moore's Law—the observation that transistor density doubles roughly every two years—has driven computing progress for 60 years. But we're hitting fundamental limits:

1. **Quantum Tunneling**: At 5nm, electrons can 'tunnel' through barriers. We're approaching atomic scales where classical physics breaks down.
2. **Heat Dissipation**: More transistors = more heat. We've already hit the 'power wall' that ended the GHz race around 2005.
3. **Economic Limits**: Each new process node costs exponentially more. Only 3 companies can afford cutting-edge fabs.

What comes next?
- **Architectural Innovation**: GPUs, TPUs, specialized accelerators.
- **New Computing Paradigms**: Quantum computing for specific problems, neuromorphic chips for AI.
- **Software Optimization**: When hardware stalls, software efficiency matters more.

The era of 'just wait for faster hardware' is ending. This makes algorithm design and software optimization more important than ever.`,
      opinion: "I see this as an opportunity, not a crisis. The easy wins from hardware are gone, so clever engineering becomes more valuable."
    },
    {
      date: "2024-11-10",
      title: "Is Consciousness Computable?",
      tags: ["Philosophy", "AI", "Neuroscience"],
      excerpt: "Can a Turing machine be conscious? What does this mean for AI?",
      content: `This question sits at the intersection of philosophy, neuroscience, and computer science. There are roughly three camps:

1. **Computationalism**: Consciousness is just computation. If we simulate a brain perfectly, it would be conscious.
2. **Biological Naturalism**: Consciousness requires specific biological mechanisms, not just any computation.
3. **Mysterians**: Consciousness might be fundamentally beyond human understanding.

Key considerations:
- **Chinese Room Argument**: A system can appear intelligent without understanding. Does understanding require more than computation?
- **Integrated Information Theory**: Proposes consciousness correlates with information integration (phi). But is high phi sufficient?
- **Multiple Realizability**: If minds can be implemented in different substrates (neurons, silicon), what's the essential feature?

Current LLMs produce text that seems conscious but (probably) aren't. What's missing? Or are we wrong about what consciousness requires?`,
      opinion: "I suspect consciousness is substrate-independent but requires something beyond pure computation—perhaps embodiment, or continuous causal interaction with the world."
    },
    {
      date: "2024-10-28",
      title: "The Unreasonable Effectiveness of Mathematics",
      tags: ["Mathematics", "Philosophy", "Science"],
      excerpt: "Why does mathematics describe the physical world so accurately?",
      content: `Eugene Wigner wrote about 'the unreasonable effectiveness of mathematics in the natural sciences.' It's genuinely puzzling: why should abstract mathematical structures, invented by humans, describe physical reality so precisely?

Possible explanations:
1. **Selection Bias**: We remember the math that worked and forget what didn't.
2. **Evolution**: Our brains evolved to model physical reality; mathematics is formalized intuition about that reality.
3. **Mathematical Universe**: Perhaps physical reality IS a mathematical structure (Max Tegmark's view).
4. **Anthropic Reasoning**: Only universes with mathematically describable laws could support the kind of beings who ask this question.

This isn't just philosophical navel-gazing. It affects how we approach AI:
- If math is discovered, maybe AI can discover new mathematics.
- If math is invented, AI might be able to invent better mathematical frameworks than humans have.`,
      opinion: "I lean toward a combination of evolution and selection bias, but remain genuinely uncertain. This uncertainty is valuable—it keeps me curious."
    }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>Research Log | Mithil Katkoria</title>
        <meta name="description" content="My intellectual journal: short research notes on AI, algorithms, philosophy, and computing." />
      </Helmet>
      
      <StarfieldBackground />
      <div className="relative z-10">
        <Navigation />
        
        <main className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
                🗣 Ask me about this in interview
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 glow-text">
                Research Log
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Short research notes exploring AI, philosophy, algorithms, and the foundations of computing.
                I treat this like a personal research notebook.
              </p>
            </div>

            <div className="space-y-8">
              {entries.map((entry, index) => (
                <Card 
                  key={index}
                  className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/20 rounded-lg">
                          <BookOpen className="text-primary" size={20} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <Calendar size={14} />
                            {entry.date}
                          </div>
                          <CardTitle className="text-xl">{entry.title}</CardTitle>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {entry.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          <Tag size={10} className="mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground italic">{entry.excerpt}</p>
                    
                    <div className="bg-background/50 rounded-lg p-4 border border-border/50">
                      <div className="prose prose-invert prose-sm max-w-none">
                        {entry.content.split('\n\n').map((paragraph, i) => (
                          <p key={i} className="text-foreground/80 mb-3 last:mb-0 whitespace-pre-wrap">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="bg-secondary/10 rounded-lg p-4 border border-secondary/30">
                      <h4 className="font-semibold text-secondary mb-2 flex items-center gap-2">
                        <ArrowRight size={16} />
                        My Opinion
                      </h4>
                      <p className="text-muted-foreground italic">{entry.opinion}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-12 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
              <CardContent className="p-8 text-center">
                <blockquote className="text-2xl font-medium italic text-foreground/90">
                  "I treat this like a personal research notebook."
                </blockquote>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ResearchLog;
