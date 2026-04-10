import AboutSection from "@/components/features/sections/AboutSection";
import ContactSection from "@/components/features/sections/ContactSection";
import ExperienceAndEducationSection from "@/components/features/sections/ExperienceAndEducationSection";
import HeaderSection from "@/components/features/sections/HeaderSection";
import ProjectsAndAchivementsSection from "@/components/features/sections/ProjectsAndAchivementsSection";
import SertificateSection from "@/components/features/sections/SertificateSection";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-9">
      <HeaderSection />
      <AboutSection />
      <ExperienceAndEducationSection />
      <ProjectsAndAchivementsSection />
      <SertificateSection />
      <ContactSection />
    </div>
  );
}
