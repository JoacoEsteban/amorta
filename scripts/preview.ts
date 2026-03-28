import { match, P } from 'ts-pattern'
import path from 'path'
import { identity } from 'rxjs'
import { DEFAULT_LOCALE } from '../src/i18n/lingui.config'

const port = Number(Bun.env.PORT ?? '3000')

if (import.meta.main) {
  exec()
}

export async function exec() {
  const server = Bun.serve({
    port,
    fetch: async (request): Promise<Response> => {
      const url = new URL(request.url)
      const matchedPath = match(url.pathname)
        .with(
          P.string.startsWith(`/${DEFAULT_LOCALE}/`),
          (path) =>
            ({
              location: path.replace(`/${DEFAULT_LOCALE}/`, '/'),
              redirect: true,
            }) as const,
        )
        .with(P.string.regex(/result\/\w+$/), (resultPath) =>
          resultPath.replace(/result\/\w+$/, '/result/index.html'),
        )
        .otherwise(identity)

      return match(matchedPath)
        .with(
          {
            redirect: true,
          },
          ({ location }) => {
            const response = new Response('', { status: 301 })
            response.headers.set('Location', location)

            return response
          },
        )
        .otherwise(async (matchedPath) => {
          const filePath = match(path.join('./dist', matchedPath))
            .with(P.string.regex(/\.\w+$/), identity)
            .otherwise((file) => path.join(file, 'index.html'))

          const fileResponse = await serveFile(filePath)

          return fileResponse ?? new Response('Not Found', { status: 404 })
        })
    },
  })

  console.log(
    `Amorta production preview available at http://localhost:${server.port}`,
  )
}

async function serveFile(path: string) {
  return Bun.file(path)
    .exists()
    .then((exists) =>
      match(exists)
        .with(true, () => new Response(Bun.file(path)))
        .otherwise(() => null),
    )
}
