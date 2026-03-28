// import { i18n } from '@lingui/core'
import { setupI18n } from '@lingui/core'
import { enUSMessages } from './locales/en-US/messages.js'
import { enGBMessages } from './locales/en-GB/messages.js'
import { esESMessages } from './locales/es-ES/messages.js'
import { esARMessages } from './locales/es-AR/messages.js'
import { DEFAULT_LOCALE, type SupportedLocale } from './lingui.config'

// i18n.load({
//   'en-US': enUSMessages,
//   'en-GB': enGBMessages,
//   'es-ES': esESMessages,
//   'es-AR': esARMessages,
// })
// i18n.activate(DEFAULT_LOCALE)

export function activate(locale: SupportedLocale) {
  return setupI18n({
    locale,
    messages: {
      'en-US': enUSMessages,
      'en-GB': enGBMessages,
      'es-ES': esESMessages,
      'es-AR': esARMessages,
    },
  })
}

export const i18n = {
  activate,
}
