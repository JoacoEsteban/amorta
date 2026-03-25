const gaMeasurementId = Bun.env.GA_MEASUREMENT_ID ?? ''

const buildGaScript = (measurementId: string): string =>
  measurementId === ''
    ? ''
    : [
        `<script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script>`,
        `<script>`,
        `window.dataLayer = window.dataLayer || [];`,
        `function gtag(){dataLayer.push(arguments);}`,
        `gtag('js', new Date());`,
        `gtag('config', '${measurementId}');`,
        `</script>`,
      ].join('')

import { buildSeoMetadata } from '../domain/seo'
import type { RouteState } from '../domain/share'
import { renderAppToHtml } from '../ssr'

const buildSeoHead = ({
  siteUrl,
  metadata,
}: {
  siteUrl: string
  metadata: ReturnType<typeof buildSeoMetadata>
}): string =>
  [
    `<title>${metadata.title}</title>`,
    `<meta name="description" content="${metadata.description}" />`,
    '<meta name="keywords" content="french amortization calculator, loan amortization, mortgage calculator, effective annual rate, payment schedule" />',
    '<meta name="robots" content="index,follow" />',
    '<meta name="theme-color" content="#f59e0b" />',
    `<meta name="amorta:site-url" content="${siteUrl}" />`,
    `<link rel="canonical" href="${metadata.canonicalUrl}" />`,
    '<link rel="icon" href="/favicon.svg" type="image/svg+xml" />',
    '<link rel="manifest" href="/site.webmanifest" />',
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="Amorta" />',
    `<meta property="og:title" content="${metadata.title}" />`,
    `<meta property="og:description" content="${metadata.description}" />`,
    `<meta property="og:url" content="${metadata.openGraphUrl}" />`,
    `<meta property="og:image" content="${metadata.openGraphImageUrl}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${metadata.title}" />`,
    `<meta name="twitter:description" content="${metadata.description}" />`,
    `<meta name="twitter:image" content="${metadata.openGraphImageUrl}" />`,
    '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8407180754020844" crossorigin="anonymous"></script>',
    buildGaScript(gaMeasurementId),
    `<script id="amorta-jsonld" type="application/ld+json">${metadata.jsonLd}</script>`,
  ].join('\n    ')

export const renderHtmlDocument = ({
  shellHtml,
  siteUrl,
  routeState,
  assetLinks = '',
  appScript = '',
}: {
  shellHtml: string
  siteUrl: string
  routeState: RouteState
  assetLinks?: string
  appScript?: string
}): string => {
  const metadata = buildSeoMetadata({ routeState, siteUrl })
  const appHtml = renderAppToHtml({
    initialRouteState: routeState,
    siteUrl,
  })

  return shellHtml
    .replace(/<title>.*?<\/title>/, '')
    .replace(/__AMORTA_ASSET_LINKS__/g, assetLinks)
    .replace(/__AMORTA_JSONLD__/g, '')
    .replace(/<meta[^>]+name="description"[^>]*>/, '')
    .replace(/<meta[^>]+name="keywords"[^>]*>/, '')
    .replace(/<meta[^>]+name="robots"[^>]*>/, '')
    .replace(/<meta[^>]+name="theme-color"[^>]*>/, '')
    .replace(/<meta[^>]+name="amorta:site-url"[^>]*>/, '')
    .replace(/<meta[^>]+property="og:[^"]+"[^>]*>/g, '')
    .replace(/<meta[^>]+name="twitter:[^"]+"[^>]*>/g, '')
    .replace(/<link rel="canonical"[^>]*>/, '')
    .replace(/<link rel="icon"[^>]*>/, '')
    .replace(/<link rel="manifest"[^>]*>/, '')
    .replace('__AMORTA_GA_SCRIPT__', buildGaScript(gaMeasurementId))
    .replace(/<script[^>]+googlesyndication[^>]*><\/script>/, '')
    .replace(/<script id="amorta-jsonld"[^>]*>[\s\S]*?<\/script>/, '')
    .replace('</head>', `    ${buildSeoHead({ siteUrl, metadata })}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    .replace('<script type="module" src="/src/main.tsx"></script>', appScript)
    .replaceAll('__PUBLIC_SITE_URL__', siteUrl)
}
