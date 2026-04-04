import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  Landmark,
  Percent,
  PencilLine,
  RotateCcw,
  Share2,
  Wallet,
  ChevronsUpDown,
  Download,
} from 'lucide-react'
import { P, match } from 'ts-pattern'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  type TooltipContentProps,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent'

import type { PaymentFrequency } from './domain/amortization'
import type { RouteState } from './domain/share'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './components/ui/card'
import { QuotaTable } from './components/quota-table'
import { ExportModal } from './components/export-modal'
import { EducationalSection } from './components/educational-section'
import { ShareButton } from './components/share-button'
import { BlogIndexPage, ArticlePage } from './pages/blog'
import {
  PrivacyPolicyPage,
  AboutPage,
  ContactPage,
  TermsPage,
} from './pages/legal'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import { Select } from './components/ui/select'
import { Footer } from './components/footer'
import {
  clearLoanStateFromLocalStorage,
  type LoanStore,
  saveLoanStateToLocalStorage,
} from './state/loan-store'
import type { UIStore } from './state/ui-store'
import { buildLocalePath, type SupportedLocale } from './i18n/lingui.config'
import { cn } from './lib/utils'
import {
  useLocale,
  useTranslator,
  type Translate,
  type Translator,
} from './state/locale.js'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})

const compactCurrencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1,
})

const percentFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 3,
})

const parseFrequency = (rawValue: string): PaymentFrequency =>
  match(Number(rawValue))
    .with(1, () => 1 as const)
    .with(3, () => 3 as const)
    .with(6, () => 6 as const)
    .otherwise(() => 12 as const)

const formatCurrency = (value: number): string =>
  currencyFormatter.format(value)

const formatCompactCurrency = (value: number): string =>
  compactCurrencyFormatter.format(value)

const formatPercent = (value: number): string => percentFormatter.format(value)

const formatShareOfTotal = (value: number, total: number): string =>
  match(total > 0)
    .with(true, () => formatPercent(value / total))
    .otherwise(() => '0%')

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

type AppProps =
  | {
      kind: 'calculator'
      uiStore: UIStore
      routeState:
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
      store: LoanStore
      hydrated: boolean
    }
  | {
      kind: 'invalid-result'
      routeState: {
        kind: 'result'
        payload: string | null
        decoded: Extract<
          RouteState,
          { kind: 'result' }
        >['decoded'] extends infer T
          ? Exclude<T, { kind: 'valid' | 'pending' }>
          : never
      }
      hydrated: boolean
    }
  | {
      kind: 'blog-index'
      routeState: Extract<RouteState, { kind: 'blog-index' }>
    }
  | {
      kind: 'blog-article'
      routeState: Extract<RouteState, { kind: 'blog-article' }>
    }
  | {
      kind: 'privacy-policy'
      routeState: Extract<RouteState, { kind: 'privacy-policy' }>
    }
  | {
      kind: 'about'
      routeState: Extract<RouteState, { kind: 'about' }>
    }
  | {
      kind: 'contact'
      routeState: Extract<RouteState, { kind: 'contact' }>
    }
  | {
      kind: 'terms'
      routeState: Extract<RouteState, { kind: 'terms' }>
    }

export const App = (props: AppProps) =>
  match(props)
    .with({ kind: 'invalid-result' }, ({ routeState }) => (
      <InvalidResultPage routeState={routeState} />
    ))
    .with(
      { kind: 'calculator' },
      ({ routeState, store, hydrated, uiStore }) => (
        <CalculatorPage
          routeState={routeState}
          store={store}
          hydrated={hydrated}
          uiStore={uiStore}
        />
      ),
    )
    .with({ kind: 'blog-index' }, ({ routeState }) => (
      <BlogIndexPage routeState={routeState} />
    ))
    .with({ kind: 'blog-article' }, ({ routeState }) => (
      <ArticlePage routeState={routeState} />
    ))
    .with({ kind: 'privacy-policy' }, ({ routeState }) => (
      <PrivacyPolicyPage routeState={routeState} />
    ))
    .with({ kind: 'about' }, ({ routeState }) => (
      <AboutPage routeState={routeState} />
    ))
    .with({ kind: 'contact' }, ({ routeState }) => (
      <ContactPage routeState={routeState} />
    ))
    .with({ kind: 'terms' }, ({ routeState }) => (
      <TermsPage routeState={routeState} />
    ))
    .exhaustive()

