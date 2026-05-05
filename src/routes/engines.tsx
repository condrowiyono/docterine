import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import { EnginesView } from "@/features/engines/EnginesView";

export const enginesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/engines",
  component: EnginesView,
});
