import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { Landmark, Percent, ChevronsUpDown, Download } from 'lucide-react'
import { P, match } from 'ts-pattern'
import type { RouteState } from '../domain/share'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
import { QuotaTable } from '../components/quota-table'
import { ExportModal } from '../components/export-modal'
import { EducationalSection } from '../components/educational-section'
import { ArticleRecommendations } from '../components/article-recommendations'
import { ShareButton } from '../components/share-button'
import { getHomepageRecommendedArticles } from '../domain/blog'
import {
  InteractiveChart,
  StaticChartPreview,
  PendingChartState,
} from '../components/charts'
import { LoanForm } from '../components/loan-form'
import { Footer } from '../components/footer'
import { type LoanStore } from '../state/loan-store'
import type { UIStore } from '../state/ui-store'
import { buildLocalePath, type SupportedLocale } from '../i18n/lingui.config'
import { cn } from '../lib/utils'
import { useLocale, useTranslator } from '../state/locale.js'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})

const percentFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 3,
})

const formatCurrency = (value: number): string =>
  currencyFormatter.format(value)

const formatPercent = (value: number): string => percentFormatter.format(value)

const makeLocaleNavigator =
  (locale: SupportedLocale) =>
  (pathname: string): void => {
    match(typeof window)
      .with('undefined', () => null)
      .otherwise(() => {
        const fullPath = buildLocalePath(locale, pathname)
        window.location.assign(fullPath)
        return null
      })
  }

export type CalculatorPageRouteState =
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

export type CalculatorPageProps = {
  routeState: CalculatorPageRouteState
  store: LoanStore
  hydrated: boolean
  uiStore: UIStore
}