const CalculatorPage = ({
  routeState,
  store,
  hydrated,
  uiStore,
}: {
  routeState:
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
  store: LoanStore
  hydrated: boolean
  uiStore: UIStore
}) => {
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

  const paymentFrequencyOptions: Array<{
    label: string
    value: PaymentFrequency
  }> = [
    { label: _('frequencyOnePayment'), value: 1 },
    { label: _('frequencyThreePayments'), value: 3 },
    { label: _('frequencySixPayments'), value: 6 },
    { label: _('frequencyTwelvePayments'), value: 12 },
  ]

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
          <Card className="panel-card panel-card--inputs h-fit xl:sticky top-6">
            <CardHeader className="panel-card__header panel-card__header--accent">
              <CardTitle>
                {match({ storeMode, isPendingResult })
                  .with({ isPendingResult: true }, () => _('sharedInputs'))
                  .with({ storeMode: 'shared-result' }, () => _('sharedInputs'))
                  .otherwise(() => _('frenchMortgageInputs'))}
              </CardTitle>
              <CardDescription>
                {match({ storeMode, isPendingResult, hydrated })
                  .with({ storeMode: 'shared-result' }, () =>
                    _('sharedInputsDescription'),
                  )
                  .otherwise(() => _('changeValueDescription'))}
              </CardDescription>
            </CardHeader>
            <CardContent className="panel-card__content form-stack">
              <FieldShell readonly={isReadonly}>
                <Label htmlFor="loan-amount">{_('loanAmount')}</Label>
                <Input
                  id="loan-amount"
                  inputMode="decimal"
                  value={values.loanAmount}
                  onChange={(event) =>
                    store.setLoanAmount(event.currentTarget.value)
                  }
                  placeholder={_('placeholderLoanAmount')}
                  readOnly={isReadonly}
                />
              </FieldShell>

              <FieldShell readonly={isReadonly}>
                <Label htmlFor="years">{_('timeInYears')}</Label>
                <Input
                  id="years"
                  inputMode="decimal"
                  value={values.years}
                  onChange={(event) =>
                    store.setYears(event.currentTarget.value)
                  }
                  placeholder={_('placeholderYears')}
                  readOnly={isReadonly}
                />
              </FieldShell>

              <FieldShell readonly={isReadonly}>
                <Label htmlFor="payments-per-year">
                  {_('paymentsPerYear')}
                </Label>
                <Select
                  id="payments-per-year"
                  value={String(values.paymentsPerYear)}
                  onChange={(event) =>
                    store.setPaymentsPerYear(
                      parseFrequency(event.currentTarget.value),
                    )
                  }
                  disabled={isReadonly}
                >
                  {paymentFrequencyOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FieldShell>

              <FieldShell readonly={isReadonly}>
                <Label htmlFor="ear">{_('effectiveAnnualRate')}</Label>
                <Input
                  id="ear"
                  inputMode="decimal"
                  value={displayedEarValue}
                  onChange={(event) => store.setEar(event.currentTarget.value)}
                  placeholder={match({ isPaymentDriven, isPendingResult })
                    .with({ isPendingResult: true }, () =>
                      _('loadingSharedResult'),
                    )
                    .with({ isPaymentDriven: true }, () =>
                      _('calculatedAutomatically'),
                    )
                    .otherwise(() => _('placeholderEar'))}
                  disabled={isReadonly || isPaymentDriven}
                  readOnly={isReadonly}
                />
                <p className="field-note">
                  {match({ isReadonly, isPaymentDriven, isPendingResult })
                    .with({ isReadonly: true }, () => _('fieldNoteReadonly'))
                    .with({ isPaymentDriven: true }, () =>
                      _('fieldNoteEarDisabled'),
                    )
                    .otherwise(() => _('fieldNoteEarFormat'))}
                </p>
              </FieldShell>

              <FieldShell readonly={isReadonly}>
                <Label htmlFor="payment-amount">
                  {_('paymentAmountOptionalOverride')}
                </Label>
                <Input
                  id="payment-amount"
                  inputMode="decimal"
                  value={values.paymentAmount}
                  onChange={(event) =>
                    store.setPaymentAmount(event.currentTarget.value)
                  }
                  placeholder={_('placeholderPaymentAmount')}
                  readOnly={isReadonly}
                />
                <p className="field-note">
                  {match({ isReadonly, isPendingResult })
                    .with({ isReadonly: true }, () => _('fieldNoteReadonly'))
                    .otherwise(() => _('fieldNotePaymentOverride'))}
                </p>
              </FieldShell>

              {match(routeState)
                .with({ kind: 'result', decoded: { kind: 'valid' } }, () => (
                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      className="action-button action-button--secondary"
                      onClick={() => {
                        clearLoanStateFromLocalStorage()
                        navigateTo('/')
                      }}
                    >
                      <RotateCcw size={16} />
                      <span>{_('startNewCalculation')}</span>
                    </button>
                    <button
                      type="button"
                      className="action-button action-button--primary"
                      onClick={() => {
                        saveLoanStateToLocalStorage(values)
                        navigateTo('/')
                      }}
                    >
                      <PencilLine size={16} />
                      <span>{_('editThisResult')}</span>
                    </button>
                  </div>
                ))
                .otherwise(() => null)}
            </CardContent>
          </Card>

          <div className="dashboard-stack">
            <div className="summary-grid">
              <SummaryCard
                icon={<Wallet />}
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

const InvalidResultPage = ({
  routeState,
}: {
  routeState: {
    kind: 'result'
    payload: string | null
    decoded: Exclude<
      Extract<RouteState, { kind: 'result' }>['decoded'],
      { kind: 'valid' | 'pending' }
    >
  }
}) => {
  const { _ } = useTranslator()
  const locale = useLocale()
  const navigateTo = useMemo(() => makeLocaleNavigator(locale), [locale])

  return (
    <main className="app-shell">
      <div className="app-layout">
        <div className="page-toolbar">
          <div className="page-toolbar__copy">
            <p className="page-kicker">{_('sharedResult')}</p>
            <h1 className="page-title">{_('sharedResultUnavailable')}</h1>
          </div>
          <button
            type="button"
            className="action-button action-button--disabled"
            disabled
            title={_('validResultRequired')}
          >
            <Share2 size={16} />
            <span>{_('shareResult')}</span>
          </button>
        </div>

        <Card className="panel-card panel-card--message">
          <CardHeader className="panel-card__header panel-card__header--plain">
            <CardTitle>
              {match(routeState.decoded.kind)
                .with('missing', () => _('noSharedResultFound'))
                .otherwise(() => _('thisSharedResultIsInvalid'))}
            </CardTitle>
            <CardDescription>{routeState.decoded.message}</CardDescription>
          </CardHeader>
          <CardContent className="panel-card__content message-actions">
            <button
              type="button"
              className="action-button action-button--primary"
              onClick={() => navigateTo('/')}
            >
              <RotateCcw size={16} />
              <span>{_('openCalculator')}</span>
            </button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

const FieldShell = ({
  children,
  readonly,
}: {
  children: ReactNode
  readonly: boolean
}) => {
  const { _ } = useTranslator()
  return (
    <div
      className={match(readonly)
        .with(true, () => 'field-group field-group--readonly')
        .otherwise(() => 'field-group')}
      title={match(readonly)
        .with(true, () => _('fieldNoteReadonly'))
        .otherwise(() => undefined)}
    >
      {children}
    </div>
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

const Metric = ({
  label,
  value,
  detail,
}: {
  label: string
  value: string
  detail?: string
}) => (
  <div className="metric-card">
    <p className="metric-label">{label}</p>
    <p className="metric-value">{value}</p>
    {match(detail)
      .with(undefined, () => null)
      .otherwise((resolvedDetail) => (
        <p className="metric-detail">{resolvedDetail}</p>
      ))}
  </div>
)

const InteractiveChart = ({
  calculation,
}: {
  calculation: Extract<
    ReturnType<LoanStore['useDashboardViewModel']>['calculation'],
    { kind: 'ready' }
  >
}) => (
  <>
    <MetricsRow calculation={calculation} />

    <div className="chart-frame">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={calculation.chartRows} barCategoryGap={2}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d6d3d1" />
          <XAxis dataKey="quotaLabel" stroke="#57534e" tickLine={false} />
          <YAxis
            stroke="#57534e"
            tickFormatter={formatCompactCurrency}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            content={QuotaTooltip}
            cursor={{ fill: 'rgba(217, 119, 6, 0.08)' }}
          />
          <Legend />
          <Bar
            dataKey="principal"
            name="Principal"
            stackId="payment"
            fill="#b45309"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="interest"
            name="Interest"
            stackId="payment"
            fill="#f59e0b"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </>
)

const StaticChartPreview = ({
  calculation,
}: {
  calculation: Extract<
    ReturnType<LoanStore['useDashboardViewModel']>['calculation'],
    { kind: 'ready' }
  >
}) => {
  const previewRows = calculation.chartRows.slice(0, 12)

  return (
    <>
      <MetricsRow calculation={calculation} />

      <div
        className="chart-frame chart-frame--static flex-1"
        aria-label="Amortization preview"
      >
        <div className="static-chart" aria-hidden="true">
          {previewRows.map((row) => (
            <div className="static-chart__quota" key={row.quotaLabel}>
              <div className="static-chart__bar">
                <div
                  className="static-chart__segment static-chart__segment--interest"
                  style={{
                    height: `${Math.max(0, (row.interest / row.payment) * 100)}%`,
                  }}
                />
                <div
                  className="static-chart__segment static-chart__segment--principal"
                  style={{
                    height: `${Math.max(0, (row.principal / row.payment) * 100)}%`,
                  }}
                />
              </div>
              <span className="static-chart__label">{row.quotaLabel}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

const PendingChartState = () => {
  const { _ } = useTranslator()
  return (
    <div className="pending-state">
      <p className="pending-state__title">{_('loadingSharedAmortization')}</p>
      <p className="pending-state__copy">
        {_('loadingSharedAmortizationSubtitle')}
      </p>
    </div>
  )
}

const MetricsRow = ({
  calculation,
}: {
  calculation: Extract<
    ReturnType<LoanStore['useDashboardViewModel']>['calculation'],
    { kind: 'ready' }
  >
}) => {
  const { _ } = useTranslator()
  return (
    <div className="metrics-grid">
      <Metric
        label={_('loanAmountMetric')}
        value={formatCurrency(calculation.loanAmount)}
        detail={_('principal')}
      />
      <Metric
        label={_('totalInterestMetric')}
        value={formatCurrency(calculation.totalInterest)}
        detail={_('ofTotalPaid', {
          percent: formatShareOfTotal(
            calculation.totalInterest,
            calculation.totalPaid,
          ),
        })}
      />
      <Metric
        label={_('totalPaidMetric')}
        value={formatCurrency(calculation.totalPaid)}
        detail={_('principalRepaid', {
          multiplier: (calculation.totalPaid / calculation.loanAmount).toFixed(
            2,
          ),
        })}
      />
    </div>
  )
}

const QuotaTooltip = ({
  active,
  payload,
  label,
}: TooltipContentProps<ValueType, NameType>) => {
  const { _ } = useTranslator()

  return match(Boolean(active) && Array.isArray(payload) && payload.length > 0)
    .with(false, () => null)
    .otherwise(() => {
      const row = payload?.[0]?.payload as
        | {
            payment?: number
            principal?: number
            interest?: number
          }
        | undefined

      const payment = Number(row?.payment ?? 0)
      const principal = Number(row?.principal ?? 0)
      const interest = Number(row?.interest ?? 0)

      return (
        <div className="chart-tooltip">
          <p className="chart-tooltip__title">
            {_('quotaTooltip', { quota: String(label) })}
          </p>
          <div className="chart-tooltip__rows">
            <div className="chart-tooltip__row">
              <span>{_('tooltipTotal')}</span>
              <strong>{formatCurrency(payment)}</strong>
            </div>
            <div className="chart-tooltip__row">
              <span>{_('tooltipPrincipal')}</span>
              <strong>{`${formatCurrency(principal)} (${formatShareOfTotal(principal, payment)})`}</strong>
            </div>
            <div className="chart-tooltip__row">
              <span>{_('tooltipInterest')}</span>
              <strong>{`${formatCurrency(interest)} (${formatShareOfTotal(interest, payment)})`}</strong>
            </div>
          </div>
        </div>
      )
    })
}
