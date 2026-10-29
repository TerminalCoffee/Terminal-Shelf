# AGENTS.md — Terminal Shelf

## Project
Personal book collection manager (V1: physical books). Vanilla HTML/CSS/JS. Local-first, no network in production.

## Structure
- Root: `*.html` pages, `DESIGN.md`, `AGENTS.md`, `README.md`, `package.json`
- `assets/css/`: tokens.css, reset.css, base.css, layout.css, components/
- `assets/js/`: app.js, components/
- `docs/design/`: Storybook stories (moved from `stories/`)
- `docs/PRD.md`: authoritative requirements (FR-01..FR-12, NFR-01..NFR-06)
- `.storybook/`: Storybook config (vanilla HTML)

## Conventions
- 2-space indent, LF, UTF-8 (see .editorconfig).
- No comments in code unless asked.
- No prototype files imported/referenced. Prototypes are inspiration only.
- Vanilla only: no bundler, no preprocessors, no CDN in production. Storybook (vanilla) is the only dev tooling.
- Use design tokens from `assets/css/tokens.css`; never hardcode colors/sizes in components.
- Reading states are semantic tokens (color + label). Always double-encode.
- CSS: `@layer` for cascade control, `@scope` for component isolation, `light-dark()` for theming. No BEM, no `@import` chains.

## Storybook
- Vanilla `@storybook/html`. Loads `assets/css/` via `.storybook/preview.js`.
- Stories live in `docs/design/`.
- Run: `npm run storybook` (port 6006).

## Testing / validation
- Open `index.html` in browser; verify tokens load with no errors.
- Run Storybook for primitives: `npm run storybook`.
- (No test runner configured yet.)
