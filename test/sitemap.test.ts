import { describe, expect, it } from 'bun:test'

import { generateSitemap } from '../scripts/build'

describe('generateSitemap', () => {
  const siteUrl = 'https://amorta.example'

  it('keeps the root url slash and removes dangling slashes from route urls', () => {
    const sitemap = generateSitemap(siteUrl, 'en-US', 'en-US')

    expect(sitemap).toContain('<loc>https://amorta.example/</loc>')
    expect(sitemap).toContain('<loc>https://amorta.example/blog</loc>')
    expect(sitemap).toContain('<loc>https://amorta.example/about</loc>')
    expect(sitemap).toContain(
      '<loc>https://amorta.example/privacy-policy</loc>',
    )
    expect(sitemap).not.toContain('<loc>https://amorta.example/blog/</loc>')
    expect(sitemap).not.toContain('<loc>https://amorta.example/about/</loc>')
  })

  it('removes dangling slashes from localized alternate urls', () => {
    const sitemap = generateSitemap(siteUrl, 'es-AR', 'en-US')

    expect(sitemap).toContain('<loc>https://amorta.example/es-AR/blog</loc>')
    expect(sitemap).toContain(
      '<xhtml:link rel="alternate" hreflang="es-AR" href="https://amorta.example/es-AR/blog"/>',
    )
    expect(sitemap).toContain(
      '<xhtml:link rel="alternate" hreflang="x-default" href="https://amorta.example/blog"/>',
    )
    expect(sitemap).not.toContain(
      '<loc>https://amorta.example/es-AR/blog/</loc>',
    )
    expect(sitemap).not.toContain(
      '<xhtml:link rel="alternate" hreflang="es-AR" href="https://amorta.example/es-AR/blog"/>/',
    )
  })
})
