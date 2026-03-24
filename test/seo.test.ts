import { describe, expect, it } from "bun:test";

import {
  buildSeoMetadata,
  DEFAULT_PUBLIC_SITE_URL,
  resolvePublicSiteUrl,
} from "../src/domain/seo";

describe("resolvePublicSiteUrl", () => {
  it("falls back to the default site url when no value is provided", () => {
    expect(resolvePublicSiteUrl("")).toBe(DEFAULT_PUBLIC_SITE_URL);
  });

  it("normalizes a valid url to its origin", () => {
    expect(resolvePublicSiteUrl("https://amorta.vercel.app/app")).toBe(
      "https://amorta.vercel.app",
    );
  });

  it("ignores unresolved placeholders", () => {
    expect(resolvePublicSiteUrl("__PUBLIC_SITE_URL__")).toBe(
      DEFAULT_PUBLIC_SITE_URL,
    );
  });
});

describe("buildSeoMetadata", () => {
  const siteUrl = "https://amorta.example";

  it("builds root metadata for the calculator page", () => {
    const metadata = buildSeoMetadata({
      routeState: { kind: "index" },
      siteUrl,
    });

    expect(metadata.title).toBe("Amorta | French Amortization Calculator");
    expect(metadata.canonicalUrl).toBe(`${siteUrl}/`);
  });

  it("builds a result canonical url for valid shared routes", () => {
    const metadata = buildSeoMetadata({
      routeState: {
        kind: "result",
        payload: "abc123",
        decoded: {
          kind: "valid",
          values: {
            loanAmount: "100000",
            years: "30",
            paymentsPerYear: 12,
            ear: "0.12",
            paymentAmount: "",
          },
        },
      },
      siteUrl,
    });

    expect(metadata.canonicalUrl).toBe(`${siteUrl}/result/abc123`);
    expect(metadata.openGraphUrl).toBe(`${siteUrl}/result/abc123`);
  });

  it("falls back to the root canonical url for invalid shared routes", () => {
    const metadata = buildSeoMetadata({
      routeState: {
        kind: "result",
        payload: "broken",
        decoded: {
          kind: "invalid",
          message: "Invalid payload",
        },
      },
      siteUrl,
    });

    expect(metadata.canonicalUrl).toBe(`${siteUrl}/`);
    expect(metadata.title).toBe("Shared Result Unavailable | Amorta");
  });
});
