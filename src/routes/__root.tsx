import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useRef } from "react";
import { usePanelRef } from "react-resizable-panels";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { TitleBar } from "@/components/layout/TitleBar";
import { PrimarySidebar } from "@/components/layout/PrimarySidebar";
import { CommandPalette } from "@/components/layout/CommandPalette";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useUIStore } from "@/store/useUIStore";
import { NutOffIcon } from "lucide-react";

const SIDEBAR_COLLAPSED_WIDTH = 56;
const SIDEBAR_DEFAULT_WIDTH = 208;
const SIDEBAR_MIN_WIDTH = 140;
const SIDEBAR_MAX_WIDTH = 320;

function clampSidebarWidth(width: number) {
  return Math.min(SIDEBAR_MAX_WIDTH, Math.max(SIDEBAR_MIN_WIDTH, width));
}

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
  const sidebarCollapsed = useUIStore((s) => s.sidebarCollapsed);
  const setSidebarCollapsed = useUIStore((s) => s.setSidebarCollapsed);
  const setCommandOpen = useUIStore((s) => s.setCommandOpen);
  const sidebarPanelRef = usePanelRef();
  const lastExpandedSidebarWidthRef = useRef(SIDEBAR_DEFAULT_WIDTH);

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

  useLayoutEffect(() => {
    const sidebarPanel = sidebarPanelRef.current;
    if (!sidebarPanel) return;

    if (sidebarCollapsed) {
      if (!sidebarPanel.isCollapsed()) {
        const size = sidebarPanel.getSize();
        if (size.inPixels > SIDEBAR_COLLAPSED_WIDTH) {
          lastExpandedSidebarWidthRef.current = clampSidebarWidth(size.inPixels);
        }
        sidebarPanel.collapse();
      }
      return;
    }

    if (sidebarPanel.isCollapsed()) {
      sidebarPanel.resize(lastExpandedSidebarWidthRef.current);
    }
  }, [sidebarCollapsed, sidebarPanelRef]);

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex h-full w-full flex-col overflow-hidden bg-app-background">
        <TitleBar />
        <div className="flex flex-1 min-h-0 overflow-hidden">
          <ResizablePanelGroup orientation="horizontal" className="min-h-0 flex-1">
            <ResizablePanel
              id="primary-sidebar"
              panelRef={sidebarPanelRef}
              defaultSize={SIDEBAR_DEFAULT_WIDTH}
              minSize={SIDEBAR_MIN_WIDTH}
              maxSize={SIDEBAR_MAX_WIDTH}
              collapsible
              collapsedSize={SIDEBAR_COLLAPSED_WIDTH}
              groupResizeBehavior="preserve-pixel-size"
              className="min-w-0"
              onResize={(size) => {
                const nextCollapsed = sidebarPanelRef.current?.isCollapsed() ?? false;

                if (!nextCollapsed) {
                  lastExpandedSidebarWidthRef.current = clampSidebarWidth(size.inPixels);
                }

                if (nextCollapsed !== sidebarCollapsed) {
                  setSidebarCollapsed(nextCollapsed);
                }
              }}
            >
              <PrimarySidebar />
            </ResizablePanel>

            <ResizablePanel className="min-w-0">
              <div className="flex h-full min-w-0 pr-3 pb-3">
                <Outlet />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <CommandPalette />
        <Toaster position="bottom-right" closeButton />
      </div>
    </TooltipProvider>
  );
}
