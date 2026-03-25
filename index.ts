import index from './index.html'
import { resolvePublicSiteUrl } from './src/domain/seo'
import { parseRouteState, type RouteState } from './src/domain/share'
import { renderHtmlDocument } from './src/server/render-document'
import {
  SUPPORTED_LOCALES,
  localeFromPath,
  type SupportedLocale,
} from './src/i18n/lingui.config'
import { tailwind } from './bun-tailwind-plugin'

const port = Number(Bun.env.PORT ?? '3000')
const DEV_ASSET_DIR = './.tmp-dev'
const publicSiteUrl = resolvePublicSiteUrl(
  Bun.env.PUBLIC_SITE_URL ?? Bun.env.SITE_URL ?? `http://localhost:${port}`,
)
const shellHtml = await Bun.file(index.index).text()
const devBuild = await Bun.build({
  entrypoints: ['./src/main.tsx'],
  naming: 'dev-[name].[ext]',
  outdir: DEV_ASSET_DIR,
  splitting: false,
  target: 'browser',
  plugins: [
    tailwind({
      inputFile: 'src/styles.css',
    }),
  ],
})

if (!devBuild.success) {
  throw new Error('Failed to build dev browser assets')
}

const devScriptOutput = devBuild.outputs.find((output) =>
  output.path.endsWith('.js'),
)
const devStyleOutput = devBuild.outputs.find((output) =>
  output.path.endsWith('.css'),
)

if (devScriptOutput === undefined || devStyleOutput === undefined) {
  throw new Error('Missing dev browser assets')
}

const devScriptPath = `/${devScriptOutput.path.split('/').at(-1) ?? 'dev-main.js'}`
const devStylePath = `/${devStyleOutput.path.split('/').at(-1) ?? 'dev-main.css'}`
const devAssetLinks = `<link rel="stylesheet" href="${devStylePath}" />`
const devAppScript = `<script type="module" src="${devScriptPath}"></script>`

const staticAssetResponse = (path: string, contentType: string) =>
  new Response(Bun.file(path), {
    headers: {
      'content-type': contentType,
    },
  })

const renderRouteResponse = (
  request: Request,
  locale: SupportedLocale | null,
) => {
  const routeState: RouteState = parseRouteState(request.url, 'prerender')

  return new Response(
    renderHtmlDocument({
      shellHtml,
      siteUrl: publicSiteUrl,
      routeState,
      locale,
      assetLinks: devAssetLinks,
      appScript: devAppScript,
    }),
    {
      headers: {
        'content-type': 'text/html; charset=utf-8',
      },
    },
  )
}

const extractLocaleFromUrl = (url: string): SupportedLocale | null => {
  const pathname = new URL(url, `http://localhost:${port}`).pathname
  const segments = pathname
    .split('/')
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
  const first = segments[0]
  return first ? localeFromPath(first) : null
}

type RouteTable = Record<string, (req: Request) => Response>

const staticRoutes: RouteTable = {
  [devScriptPath]: () =>
    staticAssetResponse(devScriptOutput.path, 'text/javascript; charset=utf-8'),
  [devStylePath]: () =>
    staticAssetResponse(devStyleOutput.path, 'text/css; charset=utf-8'),
  '/favicon.svg': () =>
    staticAssetResponse('./static/favicon.svg', 'image/svg+xml'),
  '/icon.svg': () =>
    staticAssetResponse('./static/icon.svg', 'image/svg+xml'),
  '/og-image.svg': () =>
    staticAssetResponse('./static/og-image.svg', 'image/svg+xml'),
  '/robots.txt': () =>
    staticAssetResponse('./static/robots.txt', 'text/plain; charset=utf-8'),
  '/sitemap.xml': () =>
    staticAssetResponse('./static/sitemap.xml', 'application/xml; charset=utf-8'),
  '/site.webmanifest': () =>
    staticAssetResponse(
      './static/site.webmanifest',
      'application/manifest+json; charset=utf-8',
    ),
}

const buildRouteTable = (): RouteTable => {
  const routes: RouteTable = {}

  SUPPORTED_LOCALES.forEach((locale) => {
    routes[`/${locale}`] = (req) => renderRouteResponse(req, locale)
    routes[`/${locale}/result`] = (req) => renderRouteResponse(req, locale)
    routes[`/${locale}/result/:payload`] = (req) =>
      renderRouteResponse(req, locale)
  })

  routes['/'] = (req) => renderRouteResponse(req, null)
  routes['/result'] = (req) => renderRouteResponse(req, null)
  routes['/result/:payload'] = (req) => renderRouteResponse(req, null)

  return routes
}

const routeTable = buildRouteTable()

const server = Bun.serve({
  port,
  routes: { ...routeTable, ...staticRoutes },
  development: {
    hmr: true,
    console: true,
  },
})

console.log(`Amorta available at http://localhost:${server.port}`)
