import { buildLocalePath } from '../i18n/lingui.config'
import { useLocale, useTranslator } from '../state/locale.js'
import { LocaleSwitcher } from './locale-switcher.js'

export const Footer = () => {
  const { _ } = useTranslator()
  const currentLocale = useLocale()

  return (
    <footer className="app-footer">
      <div className="app-footer__main">
        <span>
          {_('madeBy')}{' '}
          <a href="https://joaco.io" target="_blank" rel="noopener noreferrer">
            joaco.io
          </a>
        </span>
        <span className="app-footer__sep">·</span>
        <a
          href="https://github.com/joacoesteban/amorta"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <span className="app-footer__sep">·</span>
        <a href={buildLocalePath(currentLocale, '/blog/')}>{_('articles')}</a>
        <span className="app-footer__sep">·</span>
        <a href={buildLocalePath(currentLocale, '/about/')}>{_('aboutLink')}</a>
        <span className="app-footer__sep">·</span>
        <a href={buildLocalePath(currentLocale, '/contact/')}>
          {_('contactLink')}
        </a>
        <span className="app-footer__sep">·</span>
        <a href={buildLocalePath(currentLocale, '/privacy-policy/')}>
          {_('privacyPolicyLink')}
        </a>
        <span className="app-footer__sep">·</span>
        <a href={buildLocalePath(currentLocale, '/terms/')}>{_('termsLink')}</a>
        <span className="app-footer__sep">·</span>
        <LocaleSwitcher />
      </div>
    </footer>
  )
}
