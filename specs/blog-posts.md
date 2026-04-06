# Blog Post Creation Guide

This spec defines how agents create and localize blog posts for Amorta.

## Overview

Blog posts are i18n-based content stored in locale message files. Each post has:

- A **slug** (URL identifier)
- **Metadata keys** for title, description, date
- **HTML body content** (in separate `.html.txt` files)
- **SEO keys** for search engine metadata

## Prerequisites

Before creating a new blog post, agents MUST read existing articles to:

1. Avoid duplicate topics
2. Match the existing writing style and tone
3. Follow naming conventions

### How to Read Existing Posts

1. **Article registry**: Read `src/domain/blog.ts` to see all article slugs
2. **Primary content**: Read `src/i18n/locales/en-US/messages.ts` and search for `article*` keys
3. **Body content**: Read `src/i18n/locales/{locale}/content/articles/*.html.txt`
4. **Translations**: Read other locale files to understand localization patterns

## Article Type

```ts
type Article = {
  slug: string // URL-friendly identifier (e.g., "my-new-post")
  titleKey: string // i18n key for title
  descriptionKey: string // i18n key for meta description
  dateKey: string // i18n key for display date
  bodyKey: string // i18n key for HTML body content
  seoTitleKey: string // i18n key for SEO title
  seoDescriptionKey: string // i18n key for SEO meta description
}
```

## Supported Locales

| Locale  | Path                                 | Content Directory                          |
| ------- | ------------------------------------ | ------------------------------------------ |
| `en-US` | `src/i18n/locales/en-US/messages.ts` | `src/i18n/locales/en-US/content/articles/` |
| `en-GB` | `src/i18n/locales/en-GB/messages.ts` | `src/i18n/locales/en-GB/content/articles/` |
| `es-ES` | `src/i18n/locales/es-ES/messages.ts` | `src/i18n/locales/es-ES/content/articles/` |
| `es-AR` | `src/i18n/locales/es-AR/messages.ts` | `src/i18n/locales/es-AR/content/articles/` |

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

### Step 2: Create Body Content Files

For each locale, create an HTML content file at `src/i18n/locales/{locale}/content/articles/article-my-new-post-body.html.txt`.

**Primary locale (en-US) example:**

File: `src/i18n/locales/en-US/content/articles/article-my-new-post-body.html.txt`

```html
<p>This is the first paragraph with <strong>bold text</strong>.</p>
<h2>Section Heading</h2>
<p>More content here.</p>
<pre><code>code example</code></pre>
```

### Step 3: Add Metadata to Message Files

Add the import statement and metadata keys to each locale's `messages.ts`:

**Import statement (add at top of file):**

```ts
import articleMyNewPostBody from './content/articles/article-my-new-post-body.html.txt' with { type: 'text' }
```

**Metadata keys (in the messages object):**

```ts
articleMyNewPostTitle: 'My New Post Title',
articleMyNewPostDescription: 'A brief description for the article card and meta tags.',
articleMyNewPostDate: 'March 2026',
articleMyNewPostBody,
articleMyNewPostSeoTitle: 'My New Post | Amorta',
articleMyNewPostSeoDescription: 'Full meta description for search engines, ideally 150-160 characters.',
```

### Step 4: Localize to Other Locales

For each additional locale (`es-ES`, `en-GB`, `es-AR`):

1. Create the body HTML file with translated content
2. Add the import statement to `messages.ts`
3. Add the metadata keys

**es-ES example:**

File: `src/i18n/locales/es-ES/content/articles/article-my-new-post-body.html.txt`

```html
<p>Este es el primer párrafo con <strong>texto en negrita</strong>.</p>
<h2>Encabezado de Sección</h2>
<p>Más contenido aquí.</p>
```

File: `src/i18n/locales/es-ES/messages.ts`

```ts
// Add import at top
import articleMyNewPostBody from './content/articles/article-my-new-post-body.html.txt' with { type: 'text' }

// Add keys to messages object
articleMyNewPostTitle: 'Título de Mi Nuevo Post',
articleMyNewPostDescription: 'Una breve descripción para la tarjeta del artículo.',
articleMyNewPostDate: 'Marzo 2026',
articleMyNewPostBody,
articleMyNewPostSeoTitle: 'Mi Nuevo Post | Amorta',
articleMyNewPostSeoDescription: 'Descripción meta completa para motores de búsqueda.',
```

### Step 5: Verify Completeness

Before considering the task complete, verify:

- [ ] Article entry exists in `src/domain/blog.ts`
- [ ] Body HTML files exist for all 4 locales
- [ ] Import statements added to all 4 `messages.ts` files
- [ ] All 6 metadata keys per locale are present (title, description, date, body, seoTitle, seoDescription)
- [ ] Body content is valid HTML
- [ ] `jj status` shows clean or expected changes

## File Structure

```
src/i18n/locales/{locale}/
├── messages.ts                          # Imports and metadata keys
└── content/
    └── articles/
        ├── edu-what-body.html.txt       # Educational content
        ├── edu-how-body.html.txt
        ├── article-math-body.html.txt   # Blog posts
        ├── article-apr-vs-ear-body.html.txt
        └── article-my-new-post-body.html.txt  # Your new post
```

## Key Naming Conventions

| Content         | Key Pattern                             | File Pattern (kebab-case)      |
| --------------- | --------------------------------------- | ------------------------------ |
| Title           | `article{SlugPascalCase}Title`          | N/A (in messages.ts)           |
| Description     | `article{SlugPascalCase}Description`    | N/A (in messages.ts)           |
| Date            | `article{SlugPascalCase}Date`           | N/A (in messages.ts)           |
| Body            | `article{SlugPascalCase}Body`           | `article-{slug}-body.html.txt` |
| SEO Title       | `article{SlugPascalCase}SeoTitle`       | N/A (in messages.ts)           |
| SEO Description | `article{SlugPascalCase}SeoDescription` | N/A (in messages.ts)           |

Example for slug `french-vs-american`:

- Key: `articleFrenchVsAmericanBody`
- File: `article-french-vs-american-body.html.txt`

## Content Guidelines

### Body HTML Files

- Use semantic HTML tags: `<p>`, `<h2>`, `<strong>`, `<ul>`, `<li>`, `<pre><code>`
- No `<html>`, `<head>`, or `<body>` tags - content only
- Mathematical formulas use HTML entities:
  - `×` (multiplication)
  - `−` (minus)
  - `≤`, `≥`, `≠` (comparison operators)
- Currency and examples should be localized per locale:
  - `en-US`: `$200,000`, "behavior", "math"
  - `en-GB`: `£200,000`, "behaviour", "maths"
  - `es-ES`: `200.000 €`, "comprende"
  - `es-AR`: `200.000 €`, "comprendé"

### Metadata Keys

- **Date format**: "{Month} {Year}" (e.g., "March 2026", "Marzo 2026")
- **Description**: 1-2 sentences, used in article cards and meta tags
- **SEO title**: "{Article Title} | Amorta" format
- **SEO description**: 150-160 characters for search result snippets

## Localization Notes

- The **slug is the same** across all locales (used in URLs)
- Content translations should be **culturally appropriate**, not literal
- Code examples may remain in English in all locales
- Currency and date formats should match locale conventions
