import type { WakaTimeStats } from "@/lib/wakatime";
import { format } from "date-fns";
import WakatimeMetricCard from "./WakatimeMatricCard";

type StatisticWakatimeProps = {
  stats: WakaTimeStats;
};

function formatDuration(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours === 0) {
    return `${minutes} mins`;
  }

  if (minutes === 0) {
    return `${hours} hrs`;
  }

  return `${hours} hrs ${minutes} mins`;
}

function formatDateLabel(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return format(date, "MMMM dd, yyyy");
}

function getPercentage(value: number, total: number) {
  if (total <= 0) {
    return 0;
  }

  return Math.round((value / total) * 100);
}

function getLanguageColor(languageName: string) {
  const key = languageName.toLowerCase();

  const colors: Record<string, string> = {
    typescript: "#3178c6",
    svelte: "#ff3e00",
    tsconfig: "#3178c6",
    javascript: "#f7df1e",
    html: "#e34f26",
    css: "#1572b6",
    go: "#00add8",
    rust: "#dea584",
    python: "#3776ab",
    java: "#b07219",
    markdown: "#6b7280",
    mdx: "#1f4acc",
    json: "#f59e0b",
    yaml: "#cb171e",
    shell: "#89e051",
    bash: "#89e051",
    "c++": "#f34b7d",
    c: "#555555",
    "c#": "#178600",
    php: "#4f5d95",
    ruby: "#cc342d",
    kotlin: "#7f52ff",
    swift: "#f05138",
    other: "#6b7280",
  };

  return colors[key] ?? "#4b5563";
}

export default function StatisticWakatime({ stats }: StatisticWakatimeProps) {
  const totalLanguageSeconds = stats.topLanguages.reduce(
    (sum, language) => sum + language.total_seconds,
    0,
  );

  const topLanguages = stats.topLanguages.slice(0, 4);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <WakatimeMetricCard
          label="Start Date"
          value={formatDateLabel(stats.start)}
        />
        <WakatimeMetricCard
          label="End Date"
          value={formatDateLabel(stats.end)}
        />
        <WakatimeMetricCard
          label="Average Daily Coding Time"
          value={formatDuration(stats.avgDaily)}
        />
        <WakatimeMetricCard
          label="Total This Week"
          value={formatDuration(stats.totalThisWeek)}
        />
        <WakatimeMetricCard
          label="Best Day"
          value={`${formatDateLabel(stats.bestDay.date)} (${formatDuration(
            stats.bestDay.total_seconds,
          )})`}
        />
        <WakatimeMetricCard
          label="All-Time Coding"
          value={formatDuration(stats.allTimeTotal)}
        />
      </div>

      <div className="space-y-3">
        <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-medium text-neutral-500">
            Top Languages
          </h3>

          <div className="mt-4 space-y-3">
            {topLanguages.length === 0 ? (
              <p className="text-sm text-neutral-500">
                No language data available yet.
              </p>
            ) : null}

            {topLanguages.map((language) => {
              const percentage = getPercentage(
                language.total_seconds,
                totalLanguageSeconds,
              );
              const languageColor = getLanguageColor(language.name);

              return (
                <div key={language.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <p className="font-medium text-neutral-800">
                      {language.name}
                    </p>
                    <p className="font-semibold text-neutral-800">
                      {percentage}%
                    </p>
                  </div>

                  <div className="h-2 rounded-full bg-neutral-100">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: languageColor,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
