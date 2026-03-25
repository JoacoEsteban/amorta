import { match, P } from 'ts-pattern'

import { stripLocaleFromPath } from './src/i18n/lingui.config'

const port = Number(Bun.env.PORT ?? '4173')

const indexFile = Bun.file('./dist/index.html')
const resultIndexFile = Bun.file('./dist/result/index.html')

const isAssetRequest = (pathname: string): boolean =>
  /\.[a-z0-9]+$/i.test(pathname)

const serveFile = (path: string) =>
  Bun.file(path)
    .exists()
    .then((exists) =>
      match(exists)
        .with(true, () => new Response(Bun.file(path)))
        .otherwise(() => null),
    )

const serveLocaleRoute = (
  localeDistPrefix: string,
  strippedPathname: string,
): Promise<Response> => {
  const distPath = strippedPathname.replace(/^\/+/, '').replace(/\/+$/, '')

  const findFile = match(distPath)
    .with('', () => serveFile(`${localeDistPrefix}/index.html`))
    .otherwise((path) => serveFile(`${localeDistPrefix}/${path}`))

  return findFile.then((response) =>
    match(response)
      .with(null, () =>
        match(isAssetRequest(strippedPathname))
          .with(true, () => new Response('Not Found', { status: 404 }))
          .otherwise(
            () => new Response(Bun.file(`${localeDistPrefix}/index.html`)),
          ),
      )
      .otherwise((resolvedResponse) => resolvedResponse),
  )
}

const serveDefaultRoute = (pathname: string): Promise<Response> => {
  const distPath = pathname.replace(/^\/+/, '').replace(/\/+$/, '')

  return serveFile(`./dist/${distPath}`).then((response) =>
    match(response)
      .with(null, () =>
        match([
          isAssetRequest(pathname),
          pathname.startsWith('/result'),
        ] as const)
          .with([true, P._], () => new Response('Not Found', { status: 404 }))
          .with([false, true], () => new Response(resultIndexFile))
          .with([false, false], () => new Response(indexFile))
          .exhaustive(),
      )
      .otherwise((resolvedResponse) => resolvedResponse),
  )
}

const server = Bun.serve({
  port,
  fetch: (request): Promise<Response> => {
    const url = new URL(request.url)
    const { locale, strippedPathname } = stripLocaleFromPath(url.pathname)

    return match(locale)
      .with(null, () => serveDefaultRoute(url.pathname))
      .otherwise((resolvedLocale) =>
        serveLocaleRoute(`./dist/${resolvedLocale}`, strippedPathname),
      )
  },
})

console.log(
  `Amorta production preview available at http://localhost:${server.port}`,
)
