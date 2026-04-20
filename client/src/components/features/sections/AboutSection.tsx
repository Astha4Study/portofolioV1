import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Link } from "@tanstack/react-router";

export default function AboutSection() {
  return (
    <section className="w-full flex flex-col">
      {/* Title */}
      <p className="font-semibold text-lg text-neutral-950 dark:text-neutral-100 transition-colors duration-200">
        About
      </p>

      {/* Content */}
      <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 leading-relaxed tracking-[0.01em] max-w-2xl transition-colors duration-200">
        As an Informatics student at Universitas Amikom Purwokerto, I have built
        practical experience as {/* PRABU BIMA */}
        <HoverCard openDelay={100} closeDelay={100}>
          <HoverCardTrigger asChild>
            <span className="text-neutral-950 dark:text-neutral-100 font-medium cursor-pointer border-b border-neutral-400/70 dark:border-neutral-500/50 hover:border-neutral-950 dark:hover:border-neutral-100 transition-all duration-300">
              a Fullstack Developer intern at CV Prabu Bima Tech
            </span>
          </HoverCardTrigger>
          <HoverCardContent className="w-72 dark:bg-neutral-900 dark:border-neutral-700">
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-sm dark:text-neutral-100">
                CV Prabu Bima Tech
              </p>
              <p className="text-sm text-muted-foreground dark:text-neutral-400">
                Worked as a Fullstack Developer, building and maintaining web
                applications across both frontend and backend.
              </p>
              <p className="text-xs text-muted-foreground dark:text-neutral-500 mt-1">
                Internship Experience
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>{" "}
        and {/* PUSKOMEDIA */}
        <HoverCard openDelay={100} closeDelay={100}>
          <HoverCardTrigger asChild>
            <span className="text-neutral-950 dark:text-neutral-100 font-medium cursor-pointer border-b border-neutral-400/70 dark:border-neutral-500/50 hover:border-neutral-950 dark:hover:border-neutral-100 transition-all duration-300">
              a Frontend Developer intern at PT Puskomedia Indonesia Kreatif
            </span>
          </HoverCardTrigger>
          <HoverCardContent className="w-72 dark:bg-neutral-900 dark:border-neutral-700">
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-sm dark:text-neutral-100">
                PT Puskomedia Indonesia Kreatif
              </p>
              <p className="text-sm text-muted-foreground dark:text-neutral-400">
                Focused on building responsive and user-friendly interfaces
                using modern frontend technologies.
              </p>
              <p className="text-xs text-muted-foreground dark:text-neutral-500 mt-1">
                Internship Experience
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
        . I am passionate about designing and building web applications,{" "}
        <Link
          to="/"
          className="text-neutral-800 dark:text-neutral-200 font-medium border-b border-neutral-400/70 dark:border-neutral-500/50 hover:border-neutral-900 dark:hover:border-neutral-100 transition-all duration-300"
        >
          actively participate in competitions as a Frontend Developer
        </Link>
        , and have proudly won a national-level competition in Indonesia.
      </p>
    </section>
  );
}
