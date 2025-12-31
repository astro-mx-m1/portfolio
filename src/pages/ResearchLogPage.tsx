import { Helmet } from "react-helmet";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Brain, Cpu, Scale, Calculator, Quote, Circle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Tag = "AI" | "Systems" | "Ethics" | "Maths";
type Status = "Still thinking" | "Changed my mind" | "Needs more reading";

interface ResearchEntry {
  id: string;
  date: string;
  tag: Tag;
  title: string;
  abstract: string;
  question: string;
  context: string;
  currentThinking: string;
  openProblems: string;
  status: Status;
  featured?: boolean;
}

const entries: ResearchEntry[] = [
  {
    id: "1",
    date: "2024-12-15",
    tag: "AI",
    title: "Alignment vs. Capability: A False Dichotomy?",
    abstract: "Exploring whether the framing of AI safety as 'alignment' obscures more fundamental questions about what we're aligning to.",
    question: "Is 'alignment' the right frame for thinking about AI safety, or does it presuppose answers to questions we haven't adequately explored?",
    context: "The dominant narrative in AI safety assumes we know what human values are and that the problem is getting AI to follow them. But human values are contested, contextual, and often contradictory. If we align AI to 'human values', whose values? At what level of abstraction?",
    currentThinking: "I'm increasingly skeptical of alignment as framed. It seems to treat 'human values' as a fixed target when they're actually a moving, contested, emergent phenomenon. Perhaps the better question is: how do we build systems that participate constructively in ongoing human deliberation about values, rather than systems that implement a frozen snapshot of them?",
    openProblems: "How do we formalise 'constructive participation' in value deliberation? Can we even specify what 'constructive' means without already assuming some values?",
    status: "Still thinking",
    featured: true
  },
  {
    id: "2",
    date: "2024-12-08",
    tag: "AI",
    title: "Explainability vs. Performance: A Necessary Trade-off?",
    abstract: "Investigating whether the apparent trade-off between model interpretability and capability is fundamental or an artefact of current methods.",
    question: "Must powerful AI systems be opaque, or is interpretability a solvable engineering challenge?",
    context: "Current high-performing models (large language models, deep neural networks) are largely black boxes. We can probe their behaviour but not truly explain their reasoning. Some argue this is inherent to any sufficiently complex system; others think it's a limitation of current architectures.",
    currentThinking: "I suspect the trade-off is real but not absolute. There may be a frontier—systems can be made more interpretable at some cost to performance, but there are diminishing returns. The question is where we should sit on that frontier for different applications. For medical diagnosis, we might accept lower performance for higher interpretability. For spell-checking, perhaps not.",
    openProblems: "What formal metrics can we use to measure interpretability? How do we compare interpretability across different model architectures?",
    status: "Needs more reading",
    featured: true
  },
  {
    id: "3",
    date: "2024-11-28",
    tag: "Ethics",
    title: "Responsibility in Autonomous Systems",
    abstract: "Who bears moral and legal responsibility when an autonomous system causes harm?",
    question: "When an autonomous vehicle causes an accident, who is responsible: the programmer, the company, the user, or the system itself?",
    context: "Our legal and moral frameworks assume human agency. But increasingly, consequential decisions are made by systems that no single human fully understands or controls. This creates an 'accountability gap' where harm occurs but responsibility diffuses.",
    currentThinking: "I've moved away from trying to assign responsibility to a single party. Instead, I think we need new frameworks that distribute responsibility proportionally across the design chain, while maintaining meaningful incentives for safety at each stage. The question isn't 'who is responsible?' but 'how do we structure responsibility so that safety is everyone's priority?'",
    openProblems: "How do we implement distributed responsibility in legal systems designed for individual accountability? How do we prevent 'responsibility diffusion' from becoming an excuse for negligence?",
    status: "Changed my mind",
    featured: true
  },
  {
    id: "4",
    date: "2024-11-20",
    tag: "Systems",
    title: "Why Big-O Isn't the Whole Story",
    abstract: "Exploring the limitations of asymptotic analysis for understanding real-world performance.",
    question: "When does Big-O notation mislead us about actual system performance?",
    context: "Big-O is the standard tool for analysing algorithm efficiency, but it hides constants, ignores cache effects, and assumes uniform operation costs. In practice, an O(n log n) algorithm can be slower than O(n²) for realistic input sizes.",
    currentThinking: "Big-O is a useful abstraction for comparing algorithms in the limit, but it's not sufficient for performance engineering. Real performance depends on memory access patterns, branch prediction, cache hierarchy, and parallelism—none of which Big-O captures. I now think of Big-O as a necessary but not sufficient condition for performance analysis.",
    openProblems: "What notation or framework could capture both asymptotic behaviour and constant factors in a useful way? How do we teach algorithmic analysis without over-relying on Big-O?",
    status: "Still thinking"
  },
  {
    id: "5",
    date: "2024-11-10",
    tag: "Maths",
    title: "What Limits Does Moore's Law Face Today?",
    abstract: "Examining the physical and economic constraints on continued transistor scaling.",
    question: "Is Moore's Law ending, and if so, what comes next?",
    context: "For decades, transistor density doubled roughly every two years. This drove the computing revolution. But we're now approaching physical limits: transistors are nearing atomic scales, and the cost of new fabs is becoming prohibitive.",
    currentThinking: "I think 'Moore's Law is dead' is too simple. What's ending is the easy, uniform scaling. What's replacing it is more heterogeneous: specialised hardware (GPUs, TPUs, FPGAs), new architectures (neuromorphic, quantum), and software optimisations that extract more from existing hardware. The era of 'wait for faster chips' is over; the era of 'design for the hardware you have' has begun.",
    openProblems: "How will programming paradigms need to change for heterogeneous architectures? Will quantum computing ever be practical for general-purpose computation?",
    status: "Still thinking"
  },
  {
    id: "6",
    date: "2024-10-25",
    tag: "AI",
    title: "Is Consciousness Computable?",
    abstract: "A preliminary exploration of whether subjective experience can emerge from computational processes.",
    question: "Can a computational system ever be conscious, and would we be able to tell?",
    context: "The 'hard problem' of consciousness asks why there is subjective experience at all. Some argue consciousness is substrate-independent and could emerge in any sufficiently complex information-processing system. Others argue something special about biological brains is necessary.",
    currentThinking: "I find functionalist arguments compelling but incomplete. If consciousness is substrate-independent, we need an account of what functional organisation gives rise to it—and we don't have one. Without such an account, we can't know whether any artificial system is conscious. We might build systems that claim to be conscious without actually being so, or vice versa.",
    openProblems: "Can we develop empirical tests for machine consciousness, or is it inherently unobservable? What moral obligations do we have toward potentially conscious AI systems?",
    status: "Needs more reading"
  }
];

