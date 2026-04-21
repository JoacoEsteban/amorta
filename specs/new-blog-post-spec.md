Your task is to create one blog post in order to move forward with the spec in @adsense-spec.md
You should follow the technical specification in @blog-posts.md

Read both documents to have the proper context and craft one new blog post.

This task is not complete until the article is implemented in the real app structure:

- Register the article in `src/domain/blog.ts`
- Add localized body files and metadata for every supported locale, including `fr-FR`
- Add a curated `RELATED_ARTICLE_SLUGS` entry if the post should appear in the related-articles widget
- Keep the article within the repository-enforced word-count limits
- Run the required verification commands from the blog spec before finishing

## Web research (required before writing)

Before drafting anything, spend time researching the topic online. The goal is to ground the article in accurate, current, real-world data rather than generic hypotheticals.

**What to research:**

- **Current figures**: Look up realistic rate ranges, typical loan amounts, or standard terms that apply to the topic today (e.g., "average 30-year mortgage rate 2025", "typical personal loan origination fee range"). Use these in your worked examples instead of round numbers pulled from thin air.
- **Authoritative sources**: Find 1–2 credible external references (central bank publications, financial regulators, well-known financial institutions, academic explainers) that support the core claims in the article. Link to them with contextual anchor text where relevant.
- **Common reader questions**: Search the topic as a reader would (e.g., "how does balloon payment work", "what happens if I miss a grace period"). Skim the top results to understand what people actually find confusing — use that to shape which nuances your article addresses.
- **Terminology variation**: Check whether the concept is called something different in other English-speaking markets (US vs UK vs AU). Note any differences, especially if the article will reach en-GB readers.

**How to use the research:**

- Update your worked example to use realistic numbers drawn from actual market data, not defaults like "6% and $200,000."
- If you cite a specific statistic or rate, link to its source.
- Do not copy or closely paraphrase source material. Research informs the framing and data — the writing must be original.
- If research reveals that the topic is more nuanced than expected (e.g., different rules in different jurisdictions), reflect that in the article.

## About picking a theme

- Pick a theme that is not an 'opinion'. Blogs should be informative in the most un-ambiguous way possible.
- The goal is to provide information, not to entertain, persuade, etc.
- Avoid comparisons: themes about "This vs That: the differences" are not helpful. Aim to explain ONE single topic in great detail. You can make comparisons in the blog itself but the hook should not be that
- Prefer topics that fit naturally with amortization, repayment mechanics, loan math, rate mechanics, or other concepts already covered by the site
- Before choosing a topic, check existing article slugs and article bodies so you do not create a near-duplicate

## Content quality mandates

These are non-negotiable requirements for every article. Failing any of them means the post is not ready.

### 1. Concrete worked examples with real numbers

Every article must include at least one fully worked numerical example with specific figures (e.g., "$240,000 loan at 5.5% EAR over 20 years"). Walk through the calculation step by step and state the result explicitly. Do not describe what _would_ happen in hypothetical terms — compute it and show the answer.

Use `<pre><code>` blocks for formulas and multi-step calculations. For mathematical expressions within prose, use HTML entities (`&times;`, `&minus;`, `&asymp;`, superscripts with `<sup>`).

### 2. Knowledge arc: fundamentals → nuance

Articles must build understanding in order:

1. Define the concept plainly (what it is, in one paragraph)
2. Explain the mechanism (how it works mathematically or procedurally)
3. Walk through a concrete example
4. Address scale, edge cases, or variation (how does it change for different loan sizes, rates, or terms?)
5. Address when the concept does NOT apply, or common mistakes — this section is required

Do not bury the definition, do not skip the mechanism, do not end after just the example.

### 3. Non-obvious insights

The article must contain at least one insight a reader could not get from a one-sentence search result. Examples from existing posts: "An extra payment in month 1 saves more than the same payment in year 15", "Using APR directly in the annuity formula produces a schedule that never fully repays". Surface the counterintuitive or underappreciated aspect of the topic.

### 4. Internal links

Include 2–4 internal links to existing articles using relative slug paths (e.g., `extra-payments`, `understanding-amortization-schedule`, `loan-term-comparison`). Links must use contextual anchor text — never bare URLs or generic text like "click here". Place links where they are genuinely useful to a reader who wants to go deeper.

### 5. Intro and conclusion

- **Intro**: First paragraph must define the topic and state what the reader will understand by the end. No preamble, no "in this article we will…" throat-clearing.
- **Conclusion**: Final section must reinforce the key practical takeaway and, where natural, point the reader to Amorta for hands-on exploration.

### 6. Heading structure

Use `<h2>` for main sections (4–6 per article) and `<h3>` for subsections within them. Each `<h2>` section should be self-contained enough that a reader scanning headers gets a clear outline of the article.
