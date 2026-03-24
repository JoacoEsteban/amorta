import { Globe } from 'lucide-react'

import {
  SUPPORTED_LOCALES,
  LOCALE_LABELS,
  type SupportedLocale,
} from '../i18n/lingui.config'
import { locale$, setLocale } from '../i18n/locale-state'

const LocaleSwitcher = () => {
  const locale = locale$.getValue()

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.currentTarget.value as SupportedLocale
    setLocale(newLocale)
    window.location.reload()
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
