import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Code2, Heart, Mountain, Trophy, Target, Loader2, Crown, Shield, Dumbbell } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Leadership {
  id: string;
  organization: string;
  role: string;
  start_date?: string;
  end_date?: string;
  current: boolean;
  description?: string;
}

const LeadershipPage = () => {
  const [activities, setActivities] = useState<Leadership[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeadership();
  }, []);

  const fetchLeadership = async () => {
    try {
      const { data, error } = await supabase
        .from('leadership')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error fetching leadership:', error);
    } finally {
      setLoading(false);
    }
  };

  const iconMap = [Code2, Users, Mountain, Trophy, Heart, Target];

  const leadershipRoles = [
    { 
      title: "Aspiring Head Boy", 
      description: "Working towards becoming Head Boy and leading the school community",
      icon: Crown,
      status: "Current Goal"
    },
    { 
      title: "Senior Prefect", 
      description: "Part of the student leadership team from Year 9 to Year 11",
      icon: Users,
      status: "Year 9 to 11"
    },
    { 
      title: "Form Representative", 
      description: "Representing my form and voicing student concerns",
      icon: Target,
      status: "Year 8 to 10"
    },
    { 
      title: "Anti-Bullying Ambassador", 
      description: "Promoting a safe and inclusive school environment",
      icon: Shield,
      status: "Active"
    }
  ];

  const activitiesData = [
    { 
      category: "Sports",
      items: [
        { name: "Swimming", detail: "Previously in pre-competitive swimming" },
        { name: "Badminton", detail: "Part of the school badminton team" },
        { name: "Football", detail: "Love playing recreationally" },
        { name: "Basketball", detail: "Regular player" },
        { name: "Skiing", detail: "Enjoy on holidays" }
      ]
    },
    {
      category: "Volunteering",
      items: [
        { name: "SSVA Volunteer", detail: "Helping organise events and supporting administrative tasks; giving back to the community" }
      ]
    }
  ];

  const values = [
    { value: "Teamwork", description: "Collaborating to achieve shared goals" },
    { value: "Perseverance", description: "Pushing through challenges to grow" },
    { value: "Service", description: "Giving back to the community" },
    { value: "Balance", description: "Harmonizing academics, sports, and leadership" }
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
        <title>Leadership and Activities | Mithil Katkoria</title>
        <meta name="description" content="My leadership roles, extracurricular activities, sports, and community involvement." />
      </Helmet>
      <div className="min-h-screen bg-background relative">
        <StarfieldBackground />
        <div className="relative z-10">
          <Navigation />
          <div className="pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16 animate-fade-in">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 glow-text">
                  Leadership and Activities
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Beyond academics; leading, teaching, competing, and growing
                </p>
              </div>

              {/* Leadership Roles */}
              <div className="mb-16">
                <h2 className="text-4xl font-bold mb-8 text-center glow-text">
                  Leadership Roles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {leadershipRoles.map((role, index) => {
                    const Icon = role.icon;
                    return (
                      <Card
                        key={index}
                        className="glow-card bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <CardHeader>
                          <div className="flex items-start gap-4">
                            <Icon className="w-10 h-10 text-primary flex-shrink-0" />
                            <div>
                              <CardTitle className="text-xl mb-2">{role.title}</CardTitle>
                              <div className="text-xs text-primary font-medium mb-2">{role.status}</div>
                              <CardDescription className="text-base">
                                {role.description}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Database Leadership Activities */}
              {activities.length > 0 && (
                <div className="space-y-8 mb-16">
                  {activities.map((activity, index) => {
                    const Icon = iconMap[index % iconMap.length];
                    const colorClass = index % 2 === 0 ? "text-primary" : "text-secondary";
                    return (
                      <Card
                        key={activity.id}
                        className="glow-card bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 animate-fade-in"
                        style={{ animationDelay: `${index * 0.15}s` }}
                      >
                        <CardHeader>
                          <div className="flex items-start gap-4">
                            <Icon className={`w-12 h-12 ${colorClass} flex-shrink-0`} />
                            <div>
                              <CardTitle className="text-2xl mb-2">{activity.organization}</CardTitle>
                              <div className="text-sm font-medium text-primary mb-3">
                                {activity.role}
                              </div>
                              {(activity.start_date || activity.end_date) && (
                                <div className="text-xs text-muted-foreground">
                                  {activity.start_date && new Date(activity.start_date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                                  {activity.start_date && (activity.end_date || activity.current) && " to "}
                                  {activity.current ? "Present" : activity.end_date && new Date(activity.end_date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                                </div>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        {activity.description && (
                          <CardContent className="space-y-3">
                            <CardDescription className="text-base">
                              {activity.description}
                            </CardDescription>
                          </CardContent>
                        )}
                      </Card>
                    );
                  })}
                </div>
              )}

              {/* Activities Section */}
              <div className="mb-16">
                <h2 className="text-4xl font-bold mb-8 text-center glow-text">
                  Activities and Sports
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activitiesData.map((category, index) => (
                    <Card
                      key={index}
                      className="glow-card bg-card/50 backdrop-blur-sm border-primary/20 animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardHeader>
                        <CardTitle className="text-2xl text-primary flex items-center gap-2">
                          <Dumbbell className="w-6 h-6" />
                          {category.category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {category.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <div>
                                <span className="font-medium">{item.name}</span>
                                <span className="text-muted-foreground"> - {item.detail}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Core Values */}
              <div>
                <h2 className="text-4xl font-bold mb-8 text-center glow-text">
                  Core Values
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {values.map((item, index) => (
                    <Card
                      key={index}
                      className="glow-card bg-card/50 backdrop-blur-sm border-primary/20 animate-fade-in"
                      style={{ animationDelay: `${(index + 6) * 0.1}s` }}
                    >
                      <CardHeader>
                        <CardTitle className="text-2xl text-primary">
                          {item.value}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">
                          {item.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadershipPage;