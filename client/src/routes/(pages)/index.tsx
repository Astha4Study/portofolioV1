import { createFileRoute } from "@tanstack/react-router";
import HeaderSection from "./index/sections/-HeaderSection";
import AboutSection from "./index/sections/-AboutSection";
import ExperienceAndEducationSection from "./index/sections/-ExperienceAndEducationSection";

export const Route = createFileRoute("/(pages)/")({
  component: Index,
});

function Index() {
  return (
    <div className="max-w-2xl w-full mx-auto py-10 sm:py-24 backdrop-blur-lg bg-white space-y-8">
      <HeaderSection />
      <AboutSection />
      <ExperienceAndEducationSection />
    </div>
  );
}
