import { createElement } from 'react'
import { buildThemeScript } from './core/script.ts'
import type { ThemeConfig } from './core/types.ts'

export { buildThemeScript } from './core/script.ts'

export interface ThemeScriptProps extends ThemeConfig {
  nonce?: string
}

/**
 * The anti-FOUC script as a React element. Render it inside `<head>` of a
 * SERVER layout (root layout in Next.js, `root.tsx` in React Router,
 * `__root.tsx` in TanStack Start) so it executes before first paint.
 *
 * This module carries no `'use client'` on purpose: rendering the script from
 * a client component is exactly what triggers React 19's "script tag while
 * rendering" warning when the tree remounts.
 *
 * Pass the same config here and to `ThemeProvider`.
 */
export function ThemeScript({ nonce, ...config }: ThemeScriptProps) {
  return createElement('script', {
    nonce,
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: { __html: buildThemeScript(config) },
  })
}
