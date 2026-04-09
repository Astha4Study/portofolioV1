import Achivements from "@/components/Achivements";
import Projects from "@/components/Projects";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { useState } from "react";

export default function ProjectsAndAchivementsSection() {
  const [activeTab, setActiveTab] = useState<"projects" | "achievements">(
    "projects",
  );

  return (
    <section className="w-full flex flex-col items-center gap-4">
      {/* Badge */}
      <span className="font-medium px-4 py-1.5 bg-neutral-900 rounded-full text-sm text-white">
        Projects & Achievements
      </span>

      {/* Heading */}
      <div className="text-center max-w-2xl space-y-3">
        <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 tracking-tight">
          Check out my latest works
        </h2>

        <p className="text-neutral-500 text-sm md:text-base leading-relaxed">
          A collection of projects I've built, showcasing my expertise in
          frontend development, UI/UX design, and scalable web applications.
          Each project reflects my focus on performance, usability, and clean,
          maintainable code.
        </p>
      </div>

      <ButtonGroup className="w-full grid grid-cols-2">
        <Button
          className="w-full"
          variant={activeTab === "projects" ? "default" : "outline"}
          onClick={() => setActiveTab("projects")}
        >
          Projects
        </Button>

        <Button
          className="w-full"
          variant={activeTab === "achievements" ? "default" : "outline"}
          onClick={() => setActiveTab("achievements")}
        >
          Achievements
        </Button>
      </ButtonGroup>

      <div className="w-full transition-all duration-300">
        {activeTab === "projects" && <Projects />}
        {activeTab === "achievements" && <Achivements />}
      </div>
    </section>
  );
}
