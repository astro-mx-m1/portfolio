import { Helmet } from "react-helmet";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, AlertCircle, AlertTriangle, Info, ArrowRight, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Mistake {
  id: string;
  title: string;
  severity: "minor" | "moderate" | "critical";
  context: string;
  mistake: string;
  consequences: string;
  whatChanged: string;
}

const mistakes: Mistake[] = [
  {
    id: "1",
    title: "Optimising Too Early",
    severity: "moderate",
    context: "While building a data processing pipeline, I spent two weeks implementing a complex caching layer with Redis before the system had any real users.",
    mistake: "I assumed the bottleneck would be database reads without measuring actual performance. I built infrastructure for problems that didn't exist yet.",
    consequences: "The caching layer added significant complexity to the codebase, made debugging harder, and introduced subtle consistency bugs. When we finally got users, the actual bottleneck was in a completely different part of the system.",
    whatChanged: "I now follow the principle: make it work, make it right, make it fast—in that order. I measure before optimising and resist the urge to solve hypothetical problems."
  },
  {
    id: "2",
    title: "Over-engineering Authentication",
    severity: "critical",
    context: "For a small internal tool, I implemented a full OAuth2 flow with JWT tokens, refresh token rotation, and custom session management.",
    mistake: "The tool had 5 users, all on the same network. A simple password-protected page would have sufficed. I confused 'what I wanted to learn' with 'what the project needed'.",
    consequences: "The auth system became a source of bugs, especially around token expiration. Maintenance overhead was disproportionate to the project's value. Two critical security vulnerabilities emerged from my incomplete understanding of OAuth2.",
    whatChanged: "I now ask: 'What is the simplest solution that meets actual requirements?' Complexity must be justified by real constraints, not imagined ones."
  },
  {
    id: "3",
    title: "Ignoring Edge Cases in User Input",
    severity: "critical",
    context: "Building a form that accepted user names, I validated only for empty strings and maximum length.",
    mistake: "I didn't consider: Unicode characters, zero-width spaces, SQL injection via names, excessively long single words, or names with only whitespace after trimming.",
    consequences: "A user with an emoji in their name crashed the PDF generation system. Another user discovered they could inject HTML that rendered in admin emails.",
    whatChanged: "I now maintain a personal checklist of edge cases for common input types. I treat user input as adversarial by default, not trusting any data that crosses a trust boundary."
  },
  {
    id: "4",
    title: "Fetching All Data Client-Side",
    severity: "moderate",
    context: "I built a dashboard that displayed project statistics by fetching all projects and computing metrics in the browser.",
    mistake: "This worked fine with 50 projects. With 5000 projects, the page took 12 seconds to load and crashed on mobile devices due to memory constraints.",
    consequences: "Users complained about performance. We had to implement pagination and server-side aggregation as an emergency fix, introducing bugs in the process.",
    whatChanged: "I now design data flows assuming 100x the current scale. I default to server-side computation for anything beyond simple filtering or sorting."
  },
  {
    id: "5",
    title: "Not Designing for Failure",
    severity: "moderate",
    context: "An API integration assumed the external service would always respond within 100ms and never fail.",
    mistake: "No timeout handling, no retry logic, no circuit breaker, no fallback. When the external API went down, my entire application became unresponsive.",
    consequences: "A 30-minute outage of a non-critical third-party service caused a 30-minute outage of my critical application. Users lost work because the frontend froze waiting for responses.",
    whatChanged: "I now assume every external call will fail. I design explicit timeout, retry, and degradation strategies before writing integration code."
  },
  {
    id: "6",
    title: "Coupling Business Logic to UI Components",
    severity: "minor",
    context: "In a React application, I embedded complex validation and transformation logic directly in form components.",
    mistake: "The logic became impossible to test in isolation. When requirements changed, I had to modify multiple components that duplicated the same logic.",
    consequences: "Test coverage dropped because testing required rendering full components. A validation change required updates in 7 different files, and I missed one, causing a bug in production.",
    whatChanged: "I now extract business logic into pure functions or dedicated modules. Components should orchestrate, not calculate. This makes code testable, reusable, and easier to reason about."
  }
];

const getSeverityConfig = (severity: Mistake["severity"]) => {
  switch (severity) {
    case "minor":
      return { 
        icon: Info, 
        color: "text-green-400", 
        bg: "bg-green-400/10", 
        border: "border-green-400/30",
        label: "Minor"
      };
    case "moderate":
      return { 
        icon: AlertTriangle, 
        color: "text-yellow-400", 
        bg: "bg-yellow-400/10", 
        border: "border-yellow-400/30",
        label: "Moderate"
      };
    case "critical":
      return { 
        icon: AlertCircle, 
        color: "text-red-400", 
        bg: "bg-red-400/10", 
        border: "border-red-400/30",
        label: "Critical"
      };
  }
};

