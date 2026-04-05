import { useMemo } from 'react'
import { RotateCcw, Share2 } from 'lucide-react'
import { match } from 'ts-pattern'
import type { RouteState } from '../domain/share'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
import { buildLocalePath, type SupportedLocale } from '../i18n/lingui.config'
import { useLocale, useTranslator } from '../state/locale.js'

const makeLocaleNavigator =
  (locale: SupportedLocale) =>
  (pathname: string): void => {
    match(typeof window)
      .with('undefined', () => null)
      .otherwise(() => {
        const fullPath = buildLocalePath(locale, pathname)
        window.location.assign(fullPath)
        return null
      })
  }

export type InvalidResultPageRouteState = {
  kind: 'result'
  payload: string | null
  decoded: Exclude<
    Extract<RouteState, { kind: 'result' }>['decoded'],
    { kind: 'valid' | 'pending' }
  >
}

export type InvalidResultPageProps = {
  routeState: InvalidResultPageRouteState
}

export const InvalidResultPage = ({ routeState }: InvalidResultPageProps) => {
  const { _ } = useTranslator()
  const locale = useLocale()
  const navigateTo = useMemo(() => makeLocaleNavigator(locale), [locale])

  return (
    <main className="app-shell">
      <div className="app-layout">
        <div className="page-toolbar">
          <div className="page-toolbar__copy">
            <p className="page-kicker">{_('sharedResult')}</p>
            <h1 className="page-title">{_('sharedResultUnavailable')}</h1>
          </div>
          <button
            type="button"
            className="action-button action-button--disabled"
            disabled
            title={_('validResultRequired')}
          >
            <Share2 size={16} />
            <span>{_('shareResult')}</span>
          </button>
        </div>

        <Card className="panel-card panel-card--message">
          <CardHeader className="panel-card__header panel-card__header--plain">
            <CardTitle>
              {match(routeState.decoded.kind)
                .with('missing', () => _('noSharedResultFound'))
                .otherwise(() => _('thisSharedResultIsInvalid'))}
            </CardTitle>
            <CardDescription>{routeState.decoded.message}</CardDescription>
          </CardHeader>
          <CardContent className="panel-card__content message-actions">
            <button
              type="button"
              className="action-button action-button--primary"
              onClick={() => navigateTo('/')}
            >
              <RotateCcw size={16} />
              <span>{_('openCalculator')}</span>
            </button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
