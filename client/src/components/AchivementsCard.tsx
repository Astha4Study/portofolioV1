import { Globe } from "lucide-react";

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
    <div className="group h-full flex flex-col border border-neutral-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* IMAGE */}
      <div className="h-40 w-full bg-linear-to-br from-neutral-100 to-neutral-200 overflow-hidden">
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
          <h3 className="text-base font-semibold text-neutral-900 mb-1">
            {title}
          </h3>
          <p className="text-xs font-medium text-neutral-500">{year}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-neutral-600 leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* BUTTON */}
        <div className="mt-auto pt-1">
          {websiteUrl ? (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-1.5 text-xs font-medium bg-neutral-900 text-white rounded-full py-1 hover:bg-neutral-800 transition"
            >
              <Globe className="w-3.5 h-3.5" />
              View Details
            </a>
          ) : (
            <button
              disabled
              className="w-full flex items-center justify-center gap-1.5 text-xs font-medium bg-neutral-200 text-neutral-400 rounded-full py-1 cursor-not-allowed"
            >
              <Globe className="w-3.5 h-3.5" />
              No Link
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
