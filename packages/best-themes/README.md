# best-themes

> Theme switching for React apps — framework-agnostic core, zero-FOUC inline script, no React 19 script warnings. Works with Next.js, React Router, TanStack Start and Vite.

`next-themes` is battle-tested but unmaintained: its provider renders the anti-FOUC `<script>` from a client component, which triggers React 19's *"Encountered a script tag while rendering"* error whenever the tree remounts (e.g. switching a root `[lang]` segment). `best-themes` splits the script out as a server-renderable component you put in `<head>` yourself — the warning is impossible by construction — and keeps the rest of the API drop-in familiar.

- **Zero FOUC** — a synchronous inline script resolves the theme before first paint
- **No React 19 warnings** — the script never renders from a client component
- **`system` support** — tracks `prefers-color-scheme` live, plus `color-scheme` on `<html>`
- **Cross-tab sync** — via the `storage` event
- **Cookie mode** — read the theme on the server (Next.js, React Router, TanStack Start)
- **Tiny** — framework-agnostic core + a `useSyncExternalStore` React binding, ESM only

## Install

```bash
pnpm add best-themes
```

## Next.js (App Router)

```tsx
// app/layout.tsx — stays a server component
import { ThemeProvider } from 'best-themes'
import { ThemeScript } from 'best-themes/script'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
```

```tsx
'use client'
import { useTheme } from 'best-themes'

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme()
  return (
    <button onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
      Toggle
    </button>
  )
}
```

To read the theme on the server, switch on cookie storage and use `best-themes/next`:

```tsx
import { getTheme } from 'best-themes/next'

// <ThemeScript storage="cookie" /> + <ThemeProvider storage="cookie">
const theme = await getTheme() // 'dark' | 'light' | 'system' | null
```

## React Router / Remix

```tsx
// app/root.tsx
import { ThemeProvider } from 'best-themes'
import { ThemeScript } from 'best-themes/script'
import { getThemeFromRequest } from 'best-themes/server'

export async function loader({ request }: LoaderFunctionArgs) {
  return { theme: getThemeFromRequest(request) } // storage: 'cookie'
}

export default function Root() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript storage="cookie" />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider storage="cookie">
          <Outlet />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}
```

## TanStack Start

Render `<ThemeScript />` in the `head` of `__root.tsx` and wrap the outlet in `<ThemeProvider>`; `getThemeFromRequest` from `best-themes/server` works in server functions.

## Vite SPA

No script needed — there is no server-rendered HTML to flash. Just wrap the app:

```tsx
import { ThemeProvider } from 'best-themes'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
)
```

(If you want the theme applied even before React loads, paste `buildThemeScript()`'s output from `best-themes/core` into a `<script>` in `index.html`.)

## API

### `ThemeProvider` / `ThemeScript` options

Pass the same config to both.

| Option | Default | |
| --- | --- | --- |
| `themes` | `['light', 'dark']` | Selectable themes, excluding `'system'` |
| `defaultTheme` | `'system'` | Falls back to `'light'` when `enableSystem: false` |
| `enableSystem` | `true` | Track `prefers-color-scheme`, offer `'system'` |
| `attribute` | `'class'` | Or any `data-*` attribute, e.g. `'data-theme'` |
| `storageKey` | `'theme'` | localStorage key and cookie name |
| `storage` | `'localStorage'` | `'cookie'` enables server reading (localStorage still mirrored); `'none'` disables persistence |
| `enableColorScheme` | `true` | Keep `<html style="color-scheme">` in sync |
| `disableTransitionOnChange` | `false` | Suppress CSS transitions on theme change |
| `forcedTheme` | — | Pin the rendered theme (per-page overrides) |

`ThemeScript` additionally accepts `nonce`.

### `useTheme()`

```ts
const {
  theme,          // selected theme, e.g. 'system'
  resolvedTheme,  // 'system' resolved to 'light' | 'dark'
  systemTheme,    // OS preference, undefined on the server
  themes,
  forcedTheme,
  setTheme,
} = useTheme()
```

On the server (and hydration's first pass) `theme` is `defaultTheme` and `resolvedTheme` guesses `'light'` for `'system'` — gate theme-dependent *text* on mount if you need exactness; the DOM attribute itself is always correct before paint.

### Subpath exports

| Entry | Contents |
| --- | --- |
| `best-themes` | `ThemeProvider`, `useTheme` (client) |
| `best-themes/script` | `ThemeScript`, `buildThemeScript` (server-safe) |
| `best-themes/core` | Framework-agnostic store + script builder |
| `best-themes/server` | `getThemeFromRequest`, cookie helpers (any `Request`-based server) |
| `best-themes/next` | `getTheme()` via `next/headers` |

## Migrating from next-themes

`ThemeProvider` and `useTheme` are drop-in for the common props (`attribute`, `defaultTheme`, `enableSystem`, `storageKey`, `disableTransitionOnChange`, `forcedTheme`, `themes`). Then move the script into your server layout's `<head>` via `ThemeScript`. Not carried over: `value` class mapping, `scriptProps`, `useTheme().forcedTheme` semantics differences are documented above.

## License

MIT © [Brendan Dash](https://aiwan.run)
