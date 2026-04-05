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
import { match } from 'ts-pattern'
import path from 'path'
import '../src/main'

const DIST_DIR = './dist'
const STATIC_DIR = './static'
const PUBLIC_SITE_URL_PLACEHOLDER = '__PUBLIC_SITE_URL__'
const PUBLIC_SITE_URL = resolvePublicSiteUrl(
  Bun.env.PUBLIC_SITE_URL ?? Bun.env.SITE_URL,
)

if (import.meta.main) {
  await exec()
}

export async function exec(target: 'dev' | 'prod' = 'prod') {
  await ci(target)
  const minify = target !== 'dev'

  await Bun.$`rm -rf ${DIST_DIR}/`
  const prodBuild = await Bun.build({
    minify,
    entrypoints: ['index.html'],
    naming: '[name].[ext]',
    outdir: DIST_DIR,
    splitting: true,
    target: 'browser',
    publicPath: '/',
    plugins: [
      tailwind({
        inputFile: 'src/styles.css',
        minify,
      }),
    ],
  })

  if (!prodBuild.success) {
    throw new Error('Failed to build browser assets')
  }

  const defaultLocale = SUPPORTED_LOCALES[0]

  await copyStaticAssets()
  await patchStaticTextFiles(PUBLIC_SITE_URL)
  await writeSitemaps(PUBLIC_SITE_URL, defaultLocale)

  const shellHtml = await Bun.file(`${DIST_DIR}/index.html`).text()

  for (const locale of SUPPORTED_LOCALES) {
    await writeLocale(shellHtml, locale, defaultLocale)
    console.log(`Wrote dist/${locale}/`)
  }
}

function generateSitemap(
  siteUrl: string,
  locale: SupportedLocale,
  defaultLocale: SupportedLocale,
): string {
  const localePrefix = locale === defaultLocale ? '' : `/${locale}`
  const today = new Date().toISOString().split('T')[0]

  const staticUrls = [
    { path: '/', changefreq: 'weekly', priority: '1.0' },
    { path: '/blog/', changefreq: 'weekly', priority: '0.8' },
    { path: '/privacy-policy/', changefreq: 'monthly', priority: '0.3' },
    { path: '/about/', changefreq: 'monthly', priority: '0.3' },
    { path: '/contact/', changefreq: 'monthly', priority: '0.3' },
    { path: '/terms/', changefreq: 'monthly', priority: '0.3' },
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
          const prefix = loc === defaultLocale ? '' : `/${loc}`
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

async function writeSitemaps(
  siteUrl: string,
  defaultLocale: SupportedLocale,
): Promise<void> {
  const sitemapWrites = SUPPORTED_LOCALES.map(async (locale) => {
    const sitemapPath = match(locale)
      .with(defaultLocale, () => `${DIST_DIR}/sitemap-root.xml`)
      .otherwise(() => `${DIST_DIR}/${locale}/sitemap.xml`)

    const sitemap = generateSitemap(siteUrl, locale, defaultLocale)
    await Bun.write(sitemapPath, sitemap)

    return sitemapPath
  })

  const sitemaps = await Promise.all(sitemapWrites)

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemaps
        .map((sitemap) => {
          const loc = new URL(siteUrl)
          loc.pathname = sitemap.replace(DIST_DIR, '')

          return `<sitemap>
            <loc>${loc.href}</loc>
          </sitemap>`
        })
        .join('')}
  </sitemapindex>`

  await Bun.write(`${DIST_DIR}/sitemap.xml`, sitemapIndex)
}

async function writeLocale(
  shellHtml: string,
  locale: SupportedLocale,
  defaultLocale: SupportedLocale,
): Promise<void> {
  const dir = match(locale)
    .with(defaultLocale, () => `${DIST_DIR}`)
    .otherwise(() => `${DIST_DIR}/${locale}`)

  await Bun.$`mkdir -p ${dir}`

  const indexHtml = await renderHtmlDocument({
    shellHtml,
    siteUrl: PUBLIC_SITE_URL,
    routeState: { kind: 'index', locale },
    locale,
    assetLinks: '',
  })

  const resultHtml = await renderHtmlDocument({
    shellHtml,
    siteUrl: PUBLIC_SITE_URL,
    routeState: buildPendingResultState(null, locale),
    locale,
    assetLinks: '',
  })

  const blogIndexHtml = await renderHtmlDocument({
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
    const articleHtml = await renderHtmlDocument({
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

  // Generate legal pages
  const legalPages: Array<
    | { kind: 'privacy-policy' }
    | { kind: 'about' }
    | { kind: 'contact' }
    | { kind: 'terms' }
  > = [
    { kind: 'privacy-policy' },
    { kind: 'about' },
    { kind: 'contact' },
    { kind: 'terms' },
  ]

  for (const page of legalPages) {
    const pagePath = page.kind
    await Bun.$`mkdir -p ${dir}/${pagePath}`
    const pageHtml = await renderHtmlDocument({
      shellHtml,
      siteUrl: PUBLIC_SITE_URL,
      routeState: { ...page, locale },
      locale,
      assetLinks: '',
    })
    await Bun.write(`${dir}/${pagePath}/index.html`, pageHtml, {
      createPath: true,
    })
  }
}
