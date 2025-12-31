import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ExternalLink } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  date?: string;
  category?: string;
  image_url?: string;
}

const formatMonthYear = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
};

const CertificateTimeline = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('date', { ascending: false });
      
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
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (achievements.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12">
        <p>No certificates yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="relative py-8">
      {/* Vertical line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />
      
      <div className="space-y-8">
        {achievements.map((achievement, index) => {
          const isEven = index % 2 === 0;
          const isHighlighted = highlightedId === achievement.id;
          
          return (
            <div
              key={achievement.id}
              className={`relative flex items-center ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHighlightedId(achievement.id)}
              onMouseLeave={() => setHighlightedId(null)}
            >
              {/* Timeline dot */}
              <div
                className={`absolute left-4 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 transition-all duration-300 z-10 ${
                  isHighlighted
                    ? 'bg-primary shadow-lg shadow-primary/50 animate-glow-pulse'
                    : 'bg-primary/60 hover:bg-primary'
                }`}
              />
              
              {/* Content card */}
              <div
                className={`ml-10 md:ml-0 md:w-1/2 ${
                  isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                } animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`group p-5 rounded-xl bg-card/30 backdrop-blur-sm border transition-all duration-300 ${
                    isHighlighted
                      ? 'border-primary/30 shadow-lg shadow-primary/5'
                      : 'border-border/50 hover:border-primary/30'
                  }`}
                >
                  {/* Year badge */}
                  {achievement.date && (
                    <span className="text-xs font-medium text-primary mb-2 block">
                      {formatMonthYear(achievement.date)}
                    </span>
                  )}
                  
                  {/* Title */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {achievement.title}
                    </h3>
                    {achievement.image_url && (
                      <a 
                        href={achievement.image_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="shrink-0 p-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                        title="View Certificate"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                  
                  {/* Category badge */}
                  {achievement.category && (
                    <span className="inline-block mt-3 px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                      {achievement.category}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Summary */}
      <div className="mt-16 text-center">
        <div className="inline-block p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30">
          <div className="text-4xl font-bold text-primary mb-2">{achievements.length}</div>
          <div className="text-muted-foreground">Certificates and Awards</div>
        </div>
      </div>
    </div>
  );
};

export default CertificateTimeline;