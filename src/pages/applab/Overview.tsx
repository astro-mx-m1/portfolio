import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import { Card } from "@/components/ui/card";
import { Rocket, Target, Users, Lightbulb } from "lucide-react";

const Overview = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>App Lab Overview | Mithil Katkoria</title>
        <meta name="description" content="My app development laboratory - building the future one feature at a time." />
      </Helmet>
      
      <StarfieldBackground />
      <div className="relative z-10">
        <Navigation />
        
        <main className="container mx-auto px-4 py-24">
          <div className="max-w-6xl mx-auto animate-fade-in">
            <div className="flex items-center gap-4 mb-6">
              <Rocket className="text-primary" size={48} />
              <h1 className="text-5xl md:text-6xl font-bold glow-text">
                App Lab
              </h1>
            </div>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
              My experimental space for building real-world applications; from concept to deployment.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 glow-card">
                <Target className="text-primary mb-4" size={32} />
                <h3 className="text-2xl font-bold mb-3">Mission</h3>
                <p className="text-muted-foreground">
                  To create applications that solve real problems while exploring modern development practices, 
                  clean architecture, and user-centered design.
                </p>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 glow-card">
                <Users className="text-secondary mb-4" size={32} />
                <h3 className="text-2xl font-bold mb-3">Target Users</h3>
                <p className="text-muted-foreground">
                  Students, educators, and curious minds seeking tools that make learning and collaboration more effective and enjoyable.
                </p>
              </Card>
            </div>

            <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/20 glow-card">
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="text-primary" size={32} />
                <h2 className="text-3xl font-bold">Current Project</h2>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary">StudySync</h3>
                <p className="text-lg text-muted-foreground">
                  A collaborative learning platform that helps students organize their study materials, 
                  track progress, and connect with study partners. Features include:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Smart note organization with tagging
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Progress tracking and analytics
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Collaborative study sessions
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    AI-powered study recommendations
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Overview;