import StatisticWakatime from "@/components/StatisticWakatime";
import { Badge } from "@/components/ui/badge";
import { fetchWakaTimeStats } from "@/lib/wakatime";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNowStrict } from "date-fns";

export default function WakaTimeInsights() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["wakatime-stats"],
    queryFn: fetchWakaTimeStats,
  });

  if (isLoading) {
    return (
      <section className="w-full space-y-6 border-t border-neutral-200 pt-6">
        <div className="space-y-3">
          <div className="h-5 w-28 animate-pulse rounded-full bg-neutral-200" />
          <div className="h-9 w-56 animate-pulse rounded-md bg-neutral-300" />
          <div className="h-4 w-80 animate-pulse rounded-md bg-neutral-200" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-34 animate-pulse rounded-2xl border border-neutral-200 bg-neutral-100"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="w-full space-y-6 border-t border-neutral-200 pt-6">
        <div className="space-y-3">
          <Badge
            variant="outline"
            className="border-neutral-300 text-neutral-600"
          >
            WakaTime
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl">
            Coding Activity Insights
          </h2>
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Failed to load WakaTime statistics.
        </div>
      </section>
    );
  }

  const lastUpdate = formatDistanceToNowStrict(new Date(data.end), {
    addSuffix: true,
  });

  return (
    <section className="w-full space-y-6 border-t border-neutral-200 pt-6">
      <div className="space-y-3 pb-2 sm:flex sm:items-start sm:justify-between sm:space-y-0">
        <div className="space-y-3">
          <Badge
            variant="outline"
            className="border-neutral-300 text-neutral-600"
          >
            WakaTime
          </Badge>

          <div className="space-y-0.5">
            <h2 className="text-xl font-semibold tracking-tight text-neutral-950 sm:text-2xl">
              Coding activity over the past 7 days
            </h2>
            <p className="text-sm text-neutral-500">
              Weekly summary from WakaTime with productivity highlights.
            </p>
          </div>
        </div>

        <Badge variant={"default"}>Last update: {lastUpdate}</Badge>
      </div>

      <StatisticWakatime stats={data} />
    </section>
  );
}
