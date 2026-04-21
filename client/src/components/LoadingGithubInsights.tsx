import { Skeleton } from "@/components/ui/skeleton"

export function LoadinggithubInsights() {
  return (
    <div className="flex flex-col gap-5 border-b border-neutral-200 dark:border-neutral-800 pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-3 w-full">
        <Skeleton className="h-5 w-16 rounded-md" />

        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-32" />
        </div>

        <Skeleton className="h-4 w-full max-w-xl" />
        <Skeleton className="h-4 w-4/5 max-w-lg" />
      </div>

      <div className="shrink-0">
        <Skeleton className="h-28 w-28 rounded-full" />
      </div>
    </div>
  );
}
