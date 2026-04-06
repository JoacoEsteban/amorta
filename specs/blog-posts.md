# Blog Post Creation Guide

This spec defines how agents create and localize blog posts for Amorta.

The repository contains automated checks for blog completeness. Treat this document as both a content guide and an implementation checklist.

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
  date: Date // publication date used for sorting
}
```

`seoTitleKey` and `seoDescriptionKey` are still required in each locale `messages.ts`, but they are not stored on the `Article` object in `src/domain/blog.ts`.

## Supported Locales

| Locale  | Path                                 | Content Directory                          |
| ------- | ------------------------------------ | ------------------------------------------ |
| `en-US` | `src/i18n/locales/en-US/messages.ts` | `src/i18n/locales/en-US/content/articles/` |
| `en-GB` | `src/i18n/locales/en-GB/messages.ts` | `src/i18n/locales/en-GB/content/articles/` |
| `es-ES` | `src/i18n/locales/es-ES/messages.ts` | `src/i18n/locales/es-ES/content/articles/` |
| `es-AR` | `src/i18n/locales/es-AR/messages.ts` | `src/i18n/locales/es-AR/content/articles/` |
| `fr-FR` | `src/i18n/locales/fr-FR/messages.ts` | `src/i18n/locales/fr-FR/content/articles/` |

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
    date: new Date('2026-04-06'),
  },
]
```

Important:

- Keep the `date` field and the localized `article*Date` message values aligned.
- New articles should be inserted so the final `ARTICLES` ordering still sorts newest to oldest after the existing `.sort(...)` call.
- If the article should participate in the related-articles widget, add its curated relationships in `RELATED_ARTICLE_SLUGS`.
- Do not rely on fallback recommendations. The related-articles widget should only render when curated related slugs exist for the current article.

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
articleMyNewPostDate: 'April 6, 2026',
articleMyNewPostBody,
articleMyNewPostSeoTitle: 'My New Post | Amorta',
articleMyNewPostSeoDescription: 'Full meta description for search engines, ideally 150-160 characters.',
```

### Step 4: Localize to Other Locales

For each additional locale (`es-ES`, `en-GB`, `es-AR`, `fr-FR`):

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
articleMyNewPostDate: '6 de Abril de 2026',
articleMyNewPostBody,
articleMyNewPostSeoTitle: 'Mi Nuevo Post | Amorta',
articleMyNewPostSeoDescription: 'Descripción meta completa para motores de búsqueda.',
```

### Step 5: Verify Completeness

Before considering the task complete, verify:

- [ ] Article entry exists in `src/domain/blog.ts`
- [ ] Body HTML files exist for all 5 locales
- [ ] Import statements added to all 5 `messages.ts` files
- [ ] All 6 metadata keys per locale are present (title, description, date, body, seoTitle, seoDescription)
- [ ] Body content is valid HTML
- [ ] Each locale stays within the enforced blog word-count range from `test/blog-word-count.test.ts` (currently 800-1500 words)
- [ ] Any relative links inside article bodies resolve correctly from `/blog/{slug}`
- [ ] If related articles were curated for the post, the `RELATED_ARTICLE_SLUGS` entry only references valid article slugs
- [ ] `bun test` passes
- [ ] `bun run scripts/build.ts` passes
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
  - `fr-FR`: `200 000 €`, "comprenez"
- Internal article links should use locale-safe sibling paths such as `extra-payments` or `understanding-amortization-schedule`
- Keep link targets inside the existing blog route structure so they work under locale-prefixed URLs

### Metadata Keys

- **Date format**: Match the locale conventions already used in `messages.ts`, using a full publication date.
  - `en-US`: `April 6, 2026`
  - `en-GB`: `6 April 2026`
  - `es-ES`: `6 de Abril de 2026`
  - `es-AR`: `6 de Abril de 2026`
  - `fr-FR`: `6 avril 2026`
- **Description**: 1-2 sentences, used in article cards and meta tags
- **SEO title**: "{Article Title} | Amorta" format
- **SEO description**: 150-160 characters for search result snippets

## Localization Notes

- The **slug is the same** across all locales (used in URLs)
- Content translations should be **culturally appropriate**, not literal
- Code examples may remain in English in all locales
- Currency and date formats should match locale conventions
