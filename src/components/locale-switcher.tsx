import { useEffect, useState } from 'react'
import { Globe } from 'lucide-react'

import {
  SUPPORTED_LOCALES,
  LOCALE_LABELS,
  localeFromPath,
  buildLocalePath,
  type SupportedLocale,
} from '../i18n/lingui.config'
import { locale$, setLocale } from '../i18n/locale-state'

const LocaleSwitcher = () => {
  const [locale, setLocaleState] = useState(locale$.getValue())

  useEffect(() => {
    const sub = locale$.subscribe(setLocaleState)
    return () => sub.unsubscribe()
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.currentTarget.value as SupportedLocale
    const pathname = window.location.pathname
    const segments = pathname
      .split('/')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
    const first = segments[0]
    const currentLocale = first ? localeFromPath(first) : null
    const strippedPath =
      '/' + (currentLocale ? segments.slice(1) : segments).join('/') || '/'

    if (currentLocale !== null) {
      window.location.assign(buildLocalePath(newLocale, strippedPath))
    } else {
      setLocale(newLocale)
    }
  }

  return (
    <div className="locale-switcher">
      <Globe size={16} className="locale-switcher__icon" />
      <select
        value={locale}
        onChange={handleChange}
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
