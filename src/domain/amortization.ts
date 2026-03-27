import { P, match } from 'ts-pattern'

export type PaymentFrequency = 1 | 3 | 6 | 12
export type CalculationMode = 'ear' | 'payment'

export type LoanFormValues = {
  loanAmount: string
  years: string
  paymentsPerYear: PaymentFrequency
  ear: string
  paymentAmount: string
}

export type AmortizationRow = {
  quota: number
  payment: number
  principal: number
  interest: number
  remainingBalance: number
}

type NumberFieldResult =
  | {
      kind: 'empty'
    }
  | {
      kind: 'invalid'
      message: string
    }
  | {
      kind: 'valid'
      value: number
    }

type PeriodicRateResult =
  | {
      kind: 'invalid'
      message: string
    }
  | {
      kind: 'valid'
      periodicRate: number
    }

export type CalculationResult =
  | {
      kind: 'invalid'
      mode: CalculationMode
      errors: string[]
    }
  | {
      kind: 'ready'
      mode: CalculationMode
      loanAmount: number
      years: number
      paymentsPerYear: PaymentFrequency
      paymentCount: number
      periodicRate: number
      ear: number
      payment: number
      totalInterest: number
      totalPaid: number
      schedule: AmortizationRow[]
      chartRows: Array<AmortizationRow & { quotaLabel: string }>
    }

const SOLVER_TOLERANCE = 1e-9
const MAX_SOLVER_ITERATIONS = 120
const MAX_RATE_BOUND = 1024

const parseNumber = (
  rawValue: string,
  label: string,
  rule: 'positive' | 'non-negative',
): NumberFieldResult => {
  const trimmedValue = rawValue.trim()

  return match(trimmedValue.length)
    .with(0, () => ({ kind: 'empty' as const }))
    .otherwise(() => {
      const numericValue = Number(trimmedValue)

      return match({
        isFiniteValue: Number.isFinite(numericValue),
        isPositive: numericValue > 0,
        isNonNegative: numericValue >= 0,
      })
        .with({ isFiniteValue: false }, () => ({
          kind: 'invalid' as const,
          message: `${label} must be a valid number`,
        }))
        .otherwise((state) =>
          match(rule)
            .with('positive', () =>
              match(state.isPositive)
                .with(true, () => ({
                  kind: 'valid' as const,
                  value: numericValue,
                }))
                .otherwise(() => ({
                  kind: 'invalid' as const,
                  message: `${label} must be greater than 0`,
                })),
            )
            .with('non-negative', () =>
              match(state.isNonNegative)
                .with(true, () => ({
                  kind: 'valid' as const,
                  value: numericValue,
                }))
                .otherwise(() => ({
                  kind: 'invalid' as const,
                  message: `${label} must be 0 or greater`,
                })),
            )
            .exhaustive(),
        )
    })
}

const requiredMessages = (
  result: NumberFieldResult,
  label: string,
  required: boolean,
): string[] =>
  match(result)
    .with({ kind: 'valid' }, () => [])
    .with({ kind: 'invalid' }, ({ message }) => [message])
    .with({ kind: 'empty' }, () =>
      match(required)
        .with(true, () => [`${label} is required`])
        .otherwise(() => []),
    )
    .exhaustive()

export const determineMode = (paymentAmount: string): CalculationMode =>
  match(paymentAmount.trim().length > 0)
    .with(true, () => 'payment' as const)
    .otherwise(() => 'ear' as const)

export const effectivePeriodicRate = (
  effectiveAnnualRate: number,
  paymentsPerYear: PaymentFrequency,
): number => Math.pow(1 + effectiveAnnualRate, 1 / paymentsPerYear) - 1

export const periodicRateToEar = (
  periodicRate: number,
  paymentsPerYear: PaymentFrequency,
): number => Math.pow(1 + periodicRate, paymentsPerYear) - 1

export const computeFrenchPayment = (
  loanAmount: number,
  periodicRate: number,
  paymentCount: number,
): number =>
  match(Math.abs(periodicRate) <= SOLVER_TOLERANCE)
    .with(true, () => loanAmount / paymentCount)
    .otherwise(
      () =>
        (loanAmount * periodicRate) /
        (1 - Math.pow(1 + periodicRate, -paymentCount)),
    )

