import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Projects from "@/components/Projects";
import StarfieldBackground from "@/components/StarfieldBackground";

const ProjectsPage = () => {
  return (
    <>
      <Helmet>
        <title>Projects | Mithil Katkoria - Portfolio</title>
        <meta name="description" content="Explore my coding projects, from algorithm visualizers to web applications and AI experiments." />
      </Helmet>
      <div className="min-h-screen bg-background relative">
        <StarfieldBackground />
        <div className="relative z-10">
          <Navigation />
          <div className="pt-24">
            <Projects />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsPage;
