import {
  ConsentManagerDialog,
  ConsentManagerProvider,
  CookieBanner,
  useConsentManager,
} from '@c15t/react'
import type { Script, TranslationConfig } from 'c15t'
import type { ReactNode } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { match } from 'ts-pattern'
import { useEffect, useMemo, useState } from 'react'

import { buildLocalePath, type SupportedLocale } from '../i18n/lingui.config'
import { useLocale, useTranslator, type Translate } from '../state/locale'
import {
  cacheCountry,
  readCachedCountry,
  requiresConsentBanner,
} from '../domain/consent-geo'

const readGaMeasurementId = (): string =>
  match(typeof document)
    .with('undefined', () => '')
    .otherwise(
      () =>
        document
          .querySelector('meta[name="amorta:ga-measurement-id"]')
          ?.getAttribute('content')
          ?.trim() ?? '',
    )

const buildManagedScripts = (): Script[] => {
  const gaMeasurementId = readGaMeasurementId()

  const baseScripts: Script[] = [
    {
      id: 'ahrefs-analytics',
      src: 'https://analytics.ahrefs.com/analytics.js',
      category: 'measurement',
      async: true,
      attributes: {
        'data-key': '5H5ARZLg5Z/AIBPl/TAwQg',
      },
    },
    {
      id: 'google-adsense',
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8407180754020844',
      category: 'marketing',
      async: true,
      attributes: {
        crossorigin: 'anonymous',
      },
    },
  ]

  const gaScripts = match(gaMeasurementId)
    .with('', () => [] as Script[])
    .otherwise(
      (measurementId) =>
        [
          {
            id: 'google-analytics-tag',
            src: `https://www.googletagmanager.com/gtag/js?id=${measurementId}`,
            category: 'measurement',
            async: true,
          },
          {
            id: 'google-analytics-config',
            category: 'measurement',
            textContent: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${measurementId}');`,
          },
        ] as Script[],
    )

  return [...baseScripts, ...gaScripts]
}

const buildConsentTranslations = ({
  locale,
  _,
}: {
  locale: SupportedLocale
  _: Translate
}): TranslationConfig => ({
  defaultLanguage: locale,
  disableAutoLanguageSwitch: true,
  translations: {
    [locale]: {
      common: {
        acceptAll: _('consentAcceptAll'),
        rejectAll: _('consentRejectAll'),
        customize: _('consentCustomize'),
        save: _('consentSavePreferences'),
      },
      cookieBanner: {
        title: _('consentCookieBannerTitle'),
        description: _('consentCookieBannerDescription'),
      },
      consentManagerDialog: {
        title: _('consentDialogTitle'),
        description: _('consentDialogDescription'),
      },
      consentTypes: {
        necessary: {
          title: _('consentNecessaryTitle'),
          description: _('consentNecessaryDescription'),
        },
        measurement: {
          title: _('consentMeasurementTitle'),
          description: _('consentMeasurementDescription'),
        },
        marketing: {
          title: _('consentMarketingTitle'),
          description: _('consentMarketingDescription'),
        },
      },
      legalLinks: {
        privacyPolicy: _('consentPrivacyPolicyLabel'),
        termsOfService: _('consentTermsLabel'),
      },
    },
  },
})

const ConsentLocaleSync = ({
  locale,
  translationConfig,
}: {
  locale: SupportedLocale
  translationConfig: TranslationConfig
}) => {
  const { setTranslationConfig, setOverrides } = useConsentManager()

  useEffect(() => {
    setTranslationConfig(translationConfig)
    setOverrides({ language: locale })
  }, [locale, setOverrides, setTranslationConfig, translationConfig])

  return null
}

const ConsentAwareAnalytics = () => {
  const { has } = useConsentManager()

  return match(has('measurement'))
    .with(true, () => <Analytics />)
    .otherwise(() => null)
}

export const ConsentManager = ({ children }: { children: ReactNode }) => {
  const locale = useLocale()
  const { _ } = useTranslator()
  const [country, setCountry] = useState<string | null>(() =>
    readCachedCountry(),
  )

  useEffect(() => {
    if (country !== null) return
    fetch('/api/geo')
      .then((r) => r.json())
      .then(({ country: fetched }: { country: string }) => {
        cacheCountry(fetched)
        setCountry(fetched)
      })
  }, [country])

  const consentEnabled = requiresConsentBanner(country)

  const translationConfig = useMemo(
    () => buildConsentTranslations({ locale, _ }),
    [locale, _],
  )

  return (
    <ConsentManagerProvider
      options={{
        enabled: consentEnabled,
        mode: 'offline',
        overrides: {
          language: locale,
        },
        translations: translationConfig,
        consentCategories: ['necessary', 'measurement', 'marketing'],
        scripts: buildManagedScripts(),
        legalLinks: {
          privacyPolicy: {
            href: buildLocalePath(locale, '/privacy-policy/'),
            label: _('consentPrivacyPolicyLabel'),
          },
          termsOfService: {
            href: buildLocalePath(locale, '/terms/'),
            label: _('consentTermsLabel'),
          },
        },
      }}
    >
      {children}
      {consentEnabled && (
        <CookieBanner legalLinks={['privacyPolicy', 'termsOfService']} />
      )}
      {consentEnabled && <ConsentManagerDialog />}
      <ConsentLocaleSync
        locale={locale}
        translationConfig={translationConfig}
      />
      <ConsentAwareAnalytics />
    </ConsentManagerProvider>
  )
}
