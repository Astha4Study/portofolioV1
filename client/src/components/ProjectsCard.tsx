import { Globe } from "lucide-react";
import { Badge } from "./ui/badge";

export type IconProps = React.SVGProps<SVGSVGElement>;

const icon = {
  github: (props: IconProps) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      ></path>
    </svg>
  ),
}

const tagStyles: Record<string, string> = {
  Bootstrap: "bg-purple-100 dark:bg-purple-950/50 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800",
  Bun: "bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-300 border-stone-200 dark:border-stone-700",
  CSS3: "bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  Dart: "bg-cyan-100 dark:bg-cyan-950/50 text-cyan-800 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800",
  Docker: "bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  "Express.js": "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700",
  Figma: "bg-orange-100 dark:bg-orange-950/50 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-800",
  Flutter: "bg-sky-100 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800",
  GitHub: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700",
  Hono: "bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-300 border-orange-200 dark:border-orange-800",
  HTML5: "bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800",
  JavaScript: "bg-yellow-100 dark:bg-yellow-950/50 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-800",
  Laravel: "bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
  MongoDB: "bg-green-100 dark:bg-green-950/50 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800",
  MySQL: "bg-sky-100 dark:bg-sky-950/50 text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-800",
  "Next.js": "bg-black dark:bg-neutral-800 text-white dark:text-neutral-100 border-zinc-800 dark:border-neutral-700",
  NodeJS: "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  React: "bg-blue-50 dark:bg-blue-950/30 text-blue-500 dark:text-blue-400 border-blue-100 dark:border-blue-800",
  Svelte: "bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800",
  Sveltekit: "bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800",
  "Tailwind CSS": "bg-cyan-50 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800",
  TypeScript: "bg-blue-100 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  Vite: "bg-violet-100 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800",
  "Shadcn UI": "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700",
  "Gemini API": "bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
  Vercel: "bg-black dark:bg-neutral-800 text-white dark:text-neutral-100 border-black dark:border-neutral-700",
  Firebase: "bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  "Framer Motion": "bg-pink-100 dark:bg-pink-950/50 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800",
  Zustand: "bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800",
  Cloudinary: "bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  Prisma: "bg-green-100 dark:bg-green-950/50 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800",
  PostgreSQL: "bg-blue-100 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800",
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
    <div className="group h-full flex flex-col border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden bg-white dark:bg-neutral-900 shadow-sm hover:shadow-lg dark:hover:shadow-neutral-800/50 transition-all duration-300">
      {/* IMAGE */}
      <div className="h-40 w-full bg-linear-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover object-center"
          loading="lazy"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        {/* Title + Year */}
        <div>
          <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
            {title}
          </h3>
          <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{year}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* TAGS */}
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              className={`border ${
                tagStyles[tag] ||
                "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700"
              }`}
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="mt-auto flex gap-2 pt-1">
          {websiteUrl ? (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-full py-1 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors duration-200"
            >
              <Globe className="w-3.5 h-3.5" />
              Website
            </a>
          ) : (
            <button
              disabled
              className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium bg-neutral-200 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600 rounded-full py-1 cursor-not-allowed"
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
              className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 rounded-full py-1 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-200"
            >
              {icon.github({ className: "w-3.5 h-3.5" })}
              <span>{isPrivate ? "Source (private)" : "Source"}</span>
            </a>
          ) : (
            <button
              disabled
              className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600 rounded-full py-1 cursor-not-allowed"
            >
              {icon.github({ className: "w-3.5 h-3.5" })}
              Source
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
