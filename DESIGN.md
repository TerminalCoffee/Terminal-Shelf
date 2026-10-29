# DESIGN.md — Terminal Shelf

## Brand
- Name: Terminal Shelf
- Aesthetic: light, clean, terminal-lean. Cyan (`#00A3E0`) brand focus, espresso (`#382018`) accent, charcoal (`#18141D`) text.
- Dark mode: supported via `light-dark()` + `color-scheme: light dark`.

## Tokens
Source of truth: `assets/css/tokens.css`. Primitive (oklch) → semantic (role-based, theme-aware). No `@property` typing yet — add when animating.

### Primitives
- Colors: cyan, espresso, charcoal, white, slate (oklch, source hex annotated).
- Space: 4pt grid, micro fixed (`--space-1..3`), macro fluid (`clamp()`).
- Type: fluid `clamp()` scale (`--text-xs` … `--text-5xl`).

### Semantic (role-based, no primary/secondary hierarchy)
- Surface: `--surface-default`, `--surface-subtle`, `--surface-inverse`, `--surface-brand`, `--surface-accent`.
- Text: `--text-on-default`, `--text-on-subtle`, `--text-on-inverse`, `--text-on-brand`, `--text-on-accent` (via `contrast-color()`).
- Border: `--border-subtle`, `--border-strong`.
- Space: `--space-gutter`, `--space-stack`, `--space-stack-lg`, `--space-section`, `--space-cluster`.
- Type: `--text-body`, `--text-body-sm`, `--text-code`, `--text-ui`, `--text-heading-1..3`.
- Hovers derived via `color-mix(in oklab, …)`.

### Reading states
Not yet in tokens (no lifecycle component yet). Will be added as data colors when needed. Double-encoded: color + label.

### Cascade
`@layer tokens, reset, base, layout, components;` declared in `tokens.css` (first file loaded). Each file wraps its rules in its layer. Components use `@scope` for isolation.

### Primitives
Button, Card, Chip, Headings. Stories in `docs/design/`.

## Principles
- Interface-first. Low friction. Collection belongs to user.
- No prototype code reuse. Prototypes inspire only.
- Semantic tokens over raw values in components.
- Double-encode state (color + label).
- Use `@scope` for component isolation, not BEM.
