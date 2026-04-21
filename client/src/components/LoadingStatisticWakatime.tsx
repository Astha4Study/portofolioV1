import { Skeleton } from "@/components/ui/skeleton";

export function LoadingStatisticWakatime() {
  return (
    <div className="space-y-4">

      {/* METRIC CARDS */}
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 shadow-sm space-y-2"
          >
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-5 w-32" />
          </div>
        ))}
      </div>

      {/* TOP LANGUAGES */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 shadow-sm space-y-4">

        <Skeleton className="h-4 w-32" />

        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-1.5">

              {/* label + percentage */}
              <div className="flex items-center justify-between">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-10" />
              </div>

              {/* progress bar */}
              <Skeleton className="h-2 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
