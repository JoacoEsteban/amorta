# TODO

## SEO & Localization

- [ ] **Locale-prefixed routes for SEO**
  - Implement subpath routing (`/es`, `/es-ar`, `/en-gb`) so each locale gets its own crawlable URL
  - Set `<html lang="...">` and `<link rel="alternate" hreflang="...">` accordingly
  - Translate page metadata (title, description) per locale
  - Avoid locale-switching state that is client-only — content must be in the HTML at request time

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
