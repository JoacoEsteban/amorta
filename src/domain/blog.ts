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