export const CalculatorPage = ({
  routeState,
  store,
  hydrated,
  uiStore,
}: CalculatorPageProps) => {
  const { values, mode, calculation, storeMode } = store.useDashboardViewModel()
  const { tableExpanded } = uiStore.useUIViewModel()
  const [exportOpen, setExportOpen] = useState(false)
  const isPaymentDriven = mode === 'payment'
  const isReadonly = storeMode === 'shared-result'
  const isPendingResult =
    routeState.kind === 'result' && routeState.decoded.kind === 'pending'
  const showInteractiveChart = hydrated && !isPendingResult
  const displayedEarValue = match({
    isPaymentDriven,
    calculation,
    isPendingResult,
  })
    .with(
      {
        isPaymentDriven: true,
        isPendingResult: false,
        calculation: { kind: 'ready' },
      },
      ({ calculation: readyCalculation }) =>
        formatPercent(readyCalculation.ear),
    )
    .with({ isPaymentDriven: true }, () => '')
    .otherwise(() => values.ear)

  const { _ } = useTranslator()

  const locale = useLocale()
  const navigateTo = useMemo(() => makeLocaleNavigator(locale), [locale])

  const shareDisabled = !hydrated || isPendingResult

  return (
    <main className="app-shell">
      <div className="app-layout">
        <div className="page-toolbar">
          <div className="page-toolbar__copy">
            <p className="page-kicker">
              {match({ storeMode, isPendingResult })
                .with({ isPendingResult: true }, () => _('sharedResult'))
                .with({ storeMode: 'shared-result' }, () => _('sharedResult'))
                .otherwise(() => _('liveCalculator'))}
            </p>
            <h1 className="page-title">
              {match({ storeMode, isPendingResult })
                .with({ storeMode: 'shared-result' }, () =>
                  _('sharedFrenchAmortizationResult'),
                )
                .otherwise(() => _('frenchAmortizationCalculator'))}
            </h1>
            <p className="page-summary">
              {match({ storeMode, isPendingResult })
                .with({ storeMode: 'shared-result' }, () =>
                  _('reviewSharedResultSummary'),
                )
                .otherwise(() => _('modelFrenchLoanSummary'))}
            </p>
          </div>
          <div className="page-toolbar__actions">
            <ShareButton
              values={values}
              disabled={shareDisabled}
              title={match(isPendingResult)
                .with(true, () => _('loadingSharedResultTooltip'))
                .otherwise(() => undefined)}
            />
          </div>
        </div>

        <section className="app-grid">
          <LoanForm
            values={values}
            store={store}
            storeMode={storeMode}
            isReadonly={isReadonly}
            isPaymentDriven={isPaymentDriven}
            isPendingResult={isPendingResult}
            displayedEarValue={displayedEarValue}
            routeState={routeState}
            onNavigate={navigateTo}
          />

          <div className="dashboard-stack">
            <div className="summary-grid">
              <SummaryCard
                icon={<Landmark />}
                label={_('activePayment')}
                value={match({ calculation, isPendingResult })
                  .with({ isPendingResult: true }, () =>
                    _('loadingSharedResult'),
                  )
                  .with(
                    { calculation: { kind: 'ready' } },
                    ({ calculation: ready }) => formatCurrency(ready.payment),
                  )
                  .otherwise(() => _('waitingForValidInputs'))}
              />
              <SummaryCard
                icon={<Percent />}
                label={_('activeEAR')}
                value={match({ calculation, isPendingResult })
                  .with({ isPendingResult: true }, () =>
                    _('loadingSharedResult'),
                  )
                  .with(
                    { calculation: { kind: 'ready' } },
                    ({ calculation: ready }) => formatPercent(ready.ear),
                  )
                  .otherwise(() => _('waitingForValidInputs'))}
              />
              <SummaryCard
                icon={<Landmark />}
                label={_('repaymentHorizon')}
                value={match({ calculation, isPendingResult })
                  .with({ isPendingResult: true }, () =>
                    _('loadingSharedResult'),
                  )
                  .with(
                    { calculation: { kind: 'ready' } },
                    ({ calculation: ready }) =>
                      _('installmentsAtRate', {
                        count: ready.paymentCount,
                        rate: ready.paymentsPerYear,
                      }),
                  )
                  .otherwise(() => _('waitingForValidInputs'))}
              />
            </div>

            <Card className="panel-card panel-card--chart flex-1">
              <CardHeader className="panel-card__header panel-card__header--plain">
                <CardTitle>{_('amortizationGraph')}</CardTitle>
                <CardDescription>
                  {match({ hydrated, isPendingResult })
                    .with({ isPendingResult: true }, () =>
                      _('chartPendingSharedResult'),
                    )
                    .with({ hydrated: false }, () => _('chartPrerendered'))
                    .otherwise(() => _('chartInteractive'))}
                </CardDescription>
              </CardHeader>
              <CardContent className="panel-card__content chart-stack">
                {match({ calculation, showInteractiveChart, isPendingResult })
                  .with({ isPendingResult: true }, () => <PendingChartState />)
                  .with(
                    { calculation: { kind: 'invalid' } },
                    ({ calculation: invalid }) => (
                      <div className="error-box">
                        <p className="error-box__title">
                          {_('chartCannotGraph')}
                        </p>
                        <ul className="error-box__list">
                          {invalid.errors.map((error) => (
                            <li key={error}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    ),
                  )
                  .with(
                    {
                      calculation: { kind: 'ready' },
                      showInteractiveChart: false,
                    },
                    ({ calculation: ready }) => (
                      <StaticChartPreview calculation={ready} />
                    ),
                  )
                  .with(
                    {
                      calculation: { kind: 'ready' },
                      showInteractiveChart: true,
                    },
                    ({ calculation: ready }) => (
                      <InteractiveChart calculation={ready} />
                    ),
                  )
                  .exhaustive()}
              </CardContent>
            </Card>

            {match({ calculation, isPendingResult })
              .with(
                { calculation: { kind: 'ready' } },
                ({ calculation: ready }) => (
                  <Card className="panel-card panel-card--chart">
                    <CardHeader
                      className={cn(
                        'panel-card__header panel-card__header--plain flex max-lg:flex-col gap-3 justify-between',
                      )}
                    >
                      <div>
                        <CardTitle>{_('amortizationSchedule')}</CardTitle>
                        <CardDescription>
                          {_('scheduleExpandDescription')}
                        </CardDescription>
                      </div>

                      <div className="flex max-sm:flex-col justify-end gap-3">
                        <button
                          type="button"
                          className="action-button action-button--primary h-fit"
                          onClick={() => uiStore.toggleTableExpanded()}
                        >
                          <ChevronsUpDown size={16} />
                          <span>
                            {tableExpanded ? _('collapseAll') : _('expandAll')}
                          </span>
                        </button>
                        <button
                          type="button"
                          className="action-button action-button--secondary h-fit"
                          onClick={() => setExportOpen(true)}
                        >
                          <Download size={16} />
                          <span>{_('exportSchedule')}</span>
                        </button>
                      </div>
                    </CardHeader>
                    <CardContent className="panel-card__content">
                      <QuotaTable
                        calculation={ready}
                        expanded={tableExpanded}
                      />
                    </CardContent>
                  </Card>
                ),
              )
              .otherwise(() => null)}
          </div>
        </section>

        <EducationalSection />

        <ArticleRecommendations
          articles={getHomepageRecommendedArticles()}
          titleKey="homepageArticlesTitle"
          subtitleKey="homepageArticlesDescription"
        />

        {match({ calculation, isPendingResult })
          .with(
            { calculation: { kind: 'ready' } },
            ({ calculation: ready }) => (
              <ExportModal
                open={exportOpen}
                onOpenChange={setExportOpen}
                calculation={ready}
              />
            ),
          )
          .otherwise(() => null)}

        <Footer />
      </div>
    </main>
  )
}

const SummaryCard = ({
  icon,
  label,
  value,
}: {
  icon: ReactNode
  label: string
  value: string
}) => (
  <Card className="summary-card">
    <CardContent className="summary-card__content">
      <div className="summary-icon">{icon}</div>
      <div className="summary-copy">
        <p className="summary-label">{label}</p>
        <p className="summary-value">{value}</p>
      </div>
    </CardContent>
  </Card>
)
