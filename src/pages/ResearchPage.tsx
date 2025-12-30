import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Research from "@/components/Research";
import StarfieldBackground from "@/components/StarfieldBackground";

const ResearchPage = () => {
  return (
    <>
      <Helmet>
        <title>Research & Thinking | Mithil Katkoria</title>
        <meta name="description" content="My essays and research on AI, philosophy, objectivity, and the intersection of human and algorithmic intelligence." />
      </Helmet>
      <div className="min-h-screen bg-background relative">
        <StarfieldBackground />
        <div className="relative z-10">
          <Navigation />
          <div className="pt-24">
            <Research />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResearchPage;
