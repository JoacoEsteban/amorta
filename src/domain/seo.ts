import { match } from "ts-pattern";

import type { RouteState } from "./share";

export const DEFAULT_PUBLIC_SITE_URL = "https://amorta.example";

const SEO_DESCRIPTION =
  "Amorta is an interactive French amortization calculator with shareable results, payment-to-rate inversion, and a visual principal-versus-interest breakdown.";

const SHARE_DESCRIPTION =
  "Review a readonly French amortization result, inspect the quota breakdown, and continue the calculation in Amorta.";

const INVALID_DESCRIPTION =
  "The requested Amorta shared result is unavailable. Return to the calculator to create or inspect a valid amortization schedule.";

const buildBaseJsonLd = (siteUrl: string) => [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Amorta",
    url: `${siteUrl}/`,
    description: SEO_DESCRIPTION,
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Amorta",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: `${siteUrl}/`,
    description: SEO_DESCRIPTION,
  },
];

export type SeoMetadata = {
  title: string;
  description: string;
  canonicalUrl: string;
  openGraphUrl: string;
  openGraphImageUrl: string;
  jsonLd: string;
};

const normalizeSiteUrl = (siteUrl: string): string => siteUrl.replace(/\/+$/, "");

export const resolvePublicSiteUrl = (rawSiteUrl?: string | null): string => {
  const candidate = rawSiteUrl?.trim() ?? "";

  return match(candidate)
    .with("", () => DEFAULT_PUBLIC_SITE_URL)
    .with("__PUBLIC_SITE_URL__", () => DEFAULT_PUBLIC_SITE_URL)
    .otherwise((value) =>
      match(
        (() => {
          try {
            return new URL(value).origin;
          } catch {
            return null;
          }
        })(),
      )
        .with(null, () => DEFAULT_PUBLIC_SITE_URL)
        .otherwise((resolvedUrl) => normalizeSiteUrl(resolvedUrl)),
    );
};

export const readPublicSiteUrl = (): string =>
  resolvePublicSiteUrl(
    document
      .querySelector('meta[name="amorta:site-url"]')
      ?.getAttribute("content"),
  );

export const buildSeoMetadata = ({
  routeState,
  siteUrl,
}: {
  routeState:
    | Extract<RouteState, { kind: "index" | "result" }>
    | {
        kind: "result";
        payload: string | null;
        decoded: Exclude<Extract<RouteState, { kind: "result" }>["decoded"], { kind: "valid" }>;
      };
  siteUrl: string;
}): SeoMetadata => {
  const normalizedSiteUrl = resolvePublicSiteUrl(siteUrl);

  return match(routeState)
    .with({ kind: "index" }, () => ({
      title: "Amorta | French Amortization Calculator",
      description: SEO_DESCRIPTION,
      canonicalUrl: `${normalizedSiteUrl}/`,
      openGraphUrl: `${normalizedSiteUrl}/`,
      openGraphImageUrl: `${normalizedSiteUrl}/og-image.svg`,
      jsonLd: JSON.stringify(buildBaseJsonLd(normalizedSiteUrl)),
    }))
    .with({ kind: "result", decoded: { kind: "valid" } }, ({ payload }) => ({
      title: "Shared Result | Amorta",
      description: SHARE_DESCRIPTION,
      canonicalUrl: `${normalizedSiteUrl}/result/${payload ?? ""}`,
      openGraphUrl: `${normalizedSiteUrl}/result/${payload ?? ""}`,
      openGraphImageUrl: `${normalizedSiteUrl}/og-image.svg`,
      jsonLd: JSON.stringify(buildBaseJsonLd(normalizedSiteUrl)),
    }))
    .otherwise(() => ({
      title: "Shared Result Unavailable | Amorta",
      description: INVALID_DESCRIPTION,
      canonicalUrl: `${normalizedSiteUrl}/`,
      openGraphUrl: `${normalizedSiteUrl}/`,
      openGraphImageUrl: `${normalizedSiteUrl}/og-image.svg`,
      jsonLd: JSON.stringify(buildBaseJsonLd(normalizedSiteUrl)),
    }));
};
