import { describe, expect, test } from 'bun:test'
import { match } from 'ts-pattern'

import {
  buildSharePayload,
  buildShareUrl,
  decodeSharePayload,
  parseRouteState,
  type ShareableLoanState,
} from '../src/domain/share'

const sampleState: ShareableLoanState = {
  loanAmount: '250000',
  years: '30',
  paymentsPerYear: 12,
  ear: '0.12',
  paymentAmount: '',
}

describe('share codec', () => {
  test('round-trips a valid shareable state', () => {
    const payload = buildSharePayload(sampleState)
    const decoded = decodeSharePayload(payload)

    expect(decoded.kind).toBe('valid')

    match(decoded)
      .with({ kind: 'valid' }, ({ values }) => {
        expect(values).toEqual(sampleState)
      })
      .otherwise(() => {
        throw new Error('Expected a valid decoded payload')
      })
  })

  test('rejects malformed payloads', () => {
    const decoded = decodeSharePayload('%%%')

    expect(decoded.kind).toBe('invalid')
  })

  test('rejects payloads with the wrong DTO shape', () => {
    const invalidPayload = Buffer.from(
      JSON.stringify({
        ...sampleState,
        paymentsPerYear: 5,
      }),
      'utf8',
    ).toString('base64url')

    const decoded = decodeSharePayload(invalidPayload)

    expect(decoded.kind).toBe('invalid')
  })

  test('builds a result URL without the default locale prefix', () => {
    const shareUrl = buildShareUrl(
      sampleState,
      {
        origin: 'https://example.com',
      },
      'en-US',
    )

    expect(shareUrl.startsWith('https://example.com/result/')).toBe(true)
    expect(shareUrl.includes('/en-US/result/')).toBe(false)
  })
})

describe('route parsing', () => {
  test('parses the index route', () => {
    const route = parseRouteState('https://example.com/', 'resolved')

    expect(route.kind).toBe('index')
    expect(route.locale).toBeNull()
  })

  test('parses a valid result route', () => {
    const payload = buildSharePayload(sampleState)
    const route = parseRouteState(
      `https://example.com/result/${payload}`,
      'resolved',
    )

    expect(route.kind).toBe('result')

    match(route)
      .with({ kind: 'result', decoded: { kind: 'valid' } }, ({ decoded }) => {
        expect(decoded.values).toEqual(sampleState)
      })
      .otherwise(() => {
        throw new Error('Expected a valid result route')
      })
  })

  test('parses a valid result route with a trailing slash', () => {
    const payload = buildSharePayload(sampleState)
    const route = parseRouteState(
      `https://example.com/result/${payload}/`,
      'resolved',
    )

    match(route)
      .with({ kind: 'result', decoded: { kind: 'valid' } }, ({ decoded }) => {
        expect(decoded.values).toEqual(sampleState)
      })
      .otherwise(() => {
        throw new Error('Expected a valid result route with trailing slash')
      })
  })

  test('treats /result without a payload as missing', () => {
    const route = parseRouteState('https://example.com/result', 'resolved')

    match(route)
      .with({ kind: 'result', decoded: { kind: 'missing' } }, ({ decoded }) => {
        expect(decoded.message.length > 0).toBe(true)
      })
      .otherwise(() => {
        throw new Error('Expected a missing shared result')
      })
  })

  test('parses a result route from a URL object', () => {
    const payload = buildSharePayload(sampleState)
    const route = parseRouteState(
      new URL(`https://example.com/result/${payload}`),
      'resolved',
    )

    match(route)
      .with({ kind: 'result', decoded: { kind: 'valid' } }, ({ decoded }) => {
        expect(decoded.values).toEqual(sampleState)
      })
      .otherwise(() => {
        throw new Error('Expected a valid result route from URL object')
      })
  })

  test('parses result routes as pending during prerender', () => {
    const payload = buildSharePayload(sampleState)
    const route = parseRouteState(
      `https://example.com/result/${payload}`,
      'prerender',
    )

    match(route)
      .with({ kind: 'result', decoded: { kind: 'pending' } }, ({ decoded }) => {
        expect(decoded.message.length > 0).toBe(true)
      })
      .otherwise(() => {
        throw new Error('Expected a pending prerender route')
      })
  })

  test('parses locale-prefixed index route', () => {
    const route = parseRouteState('https://example.com/es-ES', 'resolved')

    expect(route.kind).toBe('index')
    expect(route.locale).toBe('es-ES')
  })

  test('parses locale-prefixed result route', () => {
    const payload = buildSharePayload(sampleState)
    const route = parseRouteState(
      `https://example.com/es-ES/result/${payload}`,
      'resolved',
    )

    expect(route.kind).toBe('result')
    expect(route.locale).toBe('es-ES')

    match(route)
      .with({ kind: 'result', decoded: { kind: 'valid' } }, ({ decoded }) => {
        expect(decoded.values).toEqual(sampleState)
      })
      .otherwise(() => {
        throw new Error('Expected a valid result route with locale prefix')
      })
  })

  test('parses language-only locale prefix', () => {
    const route = parseRouteState('https://example.com/es', 'resolved')

    expect(route.kind).toBe('index')
    expect(route.locale).toBe('es-ES')
  })

  test('treats unknown locale prefix as regular path, does not strip it', () => {
    const route = parseRouteState('https://example.com/it', 'resolved')

    expect(route.kind).toBe('index')
    expect(route.locale).toBeNull()
  })
})
