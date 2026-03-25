import type { AmortizationRow } from './amortization'

export type ExportableCalculation = {
  loanAmount: number
  years: number
  paymentsPerYear: number
  paymentCount: number
  periodicRate: number
  ear: number
  payment: number
  totalInterest: number
  totalPaid: number
  schedule: AmortizationRow[]
}

const getLocaleTag = (locale: string): string => {
  const localeTagMap: Record<string, string> = {
    'en-US': 'en-US',
    'en-GB': 'en-GB',
    'es-ES': 'es-ES',
    'es-AR': 'es-AR',
  }
  return localeTagMap[locale] ?? 'en-US'
}

const buildCurrencyFormatter = (locale: string, currency: string) =>
  new Intl.NumberFormat(getLocaleTag(locale), {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

const buildNumberFormatter = (locale: string) =>
  new Intl.NumberFormat(getLocaleTag(locale), {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  })

const buildPercentFormatter = (locale: string) =>
  new Intl.NumberFormat(getLocaleTag(locale), {
    style: 'percent',
    minimumFractionDigits: 4,
    maximumFractionDigits: 6,
  })

export const buildCsvContent = (
  calculation: ExportableCalculation,
  locale: string,
): string => {
  const fmtCurrency = buildCurrencyFormatter(locale, 'USD')
  const fmtNumber = buildNumberFormatter(locale)
  const fmtPercent = buildPercentFormatter(locale)

  const header = ['#', 'Payment', 'Principal', 'Interest', 'Balance'].join(',')

  const rows = calculation.schedule.map((row) =>
    [
      fmtNumber.format(row.quota),
      fmtCurrency.format(row.payment),
      fmtCurrency.format(row.principal),
      fmtCurrency.format(row.interest),
      fmtCurrency.format(row.remainingBalance),
    ].join(','),
  )

  const summarySection = ['', '', '', '', '', '', ''].join(',')

  const summaryRows = [
    `Loan amount,${fmtCurrency.format(calculation.loanAmount)}`,
    `Years,${fmtNumber.format(calculation.years)}`,
    `Payments per year,${fmtNumber.format(calculation.paymentsPerYear)}`,
    `Payment,${fmtCurrency.format(calculation.payment)}`,
    `Effective annual rate,${fmtPercent.format(calculation.ear)}`,
    `Total interest,${fmtCurrency.format(calculation.totalInterest)}`,
    `Total paid,${fmtCurrency.format(calculation.totalPaid)}`,
  ]

  return [header, ...rows, summarySection, ...summaryRows].join('\n')
}

export type JsonExportPayload = {
  inputs: {
    loanAmount: number
    years: number
    paymentsPerYear: number
    ear: number
    payment: number | null
  }
  results: {
    paymentCount: number
    periodicRate: number
    ear: number
    payment: number
    totalInterest: number
    totalPaid: number
  }
  schedule: Array<{
    quota: number
    payment: number
    principal: number
    interest: number
    remainingBalance: number
  }>
}

export const buildJsonContent = (
  calculation: ExportableCalculation,
  paymentOverride: string | null,
): string => {
  const payload: JsonExportPayload = {
    inputs: {
      loanAmount: calculation.loanAmount,
      years: calculation.years,
      paymentsPerYear: calculation.paymentsPerYear,
      ear: calculation.ear,
      payment: paymentOverride !== '' ? calculation.payment : null,
    },
    results: {
      paymentCount: calculation.paymentCount,
      periodicRate: calculation.periodicRate,
      ear: calculation.ear,
      payment: calculation.payment,
      totalInterest: calculation.totalInterest,
      totalPaid: calculation.totalPaid,
    },
    schedule: calculation.schedule.map((row) => ({
      quota: row.quota,
      payment: row.payment,
      principal: row.principal,
      interest: row.interest,
      remainingBalance: row.remainingBalance,
    })),
  }

  return JSON.stringify(payload, null, 2)
}
