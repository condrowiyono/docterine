import { Box, Database, HardDrive, Home, Layers, LayoutGrid, List, Network, Settings } from "lucide-react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/useUIStore";

const primaryNav = [
  { id: "images", label: "Images", icon: Layers, group: "DOCKER", path: "/images" },
  { id: "volumes", label: "Volumes", icon: HardDrive, group: "DOCKER", path: "/volumes" },
  { id: "networks", label: "Networks", icon: Network, group: "DOCKER", path: "/networks" },
  { id: "containers", label: "Containers", icon: Box, group: "DOCKER", path: "/containers" },
  { id: "engines", label: "Engines", icon: Database, group: "OTHER", path: "/engines" },
  { id: "dockerHub", label: "Docker Hub", icon: Home, group: "OTHER", path: "/docker-hub" },
  { id: "components", label: "Components", icon: LayoutGrid, group: "OTHER", path: "/components" },
] as const;

const iconCollapsedClass = "size-4 shrink-0 stroke-2";
const iconExpandedClass = "size-4.5 shrink-0 stroke-2";

export function PrimarySidebar() {
  const { sidebarCollapsed } = useUIStore();
  const navigate = useNavigate();
  const { location } = useRouterState();
  const pathname = location.pathname;

  const itemClass =
    "flex h-9 w-full items-center gap-2.5 rounded-lg border-0 bg-transparent px-2.5 text-left text-sm font-normal text-sidebar-foreground";
  const collapsedItemClass = "mx-auto w-12 justify-center px-0";

  const iconProps = sidebarCollapsed
    ? { className: iconCollapsedClass }
    : { className: iconExpandedClass };

  return (
    <aside
      className={cn(
        "flex h-full w-full min-w-0 flex-col justify-between px-2.5 pb-2.5 pt-3.5",
        sidebarCollapsed && "items-center px-0",
      )}
    >
      <nav className={cn("flex w-full flex-col gap-1", sidebarCollapsed && "items-center")} aria-label="Primary">
        {["DOCKER", "OTHER"].map((group, groupIndex) => (
          <div
            className={cn("flex flex-col gap-0.5", groupIndex > 0 && "mt-3", sidebarCollapsed && "items-center")}
            key={group}
          >
            {!sidebarCollapsed && (
              <div className="px-2 pb-0.5 text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
                {group}
              </div>
            )}
            {primaryNav
              .filter((item) => item.group === group)
              .map((item) => {
                const selected = pathname.startsWith(item.path);
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    className={cn(
                      itemClass,
                      selected && "bg-sidebar-accent text-sidebar-primary",
                      sidebarCollapsed && collapsedItemClass,
                    )}
                    title={sidebarCollapsed ? item.label : undefined}
                    onClick={() => navigate({ to: item.path as never })}
                  >
                    <Icon {...iconProps} />
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </button>
                );
              })}
          </div>
        ))}
      </nav>

      <div className={cn("flex w-full flex-col gap-1", sidebarCollapsed && "items-center")}>
        <button
          className={cn(itemClass, sidebarCollapsed && collapsedItemClass)}
          title={sidebarCollapsed ? "Panel" : undefined}
        >
          <List {...iconProps} />
          {!sidebarCollapsed && <span>Panel</span>}
        </button>
        <button
          className={cn(
            itemClass,
            pathname.startsWith("/settings") && "bg-sidebar-accent text-sidebar-primary",
            sidebarCollapsed && collapsedItemClass,
          )}
          title={sidebarCollapsed ? "Settings" : undefined}
          onClick={() => navigate({ to: "/settings" })}
        >
          <Settings {...iconProps} />
          {!sidebarCollapsed && <span>Settings</span>}
        </button>
      </div>
    </aside>
  );
}
