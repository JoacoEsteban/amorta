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
  articleAprVsEarTitle: 'APR vs EAR: Why the Difference Matters',
  articleAprVsEarDescription:
    'Understand the difference between nominal APR and effective annual rate, and learn why EAR is the correct rate to use in financial calculations.',
  articleAprVsEarDate: 'March 2026',
  articleAprVsEarBody:
    '<p>When comparing loans, you will encounter two different numbers that both describe the yearly cost of borrowing: <strong>APR</strong> (Annual Percentage Rate) and <strong>EAR</strong> (Effective Annual Rate). They sound similar but can differ substantially. Understanding this difference can save you thousands of dollars over the life of a loan.</p><h2>What is APR?</h2><p>The <strong>APR</strong> is a regulatory disclosure designed to make loan comparison easier. It expresses the cost of borrowing as a yearly rate, but it starts from the <em>nominal</em> (stated) interest rate, not the actual effective rate.</p><p>The nominal rate is simply divided by the number of compounding periods per year. For a loan with a 12% nominal annual rate and monthly compounding:</p><pre><code>periodic rate = 0.12 / 12 = 0.01 (1% per month)</code></pre><p>But this ignores the fact that interest in month 2 is calculated on a balance that already includes month 1 interest. After 12 months of 1% monthly compounding, the true annual cost is higher than 12%.</p><h2>What is EAR?</h2><p>The <strong>EAR</strong> (sometimes called the <strong>APY</strong>, or Annual Percentage Yield) accounts for the compounding effect within the year. It answers the question: <em>what is the actual yearly cost, including compounding?</em></p><pre><code>EAR = (1 + nominal rate / periods)<sup>periods</sup> &minus; 1</code></pre><p>For the 12% nominal rate with monthly compounding:</p><pre><code>EAR = (1 + 0.12 / 12)<sup>12</sup> &minus; 1 = 0.1268 (12.68%)</code></pre><p>This 0.68% difference may seem small, but it compounds over a 30-year mortgage into meaningful extra interest paid.</p><h2>Which rate should you use?</h2><p>For the annuity formula that underlies French amortization, <strong>EAR is the correct rate</strong>. The formula assumes effective periodic rates, and using the nominal APR divided by periods introduces a systematic error in the calculated payment.</p><p>When comparing loan offers, always ask for the EAR and use it in your calculations.</p>',
  articleUnderstandingAmortizationScheduleTitle: 'Understanding Your Amortization Schedule',
  articleUnderstandingAmortizationScheduleDescription:
    'Learn how to read an amortization schedule, what each column means, and how to identify patterns in your loan repayment over time.',
  articleUnderstandingAmortizationScheduleDate: 'March 2026',
  articleUnderstandingAmortizationScheduleBody: `
    <p>An amortization schedule is a table that shows every payment over the life of a loan. It breaks down each payment into how much goes toward interest, how much reduces the principal, and what the remaining balance is after each payment. Understanding this table helps you track your real progress in paying off debt.</p>
    <h2>The columns explained</h2>
    <p>Each row in the schedule represents one payment. For a monthly loan, each row corresponds to one month. The key columns are:</p>
    <ul>
      <li><strong>Payment number</strong>: The sequence count (1, 2, 3&hellip; n)</li>
      <li><strong>Payment amount</strong>: The fixed monthly payment (constant throughout in French amortization)</li>
      <li><strong>Interest portion</strong>: The part of the payment that goes to interest for that period</li>
      <li><strong>Principal portion</strong>: The part that reduces the outstanding balance</li>
      <li><strong>Remaining balance</strong>: The amount owed after the payment is applied</li>
    </ul>
    <h2>How interest and principal shift</h2>
    <p>In French amortization, the payment is fixed, but its composition changes dramatically over time. Early payments are mostly interest; late payments are mostly principal. This happens because interest is calculated on the remaining balance, which is highest at the start.</p>
    <p>Consider the first few months of a $200,000 mortgage at 6% EAR over 30 years (360 monthly payments). The periodic rate is roughly 0.00487 per month. In month 1, the interest on a $200,000 balance is approximately $974. The remaining $373 of the payment reduces the principal. By month 180 (year 15), the balance is much lower, so the interest portion shrinks and the principal portion grows correspondingly.</p>
    <h2>The crossover point</h2>
    <p>There is a point in every amortization schedule where interest and principal portions are equal. For a 30-year mortgage at 6%, this happens somewhere around year 12 or 13. Before this <strong>crossover point</strong>, you are paying more in interest than you are reducing principal. After it, the principal reduction accelerates.</p>
    <p>This has practical implications for extra payments. Making extra payments before the crossover point has a much larger impact on total interest paid than the same extra payments made later, because early extra payments skip all the future interest on that amount.</p>
    <h2>Reading your own schedule</h2>
    <p>When you run a calculation in Amorta, the schedule table shows exactly these columns for each payment interval. You can see the cumulative interest paid at the bottom of the table, which helps you understand the true cost of the loan over its full term.</p>
    <p>Pay attention to the interest column in the early rows to see how much of your payment is "wasted" on interest versus building equity. This perspective helps when evaluating whether to make extra payments or when comparing loan offers.</p>
  `,
}
