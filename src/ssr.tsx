import React, { type ReactElement } from 'react'
import { renderToReadableStream } from 'react-dom/server'
import { Writable } from 'stream'

import { AppRoot } from './root'
import type { RouteState } from './domain/share'
import { getPartialComponentMapForRoute } from './component-map'

type RenderOptions = {
  app: ReactElement
}

export const renderAppToHtml = async ({
  initialRouteState,
  siteUrl,
}: {
  initialRouteState: RouteState
  siteUrl: string
}): Promise<string> =>
  renderToReadyState({
    app: (
      <AppRoot
        initialRouteState={initialRouteState}
        siteUrl={siteUrl}
        componentMap={await getPartialComponentMapForRoute({
          initialRouteState,
        })}
      />
    ),
  })

async function renderToReadyState({ app }: RenderOptions): Promise<string> {
  const stream = await renderToReadableStream(app)
  return stream.allReady.then(() => new Response(stream).text())
}
