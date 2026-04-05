import { hydrateRoot } from 'react-dom/client'

import { AppRoot } from './root'
import type { RouteState } from './domain/share'
import { getPartialComponentMapForRoute } from './component-map'

export const hydrateApp = async ({
  container,
  initialRouteState,
  siteUrl,
}: {
  container: HTMLElement
  initialRouteState: RouteState
  siteUrl: string
}): Promise<void> => {
  const componentMap = await getPartialComponentMapForRoute({
    initialRouteState,
  })

  hydrateRoot(
    container,
    <AppRoot
      initialRouteState={initialRouteState}
      siteUrl={siteUrl}
      componentMap={componentMap}
    />,
  )
}
