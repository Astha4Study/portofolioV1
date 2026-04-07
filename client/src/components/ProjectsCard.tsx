import { Globe, Github } from "lucide-react";
import { Badge } from "./ui/badge";

const tagStyles: Record<string, string> = {
  Bootstrap: "bg-purple-100 text-purple-800 border-purple-200",
  Bun: "bg-stone-100 text-stone-800 border-stone-200",
  CSS3: "bg-blue-100 text-blue-700 border-blue-200",
  Dart: "bg-cyan-100 text-cyan-800 border-cyan-200",
  Docker: "bg-blue-100 text-blue-600 border-blue-200",
  "Express.js": "bg-gray-100 text-gray-800 border-gray-200",
  Figma: "bg-orange-100 text-orange-800 border-orange-200",
  Flutter: "bg-sky-100 text-sky-700 border-sky-200",
  GitHub: "bg-zinc-100 text-zinc-900 border-zinc-300",
  Hono: "bg-orange-100 text-orange-600 border-orange-200",
  HTML5: "bg-orange-100 text-orange-700 border-orange-200",
  JavaScript: "bg-yellow-100 text-yellow-800 border-yellow-300",
  Laravel: "bg-red-100 text-red-700 border-red-200",
  MongoDB: "bg-green-100 text-green-800 border-green-200",
  MySQL: "bg-sky-100 text-sky-800 border-sky-200",
  "Next.js": "bg-black text-white border-zinc-800",
  NodeJS: "bg-emerald-100 text-emerald-800 border-emerald-200",
  React: "bg-blue-50 text-blue-500 border-blue-100",
  Svelte: "bg-orange-100 text-orange-700 border-orange-200",
  Sveltekit: "bg-orange-50 text-orange-600 border-orange-200",
  "Tailwind CSS": "bg-cyan-50 text-cyan-600 border-cyan-200",
  TypeScript: "bg-blue-100 text-blue-800 border-blue-200",
  Vite: "bg-violet-100 text-violet-700 border-violet-200",
  "Shadcn UI": "bg-zinc-100 text-zinc-800 border-zinc-300",
  "Gemini API": "bg-indigo-100 text-indigo-700 border-indigo-200",
  Vercel: "bg-black text-white border-black",
  Firebase: "bg-amber-100 text-amber-800 border-amber-200",
  "Framer Motion": "bg-pink-100 text-pink-700 border-pink-200",
  Zustand: "bg-orange-100 text-orange-700 border-orange-200",
  Cloudinary: "bg-blue-100 text-blue-700 border-blue-200",
};

type ProjectCardProps = {
  imageUrl: string;
  title: string;
  year: string;
  description: string;
  tags: string[];
  websiteUrl?: string;
  sourceUrl?: string;
  isPrivate?: boolean;
};

export function ProjectCard({
  imageUrl,
  title,
  year,
  description,
  tags = [],
  websiteUrl,
  sourceUrl,
  isPrivate = false,
}: ProjectCardProps) {
  return (
    <div className="group border border-neutral-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* IMAGE */}
      <div className="h-40 w-full bg-linear-to-br from-neutral-100 to-neutral-200 flex items-center justify-center overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover object-center"
          loading="lazy"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-3">
        {/* Title + Year */}
        <div>
          <h3 className="text-base font-semibold text-neutral-900 mb-1">
            {title}
          </h3>
          <p className="text-xs font-medium text-neutral-500">{year}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-neutral-600 leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* TAGS */}
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              className={`border ${
                tagStyles[tag] ||
                "bg-neutral-100 text-neutral-600 border-neutral-200"
              }`}
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="flex gap-2 pt-1">
          {websiteUrl ? (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium bg-neutral-900 text-white rounded-full py-1 hover:bg-neutral-800 transition-colors duration-200"
            >
              <Globe className="w-3.5 h-3.5" />
              Website
            </a>
          ) : (
            <button
              disabled
              className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium bg-neutral-200 text-neutral-400 rounded-full py-1 cursor-not-allowed"
            >
              <Globe className="w-3.5 h-3.5" />
              Website
            </button>
          )}
          {sourceUrl ? (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium border border-neutral-300 bg-white text-neutral-900 rounded-full py-1 hover:bg-neutral-50 transition-colors duration-200"
            >
              <Github className="w-3.5 h-3.5" />
              <span>{isPrivate ? "Source (private)" : "Source"}</span>
            </a>
          ) : (
            <button
              disabled
              className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium border border-neutral-200 bg-neutral-50 text-neutral-400 rounded-full py-1 cursor-not-allowed"
            >
              <Github className="w-3.5 h-3.5" />
              Source
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
