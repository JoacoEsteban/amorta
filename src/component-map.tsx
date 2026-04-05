import { match } from 'ts-pattern'
import { type RouteState } from './domain/share'

export const ComponentMap = {
  InvalidResultPage: () =>
    import('./pages/invalid-result').then(
      ({ InvalidResultPage }) => InvalidResultPage,
    ),
  CalculatorPage: () =>
    import('./pages/calculator').then(({ CalculatorPage }) => CalculatorPage),
  BlogIndexPage: () =>
    import('./pages/blog').then(({ BlogIndexPage }) => BlogIndexPage),
  ArticlePage: () =>
    import('./pages/blog').then(({ ArticlePage }) => ArticlePage),
  PrivacyPolicyPage: () =>
    import('./pages/legal').then(({ PrivacyPolicyPage }) => PrivacyPolicyPage),
  AboutPage: () => import('./pages/legal').then(({ AboutPage }) => AboutPage),
  ContactPage: () =>
    import('./pages/legal').then(({ ContactPage }) => ContactPage),
  TermsPage: () => import('./pages/legal').then(({ TermsPage }) => TermsPage),
}

export type ComponentMapImports = typeof ComponentMap
export type ComponentMap = {
  [key in keyof ComponentMapImports]: Awaited<
    ReturnType<ComponentMapImports[key]>
  >
}

export const preloadRouteComponent = (
  routeState: RouteState,
): keyof ComponentMapImports =>
  match<RouteState, keyof ComponentMapImports>(routeState)
    .with({ kind: 'index' }, () => 'CalculatorPage')
    .with(
      { kind: 'result', decoded: { kind: 'pending' } },
      () => 'CalculatorPage',
    )
    .with(
      { kind: 'result', decoded: { kind: 'valid' } },
      () => 'CalculatorPage',
    )
    .with({ kind: 'result' }, () => 'InvalidResultPage')
    .with({ kind: 'blog-index' }, () => 'BlogIndexPage')
    .with({ kind: 'blog-article' }, () => 'ArticlePage')
    .with({ kind: 'privacy-policy' }, () => 'PrivacyPolicyPage')
    .with({ kind: 'about' }, () => 'AboutPage')
    .with({ kind: 'contact' }, () => 'ContactPage')
    .with({ kind: 'terms' }, () => 'TermsPage')
    .exhaustive()

export const getPartialComponentMapForRoute = async ({
  initialRouteState,
}: {
  initialRouteState: RouteState
}) => {
  const componentKey = preloadRouteComponent(initialRouteState)
  const componentMap: Partial<ComponentMap> = {
    [componentKey]: await ComponentMap[componentKey](),
  }
  return componentMap
}
