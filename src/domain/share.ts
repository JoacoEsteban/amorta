import { P, match } from 'ts-pattern'

import type { LoanFormValues } from './amortization'
import { validateShareableLoanState } from '../typia/generated/shareable-loan-state'

export type ShareableLoanState = LoanFormValues

export type ShareDecodeResult =
  | {
      kind: 'pending'
      message: string
    }
  | {
      kind: 'valid'
      values: ShareableLoanState
    }
  | {
      kind: 'missing'
      message: string
    }
  | {
      kind: 'invalid'
      message: string
    }

export type RouteState =
  | {
      kind: 'index'
    }
  | {
      kind: 'result'
      payload: string | null
      decoded: ShareDecodeResult
    }

export type RouteParsePhase = 'prerender' | 'resolved'

const BASE64URL_PAD_LENGTH = 4

const normalizePayloadSegment = (payload: string | null): string | null =>
  match(payload)
    .with(null, () => null)
    .otherwise((value) => value.trim().replace(/^\/+/, '').replace(/\/+$/, ''))

const encodeBase64 = (input: string): string =>
  match(typeof window)
    .with('undefined', () => Buffer.from(input, 'utf8').toString('base64url'))
    .otherwise(() =>
      btoa(input).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, ''),
    )

const decodeBase64 = (input: string): string | null => {
  const padding = match(input.length % BASE64URL_PAD_LENGTH)
    .with(0, () => '')
    .otherwise((remainder) => '='.repeat(BASE64URL_PAD_LENGTH - remainder))
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/') + padding

  return match(typeof window)
    .with('undefined', () =>
      match(
        (() => {
          try {
            return Buffer.from(normalized, 'base64').toString('utf8')
          } catch {
            return null
          }
        })(),
      )
        .with(null, () => null)
        .otherwise((value) => value),
    )
    .otherwise(() =>
      match(
        (() => {
          try {
            return atob(normalized)
          } catch {
            return null
          }
        })(),
      )
        .with(null, () => null)
        .otherwise((value) => value),
    )
}

export const buildSharePayload = (values: ShareableLoanState): string =>
  encodeBase64(JSON.stringify(values))

export const buildShareUrl = (
  values: ShareableLoanState,
  location: Pick<Location, 'origin'>,
): string => {
  const shareUrl = new URL('/result/', location.origin)

  shareUrl.pathname = `/result/${encodeURIComponent(buildSharePayload(values))}`

  return shareUrl.toString()
}

export const decodeSharePayload = (payload: string | null): ShareDecodeResult =>
  match(normalizePayloadSegment(payload))
    .with(null, () => ({
      kind: 'missing' as const,
      message: 'No shared result was provided in the URL.',
    }))
    .with('', () => ({
      kind: 'missing' as const,
      message: 'No shared result was provided in the URL.',
    }))
    .otherwise((rawPayload) => {
      const normalizedPayload = (() => {
        try {
          return decodeURIComponent(rawPayload)
        } catch {
          return rawPayload
        }
      })()
      const decodedText = decodeBase64(normalizedPayload)

      return match(decodedText)
        .with(null, () => ({
          kind: 'invalid' as const,
          message: 'The shared result could not be decoded.',
        }))
        .otherwise((resolvedDecodedText) =>
          match(
            (() => {
              try {
                return JSON.parse(resolvedDecodedText) as unknown
              } catch {
                return null
              }
            })(),
          )
            .with(null, () => ({
              kind: 'invalid' as const,
              message: 'The shared result is not valid JSON.',
            }))
            .otherwise((parsed) =>
              match(validateShareableLoanState(parsed))
                .with({ success: false }, () => ({
                  kind: 'invalid' as const,
                  message:
                    'The shared result does not match the expected data format.',
                }))
                .otherwise(({ data }) => ({
                  kind: 'valid' as const,
                  values: data,
                })),
            ),
        )
    })

const toUrl = (input: string | URL): URL =>
  match(input)
    .with(P.instanceOf(URL), (resolvedUrl) => resolvedUrl)
    .otherwise((rawInput) => new URL(rawInput, 'https://amorta.local'))

export const buildPendingResultState = (
  payload: string | null,
): RouteState => ({
  kind: 'result',
  payload,
  decoded: {
    kind: 'pending',
    message: 'Loading the shared result from the URL.',
  },
})

export const parseRouteState = (
  input: string | URL,
  phase: RouteParsePhase = 'resolved',
): RouteState => {
  const url = toUrl(input)
  const segments = url.pathname
    .split('/')
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0)

  return match(segments[0])
    .with('result', () => {
      const payload = normalizePayloadSegment(segments[1] ?? null)

      return match(phase)
        .with('prerender', () => buildPendingResultState(payload))
        .otherwise(() => ({
          kind: 'result' as const,
          payload,
          decoded: decodeSharePayload(payload),
        }))
    })
    .otherwise(() => ({ kind: 'index' as const }))
}
