import { StrictMode, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { bind } from '@react-rxjs/core'
import { match } from 'ts-pattern'

import { App } from './app'
import { buildSeoMetadata } from './domain/seo'
import { parseRouteState, type RouteState } from './domain/share'
import {
  createLoanStore,
  DEFAULT_LOAN_FORM_VALUES,
  EMPTY_LOAN_FORM_VALUES,
  loadLoanStateFromLocalStorage,
  type LoanStore,
} from './state/loan-store'
import { createUIStore } from './state/ui-store'
import { locale$ } from './i18n/locale-state'

const [useLocale] = bind(locale$, locale$.getValue())

type InvalidRouteState = {
  kind: 'result'
  payload: string | null
  decoded: Exclude<
    Extract<RouteState, { kind: 'result' }>['decoded'],
    { kind: 'valid' | 'pending' }
  >
}

type AppRootProps = {
  initialRouteState: RouteState
  siteUrl: string
}

export const AppRoot = ({ initialRouteState, siteUrl }: AppRootProps) => {
  useLocale()

  const [routeState, setRouteState] = useState<RouteState>(initialRouteState)
  const [hydrated, setHydrated] = useState(false)

  const [sessionStore, setSessionStore] = useState<LoanStore>(() =>
    createLoanStore({
      initialValues: DEFAULT_LOAN_FORM_VALUES,
      mode: { kind: 'session', persist: false },
    }),
  )
  const [sharedStore, setSharedStore] = useState<LoanStore>(() =>
    createLoanStore({
      initialValues: EMPTY_LOAN_FORM_VALUES,
      mode: { kind: 'shared-result' },
    }),
  )
  const [uiStore] = useState(() => createUIStore())

  useEffect(() => {
    const resolvedRouteState = parseRouteState(
      new URL(window.location.href),
      'resolved',
    )

    setHydrated(true)

    match(resolvedRouteState)
      .with({ kind: 'index' }, () => {
        setSessionStore(
          createLoanStore({
            initialValues: loadLoanStateFromLocalStorage(),
            mode: { kind: 'session', persist: true },
          }),
        )
        setRouteState(resolvedRouteState)
      })
      .with({ kind: 'result', decoded: { kind: 'valid' } }, ({ decoded }) => {
        setSharedStore(
          createLoanStore({
            initialValues: decoded.values,
            mode: { kind: 'shared-result' },
          }),
        )
        setRouteState(resolvedRouteState)
      })
      .otherwise(() => {
        setRouteState(resolvedRouteState)
      })
  }, [])

  const appNode = match(routeState)
    .with({ kind: 'index' }, (resolvedRouteState) => (
      <App
        kind="calculator"
        routeState={resolvedRouteState}
        store={sessionStore}
        hydrated={hydrated}
        uiStore={uiStore}
      />
    ))
    .with(
      { kind: 'result', decoded: { kind: 'pending' } },
      (resolvedRouteState) => (
        <App
          kind="calculator"
          routeState={resolvedRouteState}
          store={sharedStore}
          hydrated={hydrated}
          uiStore={uiStore}
        />
      ),
    )
    .with(
      { kind: 'result', decoded: { kind: 'valid' } },
      (resolvedRouteState) => (
        <App
          kind="calculator"
          routeState={resolvedRouteState}
          store={sharedStore}
          hydrated={hydrated}
          uiStore={uiStore}
        />
      ),
    )
    .otherwise((invalidRouteState) => (
      <App
        kind="invalid-result"
        routeState={invalidRouteState as InvalidRouteState}
        hydrated={hydrated}
      />
    ))

  return (
    <StrictMode>
      <>
        <SeoHead routeState={routeState} siteUrl={siteUrl} />
        {appNode}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              borderRadius: '16px',
              background: 'rgba(28, 25, 23, 0.95)',
              color: '#f5f5f4',
            },
          }}
        />
      </>
    </StrictMode>
  )
}

const SeoHead = ({
  routeState,
  siteUrl,
}: {
  routeState: RouteState
  siteUrl: string
}) => {
  useEffect(() => {
    const metadata = buildSeoMetadata({ routeState, siteUrl })

    document.title = metadata.title
    upsertMetaTag('name', 'description', metadata.description)
    upsertMetaTag('property', 'og:title', metadata.title)
    upsertMetaTag('property', 'og:description', metadata.description)
    upsertMetaTag('property', 'og:url', metadata.openGraphUrl)
    upsertMetaTag('property', 'og:image', metadata.openGraphImageUrl)
    upsertMetaTag('name', 'twitter:title', metadata.title)
    upsertMetaTag('name', 'twitter:description', metadata.description)
    upsertMetaTag('name', 'twitter:image', metadata.openGraphImageUrl)
    upsertLinkTag('canonical', metadata.canonicalUrl)
    upsertJsonLd(metadata.jsonLd)
  }, [routeState, siteUrl])

  return null
}

const upsertMetaTag = (
  attributeName: 'name' | 'property',
  attributeValue: string,
  content: string,
): void => {
  const selector = `meta[${attributeName}="${attributeValue}"]`
  const element =
    document.head.querySelector(selector) ?? document.createElement('meta')

  element.setAttribute(attributeName, attributeValue)
  element.setAttribute('content', content)

  match(element.isConnected)
    .with(true, () => null)
    .otherwise(() => document.head.appendChild(element))
}

const upsertLinkTag = (rel: string, href: string): void => {
  const selector = `link[rel="${rel}"]`
  const element =
    document.head.querySelector(selector) ?? document.createElement('link')

  element.setAttribute('rel', rel)
  element.setAttribute('href', href)

  match(element.isConnected)
    .with(true, () => null)
    .otherwise(() => document.head.appendChild(element))
}

const upsertJsonLd = (jsonLd: string): void => {
  const element =
    document.head.querySelector('#amorta-jsonld') ??
    document.createElement('script')

  element.setAttribute('id', 'amorta-jsonld')
  element.setAttribute('type', 'application/ld+json')
  element.textContent = jsonLd

  match(element.isConnected)
    .with(true, () => null)
    .otherwise(() => document.head.appendChild(element))
}
