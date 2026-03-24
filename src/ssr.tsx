import { renderToString } from 'react-dom/server'

import { AppRoot } from './root'
import type { RouteState } from './domain/share'

export const renderAppToHtml = ({
  initialRouteState,
  siteUrl,
}: {
  initialRouteState: RouteState
  siteUrl: string
}): string =>
  renderToString(
    <AppRoot initialRouteState={initialRouteState} siteUrl={siteUrl} />,
  )
