import { i18n } from '@lingui/core'
import { enUSMessages } from './locales/en-US/messages.js'
import { DEFAULT_LOCALE } from './lingui.config'

i18n.loadAndActivate({ locale: DEFAULT_LOCALE, messages: enUSMessages })

export { i18n }
