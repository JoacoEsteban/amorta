const DIST_DIR = "./dist";
const STATIC_DIR = "./static";
const INDEX_PATH = `${DIST_DIR}/index.html`;
const PUBLIC_SITE_URL_PLACEHOLDER = "__PUBLIC_SITE_URL__";
const JSON_LD_PLACEHOLDER = "__AMORTA_JSONLD__";
const ASSET_LINKS_PLACEHOLDER = "__AMORTA_ASSET_LINKS__";
const DEFAULT_PUBLIC_SITE_URL = "https://amorta.example";

const normalizeSiteUrl = (siteUrl: string): string => siteUrl.replace(/\/+$/, "");

const resolvePublicSiteUrl = (rawSiteUrl?: string): string => {
  const candidate = rawSiteUrl?.trim() ?? "";

  return candidate.length === 0
    ? DEFAULT_PUBLIC_SITE_URL
    : (() => {
        try {
          return normalizeSiteUrl(new URL(candidate).origin);
        } catch {
          return DEFAULT_PUBLIC_SITE_URL;
        }
      })();
};

const buildJsonLd = (siteUrl: string): string =>
  JSON.stringify([
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Amorta",
      url: `${siteUrl}/`,
      description:
        "Amorta is an interactive French amortization calculator with shareable results, payment-to-rate inversion, and a visual principal-versus-interest breakdown.",
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Amorta",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      url: `${siteUrl}/`,
      description:
        "Amorta is an interactive French amortization calculator with shareable results, payment-to-rate inversion, and a visual principal-versus-interest breakdown.",
    },
  ]);

const buildAssetLinks = (): string =>
  [
    '<link rel="icon" href="/favicon.svg" type="image/svg+xml" />',
    '<link rel="manifest" href="/site.webmanifest" />',
  ].join("\n    ");

const buildSeoHead = (siteUrl: string): string =>
  [
    '<meta name="description" content="Amorta is an interactive French amortization calculator with shareable results, payment-to-rate inversion, and a visual principal-versus-interest breakdown." />',
    '<meta name="keywords" content="french amortization calculator, loan amortization, mortgage calculator, effective annual rate, payment schedule" />',
    '<meta name="robots" content="index,follow" />',
    '<meta name="theme-color" content="#f59e0b" />',
    `<meta name="amorta:site-url" content="${siteUrl}" />`,
    `<link rel="canonical" href="${siteUrl}/" />`,
    buildAssetLinks(),
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="Amorta" />',
    '<meta property="og:title" content="Amorta | French Amortization Calculator" />',
    '<meta property="og:description" content="Model French-style loan amortization, inspect each quota, and share readonly results with a single URL." />',
    `<meta property="og:url" content="${siteUrl}/" />`,
    `<meta property="og:image" content="${siteUrl}/og-image.svg" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    '<meta name="twitter:title" content="Amorta | French Amortization Calculator" />',
    '<meta name="twitter:description" content="Interactive French amortization calculator with shareable readonly result URLs and payment-to-rate inversion." />',
    `<meta name="twitter:image" content="${siteUrl}/og-image.svg" />`,
    `<script id="amorta-jsonld" type="application/ld+json">${buildJsonLd(siteUrl)}</script>`,
  ].join("\n    ");

const copyStaticAssets = async (): Promise<void> => {
  await Bun.$`mkdir -p ${DIST_DIR}`;
  await Bun.$`cp -R ${STATIC_DIR}/. ${DIST_DIR}/`;
};

const patchIndexHtml = async (siteUrl: string): Promise<void> => {
  const indexHtml = await Bun.file(INDEX_PATH).text();
  const patchedHtml = indexHtml
    .replace(/<title>.*?<\/title>/, "<title>Amorta | French Amortization Calculator</title>")
    .replaceAll(PUBLIC_SITE_URL_PLACEHOLDER, siteUrl)
    .replace(ASSET_LINKS_PLACEHOLDER, buildAssetLinks())
    .replace(JSON_LD_PLACEHOLDER, buildJsonLd(siteUrl))
    .replace("</head>", `    ${buildSeoHead(siteUrl)}\n  </head>`);

  await Bun.write(INDEX_PATH, patchedHtml);
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

await Bun.$`bun build ./index.html --outdir ${DIST_DIR} --public-path /`;

const publicSiteUrl = resolvePublicSiteUrl(
  Bun.env.PUBLIC_SITE_URL ?? Bun.env.SITE_URL,
);

await copyStaticAssets();
await patchIndexHtml(publicSiteUrl);
await patchStaticTextFiles(publicSiteUrl);
