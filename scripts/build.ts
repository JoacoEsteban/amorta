import { buildSeoMetadata, resolvePublicSiteUrl } from "../src/domain/seo";
import { buildPendingResultState, type RouteState } from "../src/domain/share";
import { renderAppToHtml } from "../src/ssr";

const DIST_DIR = "./dist";
const STATIC_DIR = "./static";
const INDEX_PATH = `${DIST_DIR}/index.html`;
const RESULT_INDEX_PATH = `${DIST_DIR}/result/index.html`;
const PUBLIC_SITE_URL_PLACEHOLDER = "__PUBLIC_SITE_URL__";

const buildSeoHead = ({
  siteUrl,
  metadata,
}: {
  siteUrl: string;
  metadata: ReturnType<typeof buildSeoMetadata>;
}): string =>
  [
    `<title>${metadata.title}</title>`,
    `<meta name="description" content="${metadata.description}" />`,
    '<meta name="keywords" content="french amortization calculator, loan amortization, mortgage calculator, effective annual rate, payment schedule" />',
    '<meta name="robots" content="index,follow" />',
    '<meta name="theme-color" content="#f59e0b" />',
    `<meta name="amorta:site-url" content="${siteUrl}" />`,
    `<link rel="canonical" href="${metadata.canonicalUrl}" />`,
    '<link rel="icon" href="/favicon.svg" type="image/svg+xml" />',
    '<link rel="manifest" href="/site.webmanifest" />',
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="Amorta" />',
    `<meta property="og:title" content="${metadata.title}" />`,
    `<meta property="og:description" content="${metadata.description}" />`,
    `<meta property="og:url" content="${metadata.openGraphUrl}" />`,
    `<meta property="og:image" content="${metadata.openGraphImageUrl}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${metadata.title}" />`,
    `<meta name="twitter:description" content="${metadata.description}" />`,
    `<meta name="twitter:image" content="${metadata.openGraphImageUrl}" />`,
    '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8407180754020844" crossorigin="anonymous"></script>',
    `<script id="amorta-jsonld" type="application/ld+json">${metadata.jsonLd}</script>`,
  ].join("\n    ");

const copyStaticAssets = async (): Promise<void> => {
  await Bun.$`mkdir -p ${DIST_DIR}`;
  await Bun.$`cp -R ${STATIC_DIR}/. ${DIST_DIR}/`;
};

const patchStaticTextFiles = async (siteUrl: string): Promise<void> => {
  const textFiles = ["robots.txt", "sitemap.xml", "site.webmanifest"];

  await Promise.all(
    textFiles.map(async (fileName) => {
      const filePath = `${DIST_DIR}/${fileName}`;
      const content = await Bun.file(filePath).text();

      await Bun.write(
        filePath,
        content.replaceAll(PUBLIC_SITE_URL_PLACEHOLDER, siteUrl),
      );
    }),
  );
};

const renderHtmlDocument = ({
  shellHtml,
  siteUrl,
  routeState,
}: {
  shellHtml: string;
  siteUrl: string;
  routeState: RouteState;
}): string => {
  const metadata = buildSeoMetadata({ routeState, siteUrl });
  const appHtml = renderAppToHtml({
    initialRouteState: routeState,
    siteUrl,
  });

  return shellHtml
    .replace(/<title>.*?<\/title>/, "")
    .replace(/__AMORTA_ASSET_LINKS__/g, "")
    .replace(/__AMORTA_JSONLD__/g, "")
    .replace(/<meta[^>]+name="description"[^>]*>/, "")
    .replace(/<meta[^>]+name="keywords"[^>]*>/, "")
    .replace(/<meta[^>]+name="robots"[^>]*>/, "")
    .replace(/<meta[^>]+name="theme-color"[^>]*>/, "")
    .replace(/<meta[^>]+name="amorta:site-url"[^>]*>/, "")
    .replace(/<meta[^>]+property="og:[^"]+"[^>]*>/g, "")
    .replace(/<meta[^>]+name="twitter:[^"]+"[^>]*>/g, "")
    .replace(/<link rel="canonical"[^>]*>/, "")
    .replace(/<link rel="icon"[^>]*>/, "")
    .replace(/<link rel="manifest"[^>]*>/, "")
    .replace(/<script[^>]+googlesyndication[^>]*><\/script>/, "")
    .replace(/<script id="amorta-jsonld"[^>]*>[\s\S]*?<\/script>/, "")
    .replace("</head>", `    ${buildSeoHead({ siteUrl, metadata })}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    .replaceAll(PUBLIC_SITE_URL_PLACEHOLDER, siteUrl);
};

await Bun.$`bun build ./index.html --outdir ${DIST_DIR} --public-path /`;

const publicSiteUrl = resolvePublicSiteUrl(
  Bun.env.PUBLIC_SITE_URL ?? Bun.env.SITE_URL,
);

await copyStaticAssets();
await patchStaticTextFiles(publicSiteUrl);

const shellHtml = await Bun.file(INDEX_PATH).text();
const indexHtml = renderHtmlDocument({
  shellHtml,
  siteUrl: publicSiteUrl,
  routeState: { kind: "index" },
});
const resultHtml = renderHtmlDocument({
  shellHtml,
  siteUrl: publicSiteUrl,
  routeState: buildPendingResultState(null),
});

await Bun.write(INDEX_PATH, indexHtml);
await Bun.$`mkdir -p ${DIST_DIR}/result`;
await Bun.write(RESULT_INDEX_PATH, resultHtml);
