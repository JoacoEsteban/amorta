export type Article = {
  slug: string
  titleKey: string
  descriptionKey: string
  dateKey: string
  bodyKey: string
}

export const ARTICLES: Article[] = [
  {
    slug: 'math-behind-french-amortization',
    titleKey: 'articleMathTitle',
    descriptionKey: 'articleMathDescription',
    dateKey: 'articleMathDate',
    bodyKey: 'articleMathBody',
  },
  {
    slug: 'apr-vs-ear',
    titleKey: 'articleAprVsEarTitle',
    descriptionKey: 'articleAprVsEarDescription',
    dateKey: 'articleAprVsEarDate',
    bodyKey: 'articleAprVsEarBody',
  },
  {
    slug: 'understanding-amortization-schedule',
    titleKey: 'articleUnderstandingAmortizationScheduleTitle',
    descriptionKey: 'articleUnderstandingAmortizationScheduleDescription',
    dateKey: 'articleUnderstandingAmortizationScheduleDate',
    bodyKey: 'articleUnderstandingAmortizationScheduleBody',
  },
  {
    slug: 'extra-payments',
    titleKey: 'articleExtraPaymentsTitle',
    descriptionKey: 'articleExtraPaymentsDescription',
    dateKey: 'articleExtraPaymentsDate',
    bodyKey: 'articleExtraPaymentsBody',
  },
]

export const getArticleBySlug = (slug: string): Article | undefined =>
  ARTICLES.find((a) => a.slug === slug)
