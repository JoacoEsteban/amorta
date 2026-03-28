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
]

export const getArticleBySlug = (slug: string): Article | undefined =>
  ARTICLES.find((a) => a.slug === slug)
