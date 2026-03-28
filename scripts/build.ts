import { tailwind } from '../bun-tailwind-plugin'
import { resolvePublicSiteUrl } from '../src/domain/seo'
import { buildPendingResultState, type RouteState } from '../src/domain/share'
import { renderHtmlDocument } from '../src/server/render-document'
import {
  SUPPORTED_LOCALES,
  type SupportedLocale,
} from '../src/i18n/lingui.config'
import { ARTICLES } from '../src/domain/blog'
import { exec as ci } from './ci'

const DIST_DIR = './dist'
const STATIC_DIR = './static'
const PUBLIC_SITE_URL_PLACEHOLDER = '__PUBLIC_SITE_URL__'
const PUBLIC_SITE_URL = resolvePublicSiteUrl(
  Bun.env.PUBLIC_SITE_URL ?? Bun.env.SITE_URL,
)

if (import.meta.main) {
  await exec()
}

export async function exec() {
  await ci()

  await Bun.$`rm -rf ${DIST_DIR}/`
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

  await copyStaticAssets()
  await patchStaticTextFiles(PUBLIC_SITE_URL)
  await writeSitemaps(PUBLIC_SITE_URL)

  const shellHtml = await Bun.file(`${DIST_DIR}/index.html`).text()

  const defaultLocale = SUPPORTED_LOCALES[2]

  for (const locale of SUPPORTED_LOCALES) {
    await writeLocale(shellHtml, locale)
    console.log(`Wrote dist/${locale}/`)
  }

  await Bun.$`mkdir -p ${DIST_DIR}/result`
  await Bun.$`cp ${DIST_DIR}/${defaultLocale}/index.html ${DIST_DIR}/index.html`
  await Bun.$`cp ${DIST_DIR}/${defaultLocale}/result/index.html ${DIST_DIR}/result/index.html`
  await Bun.$`mkdir -p ${DIST_DIR}/blog`
  await Bun.$`cp -r ${DIST_DIR}/${defaultLocale}/blog/. ${DIST_DIR}/blog/`
  console.log(`Wrote dist/index.html and dist/result/index.html`)
}

function generateSitemap(siteUrl: string, locale: SupportedLocale): string {
  const localePrefix = locale === SUPPORTED_LOCALES[0] ? '' : `/${locale}`
  const today = new Date().toISOString().split('T')[0]

  const staticUrls = [
    { path: '/', changefreq: 'weekly', priority: '1.0' },
    { path: '/blog/', changefreq: 'weekly', priority: '0.8' },
    ...ARTICLES.map((a) => ({
      path: `/blog/${a.slug}/`,
      changefreq: 'monthly',
      priority: '0.6',
    })),
  ]

  const urls = staticUrls
    .map((u) => {
      const loc = `${siteUrl}${localePrefix}${u.path}`
      const hreflangLinks =
        SUPPORTED_LOCALES.map((loc) => {
          const prefix = loc === SUPPORTED_LOCALES[0] ? '' : `/${loc}`
          return `<xhtml:link rel="alternate" hreflang="${loc}" href="${siteUrl}${prefix}${u.path}"/>`
        }).join('') +
        `<xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${u.path}"/>`
      return `<url><loc>${loc}</loc><lastmod>${today}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority>${hreflangLinks}</url>`
    })
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`
}

async function copyStaticAssets(): Promise<void> {
  await Bun.$`mkdir -p ${DIST_DIR}`
  await Bun.$`cp -R ${STATIC_DIR}/. ${DIST_DIR}/`
}

async function patchStaticTextFiles(siteUrl: string): Promise<void> {
  const textFiles = ['robots.txt', 'site.webmanifest']

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

async function writeSitemaps(siteUrl: string): Promise<void> {
  for (const locale of SUPPORTED_LOCALES) {
    const localeDir = `${DIST_DIR}/${locale}`
    const sitemap = generateSitemap(siteUrl, locale)
    await Bun.write(`${localeDir}/sitemap.xml`, sitemap)
  }
  const defaultLocale = SUPPORTED_LOCALES[0]
  await Bun.$`cp ${DIST_DIR}/${defaultLocale}/sitemap.xml ${DIST_DIR}/sitemap.xml`
}

async function writeLocale(
  shellHtml: string,
  locale: SupportedLocale,
): Promise<void> {
  const dir = `${DIST_DIR}/${locale}`
  await Bun.$`mkdir -p ${dir}`

  const indexHtml = renderHtmlDocument({
    shellHtml,
    siteUrl: PUBLIC_SITE_URL,
    routeState: { kind: 'index', locale },
    locale,
    assetLinks: '',
  })

  const resultHtml = renderHtmlDocument({
    shellHtml,
    siteUrl: PUBLIC_SITE_URL,
    routeState: buildPendingResultState(null, locale),
    locale,
    assetLinks: '',
  })

  const blogIndexHtml = renderHtmlDocument({
    shellHtml,
    siteUrl: PUBLIC_SITE_URL,
    routeState: { kind: 'blog-index', locale },
    locale,
    assetLinks: '',
  })

  await Bun.$`mkdir -p ${dir}/result`
  await Bun.write(`${dir}/index.html`, indexHtml)
  await Bun.write(`${dir}/result/index.html`, resultHtml, {
    createPath: true,
  })

  await Bun.$`mkdir -p ${dir}/blog`
  await Bun.write(`${dir}/blog/index.html`, blogIndexHtml, {
    createPath: true,
  })

  for (const article of ARTICLES) {
    await Bun.$`mkdir -p ${dir}/blog/${article.slug}`
    const articleHtml = renderHtmlDocument({
      shellHtml,
      siteUrl: PUBLIC_SITE_URL,
      routeState: { kind: 'blog-article', slug: article.slug, locale },
      locale,
      assetLinks: '',
    })
    await Bun.write(`${dir}/blog/${article.slug}/index.html`, articleHtml, {
      createPath: true,
    })
  }
}
