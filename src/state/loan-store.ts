import { bind, shareLatest } from '@react-rxjs/core'
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
} from 'rxjs'
import { match } from 'ts-pattern'

import {
  buildCalculation,
  type CalculationMode,
  type CalculationResult,
  determineMode,
  type LoanFormValues,
  type PaymentFrequency,
} from '../domain/amortization'

export type StoreMode =
  | {
      kind: 'session'
      persist: boolean
    }
  | {
      kind: 'shared-result'
    }

export type DashboardViewModel = {
  values: LoanFormValues
  mode: CalculationMode
  calculation: CalculationResult
  storeMode: StoreMode['kind']
}

export type LoanStore = {
  useDashboardViewModel: () => DashboardViewModel
  setLoanAmount: (value: string) => void
  setYears: (value: string) => void
  setPaymentsPerYear: (value: PaymentFrequency) => void
  setEar: (value: string) => void
  setPaymentAmount: (value: string) => void
  getValues: () => LoanFormValues
  replaceValues: (values: LoanFormValues) => void
}

export const DEFAULT_LOAN_FORM_VALUES: LoanFormValues = {
  loanAmount: '250000',
  years: '30',
  paymentsPerYear: 12,
  ear: '0.12',
  paymentAmount: '',
}

export const EMPTY_LOAN_FORM_VALUES: LoanFormValues = {
  loanAmount: '',
  years: '',
  paymentsPerYear: 12,
  ear: '',
  paymentAmount: '',
}

const CALCULATION_DEBOUNCE_MS = 180
const STORAGE_KEY_PREFIX = 'amorta'

const storageKeys = {
  loanAmount: `${STORAGE_KEY_PREFIX}:loan-amount`,
  years: `${STORAGE_KEY_PREFIX}:years`,
  paymentsPerYear: `${STORAGE_KEY_PREFIX}:payments-per-year`,
  ear: `${STORAGE_KEY_PREFIX}:ear`,
  paymentAmount: `${STORAGE_KEY_PREFIX}:payment-amount`,
} as const

const getStorage = (): Storage | null =>
  match(typeof window)
    .with('undefined', () => null)
    .otherwise(() => window.localStorage)

const parsePaymentFrequency = (rawValue: string | null): PaymentFrequency =>
  match(Number(rawValue))
    .with(1, () => 1 as const)
    .with(3, () => 3 as const)
    .with(6, () => 6 as const)
    .with(12, () => 12 as const)
    .otherwise(() => DEFAULT_LOAN_FORM_VALUES.paymentsPerYear)

const readStoredValue = (key: string, fallbackValue: string): string =>
  match(getStorage())
    .with(null, () => fallbackValue)
    .otherwise((storage) => storage.getItem(key) ?? fallbackValue)

const persistValues = (values: LoanFormValues): void => {
  match(getStorage())
    .with(null, () => null)
    .otherwise((storage) => {
      storage.setItem(storageKeys.loanAmount, values.loanAmount)
      storage.setItem(storageKeys.years, values.years)
      storage.setItem(
        storageKeys.paymentsPerYear,
        String(values.paymentsPerYear),
      )
      storage.setItem(storageKeys.ear, values.ear)
      storage.setItem(storageKeys.paymentAmount, values.paymentAmount)

      return null
    })
}

export const loadLoanStateFromLocalStorage = (): LoanFormValues => ({
  loanAmount: readStoredValue(
    storageKeys.loanAmount,
    DEFAULT_LOAN_FORM_VALUES.loanAmount,
  ),
  years: readStoredValue(storageKeys.years, DEFAULT_LOAN_FORM_VALUES.years),
  paymentsPerYear: parsePaymentFrequency(
    readStoredValue(
      storageKeys.paymentsPerYear,
      String(DEFAULT_LOAN_FORM_VALUES.paymentsPerYear),
    ),
  ),
  ear: readStoredValue(storageKeys.ear, DEFAULT_LOAN_FORM_VALUES.ear),
  paymentAmount: readStoredValue(
    storageKeys.paymentAmount,
    DEFAULT_LOAN_FORM_VALUES.paymentAmount,
  ),
})

