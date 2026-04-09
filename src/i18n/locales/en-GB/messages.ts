import eduWhatBody from './content/articles/edu-what-body.html.txt' with { type: 'text' }
import eduHowBody from './content/articles/edu-how-body.html.txt' with { type: 'text' }
import eduTermsBody from './content/articles/edu-terms-body.html.txt' with { type: 'text' }
import eduWhenBody from './content/articles/edu-when-body.html.txt' with { type: 'text' }
import articleMathBody from './content/articles/article-math-body.html.txt' with { type: 'text' }
import articleAprVsEarBody from './content/articles/article-apr-vs-ear-body.html.txt' with { type: 'text' }
import articleUnderstandingAmortizationScheduleBody from './content/articles/article-understanding-amortization-schedule-body.html.txt' with { type: 'text' }
import articleExtraPaymentsBody from './content/articles/article-extra-payments-body.html.txt' with { type: 'text' }
import articleLoanTermComparisonBody from './content/articles/article-loan-term-comparison-body.html.txt' with { type: 'text' }
import articleBiweeklyVsMonthlyPaymentsBody from './content/articles/article-biweekly-vs-monthly-payments-body.html.txt' with { type: 'text' }
import articleCalculatingRemainingLoanBalanceBody from './content/articles/article-calculating-remaining-loan-balance-body.html.txt' with { type: 'text' }
import articleFactorsAffectingMortgageRatesBody from './content/articles/article-factors-affecting-mortgage-rates-body.html.txt' with { type: 'text' }
import articleNegativeAmortizationBody from './content/articles/article-negative-amortization-body.html.txt' with { type: 'text' }
import articleComparingLoanOffersBody from './content/articles/article-comparing-loan-offers-body.html.txt' with { type: 'text' }
import articleInterestOnlyLoanPeriodBody from './content/articles/article-interest-only-loan-period-body.html.txt' with { type: 'text' }
import articleBalloonPaymentLoanBody from './content/articles/article-balloon-payment-loan-body.html.txt' with { type: 'text' }
import articleLoanOriginationFeeBody from './content/articles/article-loan-origination-fee-body.html.txt' with { type: 'text' }

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
  eduWhatBody,
  eduHowTrigger: 'How does the maths work?',
  eduHowBody,
  eduTermsTrigger: 'Key terminology',
  eduTermsBody,
  eduWhenTrigger: 'When is this calculator useful?',
  eduWhenBody,
  blog: 'Blog',
  articles: 'Articles',
  blogIndexTitle: 'Articles',
  blogIndexDescription:
    'In-depth explanations of French amortisation, rate conventions, and financial mathematics.',
  backToCalculator: 'Back to calculator',
  backToBlog: 'Back to articles',
  articleNotFound: 'Article not found',
  relatedArticlesTitle: 'Related Articles',
  relatedArticlesDescription:
    'Continue with nearby topics to compare repayment mechanics, rate concepts, and practical loan trade-offs.',
  articleCtaText: 'Ready to run your own calculation?',
  seoTitleBlogIndex: 'Articles | Amorta',
  seoDescriptionBlogIndex:
    'Read in-depth articles about French amortisation, effective annual rates, and the mathematics behind constant-payment loans.',
  articleMathTitle: 'The Maths Behind French Amortisation',
  articleMathDescription:
    'A deep dive into the annuity formula, periodic rate conversion, and how each payment splits between interest and principal over the life of a French loan.',
  articleMathDate: '25 March 2026',
  articleMathBody,
  articleAprVsEarTitle: 'APR vs EAR: Why the Difference Matters',
  articleAprVsEarDescription:
    'Understand the difference between nominal APR and effective annual rate, and learn why EAR is the correct rate to use in financial calculations.',
  articleAprVsEarDate: '31 March 2026',
  articleAprVsEarBody,
  articleUnderstandingAmortizationScheduleTitle:
    'Understanding Your Amortisation Schedule',
  articleUnderstandingAmortizationScheduleDescription:
    'Learn how to read an amortisation schedule, what each column means, and how to identify patterns in your loan repayment over time.',
  articleUnderstandingAmortizationScheduleDate: '31 March 2026',
  articleUnderstandingAmortizationScheduleBody,
  articleExtraPaymentsTitle: 'The Power of Extra Payments',
  articleExtraPaymentsDescription:
    'Learn how making extra payments towards your principal can dramatically reduce total interest and shorten your loan term.',
  articleExtraPaymentsDate: '31 March 2026',
  articleExtraPaymentsBody,
  articleBiweeklyVsMonthlyPaymentsTitle:
    'Biweekly vs Monthly Payments: Does It Really Matter?',
  articleBiweeklyVsMonthlyPaymentsDescription:
    'Explore whether switching from monthly to biweekly payments actually saves money, and understand the mechanics behind more frequent payment schedules.',
  articleBiweeklyVsMonthlyPaymentsDate: '31 March 2026',
  footerPrivacyPolicy: 'Privacy Policy',
  footerAbout: 'About',
  footerContact: 'Contact',
  footerTerms: 'Terms & Conditions',
  privacyPolicyTitle: 'Privacy Policy',
  privacyIntroductionTitle: 'Introduction',
  privacyIntroductionText:
    'This Privacy Policy describes how Amorta ("we", "us", or "our") collects, uses, and protects your information when you use our website. We are committed to protecting your privacy and ensuring transparency about our data practices.',
  privacyDataCollectionTitle: 'Data We Collect',
  privacyDataCollectionText: 'We collect the following types of information:',
  privacyDataCollectionPersonal:
    'Personal Information: We do not collect personal information unless you voluntarily contact us via email.',
  privacyDataCollectionNonPersonal:
    'Non-Personal Information: We automatically collect browser type, IP address, device information, and usage patterns through cookies and analytics tools.',
  privacyDataUsageTitle: 'How We Use Your Data',
  privacyDataUsageText:
    'We use the collected information for the following purposes:',
  privacyDataUsageAnalytics:
    'Analytics: To understand how visitors use our site and improve user experience',
  privacyDataUsageCommunication:
    'Communication: To respond to inquiries sent via email',
  privacyDataUsageImprovement:
    'Site Improvement: To identify and fix technical issues and enhance functionality',
  privacyCookiesTitle: 'Cookies',
  privacyCookiesText:
    'We use cookies and similar tracking technologies to enhance your browsing experience. Cookies are small text files stored on your device that help us understand user behaviour and preferences.',
  privacyCookiesPurpose:
    'Our cookies are used for: remembering your preferences, analysing site traffic, and serving personalised advertisements through third-party services.',
  privacyThirdPartyTitle: 'Third-Party Services',
  privacyThirdPartyText:
    'We use third-party services to enhance our website functionality and monetisation.',
  privacyThirdPartyAdsense:
    'Google AdSense: We display advertisements served by Google AdSense. Google may use cookies and web beacons to collect data about your visits to this and other websites.',
  privacyThirdPartyCookies:
    "These third parties may use cookies to serve ads based on your prior visits to this website and other sites on the Internet. You can opt out of personalised advertising by visiting Google's Ads Settings.",
  privacyUserRightsTitle: 'Your Rights',
  privacyUserRightsText:
    'You have the right to control your data. You can disable cookies through your browser settings at any time. Please note that disabling cookies may affect the functionality of certain features on our website.',
  privacyContactTitle: 'Contact Us',
  privacyContactText:
    'If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:',
  contactEmail: 'support@joaco.io',
  aboutTitle: 'About Amorta',
  aboutIdentityTitle: 'Who We Are',
  aboutIdentityText:
    'Amorta is an independent project created and maintained by joaco.io. I am a solo developer passionate about making financial tools accessible and easy to understand for everyone.',
  aboutPurposeTitle: 'What We Provide',
  aboutPurposeText:
    'Amorta provides a free, interactive French amortisation calculator that helps users understand loan repayment schedules, visualise principal and interest breakdowns, and compare different loan scenarios. Our tools are designed to empower users with clear, accurate financial calculations.',
  aboutAudienceTitle: 'Who Our Content Is For',
  aboutAudienceText:
    'Our content is designed for anyone interested in understanding loan amortisation, including: home buyers comparing mortgage options, financial students learning about amortisation methods, real estate professionals needing quick calculations, and anyone planning a major purchase requiring a loan.',
  aboutCredibilityTitle: 'Our Expertise',
  aboutCredibilityText:
    'Whilst we are not a financial institution, our calculator is built on established financial mathematics and thoroughly tested against industry standards. We are committed to accuracy and transparency in all our calculations and explanations.',
  aboutTransparencyTitle: 'Editorial Intent',
  aboutTransparencyText:
    'Amorta is an informational and educational tool. We do not provide financial advice. Our goal is to help users understand the mechanics of French amortisation and make informed decisions. Always consult with a qualified financial advisor for personal financial decisions.',
  contactTitle: 'Contact Us',
  contactMethodsTitle: 'How to Reach Us',
  contactMethodsText:
    'We welcome your feedback, questions, and suggestions. The best way to reach us is via email:',
  contactResponseTitle: 'Response Time',
  contactResponseText:
    'We aim to respond to all enquiries within 2-3 business days. For technical issues or bug reports, please include details about your browser and device to help us assist you more effectively.',
  termsTitle: 'Terms & Conditions',
  termsAcceptanceTitle: 'Acceptance of Terms',
  termsAcceptanceText:
    'By accessing and using Amorta, you accept and agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our website.',
  termsContentUseTitle: 'Use of Content',
  termsContentUseText:
    'All content on Amorta is provided for informational and educational purposes only. You may use the calculator and read our articles for personal, non-commercial use. You may not reproduce, distribute, modify, or create derivative works from our content without explicit written permission.',
  termsIntellectualPropertyTitle: 'Intellectual Property',
  termsIntellectualPropertyText:
    'All content, code, design elements, and functionality on this website are the property of Amorta and its creators. This includes but is not limited to text, graphics, logos, icons, images, audio clips, digital downloads, and software.',
  termsLiabilityTitle: 'Limitation of Liability',
  termsLiabilityText:
    'Amorta provides its tools and content "as is" without warranties of any kind. Whilst we strive for accuracy, we do not guarantee that our calculator results are error-free or suitable for your specific situation. We are not liable for any financial decisions made based on information from this website.',
  termsExternalLinksTitle: 'External Links',
  termsExternalLinksText:
    'Our website may contain links to third-party websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites.',
  termsModificationsTitle: 'Modifications to Terms',
  termsModificationsText:
    'We reserve the right to modify these Terms & Conditions at any time. Changes will be effective immediately upon posting to this page. Your continued use of the website after any changes constitutes acceptance of the new terms.',
  seoTitlePrivacyPolicy: 'Privacy Policy | Amorta',
  seoTitleAbout: 'About | Amorta',
  seoTitleContact: 'Contact | Amorta',
  seoTitleTerms: 'Terms & Conditions | Amorta',
  seoDescriptionPrivacyPolicy:
    'Read our Privacy Policy to understand how Amorta collects, uses, and protects your information. Learn about cookies, third-party services including Google AdSense, and your privacy rights.',
  seoDescriptionAbout:
    'Learn about Amorta, a free French amortisation calculator. Discover who we are, what we provide, and our commitment to accurate financial education.',
  seoDescriptionContact:
    'Get in touch with the Amorta team. Contact us via email for questions, feedback, or support regarding our French amortisation calculator.',
  seoDescriptionTerms:
    "Read our Terms & Conditions to understand the rules and regulations for using Amorta's French amortisation calculator and educational content.",
  aboutLink: 'About',
  contactLink: 'Contact',
  privacyPolicyLink: 'Privacy',
  termsLink: 'Terms',
  articleLoanTermComparisonTitle:
    '15-Year vs 30-Year Loans: Making the Right Choice',
  articleLoanTermComparisonDescription:
    'Compare the tradeoffs between shorter and longer loan terms, understand the impact on monthly payments and total interest, and learn which option fits your financial situation.',
  articleLoanTermComparisonDate: '3 April 2026',
  articleLoanTermComparisonBody,
  articleLoanTermComparisonSeoTitle:
    '15-Year vs 30-Year Loans: Making the Right Choice | Amorta',
  articleLoanTermComparisonSeoDescription:
    'Compare 15-year and 30-year loan terms. Understand the tradeoffs between monthly payments and total interest to choose the right mortgage for your financial situation.',
  articleBiweeklyVsMonthlyPaymentsBody,
  articleCalculatingRemainingLoanBalanceTitle:
    'How to Calculate Your Remaining Loan Balance at Any Point',
  articleCalculatingRemainingLoanBalanceDescription:
    'Learn the mathematical formulae and methods to calculate your exact loan balance at any point during repayment, including practical examples and common pitfalls to avoid.',
  articleCalculatingRemainingLoanBalanceDate: '6 April 2026',
  articleCalculatingRemainingLoanBalanceBody,
  articleCalculatingRemainingLoanBalanceSeoTitle:
    'How to Calculate Your Remaining Loan Balance at Any Point | Amorta',
  articleCalculatingRemainingLoanBalanceSeoDescription:
    'Learn the mathematical formulae to calculate your exact loan balance at any point. Understand prospective and retrospective methods with practical examples.',
  articleFactorsAffectingMortgageRatesTitle:
    'Factors That Affect Your Mortgage Interest Rate',
  articleFactorsAffectingMortgageRatesDescription:
    'Learn the key factors lenders consider when setting mortgage rates, from credit scores to market conditions, and how you can improve your rate.',
  articleFactorsAffectingMortgageRatesDate: '6 April 2026',
  articleFactorsAffectingMortgageRatesBody,
  articleFactorsAffectingMortgageRatesSeoTitle:
    'Factors That Affect Your Mortgage Interest Rate | Amorta',
  articleFactorsAffectingMortgageRatesSeoDescription:
    'Discover what factors affect your mortgage interest rate. Learn how credit scores, loan-to-value ratios, debt-to-income ratios, and market conditions influence your rate.',
  articleNegativeAmortizationTitle: 'What Is Negative Amortisation?',
  articleNegativeAmortizationDescription:
    'Learn what negative amortisation means, why a loan balance can grow after a payment, and which contract features usually create that outcome.',
  articleNegativeAmortizationDate: '6 April 2026',
  articleNegativeAmortizationBody,
  articleNegativeAmortizationSeoTitle:
    'What Is Negative Amortisation? | Amorta',
  articleNegativeAmortizationSeoDescription:
    'Negative amortisation adds unpaid interest to your loan balance. Learn how it works, why it creates payment shock, and how to spot it early.',
  articleComparingLoanOffersTitle: 'How to Compare Loan Offers Effectively',
  articleComparingLoanOffersDescription:
    'Learn a systematic approach to compare loan offers beyond interest rates, including fees, terms, early repayment charges, and total cost of borrowing.',
  articleComparingLoanOffersDate: '7 April 2026',
  articleComparingLoanOffersBody,
  articleComparingLoanOffersSeoTitle:
    'How to Compare Loan Offers Effectively | Amorta',
  articleComparingLoanOffersSeoDescription:
    'Compare loan offers like a pro. Learn to evaluate total cost, fees, early repayment charges, and terms to find the best deal for your situation.',
  articleInterestOnlyLoanPeriodTitle: 'What Is an Interest-Only Loan Period?',
  articleInterestOnlyLoanPeriodDescription:
    'Learn how an interest-only loan period works, why payments start lower, and what changes when the loan begins amortising capital.',
  articleInterestOnlyLoanPeriodDate: '7 April 2026',
  articleInterestOnlyLoanPeriodBody,
  articleInterestOnlyLoanPeriodSeoTitle:
    'What Is an Interest-Only Loan Period? | Amorta',
  articleInterestOnlyLoanPeriodSeoDescription:
    'Learn what an interest-only loan period is, how it changes monthly payments, and why later payment resets can increase total borrowing cost.',
  articleBalloonPaymentLoanTitle: 'What Is a Balloon Payment Loan?',
  articleBalloonPaymentLoanDescription:
    'Learn how a balloon payment loan works, why scheduled payments stay lower, and what risks arise when a large balance falls due at maturity.',
  articleBalloonPaymentLoanDate: '8 April 2026',
  articleBalloonPaymentLoanBody,
  articleBalloonPaymentLoanSeoTitle:
    'What Is a Balloon Payment Loan? | Amorta',
  articleBalloonPaymentLoanSeoDescription:
    'Learn how a balloon payment loan works, why it leaves a large final balance, and what refinancing and liquidity risks matter before signing.',
  articleLoanOriginationFeeTitle: 'What Is a Loan Origination Fee?',
  articleLoanOriginationFeeDescription:
    'Learn what a loan origination fee covers, how it changes upfront cash needs, and why it can alter the true cost of borrowing.',
  articleLoanOriginationFeeDate: '9 April 2026',
  articleLoanOriginationFeeBody,
  articleLoanOriginationFeeSeoTitle:
    'What Is a Loan Origination Fee? | Amorta',
  articleLoanOriginationFeeSeoDescription:
    'Learn what a loan origination fee is, how it affects APR and completion costs, and when a higher fee may still lower your total borrowing cost.',
}
