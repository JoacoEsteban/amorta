import index from "./index.html";

const port = Number(Bun.env.PORT ?? "3000");

const staticAssetResponse = (path: string, contentType: string) =>
  new Response(Bun.file(path), {
    headers: {
      "content-type": contentType,
    },
  });

const server = Bun.serve({
  port,
  routes: {
    "/": index,
    "/result": index,
    "/result/:payload": index,
    "/favicon.svg": staticAssetResponse("./static/favicon.svg", "image/svg+xml"),
    "/icon.svg": staticAssetResponse("./static/icon.svg", "image/svg+xml"),
    "/og-image.svg": staticAssetResponse("./static/og-image.svg", "image/svg+xml"),
    "/robots.txt": staticAssetResponse("./static/robots.txt", "text/plain; charset=utf-8"),
    "/sitemap.xml": staticAssetResponse("./static/sitemap.xml", "application/xml; charset=utf-8"),
    "/site.webmanifest": staticAssetResponse(
      "./static/site.webmanifest",
      "application/manifest+json; charset=utf-8",
    ),
  },
  development: {
    hmr: true,
    console: true,
  },
});

console.log(`Amorta available at http://localhost:${server.port}`);
