import type { ReactNode } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { P, match } from "ts-pattern";

import { App } from "./app";
import { parseRouteState } from "./domain/share";
import { createLoanStore, defaultLoanStore } from "./state/loan-store";
import "./styles.css";

const container = document.getElementById("root");
const routeState = parseRouteState(new URL(window.location.href));

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
