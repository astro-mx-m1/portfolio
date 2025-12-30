import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const Essays = () => {
  const essays = [
    {
      title: "Objectivity in Human and Algorithmic Systems",
      date: "2024",
      category: "AI Ethics",
      abstract: "This essay explores whether true objectivity exists in either human cognition or machine learning algorithms. Drawing on Locke's theory of perception and contemporary AI research, I argue that both systems operate through interpretive filters shaped by data selection, feature engineering, and underlying assumptions.",
      tags: ["Philosophy", "AI", "Ethics", "Epistemology"],
      status: "Published"
    },
    {
      title: "The Mathematics of Fairness in ML",
      date: "2024",
      category: "Technical",
      abstract: "An exploration of how fairness metrics can conflict in machine learning systems, and why achieving 'fairness' is not merely a technical challenge but a deeply philosophical one requiring value judgments.",
      tags: ["Machine Learning", "Ethics", "Mathematics"],
      status: "Draft"
    },
    {
      title: "From Python at 10 to AI at 15",
      date: "2025",
      category: "Reflection",
      abstract: "A personal reflection on my journey through computer science, from early programming certificates to grappling with the philosophical implications of artificial intelligence.",
      tags: ["Personal", "Learning", "Growth"],
      status: "In Progress"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>Essays & Writings | Mithil Katkoria</title>
        <meta name="description" content="Collection of essays exploring AI, philosophy, ethics, and the intersection of technology and human understanding." />
      </Helmet>
      
      <StarfieldBackground />
      <div className="relative z-10">
        <Navigation />
        
        <main className="container mx-auto px-4 py-24">
          <div className="max-w-6xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 glow-text">
              Essays & Writings
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
              Thoughts on artificial intelligence, ethics, and the philosophical questions that emerge at the intersection of logic and humanity.
            </p>

            <div className="space-y-6">
              {essays.map((essay, index) => (
                <Card key={index} className="p-8 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all glow-card">
                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <FileText className="text-primary" size={32} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-2xl font-bold mb-1">{essay.title}</h3>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span>{essay.date}</span>
                            <span>•</span>
                            <span className="text-primary">{essay.category}</span>
                          </div>
                        </div>
                        <Badge variant={essay.status === "Published" ? "default" : "secondary"}>
                          {essay.status}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {essay.abstract}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {essay.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                      
                      {essay.status === "Published" && (
                        <Button size="sm" variant="outline" className="gap-2">
                          <Download size={16} />
                          Download PDF
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Essays;