export const saveLoanStateToLocalStorage = (values: LoanFormValues): void => {
  persistValues(values)
}

export const clearLoanStateFromLocalStorage = (): void => {
  match(getStorage())
    .with(null, () => null)
    .otherwise((storage) => {
      storage.removeItem(storageKeys.loanAmount)
      storage.removeItem(storageKeys.years)
      storage.removeItem(storageKeys.paymentsPerYear)
      storage.removeItem(storageKeys.ear)
      storage.removeItem(storageKeys.paymentAmount)

      return null
    })
}

const debouncedTextStream = (subject: BehaviorSubject<string>) =>
  subject.pipe(debounceTime(CALCULATION_DEBOUNCE_MS), distinctUntilChanged())

export const createLoanStore = ({
  initialValues: initialStoreValues,
  mode,
}: {
  initialValues: LoanFormValues
  mode: StoreMode
}): LoanStore => {
  const loanAmountSubject = new BehaviorSubject(initialStoreValues.loanAmount)
  const yearsSubject = new BehaviorSubject(initialStoreValues.years)
  const paymentsPerYearSubject = new BehaviorSubject<PaymentFrequency>(
    initialStoreValues.paymentsPerYear,
  )
  const earSubject = new BehaviorSubject(initialStoreValues.ear)
  const paymentAmountSubject = new BehaviorSubject(
    initialStoreValues.paymentAmount,
  )

  const values$ = combineLatest({
    loanAmount: loanAmountSubject,
    years: yearsSubject,
    paymentsPerYear: paymentsPerYearSubject,
    ear: earSubject,
    paymentAmount: paymentAmountSubject,
  }).pipe(shareLatest())

  values$.subscribe((values) =>
    match(mode)
      .with({ kind: 'session' }, ({ persist }) => {
        match(persist)
          .with(true, () => persistValues(values))
          .otherwise(() => null)
        return null
      })
      .with({ kind: 'shared-result' }, () => null)
      .exhaustive(),
  )

  const calculationInputs$ = combineLatest({
    loanAmount: debouncedTextStream(loanAmountSubject),
    years: debouncedTextStream(yearsSubject),
    paymentsPerYear: paymentsPerYearSubject,
    ear: debouncedTextStream(earSubject),
    paymentAmount: debouncedTextStream(paymentAmountSubject),
  }).pipe(shareLatest())

  const calculation$ = calculationInputs$.pipe(
    map(buildCalculation),
    shareLatest(),
  )

  const viewModel$ = combineLatest({
    values: values$,
    calculation: calculation$,
  }).pipe(
    map(
      ({ values, calculation }): DashboardViewModel => ({
        values,
        mode: determineMode(values.paymentAmount),
        calculation,
        storeMode: mode.kind,
      }),
    ),
    shareLatest(),
  )

  const initialCalculation = buildCalculation(initialStoreValues)
  const initialViewModel: DashboardViewModel = {
    values: initialStoreValues,
    mode: initialCalculation.mode,
    calculation: initialCalculation,
    storeMode: mode.kind,
  }

  const [useDashboardViewModel] = bind(viewModel$, initialViewModel)

  return {
    useDashboardViewModel,
    setLoanAmount: (value) => {
      loanAmountSubject.next(value)
    },
    setYears: (value) => {
      yearsSubject.next(value)
    },
    setPaymentsPerYear: (value) => {
      paymentsPerYearSubject.next(value)
    },
    setEar: (value) => {
      earSubject.next(value)
    },
    setPaymentAmount: (value) => {
      paymentAmountSubject.next(value)
    },
    getValues: () => ({
      loanAmount: loanAmountSubject.getValue(),
      years: yearsSubject.getValue(),
      paymentsPerYear: paymentsPerYearSubject.getValue(),
      ear: earSubject.getValue(),
      paymentAmount: paymentAmountSubject.getValue(),
    }),
    replaceValues: (values) => {
      loanAmountSubject.next(values.loanAmount)
      yearsSubject.next(values.years)
      paymentsPerYearSubject.next(values.paymentsPerYear)
      earSubject.next(values.ear)
      paymentAmountSubject.next(values.paymentAmount)
    },
  }
}
