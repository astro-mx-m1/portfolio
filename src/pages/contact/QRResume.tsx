import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, QrCode, Share2 } from "lucide-react";

const QRResume = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>QR Resume | Mithil Katkoria</title>
        <meta name="description" content="Download or scan my digital resume - quick access to my portfolio and contact information." />
      </Helmet>
      
      <StarfieldBackground />
      <div className="relative z-10">
        <Navigation />
        
        <main className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="text-center mb-12">
              <QrCode className="text-primary mx-auto mb-4" size={64} />
              <h1 className="text-5xl md:text-6xl font-bold mb-6 glow-text">
                QR Resume
              </h1>
              <p className="text-xl text-muted-foreground">
                Quick access to my portfolio; scan or download
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/20 glow-card">
                <h2 className="text-2xl font-bold mb-6 text-center">Scan to Visit</h2>
                <div className="w-64 h-64 mx-auto bg-muted/20 rounded-lg flex items-center justify-center mb-6">
                  <QrCode className="text-primary" size={200} />
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  Scan this QR code with your phone to visit my portfolio
                </p>
              </Card>

              <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/20 glow-card">
                <h2 className="text-2xl font-bold mb-6">Download Resume</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Get a comprehensive PDF version of my resume including:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Full project portfolio
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Technical skills and certifications
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Academic achievements
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Leadership experience
                    </li>
                  </ul>
                  <div className="pt-4 space-y-3">
                    <Button className="w-full gap-2" size="lg">
                      <Download size={20} />
                      Download PDF Resume
                    </Button>
                    <Button variant="outline" className="w-full gap-2">
                      <Share2 size={20} />
                      Share Resume
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default QRResume;