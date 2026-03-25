# TODO

## SEO & Localization

- [x] **Locale-prefixed routes for SEO**
  - Implemented: `/en-US`, `/en-GB`, `/es-ES`, `/es-AR` with index and result routes
  - `SUPPORTED_LOCALES` is the single source of truth — adding a locale requires only a new messages file
  - `<html lang="...">` and `<link rel="alternate" hreflang="...">` auto-generated per page
  - SEO title/description pulled from i18n keys (`seoTitleIndex`, `seoDescription`, etc.)
  - Locale resolved from URL path on both server and client; falls back to stored/browser/default
  - LocaleSwitcher navigates to locale-prefixed URL; internal links preserve current locale

- [ ] **Informational landing content**
  - Add a brief explanatory section on the index page (e.g. "How French amortization works", key terminology)
  - Target long-tail informational keywords and satisfy search intent for users discovering the calculator
  - Content should be readable and helpful even before the user inputs any values

## Content & Funnel

- [ ] **Blog / editorial pages**
  - MVP: a single in-depth article (e.g. "How to compare mortgage offers", "Understanding EAR vs APR")
  - Articles should include educational context, link to the calculator, and capture broader information intent
  - Blog index page listing all articles

## Data Export

- [ ] **Export amortization table**
  - Add an "Export" button in the schedule section
  - Opens a modal/dropdown with options: CSV and JSON
  - CSV should include all schedule columns with localized number formatting
  - JSON should include the full structured result payload
