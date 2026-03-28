import path from 'path'
import { Globe } from 'lucide-react'

import {
  SUPPORTED_LOCALES,
  LOCALE_LABELS,
  resolveLocaleFromMaybeLanguage,
  type SupportedLocale,
} from '../i18n/lingui.config'
import { useLocaleStore } from '../state/locale'
import type { LocaleStore } from '../state/locale-store'

class Controller {
  static switch(newLocale: SupportedLocale, store: LocaleStore) {
    const { pathname } = window.location
    const segments = pathname
      .split('/')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)

    const [first, ...rest] = segments
    const currentLocale = resolveLocaleFromMaybeLanguage(first ?? '')

    if (!currentLocale) {
      store.persistLocale(newLocale)
      return
    }

    window.location.assign(path.join('/', newLocale, ...rest))
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
