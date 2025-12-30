import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import CertificateTimeline from "@/components/CertificateTimeline";
import StarfieldBackground from "@/components/StarfieldBackground";

const AchievementsPage = () => {
  return (
    <>
      <Helmet>
        <title>Achievements and Certificates | Mithil Katkoria</title>
        <meta name="description" content="My academic achievements, certificates, awards, and recognition from competitions and programs." />
      </Helmet>
      <div className="min-h-screen bg-background relative">
        <StarfieldBackground />
        <div className="relative z-10">
          <Navigation />
          <div className="pt-24 pb-16">
            <div className="max-w-5xl mx-auto px-4">
              <div className="text-center mb-16 animate-fade-in">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 glow-text">
                  Achievements and Certificates
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  A journey of recognition, growth, and continuous achievement
                </p>
              </div>
              
              <CertificateTimeline />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AchievementsPage;