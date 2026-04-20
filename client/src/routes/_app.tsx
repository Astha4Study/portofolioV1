import DockMessage from "@/components/DockMessage";
import DockNav from "@/components/DockNav";
import DockSettings from "@/components/DockSettings";
import {ThemeProvider} from "@/components/ThemeProvider"
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="max-w-2xl w-full mx-auto py-10 pb-28 sm:py-24 sm:pb-32 backdrop-blur-lg">
        <Outlet />
      </div>
      <div className="flex items-center">
        <DockSettings />
        <DockNav />
        <DockMessage />
      </div>
    </ThemeProvider>
  );
}
