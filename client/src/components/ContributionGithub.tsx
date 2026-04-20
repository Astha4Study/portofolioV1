import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@/components/kibo-ui/contribution-graph";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useQuery } from "@tanstack/react-query";
import { Badge } from "./ui/badge";

const getLevelFillColor = (level: number) => {
  if (level === 0) return "var(--muted)";
  if (level === 1) return "rgb(16, 185, 129)"; // emerald-500
  if (level === 2) return "rgb(5, 150, 105)"; // emerald-600
  if (level === 3) return "rgb(4, 120, 87)"; // emerald-700
  if (level === 4) return "rgb(6, 78, 59)"; // emerald-800

  return "var(--muted)";
};

async function fetchContributions() {
  const res = await fetch("http://localhost:3000/github/contributions");

  if (!res.ok) {
    throw new Error("Failed to fetch contributions");
  }

  return res.json();
}

const ContributionGithub = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["contributions"],
    queryFn: fetchContributions,
  });

  if (isLoading) {
    return <p className="text-sm text-muted-foreground dark:text-neutral-400">Loading graph...</p>;
  }

  if (error || !data) {
    return <p className="text-sm text-red-500 dark:text-red-400">Failed to load contributions</p>;
  }

  return (
    <TooltipProvider>
      <ContributionGraph data={data}>
        <ContributionGraphCalendar>
          {({ activity, dayIndex, weekIndex }) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <g>
                  <ContributionGraphBlock
                    activity={activity}
                    className="cursor-pointer transition-colors duration-200"
                    dayIndex={dayIndex}
                    style={{ fill: getLevelFillColor(activity.level) }}
                    weekIndex={weekIndex}
                  />
                </g>
              </TooltipTrigger>

              <TooltipContent className="dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-700 bg-white text-neutral-900 border-neutral-200">
                <p className="font-semibold">{activity.date}</p>
                <p>{activity.count} contributions</p>
              </TooltipContent>
            </Tooltip>
          )}
        </ContributionGraphCalendar>

        <ContributionGraphFooter>
          <ContributionGraphTotalCount>
            {({ totalCount, year }) => (
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground dark:text-neutral-400 text-sm">
                  Year {year}:
                </span>
                <Badge
                  variant="secondary"
                  className="dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700"
                >
                  {totalCount.toLocaleString()} contributions
                </Badge>
              </div>
            )}
          </ContributionGraphTotalCount>
          <ContributionGraphLegend>
            {({ level }) => (
              <div
                className="group relative flex h-3 w-3 items-center justify-center"
                data-level={level}
              >
                <div
                  className={`h-full w-full rounded-sm border border-border dark:border-neutral-700 transition-colors duration-200 ${
                    level === 0 ? "bg-muted dark:bg-neutral-800" : ""
                  } ${
                    level === 1
                      ? "bg-emerald-200 dark:bg-emerald-900/60"
                      : ""
                  } ${
                    level === 2
                      ? "bg-emerald-400 dark:bg-emerald-700/70"
                      : ""
                  } ${
                    level === 3
                      ? "bg-emerald-600 dark:bg-emerald-600/80"
                      : ""
                  } ${
                    level === 4
                      ? "bg-emerald-800 dark:bg-emerald-500/80"
                      : ""
                  }`}
                />
                <span className="-top-8 absolute hidden rounded bg-popover dark:bg-neutral-800 px-2 py-1 text-popover-foreground dark:text-neutral-100 text-xs shadow-md dark:shadow-neutral-900/50 group-hover:block transition-colors duration-200">
                  Level {level}
                </span>
              </div>
            )}
          </ContributionGraphLegend>
        </ContributionGraphFooter>
      </ContributionGraph>
    </TooltipProvider>
  );
};

export default ContributionGithub;
