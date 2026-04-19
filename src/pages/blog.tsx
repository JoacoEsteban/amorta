import { ArrowLeft, ArrowRight, Calculator } from 'lucide-react'
import { match } from 'ts-pattern'

import { ARTICLES, getArticleBySlug, getRelatedArticles } from '../domain/blog'
import { buildLocalePath } from '../i18n/lingui.config'
import { useLocale, useTranslator } from '../state/locale.js'
import { Footer } from '../components/footer'
import { ArticleRecommendations } from '../components/article-recommendations'

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

        <div className="blog-index grid">
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
          className="action-button action-button--secondary blog-index__back-button"
          onClick={goBack}
        >
          <ArrowLeft size={16} />
          <span>{_('backToCalculator')}</span>
        </button>

        <Footer />
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
  const relatedArticles = getRelatedArticles(routeState.slug)

  const goBack = (): void => {
    window.location.assign(buildLocalePath(currentLocale, '/blog'))
  }

  const articleCta = (
    <div className="article-cta xl:sticky">
      <div className="article-cta__visual" aria-hidden="true">
        <div className="article-cta__visual-orb article-cta__visual-orb--amber" />
        <div className="article-cta__visual-orb article-cta__visual-orb--rose" />
        <div className="article-cta__device">
          <div className="article-cta__device-screen">
            <span className="article-cta__device-label">EAR</span>
            <strong>12.4%</strong>
            <span className="article-cta__device-subvalue">€248,560</span>
          </div>
          <div className="article-cta__device-grid">
            <span />
            <span />
            <span />
            <span />
            <span className="article-cta__device-key--accent" />
            <span />
          </div>
        </div>
        <div className="article-cta__chart">
          <span style={{ height: '32%' }} />
          <span style={{ height: '52%' }} />
          <span style={{ height: '74%' }} />
          <span style={{ height: '94%' }} />
        </div>
      </div>

      <div className="article-cta__copy">
        <div className="article-cta__eyebrow">
          <Calculator size={14} />
          <span>{_('liveCalculator')}</span>
        </div>
        <p className="article-cta__title">{_('articleCtaText')}</p>
        <button
          type="button"
          className="action-button action-button--primary article-cta__button"
          onClick={() => {
            window.location.assign(buildLocalePath(currentLocale, '/'))
          }}
        >
          <Calculator size={16} />
          <span>{_('openCalculator')}</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )

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

          {match(relatedArticles.length)
            .when(
              (count) => count > 0,
              () => (
                <ArticleRecommendations
                  articles={relatedArticles}
                  cta={articleCta}
                />
              ),
            )
            .otherwise(() => (
              <div className="mt-12 max-w-xl">{articleCta}</div>
            ))}

          <Footer />
        </div>
      </main>
    ))
}
