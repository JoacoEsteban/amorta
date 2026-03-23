import type { ReactNode } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { P, match } from "ts-pattern";

import { App } from "./app";
import "./styles.css";

const container = document.getElementById("root");

matchContainer(container).render(
  <StrictMode>
    <App />
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
