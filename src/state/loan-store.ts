import { bind, shareLatest } from "@react-rxjs/core";
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
} from "rxjs";
import { match } from "ts-pattern";

import {
  buildCalculation,
  type CalculationMode,
  type CalculationResult,
  determineMode,
  type LoanFormValues,
  type PaymentFrequency,
} from "../domain/amortization";

export type DashboardViewModel = {
  values: LoanFormValues;
  mode: CalculationMode;
  calculation: CalculationResult;
};

const initialValues: LoanFormValues = {
  loanAmount: "250000",
  years: "30",
  paymentsPerYear: 12,
  ear: "0.12",
  paymentAmount: "",
};

const CALCULATION_DEBOUNCE_MS = 180;
const STORAGE_KEY_PREFIX = "french-graph";

const storageKeys = {
  loanAmount: `${STORAGE_KEY_PREFIX}:loan-amount`,
  years: `${STORAGE_KEY_PREFIX}:years`,
  paymentsPerYear: `${STORAGE_KEY_PREFIX}:payments-per-year`,
  ear: `${STORAGE_KEY_PREFIX}:ear`,
  paymentAmount: `${STORAGE_KEY_PREFIX}:payment-amount`,
} as const;

const getStorage = (): Storage | null =>
  match(typeof window)
    .with("undefined", () => null)
    .otherwise(() => window.localStorage);

const parsePaymentFrequency = (rawValue: string | null): PaymentFrequency =>
  match(Number(rawValue))
    .with(1, () => 1 as const)
    .with(3, () => 3 as const)
    .with(6, () => 6 as const)
    .with(12, () => 12 as const)
    .otherwise(() => initialValues.paymentsPerYear);

const readStoredValue = (key: string, fallbackValue: string): string =>
  match(getStorage())
    .with(null, () => fallbackValue)
    .otherwise((storage) => storage.getItem(key) ?? fallbackValue);

const loadInitialValues = (): LoanFormValues => ({
  loanAmount: readStoredValue(storageKeys.loanAmount, initialValues.loanAmount),
  years: readStoredValue(storageKeys.years, initialValues.years),
  paymentsPerYear: parsePaymentFrequency(
    readStoredValue(
      storageKeys.paymentsPerYear,
      String(initialValues.paymentsPerYear),
    ),
  ),
  ear: readStoredValue(storageKeys.ear, initialValues.ear),
  paymentAmount: readStoredValue(
    storageKeys.paymentAmount,
    initialValues.paymentAmount,
  ),
});

const persistedValues = loadInitialValues();

const loanAmountSubject = new BehaviorSubject(persistedValues.loanAmount);
const yearsSubject = new BehaviorSubject(persistedValues.years);
const paymentsPerYearSubject = new BehaviorSubject<PaymentFrequency>(
  persistedValues.paymentsPerYear,
);
const earSubject = new BehaviorSubject(persistedValues.ear);
const paymentAmountSubject = new BehaviorSubject(persistedValues.paymentAmount);

const debouncedTextStream = (subject: BehaviorSubject<string>) =>
  subject.pipe(debounceTime(CALCULATION_DEBOUNCE_MS), distinctUntilChanged());

const values$ = combineLatest({
  loanAmount: loanAmountSubject,
  years: yearsSubject,
  paymentsPerYear: paymentsPerYearSubject,
  ear: earSubject,
  paymentAmount: paymentAmountSubject,
}).pipe(shareLatest());

values$.subscribe((values) =>
  match(getStorage())
    .with(null, () => null)
    .otherwise((storage) => {
      storage.setItem(storageKeys.loanAmount, values.loanAmount);
      storage.setItem(storageKeys.years, values.years);
      storage.setItem(
        storageKeys.paymentsPerYear,
        String(values.paymentsPerYear),
      );
      storage.setItem(storageKeys.ear, values.ear);
      storage.setItem(storageKeys.paymentAmount, values.paymentAmount);

      return null;
    }),
);

const calculationInputs$ = combineLatest({
  loanAmount: debouncedTextStream(loanAmountSubject),
  years: debouncedTextStream(yearsSubject),
  paymentsPerYear: paymentsPerYearSubject,
  ear: debouncedTextStream(earSubject),
  paymentAmount: debouncedTextStream(paymentAmountSubject),
}).pipe(shareLatest());

const calculation$ = calculationInputs$.pipe(map(buildCalculation), shareLatest());

const viewModel$ = combineLatest({
  values: values$,
  calculation: calculation$,
}).pipe(
  map(
    ({ values, calculation }): DashboardViewModel => ({
      values,
      mode: determineMode(values.paymentAmount),
      calculation,
    }),
  ),
  shareLatest(),
);

const initialCalculation = buildCalculation(persistedValues);
const initialViewModel: DashboardViewModel = {
  values: persistedValues,
  mode: initialCalculation.mode,
  calculation: initialCalculation,
};

export const [useDashboardViewModel] = bind(viewModel$, initialViewModel);

export const setLoanAmount = (value: string): void => {
  loanAmountSubject.next(value);
};

export const setYears = (value: string): void => {
  yearsSubject.next(value);
};

export const setPaymentsPerYear = (value: PaymentFrequency): void => {
  paymentsPerYearSubject.next(value);
};

export const setEar = (value: string): void => {
  earSubject.next(value);
};

export const setPaymentAmount = (value: string): void => {
  paymentAmountSubject.next(value);
};
