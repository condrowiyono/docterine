import { createRouter, createMemoryHistory } from "@tanstack/react-router";
import { rootRoute } from "./routes/__root";
import { indexRoute } from "./routes/index";
import { enginesRoute } from "./routes/engines";
import { settingsRoute } from "./routes/settings";
import { componentsRoute } from "./routes/components";

const routeTree = rootRoute.addChildren([
  indexRoute,
  enginesRoute,
  settingsRoute,
  componentsRoute,
]);

const memoryHistory = createMemoryHistory({ initialEntries: ["/engines"] });

export const router = createRouter({ routeTree, history: memoryHistory });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
