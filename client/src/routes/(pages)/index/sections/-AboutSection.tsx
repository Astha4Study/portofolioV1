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
      <p className="font-semibold text-lg text-neutral-950">About</p>

      {/* Content */}
      <p className="text-sm font-medium text-neutral-500 leading-relaxed tracking-[0.01em] max-w-2xl">
        As an Informatics student at Universitas Amikom Purwokerto, I have built
        practical experience as {/* PRABU BIMA */}
        <HoverCard openDelay={100} closeDelay={100}>
          <HoverCardTrigger asChild>
            <span className="text-neutral-950 font-medium cursor-pointer border-b border-neutral-400/70 hover:border-neutral-950 transition-all duration-300">
              a Fullstack Developer intern at CV Prabu Bima Tech
            </span>
          </HoverCardTrigger>
          <HoverCardContent className="w-72">
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-sm">CV Prabu Bima Tech</p>
              <p className="text-sm text-muted-foreground">
                Worked as a Fullstack Developer, building and maintaining web
                applications across both frontend and backend.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Internship Experience
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>{" "}
        and {/* PUSKOMEDIA */}
        <HoverCard openDelay={100} closeDelay={100}>
          <HoverCardTrigger asChild>
            <span className="text-neutral-950 font-medium cursor-pointer border-b border-neutral-400/70 hover:border-neutral-950 transition-all duration-300">
              a Frontend Developer intern at PT Puskomedia Indonesia Kreatif
            </span>
          </HoverCardTrigger>
          <HoverCardContent className="w-72">
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-sm">
                PT Puskomedia Indonesia Kreatif
              </p>
              <p className="text-sm text-muted-foreground">
                Focused on building responsive and user-friendly interfaces
                using modern frontend technologies.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Internship Experience
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
        . I am passionate about designing and building web applications,{" "}
        <Link to="/" className="text-neutral-800 font-medium border-b border-neutral-400/70 hover:border-neutral-900 transition-all duration-300">
          actively participate in competitions as a Frontend Developer
        </Link>
        , and have proudly won a national-level competition in Indonesia.
      </p>
    </section>
  );
}
