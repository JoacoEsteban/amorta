Your task is to create one blog post in order to move forward with the spec in @adsense-spec.md
You should follow the technical specification in @blog-posts.md

Read both documents to have the proper context and craft one new blog post.

This task is not complete until the article is implemented in the real app structure:

- Register the article in `src/domain/blog.ts`
- Add localized body files and metadata for every supported locale, including `fr-FR`
- Add a curated `RELATED_ARTICLE_SLUGS` entry if the post should appear in the related-articles widget
- Keep the article within the repository-enforced word-count limits
- Run the required verification commands from the blog spec before finishing

## About picking a theme

- Pick a theme that is not an 'opinion'. Blogs should be informative in the most un-ambiguous way possible.
- The goal is to provide information, not to entertain, persuade, etc.
- Avoid comparisons: themes about "This vs That: the differences" are not helpful. Aim to explain ONE single topic in great detail. You can make comparisons in the blog itself but the hook should not be that
- Prefer topics that fit naturally with amortization, repayment mechanics, loan math, rate mechanics, or other concepts already covered by the site
- Before choosing a topic, check existing article slugs and article bodies so you do not create a near-duplicate
