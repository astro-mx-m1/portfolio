import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import { Card } from "@/components/ui/card";
import { Users, GraduationCap, Code2 } from "lucide-react";

const Teamwork = () => {
  const collaborations = [
    {
      title: "Avanti House Coding Club",
      role: "Founder & Lead Instructor",
      description: "Teaching programming fundamentals to younger students, developing curriculum, and fostering a collaborative learning environment.",
      icon: GraduationCap,
      impact: "20+ students taught",
      skills: ["Leadership", "Teaching", "Mentorship"]
    },
    {
      title: "School Hackathon Projects",
      role: "Team Lead",
      description: "Led teams in various coding competitions and hackathons, coordinating efforts and ensuring timely project completion.",
      icon: Code2,
      impact: "3 competitions",
      skills: ["Project Management", "Communication", "Problem Solving"]
    },
    {
      title: "Peer Programming Sessions",
      role: "Collaborator",
      description: "Regular pair programming sessions with classmates, sharing knowledge and learning from different problem-solving approaches.",
      icon: Users,
      impact: "Weekly sessions",
      skills: ["Collaboration", "Code Review", "Knowledge Sharing"]
    }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>Team & Collaboration | Mithil Katkoria</title>
        <meta name="description" content="Collaborative projects, teaching experiences, and team leadership in programming education." />
      </Helmet>
      
      <StarfieldBackground />
      <div className="relative z-10">
        <Navigation />
        
        <main className="container mx-auto px-4 py-24">
          <div className="max-w-6xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 glow-text">
              Teamwork & Collaboration
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
              Working with others to create, teach, and build; because the best solutions emerge from diverse perspectives.
            </p>

            <div className="space-y-6">
              {collaborations.map((collab, index) => {
                const Icon = collab.icon;
                return (
                  <Card key={index} className="p-8 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all glow-card">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="p-4 bg-primary/10 rounded-lg h-fit">
                        <Icon className="text-primary" size={40} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-2xl font-bold">{collab.title}</h3>
                            <p className="text-primary">{collab.role}</p>
                          </div>
                          <span className="text-sm text-muted-foreground">{collab.impact}</span>
                        </div>
                        <p className="text-muted-foreground mb-4">{collab.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {collab.skills.map((skill, i) => (
                            <span key={i} className="px-3 py-1 text-sm bg-secondary/20 text-secondary rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
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

export default Teamwork;