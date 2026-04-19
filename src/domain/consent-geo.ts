import { match } from 'ts-pattern'

const GDPR_COUNTRIES = new Set([
  'AT',
  'BE',
  'BG',
  'CY',
  'CZ',
  'DE',
  'DK',
  'EE',
  'ES',
  'FI',
  'FR',
  'GR',
  'HR',
  'HU',
  'IE',
  'IT',
  'LT',
  'LU',
  'LV',
  'MT',
  'NL',
  'PL',
  'PT',
  'RO',
  'SE',
  'SI',
  'SK',
  'IS',
  'LI',
  'NO',
  'GB',
])

const COUNTRY_CACHE_KEY = 'amorta:country'

export const requiresConsentBanner = (
  country: string | null | undefined,
): boolean =>
  country == null || country === 'unknown' || GDPR_COUNTRIES.has(country)

export const readCachedCountry = (): string | null =>
  match(typeof sessionStorage)
    .with('undefined', () => null)
    .otherwise(() => sessionStorage.getItem(COUNTRY_CACHE_KEY))

export const cacheCountry = (country: string): void =>
  match(typeof sessionStorage)
    .with('undefined', () => undefined)
    .otherwise(() => {
      sessionStorage.setItem(COUNTRY_CACHE_KEY, country)
    })
