import { match } from 'ts-pattern'

import { i18n } from '../i18n/index.js'
import {
  SUPPORTED_LOCALES,
  type SupportedLocale,
  buildLocalePath,
} from '../i18n/lingui.config'
import { getArticleBySlug, type Article } from './blog'
import type { RouteState } from './share'

export const DEFAULT_PUBLIC_SITE_URL = 'https://amorta.example'

const buildBaseJsonLd = (siteUrl: string, path: string) => [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Amorta',
    url: `${siteUrl}/`,
    description: i18n._('seoDescription'),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Amorta',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    url: `${siteUrl}/`,
    description: i18n._('seoDescription'),
  },
  path === '/'
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${siteUrl}/`,
          },
        ],
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${siteUrl}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Calculator',
            item: `${siteUrl}/`,
          },
        ],
      },
]

export type SeoMetadata = {
  title: string
  description: string
  canonicalUrl: string
  openGraphUrl: string
  openGraphImageUrl: string
  jsonLd: string
  hreflangLinks: string
  htmlLang: string
}

const normalizeSiteUrl = (siteUrl: string): string =>
  siteUrl.replace(/\/+$/, '')

export const resolvePublicSiteUrl = (rawSiteUrl?: string | null): string => {
  const candidate = rawSiteUrl?.trim() ?? ''

  return match(candidate)
    .with('', () => DEFAULT_PUBLIC_SITE_URL)
    .with('__PUBLIC_SITE_URL__', () => DEFAULT_PUBLIC_SITE_URL)
    .otherwise((value) =>
      match(
        (() => {
          try {
            return new URL(value).origin
          } catch {
            return null
          }
        })(),
      )
        .with(null, () => DEFAULT_PUBLIC_SITE_URL)
        .otherwise((resolvedUrl) => normalizeSiteUrl(resolvedUrl)),
    )
}

export const readPublicSiteUrl = (): string =>
  resolvePublicSiteUrl(
    document
      .querySelector('meta[name="amorta:site-url"]')
      ?.getAttribute('content'),
  )

const localeToHreflang = (locale: SupportedLocale): string => {
  const parts = locale.split('-')
  return (parts[0] ?? locale).toLowerCase()
}

const buildHreflangLinks = (
  routePath: string,
  siteUrl: string,
  currentLocale: SupportedLocale | null,
): string => {
  const seen = new Set<string>()
  const links: string[] = []

  SUPPORTED_LOCALES.forEach((locale) => {
    const hreflang = localeToHreflang(locale)
    if (seen.has(hreflang)) return
    seen.add(hreflang)
    const href = `${siteUrl}${buildLocalePath(locale, routePath)}`
    links.push(`<link rel="alternate" hreflang="${hreflang}" href="${href}" />`)
  })

  const defaultHreflang = 'x-default'
  const defaultLocale = SUPPORTED_LOCALES[0]
  const defaultLocaleHreflang = localeToHreflang(defaultLocale)
  const isDefaultLocale = currentLocale === defaultLocale

  links.push(
    `<link rel="alternate" hreflang="${defaultHreflang}" href="${siteUrl}${buildLocalePath(defaultLocale, routePath)}" />`,
  )

  if (isDefaultLocale) {
    links.push(
      `<link rel="alternate" hreflang="${defaultLocaleHreflang}" href="${siteUrl}${routePath}" />`,
    )
  }

  return links.join('\n    ')
}

const resolveLocale = (locale: SupportedLocale | null): SupportedLocale =>
  locale ?? SUPPORTED_LOCALES[0]

const resolveCanonicalPath = (
  routeState: RouteState,
  siteUrl: string,
): string => {
  const normalizedSiteUrl = resolvePublicSiteUrl(siteUrl)
  const locale = resolveLocale(routeState.locale)

  return match(routeState)
    .with({ kind: 'index' }, () =>
      locale === SUPPORTED_LOCALES[0]
        ? `${normalizedSiteUrl}/`
        : `${normalizedSiteUrl}${buildLocalePath(locale, '/')}`,
    )
    .with({ kind: 'result', decoded: { kind: 'valid' } }, ({ payload }) =>
      locale === SUPPORTED_LOCALES[0]
        ? `${normalizedSiteUrl}/result/${payload ?? ''}`
        : `${normalizedSiteUrl}${buildLocalePath(locale, `/result/${payload ?? ''}`)}`,
    )
    .with({ kind: 'result', decoded: { kind: 'pending' } }, () =>
      locale === SUPPORTED_LOCALES[0]
        ? `${normalizedSiteUrl}/result/`
        : `${normalizedSiteUrl}${buildLocalePath(locale, '/result/')}`,
    )
    .with({ kind: 'blog-index' }, () =>
      locale === SUPPORTED_LOCALES[0]
        ? `${normalizedSiteUrl}/blog/`
        : `${normalizedSiteUrl}${buildLocalePath(locale, '/blog/')}`,
    )
    .with({ kind: 'blog-article' }, ({ slug }) =>
      locale === SUPPORTED_LOCALES[0]
        ? `${normalizedSiteUrl}/blog/${slug}`
        : `${normalizedSiteUrl}${buildLocalePath(locale, `/blog/${slug}`)}`,
    )
    .otherwise(() =>
      locale === SUPPORTED_LOCALES[0]
        ? `${normalizedSiteUrl}/`
        : `${normalizedSiteUrl}${buildLocalePath(locale, '/')}`,
    )
}

const resolveSeoTitle = (routeState: RouteState): string =>
  match(routeState)
    .with({ kind: 'index' }, () => i18n._('seoTitleIndex'))
    .with({ kind: 'result', decoded: { kind: 'valid' } }, () =>
      i18n._('seoTitleResult'),
    )
    .with({ kind: 'result', decoded: { kind: 'pending' } }, () =>
      i18n._('seoTitleResult'),
    )
    .with({ kind: 'blog-index' }, () => i18n._('seoTitleBlogIndex'))
    .with({ kind: 'blog-article' }, ({ slug }) => {
      const article = getArticleBySlug(slug)
      return match(article)
        .with(undefined, () => i18n._('seoTitleUnavailable'))
        .otherwise((resolved) => `${i18n._(resolved.titleKey)} | Amorta`)
    })
    .otherwise(() => i18n._('seoTitleUnavailable'))

const resolveSeoDescription = (routeState: RouteState): string =>
  match(routeState)
    .with({ kind: 'index' }, () => i18n._('seoDescription'))
    .with({ kind: 'result', decoded: { kind: 'valid' } }, () =>
      i18n._('seoDescriptionShare'),
    )
    .with({ kind: 'result', decoded: { kind: 'pending' } }, () =>
      i18n._('seoDescriptionShare'),
    )
    .with({ kind: 'blog-index' }, () => i18n._('seoDescriptionBlogIndex'))
    .with({ kind: 'blog-article' }, ({ slug }) => {
      const article = getArticleBySlug(slug)
      return match(article)
        .with(undefined, () => i18n._('seoDescriptionUnavailable'))
        .otherwise((resolved) => i18n._(resolved.descriptionKey))
    })
    .otherwise(() => i18n._('seoDescriptionUnavailable'))

const resolveRoutePath = (routeState: RouteState): string =>
  match(routeState)
    .with({ kind: 'index' }, () => '/')
    .with(
      { kind: 'result', decoded: { kind: 'valid' } },
      ({ payload }) => `/result/${payload ?? ''}`,
    )
    .with({ kind: 'result', decoded: { kind: 'pending' } }, () => '/result/')
    .with({ kind: 'blog-index' }, () => '/blog/')
    .with({ kind: 'blog-article' }, ({ slug }) => `/blog/${slug}`)
    .otherwise(() => '/')

export const buildSeoMetadata = ({
  routeState,
  siteUrl,
  locale,
}: {
  routeState: RouteState
  siteUrl: string
  locale?: SupportedLocale | null
}): SeoMetadata => {
  const normalizedSiteUrl = resolvePublicSiteUrl(siteUrl)
  const resolvedLocale = resolveLocale(locale ?? routeState.locale)
  const canonicalPath = resolveCanonicalPath(routeState, siteUrl)
  const routePath = resolveRoutePath(routeState)

  return {
    title: resolveSeoTitle(routeState),
    description: resolveSeoDescription(routeState),
    canonicalUrl: canonicalPath,
    openGraphUrl: canonicalPath,
    openGraphImageUrl: `${normalizedSiteUrl}/og-image.svg`,
    jsonLd: JSON.stringify(buildBaseJsonLd(normalizedSiteUrl, routePath)),
    hreflangLinks: buildHreflangLinks(
      routePath,
      normalizedSiteUrl,
      resolvedLocale,
    ),
    htmlLang: resolvedLocale.toLowerCase(),
  }
}
