import { ArrowLeft } from 'lucide-react'
import { match } from 'ts-pattern'

import { ARTICLES, getArticleBySlug } from '../domain/blog'
import { buildLocalePath } from '../i18n/lingui.config'
import { useLocale, useTranslator } from '../state/locale.js'

type BlogIndexPageProps = {
  routeState: Extract<
    import('../domain/share').RouteState,
    { kind: 'blog-index' }
  >
}

export const BlogIndexPage = ({ routeState }: BlogIndexPageProps) => {
  const { _ } = useTranslator()
  const currentLocale = useLocale()

  const goBack = (): void => {
    window.location.assign(buildLocalePath(currentLocale, '/'))
  }

  return (
    <main className="app-shell">
      <div className="app-layout">
        <div className="page-toolbar">
          <div className="page-toolbar__copy">
            <p className="page-kicker">{_('blog')}</p>
            <h1 className="page-title">{_('blogIndexTitle')}</h1>
            <p className="page-summary">{_('blogIndexDescription')}</p>
          </div>
        </div>

        <div className="blog-index">
          {ARTICLES.map((article) => (
            <a
              key={article.slug}
              href={buildLocalePath(currentLocale, `/blog/${article.slug}`)}
              className="blog-card"
            >
              <div className="blog-card__meta">
                <time>{_(article.dateKey)}</time>
              </div>
              <h2 className="blog-card__title">{_(article.titleKey)}</h2>
              <p className="blog-card__description">
                {_(article.descriptionKey)}
              </p>
            </a>
          ))}
        </div>

        <button
          type="button"
          className="action-button action-button--secondary"
          onClick={goBack}
        >
          <ArrowLeft size={16} />
          <span>{_('backToCalculator')}</span>
        </button>

        <footer className="app-footer">
          <span>
            {_('madeBy')}{' '}
            <a
              href="https://joaco.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              joaco.io
            </a>
          </span>
        </footer>
      </div>
    </main>
  )
}

type ArticlePageProps = {
  routeState: Extract<
    import('../domain/share').RouteState,
    { kind: 'blog-article' }
  >
}

export const ArticlePage = ({ routeState }: ArticlePageProps) => {
  const { _ } = useTranslator()
  const currentLocale = useLocale()
  const article = getArticleBySlug(routeState.slug)

  const goBack = (): void => {
    window.location.assign(buildLocalePath(currentLocale, '/blog'))
  }

  return match(article)
    .with(undefined, () => (
      <main className="app-shell">
        <div className="app-layout">
          <div className="page-toolbar">
            <div className="page-toolbar__copy">
              <p className="page-kicker">{_('blog')}</p>
              <h1 className="page-title">{_('articleNotFound')}</h1>
            </div>
          </div>
          <button
            type="button"
            className="action-button action-button--secondary"
            onClick={goBack}
          >
            <ArrowLeft size={16} />
            <span>{_('backToBlog')}</span>
          </button>
        </div>
      </main>
    ))
    .otherwise((resolvedArticle) => (
      <main className="app-shell">
        <div className="app-layout">
          <div className="article-toolbar">
            <button
              type="button"
              className="action-button action-button--secondary"
              onClick={goBack}
            >
              <ArrowLeft size={16} />
              <span>{_('backToBlog')}</span>
            </button>
          </div>

          <article className="article-body">
            <header className="article-header">
              <p className="page-kicker">{_('blog')}</p>
              <h1 className="article-title">{_(resolvedArticle.titleKey)}</h1>
              <p className="article-meta">
                <time>{_(resolvedArticle.dateKey)}</time>
              </p>
            </header>
            <div
              className="article-content"
              dangerouslySetInnerHTML={{
                __html: _(resolvedArticle.bodyKey),
              }}
            />
          </article>

          <div className="article-cta">
            <p>{_('articleCtaText')}</p>
            <button
              type="button"
              className="action-button action-button--primary"
              onClick={() => {
                window.location.assign(buildLocalePath(currentLocale, '/'))
              }}
            >
              <span>{_('openCalculator')}</span>
            </button>
          </div>

          <footer className="app-footer">
            <span>
              {_('madeBy')}{' '}
              <a
                href="https://joaco.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                joaco.io
              </a>
            </span>
          </footer>
        </div>
      </main>
    ))
}
