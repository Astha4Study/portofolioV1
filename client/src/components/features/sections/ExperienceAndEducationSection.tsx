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
      className: "bg-purple-100 dark:bg-purple-950/50 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800",
    },
    {
      name: "Bun",
      className: "bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-300 border-stone-200 dark:border-stone-700"
    },
    {
      name: "CSS3",
      className: "bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
    },
    {
      name: "Dart",
      className: "bg-cyan-100 dark:bg-cyan-950/50 text-cyan-800 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800"
    },
    {
      name: "Docker",
      className: "bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-300 border-blue-200 dark:border-blue-800"
    },
    {
      name: "Express.js",
      className: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700"
    },
    {
      name: "Figma",
      className: "bg-orange-100 dark:bg-orange-950/50 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-800"
    },
    {
      name: "Flutter",
      className: "bg-sky-100 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800"
    },
    {
      name: "GitHub",
      className: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700"
    },
    {
      name: "Hono",
      className: "bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-300 border-orange-200 dark:border-orange-800"
    },
    {
      name: "HTML5",
      className: "bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800"
    },
    {
      name: "JavaScript",
      className: "bg-yellow-100 dark:bg-yellow-950/50 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-800"
    },
    {
      name: "Laravel",
      className: "bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
    },
    {
      name: "MongoDB",
      className: "bg-green-100 dark:bg-green-950/50 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800"
    },
    {
      name: "MySQL",
      className: "bg-sky-100 dark:bg-sky-950/50 text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-800"
    },
    {
      name: "Next JS",
      className: "bg-black dark:bg-neutral-800 text-white dark:text-neutral-100 border-zinc-800 dark:border-neutral-700"
    },
    {
      name: "NodeJS",
      className: "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
    },
    {
      name: "React",
      className: "bg-blue-50 dark:bg-blue-950/30 text-blue-500 dark:text-blue-400 border-blue-100 dark:border-blue-800"
    },
    {
      name: "Svelte",
      className: "bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800"
    },
    {
      name: "Sveltekit",
      className: "bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800"
    },
    {
      name: "TailwindCSS",
      className: "bg-cyan-50 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800"
    },
    {
      name: "TypeScript",
      className: "bg-blue-100 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800"
    },
    {
      name: "Vite",
      className: "bg-violet-100 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800"
    },
  ];

  return (
    <section className="w-full flex flex-col gap-8">
      {/* Experience */}
      <div className="flex flex-col gap-4">
        <p className="font-semibold text-lg text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
          Experience
        </p>

        {/* Puskomedia */}
        <div className="flex items-start gap-4">
          <div className="h-11 w-11 sm:h-12 sm:w-12 shrink-0 overflow-hidden rounded-xl bg-white dark:bg-neutral-900 p-1.5 ring-1 ring-neutral-200 dark:ring-neutral-700 flex items-center justify-center transition-colors duration-200">
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
                  <p className="font-medium inline-flex items-start gap-0.5 text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors duration-200">
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
                              className={`h-4 w-4 transition-transform duration-300 text-neutral-900 dark:text-neutral-100 ${
                                isOpen(0) ? "rotate-90" : ""
                              }`}
                            />
                          </motion.span>
                        ) : null}
                      </AnimatePresence>
                    </span>
                  </p>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 transition-colors duration-200">
                    Frontend Developer
                  </p>
                </div>
              </div>

              <p className="text-sm text-neutral-500 dark:text-neutral-400 transition-colors duration-200">
                Mar 2026 — Present
              </p>
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
                  <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xl transition-colors duration-200">
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
          <div className="h-11 w-11 sm:h-12 sm:w-12 shrink-0 overflow-hidden rounded-xl bg-white dark:bg-neutral-900 p-1.5 ring-1 ring-neutral-200 dark:ring-neutral-700 flex items-center justify-center transition-colors duration-200">
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
                  <p className="font-medium text-neutral-900 dark:text-neutral-100 inline-flex items-start gap-0.5 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors duration-200">
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
                              className={`h-4 w-4 transition-transform duration-300 text-neutral-900 dark:text-neutral-100 ${
                                isOpen(1) ? "rotate-90" : ""
                              }`}
                            />
                          </motion.span>
                        ) : null}
                      </AnimatePresence>
                    </span>
                  </p>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 transition-colors duration-200">
                    Fullstack Developer
                  </p>
                </div>
              </div>

              <p className="text-sm text-neutral-500 dark:text-neutral-400 transition-colors duration-200">
                Oct 2025 — Jan 2025
              </p>
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
                  <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xl transition-colors duration-200">
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
        <p className="font-semibold text-lg text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
          Education
        </p>

        <div className="flex items-start gap-4">
          <div className="h-11 w-11 sm:h-12 sm:w-12 shrink-0 overflow-hidden rounded-xl bg-white dark:bg-neutral-900 p-1.5 ring-1 ring-neutral-200 dark:ring-neutral-700 flex items-center justify-center transition-colors duration-200">
            <img
              alt="Universitas Amikom"
              src={amikomLogo}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <div className="flex items-center justify-between flex-wrap gap-1">
              <p className="font-medium text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
                Universitas Amikom Purwokerto
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 transition-colors duration-200">
                Aug 2023 — Present
              </p>
            </div>

            <p className="text-sm text-neutral-700 dark:text-neutral-300 transition-colors duration-200">
              Informatics Student
            </p>

            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xl transition-colors duration-200">
              Focused on web development, UI/UX design, and software engineering
              fundamentals.
            </p>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-col gap-4">
        <p className="font-semibold text-lg text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
          Skills
        </p>

        <div className="flex flex-wrap gap-1.5">
          {skills.map((skill) => (
            <Badge
              key={skill.name}
              variant="outline"
              className={`${skill.className} transition-colors duration-200`}
            >
              {skill.name}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
