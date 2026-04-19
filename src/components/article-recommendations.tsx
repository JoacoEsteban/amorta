import type { ReactNode } from 'react'
import { P, match } from 'ts-pattern'

import type { Article } from '../domain/blog'
import { buildLocalePath } from '../i18n/lingui.config'
import { useLocale, useTranslator, type Translate } from '../state/locale.js'
import { cn } from '../lib/utils.js'

export type ArticleRecommendationsProps = {
  articles: readonly Article[]
  cta?: ReactNode
  titleKey?: Parameters<Translate>[0]
  subtitleKey?: Parameters<Translate>[0]
}

export const ArticleRecommendations = ({
  articles,
  cta,
  titleKey = 'relatedArticlesTitle',
  subtitleKey = 'relatedArticlesDescription',
}: ArticleRecommendationsProps) => {
  const { _ } = useTranslator()
  const currentLocale = useLocale()

  return match(articles.length)
    .with(0, () => null)
    .otherwise(() => (
      <div className="mt-12">
        <section className="related-articles">
          <div className="related-articles__header">
            <p className="page-kicker">{_('articles')}</p>
            <h2 className="related-articles__title">{_(titleKey)}</h2>
            <p className="related-articles__description">{_(subtitleKey)}</p>
          </div>

          <div className="blog-index flex max-lg:flex-col lg:grid lg:grid-cols-3 lg:items-start">
            {articles.map((article, i) => (
              <a
                key={article.slug}
                href={buildLocalePath(currentLocale, `/blog/${article.slug}`)}
                className={cn(
                  'blog-card',
                  match(i)
                    .with(0, () => 'col-span-2 _zoom-110')
                    .otherwise(() => null),
                )}
              >
                <div className="blog-card__meta">
                  <time>{_(article.dateKey)}</time>
                </div>
                <h3
                  className={cn(
                    'blog-card__title',
                    match(i)
                      .with(0, () => 'lg:zoom-175')
                      .otherwise(() => null),
                  )}
                >
                  {_(article.titleKey)}
                </h3>
                <p
                  className={cn(
                    'blog-card__description',
                    match(i)
                      .with(0, () => 'lg:zoom-125')
                      .otherwise(() => null),
                  )}
                >
                  {_(article.descriptionKey)}
                </p>
              </a>
            ))}

            {match(cta)
              .with(P.nullish, () => null)
              .otherwise((resolvedCta) => (
                <div className="col-span-2">{resolvedCta}</div>
              ))}
          </div>
        </section>
      </div>
    ))
}
