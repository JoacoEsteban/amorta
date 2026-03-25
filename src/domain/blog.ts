import { i18n } from '../i18n/index.js'

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

export const getArticleTitle = (article: Article): string =>
  i18n._(article.titleKey)

export const getArticleDescription = (article: Article): string =>
  i18n._(article.descriptionKey)
