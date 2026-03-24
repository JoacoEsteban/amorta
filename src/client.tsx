import { hydrateRoot } from "react-dom/client";

import { AppRoot } from "./root";
import type { RouteState } from "./domain/share";

export const hydrateApp = ({
  container,
  initialRouteState,
  siteUrl,
}: {
  container: HTMLElement;
  initialRouteState: RouteState;
  siteUrl: string;
}) =>
  hydrateRoot(container, <AppRoot initialRouteState={initialRouteState} siteUrl={siteUrl} />);
