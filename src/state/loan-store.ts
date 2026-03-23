import { bind, shareLatest } from "@react-rxjs/core";
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
} from "rxjs";

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

const loanAmountSubject = new BehaviorSubject(initialValues.loanAmount);
const yearsSubject = new BehaviorSubject(initialValues.years);
const paymentsPerYearSubject = new BehaviorSubject<PaymentFrequency>(
  initialValues.paymentsPerYear,
);
const earSubject = new BehaviorSubject(initialValues.ear);
const paymentAmountSubject = new BehaviorSubject(initialValues.paymentAmount);

const debouncedTextStream = (subject: BehaviorSubject<string>) =>
  subject.pipe(debounceTime(CALCULATION_DEBOUNCE_MS), distinctUntilChanged());

const values$ = combineLatest({
  loanAmount: loanAmountSubject,
  years: yearsSubject,
  paymentsPerYear: paymentsPerYearSubject,
  ear: earSubject,
  paymentAmount: paymentAmountSubject,
}).pipe(shareLatest());

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

const initialCalculation = buildCalculation(initialValues);
const initialViewModel: DashboardViewModel = {
  values: initialValues,
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
