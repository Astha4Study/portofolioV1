import { Separator } from "@/components/ui/separator";
import UsesCards from "@/components/UsesCards";
import { createFileRoute } from "@tanstack/react-router";
import { Code, Globe, Laptop, Server, Terminal } from "lucide-react";

export const Route = createFileRoute("/_app/uses")({
  component: RouteComponent,
});

const hardware = [
  {
    name: "DELL Latitude 5420",
    badge: "Device",
    description: "My daily driver for all development work — coding, design, and building full-stack apps.",
  },
  {
    name: "DELL Precision 7560",
    badge: "Device",
    description: "My secondary machine for heavier workloads and multitasking development.",
  },
  {
    name: "DELL Monitor P2422H",
    badge: "Display",
    description: "Dual monitor setup with a 24-inch monitor with a 1920x1080 resolution, providing ample screen real estate for coding and design work.",
  },
  {
    name: "Vortex Series GT65 Lite Wired Mechanical Keyboard",
    badge: "Input Device",
    description: "A high-performance mechanical keyboard with customizable RGB lighting and tactile switches.",
  },
  {
    name: "Logitech G102 Lightsync Mouse",
    badge: "Input Device",
    description: "A versatile wireless mouse with ergonomic design and customizable buttons for efficient navigation.",
  },
];

const editor = [
  {
    name: "Visual Studio Code",
    badge: "IDE",
    description: "My primary code editor for all development tasks, offering a wide range of extensions and features.",
    link: "https://code.visualstudio.com/",
  },
  {
    name: "Zed",
    badge: "IDE",
    description: "A lightweight and fast code editor that I use for quick edits and when I want a distraction-free coding environment.",
    link: "https://zed.dev/",
  },
  {
    name: "GitHub Copilot",
    badge: "AI Assistant",
    description: "An AI-powered code completion tool that helps me write code faster and more efficiently by suggesting context-aware code snippets.",
    link: "https://github.com/features/copilot",
  },
  {
    name: "Catpuccin Theme",
    badge: "Theme",
    description: "A soothing and visually appealing color scheme that I use across my code editors and terminal for a consistent and enjoyable coding experience.",
  },
  {
    name: "Manrope Font",
    badge: "Font",
    description: "A clean and modern sans-serif font that I use in my code editors for improved readability and aesthetics.",
  },
];

const terminal = [
  {
    name: "Windows Terminal",
    badge: "Terminal Emulator",
    description: "My go-to terminal emulator for all command-line tasks, offering a modern interface and extensive customization options.",
  },
  {
    name: "git-bash",
    badge: "Shell",
    description: "A Unix-like shell that I use for Git operations and when I need a more traditional command-line experience on Windows.",
    link: "https://git-scm.com/downloads",
  },
];

const browser = [
  {
    name: "Edge Browser",
    badge: "Browser",
    description: "My primary web browser for development and general use, offering robust developer tools and excellent performance.",
  },
  {
    name: "Wappalyzer",
    badge: "Browser Extension",
    description: "A browser extension that helps me identify the technologies used on websites, which is invaluable for learning and inspiration.",
    link: "https://www.wappalyzer.com/",
  },
];

const techStack = [
  {
    name: "React",
    badge: "Frontend Framework",
    description: "The core library I use for building user interfaces, enabling me to create dynamic and responsive web applications.",
    link: "https://react.dev/",
  },
  {
    name: "Next.js",
    badge: "Framework",
    description: "A powerful React framework that I use for server-side rendering, static site generation, and building full-stack applications with ease.",
    link: "https://nextjs.org/",
  },
  {
    name: "Sveltekit",
    badge: "Framework",
    description: "A modern framework that I use for building highly performant web applications with a simple and intuitive syntax.",
    link: "https://kit.svelte.dev/",
  },
  {
    name: "bun",
    badge: "Runtime",
    description: "A fast JavaScript runtime that I use for development and running my applications, known for its speed and efficiency.",
    link: "https://bun.sh/",
  },
  {
    name: "Tailwind CSS",
    badge: "CSS Framework",
    description: "A utility-first CSS framework that I use for rapidly building custom user interfaces without leaving my HTML.",
    link: "https://tailwindcss.com/",
  },
  {
    name: "Shadcn UI",
    badge: "Component Library",
    description: "A collection of accessible and customizable UI components that I use to speed up my development process while maintaining a consistent design.",
    link: "https://ui.shadcn.com/",
  },
  {
    name: "Prisma",
    badge: "ORM",
    description: "An Object-Relational Mapping tool that I use for database management, providing a type-safe and intuitive API for working with databases.",
    link: "https://www.prisma.io/",
  },
  {
    name: "MongoDB",
    badge: "Database",
    description: "A NoSQL database that I use for storing and managing data in my applications, known for its flexibility and scalability.",
    link: "https://www.mongodb.com/",
  },
  {
    name: "Supabase",
    badge: "Backend-as-a-Service",
    description: "A backend-as-a-service platform that I use for quickly setting up databases, authentication, and real-time functionality in my applications.",
    link: "https://supabase.com/",
  },
];

function RouteComponent() {
  return (
    <section>
      {/* Header */}
      <div className="space-y-1">
        <p className="font-semibold text-xl text-neutral-950 dark:text-neutral-100 transition-colors duration-200">Uses & Setup</p>
        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 leading-relaxed tracking-[0.01em] max-w-2xl transition-colors duration-200">The equipment, applications, and technology that I use daily.</p>
      </div>

      <Separator className="mt-4 mb-6" />

      {/* Hardware */}
      <div className="space-y-3">
        <p className="flex items-center gap-2 font-semibold text-lg text-neutral-950 dark:text-neutral-100 transition-colors duration-200">
          <Laptop className="w-4.5 h-4.5" /> Hardware
        </p>

        <Separator className="my-3" />

        <UsesCards items={hardware} />
      </div>

      <Separator className="my-6" />

      {/* IDE & Editor */}
      <div className="space-y-3">
        <p className="flex items-center gap-2 font-semibold text-lg text-neutral-950 dark:text-neutral-100 transition-colors duration-200">
          <Code className="w-4.5 h-4.5" /> Editor
        </p>

        <Separator className="my-3" />

        <UsesCards items={editor} />
      </div>

      <Separator className="my-6" />

      {/* Terminal */}
      <div className="space-y-3">
        <p className="flex items-center gap-2 font-semibold text-lg text-neutral-950 dark:text-neutral-100 transition-colors duration-200">
          <Terminal className="w-4.5 h-4.5" /> Terminal
        </p>

        <Separator className="my-3" />

        <UsesCards items={terminal} />
      </div>

      <Separator className="my-6" />

      {/* Browser */}
      <div className="space-y-3">
        <p className="flex items-center gap-2 font-semibold text-lg text-neutral-950 dark:text-neutral-100 transition-colors duration-200">
          <Globe className="w-4.5 h-4.5" /> Browser
        </p>

        <Separator className="my-3" />

        <UsesCards items={browser} />
      </div>

      <Separator className="my-6" />

      {/* TechStack */}
      <div className="space-y-3">
        <p className="flex items-center gap-2 font-semibold text-lg text-neutral-950 dark:text-neutral-100 transition-colors duration-200">
          <Server className="w-4.5 h-4.5" /> TechStack
        </p>

        <Separator className="my-3" />

        <UsesCards items={techStack} />
      </div>
    </section>
  );
}
