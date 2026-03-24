# Amorta

Interactive French amortization calculator with shareable readonly result URLs and payment-to-rate inversion.

## What It Does

Amorta models loans under the French amortization system and updates the result immediately as inputs change.

It supports:

- loan amount, term, payment frequency, and effective annual rate inputs
- optional payment override with derived EAR calculation
- stacked amortization chart for principal and interest by quota
- shareable readonly result URLs
- local persistence for the editable calculator session

## Stack

- Bun for runtime, package management, and asset serving
- React + TypeScript
- RxJS + `@react-rxjs/core` for state and derived calculations
- Recharts for visualization
- `ts-pattern` for control flow
- `react-hot-toast` for share notifications
- `typia` generated validator for shared-state DTO validation

## Development

Install dependencies:

```bash
bun install
```

Start the app with hot reload:

```bash
bun run dev
```

Run the tests:

```bash
bun test
```

Run typechecking:

```bash
bunx tsc --noEmit
```

Build the static production output:

```bash
bun run build
```

The build statically prerenders:

- `/` as the default interactive calculator view
- `/result/` as a pending shared-result page that hydrates into the decoded payload on load

Preview the built app locally:

```bash
bun run start:prod
```

Set the canonical deployment URL during build:

```bash
PUBLIC_SITE_URL=https://your-domain.example bun run build
```

## Sharing

The Share action copies a URL in the form:

```text
/result/{base64url-encoded-json-state}
```

Opening that URL loads a readonly result page that:

- does not hydrate from localStorage
- validates the decoded state before rendering
- lets the recipient start a fresh calculation or import the shared values back into the editable calculator

## Project Structure

- `src/domain/` contains amortization and share-state logic
- `src/state/` contains the RxJS-backed calculator store
- `src/typia/` contains the typia template and generated validator used for shared payload validation
- `test/` contains amortization and share-flow tests

## Notes

- The editable calculator persists its values in localStorage under the `amorta` key prefix.
- Shared result pages are intentionally readonly and only become editable after the user chooses `Edit this result`.
- SEO metadata, sitemap, robots, manifest, and social preview URLs use `PUBLIC_SITE_URL` when provided at build time.
- The production build emits real prerendered HTML, not an empty SPA shell, and hydrates into live state after load.
