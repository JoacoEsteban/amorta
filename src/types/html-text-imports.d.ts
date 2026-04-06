/**
 * HTML Import Type Declarations
 *
 * This project uses `*.html.txt` files for HTML content imported as text.
 * This avoids conflicts with bun-types which declares `*.html` as HTMLBundle.
 *
 * Files must be imported with `with { type: 'text' }`:
 *   import content from './file.html.txt' with { type: 'text' }
 */

declare module '*.html.txt' {
  const content: string
  export default content
}
