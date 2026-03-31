# Blog Post Creation Guide

This spec defines how agents create and localize blog posts for Amorta.

## Overview

Blog posts are i18n-based content stored in locale message files. Each post has:
- A **slug** (URL identifier)
- **Metadata keys** for title, description, date
- **HTML body content**
- **SEO keys** for search engine metadata

## Prerequisites

Before creating a new blog post, agents MUST read existing articles to:
1. Avoid duplicate topics
2. Match the existing writing style and tone
3. Follow naming conventions

### How to Read Existing Posts

1. **Article registry**: Read `src/domain/blog.ts` to see all article slugs
2. **Primary content**: Read `src/i18n/locales/en-US/messages.ts` and search for `article*` keys
3. **Translations**: Read other locale files to understand localization patterns

## Article Type

```ts
type Article = {
  slug: string           // URL-friendly identifier (e.g., "my-new-post")
  titleKey: string       // i18n key for title
  descriptionKey: string // i18n key for meta description
  dateKey: string        // i18n key for display date
  bodyKey: string        // i18n key for HTML body content
  seoTitleKey: string    // i18n key for SEO title
  seoDescriptionKey: string // i18n key for SEO meta description
}
```

## Supported Locales

| Locale | Path |
|--------|------|
| `en-US` | `src/i18n/locales/en-US/messages.ts` |
| `en-GB` | `src/i18n/locales/en-GB/messages.ts` |
| `es-ES` | `src/i18n/locales/es-ES/messages.ts` |
| `es-AR` | `src/i18n/locales/es-AR/messages.ts` |

## Creating a New Blog Post

### Step 1: Register the Article

Add a new entry to the `ARTICLES` array in `src/domain/blog.ts`:

```ts
export const ARTICLES: Article[] = [
  // ... existing articles
  {
    slug: 'my-new-post',
    titleKey: 'articleMyNewPostTitle',
    descriptionKey: 'articleMyNewPostDescription',
    dateKey: 'articleMyNewPostDate',
    bodyKey: 'articleMyNewPostBody',
    seoTitleKey: 'articleMyNewPostSeoTitle',
    seoDescriptionKey: 'articleMyNewPostSeoDescription',
  },
]
```

### Step 2: Add Primary Locale Content (en-US)

Add all keys to `src/i18n/locales/en-US/messages.ts`. The body should be HTML:

```ts
articleMyNewPostTitle: 'My New Post Title',
articleMyNewPostDescription: 'A brief description for the article card and meta tags.',
articleMyNewPostDate: 'March 2026',
articleMyNewPostBody: `
  <p>This is the first paragraph with <strong>bold text</strong>.</p>
  <h2>Section Heading</h2>
  <p>More content here.</p>
  <pre><code>code example</code></pre>
`,
articleMyNewPostSeoTitle: 'My New Post | Amorta',
articleMyNewPostSeoDescription: 'Full meta description for search engines, ideally 150-160 characters.',
```

### Step 3: Localize to Other Locales

For each additional locale (`es-ES`, `en-GB`, `es-AR`), add the corresponding translations:

**es-ES example:**
```ts
articleMyNewPostTitle: 'Título de Mi Nuevo Post',
articleMyNewPostDescription: 'Una breve descripción para la tarjeta del artículo.',
articleMyNewPostDate: 'Marzo 2026',
articleMyNewPostBody: `
  <p>Este es el primer párrafo con <strong>texto en negrita</strong>.</p>
  <h2>Encabezado de Sección</h2>
  <p>Más contenido aquí.</p>
`,
articleMyNewPostSeoTitle: 'Mi Nuevo Post | Amorta',
articleMyNewPostSeoDescription: 'Descripción meta completa para motores de búsqueda.',
```

### Step 4: Verify Completeness

Before considering the task complete, verify:
- [ ] Article entry exists in `src/domain/blog.ts`
- [ ] All 6 keys per locale are present (title, description, date, body, seoTitle, seoDescription)
- [ ] All 4 locales have the same keys
- [ ] Body content is valid HTML
- [ ] `jj status` shows clean or expected changes

## Key Naming Conventions

| Content | Key Pattern |
|---------|-------------|
| Title | `article{SlugPascalCase}Title` |
| Description | `article{SlugPascalCase}Description` |
| Date | `article{SlugPascalCase}Date` |
| Body | `article{SlugPascalCase}Body` |
| SEO Title | `article{SlugPascalCase}SeoTitle` |
| SEO Description | `article{SlugPascalCase}SeoDescription` |

Example for slug `french-vs-american`:
- `articleFrenchVsAmericanTitle`
- `articleFrenchVsAmericanDescription`
- etc.

## Content Guidelines

- **Body content**: Use HTML tags (`<p>`, `<h2>`, `<strong>`, `<ul>`, `<li>`, `<pre><code>`)
- **Date format**: "{Month} {Year}" (e.g., "March 2026")
- **Description**: 1-2 sentences, used in article cards and meta tags
- **SEO title**: "{Article Title} | Amorta" format
- **SEO description**: 150-160 characters for search result snippets

## Localization Notes

- The **slug is the same** across all locales (used in URLs)
- Content translations should be **culturally appropriate**, not literal
- Code examples may remain in English in all locales
- Mathematical formulas use HTML entities for special characters:
  - `×` (multiplication)
  - `−` (minus)
  - `≤`, `≥`, `≠` (comparison operators)