const validatePaymentCount = (
  yearsResult: NumberFieldResult,
  paymentsPerYear: PaymentFrequency,
): string[] =>
  match(yearsResult)
    .with({ kind: 'valid' }, ({ value }) => {
      const paymentCount = value * paymentsPerYear

      return match(Number.isInteger(paymentCount))
        .with(true, () => [])
        .otherwise(() => [
          'Time in years must produce a whole number of payments for the selected frequency',
        ])
    })
    .otherwise(() => [])

const solvePeriodicRateFromPayment = (
  loanAmount: number,
  paymentAmount: number,
  paymentCount: number,
): PeriodicRateResult => {
  const minimumPayment = loanAmount / paymentCount

  return match(paymentAmount < minimumPayment - SOLVER_TOLERANCE)
    .with(true, () => ({
      kind: 'invalid' as const,
      message: `Payment amount must be at least ${minimumPayment.toFixed(2)} for the selected loan and term`,
    }))
    .otherwise(() =>
      match(Math.abs(paymentAmount - minimumPayment) <= SOLVER_TOLERANCE)
        .with(true, () => ({
          kind: 'valid' as const,
          periodicRate: 0,
        }))
        .otherwise(() => {
          let lowerBound = 0
          let upperBound = 1
          let upperPayment = computeFrenchPayment(
            loanAmount,
            upperBound,
            paymentCount,
          )

          while (upperPayment < paymentAmount && upperBound < MAX_RATE_BOUND) {
            upperBound *= 2
            upperPayment = computeFrenchPayment(
              loanAmount,
              upperBound,
              paymentCount,
            )
          }

          return match(upperPayment >= paymentAmount)
            .with(false, () => ({
              kind: 'invalid' as const,
              message:
                'Unable to solve an effective annual rate for this payment amount',
            }))
            .otherwise(() => {
              let candidateRate = 0
              let iteration = 0

              while (iteration < MAX_SOLVER_ITERATIONS) {
                candidateRate = (lowerBound + upperBound) / 2

                const candidatePayment = computeFrenchPayment(
                  loanAmount,
                  candidateRate,
                  paymentCount,
                )
                const difference = candidatePayment - paymentAmount
                const isConverged = Math.abs(difference) <= SOLVER_TOLERANCE

                const nextBounds = match(Math.sign(difference))
                  .with(-1, () => ({
                    lowerBound: candidateRate,
                    upperBound,
                  }))
                  .otherwise(() => ({
                    lowerBound,
                    upperBound: candidateRate,
                  }))

                lowerBound = match(isConverged)
                  .with(true, () => lowerBound)
                  .otherwise(() => nextBounds.lowerBound)
                upperBound = match(isConverged)
                  .with(true, () => upperBound)
                  .otherwise(() => nextBounds.upperBound)
                iteration += 1
              }

              return {
                kind: 'valid' as const,
                periodicRate: candidateRate,
              }
            })
        }),
    )
}

const buildSchedule = (
  loanAmount: number,
  periodicRate: number,
  paymentCount: number,
  payment: number,
): {
  schedule: AmortizationRow[]
  chartRows: Array<AmortizationRow & { quotaLabel: string }>
  totalInterest: number
  totalPaid: number
} => {
  const schedule: AmortizationRow[] = []
  let remainingBalance = loanAmount
  let totalInterest = 0

  for (let quota = 1; quota <= paymentCount; quota += 1) {
    const interest = remainingBalance * periodicRate
    const provisionalPrincipal = payment - interest
    const isLastPayment = quota === paymentCount
    const principal = match(isLastPayment)
      .with(true, () => remainingBalance)
      .otherwise(() => provisionalPrincipal)
    const effectivePayment = principal + interest
    const nextBalance = match(isLastPayment)
      .with(true, () => 0)
      .otherwise(() => Math.max(0, remainingBalance - principal))

    schedule.push({
      quota,
      payment: effectivePayment,
      principal,
      interest,
      remainingBalance: nextBalance,
    })

    remainingBalance = nextBalance
    totalInterest += interest
  }

  const chartRows = schedule.map((row) => ({
    ...row,
    quotaLabel: String(row.quota),
  }))

  return {
    schedule,
    chartRows,
    totalInterest,
    totalPaid: loanAmount + totalInterest,
  }
}

