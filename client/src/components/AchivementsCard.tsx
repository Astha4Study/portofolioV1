import { Globe } from "lucide-react";
import CardShell from "./CardShell";

type AchivementsCardProps = {
  imageUrl: string;
  title: string;
  year: string;
  description: string;
  websiteUrl?: string;
};

export default function AchivementsCard({
  imageUrl,
  title,
  year,
  description,
  websiteUrl,
}: AchivementsCardProps) {
  return (
    <CardShell imageUrl={imageUrl} imageAlt={title}>
      {/* Title + Year */}
      <div>
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-1 line-clamp-2">
          {title}
        </h3>

        <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
          {year}
        </p>
      </div>

      {/* Description */}
      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
        {description}
      </p>

      {/* BUTTON */}
      <div className="mt-auto pt-1">
        {websiteUrl ? (
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-1.5 text-xs font-medium bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-full py-1 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors duration-200"
          >
            <Globe className="w-3.5 h-3.5" />
            View Details
          </a>
        ) : (
          <button
            disabled
            className="w-full flex items-center justify-center gap-1.5 text-xs font-medium bg-neutral-200 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600 rounded-full py-1 cursor-not-allowed"
          >
            <Globe className="w-3.5 h-3.5" />
            No Link
          </button>
        )}
      </div>
    </CardShell>
  );
}
