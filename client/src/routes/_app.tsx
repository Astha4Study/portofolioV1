import DockNav from "@/components/DockNav";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="max-w-2xl w-full mx-auto py-10 pb-28 sm:py-24 sm:pb-32 backdrop-blur-lg bg-white">
        <Outlet />
      </div>
      <DockNav />
    </>
  );
}