const MistakesPage = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <>
      <Helmet>
        <title>Mistakes I've Made | Mithil Katkoria</title>
        <meta name="description" content="Honest reflections on technical mistakes and the lessons they taught me about software engineering." />
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
                  Mistakes I've Made
                </h1>
                <p className="text-lg text-muted-foreground italic">
                  (and Why I'm Glad I Made Them)
                </p>
                <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                  Learning happens when assumptions break.
                </p>
              </div>

              {/* Philosophy Block */}
              <Card className="mb-12 bg-card/50 border-primary/20">
                <CardContent className="pt-6">
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Mistakes are feedback loops. Every bug, every architectural misstep, every 
                    "why did I do it that way" moment is a compressed lesson about how systems 
                    actually behave versus how we imagine they will. Real understanding of computer 
                    science doesn't come from reading textbooks—it comes from breaking abstractions 
                    and rebuilding them with deeper insight.
                  </p>
                  <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <Quote className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <p className="text-foreground italic">
                      "I don't try to avoid mistakes—I try to understand them."
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Mistake Cards */}
              <div className="space-y-4 mb-16">
                {mistakes.map((mistake, index) => {
                  const severityConfig = getSeverityConfig(mistake.severity);
                  const SeverityIcon = severityConfig.icon;
                  const isOpen = openItems.includes(mistake.id);

                  return (
                    <Collapsible
                      key={mistake.id}
                      open={isOpen}
                      onOpenChange={() => toggleItem(mistake.id)}
                    >
                      <Card 
                        className={`bg-card/50 border-border/50 transition-all duration-300 ${
                          isOpen ? 'border-primary/30 glow-card' : 'hover:border-primary/20'
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <CollapsibleTrigger className="w-full">
                          <CardHeader className="cursor-pointer">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <CardTitle className="text-lg text-left">
                                  {mistake.title}
                                </CardTitle>
                                <Badge 
                                  variant="outline" 
                                  className={`${severityConfig.bg} ${severityConfig.border} ${severityConfig.color}`}
                                >
                                  <SeverityIcon className="w-3 h-3 mr-1" />
                                  {severityConfig.label}
                                </Badge>
                              </div>
                              <ChevronDown 
                                className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
                                  isOpen ? 'rotate-180' : ''
                                }`} 
                              />
                            </div>
                          </CardHeader>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <CardContent className="pt-0 space-y-6">
                            <div>
                              <h4 className="text-sm font-semibold text-primary mb-2">Context</h4>
                              <p className="text-muted-foreground text-sm leading-relaxed">
                                {mistake.context}
                              </p>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-red-400 mb-2">The Mistake</h4>
                              <p className="text-muted-foreground text-sm leading-relaxed">
                                {mistake.mistake}
                              </p>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-yellow-400 mb-2">Consequences</h4>
                              <p className="text-muted-foreground text-sm leading-relaxed">
                                {mistake.consequences}
                              </p>
                            </div>
                            <div className="p-4 bg-green-400/5 rounded-lg border border-green-400/20">
                              <h4 className="text-sm font-semibold text-green-400 mb-2">What Changed</h4>
                              <p className="text-muted-foreground text-sm leading-relaxed">
                                {mistake.whatChanged}
                              </p>
                            </div>
                          </CardContent>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  );
                })}
              </div>

              {/* Reflection Summary */}
              <Card className="mb-12 bg-card/50 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl">Patterns & Principles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Looking across these mistakes, I see recurring themes: premature abstraction, 
                    insufficient measurement, and underestimating the gap between theory and practice. 
                    These experiences have shaped several principles that now guide my work:
                  </p>
                  
                  {/* Visual Flow */}
                  <div className="flex flex-wrap items-center justify-center gap-2 py-6 text-sm">
                    <span className="px-3 py-2 bg-muted rounded-lg">Assumption</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <span className="px-3 py-2 bg-red-400/10 text-red-400 rounded-lg">Failure</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <span className="px-3 py-2 bg-yellow-400/10 text-yellow-400 rounded-lg">Insight</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <span className="px-3 py-2 bg-green-400/10 text-green-400 rounded-lg">Principle</span>
                  </div>

                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Measure before optimising; data beats intuition.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Complexity must be justified by real constraints, not imagined ones.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Design for failure; assume every external dependency will break.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Separate concerns ruthlessly; tangled code becomes untestable code.
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Interview Hook */}
              <div className="p-6 bg-primary/5 rounded-lg border border-primary/20 text-center">
                <p className="text-foreground italic">
                  "These mistakes shape how I now approach every technical problem."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MistakesPage;
