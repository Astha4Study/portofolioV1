import ContactSection from "@/components/features/sections/ContactSection";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/message-me")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-9">
      <ContactSection />
    </div>
  );
}
