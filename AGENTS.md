---
description: Amorta Project Style Guide & Technical Constraints
globs: '*.ts, *.tsx, *.html, *.css, *.js, *.jsx, package.json'
alwaysApply: true
---

# Amorta Style Guide

This project follows a strict functional and reactive programming style. All agents MUST adhere to these foundational mandates.

## Core Mandates & Flow Control

- **No Hidden Control Flow:** Do not use `try/catch` blocks.
- **Promises as Expressions:** Use `.then()` and `.catch()` for Promises to treat them as expressions with returning values. Avoid imperative `let` assignments with `try/catch`.
- **Pattern Matching:** No `if/else` or `switch` statements. Use `ts-pattern` (`match`, `P`) for all conditional logic.
  - Prefer `match(value).with(pattern, handler).exhaustive()`.
  - Use `P` for complex pattern matching.
- **Reactivity:** Logic MUST be expressed via RxJS observables and subjects.
  - Use `@react-rxjs/core` and `@react-rxjs/utils`.
  - Do NOT use standard React hooks (e.g., `useState`, `useEffect`) for business logic or complex state management.
  - Connect RxJS streams to React components using `bind`.
- **Type Validation:** Use `typia` for runtime type checking (especially for serialization and deserialization).

## Technical Stack & Commands

- **Runtime & Package Manager:** Bun (`bun install`, `bun test`, `bun run`).
- **Bundling/Server:** Bun's built-in `Bun.serve()` and HTML imports. Do NOT use Vite.
- **Frontend Framework:** React (TypeScript).
- **UI Components:** `shadcn/ui` (Radix UI primitives).
- **Notifications:** `react-hot-toast`.
- **Version Control:** `jj` (Jujutsu). Use `jj` for all version control operations.

## Common Commands

- `bun install`: Install dependencies.
- `bun run scripts/build.ts`: Build the project.
- `bun test`: Run all tests.
- `bun test <file>`: Run specific test file.
- `bun --hot ./index.ts`: Run the development server.
- `jj status`: Check current version control status.
- `jj commit -m "message"`: Commit changes with jj.

## Project Structure

- `src/domain`: Business logic, pure functions, and domain types.
- `src/state`: RxJS stores, Subjects, and ViewModels.
- `src/components`: React components (UI components in `ui/`).
- `src/typia`: Typia templates (`templates/`) and generated code (`generated/`).
- `test`: Bun tests for domain logic and state.

## Implementation Examples

### Reactivity Example (RxJS)

```tsx
const [useValue, value$] = bind(subject.pipe(map((v) => v * 2)), 0)
```

### Pattern Matching Example

```tsx
return match(state)
  .with({ kind: 'loading' }, () => <Loading />)
  .with({ kind: 'data', value: P.select() }, (val) => <Data value={val} />)
  .exhaustive()
```

## Development Workflow

- **Commit Strategy:** Plan commits ahead of time and structure them by functionality. Use `jj` for version control.
- **Verification:** Always use `bun test` to verify logic changes before considering a task complete.
- **Surgical Edits:** Apply changes that are idiomatically complete and follow these standards.
