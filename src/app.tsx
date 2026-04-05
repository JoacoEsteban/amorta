import { match } from 'ts-pattern'
import type { RouteState } from './domain/share'
import { BlogIndexPage, ArticlePage } from './pages/blog'
import {
  PrivacyPolicyPage,
  AboutPage,
  ContactPage,
  TermsPage,
} from './pages/legal'
import { CalculatorPage } from './pages/calculator'
import { InvalidResultPage } from './pages/invalid-result'
import { type LoanStore } from './state/loan-store'
import type { UIStore } from './state/ui-store'

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
