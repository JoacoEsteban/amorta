import { describe, expect, test } from 'bun:test'

const config = await Bun.file('vercel.json').json()

describe('vercel default locale redirects', () => {
  test('redirects /en-US to the canonical no-locale routes', () => {
    expect(config.redirects).toContainEqual({
      source: '/en-US',
      destination: '/',
      permanent: true,
    })

    expect(config.redirects).toContainEqual({
      source: '/en-US/:path*',
      destination: '/:path*',
      permanent: true,
    })
  })
})
