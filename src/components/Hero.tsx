import profilePhoto from "@/assets/profile-photo.png";
import { useSettings, getSetting } from "@/hooks/useSettings";
import { Crown } from "lucide-react";

const Hero = () => {
  const { data, isLoading } = useSettings();
  
  // Wait for settings to load to prevent flash of default content
  const siteTitle = data ? getSetting(data.settingsMap, 'site_title', 'Mithil Katkoria') : 'Mithil Katkoria';
  const siteTagline = data ? getSetting(data.settingsMap, 'hero_tagline', 'Curiosity is my favourite algorithm.') : 'Curiosity is my favourite algorithm.';
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
        {/* Circular Photo with Float Animation */}
        <div className="mb-12 flex justify-center">
          <div className="relative">
            <img 
              src={profilePhoto} 
              alt="Mithil Katkoria"
              className="w-64 h-64 rounded-full object-cover animate-float glow-border"
            />
          </div>
        </div>

        {/* Name */}
        <h1 className="text-6xl md:text-7xl font-bold mb-6 glow-text" style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
          {siteTitle}
        </h1>

        {/* Tagline */}
        <p className="text-2xl md:text-3xl text-muted-foreground/90 font-light tracking-wide mb-4" style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
          {siteTagline}
        </p>

        {/* Aspiration Badge */}
        <div className="flex justify-center mt-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary">
            <Crown size={18} />
            <span className="text-sm font-medium">Aspiring Head Boy</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;