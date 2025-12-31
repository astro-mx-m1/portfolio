import { Award, BookOpen, Code, Users, Briefcase, Trophy, GraduationCap, Crown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useSettings, getSetting } from "@/hooks/useSettings";
import SocialLinks from "@/components/SocialLinks";

const milestones = [
  {
    icon: Code,
    year: "Age 11",
    title: "Microsoft Python Certificate",
    description: "Completed my first Microsoft Python certification in Year 6, sparking a lifelong passion for programming."
  },
  {
    icon: Users,
    year: "2024",
    title: "Coding Club Founder",
    description: "Founded and lead the Avanti House Coding Club, designing curriculum and teaching Python to Year 7 to 9 students."
  },
  {
    icon: GraduationCap,
    year: "2024",
    title: "Oxford Inspire Scholar",
    description: "Selected for St John's College Oxford summer school. Led team to build the fastest solar-powered boat (11.2 seconds)."
  },
  {
    icon: Trophy,
    year: "2025",
    title: "John Locke Essay",
    description: "Received High Commendation in the John Locke Essay Competition, placing in the top 1.2% of 62,000+ entrants."
  },
  {
    icon: Award,
    year: "2025",
    title: "Bebras Excellence",
    description: "Achieved the highest score in school for the Bebras Computational Thinking Challenge with Distinction."
  },
  {
    icon: Briefcase,
    year: "2023 to Present",
    title: "IT Specialist at VMK Accountants",
    description: "Built company website, implemented cloud security, managed network infrastructure, and handled bookkeeping."
  }
];

const values = [
  { title: "Perseverance", description: "Continuous learning and growth through challenges" },
  { title: "Curiosity", description: "Exploring the 'why' behind technology and logic" },
  { title: "Leadership", description: "Empowering others through teaching and mentorship" }
];

const About = () => {
  const { data } = useSettings();
  const aboutBio = data ? getSetting(data.settingsMap, 'about_bio', 'From a young age, I have been drawn to how technology works and how it can be used to solve real problems. My interest in Computer Science began in Year 6 when I completed a Microsoft Python certification at age eleven. Since then, I have continued learning through coding projects, competitions, and independent study; it has become something I genuinely enjoy and want to pursue at the highest level.') : 'From a young age, I have been drawn to how technology works and how it can be used to solve real problems.';
  
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {aboutBio}
          </p>
          <div className="mt-6 flex justify-center">
            <SocialLinks />
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold mb-8 text-center">My Journey</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <Card 
                  key={index}
                  className="p-6 bg-card border-primary/20 hover:border-primary/50 transition-all glow-card hover:glow-border group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="text-primary" size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-primary font-semibold mb-1">{milestone.year}</div>
                      <h4 className="font-bold mb-2">{milestone.title}</h4>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold mb-8 text-center">Core Values</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card 
                key={index}
                className="p-8 text-center bg-card border-primary/20 hover:border-secondary/50 transition-all glow-card"
              >
                <h4 className="text-xl font-bold mb-3 text-secondary">{value.title}</h4>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Beyond the Classroom */}
        <div className="text-center max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6">Beyond the Classroom</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-sm">
              👑 Aspiring Head Boy
            </span>
            <span className="px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 text-sm">
              👔 Senior Prefect (Year 9 to 11)
            </span>
            <span className="px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 text-sm">
              📋 Form Representative (Year 8 to 10)
            </span>
            <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-sm">
              🏊 Pre-Competition Swimming
            </span>
            <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-sm">
              🏸 School Badminton Team
            </span>
            <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-sm">
              ⚽ Football & Basketball
            </span>
            <span className="px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 text-sm">
              🥾 Duke of Edinburgh Bronze & Silver
            </span>
            <span className="px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 text-sm">
              🎭 LAMDA Grade 5, 6, 7, 8 Distinction
            </span>
            <span className="px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-sm">
              🤝 SSVA Volunteer
            </span>
            <span className="px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-sm">
              🛡️ Anti-Bullying Ambassador
            </span>
            <span className="px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-sm">
              🎓 A-Levels: Maths, Further Maths, Computer Science, Economics
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;