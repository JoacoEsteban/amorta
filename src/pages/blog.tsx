import { ArrowLeft } from 'lucide-react'
import { match } from 'ts-pattern'

import { ARTICLES, getArticleBySlug } from '../domain/blog'
import { buildLocalePath } from '../i18n/lingui.config'
import { locale$ } from '../i18n/locale-state'
import { i18n } from '../i18n/index.js'

type BlogIndexPageProps = {
  routeState: Extract<
    import('../domain/share').RouteState,
    { kind: 'blog-index' }
  >
}

export const BlogIndexPage = ({ routeState }: BlogIndexPageProps) => {
  const currentLocale = routeState.locale ?? locale$.getValue()

  const goBack = (): void => {
    window.location.assign(buildLocalePath(currentLocale, '/'))
  }

  return (
    <main className="app-shell">
      <div className="app-layout">
        <div className="page-toolbar">
          <div className="page-toolbar__copy">
            <p className="page-kicker">{i18n._('blog')}</p>
            <h1 className="page-title">{i18n._('blogIndexTitle')}</h1>
            <p className="page-summary">{i18n._('blogIndexDescription')}</p>
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
                <time>{i18n._(article.dateKey)}</time>
              </div>
              <h2 className="blog-card__title">{i18n._(article.titleKey)}</h2>
              <p className="blog-card__description">
                {i18n._(article.descriptionKey)}
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
          <span>{i18n._('backToCalculator')}</span>
        </button>

        <footer className="app-footer">
          <span>
            {i18n._('madeBy')}{' '}
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
  const currentLocale = routeState.locale ?? locale$.getValue()
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
              <p className="page-kicker">{i18n._('blog')}</p>
              <h1 className="page-title">{i18n._('articleNotFound')}</h1>
            </div>
          </div>
          <button
            type="button"
            className="action-button action-button--secondary"
            onClick={goBack}
          >
            <ArrowLeft size={16} />
            <span>{i18n._('backToBlog')}</span>
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
              <span>{i18n._('backToBlog')}</span>
            </button>
          </div>

          <article className="article-body">
            <header className="article-header">
              <p className="page-kicker">{i18n._('blog')}</p>
              <h1 className="article-title">
                {i18n._(resolvedArticle.titleKey)}
              </h1>
              <p className="article-meta">
                <time>{i18n._(resolvedArticle.dateKey)}</time>
              </p>
            </header>
            <div
              className="article-content"
              dangerouslySetInnerHTML={{
                __html: i18n._(resolvedArticle.bodyKey),
              }}
            />
          </article>

          <div className="article-cta">
            <p>{i18n._('articleCtaText')}</p>
            <button
              type="button"
              className="action-button action-button--primary"
              onClick={() => {
                window.location.assign(buildLocalePath(currentLocale, '/'))
              }}
            >
              <span>{i18n._('openCalculator')}</span>
            </button>
          </div>

          <footer className="app-footer">
            <span>
              {i18n._('madeBy')}{' '}
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
