import { ArrowLeft, Mail, Shield, FileText, Info } from 'lucide-react'
import { match } from 'ts-pattern'

import { buildLocalePath } from '../i18n/lingui.config'
import { useLocale, useTranslator } from '../state/locale.js'
import { Footer } from '../components/footer'

type PrivacyPolicyPageProps = {
  routeState: Extract<
    import('../domain/share').RouteState,
    { kind: 'privacy-policy' }
  >
}

export const PrivacyPolicyPage = (_props: PrivacyPolicyPageProps) => {
  const { _ } = useTranslator()
  const currentLocale = useLocale()

  const goBack = (): void => {
    window.location.assign(buildLocalePath(currentLocale, '/'))
  }

  return (
    <LegalPageLayout
      title={_('privacyPolicyTitle')}
      icon={<Shield size={24} />}
      goBack={goBack}
    >
      <LegalSection title={_('privacyIntroductionTitle')}>
        <p>{_('privacyIntroductionText')}</p>
      </LegalSection>

      <LegalSection title={_('privacyDataCollectionTitle')}>
        <p>{_('privacyDataCollectionText')}</p>
        <ul className="legal-list">
          <li>{_('privacyDataCollectionPersonal')}</li>
          <li>{_('privacyDataCollectionNonPersonal')}</li>
        </ul>
      </LegalSection>

      <LegalSection title={_('privacyDataUsageTitle')}>
        <p>{_('privacyDataUsageText')}</p>
        <ul className="legal-list">
          <li>{_('privacyDataUsageAnalytics')}</li>
          <li>{_('privacyDataUsageCommunication')}</li>
          <li>{_('privacyDataUsageImprovement')}</li>
        </ul>
      </LegalSection>

      <LegalSection title={_('privacyCookiesTitle')}>
        <p>{_('privacyCookiesText')}</p>
        <p>{_('privacyCookiesPurpose')}</p>
      </LegalSection>

      <LegalSection title={_('privacyThirdPartyTitle')}>
        <p>{_('privacyThirdPartyText')}</p>
        <p>{_('privacyThirdPartyAdsense')}</p>
        <p>{_('privacyThirdPartyCookies')}</p>
      </LegalSection>

      <LegalSection title={_('privacyUserRightsTitle')}>
        <p>{_('privacyUserRightsText')}</p>
      </LegalSection>

      <LegalSection title={_('privacyContactTitle')}>
        <p>{_('privacyContactText')}</p>
        <a href={`mailto:${_('contactEmail')}`} className="legal-contact-link">
          <Mail size={16} />
          {_('contactEmail')}
        </a>
      </LegalSection>
    </LegalPageLayout>
  )
}

type AboutPageProps = {
  routeState: Extract<import('../domain/share').RouteState, { kind: 'about' }>
}

export const AboutPage = (_props: AboutPageProps) => {
  const { _ } = useTranslator()
  const currentLocale = useLocale()

  const goBack = (): void => {
    window.location.assign(buildLocalePath(currentLocale, '/'))
  }

  return (
    <LegalPageLayout
      title={_('aboutTitle')}
      icon={<Info size={24} />}
      goBack={goBack}
    >
      <LegalSection title={_('aboutIdentityTitle')}>
        <p>
          {_('aboutIdentityText')
            .split('joaco.io')
            .map((part, index, arr) => (
              <>
                {part}
                {index < arr.length - 1 && (
                  <a
                    href="https://joaco.io"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    joaco.io
                  </a>
                )}
              </>
            ))}
        </p>
      </LegalSection>

      <LegalSection title={_('aboutPurposeTitle')}>
        <p>{_('aboutPurposeText')}</p>
      </LegalSection>

      <LegalSection title={_('aboutAudienceTitle')}>
        <p>{_('aboutAudienceText')}</p>
      </LegalSection>

      <LegalSection title={_('aboutCredibilityTitle')}>
        <p>{_('aboutCredibilityText')}</p>
      </LegalSection>

      <LegalSection title={_('aboutTransparencyTitle')}>
        <p>{_('aboutTransparencyText')}</p>
      </LegalSection>
    </LegalPageLayout>
  )
}

type ContactPageProps = {
  routeState: Extract<import('../domain/share').RouteState, { kind: 'contact' }>
}

export const ContactPage = (_props: ContactPageProps) => {
  const { _ } = useTranslator()
  const currentLocale = useLocale()

  const goBack = (): void => {
    window.location.assign(buildLocalePath(currentLocale, '/'))
  }

  return (
    <LegalPageLayout
      title={_('contactTitle')}
      icon={<Mail size={24} />}
      goBack={goBack}
    >
      <LegalSection title={_('contactMethodsTitle')}>
        <p>{_('contactMethodsText')}</p>
        <div className="legal-contact-methods">
          <a
            href={`mailto:${_('contactEmail')}`}
            className="legal-contact-card"
          >
            <Mail size={20} />
            <span>{_('contactEmail')}</span>
          </a>
        </div>
      </LegalSection>

      <LegalSection title={_('contactResponseTitle')}>
        <p>{_('contactResponseText')}</p>
      </LegalSection>
    </LegalPageLayout>
  )
}

type TermsPageProps = {
  routeState: Extract<import('../domain/share').RouteState, { kind: 'terms' }>
}

export const TermsPage = (_props: TermsPageProps) => {
  const { _ } = useTranslator()
  const currentLocale = useLocale()

  const goBack = (): void => {
    window.location.assign(buildLocalePath(currentLocale, '/'))
  }

  return (
    <LegalPageLayout
      title={_('termsTitle')}
      icon={<FileText size={24} />}
      goBack={goBack}
    >
      <LegalSection title={_('termsAcceptanceTitle')}>
        <p>{_('termsAcceptanceText')}</p>
      </LegalSection>

      <LegalSection title={_('termsContentUseTitle')}>
        <p>{_('termsContentUseText')}</p>
      </LegalSection>

      <LegalSection title={_('termsIntellectualPropertyTitle')}>
        <p>{_('termsIntellectualPropertyText')}</p>
      </LegalSection>

      <LegalSection title={_('termsLiabilityTitle')}>
        <p>{_('termsLiabilityText')}</p>
      </LegalSection>

      <LegalSection title={_('termsExternalLinksTitle')}>
        <p>{_('termsExternalLinksText')}</p>
      </LegalSection>

      <LegalSection title={_('termsModificationsTitle')}>
        <p>{_('termsModificationsText')}</p>
      </LegalSection>
    </LegalPageLayout>
  )
}

const LegalPageLayout = ({
  title,
  icon,
  goBack,
  children,
}: {
  title: string
  icon: React.ReactNode
  goBack: () => void
  children: React.ReactNode
}) => {
  const { _ } = useTranslator()

  return (
    <main className="app-shell">
      <div className="app-layout">
        <div className="article-toolbar">
          <button
            type="button"
            className="action-button action-button--secondary"
            onClick={goBack}
          >
            <ArrowLeft size={16} />
            <span>{_('backToCalculator')}</span>
          </button>
        </div>

        <article className="article-body legal-body">
          <header className="article-header legal-header">
            <div className="legal-icon">{icon}</div>
            <h1 className="article-title">{title}</h1>
          </header>
          <div className="article-content legal-content">{children}</div>
        </article>

        <Footer />
      </div>
    </main>
  )
}

const LegalSection = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => (
  <section className="legal-section">
    <h2 className="legal-section-title">{title}</h2>
    {children}
  </section>
)
