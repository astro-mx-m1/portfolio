import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, GraduationCap, Award, Calendar, MapPin, ExternalLink } from "lucide-react";

interface Experience {
  title: string;
  company: string;
  type: string;
  period: string;
  location: string;
  description: string[];
  skills: string[];
  link?: string;
}

const experiences: Experience[] = [
  {
    title: "IT Specialist",
    company: "VMK Accountants Limited",
    type: "Internship (Ongoing)",
    period: "September 2023 to Present",
    location: "On-site",
    description: [
      "Bookkeeping & Administration: Executed essential bookkeeping tasks to ensure accurate financial records.",
      "Cloud Security & Infrastructure: Secured sensitive company and client data by implementing and managing advanced cloud security measures and reliable backup solutions, mitigating the risk of data loss.",
      "Network Management: Established a secure and efficient local area network (LAN), enabling seamless file sharing and device synchronization across the office.",
      "Web Development: Enhanced the company's online presence by single-handedly designing, building, and launching its professional website."
    ],
    skills: ["Finance", "Web Design", "Cloud Computing", "Cybersecurity", "Web Development"],
    link: "https://vmkaccountants.co.uk/"
  },
  {
    title: "Oxford Summer School - Inspire Scholar",
    company: "University of Oxford - St John's College",
    type: "Programme",
    period: "August 2025 (1 month)",
    location: "Oxford, England, United Kingdom",
    description: [
      "Selected for the prestigious Inspire Scholars summer school at the University of Oxford's St John's College, I immersed myself in the full collegiate experience, from formal hall dinners to academic tours of the historic campus.",
      "A key highlight was excelling in a hands-on engineering challenge, where I took a leadership role in my team to design, build, and test the programme's fastest solar-powered boat, achieving a top time of 11.2 seconds.",
      "The programme fostered interdisciplinary learning, including a specialist workshop on biomimicry at the Oxford Botanic Garden, where I analysed natural models like bromeliads to understand their application in sustainable technology.",
      "This experience directly inspired me to channel these insights into a practical software development project: I am currently building a 'Biomimicry Trail' web application to map and explain how the Garden's organisms serve as blueprints for engineering innovation."
    ],
    skills: ["Biomimicry", "Academic Research", "Engineering", "Problem Solving", "Team Collaboration", "Teamwork", "Critical Thinking", "Interdisciplinary Learning", "Project Design", "Team Leadership"]
  },
  {
    title: "Work Experience with Bob Blackman CBE MP",
    company: "The Conservative Party",
    type: "Work Experience",
    period: "August 2025 (1 month)",
    location: "On-site",
    description: [
      "Gained first-hand insight into the functions of a Parliamentary office and the day-to-day responsibilities of a Member of Parliament.",
      "Assisted with constituency casework, addressing concerns and queries from members of the public.",
      "Engaged directly with constituents through door-to-door canvassing and a 'What to Expect' forum for the Conservative Party.",
      "Participated in Q&A sessions, policy discussions, and strategic meetings with the office team."
    ],
    skills: ["Politics", "Parliamentary Procedure", "Teamwork"]
  },
  {
    title: "STEM Instructor & Operations Assistant",
    company: "Robothink UK",
    type: "Internship",
    period: "August 2025 (1 month)",
    location: "On-site",
    description: [
      "I was really lucky to get a follow-on offer from RoboThink for a month, during my summer of August, where I was an assistant teacher.",
      "Instructed and guided students in hands-on robotics and engineering principles, fostering their problem-solving and creativity skills.",
      "Managed classroom operations, including preparing lesson materials, organising robotics equipment, and maintaining a clean, safe learning environment.",
      "Assisted with administrative tasks to support the smooth running of the educational programmes.",
      "Demonstrated strong leadership and communication skills by effectively engaging with students and supporting their learning journey."
    ],
    skills: ["Teaching", "Leadership", "Teamwork", "Project Building", "Office Administration"]
  },
  {
    title: "Founder",
    company: "AHCC - Avanti House Coding Club",
    type: "Part-time",
    period: "September 2024 to August 2025 (1 year)",
    location: "On-site",
    description: [
      "Founded and lead a school-wide coding club to promote digital literacy and inspire interest in computer science.",
      "Designed and delivered a comprehensive, structured curriculum that takes students from absolute beginners to an advanced understanding of Python programming.",
      "Created engaging weekly lesson plans and interactive learning materials, including educational games and quizzes (for example, Kahoot), to reinforce key concepts.",
      "Managed all aspects of the club, from planning and instruction to fostering a collaborative and inclusive learning environment for all members."
    ],
    skills: ["Leadership", "Teaching", "Python", "Games Making", "Coding"]
  },
  {
    title: "Animation & Game Design Taster Workshop",
    company: "Stanmore College",
    type: "Workshop",
    period: "May 2025 (1 month)",
    location: "On-site",
    description: [
      "Participated in an intensive, hands-on taster workshop to gain insight into the end-to-end process of a media project.",
      "Collaborated with a team to design and develop a complete game from concept to creation.",
      "Gained practical experience in core game development principles, including character design, mechanics, and level design.",
      "Engaged in Foley Art (Sound Design), creating custom sound effects by recording and implementing real-world sounds to enhance the game's audio landscape."
    ],
    skills: ["Game Design", "Animation", "Windows Movie Maker", "Film Production", "Graphic Design", "3D Graphics", "Computer Graphics Design"],
    link: "https://stanmoregames.itch.io/project-roberto"
  },
  {
    title: "Admin - Work Experience",
    company: "Robothink UK",
    type: "Full-time",
    period: "May 2025 (1 month)",
    location: "London Area, United Kingdom",
    description: [
      "Completed a structured work experience programme focused on STEM education and business operations, gaining insight into the company's mission and workplace protocols.",
      "Conducted a comprehensive audit of the company's LinkedIn presence, analysing over 80 posts to track content, engagement, and branding strategies.",
      "Developed key professional skills through hands-on robotics activities, daily progress reviews, and shadowing opportunities with various teams.",
      "Contributed to a business development project by organising and presenting data to support marketing and operational strategies."
    ],
    skills: ["Auditing", "Brand Management", "Office Administration", "Marketing", "Software Research", "Teamwork", "Building Robot"]
  },
  {
    title: "Business and Finance Easter WEX",
    company: "KPMG",
    type: "Work Experience",
    period: "April 2025 (1 month)",
    location: "London, UK",
    description: [
      "Participated in structured work experience programme focused on business and finance.",
      "Gained insight into the operations of a Big Four accounting firm.",
      "Credential ID: 19bf3eddbee74bb09a85fe58c63955d2"
    ],
    skills: ["Business", "Finance", "Professional Development"]
  }
];

