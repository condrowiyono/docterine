import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { TitleBar } from "@/components/layout/TitleBar";
import { PrimarySidebar } from "@/components/layout/PrimarySidebar";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { useUIStore } from "@/store/useUIStore";
import { NutOffIcon } from "lucide-react";

function NotFound() {
  return (
    <div className="flex w-full min-w-0 items-center justify-center rounded-xl border bg-card ">
      <div className="flex flex-col items-center text-center text-muted-foreground">
        <div className="grid size-24 place-items-center rounded-full text-primary">
          <NutOffIcon />
        </div>
        <h2 className="mt-6 mb-4 text-3xl font-bold tracking-tight text-foreground">
          Coming Soon
        </h2>
      </div>
    </div>
  );
}

export const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootLayout() {
  const setCommandOpen = useUIStore((s) => s.setCommandOpen);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setCommandOpen]);

  return (
    <div
      className="flex flex-col w-full h-full overflow-hidden"
      style={{ background: "var(--app-bg)" }}
    >
      <TitleBar />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <PrimarySidebar />
        <div className="flex flex-1 min-w-0 pr-3 pb-3">
          <Outlet />
        </div>
      </div>
      <CommandPalette />
    </div>
  );
}
