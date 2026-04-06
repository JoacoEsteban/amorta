import { assert } from '../lib/assert'

export const SUPPORTED_LOCALES = [
  'en-US',
  'en-GB',
  'es-ES',
  'es-AR',
  'fr-FR',
] as const
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: SupportedLocale = 'en-US'

export const LOCALE_LABELS: Record<SupportedLocale, string> = {
  'en-US': 'English (US)',
  'en-GB': 'English (UK)',
  'es-ES': 'Español (España)',
  'es-AR': 'Español (Argentina)',
  'fr-FR': 'Français (France)',
}

export const isValidLocale = (locale: string): locale is SupportedLocale =>
  SUPPORTED_LOCALES.includes(locale as SupportedLocale)

const LANGUAGE_TO_LOCALE: Map<string, SupportedLocale> = (() => {
  const map = new Map<string, SupportedLocale>()
  SUPPORTED_LOCALES.forEach((locale) => {
    const lang = locale.split('-')[0]
    assert(lang)
    map.set(locale, locale)
    if (!map.has(lang)) map.set(lang, locale)
  })
  return map
})()

export const resolveLocaleFromMaybeLanguage = (
  maybeLanguageOrLocale: string,
): SupportedLocale | null => {
  if (!maybeLanguageOrLocale) return null

  const candidate = maybeLanguageOrLocale.trim()
  if (SUPPORTED_LOCALES.includes(candidate as SupportedLocale)) {
    return candidate as SupportedLocale
  }
  const langFallback = LANGUAGE_TO_LOCALE.get(candidate)
  return langFallback ?? null
}

export const stripLocaleFromPath = (
  pathname: string,
): { locale: SupportedLocale | null; strippedPathname: string } => {
  const segments = pathname
    .split('/')
    .map((s) => s.trim())
    .filter((s) => s.length > 0)

  const first = segments[0]
  const locale = first ? resolveLocaleFromMaybeLanguage(first) : null
  const strippedSegments = locale ? segments.slice(1) : segments

  return {
    locale,
    strippedPathname: '/' + strippedSegments.join('/'),
  }
}

export const buildLocalePath = (
  locale: SupportedLocale,
  pathname: string,
): string => {
  const cleanPath = pathname.startsWith('/') ? pathname : '/' + pathname
  return `/${locale}${cleanPath}`
}
