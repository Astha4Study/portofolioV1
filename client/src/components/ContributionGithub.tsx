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
  if (level === 0) return "#e5e7eb";
  if (level === 1) return "#a7f3d0";
  if (level === 2) return "#34d399";
  if (level === 3) return "#059669";
  if (level === 4) return "#065f46";

  return "#e5e7eb";
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
    return <p className="text-sm text-muted-foreground">Loading graph...</p>;
  }

  if (error || !data) {
    return <p className="text-sm text-red-500">Failed to load contributions</p>;
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
                    className="cursor-pointer"
                    dayIndex={dayIndex}
                    style={{ fill: getLevelFillColor(activity.level) }}
                    weekIndex={weekIndex}
                  />
                </g>
              </TooltipTrigger>

              <TooltipContent>
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
                <span className="text-muted-foreground text-sm">
                  Year {year}:
                </span>
                <Badge variant="secondary">
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
                  className={`h-full w-full rounded-sm border border-border ${level === 0 ? "bg-muted" : ""} ${level === 1 ? "bg-emerald-200 dark:bg-emerald-900" : ""} ${level === 2 ? "bg-emerald-400 dark:bg-emerald-700" : ""} ${level === 3 ? "bg-emerald-600 dark:bg-emerald-500" : ""} ${level === 4 ? "bg-emerald-800 dark:bg-emerald-300" : ""} `}
                />
                <span className="-top-8 absolute hidden rounded bg-popover px-2 py-1 text-popover-foreground text-xs shadow-md group-hover:block">
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
