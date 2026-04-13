import path from 'path'
import { Globe } from 'lucide-react'

import {
  SUPPORTED_LOCALES,
  LOCALE_LABELS,
  resolveLocaleFromMaybeLanguage,
  type SupportedLocale,
  DEFAULT_LOCALE,
  buildLocalePathDecorated,
} from '../i18n/lingui.config'
import { useLocaleStore } from '../state/locale'
import type { LocaleStore } from '../state/locale-store'
import { match } from 'ts-pattern'

class Controller {
  static switch(newLocale: SupportedLocale, store: LocaleStore) {
    const { pathname } = window.location
    const segments = pathname
      .split('/')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)

    const [firstPathSegment, ...rest] = segments
    const currentLocaleFromPath = resolveLocaleFromMaybeLanguage(
      firstPathSegment ?? '',
    )
    const isInLocalizedSession = Boolean(currentLocaleFromPath)
    const { isRoot, path } = buildLocalePathDecorated(newLocale, rest)
    const newPathHasLocalizedSession = !isRoot

    if (!isInLocalizedSession || !newPathHasLocalizedSession)
      store.persistLocale(newLocale)
    if (isInLocalizedSession) window.location.assign(path)
  }

  static resolveUrl(locale: SupportedLocale, params: string[] = []) {
    return match(locale)
      .with(DEFAULT_LOCALE, () => path.join('/', ...params))
      .otherwise(() => path.join('/', locale, ...params))
  }
}

const LocaleSwitcher = () => {
  const store = useLocaleStore()
  const { locale } = store.useLocale()

  return (
    <div className="locale-switcher">
      <Globe size={16} className="locale-switcher__icon" />
      <select
        value={locale}
        onChange={(e) =>
          Controller.switch(e.target.value as SupportedLocale, store)
        }
        className="locale-switcher__select"
        aria-label="Select language"
      >
        {SUPPORTED_LOCALES.map((loc) => (
          <option key={loc} value={loc}>
            {LOCALE_LABELS[loc]}
          </option>
        ))}
      </select>
    </div>
  )
}

export { LocaleSwitcher }
