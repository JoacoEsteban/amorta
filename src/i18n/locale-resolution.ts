import { filter, identity } from 'rxjs'
import {
  DEFAULT_LOCALE,
  isValidLocale,
  resolveLocaleFromMaybeLanguage as resolveLocaleFromMaybeLanguageOrLocale,
  type SupportedLocale,
} from './lingui.config'
import { match, P } from 'ts-pattern'
import { LOCALE_STORAGE_KEY } from '../state/locale-store'
import { assert } from '../lib/assert'
import { evalSync, sync$, unwrap } from '../lib/rxjs'

const getStoredLocale = () => {
  if (typeof localStorage === 'undefined') return null

  return match(localStorage.getItem(LOCALE_STORAGE_KEY) ?? '')
    .when(isValidLocale, identity)
    .otherwise(() => {
      localStorage.removeItem(LOCALE_STORAGE_KEY)
      return null
    })
}

const getBrowserLocale = () => {
  if (typeof navigator === 'undefined') return null

  return match(
    resolveLocaleFromMaybeLanguageOrLocale(
      (navigator.language || navigator.languages?.[0]) ?? '',
    ),
  )
    .with(P.string, identity)
    .otherwise(() => null)
}

const getUrlLocale = (): SupportedLocale | null => {
  if (typeof window === 'undefined') return null
  const segments = window.location.pathname
    .split('/')
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
  const [first] = segments

  return resolveLocaleFromMaybeLanguageOrLocale(first ?? '')
}

export const resolveLocale = () => {
  const locale = evalSync(
    sync$([
      () => ({
        locale: getUrlLocale(),
        location: 'url',
      }),
      () => ({
        locale: getStoredLocale(),
        location: 'storage',
      }),
      () => ({
        locale: getBrowserLocale(),
        location: 'browser',
      }),
      () => ({
        locale: DEFAULT_LOCALE,
        location: 'default',
      }),
    ]).pipe(
      unwrap(),
      filter((a) => Boolean(a.locale)),
    ),
  )

  assert(locale.locale)

  return locale
}
