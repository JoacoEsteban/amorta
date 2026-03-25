import { i18n } from '@lingui/core'
import { enUSMessages } from './locales/en-US/messages.js'
import { esESMessages } from './locales/es-ES/messages.js'
import { esARMessages } from './locales/es-AR/messages.js'
import { DEFAULT_LOCALE } from './lingui.config'

i18n.load({
  'en-US': enUSMessages,
  'es-ES': esESMessages,
  'es-AR': esARMessages,
})
i18n.activate(DEFAULT_LOCALE)

export { i18n }
