const port = Number(Bun.env.PORT ?? '4173')

const indexFile = Bun.file('./dist/index.html')
const resultIndexFile = Bun.file('./dist/result/index.html')

const toDistPath = (pathname: string): string =>
  pathname.replace(/^\/+/, '').replace(/\/+$/, '')

const isAssetRequest = (pathname: string): boolean =>
  /\.[a-z0-9]+$/i.test(pathname)

const server = Bun.serve({
  port,
  fetch: (request) => {
    const url = new URL(request.url)
    const distPath = toDistPath(url.pathname)
    const file = Bun.file(`./dist/${distPath}`)
    const fallbackFile = url.pathname.startsWith('/result')
      ? resultIndexFile
      : indexFile

    return file
      .exists()
      .then((exists) =>
        exists
          ? new Response(file)
          : isAssetRequest(url.pathname)
            ? new Response('Not Found', { status: 404 })
            : new Response(fallbackFile),
      )
  },
})

console.log(
  `Amorta production preview available at http://localhost:${server.port}`,
)
