import { Skeleton } from "./ui/skeleton";

export function LoadingRepositoryPinned() {
  return (
    <div className="flex h-full flex-col rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 shadow-sm">

      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          {/* Title */}
          <Skeleton className="h-5 w-2/3" />

          {/* Description */}
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
          </div>
        </div>

        {/* Badge */}
        <Skeleton className="h-5 w-14 rounded-md shrink-0" />
      </div>

      {/* FOOTER */}
      <div className="mt-auto flex flex-wrap items-center gap-3 pt-3">
        {/* Language */}
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-2.5 w-2.5 rounded-full" />
          <Skeleton className="h-3 w-14" />
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-3.5 w-3.5" />
          <Skeleton className="h-3 w-8" />
        </div>

        {/* Forks */}
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-3.5 w-3.5" />
          <Skeleton className="h-3 w-8" />
        </div>
      </div>
    </div>
  );
}
