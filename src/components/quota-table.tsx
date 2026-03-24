import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { match } from 'ts-pattern'

import type { CalculationResult } from '../domain/amortization'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})

type QuotaTableProps = {
  calculation: Extract<CalculationResult, { kind: 'ready' }>
  expanded: boolean
}

type YearGroup = {
  year: number
  quotas: Array<{
    quota: number
    payment: number
    principal: number
    interest: number
    remainingBalance: number
  }>
}

const groupByYear = (
  schedule: QuotaTableProps['calculation']['schedule'],
  paymentsPerYear: number,
): YearGroup[] => {
  const groups: Map<number, YearGroup['quotas']> = new Map()

  schedule.forEach((row) => {
    const year = Math.ceil(row.quota / paymentsPerYear)
    match(groups.has(year))
      .with(true, () => {
        groups.get(year)!.push(row)
      })
      .otherwise(() => {
        groups.set(year, [row])
      })
  })

  return Array.from(groups.entries())
    .map(([year, quotas]) => ({ year, quotas }))
    .sort((a, b) => a.year - b.year)
}

const YearMarker = ({ year }: { year: number }) => (
  <div className="year-marker">
    <span className="year-marker__line" />
    <span className="year-marker__label">Year {year}</span>
    <span className="year-marker__line" />
  </div>
)

const QuotaRow = ({
  quota,
  payment,
  principal,
  interest,
  remainingBalance,
}: {
  quota: number
  payment: number
  principal: number
  interest: number
  remainingBalance: number
}) => (
  <tr className="quota-row">
    <td className="quota-row__cell quota-row__cell--quota">{quota}</td>
    <td className="quota-row__cell">{currencyFormatter.format(payment)}</td>
    <td className="quota-row__cell">{currencyFormatter.format(principal)}</td>
    <td className="quota-row__cell">{currencyFormatter.format(interest)}</td>
    <td className="quota-row__cell">
      {currencyFormatter.format(remainingBalance)}
    </td>
  </tr>
)

const CollapsibleYearSection = ({
  year,
  quotas,
  forceOpen,
}: {
  year: number
  quotas: YearGroup['quotas']
  forceOpen: boolean
}) => {
  const [isOpen, setIsOpen] = useState(forceOpen)

  useEffect(() => setIsOpen(forceOpen), [forceOpen])

  return (
    <div className="year-section">
      <button
        type="button"
        className="year-section__header"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="year-section__title">
          Year {year} ({quotas.length}{' '}
          {quotas.length === 1 ? 'payment' : 'payments'})
        </span>
        <ChevronDown
          size={18}
          className={match(isOpen)
            .with(
              true,
              () => 'year-section__chevron year-section__chevron--open',
            )
            .otherwise(() => 'year-section__chevron')}
        />
      </button>
      {match(isOpen)
        .with(true, () => (
          <div className="year-section__content">
            <table className="quota-table">
              <thead>
                <tr>
                  <th className="quota-table__header">#</th>
                  <th className="quota-table__header">Payment</th>
                  <th className="quota-table__header">Principal</th>
                  <th className="quota-table__header">Interest</th>
                  <th className="quota-table__header">Balance</th>
                </tr>
              </thead>
              <tbody>
                {quotas.map((row) => (
                  <QuotaRow key={row.quota} {...row} />
                ))}
              </tbody>
            </table>
          </div>
        ))
        .otherwise(() => null)}
    </div>
  )
}

export const QuotaTable = ({ calculation, expanded }: QuotaTableProps) => {
  const yearGroups = groupByYear(
    calculation.schedule,
    calculation.paymentsPerYear,
  )

  return (
    <div className="quota-table-container">
      {yearGroups.map(({ year, quotas }) => (
        <CollapsibleYearSection
          key={year}
          year={year}
          quotas={quotas}
          forceOpen={expanded}
        />
      ))}
    </div>
  )
}
