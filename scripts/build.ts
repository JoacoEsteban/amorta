import { tailwind } from '../bun-tailwind-plugin'
import { resolvePublicSiteUrl } from '../src/domain/seo'
import { buildPendingResultState, type RouteState } from '../src/domain/share'
import { renderHtmlDocument } from '../src/server/render-document'

const DIST_DIR = './dist'
const STATIC_DIR = './static'
const INDEX_PATH = `${DIST_DIR}/index.html`
const RESULT_INDEX_PATH = `${DIST_DIR}/result/index.html`
const PUBLIC_SITE_URL_PLACEHOLDER = '__PUBLIC_SITE_URL__'

const copyStaticAssets = async (): Promise<void> => {
  await Bun.$`mkdir -p ${DIST_DIR}`
  await Bun.$`cp -R ${STATIC_DIR}/. ${DIST_DIR}/`
}

const patchStaticTextFiles = async (siteUrl: string): Promise<void> => {
  const textFiles = ['robots.txt', 'sitemap.xml', 'site.webmanifest']

  await Promise.all(
    textFiles.map(async (fileName) => {
      const filePath = `${DIST_DIR}/${fileName}`
      const content = await Bun.file(filePath).text()

      await Bun.write(
        filePath,
        content.replaceAll(PUBLIC_SITE_URL_PLACEHOLDER, siteUrl),
      )
    }),
  )
}

const prodBuild = await Bun.build({
  minify: true,
  entrypoints: ['index.html'],
  naming: '[name].[ext]',
  outdir: DIST_DIR,
  splitting: false,
  target: 'browser',
  publicPath: '/',
  plugins: [
    tailwind({
      inputFile: 'src/styles.css',
    }),
  ],
})

if (!prodBuild.success) {
  throw new Error('Failed to build dev browser assets')
}

const publicSiteUrl = resolvePublicSiteUrl(
  Bun.env.PUBLIC_SITE_URL ?? Bun.env.SITE_URL,
)

await copyStaticAssets()
await patchStaticTextFiles(publicSiteUrl)

const shellHtml = await Bun.file(`${DIST_DIR}/index.html`).text()
const indexHtml = renderHtmlDocument({
  shellHtml,
  siteUrl: publicSiteUrl,
  routeState: { kind: 'index' },
  assetLinks: '',
})
const resultHtml = renderHtmlDocument({
  shellHtml,
  siteUrl: publicSiteUrl,
  routeState: buildPendingResultState(null),
  assetLinks: '',
})

await Bun.$`mkdir -p ${DIST_DIR}/result`
await Bun.write(INDEX_PATH, indexHtml)
await Bun.write(RESULT_INDEX_PATH, resultHtml)
