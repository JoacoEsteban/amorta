import { BehaviorSubject } from 'rxjs'
import { i18n } from '@lingui/core'
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
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

const isSupportedLocale = (locale: string): locale is SupportedLocale =>
  SUPPORTED_LOCALES.includes(locale as SupportedLocale)

export const locale$ = new BehaviorSubject<string>(DEFAULT_LOCALE)

export const initLocale = (): string => {
  const stored = getStoredLocale()
  if (stored && isSupportedLocale(stored)) {
    i18n.activate(stored)
    locale$.next(stored)
    return stored
  }

  const browser = getBrowserLocale()
  if (browser && isSupportedLocale(browser)) {
    i18n.activate(browser)
    locale$.next(browser)
    return browser
  }

  const languageOnly = browser?.split('-')[0]
  if (languageOnly && isSupportedLocale(languageOnly)) {
    i18n.activate(languageOnly)
    locale$.next(languageOnly)
    return languageOnly
  }

  i18n.activate(DEFAULT_LOCALE)
  locale$.next(DEFAULT_LOCALE)
  return DEFAULT_LOCALE
}

export const setLocale = (locale: string): void => {
  if (!isSupportedLocale(locale)) return
  i18n.activate(locale)
  locale$.next(locale)
  setStoredLocale(locale)
}

export const getLocale = (): string => locale$.getValue()
