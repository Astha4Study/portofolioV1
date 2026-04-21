import { Skeleton } from "@/components/ui/skeleton"

export function LoadingContributionGithub() {
  return (
    <div className="space-y-4">
      {/* Skeleton untuk Contribution Graph Calendar (Grid) */}
      <div className="flex gap-1 overflow-x-auto pb-2">
        {/* Generate 53 kolom (minggu) x 7 baris (hari) secara visual */}
        {Array.from({ length: 53 }).map((_, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {Array.from({ length: 7 }).map((_, dayIndex) => (
              <Skeleton
                key={dayIndex}
                className="h-2.5 w-2.5 rounded-sm bg-muted/50"
              />
            ))}
          </div>
        ))}
      </div>

      {/* Skeleton untuk Footer: Total Count + Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
        {/* Total Count Skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-12" /> {/* "Year 2024:" */}
          <Skeleton className="h-5 w-32 rounded-md" /> {/* Badge contributions */}
        </div>

        {/* Legend Skeleton */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center gap-1">
              <Skeleton className="h-3 w-3 rounded-sm" />
              <Skeleton className="h-2 w-8" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
