import HeaderInsightsSection from "@/components/landing/insights/HeaderInsightsSection";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/insights")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-12">
      <HeaderInsightsSection />
    </div>
  );
}
