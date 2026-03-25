import { BehaviorSubject } from 'rxjs'
import { i18n } from '@lingui/core'
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  localeFromPath,
  type SupportedLocale,
} from './lingui.config'

const STORAGE_KEY = 'amorta-locale'

const getStoredLocale = (): string | null => {
  if (typeof localStorage === 'undefined') return null
  return localStorage.getItem(STORAGE_KEY)
}

const setStoredLocale = (locale: string): void => {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(STORAGE_KEY, locale)
}

const getBrowserLocale = (): string | null => {
  if (typeof navigator === 'undefined') return null
  return navigator.language || navigator.languages?.[0] || null
}

const getUrlLocale = (): SupportedLocale | null => {
  if (typeof window === 'undefined') return null
  const segments = window.location.pathname
    .split('/')
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
  const first = segments[0]
  return first ? localeFromPath(first) : null
}

export const locale$ = new BehaviorSubject<SupportedLocale>(DEFAULT_LOCALE)

export const initLocale = (): string => {
  const urlLocale = getUrlLocale()
  if (urlLocale !== null) {
    i18n.activate(urlLocale)
    locale$.next(urlLocale)
    setStoredLocale(urlLocale)
    return urlLocale
  }

  const stored = getStoredLocale()
  if (stored && SUPPORTED_LOCALES.includes(stored as SupportedLocale)) {
    const resolved = stored as SupportedLocale
    i18n.activate(resolved)
    locale$.next(resolved)
    return resolved
  }

  const browser = getBrowserLocale()
  if (browser) {
    const exact = SUPPORTED_LOCALES.includes(browser as SupportedLocale)
      ? (browser as SupportedLocale)
      : null
    const resolved =
      exact ??
      (() => {
        const lang = browser.split('-')[0]
        return SUPPORTED_LOCALES.includes(lang as SupportedLocale)
          ? (lang as SupportedLocale)
          : null
      })()
    if (resolved) {
      i18n.activate(resolved)
      locale$.next(resolved)
      return resolved
    }
  }

  i18n.activate(DEFAULT_LOCALE)
  locale$.next(DEFAULT_LOCALE)
  return DEFAULT_LOCALE
}

export const setLocale = (locale: string): void => {
  if (!SUPPORTED_LOCALES.includes(locale as SupportedLocale)) return
  const resolved = locale as SupportedLocale
  i18n.activate(resolved)
  locale$.next(resolved)
  setStoredLocale(resolved)
}

export const getLocale = (): string => locale$.getValue()
