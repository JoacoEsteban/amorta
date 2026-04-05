import { P, match } from 'ts-pattern'

import { hydrateApp } from './client'
import { readPublicSiteUrl } from './domain/seo'
import { parseRouteState } from './domain/share'
import './styles.css'

if (typeof document !== 'undefined') {
  const container = document.getElementById('root')

  match(container)
    .with(P.nullish, () => {
      throw new Error('Root container not found')
    })
    .otherwise((resolvedContainer) => {
      return hydrateApp({
        container: resolvedContainer,
        initialRouteState: parseRouteState(
          new URL(window.location.href),
          'prerender',
        ),
        siteUrl: readPublicSiteUrl(),
      })
    })
}
