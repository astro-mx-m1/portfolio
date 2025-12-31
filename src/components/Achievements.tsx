import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Award, Brain, Code, MessageSquare, Mountain, Users, Trophy, BookOpen, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Achievement {
  id: string;
  title: string;
  description: string;
  date?: string;
  category?: string;
  image_url?: string;
}

const iconMap: Record<string, any> = {
  award: Award,
  brain: Brain,
  code: Code,
  message: MessageSquare,
  mountain: Mountain,
  users: Users,
  trophy: Trophy,
  book: BookOpen,
};

const Achievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      setAchievements(data || []);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="achievements" className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
          <Loader2 className="animate-spin text-primary" size={48} />
        </div>
      </section>
    );
  }

  return (
    <section id="achievements" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text">Achievements</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Recognition of dedication, excellence, and continuous growth
          </p>
        </div>

        {achievements.length === 0 ? (
          <div className="text-center text-muted-foreground">
            <p>No achievements yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => {
              const iconKey = achievement.category?.toLowerCase() || 'award';
              const Icon = iconMap[iconKey] || Award;
              const colorClass = index % 2 === 0 ? "primary" : "secondary";
              
              return (
                <Card 
                  key={achievement.id}
                  className="p-6 bg-card border-primary/20 hover:border-primary/50 transition-all glow-card hover:glow-border group relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-${colorClass}/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`} />
                  
                  <div className="relative">
                    {achievement.image_url && (
                      <div className="mb-4 overflow-hidden rounded-lg">
                        <img 
                          src={achievement.image_url} 
                          alt={achievement.title}
                          className="w-full h-32 object-cover"
                        />
                      </div>
                    )}
                    
                    <div className={`inline-flex p-3 rounded-lg bg-${colorClass}/10 mb-4 group-hover:bg-${colorClass}/20 transition-colors`}>
                      <Icon className={`text-${colorClass}`} size={28} />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {achievement.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {achievement.description}
                    </p>
                    
                    {achievement.date && (
                      <p className="text-xs text-primary/60">
                        {new Date(achievement.date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                      </p>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {achievements.length > 0 && (
          <div className="mt-16 text-center">
            <Card className="inline-block p-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="text-center md:text-left">
                  <div className="text-4xl font-bold text-primary mb-2">{achievements.length}</div>
                  <div className="text-muted-foreground">Total Achievements</div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default Achievements;
