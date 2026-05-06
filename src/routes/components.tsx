import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import { ComponentsView } from "@/features/components/ComponentsView";

export const componentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/components",
  component: ComponentsView,
});
