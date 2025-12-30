import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Research from "@/components/Research";
import CertificateTimeline from "@/components/CertificateTimeline";
import Contact from "@/components/Contact";
import StarfieldBackground from "@/components/StarfieldBackground";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <StarfieldBackground />
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <About />
        <Projects limit={4} showViewAll={true} />
        <Research />
        
        {/* Achievements Timeline Section */}
        <section id="achievements" className="py-24 px-4 relative">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text">Certificates & Awards</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A timeline of achievements, certifications, and recognitions
              </p>
            </div>
            <CertificateTimeline />
          </div>
        </section>
        
        <Contact />
        
        {/* Footer */}
        <footer className="py-8 px-4 border-t border-primary/20 text-center text-sm text-muted-foreground">
          <p>© 2025 Mithil Katkoria. Built with curiosity and code.</p>
          <p className="mt-2 font-mono text-xs">
            "Exploring intelligence, human and artificial, through logic, creativity, and continuous learning."
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;