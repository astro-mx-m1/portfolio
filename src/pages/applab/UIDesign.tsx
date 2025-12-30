import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import { Card } from "@/components/ui/card";
import { Palette, Layout, Smartphone } from "lucide-react";

const UIDesign = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>UI/UX Design | Mithil Katkoria</title>
        <meta name="description" content="Design mockups, prototypes, and user interface explorations for StudySync application." />
      </Helmet>
      
      <StarfieldBackground />
      <div className="relative z-10">
        <Navigation />
        
        <main className="container mx-auto px-4 py-24">
          <div className="max-w-6xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 glow-text">
              UI/UX Design
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
              Design mockups and prototypes showing the evolution from concept to polished interface.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 text-center">
                <Palette className="text-primary mx-auto mb-3" size={32} />
                <h3 className="text-xl font-bold mb-2">Color System</h3>
                <p className="text-sm text-muted-foreground">
                  Neural blue & electric violet palette with semantic tokens
                </p>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 text-center">
                <Layout className="text-secondary mx-auto mb-3" size={32} />
                <h3 className="text-xl font-bold mb-2">Layout Grid</h3>
                <p className="text-sm text-muted-foreground">
                  12-column responsive grid system with consistent spacing
                </p>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 text-center">
                <Smartphone className="text-primary mx-auto mb-3" size={32} />
                <h3 className="text-xl font-bold mb-2">Mobile First</h3>
                <p className="text-sm text-muted-foreground">
                  Responsive design from 320px to ultra-wide displays
                </p>
              </Card>
            </div>

            <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/20 glow-card min-h-[500px] flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Design Mockups</h3>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Figma prototypes and design iterations will be embedded here, 
                  showing the complete design system and user flows.
                </p>
                <div className="inline-block px-6 py-3 bg-primary/10 text-primary rounded-lg">
                  Figma Embed Coming Soon
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UIDesign;