import { match } from 'ts-pattern'

export type Article = {
  slug: string
  titleKey: string
  descriptionKey: string
  dateKey: string
  bodyKey: string
  date: Date
}

export const ARTICLES: Article[] = [
  {
    slug: 'loan-origination-fee',
    titleKey: 'articleLoanOriginationFeeTitle',
    descriptionKey: 'articleLoanOriginationFeeDescription',
    dateKey: 'articleLoanOriginationFeeDate',
    bodyKey: 'articleLoanOriginationFeeBody',
    date: new Date('2026-04-09'),
  },
  {
    slug: 'balloon-payment-loan',
    titleKey: 'articleBalloonPaymentLoanTitle',
    descriptionKey: 'articleBalloonPaymentLoanDescription',
    dateKey: 'articleBalloonPaymentLoanDate',
    bodyKey: 'articleBalloonPaymentLoanBody',
    date: new Date('2026-04-08'),
  },
  {
    slug: 'interest-only-loan-period',
    titleKey: 'articleInterestOnlyLoanPeriodTitle',
    descriptionKey: 'articleInterestOnlyLoanPeriodDescription',
    dateKey: 'articleInterestOnlyLoanPeriodDate',
    bodyKey: 'articleInterestOnlyLoanPeriodBody',
    date: new Date('2026-04-07'),
  },
  {
    slug: 'comparing-loan-offers',
    titleKey: 'articleComparingLoanOffersTitle',
    descriptionKey: 'articleComparingLoanOffersDescription',
    dateKey: 'articleComparingLoanOffersDate',
    bodyKey: 'articleComparingLoanOffersBody',
    date: new Date('2026-04-07'),
  },
  {
    slug: 'negative-amortization',
    titleKey: 'articleNegativeAmortizationTitle',
    descriptionKey: 'articleNegativeAmortizationDescription',
    dateKey: 'articleNegativeAmortizationDate',
    bodyKey: 'articleNegativeAmortizationBody',
    date: new Date('2026-04-06'),
  },
  {
    slug: 'factors-affecting-mortgage-rates',
    titleKey: 'articleFactorsAffectingMortgageRatesTitle',
    descriptionKey: 'articleFactorsAffectingMortgageRatesDescription',
    dateKey: 'articleFactorsAffectingMortgageRatesDate',
    bodyKey: 'articleFactorsAffectingMortgageRatesBody',
    date: new Date('2026-04-06'),
  },
  {
    slug: 'calculating-remaining-loan-balance',
    titleKey: 'articleCalculatingRemainingLoanBalanceTitle',
    descriptionKey: 'articleCalculatingRemainingLoanBalanceDescription',
    dateKey: 'articleCalculatingRemainingLoanBalanceDate',
    bodyKey: 'articleCalculatingRemainingLoanBalanceBody',
    date: new Date('2026-04-06'),
  },
  {
    slug: 'loan-term-comparison',
    titleKey: 'articleLoanTermComparisonTitle',
    descriptionKey: 'articleLoanTermComparisonDescription',
    dateKey: 'articleLoanTermComparisonDate',
    bodyKey: 'articleLoanTermComparisonBody',
    date: new Date('2026-04-03'),
  },
  {
    slug: 'extra-payments',
    titleKey: 'articleExtraPaymentsTitle',
    descriptionKey: 'articleExtraPaymentsDescription',
    dateKey: 'articleExtraPaymentsDate',
    bodyKey: 'articleExtraPaymentsBody',
    date: new Date('2026-03-31'),
  },
  {
    slug: 'understanding-amortization-schedule',
    titleKey: 'articleUnderstandingAmortizationScheduleTitle',
    descriptionKey: 'articleUnderstandingAmortizationScheduleDescription',
    dateKey: 'articleUnderstandingAmortizationScheduleDate',
    bodyKey: 'articleUnderstandingAmortizationScheduleBody',
    date: new Date('2026-03-31'),
  },
  {
    slug: 'apr-vs-ear',
    titleKey: 'articleAprVsEarTitle',
    descriptionKey: 'articleAprVsEarDescription',
    dateKey: 'articleAprVsEarDate',
    bodyKey: 'articleAprVsEarBody',
    date: new Date('2026-03-31'),
  },
  {
    slug: 'math-behind-french-amortization',
    titleKey: 'articleMathTitle',
    descriptionKey: 'articleMathDescription',
    dateKey: 'articleMathDate',
    bodyKey: 'articleMathBody',
    date: new Date('2026-03-25'),
  },
  {
    slug: 'biweekly-vs-monthly-payments',
    titleKey: 'articleBiweeklyVsMonthlyPaymentsTitle',
    descriptionKey: 'articleBiweeklyVsMonthlyPaymentsDescription',
    dateKey: 'articleBiweeklyVsMonthlyPaymentsDate',
    bodyKey: 'articleBiweeklyVsMonthlyPaymentsBody',
    date: new Date('2026-03-31'),
  },
].sort((a, b) => b.date.getTime() - a.date.getTime())

export const getArticleBySlug = (slug: string): Article | undefined =>
  ARTICLES.find((a) => a.slug === slug)

export const RELATED_ARTICLE_SLUGS: Record<string, readonly string[]> = {
  'loan-origination-fee': [
    'comparing-loan-offers',
    'apr-vs-ear',
    'factors-affecting-mortgage-rates',
  ],
  'balloon-payment-loan': [
    'interest-only-loan-period',
    'comparing-loan-offers',
    'negative-amortization',
  ],
  'interest-only-loan-period': [
    'negative-amortization',
    'understanding-amortization-schedule',
    'extra-payments',
  ],
  'comparing-loan-offers': [
    'factors-affecting-mortgage-rates',
    'loan-term-comparison',
    'apr-vs-ear',
  ],
  'negative-amortization': [
    'understanding-amortization-schedule',
    'calculating-remaining-loan-balance',
    'extra-payments',
  ],
  'factors-affecting-mortgage-rates': [
    'loan-term-comparison',
    'apr-vs-ear',
    'biweekly-vs-monthly-payments',
  ],
  'calculating-remaining-loan-balance': [
    'understanding-amortization-schedule',
    'extra-payments',
    'negative-amortization',
  ],
  'loan-term-comparison': [
    'extra-payments',
    'factors-affecting-mortgage-rates',
    'biweekly-vs-monthly-payments',
  ],
  'extra-payments': [
    'understanding-amortization-schedule',
    'calculating-remaining-loan-balance',
    'loan-term-comparison',
  ],
  'understanding-amortization-schedule': [
    'calculating-remaining-loan-balance',
    'extra-payments',
    'math-behind-french-amortization',
  ],
  'apr-vs-ear': [
    'math-behind-french-amortization',
    'factors-affecting-mortgage-rates',
    'biweekly-vs-monthly-payments',
  ],
  'math-behind-french-amortization': [
    'apr-vs-ear',
    'understanding-amortization-schedule',
    'calculating-remaining-loan-balance',
  ],
  'biweekly-vs-monthly-payments': [
    'extra-payments',
    'loan-term-comparison',
    'apr-vs-ear',
  ],
}

export const getRelatedArticles = (slug: string): Article[] => {
  const curatedArticles = (RELATED_ARTICLE_SLUGS[slug] ?? [])
    .map(getArticleBySlug)
    .filter((article): article is Article => Boolean(article))

  return curatedArticles
}
