import { createContext, useContext, type PropsWithChildren } from 'react'
import { buildTranslator } from '../i18n'
import type { SupportedLocale } from '../i18n/lingui.config'
import type { LocaleStore } from './locale-store'
import { assert } from '../lib/assert'

export type Translator = ReturnType<typeof mapTranslator>
export type Translate = Translator['_']
const LocaleContext = createContext<LocaleStore | null>(null)

export function useLocaleStore() {
  const store = useContext(LocaleContext)
  assert(store, 'useLocale must be used within a LocaleProvider')
  return store
}

export function useLocale() {
  const store = useLocaleStore()
  const { locale } = store.useLocale()
  return locale
}

export function useTranslator() {
  const store = useLocaleStore()
  const { translator } = store.useLocale()
  return translator
}

export function mapTranslator(locale: SupportedLocale) {
  const t = buildTranslator(locale)
  return {
    instance: t,
    _: t._.bind(t),
  }
}

export function ProvideLocale({
  children,
  store,
}: PropsWithChildren<{
  store: LocaleStore
}>) {
  return <LocaleContext value={store}>{children}</LocaleContext>
}