export const buildCalculation = (values: LoanFormValues): CalculationResult => {
  const mode = determineMode(values.paymentAmount)
  const loanAmountResult = parseNumber(
    values.loanAmount,
    'Loan amount',
    'positive',
  )
  const yearsResult = parseNumber(values.years, 'Time in years', 'positive')
  const earResult = parseNumber(
    values.ear,
    'Effective annual rate',
    'non-negative',
  )
  const paymentAmountResult = parseNumber(
    values.paymentAmount,
    'Payment amount',
    'positive',
  )

  const errors = [
    ...requiredMessages(loanAmountResult, 'Loan amount', true),
    ...requiredMessages(yearsResult, 'Time in years', true),
    ...match(mode)
      .with('ear', () =>
        requiredMessages(earResult, 'Effective annual rate', true),
      )
      .with('payment', () =>
        requiredMessages(paymentAmountResult, 'Payment amount', true),
      )
      .exhaustive(),
    ...validatePaymentCount(yearsResult, values.paymentsPerYear),
  ]

  return match(errors.length > 0)
    .with(true, () => ({
      kind: 'invalid' as const,
      mode,
      errors,
    }))
    .otherwise(() =>
      match([loanAmountResult, yearsResult] as const)
        .with(
          [{ kind: 'valid' }, { kind: 'valid' }],
          ([loanAmountState, yearsState]) => {
            const loanAmount = loanAmountState.value
            const years = yearsState.value
            const paymentCount = years * values.paymentsPerYear

            return match(mode)
              .with('ear', () =>
                match(earResult)
                  .with({ kind: 'valid' }, ({ value: ear }) => {
                    const periodicRate = effectivePeriodicRate(
                      ear,
                      values.paymentsPerYear,
                    )
                    const payment = computeFrenchPayment(
                      loanAmount,
                      periodicRate,
                      paymentCount,
                    )
                    const scheduleBundle = buildSchedule(
                      loanAmount,
                      periodicRate,
                      paymentCount,
                      payment,
                    )

                    return {
                      kind: 'ready' as const,
                      mode,
                      loanAmount,
                      years,
                      paymentsPerYear: values.paymentsPerYear,
                      paymentCount,
                      periodicRate,
                      ear,
                      payment,
                      totalInterest: scheduleBundle.totalInterest,
                      totalPaid: scheduleBundle.totalPaid,
                      schedule: scheduleBundle.schedule,
                      chartRows: scheduleBundle.chartRows,
                    }
                  })
                  .otherwise(() => ({
                    kind: 'invalid' as const,
                    mode,
                    errors: ['Effective annual rate is required'],
                  })),
              )
              .with('payment', () =>
                match(paymentAmountResult)
                  .with({ kind: 'valid' }, ({ value: paymentAmount }) =>
                    match(
                      solvePeriodicRateFromPayment(
                        loanAmount,
                        paymentAmount,
                        paymentCount,
                      ),
                    )
                      .with({ kind: 'valid' }, ({ periodicRate }) => {
                        const ear = periodicRateToEar(
                          periodicRate,
                          values.paymentsPerYear,
                        )
                        const scheduleBundle = buildSchedule(
                          loanAmount,
                          periodicRate,
                          paymentCount,
                          paymentAmount,
                        )

                        return {
                          kind: 'ready' as const,
                          mode,
                          loanAmount,
                          years,
                          paymentsPerYear: values.paymentsPerYear,
                          paymentCount,
                          periodicRate,
                          ear,
                          payment: paymentAmount,
                          totalInterest: scheduleBundle.totalInterest,
                          totalPaid: scheduleBundle.totalPaid,
                          schedule: scheduleBundle.schedule,
                          chartRows: scheduleBundle.chartRows,
                        }
                      })
                      .with({ kind: 'invalid' }, ({ message }) => ({
                        kind: 'invalid' as const,
                        mode,
                        errors: [message],
                      }))
                      .exhaustive(),
                  )
                  .otherwise(() => ({
                    kind: 'invalid' as const,
                    mode,
                    errors: ['Payment amount is required'],
                  })),
              )
              .exhaustive()
          },
        )
        .otherwise(() => ({
          kind: 'invalid' as const,
          mode,
          errors: ['The loan inputs are incomplete'],
        })),
    )
}
