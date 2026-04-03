export const enGBMessages = {
  sharedResult: 'Shared Result',
  liveCalculator: 'Live Calculator',
  sharedFrenchAmortizationResult: 'Shared French Amortisation Result',
  frenchAmortizationCalculator: 'French Amortisation Calculator',
  reviewSharedResultSummary:
    'Review the loan schedule, compare principal and interest for each quota, and copy the shared result URL.',
  modelFrenchLoanSummary:
    'Model a French-style loan, invert a payment into its effective annual rate, and inspect the amortisation schedule visually.',
  shareResult: 'Share result',
  sharedInputs: 'Shared Inputs',
  frenchMortgageInputs: 'French Mortgage Inputs',
  sharedInputsDescription:
    'These values came from a shared result and cannot be edited in place.',
  changeValueDescription:
    'Change any value and the amortisation schedule recomputes immediately.',
  loanAmount: 'Loan amount',
  timeInYears: 'Term in years',
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
  installmentsAtRate: '{count} instalments at {rate}/year',
  amortizationGraph: 'Amortisation Graph',
  chartPendingSharedResult:
    'The shared result preview is loading. The interactive chart will appear after the URL payload is resolved.',
  chartPrerendered:
    'A prerendered chart preview is shown immediately. The interactive chart hydrates right after load.',
  chartInteractive:
    'Principal and interest are stacked for each quota, with a final zero point appended for payoff closure.',
  chartCannotGraph: 'The schedule cannot be graphed yet.',
  loadingSharedAmortization: 'Loading shared amortisation result',
  loadingSharedAmortizationSubtitle:
    'The shared result is loading. The schedule and chart will appear shortly.',
  amortizationSchedule: 'Amortisation Schedule',
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
    'Term in years must produce a whole number of payments for the selected frequency',
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
  seoTitleIndex: 'Amorta | French Amortisation Calculator',
  seoTitleResult: 'Shared Result | Amorta',
  seoTitleUnavailable: 'Shared Result Unavailable | Amorta',
  seoDescription:
    'Amorta is an interactive French amortisation calculator with shareable results, payment-to-rate inversion, and a visual principal-versus-interest breakdown.',
  seoDescriptionShare:
    'Review a readonly French amortisation result, inspect the quota breakdown, and continue the calculation in Amorta.',
  seoDescriptionUnavailable:
    'The requested Amorta shared result is unavailable. Return to the calculator to create or inspect a valid amortisation schedule.',
  frequencyOnePayment: '1 payment / year',
  frequencyThreePayments: '3 payments / year',
  frequencySixPayments: '6 payments / year',
  frequencyTwelvePayments: '12 payments / year',
  madeBy: 'Made by',
  exportSchedule: 'Export schedule',
  exportScheduleDescription:
    'Download the amortisation schedule in your preferred format.',
  downloadCsv: 'CSV Spreadsheet',
  downloadCsvDetail: 'Localized numbers, all rows with column headers',
  downloadJson: 'JSON Data',
  downloadJsonDetail: 'Full structured payload with inputs and results',
  cancel: 'Cancel',
  aboutFrenchAmortization: 'About French Amortisation',
  aboutFrenchAmortizationDescription:
    'Key concepts and terminology for understanding how French amortisation works.',
  eduWhatTrigger: 'What is French amortisation?',
  eduWhatBody:
    '<p>French amortisation — also known as <strong>constant payment amortisation</strong> — is the most common method for repaying mortgages and loans in Europe and Latin America. Unlike the declining payment structure common in the US (where each payment is the same total amount but the split between interest and principal shifts over time), French amortisation keeps <strong>every payment equal</strong> from the first month to the last.</p><p>Because each payment is fixed, the borrower always knows exactly what to budget. The trade-off is that early payments go almost entirely toward interest, and the principal shrinks very slowly at first.</p>',
  eduHowTrigger: 'How does the maths work?',
  eduHowBody:
    '<p>Each payment is determined by three numbers: the <strong>loan amount</strong>, the <strong>effective annual rate (EAR)</strong>, and the <strong>number of payments</strong>. The EAR is converted into a periodic rate (for monthly payments, the 12th root of 1 + EAR), and then the standard annuity formula applies:</p><p><strong>Payment = Loan × r / (1 − (1 + r)<sup>−n</sup>)</strong></p><p>where <strong>r</strong> is the periodic rate and <strong>n</strong> is the total number of payments. With each payment, a portion repays interest (balance × periodic rate) and the remainder reduces the principal. As the balance shrinks, the interest portion of each payment shrinks too — which means more of the fixed payment goes toward principal over time.</p>',
  eduTermsTrigger: 'Key terminology',
  eduTermsBody:
    '<p><strong>Quota (or payment):</strong> A single instalment payment. A 30-year mortgage with monthly payments has 360 quotas.</p><p><strong>Effective Annual Rate (EAR):</strong> The true yearly cost of borrowing, accounting for compounding within the year. Different from the nominal APR — the EAR is what you actually pay.</p><p><strong>Principal:</strong> The portion of a payment that reduces the outstanding loan balance.</p><p><strong>Interest:</strong> The portion of a payment that goes to the lender as the cost of borrowing.</p><p><strong>Periodic rate:</strong> The EAR expressed per payment period. For monthly payments, this is (1 + EAR)<sup>1/12</sup> − 1.</p>',
  eduWhenTrigger: 'When is this calculator useful?',
  eduWhenBody:
    "<p>Use this calculator whenever you need to model a loan that follows European or Latin American conventions. It handles both directions:</p><ul><li><strong>Standard mode:</strong> Enter loan amount, term, and EAR to compute the monthly payment.</li><li><strong>Payment inversion:</strong> Enter a target payment amount to solve for the implied EAR — useful for comparing offers with different payment structures.</li></ul><p>The amortisation schedule shows every quota in detail, making it easy to understand exactly how much of each payment goes toward interest versus principal at any point in the loan's life.</p>",
  blog: 'Blog',
  articles: 'Articles',
  blogIndexTitle: 'Articles',
  blogIndexDescription:
    'In-depth explanations of French amortisation, rate conventions, and financial mathematics.',
  backToCalculator: 'Back to calculator',
  backToBlog: 'Back to articles',
  articleNotFound: 'Article not found',
  articleCtaText: 'Ready to run your own calculation?',
  seoTitleBlogIndex: 'Articles | Amorta',
  seoDescriptionBlogIndex:
    'Read in-depth articles about French amortisation, effective annual rates, and the mathematics behind constant-payment loans.',
  articleMathTitle: 'The Maths Behind French Amortisation',
  articleMathDescription:
    'A deep dive into the annuity formula, periodic rate conversion, and how each payment splits between interest and principal over the life of a French loan.',
  articleMathDate: '25 March 2026',
  articleMathBody:
    '<p>French amortisation is governed by one elegant formula. Given a loan amount <strong>L</strong>, an effective annual rate <strong>EAR</strong>, and a payment count <strong>n</strong>, the fixed payment <strong>P</strong> is:</p><pre><code>P = L &times; r / (1 &minus; (1 + r)<sup>&minus;n</sup>)</code></pre><p>where <strong>r</strong> is the <em>periodic rate</em>: the EAR expressed per payment interval. For monthly payments on a loan with 12 payments per year:</p><pre><code>r = (1 + EAR)<sup>1/12</sup> &minus; 1</code></pre><p>This conversion from annual to periodic rate is what makes the EAR the correct rate to use in the formula &mdash; not the nominal APR, and not a simple rate divided by the number of payments.</p><h2>How each payment splits</h2><p>Once <strong>P</strong> is known, the amortisation schedule falls out naturally. For quota <strong>q</strong> (where q = 1 for the first payment):</p><pre><code>interest_q = balance_q-1 &times; r\nprincipal_q = P &minus; interest_q\nbalance_q = balance_q-1 &minus; principal_q</code></pre><p>Because the balance decreases with each payment, the interest portion <strong>interest_q</strong> shrinks over time, while the principal portion <strong>principal_q</strong> grows. The payment <strong>P</strong> stays constant throughout.</p><p>This is the defining characteristic of French amortisation: constant total payments, declining interest, and accelerating principal reduction.</p><h2>Solving for the EAR from a payment</h2><p>The formula above works forward from (L, EAR, n) to find P. The calculator also runs this backwards: if you know L, P, and n, it can solve for the implied EAR.</p><p>This requires a numeric solver (binary search in this case), since the EAR appears on both sides of the equation through the periodic rate. The solver starts with a wide search range and repeatedly bisects until it converges on the EAR that produces the given payment.</p><h2>Why EAR and not APR?</h2><p>The <strong>APR</strong> (Annual Percentage Rate) is a nominal rate &mdash; it does not account for intra-year compounding. If a loan quotes "12% APR" with monthly payments, the actual rate you pay is higher than 12%.</p><p>The <strong>EAR</strong> (Effective Annual Rate) does account for compounding. The relationship between APR and EAR for <strong>m</strong> payments per year is:</p><pre><code>EAR = (1 + APR/m)<sup>m</sup> &minus; 1</code></pre><p>For 12 payments per year at 12% APR: EAR = (1 + 0.12/12)<sup>12</sup> &minus; 1 &asymp; 12.68%. This is what the calculator uses, and why it produces accurate schedules even for high-frequency payment structures.</p><h2>The last payment adjustment</h2><p>Because floating-point arithmetic and the annuity formula can produce tiny rounding errors, the final payment in a French schedule is usually adjusted slightly to ensure the balance reaches exactly zero. The calculator handles this by checking whether the last payment would produce a negative balance and clamping it to the remaining balance plus accrued interest.</p>',
  articleAprVsEarTitle: 'APR vs EAR: Why the Difference Matters',
  articleAprVsEarDescription:
    'Understand the difference between nominal APR and effective annual rate, and learn why EAR is the correct rate to use in financial calculations.',
  articleAprVsEarDate: '31 March 2026',
  articleAprVsEarBody:
    '<p>When comparing loans, you will encounter two different numbers that both describe the yearly cost of borrowing: <strong>APR</strong> (Annual Percentage Rate) and <strong>EAR</strong> (Effective Annual Rate). They sound similar but can differ substantially. Understanding this difference can save you thousands of pounds over the life of a loan.</p><h2>What is APR?</h2><p>The <strong>APR</strong> is a regulatory disclosure designed to make loan comparison easier. It expresses the cost of borrowing as a yearly rate, but it starts from the <em>nominal</em> (stated) interest rate, not the actual effective rate.</p><p>The nominal rate is simply divided by the number of compounding periods per year. For a loan with a 12% nominal annual rate and monthly compounding:</p><pre><code>periodic rate = 0.12 / 12 = 0.01 (1% per month)</code></pre><p>But this ignores the fact that interest in month 2 is calculated on a balance that already includes month 1 interest. After 12 months of 1% monthly compounding, the true annual cost is higher than 12%.</p><h2>What is EAR?</h2><p>The <strong>EAR</strong> (sometimes called the <strong>APY</strong>, or Annual Percentage Yield) accounts for the compounding effect within the year. It answers the question: <em>what is the actual yearly cost, including compounding?</em></p><pre><code>EAR = (1 + nominal rate / periods)<sup>periods</sup> &minus; 1</code></pre><p>For the 12% nominal rate with monthly compounding:</p><pre><code>EAR = (1 + 0.12 / 12)<sup>12</sup> &minus; 1 = 0.1268 (12.68%)</code></pre><p>This 0.68% difference may seem small, but it compounds over a 30-year mortgage into meaningful extra interest paid.</p><h2>Which rate should you use?</h2><p>For the annuity formula that underlies French amortisation, <strong>EAR is the correct rate</strong>. The formula assumes effective periodic rates, and using the nominal APR divided by periods introduces a systematic error in the calculated payment.</p><p>When comparing loan offers, always ask for the EAR and use it in your calculations.</p>',
  articleUnderstandingAmortizationScheduleTitle: 'Understanding Your Amortisation Schedule',
  articleUnderstandingAmortizationScheduleDescription:
    'Learn how to read an amortisation schedule, what each column means, and how to identify patterns in your loan repayment over time.',
  articleUnderstandingAmortizationScheduleDate: '31 March 2026',
  articleUnderstandingAmortizationScheduleBody: `
    <p>An amortisation schedule is a table that shows every payment over the life of a loan. It breaks down each payment into how much goes toward interest, how much reduces the principal, and what the remaining balance is after each payment. Understanding this table helps you track your real progress in paying off debt.</p>
    <h2>The columns explained</h2>
    <p>Each row in the schedule represents one payment. For a monthly loan, each row corresponds to one month. The key columns are:</p>
    <ul>
      <li><strong>Payment number</strong>: The sequence count (1, 2, 3&hellip; n)</li>
      <li><strong>Payment amount</strong>: The fixed monthly payment (constant throughout in French amortisation)</li>
      <li><strong>Interest portion</strong>: The part of the payment that goes to interest for that period</li>
      <li><strong>Principal portion</strong>: The part that reduces the outstanding balance</li>
      <li><strong>Remaining balance</strong>: The amount owed after the payment is applied</li>
    </ul>
    <h2>How interest and principal shift</h2>
    <p>In French amortisation, the payment is fixed, but its composition changes dramatically over time. Early payments are mostly interest; late payments are mostly principal. This happens because interest is calculated on the remaining balance, which is highest at the start.</p>
    <p>Consider the first few months of a &pound;200,000 mortgage at 6% EAR over 30 years (360 monthly payments). The periodic rate is roughly 0.00487 per month. In month 1, the interest on a &pound;200,000 balance is approximately &pound;974. The remaining &pound;373 of the payment reduces the principal. By month 180 (year 15), the balance is much lower, so the interest portion shrinks and the principal portion grows correspondingly.</p>
    <h2>The crossover point</h2>
    <p>There is a point in every amortisation schedule where interest and principal portions are equal. For a 30-year mortgage at 6%, this happens somewhere around year 12 or 13. Before this <strong>crossover point</strong>, you are paying more in interest than you are reducing principal. After it, the principal reduction accelerates.</p>
    <p>This has practical implications for extra payments. Making extra payments before the crossover point has a much larger impact on total interest paid than the same extra payments made later, because early extra payments skip all the future interest on that amount.</p>
    <h2>Reading your own schedule</h2>
    <p>When you run a calculation in Amorta, the schedule table shows exactly these columns for each payment interval. You can see the cumulative interest paid at the bottom of the table, which helps you understand the true cost of the loan over its full term.</p>
    <p>Pay attention to the interest column in the early rows to see how much of your payment is "wasted" on interest versus building equity. This perspective helps when evaluating whether to make extra payments or when comparing loan offers.</p>
  `,
  articleExtraPaymentsTitle: 'The Power of Extra Payments',
  articleExtraPaymentsDescription:
    'Learn how making extra payments towards your principal can dramatically reduce total interest and shorten your loan term.',
  articleExtraPaymentsDate: '31 March 2026',
  articleExtraPaymentsBody: `
    <p>One of the most effective ways to save money on a loan is to make extra payments towards the principal. Even small additional amounts can have an outsized impact over time, shaving years off your loan and thousands off the total interest paid.</p>
    <h2>How extra payments work</h2>
    <p>In French amortisation, every payment is split between interest and principal. The interest is calculated on the remaining balance, so when you reduce the principal faster, less interest accrues in subsequent periods.</p>
    <p>When you make an extra payment, the entire amount goes directly to reducing the principal &mdash; bypassing the normal interest calculation for that portion. This means you save not just the interest on that payment, but all future interest that would have accrued on that amount.</p>
    <p>The earlier you make extra payments in the loan term, the more powerful they become. This is because interest is calculated on the remaining balance, which is highest at the start of the loan.</p>
    <h2>A concrete example</h2>
    <p>Consider a &pound;300,000 mortgage at 6% EAR over 30 years. The monthly payment is approximately &pound;1,798. Without extra payments, you would pay &pound;347,200 in total interest over the life of the loan.</p>
    <p>Now suppose you pay an extra &pound;200 per month. After 30 years, you would have paid only &pound;240,600 in interest &mdash; a saving of over &pound;106,000. And you would have paid off the loan about 7 years early.</p>
    <p>Make the same &pound;200 extra payment, but wait until year 15 to start. The savings drop to about &pound;28,000 and you only shave 3 years off the term. The timing matters enormously.</p>
    <h2>Types of extra payments</h2>
    <p>There are two main approaches to extra payments:</p>
    <ul>
      <li><strong>Recurring extra payments</strong>: Adding a fixed amount to each monthly payment. For example, paying &pound;1,998 instead of &pound;1,798 every month.</li>
      <li><strong>Lump-sum extra payments</strong>: Making occasional larger payments when you have extra funds, such as from tax refunds, bonuses, or inheritance.</li>
    </ul>
    <p>Both approaches are effective. Recurring extra payments provide consistent progress and are easier to budget for. Lump-sum payments can make a big dent quickly when larger amounts are available.</p>
    <h2>Check for prepayment penalties</h2>
    <p>Before committing to extra payments, check your loan agreement for prepayment penalties. Some loans charge a fee if you pay off the loan early, which can offset the interest savings. This is more common in fixed-rate mortgages in some countries, though many modern loans have eliminated such penalties.</p>
    <h2>Run your own numbers</h2>
    <p>Use Amorta to model how extra payments would affect your specific loan. The schedule table makes it easy to see how extra payments change the balance over time and how much interest you save. Even a small extra payment can make a meaningful difference when you stick with it over time.</p>
  `,
  articleBiweeklyVsMonthlyPaymentsTitle: 'Biweekly vs Monthly Payments: Does It Really Matter?',
  articleBiweeklyVsMonthlyPaymentsDescription:
    'Explore whether switching from monthly to biweekly payments actually saves money, and understand the mechanics behind more frequent payment schedules.',
  articleBiweeklyVsMonthlyPaymentsDate: '31 March 2026',
  footerPrivacyPolicy: 'Privacy Policy',
  footerAbout: 'About',
  footerContact: 'Contact',
  footerTerms: 'Terms & Conditions',
  privacyPolicyTitle: 'Privacy Policy',
  privacyIntroductionTitle: 'Introduction',
  privacyIntroductionText: 'This Privacy Policy describes how Amorta ("we", "us", or "our") collects, uses, and protects your information when you use our website. We are committed to protecting your privacy and ensuring transparency about our data practices.',
  privacyDataCollectionTitle: 'Data We Collect',
  privacyDataCollectionText: 'We collect the following types of information:',
  privacyDataCollectionPersonal: 'Personal Information: We do not collect personal information unless you voluntarily contact us via email.',
  privacyDataCollectionNonPersonal: 'Non-Personal Information: We automatically collect browser type, IP address, device information, and usage patterns through cookies and analytics tools.',
  privacyDataUsageTitle: 'How We Use Your Data',
  privacyDataUsageText: 'We use the collected information for the following purposes:',
  privacyDataUsageAnalytics: 'Analytics: To understand how visitors use our site and improve user experience',
  privacyDataUsageCommunication: 'Communication: To respond to inquiries sent via email',
  privacyDataUsageImprovement: 'Site Improvement: To identify and fix technical issues and enhance functionality',
  privacyCookiesTitle: 'Cookies',
  privacyCookiesText: 'We use cookies and similar tracking technologies to enhance your browsing experience. Cookies are small text files stored on your device that help us understand user behaviour and preferences.',
  privacyCookiesPurpose: 'Our cookies are used for: remembering your preferences, analysing site traffic, and serving personalised advertisements through third-party services.',
  privacyThirdPartyTitle: 'Third-Party Services',
  privacyThirdPartyText: 'We use third-party services to enhance our website functionality and monetisation.',
  privacyThirdPartyAdsense: 'Google AdSense: We display advertisements served by Google AdSense. Google may use cookies and web beacons to collect data about your visits to this and other websites.',
  privacyThirdPartyCookies: 'These third parties may use cookies to serve ads based on your prior visits to this website and other sites on the Internet. You can opt out of personalised advertising by visiting Google\'s Ads Settings.',
  privacyUserRightsTitle: 'Your Rights',
  privacyUserRightsText: 'You have the right to control your data. You can disable cookies through your browser settings at any time. Please note that disabling cookies may affect the functionality of certain features on our website.',
  privacyContactTitle: 'Contact Us',
  privacyContactText: 'If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:',
  contactEmail: 'privacy@amorta.app',
  aboutTitle: 'About Amorta',
  aboutIdentityTitle: 'Who We Are',
  aboutIdentityText: 'Amorta is an independent project created and maintained by joaco.io. We are a small team passionate about making financial tools accessible and easy to understand for everyone.',
  aboutPurposeTitle: 'What We Provide',
  aboutPurposeText: 'Amorta provides a free, interactive French amortisation calculator that helps users understand loan repayment schedules, visualise principal and interest breakdowns, and compare different loan scenarios. Our tools are designed to empower users with clear, accurate financial calculations.',
  aboutAudienceTitle: 'Who Our Content Is For',
  aboutAudienceText: 'Our content is designed for anyone interested in understanding loan amortisation, including: home buyers comparing mortgage options, financial students learning about amortisation methods, real estate professionals needing quick calculations, and anyone planning a major purchase requiring a loan.',
  aboutCredibilityTitle: 'Our Expertise',
  aboutCredibilityText: 'Whilst we are not a financial institution, our calculator is built on established financial mathematics and thoroughly tested against industry standards. We are committed to accuracy and transparency in all our calculations and explanations.',
  aboutTransparencyTitle: 'Editorial Intent',
  aboutTransparencyText: 'Amorta is an informational and educational tool. We do not provide financial advice. Our goal is to help users understand the mechanics of French amortisation and make informed decisions. Always consult with a qualified financial advisor for personal financial decisions.',
  contactTitle: 'Contact Us',
  contactMethodsTitle: 'How to Reach Us',
  contactMethodsText: 'We welcome your feedback, questions, and suggestions. The best way to reach us is via email:',
  contactResponseTitle: 'Response Time',
  contactResponseText: 'We aim to respond to all enquiries within 2-3 business days. For technical issues or bug reports, please include details about your browser and device to help us assist you more effectively.',
  termsTitle: 'Terms & Conditions',
  termsAcceptanceTitle: 'Acceptance of Terms',
  termsAcceptanceText: 'By accessing and using Amorta, you accept and agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our website.',
  termsContentUseTitle: 'Use of Content',
  termsContentUseText: 'All content on Amorta is provided for informational and educational purposes only. You may use the calculator and read our articles for personal, non-commercial use. You may not reproduce, distribute, modify, or create derivative works from our content without explicit written permission.',
  termsIntellectualPropertyTitle: 'Intellectual Property',
  termsIntellectualPropertyText: 'All content, code, design elements, and functionality on this website are the property of Amorta and its creators. This includes but is not limited to text, graphics, logos, icons, images, audio clips, digital downloads, and software.',
  termsLiabilityTitle: 'Limitation of Liability',
  termsLiabilityText: 'Amorta provides its tools and content "as is" without warranties of any kind. Whilst we strive for accuracy, we do not guarantee that our calculator results are error-free or suitable for your specific situation. We are not liable for any financial decisions made based on information from this website.',
  termsExternalLinksTitle: 'External Links',
  termsExternalLinksText: 'Our website may contain links to third-party websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites.',
  termsModificationsTitle: 'Modifications to Terms',
  termsModificationsText: 'We reserve the right to modify these Terms & Conditions at any time. Changes will be effective immediately upon posting to this page. Your continued use of the website after any changes constitutes acceptance of the new terms.',
  seoTitlePrivacyPolicy: 'Privacy Policy | Amorta',
  seoTitleAbout: 'About | Amorta',
  seoTitleContact: 'Contact | Amorta',
  seoTitleTerms: 'Terms & Conditions | Amorta',
  seoDescriptionPrivacyPolicy: 'Read our Privacy Policy to understand how Amorta collects, uses, and protects your information. Learn about cookies, third-party services including Google AdSense, and your privacy rights.',
  seoDescriptionAbout: 'Learn about Amorta, a free French amortisation calculator. Discover who we are, what we provide, and our commitment to accurate financial education.',
  seoDescriptionContact: 'Get in touch with the Amorta team. Contact us via email for questions, feedback, or support regarding our French amortisation calculator.',
  seoDescriptionTerms: 'Read our Terms & Conditions to understand the rules and regulations for using Amorta\'s French amortisation calculator and educational content.',
  aboutLink: 'About',
  contactLink: 'Contact',
  privacyPolicyLink: 'Privacy',
  termsLink: 'Terms',
  articleLoanTermComparisonTitle: '15-Year vs 30-Year Loans: Making the Right Choice',
  articleLoanTermComparisonDescription:
    'Compare the tradeoffs between shorter and longer loan terms, understand the impact on monthly payments and total interest, and learn which option fits your financial situation.',
  articleLoanTermComparisonDate: '3 April 2026',
  articleLoanTermComparisonBody: `
    <p>When financing a major purchase like a home, one of the most consequential decisions you will make is the length of your loan term. The two most common options are 15-year and 30-year terms. Each has distinct advantages and tradeoffs that can affect your financial life for decades. Understanding these differences helps you choose the path that aligns with your goals.</p>
    <h2>The fundamental tradeoff</h2>
    <p>Shorter loan terms mean higher monthly payments but significantly less total interest paid. Longer terms spread the same principal over more payments, reducing the monthly burden but increasing the total cost of borrowing. This is not just arithmetic — it affects your monthly cash flow, your ability to save for other goals, and your overall financial flexibility.</p>
    <p>Consider a &pound;300,000 mortgage at 6% EAR. With a 30-year term, your monthly payment is approximately &pound;1,798, and you will pay about &pound;347,000 in total interest over the life of the loan. With a 15-year term, the monthly payment jumps to roughly &pound;2,532, but your total interest paid drops to around &pound;155,700. You save over &pound;191,000 in interest, but your monthly obligation is &pound;734 higher.</p>
    <h2>When a 15-year loan makes sense</h2>
    <p>A 15-year loan is ideal when you have stable, predictable income and your monthly budget can comfortably accommodate the higher payment without sacrificing emergency savings or retirement contributions. The benefits extend beyond interest savings:</p>
    <ul>
      <li><strong>Equity builds faster:</strong> With higher principal payments from the start, you own more of your home sooner. This matters if you need to sell or borrow against the property.</li>
      <li><strong>Psychological relief:</strong> Many borrowers experience significant stress reduction knowing their largest debt will be eliminated in half the time.</li>
      <li><strong>Retirement timing:</strong> If you plan to retire within 20 years, a 15-year loan ensures you enter retirement without mortgage payments.</li>
    </ul>
    <p>The key requirement is genuine affordability. If the higher payment forces you to carry credit card debt, skip retirement contributions, or live without an adequate emergency fund, the 15-year term becomes counterproductive.</p>
    <h2>When a 30-year loan is the better choice</h2>
    <p>A 30-year loan provides lower monthly payments, which creates financial breathing room. This flexibility is valuable in several situations:</p>
    <ul>
      <li><strong>Income variability:</strong> If your income fluctuates seasonally or you work in a volatile industry, lower mandatory payments reduce risk.</li>
      <li><strong>Early career stages:</strong> Young professionals with strong income growth potential may prefer lower payments now, planning to make extra payments as earnings increase.</li>
      <li><strong>Investment opportunities:</strong> The monthly savings can be directed towards tax-advantaged retirement accounts or other investments that may yield returns exceeding the mortgage rate.</li>
    </ul>
    <p>The 30-year term also functions as insurance against financial setbacks. If you lose your job or face unexpected expenses, lower mandatory payments are easier to manage than the rigid schedule of a 15-year loan.</p>
    <h2>The hidden cost of flexibility</h2>
    <p>The primary risk of a 30-year loan is behavioural. Many borrowers intend to make extra payments but fail to follow through consistently. Life intervenes, and the extra money gets spent elsewhere. Over 30 years, this inaction costs tens of thousands in unnecessary interest.</p>
    <p>If you choose a 30-year loan, consider automating extra principal payments. Set up automatic transfers for the amount you would have paid on a 15-year schedule. This removes the willpower requirement and captures most of the interest savings whilst preserving the flexibility to reduce or pause extra payments during hard times.</p>
    <h2>Interest rate differences</h2>
    <p>Lenders typically offer lower rates for 15-year loans because they carry less risk. The shorter term means less time for economic conditions to change, and the higher monthly payments indicate stronger borrower financial position. A 0.25% to 0.75% rate difference is common.</p>
    <p>This rate advantage compounds the savings from the shorter term. Using our earlier example, if the 15-year rate is 5.5% instead of 6%, the monthly payment drops to about &pound;2,452 and total interest falls to roughly &pound;141,400 — an additional &pound;14,300 saved compared to the same term at 6%.</p>
    <h2>Running your own numbers</h2>
    <p>Use Amorta to model both scenarios with your actual loan parameters. Compare not just the payment and total interest, but also examine how quickly you build equity in each scenario. The amortisation schedule reveals exactly when the crossover point occurs — when principal payments exceed interest payments — which happens much sooner with a 15-year loan.</p>
    <p>There is no universally correct choice. The right term depends on your income stability, other financial goals, risk tolerance, and discipline with discretionary funds. What matters is making the decision consciously rather than defaulting to the 30-year option simply because the monthly payment is lower.</p>
  `,
  articleLoanTermComparisonSeoTitle: '15-Year vs 30-Year Loans: Making the Right Choice | Amorta',
  articleLoanTermComparisonSeoDescription:
    'Compare 15-year and 30-year loan terms. Understand the tradeoffs between monthly payments and total interest to choose the right mortgage for your financial situation.',
  articleBiweeklyVsMonthlyPaymentsBody: `
    <p>Some lenders offer biweekly payment plans as a way to pay off your mortgage faster. The idea sounds appealing: instead of making 12 payments per year, you make 26 &mdash; effectively one extra monthly payment per year without feeling it. But does this actually work, and is it worth the switch?</p>
    <h2>How biweekly payments work</h2>
    <p>With a monthly payment schedule, you pay your mortgage 12 times per year. With biweekly, you pay half your monthly payment every two weeks. Since there are 52 weeks in a year, this results in 26 payments &mdash; or 13 full monthly equivalents per year.</p>
    <p>That extra payment goes entirely to principal, bypassing interest. Over a 30-year mortgage, this can shave 4 to 5 years off the loan term and save tens of thousands in interest.</p>
    <h2>The maths behind it</h2>
    <p>Consider a &pound;300,000 mortgage at 6% EAR over 30 years. The monthly payment is approximately &pound;1,798.</p>
    <p>With monthly payments, you make 360 payments totalling &pound;647,200 &mdash; &pound;347,200 of which is interest.</p>
    <p>With biweekly payments of &pound;899 (half the monthly amount), you make 26 payments per year. The extra &pound;1,798 per year reduces the principal faster. You end up paying off the loan in about 26 years instead of 30, saving roughly &pound;45,000 in total interest.</p>
    <h2>Watch out for fees</h2>
    <p>Some lenders charge setup fees or transaction fees for biweekly payment programmes, especially third-party services that manage the schedule. These fees can easily outweigh the interest savings. Before signing up, calculate whether the upfront cost is worth the benefit.</p>
    <p>Also verify that extra payments are applied directly to principal, not held as prepaid escrow. Some lenders may not process them correctly.</p>
    <h2>The equivalent strategy</h2>
    <p>Here is the key insight: a biweekly payment is mathematically equivalent to making one extra monthly payment per year. If you can budget for it, simply adding 1/12 of your monthly payment to each monthly payment achieves the same result &mdash; without any lender involvement or fees.</p>
    <p>For example, add &pound;150 to your &pound;1,798 monthly payment (&pound;1,948 total) and you get the same benefit as a biweekly schedule. This approach is more flexible because you control the extra amount and can adjust it as needed.</p>
    <h2>When biweekly makes sense</h2>
    <p>Biweekly payments can be a good fit if you get paid biweekly and want your mortgage payment to align with your income cycle. This synchronisation can make budgeting easier and ensure the payment is made on time.</p>
    <p>They also help if you struggle to save enough for a lump-sum extra payment. Spreading the extra across smaller, more frequent payments feels less painful for some borrowers.</p>
    <h2>Run the numbers yourself</h2>
    <p>Use Amorta to compare monthly versus biweekly schedules side by side. The difference in total interest paid and loan term makes the tradeoffs clear, so you can decide whether a biweekly plan or a simple monthly extra payment works better for your situation.</p>
  `,
}
