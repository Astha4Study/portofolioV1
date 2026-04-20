import { useQuery } from "@tanstack/react-query";
import { fetchPinnedRepos } from "@/lib/repository";
import RepositoryCard from "./RepositoryCard";

export default function RepositoryPinned() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["pinned-repositories"],
    queryFn: fetchPinnedRepos,
  });

  if (isLoading) {
    return (
      <section className="space-y-4">
        <div className="h-6 w-44 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800 transition-colors duration-200" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-52 animate-pulse rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800 transition-colors duration-200"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 px-4 py-3 text-sm text-red-700 dark:text-red-400 transition-colors duration-200">
        Failed to load pinned repositories.
      </section>
    );
  }

  if (data.length === 0) {
    return (
      <section className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400 transition-colors duration-200">
        No pinned repositories found.
      </section>
    );
  }

  return (
    <section className="space-y-2">
      <h2 className="text-lg font-semibold tracking-tight text-neutral-950 dark:text-neutral-100 transition-colors duration-200">
        Pinned Repositories
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {data.map((repository) => (
          <RepositoryCard key={repository.url} repository={repository} />
        ))}
      </div>
    </section>
  );
}
