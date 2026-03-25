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
  exportSchedule: 'Export schedule',
  exportScheduleDescription:
    'Download the amortization schedule in your preferred format.',
  downloadCsv: 'CSV Spreadsheet',
  downloadCsvDetail: 'Localized numbers, all rows with column headers',
  downloadJson: 'JSON Data',
  downloadJsonDetail: 'Full structured payload with inputs and results',
  cancel: 'Cancel',
  aboutFrenchAmortization: 'About French Amortization',
  aboutFrenchAmortizationDescription:
    'Key concepts and terminology for understanding how French amortization works.',
  eduWhatTrigger: 'What is French amortization?',
  eduWhatBody:
    '<p>French amortization — also known as <strong>constant payment amortization</strong> — is the most common method for repaying mortgages and loans in Europe and Latin America. Unlike the declining payment structure common in the US (where each payment is the same total amount but the split between interest and principal shifts over time), French amortization keeps <strong>every payment equal</strong> from the first month to the last.</p><p>Because each payment is fixed, the borrower always knows exactly what to budget. The trade-off is that early payments go almost entirely toward interest, and the principal shrinks very slowly at first.</p>',
  eduHowTrigger: 'How does the math work?',
  eduHowBody:
    '<p>Each payment is determined by three numbers: the <strong>loan amount</strong>, the <strong>effective annual rate (EAR)</strong>, and the <strong>number of payments</strong>. The EAR is converted into a periodic rate (for monthly payments, the 12th root of 1 + EAR), and then the standard annuity formula applies:</p><p><strong>Payment = Loan × r / (1 − (1 + r)<sup>−n</sup>)</strong></p><p>where <strong>r</strong> is the periodic rate and <strong>n</strong> is the total number of payments. With each payment, a portion repays interest (balance × periodic rate) and the remainder reduces the principal. As the balance shrinks, the interest portion of each payment shrinks too — which means more of the fixed payment goes toward principal over time.</p>',
  eduTermsTrigger: 'Key terminology',
  eduTermsBody:
    '<p><strong>Quota (or payment):</strong> A single installment payment. A 30-year mortgage with monthly payments has 360 quotas.</p><p><strong>Effective Annual Rate (EAR):</strong> The true yearly cost of borrowing, accounting for compounding within the year. Different from the nominal APR — the EAR is what you actually pay.</p><p><strong>Principal:</strong> The portion of a payment that reduces the outstanding loan balance.</p><p><strong>Interest:</strong> The portion of a payment that goes to the lender as the cost of borrowing.</p><p><strong>Periodic rate:</strong> The EAR expressed per payment period. For monthly payments, this is (1 + EAR)<sup>1/12</sup> − 1.</p>',
  eduWhenTrigger: 'When is this calculator useful?',
  eduWhenBody:
    "<p>Use this calculator whenever you need to model a loan that follows European or Latin American conventions. It handles both directions:</p><ul><li><strong>Standard mode:</strong> Enter loan amount, term, and EAR to compute the monthly payment.</li><li><strong>Payment inversion:</strong> Enter a target payment amount to solve for the implied EAR — useful for comparing offers with different payment structures.</li></ul><p>The amortization schedule shows every quota in detail, making it easy to understand exactly how much of each payment goes toward interest versus principal at any point in the loan's life.</p>",
  blog: 'Blog',
  articles: 'Articles',
  blogIndexTitle: 'Articles',
  blogIndexDescription:
    'In-depth explanations of French amortization, rate conventions, and financial mathematics.',
  backToCalculator: 'Back to calculator',
  backToBlog: 'Back to articles',
  articleNotFound: 'Article not found',
  articleCtaText: 'Ready to run your own calculation?',
  seoTitleBlogIndex: 'Articles | Amorta',
  seoDescriptionBlogIndex:
    'Read in-depth articles about French amortization, effective annual rates, and the mathematics behind constant-payment loans.',
  articleMathTitle: 'The Math Behind French Amortization',
  articleMathDescription:
    'A deep dive into the annuity formula, periodic rate conversion, and how each payment splits between interest and principal over the life of a French loan.',
  articleMathDate: 'March 2026',
  articleMathBody:
    '<p>French amortization is governed by one elegant formula. Given a loan amount <strong>L</strong>, an effective annual rate <strong>EAR</strong>, and a payment count <strong>n</strong>, the fixed payment <strong>P</strong> is:</p><pre><code>P = L &times; r / (1 &minus; (1 + r)<sup>&minus;n</sup>)</code></pre><p>where <strong>r</strong> is the <em>periodic rate</em>: the EAR expressed per payment interval. For monthly payments on a loan with 12 payments per year:</p><pre><code>r = (1 + EAR)<sup>1/12</sup> &minus; 1</code></pre><p>This conversion from annual to periodic rate is what makes the EAR the correct rate to use in the formula &mdash; not the nominal APR, and not a simple rate divided by the number of payments.</p><h2>How each payment splits</h2><p>Once <strong>P</strong> is known, the amortization schedule falls out naturally. For quota <strong>q</strong> (where q = 1 for the first payment):</p><pre><code>interest_q = balance_q-1 &times; r\nprincipal_q = P &minus; interest_q\nbalance_q = balance_q-1 &minus; principal_q</code></pre><p>Because the balance decreases with each payment, the interest portion <strong>interest_q</strong> shrinks over time, while the principal portion <strong>principal_q</strong> grows. The payment <strong>P</strong> stays constant throughout.</p><p>This is the defining characteristic of French amortization: constant total payments, declining interest, and accelerating principal reduction.</p><h2>Solving for the EAR from a payment</h2><p>The formula above works forward from (L, EAR, n) to find P. The calculator also runs this backwards: if you know L, P, and n, it can solve for the implied EAR.</p><p>This requires a numeric solver (binary search in this case), since the EAR appears on both sides of the equation through the periodic rate. The solver starts with a wide search range and repeatedly bisects until it converges on the EAR that produces the given payment.</p><h2>Why EAR and not APR?</h2><p>The <strong>APR</strong> (Annual Percentage Rate) is a nominal rate &mdash; it does not account for intra-year compounding. If a loan quotes "12% APR" with monthly payments, the actual rate you pay is higher than 12%.</p><p>The <strong>EAR</strong> (Effective Annual Rate) does account for compounding. The relationship between APR and EAR for <strong>m</strong> payments per year is:</p><pre><code>EAR = (1 + APR/m)<sup>m</sup> &minus; 1</code></pre><p>For 12 payments per year at 12% APR: EAR = (1 + 0.12/12)<sup>12</sup> &minus; 1 &asymp; 12.68%. This is what the calculator uses, and why it produces accurate schedules even for high-frequency payment structures.</p><h2>The last payment adjustment</h2><p>Because floating-point arithmetic and the annuity formula can produce tiny rounding errors, the final payment in a French schedule is usually adjusted slightly to ensure the balance reaches exactly zero. The calculator handles this by checking whether the last payment would produce a negative balance and clamping it to the remaining balance plus accrued interest.</p>',
}
