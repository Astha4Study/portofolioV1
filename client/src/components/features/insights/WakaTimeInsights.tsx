import LoadingWakatimeInsights from "@/components/LoadingWakaTimeInsights";
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
    return <LoadingWakatimeInsights />;
  }

  if (error || !data) {
    return (
      <section className="w-full space-y-6 border-t border-neutral-200 dark:border-neutral-800 pt-6 transition-colors duration-200">
        <div className="space-y-3">
          <Badge
            variant="outline"
            className="border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 transition-colors duration-200"
          >
            WakaTime
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-neutral-100 sm:text-3xl transition-colors duration-200">
            Coding Activity Insights
          </h2>
        </div>

        <div className="rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 px-4 py-3 text-sm text-red-700 dark:text-red-400 transition-colors duration-200">
          Failed to load WakaTime statistics.
        </div>
      </section>
    );
  }

  const lastUpdate = formatDistanceToNowStrict(new Date(data.end), {
    addSuffix: true,
  });

  return (
    <section className="w-full space-y-6 border-t border-neutral-200 dark:border-neutral-800 pt-6 transition-colors duration-200">
      <div className="space-y-3 pb-2 sm:flex sm:items-start sm:justify-between sm:space-y-0">
        <div className="space-y-3">
          <Badge
            variant="outline"
            className="border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 transition-colors duration-200"
          >
            WakaTime
          </Badge>

          <div className="space-y-0.5">
            <h2 className="text-xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-100 sm:text-2xl transition-colors duration-200">
              Coding activity over the past 7 days
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 transition-colors duration-200">
              Weekly summary from WakaTime with productivity highlights.
            </p>
          </div>
        </div>

        <Badge
          variant={"default"}
          className="dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 transition-colors duration-200"
        >
          Last update: {lastUpdate}
        </Badge>
      </div>

      <StatisticWakatime stats={data} />
    </section>
  );
}
