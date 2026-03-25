import { tailwind } from '../bun-tailwind-plugin'
import { resolvePublicSiteUrl } from '../src/domain/seo'
import { buildPendingResultState, type RouteState } from '../src/domain/share'
import { renderHtmlDocument } from '../src/server/render-document'
import {
  SUPPORTED_LOCALES,
  type SupportedLocale,
} from '../src/i18n/lingui.config'
import { ARTICLES } from '../src/domain/blog'

const DIST_DIR = './dist'
const STATIC_DIR = './static'
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
  throw new Error('Failed to build browser assets')
}

const publicSiteUrl = resolvePublicSiteUrl(
  Bun.env.PUBLIC_SITE_URL ?? Bun.env.SITE_URL,
)

await copyStaticAssets()
await patchStaticTextFiles(publicSiteUrl)

const shellHtml = await Bun.file(`${DIST_DIR}/index.html`).text()

const writeLocale = async (locale: SupportedLocale): Promise<void> => {
  const dir = `${DIST_DIR}/${locale}`
  await Bun.$`mkdir -p ${dir}`

  const indexHtml = renderHtmlDocument({
    shellHtml,
    siteUrl: publicSiteUrl,
    routeState: { kind: 'index', locale },
    locale,
    assetLinks: '',
  })

  const resultHtml = renderHtmlDocument({
    shellHtml,
    siteUrl: publicSiteUrl,
    routeState: buildPendingResultState(null, locale),
    locale,
    assetLinks: '',
  })

  const blogIndexHtml = renderHtmlDocument({
    shellHtml,
    siteUrl: publicSiteUrl,
    routeState: { kind: 'blog-index', locale },
    locale,
    assetLinks: '',
  })

  await Bun.$`mkdir -p ${dir}/result`
  await Bun.write(`${dir}/index.html`, indexHtml)
  await Bun.write(`${dir}/result/index.html`, resultHtml, { createPath: true })

  await Bun.$`mkdir -p ${dir}/blog`
  await Bun.write(`${dir}/blog/index.html`, blogIndexHtml, { createPath: true })

  for (const article of ARTICLES) {
    await Bun.$`mkdir -p ${dir}/blog/${article.slug}`
    const articleHtml = renderHtmlDocument({
      shellHtml,
      siteUrl: publicSiteUrl,
      routeState: { kind: 'blog-article', slug: article.slug, locale },
      locale,
      assetLinks: '',
    })
    await Bun.write(`${dir}/blog/${article.slug}/index.html`, articleHtml, {
      createPath: true,
    })
  }
}

const defaultLocale = SUPPORTED_LOCALES[0]

for (const locale of SUPPORTED_LOCALES) {
  await writeLocale(locale)
  console.log(`Wrote dist/${locale}/`)
}

await Bun.$`mkdir -p ${DIST_DIR}/result`
await Bun.$`cp ${DIST_DIR}/${defaultLocale}/index.html ${DIST_DIR}/index.html`
await Bun.$`cp ${DIST_DIR}/${defaultLocale}/result/index.html ${DIST_DIR}/result/index.html`
await Bun.$`mkdir -p ${DIST_DIR}/blog`
await Bun.$`cp -r ${DIST_DIR}/${defaultLocale}/blog/. ${DIST_DIR}/blog/`
console.log(`Wrote dist/index.html and dist/result/index.html`)
