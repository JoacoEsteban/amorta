import { setupI18n } from '@lingui/core'
import { enUSMessages } from './locales/en-US/messages.js'
import { enGBMessages } from './locales/en-GB/messages.js'
import { esESMessages } from './locales/es-ES/messages.js'
import { esARMessages } from './locales/es-AR/messages.js'
import { type SupportedLocale } from './lingui.config'

const messages = {
  'en-US': enUSMessages,
  'en-GB': enGBMessages,
  'es-ES': esESMessages,
  'es-AR': esARMessages,
}

export function buildTranslator(locale: SupportedLocale) {
  const translator = setupI18n({
    locale,
    messages: {
      [locale]: messages[locale],
    },
  })
  translator.activate(locale)

  return translator
}
