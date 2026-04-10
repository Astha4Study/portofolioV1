import GithubInsights from "@/components/features/insights/GithubInsights";
import WakaTimeInsights from "@/components/features/insights/WakaTimeInsights";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/insights")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-12">
      <GithubInsights />
      <WakaTimeInsights />
    </div>
  );
}
