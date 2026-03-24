import type { ReactNode } from "react";
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { P, match } from "ts-pattern";

import { App } from "./app";
import { buildSeoMetadata, readPublicSiteUrl } from "./domain/seo";
import { parseRouteState } from "./domain/share";
import { createLoanStore, defaultLoanStore } from "./state/loan-store";
import "./styles.css";

const container = document.getElementById("root");
const routeState = parseRouteState(new URL(window.location.href));
const publicSiteUrl = readPublicSiteUrl();

const appNode = match(routeState)
  .with({ kind: "index" }, () => (
    <App kind="calculator" routeState={routeState} store={defaultLoanStore} />
  ))
  .with({ kind: "result", decoded: { kind: "valid" } }, ({ decoded }) => (
    <App
      kind="calculator"
      routeState={routeState}
      store={createLoanStore({
        initialValues: decoded.values,
        mode: { kind: "shared-result" },
      })}
    />
  ))
  .with({ kind: "result", decoded: { kind: P.union("missing", "invalid") } }, (resolvedRouteState) => (
    <App kind="invalid-result" routeState={resolvedRouteState} />
  ))
  .exhaustive();

matchContainer(container).render(
  <StrictMode>
    <>
      <SeoHead routeState={routeState} siteUrl={publicSiteUrl} />
      {appNode}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "16px",
            background: "rgba(28, 25, 23, 0.95)",
            color: "#f5f5f4",
          },
        }}
      />
    </>
  </StrictMode>,
);

function SeoHead({
  routeState,
  siteUrl,
}: {
  routeState:
    | Extract<Parameters<typeof App>[0], { kind: "calculator" }>["routeState"]
    | Extract<Parameters<typeof App>[0], { kind: "invalid-result" }>["routeState"];
  siteUrl: string;
}) {
  useEffect(() => {
    const metadata = buildSeoMetadata({ routeState, siteUrl });

    document.title = metadata.title;
    upsertMetaTag("name", "description", metadata.description);
    upsertMetaTag("property", "og:title", metadata.title);
    upsertMetaTag("property", "og:description", metadata.description);
    upsertMetaTag("property", "og:url", metadata.openGraphUrl);
    upsertMetaTag("property", "og:image", metadata.openGraphImageUrl);
    upsertMetaTag("name", "twitter:title", metadata.title);
    upsertMetaTag("name", "twitter:description", metadata.description);
    upsertMetaTag("name", "twitter:image", metadata.openGraphImageUrl);
    upsertLinkTag("canonical", metadata.canonicalUrl);
    upsertJsonLd(metadata.jsonLd);
  }, [routeState, siteUrl]);

  return null;
}

const upsertMetaTag = (
  attributeName: "name" | "property",
  attributeValue: string,
  content: string,
): void => {
  const selector = `meta[${attributeName}="${attributeValue}"]`;
  const element = document.head.querySelector(selector) ?? document.createElement("meta");

  element.setAttribute(attributeName, attributeValue);
  element.setAttribute("content", content);

  match(element.isConnected)
    .with(true, () => null)
    .otherwise(() => document.head.appendChild(element));
};

const upsertLinkTag = (rel: string, href: string): void => {
  const selector = `link[rel="${rel}"]`;
  const element = document.head.querySelector(selector) ?? document.createElement("link");

  element.setAttribute("rel", rel);
  element.setAttribute("href", href);

  match(element.isConnected)
    .with(true, () => null)
    .otherwise(() => document.head.appendChild(element));
};

const upsertJsonLd = (jsonLd: string): void => {
  const element =
    document.head.querySelector("#amorta-jsonld") ?? document.createElement("script");

  element.setAttribute("id", "amorta-jsonld");
  element.setAttribute("type", "application/ld+json");
  element.textContent = jsonLd;

  match(element.isConnected)
    .with(true, () => null)
    .otherwise(() => document.head.appendChild(element));
};

function matchContainer(container: HTMLElement | null) {
  return {
    render: (node: ReactNode) =>
      match(container)
        .with(P.nullish, () => {
          throw new Error("Root container not found");
        })
        .otherwise((resolvedContainer) => createRoot(resolvedContainer).render(node)),
  };
}
