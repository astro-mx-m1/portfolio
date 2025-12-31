import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Award, GraduationCap, Brain, Code, Trophy, Loader2, Cpu, Users, Palette, Globe, Calculator, Mic, Wrench, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Academic {
  id: string;
  institution: string;
  degree: string;
  field_of_study?: string;
  gpa?: number;
  start_date?: string;
  end_date?: string;
  current: boolean;
  description?: string;
}

const AcademicsPage = () => {
  const [academics, setAcademics] = useState<Academic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAcademics();
  }, []);

  const fetchAcademics = async () => {
    try {
      const { data, error } = await supabase
        .from('academics')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      setAcademics(data || []);
    } catch (error) {
      console.error('Error fetching academics:', error);
    } finally {
      setLoading(false);
    }
  };

  const iconMap = [GraduationCap, Brain, Trophy, Code, Award, BookOpen];

  const skills = [
    { 
      category: "Programming Languages", 
      icon: Code,
      items: ["Python", "JavaScript", "TypeScript", "HTML", "CSS", "SQL"] 
    },
    { 
      category: "Frameworks and Libraries", 
      icon: Cpu,
      items: ["React", "Next.js", "Node.js", "Flask", "Django", "Tailwind CSS"] 
    },
    { 
      category: "Tools and Technologies", 
      icon: Wrench,
      items: ["Git", "VS Code", "Supabase", "Vercel", "n8n", "Microsoft Excel", "Microsoft Word"] 
    },
    { 
      category: "Core Competencies", 
      icon: Brain,
      items: ["Computational Thinking", "Problem Solving", "Algorithm Design", "Software Development", "Project Management", "Analytical Skills"] 
    },
    { 
      category: "Academic Skills", 
      icon: GraduationCap,
      items: ["Mathematics", "Algebra", "Linear Algebra", "Physics", "Computer Science", "Critical Thinking", "Essays", "Academic Research"] 
    },
    { 
      category: "Communication and Leadership", 
      icon: Mic,
      items: ["Public Speaking", "Speech Writing", "Teaching", "Team Leadership", "Team Collaboration", "Communication"] 
    },
    { 
      category: "Web Development", 
      icon: Globe,
      items: ["Web Design", "Web Application Design", "Website Building", "Cascading Style Sheets", "Cybersecurity", "Cloud Computing"] 
    },
    { 
      category: "Creative and Design", 
      icon: Palette,
      items: ["Game Design", "Animation", "3D Graphics", "Graphic Design", "Film Production", "Computer Graphics Design"] 
    },
    { 
      category: "STEM and Engineering", 
      icon: Calculator,
      items: ["Engineering", "Biomimicry", "Space Systems", "Mechanics", "Construction", "Building Robots", "Statistics"] 
    },
    { 
      category: "Business and Professional", 
      icon: Users,
      items: ["Finance", "Accounting", "Marketing", "Auditing", "Brand Management", "Office Administration", "Software Research"] 
    },
    { 
      category: "Languages and Other", 
      icon: BookOpen,
      items: ["English", "Sanskrit", "Politics", "Parliamentary Procedure", "Climate Change Adaptation", "Poetry"] 
    },
    { 
      category: "Sports and Personal", 
      icon: Heart,
      items: ["Swimming", "Competitive Sports", "Hiking", "Go Kart Driving", "Volunteering", "Nonprofit Volunteering", "Team Building"] 
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background relative flex items-center justify-center">
        <StarfieldBackground />
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Academics and Skills | Mithil Katkoria</title>
        <meta name="description" content="My academic achievements, skills, certifications, and areas of expertise in computer science and beyond." />
      </Helmet>
      <div className="min-h-screen bg-background relative">
        <StarfieldBackground />
        <div className="relative z-10">
          <Navigation />
          <div className="pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16 animate-fade-in">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 glow-text">
                  Academics and Skills
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  A foundation built on curiosity, continuous learning, and academic excellence
                </p>
              </div>

              {/* Academic Achievements */}
              {academics.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                  {academics.map((academic, index) => {
                    const Icon = iconMap[index % iconMap.length];
                    const colorClass = index % 2 === 0 ? "text-primary" : "text-secondary";
                    return (
                      <Card
                        key={academic.id}
                        className="glow-card bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <CardHeader>
                          <Icon className={`w-10 h-10 ${colorClass} mb-4`} />
                          <CardTitle className="text-xl">{academic.institution}</CardTitle>
                          <div className="text-sm text-primary font-medium">
                            {academic.degree}
                            {academic.field_of_study && ` in ${academic.field_of_study}`}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-base space-y-2">
                            {academic.description && <p>{academic.description}</p>}
                            {academic.gpa && (
                              <p className="font-semibold text-primary">GPA: {academic.gpa}</p>
                            )}
                            {(academic.start_date || academic.end_date) && (
                              <p className="text-xs text-muted-foreground">
                                {academic.start_date && new Date(academic.start_date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                                {academic.start_date && academic.end_date && " to "}
                                {academic.current ? "Present" : academic.end_date && new Date(academic.end_date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                              </p>
                            )}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}

              {/* Skills Grid */}
              <div className="mt-16">
                <h2 className="text-4xl font-bold mb-8 text-center glow-text">
                  Skills and Expertise
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {skills.map((skillGroup, index) => {
                    const Icon = skillGroup.icon;
                    return (
                      <Card
                        key={index}
                        className="glow-card bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 animate-fade-in"
                        style={{ animationDelay: `${(index + 6) * 0.05}s` }}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <Icon className="w-5 h-5 text-primary" />
                            </div>
                            <CardTitle className="text-lg text-primary">
                              {skillGroup.category}
                            </CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {skillGroup.items.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-xs font-medium hover:bg-primary/20 transition-colors"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AcademicsPage;