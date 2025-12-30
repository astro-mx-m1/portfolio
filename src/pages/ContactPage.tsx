import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Contact from "@/components/Contact";
import StarfieldBackground from "@/components/StarfieldBackground";

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact | Mithil Katkoria</title>
        <meta name="description" content="Get in touch with me for collaborations, questions, or just to connect." />
      </Helmet>
      <div className="min-h-screen bg-background relative">
        <StarfieldBackground />
        <div className="relative z-10">
          <Navigation />
          <div className="pt-24">
            <Contact />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
