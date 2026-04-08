import { ProjectCard } from "./ProjectsCard";

import cethaWebsite from "@/assets/images/cetha-web.jpeg";
import daunesiaWebsite from "@/assets/images/daunesia-web.png";
import kinaraWebsite from "@/assets/images/kinara-web.png";
import kurawalWebsite from "@/assets/images/kurawal-web.png";
import arunikaWebsite from "@/assets/images/arunika-web.png";
import aitherwayWebsite from "@/assets/images/aitherway-web.png";
import rotaneraWebsite from "@/assets/images/rotanera-web.png";

export default function Projects() {
  const projects = [
    {
      imageUrl: cethaWebsite,
      title: "Cetha — AI Career Optimization Platform",
      year: "2025",
      description:
        "An AI-powered platform that helps job seekers optimize their CV and LinkedIn with actionable insights to meet industry standards and pass recruiter screening.",
      tags: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Shadcn UI",
        "Gemini API",
        "Firebase",
        "Vercel",
        "Framer Motion",
        "Zustand",
      ],
    },
    {
      imageUrl: daunesiaWebsite,
      title: "Daunesia — AI Herbal Plant Identifier",
      year: "2025",
      description:
        "An AI-powered application that identifies Indonesian herbal plants through image recognition, bridging local ethnobotanical knowledge with modern technology.",
      tags: [
        "Next.js",
        "React",
        "Tailwind CSS",
        "Shadcn UI",
        "Gemini API",
        "MongoDB",
        "Cloudinary",
        "Vercel",
        "Framer Motion",
        "Zustand",
      ],
    },
    {
      imageUrl: kinaraWebsite,
      title: "Kinara — Indonesian Biodiversity Platform",
      year: "2024",
      description:
        "A web-based platform providing comprehensive information on Indonesia’s flora and fauna, enhanced with AI-driven insights and interactive exploration features.",
      tags: ["Laravel", "MySQL", "React", "Tailwind CSS", "Shadcn UI"],
    },
    {
      imageUrl: kurawalWebsite,
      title: "Kurawal — Company Profile Website",
      year: "2025",
      description:
        "A modern company profile website showcasing services, projects, and brand identity with a focus on performance and user experience.",
      tags: [
        "MongoDB",
        "Express.js",
        "React",
        "NodeJS",
        "Tailwind CSS",
        "Shadcn UI",
        "Vite",
        "Framer Motion",
      ],
    },
    {
      imageUrl: arunikaWebsite,
      title: "Arunika — AI-Powered Local Business Discovery",
      year: "2024",
      description:
        "A web application that helps users discover local businesses and services with AI-driven personalized recommendations.",
      tags: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Shadcn UI",
        "Gemini API",
        "MongoDB",
        "Vercel",
        "Framer Motion",
        "Zustand",
      ],
    },
    {
      imageUrl: aitherwayWebsite,
      title: "Aitherway — Location-Based Travel Discovery Platform",
      year: "2024",
      description:
        "An AI-powered platform that recommends nearby tourist destinations based on user location, improving travel discovery and accessibility.",
      tags: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Shadcn UI",
        "Gemini API",
        "PostgreSQL",
        "Vercel",
        "Framer Motion",
        "Zustand",
      ],
    },
    {
      imageUrl: rotaneraWebsite,
      title: "Rotanera — AI Rattan Design Generator",
      year: "2026",
      description:
        "An AI-powered platform that generates innovative rattan design concepts, combining generative AI with traditional craftsmanship.",
      tags: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Shadcn UI",
        "Gemini API",
        "MongoDB",
        "Prisma",
        "Vercel",
        "Framer Motion",
        "Zustand",
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
