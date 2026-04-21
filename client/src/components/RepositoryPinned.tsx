import RepositoryCard from "./RepositoryCard";

export default function RepositoryPinned({ data }) {
  if (!data || data.length === 0) {
    return (
      <section className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
        No pinned repositories found.
      </section>
    );
  }

  return (
    <section className="space-y-2">
      <h2 className="text-lg font-semibold tracking-tight text-neutral-950 dark:text-neutral-100">
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
