import { describe, expect, it } from 'bun:test'

import {
  buildSeoMetadata,
  DEFAULT_PUBLIC_SITE_URL,
  resolvePublicSiteUrl,
} from '../src/domain/seo'

describe('resolvePublicSiteUrl', () => {
  it('falls back to the default site url when no value is provided', () => {
    expect(resolvePublicSiteUrl('')).toBe(DEFAULT_PUBLIC_SITE_URL)
  })

  it('normalizes a valid url to its origin', () => {
    expect(resolvePublicSiteUrl('https://amorta.vercel.app/app')).toBe(
      'https://amorta.vercel.app',
    )
  })

  it('removes trailing slashes from a bare site url', () => {
    expect(resolvePublicSiteUrl('https://amorta.example///')).toBe(
      'https://amorta.example',
    )
  })

  it('ignores unresolved placeholders', () => {
    expect(resolvePublicSiteUrl('__PUBLIC_SITE_URL__')).toBe(
      DEFAULT_PUBLIC_SITE_URL,
    )
  })
})

describe('buildSeoMetadata', () => {
  const siteUrl = 'https://amorta.example'

  it('builds root metadata for the calculator page', () => {
    const metadata = buildSeoMetadata({
      routeState: { kind: 'index', locale: 'es-AR' },
      locale: 'es-AR',
      siteUrl,
    })

    expect(metadata.title).toBe('Amorta | Calculadora de Amortización Francesa')
    expect(metadata.canonicalUrl).toBe(`${siteUrl}/es-AR`)
    expect(metadata.openGraphUrl).toBe(`${siteUrl}/es-AR`)
    expect(metadata.hreflangLinks).toContain(
      `<link rel="alternate" hreflang="es" href="${siteUrl}/es-ES" />`,
    )
    expect(metadata.hreflangLinks).toContain(
      `<link rel="alternate" hreflang="x-default" href="${siteUrl}/" />`,
    )
  })

  it('builds a result canonical url for valid shared routes', () => {
    const metadata = buildSeoMetadata({
      locale: 'en-US',
      routeState: {
        locale: null,
        kind: 'result',
        payload: 'abc123',
        decoded: {
          kind: 'valid',
          values: {
            loanAmount: '100000',
            years: '30',
            paymentsPerYear: 12,
            ear: '0.12',
            paymentAmount: '',
          },
        },
      },
      siteUrl,
    })

    expect(metadata.canonicalUrl).toBe(`${siteUrl}/result/abc123`)
    expect(metadata.openGraphUrl).toBe(`${siteUrl}/result/abc123`)
  })

  it('builds a generic result canonical url for pending prerendered shared routes', () => {
    const metadata = buildSeoMetadata({
      locale: 'en-US',
      routeState: {
        kind: 'result',
        locale: null,
        payload: null,
        decoded: {
          kind: 'pending',
          message: 'Loading shared result',
        },
      },
      siteUrl,
    })

    expect(metadata.canonicalUrl).toBe(`${siteUrl}/result`)
    expect(metadata.openGraphUrl).toBe(`${siteUrl}/result`)
    expect(metadata.hreflangLinks).toContain(
      `<link rel="alternate" hreflang="en" href="${siteUrl}/result" />`,
    )
    expect(metadata.title).toBe('Shared Result | Amorta')
  })

  it('falls back to the root canonical url for invalid shared routes', () => {
    const metadata = buildSeoMetadata({
      locale: 'en-US',
      routeState: {
        kind: 'result',
        payload: 'broken',
        locale: null,
        decoded: {
          kind: 'invalid',
          message: 'Invalid payload',
        },
      },
      siteUrl,
    })

    expect(metadata.canonicalUrl).toBe(`${siteUrl}/`)
    expect(metadata.openGraphUrl).toBe(`${siteUrl}/`)
    expect(metadata.title).toBe('Shared Result Unavailable | Amorta')
  })

  it('keeps the true root url slash for the default locale home page', () => {
    const metadata = buildSeoMetadata({
      locale: 'en-US',
      routeState: { kind: 'index', locale: null },
      siteUrl,
    })

    expect(metadata.canonicalUrl).toBe(`${siteUrl}/`)
    expect(metadata.openGraphUrl).toBe(`${siteUrl}/`)
    expect(metadata.hreflangLinks).toContain(
      `<link rel="alternate" hreflang="en" href="${siteUrl}/" />`,
    )
  })

  it('normalizes canonicals when the configured site url contains trailing slashes', () => {
    const metadata = buildSeoMetadata({
      locale: 'en-US',
      routeState: { kind: 'about', locale: null },
      siteUrl: 'https://amorta.example///',
    })

    expect(metadata.canonicalUrl).toBe('https://amorta.example/about')
    expect(metadata.openGraphImageUrl).toBe(
      'https://amorta.example/og-image.svg',
    )
  })

  it('uses article-specific seo copy when it exists', () => {
    const metadata = buildSeoMetadata({
      locale: 'en-US',
      routeState: {
        kind: 'blog-article',
        slug: 'comparing-loan-offers',
        locale: null,
      },
      siteUrl,
    })

    expect(metadata.title).toBe(
      'How to Compare Loan Offers Effectively | Amorta',
    )
    expect(metadata.description).toBe(
      'Compare loan offers like a pro. Learn to evaluate total cost, fees, prepayment penalties, and terms to find the best deal for your situation.',
    )
  })

  it('falls back to the regular article copy when seo-specific keys do not exist', () => {
    const metadata = buildSeoMetadata({
      locale: 'en-US',
      routeState: {
        kind: 'blog-article',
        slug: 'math-behind-french-amortization',
        locale: null,
      },
      siteUrl,
    })

    expect(metadata.title).toBe('The Math Behind French Amortization | Amorta')
    expect(metadata.description).toBe(
      'A deep dive into the annuity formula, periodic rate conversion, and how each payment splits between interest and principal over the life of a French loan.',
    )
  })
})
