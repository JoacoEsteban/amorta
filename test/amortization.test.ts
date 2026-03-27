import { describe, expect, test } from 'bun:test'
import { match } from 'ts-pattern'

import {
  buildCalculation,
  computeFrenchPayment,
  effectivePeriodicRate,
  periodicRateToEar,
} from '../src/domain/amortization'

describe('amortization math', () => {
  test('converts EAR into a periodic rate for the selected frequency', () => {
    const rate = effectivePeriodicRate(0.12, 12)

    expect(rate).toBeCloseTo(0.0094887929, 9)
  })

  test('computes a French payment for a known monthly loan', () => {
    const payment = computeFrenchPayment(
      250000,
      effectivePeriodicRate(0.12, 12),
      360,
    )

    expect(payment).toBeCloseTo(2454.1114, 3)
  })

  test('derives EAR from a valid payment amount', () => {
    const payment = computeFrenchPayment(
      250000,
      effectivePeriodicRate(0.12, 12),
      360,
    )
    const calculation = buildCalculation({
      loanAmount: '250000',
      years: '30',
      paymentsPerYear: 12,
      ear: '',
      paymentAmount: String(payment),
    })

    expect(calculation.kind).toBe('ready')

    match(calculation)
      .with({ kind: 'ready' }, (ready) => {
        expect(periodicRateToEar(ready.periodicRate, 12)).toBeCloseTo(0.12, 6)
      })
      .otherwise(() => {
        throw new Error('Expected a ready calculation')
      })
  })

  test('rejects infeasible payment-driven requests', () => {
    const calculation = buildCalculation({
      loanAmount: '1200',
      years: '1',
      paymentsPerYear: 12,
      ear: '',
      paymentAmount: '50',
    })

    expect(calculation.kind).toBe('invalid')
  })

  test('appends a terminal zero row after the real payment schedule', () => {
    const calculation = buildCalculation({
      loanAmount: '1000',
      years: '1',
      paymentsPerYear: 1,
      ear: '0.1',
      paymentAmount: '',
    })

    expect(calculation.kind).toBe('ready')

    match(calculation)
      .with({ kind: 'ready' }, (ready) => {
        const finalRow = ready.chartRows.at(-1)

        expect(ready.chartRows).toHaveLength(1)
        expect(finalRow?.remainingBalance).toBe(0)
      })
      .otherwise(() => {
        throw new Error('Expected a ready calculation')
      })
  })
})
