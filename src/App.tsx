import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import MaintenanceMode from "@/components/MaintenanceMode";
import RedirectHandler from "@/components/RedirectHandler";
import DynamicPage from "@/components/DynamicPage";
import SettingsLoader from "@/components/SettingsLoader";
import SettingsHelmet from "@/components/SettingsHelmet";
import Index from "./pages/Index";
import ProjectsPage from "./pages/ProjectsPage";
import ResearchPage from "./pages/ResearchPage";
import AchievementsPage from "./pages/AchievementsPage";
import AcademicsPage from "./pages/AcademicsPage";
import LeadershipPage from "./pages/LeadershipPage";
import ExperiencePage from "./pages/ExperiencePage";
import SandboxPage from "./pages/SandboxPage";
import AppLabPage from "./pages/AppLabPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
// Projects sub-pages
import Software from "./pages/projects/Software";
import Algorithms from "./pages/projects/Algorithms";
import CreativeTech from "./pages/projects/CreativeTech";
import Teamwork from "./pages/projects/Teamwork";
import Archive from "./pages/projects/Archive";

// Research sub-pages
import PhilosophyOfAI from "./pages/research/PhilosophyOfAI";
import Essays from "./pages/research/Essays";
import ReadingList from "./pages/research/ReadingList";
import ThoughtGraph from "./pages/research/ThoughtGraph";

// App Lab sub-pages
import Overview from "./pages/applab/Overview";
import UIDesign from "./pages/applab/UIDesign";
import DevJournal from "./pages/applab/DevJournal";
import TechStack from "./pages/applab/TechStack";
import BetaSignup from "./pages/applab/BetaSignup";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

// Contact sub-pages
import QRResume from "./pages/contact/QRResume";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Analytics />
        <SettingsLoader>
          <SettingsHelmet />
          <RedirectHandler>
            <MaintenanceMode>
              <Routes>
                {/* Redirect /admin to /admin/login */}
                <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
                
                <Route path="/" element={<Index />} />
            
            {/* Main Pages */}
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/academics" element={<AcademicsPage />} />
            <Route path="/leadership" element={<LeadershipPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/sandbox" element={<SandboxPage />} />
            <Route path="/app-lab" element={<AppLabPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Projects Sub-pages */}
            <Route path="/projects/software" element={<Software />} />
            <Route path="/projects/algorithms" element={<Algorithms />} />
            <Route path="/projects/creative-tech" element={<CreativeTech />} />
            <Route path="/projects/teamwork" element={<Teamwork />} />
            <Route path="/projects/archive" element={<Archive />} />
            
            {/* Research Sub-pages */}
            <Route path="/research/philosophy-of-ai" element={<PhilosophyOfAI />} />
            <Route path="/research/essays" element={<Essays />} />
            <Route path="/research/reading-list" element={<ReadingList />} />
            <Route path="/research/thought-graph" element={<ThoughtGraph />} />
            
            {/* App Lab Sub-pages */}
            <Route path="/app-lab/overview" element={<Overview />} />
            <Route path="/app-lab/ui-design" element={<UIDesign />} />
            <Route path="/app-lab/dev-journal" element={<DevJournal />} />
            <Route path="/app-lab/tech-stack" element={<TechStack />} />
            <Route path="/app-lab/beta-signup" element={<BetaSignup />} />
            
            {/* Admin Pages */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            
            {/* Contact Sub-pages */}
            <Route path="/contact/qr-resume" element={<QRResume />} />
            
            {/* Dynamic pages from admin - MUST be before NotFound */}
            <Route path="/page/:slug" element={<DynamicPage />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
            </MaintenanceMode>
          </RedirectHandler>
        </SettingsLoader>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
