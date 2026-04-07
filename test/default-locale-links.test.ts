import { describe, expect, test } from 'bun:test'
import * as cheerio from 'cheerio'

import { renderHtmlDocument } from '../src/server/render-document'
import { buildLocalePath } from '../src/i18n/lingui.config'

describe('default locale URLs', () => {
  test('buildLocalePath omits the default locale prefix', () => {
    expect(buildLocalePath('en-US', '/')).toBe('/')
    expect(buildLocalePath('en-US', '/blog')).toBe('/blog')
    expect(buildLocalePath('en-US', '/result/abc123')).toBe('/result/abc123')
    expect(buildLocalePath('es-ES', '/blog')).toBe('/es-ES/blog')
  })

  test('rendered default locale pages do not emit /en-US links', async () => {
    const html = await renderHtmlDocument({
      shellHtml: `<!doctype html><html lang="en"><head><title>Amorta</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>`,
      siteUrl: 'https://amorta.example',
      routeState: { kind: 'index', locale: 'en-US' },
      locale: 'en-US',
      assetLinks: '',
      appScript: '',
    })

    const $ = cheerio.load(html)
    const hrefs = [
      ...$('a[href]')
        .toArray()
        .map((element) => $(element).attr('href') ?? ''),
      ...$('link[href]')
        .toArray()
        .map((element) => $(element).attr('href') ?? ''),
      ...$('meta[property="og:url"]')
        .toArray()
        .map((element) => $(element).attr('content') ?? ''),
    ]

    expect(hrefs.some((href) => href.includes('/en-US'))).toBe(false)
    expect(hrefs).toContain('/blog')
    expect(hrefs).toContain('/about')
    expect(hrefs).toContain('https://amorta.example/')
  })
})
