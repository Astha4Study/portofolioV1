import { createFileRoute } from "@tanstack/react-router";
import HeaderSection from "./index/sections/-HeaderSection";
import AboutSection from "./index/sections/-AboutSection";
import ExperienceAndEducationSection from "./index/sections/-ExperienceAndEducationSection";
import ProjectsAndAchivementsSection from "./index/sections/-ProjectsAndAchivementsSection";
import SertificateSection from "./index/sections/-SertificateSection";

export const Route = createFileRoute("/(pages)/")({
  component: Index,
});

function Index() {
  return (
    <div className="max-w-2xl w-full mx-auto py-10 sm:py-24 backdrop-blur-lg bg-white space-y-9">
      <HeaderSection />
      <AboutSection />
      <ExperienceAndEducationSection />
      <ProjectsAndAchivementsSection />
      <SertificateSection />
    </div>
  );
}