const ExperiencePage = () => {
  return (
    <>
      <Helmet>
        <title>Experience | Mithil Katkoria</title>
        <meta name="description" content="My professional experience, internships, and work placements in technology, education, and business." />
      </Helmet>
      <div className="min-h-screen bg-background relative">
        <StarfieldBackground />
        <div className="relative z-10">
          <Navigation />
          <div className="pt-24 pb-16 px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 glow-text">Experience</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  From IT specialist roles to founding coding clubs and participating in Oxford programmes; 
                  building real-world skills through diverse experiences.
                </p>
              </div>

              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <Card 
                    key={index}
                    className="p-6 bg-card border-primary/20 hover:border-primary/40 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 shrink-0 w-fit">
                        <Briefcase className="text-primary" size={24} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                          <div>
                            <h3 className="text-xl font-bold">{exp.title}</h3>
                            <p className="text-primary font-medium">{exp.company}</p>
                          </div>
                          <Badge variant="secondary" className="w-fit">{exp.type}</Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {exp.period}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {exp.location}
                          </span>
                          {exp.link && (
                            <a 
                              href={exp.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-primary hover:underline"
                            >
                              <ExternalLink size={14} />
                              View Project
                            </a>
                          )}
                        </div>
                        
                        <ul className="space-y-2 mb-4">
                          {exp.description.map((desc, i) => (
                            <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              {desc}
                            </li>
                          ))}
                        </ul>
                        
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, i) => (
                            <Badge 
                              key={i} 
                              variant="outline" 
                              className="bg-primary/5 border-primary/30 text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExperiencePage;