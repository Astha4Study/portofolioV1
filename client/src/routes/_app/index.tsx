import AboutSection from "@/components/landing/sections/-AboutSection";
import ContactSection from "@/components/landing/sections/-ContactSection";
import ExperienceAndEducationSection from "@/components/landing/sections/-ExperienceAndEducationSection";
import HeaderSection from "@/components/landing/sections/-HeaderSection";
import ProjectsAndAchivementsSection from "@/components/landing/sections/-ProjectsAndAchivementsSection";
import SertificateSection from "@/components/landing/sections/-SertificateSection";
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
