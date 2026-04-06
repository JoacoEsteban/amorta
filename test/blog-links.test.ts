import { describe, expect, test } from 'bun:test'
import * as cheerio from 'cheerio'
import { match } from 'ts-pattern'

import { ARTICLES, getArticleBySlug } from '../src/domain/blog'
import { parseRouteState } from '../src/domain/share'
import {
  buildLocalePath,
  type SupportedLocale,
} from '../src/i18n/lingui.config'
import { enUSMessages } from '../src/i18n/locales/en-US/messages.js'
import { enGBMessages } from '../src/i18n/locales/en-GB/messages.js'
import { esESMessages } from '../src/i18n/locales/es-ES/messages.js'
import { esARMessages } from '../src/i18n/locales/es-AR/messages.js'
import { frFRMessages } from '../src/i18n/locales/fr-FR/messages.js'

const messagesByLocale: Record<SupportedLocale, Record<string, string>> = {
  'en-US': enUSMessages,
  'en-GB': enGBMessages,
  'es-ES': esESMessages,
  'es-AR': esARMessages,
  'fr-FR': frFRMessages,
}

const locales: SupportedLocale[] = ['en-US', 'en-GB', 'es-ES', 'es-AR', 'fr-FR']

const isRelativeHref = (href: string): boolean =>
  match(href.trim())
    .when(
      (value) => value.length === 0,
      () => false,
    )
    .when(
      (value) => /^(?:[a-z]+:|\/|#)/i.test(value),
      () => false,
    )
    .otherwise(() => true)

type RelativeLinkCase = {
  slug: string
  locale: SupportedLocale
  href: string
}

const buildRelativeLinkCases = (): RelativeLinkCase[] => {
  const cases: RelativeLinkCase[] = []

  for (const article of ARTICLES) {
    for (const locale of locales) {
      const body = messagesByLocale[locale][article.bodyKey] ?? ''
      const $ = cheerio.load(body)

      $('a[href]').each((_, element) => {
        const href = $(element).attr('href') ?? ''

        match(isRelativeHref(href))
          .with(true, () => {
            cases.push({
              slug: article.slug,
              locale,
              href,
            })
          })
          .otherwise(() => undefined)
      })
    }
  }

  return cases
}

describe('blog article relative links', () => {
  const cases = buildRelativeLinkCases()

  test.each(cases)(
    'relative link "%s" in "%s" (%s) resolves to a valid internal route',
    ({ slug, locale, href }) => {
      const baseUrl = new URL(
        buildLocalePath(locale, `/blog/${slug}`),
        'https://amorta.local',
      )
      const resolvedUrl = new URL(href, baseUrl)
      const routeState = parseRouteState(resolvedUrl)

      match(routeState)
        .with({ kind: 'blog-article' }, ({ slug: linkedSlug }) => {
          expect(getArticleBySlug(linkedSlug)).toBeDefined()
        })
        .with({ kind: 'blog-index' }, () => {
          expect(resolvedUrl.pathname).toBe(buildLocalePath(locale, '/blog'))
        })
        .with({ kind: 'privacy-policy' }, () => {
          expect(resolvedUrl.pathname).toBe(
            buildLocalePath(locale, '/privacy-policy'),
          )
        })
        .with({ kind: 'about' }, () => {
          expect(resolvedUrl.pathname).toBe(buildLocalePath(locale, '/about'))
        })
        .with({ kind: 'contact' }, () => {
          expect(resolvedUrl.pathname).toBe(buildLocalePath(locale, '/contact'))
        })
        .with({ kind: 'terms' }, () => {
          expect(resolvedUrl.pathname).toBe(buildLocalePath(locale, '/terms'))
        })
        .with({ kind: 'result' }, () => {
          expect(
            resolvedUrl.pathname.startsWith(buildLocalePath(locale, '/result')),
          ).toBe(true)
        })
        .with({ kind: 'index' }, () => {
          expect.unreachable(
            `Broken relative link "${href}" in article "${slug}" (${locale}) resolved to "${resolvedUrl.pathname}"`,
          )
        })
        .exhaustive()
    },
  )
})
