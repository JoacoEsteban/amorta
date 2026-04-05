import { hydrateRoot } from 'react-dom/client'

import { AppRoot } from './root'
import type { RouteState } from './domain/share'
import { concur, sleep } from './lib/utils'

export const hydrateApp = ({
  container,
  initialRouteState,
  siteUrl,
}: {
  container: HTMLElement
  initialRouteState: RouteState
  siteUrl: string
}) =>
  concur(() =>
    hydrateRoot(
      container,
      <AppRoot initialRouteState={initialRouteState} siteUrl={siteUrl} />,
    ),
  )
