import index from './index.html'
import { resolvePublicSiteUrl } from './src/domain/seo'
import { parseRouteState } from './src/domain/share'
import { renderHtmlDocument } from './src/server/render-document'

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

const renderRouteResponse = (request: Request) =>
  new Response(
    renderHtmlDocument({
      shellHtml,
      siteUrl: publicSiteUrl,
      routeState: parseRouteState(new URL(request.url), 'prerender'),
      assetLinks: devAssetLinks,
      appScript: devAppScript,
    }),
    {
      headers: {
        'content-type': 'text/html; charset=utf-8',
      },
    },
  )

const server = Bun.serve({
  port,
  routes: {
    '/': renderRouteResponse,
    '/result': renderRouteResponse,
    '/result/:payload': renderRouteResponse,
    [devScriptPath]: staticAssetResponse(
      devScriptOutput.path,
      'text/javascript; charset=utf-8',
    ),
    [devStylePath]: staticAssetResponse(
      devStyleOutput.path,
      'text/css; charset=utf-8',
    ),
    '/favicon.svg': staticAssetResponse(
      './static/favicon.svg',
      'image/svg+xml',
    ),
    '/icon.svg': staticAssetResponse('./static/icon.svg', 'image/svg+xml'),
    '/og-image.svg': staticAssetResponse(
      './static/og-image.svg',
      'image/svg+xml',
    ),
    '/robots.txt': staticAssetResponse(
      './static/robots.txt',
      'text/plain; charset=utf-8',
    ),
    '/sitemap.xml': staticAssetResponse(
      './static/sitemap.xml',
      'application/xml; charset=utf-8',
    ),
    '/site.webmanifest': staticAssetResponse(
      './static/site.webmanifest',
      'application/manifest+json; charset=utf-8',
    ),
  },
  development: {
    hmr: true,
    console: true,
  },
})

console.log(`Amorta available at http://localhost:${server.port}`)
