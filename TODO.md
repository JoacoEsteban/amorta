# TODO

## Fixes

- [x] share result does not include the locale if present
- [x] dev does not serve /{locale}
- [x] prod runner renders /{locale} in english

## SEO & Localization

- [x] **Locale-prefixed routes for SEO**

  - Implemented: `/en-US`, `/en-GB`, `/es-ES`, `/es-AR` with index and result routes
  - `SUPPORTED_LOCALES` is the single source of truth — adding a locale requires only a new messages file
  - `<html lang="...">` and `<link rel="alternate" hreflang="...">` auto-generated per page
  - SEO title/description pulled from i18n keys (`seoTitleIndex`, `seoDescription`, etc.)
  - Locale resolved from URL path on both server and client; falls back to stored/browser/default
  - LocaleSwitcher: if locale in path → navigate to new locale-prefixed URL; if no locale in path → activate in-place (no reload)

- [x] **Informational landing content**
  - Implemented: `EducationalSection` component using Accordion with 4 content blocks
  - Content covers: "What is French amortization", "How the math works", "Key terminology", "When is this calculator useful"
  - All content translated across all 4 supported locales
  - Visible below the dashboard on the calculator page

## Content & Funnel

- [x] **Blog / editorial pages**
  - Implemented: `/blog` and `/blog/:slug` routes in both dev server and production preview
  - Blog index page listing all articles with title, description, and date
  - Single in-depth article: "The Math Behind French Amortization"
  - Article includes: annuity formula, periodic rate conversion, payment splitting, EAR solver, APR vs EAR, last payment adjustment
  - CTA at article bottom linking back to calculator
  - All content translated across all 4 supported locales
  - Footer link to blog added on calculator pages

## Data Export

- [x] **Export amortization table**
  - Implemented: "Export schedule" button in the schedule section header
  - Opens a modal dialog with CSV and JSON download options
  - CSV: includes all schedule rows + summary section (loan amount, years, rate, totals), localized number formatting
  - JSON: full structured payload with inputs, results summary, and complete schedule array
  - Custom `Dialog` component built without Radix dependencies
  - All UI text translated across all 4 supported locales
