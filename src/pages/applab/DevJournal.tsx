import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Code2, Bug, Lightbulb } from "lucide-react";

const DevJournal = () => {
  const entries = [
    {
      date: "Week 12 - Jan 2025",
      type: "Progress",
      icon: Code2,
      title: "Authentication System Complete",
      content: "Implemented secure user authentication with email verification and password recovery. Using JWT tokens and refresh token rotation for security."
    },
    {
      date: "Week 11 - Jan 2025",
      type: "Challenge",
      icon: Bug,
      title: "State Management Refactor",
      content: "Ran into prop-drilling issues with deeply nested components. Refactored to use Context API for global state. Much cleaner architecture now."
    },
    {
      date: "Week 10 - Dec 2024",
      type: "Idea",
      icon: Lightbulb,
      title: "AI Study Recommendations",
      content: "Exploring integration of AI to suggest study materials based on user's learning patterns and goals. Researching ethical implications of personalized algorithms."
    },
    {
      date: "Week 9 - Dec 2024",
      type: "Progress",
      icon: Code2,
      title: "Database Schema Finalized",
      content: "Completed database design with proper normalization. Implemented RLS policies for secure data access. All tables have proper indexes for performance."
    }
  ];

  const getIconColor = (type: string) => {
    switch(type) {
      case "Progress": return "text-primary";
      case "Challenge": return "text-secondary";
      case "Idea": return "text-accent";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>Development Journal | Mithil Katkoria</title>
        <meta name="description" content="Weekly development log documenting progress, challenges, and insights from building StudySync." />
      </Helmet>
      
      <StarfieldBackground />
      <div className="relative z-10">
        <Navigation />
        
        <main className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 glow-text">
              Development Journal
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              A transparent log of my development process; documenting wins, challenges, and lessons learned.
            </p>

            <div className="space-y-6">
              {entries.map((entry, index) => {
                const Icon = entry.icon;
                return (
                  <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/30 transition-all">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 bg-muted/20 rounded-lg ${getIconColor(entry.type)}`}>
                        <Icon size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <Calendar size={16} className="text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{entry.date}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {entry.type}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{entry.title}</h3>
                        <p className="text-muted-foreground">{entry.content}</p>
                      </div>
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

export default DevJournal;