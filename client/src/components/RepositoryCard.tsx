import { GitFork, Lock, Star } from "lucide-react";
import { Badge } from "./ui/badge";
import { GitHubPinnedRepository } from "@/lib/repository";

const languageFallbackColor = "#d4d4d8";

export default function RepositoryCard({
  repository,
}: {
  repository: GitHubPinnedRepository;
}) {
  const languageColor =
    repository.primaryLanguage?.color ?? languageFallbackColor;

  return (
    <article className="group flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-4 text-neutral-900 shadow-sm transition-all duration-300  hover:border-neutral-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-0.5">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-semibold tracking-tight text-neutral-950">
              {repository.name}
            </h3>
          </div>
          <p className="line-clamp-2 text-xs leading-relaxed text-neutral-600">
            {repository.description || ""}
          </p>
        </div>

        {repository.isPrivate ? (
          <Badge
            variant="outline"
            className="shrink-0 border-neutral-200 bg-neutral-50 text-neutral-600"
          >
            <Lock className="mr-1 h-3 w-3" />
            Private
          </Badge>
        ) : null}
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-3 pt-1.5 text-xs text-neutral-500">
        {repository.primaryLanguage ? (
          <span className="inline-flex items-center gap-1 rounded-full px-0.5 py-0.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: languageColor }}
            />
            {repository.primaryLanguage.name}
          </span>
        ) : null}

        <span className="inline-flex items-center gap-1">
          <Star className="h-3.5 w-3.5" />
          {repository.stargazerCount}
        </span>

        <span className="inline-flex items-center gap-1">
          <GitFork className="h-3.5 w-3.5" />
          {repository.forkCount}
        </span>
      </div>
    </article>
  );
}
