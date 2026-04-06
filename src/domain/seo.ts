import { match } from 'ts-pattern'

import {
  SUPPORTED_LOCALES,
  type SupportedLocale,
  buildLocalePath,
} from '../i18n/lingui.config'
import { getArticleBySlug, type Article } from './blog'
import type { RouteState } from './share'
import { mapTranslator, type Translate } from '../state/locale.js'
import { DEFAULT_LOCALE } from '../i18n/lingui.config'

export const DEFAULT_PUBLIC_SITE_URL = 'https://amorta.loan'

const buildBaseJsonLd = (_: Translate) => (siteUrl: string, path: string) => [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Amorta',
    url: `${siteUrl}/`,
    description: _('seoDescription'),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Amorta',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    url: `${siteUrl}/`,
    description: _('seoDescription'),
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

const normalizePublicPath = (pathname: string): string =>
  match(pathname)
    .with('/', () => '/')
    .otherwise((value) => value.replace(/\/+$/, ''))

const buildPublicUrl = (siteUrl: string, pathname: string): string =>
  `${siteUrl}${normalizePublicPath(pathname)}`

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
    const href = buildPublicUrl(siteUrl, buildLocalePath(locale, routePath))
    links.push(`<link rel="alternate" hreflang="${hreflang}" href="${href}" />`)
  })

  const defaultHreflang = 'x-default'
  const defaultLocale = SUPPORTED_LOCALES[0]
  const defaultLocaleHreflang = localeToHreflang(defaultLocale)
  const isDefaultLocale = currentLocale === defaultLocale

  links.push(
    `<link rel="alternate" hreflang="${defaultHreflang}" href="${buildPublicUrl(siteUrl, buildLocalePath(defaultLocale, routePath))}" />`,
  )

  if (isDefaultLocale) {
    links.push(
      `<link rel="alternate" hreflang="${defaultLocaleHreflang}" href="${buildPublicUrl(siteUrl, routePath)}" />`,
    )
  }

  return links.join('\n    ')
}

const resolveCanonicalPath = (
  routeState: RouteState,
  siteUrl: string,
): string => {
  const normalizedSiteUrl = resolvePublicSiteUrl(siteUrl)
  const locale = routeState.locale === DEFAULT_LOCALE ? null : routeState.locale
  const localizedPath = (pathname: string): string =>
    match(locale)
      .with(null, () => pathname)
      .otherwise((resolvedLocale) => buildLocalePath(resolvedLocale, pathname))

  return match(routeState)
    .with({ kind: 'index' }, () =>
      buildPublicUrl(normalizedSiteUrl, localizedPath('/')),
    )
    .with({ kind: 'result', decoded: { kind: 'valid' } }, ({ payload }) =>
      buildPublicUrl(
        normalizedSiteUrl,
        localizedPath(`/result/${payload ?? ''}`),
      ),
    )
    .with({ kind: 'result', decoded: { kind: 'pending' } }, () =>
      buildPublicUrl(normalizedSiteUrl, localizedPath('/result/')),
    )
    .with({ kind: 'blog-index' }, () =>
      buildPublicUrl(normalizedSiteUrl, localizedPath('/blog/')),
    )
    .with({ kind: 'blog-article' }, ({ slug }) =>
      buildPublicUrl(normalizedSiteUrl, localizedPath(`/blog/${slug}`)),
    )
    .with({ kind: 'privacy-policy' }, () =>
      buildPublicUrl(normalizedSiteUrl, localizedPath('/privacy-policy/')),
    )
    .with({ kind: 'about' }, () =>
      buildPublicUrl(normalizedSiteUrl, localizedPath('/about/')),
    )
    .with({ kind: 'contact' }, () =>
      buildPublicUrl(normalizedSiteUrl, localizedPath('/contact/')),
    )
    .with({ kind: 'terms' }, () =>
      buildPublicUrl(normalizedSiteUrl, localizedPath('/terms/')),
    )
    .otherwise(() => buildPublicUrl(normalizedSiteUrl, localizedPath('/')))
}

const resolveSeoTitle =
  (_: Translate) =>
  (routeState: RouteState): string =>
    match(routeState)
      .with({ kind: 'index' }, () => _('seoTitleIndex'))
      .with({ kind: 'result', decoded: { kind: 'valid' } }, () =>
        _('seoTitleResult'),
      )
      .with({ kind: 'result', decoded: { kind: 'pending' } }, () =>
        _('seoTitleResult'),
      )
      .with({ kind: 'blog-index' }, () => _('seoTitleBlogIndex'))
      .with({ kind: 'blog-article' }, ({ slug }) => {
        const article = getArticleBySlug(slug)
        return match(article)
          .with(undefined, () => _('seoTitleUnavailable'))
          .otherwise((resolved) => `${_(resolved.titleKey)} | Amorta`)
      })
      .with({ kind: 'privacy-policy' }, () => _('seoTitlePrivacyPolicy'))
      .with({ kind: 'about' }, () => _('seoTitleAbout'))
      .with({ kind: 'contact' }, () => _('seoTitleContact'))
      .with({ kind: 'terms' }, () => _('seoTitleTerms'))
      .otherwise(() => _('seoTitleUnavailable'))

const resolveSeoDescription =
  (_: Translate) =>
  (routeState: RouteState): string =>
    match(routeState)
      .with({ kind: 'index' }, () => _('seoDescription'))
      .with({ kind: 'result', decoded: { kind: 'valid' } }, () =>
        _('seoDescriptionShare'),
      )
      .with({ kind: 'result', decoded: { kind: 'pending' } }, () =>
        _('seoDescriptionShare'),
      )
      .with({ kind: 'blog-index' }, () => _('seoDescriptionBlogIndex'))
      .with({ kind: 'blog-article' }, ({ slug }) => {
        const article = getArticleBySlug(slug)
        return match(article)
          .with(undefined, () => _('seoDescriptionUnavailable'))
          .otherwise((resolved) => _(resolved.descriptionKey))
      })
      .with({ kind: 'privacy-policy' }, () => _('seoDescriptionPrivacyPolicy'))
      .with({ kind: 'about' }, () => _('seoDescriptionAbout'))
      .with({ kind: 'contact' }, () => _('seoDescriptionContact'))
      .with({ kind: 'terms' }, () => _('seoDescriptionTerms'))
      .otherwise(() => _('seoDescriptionUnavailable'))

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
    .with({ kind: 'privacy-policy' }, () => '/privacy-policy/')
    .with({ kind: 'about' }, () => '/about/')
    .with({ kind: 'contact' }, () => '/contact/')
    .with({ kind: 'terms' }, () => '/terms/')
    .otherwise(() => '/')

export const buildSeoMetadata = ({
  routeState,
  siteUrl,
  locale,
}: {
  routeState: RouteState
  siteUrl: string
  locale: SupportedLocale
}): SeoMetadata => {
  const normalizedSiteUrl = resolvePublicSiteUrl(siteUrl)
  const canonicalPath = resolveCanonicalPath(routeState, siteUrl)
  const routePath = resolveRoutePath(routeState)
  const { _ } = mapTranslator(locale)

  return {
    title: resolveSeoTitle(_)(routeState),
    description: resolveSeoDescription(_)(routeState),
    canonicalUrl: canonicalPath,
    openGraphUrl: canonicalPath,
    openGraphImageUrl: `${normalizedSiteUrl}/og-image.svg`,
    jsonLd: JSON.stringify(buildBaseJsonLd(_)(normalizedSiteUrl, routePath)),
    hreflangLinks: buildHreflangLinks(routePath, normalizedSiteUrl, locale),
    htmlLang: locale.toLowerCase(),
  }
}
