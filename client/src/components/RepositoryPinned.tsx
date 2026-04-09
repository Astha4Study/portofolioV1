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
        <div className="h-6 w-44 animate-pulse rounded-full bg-neutral-200" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-52 animate-pulse rounded-2xl border border-neutral-200 bg-neutral-100"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        Failed to load pinned repositories.
      </section>
    );
  }

  if (data.length === 0) {
    return (
      <section className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-600">
        No pinned repositories found.
      </section>
    );
  }

  return (
    <section className="space-y-2">
      <h2 className="text-lg font-semibold tracking-tight text-neutral-950">
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
