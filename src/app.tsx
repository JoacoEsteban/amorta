import { match } from 'ts-pattern'
import React, { Suspense, type JSX } from 'react'
import type { RouteState } from './domain/share'
import { type LoanStore } from './state/loan-store'
import type { UIStore } from './state/ui-store'
import type { ComponentMap } from './component-map'
import { assert } from './lib/assert'

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

function AssertComponent<T extends React.ElementType>({
  component: Component,
  props,
}: {
  component: T | undefined
  props: React.ComponentProps<T>
}) {
  assert(Component)
  return <Component {...props} />
}

export const App = (
  props: AppProps & { componentMap: Partial<ComponentMap> },
) =>
  match(props)
    .with(
      { kind: 'invalid-result' },
      ({ routeState, componentMap: { InvalidResultPage } }) => (
        <AssertComponent
          component={InvalidResultPage}
          props={{
            routeState,
          }}
        />
      ),
    )
    .with(
      { kind: 'calculator' },
      ({
        routeState,
        store,
        hydrated,
        uiStore,
        componentMap: { CalculatorPage },
      }) => (
        <AssertComponent
          component={CalculatorPage}
          props={{ routeState, store, hydrated, uiStore }}
        />
      ),
    )
    .with(
      { kind: 'blog-index' },
      ({ routeState, componentMap: { BlogIndexPage } }) => (
        <AssertComponent
          component={BlogIndexPage}
          props={{
            routeState,
          }}
        />
      ),
    )
    .with(
      { kind: 'blog-article' },
      ({ routeState, componentMap: { ArticlePage } }) => (
        <AssertComponent
          component={ArticlePage}
          props={{
            routeState,
          }}
        />
      ),
    )
    .with(
      { kind: 'privacy-policy' },
      ({ routeState, componentMap: { PrivacyPolicyPage } }) => (
        <AssertComponent
          component={PrivacyPolicyPage}
          props={{
            routeState,
          }}
        />
      ),
    )
    .with({ kind: 'about' }, ({ routeState, componentMap: { AboutPage } }) => (
      <AssertComponent
        component={AboutPage}
        props={{
          routeState,
        }}
      />
    ))
    .with(
      { kind: 'contact' },
      ({ routeState, componentMap: { ContactPage } }) => (
        <AssertComponent
          component={ContactPage}
          props={{
            routeState,
          }}
        />
      ),
    )
    .with({ kind: 'terms' }, ({ routeState, componentMap: { TermsPage } }) => (
      <AssertComponent
        component={TermsPage}
        props={{
          routeState,
        }}
      />
    ))
    .exhaustive()
