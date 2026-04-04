import { Share2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { match } from 'ts-pattern'

import type { ShareableLoanState } from '../domain/share'
import { buildShareUrl } from '../domain/share'
import type { SupportedLocale } from '../i18n/lingui.config'
import { useLocale, useTranslator } from '../state/locale.js'

export type ShareButtonProps = {
  values: ShareableLoanState
  disabled?: boolean
  className?: string
  title?: string
}

const copyShareUrl = (
  shareUrl: string,
  translations: {
    clipboardUnavailable: string
    shareUrlCopied: string
    shareUrlCopyFailed: string
  },
): void => {
  const clipboard = match(typeof navigator)
    .with('undefined', () => null)
    .otherwise(() => navigator.clipboard)

  match(clipboard)
    .with(null, () => {
      toast.error(translations.clipboardUnavailable)
    })
    .otherwise((resolvedClipboard) => {
      resolvedClipboard
        .writeText(shareUrl)
        .then(() => {
          toast.success(translations.shareUrlCopied)
        })
        .catch(() => {
          toast.error(translations.shareUrlCopyFailed)
        })
    })
}

const useShareUrl = (
  values: ShareableLoanState,
  locale: SupportedLocale,
): string =>
  match(typeof window)
    .with('undefined', () => '')
    .otherwise(() => buildShareUrl(values, window.location, locale))

export const ShareButton = ({
  values,
  disabled = false,
  className,
  title,
}: ShareButtonProps) => {
  const { _ } = useTranslator()
  const locale = useLocale()
  const shareUrl = useShareUrl(values, locale)

  const buttonClassName = match(disabled)
    .with(true, () => 'action-button action-button--disabled')
    .otherwise(() => className ?? 'action-button action-button--primary')

  const handleClick = (): void => {
    match(disabled)
      .with(true, () => {})
      .otherwise(() => {
        copyShareUrl(shareUrl, {
          clipboardUnavailable: _('clipboardUnavailable'),
          shareUrlCopied: _('shareUrlCopied'),
          shareUrlCopyFailed: _('shareUrlCopyFailed'),
        })
      })
  }

  return (
    <button
      type="button"
      className={buttonClassName}
      onClick={handleClick}
      disabled={disabled}
      title={title}
    >
      <Share2 size={16} />
      <span>{_('shareResult')}</span>
    </button>
  )
}
