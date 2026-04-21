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

import { Badge } from "./ui/badge";

const getLevelFillColor = (level: number) => {
  if (level === 0) return "var(--muted)";
  if (level === 1) return "rgb(16, 185, 129)";
  if (level === 2) return "rgb(5, 150, 105)";
  if (level === 3) return "rgb(4, 120, 87)";
  if (level === 4) return "rgb(6, 78, 59)";
  return "var(--muted)";
};

const ContributionGithub = ({ data }) => {
  if (!data) {
    return (
      <p className="text-sm text-red-500 dark:text-red-400">
        Failed to load contributions
      </p>
    );
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
                    weekIndex={weekIndex}
                    style={{ fill: getLevelFillColor(activity.level) }}
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
                <span className="text-sm text-muted-foreground">
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
              <div className="flex h-3 w-3">
                <div
                  className={`h-full w-full rounded-sm ${
                    level === 0 && "bg-muted"
                  } ${level === 1 && "bg-emerald-200"} ${
                    level === 2 && "bg-emerald-400"
                  } ${level === 3 && "bg-emerald-600"} ${
                    level === 4 && "bg-emerald-800"
                  }`}
                />
              </div>
            )}
          </ContributionGraphLegend>
        </ContributionGraphFooter>
      </ContributionGraph>
    </TooltipProvider>
  );
};

export default ContributionGithub;
