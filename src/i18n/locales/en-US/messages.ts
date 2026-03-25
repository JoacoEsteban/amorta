export const enUSMessages = {
  sharedResult: 'Shared Result',
  liveCalculator: 'Live Calculator',
  sharedFrenchAmortizationResult: 'Shared French Amortization Result',
  frenchAmortizationCalculator: 'French Amortization Calculator',
  reviewSharedResultSummary:
    'Review the loan schedule, compare principal and interest for each quota, and copy the shared result URL.',
  modelFrenchLoanSummary:
    'Model a French-style loan, invert a payment into its effective annual rate, and inspect the amortization schedule visually.',
  shareResult: 'Share result',
  sharedInputs: 'Shared Inputs',
  frenchMortgageInputs: 'French Mortgage Inputs',
  sharedInputsDescription:
    'These values came from a shared result and cannot be edited in place.',
  changeValueDescription:
    'Change any value and the amortization schedule recomputes immediately.',
  loanAmount: 'Loan amount',
  timeInYears: 'Time in years',
  paymentsPerYear: 'Payments per year',
  effectiveAnnualRate: 'Effective annual rate',
  paymentAmountOptionalOverride: 'Payment amount (optional override)',
  placeholderLoanAmount: '250000',
  placeholderYears: '30',
  placeholderEar: '0.12',
  placeholderPaymentAmount: 'Leave blank to derive payment',
  loadingSharedResult: 'Loading shared result',
  calculatedAutomatically: 'Calculated automatically',
  waitingForValidInputs: 'Waiting for valid inputs',
  fieldNoteReadonly:
    'This shared result can\'t be edited here. Use "Edit this result" to continue from these values.',
  fieldNoteEarDisabled:
    'Disabled while a payment amount is provided. The app derives EAR from that payment.',
  fieldNoteEarFormat:
    'Use decimal format. Example: 0.12 means a 12% effective annual rate.',
  fieldNotePaymentOverride:
    'Fill this to switch into payment-driven mode and calculate the EAR dynamically.',
  startNewCalculation: 'Start new calculation',
  editThisResult: 'Edit this result',
  openCalculator: 'Open calculator',
  collapseAll: 'Collapse all',
  expandAll: 'Expand all',
  activePayment: 'Active payment',
  activeEAR: 'Active EAR',
  repaymentHorizon: 'Repayment horizon',
  installmentsAtRate: '{count} installments at {rate}/year',
  amortizationGraph: 'Amortization Graph',
  chartPendingSharedResult:
    'The shared result preview is loading. The interactive chart will appear after the URL payload is resolved.',
  chartPrerendered:
    'A prerendered chart preview is shown immediately. The interactive chart hydrates right after load.',
  chartInteractive:
    'Principal and interest are stacked for each quota, with a final zero point appended for payoff closure.',
  chartCannotGraph: 'The schedule cannot be graphed yet.',
  loadingSharedAmortization: 'Loading shared amortization result',
  loadingSharedAmortizationSubtitle:
    'The shared result is loading. The schedule and chart will appear shortly.',
  amortizationSchedule: 'Amortization Schedule',
  scheduleExpandDescription:
    'Expand each year to view the detailed payment breakdown.',
  loanAmountMetric: 'Loan amount',
  totalInterestMetric: 'Total interest',
  totalPaidMetric: 'Total paid',
  principal: 'Principal',
  ofTotalPaid: '{percent} of total paid',
  principalRepaid: '{multiplier}x principal repaid',
  yearMarker: 'Year {year}',
  yearSectionPayments:
    'Year {year} ({count} {count, plural, one {payment} other {payments}})',
  tableHeaderQuota: '#',
  tableHeaderPayment: 'Payment',
  tableHeaderPrincipal: 'Principal',
  tableHeaderInterest: 'Interest',
  tableHeaderBalance: 'Balance',
  quotaTooltip: 'Quota {quota}',
  tooltipTotal: 'Total',
  tooltipPrincipal: 'Principal',
  tooltipInterest: 'Interest',
  sharedResultUnavailable: 'Shared result unavailable',
  noSharedResultFound: 'No shared result found',
  thisSharedResultIsInvalid: 'This shared result is invalid',
  validResultRequired:
    'A valid shared result is required before it can be shared again.',
  clipboardUnavailable: 'Clipboard access is not available here.',
  shareUrlCopied: 'Share URL copied to the clipboard.',
  shareUrlCopyFailed: 'The share URL could not be copied.',
  loadingSharedResultTooltip:
    'The shared result must finish loading before it can be copied.',
  mustBeValidNumber: '{label} must be a valid number',
  mustBeGreaterThanZero: '{label} must be greater than 0',
  mustBeZeroOrGreater: '{label} must be 0 or greater',
  isRequired: '{label} is required',
  timeInYearsMustBeWhole:
    'Time in years must produce a whole number of payments for the selected frequency',
  paymentAmountMustBeAtLeast:
    'Payment amount must be at least {minimum} for the selected loan and term',
  cannotSolveEAR:
    'Unable to solve an effective annual rate for this payment amount',
  earIsRequired: 'Effective annual rate is required',
  paymentIsRequired: 'Payment amount is required',
  loanInputsIncomplete: 'The loan inputs are incomplete',
  noSharedResultProvided: 'No shared result was provided in the URL.',
  sharedResultCouldNotBeDecoded: 'The shared result could not be decoded.',
  sharedResultNotValidJSON: 'The shared result is not valid JSON.',
  sharedResultInvalidFormat:
    'The shared result does not match the expected data format.',
  loadingSharedResultFromURL: 'Loading the shared result from the URL.',
  seoTitleIndex: 'Amorta | French Amortization Calculator',
  seoTitleResult: 'Shared Result | Amorta',
  seoTitleUnavailable: 'Shared Result Unavailable | Amorta',
  seoDescription:
    'Amorta is an interactive French amortization calculator with shareable results, payment-to-rate inversion, and a visual principal-versus-interest breakdown.',
  seoDescriptionShare:
    'Review a readonly French amortization result, inspect the quota breakdown, and continue the calculation in Amorta.',
  seoDescriptionUnavailable:
    'The requested Amorta shared result is unavailable. Return to the calculator to create or inspect a valid amortization schedule.',
  frequencyOnePayment: '1 payment / year',
  frequencyThreePayments: '3 payments / year',
  frequencySixPayments: '6 payments / year',
  frequencyTwelvePayments: '12 payments / year',
  madeBy: 'Made by',
}
