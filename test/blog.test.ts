import { describe, expect, test } from 'bun:test'

import { ARTICLES, getArticleBySlug, type Article } from '../src/domain/blog'

describe('blog articles', () => {
  test('articles are sorted from newest to oldest', () => {
    for (let i = 0; i < ARTICLES.length - 1; i++) {
      const current = ARTICLES[i]!
      const next = ARTICLES[i + 1]!
      expect(current.date.getTime()).toBeGreaterThanOrEqual(next.date.getTime())
    }
  })

  test('all articles have a date', () => {
    ARTICLES.forEach((article) => {
      expect(article.date instanceof Date).toBe(true)
    })
  })

  test('all articles have required fields', () => {
    ARTICLES.forEach((article) => {
      expect(article.slug.length).toBeGreaterThan(0)
      expect(article.titleKey.length).toBeGreaterThan(0)
      expect(article.descriptionKey.length).toBeGreaterThan(0)
      expect(article.dateKey.length).toBeGreaterThan(0)
      expect(article.bodyKey.length).toBeGreaterThan(0)
    })
  })

  test('getArticleBySlug returns the correct article', () => {
    const article = getArticleBySlug('math-behind-french-amortization')
    expect(article).toBeDefined()
    expect(article?.slug).toBe('math-behind-french-amortization')
  })

  test('getArticleBySlug returns undefined for unknown slug', () => {
    const article = getArticleBySlug('non-existent-slug')
    expect(article).toBeUndefined()
  })

  test('no duplicate slugs', () => {
    const slugs = ARTICLES.map((a) => a.slug)
    const uniqueSlugs = new Set(slugs)
    expect(uniqueSlugs.size).toBe(slugs.length)
  })

  test('articles have unique dates or proper sorting within same date', () => {
    const dates = ARTICLES.map((a) => a.date.getTime())
    const sortedDates = [...dates].sort((a, b) => b - a)
    expect(dates).toEqual(sortedDates)
  })
})
