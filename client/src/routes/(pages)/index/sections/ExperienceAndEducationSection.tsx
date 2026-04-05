import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronRight } from "lucide-react";

import puskomediaLogo from "@/assets/images/logo-puskomedia.webp";
import prabubimaLogo from "@/assets/images/logo-prabubima.png";
import amikomLogo from "@/assets/images/logo-amikom.png";
import { Badge } from "@/components/ui/badge";

export default function ExperienceAndEducationSection() {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index],
    );
  };

  const isOpen = (index: number) => openIndexes.includes(index);

  const skills = [
    {
      name: "Bootstrap",
      className: "bg-purple-100 text-purple-800 border-purple-200",
    },
    { name: "Bun", className: "bg-stone-100 text-stone-800 border-stone-200" },
    { name: "CSS3", className: "bg-blue-100 text-blue-700 border-blue-200" },
    { name: "Dart", className: "bg-cyan-100 text-cyan-800 border-cyan-200" },
    { name: "Docker", className: "bg-blue-100 text-blue-600 border-blue-200" },
    {
      name: "Express.js",
      className: "bg-gray-100 text-gray-800 border-gray-200",
    },
    {
      name: "Figma",
      className: "bg-orange-100 text-orange-800 border-orange-200",
    },
    { name: "Flutter", className: "bg-sky-100 text-sky-700 border-sky-200" },
    { name: "GitHub", className: "bg-zinc-100 text-zinc-900 border-zinc-300" },
    {
      name: "Hono",
      className: "bg-orange-100 text-orange-600 border-orange-200",
    },
    {
      name: "HTML5",
      className: "bg-orange-100 text-orange-700 border-orange-200",
    },
    {
      name: "JavaScript",
      className: "bg-yellow-100 text-yellow-800 border-yellow-300",
    },
    { name: "Laravel", className: "bg-red-100 text-red-700 border-red-200" },
    {
      name: "MongoDB",
      className: "bg-green-100 text-green-800 border-green-200",
    },
    { name: "MySQL", className: "bg-sky-100 text-sky-800 border-sky-200" },
    { name: "Next JS", className: "bg-black text-white border-zinc-800" },
    {
      name: "NodeJS",
      className: "bg-emerald-100 text-emerald-800 border-emerald-200",
    },
    { name: "React", className: "bg-blue-50 text-blue-500 border-blue-100" },
    {
      name: "Svelte",
      className: "bg-orange-100 text-orange-700 border-orange-200",
    },
    {
      name: "Sveltekit",
      className: "bg-orange-50 text-orange-600 border-orange-200",
    },
    {
      name: "TailwindCSS",
      className: "bg-cyan-50 text-cyan-600 border-cyan-200",
    },
    {
      name: "TypeScript",
      className: "bg-blue-100 text-blue-800 border-blue-200",
    },
    {
      name: "Vite",
      className: "bg-violet-100 text-violet-700 border-violet-200",
    },
  ];

  return (
    <section className="w-full flex flex-col gap-8">
      {/* Experience */}
      <div className="flex flex-col gap-4">
        <p className="font-semibold text-lg text-neutral-900">Experience</p>

        {/* Puskomedia */}
        <div className="flex items-start gap-4">
          <div className="h-11 w-11 sm:h-12 sm:w-12 shrink-0 overflow-hidden rounded-xl bg-white p-1.5 ring-1 ring-neutral-200 flex items-center justify-center">
            <img
              alt="Puskomedia"
              src={puskomediaLogo}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="flex flex-col w-full">
            <button
              onClick={() => toggle(0)}
              onMouseEnter={() => setHoveredIndex(0)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group flex items-start justify-between w-full text-left"
            >
              <div className="flex items-start gap-2">
                <div className="flex flex-col">
                  <p className="font-medium inline-flex items-start gap-0.5 text-neutral-900 group-hover:text-neutral-700 transition">
                    PT. Puskomedia Indonesia Kreatif.
                    <span className="mt-1 inline-flex h-4 w-4 items-center justify-center overflow-hidden">
                      <AnimatePresence mode="wait">
                        {hoveredIndex === 0 ? (
                          <motion.span
                            key="chevron-0"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 6 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="inline-flex"
                          >
                            <ChevronRight
                              className={`h-4 w-4 transition-transform duration-300 ${
                                isOpen(0) ? "rotate-90" : ""
                              }`}
                            />
                          </motion.span>
                        ) : null}
                      </AnimatePresence>
                    </span>
                  </p>
                  <p className="text-sm text-neutral-700">Frontend Developer</p>
                </div>
              </div>

              <p className="text-sm text-neutral-500">Mar 2026 — Present</p>
            </button>

            {/* Dropdown */}
            <AnimatePresence initial={false}>
              {isOpen(0) ? (
                <motion.div
                  key="experience-0-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="mt-2 text-sm text-neutral-500 leading-relaxed max-w-xl">
                    Built responsive and user-friendly interfaces using modern
                    frontend technologies, focusing on performance and
                    usability.
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        {/* Prabubima */}
        <div className="flex items-start gap-4">
          <div className="h-11 w-11 sm:h-12 sm:w-12 shrink-0 overflow-hidden rounded-xl bg-white p-1.5 ring-1 ring-neutral-200 flex items-center justify-center">
            <img
              alt="Prabu Bima"
              src={prabubimaLogo}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="flex flex-col w-full">
            <button
              onClick={() => toggle(1)}
              onMouseEnter={() => setHoveredIndex(1)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group flex items-start justify-between w-full text-left"
            >
              <div className="flex items-start gap-2">
                <div className="flex flex-col">
                  <p className="font-medium text-neutral-900 inline-flex items-start gap-0.5 group-hover:text-neutral-700 transition">
                    CV Prabu Bima Tech
                    <span className="mt-1 inline-flex h-4 w-4 items-center justify-center overflow-hidden">
                      <AnimatePresence mode="wait">
                        {hoveredIndex === 1 ? (
                          <motion.span
                            key="chevron-1"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 6 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="inline-flex"
                          >
                            <ChevronRight
                              className={`h-4 w-4 transition-transform duration-300 ${
                                isOpen(1) ? "rotate-90" : ""
                              }`}
                            />
                          </motion.span>
                        ) : null}
                      </AnimatePresence>
                    </span>
                  </p>
                  <p className="text-sm text-neutral-700">
                    Fullstack Developer
                  </p>
                </div>
              </div>

              <p className="text-sm text-neutral-500">Oct 2025 — Jan 2025</p>
            </button>

            <AnimatePresence initial={false}>
              {isOpen(1) ? (
                <motion.div
                  key="experience-1-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="mt-2 text-sm text-neutral-500 leading-relaxed max-w-xl">
                    Developed and maintained web applications across frontend
                    and backend, ensuring functionality, performance, and
                    scalability.
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="flex flex-col gap-4">
        <p className="font-semibold text-lg text-neutral-900">Education</p>

        <div className="flex items-start gap-4">
          <div className="h-11 w-11 sm:h-12 sm:w-12 shrink-0 overflow-hidden rounded-xl bg-white p-1.5 ring-1 ring-neutral-200 flex items-center justify-center">
            <img
              alt="Universitas Amikom"
              src={amikomLogo}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <div className="flex items-center justify-between flex-wrap gap-1">
              <p className="font-medium text-neutral-900">
                Universitas Amikom Purwokerto
              </p>
              <p className="text-sm text-neutral-500">2023 — Present</p>
            </div>

            <p className="text-sm text-neutral-700">Informatics Student</p>

            <p className="text-sm text-neutral-500 leading-relaxed max-w-xl">
              Focused on web development, UI/UX design, and software engineering
              fundamentals.
            </p>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-col gap-4">
        <p className="font-semibold text-lg text-neutral-900">Skills</p>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge
              key={skill.name}
              variant="outline"
              className={`${skill.className}`}
            >
              {skill.name}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
