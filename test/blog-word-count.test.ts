import { describe, expect, test } from 'bun:test'
import * as cheerio from 'cheerio'
import { ARTICLES } from '../src/domain/blog'
import { enUSMessages } from '../src/i18n/locales/en-US/messages.js'
import { enGBMessages } from '../src/i18n/locales/en-GB/messages.js'
import { esESMessages } from '../src/i18n/locales/es-ES/messages.js'
import { esARMessages } from '../src/i18n/locales/es-AR/messages.js'
import type { SupportedLocale } from '../src/i18n/lingui.config'

const MIN_WORD_COUNT = 800
const MAX_WORD_COUNT = 1500

const messagesByLocale: Record<SupportedLocale, Record<string, string>> = {
  'en-US': enUSMessages,
  'en-GB': enGBMessages,
  'es-ES': esESMessages,
  'es-AR': esARMessages,
}

const locales: SupportedLocale[] = ['en-US', 'en-GB', 'es-ES', 'es-AR']

const stripHtmlAndCountWords = (html: string): number => {
  const $ = cheerio.load(html)
  const text = $.text()
  const words = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0)
  return words.length
}

type TestCase = {
  slug: string
  locale: SupportedLocale
  wordCount: number
}

const buildTestCases = (): TestCase[] => {
  const cases: TestCase[] = []

  for (const article of ARTICLES) {
    for (const locale of locales) {
      const localeMessages = messagesByLocale[locale]
      const body = localeMessages[article.bodyKey]

      if (!body) {
        throw new Error(
          `Missing body content for article "${article.slug}" in locale "${locale}" (key: ${article.bodyKey})`
        )
      }

      const wordCount = stripHtmlAndCountWords(body)
      cases.push({ slug: article.slug, locale, wordCount })
    }
  }

  return cases
}

describe('blog article word count', () => {
  const testCases = buildTestCases()

  test.each(testCases)(
    'article "%s" (%s) has at least 800 words',
    ({ slug, locale, wordCount }) => {
      expect(wordCount).toBeGreaterThanOrEqual(MIN_WORD_COUNT)
    }
  )

  test.each(testCases)(
    'article "%s" (%s) has at most 1500 words',
    ({ slug, locale, wordCount }) => {
      expect(wordCount).toBeLessThanOrEqual(MAX_WORD_COUNT)
    }
  )
})
