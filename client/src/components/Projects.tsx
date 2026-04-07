import { ProjectCard } from "./ProjectsCard";

import cethaWebsite from "@/assets/images/cetha-web.jpeg";
import daunesiaWebsite from "@/assets/images/daunesia-web.png";

export default function Projects() {
  const projects = [
    {
      imageUrl: cethaWebsite,
      title: "Cetha Career Enhancement Through AI",
      year: "2025",
      description:
        "Cetha is an AI-powered platform that helps job seekers optimize their CV and LinkedIn with actionable insights to meet industry standards and pass recruiter screening.",
      tags: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Shadcn UI",
        "Gemini API",
        "Vercel",
        "Firebase",
        "Framer Motion",
        "Zustand",
      ],
    },
    {
      imageUrl: daunesiaWebsite,
      title: "Daunesia",
      year: "2025",
      description:
        "Identifying Indonesia's rich herbal plants is now as simple as taking a photo. Daunesia bridges local wisdom with modern AI technology, providing instant access to the ethnobotanical knowledge of the archipelago.",
      tags: [
        "Next.js",
        "React",
        "Tailwind CSS",
        "Shadcn UI",
        "Gemini API",
        "Vercel",
        "MongoDB",
        "Framer Motion",
        "Zustand",
        "Cloudinary",
      ],
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            imageUrl={project.imageUrl}
            title={project.title}
            year={project.year}
            description={project.description}
            tags={project.tags}
          />
        ))}
      </div>
    </div>
  );
}
