import { Skeleton } from "@/components/ui/skeleton";
import { LoadingStatisticWakatime } from "./LoadingStatisticWakatime";

export default function LoadingWakatimeInsights() {
  return (
    <section className="w-full space-y-6 border-t border-neutral-200 dark:border-neutral-800 pt-6">

      {/* HEADER */}
      <div className="space-y-3 sm:flex sm:items-start sm:justify-between sm:space-y-0">
        <div className="space-y-3">
          <Skeleton className="h-5 w-24 rounded-md" />

          <div className="space-y-1.5">
            <Skeleton className="h-6 w-72" />
            <Skeleton className="h-4 w-96" />
          </div>
        </div>

        <Skeleton className="h-6 w-40 rounded-md" />
      </div>

      {/* CONTENT */}
      <LoadingStatisticWakatime />
    </section>
  );
}
