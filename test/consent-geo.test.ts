import { describe, expect, test } from 'bun:test'

import { requiresConsentBanner } from '../src/domain/consent-geo'

describe('requiresConsentBanner', () => {
  test('requires consent for EU countries', () => {
    expect(requiresConsentBanner('DE')).toBe(true)
    expect(requiresConsentBanner('FR')).toBe(true)
    expect(requiresConsentBanner('ES')).toBe(true)
    expect(requiresConsentBanner('PL')).toBe(true)
  })

  test('requires consent for EEA non-EU countries', () => {
    expect(requiresConsentBanner('NO')).toBe(true)
    expect(requiresConsentBanner('IS')).toBe(true)
    expect(requiresConsentBanner('LI')).toBe(true)
  })

  test('requires consent for UK', () => {
    expect(requiresConsentBanner('GB')).toBe(true)
  })

  test('does not require consent for non-regulated countries', () => {
    expect(requiresConsentBanner('US')).toBe(false)
    expect(requiresConsentBanner('AR')).toBe(false)
    expect(requiresConsentBanner('MX')).toBe(false)
    expect(requiresConsentBanner('JP')).toBe(false)
    expect(requiresConsentBanner('AU')).toBe(false)
  })

  test('requires consent when country is unknown (safe default)', () => {
    expect(requiresConsentBanner(null)).toBe(true)
    expect(requiresConsentBanner(undefined)).toBe(true)
    expect(requiresConsentBanner('unknown')).toBe(true)
  })
})
