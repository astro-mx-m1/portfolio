import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Quote, Layers, GitBranch, Repeat, AlertTriangle, Calculator, Code, ArrowRight, ArrowDown } from "lucide-react";

const ThinkingPage = () => {
  return (
    <>
      <Helmet>
        <title>Thinking in Computer Science | Mithil Katkoria</title>
        <meta name="description" content="How I approach problems: decomposition, abstraction, and the reasoning behind code." />
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
                  Thinking in Computer Science
                </h1>
                <p className="text-lg text-muted-foreground italic max-w-2xl mx-auto">
                  Making reasoning visible.
                </p>
              </div>

              {/* Opening Quote */}
              <div className="flex items-start gap-3 p-6 bg-primary/5 rounded-lg border border-primary/20 mb-12">
                <Quote className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <p className="text-foreground text-lg italic">
                  "Code is a consequence of thought."
                </p>
              </div>

              {/* Section 1: Problem Decomposition */}
              <Card className="bg-card/50 border-border/50 mb-8">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Layers className="w-5 h-5 text-primary" />
                    Problem Decomposition
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Every complex problem is a collection of simpler problems wearing a trench coat. 
                    The skill isn't in solving the complex problem directly—it's in seeing the seams 
                    where it can be pulled apart.
                  </p>

                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm font-semibold text-foreground mb-3">Example: "Build a search feature"</p>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded">1</span>
                        <span className="text-muted-foreground">Parse and validate user input</span>
                      </div>
                      <ArrowDown className="w-4 h-4 text-muted-foreground ml-4" />
                      <div className="flex items-center gap-2 text-sm">
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded">2</span>
                        <span className="text-muted-foreground">Determine what data sources to query</span>
                      </div>
                      <ArrowDown className="w-4 h-4 text-muted-foreground ml-4" />
                      <div className="flex items-center gap-2 text-sm">
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded">3</span>
                        <span className="text-muted-foreground">Execute queries efficiently</span>
                      </div>
                      <ArrowDown className="w-4 h-4 text-muted-foreground ml-4" />
                      <div className="flex items-center gap-2 text-sm">
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded">4</span>
                        <span className="text-muted-foreground">Rank and filter results</span>
                      </div>
                      <ArrowDown className="w-4 h-4 text-muted-foreground ml-4" />
                      <div className="flex items-center gap-2 text-sm">
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded">5</span>
                        <span className="text-muted-foreground">Present results with feedback</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm">
                    Each sub-problem has its own concerns. Parsing doesn't care about ranking. 
                    Ranking doesn't care about presentation. Clean decomposition makes each piece 
                    independently testable and replaceable.
                  </p>
                </CardContent>
              </Card>

              {/* Section 2: Recursion vs Iteration */}
              <Card className="bg-card/50 border-border/50 mb-8">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Repeat className="w-5 h-5 text-primary" />
                    Recursion vs. Iteration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Recursion and iteration are computationally equivalent—anything one can do, 
                    the other can too. The choice isn't about capability; it's about clarity.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-400/5 rounded-lg border border-green-400/20">
                      <p className="text-sm font-semibold text-green-400 mb-2">Prefer Recursion When:</p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• The problem has a natural recursive structure (trees, fractals)</li>
                        <li>• Base cases and recursive cases map cleanly to the domain</li>
                        <li>• The recursive solution is dramatically clearer</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-blue-400/5 rounded-lg border border-blue-400/20">
                      <p className="text-sm font-semibold text-blue-400 mb-2">Prefer Iteration When:</p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Stack depth could become a problem</li>
                        <li>• The operation is fundamentally sequential</li>
                        <li>• Performance is critical and TCO isn't guaranteed</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 bg-muted/30 rounded-lg font-mono text-sm">
                    <p className="text-muted-foreground mb-2">// Tree traversal: recursion is natural</p>
                    <p className="text-foreground">function traverse(node) {"{"}</p>
                    <p className="text-foreground ml-4">if (!node) return;</p>
                    <p className="text-foreground ml-4">process(node);</p>
                    <p className="text-foreground ml-4">traverse(node.left);</p>
                    <p className="text-foreground ml-4">traverse(node.right);</p>
                    <p className="text-foreground">{"}"}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Section 3: Abstractions Leaking */}
              <Card className="bg-card/50 border-border/50 mb-8">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                    When Abstractions Leak
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Every abstraction hides complexity. A good abstraction hides complexity you don't 
                    need to care about. A leaky abstraction forces you to understand what it was 
                    supposed to hide.
                  </p>

                  <div className="p-4 bg-amber-400/5 rounded-lg border border-amber-400/20">
                    <p className="text-sm font-semibold text-amber-400 mb-3">Classic Leaky Abstractions:</p>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 mt-1">•</span>
                        <span><strong>SQL over networks:</strong> The ORM pretends the database is local, until latency matters.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 mt-1">•</span>
                        <span><strong>Strings as bytes:</strong> Works until you encounter Unicode normalization forms.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 mt-1">•</span>
                        <span><strong>Promises as values:</strong> Convenient until you need to cancel pending operations.</span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-muted-foreground text-sm">
                    The goal isn't to avoid abstractions—it's to know where the seams are, so you're 
                    not surprised when they split.
                  </p>
                </CardContent>
              </Card>

              {/* Section 4: When Maths Matters */}
              <Card className="bg-card/50 border-border/50 mb-8">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-primary" />
                    When Maths Matters in Code
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Most code doesn't require advanced mathematics. But when it does, recognising 
                    the mathematical structure unlocks solutions that would otherwise be invisible.
                  </p>

                  <div className="grid gap-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="text-sm font-semibold text-foreground mb-2">Logarithms in Algorithms</p>
                      <p className="text-muted-foreground text-sm mb-3">
                        When you see O(log n), you're usually seeing halving. Binary search, balanced 
                        trees, and divide-and-conquer all exploit the fact that log₂(1,000,000) ≈ 20.
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded font-mono">1M items</span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        <span className="px-2 py-1 bg-green-400/10 text-green-400 rounded font-mono">~20 operations</span>
                      </div>
                    </div>

                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="text-sm font-semibold text-foreground mb-2">Graph Theory in Routing</p>
                      <p className="text-muted-foreground text-sm">
                        Navigation, network flows, dependency resolution—all graph problems. 
                        Recognising a dependency graph lets you apply topological sort. 
                        Recognising a shortest-path problem lets you apply Dijkstra.
                      </p>
                    </div>

                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="text-sm font-semibold text-foreground mb-2">Recursion as Induction</p>
                      <p className="text-muted-foreground text-sm">
                        A correct recursive solution is a proof by induction. The base case is your 
                        P(0). The recursive case is your P(k) → P(k+1). If both are right, correctness 
                        follows mathematically.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 5: Reasoning Summary */}
              <Card className="bg-card/50 border-border/50 mb-12">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Code className="w-5 h-5 text-primary" />
                    The Reasoning Process
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    When I approach a new problem, I follow a mental checklist:
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm font-semibold shrink-0">1</span>
                      <div>
                        <p className="font-medium text-foreground">Understand before solving</p>
                        <p className="text-sm text-muted-foreground">What is actually being asked? What are the constraints?</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm font-semibold shrink-0">2</span>
                      <div>
                        <p className="font-medium text-foreground">Find the shape</p>
                        <p className="text-sm text-muted-foreground">Is this a graph problem? A search problem? A transformation?</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm font-semibold shrink-0">3</span>
                      <div>
                        <p className="font-medium text-foreground">Consider the boundaries</p>
                        <p className="text-sm text-muted-foreground">What happens at n=0? n=1? n=max?</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm font-semibold shrink-0">4</span>
                      <div>
                        <p className="font-medium text-foreground">Start simple, then refine</p>
                        <p className="text-sm text-muted-foreground">A working brute-force solution teaches you about the problem.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm font-semibold shrink-0">5</span>
                      <div>
                        <p className="font-medium text-foreground">Question the solution</p>
                        <p className="text-sm text-muted-foreground">Does it handle edge cases? Is it testable? Is it maintainable?</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Closing Quote */}
              <div className="p-6 bg-card/50 rounded-lg border border-primary/20 text-center">
                <Quote className="w-6 h-6 text-primary mx-auto mb-4" />
                <p className="text-foreground italic text-lg mb-2">
                  "The purpose of abstraction is not to be vague, but to create a new semantic level 
                  in which one can be absolutely precise."
                </p>
                <p className="text-muted-foreground text-sm">— Edsger W. Dijkstra</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThinkingPage;
