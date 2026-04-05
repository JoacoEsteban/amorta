import type { ReactNode } from 'react'
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
import { P, match } from 'ts-pattern'

import type { LoanStore } from '../state/loan-store'
import { useTranslator } from '../state/locale.js'
import { Spinner } from './spinner.js'

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

const formatCurrency = (value: number): string =>
  currencyFormatter.format(value)

const formatCompactCurrency = (value: number): string =>
  compactCurrencyFormatter.format(value)

const formatPercent = (value: number): string => percentFormatter.format(value)

const formatShareOfTotal = (value: number, total: number): string =>
  match(total > 0)
    .with(true, () => formatPercent(value / total))
    .otherwise(() => '0%')

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
}) => (
  <>
    <MetricsRow calculation={calculation} />

    <div
      className="chart-frame chart-frame--static"
      aria-label="Loading amortization chart"
    >
      <div className="static-chart-spinner">
        <Spinner />
      </div>
    </div>
  </>
)

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

export {
  InteractiveChart,
  StaticChartPreview,
  PendingChartState,
  MetricsRow,
  QuotaTooltip,
  Metric,
}
