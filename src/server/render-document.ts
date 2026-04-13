const gaMeasurementId = Bun.env.GA_MEASUREMENT_ID ?? ''

import { buildSeoMetadata } from '../domain/seo'
import { DEFAULT_LOCALE, type SupportedLocale } from '../i18n/lingui.config'
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
    metadata.hreflangLinks,
    '<link rel="icon" href="/favicon.ico" sizes="any">',
    '<link rel="icon" href="/favicon.webp" type="image/webp" />',
    '<link rel="icon" href="/favicon.svg" type="image/svg+xml" />',
    '<link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />',
    '<link rel="apple-touch-icon" href="/apple-touch-icon.png" />',
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
    `<script id="amorta-jsonld" type="application/ld+json">${metadata.jsonLd}</script>`,
  ].join('\n    ')

export const renderHtmlDocument = async ({
  shellHtml,
  siteUrl,
  routeState,
  locale,
  assetLinks = '',
  appScript = '',
}: {
  shellHtml: string
  siteUrl: string
  routeState: RouteState
  locale: SupportedLocale | null
  assetLinks?: string
  appScript?: string
}): Promise<string> => {
  const metadata = buildSeoMetadata({
    routeState,
    siteUrl,
    locale: locale ?? DEFAULT_LOCALE,
  })
  const appHtml = await renderAppToHtml({
    initialRouteState: routeState,
    siteUrl,
  })

  // if (routeState.kind === 'blog-index') console.log(appHtml)

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
    .replace(/<link rel="alternate"[^>]*hreflang[^>]*>/g, '')
    .replace(/<link rel="icon"[^>]*>/, '')
    .replace(/<link rel="manifest"[^>]*>/, '')
    .replaceAll('__AMORTA_GA_MEASUREMENT_ID__', gaMeasurementId)
    .replace(/<script id="amorta-jsonld"[^>]*>[\s\S]*?<\/script>/, '')
    .replace('</head>', `    ${buildSeoHead({ siteUrl, metadata })}\n  </head>`)
    .replace('<html lang="en">', `<html lang="${metadata.htmlLang}">`)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    .replace('<script type="module" src="/src/main.tsx"></script>', appScript)
    .replaceAll('__PUBLIC_SITE_URL__', siteUrl)
}