const getTagConfig = (tag: Tag) => {
  switch (tag) {
    case "AI":
      return { icon: Brain, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/30" };
    case "Systems":
      return { icon: Cpu, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/30" };
    case "Ethics":
      return { icon: Scale, color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/30" };
    case "Maths":
      return { icon: Calculator, color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/30" };
  }
};

const getStatusConfig = (status: Status) => {
  switch (status) {
    case "Still thinking":
      return { color: "text-primary", bg: "bg-primary/10" };
    case "Changed my mind":
      return { color: "text-amber-400", bg: "bg-amber-400/10" };
    case "Needs more reading":
      return { color: "text-muted-foreground", bg: "bg-muted" };
  }
};

const ResearchLogPage = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<Tag | "All">("All");

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filteredEntries = activeFilter === "All" 
    ? entries 
    : entries.filter(e => e.tag === activeFilter);

  const featuredEntries = entries.filter(e => e.featured);

  const tags: (Tag | "All")[] = ["All", "AI", "Systems", "Ethics", "Maths"];

  return (
    <>
      <Helmet>
        <title>Research Log | Mithil Katkoria</title>
        <meta name="description" content="An intellectual journal exploring questions at the intersection of AI, systems, ethics, and mathematics." />
      </Helmet>
      <div className="min-h-screen bg-background relative">
        <StarfieldBackground />
        <div className="relative z-10">
          <Navigation />
          <div className="pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4">
              {/* Hero */}
              <div className="text-center mb-16 animate-fade-in">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 glow-text">
                  Research Log
                </h1>
                <p className="text-lg text-muted-foreground italic max-w-2xl mx-auto">
                  Questions I'm exploring, not answers I claim to have.
                </p>
              </div>

              {/* Tag Filter */}
              <div className="flex flex-wrap justify-center gap-2 mb-12">
                {tags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setActiveFilter(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeFilter === tag
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Featured: Philosophy of AI */}
              {activeFilter === "All" && (
                <div className="mb-12">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-primary" />
                    Featured: Philosophy of AI
                  </h2>
                  <div className="space-y-4 mb-8">
                    {featuredEntries.map(entry => {
                      const tagConfig = getTagConfig(entry.tag);
                      const TagIcon = tagConfig.icon;
                      
                      return (
                        <Card key={entry.id} className="bg-primary/5 border-primary/20">
                          <CardContent className="pt-6">
                            <div className="flex items-start gap-3 mb-3">
                              <Badge variant="outline" className={`${tagConfig.bg} ${tagConfig.border} ${tagConfig.color}`}>
                                <TagIcon className="w-3 h-3 mr-1" />
                                {entry.tag}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{entry.date}</span>
                            </div>
                            <h3 className="font-semibold text-lg mb-2">{entry.title}</h3>
                            <p className="text-muted-foreground text-sm">{entry.abstract}</p>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-card/50 rounded-lg border border-primary/20">
                    <Quote className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <p className="text-foreground italic">
                      "The most dangerous systems are the ones we stop questioning."
                    </p>
                  </div>
                </div>
              )}

              {/* Research Entries */}
              <div className="space-y-4">
                {filteredEntries.map((entry, index) => {
                  const tagConfig = getTagConfig(entry.tag);
                  const TagIcon = tagConfig.icon;
                  const statusConfig = getStatusConfig(entry.status);
                  const isOpen = openItems.includes(entry.id);

                  return (
                    <Collapsible
                      key={entry.id}
                      open={isOpen}
                      onOpenChange={() => toggleItem(entry.id)}
                    >
                      <Card 
                        className={`bg-card/50 border-border/50 transition-all duration-300 ${
                          isOpen ? 'border-primary/30' : 'hover:border-primary/20'
                        }`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <CollapsibleTrigger className="w-full">
                          <CardHeader className="cursor-pointer">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 text-left">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge variant="outline" className={`${tagConfig.bg} ${tagConfig.border} ${tagConfig.color}`}>
                                    <TagIcon className="w-3 h-3 mr-1" />
                                    {entry.tag}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">{entry.date}</span>
                                </div>
                                <CardTitle className="text-lg mb-2">
                                  {entry.title}
                                </CardTitle>
                                <p className="text-sm text-muted-foreground">
                                  {entry.abstract}
                                </p>
                              </div>
                              <ChevronDown 
                                className={`w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 mt-1 ${
                                  isOpen ? 'rotate-180' : ''
                                }`} 
                              />
                            </div>
                          </CardHeader>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <CardContent className="pt-0 space-y-6">
                            <div>
                              <h4 className="text-sm font-semibold text-primary mb-2">Research Question</h4>
                              <p className="text-foreground text-sm leading-relaxed italic">
                                {entry.question}
                              </p>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-muted-foreground mb-2">Context</h4>
                              <p className="text-muted-foreground text-sm leading-relaxed">
                                {entry.context}
                              </p>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-2">Current Thinking</h4>
                              <p className="text-muted-foreground text-sm leading-relaxed">
                                {entry.currentThinking}
                              </p>
                            </div>
                            <div className="p-4 bg-muted/30 rounded-lg">
                              <h4 className="text-sm font-semibold text-amber-400 mb-2">Open Problems</h4>
                              <p className="text-muted-foreground text-sm leading-relaxed">
                                {entry.openProblems}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Circle className="w-3 h-3 fill-current text-primary" />
                              <span className={`text-sm font-medium ${statusConfig.color}`}>
                                {entry.status}
                              </span>
                            </div>
                          </CardContent>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResearchLogPage;
