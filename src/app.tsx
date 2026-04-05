import { useMemo } from 'react'
import { RotateCcw, Share2 } from 'lucide-react'
import { match } from 'ts-pattern'
import type { RouteState } from './domain/share'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './components/ui/card'
import { BlogIndexPage, ArticlePage } from './pages/blog'
import {
  PrivacyPolicyPage,
  AboutPage,
  ContactPage,
  TermsPage,
} from './pages/legal'
import { CalculatorPage } from './pages/calculator'
import { type LoanStore } from './state/loan-store'
import type { UIStore } from './state/ui-store'
import { buildLocalePath, type SupportedLocale } from './i18n/lingui.config'
import { useLocale, useTranslator } from './state/locale.js'

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

type AppProps =
  | {
      kind: 'calculator'
      uiStore: UIStore
      routeState:
        | Extract<RouteState, { kind: 'index' }>
        | {
            kind: 'result'
            payload: string | null
            decoded: Extract<
              RouteState,
              { kind: 'result' }
            >['decoded'] extends infer T
              ? Extract<T, { kind: 'pending' | 'valid' }>
              : never
          }
      store: LoanStore
      hydrated: boolean
    }
  | {
      kind: 'invalid-result'
      routeState: {
        kind: 'result'
        payload: string | null
        decoded: Extract<
          RouteState,
          { kind: 'result' }
        >['decoded'] extends infer T
          ? Exclude<T, { kind: 'valid' | 'pending' }>
          : never
      }
      hydrated: boolean
    }
  | {
      kind: 'blog-index'
      routeState: Extract<RouteState, { kind: 'blog-index' }>
    }
  | {
      kind: 'blog-article'
      routeState: Extract<RouteState, { kind: 'blog-article' }>
    }
  | {
      kind: 'privacy-policy'
      routeState: Extract<RouteState, { kind: 'privacy-policy' }>
    }
  | {
      kind: 'about'
      routeState: Extract<RouteState, { kind: 'about' }>
    }
  | {
      kind: 'contact'
      routeState: Extract<RouteState, { kind: 'contact' }>
    }
  | {
      kind: 'terms'
      routeState: Extract<RouteState, { kind: 'terms' }>
    }

export const App = (props: AppProps) =>
  match(props)
    .with({ kind: 'invalid-result' }, ({ routeState }) => (
      <InvalidResultPage routeState={routeState} />
    ))
    .with(
      { kind: 'calculator' },
      ({ routeState, store, hydrated, uiStore }) => (
        <CalculatorPage
          routeState={routeState}
          store={store}
          hydrated={hydrated}
          uiStore={uiStore}
        />
      ),
    )
    .with({ kind: 'blog-index' }, ({ routeState }) => (
      <BlogIndexPage routeState={routeState} />
    ))
    .with({ kind: 'blog-article' }, ({ routeState }) => (
      <ArticlePage routeState={routeState} />
    ))
    .with({ kind: 'privacy-policy' }, ({ routeState }) => (
      <PrivacyPolicyPage routeState={routeState} />
    ))
    .with({ kind: 'about' }, ({ routeState }) => (
      <AboutPage routeState={routeState} />
    ))
    .with({ kind: 'contact' }, ({ routeState }) => (
      <ContactPage routeState={routeState} />
    ))
    .with({ kind: 'terms' }, ({ routeState }) => (
      <TermsPage routeState={routeState} />
    ))
    .exhaustive()

const InvalidResultPage = ({
  routeState,
}: {
  routeState: {
    kind: 'result'
    payload: string | null
    decoded: Exclude<
      Extract<RouteState, { kind: 'result' }>['decoded'],
      { kind: 'valid' | 'pending' }
    >
  }
}) => {
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
