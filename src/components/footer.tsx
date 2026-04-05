import type { PropsWithChildren } from 'react'
import { buildLocalePath } from '../i18n/lingui.config'
import { useLocale, useTranslator } from '../state/locale.js'
import { LocaleSwitcher } from './locale-switcher.js'
import React from 'react'
import { match } from 'ts-pattern'

export const Footer = () => {
  const { _ } = useTranslator()
  const currentLocale = useLocale()

  return (
    <footer className="app-footer">
      <div className="app-footer__main max-md:gap-x-5 max-md:gap-y-2 gap-1">
        <Separated>
          <span>
            {_('madeBy')}{' '}
            <a
              href="https://joaco.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              joaco.io
            </a>
          </span>
          <a
            href="https://github.com/joacoesteban/amorta"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a href={buildLocalePath(currentLocale, '/blog/')}>{_('articles')}</a>
          <a href={buildLocalePath(currentLocale, '/about/')}>
            {_('aboutLink')}
          </a>
          <a href={buildLocalePath(currentLocale, '/contact/')}>
            {_('contactLink')}
          </a>
          <a href={buildLocalePath(currentLocale, '/privacy-policy/')}>
            {_('privacyPolicyLink')}
          </a>
          <a href={buildLocalePath(currentLocale, '/terms/')}>
            {_('termsLink')}
          </a>
          <LocaleSwitcher />
        </Separated>
      </div>
    </footer>
  )
}

const separator = <span className="app-footer__sep max-md:hidden">·</span>

function Separated({ children }: PropsWithChildren) {
  return React.Children.map(children, (child, index) =>
    match(index)
      .with(0, () => child)
      .otherwise(() => (
        <>
          {separator}
          {child}
        </>
      )),
  )
}
