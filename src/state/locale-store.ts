import { bind } from '@react-rxjs/core'
import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs'
import { type SupportedLocale } from '../i18n/lingui.config'
import { mapTranslator, type Translator } from './locale'
import { assert } from '../lib/assert'
export const LOCALE_STORAGE_KEY = 'amorta:locale'

export type LocaleViewModel = {
  locale: SupportedLocale
  translator: Translator
}

export type LocaleStore = {
  useLocale: () => LocaleViewModel
  setLocale: (value: SupportedLocale) => void
  persistLocale: (value: SupportedLocale) => void
}

export type LocaleStoreProviderProps = {
  children?: React.ReactNode
}

function mapLocaleState(locale: SupportedLocale): LocaleViewModel {
  return {
    locale,
    translator: mapTranslator(locale),
  }
}

const setStoredLocale = (locale: string): void => {
  assert(localStorage)
  localStorage.setItem(LOCALE_STORAGE_KEY, locale)
}

export const createLocaleStore = (locale: SupportedLocale): LocaleStore => {
  const localeString$ = new BehaviorSubject(locale)
  const locale$ = localeString$.pipe(
    distinctUntilChanged(),
    map(mapLocaleState),
  )
  const [useLocale] = bind(locale$, mapLocaleState(locale))

  const setLocale = (locale: SupportedLocale) => localeString$.next(locale)
  const persistLocale = (locale: SupportedLocale) => {
    setLocale(locale)
    setStoredLocale(locale)
  }

  return {
    useLocale,
    setLocale,
    persistLocale,
  }
}
